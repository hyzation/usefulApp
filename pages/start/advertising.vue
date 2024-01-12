<template>
	<gui-page :isLoading="pageLoading" ref="guiPage">
		<view slot="gBody" class="fullPage gui-flex gui-justify-content-center">
			<view class="btn f32 fm top" v-if="time >= 0">{{time}}s</view>
			<image @load="imgLoad" class="wp100 hp100" :src="path" mode="aspectFill"></image>
		</view>
	</gui-page>
</template>
<script>
	var _this;
	export default {
		data() {
			return {
				pageLoading: false,
				path: '',
				adTime: 0,
				time: -1,
				timer: null,
			}
		},
		onLoad: function(){
			_this = this;
			_this.height = uni.gJS.system().windowHeight;
		},
		onUnload: function(){
			clearInterval(_this.timer);
		},
		onReady: function(){
			_this.getAd();
		},
		methods: {
			imgLoad: function(){
				_this.goTime();
			},
			goTime: function(){
				_this.time = _this.adTime;
				_this.timer = uni.gJS.interval(1000, ()=>{
					if(_this.time > 0){
						_this.time --;
					}else{
						clearInterval(_this.timer);
						uni.reLaunch({
							url: '/pages/home/index'
						})
					}
				});
			},
			getAd: function(){
				_this.pageLoading = true;
				uni.gRequest.post(
					'swoft/api/config/getAd',
					{
						data: {}
					},
					(res) => {
						if(res.code == 0){
							if(res.data.isAd == 1){
								_this.path = res.data.path+'?imageslim';
								_this.adTime = res.data.adTime;
							}else{
								uni.reLaunch({
									url: '/pages/home/index'
								})
							}
						}else{
							uni.reLaunch({
								url: '/pages/home/index'
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
	.btn{z-index:999;width:120rpx;border-radius:30rpx;height:60rpx;line-height:60rpx;text-align:center;position:fixed;right:40rpx;color:#333333;border:thin solid #333333;}
	/*  #ifdef  APP-PLUS  */
	.top{top:100rpx;}
	/*  #endif  */
	/*  #ifdef  H5 */
	.top{top:40rpx;}
	/*  #endif  */
</style>