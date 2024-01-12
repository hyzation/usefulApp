<template>
	<gui-page :isLoading="pageLoading" :customHeader="true" ref="guiPage">
		<view slot="gHeader">
			<view class="header">
				<view class="left" @click="goback">
					<uni-icons type="back" size="24" color="#333333"></uni-icons>
				</view>
				<view class="title">购物车</view>
				<view class="right"></view>
			</view>
		</view>
		
		
		<view slot="gBody">
			
			<!-- 主内容区域 -->
			<scroll-view scroll-y class="main">
				<union-empty v-if="list.length === 0" />
				<view class="orderItem" v-for="(item, cartIndex) in list" :key="item.id">
					<view class="shopName">
						<uni-icons @click="selectCart(item, cartIndex)" :type="item.checked ? 'checkbox-filled' : 'circle'" size="22" :color="item.checked ? checkboxCheckedColor : checkboxDefaultColor"></uni-icons>
						<view class="name">{{ item.shop.shop_name }}</view>
					</view>
					<view class="goodsItem" v-for="(goods, goodsIndex) in item.cart" :key="goodsIndex">
						<uni-icons :type="goods.checked ? 'checkbox-filled' : 'circle'" @click="selectGoods(goods, goodsIndex, cartIndex)" size="22" :color="goods.checked ? checkboxCheckedColor : checkboxDefaultColor"></uni-icons>
						<view class="goodsMain">
							<image class="cover" :src="goods.image" mode="aspectFill"></image>
							<view class="info">
								<view class="title">{{ goods.product_name }}</view>
								<view class="bottom">
									<view class="price">
										<text>￥</text>{{ goods.price }}
									</view>
									<view class="num">
										<view class="miuns" @click="minus(goods, cartIndex, goodsIndex)"></view>
										<view class="count">{{ goods.goods_num }}</view>
										<view class="add" @click="add(goods)"></view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
			
			<!-- 付款按钮 -->
			<view class="pay" v-if="list.length > 0">
				<view class="left">
					<uni-icons @click="selectAll" :type="selectedAll ? 'checkbox-filled' : 'circle'" size="22" :color="selectedAll ? checkboxCheckedColor : checkboxDefaultColor"></uni-icons>
					<view class="total">合计</view>
					<view class="price">
						<text>￥</text>
						{{ checkedPriceTotal }}
					</view>
				</view>
				<view class="right" @click="gotoPay">下单</view>
			</view>
			
			<union-tabbar name="购物车" showCar></union-tabbar>
		</view>
	</gui-page>
