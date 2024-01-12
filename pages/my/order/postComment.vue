<template>
	<gui-page :isLoading="pageLoading" ref="guiPage">
		<view slot="gBody">
			<form @submit="submit" class="fm">
				<view class="main">
					<gui-star fontSize="50rpx" padding="10rpx" @change="changeStar" activecolor="#FF4F00" :totalstars="5" :starnum="0"></gui-star>
					<textarea name="desc" @input="changeNum" placeholder-class="color999999" :auto-height="true" :maxlength="150" placeholder="宝贝满足您的期待吗？说说他的优点和美中不足之处吧！" class="desc"></textarea>
					<view class="color999999 fontNum gui-flex gui-justify-content-end gui-align-items-center">{{num}}/150</view>
					<view class="marginT">
						<graceSelectImgAndUploadQiniu :selectedimgs="selectedimgs" :maxFileNumber="4" ref="selectimgandupload" @uploaded="imgLoaded" @change="imgsChange" @uploaderror="uploaderror" itemsWidth="190rpx" btnImg="../../../static/images/setting/quanziuplods.png"></graceSelectImgAndUploadQiniu>
					</view>
				</view>
				<button formType="submit" class="postBtn gui-fixed-lb lb" hover-class="">发布</button>
			</form>
		</view>
	</gui-page>
</template>
<script>
	var graceChecker = require("@/GraceUI5/js/checker.js");
	import graceSelectImgAndUploadQiniu from "@/components/graceSelectImgAndUploadQiniu/graceSelectImgAndUploadQiniu.vue";
	var _this;
	export default {
		data() {
			return {
				pageLoading: false,
				num: 0,
				star: 0,
				selectedimgs: [],
				orderGoodsId: 0,
				orderId: 0,
				goodsId: 0,
				desc: ''
			}
		},
		onLoad: function(e){
			_this = this;
			_this.orderGoodsId = e.orderGoodsId;
			_this.goodsId = e.goodsId;
			_this.orderId = e.orderId;
		},
		methods: {
			changeStar: function(e){
				_this.star = e;
			},
			submit: function(e){
				var formData = e.detail.value;
				var rule = [
					{name: "desc", checkType: "notnull", checkRule: "", errorMsg: "评价内容不能为空"},
					{name: "desc", checkType: "string", checkRule: "5,150", errorMsg: "评价内容最少为5个字"},
				];
				if(_this.star == 0){
					_this.$refs.guiPage.openMessage('default','请选择评价星级',true,1500);
					return false;
				}
				var checkRes = graceChecker.check(formData, rule);
				if(!checkRes){
					_this.$refs.guiPage.openMessage('default',graceChecker.error,true,1500);
					return false;
				}
				_this.desc = formData.desc;
				if(_this.selectedimgs.length > 0){
					_this.$refs.selectimgandupload.upload();
				}else{
					var imglist = [];
					_this.postData(imglist);
				}
			},
			postData: function(imglist){
				_this.pageLoading = true;
				uni.gRequest.post(
					'swoft/api/order/addOrderComment',
					{
						data: {
							uid: uni.getStorageSync('userInfo').id,
							orderId: _this.orderId,
							orderGoodsId: _this.orderGoodsId,
							goodsId: _this.goodsId,
							desc: _this.desc,
							star: _this.star,
							imgpath: JSON.stringify(imglist)
						}
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
			changeNum: function(e){
				_this.num = e.detail.cursor;
			},
			imgsChange: function(imgs){
				_this.selectedimgs = imgs;
			},
			imgLoaded: function(res){
				_this.postData(res);
			},
			uploaderror: function(){
				_this.$refs.guiPage.openMessage('default','图片上传失败',true,1500);
				return false;
			},
			// 清空图片
			clearAllImgs: function(){
				_this.$refs.selectimgandupload.clearAllImgs();
			}
		},
		components: {
			graceSelectImgAndUploadQiniu
		}
	}
</script>
<style>
	page{background-color:#F8F8F8;}
	.lb{left:30rpx;bottom:30rpx;}
	.main{margin:20rpx 30rpx;padding:20rpx 30rpx 10rpx 30rpx;background-color:#FFFFFF;border-radius:10rpx;}
	.desc{width:100%;font-size:30rpx;min-height:150rpx;margin-top:20rpx;}
	.color999999{color:#999999;font-size:30rpx;}
	.fontNum{font-size:28rpx;margin-top:10rpx;}
	.camera{width:180rpx;margin-top:60rpx;}
	.imgli{width:180rpx;height:180rpx;}
	.imgli image{width:100%;height:100%;border-radius:10rpx;}
	.marginT{margin-top:90rpx;}
	.postBtn{width:690rpx;height:90rpx;margin-top:60rpx;font-size:30rpx;line-height:90rpx;padding:0;border-radius:46rpx;background-color:#FF4F00;color:#FFFFFF;border:none!important;}
</style>