<template>
	<gui-page :isLoading="pageLoading" ref="guiPage">
		<view slot="gBody">
			
			<!-- 自定义头部 -->
			<view class="customHead" :style="{ paddingTop: topSafe }">
				<view class="left" @click="goback">
					<uni-icons type="back" size="24" color="#ffffff"></uni-icons>
				</view>
				<view class="middle">
					<view class="item current">{{ category.name }}</view>
				</view>
				<view class="right"></view>
			</view>
			
			<!-- 搜索栏 -->
			<view class="search" :style="{ top: `calc(100rpx + ${ topSafe })` }" @click="gotoSearch">
				<view class="btn">搜索</view>
			</view>
			
            <view class="content" :style="contentStyle">
                <view class="list">
                    <union-empty v-if="list.length == 0" style="margin-top: 400rpx;"></union-empty>
                    <view class="listItem" v-for="item in list" :key="item.id" @click="goDetail(item)">
                        <view class="cover">
                            <image :src="item.image" mode="aspectFill"></image>
                        </view>
                        <view class="title">{{ item.name }}</view>
                        <view class="saled">已售{{ item.sale_num }}</view>
                        <union-price class="price" :price="item.price" :equityNum="item.equity_num" />
                    </view>
                </view>
            </view>
            
			<union-tabbar name="联盟" showCar></union-tabbar>
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
                list: [],
                category: {}
			}
		},
        onLoad (options){
            this.category = options;
        },
		async mounted (){
            const that = this;
            that.pageLoading = true;
			that.topSafe = uni.getSystemInfoSync().safeAreaInsets.top + 'px';
            this.contentStyle = {
                height: `calc(100% - 200rpx - ${this.topSafe})`,
                top: `calc(200rpx + ${this.topSafe})`
            }
            
            const res = await uni.unionRequest('swoft/api/product/getList', {
                page: 1,
                page_size: 100,
                is_online: 1,
                first_cate_id: that.category.id
            })
            that.list = res.data.lists;
            
            that.pageLoading = false;
		},
		methods: {
			goback (){
				uni.navigateTo({
					url: '/pages/union/online'
				})
			},
            gotoSearch (){
                uni.navigateTo({
                    url: '/pages/union/search?type=1'
                })
            },
			goDetail (item){
				uni.navigateTo({
					url: '/pages/union/online/goods/detail?id=' + item.id
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
       
        .list{
            width: 700rpx;
            display: flex;
            justify-content: flex-start;
            align-content: flex-start;
            flex-wrap: wrap;
            margin: 25rpx;
            .listItem{
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
            .listItem:nth-child(2n){
                margin-left: 20rpx;
            }
            .listItem:nth-child(-n+2){
                margin-top: -20rpx;
            }
        }
	}
</style>