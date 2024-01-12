<template>
	<gui-page :isLoading="pageLoading" :customHeader="true" statusBarStyle="background-color:#FF4F00;" headerStyle="background-color:#FF4F00;" ref="guiPage">
		<view slot="gHeader">
			<view class="gui-flex gui-nowrap gui-rows gui-align-items-center gui-space-between">
				<view style="width:220rpx;"></view>
				<text class="f32 cFFFFFF">个人中心</text>
				<view class="gui-flex gui-align-items-center gui-justify-content-end" style="width:220rpx;">
					<!-- <view @tap="noOpen" class="wh34" hover-class=""><image class="wp100 hp100" mode="aspectFit" src="../../static/images/zheng/msg2.png"></image></view> -->
					<navigator url="/pages/my/signIn" class="wh34 ml36" hover-class=""><image class="wp100 hp100" mode="aspectFit" src="../../static/images/zheng/sign.png"></image></navigator>
					<navigator url="/pages/my/setting/setting" class="wh34 mr20 ml36" hover-class=""><image class="wp100 hp100" mode="aspectFit" src="../../static/images/zheng/set2.png"></image></navigator>
				</view>
			</view>
		</view>
		<view slot="gBody">
			<view class="wp100" v-if="userInfo">
				<view class="bgFF4F00 wp100" style="height:260rpx;"></view>
				<view class="headBgBox pt30 pb30 pl10 pr10 gui-relative" style="margin-top:-260rpx;">
					<view class="gui-flex gui-align-items-center gui-space-between plr20">
						<gui-image :src="userInfo.headimgurl != 0 ? userInfo.headUrl : '../../static/images/zheng/user'+userInfo.gender+'.png'" :width="110" :height="110" :timer="0" borderRadius="55rpx"></gui-image>
						<view style="width:520rpx;" class="gui-flex gui-align-items-start gui-space-between">
							<view style="width:400rpx;">
								<view class="gui-ellipsis f32 fb cFFFFFF">{{userInfo.nickname != '' ? userInfo.nickname : '未设置昵称'}}</view>
								<view class="gui-ellipsis f26 fm mt10" style="color:#ede1ce;">ID: {{userInfo.no}}</view>
								<view class="gui-flex gui-align-items-center mt10">
									<block v-if="userInfo.signature == ''">
										<view @tap.stop="$refs.guipopupInfo.open()" class="gui-flex gui-align-items-center">
											<text class="f26 fm cFFFFFF mr14 gui-ellipsis">有没有用，签名来凑~</text>
											<gui-image src="../../static/images/zheng/edit.png" :width="22" :height="22" :timer="0"></gui-image>
										</view>
									</block>
									<block v-else>
										<view @tap.stop="$refs.guipopupInfo.open()" class="gui-flex gui-align-items-center">
											<text class="f26 fm cFFFFFF mr14 line2" style="max-width:360rpx;">个性签名: {{userInfo.signature}}</text>
											<gui-image src="../../static/images/zheng/edit.png" :width="22" :height="22" :timer="0"></gui-image>
										</view>
									</block>
								</view>
							</view>
							<view style="display:inline-block;">
								<gui-image style="margin:6rpx auto 0 auto;" :src="'../../static/images/zheng/level'+userInfo.level+'.png'" :width="100" :height="100" :timer="0"></gui-image>
								<view class="wp100 gui-text-center f24 fb color_" style="margin-top:-24rpx;">{{ vipinfo.name }}</view>
							</view>
						</view>
					</view>
					<!-- <view class="gui-flex gui-align-items-center gui-space-between plr20 gui-absolute-lb" style="left:10rpx;bottom:30rpx;">
						<view>
							<view class="fb f26 c6A4714">当前等级</view>
							<block v-if="userInfo.isSP == 0">
								<view @tap="applyAgent" v-if="userInfo.totalTeamMValue >= fxConfig.agentSubsidies.marketTotalMvalue" class="orderBtn2_">申请成为社区中心店</view>
								<view v-else class="fm f26 c6A4714 gui-flex gui-align-items-center">
									<text>
										<text v-if="isCanSee">{{userInfo.totalTeamMValue}}</text>
										<text v-else>------</text>
										推广值 距社区中心店还需
										<text v-if="isCanSee">{{fxConfig.agentSubsidies.marketTotalMvalue - userInfo.totalTeamMValue}}</text>
										<text v-else>------</text>
										推广值
									</text>
									<image @tap="changeSee" :src="'../../static/images/zheng/'+(!isCanSee ? 'eye_zong2' : 'eye_zong')+'.png'" style="width:40rpx;height:20rpx;margin-left:7rpx;" mode="aspectFit"></image>
								</view>
								<view class="process mt10 gui-relative">
									<view class="gui-absolute-lt bgFFDF91 hp100" :style="'width:'+Math.floor(userInfo.totalTeamMValue/fxConfig.agentSubsidies.marketTotalMvalue*100)+'%;'"></view>
								</view>
							</block>
							<block v-else>
								<view class="spBtn">社区中心店</view>
								<view class="process mt10 gui-relative">
									<view class="gui-absolute-lt bgFFDF91 hp100" style="width:100%;"></view>
								</view>
							</block>
						</view>
					</view> -->
				</view>
			</view>
			
			<view class="bgFFFFFF m20 br10">
				<view @click="goUnion" class="f28 c404040" style="padding: 30rpx 20rpx; display: flex; justify-content: space-between; align-items: center;">
					<view>百业联盟</view>
					<view class="f24" style="color: #ff4f00" v-if="!this.unionApplyStatus.status">申请入驻</view>
					<view class="f24" style="color: #ff4f00" v-if="this.unionApplyStatus.status == 1">审核中</view>
					<view class="f24" style="color: #ff4f00" v-if="this.unionApplyStatus.status == 2">我的店铺</view>
				</view>
				<view @click="goto('/pages/my/vip/vipindex')" class="f28 c404040" style="padding: 30rpx 20rpx; border-top: 1rpx solid #f3f3f3; display: flex; justify-content: space-between; align-items: center;">
					<view>VIP礼包</view>
					<view class="f24" style="color: #ff4f00">去升级</view>
				</view>
			</view>
			
			<view class="bgFFFFFF br10 m20 ptb20">
				<view class="f30 fb mt10 ml20 gui-flex gui-align-items-center gui-space-between">
					<text>自营订单</text>
					<navigator url="/pages/my/order/list?status=99" hover-class="" class="c999999 f26 fm mr20">查看全部</navigator>
				</view>
				<view class="gui-flex gui-wrap pb20 gui-space-between">
					<navigator url="/pages/shopcart/shopcart" open-type="switchTab" hover-class="" class="wp20 gui-flex gui-justify-content-center gui-wrap mt30 gui-relative">
						<text class="gui-badge redDot gui-bg-red gui-color-white" v-if="num1 > 0">{{num1}}</text>
						<gui-image src="../../static/images/zheng/my23.png" :width="50" :height="50" :timer="0"></gui-image>
						<view class="gui-text-center wp100 f26 c404040 mt6">购物车</view>
					</navigator>
					<navigator url="/pages/my/order/list?status=1" hover-class="" class="wp20 gui-flex gui-justify-content-center gui-wrap mt30 gui-relative">
						<text class="gui-badge redDot gui-bg-red gui-color-white" v-if="num2 > 0">{{num2}}</text>
						<gui-image src="../../static/images/zheng/my06.png" :width="50" :height="50" :timer="0"></gui-image>
						<view class="gui-text-center wp100 f26 c404040 mt6">待付款</view>
					</navigator>
					<navigator url="/pages/my/order/list?status=2" hover-class="" class="wp20 gui-flex gui-justify-content-center gui-wrap mt30 gui-relative">
						<text class="gui-badge redDot gui-bg-red gui-color-white" v-if="num3 > 0">{{num3}}</text>
						<gui-image src="../../static/images/zheng/my07.png" :width="50" :height="50" :timer="0"></gui-image>
						<view class="gui-text-center wp100 f26 c404040 mt6">待发货</view>
					</navigator>
					<navigator url="/pages/my/order/list?status=3" hover-class="" class="wp20 gui-flex gui-justify-content-center gui-wrap mt30 gui-relative">
						<text class="gui-badge redDot gui-bg-red gui-color-white" v-if="num4 > 0">{{num4}}</text>
						<gui-image src="../../static/images/zheng/my08.png" :width="50" :height="50" :timer="0"></gui-image>
						<view class="gui-text-center wp100 f26 c404040 mt6">待收货</view>
					</navigator>
					<navigator url="/pages/my/order/list?status=4" hover-class="" class="wp20 gui-flex gui-justify-content-center gui-wrap mt30 gui-relative">
						<text class="gui-badge redDot gui-bg-red gui-color-white" v-if="num5 > 0">{{num5}}</text>
						<gui-image src="../../static/images/zheng/my09.png" :width="50" :height="50" :timer="0"></gui-image>
						<view class="gui-text-center wp100 f26 c404040 mt6">待评价</view>
					</navigator>
				</view>
			</view>
			<view class="bgFFFFFF br10 m20 ptb20">
				<view class="f30 fb mt10 ml20 gui-flex gui-align-items-center gui-space-between">
					<text>联盟订单</text>
					<navigator url="/pages/union/offline/orders/list" hover-class="" class="c999999 f26 fm mr20">查看全部</navigator>
				</view>
				<view class="gui-flex gui-wrap pb20 gui-space-between">
					<navigator url="/pages/union/offline/orders/list?status=1" hover-class="" class="wp20 gui-flex gui-justify-content-center gui-wrap mt30 gui-relative">
						<text class="gui-badge redDot gui-bg-red gui-color-white" v-if="num2 > 0">{{num2}}</text>
						<gui-image src="../../static/images/zheng/my06.png" :width="50" :height="50" :timer="0"></gui-image>
						<view class="gui-text-center wp100 f26 c404040 mt6">待付款</view>
					</navigator>
					<navigator url="/pages/union/offline/orders/list?status=2" hover-class="" class="wp20 gui-flex gui-justify-content-center gui-wrap mt30 gui-relative">
						<text class="gui-badge redDot gui-bg-red gui-color-white" v-if="num3 > 0">{{num3}}</text>
						<gui-image src="../../static/images/zheng/my07.png" :width="50" :height="50" :timer="0"></gui-image>
						<view class="gui-text-center wp100 f26 c404040 mt6">待消费</view>
					</navigator>
					<navigator url="/pages/union/offline/orders/list?status=3" hover-class="" class="wp20 gui-flex gui-justify-content-center gui-wrap mt30 gui-relative">
						<text class="gui-badge redDot gui-bg-red gui-color-white" v-if="num4 > 0">{{num4}}</text>
						<gui-image src="../../static/images/zheng/my08.png" :width="50" :height="50" :timer="0"></gui-image>
						<view class="gui-text-center wp100 f26 c404040 mt6">已完成</view>
					</navigator>
				</view>
			</view>
			<view class="bgFFFFFF br10 m20 ptb20">
				<view class="f30 fb mt10 ml20 gui-flex gui-align-items-center gui-space-between">
					<text>乐享生活订单</text>
					<navigator url="/pages/ldd/order?status=99" hover-class="" class="c999999 f26 fm mr20">查看全部</navigator>
				</view>
				<view class="gui-flex gui-wrap pb20 gui-space-between">
					<navigator url="/pages/ldd/order?status=1" hover-class="" class="wp20 gui-flex gui-justify-content-center gui-wrap mt30 gui-relative">
						<text class="gui-badge redDot gui-bg-red gui-color-white" v-if="num1 > 0">{{num1}}</text>
						<gui-image src="../../static/images/zheng/my06.png" :width="50" :height="50" :timer="0"></gui-image>
						<view class="gui-text-center wp100 f26 c404040 mt6">待付款</view>
					</navigator>
					<navigator url="/pages/ldd/order?status=2" hover-class="" class="wp20 gui-flex gui-justify-content-center gui-wrap mt30 gui-relative">
						<text class="gui-badge redDot gui-bg-red gui-color-white" v-if="num2 > 0">{{num2}}</text>
						<gui-image src="../../static/images/zheng/my07.png" :width="50" :height="50" :timer="0"></gui-image>
						<view class="gui-text-center wp100 f26 c404040 mt6">待发货</view>
					</navigator>
					<navigator url="/pages/ldd/order?status=3" hover-class="" class="wp20 gui-flex gui-justify-content-center gui-wrap mt30 gui-relative">
						<text class="gui-badge redDot gui-bg-red gui-color-white" v-if="num3 > 0">{{num3}}</text>
						<gui-image src="../../static/images/zheng/my07.png" :width="50" :height="50" :timer="0"></gui-image>
						<view class="gui-text-center wp100 f26 c404040 mt6">待收货</view>
					</navigator>
					<navigator url="/pages/ldd/order?status=4" hover-class="" class="wp20 gui-flex gui-justify-content-center gui-wrap mt30 gui-relative">
						<text class="gui-badge redDot gui-bg-red gui-color-white" v-if="num4 > 0">{{num4}}</text>
						<gui-image src="../../static/images/zheng/my08.png" :width="50" :height="50" :timer="0"></gui-image>
						<view class="gui-text-center wp100 f26 c404040 mt6">已完成</view>
					</navigator>
				</view>
			</view>
			<view class="bgFFFFFF br10 m20 ptb20">
				<view class="f30 fb mt10 ml20">增值服务订单</view>
				<view class="gui-flex gui-wrap pb20 gui-space-between">
					<navigator url="/pages/my/order/wgOrderList" hover-class="" class="wp20 gui-flex gui-justify-content-center gui-wrap mt30 gui-relative">
						<text class="gui-badge redDot gui-bg-red gui-color-white" v-if="num14 > 0">{{num14}}</text>
						<gui-image src="../../static/images/zheng/my16.png" :width="50" :height="50" :timer="0"></gui-image>
						<view class="gui-text-center wp100 f26 c404040 mt6">网购订单</view>
					</navigator>
					<navigator url="/pages/my/order/zfOrder" hover-class="" class="wp20 gui-flex gui-justify-content-center gui-wrap mt30 gui-relative">
						<text class="gui-badge redDot gui-bg-red gui-color-white" v-if="num15 > 0">{{num15}}</text>
						<gui-image src="../../static/images/zheng/my17.png" :width="50" :height="50" :timer="0"></gui-image>
						<view class="gui-text-center wp100 f26 c404040 mt6">支付订单</view>
					</navigator>
					<navigator url="/pages/zengzhi/fawu/order" hover-class="" class="wp20 gui-flex gui-justify-content-center gui-wrap mt30 gui-relative">
						<text class="gui-badge redDot gui-bg-red gui-color-white" v-if="num16 > 0">{{num16}}</text>
						<gui-image src="../../static/images/zheng/my18.png" :width="50" :height="50" :timer="0"></gui-image>
						<view class="gui-text-center wp100 f26 c404040 mt6">法务订单</view>
					</navigator>
					<navigator url="/pages/my/order/cpsOrder" hover-class="" class="wp20 gui-flex gui-justify-content-center gui-wrap mt30 gui-relative">
						<text class="gui-badge redDot gui-bg-red gui-color-white" v-if="num17 > 0">{{num17}}</text>
						<gui-image src="../../static/images/zheng/my19.png" :width="50" :height="50" :timer="0"></gui-image>
						<view class="gui-text-center wp100 f26 c404040 mt6">其他订单</view>
					</navigator>
				</view>
			</view>
			<view class="bgFFFFFF br10 m20 ptb20">
				<view class="f30 fb mt10 ml20">我的钱包</view>
				<view class="gui-flex gui-wrap pb20 gui-space-between">
					<navigator url="/pages/my/wallet/wallet" hover-class="" class="wp20 gui-flex gui-justify-content-center gui-wrap mt30 gui-relative">
						<text class="gui-badge redDot gui-bg-red gui-color-white" v-if="num6 > 0">{{num6}}</text>
						<gui-image src="../../static/images/zheng/my01.png" :width="50" :height="50" :timer="0"></gui-image>
						<view class="gui-text-center wp100 f26 c404040 mt6">余额</view>
					</navigator>
					<navigator url="/pages/my/coupon/list" hover-class="" class="wp20 gui-flex gui-justify-content-center gui-wrap mt30 gui-relative">
						<text class="gui-badge redDot gui-bg-red gui-color-white" v-if="num18 > 0">{{num18}}</text>
						<gui-image src="../../static/images/zheng/my30.png" :width="50" :height="50" :timer="0"></gui-image>
						<view class="gui-text-center wp100 f26 c404040 mt6">绿色积分</view>
					</navigator>
					<navigator url="/pages/my/wallet/cashcoupon" hover-class="" class="wp20 gui-flex gui-justify-content-center gui-wrap mt30 gui-relative">
						<text class="gui-badge redDot gui-bg-red gui-color-white" v-if="num7 > 0">{{num7}}</text>
						<gui-image src="../../static/images/zheng/my02.png" :width="50" :height="50" :timer="0"></gui-image>
						<view class="gui-text-center wp100 f26 c404040 mt6">消费券</view>
					</navigator>
					<navigator url="/pages/my/wallet/coupon" hover-class="" class="wp20 gui-flex gui-justify-content-center gui-wrap mt30 gui-relative">
						<text class="gui-badge redDot gui-bg-red gui-color-white" v-if="num8 > 0">{{num8}}</text>
						<gui-image src="../../static/images/zheng/my03.png" :width="50" :height="50" :timer="0"></gui-image>
						<view class="gui-text-center wp100 f26 c404040 mt6">抵扣券</view>
					</navigator>
					<navigator url="/pages/my/wallet/ydou" hover-class="" class="wp20 gui-flex gui-justify-content-center gui-wrap mt30 gui-relative">
						<text class="gui-badge redDot gui-bg-red gui-color-white" v-if="num9 > 0">{{num9}}</text>
						<gui-image src="../../static/images/zheng/my04.png" :width="50" :height="50" :timer="0"></gui-image>
						<view class="gui-text-center wp100 f26 c404040 mt6">数字能量</view>
					</navigator>
				</view>
				<view class="gui-flex gui-wrap pb20 gui-space-between">
					<navigator url="/pages/my/wallet/gzhi" hover-class="" class="wp20 gui-flex gui-justify-content-center gui-wrap mt30 gui-relative">
						<text class="gui-badge redDot gui-bg-red gui-color-white" v-if="num10 > 0">{{num10}}</text>
						<gui-image src="../../static/images/zheng/my05.png" :width="50" :height="50" :timer="0"></gui-image>
						<view class="gui-text-center wp100 f26 c404040 mt6">权证</view>
					</navigator>
					<!-- <navigator url="/pages/my/score/index" hover-class="" class="wp20 gui-flex gui-justify-content-center gui-wrap mt30 gui-relative">
						<text class="gui-badge redDot gui-bg-red gui-color-white" v-if="num11 > 0">{{num11}}</text>
						<gui-image src="../../static/images/zheng/my05_.png" :width="50" :height="50" :timer="0"></gui-image>
						<view class="gui-text-center wp100 f26 c404040 mt6">积分</view>
					</navigator> -->
					<navigator url="/pages/my/recommend/ydou" hover-class="" class="wp20 gui-flex gui-justify-content-center gui-wrap mt30 gui-relative">
						<text class="gui-badge redDot gui-bg-red gui-color-white" v-if="num11 > 0">{{num11}}</text>
						<gui-image src="../../static/images/zheng/my14.png" :width="50" :height="50" :timer="0"></gui-image>
						<view class="gui-text-center wp100 f26 c404040 mt6">推荐收益</view>
					</navigator>
					<!-- <navigator url="/pages/my/vip/vipindex" hover-class="" class="wp20 gui-flex gui-justify-content-center gui-wrap mt30 gui-relative">
						<text class="gui-badge redDot gui-bg-red gui-color-white" v-if="num11 > 0">{{num11}}</text>
						<gui-image src="../../static/images/zheng/my05_.png" :width="50" :height="50" :timer="0"></gui-image>
						<view class="gui-text-center wp100 f26 c404040 mt6">VIP产品包</view>
					</navigator> -->
					<!-- <view @tap="noOpen" class="wp20 gui-flex gui-justify-content-center gui-wrap mt30">
						<gui-image src="../../static/images/zheng/my05_.png" :width="50" :height="50" :timer="0"></gui-image>
						<view class="gui-text-center wp100 f26 c404040 mt6">积分</view>
					</view> -->
					<view class="wp20 gui-flex gui-justify-content-center gui-wrap mt30"></view>
					<view class="wp20 gui-flex gui-justify-content-center gui-wrap mt30"></view>
					<view class="wp20 gui-flex gui-justify-content-center gui-wrap mt30"></view>
				</view>
			</view>
			<view class="bgFFFFFF br10 m20 ptb20">
				<view class="f30 fb mt10 ml20">任务中心</view>
				<view class="gui-flex gui-wrap pb20 gui-space-between">
					<navigator url="/pages/my/task/poster" hover-class="" class="wp20 gui-flex gui-justify-content-center gui-wrap mt30">
						<gui-image src="../../static/images/zheng/my10.png" :width="50" :height="50" :timer="0"></gui-image>
						<view class="gui-text-center wp100 f26 c404040 mt6">邀请码</view>
					</navigator>
					<navigator url="/pages/my/task/share" hover-class="" class="wp20 gui-flex gui-justify-content-center gui-wrap mt30 gui-relative">
						<text class="gui-badge redDot gui-bg-red gui-color-white" v-if="num13 > 0">{{num13}}</text>
						<gui-image src="../../static/images/zheng/my11.png" :width="50" :height="50" :timer="0"></gui-image>
						<view class="gui-text-center wp100 f26 c404040 mt6">我的分享</view>
					</navigator>
					<navigator url="/pages/my/task/mzhi" hover-class="" class="wp20 gui-flex gui-justify-content-center gui-wrap mt30 gui-relative">
						<text class="gui-badge redDot gui-bg-red gui-color-white" v-if="num12 > 0">{{num12}}</text>
						<gui-image src="../../static/images/zheng/my12.png" :width="50" :height="50" :timer="0"></gui-image>
						<view class="gui-text-center wp100 f26 c404040 mt6">推广值</view>
					</navigator>
					<!-- <navigator url="/pages/my/task/goods" hover-class="" class="wp20 gui-flex gui-justify-content-center gui-wrap mt30">
						<gui-image src="../../static/images/zheng/my29.png" :width="50" :height="50" :timer="0"></gui-image>
						<view class="gui-text-center wp100 f26 c404040 mt6">我的推荐</view>
					</navigator> -->
					<navigator url="/pages/find/index" hover-class="" class="wp20 gui-flex gui-justify-content-center gui-wrap mt30">
						<gui-image src="../../static/images/zheng/my27.png" :width="50" :height="50" :timer="0"></gui-image>
						<view class="gui-text-center wp100 f26 c404040 mt6">学习</view>
					</navigator>
				</view>
			</view>
			<view class="bgFFFFFF br10 m20 ptb20">
				<view class="f30 fb mt10 ml20">我的日常</view>
				<view class="gui-flex gui-wrap pb20 gui-space-between">
					<navigator url="/pages/information/myfabu" hover-class="" class="wp20 gui-flex gui-justify-content-center gui-wrap mt30">
						<gui-image src="../../static/images/zheng/my20.png" :width="50" :height="50" :timer="0"></gui-image>
						<view class="gui-text-center wp100 f26 c404040 mt6">我的帖子</view>
					</navigator>
					<navigator url="/pages/my/daily/collect" hover-class="" class="wp20 gui-flex gui-justify-content-center gui-wrap mt30">
						<gui-image src="../../static/images/zheng/my21.png" :width="50" :height="50" :timer="0"></gui-image>
						<view class="gui-text-center wp100 f26 c404040 mt6">我的收藏</view>
					</navigator>
					<navigator url="/pages/my/daily/follow" hover-class="" class="wp20 gui-flex gui-justify-content-center gui-wrap mt30">
						<gui-image src="../../static/images/zheng/my22.png" :width="50" :height="50" :timer="0"></gui-image>
						<view class="gui-text-center wp100 f26 c404040 mt6">我的关注</view>
					</navigator>
					<navigator url="/pages/information/fabu" hover-class="" class="wp20 gui-flex gui-justify-content-center gui-wrap mt30">
						<gui-image src="../../static/images/zheng/my27.png" :width="50" :height="50" :timer="0"></gui-image>
						<view class="gui-text-center wp100 f26 c404040 mt6">发布帖子</view>
					</navigator>
				</view>
			</view>
			<view class="bgFFFFFF br10 m20 ptb20">
				<view class="f30 fb mt10 ml20">其他</view>
				<view class="gui-flex gui-wrap pb20 gui-space-between">
					<navigator url="/pages/home/content?type=aboutUs" hover-class="" class="wp20 gui-flex gui-justify-content-center gui-wrap mt30">
						<gui-image src="../../static/images/zheng/my26.png" :width="50" :height="50" :timer="0"></gui-image>
						<view class="gui-text-center wp100 f26 c404040 mt6">关于我们</view>
					</navigator>
					<navigator url="/pages/home/content?type=business" hover-class="" class="wp20 gui-flex gui-justify-content-center gui-wrap mt30">
						<gui-image src="../../static/images/zheng/my25.png" :width="50" :height="50" :timer="0"></gui-image>
						<view class="gui-text-center wp100 f26 c404040 mt6">商务合作</view>
					</navigator>
					<navigator url="/pages/my/other/feedback" hover-class="" class="wp20 gui-flex gui-justify-content-center gui-wrap mt30">
						<gui-image src="../../static/images/zheng/my28.png" :width="50" :height="50" :timer="0"></gui-image>
						<view class="gui-text-center wp100 f26 c404040 mt6">客服/反馈</view>
					</navigator>
					<navigator url="/pages/find/list?type=1" hover-class="" class="wp20 gui-flex gui-justify-content-center gui-wrap mt30">
						<gui-image src="../../static/images/zheng/my13.png" :width="50" :height="50" :timer="0"></gui-image>
						<view class="gui-text-center wp100 f26 c404040 mt6">新手指南</view>
					</navigator>
					<view @tap="noOpen" class="wp20 gui-flex gui-justify-content-center gui-wrap mt30">
						<gui-image src="../../static/images/zheng/my14.png" :width="50" :height="50" :timer="0"></gui-image>
						<view class="gui-text-center wp100 f26 c404040 mt6">礼物</view>
					</view>
				</view>
				<view class="gui-flex gui-wrap pb20 gui-space-between">
					<navigator url="/pages/home/content?type=usefulJijin" hover-class="" class="wp20 gui-flex gui-justify-content-center gui-wrap mt30">
						<gui-image src="../../static/images/zheng/my30.png" :width="50" :height="50" :timer="0"></gui-image>
						<view class="gui-text-center wp100 f26 c404040 mt6">有用基金</view>
					</navigator>
					<navigator url="/pages/home/content?type=usefulBang" hover-class="" class="wp20 gui-flex gui-justify-content-center gui-wrap mt30">
						<gui-image src="../../static/images/zheng/my31.png" :width="50" :height="50" :timer="0"></gui-image>
						<view class="gui-text-center wp100 f26 c404040 mt6">有用帮扶</view>
					</navigator>
					<navigator url="/pages/my/other/xfq" hover-class="" class="wp20 gui-flex gui-justify-content-center gui-wrap mt30">
						<gui-image src="../../static/images/zheng/my30.png" :width="50" :height="50" :timer="0"></gui-image>
						<view class="gui-text-center wp100 f26 c404040 mt6">消费券释放</view>
					</navigator>
					<navigator url="/pages/my/other/hhr" hover-class="" class="wp20 gui-flex gui-justify-content-center gui-wrap mt30">
						<gui-image src="../../static/images/zheng/my30.png" :width="50" :height="50" :timer="0"></gui-image>
						<view class="gui-text-center wp100 f26 c404040 mt6">合伙人分成</view>
					</navigator>
					<view class="wp20 gui-flex gui-justify-content-center gui-wrap mt30"></view>
				</view>
			</view>
			<view class="bgFFFFFF br10 m20 ptb20">
				<view class="gui-flex gui-align-items-center gui-space-between">
					<view class="f30 fb mt10 ml20">公告</view>
					<navigator url="/pages/home/noticeList" class="f26 mr20 c999999" hover-class="">更多<text class="gui-icons">&#xe601;</text></navigator>
				</view>
				<view class="p20 f28">
					<block v-for="(item,index) in speakerMsgs" :key="index">
						<navigator :url="'/pages/home/content?type=notice&id='+item.id" hover-class="" class="gui-ellipsis mt20 c404040">
							{{item.title}}
						</navigator>
					</block>
				</view>
			</view>
			<gui-popup :zIndex="99" width="600rpx" bgColor="rgba(0,0,0,0.85)" :canCloseByShade="false" ref="guipopupInfo">
				<view class="gui-flex gui-align-items-center gui-justify-content-center gui-wrap">
					<view @tap="$refs.guipopupInfo.close()"><gui-image src="../../static/images/zheng/close.png" :timer="0" :width="48" :height="48"></gui-image></view>
					<view class="br20 mt60 bgFFFFFF overHidden">
						<view class="plr40 mt60">
							<view class="gui-relative borderBottom">
								<view class="f26 lh28 mt30 fm">个性签名</view>
								<textarea style="width:520rpx;padding:30rpx 0;" v-model="signature" :maxlength="50" class="f26 fm" placeholder="请输入个性签名" placeholder-class="c999999" :auto-height="true"></textarea>
							</view>
							<view @tap="perfectInfo" class="f26 cFFFFFF fm bgFF4F00 br30 gui-text-center h60 lh60 w200 mtb30Auto">提交</view>
						</view>
					</view>
				</view>
			</gui-popup>
            <union-popup v-model="showUnionDocs" buttonText="同意" @submit="agreeUnionDocs">
                <view class="docs" style="padding: 30rpx;height: 1000rpx;overflow-x: hidden;overflow-y: auto;">
                    <view style="font-weight: bold;font-size: 32rpx;text-align: center;margin-top: 20rpx;">“有用惠生活”平台商家入驻申请协议</view>
                    <view style="font-weight: bold;font-size: 28rpx;padding-top: 20rpx;">一、引言</view>
                    <view style="font-size: 26rpx;padding: 20rpx;line-height: 48rpx;">欢迎您考虑入驻“有用惠生活”平台，与我们一同创造共赢的商业机会。本协议旨在明确我们与商家之间的合作关系，保障双方的权益。请您仔细阅读以下条款，如有疑问，请随时与我们联系。</view>
                    <view style="font-weight: bold;font-size: 28rpx;padding-top: 20rpx;">二、定义</view>
                    <view style="font-size: 26rpx;padding: 20rpx;line-height: 48rpx;">“有用惠生活”平台：指由苏州金优数字科技有限公司运营的电商平台，包括但不限于网站、移动应用等。商家：指符合本协议要求，通过有用惠生活平台销售产品的法人或自然人。消费积分：指有用惠生活平台根据消费者消费金额赠送的积分，可用于平台内消费。</view>
                    <view style="font-weight: bold;font-size: 28rpx;padding-top: 20rpx;">三、商家入驻条件</view>
                    <view style="font-size: 26rpx;padding: 20rpx;line-height: 48rpx;">
                        商家必须具备合法的经营资质，包括但不限于营业执照、税务登记证等。
                        商家所销售的产品必须符合国家相关法律法规及行业标准。
                        商家需提供详细的商品信息，包括商品名称、价格、图片、描述等。
                        商家需遵守有用惠生活平台的各项规则和政策，包括但不限于价格政策、促销政策等。
                    </view>
                    <view style="font-weight: bold;font-size: 28rpx;padding-top: 20rpx;">四、商家权益与义务</view>
                    <view style="font-size: 26rpx;padding: 20rpx;line-height: 48rpx;">
                        商家有权通过有用惠生活平台销售产品，并获得由此产生的收益。
                    </view>
                    <view style="font-weight: bold;font-size: 28rpx;padding-top: 20rpx;">五、消费积分政策</view>
                    <view style="font-size: 26rpx;padding: 20rpx;line-height: 48rpx;">
                        有用惠生活平台将根据消费者的消费金额为商家赠送相应的消费积分，具体赠送比例以平台公告为准。
                        商家可以通过消费积分吸引更多消费者，提升销售额。消费者使用积分消费时，商家将按照积分与现金的比例获得收益。
                        商家应积极配合有用惠生活平台实施消费积分政策，不得以任何形式阻挠或拒绝消费者使用积分。
                        有用惠生活平台有权根据市场情况和商业需求调整消费积分政策，并提前通知商家。
                    </view>
                    <view style="font-weight: bold;font-size: 28rpx;padding-top: 20rpx;">六、保密条款</view>
                    <view style="font-size: 26rpx;padding: 20rpx;line-height: 48rpx;">
                        本协议任何一方应对另一方的商业机密和保密信息予以保密，未经对方书面同意，不得向第三方透露。
                        本协议终止后，双方仍应继续履行保密义务。
                    </view>
                    <view style="font-weight: bold;font-size: 28rpx;padding-top: 20rpx;">七、违约责任</view>
                    <view style="font-size: 26rpx;padding: 20rpx;line-height: 48rpx;">
                        如商家违反本协议规定的任何条款，有用惠生活平台有权采取包括但不限于下架商品、暂停服务、终止合作等措施，并要求商家承担相应的违约责任。
                        如因不可抗力因素导致任何一方不能履行本协议，双方均不承担违约责任。但应及时通知对方，并采取必要措施减少损失。
                    </view>
                    <view style="font-weight: bold;font-size: 28rpx;padding-top: 20rpx;">八、法律适用和争议解决</view>
                    <view style="font-size: 26rpx;padding: 20rpx;line-height: 48rpx;">
                        本协议适用中华人民共和国法律。如本协议任何条款与中华人民共和国法律相抵触，应以法律为准。
                        如双方在执行本协议过程中发生任何争议，应首先通过友好协商解决；协商不成的，任何一方均有权向有用惠生活平台所在地人民法院提起诉讼。
                        在争议解决期间，双方应继续履行本协议中不涉及争议的其他条款。
                    </view>
                    <view style="font-weight: bold;font-size: 28rpx;padding-top: 20rpx;">九、其他条款</view>
                    <view style="font-size: 26rpx;padding: 20rpx;line-height: 48rpx;">
                        本协议自双方签字（或盖章）之日起生效，有效期为一年。协议到期前30天，双方如无异议，可自动续约一年。
                        本协议一式两份，双方各执一份。未尽事宜可由双方另行签订补充协议，补充协议与本协议具有同等法律效力。
                    </view>
                </view>
            </union-popup>
		</view>
	</gui-page>
