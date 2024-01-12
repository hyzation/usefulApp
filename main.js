import Vue from 'vue'
import App from './App'
// 引入主包依赖
import TencentCloudChat  from "@tencentcloud/chat";
import TUICore from "@tencentcloud/tui-core";

Vue.config.productionTip = false
App.mpType = 'app'

import VueCompositionAPI from "@vue/composition-api";
Vue.use(VueCompositionAPI);

let graceJS = require('@/GraceUI5/js/grace.js');
uni.gJS = graceJS;

import GraceRequest from './GraceUI5/js/request/request.js';
uni.gRequest = GraceRequest;

// Mins. 封装一层请求 
uni.unionRequest = (path, data = {}) => {
	return new Promise(resolve => {
		let header = {
			logintoken: uni.getStorageSync('uToken')
		}
		data  = GraceRequest.signValue(data);
		GraceRequest.post(
			path,
			{
				data,
				header
			},
			(res) => {
				resolve(res)
			}
		)
	})
}

const app = new Vue({
    ...App
})
app.$mount()