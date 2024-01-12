<template>
	<gui-page :isLoading="pageLoading" ref="guiPage">
		<view slot="gBody" class="source">
			<view class="mt30">
				<form @submit="submit">
					<view class="gui-flex gui-wrap">
						<graceSelectImgAndUploadQiniu :selectedimgs="selectedimgs" :maxFileNumber="9" ref="selectimgandupload" @uploaded="imgLoaded" @change="imgsChange" @uploaderror="uploaderror" itemsWidth="210rpx" btnImg="../../../static/images/setting/quanziuplods.png"></graceSelectImgAndUploadQiniu>
					</view>
					<view class="gui-form-item gui-relative borderBottom mt30">
						<input type="text" class="wp100 h90 f28" name="title" placeholder="请输入商品标题" />
					</view>
					<view class="gui-form-item gui-relative borderBottom">
						<input type="number" class="wp100 h90 f28" name="rePrice" placeholder="产品成本价" />
					</view>
					<view class="gui-form-item gui-relative borderBottom">
						<input type="number" class="wp100 h90 f28" name="price" placeholder="市场零售价" />
					</view>
					<textarea class="f28 pt20 pb20" name="desc" placeholder="请对产品尽可能详细描述" style="width:690rpx;"></textarea>
					<view class="gui-form-item gui-relative borderBottom borderTop h90">
						<input type="number" :maxlength="11" class="wp100 h90 f28" name="tel" placeholder="请输入您的联系电话" />
					</view>
					<view class="gui-form-item gui-relative borderBottom h90">
						<input type="text" class="wp100 h90 f28" name="wx" placeholder="请输入您的微信号" />
					</view>
					<view class="gui-form-item h90 gui-flex gui-align-items-center gui-justify-content-end mt20">
						<view class="f28 c999999 mr20">是否允许退货</view>
						<switch :checked="false" name="isCanReturn" @change="switchChange" color="#FF4F00" />
					</view>
					<view style="height:150rpx;"></view>
					<view class="wp100 ptb20 mt20 gui-fixed-rb bgFFFFFF">
						<button form-type="submit" class="btns f30 fb" hover-class="">提交</button>
					</view>
				</form>
			</view>
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
			selectedimgs: [],
			formData: null,
		}
	},
	onLoad() {
		_this = this;
	},
	methods:{
		switchChange: function(e){
			
		},
		imgsChange: function(imgs){
			_this.selectedimgs = imgs;
		},
		imgLoaded: function(res){
			_this.submitGoods(res);
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
				{name: "title", checkType: "notnull", checkRule: "", errorMsg: "请输入商品标题"},
				{name: "rePrice", checkType: "notnull", checkRule: "", errorMsg: "请输入产品成本价"},
				{name: "price", checkType: "notnull", checkRule: "", errorMsg: "请输入零售价"},
				{name: "desc", checkType: "notnull", checkRule: "", errorMsg: "请输入商品描述"},
				{name: "desc", checkType: "string", checkRule: "5,", errorMsg: "描述内容不少于5个字"},
				{name: "tel", checkType: "notnull", checkRule: "", errorMsg: "请输入您的手机号"},
				{name: "tel", checkType: "phoneno", checkRule: "", errorMsg: "手机号格式不正确"},
				{name: "wx", checkType: "notnull", checkRule: "", errorMsg: "请输入您的微信号"},
			];
			var checkRes = graceChecker.check(formData, rule);
			if(!checkRes){
				_this.$refs.guiPage.openMessage('default',graceChecker.error,true,1500);
				return false;
			}
			_this.formData = formData;
			_this.$refs.selectimgandupload.upload();
		},
		submitGoods: function(imglist){
			_this.formData.imgpath = JSON.stringify(imglist);
			_this.formData.uid = uni.getStorageSync('userInfo').id;
			if(_this.formData.isCanReturn){
				_this.formData.isCanReturn = 1;
			}else{
				_this.formData.isCanReturn = 0;
			}
			_this.pageLoading = true;
			uni.gRequest.post(
				'swoft/api/user/addSupplyGoods',
				{
					data: _this.formData
				}, 
				(res) => {
					if(res.code == 0){
						_this.$refs.guiPage.openMessage('success','提交成功,请等待平台审核',true,1500);
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
	@import url('@/static/css/li.css');
	.source{width:690rpx;margin-left:30rpx;margin-right:30rpx;}
	.form-label{height: 120rpx;line-height: 120rpx;overflow: hidden;}
	.mb30{margin-bottom:30rpx;}
	.btns{width:690rpx;height:90rpx;background: #ff4f00;border-radius: 45rpx;text-align: center;line-height: 90rpx;color: #fff;margin:0 auto;}
</style>
