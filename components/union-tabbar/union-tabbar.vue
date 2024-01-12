<template>
	<view class="union-tabbar" :style="style">
		<view class="item" :class="{ current: $props.name == item.name }" v-for="item in list" :key="item.name" @click="goTab(item)">
			<image :src="$props.name == item.name ? `/static/images/union/tabbar/${item.icon}-hover.png` : `/static/images/union/tabbar/${item.icon}.png`" mode="widthFix"></image>
			<view class="text">{{ item.name }}</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"union-tabbar",
		props: ['name', 'showCar'],
		data() {
			return {
				list: [],
				style: {}
			};
		},
		mounted (){
			const system = uni.getSystemInfoSync();
			this.style = {
				paddingBottom: `${ system.safeAreaInsets.bottom }px` 
			}
            if(this.$props.showCar){
                this.list = [
					{
						name: '首页',
						icon: 'home',
                		path: '/pages/home/index'
					},
					{
						name: '购物车',
						icon: 'car',
						path: '/pages/union/online/car',
					},
					{
						name: '活动',
						icon: 'home',
                		path: '/pages/activity/HDlist',
					},
					{
						name: '订单',
						icon: 'order',
                		path: '/pages/union/online/orders/list',
					},
                ]
            }else{
                this.list = [
                	{
                		name: '首页',
                		icon: 'home',
                		path: '/pages/home/index'
                	},
					{
						name: '活动',
						icon: 'home',
                		path: '/pages/activity/HDlist',
					},
                	{
                		name: '订单',
                		icon: 'order',
                		path: '/pages/union/offline/orders/list',
                	},
                ]
            }
		},
		methods: {
			goTab (item){
                if(item.name == '首页'){
                    uni.switchTab({
                        url: item.path
                    })
                }else{
                    uni.navigateTo({
                        url: item.path
                    })
                }
			}
		}
	}
</script>

<style lang="scss">
	.union-tabbar{
		width: 750rpx;
		height: 100rpx;
		background: #ffffff;
		display: flex;
		justify-content: space-around;
		align-items: center;
		position: fixed;
		bottom: 0;
		.item{
			width: 100%;
			text-align: center;
			color: #333333;
			font-size: 22rpx;
			image{
				width: 36rpx;
				margin-bottom: 5rpx;
			}
		}
		.item.current{
			color: #FF612A;
		}
	}
</style>