<template>
	<gui-page ref="guiPage" :isLoading="pageLoading">
		<view slot="gBody">
			<view v-if="bannerList.length > 0" class="plr20 bgFF ptb20 mb20">
				<gui-swiper :swiperItems="bannerList" :spacing="0" :width="710" :height="272" :indicatorActiveWidth="20" :indicatorBarHeight="30" :indicatorWidth="14" :indicatorHeight="6" indicatorColor="#E7E7E7" indicatorActiveColor="#ffffff"></gui-swiper>
			</view>
			<view class="mlr20 mt20">
				<view class="f28 fb mb20" v-if="list1.length > 0">有用活动</view>
				<view class="gui-flex gui-space-between gui-wrap">
					<view @tap="navToUrl(item.url)" v-for="(item,index) in list1" :key="index" class="bgFF br10 p20 gui-border-box gui-flex gui-align-items-center box2Li mb20 gui-relative">
						<view class="img gui-flex gui-justify-content-center gui-align-items-center mr20 no-scale">
							<image :src="item.src" mode="widthFix"></image>
						</view>
						<text class="f28" :class="item.online == 0 ? 'c999' : ''">{{item.title}}</text>
						<view v-if="item.online == 0" class="bgc gui-flex gui-align-items-end gui-justify-content-end">
							<text class="mr10 mb10">敬请期待</text>
						</view>
					</view>
				</view>
				<view class="f28 fb mb20" v-if="list2.length > 0">有用福利</view>
				<view class="gui-flex gui-space-between gui-wrap">
					<view @tap="navToUrl(item.url)" v-for="(item,index) in list2" :key="index" class="bgFF br10 p20 gui-border-box gui-flex gui-align-items-center box2Li mb20 gui-relative">
						<view class="img gui-flex gui-justify-content-center gui-align-items-center mr20 no-scale">
							<image :src="item.src" mode="widthFix"></image>
						</view>
						<text class="f28" :class="item.online == 0 ? 'c999' : ''">{{item.title}}</text>
						<view v-if="item.online == 0" class="bgc gui-flex gui-align-items-end gui-justify-content-end">
							<text class="mr10 mb10">敬请期待</text>
						</view>
					</view>
				</view>
				<view class="f28 fb mb20" v-if="list3.length > 0">其他福利</view>
				<view class="gui-flex gui-space-between gui-wrap">
					<view @tap="navToUrl(item.url)" v-for="(item,index) in list3" :key="index" class="bgFF br10 p20 gui-border-box gui-flex gui-align-items-center box2Li mb20 gui-relative">
						<view class="img gui-flex gui-justify-content-center gui-align-items-center mr20 no-scale">
							<image :src="item.src" mode="widthFix"></image>
						</view>
						<text class="f28" :class="item.online == 0 ? 'c999' : ''">{{item.title}}</text>
						<view v-if="item.online == 0" class="bgc gui-flex gui-align-items-end gui-justify-content-end">
							<text class="mr10 mb10">敬请期待</text>
						</view>
					</view>
				</view>
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
			bannerList: [],
			list1: [],
			list2: [],
			list3: []
		}
	},
	onLoad: function(){
		_this = this;
		_this.getBannerList();
		_this.getWelfareList();
	},
	onShow: function(){
		
	},
	methods: {
		getWelfareList() {
			uni.gRequest.post(
				'swoft/api/fuligou/getWelfareList',
				{
					data: {}
				}, 
				(res) => {
					if(res.code == 0){
						_this.list1 = res.data.list1;
						_this.list2 = res.data.list2;
						_this.list3 = res.data.list3;
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
		getBannerList: function(){
			uni.gRequest.post(
				'swoft/api/banner/getBannerList',
				{
					data: {
						type: 5
					}
				}, 
				(res) => {
					if(res.code == 0){
						_this.bannerList = [];
						res.data.forEach((item)=>{
							let li = {};
							li.img = item.path+'?imageslim';
							li.title = '';
							li.url = item.url;
							if(item.url != ''){
								li.opentype = 'navigate';
							}else{
								li.opentype = 'click';
							}
							_this.bannerList.push(li);
						});
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
		navToUrl: function(e){
			if(e && e != ''){
				uni.navigateTo({
					url: e
				})
			}else{
				_this.$refs.guiPage.openMessage('default','暂未开放',true,1500);
			}
		}
		
	}
}
</script>
<style>
	@import url('../../static/css/du.css');
	.box2Li{ width: 345rpx;overflow:hidden;}
	.box2Li .img{ width: 90rpx; height: 90rpx;}
	.box2Li .img image{width:100%;height:100%;}
	.c999{color:#999999;}
	.opacity5{opacity:0.5;}
	.bgc{width:100%;height:100%;position:absolute;left:0;top:0;background-color:rgba(0,0,0,0.35);text-align:center;color:#FFFFFF;font-size:24rpx;line-height:1;}
	.mb10{margin-bottom:10rpx;}
</style>