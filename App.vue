<script>
export default {
	globalData: {
		tempFilePath: ''
	},
	onLaunch: function() {
		// #ifdef APP-PLUS
		plus.screen.lockOrientation('portrait-primary'); //锁定屏幕
		const dom = weex.requireModule('dom');
		dom.addRule('fontFace', { 
			'fontFamily': "graceIconfont",
			'src': "url('/static/grace.ttf')"
		});
		// #endif
	},
	onShow: function() {},
	onHide: function() {},
	methods: {
		readMsgNum(e) {
			uni.gRequest.post(
				'swoft/api/user/readMsgNum',
				{
					data: {
						uid: uni.getStorageSync('userInfo').id,
						type: e
					}
				}, 
				(res) => {},
				(error) => {},
				(res) => {},
				true,
				true
			);
		}
	}
}
</script>
<style>
/* 加载框架核心样式 */
@import "./GraceUI5/css/graceUI.css";
/* 加载主题样式 */
@import "./GraceUI5/skin/black.css";
/* 加载图标字体 - 条件编译模式 */
/* #ifdef APP-PLUS-NVUE */
.gui-icons{font-family:graceIconfont;}
/* #endif */
@font-face{
	font-family:'MEDIUM';
	src: url('./static/font/PINGFANG_MEDIUM.TTF');
}
@font-face{
	font-family:'BOLD';
	src: url('./static/font/PINGFANG_BOLD.TTF');
}
@font-face{
	font-family:'HEAVY';
	src: url('./static/font/PINGFANG_HEAVY.TTF');
}
.gui-page-loading-color{background-color:#FF4F00;}
.gui-page-loading-bg{background-color:rgba(255,255,255,0.5);}
.fullPage{height:100vh;}
.wp15{width:15%;}
.wp20{width:20%;}
.wp25{width:25%;}
.wp60{width:60%;}
.wp80{width:80%;}
.wp100{width:100%;}
.hp100{height:100%;}
.w200{width:200rpx;}
.w620{width:620rpx;}
.w630{width:630rpx;}
.w650{width:650rpx;}
.fm{font-family:MEDIUM;}
.fb{font-family:BOLD;}
.fh{font-family:HEAVY;}
.f20{font-size:20rpx;}
.f22{font-size:22rpx;}
.f24{font-size:24rpx;}
.f26{font-size:26rpx;}
.f28{font-size:28rpx;}
.f30{font-size:30rpx;}
.f32{font-size:32rpx;}
.f33{font-size:33rpx;}
.f34{font-size:34rpx;}
.f36{font-size:36rpx;}
.f40{font-size:40rpx;}
.f45{font-size:45rpx;}
.f60{font-size:60rpx;}
.f70{font-size:70rpx;}
.lh1{line-height:1;}
.lh20{line-height:20rpx;}
.lh28{line-height:28rpx;}
.lh34{line-height:34rpx;}
.lh40{line-height:40rpx;}
.lh45{line-height:45rpx;}
.lh60{line-height:60rpx;}
.lh90{line-height:90rpx;}
.p20{padding:20rpx;}
.p30{padding:30rpx;}
.pl10{padding-left:10rpx;}
.pl20{padding-left:20rpx;}
.pl30{padding-left:30rpx;}
.plr10{padding:0 10rpx;}
.plr20{padding:0 20rpx;}
.plr30{padding:0 30rpx;}
.plr40{padding:0 40rpx;}
.plr50{padding:0 50rpx;}
.pr10{padding-right:10rpx;}
.pr20{padding-right:20rpx;}
.pr30{padding-right:30rpx;}
.ptb30{padding:30rpx 0;}
.plt30tb40{padding:40rpx 30rpx;}
.pt20{padding-top:20rpx;}
.pt30{padding-top:30rpx;}
.pt60{padding-top:60rpx;}
.pb20{padding-bottom:20rpx;}
.pb30{padding-bottom:30rpx;}
.pb50{padding-bottom:50rpx;}
.ptb20{padding:20rpx 0;}
.m20{margin:20rpx;}
.m30{margin:30rpx;}
.ml10{margin-left:10rpx;}
.ml20{margin-left:20rpx;}
.ml30{margin-left:30rpx;}
.ml50{margin-left:50rpx;}
.ml80{margin-left:80rpx;}
.mr10{margin-right:10rpx;}
.mr20{margin-right:20rpx;}
.mr30{margin-right:30rpx;}
.mr40{margin-right:40rpx;}
.mr80{margin-right:80rpx;}
.mlr20{margin-left:20rpx;margin-right:20rpx;}
.mlr40{margin-left:40rpx;margin-right:40rpx;}
.mt6{margin-top:6rpx;}
.mt10{margin-top:10rpx;}
.mt16{margin-top:16rpx;}
.mt20{margin-top:20rpx;}
.mt26{margin-top:26rpx;}
.mt30{margin-top:30rpx;}
.mt40{margin-top:40rpx;}
.mt50{margin-top:50rpx;}
.mt60{margin-top:60rpx;}
.mt80{margin-top:80rpx;}
.mt90{margin-top:90rpx;}
.mt140{margin-top:140rpx;}
.mAuto{margin:0 auto;}
.mtb30Auto{margin:30rpx auto;}
.mtb20Auto{margin:20rpx auto;}
.mb20{margin-bottom:20rpx;}
.mb30{margin-bottom:30rpx;}
.mb40{margin-bottom:40rpx;}
.h20{height:20rpx;}
.h30{height:30rpx;}
.h60{height:60rpx;}
.h70{height:70rpx;}
.h90{height:90rpx;}
.h120{height:120rpx;}
.h150{height:150rpx;}
.c999999{color:#666666;}
.cFFFFFF{color:#FFFFFF;}
.c000000{color:#000000;}
.c181818{color:#181818;}
.cFF4F00{color:#FF4F00;}
.c6A4714{color:#6A4714;}
.c404040{color:#404040;}
.cFFA075{color:#FFA075;}
.cDC261F{color:#DC261F;}
.c231815{color:#231815;}
.cD13101{color:#D13101;}
.c313131{color:#313131;}
.c333333{color:#333333;}
.c006220{color:#006220;}
.c454545{color:#454545;}
.c666666{color:#666666;}
.cF7142C{color:#F7142C;}
.cD1D1D1{color:#D1D1D1;}
.c5F0900{color:#5F0900;}
.c8C4C3B{color:#8C4C3B;}
.cDD281F{color:#DD281F;}
.cFF5331{color:#FF5331;}
.bgFFFFFF{background-color:#FFFFFF;}
.bgFF4F00{background-color:#FF4F00;}
.bgFFDF91{background-color:#FFDF91;}
.bg999999{background-color:#999999!important;}
.bgF5F5F9{background-color:#F5F5F9;}
.bgF5F5F5{background-color:#F5F5F5;}
.bg006220{background-color:#006220;}
.bgFFA075{background-color:#FFA075;}
.bg6A4714{background-color:#6A4714;}
.bgD1D1D1{background-color:#D1D1D1!important;;}
.bgF7142C{background-color:#F7142C;}
.br10{border-radius:10rpx;}
.br20{border-radius:20rpx;}
.br30{border-radius:30rpx;}
.br45{border-radius:45rpx;}
.borderTop:after{content:" ";position:absolute;top:0;left:0;right:0;border-top:1px solid #E7E7E7;-webkit-transform-origin: 0 0;transform-origin: 0 0;-webkit-transform: scaleY(.5);transform: scaleY(.5);}
.borderBottom:before{content:" ";position:absolute;bottom:0;left:0;right:0;border-bottom:1px solid #E7E7E7;-webkit-transform-origin: 0 0;transform-origin: 0 0;-webkit-transform: scaleY(.5);transform: scaleY(.5);}
.borderLeft:after{content:" ";position:absolute;top:0;left:0;bottom:0;border-left:1px solid #E7E7E7;-webkit-transform-origin: 0 0;transform-origin: 0 0;-webkit-transform: scaleX(.5);transform: scaleX(.5);}
.borderLeft_:after{content:" ";position:absolute;top:0;left:0;bottom:0;border-left:1px solid #FF4F00;-webkit-transform-origin: 0 0;transform-origin: 0 0;-webkit-transform: scaleX(.5);transform: scaleX(.5);}

button::after{border:none;}
.overHidden{overflow:hidden;}
.popTop{width:600rpx;height:340rpx;background:url(static/images/zheng/bg01.png) no-repeat;background-size:100% 100%;}
.popTopBox{width:600rpx;height:340rpx;background:url(static/images/zheng/bg02.png) no-repeat;background-size:100% 100%;}
.popTopBoxHead{width:160rpx;height:160rpx;border-radius:50%;margin-top:14rpx;overflow:hidden;}
.popTopBoxHeadImg_{width:80rpx;height:80rpx;}
.line2{text-overflow:-o-ellipsis-lastline;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;line-clamp:2;-webkit-box-orient:vertical;}
.modal-btns{line-height:100rpx;font-size:30rpx;text-align:center;width:250rpx;}
.opacity3{opacity:0.3;}
.hBtn{width:240rpx;height:80rpx;line-height:80rpx;text-align:center;border-radius:40rpx;margin:0 10rpx;}
.xztcScroll{width:660rpx;height:1000rpx;margin-top:30rpx;border-radius:20rpx;overflow:hidden;}
.xztc{width:660rpx;height:880rpx;}
.xztc image{width:100%;height:100%;border-radius:20rpx;}
.wscnph:nth-child(n + 2){margin-top:-5px!important;}
.redDot{position:absolute;top:-10rpx;right:15px;z-index:999;}
.pBtn{width:140rpx;text-align:center;height:60rpx;line-height:60rpx;border-radius:30rpx;font-size:26rpx;margin-left:30rpx;padding:0!important;border:thin solid #FF4F00;color:#FF4F00;}
.opacity0{opacity:0;}
</style>
