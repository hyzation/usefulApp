<template>
	<gui-page :isLoading="pageLoading" ref="guiPage">
		<view slot="gBody" class="fm">
			<view class="main gui-flex gui-space-between gui-align-items-center" @tap="showAttr(1)">
				<gui-image :timer="0" src="../../../static/images/address.png" :width="30" :height="41"></gui-image>
				<view class="gui-flex1 ml30">
					<block v-if="address">
						<view class="addressInfou gui-flex gui-align-items-center f28">
							<text class="addressInfoul">{{address.name}}</text>
							<text class="addressInfour">{{address.tel}}</text>
						</view>
						<view class="addressInfob line2 f24 c999999">{{address.province}}{{address.city}}{{address.county}}{{address.address}}</view>
					</block>
					<block v-else>
						<view class="addressInfou gui-flex gui-align-items-center f28">
							<text class="addressInfoul">暂无收货地址</text>
						</view>
						<view class="addressInfob line2 f24 c999999">立即添加收货地址</view>
					</block>
				</view>
				<!-- <text class="righti gui-icons">&#xe601;</text> -->
				<view class="pBtn">切换地址</view>
			</view>
			<view class="main" style="padding-bottom:0;">
				<view class="pb20 gui-flex gui-space-between gui-align-items-center">
					<view class="goodsImg gui-flex gui-justify-content-center gui-align-items-center">
						<image :src="postData.coverPath" mode="aspectFill"></image>
					</view>
					<view class="goodsInfo">
						<view class="goodsInfou gui-ellipsis">{{postData.title}}</view>
						<view class="goodsInfom gui-ellipsis">{{postData.desc}}</view>
						<view class="goodsInfob gui-flex gui-space-between gui-align-items-center">
							<text v-if="type == 1" class="goodsInfobl fb">￥{{postData.price}}</text>
							<text v-else class="goodsInfobl fb">{{parseInt(postData.score)}}积分</text>
						</view>
					</view>
				</view>
			</view>
			<view class="main">
				<view class="gui-flex gui-space-between gui-align-items-center">
					<text class="mainTxt">运费</text>
					<text class="mainTxt1">到付</text>
				</view>
			</view>
			<view class="main">
				<view class="gui-flex gui-space-between gui-align-items-center">
					<text class="mainTxt">数量</text>
					<gui-step-box buttonStyle="width:60rpx;height:60rpx;background-color:#F5F5F9;text-align:center;line-height:60rpx;font-size:40rpx;"
						inputStyle="border-radius:0;background-color:#e2e2e2;font-size:30rpx;height:60rpx;" 
						:value="num" :minNum="type == 1 ? 1 : 5" @change="numberChange" :disabled="true">
					</gui-step-box>
				</view>
			</view>
			<view class="main">
				<view class="gui-flex gui-space-between gui-align-items-center">
					<block v-if="type == 1">
						<text class="mainTxt">{{payTypeTxt}}支付</text>
						<view class="pBtn" @tap="$refs.payWay.open()">切换支付</view>
					</block>
					<block v-else>
						<text class="mainTxt">支付方式</text>
						<view v-if="type == 1" class="gui-flex gui-align-items-center gui-justify-content-end lh30" @tap="$refs.payWay.open()">
							<text class="f26 c999999">{{payTypeTxt}}</text>
							<text class="righti gui-icons ml10">&#xe601;</text>
						</view>
						<view v-else class="gui-flex gui-align-items-center gui-justify-content-end lh30">
							<text class="f26 c999999">积分</text>
						</view>
					</block>
				</view>
			</view>
			<view class="bottomH"></view>
			<view class="bottom gui-flex gui-space-between gui-align-items-center gui-fixed-lb">
				<view class="gui-flex gui-align-items-center">
					<text class="mainTxt4">实付：</text>
					<block v-if="type == 1">
						<text class="fb f24 cFF4F00" style="height:30rpx;line-height:34rpx;">￥</text>
						<text class="fb f32 lh32 cFF4F00">{{realPrice}}</text>
					</block>
					<block v-else>
						<text class="fb f32 lh32 cFF4F00">{{realPrice}}积分</text>
					</block>
				</view>
				<view class="bottomr" @tap="submitOrder">提交订单</view>
			</view>
			<!-- 地址/抵扣券选择 -->
			<view @tap="closeAttr" :class="'bgScreen animate '+animateName" v-if="attrShow">
				<view class="bgScreenC gui-absolute-lb" :class="attrType == 1 ? 'bgFFFFFF' : 'bgF5F5F9'" @tap.stop="">
					<text class="c999999 gui-h5 gui-icons gui-absolute-rt rt20" @tap="closeAttr">&#xe632;</text>
					<view class="attrTitle mainTxt">{{attrType == 1 ? '收货地址' : '抵扣券'}}</view>
					<text v-if="attrType == 2" class="c999999 f24 gui-absolute-lt lt20" @tap="noUseCoupon">不使用抵扣券</text>
					<block v-if="attrType == 1">
						<scroll-view class="attrScroll" :scroll-y="true">
							<block v-for="(item, index) in addressList" :key="index">
								<view @tap="chooseAddr(index)" class="addrLi gui-flex gui-space-between gui-align-items-center gui-relative borderTop">
									<text class="radio gui-icons">{{item.checked ? '&#xe7f8;' : '&#xe762;'}}</text>
									<view class="addressInfo width630">
										<view class="addressInfou gui-flex gui-align-items-center f28">
											<text class="addressInfoul">{{item.name}}</text>
											<text class="addressInfour">{{item.tel}}</text>
										</view>
										<view class="addressInfob line2 f24 c999999">{{item.province}}{{item.city}}{{item.county}}{{item.address}}</view>
									</view>
								</view>
							</block>
							<block v-if="addressList.length == 0">
								<gui-empty>
									<view slot="img" class="gui-flex gui-rows gui-justify-content-center margint-150">
										<image class="gui-empty-img" src="../../../static/images/empty.png"></image>
									</view>
									<text slot="text" class="f26 gui-block-text gui-text-center gui-margin-top color16A1A6">您还没有添加收货地址~</text>
								</gui-empty>
								<view class="height100"></view>
							</block>
						</scroll-view>
						<navigator hover-class="" url="/pages/my/setting/editAddress?id=0" class="sure">添加地址</navigator>
					</block>
				</view>
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
	var _this;
	export default {
		data() {
			return {
				userInfo: null,
				attrShow: false,
				animateName: 'bounceInUp',
				pageLoading: true,
				attrType: 1,
				addressList: [],
				postData: null,
				num: 1,
				totalWeight: 0,
				totalPrice: '0.00',
				realPrice: '0.00',
				address: null,
				payType: 1,
				payTypeTxt: '微信',
				type: 1
			}
		},
		onShow: function(){
			_this.getUserAddress();
		},
		onLoad: function(e){
			_this = this;
			_this.type = e.type;
			_this.postData = uni.getStorageSync('postData');
			uni.removeStorageSync('postData');
			if(_this.type == 1){
				_this.num = 1;
				_this.totalPrice = (Number(_this.postData.price)*_this.num).toFixed(2);
				_this.realPrice = _this.totalPrice;
			}else{
				_this.payType = 3;
				_this.num = 5;
				_this.totalPrice = parseInt(Number(_this.postData.score)*_this.num);
				_this.realPrice = _this.totalPrice;
			}
		},
		onReady: function(){

		},
		methods: {
			numberChange: function(e){
				_this.num = e[0];
				if(_this.type == 1){
					_this.totalPrice = (Number(_this.postData.price)*_this.num).toFixed(2);
				}else{
					_this.totalPrice = parseInt(Number(_this.postData.score)*_this.num);
				}
				_this.realPrice = _this.totalPrice;
			},
			changePayType: function(e,opt){
				_this.payType = e;
				_this.payTypeTxt = opt;
				_this.$refs.payWay.close();
			},
			getUserAddress: function(){
				uni.gRequest.post(
					'swoft/api/userAddress/getUserAddressList',
					{
						data: {
							uid: uni.getStorageSync('userInfo').id
						}
					}, 
					(res) => {
						if(res.code == 0){
							_this.addressList = res.data;
							if(_this.address == null){
								for(var i=0;i<res.data.length;i++){
									if(res.data[i].isDefault == 1){
										res.data[i].checked = true;
										_this.address = res.data[i];
									}
								}
							}
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
			chooseAddr: function(index){
				_this.addressList.map((setp,move)=>{
					if(index == move){
						setp.checked = true;
						_this.address = setp;
					}else{
						setp.checked = false;
					}
				})
				_this.closeAttr();
			},
			submitOrder: function(){
				if(_this.address == null){
					_this.$refs.guiPage.openMessage('default','请选择收货地址',true,1500);
					return false;
				}
				// if(_this.payType == 1){
				// 	_this.$refs.guiPage.openMessage('default','微信支付尚未开通,请选择其他方式支付',true,1500);
				// 	return false;
				// }
				let postData = {
					uid: uni.getStorageSync('userInfo').id,
					name: _this.address.name,
					tel: _this.address.tel,
					provinceCode: _this.address.provinceCode,
					cityCode: _this.address.cityCode,
					countyCode: _this.address.countyCode,
					province: _this.address.province,
					city: _this.address.city,
					county: _this.address.county,
					address: _this.address.address,
					posGoodsId: _this.postData.id,
					deposit: _this.postData.deposit,
					num: _this.num,
					totalPrice: _this.totalPrice,
					payType: _this.payType
				}
				//#ifdef H5
				postData.type = 'H5';
				if(_this.payType == 1){
					postData.return_url = 'https://useful.youyong.org.cn/H5/#/pages/zengzhi/pos/order?status=99';
				}else{
					postData.return_url = '';
				}
				//#endif
				_this.pageLoading = true;
				uni.gRequest.post(
					'swoft/api/pos/addPosGoodsOrder',
					{
						data: postData
					}, 
					(res) => {
						if(res.code == 0){
							if(_this.payType == 3){
								_this.pageLoading = false;
								_this.$refs.guiPage.openMessage('success','下单成功',true,1500);
								setTimeout(function(){
									uni.redirectTo({
										url: '/pages/zengzhi/pos/order?status=99'
									})
								},1500);
							}else{
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
										}else{
											_this.$refs.guiPage.openMessage('default',res.errMsg,true,1500);
										}
										setTimeout(function(){
											uni.redirectTo({
												url: '/pages/zengzhi/pos/order?status=99'
											})
										},1500);
									},
									fail: function (err) {
										_this.pageLoading = false;
										if(err.errMsg == 'requestPayment:fail cancel'){
											_this.$refs.guiPage.openMessage('default','您已取消支付',true,1500);
										}else{
											_this.$refs.guiPage.openMessage('default','支付失败',true,1500);
										}
										setTimeout(function(){
											uni.redirectTo({
												url: '/pages/zengzhi/pos/order?status=99'
											})
										},1500);
									}
								});
								//#endif
								//#ifdef H5
								window.location.href = res.data.url;
								//#endif
							}
						}else if(res.code == 2){
							_this.pageLoading = false;
							_this.$refs.guiPage.openMessage('default',res.msg,true,1500);
							setTimeout(function(){
								uni.redirectTo({
									url: '/pages/zengzhi/pos/order?status=99'
								})
							},1500); 
						}else{
							_this.pageLoading = false;
							_this.$refs.guiPage.openMessage('default',res.msg,true,1500);
						}
					},
					(error) => {
						_this.pageLoading = false;
						_this.$refs.guiPage.openMessage('default','请求错误',true,1500);
					},
					(res) => {},
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
	.bottom{padding:30rpx 30rpx 30rpx 40rpx;background-color:#FFFFFF;width:680rpx;}
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