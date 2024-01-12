<template>
	<gui-page :isLoading="pageLoading" :customHeader="true" ref="guiPage">
		<view slot="gHeader">
			<view class="header">
				<view class="left" @click="goback">
					<uni-icons type="back" size="24" color="#333333"></uni-icons>
				</view>
				<view class="title">店铺资料</view>
				<view class="right" @click="goto('/pages/union/store/shop/edit')">修改资料</view>
			</view>
		</view>
		
		<view slot="gBody">
			<view style="width: 680rpx;margin: 30rpx auto; background: #ffffff; padding: 20rpx; display: flex;justify-content: space-between;align-items: center;border-radius: 10rpx;">
				<view style="font-size: 30rpx;">营业执照</view>
				<image style="width: 70rpx;height: 70rpx;border-radius: 50%;" :src="detail.license"></image>
			</view>
			<view style="width: 680rpx;border-radius: 10rpx; margin: 30rpx auto; background: #ffffff; padding: 0 20rpx;">
				<view style="padding: 30rpx 0;display: flex;justify-content: space-between;align-items: center;border-bottom: 1rpx solid rgba(153, 153, 153, 0.1);">
					<view style="color: rgba(51, 51, 51, 1);font-size: 32rpx;">经营类目</view>
					<view style="color: rgba(51, 51, 51, 1);font-size: 28rpx;">{{ detail.cate_name }}</view>
				</view>
				<view style="padding: 30rpx 0;display: flex;justify-content: space-between;align-items: center;border-bottom: 1rpx solid rgba(153, 153, 153, 0.1);">
					<view style="color: rgba(51, 51, 51, 1);font-size: 32rpx;">执照名称</view>
					<view style="color: rgba(51, 51, 51, 1);font-size: 28rpx;">{{ detail.name }}</view>
				</view>
				<view style="padding: 30rpx 0;display: flex;justify-content: space-between;align-items: center;border-bottom: 1rpx solid rgba(153, 153, 153, 0.1);">
					<view style="color: rgba(51, 51, 51, 1);font-size: 32rpx;">联系人</view>
					<view style="color: rgba(51, 51, 51, 1);font-size: 28rpx;">{{ detail.nickname }}</view>
				</view>
				<view style="padding: 30rpx 0;display: flex;justify-content: space-between;align-items: center;border-bottom: 1rpx solid rgba(153, 153, 153, 0.1);">
					<view style="color: rgba(51, 51, 51, 1);font-size: 32rpx;">联系电话</view>
					<view style="color: rgba(51, 51, 51, 1);font-size: 28rpx;">{{ detail.mobile }}</view>
				</view>
			</view>
			<view class="card">
				<view class="cardHead">店址</view>
				<view class="item">
					<view class="k">所在地区</view>
					<view class="v" style="font-size: 28rpx;">
                        {{ detail.province }}
                        {{ detail.city }}
                        {{ detail.district }}
                    </view>
				</view>
				<view class="item block">
					<view class="k">详细地址</view>
					<view class="v textarea">
						<textarea :placeholder="detail.address" disabled placeholder-class="phcolor"></textarea>
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
                detail: {},
			}
		},
		mounted (){
            this.detail = uni.getStorageSync('union_detail');
		},
		methods: {
			goback (){
				uni.navigateTo({
				    url: '/pages/union/store/index'
				})
			},
			async submit (){
				console.log(this.promiseMoney)
			},
			goto (url){
				uni.navigateTo({
					url
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
						height: 100rpx;
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