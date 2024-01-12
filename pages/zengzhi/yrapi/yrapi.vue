<template>
	<gui-page ref="guiPage" :isLoading="pageLoading">
		<view slot="gBody">
			<view class="pt20 pb30">
				<gui-switch-navigation :items="navList" :width="750"
				@change="navchange" :currentIndex="navIndex" textAlign="center" :isCenter="true" activeDirection="center" :size="250" 
				activeLineBg="linear-gradient(to right, #FF4F00, #FF4F00)" activeColor="#FF4F00" color="#000000"
				:margin="20" padding="30rpx" :activeFontWeight="400"
				activeLineHeight="6rpx" lineHeight="72rpx" activeLineWidth='80rpx' fontSize="34rpx" activeFontSize="34rpx">
				</gui-switch-navigation>
			</view>
			<swiper id="swiper" :style="{height:scrollHeight+'px'}" :current="navIndex" @change="swiperChange">
				<swiper-item>
					<scroll-view :scroll-y="true" :style="{height:scrollHeight+'px'}">
						<view class="bgFFFFFF p30 ml30 mr30 br30">
							<view class="msgBox bgFFA075 gui-flex gui-align-items-center">
								<text class="gui-icons lh1">&#xe656;</text>
								<text class="ml20 lh1 f28">全天24小数开放充值！充值享折扣优惠～</text>
							</view>
							<view class="inputBox gui-flex gui-align-items-center gui-space-between gui-relative borderBottom">
								<input class="f60 w450" placeholder="请输入手机号" placeholder-class="f40" type="number" :maxlength="11" v-model="tel" @input="oninputTel" />
								<text @tap="clearTel" class="gui-icons cD1D1D1 f40" v-if="showDelTel">&#xe632;</text>
							</view>
							<view class="f36 w630 mAuto c999999 h90 lh90">{{gsd}}</view>
							<view class="h20"></view>
							<view class="f36 w630 mtb20Auto c999999">充值金额<text class="cFF4F00 f24">（预计72小时内到账）</text></view>
							<view class="w630 mtb30Auto gui-flex gui-align-items-center gui-space-between">
								<block v-for="(item,index) in priceList1" :key="index">
									<view v-if="item.canUse" @tap="changePrice1(index)" class="priceBox pt60 pb30 gui-relative" :class="priceList1Index == index ? 'priceBoxSed' : ''">
										<view class="priceBoxlt gui-absolute-lt">立减{{item.amount - item.price}}元</view>
										<view class="sanjiao"></view>
										<div class="sanjiao-text">{{item.percent*10}}折</div>
										<view class="gui-text-center f40">{{item.amount}}元</view>
										<view class="gui-text-center f30 mt20">优惠价¥{{item.price}}</view>
									</view>
									<view v-else class="priceBox pt60 pb30 gui-relative">
										<view class="priceBoxlt gui-absolute-lt bgD1D1D1">立减{{item.amount - item.price}}元</view>
										<view class="sanjiao bgD1D1D1"></view>
										<div class="sanjiao-text">{{item.percent*10}}折</div>
										<view class="gui-text-center f40 cD1D1D1">{{item.amount}}元</view>
										<view class="gui-text-center f30 mt20 cD1D1D1">优惠价¥{{item.price}}</view>
									</view>
								</block>
							</view>
							<view class="f36 w630 mtb20Auto c999999">温馨提示</view>
							<view class="w630 mtb20Auto">
								<view class="f28 cF7142C mt30">1、支持全国移动，联通、电信三网充值</view>
								<view class="f28 cF7142C mt30">2、合账号、集团号、公司暂不支携号转网、虚拟号、空号、号充值；</view>
								<view class="f28 cF7142C mt30">3、主副卡不能同时充值，只能充1个，等待充值到账后才可以充另一个!</view>
								<view class="f28 cF7142C mt30">4、到账时间:预计72小时内到账</view>
								<view class="f28 cF7142C mt30">如遇高峰时段(月初/月末/节假日)，到账时间可能会稍有延迟具体到账时间以当地运营商处理时间为准，请耐心等待!</view>
								<view class="f28 cF7142C mt30">5、请仔细核对充值号码，充值错误无法退回</view>
								<view class="f28 cF7142C mt30">6、如充值失败，退款24小时内将原路返回，可以收到退款后再次充值</view>
								<view class="f28 cF7142C mt30">7、超过12天的订单无法提供售后服务</view>
							</view>
						</view>
						<view class="h30"></view>
					</scroll-view>
				</swiper-item>
				<swiper-item>
					<scroll-view :scroll-y="true" :style="{height:scrollHeight+'px'}">
						<view class="bgFFFFFF p30 ml30 mr30 br30">
							<view class="msgBox bgFFA075 gui-flex gui-align-items-center">
								<text class="gui-icons lh1">&#xe656;</text>
								<text class="ml20 lh1 f28">全天24小数开放充值！充值享折扣优惠～</text>
							</view>
							<view class="f30 c999999 gui-flex gui-align-items-center mt30">
								<view class="dot"><view class="dot_"></view></view>
								<text class="ml10">缴费单位</text>
							</view>
							<view class="gui-flex gui-align-items-end gui-space-between">
								<view class="h90 gui-relative borderLeft_ mr40 ml20"></view>
								<!-- <view class="inputBox_ gui-flex1 gui-flex gui-align-items-center gui-space-between gui-relative borderBottom" @tap="$refs.guiactionsheetUnit.open()"> -->
								<view class="inputBox_ gui-flex1 gui-flex gui-align-items-center gui-space-between gui-relative borderBottom">	
									<input class="f36 gui-flex1" placeholder="请选择缴费单位" :disabled="true" :value="unitIndex >= 0 ? unitArr[unitIndex].title : ''" />
									<!-- <text class="gui-icons c999999 f36 ml20">&#xe603;</text> -->
								</view>
							</view>
							<view class="f30 c999999 gui-flex gui-align-items-center mt30">
								<view class="dot"><view class="dot_"></view></view>
								<text class="ml10">所属地区</text>
							</view>
							<view class="gui-flex gui-align-items-end gui-space-between">
								<view class="h90 gui-relative borderLeft_ mr40 ml20"></view>
								<view class="inputBox_ gui-flex1 gui-flex gui-align-items-center gui-space-between gui-relative borderBottom" @tap.stop="openAddres">
									<input class="f36 gui-flex1" placeholder="请选择所属地区" :disabled="true" :value="addr" />
									<text class="gui-icons c999999 f36 ml20">&#xe603;</text>
								</view>
							</view>
							<view class="f30 c999999 gui-flex gui-align-items-center mt30">
								<view class="dot"><view class="dot_"></view></view>
								<text class="ml10">缴费户号</text>
							</view>
							<view class="gui-flex gui-align-items-end gui-space-between">
								<view class="h90 gui-relative borderLeft_ mr40 ml20"></view>
								<view class="inputBox_ gui-flex1 gui-flex gui-align-items-center gui-space-between gui-relative borderBottom">
									<input class="f36 gui-flex1" placeholder="请输入缴费户号" type="number" :maxlength="20" v-model="mobile" @input="oninputMobile" />
									<text @tap="clearMobile" class="gui-icons cD1D1D1 f36 ml20" v-if="showDelMobile">&#xe632;</text>
								</view>
							</view>
							<block v-if="unitIndex == 1">
								<view class="f30 c999999 gui-flex gui-align-items-center mt30">
									<view class="dot"><view class="dot_"></view></view>
									<text class="ml10">选择证件</text>
								</view>
								<view class="gui-flex gui-align-items-end gui-space-between">
									<view class="h90 gui-relative borderLeft_ mr40 ml20"></view>
									<view class="inputBox_ gui-flex1 gui-flex gui-align-items-center gui-space-between gui-relative borderBottom" @tap="$refs.guiactionsheetYtype.open()">
										<input class="f36 gui-flex1" placeholder="请选择证件" :disabled="true" :value="ytypeIndex >= 0 ? ytypeArr[ytypeIndex].title : ''" />
										<text class="gui-icons c999999 f36 ml20">&#xe603;</text>
									</view>
								</view>
								<view class="f30 c999999 gui-flex gui-align-items-center mt30">
									<view class="dot"><view class="dot_"></view></view>
									<text class="ml10">用户信息</text>
								</view>
								<view class="gui-flex gui-align-items-end gui-space-between">
									<view class="h90 gui-relative borderLeft_ mr40 ml20"></view>
									<view class="inputBox_ gui-flex1 gui-flex gui-align-items-center gui-space-between gui-relative borderBottom">
										<input class="f36 gui-flex1" placeholder="请输入后6位号码" type="number" :maxlength="6" v-model="number" @input="oninputNumber" />
										<text @tap="clearNumber" class="gui-icons cD1D1D1 f36 ml20" v-if="showDelNumber">&#xe632;</text>
									</view>
								</view>
							</block>
							<view class="h20"></view>
							<view class="f36 w630 mtb20Auto c999999">充值金额<text class="cFF4F00 f24">（预计72小时内到账）</text></view>
							<view class="w630 mtb30Auto gui-flex gui-align-items-center gui-space-between gui-wrap">
								<block v-for="(item,index) in priceList2" :key="index">
									<view @tap="changePrice2(index)" class="priceBox pt60 pb30 gui-relative mb30" :class="priceList2Index == index ? 'priceBoxSed' : ''">
										<view class="priceBoxlt gui-absolute-lt">立减{{item.amount - item.price}}元</view>
										<view class="sanjiao"></view>
										<div class="sanjiao-text">{{item.percent*10}}折</div>
										<view class="gui-text-center f40">{{item.amount}}元</view>
										<view class="gui-text-center f30 mt20">优惠价¥{{item.price}}</view>
									</view>
								</block>
							</view>
							<view class="f36 w630 mtb20Auto c999999">温馨提示</view>
							<view class="w630 mtb20Auto">
								<view class="f28 cF7142C mt30">1、充值范围</view>
								<view class="f28 cF7142C mt30">国家电网 <text class="gui-bold">不支持地区:上海,内蒙古,新疆广东广西,云南,贵州海南</text></view>
								<view class="f28 cF7142C mt30">南方电网 <text class="gui-bold">支持地区: 广东 广西 云南 海南 贵州</text></view>
								<view class="f28 cF7142C mt30">2、欠费金额超过500元，无法充值!缴费金额少于欠费金额无法充值!</view>
								<view class="f28 cF7142C mt30">3、平均到账周期为24小时内，充值高峰期，最慢72小时到账，超过72小时不到账为充值失败，24小时内自动退款</view>
								<view class="f28 cF7142C mt30">4、若户号错误无法充值，则自动退款。若输错成他人户号目充值成功，不予退还!请在充值前确认好充值户号，避免充错!。</view>
								<view class="f28 cF7142C mt30">5、部分订单会分批充值，例如100元订单分两个50元到账</view>
								<view class="f28 cF7142C mt30">充值成功 可登录[网上国网APP] 查询充值记录</view>
							</view>
						</view>
						<view class="h30"></view>
					</scroll-view>
				</swiper-item>
			</swiper>
			<view class="h150 wp100 bgFFFFFF gui-flex gui-align-items-center gui-space-between">
				<navigator url="/pages/zengzhi/yrapi/record" hover-class="none" class="gui-text-center ml50">
					<view><text class="gui-icons f45 c999999">&#xe62f;</text></view>
					<view class="f28 c999999">充值记录</view>
				</navigator>
				<view @tap="recharge" class="btn_ gui-flex1">立即充值</view>
			</view>
			<gui-action-sheet ref="guiactionsheetUnit" :height="334" listFontSize="30rpx" listColor="#FF4F00" :canCloseByShade="true" @selected="selectedUnit" @cancel="cancelUnit" title="请选择缴费单位" :items="unitArr"></gui-action-sheet>
			<simple-address ref="simpleAddress" btnFontSize="30rpx" :pickerValueDefault="cityPickerValueDefault" @onConfirm="onConfirm" cancelColor="#999999" themeColor="#FF4F00"></simple-address>
			<gui-action-sheet ref="guiactionsheetYtype" :height="434" listFontSize="30rpx" listColor="#FF4F00" :canCloseByShade="true" @selected="selectedYtype" @cancel="cancelYtype" title="请选择证件" :items="ytypeArr"></gui-action-sheet>
			<!-- 选择支付 -->
			<gui-popup ref="payWay" position="center" :canCloseByShade="false" bgColor="rgba(0,0,0,0.85)" width="750rpx">
				<view @tap="$refs.payWay.close()" style="width:48rpx;margin:30rpx auto;">
					<gui-image src="../../../static/images/zheng/close.png" :timer="0" :width="48" :height="48"></gui-image>
				</view>
				<view class="payWayBox pb20">
					<view class="gui-text-center f36 fb" style="line-height:36rpx;padding:80rpx 0 40rpx 0;">支付方式</view>
					<view @tap="changePayType(1,'微信')" class="pt30 pb30 mlr40 gui-flex gui-align-items-center gui-space-between">
						<view class="gui-flex gui-align-items-center">
							<gui-image src="../../../static/images/zheng/pay1.png" :timer="0" :width="40" :height="40"></gui-image>
							<text class="fm f28 ml20">微信支付</text>
						</view>
						<text class="gui-icons" :class="payType == 1 ? 'cFF4F00 f32' : 'c999999 f32'">{{payType == 1 ? '&#xe685;' : '&#xe762;'}}</text>
					</view>
					<view @tap="changePayType(2,'支付宝')" class="pt30 pb30 mlr40 gui-flex gui-align-items-center gui-space-between gui-relative borderTop">
						<view class="gui-flex gui-align-items-center">
							<gui-image src="../../../static/images/zheng/pay2.png" :timer="0" :width="40" :height="40"></gui-image>
							<text class="fm f28 ml20">支付宝支付</text>
						</view>
						<text class="gui-icons" :class="payType == 2 ? 'cFF4F00 f32' : 'c999999 f32'">{{payType == 2 ? '&#xe685;' : '&#xe762;'}}</text>
					</view>
					<view @tap="doRecharge" class="_btn_">立即充值</view>
				</view>
			</gui-popup>
		</view>
	</gui-page>
