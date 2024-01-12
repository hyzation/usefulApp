<template>
	<gui-page :isLoading="pageLoading" :customHeader="true" ref="guiPage">
		<view slot="gHeader">
			<view class="header">
				<view class="left" @click="goback">
					<uni-icons type="back" size="24" color="#333333"></uni-icons>
				</view>
				<view class="title">订单</view>
				<view class="right"></view>
			</view>
		</view>
		
		
		<view slot="gBody">
			
			<!-- 订单状态切换 -->
			<view class="status">
				<view class="item" :class="{ current: currentStatus == item }" v-if="item" @click="statusChange(item)" v-for="item in statusList" :key="item">{{ item }}</view>
			</view>
			
			<!-- 主内容区域 -->
			<scroll-view scroll-y class="main" @scrolltolower="onBottom" :style="{ height: `calc(100% - 180rpx - ${ topSafe })`, top: `calc(180rpx + ${ topSafe })` }">
				
				<union-empty v-if="list.length === 0" />
				<view class="orderItem" v-for="item in list" :key="item.id" @click="gotoDetail(item)">
					<view class="head">
						<view class="orderId">订单号:{{ item.orderNum }}</view>
						<view class="orderStatus">{{ item.statusText }}</view>
					</view>
					<view class="goodsItem" v-for="goods in item.child" :key="goods.id">
						<image class="cover" :src="goods.goodsImage || ''" mode="aspectFill"></image>
						<view class="info">
							<view class="title">{{ goods.goodsName }}</view>
							<view class="unit">规格：默认</view>
							<view class="bottom" style="margin-top: 50rpx;">
								<union-price :price="goods.price" color="#333333" />
								<view class="num">x{{ goods.num }}</view>
							</view>
						</view>
					</view>
					<view class="foot">
						<view class="total">
							<view>共{{ item.num }}件</view>
							<view>合计<text>￥</text>{{ item.realPrice }}</view>
						</view>
						<view class="button" v-if="showButton">
							<view class="normal" v-if="item.status == 1" @click.stop="cancel(item)">取消订单</view>
                            <view class="normal" v-if="item.status != 2" @click.stop="del(item)">删除订单</view>
						</view>
					</view>
				</view>
				
				<!-- 到底 -->
				<union-bottom-loading :status="bottomLoadingStatus" />
			</scroll-view>
		</view>
	</gui-page>
</template>
<script>
	var _this;
	export default {
		data() {
			return {
				pageLoading: false,
				bottomLoadingStatus: '',
				checkboxDefaultColor: '#CCCCCC',
				checkboxCheckedColor: '#FF5E29',
				statusList: ['全部', '待付款', '待消费', '已完成'],
				currentStatus: '全部',
                page: 1,
                pageSize: 10,
				showButton: true,
				topSafe: '',
                list: [],
				userInfo: null,
			}
		},
		onLoad: function(e){
			_this = this;
			if(e.status){
				console.log(e.status)
				switch(e.status) {
					case '1': _this.currentStatus = '待付款';break;
					case '2': _this.currentStatus = '待消费';break;
					case '3': _this.currentStatus = '已完成';break;
					default: _this.currentStatus = '全部';break;
				}
				console.log(_this.currentStatus)
			}
		},
		mounted (){
			this.topSafe = uni.getSystemInfoSync().safeAreaInsets.top + 'px';
			this.userInfo = uni.getStorageSync('userInfo');
            this.getOrderList();
		},
		methods: {
			goback (){
				uni.navigateTo({
				    url: '/pages/union/offline'
				})
			},
			async getOrderList (){
                this.pageLoading = true;
                let data ={
					uid: this.userInfo.id,
                    order_type: 'LM',
                    is_online: 2
                }
                if(this.currentStatus != '全部'){
                    let status = '';
                    switch(this.currentStatus){
                        case '待付款': status = 1; break;
                        case '待消费': status = 2; break;
                        case '已完成': status = 5; break;
                    }
                    data.status = status;
                }
                const getOrderList = await uni.unionRequest('swoft/api/order/getOrderListNew', data);
                this.list = getOrderList.data.map(item => {
                    if(item.simple_goods){
                        item.simple_goods = JSON.parse(item.simple_goods);
                        switch(item.status) {
                            case 1: item.statusText = '待支付'; break;
                            case 2: item.statusText = '待消费'; break;
                            case 5: item.statusText = '已完成'; break;
                            default: item.statusText = ''; break;
                        }
                    }
                    return item;
                })
                this.pageLoading = false;
            },
			statusChange (status){
				this.currentStatus = status;
				this.page = 1;
				this.getOrderList();
			},
			onBottom (){
				this.bottomLoadingStatus = 'nodata';
			},
            gotoDetail (item){
                if(item.child.length == 0) return;
                uni.setStorageSync('offline_orders_detail', item);
                uni.navigateTo({
                	url: '/pages/union/offline/orders/detail'
                })
            },
            async cancel (item){
                await uni.unionRequest('swoft/api/order/editOrder', {
                    id: item.id,
                    status: 0,
                    uid: uni.getStorageSync('userInfo').id
                })
                uni.showToast({
                    title: '取消成功',
                    icon: 'success'
                })
                this.getOrderList();
            },
            async del (item){
                await uni.unionRequest('swoft/api/order/editOrder', {
                    id: item.id,
                    status: -1,
                    uid: uni.getStorageSync('userInfo').id
                })
                this.getOrderList();
            },
		}
	}
