<template>
	<gui-page :isLoading="pageLoading" ref="guiPage">
		<view slot="gBody">
			<view class="p20" v-if="content"><jyf-parser :html="content" ref="article"></jyf-parser></view>
		</view>
	</gui-page>
</template>
<script>
import jyfParser from "@/components/jyf-parser/jyf-parser";
var _this;
export default {
	data() {
		return {
			pageLoading: true,
			content: null
		}
	},
	onLoad: function(e){
		_this = this;
		let url = '';
		let title = '';
		let data = {};
		switch(e.type){
			case 'notice': 
				url = 'api/notice/getNoticeDetail';
				data.id = e.id;
			break;
			case 'faxian':
				url = 'api/faxian/getFaxianDetail';
				data.id = e.id;
			break;
			case 'business':
				url = 'api/config/getBusiness';
				uni.setNavigationBarTitle({
					title: '商务合作'
				})
			break;
			case 'aboutUs':
				url = 'api/config/getAboutUs';
				uni.setNavigationBarTitle({
					title: '关于我们'
				})
			break;
			case 'newBie':
				url = 'api/config/getNewbie';
				uni.setNavigationBarTitle({
					title: '新手指南'
				})
			break;
			case 'myFee':
				url = 'api/config/getConfigField';
				data.field = 'myFee';
				uni.setNavigationBarTitle({
					title: '我的费率'
				})
			break;
			case 'bankMmoeney':
				url = 'api/config/getConfigField';
				data.field = 'bankMmoeney';
				uni.setNavigationBarTitle({
					title: '银行限额表'
				})
			break;
			case 'usefulJijin':
				url = 'api/config/getConfigField';
				data.field = 'usefulJijin';
				uni.setNavigationBarTitle({
					title: '有用基金'
				})
			break;
			case 'usefulBang':
				url = 'api/config/getConfigField';
				data.field = 'usefulBang';
				uni.setNavigationBarTitle({
					title: '有用帮扶'
				})
			break;
			case 'partnershipAgreement':
				url = 'api/config/getConfigField';
				data.field = 'partnershipAgreement';
				uni.setNavigationBarTitle({
					title: '共享经济合作伙伴协议'
				})
			break;
		}
		_this.pageLoading = true;
		uni.gRequest.post(
			'swoft/'+url,
			{
				data: data
			}, 
			(res) => {
				if(res.code == 0){
					if(e.type == 'notice' | e.type == 'faxian'){
						uni.setNavigationBarTitle({
							title: res.data.title
						})
						_this.content = res.data.content;
					}
					if(e.type == 'business' || e.type == 'aboutUs' || e.type == 'newBie' || e.type == 'myFee' || e.type == 'bankMmoeney' || e.type == 'usefulJijin' || e.type == 'usefulBang' || e.type == 'partnershipAgreement'){
						_this.content = res.data;
					}
				}else{
					_this.$refs.guiPage.openMessage('default',res.msg,true,1500);
				}
			},
			(error) => {
				_this.$refs.guiPage.openMessage('default','请求错误',true,1500);
			},
			(res) => {
				_this.pageLoading = false;
				if(res.data.code == 3){
					_this.$refs.guiPage.openMessage('default','请重新登录',true,1500);
					setTimeout(function(){
						uni.gRequest.gotoLogin();
					},1500);
				}
			},
			true,
			true
		);
	},
	methods: {
		
	},
	components: {
		jyfParser
	}
}
</script>
<style>
	
</style>