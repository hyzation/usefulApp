(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-my-setting-addbankcard"],{"0011":function(e,r,t){"use strict";t.r(r);var a=t("dc84"),n=t("bb17");for(var i in n)["default"].indexOf(i)<0&&function(e){t.d(r,e,(function(){return n[e]}))}(i);t("b77c");var o=t("f0c5"),s=Object(o["a"])(n["default"],a["b"],a["c"],!1,null,"253cdc8e",null,!1,a["a"],void 0);r["default"]=s.exports},"084d":function(e,r,t){"use strict";var a=t("4ea4").default,n=a(t("53ca"));t("e9c4"),t("ac1f"),t("5319"),t("4d63"),t("c607"),t("2c3e"),t("25f0"),t("00b4"),t("c975"),t("7db0"),t("d3b7"),t("a9e3");var i=a(t("81b8"));e.exports={error:"",check:function(e,r){e=JSON.stringify(e);for(var t=JSON.parse(e),a=0;a<r.length;a++){if(!r[a].checkType)return!0;if(!r[a].name)return!0;if(!r[a].errorMsg)return!0;if("undefined"==typeof t[r[a].name]||""===t[r[a].name])return this.error=r[a].errorMsg,!1;switch("string"==typeof t[r[a].name]&&(t[r[a].name]=t[r[a].name].replace(/\s/g,"")),r[a].checkType){case"string":var o=new RegExp("^.{"+r[a].checkRule+"}$");if(!o.test(t[r[a].name]))return this.error=r[a].errorMsg,!1;break;case"contain":var s=t[r[a].name]+"";if(-1==s.indexOf(r[a].checkRule))return this.error=r[a].errorMsg,!1;break;case"notContain":s=t[r[a].name]+"";if(-1!=s.indexOf(r[a].checkRule))return this.error=r[a].errorMsg,!1;break;case"inArray":if("object"!=(0,n.default)(r[a].checkRule))return this.error=r[a].errorMsg,!1;var c=r[a].checkRule.find((function(e){if(e==t[r[a].name])return!0}));if(!c)return this.error=r[a].errorMsg,!1;break;case"notInArray":if("object"!=(0,n.default)(r[a].checkRule))return this.error=r[a].errorMsg,!1;c=r[a].checkRule.find((function(e){if(e==t[r[a].name])return!0}));if(c)return this.error=r[a].errorMsg,!1;break;case"int":var u=r[a].checkRule.split(",");r.length<2?(u[0]=Number(u[0])-1,u[1]=""):(u[0]=Number(u[0])-1,u[1]=Number(u[1])-1);o=new RegExp("^-?\\d{"+u[0]+","+u[1]+"}$");if(!o.test(t[r[a].name]))return this.error=r[a].errorMsg,!1;break;case"between":if(!this.isNumber(t[r[a].name]))return this.error=r[a].errorMsg,!1;var d=r[a].checkRule.split(",");if(d[0]=Number(d[0]),d[1]=Number(d[1]),t[r[a].name]>d[1]||t[r[a].name]<d[0])return this.error=r[a].errorMsg,!1;break;case"intBetween":o=/^-?\d+$/;if(!o.test(t[r[a].name]))return this.error=r[a].errorMsg,!1;d=r[a].checkRule.split(",");if(d[0]=Number(d[0]),d[1]=Number(d[1]),t[r[a].name]>d[1]||t[r[a].name]<d[0])return this.error=r[a].errorMsg,!1;break;case"betweenD":o=/^-?\d+$/;if(!o.test(t[r[a].name]))return this.error=r[a].errorMsg,!1;d=r[a].checkRule.split(",");if(d[0]=Number(d[0]),d[1]=Number(d[1]),t[r[a].name]>d[1]||t[r[a].name]<d[0])return this.error=r[a].errorMsg,!1;break;case"doubleBetween":o=/^-?\d?.+\d+$/;if(!o.test(t[r[a].name]))return this.error=r[a].errorMsg,!1;d=r[a].checkRule.split(",");if(d[0]=Number(d[0]),d[1]=Number(d[1]),t[r[a].name]>d[1]||t[r[a].name]<d[0])return this.error=r[a].errorMsg,!1;break;case"betweenF":o=/^-?\d?.+\d+$/;if(!o.test(t[r[a].name]))return this.error=r[a].errorMsg,!1;d=r[a].checkRule.split(",");if(d[0]=Number(d[0]),d[1]=Number(d[1]),t[r[a].name]>d[1]||t[r[a].name]<d[0])return this.error=r[a].errorMsg,!1;break;case"doubleLength":o=new RegExp("^-?\\d+.\\d{"+r[a].checkRule+"}$");if(!o.test(t[r[a].name]))return this.error=r[a].errorMsg,!1;break;case"gt":if(t[r[a].name]<=r[a].checkRule)return this.error=r[a].errorMsg,!1;break;case"gtAndSame":if(t[r[a].name]<r[a].checkRule)return this.error=r[a].errorMsg,!1;break;case"lt":if(t[r[a].name]>=r[a].checkRule)return this.error=r[a].errorMsg,!1;break;case"ltAndSame":if(t[r[a].name]>r[a].checkRule)return this.error=r[a].errorMsg,!1;break;case"same":if(t[r[a].name]!=r[a].checkRule)return this.error=r[a].errorMsg,!1;break;case"notSame":if(t[r[a].name]==r[a].checkRule)return this.error=r[a].errorMsg,!1;break;case"notsame":if(t[r[a].name]==r[a].checkRule)return this.error=r[a].errorMsg,!1;break;case"email":o=/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;if(!o.test(t[r[a].name]))return this.error=r[a].errorMsg,!1;break;case"phoneno":o=/^1[0-9]{10,10}$/;if(!o.test(t[r[a].name]))return this.error=r[a].errorMsg,!1;break;case"phone":o=/^1[0-9]{10,10}$/;if(!o.test(t[r[a].name]))return this.error=r[a].errorMsg,!1;break;case"zipcode":o=/^[0-9]{6}$/;if(!o.test(t[r[a].name]))return this.error=r[a].errorMsg,!1;break;case"reg":o=new RegExp(r[a].checkRule);if(!o.test(t[r[a].name]))return this.error=r[a].errorMsg,!1;break;case"in":if(-1==r[a].checkRule.indexOf(t[r[a].name]))return this.error=r[a].errorMsg,!1;break;case"notnull":if(null==t[r[a].name]||t[r[a].name].length<1)return this.error=r[a].errorMsg,!1;break;case"samewith":if(t[r[a].name]!=t[r[a].checkRule])return this.error=r[a].errorMsg,!1;break;case"numbers":o=new RegExp("^[0-9]{"+r[a].checkRule+"}$");if(!o.test(t[r[a].name]))return this.error=r[a].errorMsg,!1;break;case"url":o=/^(\w+:\/\/)?\w+(\.\w+)+.*$/;if(!o.test(t[r[a].name]))return this.error=r[a].errorMsg,!1;break;case"idCard":var f=i.default.checkIdcard(t[r[a].name]);if("ok"!=f)return this.error=f,!1;break}}return!0},isNumber:function(e){return e=Number(e),NaN!=e}}},"2dc7":function(e,r,t){var a=t("24fb");r=a(!1),r.push([e.i,'uni-page-body[data-v-253cdc8e]{font-family:MEDIUM}.mt46[data-v-253cdc8e]{margin-top:%?46?%}.mr30[data-v-253cdc8e]{margin-right:%?30?%}.mauto[data-v-253cdc8e]{margin:0 auto}.bgff[data-v-253cdc8e]{background-color:#fff}.bgF5D395[data-v-253cdc8e]{background-color:#f5d395}.p20[data-v-253cdc8e]{padding:%?20?%}.plr20[data-v-253cdc8e]{padding-left:%?20?%;padding-right:%?20?%}.ptb20[data-v-253cdc8e]{padding-top:%?20?%;padding-bottom:%?20?%}.mt20[data-v-253cdc8e]{margin-top:%?20?%}.mt30[data-v-253cdc8e]{margin-top:%?30?%}.ml10[data-v-253cdc8e]{margin-left:%?10?%}.ml20[data-v-253cdc8e]{margin-left:%?20?%}.mlr20[data-v-253cdc8e]{margin-left:%?20?%;margin-right:%?20?%}.mt10[data-v-253cdc8e]{margin-top:%?10?%}.mb10[data-v-253cdc8e]{margin-bottom:%?10?%}.f28[data-v-253cdc8e]{font-size:%?28?%}.f26[data-v-253cdc8e]{font-size:%?26?%}.f22[data-v-253cdc8e]{font-size:%?22?%}.f36[data-v-253cdc8e]{font-size:%?36?%}.f24[data-v-253cdc8e]{font-size:%?24?%}.c99[data-v-253cdc8e]{color:#666}.c989898[data-v-253cdc8e]{color:#989898}.cff4f00[data-v-253cdc8e]{color:#ff4f00}.c33[data-v-253cdc8e]{color:#333}.bgff4f00[data-v-253cdc8e]{background-color:#ff4f00}.btn1[data-v-253cdc8e]{width:%?200?%;height:%?90?%;border-radius:%?45?%;line-height:%?90?%;text-align:center}.btn2[data-v-253cdc8e]{width:%?196?%;height:%?86?%;border-radius:%?45?%;line-height:%?90?%;text-align:center}.tag1[data-v-253cdc8e]{height:%?40?%;border-radius:%?20?%;width:%?110?%;text-align:center;line-height:%?40?%}.tag2[data-v-253cdc8e]{height:%?40?%;border-radius:%?20?%;width:%?80?%;text-align:center;line-height:%?40?%}.btn-A[data-v-253cdc8e]{width:%?690?%;height:%?90?%;border-radius:45px;line-height:%?90?%;text-align:center;margin:0 auto}.border-ff4f00[data-v-253cdc8e]{border:%?1?% solid #ff4f00}.c66[data-v-253cdc8e]{color:#666}.cff[data-v-253cdc8e]{color:#fff}.no-scale[data-v-253cdc8e]{flex-shrink:0}.wp100[data-v-253cdc8e]{width:100%}.fw500[data-v-253cdc8e]{font-weight:500}.borderBottom[data-v-253cdc8e]:before{content:" ";position:absolute;bottom:0;left:0;right:0;border-bottom:1px solid #f1f1f1;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(.5);transform:scaleY(.5)}uni-page-body[data-v-253cdc8e]{background-color:#f5f5f9}body.?%PAGE?%[data-v-253cdc8e]{background-color:#f5f5f9}.list-item[data-v-253cdc8e]{height:%?90?%}.btnff4f00[data-v-253cdc8e]{width:%?690?%;height:%?90?%;background:#ff4f00;border-radius:%?45?%;text-align:center;line-height:%?90?%;color:#fff}.yzmbtn[data-v-253cdc8e]{width:%?134?%;height:%?50?%;border:1px solid #ff4f00;border-radius:%?10?%;line-height:%?50?%}.gui-form-label[data-v-253cdc8e]{width:%?150?%}.disabled[data-v-253cdc8e]{color:#999;border-color:#999}',""]),e.exports=r},"7be2":function(e,r,t){"use strict";t("7a82"),Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0,t("ac1f"),t("5319");var a,n=t("9136"),i=t("084d"),o={data:function(){return{pageLoading:!1,tel:"",timer:null,text:"获取验证码",isClick:!0,verificationCode:"",imageBase64:"",bankCardNumber:"",bankName:"",validDate:""}},onLoad:function(){a=this},onUnload:function(){clearInterval(a.timer)},methods:{chooseImg:function(){uni.chooseImage({count:1,sizeType:["compressed"],sourceType:["album","camera"],success:function(e){(0,n.pathToBase64)(e.tempFilePaths[0]).then((function(e){a.imageBase64=e.replace(/^data:image\/\w+;base64,/,""),a.getBankCardIdent()})).catch((function(e){a.$refs.guiPage.openMessage("default","图片转码失败",!0,1500)}))}})},getBankCardIdent:function(){a.pageLoading=!0;var e={};e.image=encodeURIComponent(a.imageBase64),uni.gRequest.post("swoft/api/user/getBankCardIdent",{data:e},(function(e){0==e.error_code?e.result.bank_card_number?(a.bankCardNumber=e.result.bank_card_number,a.bankName=e.result.bank_name,a.validDate=e.result.valid_date):a.$refs.guiPage.openMessage("default","未识别到银行卡信息",!0,1500):a.$refs.guiPage.openMessage("default",e.reason,!0,1500)}),(function(e){a.$refs.guiPage.openMessage("default","请求错误",!0,1500)}),(function(e){a.pageLoading=!1}),!0,!0)},goTime:function(){if(!a.isClick)return!1;a.isClick=!1;var e=60;a.text=e+"秒后重发",a.timer=uni.gJS.interval(1e3,(function(){e>0?(e--,a.text=e+"秒后重发"):(a.isClick=!0,a.text="获取验证码",clearInterval(a.timer))}))},getVerificationCode:function(){if(!a.isClick)return!1;var e={};e.tel=a.tel,e.bankCardNumber=a.bankCardNumber,e.bankName=a.bankName;var r=i.check(e,[{name:"bankCardNumber",checkType:"notnull",checkRule:"",errorMsg:"请输入银行卡号"},{name:"bankName",checkType:"notnull",checkRule:"",errorMsg:"请输入银行名称"},{name:"tel",checkType:"notnull",checkRule:"",errorMsg:"请输入手机号码"},{name:"tel",checkType:"phoneno",checkRule:"",errorMsg:"手机号码格式不正确"}]);if(!r)return a.$refs.guiPage.openMessage("default",i.error,!0,1500),!1;a.pageLoading=!0,uni.gRequest.post("swoft/api/user/getBankCardVerification",{data:{bankcard:e.bankCardNumber,realname:uni.getStorageSync("userInfo").name,idcard:uni.getStorageSync("userInfo").idCard,mobile:e.tel}},(function(r){0==r.error_code?1==r.result.res?uni.gRequest.post("swoft/api/user/getBankCardTypeIdent",{data:{bankcard:e.bankCardNumber,encry:0}},(function(r){0==r.error_code?"借记卡"==r.result.cardtype?uni.gRequest.post("swoft/api/login/getVerificationCode",{data:e},(function(e){0==e.code?(a.$refs.guiPage.openMessage("success",e.msg,!0,1500),setTimeout((function(){a.goTime()}),1500)):a.$refs.guiPage.openMessage("default",e.msg,!0,1500)}),(function(e){a.$refs.guiPage.openMessage("default","请求错误",!0,1500)}),(function(e){a.pageLoading=!1}),!0):(a.$refs.guiPage.openMessage("default","银行卡类型必须为借记卡",!0,1500),a.pageLoading=!1):(a.$refs.guiPage.openMessage("default",r.reason,!0,1500),a.pageLoading=!1)}),(function(e){a.$refs.guiPage.openMessage("default","请求错误",!0,1500),a.pageLoading=!1}),(function(e){}),!0,!0):(a.$refs.guiPage.openMessage("default",r.result.message,!0,1500),a.pageLoading=!1):(a.$refs.guiPage.openMessage("default",r.reason,!0,1500),a.pageLoading=!1)}),(function(e){a.$refs.guiPage.openMessage("default","请求错误",!0,1500),a.pageLoading=!1}),(function(e){}),!0,!0)},submit:function(e){var r={};r=e.detail.value;var t=i.check(r,[{name:"bankCardNumber",checkType:"notnull",checkRule:"",errorMsg:"请输入银行卡号"},{name:"bankName",checkType:"notnull",checkRule:"",errorMsg:"请输入银行名称"},{name:"bankTel",checkType:"notnull",checkRule:"",errorMsg:"请输入手机号"},{name:"bankTel",checkType:"phoneno",checkRule:"",errorMsg:"手机号格式不正确"},{name:"verificationCode",checkType:"notnull",checkRule:"",errorMsg:"请输入验证码"},{name:"verificationCode",checkType:"string",checkRule:"6,6",errorMsg:"验证码长度为6位"}]);if(!t)return a.$refs.guiPage.openMessage("default",i.error,!0,1500),!1;r.uid=uni.getStorageSync("userInfo").id,r.id=0,a.pageLoading=!0,uni.gRequest.post("swoft/api/user/userBankActive",{data:r},(function(e){0==e.code?(a.$refs.guiPage.openMessage("success",e.msg,!0,1500),setTimeout((function(){uni.navigateBack({delta:1})}),1500)):a.$refs.guiPage.openMessage("default",e.msg,!0,1500)}),(function(e){a.$refs.guiPage.openMessage("default","请求错误",!0,1500)}),(function(e){a.pageLoading=!1,3==e.data.code&&(a.$refs.guiPage.openMessage("default","请重新登录",!0,1500),setTimeout((function(){uni.gRequest.gotoLogin()}),1500))}),!0,!0)}}};r.default=o},"81b8":function(e,r,t){"use strict";t("7a82"),Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0,t("e25e"),t("ac1f"),t("00b4");var a={checkIdcard:function(e){var r,t,a,n,i=new Array("ok","身份证号码位数错误","身份证号码出生日期错误","身份证号码校验错误","身份证地区错误"),o=new Array;if(o=e.split(""),null=={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"}[parseInt(e.substr(0,2))])return i[4];switch(e.length){case 15:return t=(parseInt(e.substr(6,2))+1900)%4==0||(parseInt(e.substr(6,2))+1900)%100==0&&(parseInt(e.substr(6,2))+1900)%4==0?/^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/:/^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/,t.test(e)?i[0]:i[2];case 18:return t=parseInt(e.substr(6,4))%4==0||parseInt(e.substr(6,4))%100==0&&parseInt(e.substr(6,4))%4==0?/^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/:/^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/,t.test(e)?(a=7*(parseInt(o[0])+parseInt(o[10]))+9*(parseInt(o[1])+parseInt(o[11]))+10*(parseInt(o[2])+parseInt(o[12]))+5*(parseInt(o[3])+parseInt(o[13]))+8*(parseInt(o[4])+parseInt(o[14]))+4*(parseInt(o[5])+parseInt(o[15]))+2*(parseInt(o[6])+parseInt(o[16]))+1*parseInt(o[7])+6*parseInt(o[8])+3*parseInt(o[9]),r=a%11,"F","10X98765432",n="10X98765432".substr(r,1),n==o[17]?i[0]:i[3]):i[2];default:return i[1]}}};r.default=a},9136:function(e,r,t){"use strict";t("7a82");var a=t("4ea4").default;Object.defineProperty(r,"__esModule",{value:!0}),r.base64ToPath=function(e){return new Promise((function(r,t){if("object"===("undefined"===typeof window?"undefined":(0,n.default)(window))&&"document"in window){e=e.split(",");var a=e[0].match(/:(.*?);/)[1],s=atob(e[1]),c=s.length,u=new Uint8Array(c);while(c--)u[c]=s.charCodeAt(c);return r((window.URL||window.webkitURL).createObjectURL(new Blob([u],{type:a})))}var d=e.split(",")[0].match(/data\:\S+\/(\S+);/);d?d=d[1]:t(new Error("base64 error"));var f=function(){return Date.now()+String(o++)}()+"."+d;if("object"!==("undefined"===typeof plus?"undefined":(0,n.default)(plus)))if("object"===("undefined"===typeof wx?"undefined":(0,n.default)(wx))&&wx.canIUse("getFileSystemManager")){l=wx.env.USER_DATA_PATH+"/"+f;wx.getFileSystemManager().writeFile({filePath:l,data:i(e),encoding:"base64",success:function(){r(l)},fail:function(e){t(e)}})}else t(new Error("not support"));else{var l="_doc/uniapp_temp/"+f;if(!function(e,r){for(var t=e.split("."),a=r.split("."),n=!1,i=0;i<a.length;i++){var o=t[i]-a[i];if(0!==o){n=o>0;break}}return n}("Android"===plus.os.name?"1.9.9.80627":"1.9.9.80472",plus.runtime.innerVersion))return void plus.io.resolveLocalFileSystemURL("_doc",(function(a){a.getDirectory("uniapp_temp",{create:!0,exclusive:!1},(function(a){a.getFile(f,{create:!0,exclusive:!1},(function(a){a.createWriter((function(a){a.onwrite=function(){r(l)},a.onerror=t,a.seek(0),a.writeAsBinary(i(e))}),t)}),t)}),t)}),t);var g=new plus.nativeObj.Bitmap(f);g.loadBase64Data(e,(function(){g.save(l,{},(function(){g.clear(),r(l)}),(function(e){g.clear(),t(e)}))}),(function(e){g.clear(),t(e)}))}}))},r.pathToBase64=function(e){return new Promise((function(r,t){if("object"===("undefined"===typeof window?"undefined":(0,n.default)(window))&&"document"in window){if("function"===typeof FileReader){var a=new XMLHttpRequest;return a.open("GET",e,!0),a.responseType="blob",a.onload=function(){if(200===this.status){var e=new FileReader;e.onload=function(e){r(e.target.result)},e.onerror=t,e.readAsDataURL(this.response)}},a.onerror=t,void a.send()}var i=document.createElement("canvas"),o=i.getContext("2d"),s=new Image;return s.onload=function(){i.width=s.width,i.height=s.height,o.drawImage(s,0,0),r(i.toDataURL()),i.height=i.width=0},s.onerror=t,void(s.src=e)}"object"!==("undefined"===typeof plus?"undefined":(0,n.default)(plus))?"object"===("undefined"===typeof wx?"undefined":(0,n.default)(wx))&&wx.canIUse("getFileSystemManager")?wx.getFileSystemManager().readFile({filePath:e,encoding:"base64",success:function(e){r("data:image/png;base64,"+e.data)},fail:function(e){t(e)}}):t(new Error("not support")):plus.io.resolveLocalFileSystemURL(function(e){if(0===e.indexOf("_www")||0===e.indexOf("_doc")||0===e.indexOf("_documents")||0===e.indexOf("_downloads"))return e;if(0===e.indexOf("file://"))return e;if(0===e.indexOf("/storage/emulated/0/"))return e;if(0===e.indexOf("/")){var r=plus.io.convertAbsoluteFileSystem(e);if(r!==e)return r;e=e.substr(1)}return"_www/"+e}(e),(function(e){e.file((function(e){var a=new plus.io.FileReader;a.onload=function(e){r(e.target.result)},a.onerror=function(e){t(e)},a.readAsDataURL(e)}),(function(e){t(e)}))}),(function(e){t(e)}))}))};var n=a(t("53ca"));function i(e){var r=e.split(",");return r[r.length-1]}t("c975"),t("d3b7"),t("d9e2"),t("d401"),t("ac1f"),t("466d"),t("81b2"),t("0eb6"),t("b7ef"),t("8bd4"),t("ace4"),t("5cc6"),t("907a"),t("9a8c"),t("a975"),t("735e"),t("c1ac"),t("d139"),t("3a7b"),t("986a"),t("1d02"),t("d5d6"),t("82f8"),t("e91f"),t("60bd"),t("5f96"),t("3280"),t("3fcc"),t("ca91"),t("25a1"),t("cd26"),t("3c5d"),t("2954"),t("649e"),t("219c"),t("b39a"),t("72f7"),t("3ca3"),t("ddb0"),t("2b3d"),t("9861");var o=0},a2a3:function(e,r,t){var a=t("2dc7");a.__esModule&&(a=a.default),"string"===typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);var n=t("4f06").default;n("089b7a51",a,!0,{sourceMap:!1,shadowMode:!1})},b77c:function(e,r,t){"use strict";var a=t("a2a3"),n=t.n(a);n.a},bb17:function(e,r,t){"use strict";t.r(r);var a=t("7be2"),n=t.n(a);for(var i in a)["default"].indexOf(i)<0&&function(e){t.d(r,e,(function(){return a[e]}))}(i);r["default"]=n.a},dc84:function(e,r,t){"use strict";t.d(r,"b",(function(){return n})),t.d(r,"c",(function(){return i})),t.d(r,"a",(function(){return a}));var a={guiPage:t("1d79").default},n=function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("gui-page",{ref:"guiPage",attrs:{isLoading:e.pageLoading}},[t("v-uni-view",{attrs:{slot:"gBody"},slot:"gBody"},[t("v-uni-form",{on:{submit:function(r){arguments[0]=r=e.$handleEvent(r),e.submit.apply(void 0,arguments)}}},[t("v-uni-view",{staticClass:"bgff plr40 mt20"},[t("v-uni-view",{staticClass:"gui-form-item gui-border-b list-item"},[t("v-uni-text",{staticClass:"gui-form-label f28"},[e._v("银行卡号")]),t("v-uni-view",{staticClass:"gui-form-body gui-flex gui-align-items-center gui-justify-content-end"},[t("v-uni-input",{staticClass:"gui-form-input gui-text-right",attrs:{type:"number",name:"bankCardNumber",placeholder:"请输入您的储蓄卡号"},model:{value:e.bankCardNumber,callback:function(r){e.bankCardNumber=r},expression:"bankCardNumber"}}),t("v-uni-text",{staticClass:"gui-icons c999999 f28 ml20",on:{click:function(r){arguments[0]=r=e.$handleEvent(r),e.chooseImg.apply(void 0,arguments)}}},[e._v("")])],1)],1),t("v-uni-view",{staticClass:"gui-form-item gui-border-b list-item"},[t("v-uni-text",{staticClass:"gui-form-label f28"},[e._v("银行名称")]),t("v-uni-view",{staticClass:"gui-form-body gui-flex gui-align-items-center gui-justify-content-end"},[t("v-uni-input",{staticClass:"gui-form-input gui-text-right",attrs:{type:"text",name:"bankName",placeholder:"请输入银行名称"},model:{value:e.bankName,callback:function(r){e.bankName=r},expression:"bankName"}})],1)],1),t("v-uni-view",{staticClass:"gui-form-item gui-border-b list-item"},[t("v-uni-text",{staticClass:"gui-form-label f28"},[e._v("手机号码")]),t("v-uni-view",{staticClass:"gui-form-body"},[t("v-uni-input",{staticClass:"gui-form-input gui-text-right",attrs:{type:"number",name:"bankTel",placeholder:"请输入储蓄卡预留手机号"},model:{value:e.tel,callback:function(r){e.tel=r},expression:"tel"}})],1)],1),t("v-uni-view",{staticClass:"gui-form-item list-item"},[t("v-uni-text",{staticClass:"gui-form-label f28"},[e._v("短信验证码")]),t("v-uni-view",{staticClass:"gui-form-body"},[t("v-uni-input",{staticClass:"gui-form-input gui-text-right",attrs:{type:"number",name:"verificationCode",placeholder:"请输入验证码"},model:{value:e.verificationCode,callback:function(r){e.verificationCode=r},expression:"verificationCode"}})],1),t("v-uni-view",{staticClass:"yzmbtn f22 gui-text-center ml20 cff4f00",class:[e.isClick?"":"disabled"],on:{click:function(r){arguments[0]=r=e.$handleEvent(r),e.getVerificationCode.apply(void 0,arguments)}}},[e._v(e._s(e.text))])],1)],1),t("v-uni-view",{staticClass:"wp100 ptb20 mt20"},[t("v-uni-button",{staticClass:"btnff4f00 mauto f30 fb",attrs:{"form-type":"submit"}},[e._v("提交")])],1),t("v-uni-view",{staticClass:"f22 c99 gui-padding mt20"},[t("v-uni-view",{staticClass:"mt10"},[e._v("1.请确保绑定的卡为银行储蓄卡，否则结算佣金将无法到账。")]),t("v-uni-view",{staticClass:"mt10"},[e._v("2.请确保储蓄卡为本人所有，无法绑定他人的银行卡。")]),t("v-uni-view",{staticClass:"mt10"},[e._v("3.请尽量选择大型商业银行。")])],1)],1)],1)],1)},i=[]}}]);