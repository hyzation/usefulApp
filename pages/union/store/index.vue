<template>
	<gui-page :isLoading="pageLoading" :customHeader="true" ref="guiPage">
		<view slot="gHeader">
			<view class="header">
				<view class="left" @click="goback">
					<uni-icons type="back" size="24" color="#333333"></uni-icons>
				</view>
				<view class="title">我的店铺</view>
				<view class="right"></view>
			</view>
		</view>
		
		<view slot="gBody">
			<view v-if="detail.type == 1" style="width: 680rpx;margin: 30rpx auto; background: #ffffff; padding: 20rpx; display: flex;justify-content: space-between;align-items: center;">
				<view style="display: flex;justify-content: space-between;align-items: center;">
					<image style="width: 70rpx;height: 70rpx;border-radius: 50%;" :src="detail.logo"></image>
					<view style="margin-left: 10rpx;">
						<view style="font-size: 30rpx;">{{ detail.name }}</view>
						<view style="font-size: 21rpx;color: rgba(153, 153, 153, 1);margin-top: 10rpx;">{{ detail.mobile }}</view>
					</view>
				</view>
				<view :style="{ fontSize: '21rpx', color: detail.shop_deposit_num > 0 ? 'rgba(85, 170, 0, 1.0)' : 'rgba(255, 94, 41, 1)' }">店铺保证金：{{ detail.shop_deposit_num > 0 ? '已缴纳' : '未缴纳' }}</view>
			</view>
            
            <view v-if="detail.type == 2" style="width: 680rpx;margin: 30rpx auto; background: #ffffff; padding: 20rpx; display: flex;justify-content: space-between;align-items: center;">
                <view style="display: flex;justify-content: space-between;align-items: center;">
                	<image style="width: 70rpx;height: 70rpx;border-radius: 50%;" :src="detail.logo"></image>
                	<view style="margin-left: 10rpx;">
                		<view style="font-size: 30rpx;">{{ detail.name }}</view>
                		<view style="font-size: 21rpx;color: rgba(153, 153, 153, 1);margin-top: 10rpx;">{{ detail.mobile }}</view>
                	</view>
                </view>
                <view @click="showPopup = true" style="color: #FF5E29;font-size: 24rpx;padding: 6rpx 20rpx;border-radius: 50rpx;border: 1rpx solid #FF5E29;">去核销</view>
            </view>
            
            <union-popup v-model="showPopup" title="核销码" @submit="submit">
                <view style="width: 660rpx;padding: 10rpx 20rpx;margin: 0 auto;border-radius: 10rpx;background: #f5f5f5;display: flex;justify-content: space-between;align-items: center;">
                    <input style="width: 550rpx;font-size: 28rpx;padding: 15rpx;" type="text" v-model="checkCode" placeholder="输入核销码" />
                    <image @click="scan" src="../../../static/images/union/scan.png" style="width: 40rpx;height: 35rpx;"></image>
                </view>
                <view style="height: 500rpx;"></view>
            </union-popup>
            
            
			<view style="width: 680rpx;border-radius: 10rpx; margin: 30rpx auto; background: #ffffff; padding: 0 20rpx;">
				<view @click="goto('/pages/union/store/shop/info')" style="padding: 30rpx 0;display: flex;justify-content: space-between;align-items: center;border-bottom: 1rpx solid rgba(153, 153, 153, 0.1);">
					<view style="color: rgba(51, 51, 51, 1);font-size: 32rpx;">我的信息</view>
					<uni-icons type="right" color="rgba(153, 153, 153, 1)" size="20"></uni-icons>
				</view>
				<view @click="goto('/pages/union/store/goods/list')" style="padding: 30rpx 0;display: flex;justify-content: space-between;align-items: center;border-bottom: 1rpx solid rgba(153, 153, 153, 0.1);">
					<view style="color: rgba(51, 51, 51, 1);font-size: 32rpx;">我的商品</view>
					<uni-icons type="right" color="rgba(153, 153, 153, 1)" size="20"></uni-icons>
				</view>
				<view @click="goto(detail.type == 1 ? '/pages/union/store/goods/create' : '/pages/union/store/goods/create2')" style="padding: 30rpx 0;display: flex;justify-content: space-between;align-items: center;border-bottom: 1rpx solid rgba(153, 153, 153, 0.1);">
					<view style="color: rgba(51, 51, 51, 1);font-size: 32rpx;">发布商品</view>
					<uni-icons type="right" color="rgba(153, 153, 153, 1)" size="20"></uni-icons>
				</view>
				<view @click="()=>{}" style="padding: 30rpx 0;display: flex;justify-content: space-between;align-items: center;border-bottom: 1rpx solid rgba(153, 153, 153, 0.1);">
					<view style="color: rgba(51, 51, 51, 1);font-size: 32rpx;">结算比例</view>
					<view style="color: rgba(153, 153, 153, 1);font-size: 26rpx;">{{ detail.type == 1 ? detail.online_divide_persent : detail.outline_divide_persent }}%</view>
				</view>
				<view @click="goto(detail.shop_deposit_num > 0 ? '/pages/union/store/payed' : '/pages/union/store/pay')" style="padding: 30rpx 0;display: flex;justify-content: space-between;align-items: center;border-bottom: 1rpx solid rgba(153, 153, 153, 0.1);">
					<view style="color: rgba(51, 51, 51, 1);font-size: 32rpx;">管理服务费/保证金</view>
					<uni-icons type="right" color="rgba(153, 153, 153, 1)" size="20"></uni-icons>
				</view>
				<view @click="goto('/pages/union/store/shop/money')" style="padding: 30rpx 0;display: flex;justify-content: space-between;align-items: center;border-bottom: 1rpx solid rgba(153, 153, 153, 0.1);">
					<view style="color: rgba(51, 51, 51, 1);font-size: 32rpx;">营业流水</view>
					<uni-icons type="right" color="rgba(153, 153, 153, 1)" size="20"></uni-icons>
				</view>
				<view @click="goto('/pages/union/store/shop/bank')" style="padding: 30rpx 0;display: flex;justify-content: space-between;align-items: center;">
					<view style="color: rgba(51, 51, 51, 1);font-size: 32rpx;">银行卡</view>
					<uni-icons type="right" color="rgba(153, 153, 153, 1)" size="20"></uni-icons>
				</view>
			</view>
			<view style="width: 680rpx;border-radius: 10rpx; margin: 30rpx auto; background: #ffffff; padding: 0 20rpx;">
				<view style="padding: 20rpx 0;color: rgba(51, 51, 51, 1);font-size: 32rpx;">订单管理</view>
                
                <!-- 线下商家 -->
				<view v-if="detail.type == 2" style="display: flex;justify-content: space-around;align-items: center;margin-top: 20rpx;">
					<view style="text-align: center;" @click="goto('/pages/union/store/orders/list2?type=0')">
						<image src="../../../static/images/union/store/suoyoudingdan.png" style="width: 40rpx;height: 40rpx;"></image>
						<view style="color: rgba(51, 51, 51, 1);font-size: 26rpx;padding: 10rpx 0 30rpx 0;">所有订单</view>
					</view>
					<view style="text-align: center;" @click="goto('/pages/union/store/orders/list2?type=1')">
						<image src="../../../static/images/union/store/daifahuo.png" style="width: 40rpx;height: 40rpx;"></image>
						<view style="color: rgba(51, 51, 51, 1);font-size: 26rpx;padding: 10rpx 0 30rpx 0;">待付款</view>
					</view>
					<view style="text-align: center;" @click="goto('/pages/union/store/orders/list2?type=2')">
						<image src="../../../static/images/union/store/shouhou.png" style="width: 40rpx;height: 40rpx;"></image>
						<view style="color: rgba(51, 51, 51, 1);font-size: 26rpx;padding: 10rpx 0 30rpx 0;">待消费</view>
					</view>
					<view style="text-align: center;" @click="goto('/pages/union/store/orders/list2?type=3')">
						<image src="../../../static/images/union/store/yiwancheng.png" style="width: 40rpx;height: 40rpx;"></image>
						<view style="color: rgba(51, 51, 51, 1);font-size: 26rpx;padding: 10rpx 0 30rpx 0;">已完成</view>
					</view>
				</view>
                
                <!-- 线上商家 -->
                <view v-if="detail.type == 1" style="display: flex;justify-content: space-around;align-items: center;margin-top: 20rpx;">
                	<view style="text-align: center;" @click="goto('/pages/union/store/orders/list?type=0')">
                		<image src="../../../static/images/union/store/suoyoudingdan.png" style="width: 40rpx;height: 40rpx;"></image>
                		<view style="color: rgba(51, 51, 51, 1);font-size: 26rpx;padding: 10rpx 0 30rpx 0;">所有订单</view>
                	</view>
                	<view style="text-align: center;" @click="goto('/pages/union/store/orders/list?type=1')">
                		<image src="../../../static/images/union/store/daifahuo.png" style="width: 40rpx;height: 40rpx;"></image>
                		<view style="color: rgba(51, 51, 51, 1);font-size: 26rpx;padding: 10rpx 0 30rpx 0;">待支付</view>
                	</view>
                	<view style="text-align: center;" @click="goto('/pages/union/store/orders/list?type=2')">
                		<image src="../../../static/images/union/store/yifahuo.png" style="width: 40rpx;height: 40rpx;"></image>
                		<view style="color: rgba(51, 51, 51, 1);font-size: 26rpx;padding: 10rpx 0 30rpx 0;">待发货</view>
                	</view>
                	<view style="text-align: center;" @click="goto('/pages/union/store/orders/list?type=2')">
                		<image src="../../../static/images/union/store/yifahuo.png" style="width: 40rpx;height: 40rpx;"></image>
                		<view style="color: rgba(51, 51, 51, 1);font-size: 26rpx;padding: 10rpx 0 30rpx 0;">已发货</view>
                	</view>
                	<view style="text-align: center;" @click="goto('/pages/union/store/orders/list?type=3')">
                		<image src="../../../static/images/union/store/yiwancheng.png" style="width: 40rpx;height: 40rpx;"></image>
                		<view style="color: rgba(51, 51, 51, 1);font-size: 26rpx;padding: 10rpx 0 30rpx 0;">已完成</view>
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
				showSuccessModel: false,
                detail: {},
				rage: 5,
				promiseMoney: {},
				serviceMoney: {},
                showPopup: false,
                checkCode: ''
			}
		},
		async mounted (){
            const userInfo = await uni.unionRequest('swoft/api/user/getUserInfo', {
                id: uni.getStorageSync('userInfo').id
            })
            uni.setStorageSync('userInfo', userInfo.data);
            this.detail = userInfo.data.shop_info;
		},
		methods: {
            scan (){
                const that = this;
                uni.scanCode({
                    scanType: ['qrCode'],
                    success (res){
                        that.checkCode = res.result;
                    },
                })
            },
			goback (){
				uni.switchTab({
					url: '/pages/my/index'
				})
			},
			async submit (){
                const that = this;
				if(!that.checkCode){
                    uni.showToast({
                        title: '无效订单',
                        icon: 'error'
                    })
                    return;
                }
                uni.showLoading({
                    title: '核销中'
                })
                const res = await uni.unionRequest('swoft/api/order/changeOrderGoods', {
                    id: that.checkCode
                })
                uni.hideLoading();
                if(res.code == 0){
                    uni.showToast({
                        title: '核销成功',
                        icon: 'success'
                    })
                }else{
                    uni.showToast({
                        title: res.msg,
                        icon: 'error'
                    })
                }
			},
			goto (url){
				uni.navigateTo({
					url
				})
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