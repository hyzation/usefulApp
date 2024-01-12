<template>
	<gui-page :isLoading="pageLoading" ref='guiPage' :customHeader="true">
		<view slot="gHeader">
			<view class="gui-flex gui-nowrap gui-rows gui-align-items-center">
				<view @tap="navBack()" class="gui-header-leader-btns" hover-class="gui-tap">
					<text class="gui-icons">&#xe600;</text>
				</view>
				<view class="gui-flex1 gui-text-center">
					<text class="f36 gui-ellipsis">积分钱包</text>
				</view>
				<view class="pr30">
					<view class="f28" @click="$refs.msgModal.open();">规则</view>
				</view>
			</view>
		</view>
		<view slot="gBody">
			<view class="bgffc2a6-ffdfd1 gui-border-radius card mt20 mlr20 h210">
				<view class="f28 pt40 plr40">积分余额</view>
				<view class="gui-flex gui-align-items-center gui-space-between mt50">
					<text class="cFF4F00 f50 plr40 fb" v-if="userInfo">{{userInfo.score}}</text>
					<view class="plr20" @click="$refs.guipopup2.open();gValue='';">
						 <text class="f28 gui-text">去兑换</text>
						 <text class="gui-icons	f28 gui-text">&#xe601;</text>
					</view>
				</view>
			</view>
			<view class="mt20 mlr20 gui-flex gui-align-items-center gui-space-between pb20">
				<view class="card_ card_l">
					<view class="c5F0900 fb f28 ml30 mt30">福利积分（开箱释放）</view>
					<view class="c8C4C3B fb f50 ml30 mt30">{{getScore1}}</view>
				</view>
				<view class="card_ card_r">
					<view class="c5F0900 fb f28 ml30 mt30">活跃积分（分享释放）</view>
					<view class="c8C4C3B fb f50 ml30 mt30">{{getScore2}}</view>
				</view>
			</view>
			<view class="bgF5F5F9 h20"></view>
			<view class="mt16 fb gui-relative">
				<gui-switch-navigation :items="navList" :width="750"
				@change="navchange" :currentIndex="navIndex" textAlign="center" :isCenter="true" activeDirection="center" :size="250" 
				activeLineBg="linear-gradient(to right, #FF4F00, #FF4F00)" activeColor="#000000" color="#000000"
				:margin="20" padding="30rpx" :activeFontWeight="400"
				activeLineHeight="6rpx" lineHeight="72rpx" activeLineWidth='220rpx' fontSize="34rpx" activeFontSize="34rpx">
				</gui-switch-navigation>
			</view>
			<scroll-view id="list" :scroll-y="true" :style="'height:'+mainHeight+'px;'" @scrolltolower="scrolltolower" class="gui-relative borderTop">
				<view class="w710 mlr20 ">
					<block v-for="(item,index) in productList" :key="index">
						<view class="list-item gui-flex gui-column gui-justify-content-center gui-relative borderBottom">
							<view class="gui-flex gui-align-items-center gui-space-between">
								<view class="">
									<view class="f28"><block v-if="item.from == 5">{{item.days}}天</block>{{item.from|comeFrom}}<block v-if="item.from == 4">{{item.days}}天</block><text v-if="item.flgOrderId != 0" class="f22">（订单号：{{item.orderNum}}）</text></view>
									<block v-if="item.from == 6">
										<view class="f22 pt10 mt6 mw500 gui-ellipsis">{{item.fromUserInfo.nickname}}（ID：{{item.fromUserInfo.no}}）</view>
										<view class="f22 c99 mt10">{{item.created_at}}</view>
									</block>
									<block v-else>
										<view class="f22 c99 mt20">{{item.created_at}}</view>
									</block>
								</view>
								<view class="gui-text-right">
									<view v-if="item.status != 1" class="f24 mb10" :class="item.status == 0 ? 'cFF4F00' : 'c999999'">{{item.status == 0 ? '待入账' : '已失效'}}</view>
									<view class="f30" :class="item.type == 1 ? 'cFF4F00' : 'c999999'">{{item.type == 1 ? '+' : '-'}}{{item.score}}</view>
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
					<scroll-view :scroll-y="true" class="xztcScroll">
						<view class="xztc gui-flex gui-justify-content-center gui-align-items-start">
							<image mode="widthFix" :src="rulePathImg"></image>
						</view>
					</scroll-view>
			    </view>				
			</gui-modal>
			<gui-popup ref="guipopup2" width="576" :canCloseByShade="false">
				<view class="gui-relative">
					<gui-image src="/static/images/setting/duihuan.png" :width="576"></gui-image>
					<view v-if="userInfo" class="duihuanPop">
						<view class="mt280 plr30 pt30 gui-flex gui-align-items-center gui-space-between">
							<view class="dhbtn gui-flex gui-align-items-center gui-space-between f28" @tap="changeType(1)" :class="type == 1 ? 'dhbtnSed' : ''">
								<text>兑换现金券</text>
								<text class="gui-icons">{{type == 1 ? '&#xe7f8;' : '&#xe762;'}}</text>
							</view>
							<view class="dhbtn gui-flex gui-align-items-center gui-space-between f28" @tap="changeType(2)" :class="type == 2 ? 'dhbtnSed' : ''">
								<text>兑换余额</text>
								<text class="gui-icons">{{type == 2 ? '&#xe7f8;' : '&#xe762;'}}</text>
							</view>
						</view>
						<view class="gui-padding gui-text-center mt30">
							<input v-model="gValue" type="number" class="inputbox gui-border gui-border-radius-small f28" placeholder="请输入兑换金额" >
						</view>
						<view class="f24 c99 gui-padding mt30">
							<!-- <view class="ml20">今日兑换比例：{{changeNum}}：1 </view> -->
							<view class="mt10 ml20">可用积分余额：{{userInfo.score}}</view>
						</view>
						<view class="gui-flex gui-align-items-center gui-space-around mt40">
							<view class="btn2 cff4f00 border-ff4f00 mt10 f32" @click="$refs.guipopup2.close()">取消</view>
							<view @tap="changeScore" class="btn1 cff bgff4f00 mt10 f32">确定</view>
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
			scoreConfig: null,
			gValue: '',
			navList: [{id: 1, name: '奖励明细'}, {id: -1, name: '兑换明细'}],
			navIndex: 0,
			rulePathImg: '',
			type: 1,
			getScore1: 0,
			getScore2: 0,
			changeNum: 0
		}
	},
	filters:{
		comeFrom(e) {
			let name = '';
			switch(e){
				case 1: name = '待释放福利积分'; break;
				case 2: name = '待释放活跃积分'; break;
				case 3: name = '开箱奖励'; break;
				case 4: name = '累计开箱奖励'; break;
				case 5: name = '返还'; break;
				case 6: name = '活跃奖励'; break;
				case 7: name = '兑换现金券'; break;
				case 8: name = '兑换余额'; break;
			}
			return name;
		}
	},
	onLoad() {
		_this = this;
		_this.getGValueRule();
		_this.getScoreConfig();
		_this.reload();
		_this.getPicConfigField('scoreRule');
		getApp().readMsgNum(11);
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
		getGetScore() {
			uni.gRequest.post(
				'swoft/api/fuligou/getGetScore',
				{
					data: {
						uid: uni.getStorageSync('userInfo').id
					}
				}, 
				(res) => {
					if(res.code == 0){
						_this.getScore1 = res.data.getScore1;
						_this.getScore2 = res.data.getScore2;
					}
				},
				(error) => {},
				(res) => {},
				true,
				true
			);
		},
		changeType(e) {
			_this.type = e;
			_this.gValue = '';
			if(e == 1){
				_this.changeNum = _this.scoreConfig.n1;
			}else{
				_this.changeNum = _this.scoreConfig.n2;
			}
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
			uni.gRequest.post(
				'swoft/api/fuligou/getScoreRecordList',
				{
					data: {
						page: page,
						limit: 20,
						uid: uni.getStorageSync('userInfo').id,
						type: _this.navList[_this.navIndex].id
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
						_this.getGetScore();
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
		getScoreConfig: function(){
			uni.gRequest.post(
				'swoft/api/fuligou/getScoreConfig',
				{
					data: {}
				}, 
				(res) => {
					if(res.code == 0){
						_this.scoreConfig = res.data;
						_this.changeNum = res.data.n1;
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
		changeScore: function(){
			var formData = {};
			formData.uid = uni.getStorageSync('userInfo').id;
			formData.gValue = _this.gValue;
			var rule = [
				{name: "gValue", checkType: "notnull", checkRule: "", errorMsg: "请输入兑换"+(_this.type == 1 ? '现金券' : '余额')},
				{name: "gValue", checkType: "int", checkRule: "1,8", errorMsg: "请输入大于0的整数"},
			];
			var checkRes = graceChecker.check(formData, rule);
			if(!checkRes){
				_this.$refs.guiPage.openMessage('default',graceChecker.error,true,1500);
				return false;
			}
			formData.gValue = Number(formData.gValue);
			formData.type = _this.type;
			let max = Math.floor(_this.userInfo.score/_this.changeNum);
			if(formData.gValue > max){
				_this.$refs.guiPage.openMessage('default',"最多可兑换"+max+(_this.type == 1 ? '现金券' : '余额'),true,1500);
				return false;
			}
			formData.uid = uni.getStorageSync('userInfo').id;
			formData.score = formData.gValue*_this.changeNum;
			formData.changeNum = _this.changeNum;
			_this.pageLoading = true;
			uni.gRequest.post(
				'swoft/api/fuligou/changeScore',
				{
					data: formData
				}, 
				(res) => {
					if(res.code == 0){
						_this.$refs.guiPage.openMessage('success','兑换成功',true,1500);
						_this.$refs.guipopup2.close();
						setTimeout(function(){
							_this.getUserInfo();
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
	.card_{width:345rpx;height:200rpx;overflow:hidden;}
	.card_l{background: url(@/static/images/score/score1.png) no-repeat;background-size:cover;}
	.card_r{background: url(@/static/images/score/score2.png) no-repeat;background-size:cover;}
	.mt280{margin-top:280rpx;}
	.dhbtn{width:180rpx;height:80rpx;border:1px solid #999999;border-radius:10rpx;color:#999999;padding:0 30rpx;}
	.dhbtnSed{border-color:#FF4F00;color:#FF4F00;}
	.mw500{max-width:500rpx;}
</style>
