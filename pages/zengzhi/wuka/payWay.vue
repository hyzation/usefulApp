<template>
	<gui-page :isLoading="pageLoading" ref="guiPage">
		<view slot="gBody">
			<view @tap="chooseCid(item,index)" v-for="(item, index) in list" :key="index" class="m30 p30 bgFFFFFF br20 gui-flex gui-align-items-center gui-space-between">
				<view style="width:80%;">
					<view class="fm f32">{{item.fontName}}</view>
					<view class="fm f26 mt20">使用时间：{{item.start_business_hours}}-{{item.finish_business_hours}}</view>
				</view>
				<text class="gui-icons f40" :class="navIndex == index ? 'cFF4F00' : 'c999999'">{{navIndex == index ? '&#xe62c;' : '&#xe692;'}}</text>
			</view>
			<gui-empty v-if="list.length == 0">
				<view slot="img" class="gui-flex gui-rows gui-justify-content-center">
					<gui-image class="gui-empty-img" src="../../../static/images/noData.png" :width="396" :height="226" :timer="0"></gui-image>
				</view>
			</gui-empty>
			<view style="height:150rpx;"></view>
			<view class="wp100 ptb20 mt20 gui-fixed-rb bgFFFFFF">
				<view @tap="pay" class="btns f30 fb">确定</view>
			</view>
			<gui-modal ref="msgModal" :isTitle="false" :canCloseByShade="false" :isCloseBtn="false" closeBtnStyle="color:#000000; font-size:28rpx;" :zIndex="999" bodyStyle="" width="665rpx">
				<view slot="content">
					<view class="payBox pb30" v-if="item">
						<view class="fm f30 pt20 pb20 gui-text-center gui-relative borderBottom">请输入验证码</view>
						<view class="p30 gui-flex gui-align-items-center gui-space-between gui-relative borderBottom">
							<text class="f28 c999999">通道名称：</text>
							<text class="f28">{{item.fontName}}</text>
						</view>
						<view class="p30 gui-flex gui-align-items-center gui-space-between gui-relative borderBottom">
							<text class="f28 c999999">订单金额：</text>
							<text class="f28">{{postData.money}}</text>
						</view>
						<view class="p30 gui-flex gui-align-items-center gui-space-between gui-relative borderBottom">
							<text class="f28 c999999">卡号：</text>
							<text class="f28">{{postData.credit_card_code}}</text>
						</view>
						<view class="p30 gui-flex gui-align-items-center gui-space-between gui-relative borderBottom">
							<text class="f28 c999999">手机号码：</text>
							<text class="f28">{{postData.credit_card_tel}}</text>
						</view>
						<view class="m30 p30 gui-flex gui-align-items-center bgFFFFFF br10">
							<text class="f28 c999999">验证码：</text>
							<input class="f28" type="number" :maxlength="6" placeholder="请输入验证码" v-model="smsCode" />
						</view>
						<view class="gui-flex gui-align-items-center gui-space-around">
							<view class="orderBtn3" @tap="$refs.msgModal.close()">取消</view>
							<view class="orderBtn bgFF4F00" @tap="confirmOrder">确定</view>
						</view>
					</view>
			    </view>
			</gui-modal>
		</view>
	</gui-page>
</template>
<script>
var _this;
var graceChecker = require("@/GraceUI5/js/checker.js");
export default {
	data() { 
		return {
			pageLoading: false,
			postData: null,
			list: [],
			navIndex: 0,
			item: null,
			smsCode: '',
			uuid: '',
			orderId: ''
		}
	},
	onLoad() {
		_this = this;
		_this.postData = uni.getStorageSync('postData');
		uni.removeStorageSync('postData');
		_this.getCid();
	},
	onShow() {

	},
	methods:{
		chooseCid: function(e,index){
			_this.index = index;
			_this.item = e;
		},
		getCid: function(){
			_this.pageLoading = true;
			let data = {
				money: _this.postData.money,
				bankName: _this.postData.credit_card_bank
			};
			uni.gRequest.post(
				'swoft/api/wkcardorder/getCid',
				{
					data: data
				}, 
				(res) => {
					if(res.code == 20000){
						_this.list = res.data;
						if(res.data.length > 0){
							_this.item = res.data[0];
						}
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
		pay: function(){
			if(_this.item == null){
				_this.$refs.guiPage.openMessage('default','请选择支付通道',true,1500);
				return false;
			}
			if(_this.item.status == 0){
				_this.$refs.guiPage.openMessage('default',_this.item.reason,true,1500);
				return false;
			}
			// 发起下单
			_this.postData.cid = _this.item.id;
			_this.postData.sxf_yb = _this.item.totalRate;
			_this.postData.sxf_int = _this.item.totalAgencyFee;
			_this.postData.real_money = _this.item.practicalMoney;
			_this.pageLoading = true;
			uni.gRequest.post(
				'swoft/api/wkcardorder/order',
				{
					data: _this.postData
				}, 
				(res) => {
					if(res.code == 20000){
						_this.uuid = res.data.uuid;
						_this.orderId = res.data.orderId;
						_this.$refs.msgModal.open();
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
		confirmOrder: function(){
			var formData = {};
			formData.uid = uni.getStorageSync('userInfo').id;
			formData.uuid = _this.uuid;
			formData.credit_safe = _this.postData.credit_safe;
			formData.credit_date = _this.postData.credit_date;
			formData.city = _this.postData.city;
			formData.smsCode = _this.smsCode;
			var rule = [
				{name: "smsCode", checkType: "notnull", checkRule: "", errorMsg: "请输入验证码"},
				{name: "smsCode", checkType: "string", checkRule: "6,6", errorMsg: "验证码长度为6位"}
			];
			var checkRes = graceChecker.check(formData, rule);
			if(!checkRes){
				_this.$refs.guiPage.openMessage('default',graceChecker.error,true,1500);
				return false;
			}
			_this.pageLoading = true;
			uni.gRequest.post(
				'swoft/api/wkcardorder/confirmOrder',
				{
					data: formData
				}, 
				(res) => {
					if(res.code == 20000){
						_this.$refs.guiPage.openMessage('success',res.msg,true,1500);
						setTimeout(function(){
							uni.navigateTo({
								url: '/pages/zengzhi/wuka/record'
							})
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
					_this.$refs.msgModal.close();
				},
				true,
				true
			);
		}
	}
}
</script>
<style>
	page{background-color:#F8F8F8;}
	.h160{height: 160rpx;}
	.cFD2C55{color: #FD2C55;}
	.btns{width:690rpx;height:90rpx;background: #ff4f00;border-radius: 45rpx;text-align: center;line-height: 90rpx;color: #fff;margin:0 auto;}
	.payBox{width:650rpx;background-color:#F8F8F8;border-radius:20rpx;}
	.orderBtn{width:180rpx;text-align:center;height:70rpx;line-height:70rpx;border-radius:35rpx;font-size:30rpx;margin-left:20rpx;color:#FFFFFF;padding:0!important;}
	.orderBtn2{width:180rpx;text-align:center;height:70rpx;line-height:70rpx;border-radius:35rpx;font-size:30rpx;margin-left:20rpx;padding:0!important;border:thin solid #FF4F00;color:#FF4F00;}
	.orderBtn3{width:180rpx;text-align:center;height:70rpx;line-height:70rpx;border-radius:35rpx;font-size:30rpx;margin-left:20rpx;padding:0!important;border:thin solid #999999;color:#999999;}
</style>