</template>
<script>
var graceChecker = require("@/GraceUI5/js/checker.js");
var _this;

export default {
	data() { 
		return {
			pageLoading: false,
			mainHeight: 0,
			userInfo: null,
			vipinfo: {
				name: '普通会员',
				iconpath: '../../static/images/my/putong.png'
			},
			signature: '',
			speakerMsgs: [],
			userLevel: {title: 'V0'},
			fxConfig: null,
			sons: 0,
			isCanSee: false,
			num1: 0,
			num2: 0,
			num3: 0,
			num4: 0,
			num5: 0,
			num6: 0,
			num7: 0,
			num8: 0,
			num9: 0,
			num10: 0,
			num11: 0,
			num12: 0,
			num13: 0,
			num14: 0,
			num15: 0,
			num16: 0,
			num17: 0,
			num18: 0,
            showUnionDocs: false,
            unionApplyStatus: {}
		}
	},
	onLoad() {
		_this = this;
		_this.getIsIndexNoticeList();
	},
	async onShow() {
		_this.getFxConfig();
		_this.countMsgNum(1);
		_this.countMsgNum(2);
		_this.countMsgNum(3);
		_this.countMsgNum(4);
		_this.countMsgNum(5);
		_this.countMsgNum(6);
		_this.countMsgNum(7);
		_this.countMsgNum(8);
		_this.countMsgNum(9);
		_this.countMsgNum(10);
		_this.countMsgNum(11);
		_this.countMsgNum(12);
		_this.countMsgNum(13);
		_this.countMsgNum(14);
		_this.countMsgNum(15);
		_this.countMsgNum(16);
		_this.countMsgNum(17);
		_this.countMsgNum(18);
        
        let vipname = '普通会员'
		let iconval = '../../static/images/my/putong.png'
		if(uni.getStorageSync('userInfo').vip_info && uni.getStorageSync('userInfo').vip_info.name != '') {
			let info = uni.getStorageSync('userInfo').vip_info
			vipname = info.name
			if(info.name == '黄金会员') {
				iconval = '../../static/images/my/huangjin.png'
			}
			if(info.name == '钻石会员') {
				iconval = '../../static/images/my/zuanshi.png'
			}
			if(info.name == '白银会员') {
				iconval = '../../static/images/my/baiyin.png'
			}
		} else {
			vipname = '普通会员'
			iconval = '../../static/images/my/putong.png'
		}
		_this.vipinfo = {
			name: vipname,
			iconpath: iconval
		}
		console.log(_this.vipinfo)
        // 获取联盟区申请状态
        const res = await uni.unionRequest('swoft/api/shopapply/shopApplyDetail', {
            user_id: uni.getStorageSync('userInfo').id
        });
        uni.setStorageSync('union_detail', res.data);
        _this.unionApplyStatus = res.data;
	},
	onReady() {
		
	},
	onPullDownRefresh: function(){
		_this.getIsIndexNoticeList();
		_this.getFxConfig();
		setTimeout(function(){
			uni.stopPullDownRefresh();
		},1500);
	},
	methods:{
        agreeUnionDocs (){
            this.goto('/pages/union/store/apply');
        },
        goUnion (){
            if(!this.unionApplyStatus.status){
                this.showUnionDocs = true;
            }
            if(this.unionApplyStatus.status == 2){
                this.goto('/pages/union/store/index');
            }
        },
		goto (url){
			uni.navigateTo({
				url
			})
		},
		countMsgNum(e) {
			uni.gRequest.post(
				'swoft/api/user/countMsgNum',
				{
					data: {
						uid: uni.getStorageSync('userInfo').id,
						type: e
					}
				}, 
				(res) => {
					if(res.code == 0){
						console.log(res.data)
						_this['num'+e] = res.data;
					}
				},
				(error) => {},
				(res) => {},
				true,
				true
			);
		},
		changeSee: function(){
			_this.isCanSee = !_this.isCanSee;
		},
		getUserTeamNum: function(){
			uni.gRequest.post(
				'swoft/api/user/getUserTeamNum',
				{
					data: {
						uid: uni.getStorageSync('userInfo').id,
						totalMvalue: _this.fxConfig.agentSubsidies.mValue
					}
				}, 
				(res) => {
					if(res.code == 0){
						_this.sons = res.data;
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
		getFxConfig: function(){
			uni.gRequest.post(
				'swoft/api/config/getFxConfig',
				{
					data: {}
				}, 
				(res) => {
					if(res.code == 0){
						_this.fxConfig = res.data;
						_this.getUserInfo();
						_this.getUserTeamNum();
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
						_this.getUserLevelList();
					}else{
						_this.$refs.guiPage.openMessage('default',res.msg,true,1500);
					}
				},
				(error) => {
					_this.$refs.guiPage.openMessage('default','请求错误',true,1500);
				},
				(res) => {
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
		getUserLevelList: function(){
			uni.gRequest.post(
				'swoft/api/user/getUserLevelList',
				{
					data: {}
				}, 
				(res) => {
					if(res.code == 0){
						for(let i=0;i<res.data.length;i++){
							if(_this.userInfo.level == res.data[i].level){
								_this.userLevel = res.data[i];
								break;
							}
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
		getIsIndexNoticeList: function(){
			uni.gRequest.post(
				'swoft/api/notice/getIsIndexNoticeList',
				{
					data: {}
				}, 
				(res) => {
					if(res.code == 0){
						_this.speakerMsgs = res.data;
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
		perfectInfo: async function(){
			var formData = {};
			formData.id = uni.getStorageSync('userInfo').id;
			formData.signature = _this.signature;
			var rule = [
				{name: "signature", checkType: "notnull", checkRule: "", errorMsg: "请输入个性签名"},
				{name: "signature", checkType: "string", checkRule: "1,50", errorMsg: "个性签名不能超过50个字符"},
			];
			var checkRes = graceChecker.check(formData, rule);
			if(!checkRes){
				_this.$refs.guiPage.openMessage('default',graceChecker.error,true,1500);
				return false;
			}
			_this.pageLoading = true;
			uni.gRequest.post(
				'swoft/api/user/editUserInfo',
				{
					data: formData
				}, 
				(res) => {
					if(res.code == 0){
						_this.$refs.guipopupInfo.close();
						_this.$refs.guiPage.openMessage('success',res.msg,true,1500);
						uni.setStorageSync('userInfo',res.data);
						_this.userInfo = res.data;
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
		noOpen: function(){
			_this.$refs.guiPage.openMessage('default','暂未开放',true,1500);
		},
		applyAgent: function(){
			if(_this.sons < _this.fxConfig.agentSubsidies.recommendNum){
				_this.$refs.guiPage.openMessage('default','直推人数未达到'+_this.fxConfig.agentSubsidies.recommendNum+'人',true,1500);
				return false;
			}
			_this.pageLoading = true;
			uni.gRequest.post(
				'swoft/api/user/applyAgentActive',
				{
					data: {
						uid: uni.getStorageSync('userInfo').id
					}
				}, 
				(res) => {
					if(res.code == 0){
						_this.$refs.guiPage.openMessage('success','申请成功,请等待后台审核',true,1500);
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
	page{background-color:#F5F5F9;}
	.wh34{width:34rpx;height:34rpx;}
	.ml36{margin-left:36rpx;}
	.mr14{margin-right:14rpx;}
	.headerBox{width:670rpx;height:84rpx;padding:20rpx;border-radius:12rpx 12rpx 0 0;margin:40rpx auto 0 auto;background:url(../../static/images/zheng/bg03.png) no-repeat;background-size:cover;}
	.headBgBox{width:690rpx;/* height:240rpx; */height:140rpx;margin:0 auto;background:url(../../static/images/zheng/bg03_.png) no-repeat;background-size:100% 100%;}
	.process{width:550rpx;height:8rpx;border-radius:8rpx;background-color:#B68031;overflow:hidden;}
	.wp20{width:20%;}
	.wp25{width:25%;}
	.mt6{margin-top:6rpx;}
	.w710{width:710rpx;}
	.fw500{font-weight:500;}
	.mauto_{margin:0 auto;}
	.spBtn{padding:0 10rpx;display:inline-block;text-align:center;height:40rpx;line-height:40rpx;border-radius:6rpx;background-color:#6A4714;font-size:22rpx;color:#FFFFFF;margin-top:4rpx;}
	.orderBtn2_{padding:0 10rpx;display:inline-block;text-align:center;height:40rpx;line-height:40rpx;border-radius:6rpx;font-size:22rpx;border:thin solid #FF4F00;color:#FF4F00;margin-top:4rpx;}
	.color0{color:#FFB412;}
	.color1{color:#F5873E}
	.color2{color:#FEB012}
	.color3{color:#0254FE}
	.color4{color:#A53DFF}
	.color5{color:#FF5656}
	.color6{color:#FF5656}
	.color_{color:#9f7646;}
	.gui-badge{border-radius:28rpx; height:28rpx; line-height:28rpx; padding:0 10rpx; font-size:20rpx;}
</style>
