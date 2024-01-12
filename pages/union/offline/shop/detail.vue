<template>
	<gui-page :isLoading="pageLoading" :customHeader="true" ref="guiPage">
		<view slot="gHeader">
			<view class="header">
				<view class="left" @click="goback" style="width: 200rpx;">
					<uni-icons type="back" size="24" color="#333333"></uni-icons>
				</view>
				<view class="title">商家详情</view>
				<view class="right" style="font-size: 24rpx;width: 200rpx;text-align: right;" @click="payment">付款给商家</view>
			</view>
		</view>
		
		<view slot="gBody">
			<view style="width: 700rpx;padding: 25rpx;background: #ffffff;display: flex;justify-content: flex-start;align-items: center;">
                <image :src="detail.logo" style="width: 170rpx;height: 170rpx;border-radius: 16rpx;"></image>
                <view style="margin-left: 20rpx;width: 510rpx;">
                    <view style="color: #333333;font-size: 31rpx;">{{ detail.name }}</view>
                    <view style="color: #333333;font-size: 28rpx;display: flex;justify-content: flex-start;align-items: center;margin-top: 15rpx;">
                        {{ detail.province }}{{ detail.city }}{{ detail.district }}{{ detail.address }}
                    </view>
                    <view style="color: #333333;font-size: 28rpx;display: flex;justify-content: flex-start;align-items: center;margin-top: 15rpx;">
                        {{ detail.mobile }}
                    </view>
                </view>
            </view>
            
            <view style="padding: 25rpx;color: #333333;font-size: 31rpx;">推荐产品</view>
            
            <union-empty v-if="goodsList.length == 0" style="margin-top: 200rpx;"></union-empty>
            <view @click="gotoBuy(item)" :style="{ borderTop: index > 0 ? '1rpx solid #f5f5f5' : 'none' }" v-for="(item, index) in goodsList" :key="index"  style="background: #ffffff;padding: 25rpx;display: flex;justify-content: flex-start;align-items: center;position: relative;">
                <image :src="item.image" style="width: 100rpx;height: 100rpx;border-radius: 10rpx;"></image>
                <view style="margin-left: 20rpx;width: 580rpx;">
                    <view style="color: #333333;font-size: 28rpx;">{{ item.name }}</view>
                    <view style="color: #999999;font-size: 22rpx;margin-top: 5rpx;">已售{{ item.sale_num }}</view>
                    <union-price size="24" :price="item.price" style="margin-top: 5rpx;"></union-price>
                </view>
                <view style="position: absolute;bottom:30rpx;right:50rpx;background: #FF612A;border-radius: 50rpx;color: #FFFAFA;font-size: 24rpx;width: 100rpx;height: 50rpx;text-align: center;line-height: 50rpx;">抢购</view>
            </view>
		</view>
	</gui-page>
</template>

<script>
	export default {
		data() {
			return {
				pageLoading: false,
                shopId: '' ,
                detail: {},
                goodsList: []
			};
		},
		onLoad (options){
			this.shopId = options.id;
		},
		async mounted (){
			const that = this;
            that.pageLoading = true;
            
			that.userCode = uni.getStorageSync('userInfo').inviteCode;
			const detail = await uni.unionRequest('swoft/api/shop/shopInfo', {
				id: that.shopId
			})
            that.detail = detail.data;
            that.goodsList = detail.data.recommend_products.lists;
            that.pageLoading = false;
		},
		methods: {
            payment (){
                uni.navigateTo({
                    url: '/pages/union/offline/shop/pay?id='+this.shopId
                })
            },
			goback (){
				uni.navigateBack()
			},
            gotoBuy (item){
                uni.navigateTo({
                    url: '/pages/union/offline/goods/detail?id='+item.id
                })
            }
		}
	}
</script>

<style lang="scss">
.lime-painter{position:fixed;left:2000rpx;}
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
			width: 80rpx;
			padding-left: 20rpx;
		}
		.title{
			text-align: center;
			color: #333333;
			font-size: 33rpx;
		}
		.right{
			width: 80rpx;
			padding-right: 20rpx;
		}
	}
}
</style>
