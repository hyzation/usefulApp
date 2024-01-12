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
						<input @tap="getLddAddressList(1,1)" class="mainir" name="province" :value="province" placeholder-class="color999999" placeholder="请选择省/直辖市" :disabled="true" />
					</view>
					<view v-if="provinceId != 0" class="maini gui-flex gui-space-between gui-align-items-center gui-relative borderTop">
						<text class="mainil"></text>
						<input @tap="getLddAddressList(2,1)" class="mainir" name="city" :value="city" placeholder-class="color999999" :placeholder="'请选择'+(provinceId != 1 && provinceId != 3 && provinceId != 6 && provinceId != 26 ? '市' : '区')" :disabled="true" />
					</view>
					<view v-if="cityId != 0" class="maini gui-flex gui-space-between gui-align-items-center gui-relative borderTop">
						<text class="mainil"></text>
						<input @tap="getLddAddressList(3,1)" class="mainir" name="county" :value="county" placeholder-class="color999999" :placeholder="'请选择'+(provinceId != 1 && provinceId != 3 && provinceId != 6 && provinceId != 26 ? '区' : '街道')" :disabled="true" />
					</view>
					<view v-if="countyId != 0 && provinceId != 1 && provinceId != 3 && provinceId != 6 && provinceId != 26 && actionSheetItems.length > 0" class="maini gui-flex gui-space-between gui-align-items-center gui-relative borderTop">
						<text class="mainil"></text>
						<input @tap="getLddAddressList(4,1)" class="mainir" name="street" :value="street" placeholder-class="color999999" placeholder="请选择街道" :disabled="true" />
					</view>
					<view class="maini_ gui-flex gui-space-between gui-relative borderTop">
						<text class="mainil">详细地址:</text>
						<textarea class="mainir_" name="address" :value="address" placeholder-class="color999999" placeholder="请输入详细地址信息，如道路、门牌号、小区、楼栋号、单元室等"></textarea>
					</view>
				</view>
				<view class="main">
					<view class="maini gui-flex gui-space-between gui-align-items-center">
						<text class="mainil">设为默认收货地址</text>
						<text @tap="setDefault" class="addrTxt2 gui-icons">{{isDefault ? '&#xe7f8;' : '&#xe762;'}}</text>
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
			<gui-action-sheet ref="guiactionsheet" :canCloseByShade="true" listColor="#FF4F00" :height="900" :isCancelBtn="false" @selected="selected" :title="'请选择所在'+levelName" :items="actionSheetItems"></gui-action-sheet>
		</view>
	</gui-page>
