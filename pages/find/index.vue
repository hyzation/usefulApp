<template>
	<gui-page :isLoading="pageLoading" ref="guiPage">
		<view slot="gBody">
			<view class="wp100" v-if="videoUrl != ''">
				<video id="myVideo" 
				class="gui-course-video" 
				object-fit="contain"
				:src="videoUrl" 
				:poster="videoUrl+'?vframe/jpg/offset/1'"
				 controls></video>
			</view>
			<view class="pb30">
				<block>
					<view class="w710 bgff mauto_ br10">
						<view class="p20 mt20">
							<view class="gui-flex gui-align-items-center gui-space-between">
								<view class="f30 fb">玩转有用App</view>
								<navigator url="/pages/find/list?type=1" class="f26 c999999" hover-class="">更多<text class="gui-icons">&#xe601;</text></navigator>
							</view>
							<view class="mt30 f28">
								<navigator :url="'/pages/home/content?type=faxian&id='+item.id" hover-class="" v-for="(item,index) in list1" :index="index" class="gui-ellipsis mt20">{{item.title}}</navigator>
								<view v-if="list1.length == 0" class="gui-flex gui-justify-content-center gui-align-items-center bgFFFFFF br10" style="height:300rpx;width:670rpx;margin:0 auto;">
									<gui-image src="../../static/images/noData.png" :width="396" :height="226" :timer="0"></gui-image>
								</view>
							</view>
						</view>
					</view>
					<view class="mt20" v-if="coverpath != ''">
						<view class="w710 mauto_ gui-border-radius-large">
							<gui-image :src="coverpath" :height="180" :width="710" borderRadius="10rpx"></gui-image>
						</view>
					</view>
				</block>
				<block>
					<view class="w710 bgff mauto_ br10">
						<view class="p20 mt20">
							<view class="gui-flex gui-align-items-center gui-space-between">
								<view class="f30 fb">直播课堂</view>
								<navigator url="/pages/find/list?type=2" class="f26 c999999" hover-class="">更多<text class="gui-icons">&#xe601;</text></navigator>
							</view>
							<view class="mt30 f28">
								<navigator :url="'/pages/home/content?type=faxian&id='+item.id" hover-class="" v-for="(item,index) in list2" :index="index" class="gui-ellipsis mt20">{{item.title}}</navigator>
								<view v-if="list2.length == 0" class="gui-flex gui-justify-content-center gui-align-items-center bgFFFFFF br10" style="height:300rpx;width:670rpx;margin:0 auto;">
									<gui-image src="../../static/images/noData.png" :width="396" :height="226" :timer="0"></gui-image>
								</view>
							</view>
						</view>
					</view>
					<view class="mt20" v-if="coverpath1 != ''">
						<view class="w710 mauto_ gui-border-radius-large">
							<gui-image :src="coverpath1" :height="180" :width="710" borderRadius="10rpx"></gui-image>
						</view>
					</view>
				</block>
				<block>
					<view class="w710 bgff mauto_ br10">
						<view class="p20 mt20">
							<view class="gui-flex gui-align-items-center gui-space-between">
								<view class="f30 fb">金帖分享</view>
								<navigator url="/pages/find/list?type=3" class="f26 c999999" hover-class="">更多<text class="gui-icons">&#xe601;</text></navigator>
							</view>
							<view class="mt30 f28">
								<navigator :url="'/pages/home/content?type=faxian&id='+item.id" hover-class="" v-for="(item,index) in list3" :index="index" class="gui-ellipsis mt20">{{item.title}}</navigator>
								<view v-if="list3.length == 0" class="gui-flex gui-justify-content-center gui-align-items-center bgFFFFFF br10" style="height:300rpx;width:670rpx;margin:0 auto;">
									<gui-image src="../../static/images/noData.png" :width="396" :height="226" :timer="0"></gui-image>
								</view>
							</view>
						</view>
					</view>
				</block>
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
			videoUrl: '',
			coverpath: '',
			coverpath1: '',
			list1: [],
			list2: [],
			list3: [],
		}
	},
	onLoad: function(){
		_this = this;
		_this.getFaxianConfig();
		_this.getFaxianList(1);
		_this.getFaxianList(2);
		_this.getFaxianList(3);
	},
	methods:{
		getFaxianConfig: function(){
			_this.pageLoading = true;
			uni.gRequest.post(
				'swoft/api/faxian/getFaxianConfig',
				{
					data: {}
				}, 
				(res) => {
					if(res.code == 0){
						_this.videoUrl = res.data[0].video;
						_this.coverpath = res.data[0].coverpath;
						_this.coverpath1 = res.data[0].coverpath1;
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
		getFaxianList: function(e){
			uni.gRequest.post(
				'swoft/api/faxian/getFaxianList',
				{
					data: {
						type: e,
						isIndex: 1
					}
				}, 
				(res) => {
					if(res.code == 0){
						if(e == 1){
							_this.list1 = res.data.data;
						}else if(e == 2){
							_this.list2 = res.data.data;;
						}else{
							_this.list3 = res.data.data;;
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
		}
	}
}
</script>
<style>
	@import url('../../static/css/li.css');
	page{background-color: #F5F5F9}
	.gui-course-video{width:750rpx;}
	.w710{width:710rpx;}
	.fw500{font-weight:500;}
	.mauto_{margin:0 auto;}
</style>
