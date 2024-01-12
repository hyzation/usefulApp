<template>
	<gui-page :isLoading="pageLoading" ref="guiPage">
		<view slot="gBody">
			<view class="wp100 gui-fixed-lt gui-border-box plr20 pt10 bgFF topFixed">
				<gui-search height="73rpx" placeholder="搜索" placeholderClass="c99" background="#F7F7F7" iconColor="#999999"
				@clear="clearSearch" @confirm="confirmSearch"></gui-search>
				<view class="pt20 pb15 fb">
					<gui-switch-navigation :items="navList" @change="changeNav" keyStr="title" color="#000000"
						:currentIndex="navIndex" textAlign="center" :isCenter="true" activeDirection="center" 
						activeLineBg="linear-gradient(to right, #ED6A0C, #ED6A0C)" activeLineHeight="2rpx" :activeFontWeight="400"
						activeColor="#ED6A0C" activeLineRadius="6rpx" activeFontSize="30rpx"
						activeLineWidth="14%" :size="355" padding="0rpx" :margin="0" :width="750" lineHeight="40rpx" fontSize="30rpx">
					</gui-switch-navigation>
				</view>
			</view>
			<view style="height:162rpx;"></view>
			<view class="plr20">
				<view v-if="navIndex == 1" class="gui-flex gui-space-between gui-wrap mb20">
					<navigator :url="'/pages/information/detail?id='+item.id" hover-class="" v-for="(item,index) in productList" :key="index" class="box2Li bgFF br10 mt20">
						<!-- <gui-image :src="item.cover+'?imageslim'" :width="345" :height="345" borderRadius="10rpx 10rpx 0rpx 0rpx"></gui-image> -->
						<image :src="item.cover+'?imageslim'" mode="aspectFill" style="width:345rpx;height:345rpx;border-radius:20rpx 20rpx 0 0;"></image>
						<view class="p20">
							<view class="f28 line2" style="height:68rpx;line-height:34rpx;">{{item.title}}</view>
							<view class="mt30 pb10 gui-flex gui-space-between gui-align-items-center">
								<view v-if="item.headimgurl" class="gui-flex gui-align-items-center">
									<view class="img40 gui-flex gui-justify-content-center gui-align-items-center">
										<image :src="item.headimgurl+'?imageslim'" mode="widthFix"></image>
									</view>
									<view style="width:150rpx;" class="f22 c333333 ml10 gui-ellipsis">{{item.nickname}}</view>
								</view>
								<view v-else class="gui-flex gui-align-items-center">
									<view class="img40 gui-flex gui-justify-content-center gui-align-items-center">
										<image src="../../static/images/logo.png" mode="widthFix"></image>
									</view>
									<view style="width:150rpx;" class="f22 c333333 ml10 gui-ellipsis">有用官方</view>
								</view>
								<view class="gui-flex gui-space-between gui-align-items-center">
									<text class="cFF4F00 gui-icons f60">&#xe605;</text>
									<text class="f22 c99 ml10">{{item.likeCount > 999 ? '999+' : item.likeCount}}</text>
								</view>
							</view>
						</view>						
					</navigator>
				</view>
				<view v-else class="gui-flex gui-space-between gui-wrap mb20">
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
			</view>
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
			navList: [
				{status:0, title:'商品'},
				{status:1, title:'资讯'}
			],
			navIndex: 0,
			keywords: '',
			productList: []
		}
	},
	onLoad: function(){
		_this = this;
		_this.reload();
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
		confirmSearch: function (e) {
			_this.keywords = e;
			_this.reload();
		},
		clearSearch: function (e) {
			_this.keywords = '';
			_this.reload();
		},
		changeNav: function(index){
			if(index != _this.navIndex)
			{
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
			let url = '';
			let postData = {};
			if(_this.navIndex == 0){
				url = 'swoft/api/goods/getGoodsList';
				postData = {
					activityType: 0,
					search: _this.keywords,
					page: page,
					limit: 10
				}
			}else{
				url = 'swoft/api/news/getNewsList';
				postData = {
					search: _this.keywords,
					page: page,
					limit: 10
				}
			}
			_this.apiLoadingStatus = true;
			_this.pageLoading = true;
			uni.gRequest.post(
				url,
				{
					data: postData
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
	.box2Li{width:345rpx;}
	.box2Li .img{width:345rpx;height:345rpx;}
	.box2Li .img image{width:100%;height:100%;}
	.img40{width:40rpx;height:40rpx;}
	.img40 image{width:100%;height:100%;border-radius:50%;}
	/*  #ifdef  H5  */
	.topFixed{top:88rpx;}
	/*  #endif  */
	/*  #ifdef  APP-PLUS  */
	.topFixed{top:0rpx;}
	/*  #endif  */
</style>