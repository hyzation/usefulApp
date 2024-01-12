<template>
	<gui-page :isLoading="pageLoading" ref="guiPage" @loadmorefun="getdatalist">
		<view class="fixed-top-view" slot="gFixedTop">
			<view class="wp100 bgff fb gui-flex gui-align-items-center" style="height:80rpx;">
				<gui-switch-navigation :items="items" :width="750"
				@change="navchange" textAlign="center" :isCenter="true" activeDirection="center" :size="0" :activeFontWeight="400"
				activeLineBg="linear-gradient(to right, #FF4F00, #FF4F00)" activeColor="#FF4F00" color="#000000"
				:margin="80" padding="60rpx" activeLineRadius="6rpx"
				activeLineHeight="6rpx" lineHeight="40rpx" activeLineWidth='50rpx' fontSize="26rpx" activeFontSize="26rpx">
				</gui-switch-navigation>
			</view>
		</view>
		<view slot="gBody">
			<view style="height:80rpx;"></view>
			<scroll-view id="list" :scroll-y="true" :style="'height:'+mainHeight+'px;'" @scrolltolower="scrolltolower">
				<view class="ul-view">
				<block v-for="(item,index) in list" :key="index">
					<view class="li-view" :class="index == list.length -1?'borderBN':'borderB'">
						<view style="width: 75%;">
							<view class="font-time1" v-if="status == 5">订单：{{ item.orderNum }}</view>
							<view class="font-time1" v-if="status == 6">{{ item.can_get_end_time }}过期</view>
							<view class="font-time1" v-if="status == 7">{{ item.can_use_end_time }}过期</view>
						</view>
						<view>
							<view>
								<view class="price1">￥</view>
								<view class="price2">{{ item.money }}</view>
							</view>
						</view>
					</view>
				</block>
				</view>
				<view class="fullPage gui-flex gui-justify-content-center gui-align-items-center fm gui-fixed-lt wp100" v-if="list.length == 0" style="margin-top:-100rpx;"><gui-image src="../../../static/images/noData.png" :width="396" :height="226" :timer="0"></gui-image></view>
				<view class="mt30 h100"></view>
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
			list: [],
			status: 5,
			items: [{id: 5,name:'已使用'},{id: 6,name:'过期未领'},{id: 7,name:'过期未用'}],
			mainHeight: 0,
		}
	},
	onLoad() {
		_this = this;
		_this.getdatalist();
	},
	onReady() {
		setTimeout(function(){
			uni.gJS.select('#list', (res)=>{
				_this.mainHeight = uni.gJS.system().windowHeight - res.top;
			});
		},500);
	},
	methods:{
		navchange: function(index){
			if(_this.status != index){
				_this.status = _this.items[index].id;
				page = 1
				_this.getdatalist();
			}
		},
		/**
		 * 加载数据
		 * @param {Object} isReload
		 */
		getdatalist: function(isReload) {
			_this.apiLoadingStatus = true;
			uni.gRequest.post(
				'/swoft/api/consumption/getList',
				{
					data: {
						page: page,
						page_size: 10,
						user_id: uni.getStorageSync('userInfo').id,
						status: _this.status
					}
				}, 
				(res) => {
					if(res.code == 20000){
						if(page == 1){
							totalPage = res.data.total;
							if(res.data.length > 0){
								_this.isEmpty = false;
							}else{
								_this.isEmpty = true;
							}
						}
						if(page <= totalPage){
							_this.list = _this.list.concat(res.data.lists);
							// 加载完成后停止加载动画
							_this.$refs.guiPage.stoploadmore();
						}else{
							if(totalPage > 0){
								// 加载了全部数据，通知组件不再加载更多
								_this.$refs.guiPage.nomore();
							}
						}
						page++;
						if(isReload){
							_this.$refs.guiPage.endReload();
						}
					}
				},
				(error) => {
					_this.$refs.guiPage.openMessage('default','请求错误',true,1500);
				},
				(res) => {
					_this.apiLoadingStatus = false;
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
		scrolltolower: function(){
			if(_this.apiLoadingStatus){ return; }
			if(_this.loadMoreTimer != null){clearTimeout(_this.loadMoreTimer);}
			_this.loadMoreTimer = setTimeout(() => {
				if(_this.$refs.loadmorecom.loadMoreStatus != 0){ return ;}
				_this.$refs.loadmorecom.loading();
				_this.getdatalist();
			},80);
		},
	}
}
</script>
<style>
	@import url('@/static/css/li.css');
	page{background-color: #F5F5F9}
	.h100{height: 100rpx}
	.h165{height: 165rpx;}
	.w215{width: 215rpx;}
	.w60{width: 60rpx;}
	.w630{width: 630rpx;}
	.coupon{width: 690rpx;height: 165rpx;}
	.ml30{margin-left: 30rpx;}
	.ml80{margin-left: 80rpx;}
	.ml226{margin-left: 236rpx;}
	.cFFA075{color: #FFA075;}
	.f70{font-size: 70rpx;}
	
	.ul-view{
		width: 95%;
		margin: 30rpx auto 0;
		background: #fff;
		border-radius: 10px;
	}
	.li-view{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx 20rpx;
	}
	.font-time1{
		font-size:32rpx;
		color: #333333;
		font-weight: bold;
	}
	.font-time2{
		font-size: 28rpx;
		color: #999999;
	}
	.price1{
		display: inline-block;
		font-size: 24rpx;
		color: #FF5E29;
		font-weight: bold;
	}
	.price2{
		display: inline-block;
		font-size: 36rpx;
		color: #FF5E29;
		font-weight: bold;
	}
</style>
