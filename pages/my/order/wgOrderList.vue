<template>
	<gui-page :isLoading="pageLoading" ref="guiPage">
		<!-- 页面主体 -->
		<view slot="gBody" class="fm">
			<view class="bgFFFFFF view6 gui-relative borderTop fb gui-flex gui-align-items-center">
				<gui-switch-navigation :items="navItems" @change="navchange" color="#000000" :currentIndex="currentIndex" 
				activeLineBg="linear-gradient(to right, #FF4F00, #FF4F00)" fontSize="30rpx" activeFontSize="30rpx"
				activeColor="#FF4F00" :isCenter="true" activeDirection="center" :activeFontWeight="400"
				activeLineWidth="70%" :size="0" padding="120rpx" :width="750"></gui-switch-navigation>
			</view>
			<!--  #ifdef APP-PLUS -->
			<view class="h100"></view>
			<!--  #endif -->
			<!--  #ifdef H5 -->
			<view class="h100"></view>
			<!--  #endif -->
			<block v-if="status == 2">
				<navigator :url="'/pages/my/order/wgOrderDetail?id='+item.id+'&type='+status" hover-class="" class="padding_30_" v-for="(item,index) in productList" :key="index">
					<view class="bg-FFFFFF border-r20">
						<view class="p20 gui-relative borderBottom gui-flex gui-space-between gui-align-items-center">
							<view class="view4 border-r10">
								<image :src="item.goodsThumbnailUrl" mode="aspectFill"></image>
							</view>
							<view class="view5">
								<view class="gui-ellipsis fontsize28">{{item.goodsName}}</view>
								<view class="fontsize22 color-999999 margin-t20 gui-ellipsis">{{item.mallName}}</view>
								<view class="color-999999 fontsize24 gui-flex gui-align-items-end gui-space-between margin-t20">
									<text class="color-FF0D00 fontsize30">￥{{item.goodsPrice/100}}</text>
									<text class="fontsize22 color-999999">X{{item.goodsQuantity}}</text>
								</view>
							</view>
						</view>
						<view class="padding_lr30 padding_b30 gui-relative borderBottom">
							<view class="fontsize24 padding_t20 gui-flex gui-align-items-center gui-space-between">
								<text>订单编号：{{item.orderSn}}</text>
							</view>
							<view class="fontsize24 padding_t20 gui-flex gui-align-items-center gui-space-between">
								<text>创建时间：{{item.orderCreateTime|dealTime}}</text>
							</view>
						</view>
						<view class="padding_30 gui-flex gui-align-items-center gui-space-between">
							<view>
								<text class="fontsize24">共{{item.goodsQuantity}}件商品</text>
								<text class="fontsize24 margin-l20">
									<text>总计</text>
									<text class="color-FF0D00">￥{{item.orderAmount/100}}</text>
								</text>
							</view>
							<view class="gui-flex gui-align-items-center">
								<view class="orderBtn2_">{{item.orderStatusDesc}}</view>
							</view>
						</view>
					</view>
				</navigator>
			</block>
			<block v-else>
				<navigator :url="'/pages/my/order/wgOrderDetail?id='+item.id+'&type='+status" hover-class="" class="padding_30_" v-for="(item,index) in productList" :key="index">
					<view class="bg-FFFFFF border-r20">
						<view class="p20 gui-relative borderBottom gui-flex gui-space-between gui-align-items-center">
							<view class="view4 border-r10">
								<image :src="item.item_img" mode="aspectFill"></image>
							</view>
							<view class="view5">
								<view class="gui-ellipsis fontsize28">{{item.item_title}}</view>
								<view class="fontsize22 color-999999 margin-t20 gui-ellipsis">{{item.seller_shop_title}}</view>
								<view class="color-999999 fontsize24 gui-flex gui-align-items-end gui-space-between margin-t20">
									<text class="color-FF0D00 fontsize30">￥{{item.item_price}}</text>
									<text class="fontsize22 color-999999">X{{item.item_num}}</text>
								</view>
							</view>
						</view>
						<view class="padding_lr30 padding_b30 gui-relative borderBottom">
							<view class="fontsize24 padding_t20 gui-flex gui-align-items-center gui-space-between">
								<text>订单编号：{{item.trade_parent_id}}</text>
							</view>
							<view class="fontsize24 padding_t20 gui-flex gui-align-items-center gui-space-between">
								<text>创建时间：{{item.created_at}}</text>
							</view>
						</view>
						<view class="padding_30 gui-flex gui-align-items-center gui-space-between">
							<view>
								<text class="fontsize24">共件{{item.item_num}}商品</text>
								<text class="fontsize24 margin-l20">
									<text>总计</text>
									<text class="color-FF0D00">￥{{item.alipay_total_price}}</text>
								</text>
							</view>
							<view class="gui-flex gui-align-items-center">
								<view class="orderBtn2_">{{item.statusTitle}}</view>
							</view>
						</view>
					</view>
				</navigator>
			</block>
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
					case -5: statusName = '已取消'; break;
					case 0: statusName = '未支付'; break;
					case 5: statusName = '已付款'; break;
					case 15: statusName = '已完成'; break;
				}
				return statusName;
			}
		},
		onLoad: function(e){
			_this = this;
			getApp().readMsgNum(14);
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
				if(_this.status == 1){
					url = 'swoft/api/tripartite/getTaobaoOrderList';
					postData.type = 1;
					postData.status = 99;
				}else{
					url = 'swoft/api/tripartite/getPddOrderList';
					postData.order_status = 99;
				}
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