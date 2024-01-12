<template>
	<gui-page :isLoading="pageLoading" ref='guiPage' :customHeader="true">
		<view slot="gHeader">
			<view class="gui-flex gui-nowrap gui-rows gui-align-items-center">
				<view @tap="navBack" class="gui-header-leader-btns" hover-class="gui-tap">
					<text class="gui-icons">&#xe600;</text>
				</view>
				<view class="gui-flex1 gui-text-center">
					<text class="f36 gui-ellipsis">现金券</text>
				</view>
				<view class="pr30">
					<view class="f28" @click="$refs.msgModal.open();">规则</view>
				</view>
			</view>
		</view>
		<view slot="gBody">
			<view class="bgffc2a6-ffdfd1 gui-border-radius card mt20 mlr20 mb10">
				<view class="lh100 gui-flex gui-align-items-center gui-space-between"><text class="f34 plr20 ml20">现金券余额</text> <text class="cFF4F00 f50 plr20 fb">{{userInfo.cashCoupon}}</text></view>
			</view>
			<view class="w710 mlr20 mt30 pb30 gui-relative borderBottom">
				<view class="gui-flex gui-align-items-center gui-space-between">
					<view class=""><text class="f34 fb">增减明细</text><text class="f24 c99 ml20">展示最近6个月</text></view>
					<view @tap="$refs.guiactionsheet.open();" class="gui-flex gui-align-items-center gui-space-between">
						<gui-image :src="'/static/images/setting/shaixuan.png'" :width="32" :height="29"></gui-image>
						<text class="f24 c99 ml10">筛选</text>
					</view>
				</view>
			</view>
			<scroll-view id="list" :scroll-y="true" :style="'height:'+mainHeight+'px;'" @scrolltolower="scrolltolower">
				<view class="w710 mlr20">
					<view v-for="(item,index) in productList" :key="index" class="list-item gui-flex gui-column gui-justify-content-center gui-relative borderBottom">
						<view class="gui-flex gui-align-items-center gui-space-between">
							<view class="" style="width:500rpx;">
								<view class="f28">{{item.from|comeFrom}}<text v-if="item.from == 4 || item.from == 5 || item.from == 7 || item.from == 8" class="f22">（订单号：{{item.orderNum}}）</text></view>
								<view class="f22 mt10 line2 c999999" v-if="item.from == 3">{{item.title}}</view>
								<view class="f22 c99 mt20">{{item.created_at}}</view>
							</view>
							<view class="gui-text-right">
								<view class="f30 mt10" :class="item.type == 1 ? 'cff4f00' : 'c999999'">{{item.type == 1 ? '+' : '-'}}{{item.cashcoupon}}</view>
							</view>
						</view>
					</view>
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
			<gui-action-sheet :height="1010" :canCloseByShade="true" listColor="#FF4F00" ref="guiactionsheet" @selected="selected" title="请选择类别" :items="actionSheetItems"></gui-action-sheet>
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
			productList: [],
			mainHeight: 0,
			userInfo: null,
			rules: '',
			cate: 0,
			actionSheetItems: [
				{id: 0,title: '全部'},
				{id: 1,title: '权证奖励-数字能量'},
				{id: 2,title: '月度推广值达标'},
				{id: 3,title: '货源销售奖励'},
				{id: 4,title: '自营订单消费'},
				{id: 5,title: '自营订单退款'},
				{id: 6,title: '积分兑换'},
				{id: 7,title: '乐惠商城订单消费'},
				{id: 8,title: '乐惠商城订单退款'}
			],
			rulePathImg: ''
		}
	},
	filters:{
		comeFrom(e) {
			let name = '';
			switch(e){
				case 1: name = '权证奖励-数字能量'; break;
				case 2: name = '月度推广值达标'; break;
				case 3: name = '货源销售奖励'; break;
				case 4: name = '自营订单消费'; break;
				case 5: name = '自营订单退款'; break;
				case 6: name = '积分兑换'; break;
				case 7: name = '乐惠商城订单消费'; break;
				case 8: name = '乐惠商城订单退款'; break;
			}
			return name;
		}
	},
	onLoad() {
		_this = this;
		_this.getCashCouponRule();
		_this.reload();
		_this.getPicConfigField('cashCouponRule');
		getApp().readMsgNum(7);
	},
	onShow() {
		_this.userInfo = uni.getStorageSync('userInfo');
	},
	onReady() {
		setTimeout(function(){
			uni.gJS.select('#list', (res)=>{
				_this.mainHeight = uni.gJS.system().windowHeight - res.top;
			});	
		},500);
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
		selected: function(index){
			_this.cate = _this.actionSheetItems[index].id;
			_this.reload();
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
			uni.gRequest.post(
				'swoft/api/user/getCashcouponRecordList',
				{
					data: {
						uid: uni.getStorageSync('userInfo').id,
						from: _this.cate,
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
		},
		navBack(){
			uni.gJS.back();
		},
		getCashCouponRule: function(){
			uni.gRequest.post(
				'swoft/api/config/getCashCouponRule',
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
	}
}
</script>
<style>
	@import url('@/static/css/li.css');
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
</style>
