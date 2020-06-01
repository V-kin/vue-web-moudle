<template>
  <div class="wrapper" v-loading="fullscreenLoading">
    <header class="main-header">
      <!-- Logo -->
      <a class="logo">
        <!-- mini logo for sidebar mini 50x50 pixels -->
        <span class="logo-mini">管</span>
        <!-- logo for regular state and mobile devices -->
        <span class="logo-lg">管理系统</span>
      </a>
    
      <!-- Header Navbar: style can be found in header.less -->
      <!-- 首行 -->
      <nav class="navbar navbar-static-top">
        <!-- Sidebar toggle button-->
        <a class="sidebar-toggle" @click="collapse()" data-toggle="push-menu" role="button">
          <span class="sr-only">导航栏切换</span>
        </a>
        <!-- Navbar Right Menu -->
        <div class="navbar-custom-menu">
          <ul class="nav navbar-nav">
            <!-- Tasks: style can be found in dropdown.less -->
            <!-- 上方旗帜按钮 -->
            <li class="dropdown tasks-menu">
              <a class="dropdown-toggle" data-toggle="dropdown">
                <i class="fa fa-flag-o"></i>
                <span class="label label-danger">9</span>
              </a>
              <ul class="dropdown-menu">
                <li class="header">You have 9 tasks</li>
                <li>
                  <!-- inner menu: contains the actual data -->
                  <ul class="menu">
                    <li><!-- Task item -->
                      <a>
                        <h3>
                          Design some buttons
                          <small class="pull-right">20%</small>
                        </h3>
                        <div class="progress xs">
                          <div class="progress-bar progress-bar-aqua" style="width: 20%" role="progressbar"
                               aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
                            <span class="sr-only">20% Complete</span>
                          </div>
                        </div>
                      </a>
                    </li>
                    <!-- end task item -->
                  </ul>
                </li>
                <li class="footer">
                  <a>View all tasks</a>
                </li>
              </ul>
            </li>
            <!-- User Account: style can be found in dropdown.less -->
            <li class="dropdown user user-menu">
              <a class="dropdown-toggle" data-toggle="dropdown">
                <img :src="imgUrl" class="user-image" alt="User Image">
                <span class="hidden-xs">{{eInfo.name}}</span>
              </a>
              <ul class="dropdown-menu">
                <!-- User image -->
                <li class="user-header">
                  <img :src="imgUrl" class="img-circle" alt="User Image">
    
                  <p>
                    {{eInfo.name}}
                    <!-- <small>Member since Nov. 2012</small> -->
                  </p>
                </li>
                <!-- Menu Body -->
                <li class="user-body">
                  <div class="row">
										<div class="col-xs-4 text-center" style="padding-right: 10px; padding-left: 10px;">
												<a>职位：</a>
										</div>
                    <div class="col-xs-4 text-center" v-for="position in eInfo.position" style="padding-right: 10px; padding-left: 10px;">
                      <a>{{position.name}}</a>
                    </div>
                  </div>
                  <!-- /.row -->
                </li>
                <!-- Menu Footer-->
                <li class="user-footer">
                  <div class="pull-left">
                    <a class="btn btn-default btn-flat">Profile</a>
                  </div>
                  <div class="pull-right">
                    <a class="btn btn-default btn-flat" @click="signOut()">注销</a>
                  </div>
                </li>
              </ul>
            </li>
            <!-- Control Sidebar Toggle Button -->
            <li>
              <a data-toggle="control-sidebar"><i class="fa fa-gears"></i></a>
            </li>
          </ul>
        </div>
    
      </nav>
    </header>
    <!-- Left side column. contains the logo and sidebar -->
    <!-- 菜单栏 -->
    <aside class="main-sidebar">
      <!-- sidebar: style can be found in sidebar.less -->
      <section class="sidebar">
        <!-- Sidebar user panel -->
        <div class="user-panel">
          <div class="pull-left image">
            <img :src="imgUrl" class="img-circle" alt="User Image">
          </div>
          <div class="pull-left info">
            <p>{{eInfo.name}}</p>
            <a ><i class="fa fa-circle text-success"></i> Online</a>
          </div>
        </div>
				
				<el-menu class="el-menu-vertical-demo" 
					:collapse="isMenuCollapse" :default-active="$route.path"
					background-color="#f9fafc" unique-opened router>
					<div v-for="(menu_main, index) in menuMain" :key="index">
						
						<!-- 有二级菜单 -->
						<el-submenu :index="menu_main.id" v-if="getMenu(menu_main.id).length">
							<template slot="title">
								<i :class="menu_main.icon_vue"></i>
								<span slot="title">{{menu_main.name}}</span>
							</template>
							<el-menu-item-group>
								<el-menu-item :index="menu_child.router" v-for="(menu_child, index2) in getMenu(menu_main.id)" :key="index2">
									<i :class="menu_child.icon_vue"></i>
									{{menu_child.name}}
								</el-menu-item>
							</el-menu-item-group>
						</el-submenu>
						
						<!-- 无二级菜单 -->
						<el-menu-item :index="menu_main.router" v-else>
						  <i :class="menu_main.icon_vue"></i>
						  <span slot="title">{{menu_main.name}}</span>
						</el-menu-item>
						
					</div>
				</el-menu>
      </section>
      <!-- /.sidebar -->
    </aside>
    
    <!-- Content Wrapper. 主要内容 -->
    <div class="content-wrapper">
      <!-- Content Header (Page header) -->
      <section class="content-header">
        <h1>
          {{nowMain.name || 'Title'}}
          <!-- <small>Version 2.0</small> -->
        </h1>
        <ol class="breadcrumb">
          <li><router-link to="/"><i class="fa fa-dashboard"></i> 首页</router-link></li>
          <li class="active" v-if="this.$route.path !== '/main/home'">{{nowMain.name}}</li>
        </ol>
      </section>
    
      <!-- Main content -->
      <section class="content">
        
        <!-- Main row -->
        <router-view/>
        <!-- /.row -->
      </section>
      <!-- /.content -->
    </div>
    <!-- /.content-wrapper -->
    
    <!-- 底部 -->
    <footer class="main-footer">
      <div class="pull-right hidden-xs">
        <b>Version</b> 1.0
      </div>
      <strong>&copy; test </strong> 版权所有。
    </footer>
    
    <!-- 控件侧边栏 -->
    <aside class="control-sidebar control-sidebar-dark">
      <!-- Create the tabs -->
      <ul class="nav nav-tabs nav-justified control-sidebar-tabs">
        <li class="active"><a href="#control-sidebar-home-tab" data-toggle="tab"><i class="fa fa-home"></i></a></li>
        <li><a href="#control-sidebar-settings-tab" data-toggle="tab"><i class="fa fa-gears"></i></a></li>
      </ul>
      <!-- Tab panes -->
      <div class="tab-content">
        <!-- Home tab content -->
        <div class="tab-pane active" id="control-sidebar-home-tab">
          <h3 class="control-sidebar-heading">Recent Activity</h3>
          <ul class="control-sidebar-menu">
            <li>
              <a href="javascript:void(0)">
                <i class="menu-icon fa fa-birthday-cake bg-red"></i>
    
                <div class="menu-info">
                  <h4 class="control-sidebar-subheading">Langdon's Birthday</h4>
    
                  <p>Will be 23 on April 24th</p>
                </div>
              </a>
            </li>
            <li>
              <a href="javascript:void(0)">
                <i class="menu-icon fa fa-file-code-o bg-green"></i>
    
                <div class="menu-info">
                  <h4 class="control-sidebar-subheading">Cron Job 254 Executed</h4>
    
                  <p>Execution time 5 seconds</p>
                </div>
              </a>
            </li>
          </ul>
          <!-- /.control-sidebar-menu -->
    
          <h3 class="control-sidebar-heading">Tasks Progress</h3>
          <ul class="control-sidebar-menu">
            <li>
              <a href="javascript:void(0)">
                <h4 class="control-sidebar-subheading">
                  Custom Template Design
                  <span class="label label-danger pull-right">70%</span>
                </h4>
    
                <div class="progress progress-xxs">
                  <div class="progress-bar progress-bar-danger" style="width: 70%"></div>
                </div>
              </a>
            </li>
            <li>
              <a href="javascript:void(0)">
                <h4 class="control-sidebar-subheading">
                  Update Resume
                  <span class="label label-success pull-right">95%</span>
                </h4>
    
                <div class="progress progress-xxs">
                  <div class="progress-bar progress-bar-success" style="width: 95%"></div>
                </div>
              </a>
            </li>
          </ul>
          <!-- /.control-sidebar-menu -->
    
        </div>
        <!-- /.tab-pane -->
    
        <!-- Settings tab content -->
        <div class="tab-pane" id="control-sidebar-settings-tab">
          <form method="post">
            <h3 class="control-sidebar-heading">General Settings</h3>
    
            <div class="form-group">
              <label class="control-sidebar-subheading">
                Report panel usage
                <input type="checkbox" class="pull-right" checked>
              </label>
    
              <p>
                Some information about this general settings option
              </p>
            </div>
            <!-- /.form-group -->
    
            <div class="form-group">
              <label class="control-sidebar-subheading">
                Allow mail redirect
                <input type="checkbox" class="pull-right" checked>
              </label>
    
              <p>
                Other sets of options are available
              </p>
            </div>
            <!-- /.form-group -->
          </form>
        </div>
        <!-- /.tab-pane -->
      </div>
    </aside>
    <!-- /.control-sidebar -->
    <!-- Add the sidebar's background. This div must be placed
         immediately after the control sidebar -->
    <div class="control-sidebar-bg"></div>
    
  </div>
