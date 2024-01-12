<template>
	<gui-page :isLoading="pageLoading" ref='guiPage' :customHeader="true">
		<view slot="gHeader">
			<view class="gui-flex gui-nowrap gui-rows gui-align-items-center">
				<view @tap="navBack()" class="gui-header-leader-btns" hover-class="gui-tap">
					<text class="gui-icons">&#xe600;</text>
				</view>
				<view class="gui-flex1 gui-text-center">
					<text class="f36 gui-ellipsis">福利购</text>
				</view>
				<view class="pr30">
					<view class="f28" @click="$refs.msgModal.open();">规则</view>
				</view>
			</view>
		</view>
		<view slot="gBody">
			<view v-if="bannerList.length > 0" class="m20">
				<gui-swiper :swiperItems="bannerList" :spacing="0" :width="710" :height="272" :indicatorActiveWidth="20" :indicatorBarHeight="30" :indicatorWidth="14" :indicatorHeight="6" indicatorColor="#E7E7E7" indicatorActiveColor="#ffffff"></gui-swiper>
			</view>
			<scroll-view id="list" :scroll-y="true" :style="'height:'+mainHeight+'px;'" @scrolltolower="scrolltolower">
				<view class="gui-flex gui-space-between gui-wrap plr20">
					<navigator :url="'/pages/fuligou/goods?id='+item.id" hover-class="" v-for="(item,index) in productList" :key="index" class="box2Li bgFFFFFF br10" :class="index < 2 ? '' : 'mt20'">
						<gui-image :src="item.coverPath+'?imageslim'" :width="345" :height="345" borderRadius="10rpx 10rpx 0rpx 0rpx"></gui-image>
						<view class="p20">
							<view class="f28 line2" style="height:68rpx;line-height:34rpx;">{{item.title}}</view>
							<view class="gui-flex gui-align-items-center gui-space-between mt20">
								<view>
									<view class="fm f28 cFF4F00">￥<text class="f34 mr10">{{item.price}}</text></view>
								</view>
							</view>
						</view>							
					</navigator>
				</view>
				<gui-empty v-if="isEmpty">
					<view slot="img" class="gui-flex gui-rows gui-justify-content-center">
						<image class="gui-empty-img" src="@/static/images/empty.png"></image>
					</view>
				</gui-empty>
				<gui-loadmore ref="loadmorecom"></gui-loadmore>
			</scroll-view>
			<gui-modal ref="msgModal" :isTitle="false" :canCloseByShade="false" :isCloseBtn="false" closeBtnStyle="color:#000000; font-size:28rpx;" :zIndex="999" bodyStyle="" width="665rpx">
				<view slot="content">
					<view class="img52">
						<image class="img52" @tap="$refs.msgModal.close();" src="@/static/images/box/close.png" mode="widthFix"></image>
					</view>	
					<scroll-view :scroll-y="true" class="xztcScroll">
						<view class="xztc gui-flex gui-justify-content-center gui-align-items-start">
							<image mode="widthFix" :src="rulePathImg"></image>
						</view>
					</scroll-view>
			    </view>				
			</gui-modal>
			<navigator url="/pages/fuligou/order" class="fBtn1 gui-flex gui-justify-content-center gui-wrap gui-fixed-rb" hover-class="none">
				<gui-image src="../../static/images/score/f1.png" :width="100"></gui-image>
				<view class="f28 cFF4F00 wp100 gui-text-center mt10">我的福利购</view>
			</navigator>
			<navigator url="/pages/my/score/index" class="fBtn2 gui-flex gui-justify-content-center gui-wrap gui-fixed-rb" hover-class="none">
				<gui-image src="../../static/images/score/f2.png" :width="100"></gui-image>
				<view class="f28 cFF4F00 wp100 gui-text-center mt10">积分钱包</view>
			</navigator>
			<gui-popup ref="guipopupScore" bgColor="rgba(0,0,0,0.5)" :zIndex="99" width="750rpx">
				<view class="scoreBox"></view>
				<view class="scoreBoxBtn f40 fb cDD281F" @tap="getTodayScore">立即领取</view>
				<view @tap="$refs.guipopupScore.close()" class="gui-flex gui-align-items-center gui-justify-content-center mt80"><gui-image src="../../static/images/score/close.png" :timer="0" :width="60" :height="60"></gui-image></view>
			</gui-popup>
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
			mainHeight: 0,
			rulePathImg: '',
			bannerList: []
		}
	},
	onLoad() {
		_this = this;
		_this.reload();
		_this.getPicConfigField('flgRule');
		_this.getBannerList();
		_this.getTodayUnpacking();
	},
	onShow() {
		
	},
	onReady() {
		
	},
	methods:{
		getTodayUnpacking() {
			uni.gRequest.post(
				'swoft/api/fuligou/getTodayUnpacking',
				{
					data: {
						uid: uni.getStorageSync('userInfo').id
					}
				}, 
				(res) => {
					if(res.code == 0){
						if(res.data > 0){
							_this.$refs.guipopupScore.open();
						}
					}
				},
				(error) => {},
				(res) => {},
				true,
				true
			);
		},
		getTodayScore() {
			_this.$refs.guipopupScore.close();
			uni.navigateTo({
				url: '/pages/fuligou/order'
			});
		},
		getBannerList: function(){
			uni.gRequest.post(
				'swoft/api/banner/getBannerList',
				{
					data: {
						type: 10
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
						// _this.$refs.guiPage.openMessage('default',res.msg,true,1500);
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
		getPicConfigField: function(e){
			uni.gRequest.post(
				'swoft/api/config/getPicConfigField',
				{
					data: {
						field: e
					}
				}, 
				(res) => {
					if(res.code == 0){
						_this.rulePathImg = res.data.path;
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
		scrolltolower: function(){
			if(_this.apiLoadingStatus){ return; }
			if(_this.loadMoreTimer != null){clearTimeout(_this.loadMoreTimer);}
			_this.loadMoreTimer = setTimeout(() => {
				if(_this.$refs.loadmorecom.loadMoreStatus != 0){ return ;}
				_this.$refs.loadmorecom.loading();
				_this.getdata();
			},80);
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
				'swoft/api/fuligou/getGoodsList',
				{
					data: {
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
		},
		navBack() {
			uni.gJS.back();
		}
	}
}
</script>
<style>
	page{background-color:#F5F5F9;}
	.gui-header-leader-btns{width:68rpx; line-height:60rpx; font-size:50rpx; text-align:center; margin-left: 10rpx;}
	.img52{ width: 52rpx; height: 52rpx; margin: 0 auto;}
	.box2Li{width:345rpx;}
	.box2Li .img{width:345rpx;height:345rpx;}
	.box2Li .img image{width:100%;height:100%;}
	.fBtn1{bottom:360rpx;right:30rpx;width:150rpx;}
	.fBtn2{bottom:150rpx;right:30rpx;width:150rpx;}
	.scoreBox{width:750rpx;height:1000rpx;background:url(../../static/images/score/bg.png) no-repeat;background-size:cover;}
	.scoreBoxBtn{margin:-300rpx auto 0 auto;width:300rpx;height:90rpx;background:url(../../static/images/score/btn.png) no-repeat;background-size:100% 100%;line-height:90rpx;text-align:center;}
</style>
