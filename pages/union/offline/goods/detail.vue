<template>
	<gui-page :isLoading="pageLoading" :customHeader="true" ref="guiPage">
		<view slot="gHeader">
			<view class="header">
				<view class="left" @click="goback">
					<uni-icons type="back" size="24" color="#333333"></uni-icons>
				</view>
				<view class="title">产品详情</view>
				<view class="right"></view>
			</view>
		</view>
		
		<view slot="gBody">
			<view class="goodsSwiper">
				<swiper class="swiper" circular @change="swiperChange">
					<swiper-item >
						<image class="swiper-img" :src="goods.image" mode="scaleToFill"></image>
					</swiper-item>
				</swiper>
			</view>
            
            <view style="background: #ffffff;padding: 25rpx;position: relative;">
                <view style="color: #333333;font-size: 30rpx;">{{ goods.name }}</view>
                <union-price size="28" :price="goods.price" style="margin-top: 10rpx;" :equityNum="goods.equity_num" />
                <view style="color: #999999;font-size: 21rpx;margin-top: 5rpx;">有效期：{{ goods.start_time && goods.start_time.substr(0,10) }} - {{ goods.end_time && goods.end_time.substr(0,10) }}</view>
                <view style="color: #999999;font-size: 20rpx;position: absolute;top: 50rpx;right: 25rpx;">已售{{ goods.sale_num }}</view>
                <view @click="gotoBuy" style="width: 90rpx;height: 46rpx;border-radius: 50rpx;background: #FF5E29;color: #ffffff;text-align: center;line-height: 46rpx;font-size: 22rpx;color: #ffffff;position: absolute;top: 90rpx;right: 25rpx;">抢购</view>
            </view>
			
			<view style="background: #ffffff;padding: 25rpx;margin: 20rpx 0;display: flex;justify-content: flex-start;align-items: center;">
				<image style="width: 100rpx;height: 100rpx;border-radius: 10rpx;" :src="shopInfo.logo"></image>
				<view style="width: 580rpx;margin-left: 20rpx;">
					<view style="color: #333333;font-size: 28rpx;">{{ shopInfo.name }}</view>
					<view style="color: #999999;font-size: 24rpx;margin-top: 10rpx;">
                        {{ shopInfo.province }}{{ shopInfo.city }}{{ shopInfo.district }}{{ shopInfo.address }}
                    </view>
				</view>
			</view>
			
			<view class="detail">
				<view class="detailHead">产品详情</view>
				<view class="detailContent" style="width: calc(100% - 40rpx);margin: 0 auto;">
                    <image v-if="goods.content" style="width: 100%" :src="goods.content" mode="widthFix"></image>
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
				currentSwiper: 0,
				showPopup: false,
				popupButtonText: '',
				ctrlNum: 1,
				goodsPrice: '',
				id: '',
				goods: {},
				userCode: '',
				logo: '',
				path: '',
                shopInfo: {}
			};
		},
		onLoad (options){
			this.id = options.id || '12';
		},
		async mounted (){
			const that = this;
            that.pageLoading = true;
			that.userCode = uni.getStorageSync('userInfo').inviteCode;
			const detail = await uni.unionRequest('swoft/api/product/getDetail', {
				id: that.id
			})
			this.goods = detail.data.info;
            
            const shop = await uni.unionRequest('swoft/api/shop/shopInfo', {
                id: detail.data.info.shop_id
            })
            that.shopInfo = shop.data;
            that.pageLoading = false;
		},
		methods: {
            gotoBuy (){
                uni.setStorageSync('offline_buy_data', this.goods);
                uni.navigateTo({
                    url: '/pages/union/offline/goods/buy'
                })
            },
			goback (){
				uni.navigateBack();
			},
			swiperChange (e){
				this.currentSwiper = e.detail.current;
			},
			popup (type){
				this.popupButtonText = type === 0 ? '加入购物车' : '立即购买';
				this.showPopup = true;
			},
			ctrlClick (num){
				num += this.ctrlNum;
				if(num < 1) return;
				this.ctrlNum = num;
			},
			share (){
				// console.log('share')
				this.$refs.guipopupHb.open();
			},
			goCar (){
				uni.navigateTo({
					url: '/pages/union/car'
				})
			},
			kefu (){
				console.log('kefu')
			},
			async poppupSubmit (){
				const that = this;
				if(this.popupButtonText == '加入购物车'){
					const data = await uni.unionRequest('swoft/api/cart/addcart', {
						user_id: uni.getStorageSync('userInfo').id,
						product_id: that.id,
						goods_num: that.ctrlNum
					})
					console.log(data)
					if(data.code == 0){
						that.$refs.guiPage.openMessage('success', '添加成功', true, 1500);
					}else{
						that.$refs.guiPage.openMessage('error', data.msg, true, 1500);
					}
				}else{
                    uni.setStorageSync('readyPayGoods', [{
                        shop: {
                            shop_id: that.goods.shop_id,
                            shop_name: that.goods.shop_name,
                            type: that.goods.is_online
                        },
                        cart: [{
                            product_id: that.goods.id,
                            product_name: that.goods.name,
                            price: that.goods.price,
                            image: that.goods.image,
                            goods_num: that.ctrlNum
                        }]
                    }])
					uni.navigateTo({
						url: '/pages/union/orders/create'
					})
				}
			},
			saveImage: function(){
				const _this = this;
				_this.pageLoading = true;
				uni.saveImageToPhotosAlbum({
					filePath: _this.path,
					success(res) {
						_this.pageLoading = false;
						_this.$refs.guiPage.openMessage('success','已保存到相册',true,1500);
					},
					fail(err) {
						_this.pageLoading = false;
						_this.$refs.guiPage.openMessage('default','保存失败,请确定是否开启相应权限',true,1500);
					}
				})
			},
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
	.goodsSwiper{
		width: 750rpx;
		background: #ffffff;
		position: relative;
		.swiperCtrl{
			width: 100%;
			position: absolute;
			top: 700rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			.item{
				width: 40rpx;
				height: 6rpx;
				background: #ffffff;
				margin: 0 10rpx;
				border-radius: 5rpx;
			}
			.item.current{
				background: #FF5E29;
			}
		}
		.swiper{
			width: 750rpx;
			height: 750rpx;
			.swiper-img{
				width: 750rpx;
				height: 750rpx;
			}
		}
	}
	.detail{
		width: 710rpx;
		margin: 0 auto;
		.detailHead{
			height: 80rpx;
			background: linear-gradient(to bottom, #FFE7D4 0%, rgba(255,255,255,0) 100%);
			border-radius: 17rpx;
			font-size: 30rpx;
			color: #333333;
			line-height: 80rpx;
			padding: 0 30rpx;
		}
	}
}
</style>
