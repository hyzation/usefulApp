<template>
	<gui-page :isLoading="pageLoading" :customHeader="true" ref="guiPage">
		<view slot="gHeader">
			<view class="header">
				<view class="left" @click="goback">
					<uni-icons type="back" size="24" color="#333333"></uni-icons>
				</view>
				<view class="title">订单详情</view>
				<view class="right"></view>
			</view>
		</view>
		
		<view slot="gBody">
			<view style="height: calc(100vh - 190rpx);overflow-x: hidden;overflow-y: auto;">
                <view style="padding: 30rpx;font-size: 32rpx;">{{ statusList[detail.status] }}</view>
                <view style="display: flex;justify-content: flex-start;align-items: center;background: #ffffff;border-radius: 10rpx;
                padding: 20rpx;margin: 0 30rpx;width: 660rpx;">
                    <image src="../../../../static/images/union/weizhi.png" style="width: 30rpx;" mode="widthFix"></image>
                    <view style="margin-left: 20rpx;">
                        <view style="font-size: 32rpx;color: #333333;">{{ detail.province }}{{ detail.city }}{{ detail.county }}{{ detail.address }}</view>
                        <view style="font-size: 26rpx;color: #999999;margin-top: 10rpx;">{{ detail.name }} <text style="margin-left: 20rpx;">{{ detail.tel }}</text></view>
                    </view>
                </view>
                <view style="display: flex;justify-content: flex-start;align-items: center;background: #ffffff;border-radius: 10rpx;
                padding: 20rpx;margin: 0 30rpx;width: 660rpx;margin-top: 30rpx;" v-for="goods in detail.child" :key="goods.id">
                    <image :src="goods.goodsImg || ''" style="width: 200rpx;height: 200rpx;border-radius: 10rpx;"></image>
                    <view style="margin-left: 20rpx;width:100%">
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
                <view style="display: flex;justify-content: space-between;align-items: center;padding: 20rpx;margin: 0 30rpx;width: 660rpx;background: #ffffff;">
                    <view style="display: flex;justify-content: space-between;align-items: center;font-size: 24rpx;">
                        <view style="color: #999999;">共1件</view>
                        <view style="color: #333333;margin-left: 6rpx;">合计<text style="font-size: 18rpx;">￥</text>{{ detail.realPrice }}</view>
                    </view>
                    <view style="display: flex;justify-content: flex-end;align-items: center;">
                        <view v-if="detail.status == 1" style="color: #FF5E29;font-size: 22rpx;padding: 10rpx 20rpx;border-radius: 50rpx;border: 1rpx solid #FF5E29;">关闭订单</view>
                        <view @click="postOrder" v-if="detail.status == 1" style="margin-left: 10rpx;color: #FF5E29;font-size: 22rpx;padding: 10rpx 20rpx;border-radius: 50rpx;border: 1rpx solid #FF5E29;">去发货</view>
                    </view>
                </view>
            </view>
            <union-popup v-model="showPopup" @submit="postOrderSubmit" title="发货">
                <view style="padding: 30rpx;">
                    <view style="padding: 30rpx 0;display: flex;justify-content: space-between;align-items: center;">
                        <view style="font-size: 30rpx;width: 150rpx;">快递名称</view>
                        <view style="width: 500rpx;">
                            <input style="font-size: 26rpx;color: #999999;text-align: right;" type="text" placeholder="请输入快递名称" v-model="postName" />
                        </view>
                    </view>
                    <view style="padding: 30rpx 0;display: flex;justify-content: space-between;align-items: center;">
                        <view style="font-size: 30rpx;width: 150rpx;">快递单号</view>
                        <view style="width: 500rpx;">
                            <input style="font-size: 26rpx;color: #999999;text-align: right;" type="text" placeholder="请输入快递单号" v-model="postId" />
                        </view>
                    </view>
                    <view style="width: 100%;height: 100rpx;"></view>
                </view>
            </union-popup>
		</view>
	</gui-page>
</template>
<script>
	export default {
		data() {
			return {
				pageLoading: false,
                statusList: {
                    '1': '待付款',
                    '2': '待发货',
                    '5': '已完成',
                },
                pageSize: 10,
                detail: {},
                showPopup: false,
                postName: '',
                postId: ''
			}
		},
        onLoad (options){
           this.currentTab = options.type; 
        },
		mounted (){
            this.detail = uni.getStorageSync('send_order_info');
		},
		methods: {
            postOrder (){
                this.showPopup = true;
            },
            async postOrderSubmit (){
                const that = this;
                uni.showLoading({
                    title: '加载中'
                })
                await uni.unionRequest('swoft/api/order/sendOrderGoods', {
                    orderNum: that.detail.orderNum,
                    expressNo: that.postId,
                    expressName: that.postName
                })
                uni.hideLoading();
                uni.showToast({
                    title: '发货成功',
                    icon: 'success'
                })
                setTimeout(() => {
                    uni.navigateTo({
                        url: '/pages/union/store/orders?type=0'
                    });
                }, 1500)
            },
			goback (){
				uni.navigateTo({
				    url: '/pages/union/store/orders'
				})
			},
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