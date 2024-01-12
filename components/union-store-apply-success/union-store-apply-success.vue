<template>
	<view class="bg" v-if="show">
		<view class="box">
			<view>提交成功</view>
			<view>请耐心等待审核结果</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"union-store-apply-success",
		props: ['status'],
		data (){
			return {
				show: false
			}
		},
		watch: {
			status (e){
				this.show = e;
			}
		}
	}
</script>

<style lang="scss">
	.bg{
		width: 100vw;
		height: 100vh;
		background: rgba(0, 0, 0, 0.4);
		position: fixed;
		top: 0;
		left: 0;
		z-index: 99999;
		display: flex;
		justify-content: center;
		align-items: center;
		.box{
			width: 533rpx;
			height: 400rpx;
			background: #FFFFFF;
			border-radius: 53rpx;
			display: flex;
			justify-content: center;
			align-content: center;
			flex-wrap: wrap;
			
			view:nth-child(1){
				width: 100%;
				color: #333333;
				font-size: 44rpx;
				text-align: center;
			}
			view:nth-child(2){
				width: 100%;
				color: #999999;
				font-size: 30rpx;
				text-align: center;
				margin-top: 30rpx;
			}
		}
	}
</style>