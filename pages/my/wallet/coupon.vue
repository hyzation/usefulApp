<template>
	<gui-page :isLoading="pageLoading" ref="guiPage">
		<view class="fixed-top-view" slot="gFixedTop">
			<view class="wp100 bgff fb gui-flex gui-align-items-center" style="height:80rpx;">
				<gui-switch-navigation :items="items" :width="750"
				@change="navchange" textAlign="center" :isCenter="true" activeDirection="center" :size="0" :activeFontWeight="400"
				activeLineBg="linear-gradient(to right, #FF4F00, #FF4F00)" activeColor="#FF4F00" color="#000000"
				:margin="80" padding="60rpx" activeLineRadius="6rpx"
				activeLineHeight="6rpx" lineHeight="40rpx" activeLineWidth='50rpx' fontSize="26rpx" activeFontSize="26rpx">
				</gui-switch-navigation>
			</view>
		</view>
		<view slot="gBody">
			<view style="height:80rpx;"></view>
			<block v-for="(item,index) in list" :key="index">
				<view class="coupon mt20 ml30 gui-relative">
					<gui-image :src="'/static/images/setting/coupon'+(item.status == 0 ? '1' : '')+'.png'" :width="690" :height="165" borderRadius="15rpx"></gui-image>
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
						<view class="f26 w60 cff gui-text-center">
							<view style="width:22rpx;">{{item.status == 0 ? '未使用' : (item.status == 1 ? '已使用' : '已过期')}}</view>
						</view>
					</view>
				</view>
			</block>
			<view class="fullPage gui-flex gui-justify-content-center gui-align-items-center fm gui-fixed-lt wp100" v-if="list.length == 0" style="margin-top:-100rpx;"><gui-image src="../../../static/images/noData.png" :width="396" :height="226" :timer="0"></gui-image></view>
			<view class="mt30 h100"></view>
			<navigator url="/pages/my/wallet/getcoupon" class="wp100 gui-fixed-lb bgff4f00 h100 gui-flex gui-align-items-center gui-space-between" hover-class="">
				<view class="gui-flex gui-align-items-center ml30">
					<gui-image :src="'/static/images/setting/quan.png'" :width="36"></gui-image>
					<text class="ml30 cff f26">更多抵扣券，去领券中心看看</text>
				</view>
				<view class="gui-icons cff mr30">&#xe601;</view>
			</navigator>
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
			status: 0,
			items: [{id:0,name:'未使用'},{id:1,name:'已使用'},{id:-1,name:'已过期'}]
		}
	},
	onLoad() {
		_this = this;
		_this.getUserCouponsList();
		getApp().readMsgNum(8);
	},
	methods:{
		navchange: function(index){
			if(_this.status != index){
				_this.status = _this.items[index].id;
				_this.getUserCouponsList();
			}
		},
		getUserCouponsList: function(){
			_this.pageLoading = true;
			uni.gRequest.post(
				'swoft/api/coupons/getUserCouponsList',
				{
					data: {
						status: _this.status,
						uid: uni.getStorageSync('userInfo').id
					}
				}, 
				(res) => {
					if(res.code == 0){
						_this.list = res.data;
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
	}
}
</script>
<style>
	@import url('@/static/css/li.css');
	page{background-color: #F5F5F9}
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
