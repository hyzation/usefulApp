<template>
	<gui-page :isLoading="pageLoading" ref="guiPage">
		<view slot="gBody">
			<view class="wp100 gui-fixed-lt gui-border-box bgF7142C">
				<view class="plr20 pt10 pb10">
					<gui-search height="73rpx" placeholder="请输入商品名称" placeholderClass="c99" background="#F7F7F7" iconColor="#999999"
						@clear="clearSearch" @confirm="confirmSearch"></gui-search>
				</view>
				<view class="pt20 pb15 fb bgF5F5F5" style="border-radius:20rpx 20rpx 0 0;">
					<gui-switch-navigation :items="navList" @change="changeNav" keyStr="title" color="#000000"
						:currentIndex="navIndex" textAlign="center" :isCenter="true" activeDirection="center" 
						activeLineBg="linear-gradient(to right, #F7142C, #F7142C)" activeLineHeight="6rpx" :activeFontWeight="400"
						activeColor="#F7142C" activeLineRadius="6rpx" activeFontSize="30rpx"
						activeLineWidth="80%" :size="0" padding="20rpx" :margin="0" :width="750" lineHeight="40rpx" fontSize="30rpx">
					</gui-switch-navigation>
				</view>
				<view class="bgF5F5F5 pl20 pr20 pb20">
					<view class="bgFFFFFF orderBox gui-flex gui-align-items-center gui-space-between pl20 pr20">
						<view class="orderBoxi f26" :class="orderBy == 1 ? 'bgF7142C cFFFFFF' : ''" @tap="changeOrder(1)">精选</view>
						<view class="orderBoxi f26" :class="orderBy == 2 ? 'bgF7142C cFFFFFF' : ''" @tap="changeOrder(2)">销量</view>
						<view class="orderBoxi f26" :class="orderBy == 3 ? 'bgF7142C cFFFFFF' : ''" @tap="changeOrder(3)">高佣</view>
						<view class="orderBoxi f26 gui-flex gui-align-items-center gui-justify-content-center" :class="orderBy == 4 ? 'bgF7142C cFFFFFF' : ''" @tap="changeOrder(4)">
							<text>价格</text>
							<view class="cD1D1D1">
								<view class="orderBoxii"><text class="gui-icons" :class="orderBy == 4 && orderPrice == 1 ? 'cFFFFFF' : 'cD1D1D1'">&#xe647;</text></view>
								<view class="orderBoxii"><text class="gui-icons" :class="orderBy == 4 && orderPrice == -1 ? 'cFFFFFF' : 'cD1D1D1'">&#xe661;</text></view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view style="height:240rpx;"></view>
			<view class="plr20">
				<view class="gui-flex gui-space-between gui-wrap mb20">
					<navigator :url="'/pages/zengzhi/shop/pddGoods?goods_sign='+item.goods_sign" hover-class="" v-for="(item,index) in productList" :key="index" class="box2Li bgFF br20 mt20">
						<gui-image :src="item.goods_thumbnail_url" :width="345" :height="345" borderRadius="20rpx 20rpx 0rpx 0rpx"></gui-image>
						<view class="p20">
							<view class="f24 line2"><text class="fontIcon fm">拼</text>{{item.goods_name}}</view>
							<view class="mt10 gui-flex gui-align-items-center gui-space-between">
								<view v-if="item.coupon_discount > 0" class="quan gui-flex gui-align-items-center">
									<view class="quanl fm cFFFFFF f24">券</view>
									<view class="quanr fm cF7142C f24">{{item.coupon_discount/100}}元</view>
								</view>
								<text :style="item.coupon_discount > 0 ? '' : 'margin-top:18rpx;'" class="f20 c999999">已售：{{item.sales_tip != '' ? item.sales_tip : 0}}</text>
							</view>
							<view class="mt10 gui-flex">
								<block v-if="item.coupon_discount > 0">
									<text class="f20 cF7142C mt15">券后：￥</text>
									<text class="f32 cF7142C">{{(item.min_group_price-item.coupon_discount)/100}}</text>
									<text class="f20 c999999 mt15 gui-line-through ml10">￥{{item.min_group_price/100}}</text>
								</block>
								<block v-else>
									<text class="f32 cF7142C">￥{{(item.min_group_price-item.coupon_discount)/100}}</text>
								</block>
							</view>
						</view>	
						<view class="fan cFFFFFF f28">返￥{{item.money}}</view>				
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
				'swoft/api/pdd/getGoodsCate',
				{
					data: {
						cat_id: 0
					}
				}, 
				(res) => {
					if(res.code == 20000){
						_this.navList = [];
						res.data.forEach((item)=>{
							_this.navList.push({
								id: item.cat_id,
								title: item.cat_name,
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
				sort_type = 6;
			}else if(_this.orderBy == 3){
				sort_type = 2;
			}else{
				if(_this.orderPrice == 1){
					sort_type = 3;
				}else{
					sort_type = 4;
				}
			}
			//加载数据
			_this.apiLoadingStatus = true;
			_this.pageLoading = true;
			uni.gRequest.post(
				'swoft/api/pdd/pddGoodsList',
				{
					data: {
						uid: uni.getStorageSync('userInfo').id,
						cat_id: _this.cat_id,
						keyword: _this.keywords,
						sort_type: sort_type,
						page: page,
						page_size: 10
					}
				}, 
				(res) => {
					if(res.code == 20000){
						if(page == 1){
							totalPage = Math.ceil(res.data.goods_search_response.total_count/10);
						}
						if(totalPage==0)
						{
							_this.isEmpty = true;
							_this.$refs.loadmorecom.empty();							
						}else{
							_this.isEmpty = false;
							_this.productList = _this.productList.concat(res.data.goods_search_response.goods_list);
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
	.fontIcon{background-color:#F7142C;color:#FFFFFF;border-radius:6rpx;font-size:22rpx;line-height:20rpx;height:20rpx;padding:0 10rpx;margin-right:10rpx;}
	.quan{width:120rpx;height:40rpx;border-radius:6rpx;border:1px solid #F7142C;overflow:hidden;}
	.quanl{width:40rpx;height:40rpx;background-color:#F7142C;line-height:40rpx;text-align:center;}
	.quanr{width:80rpx;height:40rpx;line-height:40rpx;text-align:center;}
	.mt15{margin-top:14rpx;}
	.fan{width:100%;height:60rpx;background-color:#F7142C;line-height:60rpx;text-align:center;border-radius:0 0 20rpx 20rpx;}
	.orderBox{height:70rpx;border-radius:35rpx;}
	.orderBoxi{height:46rpx;line-height:46rpx;text-align:center;border-radius:25rpx;width:150rpx;}
	.orderBoxii{line-height:14rpx;}
</style>