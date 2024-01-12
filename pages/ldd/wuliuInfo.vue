<template>
	<gui-page :isLoading="pageLoading" ref="guiPage">
		<view slot="gBody">
			<gui-empty v-if="list.length == 0">
				<view slot="img" class="gui-flex gui-rows gui-justify-content-center">
					<image class="gui-empty-img" src="../../static/images/empty.png"></image>
				</view>
				<text slot="text" class="f28 gui-block-text gui-text-center gui-margin-top c999999">暂无数据</text>
			</gui-empty>
			<view class="p30">
				<block v-for="(item, index) in list" :key="index">
					<view class="f30 bold pt20 pb50 fb pl20">
						<text>{{item.express_company}}</text>
						<text class="ml30">{{item.logistic_number}}</text>
					</view>
					<view class="gui-relative gui-flex gui-rows gui-justify-content-end" v-for="(item2, index2) in item.track_data" :key="index2">
						<view class="gui-time-line-body gui-border-box gui-border-l">
							<text class="gui-time-line-txt gui-border-radius-small gui-block-text gui-bg-gray">{{item2.track_message}}</text>
							<text class="gui-time-line-time gui-color-gray">{{item2.operate_time}}</text>
						</view>
						<text class="gui-left-block gui-time-line-icon gui-block-text gui-icons gui-color-white" :style="'background-color:#FF4F00;color:#999999;'"></text>
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
			ldd_order_no: '',
			list: []
		}
	},
	onLoad(e) {
		_this = this;
		_this.ldd_order_no = e.ldd_order_no;
		_this.getwuliuinfo();
	},
	methods:{
		getwuliuinfo: function(){
			_this.pageLoading = true;
			uni.gRequest.post(
				'swoft/api/ldd/wuliuInfo',
				{
					data: {
						ldd_order_no: _this.ldd_order_no
					}
				}, 
				(res) => {
					if(res.code == 0){
						if(res.data.code == 0){
							_this.list = res.data.result.child_order;
						}else{
							_this.$refs.guiPage.openMessage('default',res.data.msg,true,1500);
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
		}
	}
}
</script>
<style>
.gui-left-block{width:40rpx; height:40rpx; position:absolute; z-index:2; left:24rpx; top:0;}
.gui-time-line-icon{line-height:40rpx; text-align:center; font-size:32rpx; border-radius:40rpx;}
.gui-time-line-img{width:40rpx; height:40rpx; border-radius:40rpx;}
.gui-time-line-body{width:650rpx; font-size:0; padding-bottom:30rpx; padding-left:60rpx;}
.gui-time-line-txt{line-height:40rpx; font-size:26rpx; padding:20rpx;}
.gui-time-line-time{line-height:36rpx; font-size:22rpx; display:block; text-align:right; margin-top:5px;}
.gui-time-line-image{width:600rpx;}
</style>
