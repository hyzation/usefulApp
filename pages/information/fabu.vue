<template>
	<gui-page :isLoading="pageLoading" ref="guiPage">
		<view slot="gBody" class="source">
			<form @submit="submit">
				<view class="mt20 p20 bgff br10" :style="'min-height:'+mainHeight+'px;'">
					<view class="gui-flex gui-wrap">
						<graceSelectImgAndUploadQiniu :selectedimgs="selectedimgs" :maxFileNumber="9" ref="selectimgandupload" @uploaded="imgLoaded" @change="imgsChange" @uploaderror="uploaderror" itemsWidth="200rpx" btnImg="../../static/images/setting/quanziuplods.png"></graceSelectImgAndUploadQiniu>
					</view>
					<view class="gui-form-item mt20 gui-relative borderBottom">
						<input v-model="title" type="text" class="gui-form-input f28 wp100" name="title" placeholder="请输入标题" />
					</view>
					<textarea v-model="content" placeholder="请输入正文（不少于5个字）" name="content" class="f28 ptb20" :auto-height="true" :maxlength="1000" style="width:670rpx;"></textarea>
				</view>
				<view style="height:120rpx;"></view>
				<view class="gui-fixed-lb wp100 ptb20" id="footer">
					<view class="gui-flex gui-align-items-center gui-space-between plr20">
						<view class="cff btnleft gui-flex gui-column gui-align-items-center gui-justify-content-center">
							<view @tap="saveDraft" class="gui-flex gui-align-items-center">
								<gui-image :src="'/static/images/setting/ccgicom.png'" :width="26"></gui-image>
								<text class="ml10 f30">存草稿</text>
							</view>
						</view>
						<button form-type="submit" class="btnright gui-text-center bgff4f00 cff f30" hover-class=""><text>发布圈子</text></button>
					</view>
				</view>
			</form>
		</view>
	</gui-page>
