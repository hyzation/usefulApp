<template>
	<gui-page :isLoading="pageLoading" :customHeader="true" ref="guiPage">
		<view slot="gHeader">
			<view class="header">
				<view class="left" @click="goback">
					<uni-icons type="back" size="24" color="#ffffff"></uni-icons>
				</view>
				<view class="title">提交订单</view>
				<view class="right"></view>
			</view>
		</view>
		
		<view slot="gBody">
			<view class="order">
				<view class="address" v-if="defaultAddress.province">
					<image src="../../../../static/images/union/weizhi.png" mode="widthFix"></image>
					<view class="text">
						<view>{{ defaultAddress.province }}{{ defaultAddress.city }}{{ defaultAddress.county }}{{ defaultAddress.address }}</view>
						<view>
							{{ defaultAddress.name }}
							<text>{{ defaultAddress.tel }}</text>
						</view>
					</view>
					<view class="btn" style="visibility: hidden;">切换地址</view>
				</view>
				<view class="address" v-if="!defaultAddress.province" @click="gotoAddress">
					<image src="../../../../static/images/union/weizhi.png" mode="widthFix"></image>
					<view class="text">
						<view>暂无可用地址</view>
						<view>点击创建收货地址</view>
					</view>
                    <view></view>
				</view>
				
				<view v-for="item in list" :key="item.shop.shop_id" style="background: #ffffff;border-radius: 10rpx;width: 670rpx;margin: 20rpx;padding: 20rpx;">
					<view style="color: #333333;font-size: 33rpx;">{{ item.shop.shop_name }}</view>
                    <view v-for="cart in item.cart" :key="cart.cart_id" style="display: flex;justify-content: flex-start;align-items: center;margin-top: 20rpx;">
                        <image :src="cart.image" style="width: 160rpx;height: 160rpx;border-radius: 10rpx;"></image>
                        <view style="width: 590rpx;margin-left: 20rpx;">
                            <view style="color: #333333;font-size: 30rpx;">{{ cart.product_name }}</view>
                            <view style="display: flex;justify-content: space-between;align-items: center;margin-top: 40rpx;">
                                <union-price :price="cart.price"></union-price>
                                <view>x{{ cart.goods_num }}</view>
                            </view>
                        </view>
                    </view>
				</view>
				
				<view style="background: #ffffff;border-radius: 10rpx;width: 670rpx;margin: 20rpx;padding: 20rpx;">
					<view style="display: flex;justify-content: space-between;align-items: center;border-bottom: 1rpx solid #F5F5F5;padding-bottom: 20rpx;">
                        <view style="color: #333333;font-size: 28rpx;">配送方式</view>
                        <view style="color: #333333;font-size: 28rpx;">自提</view>
                    </view>
                    
                    <!-- <view style="color: #333333;font-size: 28rpx;margin-top: 20rpx;">商家地址</view>
                    <view style="display: flex;justify-content: flex-start;align-items: center;margin-top: 20rpx;border-bottom: 1rpx solid #F5F5F5;padding-bottom: 20rpx;">
                        <image src="../../../static/images/union/shop.png" style="width: 60rpx;height: 60rpx;"></image>
                        <view style="margin-left: 20rpx;">
                            <view style="color: #333333;font-size: 30rpx;">苏州吴中区木渎镇金枫路111号</view>
                            <view style="color: #999999;font-size: 26rpx;margin-top: 10rpx;">商家联系人 13456781234</view>
                        </view>
                    </view> -->
                    
                    <view style="color: #333333;font-size: 28rpx;margin-top: 20rpx;">备注</view>
                    <input v-model="remark" style="color: #999999;width: 100%;margin-top: 20rpx;font-size: 26rpx;" placeholder="选填,给商家留言"></input>
				</view>
                
				<view style="background: #ffffff;border-radius: 10rpx;width: 670rpx;margin: 20rpx;padding: 30rpx 20rpx;display: flex;justify-content: space-between;align-items: center;">
					<view style="color: #333333;font-size: 28rpx;">支付方式</view>
                    <view style="color: #333333;font-size: 28rpx;">余额支付</view>
				</view>
				
			</view>
			
			<view class="bottomSpace"></view>
			<view class="buy">
				<view class="icon">
					<union-price size="50" :price="totalPrice" />
				</view>
				<view class="btn">
					<view class="right" style="padding: 0 40rpx;" @click="submit">提交订单</view>
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
                list: [],
                addressList: [],
                defaultAddress: {},
                remark: ''
			}
		},
        computed: {
            totalPrice (){
                let price = 0;
                this.list.map(shop => {
                    shop.cart.map(cart => {
                        price += Number(cart.price) * Number(cart.goods_num);
                    })
                })
                return price;
            }
        },
		onLoad (options){
			this.id = options.id;
		},
		async onShow (){
            this.list = uni.getStorageSync('readyPayGoods');
            const addressList = await uni.unionRequest('swoft/api/userAddress/getUserAddressList', {
                uid: uni.getStorageSync('userInfo').id
            })
            this.addressList = addressList.data;
            this.defaultAddress = addressList.data.filter(item => item.isDefault == 1)[0] || {};
		},
		methods: {
            gotoAddress (){
                uni.navigateTo({
                    url: '/pages/my/setting/editAddress?id=0'
                })
            },
			goback (){
				uni.navigateBack();
			},
            async submit (){
                const that = this;
                uni.showLoading({
                    title: '提交中'
                })
                let goodsTotal = 0; // 商品总数
                let shopCartIds = [];
                let goodsData = uni.getStorageSync('readyPayGoods').map(item => {
                    let num = 0;
                    let price = 0;
                    let goods = item.cart.map(iii => {
                        shopCartIds.push(iii.cart_id);
                        num += Number(iii.goods_num);
                        price += Number(iii.goods_num) * Number(iii.price);
                        return {
                            goodsId: iii.product_id,
                            goodsName: iii.product_name,
                            goodsImg: '',
                            price: iii.price,
                            num: iii.goods_num
                        }
                    })
                    goodsTotal += num;
                    let data = {
                        shopId: item.shop.shop_id,
                        uid: uni.getStorageSync('userInfo').id,
                        orderType: 'LM',
                        remark: that.remark,
                        num,
                        realPrice: price,
                        totalPrice: price,
                        payMoney: price,
                        payType: 4,
                        is_online: item.shop.type,
                        userCouponsId: 0,
                        couponsMoney: 0,
                        cashCouponMoney: 0,
                        ...that.defaultAddress,
                        goods
                    }
                    return data;
                })
                let orderData = {
                    uid: uni.getStorageSync('userInfo').id,
                    orderType: 'LM',
                    num: goodsTotal,
                    realPrice: that.totalPrice,
                    totalPrice: that.totalPrice,
                    payMoney: that.totalPrice,
                    payType: 4,
                    cashCouponMoney: 0,
                    userCouponsId: 0,
                    couponsMoney: 0,
                    goods: JSON.stringify(goodsData),
                    shopCartIds: shopCartIds.toString()
                }
                const orderRes = await uni.unionRequest('swoft/api/orderAlliance/create', orderData);
                uni.hideLoading();
                if(orderRes.code == 0){
                    uni.showToast({
                        title: '提交成功',
                        icon: 'success'
                    })
                    setTimeout(() => {
                        uni.navigateTo({
                            url: '/pages/union/online/orders/list'
                        })
                    }, 2000)
                }else{
                    uni.showToast({
                        title: orderRes.msg,
                        icon: 'none'
                    })
                }
            }
		}
	}
