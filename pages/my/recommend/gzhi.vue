<template>
	<gui-page :isLoading="pageLoading" ref='guiPage' :customHeader="true">
		<view slot="gHeader">
			<view class="gui-flex gui-nowrap gui-rows gui-align-items-center">
				<view @tap="navBack()" class="gui-header-leader-btns" hover-class="gui-tap">
					<text class="gui-icons">&#xe600;</text>
				</view>
				<view class="gui-flex1 gui-text-center">
					<text class="f36 gui-ellipsis">我的权证</text>
				</view>
				<view class="pr30">
					<view class="f28" @click="$refs.msgModal.open();">规则</view>
				</view>
			</view>
		</view>
		<view slot="gBody">
			<view class="gui-flex gui-align-items-center gui-space-between">
				<view class="bgffc2a6-ffdfd1 gui-border-radius card mt20 ml20 mr10 h210 gui-flex1">
					<view class="f28 pt40 plr40">我的权证</view>
					<view class="gui-flex gui-align-items-center gui-space-between mt40">
						<text class="cFF4F00 f50 plr40 fb" v-if="userInfo">{{userInfo.gValue}}</text>
						<view class="plr20" @click="$refs.guipopup2.open();gValue='';">
							 <text class="f28 gui-text">去兑换</text>
							 <text class="gui-icons	f28 gui-text">&#xe601;</text>
						</view>
					</view>
				</view>
				<view class="bgffc2a6-ffdfd1 gui-border-radius card mt20 ml10 mr20 h210 gui-flex1">
					<view class="f28 pt40 plr40 gui-text-center">待释放</view>
					<view class="gui-flex gui-align-items-center gui-justify-content-center mt40">
						<text class="cFF4F00 f50 plr40 fb">{{getGvalue}}</text>
					</view>
				</view>
			</view>
			<view class="gui-margin-top wp100 fb gui-relative">
				<gui-switch-navigation :items="[{id:0,name:'兑换明细'},{id:1,name:'奖励明细'}]" :width="750"
				@change="navchange" textAlign="center" :isCenter="true" activeDirection="center" :size="250" 
				activeLineBg="linear-gradient(to right, #FF4F00, #FF4F00)" activeColor="#000000" color="#000000"
				:margin="20" padding="30rpx" :activeFontWeight="400"
				activeLineHeight="6rpx" lineHeight="72rpx" activeLineWidth='220rpx' fontSize="34rpx" activeFontSize="34rpx">
				</gui-switch-navigation>
			</view>
			<scroll-view id="list" :scroll-y="true" :style="'height:'+mainHeight+'px;'" @scrolltolower="scrolltolower" class="gui-relative borderTop">
				<view class="w710 mlr20 ">
					<block v-for="(item,index) in productList" :key="index">
						<view v-if="navIndex == 0" class="list-item gui-flex gui-column gui-justify-content-center gui-relative borderBottom">
							<view class="gui-flex gui-align-items-center gui-space-between">
								<view class="">
									<view class="f28">{{item.from == 1 ? (item.yBean == 0 ? '平台赠送' : '数字能量兑换权证') : '福利购赠送'}}</view>
									<view class="f22 c99 mt20">{{item.created_at}}</view>
								</view>
								<view class="gui-text-right">
									<view v-if="item.status != 1" class="f24 mb10" :class="item.status == 0 ? 'cFF4F00' : 'c999999'">{{item.status == 0 ? '待入账' : '已失效'}}</view>
									<view class="cFF4F00 f30">+{{item.gValue}}权证</view>
								</view>
							</view>
						</view>
						<view v-else class="list-item gui-flex gui-column gui-justify-content-center gui-relative borderBottom">
							<view class="gui-flex gui-align-items-center gui-space-between">
								<view class="">
									<text class="f28">权证奖励-现金券</text>
									<view class="f22 c99 mt20">{{item.created_at}}</view>
								</view>
								<view class="gui-text-right">
									<view class="cFF4F00 f30 mt10">+{{item.cashcoupon}}</view>
								</view>
							</view>
						</view>
					</block>
				</view>
				<gui-empty v-if="isEmpty">
					<view slot="img" class="gui-flex gui-rows gui-justify-content-center">
						<image class="gui-empty-img" src="../../../static/images/empty.png"></image>
					</view>
				</gui-empty>
				<gui-loadmore ref="loadmorecom"></gui-loadmore>
			</scroll-view>
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
			<gui-popup ref="guipopup2" width="576" :canCloseByShade="false">
				<view class="gui-relative" v-if="yBeanConfig">
					<gui-image src="/static/images/setting/duihuan.png" :width="576"></gui-image>
					<view v-if="userInfo" class="duihuanPop">
						<view class="fb f42 mt298 gui-text-center">兑换权证</view>
						<view class="gui-padding gui-text-center">
							<input v-model="gValue" type="number" class="inputbox gui-border gui-border-radius-small f28 mt46" :placeholder="'最多可兑换'+Math.floor(userInfo.yBean/yBeanConfig.gChangeNum)+'权证'" >
						</view>
						<view class="f24 c99 gui-padding mt20">
							<view class="ml20">今日兑换比例：{{yBeanConfig.gChangeNum}}：1 </view>
							<view class="mt10 ml20">可用数字能量余额：{{userInfo.yBean}}</view>
						</view>
						<view class="gui-flex gui-align-items-center gui-space-around mt20">
							<view class="btn2 cff4f00 border-ff4f00 mt10 f32" @click="$refs.guipopup2.close()">取消</view>
							<view @tap="addGvalueRecord" class="btn1 cff bgff4f00 mt10 f32">确定</view>
						</view>
					</view>
				</view>
			</gui-popup>
		</view>
	</gui-page>
