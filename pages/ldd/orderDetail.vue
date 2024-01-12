<template>
	<gui-page :isLoading="pageLoading" :customHeader="false" class="bg-F8F8F8" ref="guiPage">
		<!-- 页面主体 -->
		<view slot="gBody" class="fm">
			<view class="padding_30">
				<view class="main gui-flex gui-space-between gui-align-items-center">
					<gui-image :timer="0" src="../../static/images/address.png" :width="30" :height="41" mode="aspectFit"></gui-image>
					<view class="addressInfo">
						<view class="addressInfou gui-flex gui-align-items-center">
							<text class="addressInfoul">{{data.name}}</text>
							<text class="addressInfour">{{data.mobile}}</text>
						</view>
						<view class="addressInfob line2">{{data.area}}</view>
					</view>
				</view>
				<view class="bg-FFFFFF border-r20 pl30 pr30 pb30">
					<text v-if="data.usefulStatus == 0" class="f28 pt20 c999999">已取消</text>
					<text v-if="data.usefulStatus == 1" class="f28 pt20 cFF4F00">待付款</text>
					<text v-if="data.usefulStatus == -2" class="f28 pt20 c999999">已退款</text>
					<block v-if="data.usefulStatus == 2">
						<view class="f28 pt20 cFF4F00" v-if="data.status == 1">待付款</view>
						<view class="f28 pt20 cFF4F00" v-if="data.status == 2">待发货</view>
						<view class="f28 pt20 cFF4F00" v-if="data.status == 3">待收货</view>
						<view class="f28 pt20 c999999" v-if="data.status == 4">已完成</view>
						<view class="f28 pt20 c999999" v-if="data.status == 5">已取消</view>
						<view class="f28 pt20 c999999" v-if="data.status == 6">已退款</view>
					</block>
					<view class="pb30 pt20 gui-relative borderBottom" v-for="(item,index) in data.sku_list" :key="index">
						<view class="gui-flex gui-space-between gui-align-items-center">
							<view class="view4 border-r10">
								<image :src="item.skuInfo.imgUrl" mode="aspectFill"></image>
							</view>
							<view class="view5">
								<view class="gui-ellipsis fontsize28">{{item.skuInfo.title}}</view>
								<view class="f24 color-999999 margin-t20 gui-ellipsis">{{item.skuInfo.option}}</view>
								<view class="color-999999 fontsize24 gui-flex gui-align-items-end gui-space-between margin-t20">
									<text class="cFF4F00 fontsize30">￥{{item.skuInfo.usefulPrice}}</text>
									<text class="f24 color-999999">x{{item.num}}</text>
								</view>
							</view>
						</view>
					</view>
					<view >
						<view class="fontsize28 padding_t20 gui-flex gui-align-items-center gui-space-between">
							<text>订单编号：{{data.third_order}}</text>
							<text class="cFF4F00 f28" @tap="copy(data.third_order)">复制</text>
						</view>
						<view class="fontsize28 padding_t20" v-if="data.create_time != ''">下单时间：{{data.create_time}}</view>
						<view class="fontsize28 padding_t20" v-if="data.usefulPayTime != 0">付款时间：{{data.pay_time}}</view>
						<view class="fontsize28 padding_t20" v-if="data.delivery_time != ''">发货时间：{{data.delivery_time}}</view>
						<view class="fontsize28 padding_t20" v-if="data.usefulGetTime != 0">收货时间：{{data.get_time}}</view>
						<view class="f26 padding_t20 gui-flex gui-align-items-center gui-justify-content-start">
							<gui-image :src="'../../static/images/zheng/pay'+data.payType+'.png'" :timer="0" :width="26" :height="26" class="mr10"></gui-image>
							<text v-if="data.payType == 1">微信支付</text>
							<text v-if="data.payType == 2">支付宝支付</text>
							<text v-if="data.payType == 3">现金券支付</text>
							<text v-if="data.payType == 4">余额支付</text>
						</view>
					</view>
				</view>
				<view class="bg-FFFFFF padding_30 margin-t30 border-r20">
					<view>
						<text class="fontsize28">商品总额</text>
						<text class="cFF4F00 float-r f30">￥{{data.goods_money}}</text>
					</view>
					<view class="margin-t30">
						<text class="fontsize28">运费</text>
						<text class="cFF4F00 float-r f30">￥{{data.freight}}</text>
					</view>
					<view class="margin-t30" v-if="data.payMoney > 0 && data.usefulStatus > 1">
						<text class="fontsize28">已支付</text>
						<text class="cFF4F00 float-r f30">￥{{data.payMoney}}</text>
					</view>
					<view class="text-right padding_t30" v-if="data.realPrice > 0 && data.usefulStatus == 1">
						<text class="f28">需付款：</text>
						<text class="cFF4F00 f30">￥{{data.payMoney}}</text>
					</view>
				</view>
			</view>
			<view class="h120"></view>
			<view class="padding30 gui-fixed-lb gui-flex gui-justify-content-end gui-align-items-center">
				<block v-if="data.usefulStatus == 0">
					<view class="orderBtn3" @tap.stop="openModel(data.id,-1,1)">删除订单</view>
				</block>
				<block v-if="data.usefulStatus == 1">
					<view class="orderBtn bg999999" @tap.stop="openModel(data.id,0,1)">取消订单</view>
					<view class="orderBtn bgFF4F00" @tap.stop="payOrder(data.id,data.payType,data.payMoney)">立即付款</view>
				</block>
				<block v-if="data.usefulStatus == -2">
					<view class="orderBtn3" @tap.stop="openModel(data.id,-1,1)">删除订单</view>
				</block>
				<block v-if="data.usefulStatus == -3">
					<text class="f28 cFF4F00">退货退款申请中</text>
				</block>
				<block v-if="data.usefulStatus == 2">
					<block v-if="data.status == 3">
						<view class="orderBtn bgFF4F00" @tap.stop="openModel(data.id,4,3)">确认收货</view>
					</block>
					<block v-if="data.status == 4">
						<view class="orderBtn3_" v-if="data.isCanRefund == 1" @tap.stop="openModel(data.id,-2,4)">申请退货退款</view>
					</block>
				</block>
			</view>
			<gui-modal ref="guimodal" :isCloseBtn="false" title="操作提示">
				<view slot="content" class="plt30tb40 gui-bg-gray">
					<view class="gui-text-center f30 fm">{{modalTitle}}</view>
				</view>
				<view slot="btns" class="gui-flex gui-rows gui-space-around">
					<view class="modal-btns" @tap="$refs.guimodal.close()">
						<text class="c999999 fb">取消</text>
					</view>
					<view class="modal-btns" @tap="changeOrderStatus">
						<text class="cFF4F00 fb">确认</text>
					</view>
				</view>
			</gui-modal>
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
				modalTitle: '',
				id_: 0,
				status_: 0,
				reStatus_: 0,
				item: null
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
					'swoft/api/ldd/getOrderDetail',
					{
						data: {
							uid: uni.getStorageSync('userInfo').id,
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
			},
			openModel: function(id,status,reStatus){
				if(status == -1){
					_this.modalTitle = '确定要删除该订单吗？';
				}else if(status == 0){
					_this.modalTitle = '确定要取消该订单吗？';
				}else if(status == 4){
					_this.modalTitle = '是否确认收货？';
				}else if(status == -2){
					_this.modalTitle = '确定要申请退货退款吗？';
				}
				_this.id_ = id;
				_this.status_ = status;
				_this.reStatus_ = reStatus;
				_this.$refs.guimodal.open();
			},
			changeOrderStatus: function(){
				_this.pageLoading = true;
				uni.gRequest.post(
					'swoft/api/ldd/editOrder',
					{
						data: {
							uid: uni.getStorageSync('userInfo').id,
							id: _this.id_,
							status: _this.status_,
							reStatus: _this.reStatus_
						}
					},
					(res) => {
						_this.$refs.guimodal.close();
						if(res.code == 0){
							_this.$refs.guiPage.openMessage('success',res.msg,true,1500);
							setTimeout(function(){
								_this.getOrderDetail();
							},1500);
						}else{
							_this.$refs.guiPage.openMessage('default',res.msg,true,1500);
							setTimeout(function(){
								_this.getOrderDetail();
							},1500);
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
			payOrder: function(id,payType,realPrice){
				let postData = {
					uid: uni.getStorageSync('userInfo').id,
					realPrice: realPrice,
					orderId: id,
					payType: payType
				};
				//#ifdef H5
				postData.type = 'H5';
				if(payType == 1){
					postData.return_url = 'https://useful.youyong.org.cn/H5/#/pages/my/order/detail?id='+_this.id;
				}else{
					postData.return_url = '';
				}
				//#endif
				_this.pageLoading = true;
				uni.gRequest.post(
					'swoft/api/order/reOrder',
					{
						data: postData
					}, 
					(res) => {
						if(res.code == 0){
							// 调起APP支付
							//#ifdef APP-PLUS
							let provider = '';
							let orderInfo = {};
							if(payType == 1){
								provider = 'wxpay';
								orderInfo = {
									"appid": res.data.appId,
									"noncestr": res.data.nonceStr,
									"package": res.data.package,
									"partnerid": res.data.partnerid,
									"prepayid": res.data.prepayid,
									"timestamp": res.data.timeStamp,
									"sign": res.data.paySign
								};
							}else{
								provider = 'alipay';
								orderInfo = res.data;
							}
							uni.requestPayment({
								provider: provider,
								orderInfo: orderInfo,
								success: function (res) {
									_this.pageLoading = false;
									if(res.errMsg == 'requestPayment:ok'){
										_this.$refs.guiPage.openMessage('success','支付成功',true,1500);
										setTimeout(function(){
											_this.getOrderDetail();
										},1500);
									}else{
										_this.$refs.guiPage.openMessage('default',res.errMsg,true,1500);
									}
								},
								fail: function (err) {
									_this.pageLoading = false;
									if(err.errMsg == 'requestPayment:fail cancel'){
										_this.$refs.guiPage.openMessage('default','您已取消支付',true,1500);
									}else{
										_this.$refs.guiPage.openMessage('default','支付失败',true,1500);
									}
								}
							});
							//#endif
							//#ifdef H5
							window.location.href = res.data.url;
							//#endif
						}else{
							_this.pageLoading = false;
							_this.$refs.guiPage.openMessage('default',res.msg,true,1500);
							setTimeout(function(){
								_this.reload();
							},1500);
						}
					},
					(error) => {
						_this.pageLoading = false;
						_this.$refs.guiPage.openMessage('default','请求错误',true,1500);
					},
					(res) => {
						
					},
					true,
					true
				);
			},
			navToWuliu(e) {
				uni.navigateTo({
					url: '/pages/ldd/wuliuInfo?ldd_order_no='+e
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
	.addressInfour{font-size:28rpx;color:#666666;margin-left:10rpx;}
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
	.orderBtn2{width:140rpx;text-align:center;height:60rpx;line-height:60rpx;border-radius:30rpx;font-size:26rpx;margin-left:20rpx;padding:0!important;border:thin solid #FF4F00;color:#FF4F00;;box-sizing:border-box;}
	.orderBtn3{width:140rpx;text-align:center;height:60rpx;line-height:60rpx;border-radius:30rpx;font-size:26rpx;margin-left:20rpx;padding:0!important;border:thin solid #666666;color:#666666;;box-sizing:border-box;}
	.orderBtn2_{width:140rpx;text-align:center;height:60rpx;line-height:60rpx;border-radius:30rpx;font-size:26rpx;margin-left:20rpx;border:thin solid #FF4F00;color:#FF4F00;box-sizing:border-box;}
	.orderBtn3_{padding:0 20rpx;min-width:120rpx;text-align:center;height:60rpx;line-height:60rpx;border-radius:30rpx;font-size:26rpx;margin-left:20rpx;border:thin solid #666666;color:#666666;;box-sizing:border-box;}
</style>