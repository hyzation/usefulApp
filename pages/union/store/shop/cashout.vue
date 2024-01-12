<template>
	<gui-page :isLoading="pageLoading" :customHeader="true" ref="guiPage">
		<view slot="gHeader">
			<view class="header">
				<view class="left" @click="goback">
					<uni-icons type="back" size="24" color="#333333"></uni-icons>
				</view>
				<view class="title">提现</view>
				<view class="right"></view>
			</view>
		</view>
		
		<view slot="gBody">
            <view class="card">
                <view class="item">
                	<view class="k">银行卡</view>
                	<view class="v selector">
                        <union-selector :data="bankList" v-model="checkedBank" title="选择银行卡">
                        	<view>
                        		<text>{{ checkedBank.label || '选择银行卡' }}</text>
                        	</view>
                        </union-selector>
                    </view>
                </view>
                <view class="item">
                	<view class="k">提现金额</view>
                	<view class="v input">
                		<input placeholder-class="phcolor" v-model="money" placeholder="请输入提现金额" />
                	</view>
                </view>
            </view>
			<view class="submit" @click="submit">提交申请</view>
		</view>
	</gui-page>
</template>
<script>
	export default {
		data() {
			return {
				pageLoading: false,
                bankList: [
                    {
                        label: '6217001500003154125 - 中国银行',
                        value: 1
                    },
                    {
                        label: '6217001500003154125 - 建设银行',
                        value: 2
                    },
                ],
                checkedBank: '',
                money: ''
			}
		},
		async mounted (){
            const that = this;
            // 获取银行卡列表
            const res = await uni.unionRequest('swoft/api/user/getUserBankList', {
                uid: uni.getStorageSync('userInfo').shop_info.id,
                from: 2
            })
            that.bankList = res.data.map(item => {
                return {
                    label: `${item.bankCardNumber} - ${item.bankName}`,
                    value: String(item.id)
                }
            })
		},
		methods: {
			goback (){
				uni.navigateTo({
				    url: '/pages/union/store/index'
				})
			},
			async submit (){
                const that = this;
                if(!that.checkedBank.value){
                    uni.showToast({
                        title: '请选择银行卡',
                        icon: 'none'
                    })
                    return;
                }
                if(!that.money){
                    uni.showToast({
                        title: '请输入金额',
                        icon: 'none'
                    })
                    return;
                }
                const res = await uni.unionRequest('swoft/api/shop/shopWithdrawal', {
                    uid: uni.getStorageSync('userInfo').shop_info.id,
                    money: that.money,
                    cashMoneyType: 1,
                    bankCardId: that.checkedBank.value
                })
                if(res.code == 0){
                    uni.showToast({
                        title: '申请成功',
                        icon: 'success'
                    })
                    setTimeout(() => {
                        uni.navigateBack();
                    }, 1500)
                }else{
                    uni.showToast({
                        title: res.msg,
                        icon: 'error'
                    })
                }
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
        			font-size: 28rpx;
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