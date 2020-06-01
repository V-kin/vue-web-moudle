<template>
  <div class="login-page">
    <div class="login-box" style="width: 460px;">
      <div class="login-logo">
        <a href="/main"><b>管理</b>&nbsp系统</a>
      </div>
      <!-- /.login-logo -->
      <div class="login-box-body" style="margin: 0 50px;">
        <p class="login-box-msg">请登录系统开始您的工作</p>
				<el-input size="small" class="vue-input" v-model="account" @keyup.enter.native="sub()" prefix-icon="el-icon-user-solid" placeholder="账户名" clearable></el-input>
				<el-input size="small" class="vue-input" v-model="password" @keyup.enter.native="sub()" prefix-icon="el-icon-lock" placeholder="密码" show-password clearable></el-input>
				<div class="row">
					<div class="col-xs-12 vue-row">
						<el-checkbox v-model="checked">保存登陆信息</el-checkbox>
						<a @click="test()">忘记密码</a>
					</div>
					<!-- /.col -->
				</div>
				<div class="row vue-row" style="margin-top: 10px;">
					<div class="col-xs-12">
						<button type="submit" class="btn btn-primary btn-block btn-flat" @click="sub()">登陆</button>
					</div>
				</div>
    
      </div>
      <!-- /.login-box-body -->
    </div>
    <!-- /.login-box -->
  </div>
</template>

<style scoped>
.login-box-body{
	display: flex;
	flex-direction: column;
}

.vue-row{
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.vue-input{
	margin-bottom: 15px;
}

.el-checkbox__input.is-checked+.el-checkbox__label{
	color: #3c8dbc !important;
}

label {
	margin-bottom: 0px !important;
}
.btn {
	font-size: 13px;
}
</style>

<script>
  export default {
    data() {
      return {
				account: 'test',
				password: '123456',
				checked: false
      }
    },
		beforeCreate() {
			// console.log(this.$router)
		},
		methods: {
			test() {
				// sessionStorage.setItem('token', 'xxx')
				// console.log(sessionStorage.getItem('token'))
			},
			sub() {
				const url = '/background/login/api/login'
				
				if (this.account === '') {
					alert('请输入帐号！')
					return false
				}
				if (this.password === '') {
					alert('请输入密码！')
					return false
				}
				let data = {'account': this.account,
										'password': this.password,
										'rememberme': this.checked,
									}
				// console.log(data)
				
				this.axios.post(url, data)
					.then(response => {
						if (response.data.code === 1) {
							//保存token
							this.checked ? localStorage.token = response.data.token : sessionStorage.token = response.data.token
							
							//跳转
							if(this.$router.currentRoute.params.url_history_name){//如果是由登录超时后重新登陆的，则跳转回原路径
								this.$router.push({name:this.$router.currentRoute.params.url_history_name, params: {url_history_name:'login'}})
							}
							else{
								this.$router.push({name:'home',params: {url_history_name:'login'}})
							}
						}
					}).catch(error => {})
			}
		}
  }
</script>