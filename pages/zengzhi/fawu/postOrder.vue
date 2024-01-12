<template>
	<gui-page :isLoading="pageLoading" ref="guiPage">
		<view slot="gBody" class="fm">
			<view class="main" style="padding-bottom:0;">
				<view class="pb20 gui-flex gui-space-between gui-align-items-center">
					<view class="goodsImg gui-flex gui-justify-content-center gui-align-items-center">
						<image :src="postData.coverPath" mode="aspectFill"></image>
					</view>
					<view class="goodsInfo">
						<view class="goodsInfou gui-ellipsis">{{postData.title}}</view>
						<view class="goodsInfom gui-ellipsis">{{postData.desc}}</view>
						<view class="goodsInfob gui-flex gui-space-between gui-align-items-center">
							<text class="goodsInfobl fb">￥{{postData.price}}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="main">
				<view class="gui-flex gui-space-between gui-align-items-center">
					<text class="mainTxt">金额</text>
					<text class="fb f28">￥{{postData.price}}</text>
				</view>
			</view>
			<view class="main">
				<view class="gui-flex gui-space-between gui-align-items-center">
					<text class="mainTxt">{{payTypeTxt}}支付</text>
					<view class="pBtn" @tap="$refs.payWay.open()">切换支付</view>
					<!-- <text class="mainTxt">支付方式</text>
					<view class="gui-flex gui-align-items-center gui-justify-content-end lh30" @tap="$refs.payWay.open()">
						<text class="f26 c999999">{{payTypeTxt}}</text>
						<text class="righti gui-icons ml10">&#xe601;</text>
					</view> -->
				</view>
			</view>
			<view class="main">
				<view class="gui-flex gui-space-between gui-align-items-center">
					<text class="mainTxt">姓名</text>
					<input v-model="name" placeholder="请填写姓名" class="gui-text-right f28" style="width:500rpx;" />
				</view>
			</view>
			<view class="main">
				<view class="gui-flex gui-space-between gui-align-items-center">
					<text class="mainTxt">电话</text>
					<input v-model="tel" :maxlength="11" type="number" placeholder="请填写电话" class="gui-text-right f28" style="width:500rpx;" />
				</view>
			</view>
			<view class="main">
				<view class="gui-flex gui-space-between gui-align-items-center">
					<text class="mainTxt">欠款总金额</text>
					<input v-model="debt" type="number" placeholder="请填写欠款总金额" class="gui-text-right f28" style="width:500rpx;" />
				</view>
			</view>
			<view class="main">
				<view class="gui-flex gui-space-between gui-align-items-center">
					<text class="mainTxt">信用卡银行</text>
					<input v-model="bank" placeholder="请填写信用卡银行" class="gui-text-right f28" style="width:500rpx;" />
				</view>
			</view>
			<view class="bottomH"></view>
			<view class="bottom gui-flex gui-space-between gui-align-items-center gui-fixed-lb">
				<view class="gui-flex gui-align-items-center">
					<text class="mainTxt4">实付：</text>
					<text class="fb f24 cFF4F00" style="height:30rpx;line-height:34rpx;">￥</text>
					<text class="fb f32 lh32 cFF4F00">{{postData.price}}</text>
				</view>
				<view class="bottomr" @tap="submitOrder">提交订单</view>
			</view>
			<!-- 选择支付 -->
			<gui-popup ref="payWay" position="center" :canCloseByShade="false" bgColor="rgba(0,0,0,0.85)" width="750rpx">
				<view @tap="$refs.payWay.close()" style="width:48rpx;margin:30rpx auto;">
					<gui-image src="../../../static/images/zheng/close.png" :timer="0" :width="48" :height="48"></gui-image>
				</view>
				<view class="payWayBox pb20">
					<view class="gui-text-center f36 fb" style="line-height:36rpx;padding:80rpx 0 40rpx 0;">支付方式</view>
					<view @tap="changePayType(1,'微信')" class="pt30 pb30 mlr40 gui-flex gui-align-items-center gui-space-between">
						<view class="gui-flex gui-align-items-center">
							<gui-image src="../../../static/images/zheng/pay1.png" :timer="0" :width="40" :height="40"></gui-image>
							<text class="fm f28 ml20">微信支付</text>
						</view>
						<text class="gui-icons" :class="payType == 1 ? 'cFF4F00 f32' : 'c999999 f32'">{{payType == 1 ? '&#xe685;' : '&#xe762;'}}</text>
					</view>
					<view @tap="changePayType(2,'支付宝')" class="pt30 pb30 mlr40 gui-flex gui-align-items-center gui-space-between gui-relative borderTop">
						<view class="gui-flex gui-align-items-center">
							<gui-image src="../../../static/images/zheng/pay2.png" :timer="0" :width="40" :height="40"></gui-image>
							<text class="fm f28 ml20">支付宝支付</text>
						</view>
						<text class="gui-icons" :class="payType == 2 ? 'cFF4F00 f32' : 'c999999 f32'">{{payType == 2 ? '&#xe685;' : '&#xe762;'}}</text>
					</view>
				</view>
			</gui-popup>
		</view>
	</gui-page>
