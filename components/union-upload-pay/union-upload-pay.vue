<template>
	<view class="union-upload-pay">
		<view @click="showPopupFoo">
			<slot></slot>
		</view>
		<union-popup :title="title" v-model="showPopup" @close="onPopupClose" @submit="onPopupSubmit">
			<view class="card">
				<view class="item">
					<view class="k">保证金</view>
					<view class="v input">
						<input placeholder-class="phcolor" v-model="money" placeholder="请输入支付金额" />
					</view>
				</view>
				<view class="item">
					<view class="k">支付凭证</view>
					<view class="v">
						<union-upload v-model="url" />
					</view>
				</view>
			</view>
		</union-popup>
	</view>
</template>

<script>
	export default {
		name:"union-upload-pay",
		props: ['data', 'multiple', 'title', 'type', 'value'],
		emits: ['input', 'close'],
		data() {
			return {
				showPopup: false,
				money: '',
				url: ''
			};
		},
		methods: {
			showPopupFoo (){
				this.showPopup = true;
			},
			onPopupClose (){
				this.showPopup = false;
			},
			onPopupSubmit (){
				const that = this;
				that.$emit('input', {
					money: that.money,
					url: that.url
				})
			}
		}
	}
</script>

<style lang="scss">
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
</style>