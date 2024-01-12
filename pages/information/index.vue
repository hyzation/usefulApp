<template>
	<gui-page :isLoading="pageLoading" :customHeader="true" :class="navIndex == 2 ? 'bgf5f5f9' : ''" ref="guiPage">
		<view slot="gHeader">
			<view class="gui-flex gui-nowrap gui-rows gui-align-items-center plr20">
				<view class="gui-header-leader-btns w110" hover-class="gui-tap">
					<text class="gui-icons fb f36"></text>
				</view>
				<view class="gui-flex1 gui-text-center">
					<text class="f36 gui-ellipsis c000000">资讯</text>
				</view>
				<navigator url="/pages/information/myfabu" class="w110" hover-class="">
					<view class="f24 fb" v-if="navIndex == 2">我的发布</view>
				</navigator>
			</view>
		</view>
		<view style="height:90rpx;" class="bgff fixed-top-view gui-flex gui-align-items-center" :class="navIndex == 2 ? '' : 'gui-relative borderBottom'" slot="gFixedTop">
			<view class="wp100">
				<gui-switch-navigation class="fb" :items="newTitleList" :width="750"
				@change="navchange" textAlign="center" :isCenter="true" activeDirection="center" :size="250" 
				activeLineBg="linear-gradient(to right, #ED6A0C, #ED6A0C)" activeColor="#ED6A0C" color="#000000"
				activeLineHeight="4rpx" lineHeight="40rpx" activeLineWidth='34rpx' fontSize="30rpx" activeFontSize="30rpx" :activeFontWeight="400">
				</gui-switch-navigation>
			</view>
		</view>
		<view slot="gBody">
			<navigator url="/pages/information/fabu" v-if="navIndex == 2" class="gui-fixed-rb" hover-class="" style="right:20rpx;bottom:105rpx;">
				<gui-image src="../../static/images/setting/fabu.png" :width="110" :height="110"></gui-image>
			</navigator>
			<view style="height:90rpx;"></view>
			<!-- 有用生活/官方资讯 -->
			<view class="news plr20" v-if="navIndex != 2">
				<block v-for="(item,index) in productList" :key="index">
					<navigator :url="'/pages/information/detail?id='+item.id" hover-class="" class="itemlist gui-flex gui-align-items-center pl20" :class="[index == 0 ? '' : 'gui-relative borderTop']">
						<view class="gui-flex gui-column gui-space-between h150 mt20 mb30" style="width:540rpx;">
							<view class="f28 line2">{{item.title}}</view>
							<view class="gui-flex gui-align-items-center gui-space-between mr30">
								<view class="gui-flex gui-align-items-center" v-if="item.headimgurl">
									<gui-image :src="item.headimgurl+'?imageslim'" :width="48" :height="48" borderRadius="24rpx"></gui-image>
									<text class="f24 c99 ml10 gui-ellipsis" style="width:300rpx;">{{item.nickname}}</text>
								</view>
								<view class="gui-flex gui-align-items-center" v-else>
									<gui-image src="../../static/images/logo.png" :width="48" :height="48" borderRadius="24rpx"></gui-image>
									<text class="f24 c99 ml10 gui-ellipsis" style="width:300rpx;">有用官方</text>
								</view>
								<view class="gui-flex gui-align-items-center">
									<image src="../../static/images/setting/openeye.png" mode="aspectFit" style="width:26rpx;height:26rpx;"></image>
									<text class="ml10 c99 f22">{{item.views > 999 ? '999+' : item.views}}</text>
								</view>
							</view>
						</view>
						<!-- <gui-image :src="item.cover+'?imageslim'" :width="150" :height="150" borderRadius="15rpx"></gui-image> -->
						<image :src="item.cover+'?imageslim'" mode="aspectFill" style="width:150rpx;height:150rpx;border-radius:15rpx;"></image>
					</navigator>
				</block>
			</view>
			<!-- 我的圈子 -->
			<view class="mb30" v-else>
				<view class="plr20 gui-flex gui-align-items-center gui-wrap gui-space-between">
					<navigator :url="'/pages/information/detail?id='+item.id" hover-class="" class="listitem mt20 bgff gui-relative gui-border-radius-large" v-for="(item,index) in productList" :key="index">
						<!-- <gui-image :src="item.cover+'?imageslim'" :width="345" :height="345" borderRadius="10rpx 10rpx 0 0"></gui-image> -->
						<image :src="item.cover+'?imageslim'" mode="aspectFill" style="width:345rpx;height:345rpx;border-radius:20rpx 20rpx 0 0;"></image>
						<view class="f28 fw500 p20 line2" style="height:68rpx;line-height:34rpx;">{{item.title}}</view>
						<view class="p20 gui-flex gui-align-items-center gui-space-between">
							<view class="gui-flex gui-align-items-center">
								<gui-image :src="item.headimgurl+'?imageslim'" :width="40" :height="40" borderRadius="20rpx"></gui-image>
								<text class="f22 c99 ml10 gui-ellipsis" style="width:150rpx;">{{item.nickname}}</text>
							</view>
							<view class="gui-flex gui-align-items-center">
								<text class="gui-icons cff4f00 f32">&#xe605;</text>
								<text class="ml10 c99 f22">{{item.likeCount > 999 ? '999+' : item.likeCount}}</text>
							</view>
						</view>
					</navigator>
				</view>
			</view>
			<gui-empty v-if="isEmpty">
				<view slot="img" class="gui-flex gui-rows gui-justify-content-center">
					<image class="gui-empty-img" src="../../static/images/empty.png"></image>
				</view>
			</gui-empty>
			<gui-loadmore ref="loadmorecom"></gui-loadmore>
		</view>
	</gui-page>
