<template>
	<gui-page :isLoading="pageLoading" ref="guiPage" :customHeader="true">
		<view slot="gHeader">
			<view class="gui-flex gui-nowrap gui-rows gui-align-items-center">
				<view style="width:150rpx;" class="gui-header-leader-btns" hover-class="gui-tap">
					<text @tap="navBack" class="gui-icons ml10">&#xe600;</text>
				</view>
				<view class="gui-flex1 gui-text-center">
					<text class="f36 gui-ellipsis">提现</text>
				</view>
				<view style="width:120rpx;" class="pr30 gui-flex gui-align-items-center gui-justify-content-end">
					<navigator hover-class="" url="/pages/my/wallet/cashRecord" class="f26">提现记录</navigator>
				</view>
			</view>
		</view>
		<view slot="gBody">
			<view class="h238 gui-flex gui-column gui-justify-content-center bgF6F6F8">
				<block v-if="cashMoneyType == 1">
					<view v-if="bankCard" class="gui-flex gui-align-items-start gui-space-around" @tap="showAttr">
						<view class="f28">到账银行卡</view>
						<view class="view">
							<view class="f28 fb">{{bankCard.bankName}}</view>
							<view class="f28 mt10">{{bankCard.bankCardNumber|dealBankCardNumber}}</view>
						</view>
						<view class="gui-icons c66">&#xe601;</view>
					</view>
					<view v-else class="gui-flex gui-align-items-start gui-space-around" @tap="showAttr">
						<view class="f28">到账银行卡</view>
						<view class="view">
							<view class="f28 fb">选择银行卡(储蓄卡)</view>
							<view class="f28 mt10">未选择银行卡</view>
						</view>
						<view class="gui-icons c66">&#xe601;</view>
					</view>
				</block>
				<block v-if="cashMoneyType == 2">
					<view class="gui-flex gui-align-items-center gui-justify-content-center">
						<text class="f28">支付宝账号:</text>
						<input class="inputBox f28" v-model="aliAccount" placeholder="请填写支付宝账号" />
					</view>
					<view class="gui-flex gui-align-items-center gui-justify-content-center mt30">
						<text class="f28">支付宝姓名:</text>
						<input class="inputBox f28" v-model="aliName" placeholder="请填写支付宝姓名" />
					</view>
				</block>
			</view>
			<view class="h230 gui-flex gui-column gui-justify-content-center w660 mauto gui-border-b">
				<view>
					<view class="gui-text mt20">提现金额</view>
					<view class="fb gui-flex gui-align-items-center">
						<text class="gui-text f70">￥</text>
						<input class="f90" type="number" placeholder="0.00" placeholder-style="color:#000000;" v-model="money" />
					</view>
				</view>
			</view>
			<view class="w660 mauto">
				<view class="f28 mt38">可提现余额{{userInfo.money.toFixed(2)}}元 <text @tap="cashAll" class="cff4f00 ml20">全部提现</text></view>
				<view class="mt20 c8B8E97 f26" v-if="cashConfig">
					提现手续费：{{(cashConfig.chargesPercent*100).toFixed(2)}}%+￥{{cashConfig.chargesInt}}，单笔最低提现金额为￥{{cashConfig.cashMin}}，单笔最高提现金额为￥{{cashConfig.cashMax}}，T+1天到账
				</view>
				<button @tap="cash" class="h90 w620 lh90 cFFFFFF bgFF4F00 br45 mt60 f30 fb" hover-class="none">立即提现</button>
				<gui-radio @change="radioChange" color="#FF4F00" checkedColor="#FF4F00" :size="30" justifyContent="center" class="mt30">
					<view class="gui-flex gui-align-items-center fm">
						<view class="f28 lh28 c999999">我已阅读并同意</view>
						<navigator @tap.stop="" url="/pages/home/content?type=partnershipAgreement" class="f28 lh28 cFF4F00" hover-class="">《共享经济合作伙伴协议》</navigator>
					</view>
				</gui-radio>
			</view>
			<!-- 银行卡 -->
			<view @tap="closeAttr" :class="'bgScreen animate '+animateName" v-if="attrShow">
				<view class="bgScreenC gui-absolute-lb bgFFFFFF" @tap.stop="">
					<text class="c999999 gui-h5 gui-icons gui-absolute-rt rt20" @tap="closeAttr">&#xe632;</text>
					<view class="attrTitle mainTxt">银行卡</view>
					<scroll-view class="attrScroll" :scroll-y="true">
						<block v-for="(item, index) in list" :key="index">
							<view class="bgfd5762_ff7566 gui-border-radius card mt20 gui-relative p20">
								<view class="cff f34 gui-flex gui-align-items-center gui-space-between">{{item.bankName}}</view>
								<view class="gui-flex gui-align-items-center gui-space-between">
									<view class="f24 cff mt20">储蓄卡</view>
									<view @tap="chooseCard(item)" class="orderBtn2_">选择该卡</view>
								</view>
								<view class="gui-flex gui-space-between gui-align-items-end mt20">
									<view class="f46 cff">{{item.bankCardNumber|dealBankCardNumber}}</view>
								</view>
							</view>
						</block>
						<block v-if="list.length == 0">
							<gui-empty>
								<view slot="img" class="gui-flex gui-rows gui-justify-content-center margint-150">
									<image class="gui-empty-img" src="../../../static/images/empty.png"></image>
								</view>
								<text slot="text" class="f26 gui-block-text gui-text-center gui-margin-top color16A1A6">您还没有添加银行卡~</text>
							</gui-empty>
							<view class="height100"></view>
						</block>
					</scroll-view>
					<navigator hover-class="" url="/pages/my/setting/addbankcard" class="sure">添加银行卡</navigator>
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
			userInfo: null,
			bankCard: null,
			list: [],
			attrShow: false,
			animateName: 'bounceInUp',
			money: '',
			cashConfig: null,
			isAgreen: false,
			cashMoneyType: 0,
			aliAccount: '',
			aliName: ''
		}
	},
	onLoad() {
		_this = this;
	},
	onShow() {
		_this.userInfo = uni.getStorageSync('userInfo');
		_this.aliAccount = _this.userInfo.aliAccount;
		_this.aliName = _this.userInfo.aliName;
		_this.getUserBankList();
		_this.getCashConfig();
		_this.getPicConfigField('cashMoneyType');
	},
	filters:{
		dealBankCardNumber (account){
			if(account){
				account = account.substring(0,4)+' **** **** '+account.substring(account.length-4);
				return account;
			}
		}
	},
	methods:{
		getPicConfigField: function(e){
			uni.gRequest.post(
				'swoft/api/config/getConfigField',
				{
					data: {
						field: e
					}
				}, 
				(res) => {
					if(res.code == 0){
						_this.cashMoneyType = res.data;
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
		radioChange: function(e){
			_this.isAgreen = e[0];
		},
		navBack(){
			uni.gJS.back();
		},
		cashAll: function(){
			_this.money = _this.userInfo.money;
		},
		getCashConfig: function(){
			uni.gRequest.post(
				'swoft/api/config/getCashConfig',
				{
					data: {}
				}, 
				(res) => {
					if(res.code == 0){
						_this.cashConfig = res.data;
					}else{
						_this.$refs.guiPage.openMessage('default',res.msg,true,1500);
					}
				},
				(error) => {
					_this.$refs.guiPage.openMessage('default','请求错误',true,1500);
				},
				(res) => {},
				true
			);
		},
		getUserBankList: function(){
			_this.pageLoading = true;
			uni.gRequest.post(
				'swoft/api/user/getUserBankList',
				{
					data: {
						uid: uni.getStorageSync('userInfo').id
					}
				}, 
				(res) => {
					if(res.code == 0){
						_this.list = res.data;
						res.data.forEach((item)=>{
							if(item.isDefault == 1){
								_this.bankCard = item;
							}
						})
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
		navToUrl: function(e){
			if(e == '/pages/my/setting/bankcard'){
				if(_this.userInfo.dalongStaff != 1){
					_this.$refs.guiPage.openMessage('default','请先进行实名认证',true,1500);
					setTimeout(function(){
						uni.navigateTo({
							url: '/pages/my/setting/auto'
						})
					},1500)
					return false;
				}
			}
			uni.navigateTo({
				url: e
			})
		},
		getDefaultBankCard: function(){
			_this.pageLoading = true;
			uni.gRequest.post(
				'swoft/api/user/getDefaultBankCard',
				{
					data: {
						uid: uni.getStorageSync('userInfo').id
					}
				}, 
				(res) => {
					if(res.code == 0){
						_this.bankCard = res.data;
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
		showAttr: function(){
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
			_this.bankCard = e;
			_this.closeAttr();
		},
		cash: function(){
			var formData = {};
			formData.uid = uni.getStorageSync('userInfo').id;
			if(_this.cashMoneyType == 1){
				if(_this.bankCard == null){
					_this.$refs.guiPage.openMessage('default','请选择到账银行卡',true,1500);
					return false;
				}
				formData.bankCardId = _this.bankCard.id;
			}
			formData.money = _this.money;
			formData.cashMoneyType = _this.cashMoneyType;
			var rule = [
				{name: "money", checkType: "notnull", checkRule: "", errorMsg: "请输入提现金额"},
				{name: "money", checkType: "reg", checkRule: "^(([1-9]([0-9]+)?)|(0{1}))(\.[0-9]{1,2})?$", errorMsg: "请输入正确金额"},
			];
			if(_this.cashMoneyType == 2){
				formData.aliAccount = _this.aliAccount;
				formData.aliName = _this.aliName;
				rule.push({name: "aliAccount", checkType: "notnull", checkRule: "", errorMsg: "请填写支付宝账号"});
				rule.push({name: "aliName", checkType: "notnull", checkRule: "", errorMsg: "请填写支付宝姓名"});
			}
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
			if(formData.money < _this.cashConfig.cashMin){
				_this.$refs.guiPage.openMessage('default','单笔最低提现金额为￥'+_this.cashConfig.cashMin,true,1500);
				return false;
			}
			if(formData.money > _this.cashConfig.cashMax){
				_this.$refs.guiPage.openMessage('default','单笔最高提现金额为￥'+_this.cashConfig.cashMax,true,1500);
				return false;
			}
			if(formData.money > _this.userInfo.money){
				_this.$refs.guiPage.openMessage('default','余额不足',true,1500);
				return false;
			}
			if(!_this.isAgreen){
				_this.$refs.guiPage.openMessage('default','请阅读并同意《共享经济合作伙伴协议》',true,1500);
				return false;
			}
			_this.pageLoading = true;
			uni.gRequest.post(
				'swoft/api/user/UserWithdrawal',
				{
					data: formData
				}, 
				(res) => {
					if(res.code == 0){
						_this.$refs.guiPage.openMessage('success','提交成功',true,1500);
						_this.getUserInfo();
						setTimeout(function(){
							uni.navigateBack({
								delta: 1
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
				},
				true,
				true
			);
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
	/* 引入动画库 */
	@import "@/GraceUI5/css/animate.css";
	/* 定义动画修饰样式 */
	.gui-header-leader-btns{width:68rpx; line-height:60rpx; font-size:50rpx;}
	.animate{animation-duration: 1s; animation-timing-function:linear;}
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
	.inputBox{background-color:#FFFFFF;width:400rpx;margin-left:30rpx;height:80rpx;line-height:80rpx;border-radius:10rpx;padding-left:30rpx;}
</style>
