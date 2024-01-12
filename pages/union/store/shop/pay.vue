<template>
	<gui-page :isLoading="pageLoading" :customHeader="true" ref="guiPage">
		<view slot="gHeader">
			<view class="header">
				<view class="left" @click="goback">
					<uni-icons type="back" size="24" color="#333333"></uni-icons>
				</view>
				<view class="title">保证金/服务费</view>
				<view class="right"></view>
			</view>
		</view>
		
		<view slot="gBody">
			<view class="card">
				<view class="item">
					<view class="k">保证金</view>
					<view class="v">
						<union-upload-pay title="上传支付凭证" v-model="promiseMoney">
							<view class="paybtn">{{ promiseMoney.url ? '已上传' : '上传支付凭证'}}</view>
						</union-upload-pay>
					</view>
				</view>
				<view class="item">
					<view class="k">技术服务费</view>
					<view class="v input">
						<input placeholder-class="phcolor" disabled  :placeholder="`每笔订单成交额的${managefee_persent}‰`" />
					</view>
				</view>
				<view class="item">
					<view class="k">管理服务费</view>
					<view class="v">
						<union-upload-pay title="上传支付凭证" v-model="serviceMoney">
							<view class="paybtn">{{ serviceMoney.url ? '已上传' : '上传支付凭证'}}</view>
						</union-upload-pay>
					</view>
				</view>
			</view>
            <view style="text-align: center;font-size: 26rpx;color: #ccc;">如果已经提交过，请耐心等待审核。</view>
			<view class="submit" @click="submit">提交</view>
			<union-store-apply-success :status="showSuccessModel" />
		</view>
	</gui-page>
</template>
<script>
	export default {
		data() {
			return {
				pageLoading: false,
				showSuccessModel: false,
				managefee_persent: 5,
				promiseMoney: {},
				serviceMoney: {}
			}
		},
		mounted (){
            this.managefee_persent = Number(uni.getStorageSync('userInfo').shop_info.managefee_persent).toFixed(2);
		},
		methods: {
			goback (){
				uni.navigateTo({
				    url: '/pages/union/store/index'
				})
			},
			async submit (){
                const that = this;
                let data = {
                    shop_id: uni.getStorageSync('userInfo').shop_info.id,
                    deposit_num: that.promiseMoney.money,
                    deposit_img: that.promiseMoney.url,
                    managefee_num: that.serviceMoney.money,
                    managefee_img: that.serviceMoney.url
                }
                if(!data.deposit_num || !data.deposit_img){
                    uni.showToast({
                        title: '请填写保证金金额并上传图片',
                        icon: 'none'
                    })
                    return;
                }
                if(!data.managefee_num || !data.deposit_img){
                    uni.showToast({
                        title: '请填写服务费金额并上传图片',
                        icon: 'none'
                    })
                    return;
                }
                await uni.unionRequest('swoft/api/shop/addDeposit', data);
                this.showSuccessModel = true;
                setTimeout(function() {
                    uni.navigateTo({
                        url: '/pages/my/index'
                    })
                }, 2500);
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