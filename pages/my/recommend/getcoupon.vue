<template>
	<gui-page :isLoading="pageLoading" ref="guiPage">
		<view slot="gBody">
			<block v-for="(item,index) in list" :key="index">
				<view class="coupon mt20 ml30 gui-relative">
					<gui-image :src="'/static/images/setting/coupon'+(userInfo.yBean >= item.yBean ? '1' : '')+'.png'" :width="690" :height="165"></gui-image>
					<view class="coupon gui-absolute-lt gui-flex gui-align-items-center gui-space-between">
						<view class="gui-flex gui-align-items-center w630">
							<view  class="w215 no-scale">
								<view class="gui-padding">
									<text class="gui-text f30 cff4f00">￥</text>
									<text class="gui-text f70 fb cff4f00">{{item.jian}}</text>
								</view>
								<view class="f26 cFFA075 gui-padding">满{{item.man}}元可用</view>
							</view>
							<view class="gui-padding">
								<view class="f26 fb gui-ellipsis" style="width:340rpx;">{{item.title}}</view>
								<view class="f22 c99 mt20">
									<block v-if="item.cate == 0 && item.category == 0">全分类商品可用</block>
									<block v-if="item.cate != 0 && item.category == 0">限{{item.cateTitle}}类商品可用</block>
									<block v-if="item.cate != 0 && item.category != 0">限{{item.cateTitle}}-{{item.categoryTitle}}类商品可用</block>
								</view>
								<view class="f24 cff4f00 mt10">需{{item.yBean}}数字能量</view>
							</view>
						</view>
						<block v-if="item.isHave == 0">
							<view v-if="userInfo.yBean >= item.yBean" class="f26 w60 cff gui-text-center" @tap="receiveCoupons(item)">
								<view style="width:22rpx;">立即兑换</view>
							</view>
							<view v-else class="f26 w60 cff gui-text-center">
								<view style="width:22rpx;">数字能量不足</view>
							</view>
						</block>
						<block v-else>
							<view class="f26 w60 cff gui-text-center">
								<view style="width:22rpx;">已兑换</view>
							</view>
						</block>
					</view>
				</view>
			</block>
			<view class="fullPage gui-flex gui-justify-content-center gui-align-items-center fm" v-if="list.length == 0" style="margin-top:-100rpx;"><gui-image src="../../../static/images/noData.png" :width="396" :height="226" :timer="0"></gui-image></view>
			<gui-popup ref="guipopup" :canCloseByShade="false" width="542rpx">
				<view class="gui-relative" v-if="item">
					<gui-image src="/static/images/setting/dh.png" :width="542"></gui-image>
					<view class="dh gui-absolute-lt gui-text-center">
						<view class="f34 fb mt238">温馨提示</view>
						<view class="f32 mt67">是否消耗{{item.yBean}}数字能量兑换抵扣券</view>
						<view class="gui-flex gui-align-items-center gui-space-around mt50">
							<view class="btn2 cff4f00 border-ff4f00 f32" @click="$refs.guipopup.close()">取消</view>
							<view class="btn1 cff bgff4f00 f32" @tap="doReceiveCoupons">确定</view>
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
			pageLoading: false,
			list: [],
			userInfo: null,
			item: null
		}
	},
	onLoad() {
		_this = this;
		_this.getUserInfo();
	},
	methods:{
		doReceiveCoupons: function(){
			_this.pageLoading = true;
			uni.gRequest.post(
				'swoft/api/coupons/receiveCoupons',
				{
					data: {
						type: 2,
						couponsIds: _this.item.id,
						uid: uni.getStorageSync('userInfo').id
					}
				}, 
				(res) => {
					if(res.code == 0){
						_this.$refs.guipopup.close();
						_this.$refs.guiPage.openMessage('success','兑换成功',true,1500);
						setTimeout(function(){
							_this.getUserInfo();
						},1500);
					}else{
						_this.$refs.guiPage.openMessage('default',res.msg,true,1500);
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
		receiveCoupons: function(e){
			_this.item = e;
			_this.$refs.guipopup.open();
		},
		getUserInfo: function(){
			_this.pageLoading = true;
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
						_this.getCouponsList();
					}else{
						_this.$refs.guiPage.openMessage('default',res.msg,true,1500);
					}
				},
				(error) => {
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
		},
		getCouponsList: function(){
			_this.pageLoading = true;
			uni.gRequest.post(
				'swoft/api/coupons/getCouponsList',
				{
					data: {
						type: 2,
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
	.dh{width:542rpx;height: 563rpx;}
	.tiao{height: 30rpx}
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
	.f34{font-size: 34rpx;}
	.f32{font-size: 32rpx;}
	.mt238{margin-top:238rpx}
	.mt67{margin-top:67rpx}
	.mt50{margin-top:50rpx}
</style>