</template>
<script>
var page = 1;
var totalPage = 0;
var _this;	
export default {
	data() { 
		return {
			pageLoading: false,
			apiLoadingStatus: false,
			loadMoreTimer: null,
			isEmpty: false,
			navIndex: 0,
			productList: [],
			newTitleList: []
		}
	},
	onLoad() {
		_this = this;
		_this.getNewTitle();
		_this.reload();
	},
	onShow() {
		
	},
	onPullDownRefresh: function(){
		_this.reload();
		_this.getNewTitle();
		setTimeout(function(){
			uni.stopPullDownRefresh();
		},1500);
	},
	onReachBottom: function(){
		if(_this.apiLoadingStatus){ return; }
		if(_this.loadMoreTimer != null){clearTimeout(_this.loadMoreTimer);}
		_this.loadMoreTimer = setTimeout(() => {
			if(_this.$refs.loadmorecom.loadMoreStatus != 0){ return ;}
			_this.$refs.loadmorecom.loading();
			_this.getdata();
		},80);
	},
	methods:{
		navchange: function(index){
			if(_this.navIndex != index){
				_this.navIndex = index;
				_this.reload();
			}
		},
		reload: function(){
			_this.pageLoading = true;
			_this.productList = [];
			page = 1;
			if(_this.$refs.loadmorecom != undefined){
				_this.$refs.loadmorecom.stoploadmore();
			}
			_this.getdata();
		},
		getdata: function(isReload){
			//加载数据
			_this.apiLoadingStatus = true;
			_this.pageLoading = true;
			uni.gRequest.post(
				'swoft/api/news/getNewsList',
				{
					data: {
						type: _this.navIndex + 1,
						uid: uni.getStorageSync('userInfo').id,
						page: page,
						limit: 20
					}
				}, 
				(res) => {
					if(res.code == 0){
						if(page == 1){
							totalPage = res.data.count;
						}
						if(totalPage==0)
						{
							_this.isEmpty = true;
							_this.$refs.loadmorecom.empty();							
						}else{
							_this.isEmpty = false;
							_this.productList = _this.productList.concat(res.data.data);
							if(page >= totalPage)
							{
								_this.$refs.loadmorecom.nomore();
							}else{
								_this.$refs.loadmorecom.stoploadmore();
								page++;
							}
						}
					}else{
						_this.$refs.guiPage.openMessage('default',res.msg,true,1500);
					}
					_this.apiLoadingStatus = false;
					_this.pageLoading = false;
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
		getNewTitle: function(){
			uni.gRequest.post(
				'swoft/api/config/getNewTitle',
				{
					data: {}
				}, 
				(res) => {
					if(res.code == 0){
						_this.newTitleList = [
							{id: 0, name: res.data.newTitle1},
							{id: 1, name: res.data.newTitle2},
							{id: 2, name: res.data.newTitle3}
						];
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
	@import url('../../static/css/li.css');
	.c33{color: #333333;}
	.mb30{margin-bottom:20rpx}
	.h150{height: 150rpx;}
	.listitem{width: 344rpx;}
	.bgf5f5f9{background-color: #F5F5F9;}
	.min-h{min-height: 100vh;}
	.f36{font-size: 36rpx;}
	.w110{width: 100rpx;}
	.pb20{padding-bottom:20rpx ;}
</style>	
