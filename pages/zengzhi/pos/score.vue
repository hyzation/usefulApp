<template>
	<gui-page :isLoading="pageLoading" ref='guiPage' :customHeader="true">
		<view slot="gHeader">
			<view class="gui-flex gui-nowrap gui-rows gui-align-items-center">
				<view @tap="navBack" class="gui-header-leader-btns" hover-class="gui-tap">
					<text class="gui-icons">&#xe600;</text>
				</view>
				<view class="gui-flex1 gui-text-center">
					<text class="f36 gui-ellipsis">我的积分</text>
				</view>
				<view class="pr30">
					<view class="f28" @click="$refs.msgModal.open();">规则</view>
				</view>
			</view>
		</view>
		<view slot="gBody">
			<view class="bgffc2a6-ffdfd1 gui-border-radius card mt20 mlr20 mb10 pt20 pb20">
				<view class="gui-flex gui-align-items-center gui-space-between"><text class="f34 plr20 ml20">我的积分</text> <text class="cFF4F00 f50 plr20 fb">{{score0}}</text></view>
				<view class="mlr20 gui-flex gui-align-items-center gui-space-between">
					<text class="c6A4714 f22 fm ml20">今日积分：{{score1}}</text>
					<text class="cD13101 f22 fm ml20">30天内到期：{{score2}}</text>
				</view>
			</view>
			<view v-for="(item, index) in list" :key="index" class="m20 p20 bgFFFFFF br10 gui-flex gui-align-items-center gui-space-around">
				<gui-image :src="item.coverPath+'?imageslim'" :width="180" :height="180"></gui-image>
				<view class="gui-flex gui-align-items-center gui-justify-content-center gui-wrap" style="width:400rpx;">
					<view class="f34 fm">{{item.title}}</view>
					<view class="line mt20 gui-relative">
						<view class="lineDot"></view>
					</view>
					<view class="f24 fm mt20">{{item.desc}}</view>
					<view class="mt20 gui-flex gui-align-items-center gui-justify-content-start wp100">
						<view class="gui-flex gui-align-items-end">
							<text class="fb f45 lh45 cFF4F00">{{parseInt(item.score)}}</text>
							<text class="f24 ml10" style="height:45rpx;line-height:55rpx;">积分</text>
						</view>
						<view class="buyBtn fm ml30" @tap="openPayWay(item)">立即兑换</view>
					</view>
				</view>
			</view>
			<gui-modal ref="msgModal" :isTitle="false" :canCloseByShade="false" :isCloseBtn="false" closeBtnStyle="color:#000000; font-size:28rpx;" :zIndex="999" bodyStyle="" width="665rpx">
				<view slot="content">
					<view class="img52">
						<image class="img52" @tap="$refs.msgModal.close();" src="@/static/images/box/close.png" mode="widthFix"></image>
					</view>	
					<!-- <view class="qiandaoModal mt50 gui-border-box f28 gui-text">
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
			apiLoadingStatus: false,
			loadMoreTimer: null,
			isEmpty: false,
			list: [],
			mainHeight: 0,
			userInfo: null,
			rules: '',
			score0: 0,
			score1: 0,
			score2: 0,
			rulePathImg: ''
		}
	},
	onLoad() {
		_this = this;
		_this.getConfigField();
		_this.getPosGoodsList();
		_this.getPicConfigField('posScoreRule');
	},
	onShow() {
		_this.userInfo = uni.getStorageSync('userInfo');
		_this.getCountPosUserScore(0);
		_this.getCountPosUserScore(1);
		_this.getCountPosUserScore(2);
	},
	onReady() {

	},
	methods:{
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
		openPayWay: function(e){
			_this.item = e;
			uni.setStorageSync('postData',e);
			uni.navigateTo({
				url: '/pages/zengzhi/pos/postOrder?type=2'
			});
		},
		getCountPosUserScore: function(e){
			uni.gRequest.post(
				'swoft/api/pos/getCountPosUserScore',
				{
					data: {
						uid: uni.getStorageSync('userInfo').id,
						type: e
					}
				}, 
				(res) => {
					if(res.code == 0){
						if(e == 0){
							_this.score0 = res.data;
						}else if(e == 1){
							_this.score1 = res.data;
						}else if(e == 2){
							_this.score2 = res.data;
						}
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
		getPosGoodsList: function(){
			_this.pageLoading = true;
			uni.gRequest.post(
				'swoft/api/pos/getPosGoodsList',
				{
					data: {
						page: 1,
						limit: 10
					}
				}, 
				(res) => {
					if(res.code == 0){
						_this.list = res.data.data;
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
		navBack(){
			uni.gJS.back();
		},
		getConfigField: function(){
			uni.gRequest.post(
				'swoft/api/config/getConfigField',
				{
					data: {
						field: 'posScoreRule'
					}
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
				true,
				true
			);
		},
	}
}
</script>
<style>
	@import url('@/static/css/li.css');
	page{background-color: #F5F5F9}
	.gui-header-leader-btns{width:68rpx; line-height:60rpx; font-size:50rpx; text-align:center; margin-left: 10rpx;}
	.roletext{position: absolute;bottom:70rpx;left:132rpx ;z-index: 99999;}
	.w400{width: 400rpx;}
	.h720{height:720rpx;}
	.w710{width: 710rpx;}
	.cFD2C55{color: #FD2C55;}
	.list-item{padding:26rpx 0 30rpx 0;}
	.plr40{padding-left: 40rpx;padding-right: 40rpx;}
	.pt40{padding-top: 40rpx;}
	.pb40{padding-bottom: 40rpx;}
	.mt46{margin-top:46rpx;}
	.mt50{margin-top:50rpx;}
	.f46{font-size: 46rpx;}
	.mt40{margin-top:40rpx;}
	.f50{font-size: 50rpx;}
	.f34{font-size: 34rpx;}
	.f30{font-size: 30rpx;}
	.lh100{line-height: 110rpx;}
	.h210{height: 210rpx;}
	.bgffc2a6-ffdfd1{background: linear-gradient(-90deg,#ffc2a6 0%, #ffdfd1 100%);}
	.cFF4F00{color:#FF4F00;}
	.qiandaoModal{background: url(@/static/images/setting/gzkuang.png) no-repeat left top; background-size: 100% auto; padding: 280rpx 100rpx 60rpx 100rpx;height:730rpx;}
	.img52{ width: 52rpx; height: 52rpx; margin: 0 auto;}
	.line{width:100%;border-top:thin solid #FF4F00;}
	.lineDot{width:6px;height:6px;border-radius:50%;position:absolute;left:50%;background-color:#FF4F00;top:-3px;}
	.buyBtn{width:180rpx;height:50rpx;line-height:50rpx;text-align:center;border-radius:10rpx;color:#FFFFFF;background-color:#FF4F00;font-size:26rpx;letter-spacing:6rpx;}
</style>
