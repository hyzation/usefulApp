<template>
	<gui-page :isLoading="pageLoading" ref="guiPage">
		<!-- 页面主体 -->
		<view slot="gBody" class="fm">
			<view class="padding_30_" v-for="(item,index) in productList" :key="index">
				<view class="bg-FFFFFF border-r20">
					<view class="p20 gui-relative borderBottom gui-flex gui-space-between gui-align-items-center">
						<view class="view5">
							<view class="gui-ellipsis fontsize28">{{item.orderTitle}}</view>
							<view class="fontsize22 color-999999 margin-t20 gui-ellipsis">{{item.actName}}</view>
						</view>
						<text class="color-FF0D00 fontsize30">￥{{item.orderPrice.toFixed(2)}}</text>
					</view>
					<view class="padding_lr30 padding_b30 gui-relative borderBottom">
						<view class="fontsize24 padding_t20 gui-flex gui-align-items-center gui-space-between">
							<text>订单编号：{{item.orderSn}}</text>
						</view>
						<view class="fontsize24 padding_t20 gui-flex gui-align-items-center gui-space-between">
							<text>创建时间：{{item.createdAt|dealTime}}</text>
						</view>
						<view v-if="item.money > 0" class="fontsize24 padding_t20 gui-flex gui-align-items-center gui-space-between">
							<text>佣金：<text class="color-FF0D00">￥{{item.money.toFixed(2)}}</text></text>
						</view>
					</view>
					<view class="padding_30 gui-flex gui-align-items-center gui-space-between">
						<view>
							<text class="fontsize24">
								<text>实际支付：</text>
								<text class="color-FF0D00">￥{{item.payPrice.toFixed(2)}}</text>
							</text>
						</view>
						<view class="gui-flex gui-align-items-center">
							<view class="orderBtn2_">{{item.statusDesc}}</view>
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
				status: 1,
				navItems: [
					{name: '淘宝',status: 1},
					{name: '拼多多',status: 2},
				],
				productList: [],
				pageLoading: false,
				apiLoadingStatus: false,
				isEmpty: false
			}
		},
		filters: {
			dealTime(e) {
				if(e != 0){
					return uni.gJS.toDate(e,'str');
				}else{
					return '------------'; 
				}
			},
			dealStatus(e) {
				let statusName = '未知状态';
				switch(e){
					case 0: statusName = '未付款'; break;
					case 1: statusName = '已付款'; break;
					case 2: statusName = '待结算'; break;
					case 3: statusName = '已结算'; break;
					case 4: statusName = '无效订单'; break;
				}
				return statusName;
			}
		},
		onLoad: function(e){
			_this = this;
			getApp().readMsgNum(17);
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
				let url = '';
				let postData = {};
				postData.uid = uni.getStorageSync('userInfo').id;
				postData.page = page;
				postData.limit = 10;
				postData.status = 99;
				url = 'swoft/api/tripartite/getCpsOrderList';
				_this.apiLoadingStatus = true;
				uni.gRequest.post(
					url,
					{
						data: postData
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