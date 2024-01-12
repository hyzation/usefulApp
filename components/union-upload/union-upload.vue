<template>
	<view class="union-upload" @click="onClick">
		<view class="chose" v-if="!uploading">
			<uni-icons type="camera" color="#999999" size="26"></uni-icons>
			<view class="text">点击上传</view>
		</view>
		<image class="cover" :src="url" v-if="url"></image>
	</view>
</template>

<script>
	import uploadToQiNiu from "@/static/js/uploadToQiNiu.js";
	export default {
        props: ['value'],
		name:"union-upload",
		emits: ['input'],
        mounted (){
            this.url = this.$props.value;
        },
		data() {
			return {
				uploading: false,
				url: ''
			}
		},
		methods: {
			async onClick (){
				const that = this;
				const file = await that.choseFile();
				const url = await uploadToQiNiu(file, `union/store/${file.name}`); // 目录 + 文件名，文件名最后会被转成 时间戳 + 后缀名
				this.url = url;
				this.$emit('input', url);
			},
			choseFile (){
				const that = this;
				return new Promise(resolve => {
					uni.chooseImage({
						count: 1,
						success (res){
							resolve(res.tempFiles[0]);
						}
					})
				})
			},
		}
	}
</script>

<style lang="scss">
	.union-upload{
		width: 130rpx;
		height: 130rpx;
		border-radius: 10rpx;
		border: 1rpx solid #e7e7e7;
		display: flex;
		justify-content: center;
		align-content: center;
		flex-wrap: wrap;
		position: relative;
		.chose{
			display: flex;
			justify-content: center;
			align-content: center;
			flex-wrap: wrap;
			.text{
				color: #999999;
				font-size: 24rpx;
			}
		}
		.cover{
			width: 130rpx;
			height: 130rpx;
			border-radius: 10rpx;
			position: absolute;
			z-index: 5;
		}
		.loading{
			width: 130rpx;
			height: 130rpx;
			border-radius: 10rpx;
			position: absolute;
			z-index: 10;
		}
	}
</style>