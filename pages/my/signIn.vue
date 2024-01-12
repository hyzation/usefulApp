<template>
	<gui-page ref="guiPage" :isLoading="pageLoading" :customHeader="true" statusBarStyle="background-color:#FF4F00;" headerStyle="background-color:#FF4F00;color:#ffffff;">
		<view slot="gHeader">
			<view class="gui-flex gui-nowrap gui-rows gui-align-items-center">
				<view @tap="navBack" class="gui-header-leader-btns" hover-class="gui-tap">
					<text class="gui-icons ml10">&#xe600;</text>
				</view>
				<view class="gui-flex1 gui-text-center">
					<text class="f36 gui-ellipsis cff">签到有礼</text>
				</view>
				<view @tap="$refs.msgModal.open();" class="f28 rule bgFF cFF4F00">规则</view>
			</view>
		</view>
		<view slot="gBody">
			<view class="bgFF4F00 cff ptb20">
				<view class="box gui-flex gui-columns gui-align-items-center gui-justify-content-center">
					<view class="f30">连续签到(天）</view>
					<view class="f200 mt20 fb">{{continuity}}</view>
				</view>
			</view>
			<view class="bgFF br10 p20 mlr20 mt20 gui-flex gui-space-between gui-align-items-center">
				<view class="f30">签到立即获得{{yBean}}数字能量</view>
				<button v-if="SignStatus == 0" class="btnBg6 btnSize58 borRadAll" hover-class="" @tap="userSign">立即签到</button>
				<button v-else class="btnBg6 btnSize58 borRadAll" style="background-image:linear-gradient(to right,#AAAAAA,#999999);" hover-class="">今日已签到</button>
			</view>
			<view class="f30 pt20 mlr20">签到记录</view>
			<view v-for="(item,index) in productList" :key="index" class="bgFF br10 p20 mlr20 mt20 gui-flex gui-space-between gui-align-items-center">
				<block v-if="item.type == 2">
					<view>
						<view class="f28">连续签到{{item.days}}天</view>
						<view class="c99 f24 pt10">{{item.created_at}}</view>
					</view>
					<view class="cFF4F00 f28">+{{item.yBean}}</view>
				</block>
				<block v-else>
					<view>
						<view class="f28">每日签到</view>
						<view class="c99 f24 pt10">{{item.created_at}}</view>
					</view>
					<view class="cFF4F00 f28">+{{item.yBean}}</view>
				</block>
			</view>
			<gui-empty v-if="isEmpty">
				<view slot="img" class="gui-flex gui-rows gui-justify-content-center">
					<image class="gui-empty-img mt30" src="../../static/images/empty.png"></image>
				</view>
			</gui-empty>
			<gui-loadmore ref="loadmorecom"></gui-loadmore>
			<gui-modal ref="msgModal" :isTitle="false" :canCloseByShade="false" :isCloseBtn="false" closeBtnStyle="color:#000000; font-size:28rpx;" :zIndex="999" bodyStyle="" width="665rpx">
				<view slot="content">
					<view class="img52">
						<image class="img52" @tap="$refs.msgModal.close();" src="../../static/images/box/close.png" mode="widthFix"></image>
					</view>	
					<!-- <view class="qiandaoModal mt50 gui-border-box gui-text-center f28 gui-text">
						<scroll-view :scroll-y="true" style="height:440rpx;"><text>{{rules}}</text></scroll-view>
					</view> -->
					<scroll-view :scroll-y="true" class="xztcScroll">
						<view class="xztc gui-flex gui-justify-content-center gui-align-items-start">
							<image mode="widthFix" :src="rulePathImg"></image>
						</view>
					</scroll-view>
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
			rules: null,
			SignStatus: 0,
			continuity: 0,
			yBean: 0,
			apiLoadingStatus: false,
			loadMoreTimer: null,
			isEmpty: false,
			productList: [],
			rulePathImg: ''
		}
	},
	onLoad: function(){
		_this = this;
		_this.getSignInRules();
		_this.getUserSignStatus();
		_this.reload();
		_this.getPicConfigField('signInRules');
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
		getPicConfigField: function(e){
			uni.gRequest.post(
				'swoft/api/config/getPicConfigField',
				{
					data: {
						field: e
					}
				}, 
				(res) => {
					if(res.code == 0){
						_this.rulePathImg = res.data.path;
					}else{
						_this.$refs.guiPage.openMessage('default',res.msg,true,1500);
					}
				},
				(error) => {
					_this.$refs.guiPage.openMessage('default','请求错误',true,1500);
				},
				(res) => {},
				true,
				true
			);
		},
		getUserSignStatus: function(){
			_this.pageLoading = true;
			uni.gRequest.post(
				'swoft/api/user/getUserSignStatus',
				{
					data: {
						uid: uni.getStorageSync('userInfo').id
					}
				}, 
				(res) => {
					if(res.code == 0){
						_this.SignStatus = res.data.SignStatus;
						_this.continuity = res.data.continuity;
						_this.yBean = res.data.yBean;
					}else{
						_this.$refs.guiPage.openMessage('default',res.msg,true,1500);
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
		getSignInRules: function(){
			uni.gRequest.post(
				'swoft/api/config/getSignInRules',
				{
					data: {}
				}, 
				(res) => {
					if(res.code == 0){
						_this.rules = res.data;
					}else{
						_this.$refs.guiPage.openMessage('default',res.msg,true,1500);
					}
				},
				(error) => {
					_this.$refs.guiPage.openMessage('default','请求错误',true,1500);
				},
				(res) => {},
				true
			);
		},
		userSign: function(){
			_this.pageLoading = true;
			uni.gRequest.post(
				'swoft/api/user/userSign',
				{
					data: {
						id: uni.getStorageSync('userInfo').id
					}
				}, 
				(res) => {
					if(res.code == 0){
						_this.$refs.guiPage.openMessage('success',res.msg,true,1500);
						uni.setStorageSync('userInfo',res.data);
						setTimeout(function(){
							_this.getUserSignStatus();
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
		},
		navBack: function(){
			uni.navigateBack({
				delta: 1
			})
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
				'swoft/api/user/getUserSignRecordList',
				{
					data: {
						uid: uni.getStorageSync('userInfo').id,
						page: page,
						limit: 20
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
	@import url('../../static/css/du.css');
	.gui-header-leader-btns{width:120rpx; line-height:60rpx; font-size:50rpx;}
	.rule{width:120rpx;height:50rpx;line-height:50rpx;border-radius:25rpx 0 0 25rpx;text-align:center;}
	.box{ width: 418rpx; height: 418rpx; margin: 66rpx auto; border: #FFB18E 8rpx solid; border-radius: 100%;}
	.f200{ font-size: 200rpx; line-height: 1;}
	.btnBg6{ line-height: 64rpx; font-size: 28rpx;}
	.qiandaoModal{ height: 670rpx; background: url(../../static/images/box/tanchu1_bg.png) no-repeat left top; background-size: 100% auto; padding: 320rpx 100rpx 100rpx 100rpx;}
</style>