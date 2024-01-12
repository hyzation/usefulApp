<template>
	<gui-page :isLoading="pageLoading" ref="guiPage">
		<view slot="gBody">
			<form @submit="doSubmit">
				<view class="bgff plr40 mt20">
					<view class="gui-form-item gui-border-b list-item">
						<text class="gui-form-label f28">登录账号</text>
						<view class="gui-form-body">
							<input type="number" :disabled="true" :maxlength="11" v-model="userInfo.tel" class="gui-form-input gui-text-right c999999" placeholder="请输入手机号" />
						</view>
					</view>
					<view class="gui-form-item gui-border-b list-item">
						<text class="gui-form-label f28">新手机号</text>
						<view class="gui-form-body">
							<input type="number" :maxlength="11" class="gui-form-input gui-text-right" v-model="tel" name="tel" placeholder="请输入新手机号" />
						</view>
					</view>
					<view class="gui-form-item list-item">
						<text class="gui-form-label f28">验证码</text>
						<view class="gui-form-body">
							<input type="number" v-model="verificationCode" :maxlength="6" class="gui-form-input gui-text-right" name="verificationCode" placeholder="请输入验证码"/>
						</view>
						<view class="yzmbtn f22 gui-text-center ml20 cff4f00" :class="[!isClick ? 'disabled' : '']" @tap="getVerificationCode">{{text}}</view>
					</view>
				</view>
				<view class="wp100 ptb20 mt20">
					<button form-type="submit" class="btnff4f00 mauto f30 fb" hover-class="">立即修改</button>
				</view>
			</form>
		</view>
	</gui-page>
</template>
<script>
var graceChecker = require("@/GraceUI5/js/checker.js");
var _this;
export default {
	data() { 
		return {
			pageLoading: false,
			userInfo: null,
			tel: '',
			timer: null,
			text: '获取验证码',
			isClick: true,
			verificationCode: '',
		}
	},
	onLoad() {
		_this = this;
		_this.userInfo = uni.getStorageSync('userInfo');
	},
	onUnload: function(){
		clearInterval(_this.timer);
	},
	methods:{
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
			if(_this.tel == _this.userInfo.tel){
				_this.$refs.guiPage.openMessage('default','新手机号与原手机号不能重复',true,1500);
				return false;
			}
			var formData = {};
			formData.tel = _this.tel;
			var rule = [
				{name: "tel", checkType: "notnull", checkRule: "", errorMsg: "请输入手机号"},
				{name: "tel", checkType: "phoneno", checkRule: "", errorMsg: "手机号格式不正确"},
			];
			var checkRes = graceChecker.check(formData, rule);
			if(!checkRes){
				_this.$refs.guiPage.openMessage('default',graceChecker.error,true,1500);
				return false;
			}
			_this.pageLoading = true;
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
		},
		doSubmit: function(e){
			var formData = {};
			formData = e.detail.value;
			formData.id = uni.getStorageSync('userInfo').id;
			var rule = [
				{name: "tel", checkType: "notnull", checkRule: "", errorMsg: "请输入新手机号"},
				{name: "tel", checkType: "phoneno", checkRule: "", errorMsg: "新手机号格式不正确"},
				{name: "verificationCode", checkType: "notnull", checkRule: "", errorMsg: "请输入验证码"},
				{name: "verificationCode", checkType: "string", checkRule: "6,6", errorMsg: "验证码长度为6位"}
			];
			var checkRes = graceChecker.check(formData, rule);
			if(!checkRes){
				_this.$refs.guiPage.openMessage('default',graceChecker.error,true,1500);
				return false;
			}
			_this.pageLoading = true;
			uni.gRequest.post(
				'swoft/api/user/editTel',
				{
					data: formData
				}, 
				(res) => {
					if(res.code == 0){
						_this.$refs.guiPage.openMessage('success',res.msg,true,1500);
						uni.setStorageSync('userInfo',res.data);
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
	.yzmbtn{width: 134rpx;height: 50rpx;border: thin solid #ff4f00;border-radius: 10rpx;line-height: 50rpx;}
	.disabled{color:#999999;border-color:#999999;}
</style>
