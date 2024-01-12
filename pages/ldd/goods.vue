<template>
	<gui-page :isLoading="pageLoading" ref="guiPage">
		<view slot="gBody">
			<view class="fullPage gui-flex gui-justify-content-center gui-align-items-center fm" v-if="isEmpty" style="margin-top:-100rpx;"><gui-image src="../../static/images/noData.png" :width="396" :height="226" :timer="0"></gui-image></view>
			<block v-if="!isEmpty && goods">
				<view class="bgFFFFFF">
					<gui-swiper :autoplay="false" :circular="false" :swiperItems="banner" :width="750" :height="750" borderRadius="0rpx" :spacing="0" :padding="0"
						:indicatorActiveWidth="38" :indicatorBarHeight="40" :indicatorWidth="28" :indicatorHeight="6" indicatorColor="#E7E7E7" indicatorActiveColor="#000000"></gui-swiper>
					<view class="plr30 mt30 gui-flex gui-align-items-center gui-space-between">
						<view class="gui-flex gui-align-items-end">
							<text class="fb f30 cDC261F" style="height:45rpx;line-height:55rpx;">￥</text>
							<text class="fb f45 lh45 cDC261F">{{usefulPrice}}</text>
							<text class="fm f28 ml20 cFF4F00">{{mValue}}推广值</text>
						</view>
						<view class="gui-flex gui-align-items-center">
							<text @tap="$refs.guipopupHb.open()" class="gui-icons c231815 gui-bold ml30">&#xe615;</text>
						</view>
					</view>
					<view class="mt20 plr30 fb f30">{{goods.title}}</view>
					<view class="mt20 plr30 fm f28 c999999 pb20">品牌：{{goods.brandName}}</view>
				</view>
				<view class="p30 bgFFFFFF mt20 gui-flex gui-align-items-center">
					<text class="f30 lh30 fb c231815">已选</text>
					<text class="f28 lh30 fm c999999 ml20 gui-flex1">{{goods_option_name}} {{num}}件</text>
				</view>
				<view class="p30 bgFFFFFF gui-text-center c231815 f30 fb mt20">商品详情</view>
				<view class="bgFFFFFF"><jyf-parser :html="detail" ref="article"></jyf-parser></view>
				<gui-popup ref="goodsAttr" position="bottom" width="750rpx">
					<view @tap="$refs.goodsAttr.close()" style="width:48rpx;margin:30rpx auto;">
						<gui-image src="../../static/images/zheng/close.png" :timer="0" :width="48" :height="48"></gui-image>
					</view>
					<view class="bgFFFFFF p30 gui-relative" style="border-radius:20rpx 20rpx 0 0;">
						<view class="gui-flex gui-align-items-center gui-space-between">
							<gui-image :src="goodsFirstImg" :width="120" :height="120" borderRadius="10rpx"></gui-image>
							<view style="width:550rpx;">
								<view class="gui-ellipsis f28 fm">{{goods.title}}</view>
								<view class="gui-ellipsis f28 fm c999999 mt10">
									<text class="cDC261F f28 fb">￥{{usefulPrice}}</text>
									<text class="fm f24 ml20 cFF4F00">{{mValue}}推广值</text>
								</view>
								<view class="gui-ellipsis f26 fm c999999 mt10">已选<text class="ml10 mr10" v-if="goods_option_name != ''">{{goods_option_name}}</text>{{num}}个</view>
							</view>
						</view>
						<scroll-view class="product-attr" :scroll-y="true">
							<view class="gui-flex gui-wrap">
								<block v-for="(item, index) in options" :key="index">
									<view @tap="chooseSpec(index)" class="specli fm mt10" :class="[item.checked ? 'speclied' : '']">
										<block v-for="(item1, index1) in item.attributeJson" :key="index1">
											{{index1 > 0 ? '+' : ''}}{{item1.val}}
										</block>
									</view>
								</block>
							</view>
						</scroll-view>
						<view class="gui-flex gui-space-between gui-align-items-center mt30">
							<text class="f28 fm">数量</text>
							<gui-step-box buttonStyle="width:60rpx;height:60rpx;background-color:#F5F5F9;text-align:center;line-height:60rpx;font-size:40rpx;"
								inputStyle="border-radius:0;background-color:#e2e2e2;font-size:30rpx;height:60rpx;" 
								:value="num" :minNum="minNum" :maxNum="maxNum" @change="numberChange" :disabled="true">
							</gui-step-box>
						</view>
						<view class="sure fm bgFF4F00" @tap="sure">{{sureText}}</view>
					</view>
				</gui-popup>
				<gui-popup ref="guipopupHb" bgColor="rgba(0,0,0,0.85)" :zIndex="99" width="600rpx">
					<canvas style="width:600rpx;height:870rpx;">
						<gui-image :src="path" :width="600" :height="870" borderRadius="20rpx"></gui-image>
					</canvas>
					<!--  #ifndef H5 -->
					<view class="gui-flex gui-align-items-center gui-justify-content-center mt40">
						<view class="hBtn bgFFFFFF f28 fm" @tap="$refs.guipopupHb.close()">取消</view>
						<view class="hBtn bgFF4F00 f28 fm cFFFFFF" @tap="saveImage">保存图片</view>
					</view>
					<!--  #endif -->
					<!--  #ifdef H5 -->
					<!-- <view class="h5Desc fm">长按海报图片保存到手机或发送给朋友</view> -->
					<view class="gui-flex gui-align-items-center gui-justify-content-center mt40">
						<view class="hBtn bgFFFFFF f28 fm" @tap="$refs.guipopupHb.close()">取消</view>
						<view class="hBtn bgFF4F00 f28 fm cFFFFFF" @tap="savePicture">保存图片</view>
					</view>
					<!--  #endif -->
				</gui-popup>
				<l-painter ref="painter" type="2d" class="lime-painter" isCanvasToTempFilePath @success="path = $event" css="width:1200rpx;height:1740rpx;background:#FFFFFF;border-radius:40rpx;">
					<l-painter-image :src="goodsFirstImg" css="width:1200rpx;height:1200rpx;border-radius:40rpx 40rpx 0 0;" />
					<l-painter-view css="margin:80rpx 0;display:flex;justify-content:center;align-items:center;height:146rpx;">
						<l-painter-text :text="goods.title" css="display:inline-block;width:600rpx;color:#000000;font-size:52rpx;line-height:72rpx;line-clamp:2;" />
						<l-painter-view css="border-left:1px solid #999999;height:120rpx;margin:15rpx 60rpx 15rpx 80rpx;display:inline-block;"></l-painter-view>
						<l-painter-view css="display:inline-block;">
							<l-painter-view>
								<l-painter-text text="有用专享价" css="color:#FF4F00;font-size:45rpx;height:73rpx;line-height:73rpx;display:inline-block;margin-left:14rpx;" />
							</l-painter-view>
							<l-painter-view>
								<l-painter-text :text="'￥'+goods.usefulPrice" css="color:#FF4F00;font-size:80rpx;height:73rpx;line-height:73rpx;display:inline-block;" />
							</l-painter-view>
						</l-painter-view>
					</l-painter-view>
					<l-painter-view css="margin:0 80rpx;display:flex;justify-content:center;height:160rpx;">
						<l-painter-image :src="userCode" css="width:160rpx;height:160rpx;" />
						<l-painter-view css="width:450rpx;display:inline-block;margin-left:36rpx;">
							<l-painter-view css="margin-top:4rpx;">
								<l-painter-text text="① 保存图片到相册" css="color:#999999;font-size:44rpx;" />
							</l-painter-view>
							<l-painter-view css="margin-top:30rpx;">
								<l-painter-text text="② 扫码下载有用APP" css="color:#999999;font-size:44rpx;" />
							</l-painter-view>
						</l-painter-view>
						<l-painter-image :src="logo" css="width:160rpx;height:160rpx;margin-left:230rpx;display:inline-block;" />
					</l-painter-view>
				</l-painter>
			</block>
			<view class="h120"></view>
			<view v-if="goods" class="gui-fixed-lb wp100 h120 bgFFFFFF gui-flex gui-align-items-center gui-space-between">
				<view class="gui-flex gui-space-between gui-align-items-center wp100">
					<view class="gui-flex gui-align-items-center gui-justify-content-center gui-flex1">
						<view class="w100 gui-text-center" @tap="$refs.guipopupHb.open()">
							<image src="../../static/images/zheng/share.png" class="footImg" mode="aspectFill"></image>
							<view class="f24 c999999 gui-text-center fm">分享</view>
						</view>
						<navigator url="/pages/ldd/shopcart" open-type="redirect" hover-class="" class="w100 gui-text-center gui-relative ml50">
							<view class="shopCartNum bgFF4F00 cFFFFFF fb f20" v-if="shopCardCount > 0">{{shopCardCount}}</view>
							<image src="../../static/images/zheng/shopcart.png" class="footImg" mode="aspectFill"></image>
							<view class="f24 c999999 gui-text-center fm">购物车</view>
						</navigator>
					</view>
					<view class="gui-flex gui-align-items-center gui-justify-content-end">
						<view @tap="buyClick(1)" class="btn1 fm f28 cFFFFFF">加入购物车</view>
						<view @tap="buyClick(2)" class="btn2 fm f28 cFFFFFF mr20">立即购买</view>
					</view>
				</view>
			</view>
		</view>
	</gui-page>
