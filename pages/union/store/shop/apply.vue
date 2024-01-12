<template>
	<gui-page :isLoading="pageLoading" :customHeader="true" ref="guiPage">
		<view slot="gHeader">
			<view class="header">
				<view class="left" @click="goback">
					<uni-icons type="back" size="24" color="#333333"></uni-icons>
				</view>
				<view class="title">商家入驻</view>
				<view class="right"></view>
			</view>
		</view>
		
		<view slot="gBody">
			<view class="card">
				<view class="item">
					<view class="k">入驻类型</view>
					<view class="v radio">
						<union-radio :data="applyTypeList" v-model="applyType" />
					</view>
				</view>
				<view class="item">
					<view class="k">选择经营类目</view>
					<union-selector :data="categoryList" v-model="category" title="请选择经营类目">
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
					<view class="k">营业执照</view>
					<view class="v">
						<union-upload v-model="licenseUrl" />
					</view>
				</view>
				<view class="item">
					<view class="k">logo</view>
					<view class="v">
						<union-upload v-model="logo" />
					</view>
				</view>
				<view class="item" v-show="applyType.value == 2">
					<view class="k">门店照片</view>
					<view class="v">
						<union-upload v-model="storePhotoUrl" />
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
					<union-selector type="city" v-model="city" title="请选择所在地区">
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
				applyTypeList: [
					{
						label: '线上网商',
						value: 1
					},
					{
						label: '线下店商',
						value: 2
					}
				],
				applyType: {
					label: '线上网商',
					value: 1,
				},
                categoryDataList: [],
				categoryList: [],
				category: {},
				licenseName: '',
				licenseUrl: '',
                logo: '',
				storePhotoUrl: '',
				userName: '',
				mobile: '',
				city: {},
				address: '',
				from: ''
			}
		},
        watch: {
            applyType (n, o){
                this.category = {};
                this.categoryList = this.categoryDataList.data.filter(item => item.type == n.value).map(item => {
                    return {
                        value: item.id,
                        label: item.name
                    }
                })
                console.log(this.categoryList)
            }
        },
		onLoad (options){
			this.from = options.from;
		},
		async mounted (){
			this.applyStatus();
			this.categoryDataList = await uni.unionRequest('swoft/api/product/category/lists');
			this.categoryList = this.categoryDataList.data.filter(item => item.type == 1).map(item => {
				return {
					value: item.id,
					label: item.name
				}
			})
		},
		methods: {
			async applyStatus (){
				const res = await uni.unionRequest('swoft/api/shopapply/shopApplyDetail', {
					user_id: uni.getStorageSync('userInfo').id,
				})
				// if(this.from == 'reset'){
				// 	return;
				// }
				if(res.data.status == 1){
					this.showSuccessModel = true;
					setTimeout(() => {
						uni.switchTab({
							url: '/pages/my/index'
						})
					}, 2500)
				}
				
				if(res.data.status == 2){
					uni.navigateTo({
						url: '/pages/union/store/index'
					})
				}
				
				if(res.data.status == 3){
					uni.navigateTo({
						url: '/pages/union/store/error?error=' + res.data.auditExplain
					})
				}
			},
			goback (){
				uni.navigateBack();
			},
			async submit (){
				const that = this;
				const data = {
					user_id: uni.getStorageSync('userInfo').id,
					shop_type: that.applyType.value,
					cid: that.category.value,
					name: that.licenseName,
					business_license: that.licenseUrl,
                    logo: that.logo,
					shop_photo: that.storePhotoUrl,
					nickname: that.userName,
					mobile: that.mobile,
					province_id: that.city.province?.value,
					city_id: that.city.city?.value,
					district_id: that.city.area?.value,
					address: that.address
				}
				if(!data.cid){
					uni.showToast({ title: '请选择经营类目', icon: 'none' });
					return;
				}
				if(!data.name){
					uni.showToast({ title: '请输入执照名称', icon: 'none' });
					return;
				}
				if(!data.business_license){
					uni.showToast({ title: '请上传营业执照', icon: 'none' });
					return;
				}
				if(!data.logo){
					uni.showToast({ title: '请上传logo', icon: 'none' });
					return;
				}
				if(data.shop_type == 2 && !data.shop_photo){
					uni.showToast({ title: '请上传门店照片', icon: 'none' });
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
				if(!data.district_id){
					uni.showToast({ title: '请选择所在地区', icon: 'none' });
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