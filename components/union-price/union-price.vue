<template>
	<view class="union-price" :style="{ fontSize: `${ $props.size || 40 }rpx`, color: $props.color || '#FF5E29' }">
		<text :style="{ fontSize: `${ $props.size ? $props.size/3*2 : 26 }rpx` }">￥</text>
		{{ $props.price }}
        <view v-if="$props.equityNum" style="font-size: 22rpx;color: #999999;">权益积分:{{$props.equityNum}}</view>
	</view>
</template>

<script>
	export default {
		name:"union-price",
		props: ['price', 'size', 'color', 'equityNum']
	}
</script>