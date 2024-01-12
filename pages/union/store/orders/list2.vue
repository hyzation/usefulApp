<template>
	<gui-page :isLoading="pageLoading" :customHeader="true" ref="guiPage">
		<view slot="gHeader">
			<view class="header">
				<view class="left" @click="goback">
					<uni-icons type="back" size="24" color="#333333"></uni-icons>
				</view>
				<view class="title">订单列表</view>
				<view class="right"></view>
			</view>
		</view>
		
		<view slot="gBody">
            <view style="display: flex;justify-content: space-around;align-items: center;padding: 30rpx 20rpx;background: #ffffff;height: 40rpx;">
                <view @click="tabClick(index)" v-for="(item, index) in tabList" :key="index" :style="{color: currentTab == index ? '#FF5E29' : '#333333', fontSize: '32rpx'}">{{ item }}</view>
            </view>
			<union-empty v-if="list.length == 0" style="margin-top: 50%;"></union-empty>
			<view style="height: calc(100vh - 190rpx);overflow-x: hidden;overflow-y: auto;">
                <view style="padding: 20rpx;margin: 20rpx auto;width: 690rpx;background: #ffffff;border-radius: 10rpx;" v-for="item in list" :key="item.id">
                    <view style="display: flex;justify-content: space-between;align-items: center;padding-bottom: 20rpx;">
                        <view style="color: #333333;font-size: 24rpx;">订单号：{{item.orderNum}}</view>
                        <view style="color: #FF5E29;font-size: 24rpx;">{{ item.statusText }}</view>
                    </view>
                    <view @click="gotoDetail(item)" style="display: flex;justify-content: space-between;align-items: center;" v-for="goods in item.child" :key="goods.id">
                        <image :src="goods.goodsImage || ''" style="width: 200rpx;height: 200rpx;border-radius: 10rpx;"></image>
                        <view style="margin-left: 20rpx;width:calc(100% - 220rpx)">
                            <view style="color: #333333;font-size: 30rpx;">{{ goods.goodsName }}</view>
                            <view style="color: #999999;font-size: 24rpx;margin-top: 10rpx;">规格：默认</view>
                            <view style="display: flex;justify-content: space-between;align-items: center;margin-top: 40rpx;">
                                <view style="color: #333333;">
                                    <text style="font-size: 21rpx;">￥</text>
                                    <text style="font-size: 40rpx;">{{ goods.price }}</text>
                                </view>
                                <view style="font-size: 30rpx;">x{{ goods.num }}</view>
                            </view>
                        </view>
                    </view>
                    <view style="display: flex;justify-content: space-between;align-items: center;padding-top: 20rpx;">
                        <view style="display: flex;justify-content: space-between;align-items: center;font-size: 24rpx;">
                            <view style="color: #999999;">共1件</view>
                            <view style="color: #333333;margin-left: 6rpx;">合计<text style="font-size: 18rpx;">￥</text>{{ item.realPrice }}</view>
                        </view>
                        <view style="display: flex;justify-content: flex-end;align-items: center;">
                            <view @click="setStatus(item.orderNum, 0)" v-if="item.status == 1" style="color: #FF5E29;font-size: 22rpx;padding: 10rpx 20rpx;border-radius: 50rpx;border: 1rpx solid #FF5E29;">关闭订单</view>
                            <view @click="gotoDetail(item)" v-if="item.status == 1" style="margin-left: 10rpx;color: #FF5E29;font-size: 22rpx;padding: 10rpx 20rpx;border-radius: 50rpx;border: 1rpx solid #FF5E29;">去发货</view>
                        </view>
                    </view>
                </view>
            </view>
		</view>
	</gui-page>
</template>
<script>
	export default {
		data() {
			return {
				pageLoading: false,
                tabList: ['全部', '待付款', '待消费', '已完成'],
                statusList: {
                    '1': '待付款',
                    '2': '待发货',
                    '5': '已完成',
                },
                currentTab: 0,
                page: 1,
                pageSize: 10,
                list: [],
			}
		},
        onLoad (options){
           this.currentTab = options.type; 
        },
		mounted (){
            this.getOrderList(this.currentTab);
		},
		methods: {
            gotoDetail (item){
                // uni.setStorageSync('send_order_info', item);
                // this.goto('/pages/union/store/ordersDetail');
            },
			goback (){
				uni.navigateTo({
				    url: '/pages/union/store/index'
				})
			},
			goto (url){
				uni.navigateTo({
					url
				})
			},
            tabClick (index){
                this.getOrderList(index);
                this.currentTab = index;
            },
            async getOrderList (status){
                uni.showLoading({
                    title: '加载中'
                })
                const that = this;
                let data = {
                    page: that.page,
                    page_size: that.pageSize,
                    shop_id: uni.getStorageSync('userInfo').shop_info.id,
                }
                switch(status){
                    case 1: data.status = 1; break;
                    case 2: data.status = 2; break;
                    case 3: data.status = 5; break;
                }
                const res = await uni.unionRequest('swoft/api/order/getOrderListNew', data);
                that.list = res.data.map(item => {
                    switch(item.status){
                        case 1: item.statusText = '待付款'; break;
                        case 2: item.statusText = '待消费'; break;
                        case 5: 
                        case 6: item.statusText = '已完成'; break;
                    }
                    return item;
                })
                uni.hideLoading();
            },
            async setStatus (id, status){
                await uni.unionRequest('swoft/api/order/editOrder', {
                    id,
                    status,
                    uid: uni.getStorageSync('userInfo').id
                })
                uni.showToast({
                    title: '操作成功'
                })
                setTimeout(() => {
                    this.getOrderList();
                }, 1500)
            }
		}
	}
</script>
<style lang="scss">
	.phcolor{
		color: #999999;
	}
	page{
		width: 100%;
		height: 100vw;
		background: #F5F5F5;
		.header{
			width: 100vw;
			height: 90rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.left{
				width: 100rpx;
				padding-left: 20rpx;
			}
			.title{
				text-align: center;
				color: #333333;
				font-size: 33rpx;
			}
			.right{
				width: 100rpx;
				padding-right: 20rpx;
				color: #999999;
				font-size: 25rpx;
			}
		}
	}
</style>