</template>

  <!-- AdminLTE Skins. Choose a skin from the css/skins
       folder instead of downloading all of them to reduce the load. -->
  <!-- <link rel="stylesheet" href="/dist/css/skins/skin-blue-light.css"> -->
<style>
 	/* @import "/dist/css/skins/skin-blue-light.css"; */
	
	.navbar-nav > .user-menu > .dropdown-menu > li.user-header {
			height: 155px;
	}
	
	/* 菜单基础设置 */
	.el-menu-vertical-demo:not(.el-menu--collapse) {
	  width: 100%;
		border: 0;
		margin-top: 10px;
	}
	/* 菜单字体 */
	.el-menu-vertical-demo{
		font: normal normal normal 14px/1 FontAwesome;
		font-weight: 600;
	}
	
	/* 仅一级菜单设置 */
	.el-menu-item{	/* 基础 */
		height: 50px !important;
		line-height: 50px !important;
	}
	.el-menu-item i{
		color: #333 !important;
	}
	.el-menu-item:hover, .el-menu-item.is-active{
		color: #333 !important;
		background-color: #f4f4f5 !important;
	}
	
	/* 含二级菜单的一级菜单 */
	.el-submenu__title{	/* 基础 */
		height: 50px !important;
		line-height: 50px !important;
	}
	.el-submenu__title i{
		color: #333 !important;
	}
	.el-submenu__title:hover{
		background-color: #f4f4f5 !important;
	}
	/* 因为菜单的for和if语句，添加了一层div */
	.el-menu--collapse>div>.el-menu-item span, .el-menu--collapse>div>.el-submenu>.el-submenu__title span {
		height: 0;
		width: 0;
		overflow: hidden;
		visibility: hidden;
		display: inline-block;
	}
	
	/* 二级菜单设置 */
	.el-menu-item-group .el-menu-item{	/* 基础 */
		height: 45px !important;
		line-height: 45px !important;
	}
	.el-menu-item-group .el-menu-item i{	/* 图标设置 */
		font-size: 15px;
    padding-bottom: 3px;
	}
	.el-menu-item-group{
		font-weight: 400;
	}
	.el-menu-item-group .el-menu-item{
		color: #777777;
		background-color: #f4f4f5 !important;
	}
	.el-menu-item-group .el-menu-item:hover{
		color: #333;
	}
	.el-menu-item-group .el-menu-item.is-active{
		font-weight: 600 !important;
	}
	/* 隐藏二级菜单的title */
	.el-menu-item-group__title{
		padding: 0 !important;
	}
	
	/* 压缩菜单设置 */
	.el-menu--collapse{
		width: 49px !important;
		border-right: 0 !important;
	}
	.el-menu--collapse .el-tooltip, .el-menu--collapse .el-submenu__title{
		padding: 0 12px !important;
	}
	
	/* 折叠框外边距 */
	.el-collapse{
		margin: 0 10px 10px 0;
	}
	/* 折叠框的头高度 */
	.el-collapse-item__header {
		height: 30px !important;
		padding-left: 15px !important;
		font-weight: 600 !important;
	}
	/* 折叠框的头的边框颜色 */
	.el-collapse-item__header.is-active {
		border-bottom-color: #f4f4f4 !important;
	}
	/* 折叠框的头的文字样式 */
	.el-collapse-item__header div{
		overflow: hidden !important;
		white-space: nowrap !important;
		text-overflow: ellipsis !important;
	}
	
	.text-limit{
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
</style>

<script>
	
  export default {
    data() {
      return {
        imgUrl: '/dist/img/user2-160x160.jpg',
				eInfo: '',
				menu: [],
				isCollapse: false,	// 左侧菜单是否折叠
				screenMini: false		,// 是否是小屏幕,
				fullscreenLoading: false
      }
    },
    created() {
			//手动刷新一次，以解决从login跳转到首页后左侧菜单异常问题
			if(this.$router.currentRoute.params.url_history_name === 'login'){
				this.$router.go(0);
				return false
			}
			
			// 监听屏幕变化,宽度小于769则判断为小屏幕
			const that = this
			$(window).resize(function () {
				that.screenMini = ($(window).width() < 769) ? true : false
			});			
			this.screenMini = (document.body.clientWidth < 769) ? true : false
			
			// 调用接口
			this.fullscreenLoading = true;
			this.axios.get('/background/todo/api/index',{params:''})
				.then(response => {
					if (response.data.code === 1) {
						//填入职工基础信息
						this.eInfo = response.data.data.employee_info						
						//整理并填入左侧菜单信息
						this.menu = response.data.data.menu
						
						this.fullscreenLoading = false;
					}
			}).catch(error => {})
			
			// console.log(this.$route)
    },
		computed: {
			menuMain () {	// 一级菜单显示
				return this.menu.filter(function (menu) {
				  return menu.pid === '0'
				})
			},
			nowMain () {	// 当前显示的菜单
				let re = this.menu.filter(function (menu) {
						return menu.router === this.$route.path
					},this)[0]
				return re ? re : {}
			},
			isMenuCollapse () {	// 前端获取菜单状态
				return this.screenMini ? false : this.isCollapse
			}
		},
		methods: {
			signOut() {//注销
				this.axios.post('/background/login/api/usersignout')
					.then(response => {
						if (response.data.code === 1) {
							localStorage.removeItem("token")
							sessionStorage.removeItem("token")
							this.$router.push('/login')
						}
					}).catch(error => {})
			},
			getMenu(index) {	//针对一级菜单id来输出二级目录
				index=index.toString()
				return this.menu.filter(function (menu) {
				  return menu.pid === index
				})
			},
			collapse() {	// 点击左侧菜单折叠按钮
				if(this.screenMini){
					return false
				}
				
				this.isCollapse = !this.isCollapse
			},
			jump() {
				this.$router.push('/')
			}
		}
  }
</script>