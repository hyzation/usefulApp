<template>
	<gui-page :isLoading="pageLoading" :fullPage="true" :customHeader="true" :isHeaderSized="false" :headerSets="{height:0}" ref="guiPage">
		<view slot="gBody" class="fullPage gui-flex gui-justify-content-center gui-align-items-center">
			<view class="w620">
				<gui-image src="../../static/images/zheng/logo.png" :width="120" :height="120" :timer="0" mode="aspectFit"></gui-image>
				<view class="fb f40 lh40 mt40">欢迎使用有用APP</view>
				<form @submit="doSubmit">
					<view class="fm f28 lh28 mt90">手机号</view>
					<input name="tel" value="18051821995" type="number" :maxlength="11" class="h90 lh90 f32 fm gui-relative borderBottom" placeholder-class="c999999 f28" placeholder="请输入手机号" />
					<view class="fm f28 lh28 mt30">密码</view>
					<view class="h90 gui-relative borderBottom gui-flex gui-align-items-center gui-space-between">
						<input name="password" value="love091028" :type="eyeOpen ? 'text' : 'password'" :maxlength="20" class="f32 fm" placeholder-class="c999999 f28" placeholder="请输入密码" />
						<view @tap="changeEye"><gui-image :src="'../../static/images/zheng/'+(eyeOpen ? 'eye_open' : 'eye_close')+'.png'" :width="24" :height="16" :timer="0"></gui-image></view>
					</view>
					<button form-type="submit" class="h90 w620 lh90 cFFFFFF bgFF4F00 br45 mt60 f30 fb" hover-class="none">登录</button>
				</form>
				<view class="gui-flex gui-align-items-center gui-space-between mt20">
					<navigator url="/pages/login/resetPassWord" class="c999999 f28 lh28 fm" hover-class="">忘记密码</navigator>
					<navigator url="/pages/login/register" class="cFF4F00 f28 lh28 fm" hover-class="">注册账号</navigator>
				</view>
			</view>
			<gui-popup :zIndex="99" width="600rpx" bgColor="rgba(0,0,0,0.85)" :canCloseByShade="false" ref="guipopupInfo">
				<view class="gui-flex gui-align-items-center gui-justify-content-center gui-wrap">
					<view @tap="close"><gui-image src="../../static/images/zheng/close.png" :timer="0" :width="48" :height="48"></gui-image></view>
					<view class="br20 mt60 bgFFFFFF overHidden">
						<view class="popTop gui-relative">
							<view class="popTopBox gui-absolute-lt gui-flex gui-justify-content-center gui-align-items-center">
								<view @tap="chooseImage" class="popTopBoxHead gui-flex gui-justify-content-center gui-align-items-center">
									<image v-if="tempFilePath == ''" class="popTopBoxHeadImg_" mode="aspectFit" src="../../static/images/zheng/camera.png"></image>
									<image v-else class="wp100 hp100" mode="aspectFit" :src="tempFilePath"></image>
								</view>
							</view>
							<view class="c999999 fm f20 wp100 gui-absolute-lb gui-text-center" style="bottom:30rpx;">请上传头像</view>
							<view class="cFF4F00 fb f34 lh34 wp100 gui-absolute-lb gui-text-center" style="bottom:-30rpx;">完善资料</view>
						</view>
						<view class="plr40 mt50">
							<view class="gui-relative h90 lh90 borderBottom gui-flex gui-align-items-center gui-space-between">
								<text class="f28 fm">昵称</text>
								<input v-model="nickname" :maxlength="15" class="h90 lh90 gui-text-right f28 fm" style="width:420rpx;" placeholder="请输入昵称" placeholder-class="c999999" />
							</view>
							<view class="gui-relative h90 lh90 borderBottom gui-flex gui-align-items-center gui-space-between">
								<text class="f28 fm">性别</text>
								<view class="gui-flex gui-align-items-center gui-justify-content-end">
									<view @tap="changeGender(1)" class="ml30 gui-flex gui-align-items-center">
										<text class="gui-icons cFF4F00 f32">{{gender == 1 ? '&#xe7f8;' : '&#xe762;'}}</text>
										<text class="fm f28 ml10">男</text>
									</view>
									<view @tap="changeGender(2)" class="ml30 gui-flex gui-align-items-center">
										<text class="gui-icons cFF4F00 f32">{{gender == 2 ? '&#xe7f8;' : '&#xe762;'}}</text>
										<text class="fm f28 ml10">女</text>
									</view>
								</view>
							</view>
							<view class="gui-relative borderBottom">
								<view class="f28 lh28 mt30 fm">个性签名</view>
								<textarea style="width:520rpx;padding:30rpx 0;" v-model="signature" :maxlength="50" class="f28 fm" placeholder="请输入个性签名" placeholder-class="c999999" :auto-height="true"></textarea>
							</view>
							<view @tap="perfectInfo" class="f26 cFFFFFF fm bgFF4F00 br30 gui-text-center h60 lh60 w200 mtb30Auto">提交</view>
						</view>
					</view>
				</view>
			</gui-popup>
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
				eyeOpen: false,
				tempFilePath: '',
				gender: 2,
				nickname: '',
				signature: ''
			}
		},
		onShow: function(){
			if(getApp().globalData.tempFilePath != ''){
				_this.tempFilePath = getApp().globalData.tempFilePath;
				getApp().globalData.tempFilePath = '';
			}
		},
		onLoad: function(){
			_this = this;
		},
		onReady: function(){

		},
		methods: {
			changeEye: function(){
				_this.eyeOpen = !_this.eyeOpen;
			},
			doSubmit: function(e){
				var formData = {};
				formData = e.detail.value;
				var rule = [
					{name: "tel", checkType: "notnull", checkRule: "", errorMsg: "请输入手机号"},
					{name: "tel", checkType: "phoneno", checkRule: "", errorMsg: "手机号格式不正确"},
					{name: "password", checkType: "notnull", checkRule: "", errorMsg: "请输入密码"},
					{name: "password", checkType: "reg", checkRule: "^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$", errorMsg: "密码格式不正确"},
				];
				var checkRes = graceChecker.check(formData, rule);
				if(!checkRes){
					_this.$refs.guiPage.openMessage('default',graceChecker.error,true,1500);
					return false;
				}
				console.log(formData)
				_this.pageLoading = true;
				uni.gRequest.post(
					'swoft/api/login/passwordLogin',
					{
						data: formData
					}, 
					(res) => {
						if(res.code == 0){
							_this.$refs.guiPage.openMessage('success',res.msg,true,1500);
							uni.setStorageSync('userInfo',res.data.userInfo);
							uni.gRequest.writeLoginToken(res.data.uToken,res.data.userInfo.id);
							if(res.data.userInfo.nickname == ''){
								setTimeout(function(){
									_this.$refs.guipopupInfo.open();
								},1500);
							}else{
								// #ifdef APP-PLUS
								setTimeout(function(){
									uni.reLaunch({
										url: '/pages/start/lanch'
									})
								},1500);
								// #endif
								// #ifdef H5
								setTimeout(function(){
									uni.reLaunch({
										url: '/pages/start/advertising'
									})
								},1500);
								// #endif
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
					},
					true
				);
			},
			changeGender: function(e){
				_this.gender = e;
			},
			chooseImage: function(){
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					sourceType: ['album','camera'],
					success: function(res){
						uni.navigateTo({
							url: '/pages/weCropper/weCropper?tmpFace='+encodeURIComponent(res.tempFilePaths[0])
						})
					}
				});
			},
			perfectInfo: async function(){
				// if(_this.tempFilePath == ''){
				// 	_this.$refs.guiPage.openMessage('default','请上传头像',true,1500);
				// 	return false;
				// }
				var formData = {};
				formData.id = uni.getStorageSync('userInfo').id;
				formData.nickname = _this.nickname;
				formData.gender = _this.gender;
				formData.signature = _this.signature;
				var rule = [
					{name: "nickname", checkType: "notnull", checkRule: "", errorMsg: "请输入昵称"},
					{name: "nickname", checkType: "string", checkRule: "1,15", errorMsg: "昵称不能超过15个字符"},
					// {name: "signature", checkType: "notnull", checkRule: "", errorMsg: "请输入个性签名"},
					// {name: "signature", checkType: "string", checkRule: "1,50", errorMsg: "个性签名不能超过50个字符"},
				];
				var checkRes = graceChecker.check(formData, rule);
				if(!checkRes){
					_this.$refs.guiPage.openMessage('default',graceChecker.error,true,1500);
					return false;
				}
				_this.pageLoading = true;
				// 上传图片
				if(_this.tempFilePath != ''){
					let res = await _this.uploadImage();
					formData.headimgurl = res;
				}
				uni.gRequest.post(
					'swoft/api/user/editUserInfo',
					{
						data: formData
					}, 
					(res) => {
						if(res.code == 0){
							_this.$refs.guipopupInfo.close();
							_this.$refs.guiPage.openMessage('success',res.msg,true,1500);
							uni.setStorageSync('userInfo',res.data);
							// #ifdef APP-PLUS
							setTimeout(function(){
								uni.reLaunch({
									url: '/pages/start/lanch'
								})
							},1500);
							// #endif
							// #ifdef H5
							setTimeout(function(){
								uni.reLaunch({
									url: '/pages/start/advertising'
								})
							},1500);
							// #endif
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
			uploadImage: async function(){
				// 获取七牛云token
				let res = await uni.gRequest.postSync(
					'swoft/api/user/getQiniuToken',
					{
						data: {}
					},
					true,
					true
				);
				if(!res){
					_this.$refs.guiPage.openMessage('default','七牛云token获取失败',true,1500);
					_this.pageLoading = false;
					return false;
				}
				let qiniu = res.data;
				let uploadURL = '';
				switch(qiniu.region){
				    case 'ECN': uploadURL = 'https://up.qiniup.com'; break;
				    case 'NCN': uploadURL = 'https://up-z1.qiniup.com'; break;
				    case 'SCN': uploadURL = 'https://up-z2.qiniup.com'; break;
				    case 'NA': uploadURL = 'https://up-na0.qiniup.com'; break;
				    case 'ASG': uploadURL = 'https://up-as0.qiniup.com'; break;
				}
				let timetamp = new Date().getTime();
				let filename = 'refundss_'+timetamp+'.png';
				let [error,result] = await uni.uploadFile({
					url: uploadURL, 
					filePath: _this.tempFilePath,
					name: 'file',
					formData: {
						'key': filename,
						'token': qiniu.uptoken
					}
				});
				if(error != null){ 
					_this.$refs.guiPage.openMessage('default','图片上传失败',true,1500);
					_this.pageLoading = false;
					return false; 
				}
				if(!result){
					_this.$refs.guiPage.openMessage('default','图片上传失败',true,1500);
					_this.pageLoading = false;
					return false;
				}
				if(result.statusCode != 200){
					_this.$refs.guiPage.openMessage('default','图片上传失败',true,1500);
					_this.pageLoading = false;
					return false;
				}
				let resData = JSON.parse(result.data);
				return qiniu.domain+resData.key;
			},
			close: function(){
				_this.$refs.guipopupInfo.close()
				// #ifdef APP-PLUS
				setTimeout(function(){
					uni.reLaunch({
						url: '/pages/start/lanch'
					})
				},1500);
				// #endif
				// #ifdef H5
				setTimeout(function(){
					uni.reLaunch({
						url: '/pages/start/advertising'
					})
				},1500);
				// #endif
			}
		}
	}
</script>
<style>
	
</style>