</template>
<script>
import jyfParser from "@/components/jyf-parser/jyf-parser";
var _this;
export default {
	data() {
		return {
			pageLoading: false,
			isEmpty: false,
			id: 0,
			banner: [],
			goods: null,
			speclist: [],
			sureType: 0,
			shopCardCount: 0,
			sureText: '',
			goodsFirstImg: '',
			userCode: '',
			logo: '',
			path: '',
			usefulPrice: 0,
			mValue: 0,
			detail: '',
			options: [],
			goods_option_name: '',
			price: 0,
			num: 1,
			minNum: 1,
			maxNum: 99,
			skuSn: ''
		}
	},
	filters: {
		numFilter (value) {
			return parseFloat(value).toFixed(2);
		}
	},
	onLoad: function(e){
		_this = this;
		_this.id = e.id;
		_this.getLogo();
		_this.getUserCode();
	},
	onShow: function(){
		_this.getDetail();
	},
	onReady: function(){

	},
	methods: {
		// #ifdef H5
		savePicture: function(){
			let base64 = _this.path;
			var arr = base64.split(',');
			var bytes = atob(arr[1]);
			let ab = new ArrayBuffer(bytes.length);
			let ia = new Uint8Array(ab);
			for (let i = 0; i < bytes.length; i++) {
				ia[i] = bytes.charCodeAt(i);
			}
			var blob = new Blob([ab], { type: 'application/octet-stream' });
			var url = URL.createObjectURL(blob);
			var a = document.createElement('a');
			a.href = url;
			a.download = new Date().valueOf() + ".png";
			var e = document.createEvent('MouseEvents');
			e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
			a.dispatchEvent(e);
			URL.revokeObjectURL(url);
		},
		// #endif
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
				(res) => {},
				true,
				true
			);
		},
		numFilter: function (value) {
			return parseFloat(value).toFixed(2);
		},
		getDetail: function(){
			let uid = uni.getStorageSync('userInfo').id;
			if(!uni.gRequest.checkLogin()){
				uid = 0;
			}
			_this.pageLoading = true;
			uni.gRequest.post(
				'swoft/api/ldd/getGoodsDetail',
				{
					data: {
						id: _this.id,
						uid: uni.getStorageSync('userInfo').id
					}
				}, 
				(res) => {
					if(res.code == 0){
						let detailImgList = res.data.detailImgList.split(',');
						let banner = [];
						detailImgList.forEach((item,index)=>{
							let li = {
								img: item,
								title: '',
								url: '',
								opentype: 'click'
							}
							banner.push(li);
						});
						_this.banner = banner;
						_this.goodsFirstImg = res.data.options[0].imgUrl;
						_this.goods = res.data;
						_this.usefulPrice = res.data.options[0].usefulPrice;
						_this.mValue = res.data.options[0].mValue;
						_this.detail = res.data.options[0].detail;
						_this.options = res.data.options;
						let goods_option_name = '';
						res.data.options[0].attributeJson.forEach((item)=>{
							if(goods_option_name == ''){
								goods_option_name = item.val;
							}else{
								goods_option_name += '+'+item.val;
							}
						});
						_this.skuSn = res.data.options[0].skuSn;
						_this.price = res.data.options[0].costPrice;
						_this.goods_option_name = goods_option_name;
						_this.num = 1;
						_this.minNum = 1;
						_this.shopCardCount = res.data.shopCardCount;
					}else{
						_this.isEmpty = true;
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
		chooseSpec: function(index){
			for (var j = 0; j < _this.options.length; j++) {
				_this.options[j].checked = false;
			}
			_this.options[index].checked = true;
			_this.num = 1;
			_this.skuSn = _this.options[index].skuSn;
			_this.price = _this.options[index].costPrice;
			let goods_option_name = '';
			_this.options[index].attributeJson.forEach((item)=>{
				if(goods_option_name == ''){
					goods_option_name = item.val;
				}else{
					goods_option_name += '+'+item.val;
				}
			});
			_this.goods_option_name = goods_option_name;
			let detailImgList = _this.options[index].detailImgList.split(',');
			let banner = [];
			detailImgList.forEach((item,index)=>{
				let li = {
					img: item,
					title: '',
					url: '',
					opentype: 'click'
				}
				banner.push(li);
			});
			_this.banner = banner;
			_this.goodsFirstImg = _this.options[index].imgUrl;
			_this.usefulPrice = _this.options[index].usefulPrice;
			_this.mValue = _this.options[index].mValue;
			_this.detail = _this.options[index].detail;
		},
		numberChange: function(e){
			_this.num = e[0];
		},
		buyClick: function(e){
			_this.sureType = e;
			if(e == 1){
				_this.sureText = '加入购物车';
			}else{
				_this.sureText = '立即购买';
			}
			_this.$refs.goodsAttr.open();
		},
		numberChange: function(e){
			_this.num = e[0];
		},
		sure: function(){
			if(_this.sureType == 1){
				// 加入购物车
				_this.pageLoading = true;
				uni.gRequest.post(
					'swoft/api/ldd/editShopcart',
					{
						data: {
							uid: uni.getStorageSync('userInfo').id,
							spu_sn: _this.goods.spuSn,
							sku_sn: _this.skuSn,
							source_type: _this.goods.sourceType,
							num: _this.num,
							form: 'goods'
						}
					}, 
					(res) => {
						if(res.code == 0){
							_this.$refs.guiPage.openMessage('success','已加入到购物车',true,1500);
							_this.$refs.goodsAttr.close();
							_this.shopCardCount = Number(_this.shopCardCount) + _this.num;
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
			}else{
				var postData = [];
				postData.push({
					spu_sn: _this.goods.spuSn,
					sku_sn: _this.skuSn,
					goods_name: _this.goods.title,
					goods_img: _this.goodsFirstImg,
					goodsOptionName: _this.goods_option_name,
					num: _this.num,
					price: _this.usefulPrice,
					cost_price: _this.price,
					totalPrice: (parseFloat(_this.num * parseFloat(_this.usefulPrice))).toFixed(2),
					totalMvalue: _this.num * _this.mValue
				});
				_this.$refs.goodsAttr.close();
				uni.setStorageSync('lddPostData',postData);
				uni.navigateTo({
					url: '/pages/ldd/postOrder?num='+postData[0].num+'&totalPrice='+postData[0].totalPrice+'&shopCartIdList='
				});
			}
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
	},
	components: {
		jyfParser
	}
}
</script>
<style>
	page{background-color:#F5F5F9;}
	.gui-footer-large-buttons{ border-radius: 50rpx; margin-right: 0; overflow: hidden;}
	.speclist{display:flex;flex-wrap:wrap;}
	.specli{padding:10rpx 20rpx;min-width:90rpx;background-color:#E5E5E5;border-radius:8rpx;font-size:26rpx;margin:0 20rpx 20rpx 0;color:#666666;text-align:center;}
	.specli000000{border-color:#000000;background-color:#000000;color:#FFFFFF;}
	.specliF9DB3B{border-color:#F9DB3B;background-color:#F9DB3B;color:#FFFFFF;}
	.h120{height:120rpx;}
	.footImg{width:30rpx;height:30rpx;}
	.w100{width:100rpx;}
	.btn1{width:180rpx;height:70rpx;line-height:70rpx;text-align:center;border-radius:35rpx 0 0 35rpx;background-image:linear-gradient(to right,#FF9502,#FFC900);}
	.btn2{width:180rpx;height:70rpx;line-height:70rpx;text-align:center;border-radius:0 35rpx 35rpx 0;background-image:linear-gradient(to right,#FF7600,#FF4F00);}
	.btn3{width:360rpx;height:70rpx;line-height:70rpx;text-align:center;border-radius:35rpx;background-image:linear-gradient(to right,#FF7600,#FF4F00);}
	.shopCartNum{height:28rpx;line-height:28rpx;border-radius:15rpx;padding:0 9rpx;display:inline-block;position:absolute;top:-10rpx;left:60rpx;z-index:99;}
	.product-attr{width:690rpx;max-height:750rpx;margin:30rpx 0;}
	.speclist{display:flex;flex-wrap:wrap;}
	.specli{padding:10rpx 20rpx;min-width:90rpx;background-color:#F6F6F6;border-radius:8rpx;font-size:26rpx;margin:0 20rpx 20rpx 0;color:#000000;text-align:center;border:thin solid #F6F6F6;}
	.speclied{border-color:#FF4F00;background-color:#FDF9FA;color:#FF4F00;}
	.sure{height:90rpx;border-radius:45rpx;text-align:center;line-height:90rpx;color:#FFFFFF;font-size:30rpx;margin-top:40rpx;}
	.lime-painter{position:fixed;left:2000rpx;}
	.h5Desc{text-align:center;font-size:28rpx;color:#FFFFFF;margin-top:100rpx;}
</style>