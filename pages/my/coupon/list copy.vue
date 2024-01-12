<template>
	<gui-page :isLoading="pageLoading" ref="guiPage" :customHeader="true" style="background: #F5F5F5;">
		<view slot="gHeader">
			<view class="gui-flex gui-nowrap gui-rows gui-align-items-center">
				<view @tap="navBack" class="gui-header-leader-btns" hover-class="gui-tap">
					<text class="gui-icons">&#xe600;</text>
				</view>
				<view class="gui-flex1 gui-text-center">
					<text class="f36 gui-ellipsis" style="padding-left: 75px;">绿色积分</text>
				</view>
				<view class="pr30">
					<view class="f28" @click="$refs.msgModalrule.open();">规则</view>
				</view>
			</view>
		</view>
		<view slot="gBody">
			<scroll-view id="list" :scroll-y="true" :style="'height:'+mainHeight+'px;'" @scrolltolower="scrolltolower" style="padding: 30rpx 0;">
				<!-- <block v-for="(item,index) in couponList" :key="index">
					<navigator :url='"/pages/my/coupon/coupondetail?id=" + item' class="coupon-item">
						<view class="status">
							<block v-if="item == 4">待使用</block>
							<block v-if="item == 1">待生效</block>
							<block v-if="item == 2">待释放</block>
							<block v-if="item == 3">待领取</block>
						</view>
						<view style="width: 40%;">
							<view class="price">
								<view class="unit">￥</view>
								<block v-if="item == 4">{{ couponinfo.sum_money_valid }}</block>
								<block v-if="item == 1">{{ couponinfo.sum_money_no_valid }}</block>
								<block v-if="item == 2">{{ couponinfo.sum_money_no_release }}</block>
								<block v-if="item == 3">{{ couponinfo.sum_money_getting }}</block>
							</view>
						</view>
						<view class="rightbtn" :class="item == 3 || item == 4?'borAll':''" @click.stop="receiveFun(item)">
							<block v-if="item == 4">去使用</block>
							<block v-if="item == 1">待生效</block>
							<block v-if="item == 2">待释放</block>
							<block v-if="item == 3">立即领取</block>
						</view>
					</navigator>
				</block> -->
				<view class="coupon-item">
					<view class="coupon-item-l">
						积分余额
					</view>
					<view class="coupon-item-r">
						1000
					</view>
				</view>
				<view class="coupon-item">
					<view class="coupon-item-l">
						待确认
					</view>
					<view class="coupon-item-r">
						1000
					</view>
				</view>
				<view class="giveBtn" @click="giveFun">转赠</view>
				<view><navigator url="/pages/my/coupon/record" hover-class="" class="c999999 f26 fm mr20">使用记录</navigator></view>
				<gui-loadmore ref="loadmorecom"></gui-loadmore>
			</scroll-view>
			<gui-modal ref="msgModal" :isTitle="false" :canCloseByShade="false" :isCloseBtn="false" closeBtnStyle="color:#000000; font-size:28rpx;" :zIndex="999" bodyStyle="" width="665rpx">
				<view slot="content" class="msgbox">
					<form >
						<view class="gui-form-item gui-border-b list-item">
							<text class="gui-form-label f28">手机号</text>
							<view class="gui-form-body">
								<input type="number" :maxlength="11" class="gui-form-input gui-text-right" v-model="tel" name="tel" placeholder="请输入手机号" />
							</view>
						</view>
						<view class="gui-form-item gui-border-b list-item">
							<text class="gui-form-label f28">数量</text>
							<view class="gui-form-body">
								<input type="number" class="gui-form-input gui-text-right" v-model="numval" name="numval" placeholder="请输入数量" />
							</view>
						</view>
					</form>
					<view class="btnbox">
						<view class="font-btn btnbg1" @click="closeFun">取消</view>
						<view class="font-btn btnbg2" @click="doSubmit">确认</view>
					</view>
			    </view>				
			</gui-modal>
			
			<gui-modal ref="msgModalrule" :isTitle="false" :canCloseByShade="false" :isCloseBtn="false" closeBtnStyle="color:#000000; font-size:28rpx;" :zIndex="999" bodyStyle="" width="665rpx">
				<view slot="content">
					<view class="img52">
						<image class="img52" @tap="$refs.msgModalrule.close();" src="@/static/images/box/close.png" mode="widthFix"></image>
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
var _this;
export default {
	data() { 
		return {
			pageLoading: false,
			apiLoadingStatus: false,
			loadMoreTimer: null,
			userInfo: null,
			couponList: [4,1,2,3],
			mainHeight: 0,
			couponinfo: {},

			tel: '',
			numval: 0,
			rulePathImg: ''
		}
	},
	onLoad() {
		_this = this;
		_this.getPicConfigField('cashCouponRule');
	},
	onShow() {
		_this.userInfo = uni.getStorageSync('userInfo');
		_this.reload();
	},
	onReady() {
		setTimeout(function(){
			uni.gJS.select('#list', (res)=>{
				_this.mainHeight = uni.gJS.system().windowHeight - res.top;
			});	
		},500);
	},
	methods:{
		navBack(){
			uni.gJS.back();
		},
		reload: function(){
			_this.pageLoading = true;
			if(_this.$refs.loadmorecom != undefined){
				_this.$refs.loadmorecom.stoploadmore();
			}
			_this.getdata();
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
		getdata: function () {
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
		giveFun: function () {
			_this.$refs.msgModal.open();
		},
		closeFun: function () {
			_this.$refs.msgModal.close();
		},
		doSubmit: function() {
			var reg = /^1[0-9]{10,10}$/;
			if (_this.tel == '' || !reg.test(_this.tel)){
				_this.$refs.guiPage.openMessage('default','请输入正确的手机号',true,1500);
				return false
			}
			if(_this.numval <= 0 ) {
				_this.$refs.guiPage.openMessage('default','请输入转增数量',true,1500);
				return false
			}
			console.log(_this.tel)
			console.log(_this.numval)
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
	}
}
</script>
<style>
	@import url('@/static/css/li.css');
	.coupon-item{
		background: url(../../../static/images/coupon/bg-1.png) no-repeat center center;
		background-size: 100% 100%;
		width: 95%;
		margin: 0 auto;
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
	.coupon-item-l{
		width: 45%;
		text-align: center;
		font-size: 38rpx;
		font-weight: bold;
		color: #FF5E29;
		line-height: 200rpx;
	}
	.coupon-item-r{
		width: 45%;
		text-align: center;
		font-size: 60rpx;
		font-weight: bold;
		color: #FF5E29;
		line-height: 200rpx;
	}
	.giveBtn{
		width: 95%;
		margin: 30px auto 0;
		border-radius: 5px;
		background: #FF5E29;
		font-size: 18px;
		color: #fff;
		text-align: center;
		line-height: 45px;
	}
	.btnbox{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.font-btn{
		width: 45%;
		line-height: 35px;
		text-align: center;
		font-size: 16px;
		color: #FF5E29;
		background: #fff;
		border: 1px solid #FF5E29;
		border-radius: 5px;
	}
	.btnbg2{
		background: #FF5E29;
		color: #fff;
	}
	.img52{ width: 52rpx; height: 52rpx; margin: 0 auto;}
</style>
