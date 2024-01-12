<template>
	<gui-page :isLoading="pageLoading" ref="guiPage">
		<view slot="gBody">
			<view class="fullPage gui-flex gui-justify-content-center gui-align-items-center fm" v-if="isEmpty" style="margin-top:-100rpx;"><gui-image src="../../../static/images/noData.png" :width="396" :height="226" :timer="0"></gui-image></view>
			<block v-if="!isEmpty && goods">
				<view class="bgFFFFFF fm">
					<gui-image :width="750" :src="goods.mainPic"></gui-image>
					<view class="plr30 mt30 gui-flex gui-align-items-center gui-space-between">
						<view class="gui-flex gui-align-items-end">
							<text class="fb f30 cDC261F" style="height:45rpx;line-height:55rpx;">￥</text>
							<text class="fb f45 lh45 cDC261F">{{goods.actualPrice}}</text>
							<text class="f26 fm ml10 c999999" v-if="goods.couponPrice > 0">到手价</text>
						</view>
						<view class="gui-flex gui-align-items-center">
							<text class="f24 fm ml10 c999999">已售：{{goods.monthSales >= 10000 ? Math.round(goods.monthSales/10000,1)+'万+' : goods.monthSales}}</text>
						</view>
					</view>
					<view v-if="goods.couponPrice > 0" class="plr30 mt20 gui-flex gui-align-items-center gui-space-between">
						<text class="f26 fm ml10 gui-line-through c999999">价格￥{{goods.originalPrice}}</text>
					</view>
					<view class="mt20 plr30 fb f28">{{goods.title}}</view>
					<view class="mt20 plr30 fm f24 c999999 pb20">{{goods.desc}}</view>
				</view>
				<view v-if="goods.couponPrice > 0" class="pl30 pr30 bgFF4F00 m20 gui-flex gui-align-items-center gui-space-between" style="border-radius:45rpx;height:90rpx;">
					<view class="gui-flex gui-align-items-center">
						<text class="f40 lh30 fb cFFFFFF">￥{{goods.couponPrice}}</text>
						<text class="f28 lh30 fm cFFFFFF ml30">专享优惠券</text>
					</view>
					<view @tap="doTuiUrl" class="gui-flex gui-align-items-center gui-justify-content-end">
						<text class="f30 lh30 fb cFFFFFF">立即领券</text>
						<text class="f36 lh30 cFFFFFF gui-icons">&#xe601;</text>
					</view>
				</view>
				<view class="p30 bgFFFFFF gui-text-center c231815 f30 fb mt20">商品详情</view>
				<view class="bgFFFFFF">
					<block v-for="(item,index) in goods.imgsList" :key="index">
						<gui-image :width="750" :src="item"></gui-image>
					</block>
				</view>
				<view style="height:150rpx;"></view>
				<view class="wp100 ptb20 mt20 gui-fixed-rb bgFFFFFF">
					<button @tap="doTuiUrl" class="btns f30 fb" hover-class="">下单返{{goods.money}}元</button>
				</view>
			</block>
		</view>
	</gui-page>
