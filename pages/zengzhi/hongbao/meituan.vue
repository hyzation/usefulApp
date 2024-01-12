<template>
	<gui-page :isLoading="pageLoading"
		:customHeader="false" 
		:headerSets="{height:0, zIndex:100, backgroundColor:'rgba(255,255,255,0)'}" 
		statusBarStyle="background-color:rgba(255,255,255,0)" 
		ref="guiPage">
		<view slot="gBody">
			<!--  #ifdef  APP-PLUS -->
			<view @tap="back" style="position: fixed;top: 88rpx;left: 30rpx;z-index: 999;" class="">
				<image style="width: 60rpx;height: 60rpx;" src="../../../static/images/zengzhi/info_0.png" mode=""></image>
			</view>
			<!--  #endif -->
			<!--  #ifdef  H5 -->
			<view @tap="back" style="position: fixed;top: 30rpx;left: 30rpx;z-index: 999;" class="">
				<image style="width: 60rpx;height: 60rpx;" src="../../../static/images/zengzhi/info_0.png" mode=""></image>
			</view>
			<!--  #endif -->
			<view class="dd-warp">
				<image style="width: 100%;height: 537rpx;" src="../../../static/images/zengzhi/mt_0.png" mode=""></image>
				<view style="" class="card_1 flex-center gui-flex gui-justify-content-center gui-align-items-center">
					<image style="width: 488rpx;height: 107rpx;" src="../../../static/images/zengzhi/mt_1.png" mode=""></image>
				</view>
			</view>
			<view @tap="toApplet(1)" class="dd-card-h flex">
				<view style="text-align: center;width: 60%;margin-top: 20rpx;" class="">
					<image style="width: 295rpx;height: 152rpx;" src="../../../static/images/zengzhi/mt_2.png" mode=""></image>
					<view  class="card-but">
						领红包拿返利
					</view>
				</view>
				<view class="">
					<image style="width: 32rpx;height: 205rpx;margin-left: 105%;" src="../../../static/images/zengzhi/mt_7.png" mode=""></image>
				</view>
				<view style="position: absolute;right: 7%;top: 15%;text-align: center;color: #FFAE54;" class="">
					<image style="width: 79rpx;height: 94rpx;" src="../../../static/images/zengzhi/mt_6.png" mode=""></image>
					<view class="">
						美团外卖
					</view>
				</view>
			</view>
			<view class="dd-card flex-between-center padding-left-right gui-flex gui-space-between">
				<view @tap="toApplet(2)" class="card">
					<view class="card-text">
						美团生鲜买菜
					</view>
					<view style="position: relative;width: 336rpx;height: 32rpx;" class="">
						<image style="width: 336rpx;height: 32rpx; position: absolute;top: 0;left: -8rpx;z-index: 999;" src="../../../static/images/zengzhi/mt_8.png" mode=""></image>
					</view>
					<image style="width: 233rpx;height: 150rpx;padding-top: 25rpx;" src="../../../static/images/zengzhi/mt_3.png" mode=""></image>
					<view  class="card-but">
						领红包拿返利
					</view>
				</view>
				<view @tap="toApplet(6)" class="card">
					<view class="card-text">
						美团酒店
					</view>
					<view style="position: relative;width: 336rpx;height: 32rpx;" class="">
						<image style="width: 336rpx;height: 32rpx; position: absolute;top: 0;left: -8rpx;z-index: 999;" src="../../../static/images/zengzhi/mt_8.png" mode=""></image>
					</view>
					<image style="width: 246rpx;height: 185rpx;" src="../../../static/images/zengzhi/mt_4.png" mode=""></image>
					<view  class="card-but">
						领红包拿返利
					</view>
				</view>
			</view>
		</view>
	</gui-page>
</template>

<script>
	var _this;
	export default {
		data() {
			return {
				pageLoading: false,
			};
		},
		onLoad: function(){
			_this = this;
		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			toApplet(e) {
				_this.pageLoading = true;
				uni.gRequest.post(
					'swoft/admin/common/getCpsLink',
					{
						data: {
							url: 'http://api.jutuike.com/Meituan/act?channels=3&apikey=UvSEGd2d9o9mohtpKl5xHb6DOsIPlylU&sid='+uni.getStorageSync('userInfo').id+'&type='+e,
						}
					}, 
					(res) => {
						if(res.code == 20000){
							// #ifdef APP-PLUS
							uni.navigateTo({
								url: `/pages/home/web?url=${encodeURIComponent(res.data.h5)}`
							})
							// #endif
							// #ifdef H5
							window.location.href = res.data.h5;
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
					},
					true
				);
			}
		}
	} 
</script>
<style>
	page {
		background-color: #fac829;
		font-family: MEDIUM;
	}
</style>
<style lang="scss" scoped>
.dd-warp {
	position: relative;
	.card_1 {
		position: absolute;
		bottom: -100rpx;
		left: calc(50% - 46%);
		width: 92%;height: 140rpx;background-color: #FFFFFF;
		border-radius: 15rpx;
	}
}
.dd-card-h {
	position: relative;
	margin: 0 auto;
	margin-top: 140rpx;
	width: 92%;
	height: 223rpx;
	background-color: #FFFFFF;
	border: 14rpx solid #FFAE54;
	border-radius: 25rpx;
	.card-but {
		position: absolute;
		bottom: 11rpx;
		left: calc(50% - 46%);
		width: 340rpx;
		height: 40rpx;
		background: linear-gradient(270deg, #F98933 0%, #FDB24E 100%);
		border-radius: 29rpx;
		letter-spacing: 12rpx;
		
		text-align: center;
		line-height: 40rpx;
		color: #FFFFFF;
		font-family: MEDIUM;
		font-size: 24rpx;
	}
}
.dd-card {
	margin-top: 2%;
	padding:0 20rpx;
	.card {
		position: relative;
		width:326rpx;
		height: 397rpx;
		background-color: #FFFFFF;
		border: 14rpx solid #FFAE54;
		border-radius: 25rpx;
		text-align: center;
		.card-text {
			font-size: 34rpx;
			padding-top: 25rpx;
			padding-bottom: 10rpx;
			color: #FFAE54;
		}
		.card-but {
			position: absolute;
			bottom: 11rpx;
			left: calc(50% - 46%);
			width: 92%;
			height: 58rpx;
			background: linear-gradient(270deg, #F98933 0%, #FDB24E 100%);
			border-radius: 29rpx;
			
			
			text-align: center;
			line-height: 58rpx;
			color: #FFFFFF;
			font-family: MEDIUM;
			font-size: 24rpx;
		}
	}
}

.rule {
	margin-top: 52rpx;
	width: 92%;
	height: 170rpx;
	background-color: #fac829;
	border: 2rpx solid #383838;
	border-radius: 16rpx;
}
</style>
