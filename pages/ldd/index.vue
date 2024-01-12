<template>
	<gui-page :isLoading="pageLoading" :customFooter="true" iphoneXButtomStyle="background:#FFFFFF;" :footerSets="{height:110, zIndex:100, bg:'none'}" ref="guiPage">
		<view slot="gFixedTop" class="p20 gui-border-box bgFFFFFF" id="top">
			<navigator url="/pages/ldd/goodsList?type=search" hover-class="" class="borFF4F00 borRadAll p3">
				<view class="bgFF borRadAll gui-flex gui-space-between gui-align-items-center">
					<view style="margin-left:25rpx;" class="gui-flex gui-align-items-center">
						<gui-image src="../../static/images/zheng/search.png" :width="30" :height="30"></gui-image>
						<view class="h30 gui-relative borderLeft" style="margin:0 12rpx;"></view>
						<text class="fm f28 c454545">搜索</text>
					</view>
					<button class="no-scale btnSize58 btnBg4 borRadAll" hover-class="">搜索</button>
				</view>					
			</navigator>
		</view>
		<view slot="gBody">
			<view style="height:106rpx;"></view>
			<view v-if="bannerList.length > 0" class="plr20 mt20">
				<gui-swiper :swiperItems="bannerList" :spacing="0" :width="710" :height="272" :indicatorActiveWidth="20" :indicatorBarHeight="30" :indicatorWidth="14" :indicatorHeight="6" indicatorColor="#E7E7E7" indicatorActiveColor="#ffffff"></gui-swiper>
			</view>
			<view class="bgFF plr20 pt20 br10 mlr20 mt20" v-if="list3.length > 0">
				<gui-progress-scrollview :width="680" progressPosition="center" :progressWidth="list3.length > 8 ? 100 : 0" progressBarBG="#FF4F00">
					<view v-for="(item, index) in list3Trans" :key="index" class="gui-scroll-x-items gui-flex gui-wrap" style="width:680rpx;">
						<navigator v-for="(item1, index1) in item" :key="index1" class="box4Li gui-flex gui-columns gui-align-items-center pt20 pb30" hover-class="none" :url="'/pages/ldd/goodsList?type=category&id='+item1.id+'&title='+item1.title">
							<view class="img gui-flex gui-justify-content-center gui-align-items-center">
								<image :src="item1.path+'?imageslim'" mode="aspectFit"></image>
							</view>					
							<view class="f26 mt20">{{item1.title}}</view>
						</navigator>
					</view>
				</gui-progress-scrollview>
				<view v-if="list3.length > 8" class="pt20 wp100"></view>
			</view>
			<view class="h90" v-if="isFixed"></view>
			<view id="orderBy" :class="isFixed ? 'topFixed' : ''" class="h90 gui-flex gui-align-items-center gui-space-around mt20 bgF9F9F9">
				<view class="gui-flex gui-align-items-center f28" @tap="changeOrder(0)">
					<text :class="orderBy == 0 ? 'cFF4F00' : 'c999999'">默认</text>
				</view>
				<view class="gui-flex gui-align-items-center f28" @tap="changeOrder(1)">
					<text :class="orderBy == 1 ? 'cFF4F00' : 'c999999'">价格</text>
					<text class="gui-icons f40" :class="orderBy == 1 ? 'cFF4F00' : 'c999'">&#xe647;</text>
				</view>
				<view class="gui-flex gui-align-items-center f28" @tap="changeOrder(2)">
					<text :class="orderBy == 2 ? 'cFF4F00' : 'c999999'">价格</text>
					<text class="gui-icons f40" :class="orderBy == 2 ? 'cFF4F00' : 'c999'">&#xe661;</text>
				</view>
				<view class="gui-flex gui-align-items-center f28" @tap="changeOrder(3)">
					<text :class="orderBy == 3 ? 'cFF4F00' : 'c999999'">推广值</text>
					<text class="gui-icons f40" :class="orderBy == 3 ? 'cFF4F00' : 'c999'">&#xe647;</text>
				</view>
				<view class="gui-flex gui-align-items-center f28" @tap="changeOrder(4)">
					<text :class="orderBy == 4 ? 'cFF4F00' : 'c999999'">推广值</text>
					<text class="gui-icons f40" :class="orderBy == 4 ? 'cFF4F00' : 'c999'">&#xe661;</text>
				</view>
			</view>
			<view class="gui-flex gui-space-between gui-wrap plr20">
				<navigator :url="'/pages/ldd/goods?id='+item.id" hover-class="" v-for="(item,index) in productList" :key="index" class="box2Li bgFF br10 mt20">
					<gui-image :src="item.cover_url" :width="345" :height="345" borderRadius="10rpx 10rpx 0rpx 0rpx"></gui-image>
					<view class="p20">
						<view class="f28 line2" style="height:68rpx;line-height:34rpx;">{{item.title}}</view>
						<view class="gui-flex gui-align-items-center gui-space-between mt20">
							<view>
								<view class="fm f28 cFF4F00">￥<text class="f34 mr10">{{item.usefulPrice}}</text></view>
								<view class="fm cDC261F" style="margin-top:-10rpx;"><text class="f24 mr10">绿色积分：{{ item.equity_num }}</text></view>
								<!-- <view class="fm cDC261F" style="margin-top:-10rpx;"><text class="f24 mr10">{{item.mValue}}推广值</text></view> -->
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
		</view>
		<view slot="gFooter" class="h110 bgFFFFFF gui-flex gui-align-items-center gui-space-around">
			<view class="footer">
				<view class="footerImg">
					<text class="gui-icons f40" :class="activePage == 'gameTab1' ? 'cFF4F00' : 'c999999'">&#xe63b;</text>
				</view>
				<view :class="'footerText '+[activePage == 'gameTab1' ? 'footerActive' : '']">商城</view>
			</view>
			<navigator url="/pages/ldd/shopcart" hover-class="" open-type="redirect" class="footer">
				<view class="footerImg">
					<text class="gui-icons f40" :class="activePage == 'gameTab2' ? 'cFF4F00' : 'c999999'">&#xe60a;</text>
				</view>
				<view :class="'footerText '+[activePage == 'gameTab2' ? 'footerActive' : '']">购物车</view>
			</navigator>
			<navigator url="/pages/ldd/address" hover-class="" open-type="redirect" class="footer">
				<view class="footerImg">
					<text class="gui-icons f40 gui-bold" :class="activePage == 'gameTab3' ? 'cFF4F00' : 'c999999'">&#xe63f;</text>
				</view>
				<view :class="'footerText '+[activePage == 'gameTab3' ? 'footerActive' : '']">收货地址</view>
			</navigator>
			<navigator url="/pages/ldd/order" hover-class="" open-type="redirect" class="footer">
				<view class="footerImg">
					<text class="gui-icons f40 gui-bold" :class="activePage == 'gameTab4' ? 'cFF4F00' : 'c999999'">&#xe62f;</text>
				</view>
				<view :class="'footerText '+[activePage == 'gameTab4' ? 'footerActive' : '']">订单</view>
			</navigator>
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
			bannerList: [],
			list3: [],
			activePage: 'gameTab1',
			apiLoadingStatus: false,
			loadMoreTimer: null,
			isEmpty: false,
			productList: [],
			orderBy: 0,
			scrollTop: 0,
			isFixed: false
		}
	},
	computed: {
		list3Trans: function () {
			let num = 8;
			let iconsArr = []; // 声明数组
			_this.list3.forEach((item, index) => {
				let page = Math.floor(index / num); // 计算该元素为第几个素组内
				if (!iconsArr[page]) {
				 // 判断是否存在
				 iconsArr[page] = [];
				}
				iconsArr[page].push(item);
			});
			return iconsArr;
		}
	},
	onLoad: function(){
		_this = this;
		_this.getBannerList();
		_this.getNavList();
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
	onShow: function(){

	},
	onReady: function(){
		setTimeout(function(){
			uni.gJS.select('#orderBy', (res)=>{
				// _this.scrollTop = res.top-uni.upx2px(106);
				uni.gJS.select('#top', (res2)=>{
					console.log(res2.height);
					_this.scrollTop = res.top-res2.height;
				});	
			});
		},800);
	},
	onPageScroll: function(e){
		if(e.scrollTop >= _this.scrollTop){
			_this.isFixed = true;
		}else{
			_this.isFixed = false;
		}
	},
	onPullDownRefresh: function(){
		_this.pageLoading = true;
		_this.getBannerList();
		_this.getNavList();
		setTimeout(function(){
			uni.stopPullDownRefresh();
		},1500);
	},
	methods: {
		changeOrder(e) {
			if(_this.orderBy != e){
				_this.orderBy = e;
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
				'swoft/api/ldd/getGoodsList',
				{
					data: {
						page: page,
						limit: 10,
						orderBy: _this.orderBy
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
		getBannerList: function(){
			uni.gRequest.post(
				'swoft/api/banner/getBannerList',
				{
					data: {
						type: 11
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
		getNavList: function(){
			uni.gRequest.post(
				'swoft/api/ldd/getCategoryList',
				{
					data: {}
				}, 
				(res) => {
					if(res.code == 0){
						_this.list3 = res.data;
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
		}
	}
}
</script>
<style>
	@import url('../../static/css/du.css');
	/* page{ background-image: linear-gradient(to right, #F9F9F9 , #F5F5F9);} */
	page{background:#F9F9F9;}
	.bgF9F9F9{background:#F9F9F9;}
	.bgBox4{background:#FFFFFF;}
	.borFF4F00{border: 1px solid #FF4F00;}
	.img34{ width: 34rpx; height: 34rpx;}
	.img34 image{width:100%;height:100%;}
	.img44{ width: 44rpx; height: 44rpx;}
	.img44 image{width:100%;height:100%;}
	.btnSize58{ font-size: 28rpx; line-height: 58rpx; padding-left: 30rpx; padding-right: 30rpx;}
	.img90{ width: 90rpx; height: 90rpx;}
	.img90 image{width:100%;height:100%;}
	.h74{ height: 74rpx;}
	.box2Li{ width: 345rpx;}
	.box2Li .img{ width: 345rpx; height: 345rpx;}
	.box2Li .img image{width:100%;height:100%;}
	.box2Li .img145{ width: 345rpx; height: 145rpx;}
	.box2Li .img145 image{width:100%;height:100%;}
	.box3Li{ width: 220rpx; margin-left: 25rpx;}
	.box3Li .img{ width: 220rpx; height: 130rpx;}
	.box3Li .img image{width:100%;height:100%;}
	.box3Li:nth-child(3n+1){ margin-left: 0;}
	.box4Li{ width: 150rpx; margin-left: 20rpx;}
	.box4Li .img{ width: 90rpx; height: 90rpx;}
	.box4Li .img image{width:100%;height:100%;}
	.box4Li:nth-child(4n+1){ margin-left: 0;}
	.line2{ height: 66rpx;}
	.navTab{width:100%;height:80rpx;}
	.couponBox{width:685rpx;height:826rpx;background:url(../../static/images/zheng/bg05.png) no-repeat;background-size:cover;margin:0 auto;}
	.couponBoxC{width:510rpx;height:520rpx;margin:130rpx auto 0 auto;}
	.couponBoxBtn{width:460rpx;height:80rpx;line-height:88rpx;text-align:center;margin:14rpx auto 0 auto;}
	.coupon{width:502rpx;height:150rpx;background:url(../../static/images/zheng/coupon.png) no-repeat;background-size:100% 100%;margin:0 auto;}
	.h20{height:20rpx;}
	.couponl{width:172rpx;height:172rpx;}
	.couponr{width:290rpx;height:172rpx;margin-right:10rpx;}
	.w280{width:280rpx;line-height:34rpx;}
	.lime-painter{position:fixed;left:2000rpx;}
	.h5Desc{text-align:center;font-size:28rpx;color:#FFFFFF;margin-top:100rpx;}
	.scoreBox{width:750rpx;height:1000rpx;background:url(../../static/images/score/bg.png) no-repeat;background-size:cover;}
	.scoreBoxBtn{margin:-300rpx auto 0 auto;width:300rpx;height:90rpx;background:url(../../static/images/score/btn.png) no-repeat;background-size:100% 100%;line-height:90rpx;text-align:center;}

	.footer{width:120rpx;height:90rpx;}
	.footerImg{width:60rpx;height:60rpx;margin:0 auto;text-align:center;line-height:60rpx;}
	.footerImg image{width:100%;height:100%;}
	.footerText{font-size:26rpx;font-family:fm;text-align:center;color:#999999;line-height:26rpx;}
	.footerActive{color:#FF4F00;}
	.h110{height:110rpx;}
	.ml6{margin-left:6rpx;}
	.c999{color:#999;}
	.h90{height:90rpx;}
	/*  #ifdef  H5  */
	.topFixed{position:fixed;left:0;top:174rpx;z-index:999;width:100%;}
	/*  #endif  */
	/*  #ifdef  APP-PLUS  */
	.topFixed{position:fixed;left:0;top:84rpx;z-index:999;width:100%;}
	/*  #endif  */
</style>