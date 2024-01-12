<template>
	<gui-page :isLoading="pageLoading" ref="guiPage">
		<view slot="gBody" class="fullPage gui-flex gui-justify-content-center gui-align-items-center fm">
			<view v-if="isEmpty" style="margin-top:-200rpx;"><gui-image src="../../../static/images/noData.png" :width="396" :height="226" :timer="0"></gui-image></view>
			<view class="hp100">
				<view v-for="(item, index) in addressList" :key="index" class="addr gui-flex gui-space-between gui-align-items-center br10">
					<view class="addrl">
						<view class="addrlu gui-flex gui-align-items-center">
							<text>{{item.name}}</text>
							<text>{{item.tel}}</text>
							<view v-if="item.isDefault == 1" class="addrlbl">默认</view>
						</view>
						<view class="addrlb gui-flex gui-align-items-center">
							<view class="addrlbr gui-ellipsis">{{item.province}}{{item.city}}{{item.county}}</view>
						</view>
						<view class="addrlb gui-flex gui-align-items-center">
							<view class="addrlbr gui-ellipsis">{{item.address}}</view>
						</view>
					</view>
					<text @tap="editAddress(item.id)" class="gui-icons f40 cFF4F00">&#xe69e;</text>
				</view>
				<view style="height:150rpx;"></view>
				<view @tap="editAddress(0)" class="wp100 ptb20 mt20 gui-fixed-rb bgFFFFFF">
					<view class="btns f30 fb"><text class="gui-icons">&#xe6c7;</text>添加地址</view>
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
				pageLoading: true,
				addressList: [],
				isEmpty: false,
			}
		},
		onShow: function(){
			_this.getUserAddress();
		},
		onLoad: function(){
			_this = this;
		},
		methods: {
			/**
			 * 获取用户地址
			 */
			getUserAddress: function(){
				_this.pageLoading = true;
				uni.gRequest.post(
					'swoft/api/userAddress/getUserAddressList',
					{
						data: {
							uid: uni.getStorageSync('userInfo').id
						}
					}, 
					(res) => {
						if(res.code == 0){
							_this.addressList = res.data;
							if(res.data.length > 0){
								_this.isEmpty = false;
							}else{
								_this.isEmpty = true;
							}
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
			editAddress: function(e){
				if(_this.addressList.length >= 5 && e == 0){
					_this.$refs.guiPage.openMessage('default','最多添加5个地址',true,1500);
					return false;
				}
				uni.navigateTo({
					url: '/pages/my/setting/editAddress?id='+e
				})
			}
		}
	}
</script>
<style>
	page{background-color:#F8F8F8;}
	.addr{padding:30rpx;margin-top:20rpx;background-color:#FFFFFF;}
	.addrl{width:620rpx;}
	.addrlu text{font-size:32rpx;margin-right:20rpx;}
	.addrr{width:40rpx;}
	.addrlb{margin-top:16rpx;}
	.addrlbl{width:60rpx;height:36rpx;line-height:36rpx;text-align:center;background-color:#ff4f00;color:#FFFFFF;font-size:24rpx;border-radius:4rpx;margin-right:20rpx;}
	.addrlbr{width:540rpx;font-size:30rpx;color:#666666;line-height:32rpx;}
	.addrlbr_{width:610rpx;font-size:30rpx;color:#666666;line-height:32rpx;}
	.lb{left:30rpx;bottom:86rpx;}
	.add{font-size:26rpx;margin-right:4rpx;}
	.btns{width:690rpx;height:90rpx;background: #ff4f00;border-radius: 45rpx;text-align: center;line-height: 90rpx;color: #fff;margin:0 auto;}
</style>