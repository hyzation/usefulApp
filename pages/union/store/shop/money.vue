<template>
	<gui-page :isLoading="pageLoading" ref='guiPage' :customHeader="true">
		<view slot="gHeader">
			<view class="gui-flex gui-nowrap gui-rows gui-align-items-center">
				<view @tap="navBack" class="gui-header-leader-btns" hover-class="gui-tap">
					<text class="gui-icons">&#xe600;</text>
				</view>
				<view class="gui-flex1 gui-text-center">
					<text class="f36 gui-ellipsis">营业流水</text>
				</view>
				<view class="pr30">
					<view class="f28" @click="goCashout">提现</view>
                </view>
			</view>
		</view>
		<view slot="gBody">
			<view class="bgffc2a6-ffdfd1 gui-border-radius card mt20 mlr20 mb10">
				<view class="lh100 gui-flex gui-align-items-center gui-space-between"><text class="f34 plr20 ml20">总金额</text> <text class="cFF4F00 f50 plr20 fb">{{total_income}}</text></view>
			</view>
			<view class="w710 mlr20 mt30 pb30 gui-relative borderBottom">
				<view class="gui-flex gui-align-items-center gui-space-between">
					<view class=""><text class="f34 fb">流水明细</text></view>
				</view>
			</view>
			<scroll-view id="list" :scroll-y="true" :style="'height:'+mainHeight+'px;'" @scrolltolower="scrolltolower">
				<view class="w710 mlr20">
					<view v-for="(item,index) in productList" :key="index" class="list-item gui-flex gui-column gui-justify-content-center gui-relative borderBottom">
						<view class="gui-flex gui-align-items-center gui-space-between">
							<view>
                                <view class="f22 c99 mt20">{{item.totalPrice}}</view>
							</view>
							<view class="gui-text-right">
								<view class="f30">{{ item.created_at }}</view>
							</view>
						</view>
					</view>
				</view>
				<gui-empty v-if="productList.length == 0">
					<view slot="img" class="gui-flex gui-rows gui-justify-content-center">
						<image class="gui-empty-img" src="../../../../static/images/empty.png"></image>
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
			<gui-action-sheet :height="1110" :canCloseByShade="true" listColor="#FF4F00" ref="guiactionsheet" @selected="selected" title="请选择类别" :items="actionSheetItems"></gui-action-sheet>
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
			apiLoadingStatus: false,
			loadMoreTimer: null,
			isEmpty: false,
			productList: [],
            total_income: '',
			mainHeight: 0,
			userInfo: null,
			rules: '',
			cate: 0,
			actionSheetItems: [
				{id: 0,title: '全部'},
				{id: 1,title: '消费返点'},
				{id: 2,title: '分享收益'},
				{id: 3,title: '邀请奖励'},
				{id: 4,title: '签到任务'},
				{id: 5,title: '发帖奖励'},
				{id: 6,title: '货源奖励'},
				{id: 7,title: '兑换权证'},
				{id: 8,title: '兑换抵用券'},
				{id: 9,title: '转帖奖励'},
			],
			rulePathImg: ''
		}
	},
	filters:{
		comeFrom(e) {
			let name = '';
			switch(e){
				case 1: name = '消费返点'; break;
				case 2: name = '分享收益'; break;
				case 3: name = '邀请奖励'; break;
				case 4: name = '签到任务'; break;
				case 5: name = '发帖奖励'; break;
				case 6: name = '货源奖励'; break;
				case 7: name = '兑换权证'; break;
				case 8: name = '兑换抵用券'; break;
				case 9: name = '转帖奖励'; break;
			}
			return name;
		},
		comeFrom2(e) {
			let name = '';
			switch(e){
				case 1: name = '自营'; break;
				case 2: name = 'CPS'; break;
				case 3: name = '拼多多'; break;
				case 4: name = '淘宝'; break;
				case 5: name = '饿了么'; break;
				case 6: name = 'POS支付'; break;
				case 7: name = '快捷支付'; break;
				case 8: name = '法务业务'; break;
				case 10: name = '福利购'; break;
				case 11: name = '乐惠商城'; break;
				case 13: name = '话费/电费充值'; break;
			}
			return name;
		}
	},
	onLoad() {
		_this = this;
		_this.getYBeanRule();
		_this.reload();
		_this.getPicConfigField('yBeanRule');
		getApp().readMsgNum(9);
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
        goCashout (){
            uni.navigateTo({
                url: '/pages/union/store/shop/cashout'
            })
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
				'swoft/api/shop/shopflow',
				{
					data: {
						shop_id: uni.getStorageSync('userInfo').shop_info.id
					},
				},
				(res) => {
					if(res.code == 100000){
						_this.productList = _this.productList.concat(res.data.list);
						_this.total_income = res.data.total_income;
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
		getYBeanRule: function(){
			uni.gRequest.post(
				'swoft/api/config/getYBeanRule',
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
		navBack(){
			uni.gJS.back();
		}
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
	.mw500{max-width:500rpx;}
</style>
