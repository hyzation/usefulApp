<template>
	<gui-page :isLoading="pageLoading" :customHeader="true" ref="guiPage">
		<view slot="gHeader">
			<view class="header">
				<view class="left" @click="goback">
					<uni-icons type="back" size="24" color="#333333"></uni-icons>
				</view>
				<view class="title">付款给商家</view>
				<view class="right"></view>
			</view>
		</view>
		
		<view slot="gBody">
            <view class="card">
                <view class="item">
                	<view class="k">金额</view>
                	<view class="v input">
                		<input placeholder-class="phcolor" v-model="money" placeholder="请输入金额" />
                	</view>
                </view>
            </view>
			<view class="submit" @click="submit">支付</view>
		</view>
	</gui-page>
</template>
<script>
	export default {
		data() {
			return {
				pageLoading: false,
                money: '',
                shopId: ''
			}
		},
        onLoad (options){
            this.shopId = options.id;
        },
		async mounted (){
            const that = this;
		},
		methods: {
			goback (){
				uni.navigateBack()
			},
			async submit (){
                const that = this;
                if(!that.money){
                    uni.showToast({
                        title: '请输入金额',
                        icon: 'none'
                    })
                    return;
                }
                const res = await uni.unionRequest('swoft/api/orderAlliance/create', {
                    uid: uni.getStorageSync('userInfo').id,
                    orderType: 'DIRECT',
                    is_online: 2,
                    num: 1,
                    totalPrice: that.money,
                    realPrice: that.money,
                    payMoney: that.money,
                    payType: 4,
                    cashCouponMoney: 0,
                    userCouponsId: 0,
                    couponsMoney: 0,
                    goods: JSON.stringify([{
                        "shopId": that.shopId,
                        "uid": 1,
                        "orderType": "DIRECT",
                        is_online: 2,
                        "num": 2,
                        "realPrice": that.money,
                        "totalPrice": that.money,
                        "payMoney": that.money,
                        "payType": 4,
                        "userCouponsId": 0,
                        "couponsMoney": 0,
                        "cashCouponMoney": 0,
                        "name": "收件人",
                        "tel": "1391552522",
                        "provinceCode": "省编码",
                        "cityCode": "市编码",
                        "countyCode": "区编码",
                        "province": "省",
                        "city": "市",
                        "county": "区",
                        "address": "详细地址",
                        "remark": "备注",
                        "goods": [{
                            "goodsId": 1,
                            "goodsName": "商品名",
                            "goodsImg": "商品图片",
                            "goodsOptionId": "商品SKU ID",
                            "goodsOptionName": "商品SKU 名字",
                            "price": that.money,
                            "num": 1,
                            "totalMvalue": 0,
                            "totalPrice": that.money,
                            "totalWeight": 0,
                            "activityType": 0,
                            "refundMoney": 0,
                            "status": 1,
                            "reStatus": 1,
                            "userCouponsId": 0,
                            "couponsMoney": 0,
                            "cashCouponMoney": 0
                        }]
                    }])
                })
                if(res.code == 0){
                    uni.showToast({
                        title: '支付成功',
                        icon: 'success'
                    })
                    setTimeout(() => {
                        uni.navigateBack();
                    }, 1500)
                }else{
                    uni.showToast({
                        title: res.msg,
                        icon: 'error'
                    })
                }
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
        .card{
        	width: 710rpx;
        	margin: 20rpx;
        	background: #ffffff;
        	border-radius: 10rpx;
        	overflow: hidden;
        	.cardHead{
        		font-size: 34rpx;
        		color: #333333;
        		padding: 20rpx;
        		font-weight: bold;
        	}
        	.item{
        		width: 670rpx;
        		padding: 30rpx 0;
        		margin: 0 auto;
        		display: flex;
        		justify-content: space-between;
        		align-items: center;
        		border-top: 1rpx solid rgba(0, 0, 0, 0.02);
        		.k{
        			color: #333333;
        			font-size: 31rpx;
        		}
        		.v{
        			width: 400rpx;
        			display: flex;
        			justify-content: flex-end;
        			align-items: center;
        		}
        		.v.selector{
        			display: flex;
        			justify-content: flex-end;
        			align-items: center;
        			color: #999999;
        			font-size: 28rpx;
        		}
        		.v.input{
        			input{
        				width: 100%;
        				height: 30rpx;
        				font-size: 28rpx;
        				color: #333333;
        				text-align: right;
        			}
        		}
        	}
        	.item.block{
        		width: 670rpx;
        		padding: 30rpx 0;
        		margin: 0 auto;
        		display: block;
        		.k{
        			width: 670rpx;
        		}
        		.v{
        			width: 670rpx;
        			display: block;
        		}
        		.v.textarea{
        			margin-top: 20rpx;
        			textarea{
        				width: 650rpx;
        				height: 100rpx;
        				font-size: 26rpx;
        				line-height: 40rpx;
        				padding: 10rpx;
        				background: rgba(0, 0, 0, 0.03);
        			}
        		}
        	}
        }
        .submit{
        	width: 665rpx;
        	height: 80rpx;
        	background: linear-gradient(90deg, #FF330F 0%, #FF8C15 100%);
        	border-radius: 41rpx;
        	color: #FBFBFB;
        	font-size: 29rpx;
        	text-align: center;
        	line-height: 80rpx;
        	margin: 30rpx auto;
        }
		
	}
</style>