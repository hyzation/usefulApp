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
				<image style="width: 100%;height: 448rpx;" src="../../../static/images/zengzhi/ele_3.png" mode=""></image>
				<view style="" class="margin-auto card_1 flex-center gui-flex gui-justify-content-center gui-align-items-center">
					<image style="width: 488rpx;height: 107rpx;" src="../../../static/images/zengzhi/ele_0.png" mode=""></image>
				</view>
			</view>
			<view class="dd-card flex-between-center padding-left-right gui-flex gui-space-between">
				<view @tap="toApplet(1)" class="card">
					<view class="card-text">
						饿了么外卖红包
					</view>
					<view style="position: relative;width: 336rpx;height: 32rpx;" class="">
						<image style="width: 336rpx;height: 32rpx; position: absolute;top: 0;left: -6rpx;z-index: 999;" src="../../../static/images/zengzhi/ele_4.png" mode=""></image>
					</view>
					<image style="width: 197rpx;height: 151rpx;" src="../../../static/images/zengzhi/ele_2.png" mode=""></image>
					<view  class="card-but">
						领红包拿返利
					</view>
				</view>
				<view @tap="toApplet(2)" class="card">
					<view class="card-text">
						饿了么买菜红包
					</view>
					<view style="position: relative;width: 336rpx;height: 32rpx;" class="">
						<image style="width: 336rpx;height: 32rpx; position: absolute;top: 0;left: -6rpx;z-index: 999;" src="../../../static/images/zengzhi/ele_4.png" mode=""></image>
					</view>
					<image style="width: 288rpx;height: 133rpx;padding-top: 30rpx;" src="../../../static/images/zengzhi/ele_1.png" mode=""></image>
					<view  class="card-but">
						领红包拿返利
					</view>
				</view>
			</view>
			<view class="rule margin-auto padding-left-right padding-top-m">
				<view class="size-lg f30 fm">
					规则说明:
				</view>
				<view class="size-sm padding-top-m mt20">
					1.有用用户在饿了么手机淘宝领券并下单成功均有返佣，以实际支付金额为准，最高4.8%,
				</view>
				<view class="size-sm padding-top-m mt10">
					2.下单成功后最晚半小时内同步订单，订单可能会有延迟，如出现延迟，请次日再次查询;
				</view>
				<view class="size-sm padding-top-m mt10">
					3.领券后7天内，打开饿了么APP在任意品质联盟商户店铺使用
				</view>
				<view class="size-sm padding-top-m mt10">
					4.饿了么订单查询和提现与淘宝的订单一致,请在APP增值服务订单处查询即可。
				</view>
			</view>
			<view style="height: 40rpx;" class=""></view>
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
		onLoad(p) {
			_this = this;
		},
		methods: {
			toApplet: function(e){
				let url = '';
				if(e == 1){
					url = 'swoft/api/taobao/eleme';
				}else{
					url = 'swoft/api/taobao/elemeMaker';
				}
				_this.pageLoading = true;
				uni.gRequest.post(
					url,
					{
						data: {}
					}, 
					(res) => {
						if(res.code == 20000){
							_this.pageLoading = false;
							// #ifdef APP-PLUS
							uni.navigateTo({
								url: `/pages/home/web?url=${encodeURIComponent(res.data.click_url)}`
							})
							// #endif
							// #ifdef H5
							window.location.href = res.data.click_url;
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
					true,
					true
				);
			},
			back() {
				uni.navigateBack({
					delta: 1
				})
			}
		}
	} 
</script>
<style>
	page {
		background-color: #039dfd;
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
.dd-card {
	margin-top: 140rpx;
	padding:0 20rpx;
	.card {
		position: relative;
		width: 326rpx;
		height: 422rpx;
		background-color: #FFFFFF;
		border: 14rpx solid #006CB0;
		border-radius: 25rpx;
		text-align: center;
		.card-text {
			padding-top: 35rpx;
			padding-bottom: 21rpx;
			font-size: 34rpx;
			color: #0D499C;
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
	background-color: #039dfd;
	color: #FFFFFF;
	border: thin solid #FFFFFF;
	border-radius: 16rpx;
	margin:20rpx;
	font-size:28rpx;
	padding:20rpx;
}
</style>