</template>
<script>
	var graceChecker = require("@/GraceUI5/js/checker.js");
	var _this;
	export default {
		data() {
			return {
				pageLoading: false,
				provinceCode: 0,
				cityCode: 0,
				countyCode: 0,
				streetCode: 0,
				provinceId: 0,
				cityId: 0,
				countyId: 0,
				streetId: 0,
				province: '',
				city: '',
				county: '',
				street: '',
				isDefault: false,
				id: 0,
				name: '',
				tel: '',
				address: '',
				actionSheetItems: [],
				level: 0,
				levelName: '',
				isOver: false
			}
		},
		onLoad: function(e){
			_this = this;
			if(e.id){
				_this.id = e.id;
				if(e.id != 0){
					uni.gJS.setNavBar({title:"编辑收货地址"});
					_this.getUserAddressFromId();
				}else{
					uni.gJS.setNavBar({title:"添加收货地址"});
				}
			}
		},
		methods: {
			selected(e) {
				switch(_this.level){
					case 1: 
						_this.provinceCode = _this.actionSheetItems[e].code;
						_this.provinceId = _this.actionSheetItems[e].id;
						_this.province = _this.actionSheetItems[e].title;
						_this.cityCode = 0;
						_this.cityId = 0;
						_this.city = '';
						_this.countyCode = 0;
						_this.countyId = 0;
						_this.county = '';
						_this.streetCode = 0;
						_this.streetId = 0;
						_this.street = '';
					break;
					case 2:
						_this.cityCode = _this.actionSheetItems[e].code;
						_this.cityId = _this.actionSheetItems[e].id;
						_this.city = _this.actionSheetItems[e].title;
						_this.countyCode = 0;
						_this.countyId = 0;
						_this.county = '';
						_this.streetCode = 0;
						_this.streetId = 0;
						_this.street = '';
					break;
					case 3:
						_this.countyCode = _this.actionSheetItems[e].code;
						_this.countyId = _this.actionSheetItems[e].id;
						_this.county = _this.actionSheetItems[e].title;
						_this.streetCode = 0;
						_this.streetId = 0;
						_this.street = '';
						setTimeout(function(){
							_this.getLddAddressList(4,0);
						},50);
					break;
					case 4:
						_this.streetCode = _this.actionSheetItems[e].code;
						_this.streetId = _this.actionSheetItems[e].id;
						_this.street = _this.actionSheetItems[e].title;
					break;
				}
			},
			getLddAddressList(e,isOpen) {
				_this.pageLoading = true;
				let postData = {
					uid: uni.getStorageSync('userInfo').id
				};
				let pid = 0;
				_this.level = e;
				switch(e){
					case 1: pid = 0; _this.levelName = '省/直辖市'; break;
					case 2: 
						pid = _this.provinceId; 
						if(_this.provinceId != 1 && _this.provinceId != 3 && _this.provinceId != 6 && _this.provinceId != 26){
							_this.levelName = '市'; 
						}else{
							_this.levelName = '区'; 
						}
					break;
					case 3: 
						pid = _this.cityId; 
						if(_this.provinceId != 1 && _this.provinceId != 3 && _this.provinceId != 6 && _this.provinceId != 26){
							_this.levelName = '区'; 
						}else{
							_this.levelName = '街道'; 
						}
					break;
					case 4: pid = _this.countyId; _this.levelName = '街道'; break;
				}
				uni.gRequest.post(
					'swoft/api/ldd/getLddAddressList',
					{
						data: {
							pid: pid,
							uid: uni.getStorageSync('userInfo').id
						}
					}, 
					(res) => {
						if(res.code == 0){
							_this.actionSheetItems = res.data;
							if(res.data.length > 0){
								if(isOpen == 1){
									_this.$refs.guiactionsheet.open();
								}
								_this.isOver = false;
							}else{
								_this.isOver = true;
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
			setDefault: function(){
				_this.isDefault = !_this.isDefault;
			},
			getUserAddressFromId: function(){
				_this.pageLoading = true;
				uni.gRequest.post(
					'swoft/api/ldd/getUserAddressInfo',
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
							_this.provinceCode = res.data.provinceCode;
							_this.cityCode = res.data.cityCode;
							_this.countyCode = res.data.countyCode;
							_this.streetCode = res.data.streetCode;
							_this.provinceId = res.data.provinceId;
							_this.cityId = res.data.cityId;
							_this.countyId = res.data.countyId;
							_this.streetId = res.data.streetId;
							_this.province = res.data.province;
							_this.city = res.data.city;
							_this.county = res.data.county;
							_this.street = res.data.street;
							_this.getLddAddressList(4,0);
							if(res.data.isDefault == 1){
								_this.isDefault = true;
							}else{
								_this.isDefault = false;
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
					'swoft/api/ldd/delUserAddress',
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
					{name: "county", checkType: "notnull", checkRule: "", errorMsg: "请选择所在地区"}
				];
				if(_this.isOver){
					if(_this.actionSheetItems.length > 0){
						rule.push({name: "street", checkType: "notnull", checkRule: "", errorMsg: "请选择所在地区"});
					}
				}else{
					rule.push({name: "street", checkType: "notnull", checkRule: "", errorMsg: "请选择所在地区"});
				}
				rule.push({name: "address", checkType: "notnull", checkRule: "", errorMsg: "请填写详细地址"});
				var formData = e.detail.value;
				formData.provinceCode = _this.provinceCode;
				formData.cityCode = _this.cityCode;
				formData.countyCode = _this.countyCode;
				formData.streetCode = _this.streetCode;
				formData.provinceId = _this.provinceId;
				formData.cityId = _this.cityId;
				formData.countyId = _this.countyId;
				formData.streetId = _this.streetId;
				formData.province = _this.province;
				formData.city = _this.city;
				formData.county = _this.county;
				formData.street = _this.street;
				if(_this.isDefault){
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
					'swoft/api/ldd/editUserAddress',
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
		}
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
