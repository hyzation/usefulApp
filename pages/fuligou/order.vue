<template>
	<gui-page :isLoading="pageLoading" :apiLoadingStatus="apiLoadingStatus" :loadmore="true" @loadmorefun="getdata" ref="guiPage">
		<!-- 页面主体 -->
		<view slot="gBody" class="fm">
			<gui-empty v-if="isEmpty">
				<view slot="img" class="gui-flex gui-rows gui-justify-content-center">
					<image class="gui-empty-img" src="../../static/images/empty.png"></image>
				</view>
				<text slot="text" class="f28 gui-block-text gui-text-center gui-margin-top c999999">暂无数据</text>
			</gui-empty>
			<view class="padding_30_" v-for="(item,index) in productList" :key="index">
				<navigator hover-class="" :url="'/pages/fuligou/orderDetail?id='+item.id" class="bg-FFFFFF border-r20">
					<view class="padding_lr30 padding_b30 gui-relative borderBottom">
						<view class="f26 padding_t30 gui-flex gui-align-items-center gui-space-between">
							<text>订单编号：{{item.orderNum}}</text>
							<text v-if="item.status == 2" class="cFF4F00">进行中</text>
							<text v-if="item.status == 3" class="c999999">已完成</text>
						</view>
					</view>
					<view class="p20 gui-relative borderBottom gui-flex gui-space-between gui-align-items-center">
						<view class="view4 border-r10">
							<image :src="item.goodsImgUrl+'?imageslim'" mode="aspectFill"></image>
						</view>
						<view class="view5">
							<view class="gui-ellipsis fontsize28">{{item.goodsName}}</view>
							<view class="f24 color-999999 margin-t20 gui-ellipsis">{{item.num}}{{item.unit}}</view>
							<view class="color-999999 fontsize24 gui-flex gui-align-items-end gui-space-between margin-t20">
								<text class="color-FF0D00 fontsize30">￥{{item.payMoney}}</text>
								<text class="fontsize22 color-999999">X1</text>
							</view>
						</view>
					</view>
					<view class="padding_30 gui-flex gui-align-items-center gui-space-between">
						<view class="f28">{{item.sendNum}}/{{item.months}}期</view>
						<view class="gui-flex gui-align-items-center">
							<view class="orderBtn2_ mr30" @tap.stop="navtoScoreRecord(item.id,item.signInDaysSum)">开箱记录</view>
							<block v-if="item.getScore1 > 0">
								<view class="orderBtn_ mr30" v-if="item.isSign == 1">今日已开<text class="gui-icons ml10">&#xe7f8;</text></view>
								<!-- <gui-image v-if="item.isSign == 1" src="../../static/images/score/ykx.png" :timer="0" :width="150"></gui-image> -->
								<view @tap.stop="openAdNew(item.id)" class="orderBtn bgFF4F00" v-else>开宝箱</view>
							</block>
						</view>
					</view>
				</navigator>
			</view>
			<gui-popup ref="guipopupAd" bgColor="rgba(0,0,0,0.5)" :zIndex="99" width="750rpx" :canCloseByShade="false">
				<view class="gui-flex gui-justify-content-center gui-wrap">
					<view class="gui-flex gui-align-items-center gui-space-between mb20 w650">
						<view class="timer">奖励将于{{time}}秒后发放</view>
						<view class="closeAd" @tap="closeAd">关闭</view>
					</view>
					<video @ended="adPlayEnd" @timeupdate="timeupdate" :enable-progress-gesture="false" class="adVideo" id="adVideo" :style="{height:+videoHeight+'rpx'}" :controls="false" :show-center-play-btn="false" :src="videoAdUrl"></video>
				</view>
			</gui-popup>
			<!--  #ifdef  APP-PLUS -->
			<ad-rewarded-video ref="adRewardedVideo" adpid="1623123419" :preload="false" :loadnext="false" :disabled="false"
			    v-slot:default="{loading, error}" @load="onadload" @close="onadclose" @error="onaderror">
			    <view class="ad-error" v-if="error">{{error}}</view>
			</ad-rewarded-video>
			<!--  #endif -->
			<!--  #ifdef  H5 -->
			<!-- <view class="ad-view">
				<ad ref="ad" adpid="1248751887" @load="onload" @close="onclose" @error="onerror"></ad>
			</view> -->
			<!--  #endif -->
		</view>
	</gui-page>
