<template>
	<view class="union-slide-select">
		<view class="current">
			{{ list[index].name }}
			<uni-icons type="back" color="#767676" size="16" :style="iconStyle"></uni-icons>
		</view>
		<!-- <view class="list">
			<view class="item" v-for="item in list" :key="item.id">{{ item.name }}</view>
		</view> -->
	</view>
</template>

<script>
	export default {
		name:"union-slide-select",
		props: ['data'],
		watch: {
			data (nd){
				this.list = this.list.concat(nd);
			}
		},
		data() {
			return {
				list: [{
					id: 0,
					name: '全部分类'
				}],
				index: 0,
				iconStyle: {}
			};
		},
		mounted (){
			this.iconStyle = {
				display: 'inline-block',
				transform: 'rotate(270deg)',
				marginLeft: '10rpx'
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.union-slide-select{
		width: 100%;
		position: relative;
		.current{
			height: 60rpx;
			line-height: 80rpx;
			font-size: 26rpx;
			color: #767676;
		}
		.list{
			width: 100vw;
			height: 100vh;
			background: rgba(0, 0, 0, 0.5);
			position: fixed;
			top: 0;
			left: 0;
			z-index: 99999999;
		}
	}
</style>