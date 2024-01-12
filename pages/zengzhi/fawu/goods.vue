<template>
	<gui-page :isLoading="pageLoading" ref="guiPage">
		<view slot="gBody">
			<view class="fullPage gui-flex gui-justify-content-center gui-align-items-center fm" v-if="isEmpty" style="margin-top:-100rpx;"><gui-image src="../../static/images/noData.png" :width="396" :height="226" :timer="0"></gui-image></view>
			<block v-if="!isEmpty && goods">
				<view class="bgFFFFFF">
					<gui-swiper :autoplay="false" :circular="false" :swiperItems="goods.imgList" :width="750" :height="750" borderRadius="0rpx" :spacing="0" :padding="0"
						:indicatorActiveWidth="38" :indicatorBarHeight="40" :indicatorWidth="28" :indicatorHeight="6" indicatorColor="#E7E7E7" indicatorActiveColor="#000000"></gui-swiper>
					<view class="plr30 mt30 gui-flex gui-align-items-center gui-space-between">
						<view class="gui-flex gui-align-items-end">
							<text class="fb f30 cDC261F" style="height:45rpx;line-height:55rpx;">￥</text>
							<text class="fb f45 lh45 cDC261F">{{goods.price}}</text>
						</view>
						<navigator url="/pages/my/other/feedback?type=2" hover-class="" class="gui-flex gui-justify-content-center gui-align-items-center gui-wrap">
							<text class="wp100 gui-text-center gui-icons c231815">&#xe626;</text>
							<text class="wp100 gui-text-center c231815 f24">客服</text>
						</navigator>
					</view>
					<view class="mt20 plr30 fb f28">{{goods.title}}</view>
					<view class="mt20 plr30 fm f24 c999999 pb20">{{goods.desc}}</view>
				</view>
				<view class="p30 bgFFFFFF gui-text-center c231815 f30 fb mt20">商品详情</view>
				<view class="bgFFFFFF"><jyf-parser :html="goods.content" ref="article"></jyf-parser></view>
			</block>
			<view class="h120"></view>
			<view v-if="goods" class="gui-fixed-lb wp100 h120 bgFFFFFF gui-flex gui-align-items-center gui-space-between">
				<view class="gui-flex gui-justify-content-center gui-align-items-center wp100">
					<view @tap="buyNow" class="btn3 fm f28 cFFFFFF mr20">立即购买</view>
				</view>
			</view>
		</view>
	</gui-page>
</template>
<script>
import jyfParser from "@/components/jyf-parser/jyf-parser";
var _this;
export default {
	data() {
		return {
			pageLoading: false,
			isEmpty: false,
			id: 0,
			goods: null
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
		uni.setNavigationBarTitle({
			title: e.title
		})
	},
	onShow: function(){
		_this.getDetail();
	},
	onReady: function(){

	},
	methods: {
		getDetail: function(){
			_this.pageLoading = true;
			uni.gRequest.post(
				'swoft/api/fw/getFwGoodsdetail',
				{
					data: {
						id: _this.id
					}
				}, 
				(res) => {
					if(res.code == 0){
						res.data.imgList.forEach((item,index)=>{
							item.img = item.path+'?imageslim';
							item.title = '';
							item.url = '';
							item.opentype = 'click';
							if(index == 0){
								_this.goodsFirstImg = item.img;
							}
						});
						_this.goods = res.data;
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
		buyNow: function(){
			uni.setStorageSync('postData',_this.goods);
			uni.navigateTo({
				url: '/pages/zengzhi/fawu/postOrder'
			});
		}
	},
	components: {
		jyfParser
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
	.footImg{width:40rpx;height:40rpx;}
	.w100{width:100rpx;}
	.btn1{width:180rpx;height:70rpx;line-height:70rpx;text-align:center;border-radius:35rpx 0 0 35rpx;background-image:linear-gradient(to right,#FF9502,#FFC900);}
	.btn2{width:180rpx;height:70rpx;line-height:70rpx;text-align:center;border-radius:0 35rpx 35rpx 0;background-image:linear-gradient(to right,#FF7600,#FF4F00);}
	.btn3{width:650rpx;height:70rpx;line-height:70rpx;text-align:center;border-radius:35rpx;background-image:linear-gradient(to right,#FF7600,#FF4F00);margin:0 auto;}
	.shopCartNum{height:28rpx;line-height:28rpx;border-radius:15rpx;padding:0 9rpx;display:inline-block;position:absolute;top:-10rpx;left:60rpx;z-index:99;}
	.product-attr{width:690rpx;max-height:750rpx;margin:30rpx 0;}
	.speclist{display:flex;flex-wrap:wrap;}
	.specli{padding:10rpx 20rpx;min-width:90rpx;background-color:#F6F6F6;border-radius:8rpx;font-size:26rpx;margin:0 20rpx 20rpx 0;color:#000000;text-align:center;border:thin solid #F6F6F6;}
	.speclied{border-color:#FF4F00;background-color:#FDF9FA;color:#FF4F00;}
	.sure{height:90rpx;border-radius:45rpx;text-align:center;line-height:90rpx;color:#FFFFFF;font-size:30rpx;margin-top:40rpx;}
	.lime-painter{position:fixed;left:2000rpx;}
	.h5Desc{text-align:center;font-size:28rpx;color:#FFFFFF;margin-top:100rpx;}
</style>