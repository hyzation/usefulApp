<template>
	<gui-page :isLoading="pageLoading" ref="guiPage">
		<view slot="gBody" class="fullPage gui-flex gui-justify-content-center">
			<gui-swiper @swiperchange="change" mode="aspectFill" @clickBtn="start" :isShowBtn="true" :circular="false" :swiperItems="bannerList" :spacing="0" :width="750" :height="height" :indicatorActiveWidth="30" :indicatorBarHeight="60" :indicatorWidth="15" :indicatorHeight="15" :autoplay="false" indicatorColor="#E7E7E7" indicatorActiveColor="#FF4F00"></gui-swiper>
		</view>
	</gui-page>
</template>
<script>
	var _this;
	export default {
		data() {
			return {
				pageLoading: false,
				bannerList: [],
				height: 0,
				currentIndex: 0
			}
		},
		onLoad: function(){
			_this = this;
			_this.height = uni.gJS.system().windowHeight/(uni.upx2px(100)/100);
		},
		onReady: function(){
			if(!uni.gRequest.checkLogin()){
				uni.reLaunch({
					url: '/pages/login/login'
				})
			}else{
				// #ifdef APP-PLUS
				if(uni.getStorageSync('isOpenStart') == ''){
					uni.setStorageSync('isOpenStart','yes');
					_this.getStartPictures();
				}else{
					uni.reLaunch({
						url: '/pages/start/advertising'
					})
				}
				// #endif
				// #ifdef H5
				uni.reLaunch({
					url: '/pages/start/advertising'
				})
				// #endif
			}
		},
		methods: {
			change: function(e){
				_this.currentIndex = e;
			},
			start: function(){
				uni.reLaunch({
					url: '/pages/start/advertising'
				})
			},
			getStartPictures: function(){
				_this.pageLoading = true;
				uni.gRequest.post(
					'swoft/api/config/getStartPictures',
					{
						data: {}
					},
					(res) => {
						if(res.code == 0){
							_this.bannerList = [];
							res.data.forEach((item)=>{
								_this.bannerList.push({
									img: item+'?imageslim',
									url: '',
									title: '',
									opentype: 'click'
								});
							})
						}else{
							uni.reLaunch({
								url: '/pages/start/advertising'
							})
						}
					},
					(error) => {
						_this.$refs.guiPage.openMessage('default','请求错误',true,1500);
					},
					(res) => {
						_this.pageLoading = false;
					},
					true
				);
			}	
		}
	}
</script>
<style>
	.btn{width:610rpx;height:90rpx;line-height:90rpx;text-align:center;color:#FFFFFF;background-color:#FF4F00;position:fixed;z-index:999;left:70rpx;bottom:60rpx;border-radius:12rpx;}
</style>