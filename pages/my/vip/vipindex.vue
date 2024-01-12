<template>
	<gui-page :isLoading="pageLoading" ref="guiPage" :customHeader="true" style="background: #F5F5F5;">
		<view slot="gHeader">
			<view class="gui-flex gui-nowrap gui-rows gui-align-items-center">
				<view @tap="navBack" class="gui-header-leader-btns" hover-class="gui-tap">
					<text class="gui-icons">&#xe600;</text>
				</view>
				<view class="gui-flex1 gui-text-center">
					<text class="f36 gui-ellipsis">VIP产品包</text>
				</view>
				<view class="pr30">
					<navigator url="/pages/my/vip/list" hover-class="" class="c999999 f26 fm mr20">购买记录</navigator>
				</view>
			</view>
		</view>
		<view slot="gBody">
			<view class="head">
				<gui-image :src="userInfo.headimgurl != 0 ? userInfo.headUrl : '../../../static/images/zheng/user'+userInfo.gender+'.png'" :width="110" :height="110" :timer="0" borderRadius="55rpx"></gui-image>
				<view class="head-r">
					<view class="head-r-t">
						<view class="font-name">{{ userInfo.nickname }}</view>
						<view class="font-type typebg1" v-if="userInfo.has_vip == 0">未开通</view>
						<view class="font-type typebg3" v-else-if="vipinfo.name == '黄金会员'">黄金</view>
						<view class="font-type typebg4" v-else-if="vipinfo.name == '钻石会员'">钻石</view>
						<view class="font-type typebg4" v-else-if="vipinfo.name == '白银会员'">白银</view>
						<view class="font-type typebg2" v-else>{{ vipinfo.name }}</view>
						<view class="font-type typebg3_" v-if="vipinfo.name == '黄金'">{{ vipinfo.rate }}倍加速中</view>
						<view class="font-type typebg4_" v-else-if="vipinfo.name == '钻石'">{{ vipinfo.rate }}倍加速中</view>
						<view class="font-type typebg2_" v-else>{{ vipinfo.rate }}倍加速中</view>
					</view>
					<view class="head-r-b">
						尚未开通会员，无法享受会员权益
					</view>
				</view>
			</view>
			<view class="content">
				<view class="font-title">VIP产品包套餐</view>
				<view class="viplistbox">
					<block v-for="(item,index) in viplist" :key="index">
						<view class="vipitem" @click="infoFun(item, index)" :class="indexval == index?'actItem':''">
							<view class="vipitem-t">
								<view class="opentip" v-if="indexHas == index">已开通</view>
								<view class="font-name2">{{ item.name }}</view>
								<view class="font-price2"><text style="font-size: 26rpx;">￥</text>{{ item.price }}</view>
							</view>
							<view class="vipitem-b">{{ item.rate }}倍加速特权</view>
						</view>
					</block>
				</view>
				<view class="font-tip">用户购买不同等级VIP产品包，消费积分获得对应比例加速效果，购买后有效期 365天；</view>

				<view v-if="goods.length > 0">
					<block v-for="(item,index) in goods" :key="index">
						<view class="goodsbox" :class="actgoodindex == index?'actgood':''" @click="getActGood(item, index)">
							<view>{{ item.title }}</view>
							<!-- <view>{{ item.desc }}</view> -->
						</view>
					</block>
				</view>

				<view class="gui-flex gui-align-items-center gui-space-between paybox">
					<view class="font-pay">
						<block v-if="payType == 1">微信支付</block>
						<block v-if="payType == 2">支付宝支付</block>
						<block v-if="payType == 4">余额支付</block>
					</view>
					<view @tap="$refs.guiactionsheet.open();" class="gui-flex gui-align-items-center gui-space-between">
						<text class="f24 c99 ml10">切换支付方式</text>
					</view>
				</view>
				<view class="font-btn" @click="createbayFun">确认并支付</view>
			</view>
			
			<gui-action-sheet :height="1100" :canCloseByShade="true" listColor="#FF4F00" ref="guiactionsheet" @selected="selected" title="请选择类别" :items="actionSheetItems"></gui-action-sheet>
		</view>
	</gui-page>