</template>
<script>
	var page = 1;
	var totalPage = 0;
	var _this;
	export default {
		data() {
			return {
				productList: [],
				pageLoading: false,
				apiLoadingStatus: false,
				isEmpty: false,
				videoAdUrl: '',
				videoContext: null,
				duration: 0,
				time: 0,
				videoHeight: 0,
				id: 0,
				error: '广告加载失败',
				isLoading: false
			} 
		},
		onLoad: function(e){
			_this = this;
		},
		onShow: function(){
			_this.reload();
		},
		onReady: function(){
			_this.videoContext = uni.createVideoContext('adVideo');
			// #ifdef  APP-PLUS
			_this.isLoading = true;
			_this.$refs.adRewardedVideo.load();
			// #endif
		},
		methods: {
			closeAd() {
				_this.$refs.guipopupAd.close();
				setTimeout(function(){
					_this.time = _this.duration;
				},300);
				_this.videoContext.stop();
			},
			timeupdate(e) {
				_this.time = Math.ceil(e.detail.duration - e.detail.currentTime);
			},
			adPlayEnd() {
				_this.$refs.guipopupAd.close();
				uni.navigateTo({
					url: '/pages/my/score/unpacking?flgOrderId='+_this.id
				});
			},
			openAd(e) {
				_this.id = e;
				_this.pageLoading = true;
				uni.gRequest.post(
					'swoft/api/fuligou/getRandAdVideo',
					{
						data: {}
					}, 
					(res) => {
						if(res.code == 0){
							if(res.data.length > 0){
								_this.videoAdUrl = res.data.video;
								_this.duration = res.data.duration;
								_this.time = _this.duration;
								_this.videoHeight = res.data.height/res.data.width*650;
								_this.$refs.guipopupAd.open();
								setTimeout(function(){
									_this.videoContext.play();
								},500);
							}else{
								uni.navigateTo({
									url: '/pages/my/score/unpacking?flgOrderId='+_this.id
								});
							}
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
			openAdNew(e) {
				// #ifdef  APP-PLUS
				_this.id = e;
				if (_this.isLoading) {
					return
				}
				_this.$refs.adRewardedVideo.show();
				// #endif
				// #ifdef  H5
				_this.openAd(e);
				// #endif
			},
			closeADNew() {
				_this.$refs.adRewardedVideo.close();
			},
			onadload(e) {
				_this.isLoading = false;
			},
			onadclose(e) {
				const detail = e.detail;
				if(detail && detail.isEnded){
					// 正常播放结束
					uni.navigateTo({
						url: '/pages/my/score/unpacking?flgOrderId='+_this.id
					});
				}
			},
			onaderror(e) {
				// 广告加载失败
				_this.isLoading = false;
			},
			onload(e) {
				console.log("onload");
			},
			onclose(e) {
				console.log("onclose: " + e.detail);
			},
			onerror(e) {
				console.log("onerror: " + e.detail.errCode + " message:: " + e.detail.errMsg);
			},
			navToUrl(e) {
				uni.navigateTo({
					url: e
				})
			},
			/**
			 * 重新加载数据
			 */
			reload: function(){
				_this.pageLoading = true;
				_this.productList = [];
				page = 1;
				_this.getdata();
			},
			/**
			 * 加载数据
			 * @param {Object} isReload
			 */
			getdata: function(isReload){
				_this.apiLoadingStatus = true;
				uni.gRequest.post(
					'swoft/api/fuligou/getOrderList',
					{
						data: {
							page: page,
							limit: 10,
							uid: uni.getStorageSync('userInfo').id
						}
					}, 
					(res) => {
						if(res.code == 0){
							if(page == 1){
								totalPage = res.count;
								if(res.data.length > 0){
									_this.isEmpty = false;
								}else{
									_this.isEmpty = true;
								}
							}
							if(page <= totalPage){
								_this.productList = _this.productList.concat(res.data);
								// 加载完成后停止加载动画
								_this.$refs.guiPage.stoploadmore();
							}else{
								if(totalPage > 0){
									// 加载了全部数据，通知组件不再加载更多
									_this.$refs.guiPage.nomore();
								}
							}
							page++;
							if(isReload){
								_this.$refs.guiPage.endReload();
							}
						}
					},
					(error) => {
						_this.$refs.guiPage.openMessage('default','请求错误',true,1500);
					},
					(res) => {
						_this.apiLoadingStatus = false;
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
			navtoScoreRecord(e,s) {
				uni.navigateTo({
					url: '/pages/fuligou/scoreRecord?id='+e+'&signInDaysSum='+s
				})
			}
		}
	}
</script>
<style>
	@import url("../../static/css/reset.css");
	page{background-color:#F8F8F8;}
	.h100{height:100rpx;}
	.view1{width: 40rpx;height: 40rpx;}
	.view2{width: 180rpx;height: 74rpx;line-height: 74rpx;}
	.view3{position: fixed;bottom: 0;}
	.view4{width: 170rpx;height: 170rpx;background: #F8F8F8;border-radius: 20rpx;}
	.view4 image{width: 100%;height: 100%;border-radius:20rpx;}
	.view5{width: 460rpx;}
	/*  #ifdef  APP-PLUS  */
	.view6{position:fixed;top: 0; z-index: 1;height:100rpx;}
	/*  #endif  */
	/*  #ifdef  H5  */
	.view6{position:fixed;top:80rpx;z-index:1;height:100rpx;}
	/*  #endif  */
	.padding_30_{padding:30rpx 30rpx 0 30rpx;}
	.orderBtn{width:140rpx;text-align:center;height:50rpx;line-height:50rpx;border-radius:25rpx;font-size:26rpx;margin-left:20rpx;color:#FFFFFF;padding:0!important;border:thin solid #FF4F00;}
	.orderBtn2{width:140rpx;text-align:center;height:60rpx;line-height:60rpx;border-radius:30rpx;font-size:26rpx;margin-left:20rpx;padding:0!important;border:thin solid #FF4F00;color:#FF4F00;}
	.orderBtn3{width:140rpx;text-align:center;height:60rpx;line-height:60rpx;border-radius:30rpx;font-size:26rpx;margin-left:20rpx;padding:0!important;border:thin solid #999999;color:#999999;}
	.orderBtn2_{padding:0 20rpx;min-width:100rpx;;text-align:center;height:50rpx;line-height:50rpx;border-radius:25rpx;font-size:25rpx;margin-left:20rpx;border:thin solid #FF4F00;color:#FF4F00;}
	.orderBtn3_{width:120rpx;text-align:center;height:50rpx;line-height:50rpx;border-radius:25rpx;font-size:25rpx;margin-left:20rpx;border:thin solid #999999;color:#999999;}
	.orderBtn_{padding:0 20rpx;min-width:100rpx;text-align:center;height:50rpx;line-height:50rpx;border-radius:25rpx;font-size:25rpx;margin-left:30rpx;color:#FFA075;border:thin solid #FFA075;}
	.bg16A1A6{background-color:#16A1A6;}
	.bg999999{background-color:#999999;}
	.w300{width:300rpx;}
	.sbtn{font-size:20rpx;color:#FFFFFF;border-radius:6rpx;padding:0 4rpx;margin-right:10rpx;}
	.sbtnbg1{background-color:#EA333F;}
	.sbtnbg2{background-color:#16A1A6;}
	.width-r{width:350rpx;}
	.adVideo{width:650rpx;border-radius:10rpx;}
	.timer{height:50rpx;line-height:50rpx;color:#FFFFFF;border:1px solid #FFFFFF;border-radius:30rpx;padding:0 20rpx;font-size:24rpx;}
	.closeAd{height:50rpx;line-height:50rpx;color:#FFFFFF;border:1px solid #FFFFFF;border-radius:30rpx;padding:0 20rpx;font-size:24rpx;}
	.closeAd_{height:40rpx;line-height:40rpx;color:#FFFFFF;}
</style>