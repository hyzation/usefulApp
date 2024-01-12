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
							<text class="fm f28 ml20 cFF4F00">{{goods.mValue}}推广值</text>
						</view>
						<view class="gui-flex gui-align-items-center">
							<text class="f28 ml10 c999999">已售：{{goods.salesVolume}}</text>
							<text @tap="$refs.guipopupHb.open()" class="gui-icons c231815 gui-bold ml30">&#xe615;</text>
						</view>
					</view>
					<view class="mt20 plr30 fb f30">{{goods.title}}</view>
					<view class="mt20 plr30 fm f28 c999999 pb20">{{goods.desc}}</view>
				</view>
				<view class="p30 bgFFFFFF gui-text-center c231815 f30 fb mt20">商品详情</view>
				<view class="bgFFFFFF"><jyf-parser :html="goods.content" ref="article"></jyf-parser></view>
				<gui-popup ref="guipopupHb" bgColor="rgba(0,0,0,0.85)" :zIndex="99" width="600rpx">
					<canvas style="width:600rpx;height:870rpx;">
						<gui-image :src="path" :width="600" :height="870" borderRadius="20rpx"></gui-image>
					</canvas>
					<!--  #ifndef H5 -->
					<view class="gui-flex gui-align-items-center gui-justify-content-center mt40">
						<view class="hBtn bgFFFFFF f28 fm" @tap="$refs.guipopupHb.close()">取消</view>
						<view class="hBtn bgFF4F00 f28 fm cFFFFFF" @tap="saveImage">保存图片</view>
					</view>
					<!--  #endif -->
					<!--  #ifdef H5 -->
					<view class="gui-flex gui-align-items-center gui-justify-content-center mt40">
						<view class="hBtn bgFFFFFF f28 fm" @tap="$refs.guipopupHb.close()">取消</view>
						<view class="hBtn bgFF4F00 f28 fm cFFFFFF" @tap="savePicture">保存图片</view>
					</view>
					<!--  #endif -->
				</gui-popup>
				<l-painter ref="painter" type="2d" class="lime-painter" isCanvasToTempFilePath @success="path = $event" css="width:1200rpx;height:1740rpx;background:#FFFFFF;border-radius:40rpx;">
					<l-painter-image :src="goodsFirstImg" css="width:1200rpx;height:1200rpx;border-radius:40rpx 40rpx 0 0;" />
					<l-painter-view css="margin:80rpx 0;display:flex;justify-content:center;align-items:center;height:146rpx;">
						<l-painter-text :text="goods.title" css="display:inline-block;width:600rpx;color:#000000;font-size:52rpx;line-height:72rpx;line-clamp:2;" />
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
			</block>
			<view class="h120"></view>
			<view v-if="goods" class="gui-fixed-lb wp100 h120 bgFFFFFF gui-flex gui-align-items-center gui-justify-content-center">
				<view class="btn3 fm f30 cFFFFFF" @tap="sure">立即购买</view>
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
			goods: null,
			goodsFirstImg: '',
			userCode: '',
			logo: '',
			path: ''
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
		_this.getLogo();
		_this.getUserCode();
	},
	onShow: function(){
		_this.getDetail();
	},
	onReady: function(){

	},
	methods: {
		// #ifdef H5
		savePicture: function(){
			let base64 = _this.path;
			var arr = base64.split(',');
			var bytes = atob(arr[1]);
			let ab = new ArrayBuffer(bytes.length);
			let ia = new Uint8Array(ab);
			for (let i = 0; i < bytes.length; i++) {
				ia[i] = bytes.charCodeAt(i);
			}
			var blob = new Blob([ab], { type: 'application/octet-stream' });
			var url = URL.createObjectURL(blob);
			var a = document.createElement('a');
			a.href = url;
			a.download = new Date().valueOf() + ".png";
			var e = document.createEvent('MouseEvents');
			e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
			a.dispatchEvent(e);
			URL.revokeObjectURL(url);
		},
		// #endif
		getLogo: function(){
			uni.gRequest.post(
				'swoft/api/config/getLogo',
				{
					data: {}
				}, 
				(res) => {
					if(res.code == 0){
						_this.logo = res.data.logoPath;
					}
				},
				(error) => {
					_this.$refs.guiPage.openMessage('default','请求错误',true,1500);
				},
				(res) => {},
				true,
				true
			);
		},
		getUserCode: function(){
			uni.gRequest.post(
				'swoft/api/user/getUserCode',
				{
					data: {
						uid: uni.getStorageSync('userInfo').id
					}
				}, 
				(res) => {
					if(res.code == 0){
						_this.userCode = res.data;
					}
				},
				(error) => {
					_this.$refs.guiPage.openMessage('default','请求错误',true,1500);
				},
				(res) => {},
				true,
				true
			);
		},
		numFilter: function (value) {
			return parseFloat(value).toFixed(2);
		},
		getDetail: function(){
			let uid = uni.getStorageSync('userInfo').id;
			if(!uni.gRequest.checkLogin()){
				uid = 0;
			}
			_this.pageLoading = true;
			uni.gRequest.post(
				'swoft/api/fuligou/getGoodsDetail',
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
		sure: function(){
			if(_this.goods.stock == 0){
				_this.$refs.guiPage.openMessage('default','库存不足',true,1500);
				return false;
			}
			var flgPostData = [];
			flgPostData.push({
				goodsId: _this.goods.id,
				goods_name: _this.goods.title,
				goods_img: _this.goods.coverPath,
				cover: _this.goods.cover,
				num: _this.goods.num,
				unit: _this.goods.unit,
				months: _this.goods.months,
				score1: _this.goods.score1,
				score2: _this.goods.score2,
				score3: _this.goods.score3,
				stock: _this.goods.stock,
				price: _this.goods.price,
				totalPrice: _this.goods.price,
				mValue: _this.goods.mValue
			});
			uni.setStorageSync('flgPostData',flgPostData);
			uni.navigateTo({
				url: '/pages/fuligou/postOrder?num=1&totalPrice='+flgPostData[0].totalPrice
			});
		},
		saveImage: function(){
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
	.footImg{width:30rpx;height:30rpx;}
	.w100{width:100rpx;}
	.btn1{width:180rpx;height:70rpx;line-height:70rpx;text-align:center;border-radius:35rpx 0 0 35rpx;background-image:linear-gradient(to right,#FF9502,#FFC900);}
	.btn2{width:180rpx;height:70rpx;line-height:70rpx;text-align:center;border-radius:0 35rpx 35rpx 0;background-image:linear-gradient(to right,#FF7600,#FF4F00);}
	.btn3{width:690rpx;height:80rpx;line-height:80rpx;text-align:center;border-radius:40rpx;background-image:linear-gradient(to right,#FF7600,#FF4F00);}
	.shopCartNum{height:28rpx;line-height:28rpx;border-radius:15rpx;padding:0 9rpx;display:inline-block;position:absolute;top:-10rpx;left:60rpx;z-index:99;}
	.product-attr{width:690rpx;max-height:750rpx;margin:30rpx 0;}
	.speclist{display:flex;flex-wrap:wrap;}
	.specli{padding:10rpx 20rpx;min-width:90rpx;background-color:#F6F6F6;border-radius:8rpx;font-size:26rpx;margin:0 20rpx 20rpx 0;color:#000000;text-align:center;border:thin solid #F6F6F6;}
	.speclied{border-color:#FF4F00;background-color:#FDF9FA;color:#FF4F00;}
	.sure{height:90rpx;border-radius:45rpx;text-align:center;line-height:90rpx;color:#FFFFFF;font-size:30rpx;margin-top:40rpx;}
	.lime-painter{position:fixed;left:2000rpx;}
	.h5Desc{text-align:center;font-size:28rpx;color:#FFFFFF;margin-top:100rpx;}
</style>