<template>
	<page-meta :page-style="`overflow: ${ allowScroll ? 'visible' : 'hidden' }`"></page-meta>
	<view class="mins-popup" :class="modelAnimate" ref="model" @touchstart.stop="" @touchmove.stop="" @click.stop="modelClick" id="model" :style="{ display: modelDisplay }">
		<view class="mins-popup-content" ref="content" :class="contentAnimate">
			<view class="title" v-if="$props.title">{{ $props.title }}</view>
			<slot></slot>
			<view class="button" id="submit">{{ $props.buttonText || '确定' }}</view>
		</view>
	</view>
</template>

<script>
	let timer = null;
	export default {
		props: ['value', 'buttonText', 'title'],
		emits: ['close', 'submit'],
		watch: {
			value (e){
				if(e) this.showPopup();
			}
		},
		data (){
			return {
				modelDisplay: 'none',
				modelAnimate: 'fadeIn',
				contentAnimate: 'slideFromBottom',
				allowScroll: true
			}
		},
		methods: {
			modelClick (e){
				if(e.target.id == 'model') this.closePopup();
				if(e.target.id == 'submit'){
					this.closePopup();
					this.$emit('input', false);
					this.$emit('submit');
				}
			},
			showPopup (){
				this.modelDisplay = 'block';
				this.modelAnimate = 'fadeIn';
				this.contentAnimate = 'slideFromBottom';
				this.allowScroll = false;
			},
			closePopup (){
				this.modelAnimate = 'fadeOut';
				this.contentAnimate = 'slideToBottom';
				this.$emit('input', false);
				this.allowScroll = true;
				timer = setTimeout(() => {
					this.modelDisplay = 'none';
				}, 300)
			}
		}
	}
</script>

<style lang="scss">
	// 动画
	@keyframes fadeIn {
		0%{
			opacity: 0;
		}
		100%{
			opacity: 1;
		}
	}
	@keyframes fadeOut {
		0%{
			opacity: 1;
		}
		100%{
			opacity: 0;
		}
	}
	@keyframes slideFromBottom {
		0%{
			bottom: -100%;
		}
		100%{
			bottom: 0;
		}
	}
	@keyframes slideToBottom {
		0%{
			bottom: 0;
		}
		100%{
			bottom: -100%;
		}
	}
	
	
	.fadeIn{
		animation: fadeIn forwards 0.3s;
	}
	.fadeOut{
		animation: fadeOut forwards 0.3s;
	}
	.slideFromBottom{
		animation: slideFromBottom forwards 0.3s;
	}
	.slideToBottom{
		animation: slideToBottom forwards 0.3s;
	}
	.mins-popup{
		width: 100vw;
		height: 100vh;
		background: rgba(0, 0, 0, 0.7);
		position: fixed;
		top: 0;
		left: 0;
		z-index: 9999;
		display: none;
		.mins-popup-content{
			width: 100vw;
			position: absolute;
			bottom: 0;
			left: 0;
			background: rgb(255, 255, 255);
			border-top-right-radius: 30rpx;
			border-top-left-radius: 30rpx;
			padding-bottom: 100rpx;
			overflow: hidden;
			.title{
				padding: 20rpx;
				text-align: center;
				color: #333333;
				font-size: 36rpx;
			}
			.button{
				width: 670rpx;
				height: 80rpx;
				background: linear-gradient(90deg, #FF330F 0%, #FF8C15 100%);
				border-radius: 41rpx;
				position: absolute;
				bottom: 10rpx;
				left: 40rpx;
				text-align: center;
				line-height: 80rpx;
				color: #ffffff;
				font-size: 28rpx;
			}
		}
	}
</style>