</template>
<script>
	var graceChecker = require("@/GraceUI5/js/checker.js");
	var _this;
	export default {
		data() {
			return {
				userInfo: null,
				attrShow: false,
				animateName: 'bounceInUp',
				pageLoading: false,
				attrType: 1,
				postData: null,
				payType: 1,
				payTypeTxt: '微信',
				name: '',
				tel: '',
				debt: '',
				bank: ''
			}
		},
		onShow: function(){
			
		},
		onLoad: function(e){
			_this = this;
			_this.postData = uni.getStorageSync('postData');
			uni.removeStorageSync('postData');
		},
		onReady: function(){

		},
		methods: {
			changePayType: function(e,opt){
				_this.payType = e;
				_this.payTypeTxt = opt;
				_this.$refs.payWay.close();
			},
			showAttr: function(e){
				_this.attrType = e;
				if(e == 2 && !_this.isUseCoupon){
					return false;
				}
				_this.animateName = 'bounceInUp';
				_this.attrShow = true;
			},
			closeAttr: function(){
				_this.animateName = 'bounceOutDown';
				setTimeout(function(){
					_this.attrShow = false;
				},1000)
			},
			submitOrder: function(){
				let postData = {};
				postData.name = _this.name;
				postData.tel = _this.tel;
				postData.debt = _this.debt;
				postData.bank = _this.bank;
				var rule = [
					{name: "name", checkType: "notnull", checkRule: "", errorMsg: "请填写姓名"},
					{name: "tel", checkType: "notnull", checkRule: "", errorMsg: "请填写手机号码"},
					{name: "tel", checkType: "phoneno", checkRule: "", errorMsg: "手机号码格式不正确"},
					{name: "debt", checkType: "notnull", checkRule: "", errorMsg: "请填写欠款总金额"},
					{name: "bank", checkType: "notnull", checkRule: "", errorMsg: "请填写信用卡银行"},
				];
				var checkRes = graceChecker.check(postData, rule);
				if(!checkRes){
					_this.$refs.guiPage.openMessage('default',graceChecker.error,true,1500);
					return false;
				}
				// if(_this.payType == 1){
				// 	_this.$refs.guiPage.openMessage('default','微信支付尚未开通,请选择其他方式支付',true,1500);
				// 	return false;
				// }
				postData.uid = uni.getStorageSync('userInfo').id;
				postData.fawuGoodsId = _this.postData.id;
				postData.totalPrice = _this.postData.price;
				postData.payMoney = _this.postData.price;
				postData.debt = _this.debt;
				postData.bank = _this.bank;
				postData.payType = _this.payType;
				postData.mValue = _this.postData.mValue;
				//#ifdef H5
				postData.type = 'H5';
				if(_this.payType == 1){
					postData.return_url = 'https://useful.youyong.org.cn/H5/#/pages/zengzhi/fawu/order';
				}else{
					postData.return_url = '';
				}
				//#endif
				_this.pageLoading = true;
				uni.gRequest.post(
					'swoft/api/fw/addFwOrder',
					{
						data: postData
					}, 
					(res) => {
						if(res.code == 0){
							// 调起APP支付
							//#ifdef APP-PLUS
							let provider = '';
							let orderInfo = {};
							if(_this.payType == 1){
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
											uni.redirectTo({
												url: '/pages/zengzhi/fawu/order?status=99'
											})
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
						}
					},
					(error) => {
						_this.pageLoading = false;
						_this.$refs.guiPage.openMessage('default','请求错误',true,1500);
					},
					(res) => {
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
	/* 引入动画库 */
	@import "@/GraceUI5/css/animate.css";
	/* 定义动画修饰样式 */
	.animate{animation-duration: 1s; animation-timing-function:linear;}
	page{background-color:#F8F8F8;}
	.main{margin:20rpx 20rpx 0 20rpx;padding:30rpx 20rpx;background-color:#FFFFFF;border-radius:10rpx;}
	.addressi{font-size:52rpx;color:#FF4F00;}
	.righti{color:#999999;}
	.addressInfo{width:560rpx;}
	.addressInfou{line-height:30rpx;}
	.addressInfoul{}
	.addressInfour{margin-left:10rpx;}
	.addressInfob{margin-top:20rpx;line-height:32rpx;}
	.addressInfoNo{font-size:28rpx;color:#666666;}
	.marginb30{margin-bottom:30rpx;}
	.goodsImg{width:160rpx;height:160rpx;}
	.goodsImg image{width:100%;height:100%;border-radius:20rpx;}
	.goodsInfo{width:490rpx;}
	.goodsInfou{font-size:28rpx;}
	.goodsInfom{font-size:24rpx;color:#999999;height:70rpx;line-height:70rpx;}
	.goodsInfob{}
	.goodsInfobl{font-size:30rpx;color:#FF4F00;}
	.goodsInfobr{font-size:24rpx;color:#999999;}
	.mainTxt{font-size:28rpx;}
	.mainTxt1{font-size:26rpx;color:#999999;}
	.paddingT20{padding-top:20rpx;}
	.radio{color:#FF4F00;margin-right:20rpx;font-size:32rpx;}
	.mainTxt2{font-size:26rpx;}
	.mainTxt3{font-size:30rpx;}
	.mainTxt4{font-size:28rpx;}
	.mainTxt5{font-size:30rpx;color:#FF4F00;}
	.bottom{padding:30rpx 30rpx 30rpx 40rpx;background-color:#FFFFFF;width:660rpx;}
	.bottomr{width:180rpx;height:74rpx;line-height:74rpx;text-align:center;border-radius:37rpx;background-color:#FF4F00;color:#FFFFFF;font-size:30rpx;}
	.bottomH{height:180rpx;}
	.bgScreen{background-color:rgba(0,0,0,0.85);width:750rpx;position:fixed;z-index:99999;left:0;top:0;bottom:0;flex:1;}
	.bgScreenC{width:100%;border-radius:20rpx 20rpx 0 0;}
	.rt20{right:20rpx;top:20rpx;}
	.lt20{left:30rpx;top:30rpx;}
	.sure{margin:30rpx 60rpx 30rpx 60rpx;height:80rpx;border-radius:40rpx;text-align:center;line-height:80rpx;color:#FFFFFF;background-color:#FF4F00;font-size:30rpx;}
	.attrTitle{text-align:center;height:90rpx;line-height:90rpx;}
	.attrScroll{min-height:450rpx;max-height:900rpx;padding:0 30rpx;width:690rpx;}
	.attrScroll_{min-height:450rpx;max-height:900rpx;}
	.width630{width:630rpx;}
	.addrLi{padding:30rpx 0;}
	.couponLi{padding:10rpx 0;}
	.color999999{color:#999999;}
	.sbtn{font-size:20rpx;color:#FFFFFF;border-radius:6rpx;padding:0 2rpx;margin-right:10rpx;}
	.sbtnbg1{background-color:#EA333F;}
	.sbtnbg2{background-color:#FF4F00;}
	.shopLiInfou_{width:400rpx;font-size:28rpx;}
	.tips{padding:10rpx 30rpx 0 60rpx;font-size:22rpx;color:#999999;}
	.height100{height:100rpx;}
	.margint-150{margin-top:-150rpx;}
	.payWayBox{width:542rpx;background:url(../../../static/images/zheng/bg04.png) no-repeat;background-size:100% 100%;margin:0 auto;}
	.ptb25{padding-top:24rpx;padding-bottom:24rpx;}
	.h20{height:20rpx;}
	.h100{height: 100rpx}
	.h165{height: 165rpx;}
	.w215{width: 215rpx;}
	.w60{width: 60rpx;}
	.w630{width: 630rpx;}
	.coupon{width: 690rpx;height: 165rpx;}
	.ml30{margin-left: 30rpx;}
	.ml80{margin-left: 80rpx;}
	.ml226{margin-left: 236rpx;}
	.cFFA075{color: #FFA075;}
	.f70{font-size: 70rpx;}
</style>