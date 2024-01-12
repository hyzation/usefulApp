<template>
	<gui-page :isLoading="pageLoading" ref="guiPage" style="background: #F5F5F5;padding-top: 10rpx;" @loadmorefun="getdata">
		<view slot="gBody">
			<scroll-view id="list" :scroll-y="true" :style="'height:'+mainHeight+'px;'" @scrolltolower="scrolltolower">
			<view class="ul-view" v-if="list.length > 0">
			<block v-for="(item,index) in list" :key="index">
				<view class="li-view">
					<view style="width: 75%;">
						<view class="font-time1" style="margin-bottom: 10rpx;">{{ item.vipinfo.name }}产品包</view>
						<view class="font-time2" style="margin-bottom: 10rpx;">购买时间：{{ item.vipinfo.createdAt }}</view>
						<view class="font-time2">{{ item.vipinfo.name }}包有效期：{{ item.vipinfo.valid }}天</view>
					</view>
					<view>
						<view>
							<view class="fontR price2" style="margin-bottom: 20rpx;" v-if="item.status == 1">生效中</view>
							<view class="fontR price3" style="margin-bottom: 20rpx;" v-else>已失效</view>
						</view>
						<view class="font-time2"></view>
					</view>
				</view>
			</block>
			</view>
			<view v-else class="font-null">
				您还没有购买过产品包
			</view>
			<gui-empty v-if="isEmpty">
				<view slot="img" class="gui-flex gui-rows gui-justify-content-center">
					<image class="gui-empty-img" src="../../../static/images/empty.png"></image>
				</view>
			</gui-empty>
			<gui-loadmore ref="loadmorecom"></gui-loadmore>
		</scroll-view>
		</view>
	</gui-page>
</template>
<script>
var _this;
var page = 1;
var totalPage = 0;
export default {
	data() { 
		return {
			list: [],
			userInfo: null,
			apiLoadingStatus: false,
			pageLoading: false,
			isEmpty: false,
			mainHeight: 0,
		}
	},
	onLoad(option) {
		_this = this;
	},
	onShow() {
		_this.userInfo = uni.getStorageSync('userInfo');
		_this.reload();
	},
	onReady() {
		setTimeout(function(){
			uni.gJS.select('#list', (res)=>{
				_this.mainHeight = uni.gJS.system().windowHeight - res.top;
			});
		},500);
	},
	methods:{
		reload: function () {
			_this.getdata();
		},
		/**
		 * 加载数据
		 * @param {Object} isReload
		 */
		getdata: function(isReload) {
			_this.apiLoadingStatus = true;
			uni.gRequest.post(
				'/swoft/api/vip/vipUserList',
				{
					data: {
						page: page,
						limit: 10,
						uid: uni.getStorageSync('userInfo').id,
					}
				}, 
				(res) => {
					if(res.code == 0){
						let newList = []
						if(page == 1){
							totalPage = res.data.count;
							if(res.data.list.length > 0){
								_this.isEmpty = false;
							}else{
								_this.isEmpty = true;
							}
						}
						if(page <= totalPage){
							res.data.list.forEach(item => {
								let info = {
									...item,
									vipinfo: JSON.parse(item.vip)
								}
								newList.push(info)
							});
							_this.list = _this.list.concat(newList);
							// 加载完成后停止加载动画
							if(_this.$refs.loadmorecom != undefined){
								_this.$refs.loadmorecom.stoploadmore();
							}
						}else{
							if(totalPage > 0){
								// 加载了全部数据，通知组件不再加载更多
								_this.$refs.guiPage.nomore();
							}
						}
						if(totalPage> newList.length) page++;
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
				_this.getdata();
			},80);
		},
	}
}
</script>
<style>
	@import url('@/static/css/li.css');
	.borderB{
		border-bottom: 1px solid #ccc;
	}
	.borderBN{
		border-bottom: none;
	}
	.ul-view{
		width: 95%;
		margin: 0 auto;
		padding: 20rpx 0 0
	}
	.li-view{
		background: #fff;
		border-radius: 10px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx 20rpx;
		margin-bottom: 20rpx;
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
	.price3{
		display: inline-block;
		font-size: 36rpx;
		color: #999999;
		font-weight: bold;
	}
	.font-null{
		font-size: 32rpx;
		color: #999999;
		text-align: center;
		margin-top: 300rpx;
	}
	.fontR{
		text-align: right;
		display: block;
	}
</style>