</template>
<script>
var page = 1;
var totalPage = 0;
var _this;
var graceChecker = require("@/GraceUI5/js/checker.js");
export default {
	data() { 
		return {
			pageLoading: false,
			apiLoadingStatus: false,
			loadMoreTimer: null,
			isEmpty: false,
			productList: [],
			mainHeight: 0,
			userInfo: null,
			rules: '',
			yBeanConfig: null,
			gValue: '',
			navIndex: 0,
			rulePathImg: '',
			getGvalue: 0
		}
	},
	onLoad() {
		_this = this;
		_this.getGValueRule();
		_this.getYBeanConfig();
		_this.reload();
		_this.getPicConfigField('gValueRule');
		_this.getGetGValue();
		getApp().readMsgNum(10);
	},
	onShow() {
		_this.getUserInfo();
	},
	onReady() {
		setTimeout(function(){
			uni.gJS.select('#list', (res)=>{
				_this.mainHeight = uni.gJS.system().windowHeight - res.top;
			});
		},500);
	},
	methods:{
		getGetGValue() {
			uni.gRequest.post(
				'swoft/api/fuligou/getGetGValue',
				{
					data: {
						uid: uni.getStorageSync('userInfo').id
					}
				}, 
				(res) => {
					if(res.code == 0){
						_this.getGvalue = res.data;
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
		scrolltolower: function(){
			if(_this.apiLoadingStatus){ return; }
			if(_this.loadMoreTimer != null){clearTimeout(_this.loadMoreTimer);}
			_this.loadMoreTimer = setTimeout(() => {
				if(_this.$refs.loadmorecom.loadMoreStatus != 0){ return ;}
				_this.$refs.loadmorecom.loading();
				_this.getdata();
			},80);
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
			let url = '';
			let postData = {};
			postData.uid = uni.getStorageSync('userInfo').id;
			postData.page = page;
			postData.limit = 20;
			if(_this.navIndex == 0){
				url = 'swoft/api/user/getGvalueRecordList';
			}else{
				url = 'swoft/api/user/getCashcouponRecordList';
				postData.from = 1;
			}
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
		},
		getUserInfo: function(){
			uni.gRequest.post(
				'swoft/api/user/getUserInfo',
				{
					data: {
						id: uni.getStorageSync('userInfo').id
					}
				}, 
				(res) => {
					if(res.code == 0){
						_this.userInfo = res.data;
						uni.setStorageSync('userInfo',res.data);
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
		navBack() {
			uni.gJS.back();
		},
		getGValueRule: function(){
			uni.gRequest.post(
				'swoft/api/config/getGValueRule',
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
				true,
				true
			);
		},
		getYBeanConfig: function(){
			uni.gRequest.post(
				'swoft/api/config/getYBeanConfig',
				{
					data: {}
				}, 
				(res) => {
					if(res.code == 0){
						_this.yBeanConfig = res.data;
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
		navchange(e) {
			if(_this.navIndex != e){
				_this.navIndex = e;
				_this.reload();
			}
		},
		addGvalueRecord: function(){
			var formData = {};
			formData.uid = uni.getStorageSync('userInfo').id;
			formData.gValue = _this.gValue;
			var rule = [
				{name: "gValue", checkType: "notnull", checkRule: "", errorMsg: "请输入兑换权证"},
				{name: "gValue", checkType: "int", checkRule: "1,8", errorMsg: "请输入大于0的整数"},
			];
			var checkRes = graceChecker.check(formData, rule);
			if(!checkRes){
				_this.$refs.guiPage.openMessage('default',graceChecker.error,true,1500);
				return false;
			}
			formData.gValue = Number(formData.gValue);
			let max = Math.floor(_this.userInfo.yBean/_this.yBeanConfig.gChangeNum);
			if(formData.gValue > max){
				_this.$refs.guiPage.openMessage('default',"最多可兑换"+max+"权证",true,1500);
				return false;
			}
			formData.uid = uni.getStorageSync('userInfo').id;
			formData.yBean = formData.gValue*_this.yBeanConfig.gChangeNum;
			formData.eachMvalue = _this.yBeanConfig.gChangeNum;
			_this.pageLoading = true;
			uni.gRequest.post(
				'swoft/api/user/addGvalueRecord',
				{
					data: formData
				}, 
				(res) => {
					if(res.code == 0){
						_this.$refs.guiPage.openMessage('success','兑换成功',true,1500);
						_this.$refs.guipopup2.close();
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
	.gui-header-leader-btns{width:68rpx; line-height:60rpx; font-size:50rpx; text-align:center; margin-left: 10rpx;}
	.inputbox{height:90rpx;width: 513rpx;line-height: 90rpx;}
	.duihuanPop{position: absolute;top: 0;left: 0;width: 576rpx;height: 753rpx;}
	.roletext{position: absolute;bottom:70rpx;left:132rpx ;z-index: 99999;}
	.w400{width: 400rpx;}
	.h200{height:200rpx;}
	.h720{height:720rpx;}
	.w710{width: 710rpx;}
	.cFD2C55{color: #FD2C55;}
	.list-item{padding:26rpx 0 30rpx 0;}
	.plr40{padding-left: 40rpx;padding-right: 40rpx;}
	.pt40{padding-top: 40rpx;}
	.pb40{padding-bottom: 40rpx;}
	.mt46{margin-top:46rpx;}
	.mt298{margin-top:298rpx;}
	.mt50{margin-top:50rpx;}
	.f46{font-size: 46rpx;}
	.mt40{margin-top:40rpx;}
	.f50{font-size: 50rpx;}
	.f42{font-size: 42rpx;}
	.f34{font-size: 34rpx;}
	.f30{font-size: 30rpx;}
	.lh100{line-height: 110rpx;}
	.h210{height: 210rpx;}
	.bgffc2a6-ffdfd1{background: linear-gradient(-90deg,#ffc2a6 0%, #ffdfd1 100%);}
	.cFF4F00{color:#FF4F00;}
	.qiandaoModal{background: url(@/static/images/setting/gzkuang.png) no-repeat left top; background-size: 100% auto; padding: 280rpx 100rpx 60rpx 100rpx;height:730rpx;}
	.img52{ width: 52rpx; height: 52rpx; margin: 0 auto;}
</style>