</script>

<style lang="scss">
.lime-painter{position:fixed;left:2000rpx;}
page{
	width: 100%;
	height: 100vw;
	.header{
		width: 100vw;
		height: 90rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: #FF612A;
		.left{
			width: 80rpx;
			padding-left: 20rpx;
		}
		.title{
			text-align: center;
			color: #ffffff;
			font-size: 33rpx;
		}
		.right{
			width: 80rpx;
			padding-right: 20rpx;
		}
	}
	.order{
		height: calc(100vh - 220rpx);
		background: linear-gradient(#FF612A, rgba(255, 97, 42, 0.3), #F5F5F5, #F5F5F5, #F5F5F5) no-repeat;
		overflow-x: hidden;
		overflow-y: auto;
		.address{
			width: 650rpx;
			margin: 0 20rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			background: #ffffff;
			border-radius: 20rpx;
			padding: 30rpx;
			image{
				width: 40rpx;
			}
			.text{
				view:first-child{
					color: rgba(51, 51, 51, 1);
					font-size: 32rpx;
					width: 460rpx;
				}
				view:last-child{
					color: rgba(153, 153, 153, 1);
					font-size: 26rpx;
					margin-top: 10rpx;
					text{
						margin-left: 30rpx;
					}
				}
			}
			.btn{
				width: 110rpx;
				height: 40rpx;
				border: 1px solid #FF612A;
				border-radius: 18rpx;
				font-size: 22rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #FF5E29;
				text-align: center;
				line-height: 40rpx;
			}
		}
	}
	.bottomSpace{
		width: 100%;
		height: 120rpx;
		background: #F5F5F5;
	}
	.buy{
		width: 710rpx;
		height: 80rpx;
		padding: 10rpx 20rpx;
		background: #ffffff;
		position: fixed;
		bottom: 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.icon{
			display: flex;
			justify-content: flex-start;
			align-items: center;
			.item{
				text-align: center;
				margin: 0 20rpx;
				image{
					width: 36rpx;
					height: 36rpx;
				}
				view{
					font-size: 21rpx;
					color: #333333;
				}
			}
		}
		.btn{
			display: flex;
			justify-content: flex-end;
			align-items: center;
			border-radius: 50rpx;
			overflow: hidden;
			view{
				width: 170rpx;
				height: 70rpx;
				color: #ffffff;
				font-size: 24rpx;
				text-align: center;
				line-height: 70rpx;
			}
			.left{
				background: linear-gradient(#ffc414, #ff8d15);
			}
			.right{
				background: linear-gradient(#ff6310, #ff3410);
			}
		}
	}
	.popup-goods{
		width: 710rpx;
		margin: 30rpx auto;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		padding: 30rpx 0;
		border-bottom: 1rpx solid #F5F5F5;
		image{
			width: 110rpx;
			height: 110rpx;
			border-radius: 10rpx;
		}
		.info{
			margin-left: 20rpx;
			.name{
				color: #999999;
				font-size: 24rpx;
				margin-top: 10rpx;
			}
		}
	}
	.dosome{
		width: 710rpx;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-bottom: 300rpx;
		.text{
			color: #333333;
			font-size: 24rpx;
		}
		.ctrl{
			display: flex;
			justify-content: flex-end;
			align-items: center;
			.minus, .add{
				width: 45rpx;
				height: 45rpx;
			}
			.minus{
				background: url('../../../../static/images/union/miuns.png') no-repeat center;
				background-size: 100% 100%;
			}
			.add{
				background: url('../../../../static/images/union/add.png') no-repeat center;
				background-size: 100% 100%;
			}
			.num{
				width: 80rpx;
				text-align: center;
				font-size: 30rpx;
				color: #333333;
			}
		}
	}
}
</style>
