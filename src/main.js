import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import qs from 'qs'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

Vue.config.productionTip = false

//全局qs,通过this.qs试用
Vue.prototype.qs = qs
//qs.parse()是将URL解析成对象的形式
//qs.stringify()是将对象 序列化成URL的形式，以&进行拼接

// 全局axios,通过this.axios使用,添加拦截器
Vue.prototype.axios = axios
// axios.defaults.baseURL = '/ttt'

// 请求拦截器
axios.interceptors.request.use(function (config) {
	//进入主页后若没有token,禁止发送api请求
	if(router.currentRoute.name != 'login' && !sessionStorage.token && !localStorage.token){
		alert("登陆凭证丢失,请重新登陆")
		router.push({name:'login',params: {url_history:router.currentRoute.path}})
		//拦截后续的链式请求,返回错误
		return Promise.reject();
	}
	config.headers['token'] = sessionStorage.token ? sessionStorage.token : localStorage.token
	//进行上传数据的格式转换以及添加token
	if(config.method === 'post' || config.method === 'put'){
		if(!config.data){
			config.data = {}
		}
		config.data = qs.stringify(config.data)
	}
	else if(config.method === 'get'){
		if(!config.params){
			config.params = {}
		}
	}
	
	// console.log(config)
	return config
});

// 响应拦截器
axios.interceptors.response.use(function (response) {
	//显示回显数据
	console.log('接收响应url:' + response.config.url + '   code:' + response.status + '   返回值:' + Object.values(response.data))
	// console.log(response.data)
	
	//响应错误提示
	if(response.data.code !== 1){
		alert(response.data.msg)
	}
	
	return response;
},
function (error) {
	if(!error.response){
		console.log(error)
	}
	else if(error.response.status){
		switch (error.response.status){
			case 401:{	//错误码401为token失效,返回登录页
					sessionStorage.removeItem('token')
					localStorage.removeItem('token')
					alert("登陆凭证失效,请重新登陆")
					router.push({name:'login',params: {url_history:router.currentRoute.path}})
				}
				break;
			case 405:{	//请求的路径错误
					alert("请求路径错误,请联系管理员")
				}
				break;
			case 500:{	//服务器异常,请稍后再试
					alert("服务器异常,请稍后再试")
				}
				break;
			default:{
					console.log('请求失败：')
					console.log(error)
				}
				break;
		}
	}
	else{
		console.log(error)
	}
	
	return Promise.reject(error);
});

new Vue({
	router,
	store,
	render: function (h) { return h(App) }
}).$mount('#app')
