(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-my-task-poster"],{"03fd":function(e,t,n){"use strict";n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return o})),n.d(t,"a",(function(){return a}));var a={guiPage:n("1d79").default,guiHeaderLeading:n("12a0").default,lPainter:n("4810").default,lPainterImage:n("7ce1").default,lPainterView:n("ffa7").default,lPainterText:n("159e").default},i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("gui-page",{ref:"guiPage",attrs:{isLoading:e.pageLoading,fullPage:!0,customHeader:!0,statusBarStyle:"background:#FFFFFF;height:0;",headerStyle:"background:rgba(0,0,0,0);height:0;",isHeaderSized:!1}},[n("v-uni-view",{attrs:{slot:"gHeader"},slot:"gHeader"},[n("v-uni-view",{staticClass:"gui-flex gui-nowrap gui-rows gui-align-items-center gui-padding mt30"},[n("gui-header-leading",{attrs:{onlyBack:!0,buttonStyle:"color:#000000;"}})],1)],1),n("v-uni-view",{staticClass:"fullPage gui-flex gui-justify-content-center gui-align-items-center gui-wrap",attrs:{slot:"gBody"},slot:"gBody"},[n("v-uni-canvas",{staticStyle:{width:"750rpx",height:"1624rpx"}},[n("img",{staticStyle:{width:"750rpx","-webkit-touch-callout":"default"},attrs:{src:e.path}})]),e.userInfo&&""!=e.userCode?n("l-painter",{ref:"painter",staticClass:"lime-painter",attrs:{type:"2d",isCanvasToTempFilePath:!0,css:"width:750rpx;height:1624rpx;background:#FFFFFF;"},on:{success:function(t){arguments[0]=t=e.$handleEvent(t),e.path=t}}},[n("l-painter-image",{attrs:{src:e.bgImg,css:"width:750rpx;height:1624rpx;"}}),n("l-painter-view",[n("l-painter-text",{attrs:{text:e.userInfo.inviteCode,css:"color:#f18f2c;font-wight:bold;font-size:40rpx;text-align:center;width:750rpx;margin-top:-524rpx;"}})],1),n("l-painter-image",{attrs:{src:e.userCode,css:"width:196rpx;height:196rpx;margin-top:-744rpx;margin-left:278rpx;"}})],1):e._e(),""!=e.path?n("v-uni-view",{staticClass:"saveBtn fb cFFFFFF",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.savePicture.apply(void 0,arguments)}}},[e._v("保存图片")]):e._e()],1)],1)},o=[]},"075e":function(e,t,n){"use strict";n.r(t);var a=n("03fd"),i=n("676d");for(var o in i)["default"].indexOf(o)<0&&function(e){n.d(t,e,(function(){return i[e]}))}(o);n("34f8");var r=n("f0c5"),u=Object(r["a"])(i["default"],a["b"],a["c"],!1,null,"6dc0502d",null,!1,a["a"],void 0);t["default"]=u.exports},"12a0":function(e,t,n){"use strict";n.r(t);var a=n("4246"),i=n("492a");for(var o in i)["default"].indexOf(o)<0&&function(e){n.d(t,e,(function(){return i[e]}))}(o);n("a06d");var r=n("f0c5"),u=Object(r["a"])(i["default"],a["b"],a["c"],!1,null,"b9757aca",null,!1,a["a"],void 0);t["default"]=u.exports},"20a0":function(e,t,n){var a=n("24fb");t=a(!1),t.push([e.i,"uni-page-body[data-v-6dc0502d]{/* background-image:linear-gradient(to bottom,#3eb075,#FFFFFF); */background-color:#}body.?%PAGE?%[data-v-6dc0502d]{background-color:#}\n/* .gui-page-loading-color{background-color:#FFFFFF;} */.lime-painter[data-v-6dc0502d]{position:fixed;left:%?2000?%}.saveBtn[data-v-6dc0502d]{position:fixed;z-index:999;width:%?260?%;text-align:center;font-size:%?40?%;height:%?90?%;line-height:%?90?%;border-radius:%?45?%;background-color:#f18f2c;bottom:%?30?%;left:%?245?%}.h5Desc[data-v-6dc0502d]{text-align:center;font-size:%?28?%;color:#f18f2c;width:100%;position:fixed;left:0;bottom:%?30?%}",""]),e.exports=t},"34f8":function(e,t,n){"use strict";var a=n("a102"),i=n.n(a);i.a},4246:function(e,t,n){"use strict";n.d(t,"b",(function(){return a})),n.d(t,"c",(function(){return i})),n.d(t,"a",(function(){}));var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.onlyBack?n("v-uni-view",{staticClass:"gui-header-leader",staticStyle:{padding:"0"}},[n("v-uni-view",{staticClass:"gui-header-leader-btns",attrs:{"hover-class":"gui-tap"}},[n("v-uni-text",{staticClass:"gui-header-leader-btns gui-block-text gui-icons gui-primary-color",style:"text-align:left; "+e.buttonStyle,attrs:{"hover-class":"gui-tap"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.goback.apply(void 0,arguments)}}},[e._v("")])],1)],1):e.onlyHome?n("v-uni-view",{staticClass:"gui-header-leader",staticStyle:{padding:"0"}},[n("v-uni-view",{staticClass:"gui-header-leader-btns",attrs:{"hover-class":"gui-tap"}},[n("v-uni-text",{staticClass:"gui-header-leader-btns gui-block-text gui-icons gui-primary-color",style:"text-align:left; font-size:35rpx; "+e.buttonStyle,on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.gohome.apply(void 0,arguments)}}},[e._v("")])],1)],1):n("v-uni-view",{staticClass:"gui-header-leader gui-flex gui-rows gui-nowrap gui-align-items-center gui-header-buttons-bg gui-border-box",style:e.bgStyle},[n("v-uni-view",{staticClass:"gui-header-leader-btns",attrs:{"hover-class":"gui-tap"}},[n("v-uni-text",{staticClass:"gui-header-leader-btns gui-block-text gui-icons gui-header-buttons-color",style:"font-size:35rpx; "+e.buttonStyle,on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.gohome.apply(void 0,arguments)}}},[e._v("")])],1),n("v-uni-view",{staticClass:"gui-header-leader-btns",staticStyle:{"margin-left":"12rpx"},attrs:{"hover-class":"gui-tap"}},[n("v-uni-text",{staticClass:"gui-header-leader-btns gui-block-text gui-icons gui-header-buttons-color",style:e.buttonStyle,on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.goback.apply(void 0,arguments)}}},[e._v("")])],1)],1)},i=[]},"492a":function(e,t,n){"use strict";n.r(t);var a=n("50ed"),i=n.n(a);for(var o in a)["default"].indexOf(o)<0&&function(e){n.d(t,e,(function(){return a[e]}))}(o);t["default"]=i.a},"50ed":function(e,t,n){"use strict";n("7a82"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a={name:"gui-header-leading",props:{homePage:{type:String,default:"/pages/index/index"},bgStyle:{type:String,default:""},buttonStyle:{type:String,default:""},onlyBack:{type:Boolean,default:!1},onlyHome:{type:Boolean,default:!1}},methods:{goback:function(){uni.navigateBack({delta:1}),this.$emit("goback")},gohome:function(){""!=this.homePage&&uni.switchTab({url:this.homePage}),this.$emit("gohome")}}};t.default=a},"676d":function(e,t,n){"use strict";n.r(t);var a=n("b1da"),i=n.n(a);for(var o in a)["default"].indexOf(o)<0&&function(e){n.d(t,e,(function(){return a[e]}))}(o);t["default"]=i.a},9136:function(e,t,n){"use strict";n("7a82");var a=n("4ea4").default;Object.defineProperty(t,"__esModule",{value:!0}),t.base64ToPath=function(e){return new Promise((function(t,n){if("object"===("undefined"===typeof window?"undefined":(0,i.default)(window))&&"document"in window){e=e.split(",");var a=e[0].match(/:(.*?);/)[1],u=atob(e[1]),d=u.length,s=new Uint8Array(d);while(d--)s[d]=u.charCodeAt(d);return t((window.URL||window.webkitURL).createObjectURL(new Blob([s],{type:a})))}var c=e.split(",")[0].match(/data\:\S+\/(\S+);/);c?c=c[1]:n(new Error("base64 error"));var l=function(){return Date.now()+String(r++)}()+"."+c;if("object"!==("undefined"===typeof plus?"undefined":(0,i.default)(plus)))if("object"===("undefined"===typeof wx?"undefined":(0,i.default)(wx))&&wx.canIUse("getFileSystemManager")){f=wx.env.USER_DATA_PATH+"/"+l;wx.getFileSystemManager().writeFile({filePath:f,data:o(e),encoding:"base64",success:function(){t(f)},fail:function(e){n(e)}})}else n(new Error("not support"));else{var f="_doc/uniapp_temp/"+l;if(!function(e,t){for(var n=e.split("."),a=t.split("."),i=!1,o=0;o<a.length;o++){var r=n[o]-a[o];if(0!==r){i=r>0;break}}return i}("Android"===plus.os.name?"1.9.9.80627":"1.9.9.80472",plus.runtime.innerVersion))return void plus.io.resolveLocalFileSystemURL("_doc",(function(a){a.getDirectory("uniapp_temp",{create:!0,exclusive:!1},(function(a){a.getFile(l,{create:!0,exclusive:!1},(function(a){a.createWriter((function(a){a.onwrite=function(){t(f)},a.onerror=n,a.seek(0),a.writeAsBinary(o(e))}),n)}),n)}),n)}),n);var g=new plus.nativeObj.Bitmap(l);g.loadBase64Data(e,(function(){g.save(f,{},(function(){g.clear(),t(f)}),(function(e){g.clear(),n(e)}))}),(function(e){g.clear(),n(e)}))}}))},t.pathToBase64=function(e){return new Promise((function(t,n){if("object"===("undefined"===typeof window?"undefined":(0,i.default)(window))&&"document"in window){if("function"===typeof FileReader){var a=new XMLHttpRequest;return a.open("GET",e,!0),a.responseType="blob",a.onload=function(){if(200===this.status){var e=new FileReader;e.onload=function(e){t(e.target.result)},e.onerror=n,e.readAsDataURL(this.response)}},a.onerror=n,void a.send()}var o=document.createElement("canvas"),r=o.getContext("2d"),u=new Image;return u.onload=function(){o.width=u.width,o.height=u.height,r.drawImage(u,0,0),t(o.toDataURL()),o.height=o.width=0},u.onerror=n,void(u.src=e)}"object"!==("undefined"===typeof plus?"undefined":(0,i.default)(plus))?"object"===("undefined"===typeof wx?"undefined":(0,i.default)(wx))&&wx.canIUse("getFileSystemManager")?wx.getFileSystemManager().readFile({filePath:e,encoding:"base64",success:function(e){t("data:image/png;base64,"+e.data)},fail:function(e){n(e)}}):n(new Error("not support")):plus.io.resolveLocalFileSystemURL(function(e){if(0===e.indexOf("_www")||0===e.indexOf("_doc")||0===e.indexOf("_documents")||0===e.indexOf("_downloads"))return e;if(0===e.indexOf("file://"))return e;if(0===e.indexOf("/storage/emulated/0/"))return e;if(0===e.indexOf("/")){var t=plus.io.convertAbsoluteFileSystem(e);if(t!==e)return t;e=e.substr(1)}return"_www/"+e}(e),(function(e){e.file((function(e){var a=new plus.io.FileReader;a.onload=function(e){t(e.target.result)},a.onerror=function(e){n(e)},a.readAsDataURL(e)}),(function(e){n(e)}))}),(function(e){n(e)}))}))};var i=a(n("53ca"));function o(e){var t=e.split(",");return t[t.length-1]}n("c975"),n("d3b7"),n("d9e2"),n("d401"),n("ac1f"),n("466d"),n("81b2"),n("0eb6"),n("b7ef"),n("8bd4"),n("ace4"),n("5cc6"),n("907a"),n("9a8c"),n("a975"),n("735e"),n("c1ac"),n("d139"),n("3a7b"),n("986a"),n("1d02"),n("d5d6"),n("82f8"),n("e91f"),n("60bd"),n("5f96"),n("3280"),n("3fcc"),n("ca91"),n("25a1"),n("cd26"),n("3c5d"),n("2954"),n("649e"),n("219c"),n("b39a"),n("72f7"),n("3ca3"),n("ddb0"),n("2b3d"),n("9861");var r=0},a06d:function(e,t,n){"use strict";var a=n("fef7"),i=n.n(a);i.a},a102:function(e,t,n){var a=n("20a0");a.__esModule&&(a=a.default),"string"===typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);var i=n("4f06").default;i("ef8fe23a",a,!0,{sourceMap:!1,shadowMode:!1})},b1da:function(e,t,n){"use strict";n("7a82"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,n("d401"),n("81b2"),n("0eb6"),n("b7ef"),n("8bd4"),n("c19f"),n("ace4"),n("d3b7"),n("5cc6"),n("907a"),n("9a8c"),n("a975"),n("735e"),n("c1ac"),n("d139"),n("3a7b"),n("986a"),n("1d02"),n("d5d6"),n("82f8"),n("e91f"),n("60bd"),n("5f96"),n("3280"),n("3fcc"),n("ca91"),n("25a1"),n("cd26"),n("3c5d"),n("2954"),n("649e"),n("219c"),n("b39a"),n("72f7"),n("3ca3"),n("ddb0"),n("2b3d"),n("9861");var a,i=n("9136"),o={data:function(){return{pageLoading:!0,path:"",userCode:"",userInfo:null,backgroundImg:"",bgImg:""}},watch:{path:function(e){""!=e&&(a.pageLoading=!1)}},onShow:function(){},onLoad:function(){a=this,a.userInfo=uni.getStorageSync("userInfo"),a.getIndexShareCover()},onReady:function(){a.windowHeight=uni.gJS.system().windowHeight},methods:{savePicture:function(){for(var e=a.path,t=e.split(","),n=atob(t[1]),i=new ArrayBuffer(n.length),o=new Uint8Array(i),r=0;r<n.length;r++)o[r]=n.charCodeAt(r);var u=new Blob([i],{type:"application/octet-stream"}),d=URL.createObjectURL(u),s=document.createElement("a");s.href=d,s.download=(new Date).valueOf()+".png";var c=document.createEvent("MouseEvents");c.initMouseEvent("click",!0,!1,window,0,0,0,0,0,!1,!1,!1,!1,0,null),s.dispatchEvent(c),URL.revokeObjectURL(d)},getIndexShareCover:function(){uni.gRequest.post("swoft/api/config/getIndexShareCover",{data:{}},(function(e){0==e.code&&(a.backgroundImg=e.data.indexShareCoverPath,a.getUserCode(),uni.downloadFile({url:e.data.indexShareCoverPath,success:function(e){200===e.statusCode?(0,i.pathToBase64)(e.tempFilePath).then((function(e){a.bgImg=e})).catch((function(e){a.$refs.guiPage.openMessage("default","图片转码失败",!0,1500)})):a.$refs.guiPage.openMessage("default","图片下载失败",!0,1500)},fail:function(e){a.$refs.guiPage.openMessage("default","图片下载失败",!0,1500)}}))}),(function(e){a.$refs.guiPage.openMessage("default","请求错误",!0,1500)}),(function(e){}),!0,!0)},getUserCode:function(){uni.gRequest.post("swoft/api/user/getUserCode",{data:{uid:uni.getStorageSync("userInfo").id}},(function(e){0==e.code&&(a.userCode=e.data)}),(function(e){a.$refs.guiPage.openMessage("default","请求错误",!0,1500)}),(function(e){3==e.data.code&&(a.$refs.guiPage.openMessage("default","请重新登录",!0,1500),setTimeout((function(){uni.gRequest.gotoLogin()}),1500))}),!0,!0)},saveImage:function(){a.pageLoading=!0,uni.saveImageToPhotosAlbum({filePath:a.path,success:function(e){a.pageLoading=!1,a.$refs.guiPage.openMessage("success","已保存到相册",!0,1500)},fail:function(e){a.pageLoading=!1,a.$refs.guiPage.openMessage("default","保存失败,请确定是否开启相应权限",!0,1500)}})}}};t.default=o},f5ed:function(e,t,n){var a=n("24fb");t=a(!1),t.push([e.i,".gui-header-leader[data-v-b9757aca]{height:%?55?%;border-radius:%?55?%;overflow:hidden;padding:0 %?25?%}.gui-header-leader-btns[data-v-b9757aca]{width:%?40?%;line-height:%?55?%;font-size:%?30?%;text-align:center;margin:%?0?%;overflow:hidden}",""]),e.exports=t},fef7:function(e,t,n){var a=n("f5ed");a.__esModule&&(a=a.default),"string"===typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);var i=n("4f06").default;i("6a81b978",a,!0,{sourceMap:!1,shadowMode:!1})}}]);