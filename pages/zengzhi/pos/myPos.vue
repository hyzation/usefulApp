<template>
	<gui-page :isLoading="pageLoading" ref="guiPage">
		<!-- 页面主体 -->
		<view slot="gBody" class="fm">
			<view class="view6" style="background-color:#F8F8F8;">
				<view class="bgFFFFFF gui-relative borderTop fb gui-flex gui-align-items-center" style="padding:20rpx 0;">
					<gui-switch-navigation :items="navItems" @change="navchange" color="#000000" :currentIndex="currentIndex" 
					activeLineBg="linear-gradient(to right, #FF4F00, #FF4F00)"
					activeColor="#FF4F00" :isCenter="true" activeDirection="center" :activeFontWeight="400"
					activeLineWidth="70%" :size="0" padding="120rpx" :width="750"></gui-switch-navigation>
				</view>
				<view class="mt20 bgFFFFFF br10 pl20 pr20 gui-flex gui-align-items-center" style="height:170rpx;">
					<view style="overflow:hidden;" @tap="changeGoods(index)" v-for="(item,index) in goodsList" :key="index" class="gui-flex gui-wrap gui-justify-content-center">
						<view class="wh90 gui-flex gui-align-items-center gui-justify-content-center">
							<image :src="item.coverPath+'?imageslim'" mode="aspectFit"></image>
						</view>
						<view class="f26 wp100 gui-text-center mt10" :class="goodsIndex == index ? 'cFF4F00' : ''">{{item.title}}</view>
					</view>
				</view>
			</view>
			<view style="height:290rpx;"></view>
			<navigator :url="'/pages/zengzhi/pos/myPosDetail?id='+item.id" hover-class="" v-for="(item, index) in productList" :key="index" class="m20 p20 bgFFFFFF br10 gui-flex gui-align-items-center gui-space-around">
				<gui-image :src="item.coverPath+'?imageslim'" :width="180" :height="180"></gui-image>
				<view class="gui-flex gui-align-items-center gui-wrap" style="width:400rpx;">
					<view class="f34 fm">{{item.title}}</view>
					<view class="line mt20 gui-relative">
						<view class="lineDot"></view>
					</view>
					<view class="f24 fm mt20">{{item.desc}}</view>
					<view class="mt20 gui-flex gui-align-items-center wp100">
						<view class="gui-flex gui-align-items-end">
							<text class="fm f30 cFF4F00">SN：{{item.sn}}</text>
						</view>
					</view>
				</view>
				<text class="gui-icons c999999 f36">&#xe601;</text>
			</navigator>
			<gui-empty v-if="isEmpty">
				<view slot="img" class="gui-flex gui-rows gui-justify-content-center">
					<image class="gui-empty-img" src="../../../static/images/empty.png"></image>
				</view>
				<!-- <text slot="text" class="f28 gui-block-text gui-text-center gui-margin-top c999999">暂无数据</text> -->
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
				currentIndex: 0,
				status: 0,
				navItems: [
					{name: '未激活终端',status: 0},
					{name: '激活终端',status: 1},
				],
				productList: [],
				pageLoading: false,
				apiLoadingStatus: false,
				isEmpty: false,
				goodsList: [],
				goodsIndex: 0,
				posGoodsId: 0
			}
		},
		onLoad: function(e){
			_this = this;
			_this.getPosGoodsList();
		},
		onShow: function(){
			
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
		methods: {
			getPosGoodsList: function(){
				uni.gRequest.post(
					'swoft/api/pos/getPosGoodsList',
					{
						data: {
							page: 1,
							limit: 10
						}
					}, 
					(res) => {
						if(res.code == 0){
							_this.goodsList = res.data.data;
							if(_this.goodsList.length > 0){
								_this.posGoodsId = _this.goodsList[0].id;
								_this.reload();
							}
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
			navchange:function(index){
				if(_this.currentIndex != index){
					_this.currentIndex = index;
					_this.status = _this.navItems[index].status;
					_this.reload();
				}
			},
			changeGoods: function(e){
				if(_this.goodsIndex != e){
					_this.goodsIndex = e;
					_this.posGoodsId = _this.goodsList[e].id;
					_this.reload();
				}
			},
			/**
			 * 重新加载数据
			 */
			reload: function(){
				_this.pageLoading = true;
				_this.productList = [];
				page = 1;
				_this.getdata();
			},
			/**
			 * 加载数据
			 * @param {Object} isReload
			 */
			getdata: function(isReload){
				_this.apiLoadingStatus = true;
				uni.gRequest.post(
					'swoft/api/pos/getPosOrderGodosList',
					{
						data: {
							page: page,
							limit: 10,
							uid: uni.getStorageSync('userInfo').id,
							isActivate: _this.status,
							posGoodsId: _this.posGoodsId
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
						_this.apiLoadingStatus = false;
						_this.pageLoading = false;
					},
					true,
					true
				);
			}
		}
	}
</script>
<style>
	page{background-color:#F8F8F8;}
	/*  #ifdef  APP-PLUS  */
	.view6{position:fixed;top: 0; z-index: 1;height:100rpx;}
	/*  #endif  */
	/*  #ifdef  H5  */
	.view6{position:fixed;top:80rpx;z-index:1;height:100rpx;}
	/*  #endif  */
	.wh90{width:90rpx;height:90rpx;}
	.h100{height:100rpx;}
</style>