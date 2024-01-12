<template>
	<gui-page :isLoading="pageLoading" ref="guiPage">
		<view slot="gBody">
			
			<!-- 自定义头部 -->
			<view class="customHead" :style="{ paddingTop: topSafe }">
				<view class="left" @click="goback">
					<uni-icons type="back" size="24" color="#ffffff"></uni-icons>
				</view>
				<view class="middle">
					<view class="item current">产品</view>
				</view>
				<view class="right"></view>
			</view>
			
			<!-- 搜索栏 -->
			<view class="search" :style="{ top: `calc(100rpx + ${ topSafe })` }" @click="gotoSearch">
				<view class="btn">搜索</view>
			</view>
		
            
            <view class="content" :style="contentStyle">
                <!-- 分类列表 -->
                <view class="icons">
                	<view class="item" v-for="item in categoryList" :key="item.id" @click="goCategory(item)">
                		<image :src="item.image || '../../../../static/images/logo.png'"></image>
                		<view>{{ item.name }}</view>
                	</view>
                </view>
                <union-empty v-if="list.length == 0" style="margin-top: 0;height: 500rpx"></union-empty>
                <view class="listItem" v-for="item in list" :key="item.id" @click="itemClick(item)">
                	<view class="cover">
                		<image :src="item.logo"></image>
                	</view>
                	<view class="info">
                		<view class="title">{{ item.name }}</view>
                		<view class="unit" v-for="unit in item.products" :key="unit.id">
                			<union-price class="unitPrice" :price="unit.price" size="32" />
                			<view class="unitName">{{ unit.name }}</view>
                		</view>
                		<view class="address">
                			<view class="detail">
                				<uni-icons type="location-filled" color="#FF5E29" size="16"></uni-icons>
                				{{ item.province_name }}{{ item.city_name }}{{ item.district_name }}{{ item.address }}
                			</view>
                			<!-- <view class="distance">500m</view> -->
                		</view>
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
				bottomLoadingStatus: 'nodata',
				topSafe: '',
                contentStyle: {},
                categoryList: [],
                cid: '',
                list: []
			}
		},
        onLoad (options){
            this.cid = options.category;
        },
		async mounted (){
            const that = this;
            that.pageLoading = true;
			that.topSafe = uni.getSystemInfoSync().safeAreaInsets.top + 'px';
            this.contentStyle = {
                height: `calc(100% - 200rpx - ${this.topSafe})`,
                top: `calc(200rpx + ${this.topSafe})`
            }
            
            // 获取类目列表
            const categoryList = await uni.unionRequest('swoft/api/product/category/lists', {
                type: 2
            })
            that.categoryList = categoryList.data;
            
            
            // 获取推商家列表
            let data = {
                is_freeze: 0,
                is_run: 1,
                del: 0,
                page: 1,
                page_num: 20,
                type: 2,
                cid: that.cid || that.categoryList[0].id
            }
            const list = await uni.unionRequest('swoft/api/shop/getShopList', data);
            that.list = list.data.list;
            
            
            that.pageLoading = false;
		},
		methods: {
            itemClick (item){
                uni.navigateTo({
                    url: '/pages/union/offline/shop/detail?id='+item.id
                })
            },
            async goCategory (item){
                const that = this;
                that.pageLoading = true;
                const data = await uni.unionRequest('swoft/api/shop/getShopList', {
                    is_freeze: 0,
                    is_run: 1,
                    del: 0,
                    page: 1,
                    page_num: 20,
                    type: 2,
                    cid: item.id
                })
                that.list = data.data.list;
                that.pageLoading = false;
            },
			goback (){
				uni.navigateTo({
				    url: '/pages/union/offline'
				})
			},
			menuClick (){
				uni.navigateTo({
				    url: '/pages/union/offline'
				})
			},
            gotoSearch (){
                uni.navigateTo({
                    url: '/pages/union/search?type=2'
                })
            },
			goDetail (item){
				uni.navigateTo({
					url: '/pages/union/offline/goods/detail?id=' + item.id
				})
			}
		}
	}
</script>
<style lang="scss">
	page{
		width: 100%;
		background: url('../../../../static/images/union/head-bg.png') no-repeat top center #f4f4f4;
		background-size: 100% auto;
		background-attachment: fixed;
	    overflow: hidden;
		
		.customHead{
			width: 100vw;
			height: 100rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			position: absolute;
			top: 0;
			left: 0;
			.left{
				width: 100rpx;
				padding-left: 20rpx;
			}
			.middle{
				display: flex;
				justify-content: center;
				align-items: center;
				.item{
					color: #ffffff;
					font-size: 33rpx;
					margin: 0 10rpx;
					padding: 0 10rpx;
					transition: all 0.3s;
				}
				.item.current{
					font-size: 40rpx;
					font-weight: bold;
				}
			}
			.right{
				width: 100rpx;
				padding-right: 20rpx;
			}
		}
		
		.search{
			width: 700rpx;
			height: 70rpx;
			position: absolute;
			left: 25rpx;
			background: #FFFFFF;
			border-radius: 34rpx;
			.btn{
				width: 121rpx;
				height: 55rpx;
				line-height: 55rpx;
				text-align: center;
				background: linear-gradient(45deg, #FF330F 0%, #FF8C15 100%);
				border-radius: 28rpx;
				position: absolute;
				top: 8rpx;
				right: 10rpx;
				font-size: 27rpx;
				color: #ffffff;
			}
		}
	    
	    .content{
	        width: 100vw;
	        position: absolute;
	        overflow-x: hidden;
	        overflow-y: auto;
	    }
	    .icons{
	    	width: 660rpx;
	    	margin: 0 25rpx;
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
	            margin-top: 6rpx;
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
        .listItem{
        	margin: 20rpx auto;
        	width: 660rpx;
        	background: #ffffff;
        	border-radius: 20rpx;
        	padding: 20rpx;
        	display: flex;
        	justify-content: space-between;
        	align-items: center;
        	.cover{
        		width: 170rpx;
        		height: 170rpx;
        		overflow: hidden;
        		border-radius: 10rpx;
        		image{
        			width: 170rpx;
        			height: 170rpx;
        		}
        	}
        	.info{
        		width: 470rpx;
        		margin-left: 20rpx;
        		.title{
        			font-size: 30rpx;
        			color: #333333;
        		}
        		.unit{
        			display: flex;
        			justify-content: flex-start;
        			align-items: center;
        			margin-top: 10rpx;
        			.unitPrice{
        				color: #FF5E29;
        				font-size: 30rpx;
        				text{
        					font-size: 18rpx;
        				}
        			}
        			.unitName{
        				font-size: 24rpx;
        				color: #333333;
        				margin-left: 20rpx;
        			}
        		}
        		.address{
        			display: flex;
        			justify-content: space-between;
        			align-items: center;
        			font-size: 24rpx;
        			margin-top: 10rpx;
        			.detail{
        				width: 390rpx;
        				color: #999999;
        				overflow: hidden;
        				text-overflow: ellipsis;
        				white-space: nowrap;
        			}
        			.distance{
        				width: 70rpx;
        				color: #333333;
        				text-align: right;
        			}
        		}
        	}
        }
	}
</style>