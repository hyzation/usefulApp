<template>
	<gui-page :isLoading="pageLoading" ref='guiPage' :customHeader="true">
		<view slot="gHeader">
			<view class="gui-flex gui-nowrap gui-rows gui-align-items-center">
				<view @tap="navBack" class="gui-header-leader-btns" hover-class="gui-tap">
					<text class="gui-icons">&#xe600;</text>
				</view>
				<view class="gui-flex1 gui-text-center">
					<text class="f36 gui-ellipsis">合伙人分成</text>
				</view>
			</view>
		</view>
		<view slot="gBody">
			<view class="bgffc2a6-ffdfd1 gui-border-radius card mt20 mlr20 mb10">
				<view class="lh100 gui-flex gui-align-items-center gui-space-between"><text class="f34 plr20 ml20">合伙人分成</text> <text class="cFF4F00 f50 plr20 fb">{{ FC_val }}%</text></view>
			</view>
			<view>
				<canvas canvas-id="canvasLineA" id="canvasLineA" class="charts" @touchmove="moveLineA" @touchend="moveLineA"></canvas>
			</view>
			<view class="w710 mlr20 mt30 pb30 gui-relative borderBottom">
				<view class="gui-flex gui-align-items-center gui-space-between">
					<view class=""><text class="f34 fb">分成明细</text><text class="f24 c99 ml20">展示最近1个月</text></view>
				</view>
			</view>
			<scroll-view id="list" :scroll-y="true" :style="'height:'+mainHeight+'px;'">
				<view class="w710 mlr20">
					<view v-for="(item,index) in productList" :key="index" class="list-item gui-flex gui-column gui-justify-content-center gui-relative borderBottom">
						<view class="gui-flex gui-align-items-center gui-space-between">
							<view class="">
								<text class="f22" style="display: block;width: 100%;">浮动记录</text>
								<text class="f22">{{item.show_time}}</text>
							</view>
							<view class="gui-text-right">
								<view class="f24 mb10">{{ item.show_percent }}%</view>
							</view>
						</view>
					</view>
				</view>
				<gui-empty v-if="isEmpty">
					<view slot="img" class="gui-flex gui-rows gui-justify-content-center">
						<image class="gui-empty-img" src="../../../static/images/empty.png"></image>
					</view>
				</gui-empty>
				<gui-loadmore ref="loadmorecom"></gui-loadmore>
			</scroll-view>
		</view>
	</gui-page>
</template>
<script>
var _this;
var page = 1;
var totalPage = 0;
import uCharts from '../other/u-charts.js'; //引入js文件
var canvaLineA = null; //uCharts实例
export default {
	data() { 
		return {
			pageLoading: false,
			apiLoadingStatus: false,
			loadMoreTimer: null,
			isEmpty: false,
			mainHeight: 0,
			userInfo: {},
			productList: [],
			FC_val: 0,
			cWidth: '',
			cHeight: '', //画布的宽高
			chartsdata: { //数据
				categories: [],
				series: []
			}
		}
	},
	onLoad() {
		this.cWidth = uni.upx2px(750);
		this.cHeight = uni.upx2px(500); //设置宽高
	},
	onShow() {
		_this = this
		_this.userInfo = uni.getStorageSync('userInfo');
		_this.getdata()
	},
	onReady() {
		setTimeout(function(){
			uni.gJS.select('#list', (res)=>{
				_this.mainHeight = uni.gJS.system().windowHeight - res.top;
			});
		},500);
	},
	methods:{
		getdata() {
			_this.chartsdata.categories = []
			_this.chartsdata.series = []
			uni.gRequest.post(
				'swoft/api/shop/getPartnerList',
				{
					data: {
						
					}
				}, 
				(res) => {
					if(res.code == 100000){
						_this.productList = res.data;
						_this.FC_val = res.data[0].show_percent
						let info = {
							name: "合伙人分成",
							data: []
						}
						res.data.forEach((item)=>{
							_this.chartsdata.categories.push(item.show_time)
							info.data.push(item.show_percent)
						})
						_this.chartsdata.series.push(info)

						_this.showLineA('canvasLineA', _this.chartsdata)
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
		navBack(){
			uni.gJS.back();
		},
		showLineA(canvasId, chartData) {
			canvaLineA = new uCharts({ //这些配置项的意思看这：https://www.kancloud.cn/qiun/ucharts/1172125
				$this: _this, //指针
				canvasId: canvasId, //id
				type: 'line', //类型
				colors: ['#facc14', '#f04864', '#90ed7d'], //每一条的颜色
				fontSize: 12, //字体大小
				fontColor: '#fff',
				padding: [15, 15, 0, 15], //空白区域值
				legend: { //图例相关配置
					show: true,
					padding: 5,
					lineHeight: 11,
					margin: 0,
				},
				dataLabel: false, //显示数据标签内容值
				categories: chartData.categories, //数据类别
				series: chartData.series, //数据列表
				xAxis: { //X轴配置
					disabled: true,
					gridColor: '#CCCCCC', //X轴网格颜色
					gridType: 'dash', //X轴网格线型 'solid'为实线、'dash'为虚线`
					dashLength: 8, //X轴网格为虚线时，单段虚线长度
				},
				yAxis: { //y轴配置
					gridType: 'dash',
					gridColor: '#CCCCCC',
					dashLength: 8,
				},
				width: _this.cWidth, //canvas宽度，单位为px
				height: _this.cHeight, //canvas高度，单位为px
				extra: { //扩展配置
					line: {
						type: 'curve' //曲线  curve曲线，straight直线
					}
				}
			});
		},
		moveLineA(e) {
			canvaLineA.showToolTip(e, { //详情框
				format: function(item, category) {
					return category + ' ' + item.name + ':' + item.data
				}
			});
		},
		
	}
}
</script>
<style>
	@import url('@/static/css/li.css');
	.gui-header-leader-btns{width:68rpx; line-height:60rpx; font-size:50rpx; text-align:center; margin-left: 10rpx;}
	.roletext{position: absolute;bottom:70rpx;left:132rpx ;z-index: 99999;}
	.w400{width: 400rpx;}
	.h720{height:720rpx;}
	.w710{width: 710rpx;}
	.cFD2C55{color: #FD2C55;}
	.list-item{padding:26rpx 0 30rpx 0;}
	.plr40{padding-left: 40rpx;padding-right: 40rpx;}
	.pt40{padding-top: 40rpx;}
	.pb40{padding-bottom: 40rpx;}
	.mt46{margin-top:46rpx;}
	.mt50{margin-top:50rpx;}
	.f46{font-size: 46rpx;}
	.mt40{margin-top:40rpx;}
	.f50{font-size: 50rpx;}
	.f34{font-size: 34rpx;}
	.f30{font-size: 30rpx;}
	.lh100{line-height: 110rpx;}
	.h210{height: 210rpx;}
	.bgffc2a6-ffdfd1{background: linear-gradient(-90deg,#ffc2a6 0%, #ffdfd1 100%);}
	.cFF4F00{color:#FF4F00;}
	.qiandaoModal{background: url(@/static/images/setting/gzkuang.png) no-repeat left top; background-size: 100% auto; padding: 280rpx 100rpx 60rpx 100rpx;height:730rpx;}
	.img52{ width: 52rpx; height: 52rpx; margin: 0 auto;}
	.mw500{max-width:500rpx;}
	.charts {
		width: 95%;
		height: 500upx;
		background-color: #FFFFFF;
	}
</style>
