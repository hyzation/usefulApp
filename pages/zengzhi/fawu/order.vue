<template>
	<gui-page :isLoading="pageLoading" ref="guiPage">
		<!-- 页面主体 -->
		<view slot="gBody" class="fm">
			<view class="bgFFFFFF view6 gui-relative borderTop fb gui-flex gui-align-items-center">
				<gui-switch-navigation :items="navItems" @change="navchange" color="#000000" :currentIndex="currentIndex" 
				activeLineBg="linear-gradient(to right, #FF4F00, #FF4F00)"
				activeColor="#FF4F00" :isCenter="true" activeDirection="center" :activeFontWeight="400"
				activeLineWidth="70%" :size="0" padding="30rpx" :width="750"></gui-switch-navigation>
			</view>
			<!--  #ifdef APP-PLUS -->
			<view class="h100"></view>
			<!--  #endif -->
			<!--  #ifdef H5 -->
			<view class="h100"></view>
			<!--  #endif -->
			<view class="padding_30_" v-for="(item,index) in productList" :key="index">
				<view hover-class="" class="bg-FFFFFF border-r20">
					<view class="p20 gui-relative borderBottom gui-flex gui-space-between gui-align-items-center">
						<view class="view4 border-r10">
							<image :src="item.coverPath+'?imageslim'" mode="aspectFill"></image>
						</view>
						<view class="view5">
							<view class="gui-ellipsis fontsize28">{{item.title}}</view>
							<view class="fontsize22 color-999999 margin-t20 gui-ellipsis">{{item.desc}}</view>
							<view class="color-999999 fontsize24 gui-flex gui-align-items-end gui-space-between margin-t20">
								<text class="color-FF0D00 fontsize30">￥{{item.price}}</text>
							</view>
						</view>
					</view>
					<view class="padding_lr30 padding_b30 gui-relative borderBottom">
						<view class="fontsize24 padding_t20 gui-flex gui-align-items-center gui-space-between">
							<text>订单编号：{{item.orderNum}}</text>
							<text v-if="item.status == 2" class="cFF4F00">已付款</text>
							<text v-if="item.status == 3" class="cFF4F00">办理中</text>
							<text v-if="item.status == 4" class="cFF4F00">办理成功</text>
							<text v-if="item.status == -2" class="cFF4F00">办理失败</text>
						</view>
						<view class="fontsize24 padding_t20 gui-flex gui-align-items-center gui-space-between">
							<text>创建时间：{{item.created_at}}</text>
							<view class="gui-flex gui-align-items-center gui-justify-content-end">
								<gui-image :src="'../../../static/images/zheng/pay'+item.payType+'.png'" :timer="0" :width="26" :height="26" class="mr10"></gui-image>
								<text v-if="item.payType == 1">微信支付</text>
								<text v-if="item.payType == 2">支付宝支付</text>
							</view>
						</view>
					</view>
					<view class="padding_30 gui-flex gui-align-items-center gui-space-between">
						<view>
							<text class="fontsize24 margin-l20">
								<text>总计</text>
								<text class="color-FF0D00">￥{{item.totalPrice}}</text>
							</text>
						</view>
						<view class="gui-flex gui-align-items-center">
							<block v-if="item.status == 2">
								<view class="orderBtn2">已付款</view>
							</block>
							<block v-if="item.status == 3">
								<view class="orderBtn bgFF4F00">办理中</view>
							</block>
							<block v-if="item.status == 4">
								<view class="orderBtn2">办理成功</view>
							</block>
							<block v-if="item.status == -2">
								<view class="orderBtn3_">办理失败</view>
							</block>
						</view>
					</view>
				</view>
			</view>
			<gui-empty v-if="isEmpty">
				<view slot="img" class="gui-flex gui-rows gui-justify-content-center">
					<image class="gui-empty-img" src="../../../static/images/empty.png"></image>
				</view>
				<!-- <text slot="text" class="f28 gui-block-text gui-text-center gui-margin-top c999999">暂无数据</text> -->
			</gui-empty>
			<gui-loadmore ref="loadmorecom"></gui-loadmore>
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
				currentIndex: 0,
				status: 99,
				navItems: [
					{name: '全部',status: 99},
					{name: '已付款',status: 2},
					{name: '办理中',status: 3},
					{name: '办理成功',status: 4},
					{name: '办理失败',status: -2},
				],
				productList: [],
				pageLoading: false,
				apiLoadingStatus: false,
				isEmpty: false
			}
		},
		onLoad: function(e){
			_this = this;
			getApp().readMsgNum(16);
		},
		onShow: function(){
			_this.reload();
		},
		onReachBottom: function(){
			if(_this.apiLoadingStatus){ return; }
			if(_this.loadMoreTimer != null){clearTimeout(_this.loadMoreTimer);}
			_this.loadMoreTimer = setTimeout(() => {
				if(_this.$refs.loadmorecom.loadMoreStatus != 0){ return ;}
				_this.$refs.loadmorecom.loading();
				_this.getdata();
			},80);
		},
		methods: {
			navchange:function(index){
				if(_this.currentIndex != index){
					_this.currentIndex = index;
					_this.status = _this.navItems[index].status;
					_this.reload();
				}
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
					'swoft/api/fw/getFwOrderList',
					{
						data: {
							page: page,
							limit: 10,
							uid: uni.getStorageSync('userInfo').id,
							status: _this.status
						}
					}, 
					(res) => {
						if(res.code == 0){
							if(page == 1){
								totalPage = res.data.count;
							}
							if(totalPage==0)
							{
								_this.isEmpty = true;
								_this.$refs.loadmorecom.empty();							
							}else{
								_this.isEmpty = false;
								_this.productList = _this.productList.concat(res.data.data);
								if(page >= totalPage)
								{
									_this.$refs.loadmorecom.nomore();
								}else{
									_this.$refs.loadmorecom.stoploadmore();
									page++;
								}
							}
						}else{
							_this.$refs.guiPage.openMessage('default',res.msg,true,1500);
						}
						_this.apiLoadingStatus = false;
						_this.pageLoading = false;
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
			}
		}
	}
