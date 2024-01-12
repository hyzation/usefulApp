import * as qiniu from 'qiniu-js';

const getQiNiuToken = () => {
	return new Promise(resolve => {
		uni.gRequest.post(
			'/swoft/api/user/getQiniuToken',
			{
				data: {
					gracesign: uni.gRequest.signValue({}).sign
				},
				header: {
					logintoken: uni.getStorageSync('uToken')
				}
			},
			(res) => {
				resolve(res.data);
			},
			(error) => {
				_this.$refs.guiPage.openMessage('default','请求错误',true,1500);
			},
		)
	})
}

const rename = (name) => {
	let firstName = name.split('/');
	let lastName = firstName.pop();
	firstName = firstName.join('/');
	lastName = lastName.split('.').pop();
	return `${firstName}/${new Date().getTime()}.${lastName}`;
}

const upload = (file, key) => {
	key = rename(key);
	return new Promise(async resolve => {
		uni.showLoading({ title: '上传中' });
		const token = await getQiNiuToken();
		const observable = qiniu.upload(file, key, token.uptoken);
		observable.subscribe({
			next (response){
				console.log(response)
			},
			error (err){
				console.log('err')
			},
			complete (res){
				resolve(token.domain + res.key);
				uni.hideLoading();
			}
		})
	})
}

export default upload;