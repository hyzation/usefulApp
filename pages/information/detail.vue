<template>
	<gui-page :isLoading="pageLoading" :customHeader="true" ref="guiPage">
		<view slot="gHeader">
			<view class="gui-flex gui-nowrap gui-rows gui-align-items-center">
				<view @tap="navBack" class="gui-header-leader-btns" hover-class="gui-tap">
					<text class="gui-icons">&#xe600;</text>
				</view>
				<view class="gui-flex1 gui-text-center">
					<text class="f36 gui-ellipsis c000000">资讯详情</text>
				</view>
				<view class="pr30">
					<!--  #ifdef APP-PLUS -->
					<view @tap="share" v-if="data && data.status == 1" class="img34 gui-flex gui-justify-content-center gui-align-items-center">
						<image src="../../static/images/zheng/share.png" mode="aspectFit"></image>
					</view>
					<view v-else class="img34 gui-flex gui-justify-content-center gui-align-items-center"></view>
					<!--  #endif -->
					<!--  #ifdef H5 -->
					<view class="img34 gui-flex gui-justify-content-center gui-align-items-center"></view>
					<!--  #endif -->
				</view>
			</view>
		</view>
		<view slot="gBody" class="source">
			<gui-swiper v-if="bannerList.length > 0" :swiperItems="bannerList" :autoplay="false" :circular="false" :spacing="0" :width="750" :height="750" :indicatorActiveWidth="20" :indicatorBarHeight="30" :indicatorWidth="14" :indicatorHeight="6" indicatorColor="#E7E7E7" indicatorActiveColor="#ffffff"></gui-swiper>
			<view class="plr20 mt30" v-if="data">
				<view class="f34 fb">{{data.title}}</view>
				<view class="mt20 f28 c33"><jyf-parser :html="data.content" ref="article"></jyf-parser></view>
				<view class="f24 c99 mt20">发布于{{data.created_at}}</view>	
			</view>
			<view class="plr20 mt20" v-if="data">
				<view class="f26 fb">共{{data.commentCount}}条评论</view>
				<view class="gui-flex gui-align-items-center mt30">
					<gui-image class='no-scale' :src="data.headimgurl ? data.headimgurl : '../../static/images/logo.png'" :width="64" :height="64" borderRadius="32rpx"></gui-image>
					<view class="f26 bgF5F5F9 title ml20"><text class="ml20">喜欢就给个评论支持一下~</text></view>
				</view>
			</view>
			<view class="plr20 mt40">
				<block v-for="(item,index) in productList" :key="index">
					<view class="gui-flex gui-align-items-start mt20">
						<gui-image class='no-scale' :src="item.headimgurl" :width="64" :height="64" borderRadius="10rpx"></gui-image>
						<view>
							<view class="f26 fb ml20">{{item.nickname}}</view>
							<view class="f26 c33 ml20">
								{{item.content}}
							</view>
							<view class="f24 c99 mt20 ml20">{{item.created_at}}</view>
						</view>
					</view>
				</block>
				<gui-empty v-if="isEmpty">
					<view slot="img" class="gui-flex gui-rows gui-justify-content-center">
						<image class="gui-empty-img mt10" src="../../static/images/empty.png"></image>
					</view>
				</gui-empty>
				<gui-loadmore ref="loadmorecom"></gui-loadmore>
			</view>
			<view style="height:120rpx;"></view>
			<view class="gui-fixed-lb wp100 bgff">
				<view class="gui-flex gui-align-items-center gui-space-between pl30 pr30 pt20 pb20 gui-relative borderTop" v-if="data">
					<block v-if="data.status == 1">
						<view class="btnleft f26" @tap="$refs.guisubmitcomment.open()">
							<text class="gui-icons ml20">&#xe69e;</text>
							<text class="ml20">说点什么...</text>
						</view>
						<view class="gui-flex gui-align-items-center" v-if="data">
							<view class="f22 ml30" @tap="newsLikeActive">
								<view class="gui-flex gui-align-items-center" :class="data.isLike > 0 ? 'cFF4F00' : ''"><text class="gui-icons mr10 f26">{{data.isLike > 0 ? '&#xe605;' : '&#xe6ad;'}}</text>{{data.likeCount > 999 ? '999+' : data.likeCount}}</view>
								<view :class="data.isLike > 0 ? 'cFF4F00' : ''">喜欢</view>
							</view>
							<view class="f22 ml30" @tap="doCollect">
								<view class="gui-flex gui-align-items-center" :class="data.isCollect > 0 ? 'cFF4F00' : ''"><text class="gui-icons mr10 f28">&#xe645;</text>{{data.collectCount > 999 ? '999+' : data.collectCount}}</view>
								<view :class="data.isCollect > 0 ? 'cFF4F00' : ''">收藏</view>
							</view>
							<view class="f22 ml30" @tap="$refs.guisubmitcomment.open()">
								<view class="gui-flex gui-align-items-center"><text class="gui-icons mr10 f26">&#xe6b8;</text>{{data.commentCount > 999 ? '999+' : data.commentCount}}</view>
								<view>评论</view>
							</view>
						</view>
					</block>
					<block v-else>
						<view v-if="data.status == 0" class="f30 cFFFFFF fm bgFF4F00 gui-text-center btnStatus">待审核</view>
						<view v-if="data.status == -2" class="f30 cFFFFFF fm bg999999 gui-text-center btnStatus">审核未通过</view>
					</block>
				</view>
			</view>
			<!-- 评论组件 -->
			<gui-submit-comment ref="guisubmitcomment" :isImg="false" @submit="submit" submitColor="#FF4F00"></gui-submit-comment>
		</view>
	</gui-page>
