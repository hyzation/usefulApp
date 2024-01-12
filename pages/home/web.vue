<template>
	<gui-page :isLoading="pageLoading" ref="guiPage">
		<view slot="gBody">
			<web-view v-if="url != ''" :webview-styles="webviewStyles" :src="url"></web-view>
		</view>
	</gui-page>
</template>
<script>
var _this;
export default {
	data() {
		return {
			pageLoading: true,
			url: '',
			webviewStyles: {
				progress: {
					color: '#FF4F00'
				}
			}
		}
	},
	onLoad: function(e){
		_this = this;
		_this.url = decodeURIComponent(e.url);
	},
	onReady: function(){
		// #ifdef APP-PLUS
		var currentWebviews = _this.$scope.$getAppWebview().children()[0];
		//监听注入的js
		currentWebviews.addEventListener("loaded", function() {
			// 关闭mui
			currentWebviews.evalJS(
				"mui.init({keyEventBind: {backbutton: false }});"
			);
		});
		// #endif
	},
	methods: {

	}
}
</script>
<style>
	
</style>