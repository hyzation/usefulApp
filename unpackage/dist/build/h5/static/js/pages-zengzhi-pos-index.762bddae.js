(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-zengzhi-pos-index"],{1289:function(t,e,i){var a=i("c0b8");a.__esModule&&(a=a.default),"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=i("4f06").default;n("f3df8354",a,!0,{sourceMap:!1,shadowMode:!1})},"13a3":function(t,e,i){var a=i("20d1");a.__esModule&&(a=a.default),"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=i("4f06").default;n("88a52aea",a,!0,{sourceMap:!1,shadowMode:!1})},"1c54":function(t,e,i){"use strict";i("7a82");var a=i("4ea4").default;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=a(i("b85c"));i("c975"),i("caad"),i("2532"),i("ac1f"),i("466d"),i("5319"),i("e25e"),i("14d9"),i("99af"),i("acd8");var r=uni.getSystemInfoSync(),o=r.windowWidth,s=(r.platform,i("fc91")),d={name:"parser",data:function(){return{uid:this._uid,showAm:"",nodes:[]}},props:{html:String,autopause:{type:Boolean,default:!0},autoscroll:Boolean,autosetTitle:{type:Boolean,default:!0},domain:String,lazyLoad:Boolean,selectable:Boolean,tagStyle:Object,showWithAnimation:Boolean,useAnchor:Boolean},watch:{html:function(t){this.setContent(t)}},created:function(){this.imgList=[],this.imgList.each=function(t){for(var e=0,i=this.length;e<i;e++)this.setItem(e,t(this[e],e,this))},this.imgList.setItem=function(t,e){if(void 0!=t&&e){if(0==e.indexOf("http")&&this.includes(e)){for(var i,a=e.split("://")[0],n=a.length;i=e[n];n++){if("/"==i&&"/"!=e[n-1]&&"/"!=e[n+1])break;a+=Math.random()>.5?i.toUpperCase():i}return a+=e.substr(n),this[t]=a}if(this[t]=e,e.includes("data:image")){var r=e.match(/data:image\/(\S+?);(\S+?),(.+)/);if(!r)return}}}},mounted:function(){this.document=document.getElementById("rtf"+this._uid),this.html&&this.setContent(this.html)},beforeDestroy:function(){this._observer&&this._observer.disconnect(),this.imgList.each((function(t){})),clearInterval(this._timer)},methods:{setContent:function(t,e){var i=this;if(t){var a=document.createElement("div");e?this.rtf?this.rtf.appendChild(a):this.rtf=a:(this.rtf&&this.rtf.parentNode.removeChild(this.rtf),this.rtf=a),a.innerHTML=this._handleHtml(t,e);for(var r,d=this.rtf.getElementsByTagName("style"),c=0;r=d[c++];)r.innerHTML=r.innerHTML.replace(/body/g,"#rtf"+this._uid),r.setAttribute("scoped","true");!this._observer&&this.lazyLoad&&IntersectionObserver&&(this._observer=new IntersectionObserver((function(t){for(var e,a=0;e=t[a++];)e.isIntersecting&&(e.target.src=e.target.getAttribute("data-src"),e.target.removeAttribute("data-src"),i._observer.unobserve(e.target))}),{rootMargin:"500px 0px 500px 0px"}));var u=this,l=this.rtf.getElementsByTagName("title");l.length&&this.autosetTitle&&uni.setNavigationBarTitle({title:l[0].innerText}),this.imgList.length=0;for(var g,f=this.rtf.getElementsByTagName("img"),h=0,p=0;g=f[h];h++){parseInt(g.style.width||g.getAttribute("width"))>o&&(g.style.height="auto");var v=g.getAttribute("src");this.domain&&v&&("/"==v[0]?"/"==v[1]?g.src=(this.domain.includes("://")?this.domain.split("://")[0]:"")+":"+v:g.src=this.domain+v:v.includes("://")||(g.src=this.domain+"/"+v)),g.hasAttribute("ignore")||"A"==g.parentElement.nodeName||(g.i=p++,u.imgList.push(g.getAttribute("original-src")||g.src||g.getAttribute("data-src")),g.onclick=function(){var t=!0;this.ignore=function(){return t=!1},u.$emit("imgtap",this),t&&uni.previewImage({current:this.i,urls:u.imgList})}),g.onerror=function(){s.errorImg&&(u.imgList[this.i]=this.src=s.errorImg),u.$emit("error",{source:"img",target:this})},u.lazyLoad&&this._observer&&g.src&&0!=g.i&&(g.setAttribute("data-src",g.src),g.removeAttribute("src"),this._observer.observe(g))}var b,m=this.rtf.getElementsByTagName("a"),A=(0,n.default)(m);try{for(A.s();!(b=A.n()).done;){var w=b.value;w.onclick=function(){var t=!0,e=this.getAttribute("href");if(u.$emit("linkpress",{href:e,ignore:function(){return t=!1}}),t&&e)if("#"==e[0])u.useAnchor&&u.navigateTo({id:e.substr(1)});else{if(0==e.indexOf("http")||0==e.indexOf("//"))return!0;uni.navigateTo({url:e})}return!1}}}catch(H){A.e(H)}finally{A.f()}var y=this.rtf.getElementsByTagName("video");u.videoContexts=y;for(var x,T=0;x=y[T++];)x.style.maxWidth="100%",x.onerror=function(){u.$emit("error",{source:"video",target:this})},x.onplay=function(){if(u.autopause)for(var t,e=0;t=u.videoContexts[e++];)t!=this&&t.pause()};var R,K,z=this.rtf.getElementsByTagName("audio"),L=(0,n.default)(z);try{for(L.s();!(R=L.n()).done;){var C=R.value;C.onerror=function(){u.$emit("error",{source:"audio",target:this})}}}catch(H){L.e(H)}finally{L.f()}if(this.autoscroll){var D,j=this.rtf.getElementsByTagName("table"),S=(0,n.default)(j);try{for(S.s();!(D=S.n()).done;){var P=D.value,k=document.createElement("div");k.style.overflow="scroll",P.parentNode.replaceChild(k,P),k.appendChild(P)}}catch(H){S.e(H)}finally{S.f()}}e||this.document.appendChild(this.rtf),this.$nextTick((function(){i.nodes=[1],i.$emit("load")})),setTimeout((function(){return i.showAm=""}),500),clearInterval(this._timer),this._timer=setInterval((function(){i.rect=i.rtf.getBoundingClientRect(),i.rect.height==K&&(i.$emit("ready",i.rect),clearInterval(i._timer)),K=i.rect.height}),350),this.showWithAnimation&&!e&&(this.showAm="animation:_show .5s")}else this.rtf&&!e&&this.rtf.parentNode.removeChild(this.rtf)},getText:function(){arguments.length>0&&void 0!==arguments[0]||this.nodes;var t="";return t=this.rtf.innerText,t},in:function(t){t.page&&t.selector&&t.scrollTop&&(this._in=t)},navigateTo:function(t){var e=this;if(!this.useAnchor)return t.fail&&t.fail("Anchor is disabled");var i=uni.createSelectorQuery().in(this._in?this._in.page:this).select((this._in?this._in.selector:"#_top")+(t.id?"".concat(" ","#").concat(t.id,",").concat(this._in?this._in.selector:"#_top").concat(" ",".").concat(t.id):"")).boundingClientRect();this._in?i.select(this._in.selector).scrollOffset().select(this._in.selector).boundingClientRect():i.selectViewport().scrollOffset(),i.exec((function(i){if(!i[0])return t.fail&&t.fail("Label not found");var a=i[1].scrollTop+i[0].top-(i[2]?i[2].top:0)+(t.offset||0);e._in?e._in.page[e._in.scrollTop]=a:uni.pageScrollTo({scrollTop:a,duration:300}),t.success&&t.success()}))},getVideoContext:function(t){if(!t)return this.videoContexts;for(var e=this.videoContexts.length;e--;)if(this.videoContexts[e].id==t)return this.videoContexts[e]},_handleHtml:function(t,e){if(!e){var i="<style scoped>@keyframes _show{0%{opacity:0}100%{opacity:1}}img{max-width:100%}";for(var a in s.userAgentStyles)i+="".concat(a,"{").concat(s.userAgentStyles[a],"}");for(a in this.tagStyle)i+="".concat(a,"{").concat(this.tagStyle[a],"}");i+="</style>",t=i+t}return t.includes("rpx")&&(t=t.replace(/[0-9.]+\s*rpx/g,(function(t){return parseFloat(t)*o/750+"px"}))),t}}};e.default=d},"20d1":function(t,e,i){var a=i("24fb");e=a(!1),e.push([t.i,".gui-swiper-card-wrap[data-v-4404e12f]{position:relative}.gui-swiper-card[data-v-4404e12f]{overflow:hidden}.gui-swiper-card-item[data-v-4404e12f]{font-size:0;overflow:hidden;line-height:0}.gui-swiper-card-nav[data-v-4404e12f]{font-size:0;position:relative}.gui-indicator-dots[data-v-4404e12f]{width:%?750?%;overflow:hidden;z-index:1;left:0;bottom:0}.gui-indicator-dot[data-v-4404e12f]{margin:%?6?%}.gui-indicator-dots-wrap[data-v-4404e12f]{padding:0 %?20?%}.gui-indicator-dot-text[data-v-4404e12f]{text-align:center;line-height:%?68?%;padding:0 %?4?%;color:#fff;font-size:%?32?%}.gui-indicator-dot-numbers[data-v-4404e12f]{overflow:hidden;align-items:center;position:absolute;z-index:1;left:0;bottom:0}.gui-swiper-text[data-v-4404e12f]{width:%?200?%;line-height:%?68?%;padding-right:%?25?%;overflow:hidden}\n@-webkit-keyframes dot-show-data-v-4404e12f{from{opacity:.1}to{opacity:1}}@keyframes dot-show-data-v-4404e12f{from{opacity:.1}to{opacity:1}}.dot-show[data-v-4404e12f]{-webkit-animation:dot-show-data-v-4404e12f .3s linear forwards;animation:dot-show-data-v-4404e12f .3s linear forwards}\n",""]),t.exports=e},"25a0":function(t,e,i){"use strict";i("7a82"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,i("a9e3");var a={name:"gui-swiper",props:{width:{type:Number,default:750},height:{type:Number,default:300},swiperItems:{type:Array,default:function(){return new Array}},borderRadius:{type:String,default:"10rpx"},indicatorBarHeight:{type:Number,default:68},indicatorBarBgColor:{type:String,default:"rgba(0,0,0,0)"},indicatorWidth:{type:Number,default:18},indicatorActiveWidth:{type:Number,default:18},indicatorHeight:{type:Number,default:18},indicatorRadius:{type:Number,default:18},indicatorColor:{type:String,default:"rgba(255, 255, 255, 0.6)"},indicatorActiveColor:{type:String,default:"#2B2E3D"},indicatorType:{type:String,default:"dot"},indicatorPosition:{type:String,default:"absolute"},indicatorDirection:{type:String,default:"center"},spacing:{type:Number,default:50},padding:{type:Number,default:26},interval:{type:Number,default:5e3},autoplay:{type:Boolean,default:!0},circular:{type:Boolean,default:!0},isShowBtn:{type:Boolean,default:!1},currentIndex:{type:Number,default:0},opacity:{type:Number,default:.66},titleColor:{type:String,default:"#FFFFFF"},titleSize:{type:String,default:"28rpx"},mode:{type:String,default:"aspectFit"}},data:function(){return{current:0,isReady:!1,widthIn:750,heightIn:300,widthInSamll:700,heightInSmall:280,paddingY:0}},watch:{currentIndex:function(t){this.current=t}},created:function(){this.current=this.currentIndex,this.init()},methods:{init:function(){this.widthIn=this.width-2*this.spacing,this.heightIn=this.height/this.width*this.widthIn,this.paddingY=this.padding*this.height/this.width,this.widthInSamll=this.widthIn-2*this.padding,this.heightInSmall=this.heightIn-2*this.paddingY},swiperchange:function(t){var e=t.detail.current;this.current=e,this.$emit("swiperchange",e)},taped:function(t){this.$emit("taped",t.currentTarget.dataset.index)},clickBtn:function(){this.$emit("clickBtn")}}};e.default=a},"4fdd":function(t,e,i){"use strict";i.r(e);var a=i("a9fe"),n=i.n(a);for(var r in a)["default"].indexOf(r)<0&&function(t){i.d(e,t,(function(){return a[t]}))}(r);e["default"]=n.a},"57e6":function(t,e,i){"use strict";i.r(e);var a=i("25a0"),n=i.n(a);for(var r in a)["default"].indexOf(r)<0&&function(t){i.d(e,t,(function(){return a[t]}))}(r);e["default"]=n.a},"66e9":function(t,e,i){"use strict";i.r(e);var a=i("d4ed"),n=i("9b95");for(var r in n)["default"].indexOf(r)<0&&function(t){i.d(e,t,(function(){return n[t]}))}(r);i("7bc0");var o=i("f0c5"),s=Object(o["a"])(n["default"],a["b"],a["c"],!1,null,"146d971c",null,!1,a["a"],void 0);e["default"]=s.exports},"731d":function(t,e,i){var a=i("c2ce");a.__esModule&&(a=a.default),"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=i("4f06").default;n("30078a9e",a,!0,{sourceMap:!1,shadowMode:!1})},7825:function(t,e,i){"use strict";i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return r})),i.d(e,"a",(function(){return a}));var a={guiPage:i("1d79").default,guiSwiper:i("d22b").default,jyfParser:i("66e9").default},n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("gui-page",{ref:"guiPage",attrs:{isLoading:t.pageLoading}},[a("v-uni-view",{staticClass:"fm",attrs:{slot:"gBody"},slot:"gBody"},[t.bannerList.length>0?a("v-uni-view",{staticClass:"m20"},[a("gui-swiper",{attrs:{swiperItems:t.bannerList,spacing:0,width:714,height:272,indicatorActiveWidth:20,indicatorBarHeight:30,indicatorWidth:14,indicatorHeight:6,indicatorColor:"#E7E7E7",indicatorActiveColor:"#ffffff"}})],1):t._e(),a("v-uni-view",{staticClass:"m20 gui-flex gui-space-around mt40"},[a("v-uni-navigator",{staticClass:"gui-flex gui-wrap gui-justify-content-center w150",attrs:{url:"/pages/zengzhi/pos/shop","hover-class":""}},[a("v-uni-view",{staticClass:"wh90 gui-flex gui-align-items-center gui-justify-content-center"},[a("v-uni-image",{attrs:{src:i("a8af"),mode:"aspectFit"}})],1),a("v-uni-view",{staticClass:"f26 wp100 gui-text-center mt10"},[t._v("机 具")])],1),a("v-uni-navigator",{staticClass:"gui-flex gui-wrap gui-justify-content-center w150",attrs:{url:"/pages/zengzhi/pos/myPos","hover-class":""}},[a("v-uni-view",{staticClass:"wh90 gui-flex gui-align-items-center gui-justify-content-center"},[a("v-uni-image",{attrs:{src:i("94f0"),mode:"aspectFit"}})],1),a("v-uni-view",{staticClass:"f26 wp100 gui-text-center mt10"},[t._v("终端")])],1),a("v-uni-navigator",{staticClass:"gui-flex gui-wrap gui-justify-content-center w150",attrs:{url:"/pages/zengzhi/pos/score","hover-class":""}},[a("v-uni-view",{staticClass:"wh90 gui-flex gui-align-items-center gui-justify-content-center"},[a("v-uni-image",{attrs:{src:i("c925"),mode:"aspectFit"}})],1),a("v-uni-view",{staticClass:"f26 wp100 gui-text-center mt10"},[t._v("积分")])],1)],1),a("v-uni-view",{staticClass:"m20 mt40 gui-flex gui-align-items-center"},[a("v-uni-view",{staticClass:"borderl"}),a("v-uni-text",{staticClass:"f26"},[t._v("产品介绍")])],1),a("v-uni-view",{staticClass:"m20"},[a("jyf-parser",{ref:"article",attrs:{html:t.content}})],1)],1)],1)},r=[]},"7bc0":function(t,e,i){"use strict";var a=i("1289"),n=i.n(a);n.a},"94f0":function(t,e){t.exports="data:image/png;base64,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"},"9b95":function(t,e,i){"use strict";i.r(e);var a=i("1c54"),n=i.n(a);for(var r in a)["default"].indexOf(r)<0&&function(t){i.d(e,t,(function(){return a[t]}))}(r);e["default"]=n.a},a482:function(t,e,i){"use strict";i.r(e);var a=i("7825"),n=i("4fdd");for(var r in n)["default"].indexOf(r)<0&&function(t){i.d(e,t,(function(){return n[t]}))}(r);i("f404");var o=i("f0c5"),s=Object(o["a"])(n["default"],a["b"],a["c"],!1,null,"bea7a96a",null,!1,a["a"],void 0);e["default"]=s.exports},a8af:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAACzVBMVEUAAAD/MAD/KRT/IR75KRf/GBj4KBj6KRj4KBj5Kxv4Khb4Khn0IhX4KBT4KRn0Jhr3KRf6KRb1HxD3KBn3KBf/ZmX4KBf2Ixf8TEb9KRf8SUH5KRn5KRj6KRj5KBf2JRT5IBD4Khj3Khf6KRj4KRX3KRj8Qzf5KRn4Khj5KBn/HBz4KRn5KBn4Jxj7RTz1KBT4KRf4KRj4KRf5MCH4Khj7RTz7QDX6NSf/Y2L/YF/5MSL6LR75KRn5MyT5Khn4KBb2JhP6OSz7TET5MSP4Kxr4LRz4JRf9U07/YF78Tkj+Xlz4Kxz8Tkj5Nin5Lh76RTv8Rz77QDb5NSb7RDv6OS3/IxH/Y2L7Qzn7PDH4MCD8S0P7RTz8SUH7RDr6PDD7QDT4LyD3Khf5NSb7NSn3Khn+XFr8S0T6PjP9UUv8Rz35LBz+XFj8TEX9UEr+Xlz6OSv/X176Nyn7QDX4MST9U078S0P8S0P6Rz/8RTz/YWD8TEX7PzT6Myf8Rz/6MiT5NSb+WVb9VlH8SUH6Oi75Nin4Myb8Qzn4Kxr+XVv/X13/Xlz7PjP/XFn4KRn/Xlz6PTL9T0n9VVH4Khr8T0n/Wlj8R0D4NCf7QTb8RDv7Qjj/ZWT7RTz6QTj8RTv/YWD7QTj8T0j4KRj/YWH4Kxr8VE/6SUH7PTL4Lh/7Qjj8RDv5OSz8RDr8TEX8SkL7SED7Nir9Qjj+Wlf/Zmb7Qzn7RDv/ZWX9VE73LRz6PzT+WFT9VVD6PTH6PjP7Qzn5Khn8Rz77PjL9VVL5KRn8T0r9WVb6PDH8Uk3/XFz7SEH7TkX/Zmb4Khn+W1j+Xlz7RDv7QTb4LBz6PjP5NSf8SED6OS36Nyr9V1P5MSL9VFD8TEX/ZGT/YmH+YV/8Tkj4Kxr7Qzn7Rz76PTH6OzD5MyX5MiT9WVX8SkP5MCD5Lx/4Lh79U07+YF78UUv/ZGP9Uk2+RRbMAAAAynRSTlMABQwHVwpZMiBRRmcXJj0UYy4RHjj8OhWkEnlaVDAsHBDmQTUkX1NPSSkJXFI0eRlNS0P8vIVm/OzRdWRTSSsjG/yEbm1qIvz6+uzmuLi4pJd4bF1XDvz8+ua+vbi4uIZwYk9HP/z8/Pv7+u3t7OTX1tG4uLOtpKSdmJFsaWFgRvv7+ubm5uXi4NzQycG5qqGek46NgFFN/PPw7+zbzMnCu7Wzraqkl5eSi4h0bUxAOTL5+Pf29PHq5ePg3tPPysmspaKViV5aTkc7PB6VaQAABkVJREFUWMPt2GVzE0EYB3CSize5kuS4EJJLQoRYQ9NAi7YUKw6lLe5Q3N3d3d3d3d2d4lrB3T4Dz16hMMBlNy+Z4f+m3cnMbzbZfZ7du0L/8z0ifMgtivJJxfhIKYoSkXC+BcuuCSc7+0tOTm7up6ysrBvdF/jwJCW9fI3Qu3HjzU4phZug1DaU3Hs41ybFTJFqpF5H7j0coG5EYSZotK4j9x4PsBrDT1EkNlSaRe49HljJIA4LUuJYzQJy72NJTayYCg+qNeyMIoRejeYsDhSJ1c5AaPiwOUX/kkGQjRsHQxqgDNkyIhRwwlcOD0YrtLSnosnVrl3hcGnXzmWq6KG1imgMKNVZvQG7x22W4GJ2e+wBr1UnxSyKcc+lkTt2bC/2Z0oWpCGf7cOHJ2TsMYb9DUW+6KH7yNb36+e8vCdP3o4bEk2JhD1KDHUXiXfv3vNUsbBIiRUHI/VuLlGIKeEVuVokUu9mk92wLoK7etd3sEjZ/CzjvZq1Id27d9/Le4d69uzZA9KJ9541yVQLTZHSWa8AiLx4l0kmkcj8rgHgTUnzw0hm8qcdA2+gy48+Mrm2dUXercUdrDZKqNModuaDU9v5ZeaKZhDTGufkzHGZJGhkcg15+LhGGnhm+MhVeAXybnVepICOI9RpFuaDffwSZTAuLhgjGdE4JzdVZnbHxcW5zbJUqN8Rkhh30K2UmMofQN6dzu2h4wiBzh+gOahKnzErURUc1Tg3d5jbE5o/Y1jI497y+GONUUGVZ+DplStPLuG9O02VTkFQrSnxHYyzM6uuZc9l7Rk1cz/NV9EZsL4ZtGrrx69dMkJ0Kr+++d6LpkqNGguWCzHcquzsC3K2fc1PWVVoZiSsbzpDx3/9XKs969j6i/eyMhGYKU/aNWtokiWQWDMrqwobSIf9kh5g4z/n1Up0cPIhLVavnr6U9+6TgSynSdErKnm50QhkHOmwX9IdTHxeXq3RckuSNkCrYto2RR4paHEq9HoAO3TMugHgSKiPkQh80qkDgBY5rXKbeiPvQRkikEGgwmlhzkK9VaHZBKi3BJaOh3prwHIWC8fY4yS9kUcOLuzTq1ev2uABSCdA/SbQdBtUv8snTZq0YhRMsTfy7pKA2eVYraZcQT9AIPQDBBbslxMO2tMXeSRgdvY0lvNOLegv8TTdvgvsFwAL9ktrjgn1Rd6rUlgQ+ss0Wq6d8sMDkGESUhMYhm4D3tIzs2dv2uaAdemLvNdYEPWraZmMY0pB/4unHQG5XB5wsG1gfuWVnkyHNimJY/si7xEO5Pvp1BCdWbugn6bSDk6r1XIOdhN836gYqEvOAjPsjTw8yPfnORc3/OzPPYcvSuwwukPiorTl8PtNrzpK4k5MTHRv5r13GLBxuH5fUL/8fsn33ncLBzpLNI7U+/BB6VQL90O6bKTe7cO0cD+MTpHPjdS7PU+eEi0A+ox6zn6+V82OHTuOGTNm7NixNWp06VKrVqdO48Z17dq1SZMmizt3btq0MqQMpBSkW7fJm+2c3ugD8C+hbMlexmMeUZVP27bl+bRtW716VAWUqOrVq1WrhkaFYRCFBlFmD+NNtlFC57IB3eWUcEZC/H6/C+L3m0zorgUHnYT/QCZDIwkE/lOiG51BLACKfLZYp5a1e+BQUypjYmIqQuCP8u9xu4MeO6t1xtp8IuHLXGwlS2D0sIF1IS1RWkH6QVpD6vHpD6nPZ/08VcBSKTbMhU6ExJTdRwnX9/bTyUwKeOHvcwbrfGLv6fV5VkM4D0SxLnkDuXd9fbIOd8c2WgeQe9fXEjxJKeoSewAqcE9SjdSauqQeZKYG8/SIimUNsQcglAkGtFrWkHqQ0hY9BtTptc2JPQC1eh0eJPTIQbwXIYj1IgRb4LyIQYwXOYjxIgcxXqQg14rYg0rhsKBVO5vUg5zTWnW40kvK2E/sdTMnWTGl1yhWw6RNP35k/PjxEyZMmDhxYjOUOnyK/5bJp6oxmthGFKYfpsjtQXgyjMKlsEsWtMtTDARvRRz2uBg4dcNHIoF7ogP7VgQd9nqvnLWHVLiE7Kzcq//lkBc87A1Wp9fCyXHhLF6n1YAOeZwoNqqT9Qp89MlqoxjrgUhJxTad0RgdPkajziaWUryHJ9F7Ylx8FAXc//wT+QZZqXwr/MaxsQAAAABJRU5ErkJggg=="},a9fe:function(t,e,i){"use strict";var a;i("7a82"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,i("d3b7"),i("159b"),i("14d9");var n={data:function(){return{pageLoading:!1,bannerList:[],content:""}},onLoad:function(){a=this,a.getBannerList(),a.getConfigField()},methods:{getConfigField:function(){a.pageLoading=!0,uni.gRequest.post("swoft/api/config/getConfigField",{data:{field:"posContent"}},(function(t){0==t.code?a.content=t.data:a.$refs.guiPage.openMessage("default",t.msg,!0,1500)}),(function(t){a.$refs.guiPage.openMessage("default","请求错误",!0,1500)}),(function(t){a.pageLoading=!1}),!0,!0)},getBannerList:function(){uni.gRequest.post("swoft/api/banner/getBannerList",{data:{type:8}},(function(t){0==t.code?(a.bannerList=[],t.data.forEach((function(t){var e={};e.img=t.path+"?imageslim",e.title="",e.url=t.url,""!=t.url?e.opentype="navigate":e.opentype="click",a.bannerList.push(e)}))):a.$refs.guiPage.openMessage("default",t.msg,!0,1500)}),(function(t){a.$refs.guiPage.openMessage("default","请求错误",!0,1500)}),(function(t){3==t.data.code&&(a.$refs.guiPage.openMessage("default","请重新登录",!0,1500),setTimeout((function(){uni.gRequest.gotoLogin()}),1500))}),!0,!0)}}};e.default=n},b645:function(t,e,i){"use strict";var a=i("13a3"),n=i.n(a);n.a},b85c:function(t,e,i){"use strict";i("7a82"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(t,e){var i="undefined"!==typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!i){if(Array.isArray(t)||(i=(0,a.default)(t))||e&&t&&"number"===typeof t.length){i&&(t=i);var n=0,r=function(){};return{s:r,n:function(){return n>=t.length?{done:!0}:{done:!1,value:t[n++]}},e:function(t){throw t},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,s=!0,d=!1;return{s:function(){i=i.call(t)},n:function(){var t=i.next();return s=t.done,t},e:function(t){d=!0,o=t},f:function(){try{s||null==i["return"]||i["return"]()}finally{if(d)throw o}}}},i("a4d3"),i("e01a"),i("d3b7"),i("d28b"),i("3ca3"),i("ddb0"),i("d9e2"),i("d401");var a=function(t){return t&&t.__esModule?t:{default:t}}(i("06c5"))},c0b8:function(t,e,i){var a=i("24fb");e=a(!1),e.push([t.i,"@-webkit-keyframes _show-data-v-146d971c{0%{opacity:0}100%{opacity:1}}@keyframes _show-data-v-146d971c{0%{opacity:0}100%{opacity:1}}\n\n\n\n",""]),t.exports=e},c197:function(t,e,i){"use strict";i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return n})),i.d(e,"a",(function(){}));var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"gui-swiper-card-wrap"},[i("v-uni-swiper",{staticClass:"gui-swiper-card",style:{width:t.width+"rpx",height:t.heightIn+"rpx"},attrs:{"indicator-dots":!1,interval:t.interval,circular:t.circular,autoplay:t.autoplay,current:t.currentIndex,"previous-margin":t.spacing+"rpx","next-margin":t.spacing+"rpx"},on:{change:function(e){arguments[0]=e=t.$handleEvent(e),t.swiperchange.apply(void 0,arguments)}}},t._l(t.swiperItems,(function(e,a){return i("v-uni-swiper-item",{key:a,staticClass:"gui-swiper-card-item gui-border-box"},["click"!=e.opentype?i("v-uni-navigator",{staticClass:"gui-swiper-card-nav gui-transition-all",style:{paddingLeft:t.current!=a?t.padding+"rpx":"0rpx",paddingRight:t.current!=a?t.padding+"rpx":"0rpx",paddingTop:t.current!=a?t.paddingY+"rpx":"0rpx",paddingBottom:t.current!=a?t.paddingY+"rpx":"0rpx"},attrs:{url:e.url,"open-type":e.opentype,"hover-class":"none"}},[i("v-uni-image",{staticClass:"gui-swiper-card-image gui-transition-all",style:{borderRadius:t.borderRadius,width:t.current!=a?t.widthInSamll+"rpx":t.widthIn+"rpx",height:t.current!=a?t.heightInSmall+"rpx":t.heightIn+"rpx",opacity:t.current!=a?t.opacity:1},attrs:{src:e.img,mode:t.mode}})],1):t._e(),"click"==e.opentype?i("v-uni-view",{staticClass:"gui-swiper-card-nav gui-transition-all",style:{paddingLeft:t.current!=a?t.padding+"rpx":"0rpx",paddingRight:t.current!=a?t.padding+"rpx":"0rpx",paddingTop:t.current!=a?t.paddingY+"rpx":"0rpx",paddingBottom:t.current!=a?t.paddingY+"rpx":"0rpx"},attrs:{"hover-class":"none","data-index":a},on:{click:function(e){e.stopPropagation(),arguments[0]=e=t.$handleEvent(e),t.taped.apply(void 0,arguments)}}},[i("v-uni-image",{staticClass:"gui-swiper-card-image gui-transition-all",style:{borderRadius:t.borderRadius,width:t.current!=a?t.widthInSamll+"rpx":t.widthIn+"rpx",height:t.current!=a?t.heightInSmall+"rpx":t.heightIn+"rpx",opacity:t.current!=a?t.opacity:1},attrs:{src:e.img,mode:t.mode}})],1):t._e(),"number"==t.indicatorType?i("v-uni-view",{staticClass:"gui-indicator-dot-numbers gui-flex gui-rows gui-nowrap",style:{height:t.indicatorBarHeight+"rpx",backgroundColor:t.indicatorBarBgColor,"border-bottom-left-radius":t.borderRadius,"border-bottom-right-radius":t.borderRadius,width:t.current!=a?t.widthInSamll+"rpx":t.widthIn+"rpx",left:t.current!=a?t.padding+"rpx":"0rpx",bottom:t.current!=a?t.paddingY+"rpx":"0rpx"}},[i("v-uni-text",{staticClass:"gui-indicator-dot-text",style:{paddingLeft:"20rpx",fontStyle:"italic",color:t.titleColor}},[t._v(t._s(a+1))]),i("v-uni-text",{staticClass:"gui-indicator-dot-text",style:{fontSize:"36rpx",color:t.titleColor}},[t._v("/")]),i("v-uni-text",{staticClass:"gui-indicator-dot-text",style:{fontSize:"28rpx",paddingRight:"20rpx",fontStyle:"italic",color:t.titleColor}},[t._v(t._s(t.swiperItems.length))]),i("v-uni-text",{staticClass:"gui-swiper-text gui-block-text gui-flex1 gui-ellipsis",style:{color:t.titleColor,fontSize:t.titleSize,height:t.indicatorBarHeight+"rpx",lineHeight:t.indicatorBarHeight+"rpx"}},[t._v(t._s(e.title))])],1):t._e(),a==t.swiperItems.length-1&&t.isShowBtn?i("v-uni-view",{staticClass:"btn f30 fb",on:{click:function(e){e.stopPropagation(),arguments[0]=e=t.$handleEvent(e),t.clickBtn.apply(void 0,arguments)}}},[t._v("开启生活娱乐")]):t._e()],1)})),1),"dot"==t.indicatorType?i("v-uni-view",{staticClass:"gui-indicator-dots gui-flex gui-rows gui-nowrap gui-justify-content-center gui-align-items-center gui-border-box",style:{width:t.width+"rpx",height:t.indicatorBarHeight+"rpx",position:t.indicatorPosition,paddingLeft:t.spacing+"rpx",paddingRight:t.spacing+"rpx","justify-content":t.indicatorDirection}},[i("v-uni-view",{staticClass:"gui-indicator-dots-wrap gui-flex gui-rows gui-nowrap gui-justify-content-center"},t._l(t.swiperItems,(function(e,a){return i("v-uni-view",{key:a,class:["gui-indicator-dot",t.current==a?"dot-show":""],style:{width:t.current!=a?t.indicatorWidth+"rpx":t.indicatorActiveWidth+"rpx",height:t.indicatorHeight+"rpx",borderRadius:t.indicatorRadius+"rpx",backgroundColor:t.current!=a?t.indicatorColor:t.indicatorActiveColor}})})),1)],1):t._e()],1)},n=[]},c2ce:function(t,e,i){var a=i("24fb");e=a(!1),e.push([t.i,"uni-page-body[data-v-bea7a96a]{background-color:#f5f5f9}body.?%PAGE?%[data-v-bea7a96a]{background-color:#f5f5f9}.wh90[data-v-bea7a96a]{width:%?90?%;height:%?90?%;background-color:#fff;border-radius:%?20?%}.wh90 uni-image[data-v-bea7a96a]{width:70%;height:70%}.w150[data-v-bea7a96a]{width:%?150?%}.borderl[data-v-bea7a96a]{height:%?26?%;border-left:thin solid #ff4f00;margin-right:%?14?%}",""]),t.exports=e},c925:function(t,e){t.exports="data:image/png;base64,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"},d22b:function(t,e,i){"use strict";i.r(e);var a=i("c197"),n=i("57e6");for(var r in n)["default"].indexOf(r)<0&&function(t){i.d(e,t,(function(){return n[t]}))}(r);i("b645");var o=i("f0c5"),s=Object(o["a"])(n["default"],a["b"],a["c"],!1,null,"4404e12f",null,!1,a["a"],void 0);e["default"]=s.exports},d4ed:function(t,e,i){"use strict";i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return n})),i.d(e,"a",(function(){}));var a=function(){var t=this.$createElement,e=this._self._c||t;return e("v-uni-view",[this.nodes.length?this._e():this._t("default"),e("v-uni-view",{style:this.showAm+(this.selectable?";user-select:text;-webkit-user-select:text":""),attrs:{id:"_top"}},[e("div",{attrs:{id:"rtf"+this.uid}})])],2)},n=[]},f404:function(t,e,i){"use strict";var a=i("731d"),n=i.n(a);n.a},fc91:function(t,e){var i={errorImg:null,filter:null,highlight:null,onText:null,entities:{quot:'"',apos:"'",semi:";",nbsp:" ",ensp:" ",emsp:" ",ndash:"–",mdash:"—",middot:"·",lsquo:"‘",rsquo:"’",ldquo:"“",rdquo:"”",bull:"•",hellip:"…"},blankChar:a(" , ,\t,\r,\n,\f"),boolAttrs:a("allowfullscreen,autoplay,autostart,controls,ignore,loop,muted"),blockTags:a("address,article,aside,body,caption,center,cite,footer,header,html,nav,pre,section"),ignoreTags:a("area,base,canvas,frame,iframe,input,link,map,meta,param,script,source,style,svg,textarea,title,track,wbr"),richOnlyTags:a("a,colgroup,fieldset,legend,table"),selfClosingTags:a("area,base,br,col,circle,ellipse,embed,frame,hr,img,input,line,link,meta,param,path,polygon,rect,source,track,use,wbr"),trustTags:a("a,abbr,ad,audio,b,blockquote,br,code,col,colgroup,dd,del,dl,dt,div,em,fieldset,h1,h2,h3,h4,h5,h6,hr,i,img,ins,label,legend,li,ol,p,q,source,span,strong,sub,sup,table,tbody,td,tfoot,th,thead,tr,title,ul,video"),userAgentStyles:{address:"font-style:italic",big:"display:inline;font-size:1.2em",blockquote:"background-color:#f6f6f6;border-left:3px solid #dbdbdb;color:#6c6c6c;padding:5px 0 5px 10px",caption:"display:table-caption;text-align:center",center:"text-align:center",cite:"font-style:italic",dd:"margin-left:40px",mark:"background-color:yellow",pre:"font-family:monospace;white-space:pre;overflow:scroll",s:"text-decoration:line-through",small:"display:inline;font-size:0.8em",u:"text-decoration:underline"}};function a(t){for(var e=Object.create(null),i=t.split(","),a=i.length;a--;)e[i[a]]=!0;return e}t.exports=i}}]);