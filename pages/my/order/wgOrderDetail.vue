<template>
	<gui-page :isLoading="pageLoading" :customHeader="false" class="bg-F8F8F8" ref="guiPage">
		<!-- 页面主体 -->
		<view slot="gBody" class="fm" v-if="type == 2">
			<view class="padding_30">
				<view class="bg-FFFFFF border-r20 pl30 pr30 pb30">
					<view class="fontsize24 pt20 c999999">{{data.failReason}}</view>
					<view class="pb30 pt20 gui-flex gui-space-between gui-align-items-center gui-relative borderBottom">
						<view class="view4 border-r10">
							<image :src="data.goodsThumbnailUrl" mode="aspectFill"></image>
						</view>
						<view class="view5">
							<view class="gui-ellipsis fontsize28">{{data.goodsName}}</view>
							<view class="fontsize22 color-999999 margin-t20 gui-ellipsis">{{data.mallName}}</view>
							<view class="color-999999 fontsize24 gui-flex gui-align-items-end gui-space-between margin-t20">
								<text class="cFF4F00 fontsize30">￥{{data.goodsPrice/100}}</text>
								<text class="fontsize22 color-999999">x{{data.goodsQuantity}}</text>
							</view>
						</view>
					</view>
					<view >
						<view class="fontsize28 padding_t20 gui-flex gui-align-items-center gui-space-between">
							<text>订单编号：{{data.orderSn}}</text>
							<text class="cFF4F00 f24" @tap="copy(data.orderSn)">复制</text>
						</view>
						<view class="fontsize28 padding_t20">下单时间：{{data.orderCreateTime|dealTime}}</view>
						<view class="fontsize28 padding_t20">成团时间：{{data.orderGroupSuccessTime|dealTime}}</view>
						<view class="fontsize28 padding_t20">支付时间：{{data.orderPayTime|dealTime}}</view>
						<view class="fontsize28 padding_t20">收货时间：{{data.orderReceiveTime|dealTime}}</view>
						<view class="fontsize28 padding_t20">结算时间：{{data.orderSettleTime|dealTime}}</view>
						<view v-if="data.promotionAmount > 0" class="fontsize28 padding_t20 gui-flex gui-align-items-center gui-justify-content-start">
							<text>佣金金额：<text class="cFF4F00">￥{{data.promotionAmount}}</text></text>
						</view>
					</view>
				</view>
				<view class="bg-FFFFFF padding_30 margin-t30 border-r20">
					<view class="mb30 gui-flex gui-align-items-center gui-space-between" v-if="data.platformDiscount != 0">
						<text class="fontsize28">已优惠</text>
						<text class="cFF4F00 fontsize26">-￥{{data.platformDiscount/100}}</text>
					</view>
					<view class="gui-flex gui-align-items-center gui-space-between">
						<text class="fontsize28">实际支付金额</text>
						<text class="cFF4F00 fontsize26">￥{{data.orderAmount/100}}</text>
					</view>
				</view>
			</view>
			<view class="h120"></view>
			<view class="padding30 gui-fixed-lb gui-flex gui-justify-content-end gui-align-items-center">
				<view class="orderBtn2_">{{data.orderStatusDesc}}</view>
			</view>
		</view>
		<view slot="gBody" class="fm" v-else>
			<view class="padding_30">
				<view class="bg-FFFFFF border-r20 pl30 pr30 pb30">
					<view class="pb30 pt20 gui-flex gui-space-between gui-align-items-center gui-relative borderBottom">
						<view class="view4 border-r10">
							<image :src="data.item_img" mode="aspectFill"></image>
						</view>
						<view class="view5">
							<view class="gui-ellipsis fontsize28">{{data.item_title}}</view>
							<view class="fontsize22 color-999999 margin-t20 gui-ellipsis">{{data.seller_shop_title}}</view>
							<view class="color-999999 fontsize24 gui-flex gui-align-items-end gui-space-between margin-t20">
								<text class="cFF4F00 fontsize30">￥{{data.item_price}}</text>
								<text class="fontsize22 color-999999">x{{data.item_num}}</text>
							</view>
						</view>
					</view>
					<view >
						<view class="fontsize28 padding_t20 gui-flex gui-align-items-center gui-space-between">
							<text>订单编号：{{data.trade_parent_id}}</text>
							<text class="cFF4F00 f24" @tap="copy(data.trade_parent_id)">复制</text>
						</view>
						<view class="fontsize28 padding_t20">下单时间：{{data.created_at}}</view>
						<view class="fontsize28 padding_t20">更新时间：{{data.updated_at}}</view>
						<view v-if="data.fee > 0" class="fontsize28 padding_t20 gui-flex gui-align-items-center gui-justify-content-start">
							<text>佣金金额：<text class="cFF4F00">￥{{data.fee}}</text></text>
						</view>
					</view>
				</view>
				<view class="bg-FFFFFF padding_30 margin-t30 border-r20">
					<view class="gui-flex gui-align-items-center gui-space-between">
						<text class="fontsize28">实际支付金额</text>
						<text class="cFF4F00 fontsize26">￥{{data.alipay_total_price}}</text>
					</view>
				</view>
			</view>
			<view class="h120"></view>
			<view class="padding30 gui-fixed-lb gui-flex gui-justify-content-end gui-align-items-center">
				<view class="orderBtn2_">{{data.statusTitle}}</view>
			</view>
		</view>
	</gui-page>
