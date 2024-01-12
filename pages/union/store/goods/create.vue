<template>
	<gui-page :isLoading="pageLoading" :customHeader="true" ref="guiPage">
		<view slot="gHeader">
			<view class="header">
				<view class="left" @click="goback">
					<uni-icons type="back" size="24" color="#333333"></uni-icons>
				</view>
				<view class="title">发布商品</view>
				<view class="right"></view>
			</view>
		</view>
		
		<view slot="gBody">
			<view class="card">
				<view class="item">
					<view class="k">商品名称</view>
					<view class="v input">
						<input placeholder-class="phcolor" v-model="name" placeholder="请输入商品名称" />
					</view>
				</view>
				<view class="item">
					<view class="k">商品分类</view>
					<union-selector :data="categoryList" v-model="category" title="请选择商品分类">
						<view class="v selector">
							<text>{{ category.label || '请选择商品分类' }}</text>
							<uni-icons type="forward" size="20" color="#999999"></uni-icons>
						</view>
					</union-selector>
				</view>
				<view class="item">
					<view class="k">商品图片</view>
					<view class="v">
						<union-upload v-model="image" />
					</view>
				</view>
				<view class="item">
					<view class="k">商品价格</view>
					<view class="v input">
						<input placeholder-class="phcolor" v-model="price" placeholder="请输入商品价格" />
					</view>
				</view>
				<view class="item">
					<view class="k">库存数量</view>
					<view class="v input">
						<input placeholder-class="phcolor" v-model="stock" placeholder="请输入库存数量" />
					</view>
				</view>
			</view>
			<view class="card">
				<view class="item">
					<view class="k">运费模板</view>
					<union-selector :data="freightList" v-model="freight" title="请选择运费模板">
						<view class="v selector">
							<text>{{ freight.label || '请选择运费模板' }}</text>
							<uni-icons type="forward" size="20" color="#999999"></uni-icons>
						</view>
					</union-selector>
				</view>
				<view class="item">
					<view class="k">是否支持自提</view>
					<view class="v radio">
						<union-radio :data="canPickSelfList" v-model="canPickSelf" />
					</view>
				</view>
			</view>
			<view class="card">
				<view class="cardHead">商品详情</view>
				<view class="item block" style="padding-top: 0;">
					<view class="v textarea" style="margin-top: 0;">
						<textarea placeholder="请输入简介" v-model="remark" placeholder-class="phcolor"></textarea>
					</view>
				</view>
                <view class="item">
                	<view class="k">详情图片</view>
                	<view class="v">
                        <union-upload v-model="content" />
                	</view>
                </view>
			</view>
			<view style="width: 100vw;height: 100rpx;"></view>
			<view class="btn" style="background: #f5f5f5;padding-bottom: 10rpx; width:100%;position: fixed;bottom: 0;left: 0;display: flex;justify-content: center;align-items: center;">
				<view @click="submit" style="width: 665rpx;height: 80rpx;background: linear-gradient(90deg, #FF330F 0%, #FF8C15 100%);border-radius: 41rpx;text-align: center;line-height: 80rpx;color: rgba(251, 251, 251, 1);font-size: 32rpx;">发布</view>	
			</view>
		</view>
	</gui-page>
</template>
<script>
	export default {
		data() {
			return {
				pageLoading: false,
				name: '',
				categoryList: [],
				category: {},
                image: '',
                price: '',
                stock: '',
                freightList: [],
                freight: {},
				canPickSelfList: [
					{
						label: '是',
						value: 1
					},
					{
						label: '否',
						value: 2
					}
				],
				canPickSelf: {
					label: '否',
					value: 2,
				},
                remark: '',
                content: '',
			}
		},
		async mounted (){
            const that = this;
            const shop = uni.getStorageSync('union_detail');
            
            // 获取类目
			const categoryList = await uni.unionRequest('swoft/api/product/category/lists', {
                type: shop.shopType
            })
            that.categoryList = categoryList.data.map(item => {
                return {
                    value: item.id,
                    label: item.name
                }
            })
            
            // 获取运费模板列表
			const freightList = await uni.unionRequest('swoft/api/product/getFreightList')
            that.freightList = freightList.data.map(item => {
                return {
                    value: item.id,
                    label: item.name
                }
            })
            
		},
		methods: {
			goback (){
				uni.navigateTo({
				    url: '/pages/union/store/index'
				})
			},
            loadData (){
                
            },
			async submit (){
                const that = this;
				let data = {
                    user_id: uni.getStorageSync('userInfo').id,
                    shop_id: uni.getStorageSync('userInfo').shop_info.id,
                    is_online: uni.getStorageSync('union_detail').shopType,
                    type: 1,
                    first_cate_id: that.category.value,
                    name: that.name,
                    image: that.image,
                    remark: that.remark,
                    content: that.content,
                    price: that.price,
                    can_pick_up_self: that.canPickSelf.value,
                    stock: that.stock,
                    express_template_id: that.freight.value
                }
                await uni.unionRequest('swoft/api/product/add', data);
                uni.showToast({
                    title: '发布成功',
                    icon: 'success'
                })
                uni.navigateTo({
                    url: '/pages/union/store/goods/list'
                });
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
		.card{
			width: 710rpx;
			margin: 20rpx;
			background: #ffffff;
			border-radius: 10rpx;
			overflow: hidden;
			.cardHead{
				font-size: 34rpx;
				color: #333333;
				padding: 20rpx;
				font-weight: bold;
			}
			.item{
				width: 670rpx;
				padding: 30rpx 0;
				margin: 0 auto;
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-top: 1rpx solid rgba(0, 0, 0, 0.02);
				.k{
					color: #333333;
					font-size: 31rpx;
				}
				.v{
					width: 400rpx;
					display: flex;
					justify-content: flex-end;
					align-items: center;
				}
				.v.selector{
					display: flex;
					justify-content: flex-end;
					align-items: center;
					color: #999999;
					font-size: 25rpx;
				}
				.v.input{
					input{
						width: 100%;
						height: 30rpx;
						font-size: 28rpx;
						color: #333333;
						text-align: right;
					}
				}
			}
			.item.block{
				width: 670rpx;
				padding: 30rpx 0;
				margin: 0 auto;
				display: block;
				.k{
					width: 670rpx;
				}
				.v{
					width: 670rpx;
					display: block;
				}
				.v.textarea{
					margin-top: 20rpx;
					textarea{
						width: 650rpx;
						height: 150rpx;
						font-size: 26rpx;
						line-height: 40rpx;
						padding: 10rpx;
						background: rgba(0, 0, 0, 0.03);
					}
				}
			}
		}
	}
</style>