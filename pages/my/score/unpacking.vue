<template>
	<gui-page :isLoading="pageLoading" ref='guiPage' :customHeader="true" :isHeaderSized="false" statusBarStyle="background:rgba(0,0,0,0);" headerStyle="background:rgba(0,0,0,0);">
		<view slot="gHeader">
			<view class="gui-flex gui-nowrap gui-rows gui-align-items-center">
				<view @tap="navBack()" class="gui-header-leader-btns" hover-class="gui-tap">
					<text class="gui-icons cFFFFFF">&#xe600;</text>
				</view>
			</view>
		</view>
		<view slot="gBody">
			<view class="gui-flex gui-align-items-center gui-justify-content-center mt140">
				<gui-image src="../../../static/images/score/9.png" :width="650" :timer="0"></gui-image>
			</view>
			<view class="mainBox">
				<view class="mainBoxTitle fb">翻牌抽大奖</view>
				<view class="cFF5331 gui-text-center f24">您有{{!isClick ? 1 : 0}}次抽奖机会</view>
				<view class="gui-flex gui-wrap gui-justify-content-center mt20">
					<block v-for="(item, index) in 6" :key="index">
						<view :class="'animate ' + animations[index].animation">
							<view @tap="chooseCard(index)" :class="animations[index].isClick ? (index == scoreArrIndex ? 'mainBoxLi1' : 'mainBoxLi2') : 'mainBoxLi1'" class="mainBoxLi gui-flex gui-align-items-center gui-justify-content-center">
								<view v-if="!animations[index].isClick">
									<gui-image src="../../../static/images/score/8.png" :width="90" :height="90" :timer="0" class="mAuto"></gui-image>
									<view class="mainBoxLiBtn mt10">翻我</view>
								</view>
								<view v-else>
									<block v-if="index == scoreArrIndex">
										<gui-image src="../../../static/images/score/10.png" :width="50" :height="50" :timer="0" class="mAuto"></gui-image>
										<view class="f28 cTxt gui-text-center">恭喜您获得</view>
										<view class="f28 cTxt gui-text-center">{{scoreArr[index]}}积分</view>
									</block>
									<block v-else>
										<gui-image src="../../../static/images/score/1.png" :width="50" :height="50" :timer="0" class="mAuto"></gui-image>
										<view class="f28 c999999 gui-text-center">{{scoreArr[index]}}积分</view>
									</block>
								</view>
							</view>
						</view>
					</block>
				</view>
			</view>
			<view class="sureBtn fb" v-if="isClick" @tap="goBack">确 认 领 取</view>
		</view>
	</gui-page>
</template>
<script>
var _this;
export default {
	data() { 
		return {
			pageLoading: false,
			scoreArr: [],
			scoreArrIndex: -1,
			isClick: false,
			animations: [
				{isClick: false, animation: ''},
				{isClick: false, animation: ''},
				{isClick: false, animation: ''},
				{isClick: false, animation: ''},
				{isClick: false, animation: ''},
				{isClick: false, animation: ''}
			],
			flgOrderId: 0
		}
	},
	onLoad(e) {
		_this = this;
		_this.flgOrderId = e.flgOrderId;
		_this.getScoreConfig();
	},
	onShow() {

	},
	onReady() {

	},
	methods:{
		getScoreConfig() {
			_this.pageLoading = true;
			uni.gRequest.post(
				'swoft/api/fuligou/getScoreConfig',
				{
					data: {}
				},
				(res) => {
					if(res.code == 0){
						let arr = [];
						for(let i=1;i<=res.data.score1;i++){
							arr.push(i);
						}
						_this.scoreArr = _this.getArrayItems(arr,6);
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
		goBack() {
			uni.navigateBack({
				delta: 1
			});
		},
		chooseCard(e) {
			_this.pageLoading = true;
			uni.gRequest.post(
				'swoft/api/fuligou/todayIsSign',
				{
					data: {
						flgOrderId: _this.flgOrderId
					}
				}, 
				(res) => {
					if(res.code == 0){
						if(_this.scoreArr[e] > res.data){
							_this.scoreArr[e] = res.data;
						}
						uni.gRequest.post(
							'swoft/api/fuligou/unpacking',
							{
								data: {
									flgOrderId: _this.flgOrderId,
									uid: uni.getStorageSync('userInfo').id,
									score: _this.scoreArr[e]
								}
							},
							(res) => {
								if(res.code == 0){
									if(_this.isClick){
										return false;
									}
									_this.animations[Number(e)].animation = 'flipInY';
									_this.animations[Number(e)].isClick = true;
									_this.scoreArrIndex = e;
									_this.isClick = true;
									setTimeout(function(){
										_this.animations.forEach((item, index)=>{
											if(index != e){
												item.animation = 'flipInY';
												item.isClick = true;
											}
										});
									},1000);
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
						_this.$refs.guiPage.openMessage('default',res.msg,true,1500);
						_this.pageLoading = false;
					}
				},
				(error) => {
					_this.$refs.guiPage.openMessage('default','请求错误',true,1500);
					_this.pageLoading = false;
				},
				(res) => {
					
				},
				true,
				true
			);
		},
		getArrayItems(arr,num) {
		    let temp_array = [];
		    for(let index in arr){
		        temp_array.push(arr[index]);
		    }
		    let return_array = [];
		    for(let i=0;i<num;i++){
		        if(temp_array.length > 0){
		            let arrIndex = Math.floor(Math.random()*temp_array.length);
		            return_array[i] = temp_array[arrIndex];
		            temp_array.splice(arrIndex,1);
		        }else{
		            break;
		        }
		    }
		    return return_array;
		},
		navBack() {
			uni.gJS.back();
		},
	}
}
</script>
<style>
	@import "@/GraceUI5/css/animate.css";
	.animate{animation-duration: 1.5s; animation-timing-function:linear;}
	page{background:#E2152D url(../../../static/images/score/cjbg.png) no-repeat;background-size:cover;}
	.gui-header-leader-btns{width:68rpx;line-height:60rpx;font-size:50rpx;text-align:center;margin-left:10rpx;}
	.mainBox{width:750rpx;height:900rpx;background:url(../../../static/images/score/3.png) no-repeat;background-size:cover;margin-top:280rpx;overflow:hidden;}
	.mainBoxTitle{margin:14rpx auto 0 auto;width:440rpx;height:124rpx;line-height:114rpx;background:url(../../../static/images/score/4.png) no-repeat;background-size:100% 100%;text-align:center;color:#FFFFFF;font-size:48rpx;}
	.sureBtn{margin:-172rpx auto 0 auto;width:454rpx;height:116rpx;line-height:116rpx;text-align:center;color:#FFFFFF;font-size:36rpx;background:url(../../../static/images/score/2.png) no-repeat;background-size:100% 100%;}
	.mainBoxLi{width:220rpx;height:252rpx;}
	.mainBoxLi1{background:url(../../../static/images/score/5.png) no-repeat;background-size:100% 100%;}
	.mainBoxLi2{background:url(../../../static/images/score/6.png) no-repeat;background-size:100% 100%;}
	.mainBoxLiBtn{width:136rpx;height:56rpx;line-height:46rpx;text-align:center;color:#FF5331;font-size:24rpx;background:url(../../../static/images/score/7.png) no-repeat;background-size:100% 100%;}
	.mAuto{margin:0 auto;}
	.cTxt{color:#FFF5F5;text-shadow:0 1px 1px #FFA10F;}
</style>