</template>
<script>
var _this;
export default {
	data() {
		return {
			pageLoading: false,
			isEmpty: false,
			id: '',
			goods: null,
			bannerList: []
		}
	},
	filters: {
		numFilter (value) {
			return parseFloat(value).toFixed(2);
		}
	},
	onLoad: function(e){
		_this = this;
		_this.id = e.id;
		_this.getDetail();
	},
	onShow: function(){

	},
	onReady: function(){

	},
	methods: {
		getDetail: function(){
			let uid = uni.getStorageSync('userInfo').id;
			if(!uni.gRequest.checkLogin()){
				uid = 0;
			}
			_this.pageLoading = true;
			uni.gRequest.post(
				'swoft/api/taobao/getTaobaoGoodsDetail',
				{
					data: {
						id: _this.id,
						uid: uid
					}
				}, 
				(res) => {
					if(res.code == 20000){
						_this.goods = res.data;
						_this.goods.imgsList = _this.goods.imgs.split(',');
					}else{
						_this.isEmpty = true;
					}
				},
				(error) => {
					_this.$refs.guiPage.openMessage('default','请求错误',true,1500);
				},
				(res) => {
					_this.pageLoading = false;
					if(res.data.code == 3){
						_this.$refs.guiPage.openMessage('default','请重新登录',true,1500);
						setTimeout(function(){
							uni.gRequest.gotoLogin();
						},1500);
					}
				},
				true,
				true
			);
		},
		doTuiUrl: function(){
			let uid = uni.getStorageSync('userInfo').id;
			if(!uni.gRequest.checkLogin()){
				uid = 0;
			}
			_this.pageLoading = true;
			uni.gRequest.post(
				'swoft/api/taobao/getTaobaoGoodsLink',
				{
					data: {
						goodsId: _this.goods.goodsId,
						channelId: uni.getStorageSync('userInfo').relationId
					}
				}, 
				(res) => {
					if(res.code == 20000){
						// #ifdef APP-PLUS
						if(plus.runtime.isApplicationExist({  
						    pname: 'com.taobao.taobao',  
						    action: 'taobao://'
						})){
							plus.runtime.openURL(
								res.data.couponClickUrl,
								function(res){
									console.log(res);
								},
								'com.taobao.taobao'
							);
						}else{
							uni.navigateTo({
								url: `/pages/home/web?url=${encodeURIComponent(res.data.couponClickUrl)}`
							})
						}
						// #endif
						// #ifdef H5
						window.location.href = res.data.couponClickUrl;
						// #endif
					}else{
						_this.$refs.guiPage.openMessage('default',res.msg,true,1500);
					}
				},
				(error) => {
					_this.$refs.guiPage.openMessage('default','请求错误',true,1500);
				},
				(res) => {
					_this.pageLoading = false;
					if(res.data.code == 3){
						_this.$refs.guiPage.openMessage('default','请重新登录',true,1500);
						setTimeout(function(){
							uni.gRequest.gotoLogin();
						},1500);
					}
				},
				true,
				true
			);
		}
	}
}
</script>
<style>
	page{background-color:#F5F5F9;}
	.gui-footer-large-buttons{ border-radius: 50rpx; margin-right: 0; overflow: hidden;}
	.speclist{display:flex;flex-wrap:wrap;}
	.specli{padding:10rpx 20rpx;min-width:90rpx;background-color:#E5E5E5;border-radius:8rpx;font-size:26rpx;margin:0 20rpx 20rpx 0;color:#666666;text-align:center;}
	.specli000000{border-color:#000000;background-color:#000000;color:#FFFFFF;}
	.specliF9DB3B{border-color:#F9DB3B;background-color:#F9DB3B;color:#FFFFFF;}
	.h120{height:120rpx;}
	.footImg{width:30rpx;height:30rpx;}
	.w100{width:100rpx;}
	.btn1{width:180rpx;height:70rpx;line-height:70rpx;text-align:center;border-radius:35rpx 0 0 35rpx;background-image:linear-gradient(to right,#FF9502,#FFC900);}
	.btn2{width:180rpx;height:70rpx;line-height:70rpx;text-align:center;border-radius:0 35rpx 35rpx 0;background-image:linear-gradient(to right,#FF7600,#FF4F00);}
	.btn3{width:360rpx;height:70rpx;line-height:70rpx;text-align:center;border-radius:35rpx;background-image:linear-gradient(to right,#FF7600,#FF4F00);}
	.shopCartNum{height:28rpx;line-height:28rpx;border-radius:15rpx;padding:0 9rpx;display:inline-block;position:absolute;top:-10rpx;left:60rpx;z-index:99;}
	.product-attr{width:690rpx;max-height:750rpx;margin:30rpx 0;}
	.speclist{display:flex;flex-wrap:wrap;}
	.specli{padding:10rpx 20rpx;min-width:90rpx;background-color:#F6F6F6;border-radius:8rpx;font-size:26rpx;margin:0 20rpx 20rpx 0;color:#000000;text-align:center;border:thin solid #F6F6F6;}
	.speclied{border-color:#FF4F00;background-color:#FDF9FA;color:#FF4F00;}
	.sure{height:90rpx;border-radius:45rpx;text-align:center;line-height:90rpx;color:#FFFFFF;font-size:30rpx;margin-top:40rpx;}
	.lime-painter{position:fixed;left:2000rpx;}
	.h5Desc{text-align:center;font-size:28rpx;color:#FFFFFF;margin-top:100rpx;}
	.btns{width:690rpx;height:90rpx;background: #ff4f00;border-radius: 45rpx;text-align: center;line-height: 90rpx;color: #fff;margin:0 auto;}
</style>