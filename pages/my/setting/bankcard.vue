<template>
	<gui-page :isLoading="pageLoading" ref="guiPage">
		<view slot="gBody" class="fullPage gui-flex gui-justify-content-center gui-align-items-center fm">
			<view class="bgFFFFFF view6 gui-relative borderTop fb gui-flex gui-align-items-center">
				<gui-switch-navigation :items="navItems" @change="navchange" color="#000000" :currentIndex="currentIndex" 
				activeLineBg="linear-gradient(to right, #FF4F00, #FF4F00)"
				activeColor="#FF4F00" :isCenter="true" activeDirection="center" :activeFontWeight="400"
				activeLineWidth="70%" :size="0" padding="90rpx" :width="750"></gui-switch-navigation>
			</view>
			<!--  #ifdef APP-PLUS -->
			<view class="h100"></view>
			<!--  #endif -->
			<!--  #ifdef H5 -->
			<view class="h30"></view>
			<!--  #endif -->
			<view v-if="isEmpty" style="margin-top:-200rpx;"><gui-image src="../../../static/images/noData.png" :width="396" :height="226" :timer="0"></gui-image></view>
			<view v-else class="hp100 wp100">
				<!--  #ifdef APP-PLUS -->
				<view class="h100"></view>
				<!--  #endif -->
				<!--  #ifdef H5 -->
				<!-- <view class="h30"></view> -->
				<view class="h100"></view>
				<!--  #endif -->
				<block v-if="list.length > 0">
					<block v-for="(item,index) in list" :key="index">
						<view class="bgfd5762_ff7566 gui-border-radius card mt20 mlr20 gui-relative">
							<text class="del gui-icons gui-absolute-rt" @tap="remove(item)">&#xe62a;</text>
							<view class="cff f34 plr40 pt40 gui-flex gui-align-items-center gui-space-between">{{status == 1 ? item.bankName : item.creditCardBank}}</view>
							<view class="f24 cff mt20 plr40">{{status == 1 ? '储蓄' : '信用'}}卡</view>
							<view class="gui-flex gui-space-between gui-align-items-end mt46 plr40 pb40">
								<view class="f46 cff">{{(status == 1 ? item.bankCardNumber : item.creditCardCode)|dealBankCardNumber}}</view>
								<view v-if="item.isDefault == 1" class="f24 cFFFFFF">使用中</view>
								<view @tap="userBankActive(item)" v-else class="orderBtn2_">使用该卡</view>
							</view>
						</view>
					</block>
				</block>
				<gui-modal ref="guimodal" :isCloseBtn="false" title="操作提示">
					<view slot="content" class="plt30tb40 gui-bg-gray">
						<view class="gui-text-center f30 fm">确定要删除该{{status == 1 ? '储蓄' : '信用'}}卡吗？</view>
					</view>
					<view slot="btns" class="gui-flex gui-rows gui-space-around">
						<view class="modal-btns" @tap="$refs.guimodal.close()">
							<text class="c999999 fb">取消</text>
						</view>
						<view class="modal-btns" @tap="doRemove">
							<text class="cFF4F00 fb">确认</text>
						</view>
					</view>
				</gui-modal>
			</view>
			<view style="height:150rpx;"></view>
			<view @tap="navToUrl" class="wp100 ptb20 mt20 gui-fixed-rb bgFFFFFF">
				<view class="btns f30 fb">添加{{status == 1 ? '储蓄' : '信用'}}卡</view>
			</view>
		</view>
	</gui-page>
