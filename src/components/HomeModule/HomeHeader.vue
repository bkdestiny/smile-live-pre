<template>
<div id="HomeHeader">
<img id="logo" src="../../assets/logo-title.png" width="150" height="50"/>
<div id="guide-box">
	<router-link :to="{name:'homebody'}" class="guide-item"><span>首页</span></router-link>
	<router-link to="" class="guide-item">直播</router-link>
	<router-link to="" class="guide-item">视频</router-link>
</div>
<div id="search-box">
	<input type="text" id="search-input" v-model="searchInput"/>
	<img id="search-button" src="../../assets/img/search-button.png" @click="handlerSearch()" />
</div>
<div id="userguide-box">
	<el-popover trigger="hover" class="userguide-item">
		<!--订阅的直播间-->
		<div v-if="!currentUser" style="width: 340px;height: 60px;line-height: 60px;text-align: center;">未登录</div>
		<div v-else style="width: 340px;min-height: 60px;max-height:240px;overflow: hidden;">
			<div v-if="liveRoomFollow.length==0" style="text-align: center;line-height: 60px;">未关注直播间</div>
			<div v-for="f in liveRoomFollow" @click="aIntoLiveRoom(f.liveUserId)" style="cursor:pointer;position: relative;width: 100%;height: 60px;">
			<el-avatar :src="imageUrl(f.avatar)" style="width: 40px;height: 40px;position:relative;left: 10px;top:10px"></el-avatar>
			<div style="width: 150px;height: 100%;display: inline-block;position: relative;left: 30px;">
				<div style="margin: 10px 0 5px 0;">{{f.title}}</div>
				<div style="color:darkgray;font-size: 12px;">{{f.nickname}}</div>
			</div>
			<div style="display:inline-block;float: right;position: relative;top:20px;right: 20px;">
			<div v-if="f.live">直播中</div>
			<div v-else>未开播</div>
			</div>
		</div>
		</div>
		<div slot="reference">订阅</div></el-popover>
	<div class="userguide-item">历史</div>
	<!--未登录的头像-->
	<div v-if="!currentUser"  @click="loginFormVisible=true" class="userguide-item">
	<el-avatar 
		:src="require('@/assets/img/defaultHeadImg.png')"
		:size="40" 
		style="display: inline-block;position:relative;float:left;top: 15px;cursor: pointer;"
		></el-avatar>
		</div>
	<!--已登录的头像-->
	<div v-else class="userguide-item">
		<el-popover trigger="hover" placement="bottom-end">
			<div class="user-avatar-popover" style="height: 200px;width: 250px;">
				<div style="text-align: center;
					font-size: 20px;
					position: relative;top:20px">{{currentUser.nickname}}</div>
				<div style="text-align: center;
					position: relative;top:40px;
					font-size: 18px;
					color:grey;cursor:pointer"
					>
					<span class="text-hover-blue" style="margin: 0 20px;">关注 17</span>|<span class="text-hover-blue" style="margin: 20px;">粉丝 22</span>
					</div>
					<!--底栏 功能栏-->
					<div style="position: relative;
						top:80px;font-size: 10px;
						color:gray;cursor: pointer;border-top:1px solid lightgrey;padding-top: 15px;">
					<!--跳转个人中心-->
					<router-link
						:to="{name:'myprofile'}"
						style="text-align: center;
						position: relative;float: left;" >
						<img src="../../assets/img/personal.png"/>
						<div style="margin-top: 5px;">个人中心</div>
					</router-link>
					<div @click="aLogout()" style="text-align: center;position: relative;float: left;margin: 0 20px;">
						<img src="../../assets/img/logout.png"/>
						<div style="margin-top: 5px;">退出登录</div>
					</div>
					</div>
					</div>
		<el-avatar slot="reference"
		:src="imageUrl(currentUser.avatar)"
		style="display: inline-block;position:relative;float:left;top: 10px;cursor: pointer;">
		</el-avatar>
		</el-popover>
		</div>