</script>
<style>
	@import url("../../../static/css/reset.css");
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
	.orderBtn{width:140rpx;text-align:center;height:60rpx;line-height:60rpx;border-radius:30rpx;font-size:26rpx;margin-left:20rpx;color:#FFFFFF;padding:0!important;}
	.orderBtn2{width:140rpx;text-align:center;height:60rpx;line-height:60rpx;border-radius:30rpx;font-size:26rpx;margin-left:20rpx;padding:0!important;border:thin solid #FF4F00;color:#FF4F00;}
	.orderBtn3{width:140rpx;text-align:center;height:60rpx;line-height:60rpx;border-radius:30rpx;font-size:26rpx;margin-left:20rpx;padding:0!important;border:thin solid #999999;color:#999999;}
	.orderBtn2_{width:120rpx;text-align:center;height:50rpx;line-height:50rpx;border-radius:25rpx;font-size:25rpx;margin-left:20rpx;border:thin solid #FF4F00;color:#FF4F00;}
	.orderBtn3_{width:120rpx;text-align:center;height:50rpx;line-height:50rpx;border-radius:25rpx;font-size:25rpx;margin-left:20rpx;border:thin solid #999999;color:#999999;}
	.orderBtn_{width:120rpx;text-align:center;height:50rpx;line-height:50rpx;border-radius:25rpx;font-size:25rpx;margin-left:20rpx;color:#FFFFFF;}
	.bg16A1A6{background-color:#16A1A6;}
	.bg999999{background-color:#999999;}
	.w300{width:300rpx;}
	.sbtn{font-size:20rpx;color:#FFFFFF;border-radius:6rpx;padding:0 4rpx;margin-right:10rpx;}
	.sbtnbg1{background-color:#EA333F;}
	.sbtnbg2{background-color:#16A1A6;}
	.width-r{width:350rpx;}
</style>