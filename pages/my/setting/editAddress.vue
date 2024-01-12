<template>
	<gui-page :isLoading="pageLoading" ref="guiPage">
		<view slot="gBody">
			<form @submit="submit">
				<view class="main fm">
					<view class="maini gui-flex gui-space-between gui-align-items-center">
						<text class="mainil">收货人:</text>
						<input class="mainir" name="name" :value="name" placeholder-class="color999999" placeholder="请填写收货人姓名" />
					</view>
					<view class="maini gui-flex gui-space-between gui-align-items-center gui-relative borderTop">
						<text class="mainil">手机号码:</text>
						<input class="mainir" name="tel" :value="tel" type="number" :maxlength="11" placeholder-class="color999999" placeholder="请填写收货人手机号码" />
					</view>
					<view class="maini gui-flex gui-space-between gui-align-items-center gui-relative borderTop">
						<text class="mainil">所在地区:</text>
						<!--  #ifndef H5 -->
						<view @tap="openAddr" class="mainir gui-flex gui-space-between gui-align-items-center">
							<input class="width_" :disabled="true" placeholder-class="color999999" placeholder="请选择所在地区" :value="addr" />
							<text class="mainirr gui-icons">&#xe601;</text>
						</view>
						<!--  #endif -->
						<!--  #ifdef H5 -->
						<view @tap.stop="openAddres" class="mainir gui-flex gui-space-between gui-align-items-center">
							<view class="width_">{{addr == '' ? '请选择所在地区' : addr}}</view>
							<text class="mainirr gui-icons">&#xe601;</text>
						</view>
						<!--  #endif -->
					</view>
					<view class="maini_ gui-flex gui-space-between gui-relative borderTop">
						<text class="mainil">详细地址:</text>
						<textarea class="mainir_" name="address" :value="address" placeholder-class="color999999" placeholder="请输入详细地址信息，如道路、门牌号、小区、楼栋号、单元室等"></textarea>
					</view>
				</view>
				<view class="main">
					<view class="maini gui-flex gui-space-between gui-align-items-center">
						<text class="mainil">设为默认收货地址</text>
						<text @tap="setDefault" class="addrTxt2 gui-icons">{{isdefault ? '&#xe7f8;' : '&#xe762;'}}</text>
					</view>
				</view>
				<block v-if="id != 0">
					<button formType="submit" class="postBtn fb gui-fixed-lb lb2" hover-class="">保存</button>
					<button @tap="$refs.guimodal.open()" class="postBtn_ fb gui-fixed-lb lb lk" hover-class="">删除</button>
				</block>
				<block v-else>
					<button formType="submit" class="postBtn fb gui-fixed-lb lb" hover-class="">保存</button>
				</block>
			</form>
			<!--  #ifndef H5 -->
			<gui-area-picker ref="graceAddressPicker" @confirm="confirmAddr" :level="3" :value="defaultAddr" cancelText="关闭"></gui-area-picker>
			<!--  #endif -->
			<!--  #ifdef H5 -->
			<view class="content">
				<simple-address ref="simpleAddress" :pickerValueDefault="cityPickerValueDefault" @onConfirm="onConfirm" cancelColor="#999999" themeColor="#FF4F00"></simple-address>
			</view>
			<!--  #endif -->
			<gui-modal ref="guimodal" :isCloseBtn="false" title="操作提示">
				<view slot="content" class="plt30tb40 gui-bg-gray">
					<view class="gui-text-center f30 fm">确定要删除该地址吗？</view>
				</view>
				<view slot="btns" class="gui-flex gui-rows gui-space-around">
					<view class="modal-btns" @tap="$refs.guimodal.close()">
						<text class="c999999 fb">取消</text>
					</view>
					<view class="modal-btns" @tap="removeAddr">
						<text class="cFF4F00 fb">确认</text>
					</view>
				</view>
			</gui-modal>
		</view>
	</gui-page>
