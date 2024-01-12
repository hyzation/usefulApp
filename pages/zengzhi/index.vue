<template>
	<gui-page ref="guiPage" :isLoading="pageLoading">
		<view slot="gBody">
			<view v-if="bannerList.length > 0" class="plr20 bgFF ptb20 mb20">
				<gui-swiper :swiperItems="bannerList" :spacing="0" :width="710" :height="272" :indicatorActiveWidth="20" :indicatorBarHeight="30" :indicatorWidth="14" :indicatorHeight="6" indicatorColor="#E7E7E7" indicatorActiveColor="#ffffff"></gui-swiper>
			</view>
			<view class="zzbox mlr20 mt30" v-if="list1.length > 0 || list2.length > 0">
				<view class="gui-flex gui-space-between gui-wrap" v-if="list1.length > 0">
					<view @tap="navToUrl(item.id)" class="zzboxLi" v-for="(item, index) in list1" :key="index">
						<view class="img_ gui-flex gui-justify-content-center gui-align-items-center">
							<image class="br10" :src="item.path+'?imageslim'" mode="widthFix"></image>
						</view>
					</view>
				</view>
				<view class="gui-flex gui-space-between gui-wrap mt20" v-if="list2.length > 0">
					<view @tap="navToUrl(item.id)" class="zzboxLi" v-for="(item, index) in list2" :key="index">
						<view class="img gui-flex gui-justify-content-center gui-align-items-center">
							<image class="br10" :src="item.path+'?imageslim'" mode="widthFix"></image>
						</view>
					</view>
				</view>
			</view>
			<view class="bgFF plr20 pt20 br10 mlr20 mb20 mt20" v-if="list3.length > 0">
				<gui-progress-scrollview :width="680" progressPosition="center"
				:progressWidth="list3.length>10?100:0" progressBarBG="#FF4F00">
					<view v-for="(item, index) in list3Trans" :key="index" class="gui-scroll-x-items gui-flex gui-wrap" hover-class="gui-tap" style="width:680rpx;">
						<view @tap="cpsGet(item1.linkurl)" v-for="(item1, index1) in item" :key="index1" class="box5Li gui-flex gui-columns gui-align-items-center pt20 pb50 mt20">
							<view class="img gui-flex gui-justify-content-center gui-align-items-center">
								<image :src="item1.path+'?imageslim'" mode="widthFix"></image>
							</view>					
							<view class="f26 mt20">{{item1.title}}</view>
						</view>
					</view>
				</gui-progress-scrollview>
				<view v-if="list3.length > 10" class="pt20 wp100"></view>
			</view>
			<view class="mlr20 gui-flex gui-wrap mt40">
				<view class="box3Li mb40">
					<navigator url="/pages/zengzhi/pos/index" hover-class="" class="img gui-flex gui-justify-content-center gui-align-items-center">
						<image src="../../static/images/box/zengzhi1.png" mode="widthFix"></image>
					</navigator>
				</view>
				<view class="box3Li mb40">
					<view @tap="navToUrl_('/pages/zengzhi/wuka/index')" class="img gui-flex gui-justify-content-center gui-align-items-center">
						<image src="../../static/images/box/zengzhi2.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="box3Li mb40">
					<navigator url="/pages/zengzhi/fawu/index" hover-class="" class="img gui-flex gui-justify-content-center gui-align-items-center">
						<image src="../../static/images/box/zengzhi3.png" mode="widthFix"></image>
					</navigator>
				</view>
				<view class="box3Li mb40">
					<view @tap="navToUrl(0)" class="img gui-flex gui-justify-content-center gui-align-items-center">
						<image src="../../static/images/box/zengzhi4.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="box3Li mb40">
					<view @tap="navToUrl(0)" class="img gui-flex gui-justify-content-center gui-align-items-center">
						<image src="../../static/images/box/zengzhi5.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="box3Li mb40">
					<view @tap="navToUrl(0)" class="img gui-flex gui-justify-content-center gui-align-items-center">
						<image src="../../static/images/box/zengzhi6.png" mode="widthFix"></image>
					</view>
				</view>
			</view>
			<view class="br10_t gui-flex gui-space-between gui-align-items-center mlr20 plr30 bgDC261F cff ptb20">
				<text class="f28">电影·正在热映</text>
				<text @tap="cpsGet(movieUrl)" class="gui-icons f24">更多 &#xe601;</text>
			</view>
			<view class="bgFF br10_b p20 mlr20 mb20" v-if="movieList.length > 0">
				<gui-progress-scrollview :progressWidth='0' :width='690' class="mt20">
					<view @tap="cpsGet(movieUrl)" v-for="(item,index) in movieList" :key='index' :class="['mr20 gui-scroll-x-items gui-align-items-center gui-columns pb20',index==0?'':'pl20']">
						<view class="no-scale">
							<gui-image :src="item.coverPath+'?imageslim'" :width="160" :height="240" borderRadius="5rpx"></gui-image>
						</view>
						<view class="f24 gui-ellipsis pt10 gui-text" style="width: 160rpx;">{{item.title}}</view>
						<button class="btnBg7 btnSize48 borRadAll mt20 f24">购票</button>
					</view>
				</gui-progress-scrollview>
			</view>
			<view class="mlr20 mt30">
				<gui-progress-scrollview :progressWidth='0' :width='710'>
					<view @tap="nav2Change(index)" v-for="(item,index) in cateList" :key='index' :class="['mr20 nav2 gui-scroll-x-items gui-align-items-center gui-columns pb20',index==0?'':'pl40',index==nav2Index?'active':'']">
						<view class="t1 f36 fB400">{{item.title}}</view>
						<view class="t2 btnSize48 borRadAll mt10">{{item.desc}}</view>
					</view>
				</gui-progress-scrollview>
			</view>
			<view class="box2 mlr20 mb20 gui-flex gui-space-between gui-wrap">
				<view @tap="navToTabaoGoods(item.id)" v-for="(item,index) in goodsList" :key="index" :class="['box2Li bgFF br10',index>1?'mt20':'mt10']">
					<gui-image :src="item.mainPic" :width="345" :height="345" borderRadius="10rpx 10rpx 0rpx 0rpx"></gui-image>
					<view class="p20">
						<view class="f24 line2"><text class="btnSize26 bgF7142C cff gui-border-radius-small mr10">天猫</text>{{item.title}}</view>
						<view class="mt20 gui-flex gui-space-between gui-align-items-center">
							<view class="btnBg7 gui-border-radius-small gui-flex gui-align-items-center gui-space-between f28" style="padding: 1px;">
								<text class="plr10 cff">券</text>
								<text class="cDC261F bgFF plr10">{{item.couponPrice}}元</text>
							</view>
							<text class="f20 c99 pr20">已售：{{item.monthSales >= 10000 ? Math.round(item.monthSales/10000,1)+'万+' : item.monthSales}}</text>
						</view>
						<view class="ptb10">
							<text class="f20 cDC261F">券后 </text>
							<text class="f28 cDC261F">￥{{item.actualPrice}}</text>
							<text class="f24 c99 gui-line-through ml10">￥{{item.originalPrice}}</text>
						</view>
					</view>
					<view class="bgDC261F cff f28 gui-text-center br10_b ptb15">返￥{{item.money}}</view>
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
			list3: [],
			nav2Index: 0,
			movieUrl: '',
			movieList: [],
			userInfo: null,
			taoBaoCate: [],
			cateList: [
				{cid: '', sort: '4', title: '有用精选', desc: '大额返佣'},
				{cid: '1', sort: '0', title: '女装', desc: '低至3折'},
				{cid: '9', sort: '0', title: '男装', desc: '平价好货'},
				{cid: '4', sort: '0', title: '居家日用', desc: '居家必备'},
			],
			goodsList: []
		}
	},
	computed: {
		list3Trans: function () {
			let num = 10;
			let iconsArr = []; // 声明数组
			this.list3.forEach((item, index) => {
				let page = Math.floor(index / num); // 计算该元素为第几个素组内
				if (!iconsArr[page]) {
				 // 判断是否存在
				 iconsArr[page] = [];
				}
				iconsArr[page].push(item);
			});
			return iconsArr;
		}
	},
	onLoad: function(){
		_this = this;
		_this.getBannerList();
		_this.getCpsList(1);
		_this.getCpsList(2);
		_this.getCpsList(3);
		_this.getCpsMovieList();
		_this.getTaobaoGoodsList();
	},
	onShow: function(){
		_this.getUserInfo();
	},
	methods: {
		getTaobaoGoodsList: function(){
			let postData = {
				page: 1,
				limit: 10,
				cids: _this.cateList[_this.nav2Index].cid,
				sort: _this.cateList[_this.nav2Index].sort,
				keyWords: ''
			}
			_this.pageLoading = true;
			uni.gRequest.post(
				'swoft/api/taobao/getTaobaoGoodsList',
				{
					data: postData
				}, 
				(res) => {
					if(res.code == 20000){
						_this.goodsList = res.data.data;
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
		getCpsMovieList: function(){
			uni.gRequest.post(
				'swoft/api/cps/getCpsMovieList',
				{
					data: {
						page: 1,
						limit: 20
					}
				}, 
				(res) => {
					if(res.code == 0){
						_this.movieList = res.data.data;
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
		getCpsList: function(e){
			uni.gRequest.post(
				'swoft/api/cps/getCpsList',
				{
					data: {
						type: e
					}
				}, 
				(res) => {
					if(res.code == 0){
						if(e == 1){
							_this.list1 = res.data;
						}else if(e == 2){
							_this.list2 = res.data;
						}else if(e == 3){
							_this.list3 = res.data;
							res.data.forEach((item)=>{
								if(item.id == 6){
									_this.movieUrl = item.linkurl;
								}
							})
						}
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
		nav2Change: function(index){
			if(index != _this.nav2Index){
				_this.nav2Index = index;
				_this.getTaobaoGoodsList();
			}
		},
		getBannerList: function(){
			uni.gRequest.post(
				'swoft/api/banner/getBannerList',
				{
					data: {
						type: 4
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
		cpsGet: function(e){
			if(e == '/pages/zengzhi/yrapi/yrapi?navIndex=0' || e == '/pages/zengzhi/yrapi/yrapi?navIndex=1'){
				uni.navigateTo({
					url: e
				});
				return false;
			}
			_this.pageLoading = true;
			uni.gRequest.post(
				'swoft/admin/common/getCpsLink',
				{
					data: {
						url: e+'&sid='+uni.getStorageSync('userInfo').id
					}
				}, 
				(res) => {
					if(res.code == 20000){
						// #ifdef APP-PLUS
						uni.navigateTo({
							url: `/pages/home/web?url=${encodeURIComponent(res.data.h5_url)}`
						})
						// #endif
						// #ifdef H5
						window.location.href = res.data.h5_url;
						// #endif
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
				true
			);
		},
		navToUrl: async function(e){
			let url = '';
			if(e == 1){
				if(_this.userInfo.isTb == 0){
					_this.pageLoading = true;
					uni.gRequest.post(
						'swoft/api/taobao/getCode',
						{
							data: {
								uid: uni.getStorageSync('userInfo').id
							}
						}, 
						(res) => {
							if(res.code == 20000){
								_this.pageLoading = false;
								// 进入淘宝授权
								let openUrl = res.data;
								// #ifdef APP-PLUS
								if(plus.runtime.isApplicationExist({  
								    pname: 'com.taobao.taobao',  
								    action: 'taobao://'
								})){
									openUrl = 'taobao'+openUrl.slice(5);
									plus.runtime.openURL(
										openUrl,
										function(res){
											console.log(res);
										},
										'com.taobao.taobao'
									);
								}else{
									uni.navigateTo({
										url: `/pages/home/web?url=${encodeURIComponent(openUrl)}`
									})
								}
								// #endif
								// #ifdef H5
								window.location.href = openUrl;
								// #endif
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
					return false;
				}else{
					url = '/pages/zengzhi/shop/taobao';
				}
			}else if(e == 2){
				_this.pageLoading = true;
				let res = await uni.gRequest.postSync(
					'swoft/api/pdd/pddShouQuan',
					{
						data: {
							uid: uni.getStorageSync('userInfo').id
						}
					},
					true,
					true
				);
				_this.pageLoading = false;
				if(res){
					if(res.code == 20000){
						if(res.data.H5Url && res.data.AppUrl){
							// #ifdef APP-PLUS
							if(plus.runtime.isApplicationExist({  
							    pname: 'com.xunmeng.pinduoduo',  
							    action: 'pinduoduo://'
							})){
								plus.runtime.openURL(
									res.data.AppUrl,
									function(res){
										console.log(res);
									},
									'com.xunmeng.pinduoduo'
								);
							}else{
								uni.navigateTo({
									url: `/pages/home/web?url=${encodeURIComponent(res.data.H5Url)}`
								})
							}
							// #endif
							// #ifdef H5
							window.location.href = res.data.H5Url;
							// #endif
							return false;
						}else{
							url = '/pages/zengzhi/shop/pdd';
						}
					}else{
						_this.$refs.guiPage.openMessage('default',res.msg,true,1500);
						return false;
					}
				}else{
					_this.$refs.guiPage.openMessage('default','请求失败',true,1500);
					return false;
				}
			}else if(e == 3){
				url = '/pages/zengzhi/hongbao/meituan';
			}else if(e == 4){
				url = '/pages/zengzhi/hongbao/elm';
			}else if(e == 5){
				url = '/pages/zengzhi/hongbao/didi';
			}else{
				_this.$refs.guiPage.openMessage('default','暂未开放',true,1500);
				return false;
			}
			uni.navigateTo({
				url: url
			})
		},
		navToTabaoGoods: function(e){
			if(_this.userInfo.isTb == 0){
				_this.pageLoading = true;
				uni.gRequest.post(
					'swoft/api/taobao/getCode',
					{
						data: {
							uid: uni.getStorageSync('userInfo').id
						}
					}, 
					(res) => {
						if(res.code == 20000){
							// 进入淘宝授权
							let openUrl = res.data;
							// #ifdef APP-PLUS
							if(plus.runtime.isApplicationExist({  
							    pname: 'com.taobao.taobao',  
							    action: 'taobao://'
							})){
								openUrl = 'taobao'+openUrl.slice(5);
								plus.runtime.openURL(
									openUrl,
									function(res){
										console.log(res);
									},
									'com.taobao.taobao'
								);
							}else{
								uni.navigateTo({
									url: `/pages/home/web?url=${encodeURIComponent(openUrl)}`
								})
							}
							// #endif
							// #ifdef H5
							window.location.href = openUrl;
							// #endif
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
				return false;
			}else{
				uni.navigateTo({
					url: '/pages/zengzhi/shop/taobaoGoods?id='+e
				})
			}
		},
		navToUrl_: function(e){
			if(uni.getStorageSync('userInfo').dalongStaff != 1){
				_this.$refs.guiPage.openMessage('default','请先进行实名认证',true,1500);
				setTimeout(function(){
					uni.navigateTo({
						url: '/pages/my/setting/auto'
					})
				},1500)
				return false;
			}
			uni.navigateTo({
				url: e
			})
		}
	}
}
</script>
<style>
	@import url('../../static/css/du.css');
	.box5Li{ width: 104rpx; margin-left: 40rpx;}
	.box5Li .img{ width: 66rpx; height: 66rpx;}
	.box5Li .img image{width:100%;height:100%;}
	.box5Li:nth-child(5n+1){ margin-left: 0;}
	.zzbox .zzboxLi { margin-bottom: 20rpx;}
	.zzbox .zzboxLi .img_{ width: 346rpx; height: 130rpx;}
	.zzbox .zzboxLi .img{ width: 226rpx; height: 130rpx;}
	.zzbox .zzboxLi .img image{width:100%;height:100%;}
	.box3Li{ width: 220rpx; margin-left: 25rpx;}
	.box3Li .img{ width: 220rpx; height: 130rpx;}
	.box3Li .img image{width:100%;height:100%;}
	.box3Li:nth-child(3n+1){ margin-left: 0;}
	.br10_t{ border-top-left-radius: 10rpx; border-top-right-radius: 10rpx;}
	.br10_b{ border-bottom-left-radius: 10rpx; border-bottom-right-radius: 10rpx;}
	.pl40{ padding-left: 40rpx;}
	.nav2 .t1{ color: #545454;}
	.nav2 .t2{ color: #414141;}
	.nav2.active .t1{ color: #DC261F; }
	.nav2.active .t2{ color: #FFFFFF; background: #DC261F;}
	.box2Li{ width: 345rpx;}
	.box2Li .img{ width: 345rpx; height: 345rpx;}
	.box2Li .img image{width:100%;height:100%;}
	.bgF7142C{ background: #F7142C;}
</style>