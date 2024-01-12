<template>
	<view class="grace-add-list">
		<view class="grace-add-list-items" v-for="(item, index) in imgLists" :key="index" :style="'width:'+itemsWidth+';height:'+itemsWidth+';'">
			<image :src="item.url" :data-imgurl="item.url" @tap="showImgs" mode="aspectFill"></image>
			<view v-if="canEdit" class="grace-add-list-remove gui-icons" 
			:style="{color:closeBtnColor}" @tap.stop="removeImg" :id="'grace-items-img-'+index">
				<image src="../../static/images/setting/delete.png"></image>
			</view>
			<view class="upload-progress" v-if="canEdit">
			   <progress :percent="item.progress" 
			   :stroke-width="progressSize" :activeColor="progressColor" :backgroundColor="progressBGColor" />	
			</view>
			<view class="grace-add-list-reup" :style="'width:'+itemsWidth+';height:'+itemsWidth+';'" @tap.stop="retry" :data-index="index" v-if="item.error">
				<text class="grace-add-list-reup-icon gui-icons">&#xe635;</text>
				<text class="grace-add-list-reup-text">失败重试</text>
			</view>
		</view>
		<view class="grace-add-list-items" @tap="addImg" v-if="canEdit&&imgLists.length < maxFileNumber" :style="'width:'+itemsWidth+';height:'+itemsWidth+';'">
			<image :src="btnImg" mode="aspectFill"></image>
		</view>
		<!-- <view class="grace-add-list-items grace-add-list-btn" :style="{background:btnBgColor}" @tap="addImg" v-if="canEdit&&imgLists.length < maxFileNumber">
			<view class="grace-add-list-btn-icon">+</view>
			<view class="grace-add-list-btn-text">{{btnName}}</view>
		</view> -->
		<!-- 消息提示框 -->
		<quick-message ref="message"></quick-message>
	</view>
