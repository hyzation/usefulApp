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
				<image style="width: 100%;height: 448rpx;margin-top: 40rpx;" src="../../../static/images/zengzhi/dd-2.png" mode=""></image>
				<view style="" class="margin-auto card_1 flex-center gui-flex gui-justify-content-center gui-align-items-center">
					<image style="width: 488rpx;height: 107rpx;" src="../../../static/images/zengzhi/dd-0.png" mode=""></image>
				</view>
			</view>
			<view class="dd-card flex-between-center padding-left-right gui-flex gui-space-between">
				<view @tap="toApplet(2)" class="card">
					<view class="card-text">
						滴滴加油红包
					</view>
					<view style="position: relative;width: 336px;height: 32rpx;" class="">
						<image style="width: 336rpx;height: 32rpx; position: absolute;top: 0;left: -8rpx;z-index: 999;"
							src="../../../static/images/zengzhi/dd-4.png" mode=""></image>
					</view>
					<image style="width: 249rpx;height: 226rpx;" src="../../../static/images/zengzhi/dd-1.png" mode=""></image>
					<view class="card-but">
						领加油红包返利
					</view>
				</view>
				<view @tap="toApplet(1)" class="card">
					<view class="card-text">
						滴滴打车红包
					</view>
					<view style="position: relative;width: 336rpx;height: 32rpx;" class="">
						<image style="width: 336rpx;height: 32rpx; position: absolute;top: 0;left: -8rpx;z-index: 999;"
							src="../../../static/images/zengzhi/dd-4.png" mode=""></image>
					</view>
					<image style="width: 202rpx;height: 121rpx;padding-top: 30rpx;" src="../../../static/images/zengzhi/dd-3.png" mode="">
					</image>
					<view  class="card-but">
						领打车红包返利
					</view>
				</view>
			</view>
			<view class="rule margin-auto padding-left-right padding-top-m">
				<view class="size-lg f30 fm">
					规则说明:
				</view>
				<view class="size-sm padding-top-m mt20">
					滴滴打车优惠券仅支持快车、拼车、优享、特惠快车下单使用 具体使用规则详见券面信息。
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
			toApplet: function(e){
				_this.pageLoading = true;
				uni.gRequest.post(
					'swoft/admin/common/getCpsLink',
					{
						data: {
							url: 'http://api.jutuike.com/didi/act?apikey=UvSEGd2d9o9mohtpKl5xHb6DOsIPlylU&sid='+uni.getStorageSync('userInfo').id+'&type='+e
						}
					}, 
					(res) => {
						if(res.code == 20000){
							// #ifdef APP-PLUS
							uni.navigateTo({
								url: `/pages/home/web?url=${encodeURIComponent(res.data.short_click_url)}`
							})
							// #endif
							// #ifdef H5
							window.location.href = res.data.short_click_url;
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
			width: 92%;
			height: 140rpx;
			background-color: #FFFFFF;
			border-radius: 15rpx;
		}
	}

	.dd-card {
		margin-top: 140rpx;
		padding:0 20rpx;
		.card {
			position: relative;
			width: 326rpx;
			height: 422rpx;
			background-color: #FFFFFF;
			border: 14rpx solid #FFAE54;
			border-radius: 25rpx;
			text-align: center;

			.card-text {
				padding-top: 35rpx;
				padding-bottom: 21rpx;
				font-size: 34rpx;
				color: #FFAE54;
			}

			.card-but {
				position: absolute;
				bottom: 21rpx;
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
		background-color: #fac829;
		border: thin solid #383838;
		border-radius: 16rpx;
		margin:20rpx;
		font-size:28rpx;
		padding:20rpx;
	}
</style>
