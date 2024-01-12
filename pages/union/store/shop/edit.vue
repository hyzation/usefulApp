<template>
	<gui-page :isLoading="pageLoading" :customHeader="true" ref="guiPage">
		<view slot="gHeader">
			<view class="header">
				<view class="left" @click="goback">
					<uni-icons type="back" size="24" color="#333333"></uni-icons>
				</view>
				<view class="title">修改资料</view>
				<view class="right"></view>
			</view>
		</view>
		
		<view slot="gBody">
			<view style="width: 680rpx;margin: 30rpx auto; background: #ffffff; padding: 20rpx; display: flex;justify-content: space-between;align-items: center;border-radius: 10rpx;">
				<view style="font-size: 30rpx;">营业执照</view>
				<union-upload v-if="drawLicenseUrl" v-model="licenseUrl" />
			</view>
			<view class="card">
				<view class="item">
					<view class="k">选择经营类目</view>
					<union-selector :data="categoryList" v-if="drawCategroy" v-model="category" title="请选择经营类目">
						<view class="v selector">
							<text>{{ category.label || '请选择经营类目' }}</text>
							<uni-icons type="forward" size="20" color="#999999"></uni-icons>
						</view>
					</union-selector>
				</view>
				<view class="item">
					<view class="k">执照名称</view>
					<view class="v input">
						<input placeholder-class="phcolor" v-model="licenseName" placeholder="请输入营业执照商家名称" />
					</view>
				</view>
				<view class="item">
					<view class="k">联系人</view>
					<view class="v input">
						<input placeholder-class="phcolor" v-model="userName" placeholder="请输入联系人姓名" />
					</view>
				</view>
				<view class="item">
					<view class="k">联系电话</view>
					<view class="v input">
						<input placeholder-class="phcolor" v-model="mobile" placeholder="请输入联系人电话" />
					</view>
				</view>
			</view>
			<view class="card">
				<view class="cardHead">店址</view>
				<view class="item">
					<view class="k">所在地区</view>
					<union-selector v-if="drawCity" type="city" v-model="city" title="请选择所在地区">
						<view class="v selector">
							<text>{{ city.province ? `${city.province.label} ${city.city.label} ${city.area.label}` : '请选择经所在地区' }}</text>
							<uni-icons type="forward" size="20" color="#999999"></uni-icons>
						</view>
					</union-selector>
				</view>
				<view class="item block">
					<view class="k">详细地址</view>
					<view class="v textarea">
						<textarea placeholder="请输入详细地址" v-model="address" placeholder-class="phcolor"></textarea>
					</view>
				</view>
			</view>
			<view class="submit" @click="submit">提交申请</view>
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
                drawLicenseUrl: false,
                licenseUrl: '',
                drawCategroy: false,
				categoryList: [],
				category: '',
				licenseName: '',
				userName: '',
				mobile: '',
                drawCity: false,
				city: {},
				address: '',
			}
		},
		async mounted (){
            const detail = uni.getStorageSync('union_detail');
            
            // 营业执照
            this.licenseUrl = detail.license;
            this.drawLicenseUrl = true;
            
            // 经营类目
			const categoryList = await uni.unionRequest('swoft/api/product/category/lists', {
                type: detail.shopType
            })
            this.drawCategroy = false;
			this.categoryList = categoryList.data.map(item => {
				return {
					value: item.id,
					label: item.name
				}
			})
            
            this.category = this.categoryList.filter(item => item.value == detail.cid)[0];
            this.drawCategroy = true;
            
            // 输入框
            this.licenseName = detail.name;
            this.userName = detail.nickname;
            this.mobile = detail.mobile;
            this.address = detail.address
            
            // 所在地区
            this.city = {
                province: {
                    value: detail.provinceId,
                    label: detail.province
                },
                city: {
                    value: detail.cityId,
                    label: detail.city
                },
                area: {
                    value: detail.districtId,
                    label: detail.district
                }
            }
            this.drawCity = true;
		},
		methods: {
			goback (){
				uni.navigateTo({
				    url: '/pages/union/store/shop/info'
				})
			},
			async submit (){
                const that = this;
                const data = {
                    id: uni.getStorageSync('union_detail').id,
                    user_id: uni.getStorageSync('userInfo').id,
                    shop_type: uni.getStorageSync('union_detail').shopType,
                    cid: that.category.value,
                    name: that.licenseName,
                    business_license: that.licenseUrl,
                    nickname: that.userName,
                    mobile: that.mobile,
                    province_id: that.city.province?.value,
                    city_id: that.city.city?.value,
                    district_id: that.city.area?.value,
                    address: that.address
                }
                if(!data.name){
                    uni.showToast({ title: '请输入执照名称', icon: 'none' });
                    return;
                }
                if(!data.nickname){
                    uni.showToast({ title: '请输入联系人', icon: 'none' });
                    return;
                }
                if(!data.mobile){
                    uni.showToast({ title: '请输入联系电话', icon: 'none' });
                    return;
                }
                if(!data.address){
                    uni.showToast({ title: '请输入详细地址', icon: 'none' });
                    return;
                }
                const res = await uni.unionRequest('swoft/api/shopapply/shopApply', data);
                this.showSuccessModel = true;
                setTimeout(() => {
                    uni.switchTab({
                        url: '/pages/my/index'
                    })
                }, 2500)
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