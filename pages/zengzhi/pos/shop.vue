<template>
	<gui-page :isLoading="pageLoading" ref='guiPage' :customHeader="true" statusBarStyle="background-color:#FF4F00;" headerStyle="background-color:#FF4F00;">
		<view slot="gHeader">
			<view class="gui-flex gui-nowrap gui-rows gui-align-items-center cFFFFFF">
				<view class="gui-header-leader-btns" hover-class="gui-tap" style="width:120rpx;">
					<text @tap="navBack" class="gui-icons">&#xe600;</text>
				</view>
				<view class="gui-flex1 gui-text-center">
					<text class="f36 fm gui-ellipsis">机具商城</text>
				</view>
				<view class="gui-text-right mr20" style="width:120rpx;">
					<navigator class="f28 fm" hover-class="" url="/pages/zengzhi/pos/order?status=99">我的订单</navigator>
				</view>
			</view>
		</view>
		<view slot="gBody">
			<view v-for="(item, index) in list" :key="index" class="m20 p20 bgFFFFFF br10 gui-flex gui-align-items-center gui-space-around">
				<gui-image :src="item.coverPath+'?imageslim'" :width="180" :height="180"></gui-image>
				<view class="gui-flex gui-align-items-center gui-justify-content-center gui-wrap" style="width:400rpx;">
					<view class="f34 fm">{{item.title}}</view>
					<view class="line mt20 gui-relative">
						<view class="lineDot"></view>
					</view>
					<view class="f24 fm mt20">{{item.desc}}</view>
					<view class="mt20 gui-flex gui-align-items-center gui-justify-content-start wp100">
						<view class="gui-flex gui-align-items-end">
							<text class="fb f30 cFF4F00" style="height:45rpx;line-height:55rpx;">￥</text>
							<text class="fb f45 lh45 cFF4F00">{{item.price}}</text>
						</view>
						<view class="buyBtn fm ml30" @tap="openPayWay(item)">立即购买</view>
					</view>
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
					<view class="buyBtn_ fm" @tap="paySure">确认支付</view>
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
			pageLoading: false,
			list: [],
			item: null,
			payType: 1
		}
	},
	onLoad() {
		_this = this;
		_this.getPosGoodsList();
	},
	onShow() {
		
	},
	onReady() {
		
	},
	methods:{
		navBack(){
			uni.gJS.back();
		},
		getPosGoodsList: function(){
			_this.pageLoading = true;
			uni.gRequest.post(
				'swoft/api/pos/getPosGoodsList',
				{
					data: {
						page: 1,
						limit: 10
					}
				}, 
				(res) => {
					if(res.code == 0){
						_this.list = res.data.data;
					}else{
						_this.$refs.guiPage.openMessage('default',res.msg,true,1500);
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
		openPayWay: function(e){
			_this.item = e;
			uni.setStorageSync('postData',e);
			uni.navigateTo({
				url: '/pages/zengzhi/pos/postOrder?type=1'
			});
			// _this.$refs.payWay.open();
		},
		changePayType: function(e){
			_this.payType = e;
		},
		paySure: function(){
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
			_this.pageLoading = true;
		}
	}
}
</script>
<style>
	page{background-color: #F5F5F9}
	.gui-header-leader-btns{width:68rpx; line-height:60rpx; font-size:50rpx; margin-left: 10rpx;}
	.line{width:100%;border-top:1px solid #FF4F00;}
	.lineDot{width:6px;height:6px;border-radius:50%;position:absolute;left:50%;background-color:#FF4F00;top:-3px;}
	.buyBtn{width:180rpx;height:50rpx;line-height:50rpx;text-align:center;border-radius:10rpx;color:#FFFFFF;background-color:#FF4F00;font-size:26rpx;letter-spacing:6rpx;}
	.payWayBox{width:542rpx;background:url(../../../static/images/zheng/bg04.png) no-repeat;background-size:100% 100%;margin:0 auto;}
	.buyBtn_{width:300rpx;height:70rpx;line-height:70rpx;text-align:center;border-radius:10rpx;color:#FFFFFF;background-color:#FF4F00;font-size:28rpx;margin:30rpx auto;}
</style>