</div>
	<!--登录对话框-->
	<el-dialog :visible.sync="loginFormVisible" width="30%" center append-to-body>
		<div v-if="loginMode==1||loginMode==2"
			style="text-align: center;font-size: 20px;margin-bottom: 50px;">
			<span ref="passwordLogin" style="margin-right: 20px;cursor: pointer;color:#6BB3DF" 
				@click="loginMode=1">密码登录</span>
			<span ref="verifyLogin" style="cursor: pointer;" 
				@click="loginMode=2">短信登录</span>
		</div>
		<!--账号密码登录-->
		<div style="height: 320px;text-align: center;" 
			v-if="loginMode==1">
			<div class="loginItem">
				<label class="loginLabel">账号</label>
				<el-input class="loginInput"
					type="text"
					v-model="account"
					placeholder="请输入用户名或手机号"
					/>
			</div>
			<!--登录密码-->
			<div class="loginItem">
				<label class="loginLabel">密码</label>
				<el-input class="loginInput"
					type="password"
					v-model="loginForm.password"
					placeholder="请输入密码"
					/>
			</div>
			<!--登录验证码-->
			<div class="loginItem">
				<label class="loginLabel">验证码</label>
				<el-input 
					:maxlength="6"
					class="loginInput" 
					style="width: 80px;height: 50px;" type="text" 
					v-model="loginForm.captcha"/>
				<img ref="captcha"  @click="refreshCaptcha" 
					src="api/user/loginCaptcha" 
					style="cursor:pointer;width: 100px;height: 50px;"/>
			</div>
			<el-button @click="handlerLoginByPassword" 
				style="background: #409EFF;color:white;
				float:left;position: relative;left: 30%;
				width: 100px;
				height: 40px;
				margin-top: 20px;
				">登录</el-button>
			<el-button style="position: relative;left: 20px;width: 100px;
				height: 40px;
				margin-top: 20px;"
				@click="loginMode=3"
				>注册</el-button>
		</div>
		<!--短信登录-->
		<div v-if="loginMode==2" style="text-align: center;">
			短信登录
		</div>
		<!--账号注册-->
		<div v-if="loginMode==3" style="text-align: center;height: 450px;">
			<div style="margin: 0 0 50px 0;font-size: 23px;">账号注册</div>
			<div class="loginItem">
				<label class="loginLabel">用户名</label>
				<el-input type="text" class="loginInput"/>
			</div>
			<div class="loginItem">
				<label class="loginLabel">手机号码</label>
				<el-input type="text" class="loginInput"/>
			</div>
			<div class="loginItem">
				<label class="loginLabel">密码</label>
				<el-input type="password" class="loginInput"/>
			</div>
			<div class="loginItem">
				<label class="loginLabel">确认密码</label>
				<el-input type="password" class="loginInput"/>
			</div>
			<div style="position: relative;left: 10%;margin-bottom: 40px;">
				<el-input type="text" 
					placeholder="验证码"
					v-model="registerForm.verifyCode"
					style="width:130px;margin-right: 20px;"
					/><el-button style="width: 120px;">发送验证码</el-button>
			</div>
			<el-button style="width: 230px;height: 50px;background: #409EFF;color:white">注册</el-button>
			<div @click="loginMode=1"
				style="position:relative;top:50px;float: right;font-size: 10px;cursor: pointer;">返回登录</div>
		</div>

	</el-dialog>
</div>
</template>

<script>
	import {mapState,mapActions} from 'vuex'
	export default{
		name:'HomeHeader',
		data(){
			return{
				loginFormVisible:false,
				currentGuide:'首页',
				searchInput:'',
				account:'',
				loginForm:{
					password:'',
					captcha:''
				},
				loginMode:1,
				registerForm:{
					verifyCode:""
				},
				liveRoomFollowData:[],
			}
		},
		computed:{
			...mapState(['currentUser','liveRoomFollow']),
		},
		watch:{
			loginMode(){
				if(this.loginMode==1){
					this.$refs.passwordLogin.style.color="#6BB3DF";
					this.$refs.verifyLogin.style.color="black";
				}else if(this.loginMode==2){
					this.$refs.passwordLogin.style.color="black";
					this.$refs.verifyLogin.style.color="#6BB3DF";
				}
			}
		},
		methods:{
			...mapActions(['aIntoLiveRoom','aLoginByPassword','aLogout']),
			imageUrl(path){
				return "/api/file/image?path="+path;
			},
			refreshCaptcha(){
				console.log("cap-->",this.$refs.captcha)
				this.$refs.captcha.src="api/user/loginCaptcha?time="+new Date().getTime()
			},
			handlerSearch(){
				this.$message.info('搜索功能')
			},
			handlerLoginByPassword(){
				if(this.account.length<1){
					this.$message.info("用户名或密码不能为空")
					return;
				}
				if(this.loginForm.captcha.length!=6){
					this.$message.info("请正确输入验证码")
					return;
				}
				if(this.account.length==11){
					this.loginForm.phone=this.account
				}else{
					this.loginForm.username=this.account
				}
				this.aLoginByPassword(this.loginForm)
				this.loginFormVisible=false
			}
		}
	}
</script>

<style scoped>
#HomeHeader{
	width: 100%;
	height: 60px;
	border-bottom: 1px solid grey;
	
}
#logo{
	position: relative;
	top:5%;
	left:10%;
	cursor: pointer;
	float: left;
}
#guide-box{
	display: inline-block;
	position: relative;
	width: 400px;
	height: 60px;
	left: 15%;
	float: left;
}
.guide-item{
	display: inline-block;
	height: 60px;
	width: 50px;
	text-align: center;
	font-size: 17px;
	line-height: 60px;
	margin-right: 30px;
	cursor: pointer;
	color:black;
}
#search-box{
	display: inline-block;
	border: 1px solid grey;
	height: 30px;
	width: 220px;
	border-radius: 15px;
	position: relative;
	top:0%;
	left: 15%;
	float: left;
	margin: 15px 0;
}
#search-input{
	background: none;
	height: 30px;
	width: 180px;
	padding-left: 10px;
	border: none;
	border-radius: 15px;
	outline: none;
}
#search-button{
	margin: 3px 5px 0 0;
	float: right;
	height: 25px;
	width: 25px;
	border: none;
	cursor: pointer;
}
#userguide-box{
	display: inline-block;
	width: 300px;
	height: 60px;
	float: left;
	position: relative;
	left: 40%;
	top: 0;
}
.userguide-item{
	display: inline-block;
	margin-right: 50px;
	cursor: pointer;
}
.loginItem{
	margin: 15px 0;
	width: 100%;
	display: block;
	float: left;
}
.loginLabel{
	width: 80px;
	height: 40px;
	line-height: 40px;
	float: left;
	position: relative;
	left: 50px;
}
.loginInput{
	width: 300px;
	position: relative;
	left: 70px;
	float: left;
}
</style>