<template>
	<gui-page :isLoading="pageLoading" ref="guiPage">
		<view slot="gBody">
			<view @tap="$refs.guipopupInfo.open()" class="gui-flex gui-align-items-center gui-space-between mt20 bgff" style="padding:20rpx 40rpx 20rpx 40rpx;">
				<view class="gui-flex gui-align-items-center">
					<gui-image :src="userInfo.headimgurl != 0 ? userInfo.headUrl : '../../../static/images/zheng/user'+userInfo.gender+'.png'" :width="100" :height="100" borderRadius="50rpx"></gui-image>
					<view class="ml20 f28 fw500">{{userInfo.nickname != '' ? userInfo.nickname : '未设置昵称'}}</view>
				</view>
				<view class=""><text class="gui-icons ml10 c66">&#xe601;</text></view>
			</view>
			<block v-if="userInfo.dalongStaff != 1">
				<navigator url="/pages/my/setting/auto" hover-class="" class="mt20 gui-flex gui-align-items-center gui-space-between bgff list-item plr40">
					<view class="f28">实名认证</view>
					<view class="gui-flex gui-align-items-center">
						<view class="c99 f28">
							未认证
						</view>
						<view class=""><text class="gui-icons ml10 c66">&#xe601;</text></view>
					</view>
				</navigator>
			</block>
			<block v-else>
				<view class="mt20 gui-flex gui-align-items-center gui-space-between bgff list-item plr40">
					<view class="f28">实名认证</view>
					<view class="gui-flex gui-align-items-center">
						<view class="cFF4F00 f28">
							已认证
						</view>
					</view>
				</view>
			</block>
			<view class="gui-flex gui-align-items-center gui-space-between bgff list-item plr40 gui-relative borderTop">
				<view class="f28">淘宝授权</view>
				<view @tap="changeIsTb" class="gui-flex gui-align-items-center">
					<switch :disabled="true" :checked="userInfo.isTb == 1 ? true : false" name="name6" @change="switchChange" color="#FF4F00" />
				</view>
			</view>
			<view @tap="navToUrl('/pages/my/setting/bankcard')" class="mt20 gui-flex gui-align-items-center gui-space-between bgff list-item plr40">
				<view class="f28">
					银行卡管理
				</view>
				<view class=""><text class="gui-icons ml10 c66">&#xe601;</text></view>
			</view>
			<navigator url="/pages/my/setting/setTel" hover-class="" class="gui-flex gui-align-items-center gui-space-between bgff list-item plr40 gui-relative borderTop">
				<view class="f28">
					修改手机号
				</view>
				<view class="gui-flex gui-align-items-center">
					<view class="c99 f28">
						{{userInfo.tel}}
					</view>
					<view class=""><text class="gui-icons ml10 c66">&#xe601;</text></view>
				</view>
			</navigator>
			<navigator url="/pages/my/setting/setpass" hover-class="" class="gui-flex gui-align-items-center gui-space-between bgff list-item plr40 gui-relative borderTop">
				<view class="f28">
					修改密码
				</view>
				<view class=""><text class="gui-icons ml10 c66">&#xe601;</text></view>
			</navigator>
			<navigator url="/pages/my/setting/address" hover-class="" class="gui-flex gui-align-items-center gui-space-between bgff list-item plr40 gui-relative borderTop">
				<view class="f28">
					收货地址
				</view>
				<view class=""><text class="gui-icons ml10 c66">&#xe601;</text></view>
			</navigator>
			<view class="mt20"></view>
			<navigator url="/pages/login/regAgreement?type=1" hover-class="" class="gui-flex gui-align-items-center gui-space-between bgff list-item plr40 gui-relative borderBottom">
				<view class="f28">
					用户注册协议
				</view>
				<view class=""><text class="gui-icons ml10 c66">&#xe601;</text></view>
			</navigator>
			<navigator url="/pages/login/regAgreement?type=2" hover-class="" class="gui-flex gui-align-items-center gui-space-between bgff list-item plr40 gui-relative borderBottom">
				<view class="f28">
					隐私协议
				</view>
				<view class=""><text class="gui-icons ml10 c66">&#xe601;</text></view>
			</navigator>
			<!--  #ifdef  APP-PLUS -->
			<view class="gui-flex gui-align-items-center gui-space-between bgff list-item plr40 gui-relative borderBottom">
				<view class="f28">
					版本更新
				</view>
				<view @tap="checkForUpdates" class="gui-flex gui-align-items-center">
					<view class="c99 f28">
						检查更新
					</view>
				</view>
			</view>
			<!--  #endif -->
			<view class="gui-flex gui-align-items-center gui-space-between bgff list-item plr40 gui-relative borderBottom">
				<view class="f28">
					注册时间
				</view>
				<view class="gui-flex gui-align-items-center">
					<view class="c99 f28">
						{{timeStr}}
					</view>
				</view>
			</view>
			<view @tap="$refs.guimodal4.open()" class="gui-flex gui-align-items-center gui-space-between bgff list-item plr40">
				<view class="f28">
					注销账号
				</view>
				<view class=""><text class="gui-icons ml10 c66">&#xe601;</text></view>
			</view>
			<view class="mt20"></view>
			<view @tap="$refs.guimodal.open()" class="gui-flex gui-align-items-center gui-space-between bgff list-item plr40">
				<view class="f28">
					退出登录
				</view>
				<view class=""><text class="gui-icons ml10 c66">&#xe601;</text></view>
			</view>
			<gui-modal ref="guimodal" :isCloseBtn="false" title="操作提示">
				<view slot="content" class="plt30tb40 gui-bg-gray">
					<view class="gui-text-center f30 fm">确定要退出登录吗？</view>
				</view>
				<view slot="btns" class="gui-flex gui-rows gui-space-around">
					<view class="modal-btns" @tap="$refs.guimodal.close()">
						<text class="c999999 fb">取消</text>
					</view>
					<view class="modal-btns" @tap="logout">
						<text class="cFF4F00 fb">确认</text>
					</view>
				</view>
			</gui-modal>
			<gui-modal ref="guimodal4" :isCloseBtn="false" title="操作提示">
				<view slot="content" class="plt30tb40 gui-bg-gray">
					<view class="gui-text-center f30 fm">确定要注销该账号吗？</view>
				</view>
				<view slot="btns" class="gui-flex gui-rows gui-space-around">
					<view class="modal-btns" @tap="$refs.guimodal4.close()">
						<text class="c999999 fb">取消</text>
					</view>
					<view class="modal-btns" @tap="cancellation">
						<text class="cFF4F00 fb">确认</text>
					</view>
				</view>
			</gui-modal>
			<gui-popup :zIndex="99" width="600rpx" bgColor="rgba(0,0,0,0.85)" :canCloseByShade="false" ref="guipopupInfo">
				<view class="gui-flex gui-align-items-center gui-justify-content-center gui-wrap">
					<view @tap="$refs.guipopupInfo.close()"><gui-image src="../../../static/images/zheng/close.png" :timer="0" :width="48" :height="48"></gui-image></view>
					<view class="br20 mt60 bgFFFFFF overHidden">
						<view class="popTop gui-relative">
							<view class="popTopBox gui-absolute-lt gui-flex gui-justify-content-center gui-align-items-center">
								<view @tap="chooseImage" class="popTopBoxHead gui-flex gui-justify-content-center gui-align-items-center">
									<image v-if="tempFilePath == ''" class="popTopBoxHeadImg_" mode="aspectFit" src="../../../static/images/zheng/camera.png"></image>
									<image v-else class="wp100 hp100" mode="aspectFit" :src="tempFilePath"></image>
								</view>
							</view>
							<view class="cFF4F00 fb f34 lh34 wp100 gui-absolute-lb gui-text-center">完善资料</view>
						</view>
						<view class="plr40 mt30">
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
			<gui-modal ref="guimodal2" :isCloseBtn="false" title="操作提示">
				<view slot="content" class="plt30tb40 gui-bg-gray">
					<view class="gui-text-center f30 fm">确定要取消淘宝授权吗？</view>
				</view>
				<view slot="btns" class="gui-flex gui-rows gui-space-around">
					<view class="modal-btns" @tap="$refs.guimodal2.close()">
						<text class="c999999 fb">取消</text>
					</view>
					<view class="modal-btns" @tap="changeUser">
						<text class="cFF4F00 fb">确定</text>
					</view>
				</view>
			</gui-modal>
			<gui-modal ref="guimodal3" :isCloseBtn="false" title="更新提示">
				<view slot="content" class="plt30tb40 gui-bg-gray">
					<view class="gui-text-center f30 fm">有新的版本发布,确定要更新吗？</view>
					<view class="mt30 fm f26 plr50" style="line-height:40rpx">
						<text>{{versionDesc}}</text>
					</view>
				</view>
				<view slot="btns" class="gui-flex gui-rows gui-space-around">
					<view class="modal-btns" @tap="$refs.guimodal3.close()">
						<text class="c999999 fb">取消</text>
					</view>
					<view class="modal-btns" @tap="updateVersion">
						<text class="cFF4F00 fb">确定</text>
					</view>
				</view>
			</gui-modal>
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
			tempFilePath: '',
			gender: 2,
			nickname: '',
			signature: '',
			timeStr: '',
			versionDesc: ''
		}
	},
	onLoad() {
		_this = this;
	},
	onShow: function(){
		_this.userInfo = uni.getStorageSync('userInfo');
		_this.gender = _this.userInfo.gender;
		_this.nickname = _this.userInfo.nickname;
		_this.signature = _this.userInfo.signature;
		if(_this.userInfo.headimgurl != 0){
			_this.tempFilePath = _this.userInfo.headUrl;
		}
		if(getApp().globalData.tempFilePath != ''){
			_this.tempFilePath = getApp().globalData.tempFilePath;
			getApp().globalData.tempFilePath = '';
		}
		_this.timeStr = uni.gJS.toDate(_this.userInfo.createdAt,'str');
	},
	methods:{
		updateVersion: function(){
			_this.$refs.guimodal3.close();
			_this.pageLoading = true;
			uni.gRequest.post(
				'swoft/api/config/getConfigField',
				{
					data: {
						field: 'downloadUrl'
					}
				}, 
				(res) => {
					if(res.code == 0){
						// #ifdef APP-PLUS
						var dtask = plus.downloader.createDownload(res.data,{},function(d,status){
							if(status == 200){
								var path = d.filename;  
								plus.runtime.install(path);
							}else{ 
								uni.gJS.msg('安装包下载失败');
							}   
						});  
						try{
							dtask.start();
							var prg = 0;
							var showLoading = plus.nativeUI.showWaiting('正在下载');
							dtask.addEventListener('statechanged', function(task,status){
								switch (task.state) {
									case 1:
										showLoading.setTitle('正在下载');
									break;
									case 2:
										showLoading.setTitle('已连接到服务器');
									break;
									case 3:
										prg = parseInt((parseFloat(task.downloadedSize)/parseFloat(task.totalSize))*100);
										showLoading.setTitle('正在下载'+prg+'%');
									break;
									case 4:
										plus.nativeUI.closeWaiting();
									break;
								}
							});
						}catch(err){
							plus.nativeUI.closeWaiting();
							uni.showToast({
								title: '更新失败',
								mask: false,
								duration: 1500
							});
						}
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
				true
			);
		},
		checkForUpdates: function(){
			uni.gRequest.post(
				'swoft/api/config/getConfigField',
				{
					data: {
						field: 'versionDesc'
					}
				}, 
				(res) => {
					if(res.code == 0){
						_this.versionDesc = res.data;
					}
				},
				(error) => {},
				(res) => {},
				true
			);
			_this.pageLoading = true;
			uni.gRequest.post(
				'swoft/api/config/getConfigField',
				{
					data: {
						field: 'version'
					}
				}, 
				(res) => {
					if(res.code == 0){
						// #ifdef APP-PLUS
						if(res.data != plus.runtime.version){
							_this.$refs.guimodal3.open();
						}else{
							_this.$refs.guiPage.openMessage('success','当前已是最新版本',true,1500);
						}
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
				true
			);
		},
		changeIsTb: function(){
			if(uni.getStorageSync('userInfo').isTb == 0){
				_this.pageLoading = true;
				uni.gRequest.post(
					'swoft/api/taobao/getCode',
					{
						data: {
							uid: uni.getStorageSync('userInfo').id
						}
					}, 
					(res) => {
						if(res.code == 20000){
							// 进入淘宝授权
							let openUrl = res.data;
							// #ifdef APP-PLUS
							if(plus.runtime.isApplicationExist({  
							    pname: 'com.taobao.taobao',  
							    action: 'taobao://'
							})){
								openUrl = 'taobao'+openUrl.slice(5);
								plus.runtime.openURL(
									openUrl,
									function(res){
										console.log(res);
									},
									'com.taobao.taobao'
								);
							}else{
								uni.navigateTo({
									url: `/pages/home/web?url=${encodeURIComponent(openUrl)}`
								})
							}
							// #endif
							// #ifdef H5
							window.location.href = openUrl;
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
			}else{
				_this.$refs.guimodal2.open();
			}
		},
		changeUser: function(){
			var formData = {};
			formData.id = uni.getStorageSync('userInfo').id;
			formData.isTb = 0;
			_this.pageLoading = true;
			uni.gRequest.post(
				'swoft/api/user/editUserInfo',
				{
					data: formData
				}, 
				(res) => {
					if(res.code == 0){
						_this.$refs.guimodal2.close();
						_this.$refs.guiPage.openMessage('success','已取消授权',true,1500);
						uni.setStorageSync('userInfo',res.data);
						_this.userInfo = res.data;
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
		switchChange: function(res){
		},
		logout: function(){
			uni.removeStorageSync('userInfo');
			uni.removeStorageSync('uToken');
			_this.$refs.guimodal.close();
			_this.$refs.guiPage.openMessage('success','已退出登录',true,1500);
			setTimeout(function(){
				uni.reLaunch({
					url: '/pages/login/login'
				})
			},1500);
		},
		cancellation() {
			_this.pageLoading = true;
			var formData = {};
			formData.id = uni.getStorageSync('userInfo').id;
			formData.status = -1;
			uni.gRequest.post(
				'swoft/api/user/editUserInfo',
				{
					data: formData
				}, 
				(res) => {
					if(res.code == 0){
						uni.removeStorageSync('userInfo');
						uni.removeStorageSync('uToken');
						_this.$refs.guimodal4.close();
						_this.$refs.guiPage.openMessage('success','账号已注销',true,1500);
						setTimeout(function(){
							uni.reLaunch({
								url: '/pages/login/login'
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
			if(_this.tempFilePath == ''){
				_this.$refs.guiPage.openMessage('default','请上传头像',true,1500);
				return false;
			}
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
			if(_this.tempFilePath != _this.userInfo.headUrl){
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
						_this.userInfo = res.data;
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
		}
	}
}
</script>
<style>
	@import url('@/static/css/li.css');
	page{background-color: #F5F5F9}
	.ml30{margin-left: 30rpx;}
	.p30{padding: 30rpx;}
	.list-item{height: 90rpx;}
</style>
