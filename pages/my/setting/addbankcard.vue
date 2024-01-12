<template>
	<gui-page :isLoading="pageLoading" ref="guiPage">
		<view slot="gBody">
			<form @submit="submit">
				<view class="bgff plr40 mt20">
					<view class="gui-form-item gui-border-b list-item">
						<text class="gui-form-label f28">银行卡号</text>
						<view class="gui-form-body gui-flex gui-align-items-center gui-justify-content-end">
							<input type="number" class="gui-form-input gui-text-right" v-model="bankCardNumber" name="bankCardNumber" placeholder="请输入您的储蓄卡号" />
							<text @tap="chooseImg" class="gui-icons c999999 f28 ml20">&#xe61d;</text>
						</view>
					</view>
					<view class="gui-form-item gui-border-b list-item">
						<text class="gui-form-label f28">银行名称</text>
						<view class="gui-form-body gui-flex gui-align-items-center gui-justify-content-end">
							<input type="text" class="gui-form-input gui-text-right" v-model="bankName" name="bankName" placeholder="请输入银行名称" />
						</view>
					</view>
					<view class="gui-form-item gui-border-b list-item">
						<text class="gui-form-label f28">手机号码</text>
						<view class="gui-form-body">
							<input type="number" v-model="tel" class="gui-form-input gui-text-right" name="bankTel" placeholder="请输入储蓄卡预留手机号" />
						</view>
					</view>
					<view class="gui-form-item list-item">
						<text class="gui-form-label f28">短信验证码</text>
						<view class="gui-form-body">
							<input type="number" class="gui-form-input gui-text-right" name="verificationCode" v-model="verificationCode" placeholder="请输入验证码"/>
						</view>
						<view class="yzmbtn f22 gui-text-center ml20 cff4f00" :class="[!isClick ? 'disabled' : '']" @tap="getVerificationCode">{{text}}</view>
					</view>
				</view>
				<view class="wp100 ptb20 mt20">
					<button form-type="submit" class="btnff4f00 mauto f30 fb">提交</button>
				</view>
				<view class="f22 c99 gui-padding mt20">
					<view class="mt10">1.请确保绑定的卡为银行储蓄卡，否则结算佣金将无法到账。</view>
					<view class="mt10">2.请确保储蓄卡为本人所有，无法绑定他人的银行卡。</view>
					<view class="mt10">3.请尽量选择大型商业银行。</view>
				</view>
			</form>
		</view>
	</gui-page>
