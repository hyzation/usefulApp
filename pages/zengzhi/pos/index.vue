<template>
	<gui-page :isLoading="pageLoading" ref="guiPage">
		<view slot="gBody" class="fm">
			<view v-if="bannerList.length > 0" class="m20">
				<gui-swiper :swiperItems="bannerList" :spacing="0" :width="714" :height="272" :indicatorActiveWidth="20" :indicatorBarHeight="30" :indicatorWidth="14" :indicatorHeight="6" indicatorColor="#E7E7E7" indicatorActiveColor="#ffffff"></gui-swiper>
			</view>
			<view class="m20 gui-flex gui-space-around mt40">
				<navigator url="/pages/zengzhi/pos/shop" hover-class="" class="gui-flex gui-wrap gui-justify-content-center w150">
					<view class="wh90 gui-flex gui-align-items-center gui-justify-content-center">
						<image src="../../../static/images/zengzhi/pos_1.png" mode="aspectFit"></image>
					</view>
					<view class="f26 wp100 gui-text-center mt10">机 具</view>
				</navigator>
				<navigator url="/pages/zengzhi/pos/myPos" hover-class="" class="gui-flex gui-wrap gui-justify-content-center w150">
					<view class="wh90 gui-flex gui-align-items-center gui-justify-content-center">
						<image src="../../../static/images/zengzhi/pos_2.png" mode="aspectFit"></image>
					</view>
					<view class="f26 wp100 gui-text-center mt10">终端</view>
				</navigator>
				<navigator url="/pages/zengzhi/pos/score" hover-class="" class="gui-flex gui-wrap gui-justify-content-center w150">
					<view class="wh90 gui-flex gui-align-items-center gui-justify-content-center">
						<image src="../../../static/images/zengzhi/pos_4.png" mode="aspectFit"></image>
					</view>
					<view class="f26 wp100 gui-text-center mt10">积分</view>
				</navigator>
			</view>
			<view class="m20 mt40 gui-flex gui-align-items-center">
				<view class="borderl"></view>
				<text class="f26">产品介绍</text>
			</view>
			<view class="m20"><jyf-parser :html="content" ref="article"></jyf-parser></view>
		</view>
	</gui-page>
</template>
<script>
var _this;
export default {
	data() { 
		return {
			pageLoading: false,
			bannerList: [],
			content: ''
		}
	},
	onLoad: function(){
		_this = this;
		_this.getBannerList();
		_this.getConfigField();
	},
	methods:{
		getConfigField: function(){
			_this.pageLoading = true;
			uni.gRequest.post(
				'swoft/api/config/getConfigField',
				{
					data: {
						field: 'posContent'
					}
				}, 
				(res) => {
					if(res.code == 0){
						_this.content = res.data;
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
		getBannerList: function(){
			uni.gRequest.post(
				'swoft/api/banner/getBannerList',
				{
					data: {
						type: 8
					}
				}, 
				(res) => {
					if(res.code == 0){
						_this.bannerList = [];
						res.data.forEach((item)=>{
							let li = {};
							li.img = item.path+'?imageslim';
							li.title = '';
							li.url = item.url;
							if(item.url != ''){
								li.opentype = 'navigate';
							}else{
								li.opentype = 'click';
							}
							_this.bannerList.push(li);
						});
					}else{
						_this.$refs.guiPage.openMessage('default',res.msg,true,1500);
					}
				},
				(error) => {
					_this.$refs.guiPage.openMessage('default','请求错误',true,1500);
				},
				(res) => {
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
	}
}
</script>
<style>
	page{background-color: #F5F5F9}
	.wh90{width:90rpx;height:90rpx;background-color:#FFFFFF;border-radius:20rpx;}
	.wh90 image{width:70%;height:70%;}
	.w150{width:150rpx;}
	.borderl{height:26rpx;border-left:thin solid #FF4F00;margin-right:14rpx;}
</style>
