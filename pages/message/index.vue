<template>
	<gui-page :isLoading="pageLoading">
		<view slot="gBody" class="fullPage gui-flex gui-justify-content-center gui-align-items-center">
			<gui-image src="../../static/images/zheng/qidai.png" :width="396" :height="226" :timer="0"></gui-image>
		</view>
	</gui-page>
</template>
<script>
export default {
	data() { 
		return {
			pageLoading: false,
		}
	},
	onLoad() {
		
	},
	methods:{

	}
}
</script>
<style>
	
</style>