</template>
<script>
	var graceChecker = require("@/GraceUI5/js/checker.js");
	// #ifdef H5
	import simpleAddress from '@/node_modules/simple-address/simple-address.vue';
	// #endif
	var _this;
	export default {
		data() {
			return {
				pageLoading: false,
				cityPickerValueDefault: [0, 0, 1],
				labelArr: ['北京市','市辖区','东城区'],
				defaultAddr: ['', '', ''],
				province_id: 0,
				city_id: 0,
				county_id: 0,
				province: '',
				city: '',
				county: '',
				addr: '',
				isdefault: false,
				id: 0,
				name: '',
				tel: '',
				address: ''
			}
		},
		onLoad: function(e){
			_this = this;
			_this.id = e.id;
			if(e.id != 0){
				uni.gJS.setNavBar({title:"编辑收货地址"});
				_this.getUserAddressFromId();
			}else{
				uni.gJS.setNavBar({title:"添加收货地址"});
			}
		},
		methods: {
			openAddres() {
				// 根据 label 获取
				var index = _this.$refs.simpleAddress.queryIndex([_this.labelArr[0], _this.labelArr[1], _this.labelArr[2]], 'label');
				_this.cityPickerValueDefault = index.index;
				_this.$refs.simpleAddress.open();
			},
			onConfirm(e) {
				_this.cityPickerValueDefault = e.value;
				_this.addr = e.labelArr[0]+' '+e.labelArr[1]+' '+e.labelArr[2];
				_this.labelArr = e.labelArr;
				_this.province = e.labelArr[0];
				_this.city = e.labelArr[1];
				_this.county = e.labelArr[2];
				_this.province_id = e.provinceCode+'0000';
				_this.city_id = e.cityCode+'00';
				_this.county_id = e.areaCode;
			},
			setDefault: function(){
				_this.isdefault = !_this.isdefault;
			},
			openAddr: function(){
				_this.$refs.graceAddressPicker.open();
			},
			confirmAddr: function(e){
				_this.addr = e.names[0]+' '+e.names[1]+' '+e.names[2];
				_this.province_id = e.codes[0];
				_this.city_id = e.codes[1];
				_this.county_id = e.codes[2];
				_this.province = e.names[0];
				_this.city = e.names[1];
				_this.county = e.names[2];
			},
			getUserAddressFromId: function(){
				_this.pageLoading = true;
				uni.gRequest.post(
					'swoft/api/userAddress/getUserAddressInfo',
					{
						data: {
							id: _this.id,
							uid: uni.getStorageSync('userInfo').id
						}
					}, 
					(res) => {
						if(res.code == 0){
							_this.name = res.data.name;
							_this.tel = res.data.tel;
							_this.address = res.data.address;
							_this.addr = res.data.province+' '+res.data.city+' '+res.data.county;
							_this.province_id = res.data.provinceCode;
							_this.city_id = res.data.cityCode;
							_this.county_id = res.data.countyCode;
							_this.province = res.data.province;
							_this.city = res.data.city;
							_this.county = res.data.county;
							_this.defaultAddr = [res.data.province,res.data.city,res.data.county];
							_this.labelArr = [res.data.province,res.data.city,res.data.county];
							if(res.data.isDefault == 1){
								_this.isdefault = true;
							}else{
								_this.isdefault = false;
							}
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
			removeAddr: function(){
				_this.pageLoading = true;
				uni.gRequest.post(
					'swoft/api/userAddress/delUserAddress',
					{
						data: {
							id: _this.id,
							uid: uni.getStorageSync('userInfo').id
						}
					}, 
					(res) => {
						if(res.code == 0){
							_this.$refs.guimodal.close();
							_this.$refs.guiPage.openMessage('success',res.msg,true,1500);
							setTimeout(function(){
								uni.navigateBack({
									delta: 1
								})
							},1500);
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
			submit: function(e){
				var rule = [
					{name: "name", checkType: "notnull", checkRule: "", errorMsg: "请填写收货人姓名"},
					{name: "tel", checkType: "notnull", checkRule: "", errorMsg: "请填写收货人手机号码"},
					{name: "tel", checkType: "phoneno", checkRule: "", errorMsg: "手机号码格式不正确"},
					{name: "province", checkType: "notnull", checkRule: "", errorMsg: "请选择所在地区"},
					{name: "city", checkType: "notnull", checkRule: "", errorMsg: "请选择所在地区"},
					{name: "county", checkType: "notnull", checkRule: "", errorMsg: "请选择所在地区"},
					{name: "address", checkType: "notnull", checkRule: "", errorMsg: "请填写详细地址"},
				];
				var formData = e.detail.value;
				formData.provinceCode = _this.province_id;
				formData.cityCode = _this.city_id;
				formData.countyCode = _this.county_id;
				formData.province = _this.province;
				formData.city = _this.city;
				formData.county = _this.county;
				if(_this.isdefault){
					formData.isDefault = 1;
				}else{
					formData.isDefault = 0;
				}
				var checkRes = graceChecker.check(formData, rule);
				if(!checkRes){
					_this.$refs.guiPage.openMessage('default',graceChecker.error,true,1500);
					return false;
				}
				formData.uid = uni.getStorageSync('userInfo').id;
				formData.id = _this.id;
				_this.pageLoading = true;
				uni.gRequest.post(
					'swoft/api/userAddress/editUserAddress',
					{
						data: formData
					}, 
					(res) => {
						_this.$refs.guiPage.openMessage('success',res.msg,true,1500);
						if(res.code == 0){
							setTimeout(function(){
								uni.navigateBack({
									delta: 1
								})
							},1500);
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
		},
		// #ifdef H5
		components: {
			simpleAddress
		},
		// #endif
	}
</script>
<style>
	page{background-color:#F8F8F8;}
	.main{margin-top:20rpx;background-color:#FFFFFF;padding:0 40rpx;}
	.maini{height:100rpx;}
	.mainil{font-size:30rpx;}
	.mainir{font-size:30rpx;width:540rpx;}
	.width_{width:492rpx;font-size:30rpx;}
	.color999999{color:#9999999;}
	.mainir_{width:540rpx;height:80rpx;font-size:30rpx;line-height:38rpx;margin-top:4rpx!important;padding:0!important;}
	.maini_{padding:30rpx 0;}
	.mainirr{font-size:32rpx;color:#999999;}
	.addrTxt1{color:#999999;}
	.addrTxt2{color:#FF4F00;}
	.lb{left:30rpx;bottom:30rpx;}
	.lb2{left:30rpx;bottom:150rpx;}
	.lk{background-color:#FFFFFF;border:1px solid #FF4F00!important;color:#FF4F00;}
	.postBtn{width:690rpx;height:90rpx;margin-top:60rpx;font-size:30rpx;line-height:90rpx;padding:0;border-radius:46rpx;background-color:#FF4F00;color:#FFFFFF;border:none!important;}
	.postBtn_{width:690rpx;height:90rpx;margin-top:60rpx;font-size:30rpx;line-height:90rpx;padding:0;border-radius:46rpx;color:#FF4F00;border:thin solid #FF4F00;}
</style>
