(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-zengzhi-wuka-index"],{3946:function(t,e,i){var r=i("6ddf");r.__esModule&&(r=r.default),"string"===typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);var n=i("4f06").default;n("0a9f0f52",r,!0,{sourceMap:!1,shadowMode:!1})},"47e0":function(t,e,i){"use strict";var r=i("3946"),n=i.n(r);n.a},"682e":function(t,e,i){"use strict";i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return o})),i.d(e,"a",(function(){return r}));var r={guiPage:i("1d79").default,guiActionSheet:i("4cb6").default},n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("gui-page",{ref:"guiPage",attrs:{isLoading:t.pageLoading,customHeader:!0}},[i("v-uni-view",{attrs:{slot:"gHeader"},slot:"gHeader"},[i("v-uni-view",{staticClass:"gui-flex gui-nowrap gui-rows gui-align-items-center"},[i("v-uni-view",{staticClass:"gui-header-leader-btns",staticStyle:{width:"90rpx"},attrs:{"hover-class":"gui-tap"}},[i("v-uni-text",{staticClass:"gui-icons ml10",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.navBack.apply(void 0,arguments)}}},[t._v("")])],1),i("v-uni-view",{staticClass:"gui-flex1 gui-text-center"},[i("v-uni-text",{staticClass:"f36 gui-ellipsis"},[t._v("收款")])],1),i("v-uni-view",{staticClass:"pr30 gui-flex gui-align-items-center gui-justify-content-end",staticStyle:{width:"60rpx"}},[i("v-uni-view",{staticClass:"f26",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.$refs.guiactionsheet.open()}}},[t._v("更多")])],1)],1)],1),i("v-uni-view",{attrs:{slot:"gBody"},slot:"gBody"},[i("v-uni-view",{staticClass:"ewmBox bgFF4F00 pt20"},[i("v-uni-view",{staticClass:"gui-text-center cFFFFFF f34 fm"},[t._v("收款")]),i("v-uni-view",{staticClass:"bgFFFFFF ewmBoxc pt30"},[i("v-uni-view",{staticClass:"gui-text-center f26 fm"},[t._v("长按输入金额")]),i("v-uni-view",{staticClass:"ewm"},[i("v-uni-canvas",{staticStyle:{width:"420rpx",height:"420rpx"},attrs:{"canvas-id":"canvas",id:"canvas"},on:{longpress:function(e){arguments[0]=e=t.$handleEvent(e),t.logoTime.apply(void 0,arguments)}}})],1),i("v-uni-view",{staticClass:"gui-text-center f30 fm cFF4F00 mt20",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.navtoUrl.apply(void 0,arguments)}}},[t._v("设置收款金额")])],1)],1),i("gui-action-sheet",{ref:"guiactionsheet",attrs:{height:430,canCloseByShade:!0,listColor:"#FF4F00",title:"更多",items:t.actionSheetItems},on:{selected:function(e){arguments[0]=e=t.$handleEvent(e),t.selected.apply(void 0,arguments)}}})],1)],1)},o=[]},"6ddf":function(t,e,i){var r=i("24fb");e=r(!1),e.push([t.i,"uni-page-body[data-v-08c1650a]{background-color:#f8f8f8}body.?%PAGE?%[data-v-08c1650a]{background-color:#f8f8f8}.gui-header-leader-btns[data-v-08c1650a]{width:%?68?%;line-height:%?60?%;font-size:%?50?%}.ewmBox[data-v-08c1650a]{width:%?600?%;height:%?700?%;border-radius:%?20?%;margin:30% auto 0 auto}.ewmBoxc[data-v-08c1650a]{width:%?540?%;height:%?570?%;border-radius:%?20?%;margin:%?20?% auto 0 auto}.ewm[data-v-08c1650a]{width:%?420?%;height:%?420?%;margin:%?20?% auto 0 auto;background-color:#fff}",""]),t.exports=e},"706a":function(t,e,i){"use strict";i.r(e);var r=i("682e"),n=i("fa90");for(var o in n)["default"].indexOf(o)<0&&function(t){i.d(e,t,(function(){return n[t]}))}(o);i("47e0");var a=i("f0c5"),s=Object(a["a"])(n["default"],r["b"],r["c"],!1,null,"08c1650a",null,!1,r["a"],void 0);e["default"]=s.exports},"86f7":function(t,e,i){"use strict";i("7a82"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r,n=i("c7be"),o={data:function(){return{pageLoading:!1,actionSheetItems:[{id:1,title:"收款记录"},{id:2,title:"我的费率"},{id:3,title:"银行限额表"}],qrcode:null,qrcodeSize:420,qrcodeContent:"20355472856847765035467308068943076",qrcodeBgColor:"#000000",qrcodeColor:"#FFFFFF",qrcodeId:"canvas"}},onLoad:function(){r=this},onReady:function(t){var e=this;r.pageLoading=!0,setTimeout((function(){e.qrcode=new n(e.qrcodeId,{text:e.qrcodeContent,width:uni.upx2px(e.qrcodeSize),height:uni.upx2px(e.qrcodeSize),colorDark:e.qrcodeColor,colorLight:e.qrcodeBgColor,correctLevel:n.CorrectLevel.H}),r.pageLoading=!1}),1e3)},methods:{navBack:function(){uni.gJS.back()},selected:function(t){0==t?uni.navigateTo({url:"/pages/zengzhi/wuka/record"}):1==t?uni.navigateTo({url:"/pages/home/content?type=myFee"}):2==t&&uni.navigateTo({url:"/pages/home/content?type=bankMmoeney"})},logoTime:function(){uni.redirectTo({url:"/pages/zengzhi/wuka/pay"})},navtoUrl:function(){uni.redirectTo({url:"/pages/zengzhi/wuka/pay"})}}};e.default=o},c7be:function(t,e,i){var r;i("d9e2"),i("d401"),i("ac1f"),i("5319"),i("d3b7"),i("25f0"),i("14d9"),i("99af"),i("3c65"),function(){function t(t,e){for(var i=1,r=function(t){var e=encodeURI(t).toString().replace(/\%[0-9a-fA-F]{2}/g,"a");return e.length+(e.length!=t?3:0)}(t),n=0,a=d.length;n<=a;n++){var s=0;switch(e){case o.L:s=d[n][0];break;case o.M:s=d[n][1];break;case o.Q:s=d[n][2];break;case o.H:s=d[n][3];break}if(r<=s)break;i++}if(i>d.length)throw new Error("Too long data");return i}function e(t){this.mode=n.MODE_8BIT_BYTE,this.data=t,this.parsedData=[];for(var e=0,i=this.data.length;e<i;e++){var r=[],o=this.data.charCodeAt(e);o>65536?(r[0]=240|(1835008&o)>>>18,r[1]=128|(258048&o)>>>12,r[2]=128|(4032&o)>>>6,r[3]=128|63&o):o>2048?(r[0]=224|(61440&o)>>>12,r[1]=128|(4032&o)>>>6,r[2]=128|63&o):o>128?(r[0]=192|(1984&o)>>>6,r[1]=128|63&o):r[0]=o,this.parsedData.push(r)}this.parsedData=Array.prototype.concat.apply([],this.parsedData),this.parsedData.length!=this.data.length&&(this.parsedData.unshift(191),this.parsedData.unshift(187),this.parsedData.unshift(239))}function i(t,e){this.typeNumber=t,this.errorCorrectLevel=e,this.modules=null,this.moduleCount=0,this.dataCache=null,this.dataList=[]}e.prototype={getLength:function(t){return this.parsedData.length},write:function(t){for(var e=0,i=this.parsedData.length;e<i;e++)t.put(this.parsedData[e],8)}},i.prototype={addData:function(t){var i=new e(t);this.dataList.push(i),this.dataCache=null},isDark:function(t,e){if(t<0||this.moduleCount<=t||e<0||this.moduleCount<=e)throw new Error(t+","+e);return this.modules[t][e]},getModuleCount:function(){return this.moduleCount},make:function(){this.makeImpl(!1,this.getBestMaskPattern())},makeImpl:function(t,e){this.moduleCount=4*this.typeNumber+17,this.modules=new Array(this.moduleCount);for(var r=0;r<this.moduleCount;r++){this.modules[r]=new Array(this.moduleCount);for(var n=0;n<this.moduleCount;n++)this.modules[r][n]=null}this.setupPositionProbePattern(0,0),this.setupPositionProbePattern(this.moduleCount-7,0),this.setupPositionProbePattern(0,this.moduleCount-7),this.setupPositionAdjustPattern(),this.setupTimingPattern(),this.setupTypeInfo(t,e),this.typeNumber>=7&&this.setupTypeNumber(t),null==this.dataCache&&(this.dataCache=i.createData(this.typeNumber,this.errorCorrectLevel,this.dataList)),this.mapData(this.dataCache,e)},setupPositionProbePattern:function(t,e){for(var i=-1;i<=7;i++)if(!(t+i<=-1||this.moduleCount<=t+i))for(var r=-1;r<=7;r++)e+r<=-1||this.moduleCount<=e+r||(this.modules[t+i][e+r]=0<=i&&i<=6&&(0==r||6==r)||0<=r&&r<=6&&(0==i||6==i)||2<=i&&i<=4&&2<=r&&r<=4)},getBestMaskPattern:function(){for(var t=0,e=0,i=0;i<8;i++){this.makeImpl(!0,i);var r=s.getLostPoint(this);(0==i||t>r)&&(t=r,e=i)}return e},createMovieClip:function(t,e,i){var r=t.createEmptyMovieClip(e,i);this.make();for(var n=0;n<this.modules.length;n++)for(var o=1*n,a=0;a<this.modules[n].length;a++){var s=1*a,u=this.modules[n][a];u&&(r.beginFill(0,100),r.moveTo(s,o),r.lineTo(s+1,o),r.lineTo(s+1,o+1),r.lineTo(s,o+1),r.endFill())}return r},setupTimingPattern:function(){for(var t=8;t<this.moduleCount-8;t++)null==this.modules[t][6]&&(this.modules[t][6]=t%2==0);for(var e=8;e<this.moduleCount-8;e++)null==this.modules[6][e]&&(this.modules[6][e]=e%2==0)},setupPositionAdjustPattern:function(){for(var t=s.getPatternPosition(this.typeNumber),e=0;e<t.length;e++)for(var i=0;i<t.length;i++){var r=t[e],n=t[i];if(null==this.modules[r][n])for(var o=-2;o<=2;o++)for(var a=-2;a<=2;a++)this.modules[r+o][n+a]=-2==o||2==o||-2==a||2==a||0==o&&0==a}},setupTypeNumber:function(t){for(var e=s.getBCHTypeNumber(this.typeNumber),i=0;i<18;i++){var r=!t&&1==(e>>i&1);this.modules[Math.floor(i/3)][i%3+this.moduleCount-8-3]=r}for(i=0;i<18;i++){r=!t&&1==(e>>i&1);this.modules[i%3+this.moduleCount-8-3][Math.floor(i/3)]=r}},setupTypeInfo:function(t,e){for(var i=this.errorCorrectLevel<<3|e,r=s.getBCHTypeInfo(i),n=0;n<15;n++){var o=!t&&1==(r>>n&1);n<6?this.modules[n][8]=o:n<8?this.modules[n+1][8]=o:this.modules[this.moduleCount-15+n][8]=o}for(n=0;n<15;n++){o=!t&&1==(r>>n&1);n<8?this.modules[8][this.moduleCount-n-1]=o:n<9?this.modules[8][15-n-1+1]=o:this.modules[8][15-n-1]=o}this.modules[this.moduleCount-8][8]=!t},mapData:function(t,e){for(var i=-1,r=this.moduleCount-1,n=7,o=0,a=this.moduleCount-1;a>0;a-=2){6==a&&a--;while(1){for(var u=0;u<2;u++)if(null==this.modules[r][a-u]){var h=!1;o<t.length&&(h=1==(t[o]>>>n&1));var l=s.getMask(e,r,a-u);l&&(h=!h),this.modules[r][a-u]=h,n--,-1==n&&(o++,n=7)}if(r+=i,r<0||this.moduleCount<=r){r-=i,i=-i;break}}}}},i.PAD0=236,i.PAD1=17,i.createData=function(t,e,r){for(var n=c.getRSBlocks(t,e),o=new g,a=0;a<r.length;a++){var u=r[a];o.put(u.mode,4),o.put(u.getLength(),s.getLengthInBits(u.mode,t)),u.write(o)}var h=0;for(a=0;a<n.length;a++)h+=n[a].dataCount;if(o.getLengthInBits()>8*h)throw new Error("code length overflow. ("+o.getLengthInBits()+">"+8*h+")");o.getLengthInBits()+4<=8*h&&o.put(0,4);while(o.getLengthInBits()%8!=0)o.putBit(!1);while(1){if(o.getLengthInBits()>=8*h)break;if(o.put(i.PAD0,8),o.getLengthInBits()>=8*h)break;o.put(i.PAD1,8)}return i.createBytes(o,n)},i.createBytes=function(t,e){for(var i=0,r=0,n=0,o=new Array(e.length),a=new Array(e.length),u=0;u<e.length;u++){var h=e[u].dataCount,c=e[u].totalCount-h;r=Math.max(r,h),n=Math.max(n,c),o[u]=new Array(h);for(var g=0;g<o[u].length;g++)o[u][g]=255&t.buffer[g+i];i+=h;var d=s.getErrorCorrectPolynomial(c),f=new l(o[u],d.getLength()-1),v=f.mod(d);a[u]=new Array(d.getLength()-1);for(g=0;g<a[u].length;g++){var p=g+v.getLength()-a[u].length;a[u][g]=p>=0?v.get(p):0}}var m=0;for(g=0;g<e.length;g++)m+=e[g].totalCount;var w=new Array(m),C=0;for(g=0;g<r;g++)for(u=0;u<e.length;u++)g<o[u].length&&(w[C++]=o[u][g]);for(g=0;g<n;g++)for(u=0;u<e.length;u++)g<a[u].length&&(w[C++]=a[u][g]);return w};for(var n={MODE_NUMBER:1,MODE_ALPHA_NUM:2,MODE_8BIT_BYTE:4,MODE_KANJI:8},o={L:1,M:0,Q:3,H:2},a={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7},s={PATTERN_POSITION_TABLE:[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],G15:1335,G18:7973,G15_MASK:21522,getBCHTypeInfo:function(t){var e=t<<10;while(s.getBCHDigit(e)-s.getBCHDigit(s.G15)>=0)e^=s.G15<<s.getBCHDigit(e)-s.getBCHDigit(s.G15);return(t<<10|e)^s.G15_MASK},getBCHTypeNumber:function(t){var e=t<<12;while(s.getBCHDigit(e)-s.getBCHDigit(s.G18)>=0)e^=s.G18<<s.getBCHDigit(e)-s.getBCHDigit(s.G18);return t<<12|e},getBCHDigit:function(t){var e=0;while(0!=t)e++,t>>>=1;return e},getPatternPosition:function(t){return s.PATTERN_POSITION_TABLE[t-1]},getMask:function(t,e,i){switch(t){case a.PATTERN000:return(e+i)%2==0;case a.PATTERN001:return e%2==0;case a.PATTERN010:return i%3==0;case a.PATTERN011:return(e+i)%3==0;case a.PATTERN100:return(Math.floor(e/2)+Math.floor(i/3))%2==0;case a.PATTERN101:return e*i%2+e*i%3==0;case a.PATTERN110:return(e*i%2+e*i%3)%2==0;case a.PATTERN111:return(e*i%3+(e+i)%2)%2==0;default:throw new Error("bad maskPattern:"+t)}},getErrorCorrectPolynomial:function(t){for(var e=new l([1],0),i=0;i<t;i++)e=e.multiply(new l([1,u.gexp(i)],0));return e},getLengthInBits:function(t,e){if(1<=e&&e<10)switch(t){case n.MODE_NUMBER:return 10;case n.MODE_ALPHA_NUM:return 9;case n.MODE_8BIT_BYTE:return 8;case n.MODE_KANJI:return 8;default:throw new Error("mode:"+t)}else if(e<27)switch(t){case n.MODE_NUMBER:return 12;case n.MODE_ALPHA_NUM:return 11;case n.MODE_8BIT_BYTE:return 16;case n.MODE_KANJI:return 10;default:throw new Error("mode:"+t)}else{if(!(e<41))throw new Error("type:"+e);switch(t){case n.MODE_NUMBER:return 14;case n.MODE_ALPHA_NUM:return 13;case n.MODE_8BIT_BYTE:return 16;case n.MODE_KANJI:return 12;default:throw new Error("mode:"+t)}}},getLostPoint:function(t){for(var e=t.getModuleCount(),i=0,r=0;r<e;r++)for(var n=0;n<e;n++){for(var o=0,a=t.isDark(r,n),s=-1;s<=1;s++)if(!(r+s<0||e<=r+s))for(var u=-1;u<=1;u++)n+u<0||e<=n+u||0==s&&0==u||a==t.isDark(r+s,n+u)&&o++;o>5&&(i+=3+o-5)}for(r=0;r<e-1;r++)for(n=0;n<e-1;n++){var h=0;t.isDark(r,n)&&h++,t.isDark(r+1,n)&&h++,t.isDark(r,n+1)&&h++,t.isDark(r+1,n+1)&&h++,0!=h&&4!=h||(i+=3)}for(r=0;r<e;r++)for(n=0;n<e-6;n++)t.isDark(r,n)&&!t.isDark(r,n+1)&&t.isDark(r,n+2)&&t.isDark(r,n+3)&&t.isDark(r,n+4)&&!t.isDark(r,n+5)&&t.isDark(r,n+6)&&(i+=40);for(n=0;n<e;n++)for(r=0;r<e-6;r++)t.isDark(r,n)&&!t.isDark(r+1,n)&&t.isDark(r+2,n)&&t.isDark(r+3,n)&&t.isDark(r+4,n)&&!t.isDark(r+5,n)&&t.isDark(r+6,n)&&(i+=40);var l=0;for(n=0;n<e;n++)for(r=0;r<e;r++)t.isDark(r,n)&&l++;var c=Math.abs(100*l/e/e-50)/5;return i+=10*c,i}},u={glog:function(t){if(t<1)throw new Error("glog("+t+")");return u.LOG_TABLE[t]},gexp:function(t){while(t<0)t+=255;while(t>=256)t-=255;return u.EXP_TABLE[t]},EXP_TABLE:new Array(256),LOG_TABLE:new Array(256)},h=0;h<8;h++)u.EXP_TABLE[h]=1<<h;for(h=8;h<256;h++)u.EXP_TABLE[h]=u.EXP_TABLE[h-4]^u.EXP_TABLE[h-5]^u.EXP_TABLE[h-6]^u.EXP_TABLE[h-8];for(h=0;h<255;h++)u.LOG_TABLE[u.EXP_TABLE[h]]=h;function l(t,e){if(void 0==t.length)throw new Error(t.length+"/"+e);var i=0;while(i<t.length&&0==t[i])i++;this.num=new Array(t.length-i+e);for(var r=0;r<t.length-i;r++)this.num[r]=t[r+i]}function c(t,e){this.totalCount=t,this.dataCount=e}function g(){this.buffer=[],this.length=0}l.prototype={get:function(t){return this.num[t]},getLength:function(){return this.num.length},multiply:function(t){for(var e=new Array(this.getLength()+t.getLength()-1),i=0;i<this.getLength();i++)for(var r=0;r<t.getLength();r++)e[i+r]^=u.gexp(u.glog(this.get(i))+u.glog(t.get(r)));return new l(e,0)},mod:function(t){if(this.getLength()-t.getLength()<0)return this;for(var e=u.glog(this.get(0))-u.glog(t.get(0)),i=new Array(this.getLength()),r=0;r<this.getLength();r++)i[r]=this.get(r);for(r=0;r<t.getLength();r++)i[r]^=u.gexp(u.glog(t.get(r))+e);return new l(i,0).mod(t)}},c.RS_BLOCK_TABLE=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],c.getRSBlocks=function(t,e){var i=c.getRsBlockTable(t,e);if(void 0==i)throw new Error("bad rs block @ typeNumber:"+t+"/errorCorrectLevel:"+e);for(var r=i.length/3,n=[],o=0;o<r;o++)for(var a=i[3*o+0],s=i[3*o+1],u=i[3*o+2],h=0;h<a;h++)n.push(new c(s,u));return n},c.getRsBlockTable=function(t,e){switch(e){case o.L:return c.RS_BLOCK_TABLE[4*(t-1)+0];case o.M:return c.RS_BLOCK_TABLE[4*(t-1)+1];case o.Q:return c.RS_BLOCK_TABLE[4*(t-1)+2];case o.H:return c.RS_BLOCK_TABLE[4*(t-1)+3];default:return}},g.prototype={get:function(t){var e=Math.floor(t/8);return 1==(this.buffer[e]>>>7-t%8&1)},put:function(t,e){for(var i=0;i<e;i++)this.putBit(1==(t>>>e-i-1&1))},getLengthInBits:function(){return this.length},putBit:function(t){var e=Math.floor(this.length/8);this.buffer.length<=e&&this.buffer.push(0),t&&(this.buffer[e]|=128>>>this.length%8),this.length++}};var d=[[17,14,11,7],[32,26,20,14],[53,42,32,24],[78,62,46,34],[106,84,60,44],[134,106,74,58],[154,122,86,64],[192,152,108,84],[230,180,130,98],[271,213,151,119],[321,251,177,137],[367,287,203,155],[425,331,241,177],[458,362,258,194],[520,412,292,220],[586,450,322,250],[644,504,364,280],[718,560,394,310],[792,624,442,338],[858,666,482,382],[929,711,509,403],[1003,779,565,439],[1091,857,611,461],[1171,911,661,511],[1273,997,715,535],[1367,1059,751,593],[1465,1125,805,625],[1528,1190,868,658],[1628,1264,908,698],[1732,1370,982,742],[1840,1452,1030,790],[1952,1538,1112,842],[2068,1628,1168,898],[2188,1722,1228,958],[2303,1809,1283,983],[2431,1911,1351,1051],[2563,1989,1423,1093],[2699,2099,1499,1139],[2809,2213,1579,1219],[2953,2331,1663,1273]];r=function(t,e){if(this._htOption={width:256,height:256,typeNumber:4,colorDark:"#000000",colorLight:"#ffffff",correctLevel:o.H},"string"===typeof e&&(e={text:e}),e)for(var i in e)this._htOption[i]=e[i];this._oQRCode=null,this.canvasId=t,this._htOption.text&&this.canvasId&&this.makeCode(this._htOption.text)},r.prototype.makeCode=function(e){this._oQRCode=new i(t(e,this._htOption.correctLevel),this._htOption.correctLevel),this._oQRCode.addData(e),this._oQRCode.make(),this.makeImage()},r.prototype.makeImage=function(){var t,e=this;t=this._htOption.usingIn?wx.createCanvasContext(this.canvasId,this._htOption.usingIn):wx.createCanvasContext(this.canvasId);var i=this._htOption,r=this._oQRCode,n=r.getModuleCount(),o=i.padding?(i.width-2*i.padding)/n:i.width/n,a=i.padding?(i.height-2*i.padding)/n:i.height/n,s=Math.round(a),u=Math.round(o);i.image&&""!=i.image&&t.drawImage(i.image,0,0,i.width,i.height),t.setFillStyle("#fff"),t.fillRect(0,0,i.width,i.height),t.save();for(var h=0;h<n;h++)for(var l=0;l<n;l++){var c=r.isDark(h,l),g=i.padding?l*o+i.padding:l*o,d=i.padding?h*a+i.padding:h*a;t.setStrokeStyle(c?i.colorDark:i.colorLight),t.setLineWidth(1),t.setFillStyle(c?i.colorDark:i.colorLight),t.fillRect(g,d,o,a),t.strokeRect(Math.floor(g)+.5,Math.floor(d)+.5,s),t.strokeRect(Math.ceil(g)-.5,Math.ceil(d)-.5,u,s)}t.draw(!1,(function(){setTimeout((function(){e.exportImage()}),800)}))},r.prototype.exportImage=function(t){var e=this;this._htOption.callback&&"function"===typeof this._htOption.callback&&uni.canvasToTempFilePath({x:0,y:0,width:this._htOption.width,height:this._htOption.height,destWidth:this._htOption.width,destHeight:this._htOption.height,canvasId:this.canvasId,success:function(t){e._htOption.callback({path:t.tempFilePath})}})},r.CorrectLevel=o}(),t.exports=r},fa90:function(t,e,i){"use strict";i.r(e);var r=i("86f7"),n=i.n(r);for(var o in r)["default"].indexOf(o)<0&&function(t){i.d(e,t,(function(){return r[t]}))}(o);e["default"]=n.a}}]);