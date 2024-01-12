<template>
	<gui-page :isLoading="pageLoading" ref="guiPage" style="background: #F5F5F5;padding-top: 10rpx;" @loadmorefun="getdatalist">
		<view slot="gBody">
			<view class="coupon-item">
				<view class="status">
					<block v-if="type == 4">待使用</block>
					<block v-if="type == 1">待生效</block>
					<block v-if="type == 2">待释放</block>
					<block v-if="type == 3">待领取</block>
				</view>
				<view style="width: 40%;">
					<view class="price"><view class="unit">￥</view>
						<block v-if="type == 4">{{ couponinfo.sum_money_valid }}</block>
						<block v-if="type == 1">{{ couponinfo.sum_money_no_valid }}</block>
						<block v-if="type == 2">{{ couponinfo.sum_money_no_release }}</block>
						<block v-if="type == 3">{{ couponinfo.sum_money_getting }}</block>
					</view>
				</view>
				<view class="rightbtn" :class="type == 3 || type == 4?'borAll':''" @click.stop="receiveFun(type)">
					<block v-if="type == 4">去使用</block>
					<block v-if="type == 1">待生效</block>
					<block v-if="type == 2">待释放</block>
					<block v-if="type == 3">立即领取</block>
				</view>
			</view>
			
			<scroll-view id="list" :scroll-y="true" :style="'height:'+mainHeight+'px;'" @scrolltolower="scrolltolower">
				<view class="ul-view" v-if="list.length > 0">
				<block v-for="(item,index) in list" :key="index">
					<view class="li-view" :class="index == list.length -1?'borderBN':'borderB'">
						<view style="width: 75%;">
							<block v-if="type == 4">
								<view class="font-time1" >{{ item.get_time }}</view>
								<view class="font-time2">有效期{{ item.can_use_end_time }}</view>
							</block>
							<block v-if="type == 1">
								<view class="font-time1" v-if="type == 1">订单：{{ item.orderNum }}</view>
								<view class="font-time2">{{ item.use_time }}</view>
							</block>
							<block v-if="type == 2">
								<view class="font-time1" v-if="type == 2">订单：{{ item.orderNum }}</view>
								<view class="font-time2">{{ item.use_time }}</view>
							</block>
							<block v-if="type == 3">
								<view class="font-time1" v-if="type == 3">{{ item.can_get_start_time }}</view>
								<view class="font-time2">有效期{{ item.can_get_end_time }}</view>
							</block>
							
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
				<view class="nullbox" v-else>
					<image class="font-icon2" mode="widthFix" src="@/static/images/coupon/icon-1.png"></image>
					<view>您还没有消费积分，快去下单吧！</view>
				</view>
				<gui-loadmore ref="loadmorecom"></gui-loadmore>
			</scroll-view>
			
			<gui-modal ref="msgModal" :isTitle="false" :canCloseByShade="false" :isCloseBtn="false" closeBtnStyle="color:#000000; font-size:28rpx;" :zIndex="999" bodyStyle="" width="665rpx">
				<view slot="content" class="msgbox">
					<image class="font-icon1" mode="widthFix" src="@/static/images/coupon/icon-2.png"></image>
					<view>领取成功</view>
			    </view>				
			</gui-modal>
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
			pageLoading: false,
			type: '',
			list: [],
			userInfo: null,
			couponinfo: {},
			mainHeight: 0,
		}
	},
	onLoad(option) {
		_this = this;
		_this.type = option.id
	},
	onShow() {
		_this.userInfo = uni.getStorageSync('userInfo');
		_this.getcouponinfo();
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
						status: _this.type
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
		getcouponinfo: function () {
			//加载数据
			_this.apiLoadingStatus = true;
			_this.pageLoading = true;
			uni.gRequest.post(
				'/swoft/api/consumption/index',
				{
					data: {
						user_id: _this.userInfo.id,
					}
				},
				(res) => {
					_this.couponinfo = res.data
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
		receiveFun: function (id) {
			if(id == 4) {
				_this.getList()
			} else if(id == 1) {//去使用
				uni.switchTab({
					url: '/pages/home/index'
				})
			}
		},
		getList: function () {//获取可领取的优惠券
			uni.gRequest.post(
				'/swoft/api/consumption/getList',
				{
					data: {
						user_id: _this.userInfo.id,
						status: 3,
						page: 1,
						page_size: 9999,
					}
				},
				(res) => {
					let idlist = []
					if(res.data.lists.length > 0) {
						res.data.lists.forEach(item => {
							idlist.push(item.id)
						});
						_this.postreceive(idlist)
					} else {
						_this.$refs.guiPage.openMessage('default','暂无可领取的消费积分',true,1500);
					}
					
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
		postreceive: function(list) {
			let ids = list.join(',')
			uni.gRequest.post(
				'/swoft/api/consumption/get',
				{
					data: {
						user_id: _this.userInfo.id,
						ids
					}
				},
				(res) => {
					console.log(res.data)
					if(res.code == 20000) {
						_this.$refs.msgModal.open();
						setTimeout(()=>{
							_this.$refs.msgModal.close();
						}, 1500)
					}
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
	.borderB{
		border-bottom: 1px solid #ccc;
	}
	.borderBN{
		border-bottom: none;
	}
	.coupon-item{
		background: url(../../../static/images/coupon/bg-1.png) no-repeat center center;
		background-size: 100% 100%;
		width: 95%;
		margin: 0 auto 10rpx;
		height: 200rpx;
		padding: 10rpx 10rpx;
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
	}
	.status{
		width: 150rpx;
		height: 60rpx;
		background: url(../../../static/images/coupon/bg-2.png) no-repeat center center;
		background-size: 100% 100%;
		font-size: 28rpx;
		font-weight: 400;
		color: #902705;
		text-align: center;
		line-height: 60rpx;
	}
	.price{
		font-size: 60rpx;
		font-weight: bold;
		color: #FF5E29;
		line-height: 200rpx;
	}
	.unit{
		font-size: 30rpx;
		display: inline-block;
		margin-right: 10rpx;
	}
	.time{
		font-size: 28rpx;
		color: #999999;
		margin-top: 5rpx;
	}
	.rightbtn{
		float: right;
		width: 25%;
		line-height: 60rpx;
		font-size: 30rpx;
		color: #FF5E29;
		text-align: center;
		margin-top: 70rpx;
		margin-right: 20rpx;
	}
	.borAll{
		border-radius: 20px;
		border: 1px solid #FF5E29;
	}
	.msgbox{
		width: 80%;
		background: #fff;
		border-radius: 20px;
		padding: 60rpx 20rpx;
		margin: 0 auto;
		text-align: center;
		font-size: 40rpx;
		color: #333333;
		font-weight: bold;
	}
	.font-icon1{
		display: block;
		width: 26%;
		margin: 0 auto 30rpx;
	}
	.ul-view{
		width: 95%;
		margin: 0 auto;
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
	
	.nullbox{
		height: 100vh;
		font-size: 24rpx;
		color: #999999;
		text-align: center;
	}
	.font-icon2{
		display: block;
		width: 20%;
		margin: 300rpx auto 50rpx;
	}
</style>
