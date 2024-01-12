(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-my-setting-auto"],{"0364":function(e,t,r){"use strict";r("7a82"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,r("a9e3");var a={name:"gui-image",props:{src:{type:String,default:""},mode:{type:String,default:"widthFix"},width:{type:Number,default:300},height:{type:Number,default:0},timer:{type:Number,default:200},borderRadius:{type:String,default:"0rpx"}},data:function(){return{isLoading:!0,imgHeight:180,opacity:0,animate:!1,failed:!1}},methods:{imgLoad:function(e){var t=this,r=e.detail.width/e.detail.height;this.imgHeight=this.width/r,this.animate=!0,setTimeout((function(){t.isLoading=!1,t.opacity=1}),this.timer)},error:function(){this.isLoading=!1,this.failed=!0}}};t.default=a},"084d":function(e,t,r){"use strict";var a=r("4ea4").default,i=a(r("53ca"));r("e9c4"),r("ac1f"),r("5319"),r("4d63"),r("c607"),r("2c3e"),r("25f0"),r("00b4"),r("c975"),r("7db0"),r("d3b7"),r("a9e3");var n=a(r("81b8"));e.exports={error:"",check:function(e,t){e=JSON.stringify(e);for(var r=JSON.parse(e),a=0;a<t.length;a++){if(!t[a].checkType)return!0;if(!t[a].name)return!0;if(!t[a].errorMsg)return!0;if("undefined"==typeof r[t[a].name]||""===r[t[a].name])return this.error=t[a].errorMsg,!1;switch("string"==typeof r[t[a].name]&&(r[t[a].name]=r[t[a].name].replace(/\s/g,"")),t[a].checkType){case"string":var s=new RegExp("^.{"+t[a].checkRule+"}$");if(!s.test(r[t[a].name]))return this.error=t[a].errorMsg,!1;break;case"contain":var o=r[t[a].name]+"";if(-1==o.indexOf(t[a].checkRule))return this.error=t[a].errorMsg,!1;break;case"notContain":o=r[t[a].name]+"";if(-1!=o.indexOf(t[a].checkRule))return this.error=t[a].errorMsg,!1;break;case"inArray":if("object"!=(0,i.default)(t[a].checkRule))return this.error=t[a].errorMsg,!1;var d=t[a].checkRule.find((function(e){if(e==r[t[a].name])return!0}));if(!d)return this.error=t[a].errorMsg,!1;break;case"notInArray":if("object"!=(0,i.default)(t[a].checkRule))return this.error=t[a].errorMsg,!1;d=t[a].checkRule.find((function(e){if(e==r[t[a].name])return!0}));if(d)return this.error=t[a].errorMsg,!1;break;case"int":var u=t[a].checkRule.split(",");t.length<2?(u[0]=Number(u[0])-1,u[1]=""):(u[0]=Number(u[0])-1,u[1]=Number(u[1])-1);s=new RegExp("^-?\\d{"+u[0]+","+u[1]+"}$");if(!s.test(r[t[a].name]))return this.error=t[a].errorMsg,!1;break;case"between":if(!this.isNumber(r[t[a].name]))return this.error=t[a].errorMsg,!1;var c=t[a].checkRule.split(",");if(c[0]=Number(c[0]),c[1]=Number(c[1]),r[t[a].name]>c[1]||r[t[a].name]<c[0])return this.error=t[a].errorMsg,!1;break;case"intBetween":s=/^-?\d+$/;if(!s.test(r[t[a].name]))return this.error=t[a].errorMsg,!1;c=t[a].checkRule.split(",");if(c[0]=Number(c[0]),c[1]=Number(c[1]),r[t[a].name]>c[1]||r[t[a].name]<c[0])return this.error=t[a].errorMsg,!1;break;case"betweenD":s=/^-?\d+$/;if(!s.test(r[t[a].name]))return this.error=t[a].errorMsg,!1;c=t[a].checkRule.split(",");if(c[0]=Number(c[0]),c[1]=Number(c[1]),r[t[a].name]>c[1]||r[t[a].name]<c[0])return this.error=t[a].errorMsg,!1;break;case"doubleBetween":s=/^-?\d?.+\d+$/;if(!s.test(r[t[a].name]))return this.error=t[a].errorMsg,!1;c=t[a].checkRule.split(",");if(c[0]=Number(c[0]),c[1]=Number(c[1]),r[t[a].name]>c[1]||r[t[a].name]<c[0])return this.error=t[a].errorMsg,!1;break;case"betweenF":s=/^-?\d?.+\d+$/;if(!s.test(r[t[a].name]))return this.error=t[a].errorMsg,!1;c=t[a].checkRule.split(",");if(c[0]=Number(c[0]),c[1]=Number(c[1]),r[t[a].name]>c[1]||r[t[a].name]<c[0])return this.error=t[a].errorMsg,!1;break;case"doubleLength":s=new RegExp("^-?\\d+.\\d{"+t[a].checkRule+"}$");if(!s.test(r[t[a].name]))return this.error=t[a].errorMsg,!1;break;case"gt":if(r[t[a].name]<=t[a].checkRule)return this.error=t[a].errorMsg,!1;break;case"gtAndSame":if(r[t[a].name]<t[a].checkRule)return this.error=t[a].errorMsg,!1;break;case"lt":if(r[t[a].name]>=t[a].checkRule)return this.error=t[a].errorMsg,!1;break;case"ltAndSame":if(r[t[a].name]>t[a].checkRule)return this.error=t[a].errorMsg,!1;break;case"same":if(r[t[a].name]!=t[a].checkRule)return this.error=t[a].errorMsg,!1;break;case"notSame":if(r[t[a].name]==t[a].checkRule)return this.error=t[a].errorMsg,!1;break;case"notsame":if(r[t[a].name]==t[a].checkRule)return this.error=t[a].errorMsg,!1;break;case"email":s=/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;if(!s.test(r[t[a].name]))return this.error=t[a].errorMsg,!1;break;case"phoneno":s=/^1[0-9]{10,10}$/;if(!s.test(r[t[a].name]))return this.error=t[a].errorMsg,!1;break;case"phone":s=/^1[0-9]{10,10}$/;if(!s.test(r[t[a].name]))return this.error=t[a].errorMsg,!1;break;case"zipcode":s=/^[0-9]{6}$/;if(!s.test(r[t[a].name]))return this.error=t[a].errorMsg,!1;break;case"reg":s=new RegExp(t[a].checkRule);if(!s.test(r[t[a].name]))return this.error=t[a].errorMsg,!1;break;case"in":if(-1==t[a].checkRule.indexOf(r[t[a].name]))return this.error=t[a].errorMsg,!1;break;case"notnull":if(null==r[t[a].name]||r[t[a].name].length<1)return this.error=t[a].errorMsg,!1;break;case"samewith":if(r[t[a].name]!=r[t[a].checkRule])return this.error=t[a].errorMsg,!1;break;case"numbers":s=new RegExp("^[0-9]{"+t[a].checkRule+"}$");if(!s.test(r[t[a].name]))return this.error=t[a].errorMsg,!1;break;case"url":s=/^(\w+:\/\/)?\w+(\.\w+)+.*$/;if(!s.test(r[t[a].name]))return this.error=t[a].errorMsg,!1;break;case"idCard":var f=n.default.checkIdcard(r[t[a].name]);if("ok"!=f)return this.error=f,!1;break}}return!0},isNumber:function(e){return e=Number(e),NaN!=e}}},"17f1":function(e,t,r){"use strict";r.d(t,"b",(function(){return a})),r.d(t,"c",(function(){return i})),r.d(t,"a",(function(){}));var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-uni-view",{staticClass:"gui-img gui-flex gui-align-items-center gui-justify-content-center",style:{width:e.width+"rpx",height:0==e.height?e.imgHeight+"rpx":e.height+"rpx",borderRadius:e.borderRadius}},[r("v-uni-image",{style:{width:e.width+"rpx",height:e.imgHeight+"rpx",borderRadius:e.borderRadius,opacity:e.opacity},attrs:{src:e.src,mode:e.mode},on:{load:function(t){arguments[0]=t=e.$handleEvent(t),e.imgLoad.apply(void 0,arguments)},error:function(t){arguments[0]=t=e.$handleEvent(t),e.error.apply(void 0,arguments)}}}),e.isLoading?r("v-uni-text",{staticClass:"gui-img-loading gui-icons",class:[e.animate?"gui-fade-out":""],style:{width:e.width+"rpx",height:0==e.height?e.imgHeight+"rpx":e.height+"rpx",lineHeight:0==e.height?e.imgHeight+"rpx":e.height+"rpx",borderRadius:e.borderRadius}},[e._v("")]):e._e(),e.failed?r("v-uni-text",{staticClass:"gui-img-loading gui-icons",class:[e.animate?"gui-fade-out":""],style:{width:e.width+"rpx",height:0==e.height?e.imgHeight+"rpx":e.height+"rpx",lineHeight:0==e.height?e.imgHeight+"rpx":e.height+"rpx",borderRadius:e.borderRadius}},[e._v("")]):e._e()],1)},i=[]},"237c":function(e,t,r){"use strict";r.d(t,"b",(function(){return i})),r.d(t,"c",(function(){return n})),r.d(t,"a",(function(){return a}));var a={guiPage:r("1d79").default,guiImage:r("e1fa").default},i=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("gui-page",{ref:"guiPage",attrs:{isLoading:e.pageLoading}},[r("v-uni-view",{attrs:{slot:"gBody"},slot:"gBody"},[r("v-uni-view",{staticClass:"mt20 bgff"},[r("v-uni-view",{staticClass:"gui-idcard-items gui-img-in gui-flex gui-rows gui-justify-content-center"},[r("v-uni-view",{staticClass:"gui-idcard-items-image p20",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.selectImg1.apply(void 0,arguments)}}},[r("gui-image",{attrs:{src:""!=e.idCardFont?e.idCardFont:"/static/images/setting/zheng.png",width:440,height:328}})],1)],1),r("v-uni-view",{staticClass:"f28 gui-text-center gui-text p20"},[e._v("上传身份证正面")]),r("v-uni-view",{staticClass:"gui-idcard-items gui-img-in gui-flex gui-rows gui-justify-content-center"},[r("v-uni-view",{staticClass:"gui-idcard-items-image p20",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.selectImg2.apply(void 0,arguments)}}},[r("gui-image",{attrs:{src:""!=e.idCardBack?e.idCardBack:"/static/images/setting/fan.png",width:440,height:328}})],1)],1),r("v-uni-view",{staticClass:"f28 gui-text-center gui-text p20"},[e._v("上传身份证反面")])],1),r("v-uni-view",{staticClass:"mt20"},[r("v-uni-view",{staticClass:"gui-flex gui-align-items-center gui-space-between bgff list-item plr40 gui-relative borderBottom"},[r("v-uni-view",{staticClass:"f28"},[e._v("姓名")]),r("v-uni-view",{staticClass:"gui-flex gui-align-items-center"},[r("v-uni-input",{staticClass:"f28 gui-text-right",attrs:{placeholder:"请输入姓名"},model:{value:e.name,callback:function(t){e.name=t},expression:"name"}})],1)],1),r("v-uni-view",{staticClass:"gui-flex gui-align-items-center gui-space-between bgff list-item plr40"},[r("v-uni-view",{staticClass:"f28"},[e._v("身份证号")]),r("v-uni-view",{staticClass:"gui-flex gui-align-items-center"},[r("v-uni-input",{staticClass:"f28 gui-text-right",attrs:{placeholder:"请输入身份证号"},model:{value:e.idCard,callback:function(t){e.idCard=t},expression:"idCard"}})],1)],1),r("v-uni-view",{staticClass:"wp100 gui-fixed-lb ptb20"},[r("v-uni-view",{staticClass:"btnff4f00 mauto",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.doAuto.apply(void 0,arguments)}}},[e._v("确定")])],1)],1)],1)],1)},n=[]},"3e58":function(e,t,r){"use strict";r.r(t);var a=r("237c"),i=r("c4be");for(var n in i)["default"].indexOf(n)<0&&function(e){r.d(t,e,(function(){return i[e]}))}(n);r("8a36");var s=r("f0c5"),o=Object(s["a"])(i["default"],a["b"],a["c"],!1,null,"4556da95",null,!1,a["a"],void 0);t["default"]=o.exports},"634f":function(e,t,r){"use strict";r("7a82"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,r("ac1f"),r("5319");var a,i=r("9136"),n=r("084d"),s={data:function(){return{pageLoading:!1,idCardFont:"",idCardFontBase64:"",idCardBack:"",idCardBackBase64:"",name:"",idCard:""}},onLoad:function(){a=this},methods:{selectImg1:function(){uni.chooseImage({count:1,sizeType:["compressed"],sourceType:["album","camera"],success:function(e){a.idCardFont=e.tempFilePaths[0],(0,i.pathToBase64)(e.tempFilePaths[0]).then((function(e){a.idCardFontBase64=e.replace(/^data:image\/\w+;base64,/,""),a.getIdCardIdent(a.idCardFontBase64,"font")})).catch((function(e){a.$refs.guiPage.openMessage("default","图片转码失败",!0,1500)}))}})},selectImg2:function(){uni.chooseImage({count:1,sizeType:["compressed"],sourceType:["album","camera"],success:function(e){a.idCardBack=e.tempFilePaths[0],(0,i.pathToBase64)(e.tempFilePaths[0]).then((function(e){a.idCardBackBase64=e.replace(/^data:image\/\w+;base64,/,""),a.getIdCardIdent(a.idCardBackBase64,"back")})).catch((function(e){a.$refs.guiPage.openMessage("default","图片转码失败",!0,1500)}))}})},getIdCardIdent:function(e,t){a.pageLoading=!0,uni.gRequest.post("swoft/api/user/getIdCardIdent",{data:{image:e,side:t}},(function(e){0==e.error_code?"font"==t?e.result.realname&&e.result.idcard?(a.name=e.result.realname,a.idCard=e.result.idcard,a.$refs.guiPage.openMessage("success","识别成功",!0,1500)):(a.$refs.guiPage.openMessage("default","未识别到身份证信息",!0,1500),a.idCardFont="",a.idCardFontBase64=""):e.result.begin&&e.result.department?a.$refs.guiPage.openMessage("success","识别成功",!0,1500):(a.$refs.guiPage.openMessage("default","未识别到身份证信息",!0,1500),a.idCardBack="",a.idCardBackBase64=""):(a.$refs.guiPage.openMessage("default",e.reason,!0,1500),"font"==t?(a.idCardFont="",a.idCardFontBase64=""):(a.idCardBack="",a.idCardBackBase64=""))}),(function(e){a.$refs.guiPage.openMessage("default","请求错误",!0,1500),"font"==t?(a.idCardFont="",a.idCardFontBase64=""):(a.idCardBack="",a.idCardBackBase64="")}),(function(e){a.pageLoading=!1}),!0,!0)},doAuto:function(){if(""==a.idCardFontBase64)return a.$refs.guiPage.openMessage("default","请上传身份证正面",!0,1500),!1;if(""==a.idCardBackBase64)return a.$refs.guiPage.openMessage("default","请上传身份证反面",!0,1500),!1;var e={};e.name=a.name,e.idCard=a.idCard;var t=n.check(e,[{name:"name",checkType:"notnull",checkRule:"",errorMsg:"请输入姓名"},{name:"idCard",checkType:"notnull",checkRule:"",errorMsg:"请输入身份证号"},{name:"idCard",checkType:"idCard",checkRule:"",errorMsg:"身份证号格式不正确"}]);if(!t)return a.$refs.guiPage.openMessage("default",n.error,!0,1500),!1;e.infoPage=encodeURIComponent(a.idCardFontBase64),e.emblemPage=encodeURIComponent(a.idCardBackBase64),e.uid=uni.getStorageSync("userInfo").id,e.tel=uni.getStorageSync("userInfo").tel,a.pageLoading=!0,uni.gRequest.post("swoft/api/dalong/addStaff",{data:e},(function(e){2e4==e.code?(a.$refs.guiPage.openMessage("success",e.msg,!0,1500),a.getUserInfo(),setTimeout((function(){uni.navigateBack({delta:1})}),1500)):a.$refs.guiPage.openMessage("default",e.msg,!0,1500)}),(function(e){a.$refs.guiPage.openMessage("default","请求错误",!0,1500)}),(function(e){a.pageLoading=!1,3==e.data.code&&(a.$refs.guiPage.openMessage("default","请重新登录",!0,1500),setTimeout((function(){uni.gRequest.gotoLogin()}),1500))}),!0,!0)},getUserInfo:function(){uni.gRequest.post("swoft/api/user/getUserInfo",{data:{id:uni.getStorageSync("userInfo").id}},(function(e){0==e.code?uni.setStorageSync("userInfo",e.data):a.$refs.guiPage.openMessage("default",e.msg,!0,1500)}),(function(e){a.$refs.guiPage.openMessage("default","请求错误",!0,1500)}),(function(e){}),!0,!0)}}};t.default=s},"7fb3":function(e,t,r){"use strict";var a=r("c9f6"),i=r.n(a);i.a},"81b8":function(e,t,r){"use strict";r("7a82"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,r("e25e"),r("ac1f"),r("00b4");var a={checkIdcard:function(e){var t,r,a,i,n=new Array("ok","身份证号码位数错误","身份证号码出生日期错误","身份证号码校验错误","身份证地区错误"),s=new Array;if(s=e.split(""),null=={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"}[parseInt(e.substr(0,2))])return n[4];switch(e.length){case 15:return r=(parseInt(e.substr(6,2))+1900)%4==0||(parseInt(e.substr(6,2))+1900)%100==0&&(parseInt(e.substr(6,2))+1900)%4==0?/^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/:/^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/,r.test(e)?n[0]:n[2];case 18:return r=parseInt(e.substr(6,4))%4==0||parseInt(e.substr(6,4))%100==0&&parseInt(e.substr(6,4))%4==0?/^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/:/^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/,r.test(e)?(a=7*(parseInt(s[0])+parseInt(s[10]))+9*(parseInt(s[1])+parseInt(s[11]))+10*(parseInt(s[2])+parseInt(s[12]))+5*(parseInt(s[3])+parseInt(s[13]))+8*(parseInt(s[4])+parseInt(s[14]))+4*(parseInt(s[5])+parseInt(s[15]))+2*(parseInt(s[6])+parseInt(s[16]))+1*parseInt(s[7])+6*parseInt(s[8])+3*parseInt(s[9]),t=a%11,"F","10X98765432",i="10X98765432".substr(t,1),i==s[17]?n[0]:n[3]):n[2];default:return n[1]}}};t.default=a},"8a36":function(e,t,r){"use strict";var a=r("9f46"),i=r.n(a);i.a},9136:function(e,t,r){"use strict";r("7a82");var a=r("4ea4").default;Object.defineProperty(t,"__esModule",{value:!0}),t.base64ToPath=function(e){return new Promise((function(t,r){if("object"===("undefined"===typeof window?"undefined":(0,i.default)(window))&&"document"in window){e=e.split(",");var a=e[0].match(/:(.*?);/)[1],o=atob(e[1]),d=o.length,u=new Uint8Array(d);while(d--)u[d]=o.charCodeAt(d);return t((window.URL||window.webkitURL).createObjectURL(new Blob([u],{type:a})))}var c=e.split(",")[0].match(/data\:\S+\/(\S+);/);c?c=c[1]:r(new Error("base64 error"));var f=function(){return Date.now()+String(s++)}()+"."+c;if("object"!==("undefined"===typeof plus?"undefined":(0,i.default)(plus)))if("object"===("undefined"===typeof wx?"undefined":(0,i.default)(wx))&&wx.canIUse("getFileSystemManager")){g=wx.env.USER_DATA_PATH+"/"+f;wx.getFileSystemManager().writeFile({filePath:g,data:n(e),encoding:"base64",success:function(){t(g)},fail:function(e){r(e)}})}else r(new Error("not support"));else{var g="_doc/uniapp_temp/"+f;if(!function(e,t){for(var r=e.split("."),a=t.split("."),i=!1,n=0;n<a.length;n++){var s=r[n]-a[n];if(0!==s){i=s>0;break}}return i}("Android"===plus.os.name?"1.9.9.80627":"1.9.9.80472",plus.runtime.innerVersion))return void plus.io.resolveLocalFileSystemURL("_doc",(function(a){a.getDirectory("uniapp_temp",{create:!0,exclusive:!1},(function(a){a.getFile(f,{create:!0,exclusive:!1},(function(a){a.createWriter((function(a){a.onwrite=function(){t(g)},a.onerror=r,a.seek(0),a.writeAsBinary(n(e))}),r)}),r)}),r)}),r);var l=new plus.nativeObj.Bitmap(f);l.loadBase64Data(e,(function(){l.save(g,{},(function(){l.clear(),t(g)}),(function(e){l.clear(),r(e)}))}),(function(e){l.clear(),r(e)}))}}))},t.pathToBase64=function(e){return new Promise((function(t,r){if("object"===("undefined"===typeof window?"undefined":(0,i.default)(window))&&"document"in window){if("function"===typeof FileReader){var a=new XMLHttpRequest;return a.open("GET",e,!0),a.responseType="blob",a.onload=function(){if(200===this.status){var e=new FileReader;e.onload=function(e){t(e.target.result)},e.onerror=r,e.readAsDataURL(this.response)}},a.onerror=r,void a.send()}var n=document.createElement("canvas"),s=n.getContext("2d"),o=new Image;return o.onload=function(){n.width=o.width,n.height=o.height,s.drawImage(o,0,0),t(n.toDataURL()),n.height=n.width=0},o.onerror=r,void(o.src=e)}"object"!==("undefined"===typeof plus?"undefined":(0,i.default)(plus))?"object"===("undefined"===typeof wx?"undefined":(0,i.default)(wx))&&wx.canIUse("getFileSystemManager")?wx.getFileSystemManager().readFile({filePath:e,encoding:"base64",success:function(e){t("data:image/png;base64,"+e.data)},fail:function(e){r(e)}}):r(new Error("not support")):plus.io.resolveLocalFileSystemURL(function(e){if(0===e.indexOf("_www")||0===e.indexOf("_doc")||0===e.indexOf("_documents")||0===e.indexOf("_downloads"))return e;if(0===e.indexOf("file://"))return e;if(0===e.indexOf("/storage/emulated/0/"))return e;if(0===e.indexOf("/")){var t=plus.io.convertAbsoluteFileSystem(e);if(t!==e)return t;e=e.substr(1)}return"_www/"+e}(e),(function(e){e.file((function(e){var a=new plus.io.FileReader;a.onload=function(e){t(e.target.result)},a.onerror=function(e){r(e)},a.readAsDataURL(e)}),(function(e){r(e)}))}),(function(e){r(e)}))}))};var i=a(r("53ca"));function n(e){var t=e.split(",");return t[t.length-1]}r("c975"),r("d3b7"),r("d9e2"),r("d401"),r("ac1f"),r("466d"),r("81b2"),r("0eb6"),r("b7ef"),r("8bd4"),r("ace4"),r("5cc6"),r("907a"),r("9a8c"),r("a975"),r("735e"),r("c1ac"),r("d139"),r("3a7b"),r("986a"),r("1d02"),r("d5d6"),r("82f8"),r("e91f"),r("60bd"),r("5f96"),r("3280"),r("3fcc"),r("ca91"),r("25a1"),r("cd26"),r("3c5d"),r("2954"),r("649e"),r("219c"),r("b39a"),r("72f7"),r("3ca3"),r("ddb0"),r("2b3d"),r("9861");var s=0},"9f46":function(e,t,r){var a=r("ae2b");a.__esModule&&(a=a.default),"string"===typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);var i=r("4f06").default;i("91460d3e",a,!0,{sourceMap:!1,shadowMode:!1})},ae2b:function(e,t,r){var a=r("24fb");t=a(!1),t.push([e.i,'uni-page-body[data-v-4556da95]{font-family:MEDIUM}.mt46[data-v-4556da95]{margin-top:%?46?%}.mr30[data-v-4556da95]{margin-right:%?30?%}.mauto[data-v-4556da95]{margin:0 auto}.bgff[data-v-4556da95]{background-color:#fff}.bgF5D395[data-v-4556da95]{background-color:#f5d395}.p20[data-v-4556da95]{padding:%?20?%}.plr20[data-v-4556da95]{padding-left:%?20?%;padding-right:%?20?%}.ptb20[data-v-4556da95]{padding-top:%?20?%;padding-bottom:%?20?%}.mt20[data-v-4556da95]{margin-top:%?20?%}.mt30[data-v-4556da95]{margin-top:%?30?%}.ml10[data-v-4556da95]{margin-left:%?10?%}.ml20[data-v-4556da95]{margin-left:%?20?%}.mlr20[data-v-4556da95]{margin-left:%?20?%;margin-right:%?20?%}.mt10[data-v-4556da95]{margin-top:%?10?%}.mb10[data-v-4556da95]{margin-bottom:%?10?%}.f28[data-v-4556da95]{font-size:%?28?%}.f26[data-v-4556da95]{font-size:%?26?%}.f22[data-v-4556da95]{font-size:%?22?%}.f36[data-v-4556da95]{font-size:%?36?%}.f24[data-v-4556da95]{font-size:%?24?%}.c99[data-v-4556da95]{color:#666}.c989898[data-v-4556da95]{color:#989898}.cff4f00[data-v-4556da95]{color:#ff4f00}.c33[data-v-4556da95]{color:#333}.bgff4f00[data-v-4556da95]{background-color:#ff4f00}.btn1[data-v-4556da95]{width:%?200?%;height:%?90?%;border-radius:%?45?%;line-height:%?90?%;text-align:center}.btn2[data-v-4556da95]{width:%?196?%;height:%?86?%;border-radius:%?45?%;line-height:%?90?%;text-align:center}.tag1[data-v-4556da95]{height:%?40?%;border-radius:%?20?%;width:%?110?%;text-align:center;line-height:%?40?%}.tag2[data-v-4556da95]{height:%?40?%;border-radius:%?20?%;width:%?80?%;text-align:center;line-height:%?40?%}.btn-A[data-v-4556da95]{width:%?690?%;height:%?90?%;border-radius:45px;line-height:%?90?%;text-align:center;margin:0 auto}.border-ff4f00[data-v-4556da95]{border:%?1?% solid #ff4f00}.c66[data-v-4556da95]{color:#666}.cff[data-v-4556da95]{color:#fff}.no-scale[data-v-4556da95]{flex-shrink:0}.wp100[data-v-4556da95]{width:100%}.fw500[data-v-4556da95]{font-weight:500}.borderBottom[data-v-4556da95]:before{content:" ";position:absolute;bottom:0;left:0;right:0;border-bottom:1px solid #f1f1f1;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(.5);transform:scaleY(.5)}uni-page-body[data-v-4556da95]{background-color:#f5f5f9}body.?%PAGE?%[data-v-4556da95]{background-color:#f5f5f9}.list-item[data-v-4556da95]{height:%?90?%}.btnff4f00[data-v-4556da95]{width:%?690?%;height:%?90?%;background:#ff4f00;border-radius:%?45?%;text-align:center;line-height:%?90?%;color:#fff}',""]),e.exports=t},c4be:function(e,t,r){"use strict";r.r(t);var a=r("634f"),i=r.n(a);for(var n in a)["default"].indexOf(n)<0&&function(e){r.d(t,e,(function(){return a[e]}))}(n);t["default"]=i.a},c7c4:function(e,t,r){"use strict";r.r(t);var a=r("0364"),i=r.n(a);for(var n in a)["default"].indexOf(n)<0&&function(e){r.d(t,e,(function(){return a[e]}))}(n);t["default"]=i.a},c9f6:function(e,t,r){var a=r("e844");a.__esModule&&(a=a.default),"string"===typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);var i=r("4f06").default;i("faf62250",a,!0,{sourceMap:!1,shadowMode:!1})},e1fa:function(e,t,r){"use strict";r.r(t);var a=r("17f1"),i=r("c7c4");for(var n in i)["default"].indexOf(n)<0&&function(e){r.d(t,e,(function(){return i[e]}))}(n);r("7fb3");var s=r("f0c5"),o=Object(s["a"])(i["default"],a["b"],a["c"],!1,null,"398e8729",null,!1,a["a"],void 0);t["default"]=o.exports},e844:function(e,t,r){var a=r("24fb");t=a(!1),t.push([e.i,".gui-img[data-v-398e8729]{width:%?500?%;height:%?500?%;overflow:hidden;font-size:0;position:relative}.gui-img-loading[data-v-398e8729]{position:absolute;left:0;top:0;background-color:#f8f8f8;font-size:%?58?%;color:#d9d9d9;text-align:center}",""]),e.exports=t}}]);