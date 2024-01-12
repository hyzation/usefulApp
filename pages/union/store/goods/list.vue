<template>
	<gui-page :isLoading="pageLoading" :customHeader="true" ref="guiPage">
		<view slot="gHeader">
			<view class="header">
				<view class="left" @click="goback">
					<uni-icons type="back" size="24" color="#333333"></uni-icons>
				</view>
				<view class="title">商品列表</view>
				<view class="right"></view>
			</view>
		</view>
		
		<view slot="gBody">
			<union-empty style="margin-top: 50%;" v-if="list.length == 0"></union-empty>
			<view v-for="item in list" :key="item.id" style="background: #ffffff;width: 670rpx;margin: 10rpx auto;padding: 20rpx;border-radius: 10rpx;display: flex;justify-content: flex-start;align-items: center;">
				<view>
					<image style="width: 170rpx;height: 170rpx;border-radius: 10rpx;" :src="item.image"></image>
				</view>
				<view style="width: 100%;margin-left: 10rpx;position: relative;">
					<view style="color: rgba(51, 51, 51, 1);font-size: 30rpx;">{{ item.name }}</view>
					<view style="color: rgba(153, 153, 153, 1);font-size: 24rpx;margin-top: 10rpx;">库存：{{ item.stock }}</view>
					<union-price :price="item.price" size="36" style="margin-top: 40rpx;"></union-price>
					<view style="position: absolute;right: 10rpx;bottom: 0;display: flex;justify-content: flex-end;align-items: center;">
						<view @click="del(item.id)" style="font-size: 24rpx;color: rgba(51, 51, 51, 1);border: 1rpx solid rgba(51, 51, 51, 1);border-radius: 6rpx;padding: 3rpx 10rpx;">删除</view>
						<view @click="edit(item.id)" style="font-size: 24rpx;color: rgba(255, 94, 41, 1);border: 1rpx solid rgba(255, 94, 41, 1);margin-left: 10rpx;border-radius: 6rpx;padding: 3rpx 10rpx;">编辑</view>
					</view>
				</view>
			</view>
		</view>
	</gui-page>
</template>
<script>
	export default {
		data() {
			return {
				pageLoading: false,
                page: 1,
                list: []
			}
		},
		mounted (){
            this.loadData();
		},
		methods: {
			goback (){
				uni.navigateTo({
				    url: '/pages/union/store/index'
				})
			},
			goto (url){
				uni.navigateTo({
					url
				})
			},
            async loadData (){
                let that = this;
                const res = await uni.unionRequest('swoft/api/product/getList', {
                    page: that.page,
                    page_size: 10,
                    shop_id: uni.getStorageSync('userInfo').shop_info.id
                })
                this.list = res.data.lists;
            },
            del (id){
                const that = this;
                uni.showModal({
                    title: '提示',
                    content: '确定要删除吗？',
                    cancelText: '取消',
                    confirmText: '删除',
                    async success (action){
                        if(action.confirm){
                            await uni.unionRequest('swoft/api/product/delete', {
                                id
                            })
                            that.loadData();
                        }
                    }
                })
            },
            edit (id){
                uni.navigateTo({
                    url: '/pages/union/store/goods/edit2?id=' + id
                })
            }
		}
	}
</script>
<style lang="scss">
	.phcolor{
		color: #999999;
	}
	page{
		width: 100%;
		height: 100vw;
		background: #F5F5F5;
		.header{
			width: 100vw;
			height: 90rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.left{
				width: 100rpx;
				padding-left: 20rpx;
			}
			.title{
				text-align: center;
				color: #333333;
				font-size: 33rpx;
			}
			.right{
				width: 100rpx;
				padding-right: 20rpx;
				color: #999999;
				font-size: 25rpx;
			}
		}
	}
</style>