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
			<view class="orderItem">
				<view class="goodsItem" v-for="goods in data.child" :key="goods.id">
					<image class="cover" :src="goods.goodsImage || ''" mode="aspectFill"></image>
					<view class="info">
						<view class="title">{{ goods.goodsName }}</view>
						<view class="unit">规格：默认</view>
						<view class="bottom" style="margin-top: 50rpx;">
							<union-price :price="goods.price" color="#333333" />
							<view class="num">x{{ goods.num }}</view>
						</view>
					</view>
				</view>
			</view>
            <view style="width: 670rpx;padding: 20rpx;background: #ffffff;border-radius: 10rpx;margin: 20rpx auto;">
                <view style="display: flex;justify-content: space-between;align-items: center;padding: 20rpx 0;">
                    <view style="color: #333333;font-size: 28rpx;">订单状态</view>
                    <view style="color: #999999;font-size: 28rpx;">{{ data.statusText }}</view>
                </view>
                <view style="display: flex;justify-content: space-between;align-items: center;padding: 20rpx 0;">
                    <view style="color: #333333;font-size: 28rpx;">实付金额</view>
                    <view style="color: #999999;font-size: 32rpx;"><text style="font-size: 24rpx;">￥</text>{{ data.totalPrice }}</view>
                </view>
            </view>
            <view v-if="data.status == 2" style="width: 670rpx;padding: 20rpx;background: #ffffff;border-radius: 10rpx;margin: 20rpx auto;">
                <canvas canvas-id="canvas" id="canvas" style="width:120px;height:120px;margin: 30rpx auto 0 auto;"></canvas>
                <view style="color: #333333;font-size: 28rpx;text-align: center;padding: 20rpx 0;">{{ data.id }}</view>
            </view>
            <view style="width: 670rpx;padding: 20rpx;background: #ffffff;border-radius: 10rpx;margin: 20rpx auto;">
                <view style="color: #333333;font-size: 30rpx;padding: 20rpx 0;">订单信息</view>
                <view style="display: flex;justify-content: space-between;align-items: center;padding: 20rpx 0;">
                    <view style="color: #333333;font-size: 28rpx;">支付方式</view>
                    <view style="color: #999999;font-size: 28rpx;">余额支付</view>
                </view>
                <view style="display: flex;justify-content: space-between;align-items: center;padding: 20rpx 0;">
                    <view style="color: #333333;font-size: 28rpx;">订单编号</view>
                    <view style="color: #999999;font-size: 28rpx;">{{ data.orderNum }}</view>
                </view>
            </view>
		</view>
	</gui-page>
</template>
<script>
    var QRCode = require('@/GraceUI5/js/qrcode.js');
	export default {
		data() {
			return {
				pageLoading: false,
                data: {},
                qrcode: null,
                qrcodeBgColor: '#FFFFFF',
                qrcodeColor: '#000000',
                qrcodeId: 'canvas'
			}
		},
		async mounted (){
            const that = this;
            that.pageLoading = true;
            that.data = uni.getStorageSync('offline_orders_detail');
            setTimeout(() => {
                that.qrcode = new QRCode(that.qrcodeId, {
                    text: that.data.id,
                    width: '120',
                    height: '120',
                    colorDark: that.qrcodeColor,
                    colorLight: that.qrcodeBgColor,
                    correctLevel: QRCode.CorrectLevel.H
                });
                that.pageLoading = false;
            }, 500)
		},
		methods: {
			goback (){
				uni.navigateTo({
				    url: '/pages/union/offline/orders/list'
				})
			},
		}
	}
</script>
<style lang="scss">
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
		
		.orderItem{
			width: 710rpx;
			height: auto;
			margin: 20rpx;
			background: #ffffff;
			border-radius: 20rpx;
			overflow: hidden;
			.head{
				height: 60rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 10rpx 20rpx;
				font-size: 24rpx;
				.orderId{
					color: #333333;
				}
				.orderStatus{
					color: #FF5E29;
				}
			}
			.goodsItem{
				padding: 20rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.cover{
					width: 180rpx;
					height: 180rpx;
					border-radius: 10rpx;
				}
				.info{
					width: 480rpx;
					height: 180rpx;
					display: flex;
					justify-content: flex-start;
					align-content: space-between;
					flex-wrap: wrap;
					.title{
						width: 480rpx;
						font-size: 30rpx;
						color: #333333;
						line-height: 40rpx;
					}
					.unit{
						color: #999999;
						font-size: 24rpx;
					}
					.bottom{
						width: 480rpx;
						display: flex;
						justify-content: space-between;
						align-items: center;
						.price{
							color: #333333;
							font-size: 38rpx;
							font-weight: bold;
							text{
								font-size: 20rpx;
							}
						}
						.num{
							color: #333333;
							font-size: 30rpx;
						}
					}
				}
			}
			.foot{
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 20rpx;
				.total{
					display: flex;
					justify-content: flex-start;
					align-items: center;
					font-size: 26rpx;
					view:nth-child(1){
						color: #999999;
					}
					view:nth-child(2){
						color: #333333;
						margin-left: 10rpx;
						text{
							font-size: 18rpx;
						}
					}
				}
				.button{
					display: flex;
					justify-content: flex-end;
					align-items: center;
					view{
						width: 130rpx;
						height: 50rpx;
						text-align: center;
						line-height: 50rpx;
						border-radius: 30rpx;
						font-size: 22rpx;
						margin-left: 16rpx;
					}
					view.normal{
						color: #333333;
						border: 1rpx solid #b8b8b8;
					}
					view.confirm{
						color: #FF5E29;
						border: 1rpx solid #ff7755;
					}
				}
				.error{
					font-size: 26rpx;
					color: #FF5E29;
				}
			}
		}
	}
</style>