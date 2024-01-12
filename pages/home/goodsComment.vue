<template>
	<gui-page :isLoading="pageLoading" :apiLoadingStatus="apiLoadingStatus" :loadmore="true" @loadmorefun="getdata" ref="guiPage">
		<view slot="gBody" class="fm">
			<gui-empty v-if="isEmpty">
				<view slot="img" class="gui-flex gui-rows gui-justify-content-center">
					<image class="gui-empty-img" src="../../static/images/empty.png"></image>
				</view>
				<text slot="text" class="f28 gui-block-text gui-text-center gui-margin-top c999999">暂无数据</text>
			</gui-empty>
			<view class="main">
				<view class="comment" :class="index == 0 ? '' : 'gui-relative borderTop'" v-for="(item, index) in productList" :key="index">
					<view class="gui-flex gui-space-between gui-align-items-center">
						<view class="headimg gui-flex gui-justify-content-center gui-align-items-center">
							<image :src="item.headimgurl+'?imageslim'" mode="aspectFill"></image>
						</view>
						<view class="rInfo">
							<view class="rInfou gui-ellipsis">{{item.nickname}}</view>
							<view class="rInfob gui-ellipsis" v-if="item.goodsOptionName != ''">{{item.format_date}} | {{item.goods_option_name}}</view>
							<view class="rInfob gui-ellipsis">{{item.format_date}}</view>
						</view>
					</view>
					<view class="desc">{{item.desc}}</view>
					<view class="imglist gui-flex gui-wrap" v-if="item.imgs != ''">
						<view :class="'imgli '+[index2%4==0?'nomarginl':'']" v-for="(item2, index2) in item.imgslist" :key="index2">
							<image @tap="previewImage(item2,item.imgslist)" :src="item2" mode="aspectFill"></image>
						</view>
					</view>
				</view>
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
				goodsId: 0,
				isEmpty: false,
				productList: [],
				pageLoading: false,
				apiLoadingStatus: false
			}
		},
		onLoad: function(e){
			_this = this;
			_this.goodsId = e.goodsId;
			_this.reload();
		},
		methods: {
			open: function(index){
				_this.productList[index].open = !_this.productList[index].open;
			},
			/**
			 * 重新加载数据
			 */
			reload: function(){
				_this.pageLoading = true;
				_this.productList = [];
				page = 1;
				_this.getdata();
			},
			/**
			 * 加载瀑布流数据
			 * @param {Object} isReload
			 */
			getdata: function(isReload){
				_this.apiLoadingStatus = true;
				uni.gRequest.post(
					'swoft/api/goods/getGoodsCommentList',
					{
						data: {
							page: page,
							limit: 15,
							goodsId: _this.goodsId
						}
					}, 
					(res) => {
						if(res.code == 0){
							if(page == 1){
								totalPage = res.count;
								if(res.data.length > 0){
									_this.isEmpty = false;
								}else{
									_this.isEmpty = true;
								}
							}
							if(page <= totalPage){
								_this.productList = _this.productList.concat(res.data);
								// 加载完成后停止加载动画
								_this.$refs.guiPage.stoploadmore();
							}else{
								if(totalPage > 0){
									// 加载了全部数据，通知组件不再加载更多
									_this.$refs.guiPage.nomore();
								}
							}
							page++;
							if(isReload){
								_this.$refs.guiPage.endReload();
							}
						}
					},
					(error) => {
						_this.$refs.guiPage.openMessage('default','请求错误',true,1500);
					},
					(res) => {
						_this.apiLoadingStatus = false;
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
			previewImage: function(e,imgList){
				uni.previewImage({
					urls: imgList,
					current: e
				})
			}
		}
	}
</script>
<style>
	page{background-color:#F8F8F8;}
	.main{margin:20rpx;padding:0 20rpx;border-radius:20rpx;background-color:#FFFFFF;}
	.comment{padding:30rpx 0;}
	.comment:first-child:before{border:none;}
	.headimg{width:60rpx;height:60rpx;}
	.headimg image{width:100%;height:100%;border-radius:50%;}
	.rInfo{width:590rpx;}
	.rInfou{font-size:28rpx;}
	.rInfob{font-size:22rpx;color:#999999;margin-top:5rpx;}
	.desc{font-size:26rpx;color:#010101;margin-top:10rpx;}
	.imglist{margin-top:5rpx;}
	.imgli{width:160rpx;height:160rpx;margin-left:10rpx;margin-top:10rpx;}
	.imgli image{width:100%;height:100%;border-radius:10rpx;}
	.nomarginl{margin-left:0;}
	.reply{padding:20rpx;background-color:#F8F8F8;margin-top:20rpx;border-radius:20rpx;}
	.replyi{font-size:26rpx;}
	.replyt{font-size:26rpx;margin-left:20rpx;}
	.replyContent{font-size:26rpx;color:#999999;margin-top:10rpx;}
	.open{font-size:26rpx;margin-top:10rpx;}
</style>