</template>
<script>
var _this;
var graceChecker = require("@/GraceUI5/js/checker.js");
import graceSelectImgAndUploadQiniu from "@/components/graceSelectImgAndUploadQiniu/graceSelectImgAndUploadQiniu.vue";
export default {
	data() { 
		return {
			pageLoading: false,
			mainHeight: 0,
			selectedimgs: [],
			formData: null,
			title: '',
			content: '',
			type: 1
		}
	},
	onLoad() {
		_this = this;
		// if(uni.getStorageSync('newsDraft') != ''){
		// 	_this.title = uni.getStorageSync('newsDraft').title;
		// 	_this.content = uni.getStorageSync('newsDraft').content;
		// 	_this.selectedimgs = uni.getStorageSync('newsDraft').selectedimgs;
		// }
		_this.getNewsCaogaoDetail();
	},
	onReady() {
		uni.gJS.select('#footer', (res)=>{
			_this.mainHeight = uni.gJS.system().windowHeight - res.height - uni.upx2px(60);
		});
	},
	methods:{
		getNewsCaogaoDetail: function(){
			_this.pageLoading = true;
			uni.gRequest.post(
				'swoft/api/news/getNewsCaogaoDetail',
				{
					data: {
						uid: uni.getStorageSync('userInfo').id
					}
				}, 
				(res) => {
					if(res.code == 0){
						if(res.data){
							_this.title = res.data.title;
							if(res.data.cover != undefined){
								res.data.cover.forEach((item,index)=>{
									_this.selectedimgs.push({
										url: item,
										progress: 100,
										error: false,
										_key: index
									});
								});
							}
							let newString = res.data.content.replace(/<br\/>/g, '\n');
							newString = newString.replace(/&nbsp;/g, ' '); // 空格处理
							_this.content = newString;
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
		saveDraft: function(){
			// uni.setStorageSync('newsDraft',{
			// 	selectedimgs: _this.selectedimgs,
			// 	title: _this.title,
			// 	content: _this.content
			// });
			// _this.$refs.guiPage.openMessage('success','已保存',true,1500);
			_this.type = 1;
			if(_this.selectedimgs.length > 0){
				_this.$refs.selectimgandupload.upload();
			}else{
				let imglist = [];
				_this.doSaveDraft(imglist);
			}
		},
		doSaveDraft: function(imglist){
			_this.pageLoading = true;
			let postData = {
				uid: uni.getStorageSync('userInfo').id,
				title: _this.title,
				content: _this.content
			}
			if(imglist.length > 0){
				postData.imgpath = JSON.stringify(imglist);
			}else{
				postData.imgpath = '';
			}
			let newString = postData.content.replace(/\n/g, '_@').replace(/\r/g, '_#');
			newString = newString.replace(/_#_@/g, '<br/>'); // IE7-8
			newString = newString.replace(/_@/g, '<br/>'); // IE9、FF、chrome
			newString = newString.replace(/\s/g, '&nbsp;'); // 空格处理
			postData.content = newString;
			uni.gRequest.post(
				'swoft/api/news/addnewsCaogao',
				{
					data: postData
				}, 
				(res) => {
					if(res.code == 0){
						_this.$refs.guiPage.openMessage('success','已保存',true,1500);
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
		imgsChange: function(imgs){
			_this.selectedimgs = imgs;
		},
		imgLoaded: function(res){
			if(_this.type == 1){
				_this.doSaveDraft(res);
			}else{
				_this.submitNews(res);
			}
		},
		uploaderror: function(){
			_this.$refs.guiPage.openMessage('default','图片上传失败',true,1500);
			return false;
		},
		// 清空图片
		clearAllImgs: function(){
			_this.$refs.selectimgandupload.clearAllImgs();
		},
		submit: function(e){
			if(_this.selectedimgs.length == 0){
				_this.$refs.guiPage.openMessage('default','请上传照片',true,1500);
				return false;
			}
			let formData = e.detail.value;
			var rule = [
				{name: "title", checkType: "notnull", checkRule: "", errorMsg: "请输入标题"},
				{name: "content", checkType: "notnull", checkRule: "", errorMsg: "请输入正文"},
				{name: "content", checkType: "string", checkRule: "5,", errorMsg: "正文内容不少于5个字"},
			];
			var checkRes = graceChecker.check(formData, rule);
			if(!checkRes){
				_this.$refs.guiPage.openMessage('default',graceChecker.error,true,1500);
				return false;
			}
			let newString = formData.content.replace(/\n/g, '_@').replace(/\r/g, '_#');
			newString = newString.replace(/_#_@/g, '<br/>'); // IE7-8
			newString = newString.replace(/_@/g, '<br/>'); // IE9、FF、chrome
			newString = newString.replace(/\s/g, '&nbsp;'); // 空格处理
			formData.content = newString;
			_this.formData = formData;
			_this.type = 2;
			_this.$refs.selectimgandupload.upload();
		},
		submitNews: function(imglist){
			_this.formData.imgpath = JSON.stringify(imglist);
			_this.formData.uid = uni.getStorageSync('userInfo').id;
			_this.pageLoading = true;
			uni.gRequest.post(
				'swoft/api/news/addNews',
				{
					data: _this.formData
				}, 
				(res) => {
					if(res.code == 0){
						uni.removeStorageSync('newsDraft');
						let msg = '';
						if(res.data == 0){
							msg = '发布成功';
						}else{
							msg = '提交成功,请等待平台审核';
						}
						_this.$refs.guiPage.openMessage('success',msg,true,1500);
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
	},
	components: {
		graceSelectImgAndUploadQiniu
	}
}
</script>
<style>
	@import url('../../static/css/li.css');
	.btnleft{background-color: #DEDEDE;width: 246rpx;height: 90rpx;border-radius: 45rpx;;}
	.btnright{width: 426rpx;height: 90rpx;border-radius: 45rpx;line-height: 90rpx}
	page{background-color: #F5F5F9;}
	.source{width:710rpx;margin-left:20rpx;margin-right:20rpx;}
	.form-label{height: 120rpx;line-height: 120rpx;overflow: hidden;}
	.mb30{margin-bottom:30rpx ;}
</style>
