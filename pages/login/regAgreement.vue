<template>
	<gui-page :isLoading="pageLoading" ref="guiPage">
		<view slot="gBody">
			<view class="p30"><jyf-parser :html="data" ref="article"></jyf-parser></view>
			<!--  #ifdef  APP-PLUS -->
			<view class="downLoadBtn gui-flex gui-align-items-center" @tap="downLoad">
				<gui-image src="../../static/images/setting/downLoad.png" :width="40" :height="40" :timer="0" mode="aspectFit"></gui-image>
				<text class="ml10">下载</text>
			</view>
			<!--  #endif -->
		</view>
	</gui-page>
</template>
<script>
	import jyfParser from "@/components/jyf-parser/jyf-parser";
	var _this;
	export default {
		data() {
			return { 
				pageLoading: false,
				data: null,
				type: 1
			}
		},
		onLoad: function(e){
			_this = this;
			if(e.type){
				_this.type = e.type;
			}
			if(_this.type == 1){
				uni.setNavigationBarTitle({
					title: '用户注册协议'
				});
			}else{
				uni.setNavigationBarTitle({
					title: '隐私协议'
				});
			}
			_this.getRegAgreement();
		},
		methods: {
			// #ifdef  APP-PLUS
			downLoad() {
				let url = '';
				if(_this.type == 1){
					url = 'https://useful.youyong.org.cn/download/有用APP用户注册协议.docx';
				}else{
					url = 'https://useful.youyong.org.cn/download/有用APP隐私协议.docx';
				}
				uni.downloadFile({
					url: url,
					success(res) {
						if(res.statusCode === 200){
							uni.saveFile({
								tempFilePath: res.tempFilePath,
								success(res2) {
									_this.$refs.guiPage.openMessage('success','下载成功',true,1500);
									console.log(res2);
									setTimeout(() => {
										uni.openDocument({
											filePath: res2.savedFilePath,
											success(res3) {}
										});
									},1500);
								}
							});
						}else{
							_this.$refs.guiPage.openMessage('default','下载失败',true,1500);
						}
					}
				});
			},
			// #endif
			getRegAgreement: function(){
				_this.pageLoading = true;
				uni.gRequest.post(
					'swoft/api/config/getRegAgreement',
					{
						data: {
							type: _this.type
						}
					}, 
					(res) => {
						_this.data = res.data;
					},
					(error) => {
						uni.gJS.msg('请求错误');
					},
					(res) => {
						_this.pageLoading = false;
					},
					true
				);
			}
		},
		components: {
			jyfParser
		}
	}
</script>
<style>
	.downLoadBtn{padding:0 20rpx;height:60rpx;line-height:60rpx;border-radius:10rpx;color:#FFFFFF;font-size:26rpx;background-color:#FF4F00;position:fixed;right:30rpx;bottom:120rpx;}
</style>