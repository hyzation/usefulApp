<template>
	<gui-page :isLoading="pageLoading" :customHeader="false" class="bg-F8F8F8" ref="guiPage">
		<!-- 页面主体 -->
		<view slot="gBody" class="fm">
			<view class="p20" v-if="data">
				<view class="main gui-flex gui-space-between gui-align-items-center mb20">
					<gui-image :timer="0" src="../../static/images/address.png" :width="30" :height="41" mode="aspectFit"></gui-image>
					<view class="addressInfo">
						<view class="addressInfou gui-flex gui-align-items-center">
							<text class="addressInfoul">{{data.name}}</text>
							<text class="addressInfour">{{data.tel}}</text>
						</view>
						<view class="addressInfob line2">{{data.province}}{{data.city}}{{data.county}}{{data.address}}</view>
					</view>
				</view>
				<view class="bg-FFFFFF border-r20 pl30 pr30 pb30">
					<view class="pb30 pt20 gui-flex gui-space-between gui-align-items-center gui-relative borderBottom">
						<view class="view4 border-r10">
							<image :src="data.goodsImgUrl+'?imageslim'" mode="aspectFill"></image>
						</view>
						<view class="view5">
							<view class="gui-ellipsis fontsize28">{{data.goodsName}}</view>
							<view class="fontsize22 color-999999 margin-t20 gui-ellipsis">{{data.num}}{{data.unit}} - {{data.months}}期</view>
							<view class="color-999999 fontsize24 gui-flex gui-align-items-end gui-space-between margin-t20">
								<text class="cFF4F00 fontsize30">￥{{data.payMoney}}</text>
							</view>
						</view>
					</view>
					<view >
						<view class="fontsize28 padding_t20 gui-flex gui-align-items-center gui-space-between">
							<text>订单编号：{{data.orderNum}}</text>
							<text class="cFF4F00 f24" @tap="copy(data.orderNum)">复制</text>
						</view>
						<view class="fontsize28 padding_t20" v-if="data.payTime != '1970-01-01 08:00:00'">付款时间：{{data.payTime}}</view>
					</view>
				</view>
				<view class="mt20 gui-flex gui-align-items-center gui-space-between pb20">
					<view class="card_ card_l">
						<view class="c5F0900 fb f28 ml30 mt30">福利积分（待释放）</view>
						<view class="c8C4C3B fb f50 ml30 mt30">{{data.getScore1}}</view>
					</view>
					<view class="card_ card_r">
						<view class="c5F0900 fb f28 ml30 mt30">奖励积分（待释放）</view>
						<view class="c8C4C3B fb f50 ml30 mt30">{{data.getScore2}}</view>
					</view>
				</view>
				<view class="mt20 ml20 mr20 pl20 pr20 bgFFFFFF br10">
					<view class="gui-flex gui-align-items-center gui-space-between gui-text-center pt20 pb20 fb">
						<view class="f28 wp25">期数</view>
						<view class="f28 wp25">数量</view>
						<view class="f28 wp25">物流信息</view>
					</view>
					<view v-for="(item,index) in list" :key="index" class="gui-flex gui-align-items-center gui-space-between pt20 pb20 gui-relative borderTop">
						<view class="f28 wp25 gui-text-center">
							<view>第{{index+1}}期</view>
							<!-- <view class="mt10">{{item.monthTime}}</view> -->
						</view>
						<view class="f28 wp25 gui-text-center">{{item.num}}{{data.unit}}</view>
						<view class="wp25 f26">
							<block v-if="item.sendNum > 0">
								<view @tap="showExpress(item.sendJson)" class="cFF4F00 gui-text-center">查看配送信息</view>
							</block>
							<block v-else>
								<view class="c999999 gui-text-center">未配送</view>
							</block>
							<!-- <block v-if="item.status == 3">
								<view class="gui-flex gui-align-items-center gui-justify-content-end just">
									<text>{{item.ex_name}}</text>
									<text class="ml30 cFF4F00" @tap="navToWuliu(item.ex_code,item.expressNo,data.tel)">查看物流</text>
								</view>
								<view class="mt10 gui-text-right">单号：{{item.expressNo}}</view>
								<view class="mt10 gui-text-right">时间：{{item.sendTime}}</view>
							</block>
							<block v-else>
								<view class="c999999 gui-text-center">未配送</view>
							</block> -->
						</view>
					</view>
				</view>
			</view>
			<view class="h30"></view>
			<gui-popup ref="guipopupExpress" bgColor="rgba(0,0,0,0.5)" :zIndex="99" width="750rpx" :canCloseByShade="true">
				<view class="br10 bgF5F5F9 m20 pt20 pb20">
					<view class="gui-text-center gui-bold f30">物流信息</view>
					<view v-for="(item,index) in sendJson" :key="index" class="bgFFFFFF br10 p20 m20">
						<view class="f30 gui-bold">{{index+1}}/{{sendJson.length}}</view>
						<block v-if="item.status == 3">
							<view class="f26 mt10">时间：{{item.sendTime}}</view>
							<view class="f26 mt10 gui-flex gui-align-items-center gui-space-between">
								<text>单号：{{item.expressNo}}</text>
								<text>{{item.expressInfo.exName}} <text class="ml30 cFF4F00" @tap="navToWuliu(item.expressInfo.exCode,item.expressNo,data.tel)">查看物流</text></text>
							</view>
						</block>
						<block v-else>
							<view class="f28 mt10">未配送</view>
						</block>
					</view>
				</view>
			</gui-popup>
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
				data: null,
				list: [],
				sendJson: []
			}
		},
		onLoad: function(e){
			_this = this;
			_this.id = e.id;
		},
		onShow: function(){
			_this.getOrderDetail();
		},
		methods: {
			showExpress(e) {
				_this.sendJson = e;
				_this.$refs.guipopupExpress.open();
			},
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
				uni.gRequest.post(
					'swoft/api/fuligou/getOrderDetail',
					{
						data: {
							uid: uni.getStorageSync('userInfo').id,
							id: _this.id
						}
					}, 
					(res) => {
						if(res.code == 0){
							_this.data = res.data;
							_this.list = res.data.stage;
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
			},
			navToWuliu: function(expressCode,expressNo,tel){
				uni.navigateTo({
					url: '/pages/my/order/wuliuInfo?expressCode='+expressCode+'&expressNo='+expressNo+'&customerName='+tel.substr(-4)
				})
			}
		}
	}
</script>
<style>
	@import url("../../static/css/reset.css");
	page{background-color:#F8F8F8;}
	.view1{width: 40rpx;height: 40rpx;}
	.view2{width: 180rpx;height: 74rpx;line-height: 74rpx;}
	.view3{position: fixed;bottom: 0;}
	.view4{width: 170rpx;height: 170rpx;background: #F8F8F8;border-radius: 20rpx;}
	.view4 image{width: 100%;height: 100%;border-radius:20rpx;}
	.view5{width: 450rpx;}
	.view6{width: 52rpx;height: 52rpx;}
	.view7{width:500rpx;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;overflow: hidden;}
	.view8{width: 100rpx;}
	.view9{border: 1rpx solid #16A1A6;}
	.main{padding:30rpx;background-color:#FFFFFF;border-radius:20rpx;}
	.addressi{font-size:52rpx;color:#16A1A6;}
	.addressInfo{width:590rpx;}
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
	.card_{width:345rpx;height:200rpx;overflow:hidden;}
	.card_l{background: url(@/static/images/score/score1.png) no-repeat;background-size:cover;}
	.card_r{background: url(@/static/images/score/score2.png) no-repeat;background-size:cover;}
</style>