<template>
	<view class="union-radio">
		<view class="item" v-for="(item,index) in data" :key="index" @click="itemClick(item)">
			<uni-icons :type="checked.value == item.value ? 'checkbox-filled' : 'circle'" :color="checked.value == item.value ? '#ff5e29' : '#999999'" size="20"></uni-icons>
			<view>{{ item.label }}</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"union-radio",
		props: ['data', 'value'],
		emits: ['input'],
		data() {
			return {
				checked: {}
			};
		},
		mounted (){
			this.checked = this.$props.value;
		},
		methods: {
			itemClick (item){
				this.checked = item;
				this.$emit('input', item);
			}
		}
	}
</script>

<style lang="scss">
	.union-radio{
		width: 100%;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		.item{
			color: #333333;
			font-size: 28rpx;
			margin-left: 20rpx;
			display: inline-flex;
			justify-content: flex-start;
			align-items: center;
			border: none;
			view{
				margin-left: 6rpx;
			}
		}
	}
</style>