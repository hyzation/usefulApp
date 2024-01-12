<template>
	<gui-page :isLoading="pageLoading" ref="guiPage" :customHeader="true">
		<view slot="gHeader">
			<view class="gui-flex gui-nowrap gui-rows gui-align-items-center">
				<view style="width:130rpx;" class="gui-header-leader-btns" hover-class="gui-tap">
					<text @tap="navBack" class="gui-icons ml10">&#xe600;</text>
				</view>
				<view class="gui-flex1 gui-text-center">
					<text class="f36 gui-ellipsis">收款</text>
				</view>
				<view style="width:100rpx;" class="pr30 gui-flex gui-align-items-center gui-justify-content-end">
					<navigator url="/pages/zengzhi/wuka/record" hover-class="" class="f24">交易记录</navigator>
				</view>
			</view>
		</view>
		<view slot="gBody">
			<view class="ewmBox bgFFFFFF">
				<view class="gui-flex gui-align-items-center gui-space-between p20 fm f24 bgD1D1D1">
					<text>到账储蓄卡：</text>
					<text @tap="showAttr(1)" v-if="bankCard">{{bankCard.bankName}}({{bankCard.bankCardNumber.substring(bankCard.bankCardNumber.length-4)}})<text class="gui-icons f26 ml10">&#xe601;</text></text>
					<text @tap="showAttr(1)" v-else>请选择到账储蓄卡<text class="gui-icons f26 ml10">&#xe601;</text></text>
				</view>
				<view class="h230 gui-flex gui-column gui-justify-content-center wp100 gui-relative borderBottom">
					<view class="fb gui-flex gui-align-items-center pl30 pr30">
						<text class="gui-text f70">￥</text>
						<input style="width:450rpx;" class="f90" type="number" placeholder="0.00" placeholder-style="color:#000000;" v-model="money" />
					</view>
				</view>
				<view v-if="creditCard" class="gui-flex gui-align-items-start gui-space-around mt60" @tap="showAttr(2)">
					<view class="f28">消费信用卡</view>
					<view class="view">
						<view class="f28 fb">{{creditCard.creditCardBank}}</view>
						<view class="f28 mt10">{{creditCard.creditCardCode|dealBankCardNumber}}</view>
					</view>
					<view class="gui-icons c66">&#xe601;</view>
				</view>
				<view v-else class="gui-flex gui-align-items-start gui-space-around mt60" @tap="showAttr(2)">
					<view class="f28">消费信用卡</view>
					<view class="view">
						<view class="f28 fb">选择银行卡(信用卡)</view>
						<view class="f28 mt10">未选择信用卡</view>
					</view>
					<view class="gui-icons c66">&#xe601;</view>
				</view>
				<button @tap="pay" hover-class="" class="btnff4f00 f30 fb">确定</button>
			</view>
			<!-- 银行卡 -->
			<view @tap="closeAttr" :class="'bgScreen animate '+animateName" v-if="attrShow">
				<view class="bgScreenC gui-absolute-lb bgFFFFFF" @tap.stop="">
					<text class="c999999 gui-h5 gui-icons gui-absolute-rt rt20" @tap="closeAttr">&#xe632;</text>
					<view class="attrTitle mainTxt">{{type == 1 ? '储蓄' : '信用'}}卡</view>
					<scroll-view class="attrScroll cFFFFFF" :scroll-y="true">
						<block v-for="(item, index) in list" :key="index">
							<view class="bgfd5762_ff7566 gui-border-radius card mt20 gui-relative p20">
								<view class="cff f34 gui-flex gui-align-items-center gui-space-between">{{type == 1 ? item.bankName : item.creditCardBank}}</view>
								<view class="gui-flex gui-align-items-center gui-space-between">
									<view class="f24 cff mt20">{{type == 1 ? '储蓄' : '信用'}}卡</view>
									<view @tap="chooseCard(item)" class="orderBtn2_">选择该卡</view>
								</view>
								<view class="gui-flex gui-space-between gui-align-items-end mt20">
									<view class="f46 cff">{{(type == 1 ? item.bankCardNumber : item.creditCardCode)|dealBankCardNumber}}</view>
								</view>
							</view>
						</block>
						<block v-if="list.length == 0">
							<gui-empty>
								<view slot="img" class="gui-flex gui-rows gui-justify-content-center margint-150">
									<image class="gui-empty-img" src="../../../static/images/empty.png"></image>
								</view>
								<text slot="text" class="f26 gui-block-text gui-text-center gui-margin-top color16A1A6">您还没有添加{{type == 1 ? '储蓄' : '信用'}}卡~</text>
							</gui-empty>
							<view class="height100"></view>
						</block>
					</scroll-view>
					<navigator v-if="type == 1" hover-class="" url="/pages/my/setting/addbankcard" class="sure">添加储蓄卡</navigator>
					<navigator v-else hover-class="" url="/pages/my/setting/addcreditcard" class="sure">添加信用卡</navigator>
				</view>
			</view>
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
			bankCard: null,
			list1: [],
			list2: [],
			attrShow: false,
			animateName: 'bounceInUp',
			money: '',
			creditCard: null,
			type: 1,
			province: '辽宁省',
			city: '沈阳市',
			county: '和平区',
			cid: 0
		}
	},
	filters:{
		dealBankCardNumber (account){
			if(account){
				account = account.substring(0,4)+' **** **** '+account.substring(account.length-4);
				return account;
			}
		}
	},
	onLoad() {
		_this = this;
	},
	onShow() {
		_this.getUserBankList();
		_this.getUserCreditBankList();
		_this.pageLoading = true;
		uni.getLocation({
			type: 'wgs84',
			success: function(res){
				_this.pageLoading = true;
				uni.gRequest.post(
					'swoft/api/user/geocoder',
					{
						data: {
							location: res.latitude+','+res.longitude
						}
					}, 
					(res) => {
						if(res.code == 0){
							_this.province = res.data.province;
							_this.city = res.data.city;
							_this.county = res.data.district;
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
			fail: function(){
				_this.$refs.guiPage.openMessage('default','定位失败',true,1500);
				_this.pageLoading = false;
			}
		});
	},
	methods:{
		getUserBankList: function(){
			uni.gRequest.post(
				'swoft/api/user/getUserBankList',
				{
					data: {
						uid: uni.getStorageSync('userInfo').id
					}
				}, 
				(res) => {
					if(res.code == 0){
						_this.list1 = res.data;
						res.data.forEach((item)=>{
							if(item.isDefault == 1){
								_this.bankCard = item;
							}
						})
						if(_this.type == 1){
							_this.list = res.data;
						}
					}else{
						_this.$refs.guiPage.openMessage('default',res.msg,true,1500);
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
		getUserCreditBankList: function(){
			uni.gRequest.post(
				'swoft/api/user/getUserCreditBankList',
				{
					data: {
						uid: uni.getStorageSync('userInfo').id
					}
				}, 
				(res) => {
					if(res.code == 0){
						_this.list2 = res.data;
						res.data.forEach((item)=>{
							if(item.isDefault == 1){
								_this.creditCard = item;
							}
						})
						if(_this.type == 2){
							_this.list = res.data;
						}
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
		navBack(){
			uni.gJS.back();
		},
		showAttr: function(e){
			_this.type = e;
			if(e == 1){
				_this.list = _this.list1;
			}else{
				_this.list = _this.list2;
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
		chooseCard: function(e){
			if(_this.type == 1){
				_this.bankCard = e;
			}else{
				_this.creditCard = e;
			}
			_this.closeAttr();
		},
		pay: function(){
			if(_this.bankCard == null){
				_this.$refs.guiPage.openMessage('default','请选择到账储蓄卡',true,1500);
				return false;
			}
			if(_this.creditCard == null){
				_this.$refs.guiPage.openMessage('default','请选择消费信用卡',true,1500);
				return false;
			}
			var formData = {};
			formData.uid = uni.getStorageSync('userInfo').id;
			formData.money = _this.money;
			var rule = [
				{name: "money", checkType: "notnull", checkRule: "", errorMsg: "请输入提现金额"},
				{name: "money", checkType: "reg", checkRule: "^(([1-9]([0-9]+)?)|(0{1}))(\.[0-9]{1,2})?$", errorMsg: "请输入正确金额"},
			];
			var checkRes = graceChecker.check(formData, rule);
			if(!checkRes){
				_this.$refs.guiPage.openMessage('default',graceChecker.error,true,1500);
				return false;
			}
			formData.money = Number(_this.money);
			if(formData.money <= 0){
				_this.$refs.guiPage.openMessage('default','请输入正确金额',true,1500);
				return false;
			}
			if(formData.money < 50){
				_this.$refs.guiPage.openMessage('default','付款金额不能小于50元',true,1500);
				return false;
			}
			formData.sxf_yb = '';
			formData.sxf_int = '';
			formData.real_money = '';
			formData.province = _this.province;
			formData.city = _this.city;
			formData.county = _this.county;
			formData.cash_card_code = _this.bankCard.bankCardNumber;
			formData.cash_card_bank = _this.bankCard.bankName;
			formData.cash_card_tel = _this.bankCard.bankTel;
			formData.credit_card_code = _this.creditCard.creditCardCode;
			formData.credit_card_bank = _this.creditCard.creditCardBank;
			formData.credit_card_tel = _this.creditCard.creditCardTel;
			formData.credit_date = _this.creditCard.creditDate;
			formData.credit_safe = _this.creditCard.creditSafe;
			formData.name = uni.getStorageSync('userInfo').name;
			formData.idcard = uni.getStorageSync('userInfo').idCard;
			uni.setStorageSync('postData',formData);
			uni.redirectTo({
				url: '/pages/zengzhi/wuka/payWay'
			})
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
	.gui-header-leader-btns{width:68rpx; line-height:60rpx; font-size:50rpx;}
	.ewmBox{width:600rpx;height:700rpx;border-radius:20rpx;margin:30% auto 0 auto;overflow:hidden;}
	.w660{width: 660rpx;}
	.mt38{margin-top: 38rpx;}
	.h238{height: 238rpx;}
	.bgF6F6F8{background: #F6F6F8;}
	.c8B8E97{color:#8B8E97;}
	.f70{font-size: 70rpx;}
	.f90{font-size: 90rpx;}
	.h230{height: 230rpx;}
	.bgScreen{background-color:rgba(0,0,0,0.85);width:750rpx;position:fixed;z-index:99999;left:0;top:0;bottom:0;flex:1;}
	.bgScreenC{width:100%;border-radius:20rpx 20rpx 0 0;}
	.rt20{right:20rpx;top:20rpx;}
	.lt20{left:30rpx;top:30rpx;}
	.sure{margin:30rpx 60rpx 30rpx 60rpx;height:80rpx;border-radius:40rpx;text-align:center;line-height:80rpx;color:#FFFFFF;background-color:#FF4F00;font-size:30rpx;}
	.attrTitle{text-align:center;height:90rpx;line-height:90rpx;}
	.attrScroll{min-height:450rpx;max-height:900rpx;padding:0 30rpx;width:690rpx;}
	.attrScroll_{min-height:450rpx;max-height:900rpx;}
	.width630{width:630rpx;}
	.margint-150{margin-top:-150rpx;}
	.bgfd5762_ff7566{background-image: linear-gradient(-90deg,#fd5762 0%, #ff7566 100%)}
	.orderBtn2_{width:120rpx;text-align:center;height:50rpx;line-height:50rpx;border-radius:25rpx;font-size:24rpx;margin-left:20rpx;border:thin solid #FFFFFF;color:#FFFFFF;}
	.btnff4f00{width:560rpx;height:90rpx;background: #ff4f00;border-radius: 45rpx;text-align: center;line-height: 90rpx;color: #fff;margin-top:150rpx;}
</style>
