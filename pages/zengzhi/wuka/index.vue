<template>
	<gui-page :isLoading="pageLoading" ref='guiPage' :customHeader="true">
		<view slot="gHeader">
			<view class="gui-flex gui-nowrap gui-rows gui-align-items-center">
				<view style="width:90rpx;" class="gui-header-leader-btns" hover-class="gui-tap">
					<text @tap="navBack" class="gui-icons ml10">&#xe600;</text>
				</view>
				<view class="gui-flex1 gui-text-center">
					<text class="f36 gui-ellipsis">收款</text>
				</view>
				<view style="width:60rpx;" class="pr30 gui-flex gui-align-items-center gui-justify-content-end">
					<view class="f26" @click="$refs.guiactionsheet.open();">更多</view>
				</view>
			</view>
		</view>
		<view slot="gBody">
			<view class="ewmBox bgFF4F00 pt20">
				<view class="gui-text-center cFFFFFF f34 fm">收款</view>
				<view class="bgFFFFFF ewmBoxc pt30">
					<view class="gui-text-center f26 fm">长按输入金额</view>
					<view class="ewm">
						<canvas canvas-id="canvas" id="canvas" style="width:420rpx;height:420rpx;" @longpress="logoTime"></canvas>
					</view>
					<view @tap="navtoUrl" class="gui-text-center f30 fm cFF4F00 mt20">设置收款金额</view>
				</view>
			</view>
			<gui-action-sheet :height="430" :canCloseByShade="true" listColor="#FF4F00" ref="guiactionsheet" @selected="selected" title="更多" :items="actionSheetItems"></gui-action-sheet>
		</view>
	</gui-page>
</template>
<script>
var QRCode = require('@/GraceUI5/js/qrcode.js');
var _this;	
export default {
	data() { 
		return {
			pageLoading: false,
			actionSheetItems: [
				{id: 1,title: '收款记录'},
				{id: 2,title: '我的费率'},
				{id: 3,title: '银行限额表'},
			],
			// 二维码绘制对象
			qrcode        : null,
			// 二维码尺寸，单位 rpx
			qrcodeSize    : 420,
			// 二维码数据
			qrcodeContent : '20355472856847765035467308068943076',
			// 二维码背景颜色 [ 黑色兼容性更好 ]
			qrcodeBgColor : '#000000',
			// 二维码颜色
			qrcodeColor   : '#FFFFFF',
			// 画布 id
			qrcodeId      : 'canvas'
		}
	},
	onLoad() {
		_this = this;
	},
	onReady: function (options) {
		_this.pageLoading = true;
		setTimeout(()=>{
			this.qrcode = new QRCode(this.qrcodeId, {
				text         : this.qrcodeContent,
				width        : uni.upx2px(this.qrcodeSize),
				height       : uni.upx2px(this.qrcodeSize),
				colorDark    : this.qrcodeColor,
				colorLight   : this.qrcodeBgColor,
				correctLevel : QRCode.CorrectLevel.H
			});
			_this.pageLoading = false;
		},1000);
	},
	methods:{
		navBack(){
			uni.gJS.back();
		},
		selected: function(index){
			if(index == 0){
				uni.navigateTo({
					url: '/pages/zengzhi/wuka/record'
				})
			}else if(index == 1){
				uni.navigateTo({
					url: '/pages/home/content?type=myFee'
				})
			}else if(index == 2){
				uni.navigateTo({
					url: '/pages/home/content?type=bankMmoeney'
				})
			}
		},
		logoTime: function(){
			uni.redirectTo({
				url: '/pages/zengzhi/wuka/pay'
			})
		},
		navtoUrl: function(){
			uni.redirectTo({
				url: '/pages/zengzhi/wuka/pay'
			})
		}
	}
}
</script>
<style>
	page{background-color:#F8F8F8;}
	.gui-header-leader-btns{width:68rpx; line-height:60rpx; font-size:50rpx;}
	.ewmBox{width:600rpx;height:700rpx;border-radius:20rpx;margin:30% auto 0 auto;}
	.ewmBoxc{width:540rpx;height:570rpx;border-radius:20rpx;margin:20rpx auto 0 auto;}
	.ewm{width:420rpx;height:420rpx;margin:20rpx auto 0 auto;background-color:#FFFFFF;}
</style>
