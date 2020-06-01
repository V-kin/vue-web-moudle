import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Main from '../views/Main.vue'
import Home from '../views/Home.vue'
import notfound from '../views/404.vue'

Vue.use(VueRouter)

const routes = [
	{
	  path: '/',
		redirect: '/main',
	},
	{
	  path: '/login',	// 登录
		name:'login',
		component: Login,
	},
	{
	  path: '/main',	// 主页
	  component: Main,
		children: [
			{
			  path: '',
				redirect: 'home',
			},
			{
			  path: 'home',
			  name: 'home',
			  component: Home,
			},
			{
				path: '*',
				name: '404',
				component: notfound,
			},
		],
	},
	{
	  path: '*',	// 登录
	  name: '404 not found',
	  component: notfound,
	},
]

const router = new VueRouter({
	mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
	// console.log(from, to)
	//localStorage.removeItem('token') 删除
	//new Date().getTime()	获取时间戳
	//new Date(localStorage.getItem("token_time") * 1)	时间戳转换为时间
	
	//检查token是否存在
	let flag = false
	if(sessionStorage.token || localStorage.token){
		flag = true
	}
	
	//登陆保持模块
	if(to.redirectedFrom === '/'){	//默认根目录
		flag ? next() : next('/login')
	}
	else if(to.path === '/login'){
		//检查登录凭证是存在,存在则自动跳转到主页
		flag ? next('/main') : next()
	}
  else{
		if (flag){//检查是否存在,存在则继续
			next()
		}else {//登录凭证不存在则跳转到登录页
			// alert(to.redirectedFrom)
			// alert("登陆凭证丢失,请重新登陆")
			next({name:'login',params: {url_history_name:from.name}})
		}
	}
})

export default router
