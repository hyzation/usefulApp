<template>
	<gui-page :isLoading="pageLoading" ref="guiPage">
		<view slot="gBody" class="fullPage gui-flex gui-justify-content-center">
			<view class="w620">
				<view class="fb f40 lh40 mt40">重置密码</view>
				<form @submit="doSubmit">
					<view class="fm f28 lh28 mt90">手机号</view>
					<input name="tel" v-model="tel" type="number" :maxlength="11" class="h90 lh90 f32 gui-relative borderBottom fm" placeholder-class="c999999 f28" placeholder="请输入手机号" />
					<view class="fm f28 lh28 mt30">验证码</view>
					<view class="h90 gui-relative borderBottom gui-flex gui-align-items-center gui-space-between">
						<input name="verificationCode" v-model="verificationCode" type="number" :maxlength="6" class="f32 fm wp50" placeholder-class="c999999 f28" placeholder="请输短信验证码" />
						<view class="codeBtn br10 cFF4F00 f28 fm gui-text-center" :class="[!isClick ? 'disabled' : '']" @tap="getVerificationCode">{{text}}</view>
					</view>
					<view class="fm f28 lh28 mt30">密码</view>
					<view class="h90 gui-relative borderBottom gui-flex gui-align-items-center gui-space-between">
						<input name="password" :type="eyeOpen1 ? 'text' : 'password'" :maxlength="16" class="f32 fm" placeholder-class="c999999 f28" placeholder="请输入密码" />
						<view @tap="changeEye1"><gui-image :src="'../../static/images/zheng/'+(eyeOpen1 ? 'eye_open' : 'eye_close')+'.png'" :width="24" :height="16" :timer="0"></gui-image></view>
					</view>
					<view class="cFF4F00 f20 fm mt20">至少8个字符不能全是字母或数字</view>
					<view class="fm f28 lh28 mt30">确认密码</view>
					<view class="h90 gui-relative borderBottom gui-flex gui-align-items-center gui-space-between">
						<input name="confirmPassword" :type="eyeOpen2 ? 'text' : 'password'" :maxlength="16" class="f32 fm" placeholder-class="c999999 f28" placeholder="请输入密码" />
						<view @tap="changeEye2"><gui-image :src="'../../static/images/zheng/'+(eyeOpen2 ? 'eye_open' : 'eye_close')+'.png'" :width="24" :height="16" :timer="0"></gui-image></view>
					</view>
					<button form-type="submit" class="h90 w620 lh90 cFFFFFF bgFF4F00 br45 mt60 f30 fb" hover-class="none">确认更改</button>
				</form>
			</view>
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
				eyeOpen1: false,
				eyeOpen2: false,
				tel: '',
				timer: null,
				text: '获取验证码',
				isClick: true,
				verificationCode: '',
			}
		},
		onLoad: function(){
			_this = this;
		},
		onUnload: function(){
			clearInterval(_this.timer);
		},
		methods: {
			changeEye1: function(){
				_this.eyeOpen1 = !_this.eyeOpen1;
			},
			changeEye2: function(){
				_this.eyeOpen2 = !_this.eyeOpen2;
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
				var rule = [
					{name: "tel", checkType: "notnull", checkRule: "", errorMsg: "请输入手机号"},
					{name: "tel", checkType: "phoneno", checkRule: "", errorMsg: "手机号格式不正确"},
					{name: "verificationCode", checkType: "notnull", checkRule: "", errorMsg: "请输入验证码"},
					{name: "verificationCode", checkType: "string", checkRule: "6,6", errorMsg: "验证码长度为6位"},
					{name: "password", checkType: "notnull", checkRule: "", errorMsg: "请输入密码"},
					{name: "password", checkType: "reg", checkRule: "^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$", errorMsg: "密码格式不正确"},
					{name: "confirmPassword", checkType: "notnull", checkRule: "", errorMsg: "请再次输入密码"},
					{name: "confirmPassword", checkType: "samewith", checkRule: "password", errorMsg: "两次密码输入不一致"}
				];
				var checkRes = graceChecker.check(formData, rule);
				if(!checkRes){
					_this.$refs.guiPage.openMessage('default',graceChecker.error,true,1500);
					return false;
				}
				_this.pageLoading = true;
				uni.gRequest.post(
					'swoft/api/login/updatePassword',
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
					true
				);
			}
		}
	}
</script>
<style>
	.codeBtn{width:160rpx;height:60rpx;line-height:60rpx;border:thin solid #FF4F00;}
	.wp50{width:50%;}
	.disabled{color:#999999;border-color:#999999;}
</style>