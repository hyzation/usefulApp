<template>
	<gui-page :isLoading="pageLoading" ref="guiPage">
		<view slot="gBody">
			<gui-empty v-if="list.length == 0">
				<view slot="img" class="gui-flex gui-rows gui-justify-content-center">
					<image class="gui-empty-img" src="../../../static/images/empty.png"></image>
				</view>
				<text slot="text" class="f28 gui-block-text gui-text-center gui-margin-top c999999">暂无数据</text>
			</gui-empty>
			<view class="p30">
				<view class="gui-relative gui-flex gui-rows gui-justify-content-end" v-for="(item, index) in list" :key="index">
					<view class="gui-time-line-body gui-border-box gui-border-l">
						<text class="gui-time-line-txt gui-border-radius-small gui-block-text gui-bg-gray" :style="index == 0 ? 'color:#FF4F00!important;' : ''">{{item.AcceptStation}}</text>
						<text class="gui-time-line-time gui-color-gray">{{item.date}} {{item.time}}</text>
					</view>
					<text class="gui-left-block gui-time-line-icon gui-block-text gui-icons gui-color-white" :style="'background-color:'+item.color1+';color:'+item.color2+';'"></text>
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
			expressCode: '',
			expressNo: '',
			customerName: '',
			list: []
		}
	},
	onLoad(e) {
		_this = this;
		_this.expressCode = e.expressCode;
		_this.expressNo = e.expressNo;
		_this.customerName = e.customerName;
		_this.getwuliuinfo();
	},
	methods:{
		getwuliuinfo: function(){
			_this.pageLoading = true;
			uni.gRequest.post(
				'swoft/api/order/wuliuinfo',
				{
					data: {
						expressCode: _this.expressCode,
						expressNo: _this.expressNo,
						customerName: _this.customerName,
					}
				}, 
				(res) => {
					if(res.code == 0){
						_this.list = res.data.Traces;
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
