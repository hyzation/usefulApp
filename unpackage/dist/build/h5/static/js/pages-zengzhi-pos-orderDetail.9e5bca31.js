(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-zengzhi-pos-orderDetail"],{"0364":function(t,a,i){"use strict";i("7a82"),Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0,i("a9e3");var e={name:"gui-image",props:{src:{type:String,default:""},mode:{type:String,default:"widthFix"},width:{type:Number,default:300},height:{type:Number,default:0},timer:{type:Number,default:200},borderRadius:{type:String,default:"0rpx"}},data:function(){return{isLoading:!0,imgHeight:180,opacity:0,animate:!1,failed:!1}},methods:{imgLoad:function(t){var a=this,i=t.detail.width/t.detail.height;this.imgHeight=this.width/i,this.animate=!0,setTimeout((function(){a.isLoading=!1,a.opacity=1}),this.timer)},error:function(){this.isLoading=!1,this.failed=!0}}};a.default=e},1016:function(t,a,i){"use strict";i.d(a,"b",(function(){return d})),i.d(a,"c",(function(){return n})),i.d(a,"a",(function(){return e}));var e={guiPage:i("1d79").default,guiImage:i("e1fa").default,guiModal:i("e24b").default},d=function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("gui-page",{ref:"guiPage",staticClass:"bg-F8F8F8",attrs:{isLoading:t.pageLoading,customHeader:!1}},[i("v-uni-view",{staticClass:"fm",attrs:{slot:"gBody"},slot:"gBody"},[t.data?i("v-uni-view",{staticClass:"padding_30"},[i("v-uni-view",{staticClass:"main gui-flex gui-space-between gui-align-items-center"},[i("gui-image",{attrs:{timer:0,src:"../../../static/images/address.png",width:30,height:41}}),i("v-uni-view",{staticClass:"addressInfo"},[i("v-uni-view",{staticClass:"addressInfou gui-flex gui-align-items-center"},[i("v-uni-text",{staticClass:"addressInfoul"},[t._v(t._s(t.data.name))]),i("v-uni-text",{staticClass:"addressInfour"},[t._v(t._s(t.data.tel))])],1),i("v-uni-view",{staticClass:"addressInfob line2"},[t._v(t._s(t.data.province)+t._s(t.data.city)+t._s(t.data.county)+t._s(t.data.address))])],1)],1),i("v-uni-view",{staticClass:"bg-FFFFFF border-r20 pl30 pr30 pb30"},[0==t.data.status?i("v-uni-view",{staticClass:"fontsize24 pt20 c999999"},[t._v("已取消")]):t._e(),1==t.data.status?i("v-uni-view",{staticClass:"fontsize24 pt20 cFF4F00"},[t._v("待付款")]):t._e(),2==t.data.status?i("v-uni-view",{staticClass:"fontsize24 pt20 cFF4F00"},[t._v("待发货")]):t._e(),3==t.data.status?i("v-uni-view",{staticClass:"fontsize24 pt20 cFF4F00"},[t._v("待收货")]):t._e(),4==t.data.status?i("v-uni-view",{staticClass:"fontsize24 pt20 cFF4F00"},[t._v("已完成")]):t._e(),t.data.child?i("v-uni-view",{staticClass:"pb30 pt20 gui-flex gui-space-between gui-align-items-center gui-relative borderBottom"},[i("v-uni-view",{staticClass:"view4 border-r10"},[i("v-uni-image",{attrs:{src:t.data.child.coverPath+"?imageslim",mode:"aspectFill"}})],1),i("v-uni-view",{staticClass:"view5"},[i("v-uni-view",{staticClass:"gui-ellipsis fontsize28"},[t._v(t._s(t.data.child.title))]),i("v-uni-view",{staticClass:"fontsize22 color-999999 margin-t20 gui-ellipsis"},[t._v(t._s(t.data.child.desc))]),i("v-uni-view",{staticClass:"color-999999 fontsize24 gui-flex gui-align-items-end gui-space-between margin-t20"},[i("v-uni-text",{staticClass:"cFF4F00 fontsize30"},[t._v("￥"+t._s((Number(t.data.totalPrice)/t.data.num).toFixed(2)))]),i("v-uni-text",{staticClass:"fontsize22 color-999999"},[t._v("x"+t._s(t.data.num))])],1)],1)],1):t._e(),i("v-uni-view",[i("v-uni-view",{staticClass:"fontsize28 padding_t20 gui-flex gui-align-items-center gui-space-between"},[i("v-uni-text",[t._v("订单编号："+t._s(t.data.orderNum))]),i("v-uni-text",{staticClass:"cFF4F00 f24",on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.copy(t.data.orderNum)}}},[t._v("复制")])],1),i("v-uni-view",{staticClass:"fontsize28 padding_t20"},[t._v("下单时间："+t._s(t.data.created_at))]),"1970-01-01 08:00:00"!=t.data.sendTime?i("v-uni-view",{staticClass:"fontsize28 padding_t20"},[t._v("发货时间："+t._s(t.data.sendTime))]):t._e(),"1970-01-01 08:00:00"!=t.data.sendTime?i("v-uni-view",{staticClass:"fontsize28 padding_t20 gui-flex gui-align-items-center gui-space-between"},[i("v-uni-text",{staticStyle:{"max-width":"550rpx"}},[t._v("物流信息："+t._s(t.data.ex_name)+" "+t._s(t.data.expressNo))]),i("v-uni-text",{staticClass:"cFF4F00 f24",on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.copy(t.data.expressNo)}}},[t._v("复制")])],1):t._e(),"1970-01-01 08:00:00"!=t.data.getTime?i("v-uni-view",{staticClass:"fontsize28 padding_t20"},[t._v("收货时间："+t._s(t.data.getTime))]):t._e(),i("v-uni-view",{staticClass:"fontsize24 padding_t20 gui-flex gui-align-items-center gui-justify-content-start"},[i("gui-image",{staticClass:"mr10",attrs:{src:"../../../static/images/zheng/pay"+t.data.payType+".png",timer:0,width:26,height:26}}),1==t.data.payType?i("v-uni-text",[t._v("微信支付")]):t._e(),2==t.data.payType?i("v-uni-text",[t._v("支付宝支付")]):t._e()],1)],1)],1),i("v-uni-view",{staticClass:"bg-FFFFFF padding_30 margin-t30 border-r20"},[i("v-uni-view",[i("v-uni-text",{staticClass:"fontsize28"},[t._v("商品总额")]),i("v-uni-text",{staticClass:"cFF4F00 float-r fontsize26"},[t._v("￥"+t._s(t.data.totalPrice))])],1),i("v-uni-view",{staticClass:"margin-t30"},[i("v-uni-text",{staticClass:"fontsize28"},[t._v("运费")]),i("v-uni-text",{staticClass:"cFF4F00 float-r fontsize26"},[t._v("到付")])],1),t.data.payMoney>0&&t.data.status>1?i("v-uni-view",{staticClass:"margin-t30"},[i("v-uni-text",{staticClass:"fontsize28"},[t._v("已支付")]),i("v-uni-text",{staticClass:"cFF4F00 float-r fontsize26"},[t._v("￥"+t._s(t.data.payMoney))])],1):t._e(),t.data.realPrice>0&&1==t.data.status?i("v-uni-view",{staticClass:"text-right fontsize24 padding_t30"},[i("v-uni-text",[t._v("需付款：")]),i("v-uni-text",{staticClass:"cFF4F00"},[t._v("￥"+t._s(t.data.totalPrice))])],1):t._e()],1)],1):t._e(),i("v-uni-view",{staticClass:"h120"}),i("v-uni-view",{staticClass:"padding30 gui-fixed-lb gui-flex gui-justify-content-end gui-align-items-center"},[0==t.data.status?[i("v-uni-view",{staticClass:"orderBtn3",on:{click:function(a){a.stopPropagation(),arguments[0]=a=t.$handleEvent(a),t.openModel(t.data.id,-1,1)}}},[t._v("删除订单")])]:t._e(),1==t.data.status?[i("v-uni-view",{staticClass:"orderBtn bg999999",on:{click:function(a){a.stopPropagation(),arguments[0]=a=t.$handleEvent(a),t.openModel(t.data.id,0,1)}}},[t._v("取消订单")]),i("v-uni-view",{staticClass:"orderBtn bgFF4F00",on:{click:function(a){a.stopPropagation(),arguments[0]=a=t.$handleEvent(a),t.payOrder(t.data.id,t.data.payType,t.data.totalPrice)}}},[t._v("立即付款")])]:t._e(),2==t.data.status?[i("v-uni-view",{staticClass:"orderBtn2"},[t._v("待发货")])]:t._e(),3==t.data.status?[i("v-uni-view",{staticClass:"orderBtn bgFF4F00",on:{click:function(a){a.stopPropagation(),arguments[0]=a=t.$handleEvent(a),t.openModel(t.data.id,4,1)}}},[t._v("确认收货")])]:t._e(),4==t.data.status?[i("v-uni-view",{staticClass:"orderBtn3_"},[t._v("已完成")])]:t._e()],2),i("gui-modal",{ref:"guimodal",attrs:{isCloseBtn:!1,title:"操作提示"}},[i("v-uni-view",{staticClass:"plt30tb40 gui-bg-gray",attrs:{slot:"content"},slot:"content"},[i("v-uni-view",{staticClass:"gui-text-center f30 fm"},[t._v(t._s(t.modalTitle))])],1),i("v-uni-view",{staticClass:"gui-flex gui-rows gui-space-around",attrs:{slot:"btns"},slot:"btns"},[i("v-uni-view",{staticClass:"modal-btns",on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.$refs.guimodal.close()}}},[i("v-uni-text",{staticClass:"c999999 fb"},[t._v("取消")])],1),i("v-uni-view",{staticClass:"modal-btns",on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.changeOrderStatus.apply(void 0,arguments)}}},[i("v-uni-text",{staticClass:"cFF4F00 fb"},[t._v("确认")])],1)],1)],1)],1)],1)},n=[]},"16bf":function(t,a,i){"use strict";i("7a82"),Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0,i("a9e3");var e={name:"gui-modal",props:{width:{type:String,default:"580rpx"},bodyStyle:{type:String,default:"background-color:#FFFFFF; border-radius:10rpx;"},isCloseBtn:{type:Boolean,default:!0},closeBtnStyle:{type:String,default:"color:#2B2E3D; font-size:28rpx;"},isTitle:{type:Boolean,default:!0},title:{type:String,default:"title"},titleStyle:{type:String,default:"line-height:90rpx; font-size:28rpx; color:#2B2E3D;"},canCloseByShade:{type:Boolean,default:!0},zIndex:{type:Number,default:99}},methods:{open:function(){this.$refs.guipopupformodal.open(),this.$emit("open")},close:function(){this.$refs.guipopupformodal.close(),this.$emit("close")},stopfun:function(t){return t.stopPropagation(),null},eClose:function(){this.$emit("close")}}};a.default=e},1780:function(t,a,i){var e=i("24fb");a=e(!1),a.push([t.i,".gui-popup[data-v-092cba5e]{width:%?750?%;position:fixed;z-index:99999;left:0;top:0;bottom:0;flex:1}.gui-popup-content[data-v-092cba5e]{overflow:hidden}.gui-fade-out[data-v-092cba5e]{opacity:0}.gui-popup-center[data-v-092cba5e]{-webkit-transform:scale(.3);transform:scale(.3)}.gui-popup-top[data-v-092cba5e]{-webkit-transform:translateY(-1000px);transform:translateY(-1000px)}.gui-popup-bottom[data-v-092cba5e]{-webkit-transform:translateY(600px);transform:translateY(600px)}.gui-popup-left[data-v-092cba5e]{-webkit-transform:translateX(-600px);transform:translateX(-600px)}.gui-popup-right[data-v-092cba5e]{-webkit-transform:translateX(600px);transform:translateX(600px)}\n.gui-popup[data-v-092cba5e]{height:100%}\r\n",""]),t.exports=a},"17f1":function(t,a,i){"use strict";i.d(a,"b",(function(){return e})),i.d(a,"c",(function(){return d})),i.d(a,"a",(function(){}));var e=function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("v-uni-view",{staticClass:"gui-img gui-flex gui-align-items-center gui-justify-content-center",style:{width:t.width+"rpx",height:0==t.height?t.imgHeight+"rpx":t.height+"rpx",borderRadius:t.borderRadius}},[i("v-uni-image",{style:{width:t.width+"rpx",height:t.imgHeight+"rpx",borderRadius:t.borderRadius,opacity:t.opacity},attrs:{src:t.src,mode:t.mode},on:{load:function(a){arguments[0]=a=t.$handleEvent(a),t.imgLoad.apply(void 0,arguments)},error:function(a){arguments[0]=a=t.$handleEvent(a),t.error.apply(void 0,arguments)}}}),t.isLoading?i("v-uni-text",{staticClass:"gui-img-loading gui-icons",class:[t.animate?"gui-fade-out":""],style:{width:t.width+"rpx",height:0==t.height?t.imgHeight+"rpx":t.height+"rpx",lineHeight:0==t.height?t.imgHeight+"rpx":t.height+"rpx",borderRadius:t.borderRadius}},[t._v("")]):t._e(),t.failed?i("v-uni-text",{staticClass:"gui-img-loading gui-icons",class:[t.animate?"gui-fade-out":""],style:{width:t.width+"rpx",height:0==t.height?t.imgHeight+"rpx":t.height+"rpx",lineHeight:0==t.height?t.imgHeight+"rpx":t.height+"rpx",borderRadius:t.borderRadius}},[t._v("")]):t._e()],1)},d=[]},2253:function(t,a,i){var e=i("1780");e.__esModule&&(e=e.default),"string"===typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);var d=i("4f06").default;d("52085d8a",e,!0,{sourceMap:!1,shadowMode:!1})},3350:function(t,a,i){"use strict";i.r(a);var e=i("16bf"),d=i.n(e);for(var n in e)["default"].indexOf(n)<0&&function(t){i.d(a,t,(function(){return e[t]}))}(n);a["default"]=d.a},"38c5":function(t,a,i){"use strict";i("7a82"),Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0,i("a9e3");var e={name:"gui-popup",props:{bgColor:{type:String,default:"rgba(0, 0, 0, 0.7)"},position:{type:String,default:"center"},width:{type:String,default:"580rpx"},canCloseByShade:{type:Boolean,default:!0},zIndex:{type:Number,default:99999},top:{type:Number,default:0},duration:{type:Number,default:280}},data:function(){return{show:!1,out:!1}},methods:{open:function(){this.out=!1,this.show=!0},closebysd:function(){this.canCloseByShade&&this.close()},close:function(){var t=this;this.out=!0,setTimeout((function(){t.show=!1,t.$emit("close")}),350)},stopfun:function(t){return t.stopPropagation(),null}}};a.default=e},"3f8f":function(t,a,i){var e=i("bedd");e.__esModule&&(e=e.default),"string"===typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);var d=i("4f06").default;d("616f2ca2",e,!0,{sourceMap:!1,shadowMode:!1})},4860:function(t,a,i){"use strict";i.r(a);var e=i("38c5"),d=i.n(e);for(var n in e)["default"].indexOf(n)<0&&function(t){i.d(a,t,(function(){return e[t]}))}(n);a["default"]=d.a},"7fb3":function(t,a,i){"use strict";var e=i("c9f6"),d=i.n(e);d.a},"817a":function(t,a,i){"use strict";var e=i("3f8f"),d=i.n(e);d.a},a78f:function(t,a,i){"use strict";i.d(a,"b",(function(){return e})),i.d(a,"c",(function(){return d})),i.d(a,"a",(function(){}));var e=function(){var t=this,a=t.$createElement,i=t._self._c||a;return t.show?i("v-uni-view",["center"==t.position?i("v-uni-view",{ref:"guipopup",staticClass:"gui-popup gui-flex gui-columns gui-justify-content-center gui-align-items-center",class:[t.out?"gui-fade-out":"gui-fade-in"],style:{backgroundColor:t.bgColor,zIndex:t.zIndex,top:t.top+"px",animationDuration:t.duration+"ms"},on:{touchmove:function(a){a.stopPropagation(),a.preventDefault(),arguments[0]=a=t.$handleEvent(a),t.stopfun.apply(void 0,arguments)},click:function(a){a.stopPropagation(),arguments[0]=a=t.$handleEvent(a),t.closebysd.apply(void 0,arguments)}}},[i("v-uni-view",{ref:"guiPopupCenter",staticClass:"gui-popup-content gui-popup-center",class:[t.out?"gui-scale-out":"gui-scale-in"],style:{width:t.width,animationDuration:t.duration+"ms"},on:{click:function(a){a.stopPropagation(),arguments[0]=a=t.$handleEvent(a),t.stopfun.apply(void 0,arguments)}}},[t._t("default")],2)],1):t._e(),"top"==t.position?i("v-uni-view",{ref:"guipopup",staticClass:"gui-popup gui-flex gui-columns",class:[t.out?"gui-fade-out":"gui-fade-in"],style:{backgroundColor:t.bgColor,zIndex:t.zIndex,top:t.top+"px",animationDuration:t.duration+"ms"},on:{touchmove:function(a){a.stopPropagation(),a.preventDefault(),arguments[0]=a=t.$handleEvent(a),t.stopfun.apply(void 0,arguments)},click:function(a){a.stopPropagation(),arguments[0]=a=t.$handleEvent(a),t.closebysd.apply(void 0,arguments)}}},[i("v-uni-view",{ref:"guiPopupTop",staticClass:"gui-popup-content gui-popup-top",class:[t.out?"gui-top-out":"gui-top-in"],style:{animationDuration:t.duration+"ms"},on:{click:function(a){a.stopPropagation(),arguments[0]=a=t.$handleEvent(a),t.stopfun.apply(void 0,arguments)}}},[t._t("default")],2)],1):t._e(),"bottom"==t.position?i("v-uni-view",{ref:"guipopup",staticClass:"gui-popup gui-flex gui-columns gui-justify-content-end",class:[t.out?"gui-fade-out":"gui-fade-in"],style:{backgroundColor:t.bgColor,zIndex:t.zIndex,top:t.top+"px",animationDuration:t.duration+"ms"},on:{touchmove:function(a){a.stopPropagation(),a.preventDefault(),arguments[0]=a=t.$handleEvent(a),t.stopfun.apply(void 0,arguments)},click:function(a){a.stopPropagation(),arguments[0]=a=t.$handleEvent(a),t.closebysd.apply(void 0,arguments)}}},[i("v-uni-view",{ref:"guiPopupBottom",staticClass:"gui-popup-content gui-popup-bottom",class:[t.out?"gui-bottom-out":"gui-bottom-in"],style:{animationDuration:t.duration+"ms"},on:{click:function(a){a.stopPropagation(),arguments[0]=a=t.$handleEvent(a),t.stopfun.apply(void 0,arguments)}}},[t._t("default")],2)],1):t._e(),"left"==t.position?i("v-uni-view",{ref:"guipopup",staticClass:"gui-popup gui-flex gui-columns",class:[t.out?"gui-fade-out":"gui-fade-in"],style:{backgroundColor:t.bgColor,zIndex:t.zIndex,top:t.top+"px",animationDuration:t.duration+"ms"},on:{touchmove:function(a){a.stopPropagation(),a.preventDefault(),arguments[0]=a=t.$handleEvent(a),t.stopfun.apply(void 0,arguments)},click:function(a){a.stopPropagation(),arguments[0]=a=t.$handleEvent(a),t.closebysd.apply(void 0,arguments)}}},[i("v-uni-view",{ref:"guiPopupLeft",staticClass:"gui-popup-content gui-flex1 gui-flex gui-columns gui-popup-left",class:[t.out?"gui-left-out":"gui-left-in"],style:{width:t.width,animationDuration:t.duration+"ms"},on:{click:function(a){a.stopPropagation(),arguments[0]=a=t.$handleEvent(a),t.stopfun.apply(void 0,arguments)}}},[t._t("default")],2)],1):t._e(),"right"==t.position?i("v-uni-view",{ref:"guipopup",staticClass:"gui-popup gui-flex gui-columns gui-align-items-end",class:[t.out?"gui-fade-out":"gui-fade-in"],style:{backgroundColor:t.bgColor,zIndex:t.zIndex,top:t.top+"px",animationDuration:t.duration+"ms"},on:{touchmove:function(a){a.stopPropagation(),a.preventDefault(),arguments[0]=a=t.$handleEvent(a),t.stopfun.apply(void 0,arguments)},click:function(a){a.stopPropagation(),arguments[0]=a=t.$handleEvent(a),t.closebysd.apply(void 0,arguments)}}},[i("v-uni-view",{ref:"guiPopupRight",staticClass:"gui-popup-content gui-flex1 gui-flex gui-columns gui-popup-right",class:[t.out?"gui-right-out":"gui-right-in"],style:{width:t.width,animationDuration:t.duration+"ms"},on:{click:function(a){a.stopPropagation(),arguments[0]=a=t.$handleEvent(a),t.stopfun.apply(void 0,arguments)}}},[t._t("default")],2)],1):t._e()],1):t._e()},d=[]},bedd:function(t,a,i){var e=i("24fb");a=e(!1),a.push([t.i,".padding_5[data-v-c6b995dc]{padding:%?5?%}.padding_tb6[data-v-c6b995dc]{padding-top:%?6?%;padding-bottom:%?6?%}.padding_t10[data-v-c6b995dc]{padding-top:%?10?%}.padding_t20[data-v-c6b995dc]{padding-top:%?20?%}.padding_tb10[data-v-c6b995dc]{padding-top:%?10?%;padding-bottom:%?10?%}.padding_30[data-v-c6b995dc]{padding:%?30?%}.padding_t30[data-v-c6b995dc]{padding-top:%?30?%}.padding_tb30[data-v-c6b995dc]{padding-top:%?30?%;padding-bottom:%?30?%}.padding_20[data-v-c6b995dc]{padding:%?20?%}.padding_l30[data-v-c6b995dc]{padding-left:%?30?%}.padding_l20[data-v-c6b995dc]{padding-left:%?20?%}.padding_l10[data-v-c6b995dc]{padding-left:%?10?%}.padding_r30[data-v-c6b995dc]{padding-right:%?30?%}.padding_r20[data-v-c6b995dc]{padding-right:%?20?%}.padding_r10[data-v-c6b995dc]{padding-right:%?10?%}.padding_tb20[data-v-c6b995dc]{padding-top:%?20?%;padding-bottom:%?20?%}.padding_lr20[data-v-c6b995dc]{padding-left:%?20?%;padding-right:%?20?%}.padding_b20[data-v-c6b995dc]{padding-bottom:%?20?%}.padding_b30[data-v-c6b995dc]{padding-bottom:%?30?%}.padding_b10[data-v-c6b995dc]{padding-bottom:%?10?%}.padding_lr30[data-v-c6b995dc]{padding-left:%?30?%;padding-right:%?30?%}.padding_tb15[data-v-c6b995dc]{padding-top:%?15?%;padding-bottom:%?15?%}.margin-b20[data-v-c6b995dc]{margin-bottom:%?20?%}.line-15[data-v-c6b995dc]{height:%?15?%}.line-20[data-v-c6b995dc]{height:%?20?%}.margin20[data-v-c6b995dc]{margin:%?20?%}.margin-t20[data-v-c6b995dc]{margin-top:%?20?%}.margin-l20[data-v-c6b995dc]{margin-left:%?20?%}.margin-l30[data-v-c6b995dc]{margin-left:%?30?%}.margin-r30[data-v-c6b995dc]{margin-right:%?30?%}.margin-r20[data-v-c6b995dc]{margin-right:%?20?%}.margin-r10[data-v-c6b995dc]{margin-right:%?10?%}.margin-t10[data-v-c6b995dc]{margin-top:%?10?%}.margin-l140[data-v-c6b995dc]{margin-left:%?140?%}.margin-l60[data-v-c6b995dc]{margin-left:%?60?%}.margin-lr30[data-v-c6b995dc]{margin-left:%?30?%;margin-right:%?30?%}.display-flex[data-v-c6b995dc]{display:flex}.color-66[data-v-c6b995dc]{color:#666}.color-444444[data-v-c6b995dc]{color:#444}.color-999999[data-v-c6b995dc]{color:#666}.color-FF0D00[data-v-c6b995dc]{color:#ff0d00}.color-0B181E[data-v-c6b995dc]{color:#0b181e}.color-03A95A[data-v-c6b995dc]{color:#03a95a}.color-1A6C3E[data-v-c6b995dc]{color:#1a6c3e}.color-ff[data-v-c6b995dc]{color:#fff}.color-4C3426[data-v-c6b995dc]{color:#4c3426}.color-E7BF9B[data-v-c6b995dc]{color:#e7bf9b}.color-E7E7E7[data-v-c6b995dc]{color:#e7e7e7}.color-EBF0EE[data-v-c6b995dc]{color:#ebf0ee}.color-16A1A6[data-v-c6b995dc]{color:#16a1a6}.color-DAB082[data-v-c6b995dc]{color:#dab082}.color-724823[data-v-c6b995dc]{color:#724823}.color-333333[data-v-c6b995dc]{color:#333}.color-C7AF85[data-v-c6b995dc]{color:#c7af85}.color-318BFF[data-v-c6b995dc]{color:#318bff}.bg-F8F8F8[data-v-c6b995dc]{background:#f8f8f8}.bg-999999[data-v-c6b995dc]{background:#999}.bg-E7BF9B[data-v-c6b995dc]{background:#e7bf9b}.bg-F7F7F7[data-v-c6b995dc]{background:#f7f7f7}.bg-FFFFFF[data-v-c6b995dc]{background:#fff}.bg-EBF0EE[data-v-c6b995dc]{background:#ebf0ee}.bg-318BFF[data-v-c6b995dc]{background:#318bff}.bg-F85F52[data-v-c6b995dc]{background:#f85f52}.bg-16A1A6[data-v-c6b995dc]{background:#16a1a6}.bg-F9DB3B[data-v-c6b995dc]{background:#f9db3b}.bg-3875c6[data-v-c6b995dc]{background:#3875c6}.width-30[data-v-c6b995dc]{width:%?30?%}.width-95[data-v-c6b995dc]{width:95%}.width-100rpx[data-v-c6b995dc]{width:%?100?%}.width-150rpx[data-v-c6b995dc]{width:%?150?%}.height-100r[data-v-c6b995dc]{height:%?100?%}.height-30[data-v-c6b995dc]{height:%?30?%}.height-100[data-v-c6b995dc]{height:100%}.margin-b50[data-v-c6b995dc]{margin-bottom:%?50?%}.margin-t60[data-v-c6b995dc]{margin-top:%?60?%}.border-r10[data-v-c6b995dc]{border-radius:%?10?%}.width-100[data-v-c6b995dc]{width:100%}.line-100[data-v-c6b995dc]{height:%?100?%}.line-134[data-v-c6b995dc]{height:%?134?%}.text-left[data-v-c6b995dc]{text-align:left}.text-right[data-v-c6b995dc]{text-align:right}.text-center[data-v-c6b995dc]{text-align:center}.grace-fixed-top[data-v-c6b995dc]{top:44px}.fixed-height[data-v-c6b995dc]{height:44px}.heightBottomDialog[data-v-c6b995dc]{max-height:300px;overflow-y:auto\n}.display-i-b[data-v-c6b995dc]{display:inline-block}.fontsize18[data-v-c6b995dc]{font-size:%?18?%}.fontsize20[data-v-c6b995dc]{font-size:%?20?%}.fontsize22[data-v-c6b995dc]{font-size:%?22?%}.fontsize24[data-v-c6b995dc]{font-size:%?24?%}.fontsize25[data-v-c6b995dc]{font-size:%?25?%}.fontsize26[data-v-c6b995dc]{font-size:%?26?%}.fontsize28[data-v-c6b995dc]{font-size:%?28?%}.fontsize30[data-v-c6b995dc]{font-size:%?30?%}.fontsize32[data-v-c6b995dc]{font-size:%?32?%}.fontsize35[data-v-c6b995dc]{font-size:%?35?%}.fontsize38[data-v-c6b995dc]{font-size:%?38?%}.fontsize100[data-v-c6b995dc]{font-size:%?100?%}.margin-l25[data-v-c6b995dc]{margin-left:%?25?%}.margin-r25[data-v-c6b995dc]{margin-right:%?25?%}.padding-l39[data-v-c6b995dc]{margin-left:%?39?%}.marginl-35[data-v-c6b995dc]{margin-left:%?35?%}.padding-tb36[data-v-c6b995dc]{padding-top:%?36?%;padding-bottom:%?36?%}.fontsize40[data-v-c6b995dc]{font-size:%?40?%}.fontsize50[data-v-c6b995dc]{font-size:%?50?%}.margin-b30[data-v-c6b995dc]{margin-bottom:%?30?%}.margin-t30[data-v-c6b995dc]{margin-top:%?30?%}.bg-272727[data-v-c6b995dc]{background:#272727}.bg-FCD8A7[data-v-c6b995dc]{background:#fcd8a7}.color-4C2800[data-v-c6b995dc]{color:#4c2800}.align-cen[data-v-c6b995dc]{align-items:center}.border-r30[data-v-c6b995dc]{border-radius:%?30?%}.border-b[data-v-c6b995dc]{border-bottom:%?1?% solid #f7f7f7}.border-r20[data-v-c6b995dc]{border-radius:%?20?%}.border-r100[data-v-c6b995dc]{border-radius:%?100?%}.padding-tb60[data-v-c6b995dc]{padding:%?60?% 0}uni-button[data-v-c6b995dc]::after{border:0}.top-ricon[data-v-c6b995dc]{width:%?43?%;height:%?43?%;padding-right:%?30?%}.icon-merchant[data-v-c6b995dc]{width:%?30?%;height:%?30?%;position:relative;top:%?5?%}.button-classic[data-v-c6b995dc]{color:#fff;width:90%;background:#1a6c3e;font-size:%?32?%}.button-classics[data-v-c6b995dc]{background:#fff;width:90%;color:#1a6c3e;font-size:%?32?%;border:%?1?% solid #1a6c3e}.width-150[data-v-c6b995dc]{width:%?150?%}.float-l[data-v-c6b995dc]{float:left}.float-r[data-v-c6b995dc]{float:right}.border-r[data-v-c6b995dc]{border-radius:%?200?%}uni-page-body[data-v-c6b995dc]{background-color:#f8f8f8}body.?%PAGE?%[data-v-c6b995dc]{background-color:#f8f8f8}.view1[data-v-c6b995dc]{width:%?40?%;height:%?40?%}.view2[data-v-c6b995dc]{width:%?180?%;height:%?74?%;line-height:%?74?%}.view3[data-v-c6b995dc]{position:fixed;bottom:0}.view4[data-v-c6b995dc]{width:%?170?%;height:%?170?%;background:#f8f8f8;border-radius:%?20?%}.view4 uni-image[data-v-c6b995dc]{width:100%;height:100%;border-radius:%?20?%}.view5[data-v-c6b995dc]{width:%?430?%}.view6[data-v-c6b995dc]{width:%?52?%;height:%?52?%}.view7[data-v-c6b995dc]{width:%?500?%;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;overflow:hidden}.view8[data-v-c6b995dc]{width:%?100?%}.view9[data-v-c6b995dc]{border:%?1?% solid #16a1a6}.main[data-v-c6b995dc]{padding:%?30?%;background-color:#fff;border-radius:%?20?%;margin:%?-10?% 0 %?20?% 0}.addressi[data-v-c6b995dc]{font-size:%?52?%;color:#16a1a6}.addressInfo[data-v-c6b995dc]{width:%?570?%}.addressInfou[data-v-c6b995dc]{line-height:%?30?%}.addressInfoul[data-v-c6b995dc]{font-size:%?30?%}.addressInfour[data-v-c6b995dc]{font-size:%?28?%;color:#999;margin-left:%?10?%}.addressInfob[data-v-c6b995dc]{font-size:%?28?%;margin-top:%?20?%;line-height:%?32?%}.addressInfoNo[data-v-c6b995dc]{font-size:%?28?%;color:#666}.padding30[data-v-c6b995dc]{padding:%?20?% %?30?%;width:%?690?%;background-color:#fff}.orderBtn[data-v-c6b995dc]{width:%?140?%;text-align:center;height:%?60?%;line-height:%?60?%;border-radius:%?30?%;font-size:%?26?%;margin-left:%?20?%;color:#fff;padding:0!important}.orderBtn_[data-v-c6b995dc]{width:%?120?%;text-align:center;height:%?50?%;line-height:%?50?%;border-radius:%?25?%;font-size:%?25?%;margin-left:%?20?%;color:#fff}.bg16A1A6[data-v-c6b995dc]{background-color:#16a1a6}.bg999999[data-v-c6b995dc]{background-color:#999}.h120[data-v-c6b995dc]{height:%?120?%}.w300[data-v-c6b995dc]{width:%?300?%}.sbtn[data-v-c6b995dc]{font-size:%?20?%;color:#fff;border-radius:%?6?%;padding:0 %?4?%;margin-right:%?10?%}.sbtnbg1[data-v-c6b995dc]{background-color:#ff4f00}.sbtnbg2[data-v-c6b995dc]{background-color:#ff4f00}.width-r[data-v-c6b995dc]{width:%?350?%}.orderBtn2[data-v-c6b995dc]{width:%?140?%;text-align:center;height:%?60?%;line-height:%?60?%;border-radius:%?30?%;font-size:%?26?%;margin-left:%?20?%;padding:0!important;border:thin solid #ff4f00;color:#ff4f00}.orderBtn3[data-v-c6b995dc]{width:%?140?%;text-align:center;height:%?60?%;line-height:%?60?%;border-radius:%?30?%;font-size:%?26?%;margin-left:%?20?%;padding:0!important;border:thin solid #999;color:#999}.orderBtn2_[data-v-c6b995dc]{width:%?120?%;text-align:center;height:%?50?%;line-height:%?50?%;border-radius:%?25?%;font-size:%?25?%;margin-left:%?20?%;border:thin solid #ff4f00;color:#ff4f00}.orderBtn3_[data-v-c6b995dc]{width:%?120?%;text-align:center;height:%?50?%;line-height:%?50?%;border-radius:%?25?%;font-size:%?25?%;margin-left:%?20?%;border:thin solid #999;color:#999}",""]),t.exports=a},bf99:function(t,a,i){"use strict";var e=i("2253"),d=i.n(e);d.a},c7c4:function(t,a,i){"use strict";i.r(a);var e=i("0364"),d=i.n(e);for(var n in e)["default"].indexOf(n)<0&&function(t){i.d(a,t,(function(){return e[t]}))}(n);a["default"]=d.a},c9f6:function(t,a,i){var e=i("e844");e.__esModule&&(e=e.default),"string"===typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);var d=i("4f06").default;d("faf62250",e,!0,{sourceMap:!1,shadowMode:!1})},d0d5:function(t,a,i){"use strict";i.r(a);var e=i("1016"),d=i("dd50");for(var n in d)["default"].indexOf(n)<0&&function(t){i.d(a,t,(function(){return d[t]}))}(n);i("817a");var o=i("f0c5"),c=Object(o["a"])(d["default"],e["b"],e["c"],!1,null,"c6b995dc",null,!1,e["a"],void 0);a["default"]=c.exports},d2c4:function(t,a,i){"use strict";i.r(a);var e=i("a78f"),d=i("4860");for(var n in d)["default"].indexOf(n)<0&&function(t){i.d(a,t,(function(){return d[t]}))}(n);i("bf99");var o=i("f0c5"),c=Object(o["a"])(d["default"],e["b"],e["c"],!1,null,"092cba5e",null,!1,e["a"],void 0);a["default"]=c.exports},d994:function(t,a,i){var e=i("e443");e.__esModule&&(e=e.default),"string"===typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);var d=i("4f06").default;d("606db7a4",e,!0,{sourceMap:!1,shadowMode:!1})},dbaf:function(t,a,i){"use strict";i("7a82");var e=i("4ea4").default;Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var d,n=e(i("df11")),o={data:function(){return{id:0,pageLoading:!0,data:{},modalTitle:"",id_:0,status_:0,reStatus_:0,item:null,actionType:1}},onLoad:function(t){d=this,d.id=t.id},onShow:function(){d.getOrderDetail()},methods:{copy:function(t){(0,n.default)({content:t,success:function(t){d.$refs.guiPage.openMessage("success","复制成功",!0,1500)}})},getOrderDetail:function(){d.pageLoading=!0,uni.gRequest.post("swoft/api/pos/getPosOrderDetail",{data:{uid:uni.getStorageSync("userInfo").id,id:d.id}},(function(t){0==t.code&&(d.data=t.data)}),(function(t){d.$refs.guiPage.openMessage("default","请求错误",!0,1500)}),(function(t){d.pageLoading=!1,3==t.data.code&&(d.$refs.guiPage.openMessage("default","请重新登录",!0,1500),setTimeout((function(){uni.gRequest.gotoLogin()}),1500))}),!0,!0)},openModel:function(t,a,i){-1==a?d.modalTitle="确定要删除该订单吗？":0==a?d.modalTitle="确定要取消该订单吗？":4==a&&(d.modalTitle="是否确认收货？"),d.id_=t,d.status_=a,d.$refs.guimodal.open()},changeOrderStatus:function(){var t;t={uid:uni.getStorageSync("userInfo").id,posOrderId:d.id_,status:d.status_},d.pageLoading=!0,uni.gRequest.post("swoft/api/pos/editPosOrder",{data:t},(function(t){d.$refs.guimodal.close(),0==t.code?(d.$refs.guiPage.openMessage("success",t.msg,!0,1500),setTimeout((function(){1==d.actionType&&-1==d.status_?uni.navigateBack({delta:1}):d.getOrderDetail()}),1500)):(d.$refs.guiPage.openMessage("default",t.msg,!0,1500),setTimeout((function(){d.getOrderDetail()}),1500))}),(function(t){d.$refs.guiPage.openMessage("default","请求错误",!0,1500)}),(function(t){d.pageLoading=!1}),!0,!0)},payOrder:function(t,a,i){var e={uid:uni.getStorageSync("userInfo").id,totalPrice:i,orderId:t,payType:a,type:"H5"};1==d.payType?e.return_url="https://useful.youyong.org.cn/H5/#/pages/zengzhi/pos/orderDetail?id="+d.id:e.return_url="",d.pageLoading=!0,uni.gRequest.post("swoft/api/pos/rePosGoodsOrder",{data:e},(function(t){0==t.code?window.location.href=t.data.url:(d.pageLoading=!1,d.$refs.guiPage.openMessage("default",t.msg,!0,1500),setTimeout((function(){d.reload()}),1500))}),(function(t){d.pageLoading=!1,d.$refs.guiPage.openMessage("default","请求错误",!0,1500)}),(function(t){}),!0,!0)}}};a.default=o},dd50:function(t,a,i){"use strict";i.r(a);var e=i("dbaf"),d=i.n(e);for(var n in e)["default"].indexOf(n)<0&&function(t){i.d(a,t,(function(){return e[t]}))}(n);a["default"]=d.a},df11:function(t,a,i){"use strict";i("7a82"),Object.defineProperty(a,"__esModule",{value:!0}),a.default=function(t){var a=t.content,i=t.success,e=t.error;if(!a)return e("复制的内容不能为空 !");a="string"===typeof a?a:a.toString(),document.queryCommandSupported("copy")||e("浏览器不支持");var d=document.createElement("textarea");d.value=a,d.readOnly="readOnly",document.body.appendChild(d),d.select(),d.setSelectionRange(0,a.length);var n=document.execCommand("copy");n?i("复制成功~"):e("复制失败，请检查h5中调用该方法的方式，是不是用户点击的方式调用的，如果不是请改为用户点击的方式触发该方法，因为h5中安全性，不能js直接调用！");d.remove()},i("d401"),i("d3b7"),i("25f0")},dfcc:function(t,a,i){"use strict";i.d(a,"b",(function(){return d})),i.d(a,"c",(function(){return n})),i.d(a,"a",(function(){return e}));var e={guiPopup:i("d2c4").default},d=function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("gui-popup",{ref:"guipopupformodal",attrs:{width:t.width,canCloseByShade:t.canCloseByShade,zIndex:t.zIndex},on:{close:function(a){arguments[0]=a=t.$handleEvent(a),t.eClose.apply(void 0,arguments)}}},[i("v-uni-view",{staticClass:"gui-relative",style:t.bodyStyle,on:{click:function(a){a.stopPropagation(),a.preventDefault(),arguments[0]=a=t.$handleEvent(a),t.stopfun.apply(void 0,arguments)}}},[i("v-uni-view",[t.isTitle?i("v-uni-text",{staticClass:"gui-block-text gui-text-center fb",style:t.titleStyle},[t._v(t._s(t.title))]):t._e()],1),i("v-uni-view",[t._t("content")],2),i("v-uni-view",[t._t("btns")],2),t.isCloseBtn?i("v-uni-text",{staticClass:"gui-popup-close gui-block-text gui-absolute-rt gui-icons",style:t.closeBtnStyle,on:{click:function(a){a.stopPropagation(),a.preventDefault(),arguments[0]=a=t.$handleEvent(a),t.close.apply(void 0,arguments)}}},[t._v("")]):t._e()],1)],1)},n=[]},e1fa:function(t,a,i){"use strict";i.r(a);var e=i("17f1"),d=i("c7c4");for(var n in d)["default"].indexOf(n)<0&&function(t){i.d(a,t,(function(){return d[t]}))}(n);i("7fb3");var o=i("f0c5"),c=Object(o["a"])(d["default"],e["b"],e["c"],!1,null,"398e8729",null,!1,e["a"],void 0);a["default"]=c.exports},e24b:function(t,a,i){"use strict";i.r(a);var e=i("dfcc"),d=i("3350");for(var n in d)["default"].indexOf(n)<0&&function(t){i.d(a,t,(function(){return d[t]}))}(n);i("e79f");var o=i("f0c5"),c=Object(o["a"])(d["default"],e["b"],e["c"],!1,null,"40b0802a",null,!1,e["a"],void 0);a["default"]=c.exports},e443:function(t,a,i){var e=i("24fb");a=e(!1),a.push([t.i,".gui-popup-close[data-v-40b0802a]{width:%?80?%;height:%?80?%;line-height:%?80?%;text-align:center}",""]),t.exports=a},e79f:function(t,a,i){"use strict";var e=i("d994"),d=i.n(e);d.a},e844:function(t,a,i){var e=i("24fb");a=e(!1),a.push([t.i,".gui-img[data-v-398e8729]{width:%?500?%;height:%?500?%;overflow:hidden;font-size:0;position:relative}.gui-img-loading[data-v-398e8729]{position:absolute;left:0;top:0;background-color:#f8f8f8;font-size:%?58?%;color:#d9d9d9;text-align:center}",""]),t.exports=a}}]);