</template>
<script>
var _this;	
export default {
	data() { 
		return {
			pageLoading: false,
			list: [],
			isEmpty: false,
			item: null,
			currentIndex: 0,
			status: 1,
			navItems: [
				{name: '储蓄卡',status: 1},
				{name: '信用卡',status: 2}
			],
		}
	},
	onLoad() {
		_this = this;
	},
	onShow() {
		_this.getUserBankList();
	},
	filters:{
		dealBankCardNumber (account){
			if(account){
				account = account.substring(0,4)+' **** **** '+account.substring(account.length-4);
				return account;
			}
		}
	},
	methods:{
		navchange:function(index){
			if(_this.currentIndex != index){
				_this.currentIndex = index;
				_this.status = _this.navItems[index].status;
				_this.getUserBankList();
			}
		},
		remove: function(e){
			_this.item = e;
			_this.$refs.guimodal.open();
		},
		doRemove: function(){
			let url = '';
			if(_this.status == 1){
				url = 'swoft/api/user/userBankActive';
			}else{
				url = 'swoft/api/user/userCreditBankActive';
			}
			_this.pageLoading = true;
			uni.gRequest.post(
				url,
				{
					data: {
						uid: uni.getStorageSync('userInfo').id,
						id: _this.item.id,
						status: -1
					}
				}, 
				(res) => {
					if(res.code == 0){
						_this.$refs.guimodal.close();
						_this.$refs.guiPage.openMessage('success','删除成功',true,1500);
						setTimeout(function(){
							_this.getUserBankList();
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
		userBankActive: function(e){
			let url = '';
			if(_this.status == 1){
				url = 'swoft/api/user/userBankActive';
			}else{
				url = 'swoft/api/user/userCreditBankActive';
			}
			_this.pageLoading = true;
			uni.gRequest.post(
				url,
				{
					data: {
						uid: uni.getStorageSync('userInfo').id,
						id: e.id,
						isDefault: 1
					}
				}, 
				(res) => {
					if(res.code == 0){
						_this.$refs.guiPage.openMessage('success','设置成功',true,1500);
						setTimeout(function(){
							_this.getUserBankList();
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
		getUserBankList: function(){
			let url = '';
			if(_this.status == 1){
				url = 'swoft/api/user/getUserBankList';
			}else{
				url = 'swoft/api/user/getUserCreditBankList';
			}
			_this.pageLoading = true;
			uni.gRequest.post(
				url,
				{
					data: {
						uid: uni.getStorageSync('userInfo').id
					}
				}, 
				(res) => {
					if(res.code == 0){
						_this.list = res.data;
						if(res.data.length > 0){
							_this.isEmpty = false;
						}else{
							_this.isEmpty = true;
						}
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
		navToUrl: function(){
			if(_this.status == 1){
				uni.navigateTo({
					url: '/pages/my/setting/addbankcard'
				})
			}else{
				uni.navigateTo({
					url: '/pages/my/setting/addcreditcard'
				})
			}
		}
	}
}
</script>
<style>
	@import url('@/static/css/li.css');
	/*  #ifdef  APP-PLUS  */
	.view6{position:fixed;top:0;z-index:1;height:100rpx;}
	/*  #endif  */
	/*  #ifdef  H5  */
	.view6{position:fixed;top:80rpx;z-index:1;height:100rpx;}
	/*  #endif  */
	.h100{height:100rpx;}
	.orderBtn2_{width:120rpx;text-align:center;height:50rpx;line-height:50rpx;border-radius:25rpx;font-size:24rpx;margin-left:20rpx;border:thin solid #FFFFFF;color:#FFFFFF;}
	page{background-color: #F5F5F9}
	.plr40{padding-left: 40rpx;padding-right: 40rpx;}
	.pt40{padding-top: 40rpx;}
	.pb40{padding-bottom: 40rpx;}
	.mt46{margin-top:46rpx;}
	.f46{font-size: 46rpx;}
	.f34{font-size: 34rpx;}
	.btns{width:690rpx;height:90rpx;background: #ff4f00;border-radius: 45rpx;text-align: center;line-height: 90rpx;color: #fff;margin:0 auto;}
	.bgfd5762_ff7566{background-image: linear-gradient(-90deg,#fd5762 0%, #ff7566 100%)}
	.del{font-size:36rpx;top:20rpx;right:20rpx;color:#FFFFFF;}
</style>
