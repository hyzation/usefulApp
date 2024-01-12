<template>
	<gui-page :isLoading="pageLoading" :customHeader="true" ref="guiPage">
		<view slot="gHeader">
			<view class="header">
				<view class="left" @click="goback">
					<uni-icons type="back" size="24" color="#333333"></uni-icons>
				</view>
				<view class="title">商品详情</view>
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
				<!-- <view class="swiperCtrl">
					<view class="item" v-for="(item, index) in 3" :key="item" :class="{ current: currentSwiper === index }"></view>
				</view> -->
				<view class="goodsTitle">{{ goods.name }}</view>
				<view class="goodsNum">
					<view class="saledNum">已售{{ goods.sale_num }}</view>
					<union-price :price="goods.price" :equityNum="goods.equity_num" />
				</view>
			</view>
			
			<view class="storeInfo">
				<image class="cover" :src="shopInfo.logo"></image>
				<view class="info">
					<view class="shopName">{{ shopInfo.name }}</view>
					<view class="shopNum">商品数量：{{ shopInfo.product_num }}</view>
				</view>
				<view class="btn" @click="gotoShop">进店逛逛</view>
			</view>
			
			<view class="detail">
				<view class="detailHead">商品详情</view>
				<view class="detailContent" style="width: calc(100% - 40rpx);margin: 0 auto;">
                    <image style="width: 100%" :src="goods.content" mode="widthFix"></image>
                </view>
			</view>
			<view class="bottomSpace">底部占位符</view>
			
			
			<view class="buy">
				<view class="icon">
					<view class="item" @click="share">
						<image src="../../../../static/images/union/share.png" mode=""></image>
						<view>分享</view>
					</view>
					<view class="item" @click="goCar">
						<image src="../../../../static/images/union/car.png" mode=""></image>
						<view>购物车</view>
					</view>
					<!-- <view class="item" @click="kefu">
						<image src="../../../static/images/union/service.png" mode=""></image>
						<view>客服</view>
					</view> -->
				</view>
				<view class="btn">
					<view class="left" @click="popup(0)">加入购物车</view>
					<view class="right" @click="popup(1)">立即购买</view>
				</view>
			</view>
		
			<union-popup v-model="showPopup" :buttonText="popupButtonText" @submit="poppupSubmit">
				<view class="popup-goods">
					<image :src="goods.image"></image>
					<view class="info">
						<union-price :price="goods.price" />
						<view class="name">{{ goods.name }}</view>
					</view>
				</view>
				<view class="dosome">
					<view class="text">购买数量</view>
					<view class="ctrl">
						<view class="minus" @click="ctrlClick(-1)"></view>
						<view class="num">{{ ctrlNum }}</view>
						<view class="add" @click="ctrlClick(1)"></view>
					</view>
				</view>
			</union-popup>
			<gui-popup ref="guipopupHb" bgColor="rgba(0,0,0,0.85)" :zIndex="99" width="600rpx">
				<canvas style="width:600rpx;height:870rpx;">
					<gui-image :src="path" :width="600" :height="870" borderRadius="20rpx"></gui-image>
				</canvas>
				<view class="gui-flex gui-align-items-center gui-justify-content-center mt40">
					<view class="hBtn bgFFFFFF f28 fm" @tap="$refs.guipopupHb.close()">取消</view>
					<view class="hBtn bgFF4F00 f28 fm cFFFFFF" @tap="saveImage">保存图片</view>
				</view>
			</gui-popup>
			<l-painter ref="painter" type="2d" class="lime-painter" isCanvasToTempFilePath @success="path = $event" css="width:1200rpx;height:1740rpx;background:#FFFFFF;border-radius:40rpx;">
				<l-painter-image :src="goods.image" css="width:1200rpx;height:1200rpx;border-radius:40rpx 40rpx 0 0;" />
				<l-painter-view css="margin:80rpx 0;display:flex;justify-content:center;align-items:center;height:146rpx;">
					<l-painter-text :text="goods.name" css="display:inline-block;width:600rpx;color:#000000;font-size:52rpx;line-height:72rpx;line-clamp:2;" />
					<l-painter-view css="border-left:1px solid #999999;height:120rpx;margin:15rpx 60rpx 15rpx 80rpx;display:inline-block;"></l-painter-view>
					<l-painter-view css="display:inline-block;">
						<l-painter-view>
							<l-painter-text text="有用专享价" css="color:#FF4F00;font-size:45rpx;height:73rpx;line-height:73rpx;display:inline-block;margin-left:14rpx;" />
						</l-painter-view>
						<l-painter-view>
							<l-painter-text :text="'￥'+goods.price" css="color:#FF4F00;font-size:80rpx;height:73rpx;line-height:73rpx;display:inline-block;" />
						</l-painter-view>
					</l-painter-view>
				</l-painter-view>
				<l-painter-view css="margin:0 80rpx;display:flex;justify-content:center;height:160rpx;">
					<l-painter-image :src="userCode" css="width:160rpx;height:160rpx;" />
					<l-painter-view css="width:450rpx;display:inline-block;margin-left:36rpx;">
						<l-painter-view css="margin-top:4rpx;">
							<l-painter-text text="① 保存图片到相册" css="color:#999999;font-size:44rpx;" />
						</l-painter-view>
						<l-painter-view css="margin-top:30rpx;">
							<l-painter-text text="② 扫码下载有用APP" css="color:#999999;font-size:44rpx;" />
						</l-painter-view>
					</l-painter-view>
					<l-painter-image :src="logo" css="width:160rpx;height:160rpx;margin-left:230rpx;display:inline-block;" />
				</l-painter-view>
			</l-painter>
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
		async onShow (){
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
            gotoShop (){
                const that = this;
                uni.navigateTo({
                    url: '/pages/union/online/shop/detail?id='+that.shopInfo.id
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
				this.$refs.guipopupHb.open();
			},
			goCar (){
				uni.navigateTo({
					url: '/pages/union/online/car'
				})
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
						url: '/pages/union/online/orders/create'
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
		.goodsTitle{
			font-size: 30rpx;
			color: #333333;
			margin-top: 30rpx;
			padding: 0 20rpx;
		}
		.goodsNum{
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 20rpx 30rpx 20rpx;
			.saledNum{
				color: #999999;
				font-size: 20rpx;
			}
			.price{
				color: #FF5E29;
				font-size: 40rpx;
				text{
					font-size: 21rpx;
				}
			}
		}
	}
	.storeInfo{
		margin-top: 20rpx;
		background: #ffffff;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx;
		.cover{
			width: 110rpx;
			height: 110rpx;
			border-radius: 10rpx;
		}
		.info{
			width: 450rpx;
			.shopName{
				color: #333333;
				font-size: 28rpx;
			}
			.shopNum{
				color: #999999;
				font-size: 24rpx;
				margin-top: 10rpx;
			}
		}
		.btn{
			width: 120rpx;
			height: 48rpx;
			text-align: center;
			line-height: 48rpx;
			font-size: 23rpx;
			color: #FFFAFA;
			border-radius: 10rpx;
			background: #FF5E29;
		}
	}
	.detail{
		width: 710rpx;
		margin: 20rpx;
		.detailHead{
			height: 80rpx;
			background: linear-gradient(to bottom, #FFE7D4 0%, rgba(255,255,255,0) 100%);
			border-radius: 17rpx;
			font-size: 30rpx;
			color: #333333;
			line-height: 80rpx;
			padding: 0 30rpx;
		}
		.detailContent{
			overflow-x: hidden;
			overflow-y: auto;
		}
	}
	.bottomSpace{
		width: 100%;
		height: 120rpx;
		background: red;
		opacity: 0;
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
