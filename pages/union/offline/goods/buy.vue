<template>
    <gui-page :customHeader="true" ref="guiPage">
        <view slot="gHeader">
        	<view style="background: #FF612A;display: flex;justify-content: space-between;align-items: center;height: 90rpx;color: #FFFFFF;">
        		<view @click="goback" style="width: 10rpx;margin-left: 20rpx;">
        			<uni-icons type="back" size="24" color="#ffffff"></uni-icons>
        		</view>
        		<view>提交订单</view>
        		<view style="width: 10rpx;"></view>
        	</view>
        </view>
        
        <view slot="gBody">
            <view style="width: 750rpx;height: 300rpx;background: linear-gradient(180deg, #FF612A 30%, #f5f5f5 100%);  ">
                <view style="width: 660rpx;background: #ffffff;border-radius: 10rpx;margin: 0 auto;padding: 30rpx 20rpx;position: relative;top: 20rpx;display: flex;justify-content: flex-start;align-items: center;">
                    <image :src="data.image" style="width: 100rpx;height: 100rpx;border-radius: 10rpx;"></image>
                    <view style="width: 540rpx;margin-left: 20rpx;">
                        <view style="color: #333333;font-size: 30rpx;">{{ data.name }}</view>
                        <union-price :price="data.price" size="34" style="margin-top: 20rpx;"></union-price>
                    </view>
                    <view style="position: absolute;display: flex;justify-content: center;align-items: center;bottom: 30rpx;right: 20rpx;">
                        <image @click="minus" src="../../../../static/images/union/miuns.png" style="width: 35rpx;height: 35rpx;"></image>
                        <view style="color: #333333;font-size: 30rpx;padding: 0 20rpx;">{{ num }}</view>
                        <image @click="num++" src="../../../../static/images/union/add.png" style="width: 35rpx;height: 35rpx;"></image>
                    </view>
                </view>
                <view style="background: #ffffff;width: 660rpx;padding: 30rpx 20rpx;display: flex;justify-content: space-between;align-items: center;margin: 40rpx auto;border-radius: 10rpx;font-size: 28rpx;">
                    <view>支付方式</view>
                    <view style="color: #666666;">余额支付</view>
                </view>
            </view>
            <view style="background: #ffffff;position: fixed;bottom: 0;left: 0;width: 100vw;height: 100rpx;display: flex;justify-content: space-between;align-items: center;">
                <view style="display: flex;justify-content: flex-start;align-items: flex-start;margin-left: 30rpx;">
                    <view style="color: #FF5E29;font-size: 32rpx;">合计</view>
                    <union-price :price="totalPrice" size="40" style="margin-left: 10rpx;"></union-price>
                </view>
                <view @click="submit" style="color: #FBFBFB;font-size: 26rpx;padding: 14rpx 30rpx;border-radius: 50rpx;background: linear-gradient(#ff340f, #ff8914);margin-right: 30rpx;">立即支付</view>
            </view>
        </view>
	</gui-page>
</template>

<script>
    export default {
    	data() {
    		return {
                data: {},
                num: 1
    		};
    	},
        computed: {
            totalPrice (){
                return this.data.price * this.num;
            }
        },
    	async mounted (){
            this.data = uni.getStorageSync('offline_buy_data');
    	},
    	methods: {
            minus (){
                if(this.num == 1) return
                this.num--;
            },
    		goback (){
    			uni.navigateBack();
    		},
            async submit (){
                uni.showLoading({
                    title: '加载中'
                })
                const that = this;
                const res = await uni.unionRequest('swoft/api/orderAlliance/create', {
                    uid: uni.getStorageSync('userInfo').id,
                    orderType: 'LM',
                    num: that.num,
                    realPrice: that.totalPrice,
                    totalPrice: that.totalPrice,
                    payMoney: that.totalPrice,
                    payType: 4,
                    cashCouponMoney: 0,
                    couponsMoney: 0,
                    userCouponsId: 0,
                    is_online: 2,
                    goods: JSON.stringify([{
                        shopId: that.data.shop_id,
                        uid: uni.getStorageSync('userInfo').id,
                        orderType: 'LM',
                        realPrice: that.totalPrice,
                        totalPrice: that.totalPrice,
                        payMoney: that.totalPrice,
                        payType: 4,
                        is_online: 2,
                        cashCouponMoney: 0,
                        couponsMoney: 0,
                        userCouponsId: 0,
                        num: that.num,
                        goods: [{
                            goodsId: that.data.id,
                            goodsName: that.data.name,
                            goodsImg: 0,
                            price: that.data.price,
                            num: that.num,
                            cashCouponMoney: 0,
                            couponsMoney: 0,
                            userCouponsId: 0,
                        }]
                    }])
                })
                uni.hideLoading();
                if(res.code == 0){
                    uni.showToast({
                        title: '支付成功',
                        icon: 'success'
                    })
                    setTimeout(() => {
                        uni.navigateTo({
                            url: '/pages/union/offline/orders/list'
                        })
                    }, 2000)
                }else{
                    uni.showToast({
                        title: res.msg,
                        icon: 'error'
                    })
                }
            }
        }
    }
</script>

<style>
    page{
        background: #F5F5F5;
    }
</style>