<template>
	<gui-page :isLoading="pageLoading" ref="guiPage">
		<view slot="gBody">
			<view class="wp100 gui-fixed-lt gui-border-box bgFF4F00">
				<view class="plr20 pt10 pb10">
					<gui-search height="73rpx" placeholder="请输入商品名称" placeholderClass="c99" background="#F7F7F7" iconColor="#999999"
						@clear="clearSearch" @confirm="confirmSearch"></gui-search>
				</view>
				<view class="pt20 pb15 fb bgF5F5F5" style="border-radius:20rpx 20rpx 0 0;">
					<gui-switch-navigation :items="navList" @change="changeNav" keyStr="title" color="#000000"
						:currentIndex="navIndex" textAlign="center" :isCenter="true" activeDirection="center" 
						activeLineBg="linear-gradient(to right, #FF4F00, #FF4F00)" activeLineHeight="6rpx" :activeFontWeight="400"
						activeColor="#FF4F00" activeLineRadius="6rpx" activeFontSize="30rpx"
						activeLineWidth="80%" :size="0" padding="20rpx" :margin="0" :width="750" lineHeight="40rpx" fontSize="30rpx">
					</gui-switch-navigation>
				</view>
				<view class="bgF5F5F5 pl20 pr20 pb20">
					<view class="bgFFFFFF orderBox gui-flex gui-align-items-center gui-space-between pl20 pr20">
						<view class="orderBoxi f26" :class="orderBy == 1 ? 'bgFF4F00 cFFFFFF' : ''" @tap="changeOrder(1)">精选</view>
						<view class="orderBoxi f26" :class="orderBy == 2 ? 'bgFF4F00 cFFFFFF' : ''" @tap="changeOrder(2)">销量</view>
						<view class="orderBoxi f26" :class="orderBy == 3 ? 'bgFF4F00 cFFFFFF' : ''" @tap="changeOrder(3)">高佣</view>
						<view class="orderBoxi f26 gui-flex gui-align-items-center gui-justify-content-center" :class="orderBy == 4 ? 'bgFF4F00 cFFFFFF' : ''" @tap="changeOrder(4)">
							<text>价格</text>
							<view class="c999999">
								<view class="orderBoxii"><text class="gui-icons" :class="orderBy == 4 && orderPrice == 1 ? 'cFFFFFF' : 'c999999'">&#xe647;</text></view>
								<view class="orderBoxii"><text class="gui-icons" :class="orderBy == 4 && orderPrice == -1 ? 'cFFFFFF' : 'c999999'">&#xe661;</text></view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view style="height:240rpx;"></view>
			<view class="plr20">
				<view class="gui-flex gui-space-between gui-wrap mb20">
					<navigator :url="'/pages/zengzhi/shop/taobaoGoods?id='+item.id" hover-class="" v-for="(item,index) in productList" :key="index" class="box2Li bgFF br20 mt20">
						<gui-image :src="item.mainPic" :width="345" :height="345" borderRadius="20rpx 20rpx 0rpx 0rpx"></gui-image>
						<view class="p20">
							<view class="f24 line2"><text class="btnSize26 bgFF4F00 cff gui-border-radius-small mr10">天猫</text>{{item.title}}</view>
							<view class="mt20 gui-flex gui-space-between gui-align-items-center">
								<view v-if="item.couponPrice > 0" class="bgFF4F00 gui-border-radius-small gui-flex gui-align-items-center gui-space-between f28" style="border:1px solid #FF4F00;">
									<text class="plr10 cff">券</text>
									<text class="cFF4F00 bgFF plr10">{{item.couponPrice}}元</text>
								</view>
								<text :style="item.couponPrice > 0 ? '' : 'margin-top:18rpx;'" class="f20 c99 pr20">已售：{{item.monthSales >= 10000 ? Math.round(item.monthSales/10000,1)+'万+' : item.monthSales}}</text>
							</view>
							<view class="ptb10">
								<block v-if="item.couponPrice > 0">
									<text class="f20 cFF4F00">券后 </text>
									<text class="f28 cFF4F00">￥{{item.actualPrice}}</text>
									<text class="f24 c99 gui-line-through ml10">￥{{item.originalPrice}}</text>
								</block>
								<block v-else>
									<text class="f28 cFF4F00">￥{{item.actualPrice}}</text>
								</block>
							</view>
						</view>
						<view class="bgFF4F00 cff f28 gui-text-center br10_b ptb15">返￥{{item.money}}</view>				
					</navigator>
				</view>
				<gui-empty v-if="isEmpty">
					<view slot="img" class="gui-flex gui-rows gui-justify-content-center">
						<image class="gui-empty-img" src="../../../static/images/empty.png"></image>
					</view>
				</gui-empty>
				<gui-loadmore ref="loadmorecom"></gui-loadmore>
			</view>
		</view>
	</gui-page>
