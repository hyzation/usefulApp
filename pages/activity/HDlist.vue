<template>
	<gui-page :isLoading="pageLoading" ref="guiPage" :customHeader="true" style="background: #F5F5F5;">
		<view slot="gHeader">
			<view class="gui-flex gui-nowrap gui-rows gui-align-items-center">
				<view @tap="navBack" class="gui-header-leader-btns" hover-class="gui-tap">
					<text class="gui-icons">&#xe600;</text>
				</view>
				<view class="gui-flex1 gui-text-center">
					<text class="f36 gui-ellipsis">商家活动</text>
				</view>
			</view>
		</view>
		<view slot="gBody">
			<view class="font-none">暂无活动</view>
		</view>
	</gui-page>
</template>
<script>
var _this;
export default {
	data() { 
		return {
			pageLoading: false,
			apiLoadingStatus: false,
			loadMoreTimer: null,
			userInfo: null,
			couponList: [4,1,2,3],
			mainHeight: 0,
			couponinfo: {},
		}
	},
	onLoad() {
		_this = this;
	},
	onShow() {
		_this.userInfo = uni.getStorageSync('userInfo');
		
	},
	onReady() {
		
	},
	methods:{
		navBack(){
			uni.gJS.back();
		},
	}
}
</script>
<style>
	@import url('@/static/css/li.css');
	.font-none{
		font-size: 14px;
		color: #ccc;
		text-align: center;
		padding-top: 250px;
	}
</style>
