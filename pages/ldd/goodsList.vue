<template>
	<gui-page :isLoading="pageLoading" ref="guiPage">
		<view slot="gFixedTop" class="pl20 pr20 pb20 gui-border-box bgFFFFFF">
			<gui-search height="73rpx" placeholder="搜索" placeholderClass="c99" background="#F7F7F7" iconColor="#999999"
				@clear="clearSearch" @confirm="confirmSearch"></gui-search>
			<view id="orderBy" class="gui-flex gui-align-items-center gui-space-between mt20">
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
		</view>
		<view slot="gBody">
			<view style="height:140rpx;"></view>
			<view class="plr20">
				<view class="gui-flex gui-space-between gui-wrap mt20">
					<navigator :url="'/pages/ldd/goods?id='+item.id" hover-class="" v-for="(item,index) in productList" :key="index" class="box2Li bgFF br10 mt20">
						<gui-image :src="item.cover_url" :width="345" :height="345" borderRadius="10rpx 10rpx 0rpx 0rpx"></gui-image>
						<view class="p20">
							<view class="f28 line2" style="height:68rpx;line-height:34rpx;">{{item.title}}</view>
							<view class="gui-flex gui-align-items-center gui-space-between mt20">
								<view>
									<view class="fm f28 cFF4F00">￥<text class="f34 mr10">{{item.usefulPrice}}</text></view>
									<view class="fm cDC261F" style="margin-top:-10rpx;"><text class="f24 mr10">{{item.mValue}}推广值</text></view>
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
			keyWords: '',
			productList: [],
			cate_id: 0,
			orderBy: 0,
			scrollTop: 0,
			isFixed: false
		}
	},
	onLoad: function(e){
		_this = this;
		if(e.type == 'search'){
			uni.setNavigationBarTitle({
				title: '搜索'
			});
		}else{
			_this.cate_id = e.id;
			uni.setNavigationBarTitle({
				title: e.title
			});
		}
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
		changeOrder(e) {
			if(_this.orderBy != e){
				_this.orderBy = e;
				_this.reload();
			}
		},
		confirmSearch: function (e) {
			_this.keyWords = e.replace(/(^\s*)|(\s*$)/g, "");
			_this.reload();
		},
		clearSearch: function (e) {
			_this.keyWords = '';
			_this.reload();
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
						keyWords: _this.keyWords,
						cate_id: _this.cate_id,
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
	.ml6{margin-left:6rpx;}
	.c999{color:#999;}
</style>