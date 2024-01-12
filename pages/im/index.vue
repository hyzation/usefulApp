<template>
    <gui-page :isLoading="pageLoading" :customHeader="true" statusBarStyle="background-color:#FF4F00;" headerStyle="background-color:#FF4F00;" ref="guiPage">
		<view slot="gHeader">
			<view class="gui-flex gui-nowrap gui-rows gui-align-items-center gui-space-between">
				<view style="width:220rpx;"></view>
				<text class="f32">信息</text>
				<view class="gui-flex gui-align-items-center gui-justify-content-end" style="width:220rpx;">
					<!-- <view @tap="noOpen" class="wh34" hover-class=""><image class="wp100 hp100" mode="aspectFit" src="../../static/images/zheng/msg2.png"></image></view> -->
					<navigator url="/pages/my/signIn" class="wh34 ml36" hover-class=""><image class="wp100 hp100" mode="aspectFit" src="../../static/images/zheng/sign.png"></image></navigator>
					<navigator url="/pages/my/setting/setting" class="wh34 mr20 ml36" hover-class=""><image class="wp100 hp100" mode="aspectFit" src="../../static/images/zheng/set2.png"></image></navigator>
				</view>
			</view>
		</view>
        <view>信息</view>
	</gui-page>
</template>

<script>
// #ifdef APP-PLUS || H5
import { TUIChatKit, genTestUserSig } from "../../TUIKit/";
import { vueVersion } from "../../TUIKit/adapter-vue";
import { TUILogin } from "@tencentcloud/tui-core";
// #endif
// 必填信息
const config = {
  userID: "", //User ID                                 1. 用户的账号
  SDKAppID: 1600011648, // Your SDKAppID                         2. 腾讯im的SDKAppId
  secretKey: "=3bbaf86f10908064ca984c6d4c1e3f1fb8485df4107aed454e66e9c2bf9fe209", // Your secretKey
};
// uni.$chat_userID = config.userID;
uni.$chat_SDKAppID = config.SDKAppID;
uni.$chat_secretKey = config.secretKey;

// #ifdef APP-PLUS || H5
// uni.$chat_userSig = genTestUserSig(config).userSig;
// TUIChatKit 初始化
TUIChatKit.init();
// #endif
export default {
	data() { 
		return {
			pageLoading: false,
		}
	},
	globalData: {
		tempFilePath: ''
	},
	onLaunch: function() {
	},
	onShow: function() {
		this.geteSign()
    },
	onHide: function() {},
	methods: {
		geteSign: function () {
			const _this = this
			uni.gRequest.post(
				'/swoft/api/user/getImUserInfo',
				{
				data: {
					uid: uni.getStorageSync('userInfo').id,
				}
				}, 
				(res) => {
					if(res.data) {
						config.userID = res.data.im_user_id
						uni.$chat_userID = res.data.im_user_id
						uni.$chat_userSig = res.data.im_user_sign
						_this.login()
					}
				},
				(error) => {
					_this.$refs.guiPage.openMessage('default','请求错误',true,1500);
				},
				(res) => {
					_this.apiLoadingStatus = false;
					_this.pageLoading = false;
					if(res.code == 3){
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
		login() {
			// #ifdef APP-PLUS || H5
			// TUICore login
			TUILogin.login({
				SDKAppID: uni.$chat_SDKAppID,
				userID: uni.$chat_userID,
				// UserSig 是用户登录即时通信 IM 的密码，其本质是对 UserID 等信息加密后得到的密文。
				// 该方法仅适合本地跑通 Demo 和功能调试，详情请参见 https://cloud.tencent.com/document/product/269/32688     
				userSig: uni.$chat_userSig, 
				// 如果您需要发送图片、语音、视频、文件等富媒体消息，请设置为 true
				useUploadPlugin: true,
				// 本地审核可识别、处理不安全、不适宜的内容，为您的产品体验和业务安全保驾护航
				// 此功能为增值服务，请参考：https://cloud.tencent.com/document/product/269/79139
				// 如果您已购买内容审核服务，开启此功能请设置为 true
				useProfanityFilterPlugin: false,
				framework: `vue${vueVersion}` // 当前开发使用框架 vue2 / vue3
			});
			// #endif
			
			setTimeout(function(){
				uni.reLaunch({
					url: '/TUIKit/components/TUIContact/index'
				})
			},1500);
		},
	}
}
</script>

<style>
</style>