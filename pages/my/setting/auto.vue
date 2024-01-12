<template>
	<gui-page :isLoading="pageLoading" ref="guiPage">
		<view slot="gBody">
			<view class="mt20 bgff">
				<view class="gui-idcard-items gui-img-in gui-flex gui-rows gui-justify-content-center">
					<view class="gui-idcard-items-image p20" @tap="selectImg1">
						<gui-image :src="idCardFont != '' ? idCardFont : '/static/images/setting/zheng.png'" :width="440" :height="328"></gui-image>
					</view>
				</view>
				<view class="f28 gui-text-center gui-text p20">上传身份证正面</view>
				<view class="gui-idcard-items gui-img-in gui-flex gui-rows gui-justify-content-center">
					<view class="gui-idcard-items-image p20" @tap="selectImg2">
						<gui-image :src="idCardBack != '' ? idCardBack : '/static/images/setting/fan.png'" :width="440" :height="328"></gui-image>
					</view>
				</view>
				<view class="f28 gui-text-center gui-text p20">上传身份证反面</view>
			</view>
			<view class="mt20">
				<view class="gui-flex gui-align-items-center gui-space-between bgff list-item plr40 gui-relative borderBottom">
					<view class="f28">
						姓名
					</view>
					<view class="gui-flex gui-align-items-center">
						<input placeholder="请输入姓名" v-model="name" class="f28 gui-text-right" />
					</view>
				</view>
				<view class="gui-flex gui-align-items-center gui-space-between bgff list-item plr40">
					<view class="f28">
						身份证号
					</view>
					<view class="gui-flex gui-align-items-center">
						<input placeholder="请输入身份证号" v-model="idCard" class="f28 gui-text-right" />
					</view>
				</view>
				<view class="wp100 gui-fixed-lb ptb20">
					<view @tap="doAuto" class="btnff4f00 mauto">确定</view>
				</view>
			</view>
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
			idCardFont: '',
			idCardFontBase64: '',
			idCardBack: '',
			idCardBackBase64: '',
			name: '',
			idCard: ''
		}
	},
	onLoad: function(){
		_this = this;
	},
	methods:{
		selectImg1: function(){
			uni.chooseImage({
				count: 1, //默认9
				sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album','camera'], //从相册选择
				success: function(res){
					_this.idCardFont = res.tempFilePaths[0];
					pathToBase64(res.tempFilePaths[0])
						.then(base64 => {
							_this.idCardFontBase64 = base64.replace(/^data:image\/\w+;base64,/,'');
							_this.getIdCardIdent(_this.idCardFontBase64,'font');
						})
						.catch(error => {
							_this.$refs.guiPage.openMessage('default','图片转码失败',true,1500);
						});
				}
			});
		},
		selectImg2: function(){
			uni.chooseImage({
				count: 1, //默认9
				sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album','camera'], //从相册选择
				success: function(res){
					_this.idCardBack = res.tempFilePaths[0];
					pathToBase64(res.tempFilePaths[0])
						.then(base64 => {
							_this.idCardBackBase64 = base64.replace(/^data:image\/\w+;base64,/,'');
							_this.getIdCardIdent(_this.idCardBackBase64,'back');
						})
						.catch(error => {
							_this.$refs.guiPage.openMessage('default','图片转码失败',true,1500);
						});
				}
			});
		},
		getIdCardIdent: function(image,e){
			_this.pageLoading = true;
			uni.gRequest.post(
				'swoft/api/user/getIdCardIdent',
				{
					data: {
						image: image,
						side: e
					}
				}, 
				(res) => {
					if(res.error_code == 0){
						if(e == 'font'){
							if(res.result.realname && res.result.idcard){
								_this.name = res.result.realname;
								_this.idCard = res.result.idcard;
								_this.$refs.guiPage.openMessage('success','识别成功',true,1500);
							}else{
								_this.$refs.guiPage.openMessage('default','未识别到身份证信息',true,1500);
								_this.idCardFont = '';
								_this.idCardFontBase64 = '';
							}
						}else{
							if(res.result.begin && res.result.department){
								_this.$refs.guiPage.openMessage('success','识别成功',true,1500);
							}else{
								_this.$refs.guiPage.openMessage('default','未识别到身份证信息',true,1500);
								_this.idCardBack = '';
								_this.idCardBackBase64 = '';
							}
						}
					}else{
						_this.$refs.guiPage.openMessage('default',res.reason,true,1500);
						if(e == 'font'){
							_this.idCardFont = '';
							_this.idCardFontBase64 = '';
						}else{
							_this.idCardBack = '';
							_this.idCardBackBase64 = '';
						}
					}
				},
				(error) => {
					_this.$refs.guiPage.openMessage('default','请求错误',true,1500);
					if(e == 'font'){
						_this.idCardFont = '';
						_this.idCardFontBase64 = '';
					}else{
						_this.idCardBack = '';
						_this.idCardBackBase64 = '';
					}
				},
				(res) => {
					_this.pageLoading = false;
				},
				true,
				true
			);
		},
		doAuto: function(){
			if(_this.idCardFontBase64 == ''){
				_this.$refs.guiPage.openMessage('default','请上传身份证正面',true,1500);
				return false;
			}
			if(_this.idCardBackBase64 == ''){
				_this.$refs.guiPage.openMessage('default','请上传身份证反面',true,1500);
				return false;
			}
			var formData = {};
			formData.name = _this.name;
			formData.idCard = _this.idCard;
			var rule = [
				{name: "name", checkType: "notnull", checkRule: "", errorMsg: "请输入姓名"},
				{name: "idCard", checkType: "notnull", checkRule: "", errorMsg: "请输入身份证号"},
				{name: "idCard", checkType: "idCard", checkRule: "", errorMsg: "身份证号格式不正确"},
			];
			var checkRes = graceChecker.check(formData, rule);
			if(!checkRes){
				_this.$refs.guiPage.openMessage('default',graceChecker.error,true,1500);
				return false;
			}
			formData.infoPage = encodeURIComponent(_this.idCardFontBase64);
			formData.emblemPage = encodeURIComponent(_this.idCardBackBase64);
			formData.uid = uni.getStorageSync('userInfo').id;
			formData.tel = uni.getStorageSync('userInfo').tel;
			_this.pageLoading = true;
			uni.gRequest.post(
				'swoft/api/dalong/addStaff',
				{
					data: formData
				}, 
				(res) => {
					if(res.code == 20000){
						_this.$refs.guiPage.openMessage('success',res.msg,true,1500);
						_this.getUserInfo();
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
	page{background-color: #F5F5F9}
	.list-item{height: 90rpx;}
	.btnff4f00{width:690rpx;height:90rpx;background: #ff4f00;border-radius: 45rpx;text-align: center;line-height: 90rpx;color: #fff;}
</style>
