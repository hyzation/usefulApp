<template>
	<view class="union-selector">
		<view @click="showPopup = true">
			<slot></slot>
		</view>
		<union-popup :title="title" v-model="showPopup" @submit="onPopupSubmit">
			<view class="selector" v-if="!$props.type">
				<view class="item" :class="{ selected: selected.map(i => i.value).includes(item.value) }" v-for="(item, index) in data" :key="index" @click="itemClick(item)">
					<view>{{ item.label }}</view>
					<uni-icons :type="selected.map(i => i.value).includes(item.value) ? 'checkbox-filled' : 'circle'" size="22" :color="selected.map(i => i.value).includes(item.value) ? '#ff5918' : '#cccccc'"></uni-icons>
				</view>
			</view>
			
			<view class="citysSelector" v-if="$props.type == 'city'">
				<view class="col">
					<view class="item" @click="pClick(pindex)" :class="{ selected: pindex == selectedProvinceIndex }" v-for="(p, pindex) in province" :key="p.value">{{ p.label }}</view>
				</view>
				<view class="col">
					<view class="item" @click="cClick(cindex)" :class="{ selected: cindex == selectedCityIndex }" v-for="(c, cindex) in citys" :key="c.value">{{ c.label }}</view>
				</view>
				<view class="col">
					<view class="item" @click="aClick(aindex)" :class="{ selected: aindex == selectedAreaIndex }" v-for="(a, aindex) in areas" :key="a.value">{{ a.label }}</view>
				</view>
			</view>
		</union-popup>
	</view>
</template>

<script>
	export default {
		name:"union-selector",
		props: ['data', 'multiple', 'title', 'type', 'value'],
		emits: ['input'],
		data() {
			return {
				showPopup: false,
				selected: [],
				allCitys: [],
				province: [],
				selectedProvinceIndex: 0,
				citys: [],
				selectedCityIndex: 0,
				areas: [],
				selectedAreaIndex: 0,
			};
		},
		async mounted (){
			// 数据回显
			if(!this.$props.type){
				this.selected = this.$props.multiple ? this.$props.value : [this.$props.value];
                console.log(this.selected)
			}
			
			// 初始化城市选择器
			if(this.$props.type == 'city'){
				const res = await this.getCitys();
				this.allCitys = res.data;
				this.drawCitySelector();
				
				// 城市回显
				if(this.$props.value.province){
					let pValue = this.$props.value.province.value;
					let cValue = this.$props.value.city.value;
					let aValue = this.$props.value.area.value;
					this.selectedProvinceIndex = this.province.findIndex(i => i.value == pValue);
					this.pClick(this.selectedProvinceIndex);
					this.selectedCityIndex = this.citys.findIndex(i => i.value == cValue);
					this.cClick(this.selectedCityIndex);
					this.selectedAreaIndex = this.areas.findIndex(i => i.value == aValue);
					this.aClick(this.selectedAreaIndex);
				}
			}
		},
		methods: {
			onPopupSubmit (){
				let data = null;
				if(!this.$props.type){
					data = this.$props.multiple ? this.selected : this.selected[0];
				}
				if(this.$props.type == 'city'){
					data = {
						province: this.province[this.selectedProvinceIndex],
						city: this.citys[this.selectedCityIndex],
						area: this.areas[this.selectedAreaIndex]
					}
				}
				this.$emit('input', data);
			},
			itemClick (item){
				if(this.$props.multiple){
					let index = this.selected.findIndex(i => i.value == item.value);
					if(index < 0){
						this.selected.push(item);
					}else{
						this.selected.splice(index, 1);
					}
				}else{
					this.selected = [item];
				}
			},
			getCitys (){
				return new Promise(resolve => {
					uni.gRequest.post(
						'swoft/admin/common/getArea',
						{}, 
						(res) => {
							resolve(res)
						}
					);
				})
			},
			drawCitySelector (){
				this.province = this.allCitys.map(item => {
					return {
						value: item.value,
						label: item.label
					}
				})
				this.citys = this.allCitys[this.selectedProvinceIndex].children.map(item => {
					return {
						value: item.value,
						label: item.label
					}
				})
				this.areas = this.allCitys[this.selectedProvinceIndex].children[this.selectedCityIndex].children.map(item => {
					return {
						value: item.value,
						label: item.label
					}
				})
			},
			pClick (index){
				this.selectedProvinceIndex = index;
				this.selectedCityIndex = 0;
				this.selectedAreaIndex = 0;
				this.drawCitySelector();
			},
			cClick (index){
				this.selectedCityIndex = index;
				this.selectedAreaIndex = 0;
				this.drawCitySelector();
			},
			aClick (index){
				this.selectedAreaIndex = index;
				this.drawCitySelector();
			},
		}
	}
</script>

<style lang="scss">
	.union-selector{
		.selector{
			padding: 30rpx 0;
			max-height: 500rpx;
			overflow-x: hidden;
			overflow-y: auto;
			.item{
				width: 670rpx;
				margin: 0 auto;
				text-align: center;
				padding: 25rpx 0;
				font-size: 30rpx;
				color: #999999;
				display: flex;
				justify-content: space-between;
				align-items: ce
				;
			}
			.item:first-child{
				border: none;
			}
			.item.selected{
				color: #FF330F;
			}
		}
		.citysSelector{
			padding: 30rpx 0;
			height: 500rpx;
			display: flex;
			justify-content: space-between;
			align-items: flex-start;
			overflow: hidden;
			.col{
				width: 100%;
				height: 500rpx;
				overflow-x: hidden;
				overflow-y: auto;
				.item{
					text-align: center;
					font-size: 26rpx;
					color: #999999;
					padding: 15rpx 0;
				}
				.item.selected{
					color: #FF330F;
				}
			}
		}
	}
</style>