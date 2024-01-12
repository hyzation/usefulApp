<template>
	<view class="main">
		<view class="icons">
			<view class="item" v-for="item in categoryList" :key="item.id" @click="goCategory(item)">
				<image :src="item.image || '../../static/images/logo.png'"></image>
				<view>{{ item.name }}</view>
			</view>
		</view>
		
		<union-shop-list  />
	</view>
</template>

<script>
	export default {
		data (){
			return {
				categoryList: []
			}
		},
		async mounted (){
			// 获取分类
			const categoryList = await uni.unionRequest('swoft/api/product/category/lists', {
				type: 1
			})
			this.categoryList = categoryList.data;
		},
		methods: {
			goCategory (item){
				uni.navigateTo({
					url: '/pages/union/store/category?id=' + item.id
				})
			},
		}
	}
</script>

<style lang="less">
	.main{
		width: 100%;
		height: calc(100vh - 300rpx);
		overflow-x: hidden;
		overflow-y: auto;
		margin-top: 200rpx;
	}
	.icons{
		width: 660rpx;
		margin: 25rpx;
		background: #ffffff;
		border-radius: 20rpx;
		padding: 20rpx;
		display: flex;
		justify-content: space-between;
		align-content: flex-start;
		flex-wrap: wrap;
		.item{
			width: 165rpx;
			text-align: center;
			padding: 20rpx 0;
			image{
				width: 90rpx;
				height: 90rpx;
				border-radius: 40%;
			}
			view{
				width: 165rpx;
				line-height: 30rpx;
				font-size: 27rpx;
				color: #333333;
			}
		}
	}
</style>