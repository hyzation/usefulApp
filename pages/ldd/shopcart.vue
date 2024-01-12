<template>
	<gui-page :isLoading="pageLoading" :customFooter="true" iphoneXButtomStyle="background:#FFFFFF;" :footerSets="{height:110, zIndex:100, bg:'none'}" ref="guiPage">
		<view slot="gBody">
			<view class="bgFFFFFF gui-relative borderTop fb gui-flex gui-align-items-center h90">
				<gui-switch-navigation :items="navItems" @change="navchange" color="#000000" :currentIndex="currentIndex" 
				activeLineBg="linear-gradient(to right, #FF4F00, #FF4F00)"
				activeColor="#FF4F00" :isCenter="false" activeDirection="center" :activeFontWeight="400"
				activeLineWidth="70%" :size="0" padding="36rpx" :width="750"></gui-switch-navigation>
			</view>
			<!-- 购物车主体 -->
			<scroll-view :style="'height:'+scrollHeight+'px;'" :scroll-y="true">
				<view class="gui-flex gui-justify-content-center gui-align-items-center fm" v-if="shopCart.length == 0" style="padding-top:300rpx;"><gui-image src="../../static/images/noData.png" :width="396" :height="226" :timer="0"></gui-image></view>
				<block v-for="(item, index) in shopCart" :key="index">
					<view class="h20"></view>
					<view class="gui-flex gui-space-between gui-align-items-center bgFFFFFF mlr20 p20 br10 fm gui-relative">
						<text @tap="itemChange(index)" class="gui-icons cFF4F00">{{item.checked ? '&#xe7f8;' : '&#xe762;'}}</text>
						<text class="del gui-icons gui-absolute-rt" @tap="removeGoods(index,item.id)">&#xe62a;</text>
						<view class="shopLi gui-flex gui-space-between gui-align-items-center">
							<view class="shopLiImg gui-flex gui-align-items-center gui-justify-content-center">
								<image :src="item.goods_img" mode="aspectFill"></image>
							</view>
							<view class="shopLiInfo">
								<view class="shopLiInfou gui-ellipsis">{{item.goods_name}}</view>
								<view class="shopLiInfom gui-ellipsis">{{item.goodsOptionName}}</view>
								<view class="gui-flex gui-space-between gui-align-items-center">
									<text class="price cFF4F00">￥{{item.price}}</text>
									<gui-step-box @change="numberChange" :datas="[index]" :disabled="true" :value="item.num" :minNum="1" :maxNum="99" width="150rpx"
										inputStyle="width:50rpx;height:50rpx;font-size:28rpx;line-height:50rpx;"
										buttonStyle="width:50rpx;height:50rpx;line-height:50rpx;background-color:#F8F8F8;color:#999999;margin:0;border-radius:5rpx;">
									</gui-step-box>
								</view>
							</view>
						</view>
					</view>
				</block>
				<view class="h20"></view>
			</scroll-view>
			<!-- 购物车底部 -->
			<view v-if="shopCart.length > 0" id="footer" class="shopCartFooter gui-fixed-lb fm">
				<view class="scFooter borderBottom gui-flex gui-space-between gui-align-items-center">
					<view class="gui-flex gui-space-between gui-align-items-center">
						<text @tap="itemChangeAll" class="gui-icons color16A1A6">{{checkedAll ? '&#xe7f8;' : '&#xe762;'}}</text>
						<text class="checkAll">全选</text>
					</view>
					<view class="gui-flex gui-justify-content-end gui-align-items-center">
						<text class="checkAll">合计:</text>
						<text class="price fb">￥{{totalprice}}</text>
						<view class="groupR" @tap="sure">结算</view>
					</view>
				</view>
			</view>
			<view v-else id="footer" class="shopCartFooter_ gui-fixed-lb"></view>
			<gui-modal ref="guimodal" :isCloseBtn="false" title="操作提示">
				<view slot="content" class="plt30tb40 gui-bg-gray">
					<view class="gui-text-center f30 fm">确定要移除该商品吗？</view>
				</view>
				<view slot="btns" class="gui-flex gui-rows gui-space-around">
					<view class="modal-btns" @tap="$refs.guimodal.close()">
						<text class="c999999 fb">取消</text>
					</view>
					<view class="modal-btns" @tap="doRemove">
						<text class="cFF4F00 fb">确认</text>
					</view>
				</view>
			</gui-modal>
		</view>
		<view slot="gFooter" class="h110 bgFFFFFF gui-flex gui-align-items-center gui-space-around">
			<navigator url="/pages/ldd/index" hover-class="" open-type="redirect" class="footer">
				<view class="footerImg">
					<text class="gui-icons f40" :class="activePage == 'gameTab1' ? 'cFF4F00' : 'c999999'">&#xe63b;</text>
				</view>
				<view :class="'footerText '+[activePage == 'gameTab1' ? 'footerActive' : '']">商城</view>
			</navigator>
			<view class="footer">
				<view class="footerImg">
					<text class="gui-icons f40" :class="activePage == 'gameTab2' ? 'cFF4F00' : 'c999999'">&#xe60a;</text>
				</view>
				<view :class="'footerText '+[activePage == 'gameTab2' ? 'footerActive' : '']">购物车</view>
			</view>
			<navigator url="/pages/ldd/address" hover-class="" open-type="redirect" class="footer">
				<view class="footerImg">
					<text class="gui-icons f40 gui-bold" :class="activePage == 'gameTab3' ? 'cFF4F00' : 'c999999'">&#xe63f;</text>
				</view>
				<view :class="'footerText '+[activePage == 'gameTab3' ? 'footerActive' : '']">收货地址</view>
			</navigator>
			<navigator url="/pages/ldd/order" hover-class="" open-type="redirect" class="footer">
				<view class="footerImg">
					<text class="gui-icons f40 gui-bold" :class="activePage == 'gameTab4' ? 'cFF4F00' : 'c999999'">&#xe62f;</text>
				</view>
				<view :class="'footerText '+[activePage == 'gameTab4' ? 'footerActive' : '']">订单</view>
			</navigator>
		</view>
	</gui-page>