</template>
<script>
var page = 1;
var totalPage = 0;
var _this;
export default {
	data() {
		return {
			pageLoading: false,
			apiLoadingStatus: false,
			loadMoreTimer: null,
			isEmpty: false,
			navList: [],
			navIndex: 0,
			keywords: '',
			productList: [],
			orderBy: 1,
			orderPrice: 1
		}
	},
	onLoad: function(){
		_this = this;
		_this.getGoodsCate();
	},
	onShow: function(){
		
	},
	onPullDownRefresh: function(){
		_this.reload();
		setTimeout(function(){
			uni.stopPullDownRefresh();
		},1500);
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
	methods: {
		getGoodsCate: function(){
			uni.gRequest.post(
				'swoft/api/taobao/getCate',
				{
					data: {}
				}, 
				(res) => {
					if(res.code == 20000){
						_this.navList = [];
						res.data.forEach((item)=>{
							_this.navList.push({
								id: item.cid,
								title: item.cname,
							})
						})
						if(_this.navList.length > 0){
							_this.cat_id = _this.navList[0].id;
							_this.reload();
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
		changeOrder: function(e){
			if(e == 4){
				if(_this.orderBy != e){
					_this.orderPrice = 1;
				}else{
					if(_this.orderPrice == 1){
						_this.orderPrice = -1;
					}else{
						_this.orderPrice = 1;
					}
				}
				_this.orderBy = e;
				_this.reload();
			}else{
				if(_this.orderBy != e){
					_this.orderPrice = 1;
					_this.orderBy = e;
					_this.reload();
				}
			}
		},
		confirmSearch: function (e) {
			_this.keywords = e;
			_this.reload();
		},
		clearSearch: function (e) {
			_this.keywords = '';
			_this.reload();
		},
		changeNav: function(index){
			if(index != _this.navIndex)
			{
				_this.navIndex = index;
				_this.cat_id = _this.navList[index].id;
				_this.reload();
			}			
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
			let sort_type = 0;
			if(_this.orderBy == 1){
				sort_type = 0;
			}else if(_this.orderBy == 2){
				sort_type = 2;
			}else if(_this.orderBy == 3){
				sort_type = 4;
			}else{
				if(_this.orderPrice == 1){
					sort_type = 6;
				}else{
					sort_type = 5;
				}
			}
			//加载数据
			_this.apiLoadingStatus = true;
			_this.pageLoading = true;
			uni.gRequest.post(
				'swoft/api/taobao/getTaobaoGoodsList',
				{
					data: {
						cids: _this.cat_id,
						keyWords: _this.keywords,
						sort: sort_type,
						page: page,
						limit: 10
					}
				}, 
				(res) => {
					if(res.code == 20000){
						if(page == 1){
							totalPage = Math.ceil(res.data.totalNum/10);
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
		}
	}
}
</script>
<style>
	@import url('../../../static/css/du.css');
	/*  #ifdef  H5  */
	.gui-fixed-lt{top:80rpx;}
	/*  #endif  */
	.gui-page-loading-bg{background-color:rgba(255,255,255,0);}
	.box2Li{width:345rpx;}
	.box2Li .img{width:345rpx;height:345rpx;}
	.box2Li .img image{width:100%;height:100%;}
	.img40{width:40rpx;height:40rpx;}
	.img40 image{width:100%;height:100%;border-radius:50%;}
	.fontIcon{background-color:#FF4F00;color:#FFFFFF;border-radius:6rpx;font-size:22rpx;line-height:20rpx;height:20rpx;padding:0 10rpx;margin-right:10rpx;}
	.quan{width:120rpx;height:40rpx;border-radius:6rpx;border:1px solid #FF4F00;overflow:hidden;}
	.quanl{width:40rpx;height:40rpx;background-color:#FF4F00;line-height:40rpx;text-align:center;}
	.quanr{width:80rpx;height:40rpx;line-height:40rpx;text-align:center;}
	.mt15{margin-top:14rpx;}
	.fan{width:100%;height:60rpx;background-color:#FF4F00;line-height:60rpx;text-align:center;border-radius:0 0 20rpx 20rpx;}
	.orderBox{height:70rpx;border-radius:35rpx;}
	.orderBoxi{height:46rpx;line-height:46rpx;text-align:center;border-radius:25rpx;width:150rpx;}
	.orderBoxii{line-height:14rpx;}
	.bgF7142C{ background: #F7142C;}
	.br10_b{border-radius:0 0 20rpx 20rpx;}
</style>