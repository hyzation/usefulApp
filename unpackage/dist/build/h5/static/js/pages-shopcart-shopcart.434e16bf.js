(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-shopcart-shopcart"],{"06e6":function(t,e,i){"use strict";var o=i("c015"),a=i.n(o);a.a},"16bf":function(t,e,i){"use strict";i("7a82"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,i("a9e3");var o={name:"gui-modal",props:{width:{type:String,default:"580rpx"},bodyStyle:{type:String,default:"background-color:#FFFFFF; border-radius:10rpx;"},isCloseBtn:{type:Boolean,default:!0},closeBtnStyle:{type:String,default:"color:#2B2E3D; font-size:28rpx;"},isTitle:{type:Boolean,default:!0},title:{type:String,default:"title"},titleStyle:{type:String,default:"line-height:90rpx; font-size:28rpx; color:#2B2E3D;"},canCloseByShade:{type:Boolean,default:!0},zIndex:{type:Number,default:99}},methods:{open:function(){this.$refs.guipopupformodal.open(),this.$emit("open")},close:function(){this.$refs.guipopupformodal.close(),this.$emit("close")},stopfun:function(t){return t.stopPropagation(),null},eClose:function(){this.$emit("close")}}};e.default=o},3350:function(t,e,i){"use strict";i.r(e);var o=i("16bf"),a=i.n(o);for(var n in o)["default"].indexOf(n)<0&&function(t){i.d(e,t,(function(){return o[t]}))}(n);e["default"]=a.a},4867:function(t,e,i){"use strict";var o;i("7a82"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,i("a9e3"),i("14d9"),i("a434"),i("d81d");var a={data:function(){return{pageLoading:!0,num:0,totalWeight:0,totalMvalue:0,totalprice:"0.00",shopCart:[],shopCartIdList:[],postData:[],checkedAll:!0,scrollHeight:0,index:-1,id:-1}},onReady:function(){uni.gJS.select("#footer",(function(t){o.scrollHeight=uni.gJS.system().windowHeight-t.height}))},onShow:function(){o.getShopcartList()},onLoad:function(){o=this},methods:{getShopcartList:function(){o.pageLoading=!0,uni.gRequest.post("swoft/api/shopcart/getShopcartList",{data:{uid:uni.getStorageSync("userInfo").id}},(function(t){0==t.code?(o.shopCart=t.data,o.checkedAll=!0,o.countTotoal()):o.$refs.guiPage.openMessage("default",t.msg,!0,1500)}),(function(t){o.$refs.guiPage.openMessage("default","请求错误",!0,1500)}),(function(t){o.pageLoading=!1,3==t.data.code&&(o.$refs.guiPage.openMessage("default","请重新登录",!0,1500),setTimeout((function(){uni.gRequest.gotoLogin()}),1500))}),!0,!0)},countTotoal:function(){for(var t=0,e=0,i=0,a=0,n=[],s=[],c=0;c<o.shopCart.length;c++)o.shopCart[c].checked&&o.shopCart[c].stock>=o.shopCart[c].num&&(t+=Number(o.shopCart[c].weight)*Number(o.shopCart[c].num),e+=Number(o.shopCart[c].mValue)*Number(o.shopCart[c].num),i+=Number(o.shopCart[c].price)*Number(o.shopCart[c].num),a+=Number(o.shopCart[c].num),n.push(o.shopCart[c].id),s.push(o.shopCart[c]));o.totalWeight=t,o.totalMvalue=e,o.totalprice=i.toFixed(2),o.num=a,o.shopCartIdList=n,o.postData=s},numberChange:function(t){o.shopCart[t[2]].num=t[0],o.shopCart[t[2]].totalPrice=t[0]*Number(o.shopCart[t[2]].price),o.shopCart[t[2]].totalMvalue=t[0]*Number(o.shopCart[t[2]].mValue),o.countTotoal()},removeGoods:function(t,e){o.index=t,o.id=e,o.$refs.guimodal.open()},doRemove:function(){o.pageLoading=!0,uni.gRequest.post("swoft/api/shopcart/delShopcart",{data:{id:o.id,uid:uni.getStorageSync("userInfo").id}},(function(t){o.$refs.guimodal.close(),0==t.code?(o.shopCart.splice(o.index,1),o.countTotoal(),o.index=-1,o.id=-1,o.$refs.guiPage.openMessage("success","已删除",!0,1500)):o.$refs.guiPage.openMessage("default",t.msg,!0,1500)}),(function(t){o.$refs.guiPage.openMessage("default","请求错误",!0,1500)}),(function(t){o.pageLoading=!1}),!0,!0)},itemChange:function(t){o.shopCart[t].checked=!o.shopCart[t].checked;for(var e=0,i=0;i<o.shopCart.length;i++)o.shopCart[i].checked||(e+=1);o.checkedAll=0==e,o.countTotoal()},itemChangeAll:function(){o.checkedAll=!o.checkedAll,o.shopCart.map((function(t,e){t.checked=o.checkedAll})),o.countTotoal()},sure:function(){if(0==o.num)return o.$refs.guiPage.openMessage("default","请选择商品",!0,1500),!1;uni.setStorageSync("postData",o.postData),uni.navigateTo({url:"/pages/shopcart/postOrder?num="+o.num+"&totalPrice="+o.totalprice+"&totalWeight="+o.totalWeight+"&shopCartIdList="+o.shopCartIdList.join(",")})}}};e.default=a},"5d35":function(t,e,i){"use strict";i.r(e);var o=i("bf3d"),a=i("be26");for(var n in a)["default"].indexOf(n)<0&&function(t){i.d(e,t,(function(){return a[t]}))}(n);i("06e6");var s=i("f0c5"),c=Object(s["a"])(a["default"],o["b"],o["c"],!1,null,"0b093dcc",null,!1,o["a"],void 0);e["default"]=c.exports},be26:function(t,e,i){"use strict";i.r(e);var o=i("4867"),a=i.n(o);for(var n in o)["default"].indexOf(n)<0&&function(t){i.d(e,t,(function(){return o[t]}))}(n);e["default"]=a.a},bf3d:function(t,e,i){"use strict";i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return n})),i.d(e,"a",(function(){return o}));var o={guiPage:i("1d79").default,guiImage:i("e1fa").default,guiStepBox:i("05d6").default,guiModal:i("e24b").default},a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("gui-page",{ref:"guiPage",attrs:{isLoading:t.pageLoading}},[i("v-uni-view",{attrs:{slot:"gBody"},slot:"gBody"},[0==t.shopCart.length?i("v-uni-view",{staticClass:"fullPage gui-flex gui-justify-content-center gui-align-items-center fm",staticStyle:{"margin-top":"-100rpx"}},[i("gui-image",{attrs:{src:"../../static/images/noData.png",width:396,height:226,timer:0}})],1):t._e(),t.shopCart.length>0?i("v-uni-scroll-view",{style:"height:"+t.scrollHeight+"px;",attrs:{"scroll-y":!0}},[t._l(t.shopCart,(function(e,o){return[i("v-uni-view",{key:o+"_0",staticClass:"h20"}),i("v-uni-view",{key:o+"_1",staticClass:"gui-flex gui-space-between gui-align-items-center bgFFFFFF mlr20 p20 br10 fm gui-relative"},[e.stock>=e.num?i("v-uni-text",{staticClass:"gui-icons cFF4F00",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.itemChange(o)}}},[t._v(t._s(e.checked?"":""))]):i("v-uni-view",{staticClass:"noStock c999999 f20 fm"},[t._v("库存不足")]),i("v-uni-text",{staticClass:"del gui-icons gui-absolute-rt",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.removeGoods(o,e.id)}}},[t._v("")]),i("v-uni-view",{staticClass:"shopLi gui-flex gui-space-between gui-align-items-center"},[i("v-uni-view",{staticClass:"shopLiImg gui-flex gui-align-items-center gui-justify-content-center"},[i("v-uni-image",{attrs:{src:e.goods_img+"?imageslim",mode:"aspectFill"}})],1),i("v-uni-view",{staticClass:"shopLiInfo"},[i("v-uni-view",{staticClass:"shopLiInfou gui-ellipsis",class:e.stock>=e.num?"":"c999999"},[t._v(t._s(e.goods_name))]),i("v-uni-view",{staticClass:"shopLiInfom gui-ellipsis"},[t._v(t._s(e.goodsOptionName))]),i("v-uni-view",{staticClass:"gui-flex gui-space-between gui-align-items-center"},[i("v-uni-text",{staticClass:"price",class:e.stock>=e.num?"cFF4F00":"c999999"},[t._v("￥"+t._s(e.price))]),e.stock>=e.num?i("gui-step-box",{attrs:{datas:[o],disabled:!0,value:e.num,minNum:1,maxNum:e.stock,width:"150rpx",inputStyle:"width:50rpx;height:50rpx;font-size:28rpx;line-height:50rpx;",buttonStyle:"width:50rpx;height:50rpx;line-height:50rpx;background-color:#F8F8F8;color:#999999;margin:0;border-radius:5rpx;"},on:{change:function(e){arguments[0]=e=t.$handleEvent(e),t.numberChange.apply(void 0,arguments)}}}):i("gui-step-box",{attrs:{datas:[o],isClick:!1,disabled:!0,value:e.num,width:"150rpx",inputStyle:"width:50rpx;height:50rpx;font-size:28rpx;line-height:50rpx;color:#999999;",buttonStyle:"width:50rpx;height:50rpx;line-height:50rpx;background-color:#F8F8F8;color:#999999;margin:0;border-radius:5rpx;"}})],1)],1)],1)],1)]})),i("v-uni-view",{staticClass:"h20"})],2):t._e(),t.shopCart.length>0?i("v-uni-view",{staticClass:"shopCartFooter gui-fixed-lb fm",attrs:{id:"footer"}},[i("v-uni-view",{staticClass:"scFooter borderBottom gui-flex gui-space-between gui-align-items-center"},[i("v-uni-view",{staticClass:"gui-flex gui-space-between gui-align-items-center"},[i("v-uni-text",{staticClass:"gui-icons color16A1A6",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.itemChangeAll.apply(void 0,arguments)}}},[t._v(t._s(t.checkedAll?"":""))]),i("v-uni-text",{staticClass:"checkAll"},[t._v("全选")])],1),i("v-uni-view",{staticClass:"gui-flex gui-justify-content-end gui-align-items-center"},[i("v-uni-text",{staticClass:"checkAll"},[t._v("合计:")]),i("v-uni-text",{staticClass:"price fb"},[t._v("￥"+t._s(t.totalprice))]),i("v-uni-view",{staticClass:"groupR",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.sure.apply(void 0,arguments)}}},[t._v("结算")])],1)],1)],1):i("v-uni-view",{staticClass:"shopCartFooter_ gui-fixed-lb",attrs:{id:"footer"}}),i("gui-modal",{ref:"guimodal",attrs:{isCloseBtn:!1,title:"操作提示"}},[i("v-uni-view",{staticClass:"plt30tb40 gui-bg-gray",attrs:{slot:"content"},slot:"content"},[i("v-uni-view",{staticClass:"gui-text-center f30 fm"},[t._v("确定要移除该商品吗？")])],1),i("v-uni-view",{staticClass:"gui-flex gui-rows gui-space-around",attrs:{slot:"btns"},slot:"btns"},[i("v-uni-view",{staticClass:"modal-btns",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.$refs.guimodal.close()}}},[i("v-uni-text",{staticClass:"c999999 fb"},[t._v("取消")])],1),i("v-uni-view",{staticClass:"modal-btns",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.doRemove.apply(void 0,arguments)}}},[i("v-uni-text",{staticClass:"cFF4F00 fb"},[t._v("确认")])],1)],1)],1)],1)],1)},n=[]},bf62:function(t,e,i){var o=i("24fb");e=o(!1),e.push([t.i,'uni-page-body[data-v-0b093dcc]{background-color:#f5f5f9}body.?%PAGE?%[data-v-0b093dcc]{background-color:#f5f5f9}.color16A1A6[data-v-0b093dcc]{color:#ff4f00}.shopLi[data-v-0b093dcc]{width:%?620?%}.shopLiImg[data-v-0b093dcc]{width:%?160?%;height:%?160?%}.shopLiImg uni-image[data-v-0b093dcc]{width:100%;height:100%;border-radius:%?20?%}.shopLiInfo[data-v-0b093dcc]{width:%?440?%}.shopLiInfou[data-v-0b093dcc]{font-size:%?28?%;width:%?400?%}.shopLiInfom[data-v-0b093dcc]{font-size:%?22?%;color:#999;height:%?60?%;line-height:%?60?%}.shopLiInfomm[data-v-0b093dcc]{font-size:%?22?%;color:#ff4f00;height:%?80?%}.price[data-v-0b093dcc]{font-size:%?30?%;margin-right:%?20?%}.del[data-v-0b093dcc]{font-size:%?36?%;top:%?10?%;right:%?10?%;color:#353535}\n.shopCartFooter[data-v-0b093dcc]{width:100%;background-color:#fff;height:%?100?%;bottom:%?157?%}.shopCartFooter_[data-v-0b093dcc]{width:100%;height:%?100?%;bottom:%?157?%}\n.scFooter[data-v-0b093dcc]{height:100%;padding:0 %?30?% 0 %?50?%;width:%?670?%}.scFooter[data-v-0b093dcc]:after{content:" ";position:absolute;top:0;left:0;right:0;border-top:1px solid #f8f8f8;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.checkAll[data-v-0b093dcc]{font-size:%?28?%;margin:0 %?10?% 0 %?20?%}.groupR[data-v-0b093dcc]{font-size:%?26?%;text-align:center;color:#fff;background-color:#ff4f00;width:%?146?%;height:%?64?%;border-radius:%?32?%;line-height:%?64?%}.sbtn[data-v-0b093dcc]{font-size:%?20?%;color:#fff;border-radius:%?6?%;padding:0 %?2?%;margin-right:%?10?%}.sbtnbg1[data-v-0b093dcc]{background-color:#ea333f}.sbtnbg2[data-v-0b093dcc]{background-color:#999}.shopLiInfou_[data-v-0b093dcc]{width:%?270?%}.color999999[data-v-0b093dcc]{color:#999}.footerH[data-v-0b093dcc]{height:60px}.h20[data-v-0b093dcc]{height:%?20?%}.noStock[data-v-0b093dcc]{width:%?40?%;left:%?20?%;top:%?20?%;line-height:%?22?%}',""]),t.exports=e},c015:function(t,e,i){var o=i("bf62");o.__esModule&&(o=o.default),"string"===typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);var a=i("4f06").default;a("68791daa",o,!0,{sourceMap:!1,shadowMode:!1})},d994:function(t,e,i){var o=i("e443");o.__esModule&&(o=o.default),"string"===typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);var a=i("4f06").default;a("606db7a4",o,!0,{sourceMap:!1,shadowMode:!1})},dfcc:function(t,e,i){"use strict";i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return n})),i.d(e,"a",(function(){return o}));var o={guiPopup:i("d2c4").default},a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("gui-popup",{ref:"guipopupformodal",attrs:{width:t.width,canCloseByShade:t.canCloseByShade,zIndex:t.zIndex},on:{close:function(e){arguments[0]=e=t.$handleEvent(e),t.eClose.apply(void 0,arguments)}}},[i("v-uni-view",{staticClass:"gui-relative",style:t.bodyStyle,on:{click:function(e){e.stopPropagation(),e.preventDefault(),arguments[0]=e=t.$handleEvent(e),t.stopfun.apply(void 0,arguments)}}},[i("v-uni-view",[t.isTitle?i("v-uni-text",{staticClass:"gui-block-text gui-text-center fb",style:t.titleStyle},[t._v(t._s(t.title))]):t._e()],1),i("v-uni-view",[t._t("content")],2),i("v-uni-view",[t._t("btns")],2),t.isCloseBtn?i("v-uni-text",{staticClass:"gui-popup-close gui-block-text gui-absolute-rt gui-icons",style:t.closeBtnStyle,on:{click:function(e){e.stopPropagation(),e.preventDefault(),arguments[0]=e=t.$handleEvent(e),t.close.apply(void 0,arguments)}}},[t._v("")]):t._e()],1)],1)},n=[]},e24b:function(t,e,i){"use strict";i.r(e);var o=i("dfcc"),a=i("3350");for(var n in a)["default"].indexOf(n)<0&&function(t){i.d(e,t,(function(){return a[t]}))}(n);i("e79f");var s=i("f0c5"),c=Object(s["a"])(a["default"],o["b"],o["c"],!1,null,"40b0802a",null,!1,o["a"],void 0);e["default"]=c.exports},e443:function(t,e,i){var o=i("24fb");e=o(!1),e.push([t.i,".gui-popup-close[data-v-40b0802a]{width:%?80?%;height:%?80?%;line-height:%?80?%;text-align:center}",""]),t.exports=e},e79f:function(t,e,i){"use strict";var o=i("d994"),a=i.n(o);a.a}}]);