</template>
<script>
	import uniCopy from '@/js_sdk/xb-copy/uni-copy.js'
	var _this;
	export default {
		data() {
			return {
				id: 0,
				pageLoading: true,
				data: {},
				type: 0
			}
		},
		filters: {
			dealTime(e) {
				if(e != 0){
					return uni.gJS.toDate(e,'str');
				}else{
					return '-----------------'; 
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
			},
		},
		onLoad: function(e){
			_this = this;
			_this.id = e.id;
			_this.type = e.type;
		},
		onShow: function(){
			_this.getOrderDetail();
		},
		methods: {
			copy(e) {
				uniCopy({
					content: e,
					success:(res)=>{
						_this.$refs.guiPage.openMessage('success','复制成功',true,1500);
					}
				})
			},
			getOrderDetail: function(){
				_this.pageLoading = true;
				let url = '';
				if(_this.type == 1){
					url = 'swoft/api/tripartite/getTaobaoOrderDetail';
				}else{
					url = 'swoft/api/tripartite/getPddOrderDetail';
				}
				uni.gRequest.post(
					url,
					{
						data: {
							id: _this.id
						}
					}, 
					(res) => {
						if(res.code == 0){
							_this.data = res.data;
						}
					},
					(error) => {
						_this.$refs.guiPage.openMessage('default','请求错误',true,1500);
					},
					(res) => {
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
			}		}
	}
</script>
<style>
	@import url("../../../static/css/reset.css");
	page{background-color:#F8F8F8;}
	.view1{width: 40rpx;height: 40rpx;}
	.view2{width: 180rpx;height: 74rpx;line-height: 74rpx;}
	.view3{position: fixed;bottom: 0;}
	.view4{width: 170rpx;height: 170rpx;background: #F8F8F8;border-radius: 20rpx;}
	.view4 image{width: 100%;height: 100%;border-radius:20rpx;}
	.view5{width: 430rpx;}
	.view6{width: 52rpx;height: 52rpx;}
	.view7{width:500rpx;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;overflow: hidden;}
	.view8{width: 100rpx;}
	.view9{border: 1rpx solid #16A1A6;}
	.main{padding:30rpx;background-color:#FFFFFF;border-radius:20rpx;margin:-10rpx 0 20rpx 0;}
	.addressi{font-size:52rpx;color:#16A1A6;}
	.addressInfo{width:570rpx;}
	.addressInfou{line-height:30rpx;}
	.addressInfoul{font-size:30rpx;}
	.addressInfour{font-size:28rpx;color:#999999;margin-left:10rpx;}
	.addressInfob{font-size:28rpx;margin-top:20rpx;line-height:32rpx;}
	.addressInfoNo{font-size:28rpx;color:#666666;}
	.padding30{padding:20rpx 30rpx;width:690rpx;background-color:#FFFFFF;}
	.orderBtn{width:140rpx;text-align:center;height:60rpx;line-height:60rpx;border-radius:30rpx;font-size:26rpx;margin-left:20rpx;color:#FFFFFF;padding:0!important;}
	.orderBtn_{width:120rpx;text-align:center;height:50rpx;line-height:50rpx;border-radius:25rpx;font-size:25rpx;margin-left:20rpx;color:#FFFFFF;}
	.bg16A1A6{background-color:#16A1A6;}
	.bg999999{background-color:#999999;}
	.h120{height:120rpx;}
	.w300{width:300rpx;}
	.sbtn{font-size:20rpx;color:#FFFFFF;border-radius:6rpx;padding:0 4rpx;margin-right:10rpx;}
	.sbtnbg1{background-color:#FF4F00;}
	.sbtnbg2{background-color:#FF4F00;}
	.width-r{width:350rpx;}
	.orderBtn2{width:140rpx;text-align:center;height:60rpx;line-height:60rpx;border-radius:30rpx;font-size:26rpx;margin-left:20rpx;padding:0!important;border:thin solid #FF4F00;color:#FF4F00;}
	.orderBtn3{width:140rpx;text-align:center;height:60rpx;line-height:60rpx;border-radius:30rpx;font-size:26rpx;margin-left:20rpx;padding:0!important;border:thin solid #999999;color:#999999;}
	.orderBtn2_{width:120rpx;text-align:center;height:50rpx;line-height:50rpx;border-radius:25rpx;font-size:25rpx;margin-left:20rpx;border:thin solid #FF4F00;color:#FF4F00;}
	.orderBtn3_{width:120rpx;text-align:center;height:50rpx;line-height:50rpx;border-radius:25rpx;font-size:25rpx;margin-left:20rpx;border:thin solid #999999;color:#999999;}
</style>