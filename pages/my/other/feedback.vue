<template>
	<gui-page :isLoading="pageLoading" ref="guiPage">
		<view slot="gBody">
			<view v-if="data" class="gui-flex gui-column gui-align-items-center mt60">
				<gui-image :src="data.headimgurl+'?imageslim'" :width="100" :height="100" borderRadius="50rpx"></gui-image>
				<view class="mt10">{{data.nickname}}</view>
				<gui-image class="mt60" :src="data.kfQrcode+'?imageslim'" :width="322" :height="322"></gui-image>
				<view class="c33 f28 mt60">感谢您的反馈 </view>
				<view class="c33 f28 mt20">客服回复时间为工作日早9:00-晚7:00</view>
				<view @tap="openKf" class="btns f30 fb">联系客服</view>
			</view>
		</view>
	</gui-page>
</template>
<script>
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
		_this.getKf();
	},
	methods:{
		openKf: function(){
			let url = 'https://work.weixin.qq.com/kfid/kfc199ea6fade321232';
			// #ifdef APP-PLUS
			uni.navigateTo({
				url: `/pages/home/web?url=${encodeURIComponent(url)}`
			})
			// #endif
			// #ifdef H5
			window.location.href = url;
			// #endif
		},
		getKf: function(){
			let url = '';
			if(_this.type == 1){
				url = 'swoft/api/config/getKf';
			}else{
				url = 'swoft/api/config/getFwKf';
			}
			_this.pageLoading = true;
			uni.gRequest.post(
				url,
				{
					data: {}
				}, 
				(res) => {
					if(res.code == 0){
						_this.data = res.data;
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
	@import url('@/static/css/li.css');
	page{background-color: #F5F5F9}
	.mt60{margin-top: 60rpx;}
	.c33{color: #333333;}
	.btns{width:450rpx;height:90rpx;background: #ff4f00;border-radius: 45rpx;text-align: center;line-height: 90rpx;color: #fff;margin:60rpx auto;}
</style>
