<template>
	<gui-page ref="guiPage" :isLoading="pageLoading"
	:customHeader="true" statusBarStyle="background-color:#006220;" headerStyle="background-color:#006220;color:#ffffff;">
		<view slot="gHeader">
			<view class="gui-flex gui-nowrap gui-rows gui-align-items-center">
				<view @tap="navBack" class="gui-header-leader-btns" hover-class="gui-tap">
					<text class="gui-icons">&#xe600;</text>
				</view>
				<view class="gui-flex1 gui-text-center">
					<text class="f36 gui-ellipsis cff">康·生活 功能新农食</text>
				</view>
				<navigator url="/pages/shopcart/shopcart" open-type="switchTab" hover-class="" class="pr30 gui-relative">
					<view class="shopCartNum bgFF4F00 cFFFFFF fb f20" v-if="shopCardCount > 0">{{shopCardCount}}</view>
					<view class="img34 gui-flex gui-justify-content-center gui-align-items-center">
						<image src="../../static/images/box/icon5.png" mode="aspectFit"></image>
					</view>
					<view class="f18">购物车</view>
				</navigator>
			</view>
		</view>
		<view slot="gBody">
			<view v-if="bannerList.length > 0" class="plr20 bgFF pt20 pb10">
				<gui-swiper :swiperItems="bannerList" :spacing="0" :width="710" :height="272" :indicatorActiveWidth="20" :indicatorBarHeight="30" :indicatorWidth="14" :indicatorHeight="6" indicatorColor="#E7E7E7" indicatorActiveColor="#ffffff"></gui-swiper>
			</view>
			<view class="p20 bgFF">
				<gui-switch-navigation :items="navList" @change="navChange" keyStr="title" color="#000000"
					:currentIndex="navIndex" :width="710" lineHeight="46rpx" :size="0" padding="0" :margin="30" fontSize="28rpx" 
					activeDirection="center" activeColor="#006220" activeLineBg="linear-gradient(to right, #006220, #006220)" 
					activeLineHeight="8rpx" activeLineRadius="6rpx" activeFontSize="34rpx" :activeFontWeight="400" activeLineWidth="90%">
				</gui-switch-navigation>
			</view>
			<swiper id="list" :current="navIndex" @change="swiperChange" :style="{height:mainHeight+'px'}">
				<swiper-item v-for="(news, newsIndex) in newsAll" :key="newsIndex">
					<scroll-view :scroll-y="true"  
						:scroll-top="scrollTops[navIndex]" 
						:style="{height:mainHeight+'px'}" 
						@touchstart="touchstart" @touchmove="touchmove" @touchend="touchend"
						@scrolltolower="loadMore" @scroll="scroll">
						<!-- 刷新组件 -->
						<gui-refresh @reload="reload" ref="refreshcom"
						:refreshBgColor="['#FFFFFF','#FFFFFF','#FFFFFF','#006220']"
						:refreshColor="['rgba(69, 90, 100, 0.6)','rgba(69, 90, 100, 0.6)','#006220','#FFFFFF']"></gui-refresh>
						<!-- 数据展示区域 -->
						<view class="gui-flex gui-space-between gui-wrap plr20">
							<navigator :url="'/pages/home/goods?id='+item.id" hover-class="" v-for="(item,index) in newsAll[newsIndex]" :key="index" class="box2Li bgFF br10 mt20">
								<gui-image :src="item.coverPath+'?imageslim'" :width="345" :height="345" borderRadius="10rpx 10rpx 0rpx 0rpx"></gui-image>
								<view class="p20">
									<view class="f28 line2" style="height:68rpx;line-height:34rpx;">{{item.title}}</view>
									<view class="gui-flex gui-align-items-center gui-space-between mt20">
										<view>
											<view class="fm f28 cFF4F00">￥<text class="f34 mr10">{{item.price}}</text></view>
											<view class="fm f24 c999999"><text class="f26 mr10">权益积分：{{ item.equity_num }}</text></view>
											<view class="fm f24 c999999">￥<text class="f26 mr10 gui-line-through">{{item.rePrice}}</text></view>
										</view>
										<gui-image src="../../static/images/zheng/gwc.png" :width="46" :height="46"></gui-image>
									</view>
								</view>						
							</navigator>
						</view>
						<gui-empty v-if="isEmpty">
							<view slot="img" class="gui-flex gui-rows gui-justify-content-center margint-150">
								<image class="gui-empty-img" src="../../static/images/empty.png"></image>
							</view>
						</gui-empty>
						<!-- 加载组件 -->
						<gui-loadmore ref="loadmorecom"></gui-loadmore>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</gui-page>
