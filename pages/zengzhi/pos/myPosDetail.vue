<template>
	<gui-page :isLoading="pageLoading" :customHeader="false" class="bg-F8F8F8" ref="guiPage">
		<!-- 页面主体 -->
		<view slot="gBody">
			<view class="m30 pl30 pr30 bgFFFFFF br10" v-if="data">
				<view class="pt30 pb30 gui-flex gui-align-items-center gui-space-between gui-relative borderBottom">
					<text class="fm f28">品牌</text>
					<text class="fm f28 c999999">{{data.title}}</text>
				</view>
				<view class="pt30 pb30 gui-flex gui-align-items-center gui-space-between gui-relative borderBottom">
					<text class="fm f28">设备号</text>
					<text class="fm f28 c999999">{{data.sn}}</text>
				</view>
				<view class="pt30 pb30 gui-flex gui-align-items-center gui-space-between gui-relative borderBottom">
					<text class="fm f28">状态</text>
					<text class="fm f28 c999999">{{data.isActivate == 1 ? '已激活' : '未激活'}}</text>
				</view>
				<view class="pt30 pb30 gui-flex gui-align-items-center gui-space-between gui-relative borderBottom">
					<text class="fm f28">激活日期</text>
					<text class="fm f28 c999999">{{timeStr}}</text>
				</view>
				<view class="pt30 pb30 gui-flex gui-align-items-center gui-space-between">
					<text class="fm f28">设备押金</text>
					<text class="fm f28 c999999">{{data.deposit}}</text>
				</view>
			</view>
			<view class="m30 pl30 p30 bgFFFFFF br10">
				<view class="c999999 f24">每月交易总额>=10000元,并连续完成12个月,全额返还设备款</view>
				<view class="gui-flex gui-wrap gui-space-between">
					<block v-for="(item, index) in list" :key="index">
						<view v-if="item.status == '已完成'" class="boxi bg6A4714 gui-flex gui-align-items-center gui-justify-content-center gui-wrap">
							<view>
								<view class="wp100 gui-text-center fb cFFFFFF f40">{{index+1}}</view>
								<view class="wp100 gui-text-center fm cFFFFFF f20">{{item.status}}</view>
							</view>
						</view>
						<view v-if="item.status == '未完成'" class="boxi bg999999 gui-flex gui-align-items-center gui-justify-content-center gui-wrap">
							<view>
								<view class="wp100 gui-text-center fb cFFFFFF f40">{{index+1}}</view>
								<view class="wp100 gui-text-center fm cFFFFFF f20">{{item.status}}</view>
							</view>
						</view>
						<view v-if="item.status == '进行中'" class="boxi bgFFA075 gui-flex gui-align-items-center gui-justify-content-center gui-wrap">
							<view>
								<view class="wp100 gui-text-center fb cFFFFFF f40">{{index+1}}</view>
								<view class="wp100 gui-text-center fm cFFFFFF f20">{{item.status}}</view>
							</view>
						</view>
						<view v-if="item.status == '待完成'" class="boxi bgFFDF91 gui-flex gui-align-items-center gui-justify-content-center gui-wrap">
							<view>
								<view class="wp100 gui-text-center fb cFFFFFF f40">{{index+1}}</view>
								<view class="wp100 gui-text-center fm cFFFFFF f20">{{item.status}}</view>
							</view>
						</view>
					</block>
				</view>
			</view>
			<block v-if="data.isActivate == 1">
				<block v-if="data && data.isReturnDeposit == 0">
					<button @tap="editPosOrderGoods" class="btns f30 fm bgFF4F00" v-if="count >= 12" hover-class="">退押金</button>
					<button class="btns f30 fm bg999999" v-else hover-class="">退押金</button>
				</block>
				<block v-if="data && data.isReturnDeposit == 1">
					<button class="btns f30 fm bg999999" hover-class="">已退押金</button>
				</block>
			</block>
		</view>
	</gui-page>
</template>
<script>
	import uniCopy from '@/js_sdk/xb-copy/uni-copy.js'
	var _this;
	export default {
		data() {
			return {
				id: 0,
				pageLoading: true,
				data: {},
				timeStr: '',
				isCanReturnDeposit: -1,
				list: [],
				count: 0
			}
		},
		onLoad: function(e){
			_this = this;
			_this.id = e.id;
			_this.getOrderDetail();
		},
		onShow: function(){
			
		},
		methods: {
			editPosOrderGoods: function(){
				_this.pageLoading = true;
				let postData = {
					uid: uni.getStorageSync('userInfo').id,
					posGoodsId: _this.data.posGoodsId,
					sn: _this.data.sn,
					posOrderId: _this.data.posOrderId,
					posOrderGoodsId: _this.data.id
				}
				uni.gRequest.post(
					'swoft/api/pos/editPosOrderGoods',
					{
						data: postData
					}, 
					(res) => {
						if(res.code == 0){
							_this.$refs.guiPage.openMessage('success',res.msg,true,1500);
							setTimeout(function(){
								_this.getOrderDetail();
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
			},
			getPosJiaoyiStatusList: function(){
				uni.gRequest.post(
					'swoft/api/pos/getPosJiaoyiStatusList',
					{
						data: {
							sn: _this.data.sn
						}
					}, 
					(res) => {
						if(res.code == 0){
							_this.count = res.data.count;
							_this.list = res.data.list;
						}else{
							_this.$refs.guiPage.openMessage('default',res.msg,true,1500);
						}
					},
					(error) => {
						_this.$refs.guiPage.openMessage('default','请求错误',true,1500);
					},
					(res) => {
					},
					true,
					true
				);
			},
			getIsPosJiaoyi: function(){
				uni.gRequest.post(
					'swoft/api/pos/getIsPosJiaoyi',
					{
						data: {
							sn: _this.data.sn
						}
					}, 
					(res) => {
						if(res.code == 0){
							_this.isCanReturnDeposit = res.data;
						}else{
							_this.$refs.guiPage.openMessage('default',res.msg,true,1500);
						}
					},
					(error) => {
						_this.$refs.guiPage.openMessage('default','请求错误',true,1500);
					},
					(res) => {
					},
					true,
					true
				);
			},
			getOrderDetail: function(){
				_this.pageLoading = true;
				uni.gRequest.post(
					'swoft/api/pos/getPosOrderGoodsDetail',
					{
						data: {
							posOrderGoodsId: _this.id
						}
					}, 
					(res) => {
						if(res.code == 0){
							_this.data = res.data;
							uni.setNavigationBarTitle({
								title: res.data.title
							})
							_this.timeStr = uni.gJS.toDate(res.data.activateTime,'str');
							// _this.getIsPosJiaoyi();
							_this.getPosJiaoyiStatusList();
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
			}
		}
	}
</script>
<style>
	page{background-color:#F8F8F8;}
	.boxi{width:96rpx;height:120rpx;border-radius:20rpx;margin-top:20rpx;}
	.btns{width:690rpx;height:90rpx;border-radius: 45rpx;text-align: center;line-height: 90rpx;color: #fff;margin:60rpx auto;}
</style>