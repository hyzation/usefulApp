(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-my-wallet-cashRecord"],{"0b05":function(t,e,a){"use strict";a.d(e,"b",(function(){return n})),a.d(e,"c",(function(){return o})),a.d(e,"a",(function(){return i}));var i={guiPage:a("1d79").default,guiEmpty:a("b09d").default,guiLoadmore:a("5b7c").default},n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("gui-page",{ref:"guiPage",attrs:{isLoading:t.pageLoading}},[i("v-uni-view",{attrs:{slot:"gBody"},slot:"gBody"},[i("v-uni-scroll-view",{style:"height:"+t.mainHeight+"px;",attrs:{id:"list","scroll-y":!0},on:{scrolltolower:function(e){arguments[0]=e=t.$handleEvent(e),t.scrolltolower.apply(void 0,arguments)}}},[i("v-uni-view",{staticClass:"w710 mlr20"},t._l(t.productList,(function(e,a){return i("v-uni-view",{key:a,staticClass:"list-item gui-flex gui-column gui-justify-content-center gui-relative borderBottom"},[i("v-uni-view",{staticClass:"gui-flex gui-align-items-center gui-space-between"},[i("v-uni-view",{},[1==e.type?i("v-uni-view",{},[i("v-uni-text",{staticClass:"f28"},[t._v(t._s(e.bankName))]),i("v-uni-text",{staticClass:"f22 ml10"},[t._v("("+t._s(t._f("dealBankCardNumber")(e.bankCard))+")")])],1):t._e(),2==e.type?i("v-uni-view",{},[i("v-uni-text",{staticClass:"f28"},[t._v("支付宝")]),i("v-uni-text",{staticClass:"f22 ml10"},[t._v("("+t._s(t._f("dealPhoneNumber")(e.aliAccount))+")")])],1):t._e(),i("v-uni-view",{},[i("v-uni-text",{staticClass:"f22"},[t._v("订单号："+t._s(e.orderNo))])],1),i("v-uni-view",{staticClass:"f22 c99 mt10"},[t._v(t._s(e.created_at))])],1),i("v-uni-view",{staticClass:"gui-text-right"},[-1==e.status?[i("v-uni-view",{staticClass:"c999999 f28"},[t._v("提现失败")]),i("v-uni-view",{staticClass:"c999999 f28 mt10"},[t._v("-"+t._s(e.money))])]:t._e(),0==e.status?[i("v-uni-view",{staticClass:"cFD2C55 f28"},[t._v("提现中")]),i("v-uni-view",{staticClass:"cFD2C55 f28 mt10"},[t._v("-"+t._s(e.money))])]:t._e(),1==e.status?[i("v-uni-view",{staticClass:"f28 cFF4F00"},[t._v("提现成功")]),i("v-uni-view",{staticClass:"cFD2C55 f28 mt10"},[t._v("-"+t._s(e.money))])]:t._e()],2)],1)],1)})),1),t.isEmpty?i("gui-empty",[i("v-uni-view",{staticClass:"gui-flex gui-rows gui-justify-content-center",attrs:{slot:"img"},slot:"img"},[i("v-uni-image",{staticClass:"gui-empty-img",attrs:{src:a("a89d")}})],1)],1):t._e(),i("gui-loadmore",{ref:"loadmorecom"})],1)],1)],1)},o=[]},1774:function(t,e,a){"use strict";a("7a82"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,a("99af");var i,n=1,o=0,f={data:function(){return{pageLoading:!1,apiLoadingStatus:!1,loadMoreTimer:null,isEmpty:!1,productList:[],mainHeight:0}},filters:{dealBankCardNumber:function(t){if(t)return t=t.substring(0,4)+" **** **** "+t.substring(t.length-4),t},dealPhoneNumber:function(t){if(t)return t=t.substring(0,3)+" **** "+t.substring(t.length-4),t}},onLoad:function(){i=this,i.reload()},onShow:function(){},onReady:function(){setTimeout((function(){i.mainHeight=uni.gJS.system().windowHeight}),500)},methods:{scrolltolower:function(){i.apiLoadingStatus||(null!=i.loadMoreTimer&&clearTimeout(i.loadMoreTimer),i.loadMoreTimer=setTimeout((function(){0==i.$refs.loadmorecom.loadMoreStatus&&(i.$refs.loadmorecom.loading(),i.getdata())}),80))},reload:function(){i.pageLoading=!0,i.productList=[],n=1,void 0!=i.$refs.loadmorecom&&i.$refs.loadmorecom.stoploadmore(),i.getdata()},getdata:function(t){i.apiLoadingStatus=!0,i.pageLoading=!0,uni.gRequest.post("swoft/api/user/getUserWithdrawalList",{data:{uid:uni.getStorageSync("userInfo").id,page:n,limit:20}},(function(t){0==t.code?(1==n&&(o=t.data.count),0==o?(i.isEmpty=!0,i.$refs.loadmorecom.empty()):(i.isEmpty=!1,i.productList=i.productList.concat(t.data.data),n>=o?i.$refs.loadmorecom.nomore():(i.$refs.loadmorecom.stoploadmore(),n++))):i.$refs.guiPage.openMessage("default",t.msg,!0,1500),i.apiLoadingStatus=!1,i.pageLoading=!1}),(function(t){i.$refs.guiPage.openMessage("default","请求错误",!0,1500)}),(function(t){i.pageLoading=!1,3==t.data.code&&(i.$refs.guiPage.openMessage("default","请重新登录",!0,1500),setTimeout((function(){uni.gRequest.gotoLogin()}),1500))}),!0,!0)}}};e.default=f},"28d9":function(t,e,a){t.exports=a.p+"static/img/gzkuang.440f03d3.png"},"4d06":function(t,e,a){"use strict";a.r(e);var i=a("1774"),n=a.n(i);for(var o in i)["default"].indexOf(o)<0&&function(t){a.d(e,t,(function(){return i[t]}))}(o);e["default"]=n.a},5339:function(t,e,a){var i=a("24fb"),n=a("1de5"),o=a("28d9");e=i(!1);var f=n(o);e.push([t.i,'uni-page-body[data-v-52e8f572]{font-family:MEDIUM}.mt46[data-v-52e8f572]{margin-top:%?46?%}.mr30[data-v-52e8f572]{margin-right:%?30?%}.mauto[data-v-52e8f572]{margin:0 auto}.bgff[data-v-52e8f572]{background-color:#fff}.bgF5D395[data-v-52e8f572]{background-color:#f5d395}.p20[data-v-52e8f572]{padding:%?20?%}.plr20[data-v-52e8f572]{padding-left:%?20?%;padding-right:%?20?%}.ptb20[data-v-52e8f572]{padding-top:%?20?%;padding-bottom:%?20?%}.mt20[data-v-52e8f572]{margin-top:%?20?%}.mt30[data-v-52e8f572]{margin-top:%?30?%}.ml10[data-v-52e8f572]{margin-left:%?10?%}.ml20[data-v-52e8f572]{margin-left:%?20?%}.mlr20[data-v-52e8f572]{margin-left:%?20?%;margin-right:%?20?%}.mt10[data-v-52e8f572]{margin-top:%?10?%}.mb10[data-v-52e8f572]{margin-bottom:%?10?%}.f28[data-v-52e8f572]{font-size:%?28?%}.f26[data-v-52e8f572]{font-size:%?26?%}.f22[data-v-52e8f572]{font-size:%?22?%}.f36[data-v-52e8f572]{font-size:%?36?%}.f24[data-v-52e8f572]{font-size:%?24?%}.c99[data-v-52e8f572]{color:#666}.c989898[data-v-52e8f572]{color:#989898}.cff4f00[data-v-52e8f572]{color:#ff4f00}.c33[data-v-52e8f572]{color:#333}.bgff4f00[data-v-52e8f572]{background-color:#ff4f00}.btn1[data-v-52e8f572]{width:%?200?%;height:%?90?%;border-radius:%?45?%;line-height:%?90?%;text-align:center}.btn2[data-v-52e8f572]{width:%?196?%;height:%?86?%;border-radius:%?45?%;line-height:%?90?%;text-align:center}.tag1[data-v-52e8f572]{height:%?40?%;border-radius:%?20?%;width:%?110?%;text-align:center;line-height:%?40?%}.tag2[data-v-52e8f572]{height:%?40?%;border-radius:%?20?%;width:%?80?%;text-align:center;line-height:%?40?%}.btn-A[data-v-52e8f572]{width:%?690?%;height:%?90?%;border-radius:45px;line-height:%?90?%;text-align:center;margin:0 auto}.border-ff4f00[data-v-52e8f572]{border:%?1?% solid #ff4f00}.c66[data-v-52e8f572]{color:#666}.cff[data-v-52e8f572]{color:#fff}.no-scale[data-v-52e8f572]{flex-shrink:0}.wp100[data-v-52e8f572]{width:100%}.fw500[data-v-52e8f572]{font-weight:500}.borderBottom[data-v-52e8f572]:before{content:" ";position:absolute;bottom:0;left:0;right:0;border-bottom:1px solid #f1f1f1;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.gui-header-leader-btns[data-v-52e8f572]{width:%?68?%;line-height:%?60?%;font-size:%?50?%;text-align:center;margin-left:%?10?%}.roletext[data-v-52e8f572]{position:absolute;bottom:%?70?%;left:%?132?%;z-index:99999}.w400[data-v-52e8f572]{width:%?400?%}.h720[data-v-52e8f572]{height:%?720?%}.w710[data-v-52e8f572]{width:%?710?%}.cFD2C55[data-v-52e8f572]{color:#fd2c55}.list-item[data-v-52e8f572]{padding:%?20?% 0 %?30?% 0}.plr40[data-v-52e8f572]{padding-left:%?40?%;padding-right:%?40?%}.pt40[data-v-52e8f572]{padding-top:%?40?%}.pb40[data-v-52e8f572]{padding-bottom:%?40?%}.mt46[data-v-52e8f572]{margin-top:%?46?%}.mt50[data-v-52e8f572]{margin-top:%?50?%}.f46[data-v-52e8f572]{font-size:%?46?%}.mt40[data-v-52e8f572]{margin-top:%?40?%}.f50[data-v-52e8f572]{font-size:%?50?%}.f34[data-v-52e8f572]{font-size:%?34?%}.lh100[data-v-52e8f572]{line-height:%?110?%}.h210[data-v-52e8f572]{height:%?210?%}.bgffc2a6-ffdfd1[data-v-52e8f572]{background:linear-gradient(-90deg,#ffc2a6,#ffdfd1)}.cFF4F00[data-v-52e8f572]{color:#ff4f00}.qiandaoModal[data-v-52e8f572]{background:url('+f+") no-repeat 0 0;background-size:100% auto;padding:%?280?% %?100?% %?60?% %?100?%;height:%?730?%}.img52[data-v-52e8f572]{width:%?52?%;height:%?52?%;margin:0 auto}",""]),t.exports=e},"75d2":function(t,e){},7874:function(t,e,a){"use strict";a.d(e,"b",(function(){return i})),a.d(e,"c",(function(){return n})),a.d(e,"a",(function(){}));var i=function(){var t=this.$createElement,e=this._self._c||t;return e("v-uni-view",{staticClass:"gui-flex gui-columns gui-justify-content-center gui-align-items-center"},[this._t("img"),this._t("text"),this._t("other")],2)},n=[]},"853e":function(t,e,a){var i=a("5339");i.__esModule&&(i=i.default),"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var n=a("4f06").default;n("773db461",i,!0,{sourceMap:!1,shadowMode:!1})},a627:function(t,e,a){"use strict";a.r(e);var i=a("75d2"),n=a.n(i);for(var o in i)["default"].indexOf(o)<0&&function(t){a.d(e,t,(function(){return i[t]}))}(o);e["default"]=n.a},a89d:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAP1BMVEUAAACZmZmZmZmZmZmtra2ZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmlpaWpqamZmZmjo6OQDVwlAAAAE3RSTlMAgMBAoBAg8KFg0TDgcLCQUMhMhngDlgAAA39JREFUeNrt3NtymzAUheF9qLR1BFL1/Z+1QKlp65pOM5RY7vouCI5u+I0kPJ5JCAAAAAAAAAAAAAAAAAAA/gUVeg0IeSqRORRm9tS5lwl5mamFEAAAgA820o88D3IOznQtoZ2XVgKfIpQmF6Xch2QrSqfRZJGuEpkLM9PKmzg6U7BM15H9LDk6lyS6zB6Sm9LJfIt0mfF2kuh0w0DXk5FOx4muJ0w3SjfZ305dpr+kjS63h7ixlTY6WkQrreTbQ8ZqTyFD8uTTQDM1JarmlrwSHKnVd4V4pavsIb6t121+aYo0C3W5N4lmWt4VokxX2UNUvr3Ub4cZ83aYNVq8tSOfnyMk2/pjfSrLRLNxGanDNvjXd8QzB2FWusa+RiTMhyA0i8UvV+PXuRbnQ+K/D3GqNah6usYe4lKRsn1cGZski9udSmKB+lkjM1WljVd13wNVM/UVcpI9xHk60k/IMYS8eMjb26fTvX2h64nw6QKmFkIQgpAdQhCCkGMIQQhCjiEEIQg5hhCEIOTYhSG5Rv94pJsQl9osPB7pJSS1VXg80kdIbhv/eKSLEG4bfTyCkAWm1v+62F9n+32ZB+ILfURBCEIQghCE7BCCkJmPo0hrRQbWfkM8F5sD1JFqHJMF7TLEhRamX7qK9hdSLXj6VbTB9RXihqK/v02mPYW49PCdjy32E+JSoIeyxW5C5o4DueVeQiZHR6ZuQl7wyY6QAwhBCEKO/e8hXpllM3BV12fIZCYjT/pN5SCthLjEZE+nc0onO/ozVa3S0tzyClwcWsj0Evxo8o9SvKpmuo5jC+7khDiKNROR0pqM0dM1XLB6YkVNbWD1t4XP0pLSNbSIo1NMYmG6/62nC9x9mXAoRx5kxqx0J5by4ftgtEg3Xhf3lzQFKwNHVZ04pCbV0Q9USqSPly1835PNZNES+593hVTzr7u3v70ajekp5DSX+GCp+tsNaKPbM4L+bvfeUrQM64mb+NrZlfVu+rgUxvUt3nkpeZt54o+2vGp1zRmacLgyhE1WzYbq9pLh7mqrxe0Lx0c0iQ9rr0qpjj6I3yb6Q7FN+fiR6caW3DMsEh8aH5WYRTo2ufVZ9PH/yzQncWvSVJXu1Eh/sC2SJ+BSmnPEJKR3XtDwJJ+iXRpjY7fuo4F65s3yrYl6FjNt3McvWgAAAAAAAAAAAAAAAAAAAAAA2HwFkNAqhXzv7a4AAAAASUVORK5CYII="},b09d:function(t,e,a){"use strict";a.r(e);var i=a("7874"),n=a("a627");for(var o in n)["default"].indexOf(o)<0&&function(t){a.d(e,t,(function(){return n[t]}))}(o);var f=a("f0c5"),r=Object(f["a"])(n["default"],i["b"],i["c"],!1,null,"1ae3d434",null,!1,i["a"],void 0);e["default"]=r.exports},f145:function(t,e,a){"use strict";a.r(e);var i=a("0b05"),n=a("4d06");for(var o in n)["default"].indexOf(o)<0&&function(t){a.d(e,t,(function(){return n[t]}))}(o);a("f320");var f=a("f0c5"),r=Object(f["a"])(n["default"],i["b"],i["c"],!1,null,"52e8f572",null,!1,i["a"],void 0);e["default"]=r.exports},f320:function(t,e,a){"use strict";var i=a("853e"),n=a.n(i);n.a}}]);