<template>
	<gui-page :isLoading="pageLoading" ref="guiPage">
		<view slot="gBody">
			<view class="wp100 gui-fixed-lt gui-border-box plr20 pt10 bgFF topFixed">
				<gui-search height="73rpx" placeholder="搜索" placeholderClass="c99" background="#F7F7F7" iconColor="#999999"
				@clear="clearSearch" @confirm="confirmSearch"></gui-search>
				<view class="pt20 pb15 fb">
					<gui-switch-navigation :items="navList" @change="changeNav" keyStr="title" color="#000000"
						:currentIndex="navIndex" textAlign="center" :isCenter="true" activeDirection="center" 
						activeLineBg="linear-gradient(to right, #ED6A0C, #ED6A0C)" activeLineHeight="2rpx" :activeFontWeight="400"
						activeColor="#ED6A0C" activeLineRadius="6rpx" activeFontSize="30rpx"
						activeLineWidth="14%" :size="355" padding="0rpx" :margin="0" :width="750" lineHeight="40rpx" fontSize="30rpx">
					</gui-switch-navigation>
				</view>
			</view>
			<view style="height:162rpx;"></view>
			<view class="plr20">
				<view v-if="navIndex == 0" class="gui-flex gui-space-between gui-wrap mb20 pt10">
					<view class="listItem" v-for="item in productList" :key="item.id" @click="itemClick(item)">
						<view class="cover">
							<image :src="item.logo"></image>
						</view>
						<view class="info">
							<view class="title">{{ item.name }}</view>
							<view class="unit" v-for="unit in item.products" :key="unit.id">
								<union-price class="unitPrice" :price="unit.price" size="32" />
								<view class="unitName">{{ unit.name }}</view>
							</view>
							<view class="address">
								<view class="detail">
									<uni-icons type="location-filled" color="#FF5E29" size="16"></uni-icons>
									{{ item.province_name }}{{ item.city_name }}{{ item.district_name }}{{ item.address }}
								</view>
								<!-- <view class="distance">500m</view> -->
							</view>
						</view>
					</view>			
				</view>
				<view v-if="navIndex == 1" class="gui-flex gui-space-between gui-wrap mb20">
					<navigator :url="'/pages/union/online/goods/detail?id='+item.id" hover-class="" v-for="(item,index) in productList" :key="index" class="box2Li bgFF br10 mt20">
						<image :src="item.image" style="width:345rpx;height:345rpx;border-radius:20rpx 20rpx 0 0;"></image>
						<view class="plr20">
							<view class="f28 line2" style="height:50rpx;line-height:50rpx;">{{item.name}}</view>
                            <view class="fm f28 cFF4F00 pb20">￥<text class="f34 mr10">{{item.price}}</text></view>
						</view>							
					</navigator>
				</view>
				<gui-empty v-if="isEmpty">
					<view slot="img" class="gui-flex gui-rows gui-justify-content-center">
						<image class="gui-empty-img" src="../../static/images/empty.png"></image>
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
			navList: [
				{status:2, title:'线下门店'},
				{status:1, title:'线上网商'}
			],
			navIndex: 0,
			keywords: '',
			productList: [],
            topSafe: ''
		}
	},
	onLoad: function(options){
		_this = this;
        _this.topSafe = uni.getSystemInfoSync().safeAreaInsets.top + 'px';
        _this.navIndex = options.type == 2 ? 0 : 1;
		_this.reload();
	},
	onShow: function(){
		
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
        itemClick (item){
            uni.navigateTo({
                url: '/pages/union/offline/shop/detail?id='+item.id
            })
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
		getdata: async function(isReload){
			if(_this.navIndex == 0){ // 线下
                const data = await uni.unionRequest('swoft/api/shop/getShopList', {
                    is_freeze: 0,
                    is_run: 1,
                    del: 0,
                    page: 1,
                    page_num: 20,
                    type: 2
                })
                _this.productList = data.data.list;
                _this.pageLoading = false;
            }else{ // 线上
                // 获取推荐产品列表
                const data = await uni.unionRequest('swoft/api/product/getList', {
                	user_id: uni.getStorageSync('userInfo').id,
                	page: 1,
                	page_num: 20,
                    is_online: 1,
                    name: _this.keywords
                })
                _this.productList = data.data.lists;
                _this.pageLoading = false;
            }
		}
	}
}
</script>
<style>
	@import url('../../static/css/du.css');
    
	.box2Li{width:345rpx;}
	.box2Li .img{width:345rpx;height:345rpx;}
	.box2Li .img image{width:100%;height:100%;}
	.img40{width:40rpx;height:40rpx;}
	.img40 image{width:100%;height:100%;border-radius:50%;}
    
    .listItem{
    	margin: 10rpx auto;
    	width: 660rpx;
    	background: #ffffff;
    	border-radius: 20rpx;
    	padding: 20rpx;
    	display: flex;
    	justify-content: space-between;
    	align-items: center;
    	.cover{
    		width: 170rpx;
    		height: 170rpx;
    		overflow: hidden;
    		border-radius: 10rpx;
    		image{
    			width: 170rpx;
    			height: 170rpx;
    		}
    	}
    	.info{
    		width: 470rpx;
    		margin-left: 20rpx;
    		.title{
    			font-size: 30rpx;
    			color: #333333;
    		}
    		.unit{
    			display: flex;
    			justify-content: flex-start;
    			align-items: center;
    			margin-top: 10rpx;
    			.unitPrice{
    				color: #FF5E29;
    				font-size: 30rpx;
    				text{
    					font-size: 18rpx;
    				}
    			}
    			.unitName{
    				font-size: 24rpx;
    				color: #333333;
    				margin-left: 20rpx;
    			}
    		}
    		.address{
    			display: flex;
    			justify-content: space-between;
    			align-items: center;
    			font-size: 24rpx;
    			margin-top: 10rpx;
    			.detail{
    				width: 390rpx;
    				color: #999999;
    				overflow: hidden;
    				text-overflow: ellipsis;
    				white-space: nowrap;
    			}
    			.distance{
    				width: 70rpx;
    				color: #333333;
    				text-align: right;
    			}
    		}
    	}
    }
	/*  #ifdef  H5  */
	.topFixed{top:88rpx;}
	/*  #endif  */
	/*  #ifdef  APP-PLUS  */
	.topFixed{top:0rpx;}
	/*  #endif  */
</style>