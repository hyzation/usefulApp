<template>
	<gui-page :isLoading="pageLoading" ref="guiPage">
		<view class="fixed-top-view" slot="gFixedTop">
			<view class="wp100 bgff ptb20 gui-relative borderTop fb">
				<gui-switch-navigation :items="items" :width="750"
				@change="navchange" textAlign="center" :isCenter="true" activeDirection="center" :size="250" 
				activeLineBg="linear-gradient(to right, #ED6A0C, #ED6A0C)" activeColor="#ED6A0C" color="#000000"
				activeLineHeight="4rpx" lineHeight="40rpx" activeLineWidth='30rpx' fontSize="30rpx" activeFontSize="30rpx" :activeFontWeight="400">
				</gui-switch-navigation>
			</view>
		</view>
		<view slot="gBody">
			<view style="height:84rpx;"></view>
			<view class="plr20 gui-flex gui-align-items-center gui-wrap gui-space-between">
				<navigator :url="'/pages/information/detail?id='+item.id" hover-class="" class="listitem mt20 bgff gui-relative gui-border-radius-large" v-for="(item,index) in productList" :key="index">
					<view @tap.stop="delNews(index,item.id)" v-if="navIndex > 0" class="delx gui-absolute-rt gui-flex gui-justify-content-center gui-align-items-center">
						<text class="gui-icons cF7142C">&#xe62a;</text>
					</view>{{item.status}}
					<!-- <gui-image :src="item.cover+'?imageslim'" :width="345" :height="345"></gui-image> -->
					<image :src="item.cover+'?imageslim'" mode="aspectFill" style="width:345rpx;height:345rpx;border-radius:20rpx 20rpx 0 0;"></image>
					<view class="f28 fw500 p20 line2" style="height:68rpx;line-height:34rpx;">{{item.title}}</view>
					<view class="p20 gui-flex gui-align-items-center gui-space-between">
						<view class="gui-flex gui-align-items-center ">
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
			<gui-empty v-if="isEmpty">
				<view slot="img" class="gui-flex gui-rows gui-justify-content-center">
					<image class="gui-empty-img" src="../../static/images/empty.png"></image>
				</view>
			</gui-empty>
			<gui-loadmore ref="loadmorecom"></gui-loadmore>
			<gui-modal ref="guimodal" :isCloseBtn="false" title="操作提示">
				<view slot="content" class="plt30tb40 gui-bg-gray">
					<view class="gui-text-center f30 fm">确定要删除该资讯吗？</view>
				</view>
				<view slot="btns" class="gui-flex gui-rows gui-space-around">
					<view class="modal-btns" @tap="$refs.guimodal.close()">
						<text class="c999999 fb">取消</text>
					</view>
					<view class="modal-btns" @tap="doRemove">
						<text class="cFF4F00 fb">确认</text>
					</view>
				</view>
			</gui-modal>
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
			productList: [],
			navIndex: 0,
			items: [{id:0,name:'待审核'},{id:1,name:'已通过'},{id:-2,name:'未通过'}],
			index: -1,
			id: -1
		}
	},
	onLoad: function(){
		_this = this;
		_this.reload();
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
		delNews: function(index,id){
			_this.index = index;
			_this.id = id;
			_this.$refs.guimodal.open();
		},
		doRemove: function(){
			_this.pageLoading = true;
			uni.gRequest.post(
				'swoft/api/news/delNews',
				{
					data: {
						id: _this.id,
						uid: uni.getStorageSync('userInfo').id
					}
				}, 
				(res) => {
					_this.$refs.guimodal.close();
					if(res.code == 0){
						// _this.productList.splice(_this.index, 1);
						_this.index = -1;
						_this.id = -1;
						_this.$refs.guiPage.openMessage('success','已删除',true,1500);
						setTimeout(function(){
							_this.reload();
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
				},
				true,
				true
			);
		},
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
				'/swoft/api/news/getMyNewsList',
				{
					data: {
						uid: uni.getStorageSync('userInfo').id,
						status: _this.items[_this.navIndex].id,
						page: 1,
						limit: 10
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
	@import url('../../static/css/li.css');
	page{background-color: #F5F5F9;}
	.c33{color: #333333;}
	.mb30{margin-bottom:20rpx}
	.h150{height: 150rpx;}
	.listitem{width: 344rpx;}
	.bgf5f5f9{background-color: #F5F5F9;}
	.min-h{min-height: 100vh;}
	.f36{font-size: 36rpx;}
	.w110{width: 100rpx;}
	.pb20{padding-bottom:20rpx;}
	.delx{top:0;right:0;width:60rpx;height:60rpx;background-color:rgba(0,0,0,0.5);border-radius:0 20rpx 0 20rpx;}
</style>	
