<template>
	<gui-page :isLoading="pageLoading" ref="guiPage">
		<view slot="gBody">
			<view class="plr20">
				<block v-for="(item,index) in productList" :key='index'>
					<view class="mt20 bgff p20 gui-border-radius-large gui-flex gui-align-items-start gui-space-between">
						<gui-image :src="item.cover+'?imageslim'" class="no-scale" :width="160" :height="160" borderRadius="15rpx"></gui-image>
						<view class="pr20 gui-flex gui-column gui-space-between" style="width:480rpx;">
							<view class="f28 fb mt10 gui-ellipsis">{{item.title}}</view>
							<view class="f24 c999999 fm mt10 line2" style="height:60rpx;line-height:30rpx;">{{item.desc}}</view>
							<view class="gui-flex gui-align-items-center gui-space-between cff4f00 f26 fm mt10">
								<view class="">￥{{item.price}}</view>
								<view :class="item.status == 0 ? 'cFD2C55' : item.status == -1 ? 'c99' : ''">
									{{item.status == 0 ? '审核中' : item.status == -1 ? '未采纳' : '已采纳'}}
								</view>
							</view>
						</view>
					</view>
				</block>
				<gui-empty v-if="isEmpty">
					<view slot="img" class="gui-flex gui-rows gui-justify-content-center">
						<image class="gui-empty-img" src="../../../static/images/empty.png"></image>
					</view>
				</gui-empty>
				<gui-loadmore ref="loadmorecom"></gui-loadmore>
				<view style="height:150rpx;"></view>
				<navigator url="/pages/my/task/supply" hover-class="" class="wp100 ptb20 mt20 gui-fixed-rb bgFFFFFF">
					<view class="btns f30 fb">提交货源</view>
				</navigator>
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
			productList: []
		}
	},
	onLoad() {
		_this = this;
	},
	onShow() {
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
				'swoft/api/user/getSupplyGoodsList',
				{
					data: {
						uid: uni.getStorageSync('userInfo').id
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
	page{background-color: #F5F5F9}
	.h160{height: 160rpx;}
	.cFD2C55{color: #FD2C55;}
	.btns{width:690rpx;height:90rpx;background: #ff4f00;border-radius: 45rpx;text-align: center;line-height: 90rpx;color: #fff;margin:0 auto;}
</style>
