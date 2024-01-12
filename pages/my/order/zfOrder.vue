<template>
	<gui-page :isLoading="pageLoading" ref="guiPage">
		<!-- 页面主体 -->
		<view slot="gBody" class="fm">
			<view class="bgFFFFFF view6 gui-relative borderTop fb gui-flex gui-align-items-center">
				<gui-switch-navigation :items="navItems" @change="navchange" color="#000000" :currentIndex="currentIndex" 
				activeLineBg="linear-gradient(to right, #FF4F00, #FF4F00)" fontSize="30rpx" activeFontSize="30rpx"
				activeColor="#FF4F00" :isCenter="true" activeDirection="center" :activeFontWeight="400"
				activeLineWidth="70%" :size="0" padding="120rpx" :width="750"></gui-switch-navigation>
			</view>
			<!--  #ifdef APP-PLUS -->
			<view class="h100"></view>
			<!--  #endif -->
			<!--  #ifdef H5 -->
			<view class="h100"></view>
			<!--  #endif -->
			<block v-if="status == 1">
				<view class="w710 mlr20">
					<view v-for="(item,index) in productList" :key="index" class="list-item gui-flex gui-column gui-justify-content-center gui-relative borderBottom">
						<view class="gui-flex gui-align-items-center gui-space-between">
							<view class="">
								<view class=""><text class="f28">SN：{{item.sn}}</text></view>
								<view class="f22 c99 mt20">{{item.createdAt|dealTime}}</view>
							</view>
							<view class="gui-text-right">
								<view class="f28 cFF4F00">{{item.retMsg}}</view>
								<view class="cFD2C55 f28 mt10">交易金额：{{item.txnAmt}}</view>
							</view>
						</view>
					</view>
				</view>
			</block>
			<block v-else>
				<view class="w710 mlr20">
					<view v-for="(item,index) in productList" :key="index" class="list-item gui-flex gui-column gui-justify-content-center gui-relative borderBottom">
						<view class="gui-flex gui-align-items-center gui-space-between">
							<view class="">
								<view class=""><text class="f28">{{item.creditCardBank}}</text> <text class="f22">({{item.creditCardCode.substring(item.creditCardCode.length-4)}})</text></view>
								<view class="f22 c99 mt20">{{item.createdAt|dealTime}}</view>
							</view>
							<view class="gui-text-right">
								<block v-if="item.status == -1">
									<view class="c999999 f28">交易失败</view>
								</block>
								<block v-if="item.status == 0">
									<view class="cFD2C55 f28">未支付</view>
								</block>
								<block v-if="item.status == 1">
									<view class="f28 cFF4F00">支付成功</view>
								</block>
								<view class="cFD2C55 f28 mt10">消费金额：{{item.money.toFixed(2)}}</view>
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
				currentIndex: 0,
				status: 1,
				navItems: [
					{name: 'POS支付',status: 1},
					{name: '快捷支付',status: 2},
				],
				apiLoadingStatus: false,
				loadMoreTimer: null,
				isEmpty: false,
				productList: []
			}
		},
		filters: {
			dealTime(e) {
				if(e != 0){
					return uni.gJS.toDate(e,'str');
				}else{
					return '------------'; 
				}
			}
		},
		onLoad: function(e){
			_this = this;
			getApp().readMsgNum(15);
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
		methods: {
			navchange:function(index){
				if(_this.currentIndex != index){
					_this.currentIndex = index;
					_this.status = _this.navItems[index].status;
					_this.reload();
				}
			},
			reload: function(){
				_this.pageLoading = true;
				_this.productList = [];
				page = 1;
				if(_this.$refs.loadmorecom != undefined){
					_this.$refs.loadmorecom.loadMoreStatus = 0;
					_this.$refs.loadmorecom.stoploadmore();
				}
				_this.getdata();
			},
			/**
			 * 加载数据
			 * @param {Object} isReload
			 */
			getdata: function(isReload){
				let url = '';
				let postData = {};
				postData.uid = uni.getStorageSync('userInfo').id;
				postData.page = page;
				postData.limit = 20;
				if(_this.status == 1){
					url = 'swoft/api/tripartite/getPosJiaoyiList';
					postData.status = 99;
				}else{
					url = 'swoft/api/tripartite/getWkCardOrderList';
					postData.status = 99;
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
	page{background-color:#F8F8F8;}
	.h100{height:100rpx;}
	/*  #ifdef  APP-PLUS  */
	.view6{position:fixed;top: 0; z-index: 1;height:100rpx;}
	/*  #endif  */
	/*  #ifdef  H5  */
	.view6{position:fixed;top:80rpx;z-index:1;height:100rpx;}
	/*  #endif  */
	.list-item{padding:30rpx;}
</style>