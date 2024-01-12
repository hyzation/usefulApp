<template>
	<gui-page :isLoading="pageLoading" :fullPage="true" :customHeader="true" statusBarStyle="background:#FFFFFF;height:0;" headerStyle="background:rgba(0,0,0,0);height:0;" :isHeaderSized="false" ref="guiPage">
		<view slot="gHeader">
			<!--  #ifndef H5 -->
			<view class="gui-flex gui-nowrap gui-rows gui-align-items-center gui-padding mt90">
				<gui-header-leading :onlyBack="true" buttonStyle="color:#000000;"></gui-header-leading>
			</view>
			<!--  #endif -->
			<!--  #ifdef H5 -->
			<view class="gui-flex gui-nowrap gui-rows gui-align-items-center gui-padding mt30">
				<gui-header-leading :onlyBack="true" buttonStyle="color:#000000;"></gui-header-leading>
			</view>
			<!--  #endif -->
		</view>
		<view slot="gBody" class="fullPage gui-flex gui-justify-content-center gui-align-items-center gui-wrap">
			<!--  #ifndef H5 -->
			<!-- <gui-image v-if="path != ''" :src="path" :width="750"></gui-image> -->
			<image mode="aspectFill" :style="'height:'+windowHeight+'px;width:100%;'" v-if="path != ''" :src="path"></image>
			<!--  #endif -->
			<!--  #ifdef H5 -->
			<canvas style="width:750rpx;height:1624rpx;">
				<img :src="path" style="width:750rpx;-webkit-touch-callout: default;" />
			</canvas>
			<!--  #endif -->
			<l-painter v-if="userInfo && userCode != ''" ref="painter" type="2d" class="lime-painter" isCanvasToTempFilePath @success="path = $event" css="width:750rpx;height:1624rpx;background:#FFFFFF;">
				<l-painter-image :src="bgImg" css="width:750rpx;height:1624rpx;" />
				<!-- <l-painter-view>
					<l-painter-text :text="userInfo.nickname+' ID:'+userInfo.no" css="color:#FFFFFF;font-wight:bold;font-size:36rpx;text-align:center;width:750rpx;margin-top:-825rpx;" />
				</l-painter-view> -->
				
				<!-- <l-painter-view>
					<l-painter-text :text="userInfo.inviteCode" css="color:#FFFFFF;font-wight:bold;font-size:44rpx;text-align:center;width:750rpx;margin-top:-780rpx;" />
				</l-painter-view> -->
				<l-painter-view>
					<l-painter-text :text="userInfo.inviteCode" css="color:#f18f2c;font-wight:bold;font-size:40rpx;text-align:center;width:750rpx;margin-top:-524rpx;" />
				</l-painter-view>
				<l-painter-image :src="userCode" css="width:196rpx;height:196rpx;margin-top:-744rpx;margin-left:278rpx;" />
			</l-painter>
			<!--  #ifndef H5 -->
			<view v-if="path != ''" class="saveBtn fb cFFFFFF" @tap="saveImage">保存图片</view>
			<!--  #endif -->
			<!--  #ifdef H5 -->
			<view v-if="path != ''" class="saveBtn fb cFFFFFF" @tap="savePicture">保存图片</view>
			<!-- <view class="h5Desc fm">长按保存到手机或发送给朋友</view> -->
			<!--  #endif -->
		</view>
	</gui-page>
</template>
<script>
	var _this;
	import { pathToBase64 } from 'image-tools';
	export default {
		data() {
			return {
				pageLoading: true,
				path: '',
				userCode: '',
				userInfo: null,
				backgroundImg: '',
				bgImg: ''
			}
		},
		watch:{
			path: function(e){
				if(e != ''){
					_this.pageLoading = false;
				}
			}
		},
		onShow: function(){

		},
		onLoad: function(){
			_this = this;
			_this.userInfo = uni.getStorageSync('userInfo');
			_this.getIndexShareCover();
		},
		onReady: function(){
			_this.windowHeight = uni.gJS.system().windowHeight;
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
			getIndexShareCover: function(){
				uni.gRequest.post(
					'swoft/api/config/getIndexShareCover',
					{
						data: {}
					}, 
					(res) => {
						if(res.code == 0){
							_this.backgroundImg = res.data.indexShareCoverPath;
							_this.getUserCode();
							uni.downloadFile({
								url: res.data.indexShareCoverPath,
								success: (res) => {
									if(res.statusCode === 200){
										pathToBase64(res.tempFilePath)
											.then(base64 => {
												_this.bgImg = base64;
											})
											.catch(error => {
												_this.$refs.guiPage.openMessage('default','图片转码失败',true,1500);
											});
									}else{
										_this.$refs.guiPage.openMessage('default','图片下载失败',true,1500);
									}
								},
								fail: (err) => {
									_this.$refs.guiPage.openMessage('default','图片下载失败',true,1500);
								}
							});
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
					(res) => {
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
		}
	}
</script>
<style>
	page{/* background-image:linear-gradient(to bottom,#3eb075,#FFFFFF); */ background-color:#;}
	/* .gui-page-loading-color{background-color:#FFFFFF;} */
	.lime-painter{position:fixed;left:2000rpx;}
	.saveBtn{position:fixed;z-index:999;width:260rpx;text-align:center;font-size:40rpx;height:90rpx;line-height:90rpx;border-radius:45rpx;background-color:#f18f2c;bottom:30rpx;left:245rpx;}
	.h5Desc{text-align:center;font-size:28rpx;color:#f18f2c;width:100%;position:fixed;left:0;bottom:30rpx;}
</style>