</template>
<script>
var _this;
export default {
	data() { 
		return {
			pageLoading: false,
			viplist: [],
			userInfo: null,
			indexval: -1,
			indexHas: -1,
			actInfo: {},
			vipinfo: {},
			payType: 1,
			actionSheetItems: [
				{id: 1,title: '微信支付'},
				{id: 2,title: '支付宝支付'},
				{id: 4,title: '余额支付'},
			],
			isCanpay: true,
			goods: [],
			actgoodindex: -1,
			actgoodInfo: {},
		}
	},
	onLoad(option) {
		_this = this;
	},
	onShow() {
		_this.userInfo = uni.getStorageSync('userInfo');
		_this.vipinfo = uni.getStorageSync('userInfo').vip_info
		_this.getVIP();
	},
	onReady() {
		
	},
	methods:{
		getVIP: function () {
			uni.gRequest.post(
				'/swoft/api/vip/vipList',
				{
					data: {
						
					}
				},
				(res) => {
					_this.viplist = res.data
					if(_this.vipinfo.id) {
						let index = res.data.findIndex((x)=> x.id === _this.vipinfo.id)
						if(index != -1) {
							_this.indexHas = index
							_this.indexval = index
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
		receiveFun: function (id) {
			if(id == 4) {
				_this.$refs.msgModal.open();
				setTimeout(()=>{
					_this.$refs.msgModal.close();
				}, 1500)
			} else if(id == 1) {//去使用
				uni.switchTab({
					url: '/pages/home/index'
				})
			}
		},
		infoFun: function (info, index) {
			_this.goods = []
			_this.actgoodindex = -1
			_this.indexval = index
			_this.actInfo = info

			let goodA = {
				goods_id: info.g_id,
				title: info.g_title,
				rePrice: info.g_rePrice,
				price: info.g_price,
			}
			let goodB = {
				goods_id: info.h_id,
				title: info.h_title,
				rePrice: info.h_rePrice,
				price: info.h_price,
			}
			let goodC = {
				goods_id: info.w_id,
				title: info.w_title,
				rePrice: info.w_rePrice,
				price: info.w_price,
			}

			_this.goods = [
				goodA, goodB, goodC
			]
		},
		getActGood: function (info, index) {
			_this.actgoodInfo = info
			_this.actgoodindex = index
		},
		createbayFun: function () {
			if(_this.indexval == -1) {
				_this.$refs.guiPage.openMessage('default','请选择您要购买的VIP礼包！',true,1500);
				return false
			}
			if(_this.indexval == _this.indexHas) {
				_this.$refs.guiPage.openMessage('default','您已购买此产品包！',true,1500);
				return false
			}
			if(_this.actgoodindex == -1) {
				_this.$refs.guiPage.openMessage('default','请选择您要购买的商品！',true,1500);
				return false
			}
			uni.gRequest.post(
				'/swoft/api/orderAlliance/create',
				{
					data: {
						uid: _this.userInfo.id,
						orderType: 'VIP',
						num: 1,
						realPrice: _this.actInfo.price,
						payMoney:  _this.actInfo.price,
						totalPrice: _this.actInfo.price,
						payType: _this.payType,
						vipId: _this.actInfo.vip_id,
						cashCouponMoney: 0,
						is_online: 1,
						goods: JSON.stringify(
							[{"goodsId":_this.actgoodInfo.goods_id,"goodsName":_this.actgoodInfo.title,"goodsImg":"","goodsOptionId":"","goodsOptionName":"","price":_this.actgoodInfo.price,"num":1,"totalMvalue":0,"totalPrice":_this.actgoodInfo.price,"totalWeight":0,"activityType":0,"refundMoney":_this.actgoodInfo.price,"status":1,"reStatus":1,"userCouponsId":0,"couponsMoney":0,"cashCouponMoney":0}]
						)
					}
				},
				(res) => {
					console.log(res)
					if(res.code == 0) {
						if(_this.payType == 4) {
							_this.$refs.guiPage.openMessage('success', '支付成功！',true,1500);
							setTimeout(()=>{
								_this.getUserInfo()
							}, 1500)
						} else {
							_this.payfun(res)
						}
					} else {
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
		payfun: function (res) {
			_this.pageLoading = true;
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
						_this.getUserInfo()
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
						_this.getUserInfo()
					},1500);
				}
			});
			//#endif
			//#ifdef H5
			window.location.href = res.data.url;
			//#endif
		},
		selected: function(index){
			_this.payType = _this.actionSheetItems[index].id;
		},
		navBack(){
			uni.gJS.back();
		},
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
	}
}
</script>
<style>
	@import url('@/static/css/li.css');
	.head{
		display: flex;
		justify-content: flex-start;
		align-items: center;
		padding: 40rpx 30rpx;
		background: linear-gradient(90deg, #120E02 0%, #2D100C 100%);
	}
	.head-r{
		margin-left: 20rpx;
	}
	.head-r-t{
		display: flex;
		justify-content: flex-start;
		align-items: center;
		margin-bottom: 15rpx;
	}
	.head-r-b{
		font-size: 28rpx;
		font-weight: 400;
		color: #B8AFAD;
	}
	.font-name{
		font-size: 32rpx;
		font-weight: 500;
		color: #B7AEAC;
		margin-right: 20rpx;
	}
	.font-type{
		padding: 5rpx 25rpx;
		font-size: 28rpx;
		font-weight: 500;
		color: #FFFFFF;
		margin-right: 20rpx;
	}
	.typebg1{
		background: url(../../../static/images/vip/weikaitong.png) no-repeat center center;
		background-size: 100% 100%;
	}
	.typebg2{
		background: url(../../../static/images/vip/baiyin.png) no-repeat center center;
		background-size: 100% 100%;
	}
	.typebg2_{
		background: url(../../../static/images/vip/baiyin1.png) no-repeat center center;
		background-size: 100% 100%;
	}
	.typebg3{
		background: url(../../../static/images/vip/huangjin.png) no-repeat center center;
		background-size: 100% 100%;
	}
	.typebg3_{
		background: url(../../../static/images/vip/huangjin1.png) no-repeat center center;
		background-size: 100% 100%;
	}
	.typebg4{
		background: url(../../../static/images/vip/zuanshi.png) no-repeat center center;
		background-size: 100% 100%;
	}
	.typebg4_{
		background: url(../../../static/images/vip/zuanshi1.png) no-repeat center center;
		background-size: 100% 100%;
	}
	.content{
		width: 97%;
		margin: 20rpx auto;
	}
	.font-title{
		font-size: 38rpx;
		font-weight: bold;
		color: #333333;
		margin-bottom: 20rpx;
	}
	.viplistbox{
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		flex-wrap: wrap;
	}
	.vipitem{
		width: 32%;
		text-align: center;
		background: #fff;
		border-radius: 10px;
		overflow: hidden;
		margin-top: 20rpx;
	}
	.vipitem-t{
		padding: 40rpx 0 35rpx;
		position: relative;
		border: 4rpx solid #fff;
		border-bottom: none;
		box-sizing: border-box;
		border-radius: 10px 10px 0 0;
	}
	.vipitem-b{
		padding: 50rpx 0;
		font-size: 28rpx;
		color: #7B605C;
		padding: 15rpx 0;
		background: #FFF9EB;
	}
	.font-name2{
		font-size: 28rpx;
		color: #693003;
		margin-bottom: 10rpx;
		font-weight: bold;
	}
	.font-price2{
		font-size: 32rpx;
		color: #FF5E29;
		margin-bottom: 10rpx;
		font-weight: bold;
	}
	.font-tip{
		font-size: 28rpx;
		color: #999999;
		margin-top: 20rpx;
		margin-bottom: 20px;
	}
	.actItem .vipitem-t{
		border-color: #F7BF7E;
		background: linear-gradient(90deg, #FFDAC0 0%, #FEF6C5 100%);
	}
	.actItem .vipitem-b{
		color: #fff;
		background: linear-gradient(90deg, #FC6902 0%, #FF9A40 100%);
	}
	.opentip{
		position: absolute;
		z-index: 2;
		padding: 5rpx 10rpx;
		background: url(../../../static/images/vip/yikaitong.png) no-repeat center center;
		background-size: 100% 100%;
		font-size: 24rpx;
		color: #fff;
		left: -2rpx;
		top: -2rpx;
	}

	.font-btn{
		position: fixed;
		z-index: 2;
		bottom: 20rpx;
		left: 0;
		right: 0;
		width: 90%;
		margin: 0 auto;
		background: linear-gradient(90deg, #FF630F 0%, #FF360F 100%);
		border-radius: 30px;
		font-size: 38rpx;
		color: #FBFBFB;
		text-align: center;
		line-height: 80rpx;
	}
	.paybox{
		background: #fff;
		padding: 20rpx 20rpx;
		border-radius: 4px;
		margin-top: 30rpx;
	}
	.font-pay{
		font-size: 32rpx;
		color: #333;
	}

	.goodsbox{
		font-size: 14px;
		margin-bottom: 20px;
		color: #333;
	}
	.actgood{
		color: #FC6902;
	}
</style>