</template>
<script>
import qiniuUploader from '@/static/js/qiniuUploader.js';
export default {
	props:{
		itemIndex : {
		  type : Number,
		  default : 0
		},
		maxFileNumber : {
			type : Number,
			default : 9
		},
		itemsWidth : {
			type : String,
			default : "180rpx"
		},
		btnName : {
			type : String,
			default : "添加图片"
		},
		items : {
			type : Array,
			default : function () {
				return [];
			}
		},
		closeBtnColor : {
			type : String,
			default : "#666666"
		},
		btnBgColor : {
			type : String,
			default : "#F6F7F8"
		},
		btnImg : {
			type : String,
			default : "../../static/images/shopcart/camera.png"
		},
		progressSize :{
			type:Number,
			default:1
		},
		progressColor :{
			type:String,
			default:'#27BD81'
		},
		progressBGColor :{
			type:String,
			default:'#F8F8F8'
		},
		canEdit :{
			type:Boolean,
			default:true
		},
		selectedimgs :{
			type : Array,
			default : function () {
				return [];
			}
		}
	},
	data() {
		return {
			imgLists : this.selectedimgs,
			updatting : false,
			qiniu:null,
		}
	},
	// computed:{
	// 	imgLists: function(){
	// 		return this.selectedimgs;
	// 	}
	// },
    methods:{
		getRefs : function(ref, count, fun){
			if(count >= 50){
				fun(this.$refs[ref]);
				return false;
			}
			var refReturn = this.$refs[ref];
			if(refReturn){
				// #ifdef APP-NVUE
				fun(refReturn);
				return;
				// #endif
				// #ifndef APP-NVUE
				if(refReturn._data){
					fun(refReturn);
					return;
				}
				// #endif
			}else{
				count++;
				setTimeout(()=>{
					this.getRefs(ref, count, fun);
				}, 100);
			}
		},
		openMessage: function(type,msg,icon,time){
			this.getRefs('message',0,(ref)=>{
				this.$refs.message.show({
					type: type, //String 默认default
					msg: msg, //String 显示内容 *
					direction: 'center', //String 默认顶部显示
					icon: icon, //Boolean|String 显示icon(false/true/string 默认显示icon)
					mask: true, //Boolean 遮罩（默认false没有遮罩）
					time: time, //Number|Boolean 默认3000/false为不自动关闭
					customStyle:{ //自定义样式
						color: (type == 'success' ? '#FF4F00' : '#FFFFFF'), //字体图标色
						backgroundColor: (type == 'success' ? '#FFFFFF' : 'rgba(0,0,0,0.5)'), //背景色
						fontSize: '28rpx',
						lineHeight: '40rpx'
					}, 
					iconSize: 14, //Number 自定义icon大小(单位px 默认16 设置后会覆盖自定义样式里的设置优先级最高)
					iconColor: '', //String icon颜色(默认主题颜色 设置后会覆盖自定义样式里的设置优先级最高)
				});
			});
		},
		clearAllImgs : function(){
			this.imgLists = [];
		},
        addImg : function(){
            var num = this.maxFileNumber - this.imgLists.length;
            if(num < 1){return false;}
            uni.chooseImage({
                count: num,
                sizeType: ['compressed'],
                success:(res) => {
					for(let i = 0; i < res.tempFilePaths.length; i++){
						this.imgLists.push({url : res.tempFilePaths[i], progress : 0, error : false, _key : i});
					}
                    uni.hideLoading();
                },
				complete:function(){
					uni.hideLoading();
				},
				fail:function(){
					uni.hideLoading();
				}
            });
        },
        removeImg : function(e){
            var index = e.currentTarget.id.replace('grace-items-img-', '');
            this.imgLists.splice(index, 1);
        },
        showImgs : function(e){
            var currentImg = e.currentTarget.dataset.imgurl;
        	var imgs = [];
        	for(let i = 0; i < this.imgLists.length; i++){
        		imgs.push(this.imgLists[i].url);
        	}
            uni.previewImage({
				urls: imgs,
				current : currentImg
            })
        },
		upload : async function(index){
			if(this.updatting){return ;}
			this.updatting = true;
			if(!index){index = 0;}
			uni.showLoading({title:"图片上传中" });
			if(!this.qiniu)
			{
				await this.getToken();
			}
			this.uploadBase(index);
		},
		retry : function (e) {
			var index = e.currentTarget.dataset.index;
			this.upload(index);
		},
		uploadBase: function (index) {
			// 全部上传完成
			if(index > (this.imgLists.length - 1)){
				uni.hideLoading();
				this.updatting = false;
				this.$emit('uploaded', this.imgLists, this.itemIndex);
				return ;
			}
			// 检查是否是默认值
			if(this.imgLists[index].progress >= 1){
				this.uploadBase(index+1);
				return ;
			}
			this.imgLists[index].error = false;
			var file=this.imgLists[index].url;
			var timetamp = new Date().getTime();
			var filename =  'refundss_'+timetamp +'_'+index+'.png';
			qiniuUploader.upload(this.imgLists[index].url,
			    res => {
					//上传图片成功
					this.imgLists[index].progress = 100;
					this.imgLists[index].url = this.qiniu.domain+res.key;
					this.imgLists[index].error = false;
					//this.imgLists.splice(index, 1, this.imgLists[index]);
					this.uploadBase(index+1);
			    },
			    error => {
					// console.log(error);
					uni.hideLoading();
					this.openMessage('default','第'+(index+1)+'张图片上传失败',true,1500);
					this.error(index);
			    },
			    { 
			        key: filename, // [非必须]自定义文件 key。如果不设置，默认为使用微信小程序 API 的临时文件名
					region: this.qiniu.region, // （必须填写正确）ECN, SCN, NCN, NA, ASG，分别对应七牛的：华东，华南，华北，北美，新加坡 5 个区域
					domain: this.qiniu.domain, // bucket 域名，下载资源时用到。如果设置，会在 success callback 的 res 参数加上可以直接使用的 ImageURL字段。否则需要自己拼接
			        // 以下方法三选一即可，优先级为：uptoken > uptokenURL > uptokenFunc
			        uptoken: this.qiniu.uptoken // 由其他程序生成七牛 uptoken
			    },
				progress => {
					// console.log('progress')
				},
			);
		},
		// 上传错误
		error: function(index){
			this.updatting = false;
			setTimeout(()=>{
				this.imgLists[index].progress = 0;
				this.imgLists[index].error    = true;
				this.$emit('uploaderror',this.itemIndex);
			}, 500);
		},
		// 设置默认值
		setItems: function(items){
			for(let i = 0; i < items.length; i++){
				this.imgLists.push({url : items[i], progress : 100, error : false});
			}
		},
		getToken: function(){
			var that = this;
			return new Promise((resolve, reject) => {
				uni.gRequest.post(
					'swoft/api/user/getQiniuToken',
					{}, 
					(res) => {
						if(res.data){
							that.qiniu = res.data;
							resolve();
						}else{
							this.openMessage('default','七牛云token获取失败',true,1500);
						}
					},
					(error) => {
						this.openMessage('default','七牛云token获取失败',true,1500);
					},
					(res) => {},
					true,
					true
				);
			});
		}
    }
}
</script>
<style scoped>
.grace-add-list{display:flex; flex-wrap:wrap;}
.grace-add-list-btn{display:flex; flex-direction:column; align-items:center; justify-content:center;}
.grace-add-list-btn-text{font-size:22rpx; line-height:36rpx; text-align:center; color:#999999; width:100%;}
.grace-add-list-btn-icon{font-size:80rpx; height:80rpx; line-height:80rpx; margin-bottom:20rpx; color:#999999;}
.grace-add-list-items{width:180rpx; height:180rpx; margin-bottom:20rpx; margin-right:20rpx; background:#F8F8F8; position:relative;display:flex;justify-content:center;align-items:center;border-radius:10rpx;}
.grace-add-list-items image{width:100%;height:100%;border-radius:10rpx;}
.grace-add-list-image{width:180rpx;}
.grace-add-list-remove{width:40rpx; height:40rpx; line-height:40rpx; text-align:center; font-size:40rpx; position:absolute; z-index:5; right:10rpx; top:10rpx; color:#FF0D00!important;}
.upload-progress{position:absolute; z-index:2; left:0; bottom:10rpx; width:90%; padding:0 5%;}
.grace-add-list-reup{position:absolute; z-index:3; left:0; top:0rpx; width:222rpx; height:222rpx; display:flex; justify-content:center; align-items:center; background-color:rgba(0,0,0,0.3);flex-direction:column;}
.grace-add-list-reup-icon{text-align:center; width:100%; color:#FFFFFF; display:block; font-size:60rpx; line-height:100rpx;}
.grace-add-list-reup-text{text-align:center; width:100%; color:#FFFFFF; display:block; font-size:20rpx; line-height:30rpx;}
.horizontal {
	display: flex;
	flex-wrap: wrap;
}
</style>