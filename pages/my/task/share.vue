<template>
	<gui-page :isLoading="pageLoading">
		<view slot="gBody">
			<view style="height:20rpx;background-color:#F5F6F8;"></view>
			<view v-for="(item,index) in productList" :key="index" class="gui-flex gui-align-items-center listItem plr20" :class="index != 0 ? 'gui-relative borderTop' : ''">
				<view class="no-scale">
					<block v-if="item.headUrl">
						<gui-image :src="item.headUrl" :width="80" :height="80" borderRadius="40rpx"></gui-image>
					</block>
					<block v-else>
						<gui-image :src="'/static/images/zheng/user'+item.gender+'.png'" :width="80" :height="80" borderRadius="40rpx"></gui-image>
					</block>
				</view>
				<view class="wp100">
					<view class="ml20 gui-flex gui-align-items-center">
						<view class="f26 fb">{{item.nickname != '' ? item.nickname : '未设置昵称'}}(ID:{{item.no}})</view>
						<view class="ml20 f22 tag1 bgF5D395 fw500">{{item.LevelTitle ? item.LevelTitle : 'V0'}}</view>
					</view>
					<view class="f22 ml20 mt20 gui-flex gui-align-items-end gui-space-between">
						<view class="c99 no-scale">{{item.created_at}}</view>
						<view class="">
							<text class="mlr20 fw500">分享值：{{item.TeamCount}}</text>
							<text class="mlr20 fw500">活跃值：{{item.totalMValue}}</text>
						</view>
					</view>
				</view>
			</view>
			<gui-empty v-if="isEmpty">
				<view slot="img" class="gui-flex gui-rows gui-justify-content-center">
					<image class="gui-empty-img" src="../../../static/images/empty.png"></image>
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
			productList: []
		}
	},
	onLoad: function(){
		_this = this;
		_this.reload();
		getApp().readMsgNum(13);
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
				'swoft/api/user/getUserTeamList',
				{
					data: {
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
		}
	}
}
</script>
<style>
	@import url('@/static/css/li.css');
	.listItem{height: 140rpx;}
</style>