</template>
<script>
var page = 1;
var totalPage = 0;
var _this;
var graceChecker = require("@/GraceUI5/js/checker.js");
import jyfParser from "@/components/jyf-parser/jyf-parser";
export default {
	data() { 
		return {
			pageLoading: false,
			bannerList: [],
			id: 0,
			data: null,
			apiLoadingStatus: false,
			loadMoreTimer: null,
			isEmpty: false,
			productList: []
		}
	},
	onLoad: function(e){
		_this = this;
		_this.id = e.id;
		_this.getNewsDetail();
		_this.reload();
	},
	onReachBottom: function(){
		if(_this.apiLoadingStatus){ return; }
		if(_this.loadMoreTimer != null){clearTimeout(_this.loadMoreTimer);}
		_this.loadMoreTimer = setTimeout(() => {
			if(_this.$refs.loadmorecom.loadMoreStatus != 0){ return ;}
			_this.$refs.loadmorecom.loading();
			_this.getdata();
		},80);
	},
	methods:{
		share: function(){
			uni.share({
				provider: "weixin",
				scene: "WXSceneSession",
				type: 0,
				href: "https://useful.youyong.org.cn/#/pages/detail/detail?id="+_this.id+'&inviteCode='+uni.getStorageSync('userInfo').inviteCode,
				title: _this.data.title,
				summary: '我正在使用有用生活服务，赶紧跟我一起来体验吧！',
				imageUrl: _this.data.cover[0]+'?imageslim',
				success: function (res) {
					uni.gRequest.post(
						'swoft/api/user/addReprintYbean',
						{
							data: {
								uid: uni.getStorageSync('userInfo').id,
								orderId: _this.id
							}
						}, 
						(res) => {},
						(error) => {},
						(res) => {},
						true,
						true
					);
				},
				fail: function (err) {

				}
			});
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
				'swoft/api/news/getNewsCommentList',
				{
					data: {
						newsId: _this.id,
						page: page,
						limit: 10
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
				},
				true,
				true
			);
		},
		getNewsDetail: function(){
			_this.pageLoading = true;
			uni.gRequest.post(
				'swoft/api/news/getNewsDetail',
				{
					data: {
						id: _this.id,
						uid: uni.getStorageSync('userInfo').id
					}
				}, 
				(res) => {
					if(res.code == 0){
						_this.bannerList = [];
						if(res.data.cover){
							res.data.cover.forEach((item)=>{
								_this.bannerList.push({
									img: item+'?imageslim',
									title: '',
									url: '',
									opentype: 'click'
								});
							});
						}
						_this.data = res.data;
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
		navBack: function(){
			uni.navigateBack({
				delta: 1
			})
		},
		submit: function(e){
			let formData = {};
			formData.content = e.content;
			var rule = [
				{name: "content", checkType: "notnull", checkRule: "", errorMsg: "请输入评论内容"},
			];
			var checkRes = graceChecker.check(formData, rule);
			if(!checkRes){
				_this.$refs.guiPage.openMessage('default',graceChecker.error,true,1500);
				return false;
			}
			formData.uid = uni.getStorageSync('userInfo').id;
			formData.newsId = _this.id;
			_this.pageLoading = true;
			uni.gRequest.post(
				'swoft/api/news/addNewsComment',
				{
					data: formData
				}, 
				(res) => {
					if(res.code == 0){
						_this.$refs.guiPage.openMessage('success','提交成功',true,1500);
						if(res.data == 0){
							setTimeout(function(){
								_this.reload();
								_this.data.commentCount += 1;
							},1500);
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
				},
				true,
				true
			);
		},
		newsLikeActive: function(){
			_this.pageLoading = true;
			let status = 0;
			if(_this.data.isLike > 0){
				status = -1;
			}else{
				status = 1;
			}
			uni.gRequest.post(
				'swoft/api/news/newsLikeActive',
				{
					data: {
						newsId: _this.id,
						uid: uni.getStorageSync('userInfo').id,
						status: status
					}
				}, 
				(res) => {
					if(res.code == 0){
						let msg = '';
						if(status == 1){
							msg = '喜欢+1';
							_this.data.isLike = 1;
							_this.data.likeCount += 1;
						}else{
							msg = '已取消';
							_this.data.isLike = 0;
							_this.data.likeCount -= 1;
						}
						_this.$refs.guiPage.openMessage('success',msg,true,1500);
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
		doCollect: function(){
			let url = '';
			if(_this.data.isCollect == 0){
				url = 'UserCollect';
			}else{
				url = 'delCollect';
			}
			_this.pageLoading = true;
			uni.gRequest.post(
				'swoft/api/goods/'+url,
				{
					data: {
						linkId: _this.id,
						type: 2,
						uid: uni.getStorageSync('userInfo').id
					}
				}, 
				(res) => {
					if(res.code == 0){
						let msg = '';
						if(_this.data.isCollect == 0){
							_this.data.isCollect = 1;
							_this.data.collectCount += 1;
							msg = '已收藏';
						}else{
							_this.data.isCollect = 0;
							_this.data.collectCount -= 1;
							msg = '已取消';
						}
						_this.$refs.guiPage.openMessage('success',msg,true,1500);
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
	},
	components: {
		jyfParser
	}
}
</script>
<style>
	@import url('../../static/css/li.css');
	.btnleft{background-color: #DEDEDE;width: 234rpx;line-height: 64rpx;border-radius: 32rpx;}
	.bgF5F5F9{background-color: #F5F5F9}
	.title{width:624rpx;line-height: 64rpx;border-radius: 32rpx;}
	.mt30{margin-top: 30rpx;}
	.ml30{margin-left: 30rpx;}
	.mr10{margin-right: 10rpx;}
	.f32{font-size: 30rpx;}
	.w110{width: 100rpx;}
	.gui-header-leader-btns{width:68rpx; line-height:60rpx; font-size:50rpx; text-align:center; margin-left: 10rpx;}
	.img34{ width: 34rpx; height: 34rpx; margin: 0 auto;}
	.img34 image{width:100%;height:100%;}
	.btnStatus{width:500rpx;height:80rpx;line-height:80rpx;border-radius:40rpx;margin:0 auto;}
</style>
