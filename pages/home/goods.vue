<template>
	<gui-page :isLoading="pageLoading" ref="guiPage">
		<view slot="gBody">
			<view class="fullPage gui-flex gui-justify-content-center gui-align-items-center fm" v-if="isEmpty" style="margin-top:-100rpx;"><gui-image src="../../static/images/noData.png" :width="396" :height="226" :timer="0"></gui-image></view>
			<block v-if="!isEmpty && goods">
				<view class="bgFFFFFF">
					<gui-swiper :autoplay="false" :circular="false" :swiperItems="goods.imgList" :width="750" :height="750" borderRadius="0rpx" :spacing="0" :padding="0"
						:indicatorActiveWidth="38" :indicatorBarHeight="40" :indicatorWidth="28" :indicatorHeight="6" indicatorColor="#E7E7E7" indicatorActiveColor="#000000"></gui-swiper>
					<view class="plr30 mt30 gui-flex gui-align-items-center gui-space-between">
						<view class="gui-flex gui-align-items-end">
							<text class="fb f30 cDC261F" style="height:45rpx;line-height:55rpx;">￥</text>
							<text class="fb f45 lh45 cDC261F">{{goods.price}}</text>
							<text class="fb f28 ml10 gui-line-through c999999">￥{{goods.rePrice}}</text>
							<text class="fm f28 ml20 cFF4F00">{{goods.mValue}}推广值</text>
						</view>
						<view class="gui-flex gui-align-items-center">
							<text class="f28 ml10 c999999">已售：{{goods.salesVolume}}</text>
							<text @tap="$refs.guipopupHb.open()" class="gui-icons c231815 gui-bold ml30">&#xe615;</text>
						</view>
					</view>
					<view class="mt20 plr30 fb f28">{{goods.title}}</view>
					<view class="mt20 plr30 fm f28 c999999 pb20">{{goods.desc}}</view>
				</view>
				<view class="p30 bgFFFFFF mt20 gui-flex gui-align-items-center">
					<text class="f30 lh30 fb c231815">已选</text>
					<text class="f28 lh30 fm c999999 ml20">{{goods_option_name}} {{num}}件</text>
				</view>
				<view class="p30 bgFFFFFF mt20 gui-flex gui-align-items-center gui-space-between">
					<view class="gui-flex gui-align-items-center">
						<text class="f30 lh30 fb c231815">评价({{goods.commentCount}})</text>
					</view>
					<navigator :url="'/pages/home/goodsComment?goodsId='+id" hover-class="" class="lh30 gui-flex gui-justify-content-end gui-align-items-center">
						<text class="f28 c999999">查看详情</text>
						<text class="f28 c999999 gui-icons">&#xe601;</text>
					</navigator>
				</view>
				<view class="p30 bgFFFFFF gui-text-center c231815 f30 fb mt20">商品详情</view>
				<view class="bgFFFFFF"><jyf-parser :html="goods.content" ref="article"></jyf-parser></view>
				<gui-popup ref="goodsAttr" position="bottom" width="750rpx">
					<view @tap="$refs.goodsAttr.close()" style="width:48rpx;margin:30rpx auto;">
						<gui-image src="../../static/images/zheng/close.png" :timer="0" :width="48" :height="48"></gui-image>
					</view>
					<view class="bgFFFFFF p30 gui-relative" style="border-radius:20rpx 20rpx 0 0;">
						<view class="gui-flex gui-align-items-center gui-space-between">
							<gui-image :src="goods.coverPath+'?imageslim'" :width="120" :height="120" borderRadius="10rpx"></gui-image>
							<view style="width:550rpx;">
								<view class="gui-ellipsis f30 fm">{{goods.title}}</view>
								<view class="gui-ellipsis f28 fm c999999 mt10">
									<text class="cDC261F f28 fb">￥{{price}}</text>
									<text class="ml30">库存：{{stock}}</text>
								</view>
								<view class="gui-ellipsis f26 fm c999999 mt10">已选<text class="ml10 mr10" v-if="goods_option_name != ''">{{goods_option_name}}</text>{{num}}个</view>
							</view>
						</view>
						<scroll-view class="product-attr" :scroll-y="true">
							<block v-if="goods.isSpec == 1" v-for="(item, index) in speclist" :key="index">
								<view class="gui-flex gui-rows gui-space-between">
									<text class="fm f28 mt10">{{item.name}}</text>
								</view>
								<view class="speclist mt10">
									<view class="specli fm" :class="[item2.checked ? 'speclied' : '']" v-for="(item2, index2) in item.items" :key="index2" @tap="chooseSpec(item2.id,index,index2)">{{item2.name}}</view>
								</view>
							</block>
						</scroll-view>
						<view class="gui-flex gui-space-between gui-align-items-center mt30">
							<text class="f28 fm">数量</text>
							<gui-step-box buttonStyle="width:60rpx;height:60rpx;background-color:#F5F5F9;text-align:center;line-height:60rpx;font-size:40rpx;"
								inputStyle="border-radius:0;background-color:#e2e2e2;font-size:30rpx;height:60rpx;" 
								:value="num" :minNum="minNum" :maxNum="maxNum" @change="numberChange" :disabled="true">
							</gui-step-box>
						</view>
						<view class="sure fm" :class="stock > 0 ? 'bgFF4F00' : 'bg999999'" @tap="sure">{{stock > 0 ? sureText : '暂无库存'}}</view>
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
								<l-painter-text :text="'￥'+goods.price" css="color:#FF4F00;font-size:80rpx;height:73rpx;line-height:73rpx;display:inline-block;" />
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
					<view class="gui-flex gui-align-items-center">
						<view class="w100 gui-text-center ml20" @tap="doCollect">
							<image :src="'../../static/images/zheng/'+(goods.isCollect == 0 ? 'collect' : 'collectEd')+'.png'" class="footImg" mode="aspectFill"></image>
							<view class="f24 gui-text-center fm" :class="goods.isCollect == 0 ? 'c999999' : 'cFF4F00'">{{goods.isCollect == 0 ? '收藏' : '已收藏'}}</view>
						</view>
						<view class="w100 gui-text-center" @tap="$refs.guipopupHb.open()">
							<image src="../../static/images/zheng/share.png" class="footImg" mode="aspectFill"></image>
							<view class="f24 c999999 gui-text-center fm">分享</view>
						</view>
						<navigator url="/pages/shopcart/shopcart" open-type="switchTab" hover-class="" class="w100 gui-text-center gui-relative">
							<view class="shopCartNum bgFF4F00 cFFFFFF fb f20" v-if="shopCardCount > 0">{{shopCardCount}}</view>
							<image src="../../static/images/zheng/shopcart.png" class="footImg" mode="aspectFill"></image>
							<view class="f24 c999999 gui-text-center fm">购物车</view>
						</navigator>
					</view>
					<view class="gui-flex gui-align-items-center gui-justify-content-end">
						<block v-if="type == 0">
							<view @tap="buyClick(1)" class="btn1 fm f28 cFFFFFF">加入购物车</view>
							<view @tap="buyClick(2)" class="btn2 fm f28 cFFFFFF mr20">立即购买</view>
						</block>
						<block v-else>
							<view @tap="buyClick(2)" class="btn3 fm f28 cFFFFFF mr20">立即购买</view>
						</block>
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
			goods: null,
			speclist: [],
			type: 0, //来源 0:普通商品 1:0元购 2:9.9包邮 
			sureType: 0,
			shopCardCount: 0,
			minNum: 0,
			maxNum: 0,
			num: 0,
			stock: 0,
			salesVolume: 0,
			price: '0.00',
			weight: 0,
			mValue: 0,
			goods_option_id: '',
			goods_option_name: '',
			speclist: [],
			sureText: '',
			comment: null,
			goodsFirstImg: '',
			userCode: '',
			logo: '',
			path: ''
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
				'swoft/api/goods/getGoodsDetail',
				{
					data: {
						id: _this.id,
						uid: uid
					}
				}, 
				(res) => {
					if(res.code == 0){
						res.data.imgList.forEach((item,index)=>{
							item.img = item.path+'?imageslim';
							item.title = '';
							item.url = '';
							item.opentype = 'click';
							if(index == 0){
								_this.goodsFirstImg = item.img;
							}
						});
						_this.goods = res.data;
						_this.shopCardCount = res.data.shopCardCount;
						_this.price = res.data.price;
						_this.weight = res.data.weight;
						_this.mValue = res.data.mValue;
						_this.stock = res.data.stock;
						_this.maxNum = _this.stock;
						_this.time = res.data.time;
						_this.type = res.data.activityType;
						if(_this.stock > 0){
							_this.num = 1;
							_this.minNum = 1;
						}else{
							_this.num = 0;
							_this.minNum = 0;
						}
						if(res.data.isSpec == 1 && res.data.speclist.length > 0){
							_this.speclist = res.data.speclist;
							_this.specMakeUp();
						}
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
		chooseSpec: function(id,index,indexi){
			for (var j = 0; j < _this.speclist[index].items.length; j++) {
				_this.speclist[index].items[j].checked = false;
			}
			_this.speclist[index].items[indexi].checked = true;
			_this.specMakeUp();
		},
		specMakeUp: function(){
			var goods_option_id = '';
			var goods_option_name = '';
			var str = [];
			var price = '0.00';
			var weight = 0;
			var mValue = 0;
			var stock = 0;
			var salesVolume = 0;
			for (var i = 0; i < _this.speclist.length; i++) {
				for (var j = 0; j < _this.speclist[i].items.length; j++) {
					if (_this.speclist[i].items[j].checked == true) {
						if (goods_option_name == ''){
							goods_option_name += _this.speclist[i].items[j].name;
						}else{
							goods_option_name += ' ' + _this.speclist[i].items[j].name;
						}
						str.push({ [_this.speclist[i].id]: _this.speclist[i].items[j].id });
					}
				}
			}
			for (var i = 0; i < _this.goods.options.length; i++) {
				if (JSON.stringify(str) == _this.goods.options[i].ids) {
					price = parseFloat(_this.goods.options[i].price).toFixed(2);
					weight = _this.goods.options[i].weight;
					mValue = _this.goods.options[i].mValue;
					stock = _this.goods.options[i].stock;
					salesVolume = _this.goods.options[i].salesVolume;
					goods_option_id = _this.goods.options[i].id;
				}
			}
			_this.goods_option_id = goods_option_id;
			_this.goods_option_name = goods_option_name;
			_this.price = price;
			_this.weight = weight;
			_this.mValue = mValue;
			_this.stock = stock;
			_this.salesVolume = salesVolume;
			_this.maxNum = _this.stock;
			if(_this.stock > 0){
				_this.num = 1;
				_this.minNum = 1;
				if(_this.type != 0){
					_this.maxNum = 1;
				}
			}else{
				_this.num = 0;
				_this.minNum = 0;
			}
		},
		numberChange: function(e){
			_this.num = e[0];
		},
		doCollect: function(){
			let url = '';
			if(_this.goods.isCollect == 0){
				url = 'UserCollect';
			}else{
				url = 'delCollect';
			}
			let uid = uni.getStorageSync('userInfo').id;
			if(!uni.gRequest.checkLogin()){
				uid = 0;
			}
			_this.pageLoading = true;
			uni.gRequest.post(
				'swoft/api/goods/'+url,
				{
					data: {
						linkId: _this.goods.id,
						type: 1,
						uid: uid
					}
				}, 
				(res) => {
					if(res.code == 0){
						let msg = '';
						if(_this.goods.isCollect == 0){
							_this.goods.isCollect = 1;
							msg = '已收藏';
						}else{
							_this.goods.isCollect = 0;
							msg = '已取消';
						}
						_this.$refs.guiPage.openMessage('success',msg,true,1500);
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
		buyClick: function(e){
			_this.sureType = e;
			if(_this.stock > 0){
				_this.num = 1;
				if(_this.type != 0){
					if(_this.goods.isLimit == 1){
						_this.maxNum = _this.goods.limitNum;
					}
				}
			}
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
		sure: async function(){
			if(_this.stock == 0){
				return false;
			}
			if(_this.sureType == 1){
				// 加入购物车
				_this.pageLoading = true;
				uni.gRequest.post(
					'swoft/api/shopcart/editShopcart',
					{
						data: {
							uid: uni.getStorageSync('userInfo').id,
							goodsId: _this.goods.id,
							goodsOptionId: _this.goods_option_id,
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
				if(_this.goods.activityType != 0){
					let res = await uni.gRequest.postSync(
						'swoft/api/order/getActiveOrderNum',
						{
							data: {
								uid: uni.getStorageSync('userInfo').id,
								goodsId: _this.goods.id,
								activityType: _this.goods.activityType
							}
						},
						true,
						true
					);
					if(res && res.data <= 0){
						_this.$refs.guiPage.openMessage('default','已超过该商品可购买次数',true,1500);
						return false;
					}
				}
				var postData = [];
				postData.push({
					goodsId: _this.goods.id,
					activityType: _this.goods.activityType,
					cId: _this.goods.cId,
					cateId: _this.goods.cateId,
					goods_name: _this.goods.title,
					goods_img: _this.goods.coverPath,
					cover: _this.goods.cover,
					goodsOptionId: _this.goods_option_id,
					goodsOptionName: _this.goods_option_name,
					num: _this.num,
					stock: _this.stock,
					price: _this.price,
					totalPrice: (parseFloat(_this.num * parseFloat(_this.price))).toFixed(2),
					totalWeight: _this.num * _this.weight,
					totalMvalue: _this.num * _this.mValue,
					freightId: _this.goods.freightId
				});
				_this.$refs.goodsAttr.close();
				uni.setStorageSync('postData',postData);
				uni.navigateTo({
					url: '/pages/shopcart/postOrder?num='+postData[0].num+'&totalPrice='+postData[0].totalPrice+'&totalWeight='+postData[0].totalWeight+'&shopCartIdList='
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