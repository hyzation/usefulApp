<template>
	<gui-page :isLoading="pageLoading"
		:customHeader="true" 
		:headerSets="{height:0, zIndex:100, backgroundColor:'rgba(255,255,255,0)'}" 
		statusBarStyle="background-color:#F9F9F9" 
		ref="guiPage">
		<view slot="gFixedTop" class="plr20 gui-border-box pt20 pb10 bgF9F9F9">
			<view class="gui-flex gui-space-between gui-align-items-center ">
				<navigator url="/pages/my/signIn" hover-class="" class="img38 borRadAll no-scale gui-flex gui-align-items-center bgFFECDF p3">
					<view class="img44 gui-flex gui-justify-content-center gui-align-items-center">
						<image src="../../static/images/box/icon1.png" mode="aspectFit"></image>
					</view>
					<text class="f26 cFF4F00 ml10 pr15">签到</text>
				</navigator>
				<navigator url="/pages/my/task/poster" hover-class="" class="img38 borRadAll no-scale gui-flex gui-align-items-center bgFFECDF p3">
					<view class="img44 gui-flex gui-justify-content-center gui-align-items-center">
						<image src="../../static/images/box/icon2.png" mode="aspectFit"></image>
					</view>	
					<text class="f26 cFF4F00 ml10 pr15">分享</text>
				</navigator>
			</view>
			<navigator url="/pages/home/search" hover-class="" class="borFF4F00 borRadAll mt20 p3">
				<view class="bgFF borRadAll gui-flex gui-space-between gui-align-items-center">
					<view style="margin-left:25rpx;" class="gui-flex gui-align-items-center">
						<gui-image src="../../static/images/zheng/search.png" :width="30" :height="30"></gui-image>
						<view class="h30 gui-relative borderLeft" style="margin:0 12rpx;"></view>
						<text class="fm f28 c454545">搜索</text>
					</view>
					<button class="no-scale btnSize58 btnBg4 borRadAll" hover-class="">搜索</button>
				</view>					
			</navigator>
		</view>
		<view slot="gBody">
			<view style="height:170rpx;"></view>
			<view v-if="bannerList.length > 0" class="plr20 mb20">
				<gui-swiper :swiperItems="bannerList" :spacing="0" :width="710" :height="272" :indicatorActiveWidth="20" :indicatorBarHeight="30" :indicatorWidth="14" :indicatorHeight="6" indicatorColor="#E7E7E7" indicatorActiveColor="#ffffff"></gui-swiper>
			</view>
			<view v-if="navList.length > 0" class="bgBox4 br10 mlr20 p20 gui-flex gui-wrap mb20">
				<block v-for="(item,index) in navList" :key="index">
					<navigator :url="item.url" hover-class="" class="wp25 gui-flex gui-columns gui-align-items-center" :class="index > 3 ? 'mt30' : ''" hover-class="">
						<view class="img90"><image :src="item.path+'?imageslim'" mode="widthFix"></image></view>
						<view class="f28 pt10">{{item.title}}</view>
					</navigator>
				</block>
			</view>
			<view v-if="activityList.length > 0" class="box2 mlr20 mb20 gui-flex gui-space-between gui-wrap">
				<block v-for="(item,index) in activityList" :key="index">
					<navigator :url="item.url" hover-class="" class="box2Li" :class="index > 1 ? 'mt26' : ''">
						<view class="img145 gui-flex gui-justify-content-center gui-align-items-center">
							<image class="br10 wp100 hp100" :src="item.path+'?imageslim'" mode="aspectFill"></image>
						</view>
					</navigator>
				</block>
			</view>
			<view class="navTab gui-flex gui-align-items-center gui-justify-content-end">
				<gui-switch-navigation v-if="cateList1.length > 0" :items="cateList1" @change="cateChange1" keyStr="title" color="#000000"
					:currentIndex="cateIndex1" leftTitle="新农食推荐"
					activeLineBg="linear-gradient(to right, #ED6A0C, #ED6A0C)" activeLineHeight="6rpx" :activeFontWeight="400"
					activeColor="#ED6A0C" activeLineRadius="6rpx" activeDirection="center" activeFontSize="30rpx"
					activeLineWidth="70%" :size="0" padding="0" :margin="35" :width="750" lineHeight="40rpx" fontSize="30rpx">
				</gui-switch-navigation>
			</view>
			<view v-if="goodsList1 && goodsList1.length > 0" class="gui-flex gui-space-between gui-wrap plr20">
				<block v-for="(item,index) in goodsList1" :key="index">
					<navigator :url="'/pages/home/goods?id='+item.id" hover-class="" class="box2Li bgFF br10 mt20">
						<gui-image :src="item.coverPath+'?imageslim'" :width="345" :height="345" borderRadius="10rpx 10rpx 0rpx 0rpx"></gui-image>
						<view class="p20">
							<view class="f28 line2" style="height:68rpx;line-height:34rpx;">{{item.title}}</view>
							<view class="gui-flex gui-align-items-center gui-space-between mt20">
								<view>
									<view class="fm f28 cFF4F00">￥<text class="f34 mr10">{{item.price}}</text></view>
                                    <view class="fm f24 cFF4F00">绿色积分：{{ item.equity_num }}</view>
									<view class="fm f24 c999999">￥<text class="f26 mr10 gui-line-through">{{item.rePrice}}</text></view>
								</view>
								<gui-image src="../../static/images/zheng/gwc.png" :width="46" :height="46"></gui-image>
							</view>
						</view>						
					</navigator>
				</block>
				<view class="gui-flex gui-align-items-center gui-justify-content-center wp100">
					<navigator url="/pages/home/nongshi" hover-class="" class="fm f28 c999999 gui-text-center" style="height:80rpx;line-height:80rpx;">查看更多<text class="gui-icons ml10">&#xe601;</text></navigator>
				</view>
			</view>
            <view v-if="goodsList1.length == 0" class="wp100 gui-flex gui-justify-content-center gui-align-items-center bgFFFFFF br10" style="height:550rpx;width:710rpx;margin:0 auto;">
				<gui-image src="../../static/images/noData.png" :width="396" :height="226" :timer="0"></gui-image>
			</view>
			<view class="box3 m20 gui-flex" v-if="list2.length > 0">
				<view @tap="navToUrl(item.id)" class="box3Li" v-for="(item, index) in list2" :key="index">
					<view class="img gui-flex gui-justify-content-center gui-align-items-center">
						<image class="br10" :src="item.path+'?imageslim'" mode="widthFix"></image>
					</view>
				</view>
			</view>
			<view class="bgFF plr20 pt20 br10 mlr20 mb20" v-if="list3.length > 0">
				<gui-progress-scrollview :width="680" progressPosition="center" :progressWidth="list3.length > 10 ? 100 : 0" progressBarBG="#FF4F00">
					<view v-for="(item, index) in list3Trans" :key="index" class="gui-scroll-x-items gui-flex gui-wrap" hover-class="gui-tap" style="width:680rpx;">
						<view @tap="cpsGet(item1.linkurl)" v-for="(item1, index1) in item" :key="index1" class="box5Li gui-flex gui-columns gui-align-items-center pt20 pb30">
							<view class="img gui-flex gui-justify-content-center gui-align-items-center">
								<image :src="item1.path+'?imageslim'" mode="aspectFit"></image>
							</view>					
							<view class="f26 mt20">{{item1.title}}</view>
						</view>
					</view>
				</gui-progress-scrollview>
				<view v-if="list3.length > 10" class="pt20 wp100"></view>
			</view>
			<view class="navTab gui-flex gui-align-items-center gui-justify-content-end">
				<gui-switch-navigation v-if="cateList2" :items="cateList2" @change="cateChange2" keyStr="title" color="#000000"
					:currentIndex="cateIndex2" leftTitle="乐惠推荐"
					activeLineBg="linear-gradient(to right, #ED6A0C, #ED6A0C)" activeLineHeight="6rpx" :activeFontWeight="400"
					activeColor="#ED6A0C" activeLineRadius="6rpx" activeDirection="center" activeFontSize="30rpx"
					activeLineWidth="70%" :size="0" padding="0" :margin="35" :width="750" lineHeight="40rpx" fontSize="30rpx">
				</gui-switch-navigation>
			</view>
			<view class="mb20">
				<view class="gui-flex gui-space-between gui-wrap plr20" v-if="goodsList2 && goodsList2.length > 0">
					<block hover-class="" v-for="(item,index) in goodsList2" :key="index">
						<navigator :url="'/pages/ldd/goods?id='+item.id" hover-class="" class="box2Li bgFF br10 mt20">
							<gui-image :src="item.cover_url" :width="345" :height="345" borderRadius="10rpx 10rpx 0rpx 0rpx"></gui-image>
							<view class="p20">
								<view class="f28 line2" style="height:68rpx;line-height:34rpx;">{{item.title}}</view>
								<view class="gui-flex gui-align-items-center gui-space-between mt20">
									<view>
										<view class="fm f28 cFF4F00">￥<text class="f34 mr10">{{item.usefulPrice}}</text></view>
										<view class="fm f24 cFF4F00">绿色积分：{{ item.equity_num }}</view>
									</view>
									<gui-image src="../../static/images/zheng/gwc.png" :width="46" :height="46"></gui-image>
								</view>
							</view>
						</navigator>
					</block>
					<view class="gui-flex gui-align-items-center gui-justify-content-center wp100">
						<navigator url="/pages/ldd/index" hover-class="" class="fm f28 c999999 gui-text-center" style="height:80rpx;line-height:80rpx;">查看更多<text class="gui-icons ml10">&#xe601;</text></navigator>
					</view>
				</view>
				<view v-else class="gui-flex gui-justify-content-center gui-align-items-center bgFFFFFF br10" style="height:550rpx;width:710rpx;margin:0 auto;">
					<gui-image src="../../static/images/noData.png" :width="396" :height="226" :timer="0"></gui-image>
				</view>
			</view>
            <!-- start -->
            <view class="zzbox mlr20 mt30" v-if="list1.length > 0 || list2.length > 0">
            	<view class="gui-flex gui-space-between gui-wrap" v-if="list1.length > 0">
            		<view @tap="navToUrl2(item.id)" class="zzboxLi" v-for="(item, index) in list1" :key="index">
            			<view class="img_ gui-flex gui-justify-content-center gui-align-items-center">
            				<image class="br10" :src="item.path+'?imageslim'" mode="widthFix"></image>
            			</view>
            		</view>
            	</view>
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
            		<view @tap="navToUrl2(0)" class="img gui-flex gui-justify-content-center gui-align-items-center">
            			<image src="../../static/images/box/zengzhi4.png" mode="widthFix"></image>
            		</view>
            	</view>
            	<view class="box3Li mb40">
            		<view @tap="navToUrl2(0)" class="img gui-flex gui-justify-content-center gui-align-items-center">
            			<image src="../../static/images/box/zengzhi5.png" mode="widthFix"></image>
            		</view>
            	</view>
            	<view class="box3Li mb40">
            		<view @tap="navToUrl2(0)" class="img gui-flex gui-justify-content-center gui-align-items-center">
            			<image src="../../static/images/box/zengzhi6.png" mode="widthFix"></image>
            		</view>
            	</view>
            </view>
            <view class="br10_t gui-flex gui-space-between gui-align-items-center mlr20 plr30 bgDC261F cff ptb20">
            	<text class="f28">电影·正在热映</text>
            	<text @tap="cpsGet(movieUrl)" class="gui-icons f24">更多 &#xe601;</text>
            </view>
            <view class="bgFF br10_b p20 mlr20 mb20" v-if="movieList.length > 0">
                <view @tap="cpsGet(movieUrl)" v-for="(item,index) in movieList" :key='index' style="margin: 20rpx 30rpx;" :class="['gui-scroll-x-items gui-align-items-center gui-columns']">
                    <view class="no-scale">
                        <gui-image :src="item.coverPath+'?imageslim'" :width="160" :height="240" borderRadius="5rpx"></gui-image>
                    </view>
                    <view class="f24 gui-ellipsis pt10 gui-text" style="width: 160rpx;">{{item.title}}</view>
                    <button class="btnBg7 btnSize48 borRadAll mt20 f24">购票</button>
                </view>
            </view>
            <!-- end -->
			<gui-popup ref="guipopupCoupon" :canCloseByShade="false" position="center" width="750rpx">
				<view class="gui-flex gui-align-items-center gui-justify-content-center gui-wrap">
					<view class="couponBox">
						<scroll-view class="couponBoxC" :scroll-y="true">
							<block v-for="(item,index) in couponsList" :key="index">
								<view class="h20"></view>
								<view class="coupon gui-flex gui-align-items-center gui-space-between">
									<view class="couponl gui-flex gui-align-items-center gui-justify-content-center gui-wrap">
										<view>
											<view class="w100 cD13101 gui-flex gui-align-items-start gui-justify-content-center"><text class="f26 fh mt20">¥</text><text class="f70 fh">{{item.jian}}</text></view>
											<view class="w100 cD13101 f20" style="margin-top:-15rpx;">满{{item.man}}元可用</view>
										</view>
									</view>
									<view class="couponr gui-flex gui-align-items-center gui-wrap">
										<view class="w280">
											<view class="c313131 f28 gui-ellipsis">{{item.title}}</view>
											<view class="c313131 f22 mt10">
												<block v-if="item.cate == 0 && item.category == 0">全分类商品可用</block>
												<block v-if="item.cate != 0 && item.category == 0">限{{item.cateTitle}}类商品可用</block>
												<block v-if="item.cate != 0 && item.category != 0">限{{item.cateTitle}}-{{item.categoryTitle}}类商品可用</block>
											</view>
										</view>
									</view>
								</view>
							</block>
						</scroll-view>
						<view class="f30 cFFFFFF fm lh30 gui-text-center mt10">领取后放入抵扣券中</view>
						<view class="f36 c181818 fm couponBoxBtn" @tap="receiveCoupons">立即领取</view>
					</view>
					<view @tap="$refs.guipopupCoupon.close()" class="mt40"><gui-image src="../../static/images/zheng/close_.png" :timer="0" :width="70" :height="70"></gui-image></view>
				</view>
			</gui-popup>
			<gui-popup ref="guipopupHb" bgColor="rgba(0,0,0,0.85)" :zIndex="99" width="600rpx">
				<gui-image :src="path" :width="600" :height="870" borderRadius="20rpx"></gui-image>
				<!--  #ifndef H5 -->
				<view class="gui-flex gui-align-items-center gui-justify-content-center mt40">
					<view class="hBtn bgFFFFFF f28 fm" @tap="$refs.guipopupHb.close()">取消</view>
					<view class="hBtn bgFF4F00 f28 fm cFFFFFF" @tap="saveImage">保存图片</view>
				</view>
				<!--  #endif -->
				<!--  #ifdef H5 -->
				<view class="h5Desc fm">长按海报图片保存到手机或发送给朋友</view>
				<!--  #endif -->
			</gui-popup>
			<!-- <l-painter ref="painter" type="2d" class="lime-painter" isCanvasToTempFilePath @success="path = $event" css="width:1200rpx;background:#FFFFFF;border-radius:40rpx;display:flex;">
				<l-painter-image :src="indexShareCoverPath" css="width:1200rpx;height:1200rpx;border-radius:40rpx 40rpx 0 0;" />
				<l-painter-view css="margin:80rpx;display:flex;justify-content:center;height:160rpx;">
					<l-painter-image :src="userCode" css="width:160rpx;height:160rpx;" />
					<l-painter-view css="width:400rpx;display:inline-block;margin-left:36rpx;">
						<l-painter-view css="margin-top:4rpx;">
							<l-painter-text text="① 保存图片到相册" css="color:#999999;font-size:44rpx;" />
						</l-painter-view>
						<l-painter-view css="margin-top:30rpx;">
							<l-painter-text text="② 扫码下载有用APP" css="color:#999999;font-size:44rpx;" />
						</l-painter-view>
					</l-painter-view>
					<l-painter-image :src="logo" css="width:160rpx;height:160rpx;margin-left:280rpx;display:inline-block;" />
				</l-painter-view>
			</l-painter> -->
			<gui-modal ref="guimodal3" :isCloseBtn="false" title="更新提示" :zIndex="999">
				<view slot="content" class="plt30tb40 gui-bg-gray">
					<view class="gui-text-center f30 fm">有新的版本发布,确定要更新吗？</view>
					<view class="mt30 fm f26 plr50" style="line-height:40rpx">
						<text>{{versionDesc}}</text>
					</view>
				</view>
				<view slot="btns" class="gui-flex gui-rows gui-space-around">
					<view class="modal-btns" @tap="$refs.guimodal3.close()">
						<text class="c999999 fb">取消</text>
					</view>
					<view class="modal-btns" @tap="updateVersion">
						<text class="cFF4F00 fb">确定</text>
					</view>
				</view>
			</gui-modal>
			<gui-popup ref="guipopupScore" bgColor="rgba(0,0,0,0.5)" :zIndex="99" width="750rpx">
				<view class="scoreBox"></view>
				<view class="scoreBoxBtn f40 fb cDD281F" @tap="getTodayScore">立即领取</view>
				<view @tap="$refs.guipopupScore.close()" class="gui-flex gui-align-items-center gui-justify-content-center mt80"><gui-image src="../../static/images/score/close.png" :timer="0" :width="60" :height="60"></gui-image></view>
			</gui-popup>
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
			navList: [],
			speakerMsgs: [],
			activityList: [],
			cateList1: [],
			cateIndex1: -1,
			goodsList1: [],
			cateList2: [],
			cateIndex2: -1,
			goodsList2: [],
            list1: [],
			list2: [],
			list3: [],
			couponsList: [],
			indexShareCoverPath: '',
			userCode: '',
			logo: '',
			path: '',
			versionDesc: '',
			movieList: [],
			movieUrl: '',
		}
	},
	computed: {
		list3Trans: function () {
			let num = 10;
			let iconsArr = []; // 声明数组
			_this.list3.forEach((item, index) => {
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
		_this.getNavList();
		_this.getIsIndexNoticeList();
		_this.getActivityList();
		_this.getGoodsCategoryList(1);
		_this.getGoodsCategoryList(2);
		_this.getCouponsList();
		_this.getCpsList(1);
		_this.getCpsList(2);
		_this.getCpsList(3);
		_this.getLogo();
		_this.getIndexShareCover();
		_this.getUserCode();
        _this.getCpsMovieList();
		// #ifdef APP-PLUS
		_this.getConfigField();
		// #endif
	},
	onShow: function(){
		// _this.getTodayUnpacking();
	},
	onReady: function(){

	},
	onPullDownRefresh: function(){
		_this.pageLoading = true;
		_this.getBannerList();
		_this.getNavList();
		_this.getIsIndexNoticeList();
		_this.getActivityList();
		_this.getGoodsCategoryList(1);
		_this.getGoodsCategoryList(2);
		_this.getCouponsList();
		_this.getCpsList(1);
		_this.getCpsList(2);
		_this.getCpsList(3);
		_this.getLogo();
		_this.getIndexShareCover();
		_this.getUserCode();
        _this.getCpsMovieList();
		// _this.getTodayUnpacking();
		// #ifdef APP-PLUS
		_this.getConfigField();
		// #endif
		setTimeout(function(){
			uni.stopPullDownRefresh();
		},1500);
	},
	methods: {
		// Mins. 进入联盟专区
		gotoUnion (){
			uni.navigateTo({
				url: '/pages/union/index'
			});
		},
		getTodayScore() {
			_this.$refs.guipopupScore.close();
			uni.navigateTo({
				url: '/pages/fuligou/order'
			});
		},
		getTodayUnpacking() {
			uni.gRequest.post(
				'swoft/api/fuligou/getTodayUnpacking',
				{
					data: {
						uid: uni.getStorageSync('userInfo').id
					}
				}, 
				(res) => {
					if(res.code == 0){
						if(res.data > 0){
							_this.$refs.guipopupScore.open();
						}
					}
				},
				(error) => {},
				(res) => {},
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
		updateVersion: function(){
			_this.$refs.guimodal3.close();
			_this.pageLoading = true;
			uni.gRequest.post(
				'swoft/api/config/getConfigField',
				{
					data: {
						field: 'downloadUrl'
					}
				}, 
				(res) => {
					if(res.code == 0){
						// #ifdef APP-PLUS
						var dtask = plus.downloader.createDownload(res.data,{},function(d,status){
							if(status == 200){
								var path = d.filename;  
								plus.runtime.install(path);
							}else{ 
								uni.gJS.msg('安装包下载失败');
							}   
						});  
						try{
							dtask.start();
							var prg = 0;
							var showLoading = plus.nativeUI.showWaiting('正在下载');
							dtask.addEventListener('statechanged', function(task,status){
								switch (task.state) {
									case 1:
										showLoading.setTitle('正在下载');
									break;
									case 2:
										showLoading.setTitle('已连接到服务器');
									break;
									case 3:
										prg = parseInt((parseFloat(task.downloadedSize)/parseFloat(task.totalSize))*100);
										showLoading.setTitle('正在下载'+prg+'%');
									break;
									case 4:
										plus.nativeUI.closeWaiting();
									break;
								}
							});
						}catch(err){
							plus.nativeUI.closeWaiting();
							uni.showToast({
								title: '更新失败',
								mask: false,
								duration: 1500
							});
						}
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
		getConfigField: function(){
			uni.gRequest.post(
				'swoft/api/config/getConfigField',
				{
					data: {
						field: 'versionDesc'
					}
				}, 
				(res) => {
					if(res.code == 0){
						_this.versionDesc = res.data;
					}
				},
				(error) => {},
				(res) => {},
				true
			);
			_this.pageLoading = true;
			uni.gRequest.post(
				'swoft/api/config/getConfigField',
				{
					data: {
						field: 'version'
					}
				}, 
				(res) => {
					if(res.code == 0){
						// #ifdef APP-PLUS
						if(res.data != plus.runtime.version){
							_this.$refs.guimodal3.open();
						}
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
		getIndexShareCover: function(){
			uni.gRequest.post(
				'swoft/api/config/getIndexShareCover',
				{
					data: {}
				}, 
				(res) => {
					if(res.code == 0){
						_this.indexShareCoverPath = res.data.indexShareCoverPath;
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
		getLogo: function(){
			uni.gRequest.post(
				'swoft/api/config/getLogo',
				{
					data: {}
				}, 
				(res) => {
					if(res.code == 0){
						_this.logo = res.data.logoPath;
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
		getUserCode: function(){
			uni.gRequest.post(
				'swoft/api/user/getUserCode',
				{
					data: {
						uid: uni.getStorageSync('userInfo').id
					}
				}, 
				(res) => {
					if(res.code == 0){
						_this.userCode = res.data;
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
						// _this.$refs.guiPage.openMessage('default',res.msg,true,1500);
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
		receiveCoupons: function(){
			let couponsIdList = [];
			_this.couponsList.forEach((item)=>{
				couponsIdList.push(item.id);
			});
			_this.pageLoading = true;
			uni.gRequest.post(
				'swoft/api/coupons/receiveCoupons',
				{
					data: {
						type: 1,
						uid: uni.getStorageSync('userInfo').id,
						couponsIds: couponsIdList.join(',')
					}
				}, 
				(res) => {
					if(res.code == 0){
						_this.$refs.guipopupCoupon.close();
						_this.$refs.guiPage.openMessage('success','已领取',true,1500);
					}else{
						// _this.$refs.guiPage.openMessage('default',res.msg,true,1500);
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
		getCouponsList: function(){
			uni.gRequest.post(
				'swoft/api/coupons/getCouponsList',
				{
					data: {
						type: 1,
						uid: uni.getStorageSync('userInfo').id
					}
				}, 
				(res) => {
					if(res.code == 0){
						if(res.data.length > 0){
							_this.couponsList = res.data;
							_this.$refs.guipopupCoupon.open();
						}
					}else{
						// _this.$refs.guiPage.openMessage('default',res.msg,true,1500);
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
						type: 1
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
						// _this.$refs.guiPage.openMessage('default',res.msg,true,1500);
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
		getNavList: function(){
			uni.gRequest.post(
				'swoft/api/navigation/getNavList',
				{
					data: {}
				}, 
				(res) => {
					if(res.code == 0){
						_this.navList = res.data.map(item => {
                            if(item.url == '/pages/union/index') item.url = '/pages/union/offline';
                            return item;
                        })
					}else{
						// _this.$refs.guiPage.openMessage('default',res.msg,true,1500);
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
		getIsIndexNoticeList: function(){
			uni.gRequest.post(
				'swoft/api/notice/getIsIndexNoticeList',
				{
					data: {}
				}, 
				(res) => {
					if(res.code == 0){
						_this.speakerMsgs = [];
						res.data.forEach((item)=>{
							let li = {};
							li.title = item.title;
							li.opentype = 'navigate';
							li.url = '/pages/home/content?type=notice&id='+item.id;
							_this.speakerMsgs.push(li);
						})
					}else{
						// _this.$refs.guiPage.openMessage('default',res.msg,true,1500);
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
		getActivityList: function(){
			uni.gRequest.post(
				'swoft/api/activity/getActivityList',
				{
					data: {}
				}, 
				(res) => {
					if(res.code == 0){
						_this.activityList = res.data;
					}else{
						// _this.$refs.guiPage.openMessage('default',res.msg,true,1500);
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
		getGoodsCategoryList: function(e){
			let url = '';
			let postData = {};
			if(e == 1){
				url = 'swoft/api/goodsCategory/getGoodsCategoryList';
				postData.type = e;
			}else{
				url = 'swoft/api/ldd/getCategoryList';
			}
			uni.gRequest.post(
				url,
				{
					data: postData
				}, 
				(res) => {
					if(res.code == 0){
						if(e == 1){
							_this.cateList1 = res.data;
							_this.getGoodsList(1,1,'all');
						}else{
							_this.cateList2 = res.data;
							_this.getGoodsList(2,2,'all');
						}
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
		getGoodsList: function(e,cateId,all=''){
			let field = '';
			if(e == 1){
				field = 'limit1';
			}else{
				field = 'limit2';
			}
			uni.gRequest.post(
				'swoft/api/config/getConfigField',
				{
					data: {
						field: field
					}
				}, 
				(result) => {
					if(result.code == 0){
						let limit = result.data;
						let url = '';
						let postData = {};
						if(e == 1){
							url = 'swoft/api/goods/getGoodsList';
							postData = {
								activityType: 0,
								cateId: cateId,
								isRecommend: 1,
								page: 1,
								limit: limit
							};
							if(all != ''){
								postData.all = 1;
							}
						}else{
							url = 'swoft/api/ldd/getGoodsList';
							postData = {
								isRecommend: 1,
								page: 1,
								limit: limit
							};
							if(all == ''){
								postData.cate_id = cateId;
							}
						}
						_this.pageLoading = true;
						uni.gRequest.post(
							url,
							{
								data: postData
							}, 
							(res) => {
								if(res.code == 0){
									if(e == 1){
										_this.goodsList1 = res.data.data;
									}else{
										_this.goodsList2 = res.data.data;
									}
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
				},
				(error) => {
					_this.$refs.guiPage.openMessage('default','请求错误',true,1500);
				},
				(res) => {},
				true,
				true
			);
		},
		cateChange1: function(index){
			if(index != _this.cateIndex1){
				_this.cateIndex1 = index;
				if(_this.cateIndex1 >= 0){
					_this.getGoodsList(1,_this.cateList1[index].id);
				}else{
					_this.getGoodsList(1,1,'all');
				}
			}			
		},
		cateChange2: function(index){
			if(index != _this.cateIndex2){
				_this.cateIndex2 = index;
				if(_this.cateIndex2 >= 0){
					_this.getGoodsList(2,_this.cateList2[index].id);
				}else{
					_this.getGoodsList(2,2,'all');
				}
			}			
		},
		cpsGet: function(e){
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
		navToUrl: function(e){
			let url = '';
			if(e == 3){
				url = '/pages/zengzhi/hongbao/meituan';
			}else if(e == 4){
				url = '/pages/zengzhi/hongbao/elm';
			}else if(e == 5){
				url = '/pages/zengzhi/hongbao/didi';
			}
			uni.navigateTo({
				url: url
			})
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
        },
        navToUrl2: async function(e){
        	let url = '';
        	if(e == 1){
        		if(uni.getStorageSync('userInfo').isTb == 0){
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
		saveImage: function(){
			_this.pageLoading = true;
			uni.saveImageToPhotosAlbum({
				filePath: _this.path,
				success(res) {
					_this.pageLoading = false;
					_this.$refs.guiPage.openMessage('success','已保存到相册',true,1500);
				},
				fail(err) {
					_this.pageLoading = false;
					_this.$refs.guiPage.openMessage('default','保存失败,请确定是否开启相应权限',true,1500);
				}
			})
		},
	}
}
</script>
<style>
	@import url('../../static/css/du.css');
	.zzbox .zzboxLi { margin-bottom: 20rpx;}
	.zzbox .zzboxLi .img_{ width: 346rpx; height: 130rpx;}
	.zzbox .zzboxLi .img{ width: 226rpx; height: 130rpx;}
	.zzbox .zzboxLi .img image{width:100%;height:100%;}
	page{ background-image: linear-gradient(to right, #F9F9F9 , #F5F5F9);}
	.bgBox4{background:#FFFFFF;}
	.borFF4F00{border: 1px solid #FF4F00;}
	.img34{ width: 34rpx; height: 34rpx;}
	.img34 image{width:100%;height:100%;}
	.img44{ width: 44rpx; height: 44rpx;}
	.img44 image{width:100%;height:100%;}
	.btnSize58{ font-size: 28rpx; line-height: 58rpx; padding-left: 30rpx; padding-right: 30rpx;}
	.img90{ width: 90rpx; height: 90rpx;}
	.img90 image{width:100%;height:100%;}
	.h74{ height: 74rpx;}
	.box2Li{ width: 345rpx;}
	.box2Li .img{ width: 345rpx; height: 345rpx;}
	.box2Li .img image{width:100%;height:100%;}
	.box2Li .img145{ width: 345rpx; height: 145rpx;}
	.box2Li .img145 image{width:100%;height:100%;}
	.box3Li{ width: 220rpx; margin-left: 25rpx;}
	.box3Li .img{ width: 220rpx; height: 130rpx;}
	.box3Li .img image{width:100%;height:100%;}
	.box3Li:nth-child(3n+1){ margin-left: 0;}
	.box5Li{ width: 104rpx; margin-left: 40rpx;}
	.box5Li .img{ width: 60rpx; height: 60rpx;}
	.box5Li .img image{width:100%;height:100%;}
	.box5Li:nth-child(5n+1){ margin-left: 0;}
	.line2{ height: 66rpx;}
	.navTab{width:100%;height:80rpx;}
	.couponBox{width:685rpx;height:826rpx;background:url(../../static/images/zheng/bg05.png) no-repeat;background-size:cover;margin:0 auto;}
	.couponBoxC{width:510rpx;height:520rpx;margin:130rpx auto 0 auto;}
	.couponBoxBtn{width:460rpx;height:80rpx;line-height:88rpx;text-align:center;margin:14rpx auto 0 auto;}
	.coupon{width:502rpx;height:150rpx;background:url(../../static/images/zheng/coupon.png) no-repeat;background-size:100% 100%;margin:0 auto;}
	.h20{height:20rpx;}
	.couponl{width:172rpx;height:172rpx;}
	.couponr{width:290rpx;height:172rpx;margin-right:10rpx;}
	.w280{width:280rpx;line-height:34rpx;}
	.lime-painter{position:fixed;left:2000rpx;}
	.h5Desc{text-align:center;font-size:28rpx;color:#FFFFFF;margin-top:100rpx;}
	.scoreBox{width:750rpx;height:1000rpx;background:url(../../static/images/score/bg.png) no-repeat;background-size:cover;}
	.scoreBoxBtn{margin:-300rpx auto 0 auto;width:300rpx;height:90rpx;background:url(../../static/images/score/btn.png) no-repeat;background-size:100% 100%;line-height:90rpx;text-align:center;}
</style>