</template>
<script>
	export default {
		data() {
			return {
				pageLoading: false,
				checkboxDefaultColor: '#CCCCCC',
				checkboxCheckedColor: '#FF5E29',
				list: []
			}
		},
        computed: {
            checkedPriceTotal (){
                let total = 0;
                this.list.map(shop => {
                    shop.cart.map(goods => {
                        if(goods.checked) total += goods.price * goods.goods_num;
                    })
                })
                return total;
            },
            selectedAll (){
                let res = true;
                this.list.map(cart => {
                    cart.cart.map(goods => {
                        if(!goods.checked) {
                            res = false;
                        }
                    })
                })
                return res;
            }
        },
		mounted (){
			this.loadData();
		},
		methods: {
            // 点选商品
            selectGoods (item, goodsIndex, cartIndex){
                this.$set(this.list[cartIndex].cart[goodsIndex], 'checked', !item.checked);
                
                // 判断当前车篮是否全部选中，
                let selectedCount = this.list[cartIndex].cart.filter(i => i.checked).length;
                this.$set(this.list[cartIndex], 'checked', selectedCount == this.list[cartIndex].cart.length);
            },
            // 点选车篮
            selectCart (item, cartIndex){
                const that = this;
                
                // 车篮状态
                let selectedCount = that.list[cartIndex].cart.filter(i => i.checked).length;
                let cartSelectedAll = selectedCount == that.list[cartIndex].cart.length ? false : true;
                that.$set(that.list[cartIndex], 'checked', cartSelectedAll);
                
                // 同步当前车篮下所有商品的状态
                that.list[cartIndex].cart.map((k, i) => {
                    that.$set(that.list[cartIndex].cart[i], 'checked', cartSelectedAll);
                })
            },
            // 全选购物车
            selectAll (){
                const that = this;
                let selected = !that.selectedAll;
                that.list.map((cart, cartIndex) => {
                    cart.cart.map((goods, goodsIndex) => {
                        that.$set(that.list[cartIndex].cart[goodsIndex], 'checked', selected);
                    })
                    that.$set(that.list[cartIndex], 'checked', selected);
                })
            },
            async minus (item, cartIndex, goodsIndex){
                await uni.unionRequest('swoft/api/cart/changenum', {
                    cart_id: item.cart_id,
                    goods_num: item.goods_num - 1
                })
                item.goods_num--;
                
                if(item.goods_num == 0){
                    this.list[cartIndex].cart.splice(goodsIndex, 1);
                }
            },
            async add (item){
                await uni.unionRequest('swoft/api/cart/changenum', {
                    cart_id: item.cart_id,
                    goods_num: item.goods_num + 1
                })
                item.goods_num++;
            },
			goback (){
				uni.navigateBack();
			},
			async loadData (){
				const that = this;
				that.pageLoading = true;
				const data = {
					user_id: uni.getStorageSync('userInfo').id
				}
				const res = await uni.unionRequest('swoft/api/cart/cartList', data);
				this.list = res.data.lists || [];
				that.pageLoading = false;
			},
            gotoPay (){
                if(this.checkedPriceTotal == 0){
                    uni.showToast({
                        title: '请选择商品',
                        icon: 'none'
                    })
                    return;
                }
                
                // 筛选商家
                let data = JSON.parse(JSON.stringify(this.list));
                data = data.filter(cart => {
                    if(cart.checked){
                        return true;
                    }
                    let res = false;
                    cart.cart.map(i => {
                        if(i.checked){
                            res = true;
                        }
                    })
                    return res;
                })
                
                // 筛选商品
                data = data.map(item => {
                    item.cart = item.cart.filter(i => i.checked);
                    return item;
                })
                uni.setStorageSync('readyPayGoods', data);
                uni.navigateTo({
                    url: '/pages/union/online/orders/create'
                })
            }
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
		
		.main{
			width: 100%;
			height: calc(100% - 300rpx);
			position: absolute;
			top: 90rpx;
			left: 0;
			
			.orderItem{
				width: 710rpx;
				height: auto;
				margin: 20rpx;
				background: #ffffff;
				border-radius: 20rpx;
				overflow: hidden;
				.shopName{
					height: 60rpx;
					display: flex;
					justify-content: flex-start;
					align-items: center;
					padding: 10rpx 20rpx;
					.name{
						font-size: 32rpx;
						color: #333333;
						margin-left: 10rpx;
					}
				}
				.goodsItem{
					padding: 20rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					.goodsMain{
						width: 610rpx;
						display: flex;
						justify-content: space-between;
						align-items: center;
						.cover{
							width: 180rpx;
							height: 180rpx;
							border-radius: 10rpx;
						}
						.info{
							width: 420rpx;
							height: 180rpx;
							display: flex;
							justify-content: flex-start;
							align-content: space-between;
							flex-wrap: wrap;
							.title{
								width: 420rpx;
								font-size: 28rpx;
								color: #333333;
								line-height: 40rpx;
							}
							.bottom{
								width: 420rpx;
								display: flex;
								justify-content: space-between;
								align-items: center;
								.price{
									color: #FF5E29;
									font-size: 38rpx;
									font-weight: bold;
									text{
										font-size: 20rpx;
									}
								}
								.num{
									display: flex;
									justify-content: center;
									align-items: center;
									.miuns, .add{
										width: 40rpx;
										height: 40rpx;
									}
									.miuns{
										background: url('../../../static/images/union/miuns.png') no-repeat center;
										background-size: cover;
									}
									.add{
										background: url('../../../static/images/union/add.png') no-repeat center;
										background-size: cover;
									}
									.count{
										min-width: 20rpx;
										text-align: center;
										padding: 0 20rpx;
										font-size: 30rpx;
										color: #333333;
									}
								}
							}
						}
					}
				}
			}
		}
		.pay{
			width: 100vw;
			height: 100rpx;
			position: absolute;
			bottom: 100rpx;
			background: #ffffff;
			border-bottom: 1rpx solid #EBEBEB;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.left{
				display: flex;
				justify-content: flex-start;
				align-items: center;
				padding-left: 20rpx;
				.total{
					color: #FF5E29;
					font-size: 28rpx;
					padding: 0 10rpx;
				}
				.price{
					color: #FF5E29;
					font-size: 46rpx;
					font-weight: bold;
					text{
						font-size: 26rpx;
					}
				}
			}
			.right{
				width: 150rpx;
				height: 60rpx;
				margin-right: 20rpx;
				background: linear-gradient(to right, #ff340f, #ff8a15);
				border-radius: 200rpx;
				font-size: 26rpx;
				color: #ffffff;
				line-height: 60rpx;
				text-align: center;
				font-weight: bold;
			}
		}
	}
</style>