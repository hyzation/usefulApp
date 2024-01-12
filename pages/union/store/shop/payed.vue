<template>
	<gui-page :isLoading="pageLoading" :customHeader="true" ref="guiPage">
		<view slot="gHeader">
			<view class="header">
				<view class="left" @click="goback">
					<uni-icons type="back" size="24" color="#333333"></uni-icons>
				</view>
				<view class="title">保证金/服务费</view>
				<view class="right"></view>
			</view>
		</view>
		
		<view slot="gBody">
			<view v-for="(item,index) in promiseMoney" :key="item.id" style="width: 690rpx;padding: 30rpx 20rpx;margin: 20rpx auto;background: #ffffff;border-radius: 10rpx;display: flex;justify-content: space-between;align-items: center;">
                <view>
                    <view style="color: #FF5E29;">
                        <text style="font-size: 26rpx;">￥</text>
                        <text style="font-size: 54rpx;font-weight: bold;">{{ item.deposit_num }}</text>
                    </view>
                    <view style="font-size: 22rpx;color: #333333;">保证金金额</view>
                </view>
                <!-- <view style="color: #FF5E29;font-size: 26rpx;padding: 5rpx 10rpx;border: 1rpx solid #FF5E29;border-radius: 10rpx;">申请退费</view> -->
            </view>
			<view style="width: 690rpx;padding: 30rpx 20rpx;margin: 20rpx auto;background: #ffffff;border-radius: 10rpx;display: flex;justify-content: space-between;align-items: center;">
                <view>
                    <view style="color: #FF5E29;">
                        <text style="font-size: 54rpx;font-weight: bold;">{{ managefee_persent }}%</text>
                    </view>
                    <view style="font-size: 22rpx;color: #333333;">技术服务费</view>
                </view>
                <view style="color: #999999;font-size: 26rpx;">每笔订单成交额的{{ managefee_persent }}%</view>
            </view>
			<view v-for="(item,index) in serviceMoney" :key="item.id" style="width: 690rpx;padding: 30rpx 20rpx;margin: 20rpx auto;background: #ffffff;border-radius: 10rpx;display: flex;justify-content: space-between;align-items: center;">
                <view>
                    <view style="color: #FF5E29;">
                        <text style="font-size: 26rpx;">￥</text>
                        <text style="font-size: 54rpx;font-weight: bold;">{{ item.managefee_num }}</text>
                    </view>
                    <view style="font-size: 22rpx;color: #333333;">管理服务费</view>
                </view>
                <!-- <view style="color: #FF5E29;font-size: 26rpx;padding: 5rpx 10rpx;border: 1rpx solid #FF5E29;border-radius: 10rpx;">申请退费</view> -->
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
				promiseMoney: [],
				serviceMoney: [],
                managefee_persent: ''
			}
		},
		async mounted (){
            const shop_id = uni.getStorageSync('userInfo').shop_info.id;
            const promiseMoney = await uni.unionRequest('swoft/api/shop/depositList', { shop_id });
            this.promiseMoney = promiseMoney.data.list;
            const serviceMoney = await uni.unionRequest('swoft/api/shop/managefeeList', { shop_id });
            this.serviceMoney = serviceMoney.data.list;
            this.managefee_persent = Number(uni.getStorageSync('userInfo').shop_info.managefee_persent).toFixed(2);
		},
		methods: {
			goback (){
				uni.navigateTo({
				    url: '/pages/union/store/index'
				})
			},
			async submit (){
				console.log(this.promiseMoney)
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