</template>
<script>
var _this;
var graceChecker = require("@/GraceUI5/js/checker.js");
import { pathToBase64 } from 'image-tools';
export default {
	data() { 
		return {
			pageLoading: false,
			tel: '',
			timer: null,
			text: '获取验证码',
			isClick: true,
			verificationCode: '',
			imageBase64: '',
			bankCardNumber: '',
			bankName: '',
			validDate: '',
		}
	},
	onLoad: function(){
		_this = this;
	},
	onUnload: function(){
		clearInterval(_this.timer);
	},
	methods:{
		chooseImg: function(){
			uni.chooseImage({
				count: 1, //默认9
				sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album','camera'], //从相册选择
				success: function(res){
					pathToBase64(res.tempFilePaths[0])
						.then(base64 => {
							_this.imageBase64 = base64.replace(/^data:image\/\w+;base64,/,'');
							_this.getBankCardIdent();
						})
						.catch(error => {
							_this.$refs.guiPage.openMessage('default','图片转码失败',true,1500);
						});
				}
			});
		},
		getBankCardIdent: function(){
			_this.pageLoading = true;
			var formData = {};
			formData.image = encodeURIComponent(_this.imageBase64);
			uni.gRequest.post(
				'swoft/api/user/getBankCardIdent',
				{
					data: formData
				}, 
				(res) => {
					if(res.error_code == 0){
						if(res.result.bank_card_number){
							_this.bankCardNumber = res.result.bank_card_number;
							_this.bankName = res.result.bank_name;
							_this.validDate = res.result.valid_date;
						}else{
							_this.$refs.guiPage.openMessage('default','未识别到银行卡信息',true,1500);
						}
					}else{
						_this.$refs.guiPage.openMessage('default',res.reason,true,1500);
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
		goTime: function(){
			if(_this.isClick){
				_this.isClick = false;
				var time = 60;
				_this.text = time+'秒后重发';
				_this.timer = uni.gJS.interval(1000, ()=>{
					if(time > 0){
						time --;
						_this.text = time+'秒后重发';
					}else{
						_this.isClick = true;
						_this.text = '获取验证码';
						clearInterval(_this.timer);
					}
				});
			}else{
				return false;
			}
		},
		getVerificationCode: function(){
			if(!_this.isClick){
				return false;
			}
			var formData = {};
			formData.tel = _this.tel;
			formData.bankCardNumber = _this.bankCardNumber;
			formData.bankName = _this.bankName;
			var rule = [
				{name: "bankCardNumber", checkType: "notnull", checkRule: "", errorMsg: "请输入银行卡号"},
				{name: "bankName", checkType: "notnull", checkRule: "", errorMsg: "请输入银行名称"},
				{name: "tel", checkType: "notnull", checkRule: "", errorMsg: "请输入手机号码"},
				{name: "tel", checkType: "phoneno", checkRule: "", errorMsg: "手机号码格式不正确"},
			];
			var checkRes = graceChecker.check(formData, rule);
			if(!checkRes){
				_this.$refs.guiPage.openMessage('default',graceChecker.error,true,1500);
				return false;
			}
			// 四要素验证
			_this.pageLoading = true;
			uni.gRequest.post(
				'swoft/api/user/getBankCardVerification',
				{
					data: {
						bankcard: formData.bankCardNumber,
						realname: uni.getStorageSync('userInfo').name,
						idcard: uni.getStorageSync('userInfo').idCard,
						mobile: formData.tel
					}
				}, 
				(res) => {
					if(res.error_code == 0){
						if(res.result.res == 1){
							// 判断银行卡类型
							uni.gRequest.post(
								'swoft/api/user/getBankCardTypeIdent',
								{
									data: {
										bankcard: formData.bankCardNumber,
										encry: 0
									}
								}, 
								(res) => {
									if(res.error_code == 0){
										if(res.result.cardtype == '借记卡'){
											uni.gRequest.post(
												'swoft/api/login/getVerificationCode',
												{
													data: formData
												}, 
												(res) => {
													if(res.code == 0){
														_this.$refs.guiPage.openMessage('success',res.msg,true,1500);
														setTimeout(function(){
															_this.goTime();
														},1500)
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
												true
											);
										}else{
											_this.$refs.guiPage.openMessage('default','银行卡类型必须为借记卡',true,1500);
											_this.pageLoading = false;
										}
									}else{
										_this.$refs.guiPage.openMessage('default',res.reason,true,1500);
										_this.pageLoading = false;
									}
								},
								(error) => {
									_this.$refs.guiPage.openMessage('default','请求错误',true,1500);
									_this.pageLoading = false;
								},
								(res) => {
									
								},
								true,
								true
							);
						}else{
							_this.$refs.guiPage.openMessage('default',res.result.message,true,1500);
							_this.pageLoading = false;
						}
					}else{
						_this.$refs.guiPage.openMessage('default',res.reason,true,1500);
						_this.pageLoading = false;
					}
				},
				(error) => {
					_this.$refs.guiPage.openMessage('default','请求错误',true,1500);
					_this.pageLoading = false;
				},
				(res) => {
					
				},
				true,
				true
			);
		},
		submit: function(e){
			var formData = {};
			formData = e.detail.value;
			var rule = [
				{name: "bankCardNumber", checkType: "notnull", checkRule: "", errorMsg: "请输入银行卡号"},
				{name: "bankName", checkType: "notnull", checkRule: "", errorMsg: "请输入银行名称"},
				{name: "bankTel", checkType: "notnull", checkRule: "", errorMsg: "请输入手机号"},
				{name: "bankTel", checkType: "phoneno", checkRule: "", errorMsg: "手机号格式不正确"},
				{name: "verificationCode", checkType: "notnull", checkRule: "", errorMsg: "请输入验证码"},
				{name: "verificationCode", checkType: "string", checkRule: "6,6", errorMsg: "验证码长度为6位"}
			];
			var checkRes = graceChecker.check(formData, rule);
			if(!checkRes){
				_this.$refs.guiPage.openMessage('default',graceChecker.error,true,1500);
				return false;
			}
			formData.uid = uni.getStorageSync('userInfo').id;
			formData.id = 0;
			_this.pageLoading = true;
			uni.gRequest.post(
				'swoft/api/user/userBankActive',
				{
					data: formData
				}, 
				(res) => {
					if(res.code == 0){
						_this.$refs.guiPage.openMessage('success',res.msg,true,1500);
						setTimeout(function(){
							uni.navigateBack({
								delta: 1
							})
						},1500)
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
		}
	}
}
</script>
<style>
	@import url('@/static/css/li.css');
	page{background-color: #F5F5F9}
	.list-item{height: 90rpx;}
	.btnff4f00{width:690rpx;height:90rpx;background: #ff4f00;border-radius: 45rpx;text-align: center;line-height: 90rpx;color: #fff;}
	.yzmbtn{width: 134rpx;height: 50rpx;border: 1px solid #ff4f00;border-radius: 10rpx;line-height: 50rpx;}
	.gui-form-label{width: 150rpx;}
	.disabled{color:#999999;border-color:#999999;}
</style>
