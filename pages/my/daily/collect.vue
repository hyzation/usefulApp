<template>
	<gui-page :isLoading="pageLoading" ref="guiPage">
		<view class="fixed-top-view" slot="gFixedTop">
			<view class="wp100 bgff fb gui-flex gui-align-items-center" style="height:80rpx;">
				<gui-switch-navigation :items="items" :width="750"
				@change="navchange" textAlign="center" :isCenter="true" activeDirection="center" :size="375" 
				activeLineBg="linear-gradient(to right, #ED6A0C, #ED6A0C)" activeColor="#ED6A0C" color="#000000"
				:margin="0" padding="0rpx" :activeFontWeight="400" activeLineRadius="6rpx"
				activeLineHeight="6rpx" lineHeight="40rpx" activeLineWidth="40rpx" fontSize="28rpx" activeFontSize="28rpx">
				</gui-switch-navigation>
			</view>
		</view>
		<view slot="gBody">
			<view style="height:80rpx;"></view>
			<view class="plr20 gui-flex gui-align-items-center gui-wrap gui-space-between">
				<block v-for="(item,index) in productList" :key="index">
					<block v-if="navIndex == 0">
						<!-- 商品 -->
						<navigator :url="'/pages/home/goods?id='+item.goodsId" hover-class="" class="listitem mt20 bgff gui-relative gui-border-radius-large">
							<gui-image :src="item.coverPath+'?imageslim'" :width="345" :height="345" borderRadius="10rpx 10rpx 0rpx 0rpx"></gui-image>
							<view class="p20">
								<view class="f24 line2">{{item.title}}</view>
								<text class="f28 cff4f00">￥{{item.price}}</text>
								<text class="f28 c99 ml20 gui-line-through">￥{{item.rePrice}}</text>
							</view>
							<view class="p20 gui-absolute-rt">
								<view class="del bgff4f00 cff gui-text-center" @tap.stop="del(item,index)"><text class="gui-icons">&#xe794;</text></view>
							</view>
						</navigator>
					</block>
					<block v-else>
						<!-- 资讯 -->
						<navigator :url="'/pages/information/detail?id='+item.newsId" hover-class="" class="listitem mt20 bgff gui-relative gui-border-radius-large">
							<gui-image :src="item.cover+'?imageslim'" :width="345" :height="345" borderRadius="10rpx 10rpx 0rpx 0rpx"></gui-image>
							<view class="p20">
								<view class="f24 line2">{{item.title}}</view>
								<view class="gui-flex gui-align-items-center gui-space-between mt20">
									<view v-if="item.headimgurl" class="gui-flex gui-align-items-center">
										<gui-image :src="item.headimgurl+'?imageslim'" :width="40" :height="40" borderRadius="20rpx"></gui-image>
										<text class="f22 c99 ml10 gui-ellipsis" style="width:150rpx;">{{item.nickname}}</text>
									</view>
									<view v-else class="gui-flex gui-align-items-center">
										<gui-image src="../../../static/images/logo.png" :width="40" :height="40" borderRadius="20rpx"></gui-image>
										<text class="f22 c99 ml10 gui-ellipsis" style="width:150rpx;">有用官方</text>
									</view>
									<view class="gui-flex gui-align-items-center">
										<text class="gui-icons cff4f00 f32">&#xe605;</text>
										<text class="ml10 c99 f22">{{item.likeCount > 999 ? '999+' : item.likeCount}}</text>
									</view>
								</view>
							</view>
							<view class="p20 gui-absolute-rt">
								<view class="del bgff4f00 cff gui-text-center" @tap.stop="del(item,index)"><text class="gui-icons">&#xe794;</text></view>
							</view>
						</navigator>
					</block>
				</block>
			</view>
			<gui-empty v-if="isEmpty">
				<view slot="img" class="gui-flex gui-rows gui-justify-content-center">
					<image class="gui-empty-img" src="../../../static/images/empty.png"></image>
				</view>
			</gui-empty>
			<gui-loadmore ref="loadmorecom"></gui-loadmore>
			<gui-modal ref="guimodal" :isCloseBtn="false" title="操作提示">
				<view slot="content" class="plt30tb40 gui-bg-gray">
					<view class="gui-text-center f30 fm">确定要取消该收藏吗？</view>
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
			items: [{id:1,name:'商品'},{id:2,name:'资讯'}],
			item: null,
			collectIndex: -1
		}
	},
	onLoad: function(){
		_this = this;
	},
	onShow: function(){
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
				'/swoft/api/goods/getCollectList',
				{
					data: {
						uid: uni.getStorageSync('userInfo').id,
						type: _this.items[_this.navIndex].id,
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
		del: function(item,index){
			_this.item = item;
			_this.collectIndex = index;
			_this.$refs.guimodal.open();
		},
		doRemove: function(){
			_this.pageLoading = true;
			uni.gRequest.post(
				'swoft/api/goods/delCollect',
				{
					data: {
						linkId: _this.navIndex == 0 ? _this.item.goodsId : _this.item.newsId,
						type: _this.navIndex == 0 ? 1 : 2,
						uid: uni.getStorageSync('userInfo').id
					}
				}, 
				(res) => {
					if(res.code == 0){
						_this.$refs.guimodal.close();
						_this.$refs.guiPage.openMessage('success',res.msg,true,1500);
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
		}
	}
}
</script>
<style>
	@import url('@/static/css/li.css');
	page{background-color: #F5F5F9}
	.listitem{width: 344rpx;}
	.del{width: 46rpx;height:46rpx;border-radius: 23rpx;line-height: 46rpx;}
</style>