</template>
<script>
	var _this;
	export default {
		data() {
			return { 
				pageLoading: true,
				num: 0,
				totalMvalue: 0,
				totalprice: '0.00',
				shopCart: [],
				shopCartIdList: [],
				postData: [],
				checkedAll: true,
				scrollHeight: 0,
				index: -1,
				id: -1,
				activePage: 'gameTab2',
				sourceType: -1,
				currentIndex: 0,
				status: 99,
				navItems: [],
			}
		},
		onReady: function(){
			uni.gJS.select('#footer', (res_)=>{
				_this.scrollHeight = uni.gJS.system().windowHeight - res_.height - uni.upx2px(200);
			});
		},
		onShow: function(){
			_this.getSourceTypeList();
			// _this.getShopcartList();
		},
		onLoad: function(){
			_this = this;
		},
		methods: {
			getSourceTypeList() {
				_this.pageLoading = true;
				uni.gRequest.post(
					'swoft/api/ldd/getSourceTypeList',
					{
						data: {
							uid: uni.getStorageSync('userInfo').id
						}
					}, 
					(res) => {
						if(res.code == 0){
							if(res.data.length > 0){
								_this.sourceType = res.data[0].sourceType;
							}
							_this.navItems = res.data;
							_this.getShopcartList();
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
			},
			navchange:function(index){
				if(_this.currentIndex != index){
					_this.currentIndex = index;
					_this.sourceType = _this.navItems[index].sourceType;
					_this.getShopcartList();
				}
			},
			getShopcartList: function(){
				_this.pageLoading = true;
				uni.gRequest.post(
					'swoft/api/ldd/getShopcartList',
					{
						data: {
							uid: uni.getStorageSync('userInfo').id,
							sourceType: _this.sourceType
						}
					}, 
					(res) => {
						if(res.code == 0){
							_this.shopCart = res.data;
							_this.checkedAll = true;
							_this.countTotoal();
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
			},
			countTotoal: function(){
				var totalMvalue = 0;
				var total = 0;
				var num = 0;
				var shopCartIdList = [];
				var postData = [];
				for (var i = 0; i < _this.shopCart.length; i++){
					if(_this.shopCart[i].checked){
						totalMvalue += Number(_this.shopCart[i].mValue) * Number(_this.shopCart[i].num);
						total += Number(_this.shopCart[i].price) * Number(_this.shopCart[i].num);
						num += Number(_this.shopCart[i].num);
						shopCartIdList.push(_this.shopCart[i].id);
						postData.push(_this.shopCart[i]);
					}
				}
				_this.totalMvalue = totalMvalue;
				_this.totalprice = total.toFixed(2);
				_this.num = num;
				_this.shopCartIdList = shopCartIdList;
				_this.postData = postData;
				_this.navItems[_this.currentIndex].tips = _this.num;
			},
			numberChange: function(data){
				_this.shopCart[data[2]].num = data[0];
				_this.shopCart[data[2]].totalPrice = data[0]*Number(_this.shopCart[data[2]].price);
				_this.shopCart[data[2]].totalMvalue = data[0]*Number(_this.shopCart[data[2]].mValue);
				_this.countTotoal();
			},
			removeGoods: function(index,id){
				_this.index = index;
				_this.id = id;
				_this.$refs.guimodal.open();
			},
			doRemove: function(){
				_this.pageLoading = true;
				uni.gRequest.post(
					'swoft/api/ldd/delShopcart',
					{
						data: {
							id: _this.id,
							uid: uni.getStorageSync('userInfo').id
						}
					}, 
					(res) => {
						_this.$refs.guimodal.close();
						if(res.code == 0){
							_this.shopCart.splice(_this.index, 1);
							_this.countTotoal();
							_this.index = -1;
							_this.id = -1;
							_this.$refs.guiPage.openMessage('success','已删除',true,1500);
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
			itemChange: function(index){
				_this.shopCart[index].checked = !_this.shopCart[index].checked;
				var n = 0;
				for(var i=0;i<_this.shopCart.length;i++){
					if(!_this.shopCart[i].checked){
						n += 1;
					}
				}
				if(n == 0){
					_this.checkedAll = true;
				}else{
					_this.checkedAll = false;
				}
				_this.countTotoal();
			},
			itemChangeAll: function(){
				_this.checkedAll = !_this.checkedAll;
				_this.shopCart.map((step,move)=>{
					step.checked = _this.checkedAll;
				});
				_this.countTotoal();
			},
			sure: function(){
				if(_this.num == 0){
					_this.$refs.guiPage.openMessage('default','请选择商品',true,1500);
					return false;
				}
				uni.setStorageSync('lddPostData',_this.postData);
				uni.navigateTo({
					url: '/pages/ldd/postOrder?num='+_this.num+'&totalPrice='+_this.totalprice+'&shopCartIdList='+_this.shopCartIdList.join(',')
				});
			}
		}
	}
</script>
<style>
	page{background-color:#F5F5F9;}
	.color16A1A6{color:#FF4F00;}
	.shopLi{width:620rpx;}
	.shopLiImg{width:160rpx;height:160rpx;}
	.shopLiImg image{width:100%;height:100%;border-radius:20rpx;}
	.shopLiInfo{width:440rpx;}
	.shopLiInfou{font-size:28rpx;width:400rpx;}
	.shopLiInfom{font-size:22rpx;color:#999999;height:60rpx;line-height:60rpx;}
	.shopLiInfomm{font-size:22rpx;color:#FF4F00;height:80rpx;}
	.price{font-size:30rpx;margin-right:20rpx;}
	.del{font-size:36rpx;top:10rpx;right:10rpx;color:#353535;}
	.shopCartFooter{width:100%;background-color:#FFFFFF;height:100rpx;bottom:110rpx;}
	.shopCartFooter_{width:100%;height:100rpx;bottom:110rpx;}
	.scFooter{height:100%;padding:0 30rpx 0 50rpx;width:670rpx;}
	.scFooter:after{content:" ";position:absolute;top:0;left:0;right:0;border-top:1px solid #F8F8F8;-webkit-transform-origin: 0 0;transform-origin: 0 0;-webkit-transform: scaleY(.5);transform: scaleY(.5);}
	.checkAll{font-size:28rpx;margin:0 10rpx 0 20rpx;}
	.groupR{font-size:26rpx;text-align:center;color:#FFFFFF;background-color:#FF4F00;width:146rpx;height:64rpx;border-radius:32rpx;line-height:64rpx;}
	.sbtn{font-size:20rpx;color:#FFFFFF;border-radius:6rpx;padding:0 2rpx;margin-right:10rpx;}
	.sbtnbg1{background-color:#EA333F;}
	.sbtnbg2{background-color:#999999;}
	.shopLiInfou_{width:270rpx;}
	.color999999{color:#999999;}
	.footerH{height:60px;}
	.h20{height:20rpx;}
	.noStock{width:40rpx;left:20rpx;top:20rpx;line-height:22rpx;}
	
	.footer{width:120rpx;height:90rpx;}
	.footerImg{width:60rpx;height:60rpx;margin:0 auto;text-align:center;line-height:60rpx;}
	.footerImg image{width:100%;height:100%;}
	.footerText{font-size:26rpx;font-family:fm;text-align:center;color:#999999;line-height:26rpx;}
	.footerActive{color:#FF4F00;}
	.h110{height:110rpx;}
</style>