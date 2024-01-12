<template>
	<gui-page :isLoading="pageLoading" ref="guiPage">
		<view slot="gBody" class="fm">
			<view class="main gui-flex gui-space-between gui-align-items-center" @tap="showAttr(1)">
				<gui-image :timer="0" src="../../static/images/address.png" :width="30" :height="41" mode="aspectFit"></gui-image>
				<view class="gui-flex1 ml30">
					<block v-if="address">
						<view class="addressInfou gui-flex gui-align-items-center f28">
							<text class="addressInfoul">{{address.name}}</text>
							<text class="addressInfour">{{address.tel}}</text>
						</view>
						<view class="addressInfob line2 f26 c666666">{{address.province}}{{address.city}}{{address.county}}{{address.address}}</view>
					</block>
					<block v-else>
						<view class="addressInfou gui-flex gui-align-items-center f28">
							<text class="addressInfoul">暂无收货地址</text>
						</view>
						<view class="addressInfob line2 f26 c666666">立即添加收货地址</view>
					</block>
				</view>
				<!-- <text class="righti gui-icons">&#xe601;</text> -->
				<view class="pBtn">切换地址</view>
			</view>
			<view class="main" style="padding-bottom:0;">
				<view v-for="(item, index) in postData" :key="index" :class="index == 0 ? '' : 'pt20 gui-relative borderTop'" class="pb20 gui-flex gui-space-between gui-align-items-center">
					<view class="goodsImg gui-flex gui-justify-content-center gui-align-items-center">
						<image :src="item.goods_img" mode="aspectFill"></image>
					</view>
					<view class="goodsInfo">
						<view class="goodsInfou gui-ellipsis">{{item.goods_name}}</view>
						<view class="goodsInfom gui-ellipsis">{{item.goodsOptionName}}</view>
						<view class="goodsInfob gui-flex gui-space-between gui-align-items-center">
							<text class="goodsInfobl fb">￥{{item.price}}</text>
							<text class="goodsInfobr fm">x{{item.num}}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="main">
				<view class="gui-flex gui-space-between gui-align-items-center">
					<text class="mainTxt">配送服务</text>
					<text class="mainTxt1">{{Number(freight) == 0 ? '包邮' : '快递'}}</text>
				</view>
			</view>
			<view class="main">
				<view class="gui-flex gui-space-between gui-align-items-center">
					<text class="mainTxt">备注</text>
					<text class="f24 c999999 fm">{{length}}/45</text>
				</view>
				<textarea style="width:670rpx;height:80rpx;" v-model="remark" @input="changeLength" :maxlength="45" class="fm f28 mt20" placeholder="选填，给商家留言" placeholder-class="c999999"></textarea>
			</view>
			<view class="main">
				<view class="gui-flex gui-space-between gui-align-items-center pb30">
					<text class="mainTxt">商品金额</text>
					<text class="fb f28">￥{{totalPrice}}</text>
				</view>
				<view class="gui-flex gui-space-between gui-align-items-center pt30 pb30 gui-relative borderTop">
					<text class="mainTxt">运费</text>
					<text class="fb f28">￥{{freight}}</text>
				</view>
				<view class="gui-flex gui-space-between gui-align-items-center pt30 gui-relative borderTop">
					<text class="mainTxt">抵扣券</text>
					<view class="gui-flex gui-align-items-center gui-justify-content-end lh30" @tap="showAttr(2)">
						<text class="f26" :class="coupon ? 'cFF4F00' : 'c999999'">{{coupon ? '已抵扣'+coupon.jian.toFixed(2)+'元' : (isUseCoupon ? '请选择' : '')}}</text>
						<text class="righti gui-icons ml10">&#xe601;</text>
					</view>
				</view>
			</view>
			<view class="main">
				<view class="gui-flex gui-space-between gui-align-items-center">
					<text class="mainTxt">{{payTypeTxt}}支付</text>
					<view class="pBtn" @tap="$refs.payWay.open()">切换支付</view>
					<!-- <view class="gui-flex gui-align-items-center gui-justify-content-end lh30" @tap="$refs.payWay.open()">
						<text class="f26 c999999">{{payTypeTxt}}</text>
						<text class="righti gui-icons ml10">&#xe601;</text>
					</view> -->
				</view>
			</view>
			<view class="bottomH"></view>
			<view class="bottom gui-flex gui-space-between gui-align-items-center gui-fixed-lb">
				<view class="gui-flex gui-align-items-center">
					<text class="mainTxt4">实付：</text>
					<text class="fb f24 cFF4F00" style="height:30rpx;line-height:34rpx;">￥</text>
					<text class="fb f32 lh32 cFF4F00">{{realPrice}}</text>
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
										<image class="gui-empty-img" src="../../static/images/empty.png"></image>
									</view>
									<text slot="text" class="f26 gui-block-text gui-text-center gui-margin-top color16A1A6">您还没有添加收货地址~</text>
								</gui-empty>
								<view class="height100"></view>
							</block>
						</scroll-view>
						<navigator hover-class="" url="/pages/my/setting/editAddress?id=0" class="sure">添加地址</navigator>
					</block>
					<block v-else>
						<scroll-view class="attrScroll_" :scroll-y="true">
							<block v-for="(item,index) in couponList" :key="index">
								<view @tap="getIt(index)" class="coupon ml30 gui-relative">
									<gui-image :src="'../../static/images/setting/coupon'+(item.status == 0 ? '1' : '')+'.png'" :width="690" :height="165" borderRadius="15rpx"></gui-image>
									<view class="coupon gui-absolute-lt gui-flex gui-align-items-center gui-space-between">
										<view class="gui-flex gui-align-items-center w630">
											<view class="w215 no-scale">
												<view class="gui-padding">
													<text class="gui-text f30" :class="item.status == 0 ? 'cFF4F00' : 'c999999'">￥</text>
													<text class="gui-text f70 fb" :class="item.status == 0 ? 'cFF4F00' : 'c999999'">{{item.jian}}</text>
												</view>
												<view class="f26 gui-padding" :class="item.status == 0 ? 'cFFA075' : 'c999999'">满{{item.man}}元可用</view>
											</view>
											<view class="gui-padding">
												<view class="f26 fb gui-ellipsis" style="width:340rpx;">{{item.title}}</view>
												<view class="f26 c99 mt20">{{item.time}}到期</view>
												<view class="f22 c99 mt10">
													<block v-if="item.cate == 0 && item.category == 0">全分类商品可用</block>
													<block v-if="item.cate != 0 && item.category == 0">限{{item.cateTitle}}类商品可用</block>
													<block v-if="item.cate != 0 && item.category != 0">限{{item.cateTitle}}-{{item.categoryTitle}}类商品可用</block>
												</view>
											</view>
										</view>
										<view class="f26 w60 cFFFFFF gui-text-center">
											<view style="width:22rpx;">使用</view>
										</view>
									</view>
								</view>
								<view class="h20"></view>
							</block>
							<block v-if="couponList.length == 0">
								<gui-empty>
									<view slot="img" class="gui-flex gui-rows gui-justify-content-center margint-150">
										<image class="gui-empty-img" src="../../static/images/empty.png"></image>
									</view>
									<text slot="text" class="f26 gui-block-text gui-text-center gui-margin-top color16A1A6">暂无可用抵扣券~</text>
								</gui-empty>
								<view class="height100"></view>
							</block>
						</scroll-view>
					</block>
				</view>
			</view>
			<!-- 选择支付 -->
			<gui-popup ref="payWay" position="center" :canCloseByShade="false" bgColor="rgba(0,0,0,0.85)" width="750rpx">
				<view @tap="$refs.payWay.close()" style="width:48rpx;margin:30rpx auto;">
					<gui-image src="../../static/images/zheng/close.png" :timer="0" :width="48" :height="48"></gui-image>
				</view>
				<view class="payWayBox pb20" v-if="userInfo">
					<view class="gui-text-center f36 fb" style="line-height:36rpx;padding:80rpx 0 40rpx 0;">支付方式</view>
					<view @tap="changePayType(1,'微信')" class="pt30 pb30 mlr40 gui-flex gui-align-items-center gui-space-between">
						<view class="gui-flex gui-align-items-center">
							<gui-image src="../../static/images/zheng/pay1.png" :timer="0" :width="40" :height="40"></gui-image>
							<text class="fm f28 ml20">微信支付</text>
						</view>
						<text class="gui-icons" :class="payType == 1 ? 'cFF4F00 f32' : 'c999999 f32'">{{payType == 1 ? '&#xe685;' : '&#xe762;'}}</text>
					</view>
					<view @tap="changePayType(2,'支付宝')" class="pt30 pb30 mlr40 gui-flex gui-align-items-center gui-space-between gui-relative borderTop">
						<view class="gui-flex gui-align-items-center">
							<gui-image src="../../static/images/zheng/pay2.png" :timer="0" :width="40" :height="40"></gui-image>
							<text class="fm f28 ml20">支付宝支付</text>
						</view>
						<text class="gui-icons" :class="payType == 2 ? 'cFF4F00 f32' : 'c999999 f32'">{{payType == 2 ? '&#xe685;' : '&#xe762;'}}</text>
					</view>
					<view class="gui-relative borderTop pt30 pb30 mlr40">
						<view :class="Number(userInfo.cashCoupon) < Number(realPrice) ? 'opacity3' : ''" @tap="changePayType(3,'现金券')" class="gui-flex gui-align-items-center gui-space-between">
							<view class="gui-flex gui-align-items-center">
								<gui-image src="../../static/images/zheng/pay3.png" :timer="0" :width="40" :height="40"></gui-image>
								<text class="fm f28 ml20">现金券支付</text>
								<text class="fm f22">（可用￥{{userInfo.cashCoupon}}）</text>
							</view>
							<text class="gui-icons" :class="payType == 3 ? 'cFF4F00 f32' : 'c999999 f32'">{{payType == 3 ? '&#xe685;' : '&#xe762;'}}</text>
						</view>
					</view>
					<view class="gui-relative borderTop pt30 pb30 mlr40">
						<view :class="Number(userInfo.money) < Number(realPrice) ? 'opacity3' : ''" @tap="changePayType(4,'余额')" class="gui-flex gui-align-items-center gui-space-between">
							<view class="gui-flex gui-align-items-center">
								<gui-image src="../../static/images/zheng/pay4.png" :timer="0" :width="40" :height="40"></gui-image>
								<text class="fm f28 ml20">余额支付</text>
								<text class="fm f22">（可用￥{{userInfo.money}}）</text>
							</view>
							<text class="gui-icons" :class="payType == 4 ? 'cFF4F00 f32' : 'c999999 f32'">{{payType == 4 ? '&#xe685;' : '&#xe762;'}}</text>
						</view>
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
				couponList: [],
				coupon: null,
				isUseCoupon: true,
				isUseScore: false,
				postData: null,
				num: 0,
				totalWeight: 0,
				totalPrice: '0.00',
				realPrice: '0.00',
				freight: '0.00',
				address: null,
				shopCartIdList: '',
				length: 0,
				payType: 1,
				payTypeTxt: '微信',
				remark: ''
			}
		},
		onShow: function(){
			_this.getUserAddress();
			_this.getUserInfo();
		},
		onLoad: function(e){
			_this = this;
			_this.postData = uni.getStorageSync('postData');
			uni.removeStorageSync('postData');
			_this.totalWeight = e.totalWeight;
			_this.totalPrice = e.totalPrice;
			_this.realPrice = e.totalPrice;
			_this.num = e.num;
			_this.shopCartIdList = e.shopCartIdList;
			_this.getUserCouponsList();
		},
		onReady: function(){

		},
		methods: {
			getUserInfo: function(){
				uni.gRequest.post(
					'swoft/api/user/getUserInfo',
					{
						data: {
							id: uni.getStorageSync('userInfo').id
						}
					}, 
					(res) => {
						if(res.code == 0){
							_this.userInfo = res.data;
							uni.setStorageSync('userInfo',res.data);
						}else{
							_this.$refs.guiPage.openMessage('default',res.msg,true,1500);
						}
					},
					(error) => {
						_this.$refs.guiPage.openMessage('default','请求错误',true,1500);
					},
					(res) => {},
					true,
					true
				);
			},
			changePayType: function(e,opt){
				if(e == 3){
					if(Number(_this.userInfo.cashCoupon) < Number(_this.realPrice)){
						_this.$refs.guiPage.openMessage('default','现金券不足',true,1500);
						return false;
					}
				}else if(e == 4){
					if(Number(_this.userInfo.money) < Number(_this.realPrice)){
						_this.$refs.guiPage.openMessage('default','余额不足',true,1500);
						return false;
					}
				}
				_this.payType = e;
				_this.payTypeTxt = opt;
				_this.$refs.payWay.close();
			},
			changeLength: function(e){
				_this.length = e.detail.value.length;
			},
			countScore: function(){
				if(_this.isUseCoupon == 1 && _this.coupon != null){
					var couponMoney = _this.coupon.jian;
				}else{
					var couponMoney = 0;
				}
				_this.realPrice = (Number(_this.totalPrice)+Number(_this.freight)-couponMoney).toFixed(2);
			},
			getUserCouponsList: function(){
				uni.gRequest.post(
					'swoft/api/coupons/getUseCouponList',
					{
						data: {
							uid: uni.getStorageSync('userInfo').id,
							postData: JSON.stringify(_this.postData)
						}
					},
					(res) => {
						if(res.code == 0){
						 	_this.couponList = res.data;
						}
					},
					(error) => {
						_this.$refs.guiPage.openMessage('default','请求错误',true,1500);
					},
					(res) => {
						
					},
					true,
					true
				);
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
										_this.countFreight();
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
					},
					true,
					true
				);
			},
			countFreight: function(){
				_this.pageLoading = true;
				let postData = {
					uid: uni.getStorageSync('userInfo').id,
					provinceCode: _this.address.provinceCode,
					cityCode: _this.address.cityCode,
					countyCode: _this.address.countyCode,
					postData: JSON.stringify(_this.postData),
					totalPrice: parseFloat(_this.totalPrice)
				}
				uni.gRequest.post(
					'swoft/api/goods/countFreight',
					{
						data: postData
					}, 
					(res) => {
						_this.freight = res.freight;
						_this.realPrice = res.realPrice;
						_this.countScore();
					},
					(error) => {
						_this.$refs.guiPage.openMessage('default','请求错误',true,1500);
					},
					(res) => {
						setTimeout(function(){
							_this.pageLoading = false;
						},1000);
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
						_this.countFreight();
					}else{
						setp.checked = false;
					}
				})
				_this.closeAttr();
			},
			getIt: function(index){
				_this.couponList.map((setp,move)=>{
					if(index == move){
						setp.checked = true;
						_this.coupon = setp;
						var realPrice = Number(_this.totalPrice)+Number(_this.freight)-_this.coupon.jian;
						if(realPrice < 0){
							realPrice = 0;
						}
						_this.realPrice = realPrice.toFixed(2);
						_this.countScore();
					}else{
						setp.checked = false;
					}
				})
				_this.closeAttr();
			},
			noUseCoupon: function(){
				_this.coupon = null;
				_this.countScore();
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
				let userCouponsId = 0;
				let couponsMoney = 0;
				if(_this.isUseCoupon == 1 && _this.coupon != null){
					userCouponsId = _this.coupon.id;
					couponsMoney = _this.coupon.jian;
				}
				let everyRefund =  Number((couponsMoney/Number(_this.num)).toFixed(2));
				let totalRefund = 0;
				_this.postData.forEach((item,index)=>{
					if(index < (_this.postData.length - 1)){
						item.refundMoney = item.totalPrice - everyRefund*item.num;
						totalRefund += item.refundMoney;
					}
				});
				_this.postData[(_this.postData.length - 1)].refundMoney = Number(_this.realPrice) - totalRefund;
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
					postData: JSON.stringify(_this.postData),
					num: _this.num,
					totalPrice: _this.totalPrice,
					totalWeight: _this.totalWeight,
					freight: _this.freight,
					userCouponsId: userCouponsId,
					couponsMoney: couponsMoney,
					realPrice: Number(_this.realPrice),
					shopCartIdList: _this.shopCartIdList,
					remark: _this.remark,
					payType: _this.payType
				}
				//#ifdef H5
				postData.type = 'H5';
				if(_this.payType == 1){
					postData.return_url = 'https://useful.youyong.org.cn/H5/#/pages/my/order/list?status=99';
				}else{
					postData.return_url = '';
				}
				//#endif
				_this.pageLoading = true;
				uni.gRequest.post(
					'swoft/api/order/addOrder',
					{
						data: postData
					}, 
					(res) => {
						if(res.code == 0){
							if(_this.payType == 3 || _this.payType == 4){
								_this.pageLoading = false;
								_this.$refs.guiPage.openMessage('success','下单成功',true,1500);
								setTimeout(function(){
									uni.redirectTo({
										url: '/pages/my/order/list?status=99'
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
												url: '/pages/my/order/list?status=99'
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
												url: '/pages/my/order/list?status=99'
											})
										},1500);
									}
								});
								//#endif
								//#ifdef H5
								window.location.href = res.data.url;
								//#endif
							}
						}else if(res.code == -2){
							_this.pageLoading = false;
							_this.$refs.guiPage.openMessage('default','商品'+res.data.goods_name+res.data.goodsOptionName+'库存不足',true,3000);
							setTimeout(function(){
								uni.navigateBack({
									delta: 1
								})
							},3000);
						}else if(res.code == 2){
							_this.pageLoading = false;
							_this.$refs.guiPage.openMessage('default',res.msg,true,1500);
							setTimeout(function(){
								uni.redirectTo({
									url: '/pages/my/order/list?status=99'
								})
							},1500); 
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
	.righti{color:#666666;}
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
	.goodsInfom{font-size:24rpx;color:#666666;height:70rpx;line-height:70rpx;}
	.goodsInfob{}
	.goodsInfobl{font-size:30rpx;color:#FF4F00;}
	.goodsInfobr{font-size:24rpx;color:#666666;}
	.mainTxt{font-size:28rpx;}
	.mainTxt1{font-size:26rpx;color:#666666;}
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
	.color999999{color:#666666;}
	.sbtn{font-size:20rpx;color:#FFFFFF;border-radius:6rpx;padding:0 2rpx;margin-right:10rpx;}
	.sbtnbg1{background-color:#EA333F;}
	.sbtnbg2{background-color:#FF4F00;}
	.shopLiInfou_{width:400rpx;font-size:28rpx;}
	.tips{padding:10rpx 30rpx 0 60rpx;font-size:22rpx;color:#666666;}
	.height100{height:100rpx;}
	.margint-150{margin-top:-150rpx;}
	.payWayBox{width:542rpx;background:url(../../static/images/zheng/bg04.png) no-repeat;background-size:100% 100%;margin:0 auto;}
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