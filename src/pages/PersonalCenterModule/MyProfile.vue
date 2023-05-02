<template>
<div id="myprofile">
<div class="myprofile-item" style="margin-top:80px ;">	
<div  class="myprofile-item-label" >用户名:</div>
<span style="color:grey">{{userInfo.username}}</span>
</div>
<div class="myprofile-item">	
<div  class="myprofile-item-label">昵称:</div>
<el-input type="text" v-model="userInfo.nickname" 
	style="display: inline-block;float: left;width: 300px;"/>
</div>

<div class="myprofile-item">
	<div class="myprofile-item-label">性别:</div>
	<el-radio v-model="userInfo.sex" label="男" class="sex-radio">男</el-radio>
	<el-radio v-model="userInfo.sex" label="女" class="sex-radio">女</el-radio>
	<el-radio v-model="userInfo.sex" label="未知" class="sex-radio">未知</el-radio>
</div>
<div class="myprofile-item">
	<div class="myprofile-item-label">出生日期:</div>
	    <el-date-picker
      v-model="userInfo.birthday"
      type="date"
      placeholder="选择日期">
    </el-date-picker>
</div>
<!--保存btn-->
<el-button 
	@click="handlerUpdateUserInfo"
	style="margin: 50px 0;width: 150px;background: #409EFF;color:white;position: relative;left: 40%;"
	>保存</el-button>
</div>
</template>

<script>
	import {mapState} from 'vuex'
	export default{
		name:'MyProfile',
		data(){
			return{
			}
		},
		computed:{
			...mapState(['currentUser']),
			userInfo(){
				return this.currentUser
			}
		},
		mounted(){
			console.log("-->",this.currentUser,this.userInfo)
			this.userInfo=this.currentUser
		},
		methods:{
			handlerUpdateUserInfo(){
				this.$axios({
					method:'POST',
					url:'/api/user/updateUserInfo',
					data:this.userInfo,
					headers:{
						authorization:localStorage.getItem("token")
					}
				}).then(
					response=>{
						if(response.data.success){
							this.$message.success('保存成功')
						}else{
							this.$message.info(response.data.message)
						}
					}
				)
			}
		}
	}
</script>

<style scoped>
#myprofile{
	
}
.myprofile-item{
	display: inline-block;
	width: 100%;
	height: 55px;
	line-height: 55px;
	margin: 5px 0;
}
.myprofile-item-label{
	display: inline-block;
	float: left;
	margin: 0 30px 0 200px;
}
</style>