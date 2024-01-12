<template>
	<gui-page :isLoading="pageLoading" :customHeader="true" ref="guiPage">
		<view slot="gHeader">
			<view class="header">
				<view class="left"></view>
				<view class="title">审核失败</view>
				<view class="right"></view>
			</view>
		</view>
		
		<view slot="gBody">
			<view class="error">
				<image src="../../../../static/images/empty.png" mode="widthFix"></image>
				<view class="text">{{ error }}</view>
			</view>
			<view class="submit" @click="submit">重新提交</view>
		</view>
	</gui-page>
</template>
<script>
	export default {
		data() {
			return {
				pageLoading: false,
				error: ''
			}
		},
		onLoad (options){
			this.error = options.error;
		},
		methods: {
			goback (){
				uni.navigateBack();
			},
			submit (){
				uni.navigateTo({
					url: '/pages/union/store/apply?from=reset'
				})
			},
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
		
		.error{
			padding: 200rpx 0;
			text-align: center;
			image{
				width: 400rpx;
			}
			view{
				font-size: 30rpx;
				color: #666666;
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
				border-top: 1rpx solid #F5F5F5;
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
				.v .paybtn{
					width: 170rpx;
					height: 40rpx;
					border: 1px solid #FF5E29;
					border-radius: 21rpx;
					font-size: 24rpx;
					color: #FF5E29;
					text-align: center;
					line-height: 40rpx;
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
		.submit{
			width: 665rpx;
			height: 80rpx;
			background: linear-gradient(90deg, #FF330F 0%, #FF8C15 100%);
			border-radius: 41rpx;
			color: #FBFBFB;
			font-size: 29rpx;
			text-align: center;
			line-height: 80rpx;
			margin: 30rpx auto;
		}
	}
</style>