</template>
<script>
var _this;
export default {
	data() {
		return {
			pageLoading: true,
			mainHeight: 200,
			scrollTops: [],
			// 列表保存数组
			newsAll: [],
			// 每个选项卡对应的总页数
			totalPages: [],
			//totalPage
			// 每个选项卡对应的分页
			pages: [],
			// 每个选项卡内部的滚动区域滚动值
			scrollTops: [],
			// 滚动延迟
			scrollTimer: null,
			// 加载更多延迟
			loadMoreTimer: null,
			// api 加载状态记录
			apiLoadStatus: [],
			bannerList: [],
			navList: [],
			navIndex: 0,
			shopCardCount: 0,
			isEmpty: false
		}
	},
	onLoad: function(){
		_this = this;
		_this.getBannerList();
		_this.getGoodsCategoryList(1);
		_this.getShopCardNum();
	},
	onReady: function(){
		setTimeout(function(){
			uni.gJS.select('#list', (res)=>{
				_this.mainHeight = uni.gJS.system().windowHeight - res.top;
			});
		},800);
	},
	onShow: function(){
		
	},
	watch:{
		navIndex: function(nVal,oldVal){
			if(_this.newsAll[nVal].length < 1){ 
				_this.getdata(); 
			}
		}
	},
	methods: {
		getShopCardNum: function(){
			uni.gRequest.post(
				'swoft/api/shopcart/getShopCardNum',
				{
					data: {
						uid: uni.getStorageSync('userInfo').id
					}
				}, 
				(res) => {
					if(res.code == 0){
						_this.shopCardCount = res.data;
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
		getBannerList: function(){
			uni.gRequest.post(
				'swoft/api/banner/getBannerList',
				{
					data: {
						type: 2
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
				(res) => {},
				true,
				true
			);
		},
		getGoodsCategoryList: function(e){
			uni.gRequest.post(
				'swoft/api/goodsCategory/getGoodsCategoryList',
				{
					data: {
						type: e
					}
				}, 
				(res) => {
					if(res.code == 0){
						res.data.unshift({id: 0,title: '全部'});
						_this.navList = res.data;
						for(let i=0;i<_this.navList.length;i++){
							_this.newsAll.push([]);
							_this.totalPages.push(0);
							_this.pages.push(1);
							_this.scrollTops.push(0);
							_this.apiLoadStatus.push(false);
						}
						_this.getdata();
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
		// 下拉刷新相关事件绑定
		touchstart: function(e){
			if(this.apiLoadStatus[this.navIndex]){return;}
			if(this.scrollTops[this.navIndex] > 0){return;}
			this.$refs.refreshcom[this.navIndex].touchstart(e);
		},
		touchmove: function(e){
			if(this.apiLoadStatus[this.navIndex]){return;}
			if(this.scrollTops[this.navIndex] > 0){return;}
			this.$refs.refreshcom[this.navIndex].touchmove(e);
		},
		touchend: function(e){
			if(this.apiLoadStatus[this.navIndex]){return;}
			if(this.scrollTops[this.navIndex] > 0){return;}
			this.$refs.refreshcom[this.navIndex].touchend(e);
		},
		// 刷新事件
		reload: function(){
			this.totalPages[this.navIndex] = 0;
			this.pages[this.navIndex] = 1;
			if(_this.$refs.loadmorecom[this.navIndex] != undefined){
				_this.$refs.loadmorecom[this.navIndex].stoploadmore();
			}
			this.getdata(1);
		},
		// 滚动区域滚动
		scroll: function(e){
			if(_this.scrollTimer != null){clearTimeout(_this.scrollTimer);}
			_this.scrollTimer = setTimeout(()=>{
				_this.scrollTops.splice(_this.navIndex,1,e.detail.scrollTop);
			},100);
		},
		loadMore: function(){
			var navIndex = _this.navIndex;
			if(_this.apiLoadStatus[navIndex]){
				return;
			}
			// 保证触底只执行一次加载
			if(_this.loadMoreTimer != null){clearTimeout(_this.loadMoreTimer);}
			_this.loadMoreTimer = setTimeout(() => {
				if(_this.$refs.loadmorecom[navIndex].loadMoreStatus != 0){
					return;
				}
				_this.$refs.loadmorecom[navIndex].loading();
				_this.getdata();
			},80);
		},
		getdata: function (isReload) {
			_this.pageLoading = true;
			let navIndex = _this.navIndex;
			_this.apiLoadStatus.splice(navIndex,1,true);
			let cateId = _this.navList[navIndex].id;
			let postData = {};
			postData.activityType = 0;
			postData.page = _this.pages[navIndex];
			postData.limit = 10;
			if(cateId == 0){
				postData.cateId = 1;
				postData.all = 1;
			}else{
				postData.cateId = cateId;
			}
			uni.gRequest.post(
				'swoft/api/goods/getGoodsList',
				{
					data: postData
				}, 
				(res) => {
					if(res.code == 0){
						if(res.data.count == 0){
							_this.isEmpty = true;
						}else{
							_this.isEmpty = false;
						}
						if(_this.pages[navIndex] == 1){
							_this.totalPages[navIndex] = res.data.count;
							_this.newsAll[navIndex] = [];
						}
						if(_this.totalPages[navIndex] == 0){
							_this.$refs.loadmorecom[navIndex].empty();							
						}else{
							_this.newsAll[navIndex] = _this.newsAll[navIndex].concat(res.data.data);
							if(_this.pages[navIndex] >= _this.totalPages[navIndex])
							{
								_this.$refs.loadmorecom[navIndex].nomore();
							}else{
								_this.$refs.loadmorecom[navIndex].stoploadmore();
								_this.pages[navIndex]++;
							}
						}
						if(isReload){
							_this.$refs.refreshcom[navIndex].endReload();
						}
						//结束
						_this.apiLoadStatus[navIndex] = false;
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
		navBack: function(){
			uni.navigateBack({
				delta:1
			})
		},
		navChange: function(index){
			if(index!=_this.navIndex){
				_this.navIndex = index;
				_this.isEmpty = false;
			}			
		},
		swiperChange: function(e){
			_this.navIndex = e.detail.current;
			_this.isEmpty = false;
		},
	}
}
</script>
<style>
	@import url('../../static/css/du.css');
	.gui-page-loading-color{background-color:#006220;}
	.gui-header-leader-btns{width:68rpx; line-height:60rpx; font-size:50rpx; text-align:center; margin-left: 10rpx;}	
	.img34{ width: 34rpx; height: 34rpx; margin: 0 auto;}
	.img34 image{width:100%;height:100%;}
	.box2Li{ width: 345rpx;}
	.box2Li .img{ width: 345rpx; height: 345rpx;}
	.box2Li .img image{width:100%;height:100%;}
	.shopCartNum{height:28rpx;line-height:28rpx;border-radius:15rpx;padding:0 9rpx;display:inline-block;position:absolute;top:-15rpx;left:35rpx;z-index:99;}
</style>