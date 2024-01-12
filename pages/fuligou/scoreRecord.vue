<template>
	<gui-page :isLoading="pageLoading" ref="guiPage">
		<view slot="gBody">
			<view class="bgffc2a6-ffdfd1 gui-border-radius card mt20 mlr20 h210 gui-flex gui-align-items-center gui-justify-content-center">
				<view class="f28 gui-text-center">累计开箱<text class="cFF4F00 f50 fb pl10 pr10">{{signInDaysSum}}</text>次</view>
			</view>
			<view class="bgF5F5F9 h20"></view>
			<scroll-view id="list" :scroll-y="true" :style="'height:'+mainHeight+'px;'" @scrolltolower="scrolltolower" class="gui-relative borderTop">
				<view class="w710 mlr20 ">
					<block v-for="(item,index) in productList" :key="index">
						<view class="list-item gui-flex gui-column gui-justify-content-center gui-relative borderBottom">
							<view class="gui-flex gui-align-items-center gui-space-between mt10">
								<view class="f26 c99">{{item.created_at}}</view>
								<view class="f30" :class="item.type == 1 ? 'cFF4F00' : 'c999999'">{{item.type == 1 ? '+' : '-'}}{{item.score}}</view>
							</view>
						</view>
					</block>
				</view>
				<gui-empty v-if="isEmpty">
					<view slot="img" class="gui-flex gui-rows gui-justify-content-center">
						<image class="gui-empty-img" src="../../static/images/empty.png"></image>
					</view>
				</gui-empty>
				<gui-loadmore ref="loadmorecom"></gui-loadmore>
			</scroll-view>
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
			flgOrderId: 0,
			signInDaysSum: 0
		}
	},
	onLoad(e) {
		_this = this;
		_this.flgOrderId = e.id;
		_this.signInDaysSum = e.signInDaysSum;
		_this.reload();
	},
	onShow() {

	},
	onReady() {
		setTimeout(function(){
			uni.gJS.select('#list', (res)=>{
				_this.mainHeight = uni.gJS.system().windowHeight - res.top;
			});
		},500);
	},
	methods:{
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
				'swoft/api/fuligou/getScoreRecordList',
				{
					data: {
						page: page,
						limit: 20,
						uid: uni.getStorageSync('userInfo').id,
						type: 1,
						from: 3,
						flgOrderId: _this.flgOrderId
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
	.card_{width:345rpx;height:200rpx;overflow:hidden;}
	.card_l{background: url(@/static/images/score/score1.png) no-repeat;background-size:cover;}
	.card_r{background: url(@/static/images/score/score2.png) no-repeat;background-size:cover;}
	.mt280{margin-top:280rpx;}
	.dhbtn{width:180rpx;height:80rpx;border:1px solid #999999;border-radius:10rpx;color:#999999;padding:0 30rpx;}
	.dhbtnSed{border-color:#FF4F00;color:#FF4F00;}
	.mw500{max-width:500rpx;}
</style>
