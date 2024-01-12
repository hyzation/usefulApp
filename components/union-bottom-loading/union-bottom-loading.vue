<template>
	<view class="onBottom">
		<view v-if="nodata">已经到底啦</view>
		<view v-if="loading">
			<uni-icons class="spiner" type="spinner-cycle" size="24" color="#cccccc"></uni-icons>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['status'],
		data() {
			return {
				loading: false,
				nodata: false
			};
		},
		watch: {
			status (e){
				this.setData(e);
			}
		},
		mounted (){
			this.setData(this.$props.status);
		},
		methods: {
			setData (e){
				if(e == 'loading'){
					this.loading = true;
					this.nodata = false;
				}
				if(e == 'loaded'){
					this.loading = false;
					this.nodata = false;
				}
				if(e == 'nodata'){
					this.loading = false;
					this.nodata = true;
				}
			}
		}
	}
</script>

<style lang="scss">
	.onBottom{
		padding: 30rpx 0;
		text-align: center;
		font-size: 24rpx;
		color: #ccc;
		@keyframes spiner {
			0%{
				transform: rotate(0deg);
			}
			100%{
				transform: rotate(360deg);
			}
		}
		.spiner{
			display: inline-block;
			animation: spiner infinite forwards linear 2s;
		}
	}
</style>