<template>
	<gui-page ref="guiPage" :isLoading="pageLoading">
		<view slot="gBody">
			<view v-if="bannerList.length > 0" class="plr20 ptb20">
				<gui-swiper :swiperItems="bannerList" :spacing="0" :width="710" :height="272" :indicatorActiveWidth="20" :indicatorBarHeight="30" :indicatorWidth="14" :indicatorHeight="6" indicatorColor="#E7E7E7" indicatorActiveColor="#ffffff"></gui-swiper>
			</view>
			<scroll-view id="list" :scroll-y="true"  
				:style="{height:mainHeight+'px'}" 
				@scrolltolower="loadMore">
				<!-- 刷新组件 -->
				<gui-refresh @reload="reload" ref="refreshcom"
				:refreshBgColor="['#FFFFFF','#FFFFFF','#FFFFFF','#FF4F00']"
				:refreshColor="['rgba(69, 90, 100, 0.6)','rgba(69, 90, 100, 0.6)','#FF4F00','#FFFFFF']"></gui-refresh>
				<!-- 数据展示区域 -->
				<view class="gui-flex gui-space-between gui-wrap plr20">
					<navigator :url="'/pages/home/goods?id='+item.id" hover-class="" v-for="(item,index) in productList" :key="index" class="box2Li bgFF br10 mt20">
						<gui-image :src="item.coverPath+'?imageslim'" :width="345" :height="345" borderRadius="10rpx 10rpx 0rpx 0rpx"></gui-image>
						<view class="p20">
							<view class="f28 line2" style="height:68rpx;line-height:34rpx;">{{item.title}}</view>
							<view class="gui-flex gui-align-items-center gui-space-between mt20">
								<view>
									<view class="fm f28 cFF4F00">￥<text class="f34 mr10">{{item.price}}</text></view>
									<view class="fm f24 c999999">￥<text class="f26 mr10 gui-line-through">{{item.rePrice}}</text></view>
								</view>
								<gui-image src="../../static/images/zheng/gwc.png" :width="46" :height="46"></gui-image>
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
			</scroll-view>
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
			mainHeight: 200,
			bannerList: [],
			type: 0
		}
	},
	onLoad: function(e){
		_this = this;
		_this.type = e.type;
		if(e.type == 1){
			uni.setNavigationBarTitle({
				title: '0元购'
			})
			_this.getBannerList(6);
		}else{
			uni.setNavigationBarTitle({
				title: '9.9包邮'
			})
			_this.getBannerList(7);
		}
		_this.reload();
	},
	onReady() {
		
	},
	onShow: function(){
		
	},
	methods: {
		getBannerList: function(e){
			uni.gRequest.post(
				'swoft/api/banner/getBannerList',
				{
					data: {
						type: e
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
						setTimeout(function(){
							uni.gJS.select('#list', (res)=>{
								_this.mainHeight = uni.gJS.system().windowHeight - res.top;
							});
						},500);
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
		reload: function(){
			_this.pageLoading = true;
			_this.productList = [];
			page = 1;
			if(_this.$refs.loadmorecom != undefined){
				_this.$refs.loadmorecom.stoploadmore();
			}
			_this.getdata();
		},
		loadMore: function(){
			if(_this.apiLoadingStatus){ return; }
			if(_this.loadMoreTimer != null){clearTimeout(_this.loadMoreTimer);}
			_this.loadMoreTimer = setTimeout(() => {
				if(_this.$refs.loadmorecom.loadMoreStatus != 0){ return ;}
				_this.$refs.loadmorecom.loading();
				_this.getdata();
			},80);
		},
		getdata: function(isReload){
			//加载数据
			_this.apiLoadingStatus = true;
			_this.pageLoading = true;
			uni.gRequest.post(
				'swoft/api/goods/getGoodsList',
				{
					data: {
						activityType: _this.type,
						all: 1,
						page: page,
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
	@import url('../../static/css/du.css');
	.img34{ width: 34rpx; height: 34rpx; margin: 0 auto;}
	.img34 image{width:100%;height:100%;}
	.box2Li{ width: 345rpx;}
	.box2Li .img{ width: 345rpx; height: 345rpx;}
	.box2Li .img image{width:100%;height:100%;}
</style>