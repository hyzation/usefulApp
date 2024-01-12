<template>
	<view class="union-card-list">
		<view class="item" v-for="item in list" :key="item.id" @click="goDetail(item)">
			<view class="cover">
				<image :src="item.image" mode="aspectFill"></image>
			</view>
			<view class="title">{{ item.name }}</view>
			<view class="saled">已售{{ item.sale_num }}</view>
			<union-price class="price" :price="item.price" />
		</view>
	</view>
</template>

<script>
	export default {
		name:"union-card-list",
		data() {
			return {
				list: []
			};
		},
		async mounted (){
			// 获取推荐产品列表
			const data = await uni.unionRequest('swoft/api/product/getList', {
				user_id: uni.getStorageSync('userInfo').id,
				page: 1,
				page_num: 10,
				is_online: 2
			})
			this.list = data.data.lists;
		},
		methods: {
			goDetail (item){
				uni.navigateTo({
					url: '/pages/union/goods/detail?id=' + item.id
				})
			}
		}
	}
</script>

<style lang="scss">
	.union-card-list{
		width: 700rpx;
		display: flex;
		justify-content: flex-start;
		align-content: flex-start;
		flex-wrap: wrap;
		margin: 0 25rpx;
		.item{
			width: 340rpx;
			background: #ffffff;
			border-radius: 20rpx;
			overflow: hidden;
			margin-top: 20rpx;
			.cover{
				width: 340rpx;
				height: 340rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				background: rgba(0, 0, 0, 0.5);
				overflow: hidden;
				border-radius: 20rpx;
			}
			.title{
				font-size: 27rpx;
				color: #333333;
				padding: 10rpx 20rpx;
			}
			.saled{
				font-size: 21rpx;
				color: #999999;
				padding: 0 20rpx;
			}
			.price{
				font-size: 35rpx;
				color: #FF5E29;
				padding: 10rpx 20rpx;
				text{
					font-size: 21rpx;
				}
			}
		}
		.item:nth-child(2n){
			margin-left: 20rpx;
		}
	}
</style>