</script>
<style lang="scss">
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
				width: 80rpx;
				padding-left: 20rpx;
			}
			.title{
				text-align: center;
				color: #333333;
				font-size: 33rpx;
			}
			.right{
				width: 80rpx;
				padding-right: 20rpx;
			}
		}
		
		.status{
			width: 100%;
			height: 100rpx;
			display: flex;
			justify-content: space-around;
			align-items: center;
			color: #333333;
			font-size: 32rpx;
			.item.current{
				color: #FF5E29;
			}
		}
		
		.main{
			width: 100%;
			position: absolute;
			left: 0;
		
			.orderItem{
				width: 710rpx;
				height: auto;
				margin: 20rpx;
				background: #ffffff;
				border-radius: 20rpx;
				overflow: hidden;
				.head{
					height: 60rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 10rpx 20rpx;
					font-size: 24rpx;
					.orderId{
						color: #333333;
					}
					.orderStatus{
						color: #FF5E29;
					}
				}
				.goodsItem{
					padding: 20rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					.cover{
						width: 180rpx;
						height: 180rpx;
						border-radius: 10rpx;
					}
					.info{
						width: 480rpx;
						height: 180rpx;
						display: flex;
						justify-content: flex-start;
						align-content: space-between;
						flex-wrap: wrap;
						.title{
							width: 480rpx;
							font-size: 30rpx;
							color: #333333;
							line-height: 40rpx;
						}
						.unit{
							color: #999999;
							font-size: 24rpx;
						}
						.bottom{
							width: 480rpx;
							display: flex;
							justify-content: space-between;
							align-items: center;
							.price{
								color: #333333;
								font-size: 38rpx;
								font-weight: bold;
								text{
									font-size: 20rpx;
								}
							}
							.num{
								color: #333333;
								font-size: 30rpx;
							}
						}
					}
				}
				.foot{
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 20rpx;
					.total{
						display: flex;
						justify-content: flex-start;
						align-items: center;
						font-size: 26rpx;
						view:nth-child(1){
							color: #999999;
						}
						view:nth-child(2){
							color: #333333;
							margin-left: 10rpx;
							text{
								font-size: 18rpx;
							}
						}
					}
					.button{
						display: flex;
						justify-content: flex-end;
						align-items: center;
						view{
							width: 130rpx;
							height: 50rpx;
							text-align: center;
							line-height: 50rpx;
							border-radius: 30rpx;
							font-size: 22rpx;
							margin-left: 16rpx;
						}
						view.normal{
							color: #333333;
							border: 1rpx solid #b8b8b8;
						}
						view.confirm{
							color: #FF5E29;
							border: 1rpx solid #ff7755;
						}
					}
					.error{
						font-size: 26rpx;
						color: #FF5E29;
					}
				}
			}
		}
	}
</style>