</template>
<script>
import simpleAddress from '@/node_modules/simple-address/simple-address2.vue';
var graceChecker = require("@/GraceUI5/js/checker.js");
var _this;
export default {
	data() {
		return {
			pageLoading: false,
			navList: [{id: 1, name: '话费充值'}, {id: 2, name: '电费充值'}],
			navIndex: 0,
			tel: '',
			showDelTel: false,
			gsd: '',
			mainHeight: 0,
			scrollHeight: 0,
			unitArr: [
				{title: '国家电网'}, {title: '南方电网'}
			],
			unitIndex: 0,
			cityPickerValueDefault: [0, 0, 1],
			labelArr: ['北京','市辖区','东城区'],
			defaultAddr: ['', '', ''],
			provinceCode: 0,
			cityCode: 0,
			countyCode: 0,
			province: '',
			city: '',
			county: '',
			addr: '',
			mobile: '',
			showDelMobile: false,
			ytypeArr: [
				{title: '身份证'}, {title: '银行卡'}, {title: '营业执照'}
			],
			ytypeIndex: -1,
			number: '',
			showDelNumber: false,
			priceList1: [
				{amount: 100, price: 96, percent: 0.96, canUse: true}, {amount: 200, price: 192, percent: 0.96, canUse: true}
			],
			priceList1Index: 0,
			isp: '',
			priceList2: [
				{amount: 100, price: 96, percent: 0.96, canUse: true},
				{amount: 200, price: 192, percent: 0.96, canUse: true},
				{amount: 300, price: 288, percent: 0.96, canUse: true}, 
				{amount: 400, price: 384, percent: 0.96, canUse: true},
				{amount: 500, price: 480, percent: 0.96, canUse: true}, 
				{amount: 800, price: 768, percent: 0.96, canUse: true},
				{amount: 1000, price: 960, percent: 0.96, canUse: true},
				{amount: 2000, price: 1920, percent: 0.96, canUse: true}
			],
			priceList2Index: 0,
			payType: 1,
			payTypeTxt: '微信',
			postData: null,
			productList: []
		}
	},
	onLoad: function(e){
		_this = this;
		_this.navIndex = Number(e.navIndex);
		_this.getProductList();
	},
	onShow: function(){
		
	},
	onReady() {
		uni.gJS.select('#swiper', (res)=>{
			_this.mainHeight = uni.gJS.system().windowHeight - res.top;
			_this.scrollHeight = _this.mainHeight - uni.upx2px(150);
		});
	},
	methods: {
		getProductList() {
			uni.gRequest.post(
				'swoft/api/yrapi/getProductList',
				{
					data: {}
				}, 
				(res) => {
					if(res.code == 0){
						_this.productList = res.data;
						_this.priceList2 = _this.productList['国网'];
					}else{
						_this.$refs.guiPage.openMessage('default',res.msg,true,1500);
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
		changePayType: function(e,opt){
			_this.payType = e;
			_this.payTypeTxt = opt;
			// _this.$refs.payWay.close();
		},
		selectedUnit(e) {
			_this.unitIndex = e;
		},
		cancelUnit(e) {
			// _this.unitIndex = -1;
		},
		selectedYtype(e) {
			_this.ytypeIndex = e;
		},
		cancelYtype(e) {
			// _this.ytypeIndex = -1;
		},
		openAddres() {
			let index = _this.$refs.simpleAddress.queryIndex([_this.labelArr[0], _this.labelArr[1], _this.labelArr[2]], 'label');
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
			_this.provinceCode = e.provinceCode+'0000';
			_this.cityCode = e.cityCode+'00';
			_this.countyCode = e.areaCode;
		},
		clearForm() {
			if(_this.navIndex == 0){
				_this.unitIndex = 0;
				_this.cityPickerValueDefault = [0, 0, 1];
				_this.labelArr = ['北京','市辖区','东城区'];
				_this.defaultAddr = ['', '', ''];
				_this.provinceCode = 0;
				_this.cityCode = 0;
				_this.countyCode = 0;
				_this.province = '';
				_this.city = '';
				_this.county = '';
				_this.addr = '';
				_this.mobile = '';
				_this.ytypeIndex = -1;
				_this.number = '';
				_this.showDelMobile = false;
				_this.showDelNumber = false;
				_this.priceList2Index = 0;
			}else{
				_this.tel = '';
				_this.gsd = '';
				_this.showDelTel = false;
				_this.priceList1Index = 0;
			}
		},
		navchange(e) {
			if(_this.navIndex != e){
				_this.navIndex = e;
				_this.clearForm();
			}
		},
		swiperChange(e) {
			_this.navIndex = e.detail.current;
			_this.clearForm();
		},
		oninputTel(e) {
			_this.tel = e.detail.value.replace(/(^\s*)|(\s*$)/g,'');
			if(_this.tel.length > 0){
				_this.showDelTel = true;
			}else{
				_this.showDelTel = false;
			}
			_this.priceList1[1].canUse = true;
			if(_this.tel.length == 11){
				_this.pageLoading = true;
				uni.gRequest.post(
					'swoft/api/yrapi/getPhoneGsd',
					{
						data: {
							mobile: _this.tel
						}
					}, 
					(res) => {
						if(res.code == 0){
							_this.gsd = res.data.data.prov+res.data.data.city+res.data.data.isp;
							_this.isp = res.data.data.isp;
							_this.priceList1 = _this.productList[res.data.data.isp];
							// if(res.data.data.isp == '电信'){
							// 	_this.priceList1[1].canUse = false;
							// }else{
							// 	_this.priceList1[1].canUse = true;
							// }
						}
					},
					(error) => {},
					(res) => {
						_this.pageLoading = false;
					},
					true,
					true
				);
			}else{
				_this.gsd = '';
			}
		},
		oninputMobile(e) {
			_this.mobile = e.detail.value.replace(/(^\s*)|(\s*$)/g,'');
			if(_this.mobile.length > 0){
				_this.showDelMobile = true;
			}else{
				_this.showDelMobile = false;
			}
		},
		oninputNumber(e) {
			_this.number = e.detail.value.replace(/(^\s*)|(\s*$)/g,'');
			if(_this.number.length > 0){
				_this.showDelNumber = true;
			}else{
				_this.showDelNumber = false;
			}
		},
		clearTel() {
			_this.tel = '';
			_this.showDelTel = false;
			_this.gsd = '';
			_this.priceList1[1].canUse = true;
		},
		clearMobile() {
			_this.mobile = '';
			_this.showDelMobile = false;
		},
		clearNumber() {
			_this.number = '';
			_this.showDelNumber = false;
		},
		changePrice1(e) {
			_this.priceList1Index = e;
		},
		changePrice2(e) {
			_this.priceList2Index = e;
		},
		recharge() {
			let postData = {};
			let rule = [];
			postData.type = _this.navIndex + 1;
			if(_this.navIndex == 0){
				postData.mobile = _this.tel;
				postData.amount = _this.priceList1[_this.priceList1Index].amount;
				postData.payMoney = _this.priceList1[_this.priceList1Index].price;
				postData.product_id = _this.priceList1[_this.priceList1Index].pid;
				postData.mValue = _this.priceList1[_this.priceList1Index].price - _this.priceList1[_this.priceList1Index].cost;
				postData.cost = _this.priceList1[_this.priceList1Index].cost;
				postData.gsd = _this.gsd;
				postData.isp = _this.isp;
				rule = [
					{name: "mobile", checkType: "notnull", checkRule: "", errorMsg: "请输入手机号"},
					{name: "mobile", checkType: "phoneno", checkRule: "", errorMsg: "手机号格式不正确"}
				];
			}else{
				postData.unit = _this.unitArr[_this.unitIndex].title;
				postData.mobile = _this.mobile;
				postData.amount = _this.priceList2[_this.priceList2Index].amount;
				postData.payMoney = _this.priceList2[_this.priceList2Index].price;
				postData.product_id = _this.priceList2[_this.priceList2Index].pid;
				postData.mValue = _this.priceList2[_this.priceList2Index].price - _this.priceList2[_this.priceList2Index].cost;
				postData.cost = _this.priceList2[_this.priceList2Index].cost;
				postData.area = _this.province;
				postData.ytype = _this.ytypeIndex+1;
				postData.id_card_no = _this.number;
				postData.city = _this.city;
				rule = [
					{name: "area", checkType: "notnull", checkRule: "", errorMsg: "请选择所属地区"},
					{name: "mobile", checkType: "notnull", checkRule: "", errorMsg: "请输入缴费户号"}
				];
				if(postData.unit == '南方电网'){
					rule.push(
						{name: "ytype", checkType: "notSame", checkRule: "", errorMsg: "请选择证件"}
					);
					rule.push(
						{name: "id_card_no", checkType: "notnull", checkRule: "", errorMsg: "请输入用户信息"}
					);
					rule.push(
						{name: "id_card_no", checkType: "string", checkRule: "6,6", errorMsg: "用户信息长度为6位"}
					);
				}
			}
			let checkRes = graceChecker.check(postData, rule);
			if(!checkRes){
				_this.$refs.guiPage.openMessage('default',graceChecker.error,true,1500);
				return false;
			}
			_this.postData = postData;
			_this.$refs.payWay.open();
		},
		doRecharge() {
			//#ifdef H5
			_this.postData.type = 'H5';
			if(_this.payType == 1){
				_this.postData.return_url = 'https://useful.youyong.org.cn/H5/#/pages/zengzhi/yrapi/record';
			}else{
				_this.postData.return_url = '';
			}
			//#endif
			_this.postData.payType = _this.payType;
			_this.postData.uid = uni.getStorageSync('userInfo').id;
			_this.$refs.payWay.close();
			_this.pageLoading = true;
			uni.gRequest.post(
				'swoft/api/yrapi/postOrder',
				{
					data: _this.postData
				}, 
				(res) => {
					if(res.code == 0){
						// 调起APP支付
						//#ifdef APP-PLUS
						let provider = '';
						let orderInfo = {};
						if(_this.payType == 1){
							provider = 'wxpay';
							orderInfo = {
								"appid": res.data.appId,
								"noncestr": res.data.nonceStr,
								"package": res.data.package,
								"partnerid": res.data.partnerid,
								"prepayid": res.data.prepayid,
								"timestamp": res.data.timeStamp,
								"sign": res.data.paySign
							};
						}else{
							provider = 'alipay';
							orderInfo = res.data;
						}
						uni.requestPayment({
							provider: provider,
							orderInfo: orderInfo,
							success: function (res) {
								_this.pageLoading = false;
								if(res.errMsg == 'requestPayment:ok'){
									_this.$refs.guiPage.openMessage('success','支付成功',true,1500);
								}else{
									_this.$refs.guiPage.openMessage('default',res.errMsg,true,1500);
								}
								setTimeout(function(){
									uni.navigateTo({
										url: '/pages/zengzhi/yrapi/record'
									})
								},1500);
							},
							fail: function (err) {
								_this.pageLoading = false;
								if(err.errMsg == 'requestPayment:fail cancel'){
									_this.$refs.guiPage.openMessage('default','您已取消支付',true,1500);
								}else{
									_this.$refs.guiPage.openMessage('default','支付失败',true,1500);
								}
							}
						});
						//#endif
						//#ifdef H5
						window.location.href = res.data.url;
						//#endif
					}else{
						_this.pageLoading = false;
						_this.$refs.guiPage.openMessage('default',res.msg,true,1500);
					}
				},
				(error) => {
					_this.pageLoading = false;
					_this.$refs.guiPage.openMessage('default','请求错误',true,1500);
				},
				(res) => {},
				true,
				true
			);
		}
	},
	components: {
		simpleAddress
	}
}
</script>
<style>
	page{background-color:#F8F8F8;}
	.msgBox{width:560rpx;height:70rpx;border-radius:35rpx;color:#FFFFFF;font-size:30rpx;padding:0 30rpx;margin:20rpx auto;}
	.inputBox{width:630rpx;height:120rpx;line-height:120rpx;margin:0 auto;font-size:60rpx;}
	.inputBox_{height:120rpx;line-height:120rpx;margin:0 auto;font-size:60rpx;}
	.w450{width:450rpx;}
	.priceBox{width:300rpx;border-radius:30rpx;border:thin solid #D1D1D1;overflow:hidden;}
	.priceBoxlt{width:100rpx;height:60rpx;line-height:60rpx;border-radius:0 0 30rpx 0;background-color:#FF4F00;text-align:center;font-size:24rpx;color:#FFFFFF;}
	.sanjiao{position:absolute;top:0;right:0;height:90rpx;width:90rpx;background-color:#FF4F00;clip-path:polygon(0 0, 100% 100%,100% 0);}
	.sanjiao-text{font-size:24rpx;position:absolute;top:0;right:0;z-index:4;color:#FFFFFF;transform:rotate(45deg);text-align:center;transform-origin:15% 50%;}
	.priceBoxSed{border-color:#FF4F00;background-color:rgba(255,79,0,0.2);color:#FF4F00!important;}
	.btn_{height:90rpx;line-height:90rpx;text-align:center;border-radius:45rpx;background-color:#FF4F00;color:#FFFFFF;font-size:30rpx;margin:0 30rpx 0 90rpx;}
	._btn_{height:90rpx;line-height:90rpx;text-align:center;border-radius:45rpx;background-color:#FF4F00;color:#FFFFFF;font-size:30rpx;margin:30rpx auto 0 auto;width:300rpx;}
	.dot{width:40rpx;height:40rpx;border-radius:50%;background-color:rgba(255,79,0,0.2);display:flex;align-items:center;justify-content:center;}
	.dot_{width:30rpx;height:30rpx;border-radius:50%;background-color:#FF4F00;}
	.payWayBox{width:542rpx;background:url(../../../static/images/zheng/bg04.png) no-repeat;background-size:100% 100%;margin:0 auto;}
</style>