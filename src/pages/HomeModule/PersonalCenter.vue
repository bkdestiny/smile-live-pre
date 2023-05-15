<template>
<div>
<div id="personalcenter">
<div id="guide">
<div style="width: 100%;height:45px;line-height:45px;
	text-align: center;font-size: 20px;
	border-bottom: 1px solid lightgray ;
	font-weight: 600;
	">个人中心</div>
<div v-for="m in modules" :ref="m.routername" :id="m.routername"
	@click="currentModule=m"
	style="width: 100%;height: 50px;border-bottom:1px solid lightgray;cursor: pointer;">
	<img :src="m.imgSrc" style="height:25px;width: 25px;position: relative;left: 20px;top:15px"/>
	<div style="display: inline-block;position: relative;left: 35px;top:15px">{{m.name}}</div>
</div>
</div>
<div style="width: 813px; display:inline-block;
	float: left;position:relative;left: 30px;
	border-left:1px solid lightgray;
	border-right:1px solid lightgray;
	border-bottom: 1px solid lightgray;">
<div style="width: 100%;height:50px;line-height: 50px;
	text-align: center;font-size: 18px;color:#409EFF;
	border: 1px solid lightgray;display: inline-block;
	position: relative;font-weight:600">{{currentModule.name}}</div>
<router-view></router-view>
</div>
</div>
</div>
</template>

<script>
	import {mapState} from 'vuex'
	export default{
		name:'PersonalCenter',
		data(){
			return{
				currentModule:
				{name:'我的资料',label:'myprofile',imgSrc:require('@/assets/img/personal-blue.png')},
				modules:[
				{name:'我的资料',label:'myprofile',imgSrc:require('@/assets/img/personal-blue.png')},
				{name:'我的头像',label:'myavatar',imgSrc:require('@/assets/img/avatar-blue.png')},
				{name:'我的钱包',label:'mywallet',imgSrc:require('@/assets/img/wallet-blue.png')}
				]
			}
		},
		mounted(){
		},
		computed:{
			...mapState(['currentUser'])
			
		},
		watch:{
			currentModule(newVal,oldVal){
				this.$router.replace({
					name:newVal.label
				},()=>{})
				if(oldVal!==null){
				var oldElement=document.getElementById(oldVal.label);
				oldElement.style.background="white";
				oldElement.style.color="black";
				}
				var newElement=document.getElementById(newVal.label);
				newElement.style.background="#00A1D6";
				newElement.style.color="white";
			}
		},
		methods:{
			changeModule(val){
				if(val==this.currentModule){
					return;
				}

			}
		}
	}
</script>

<style>
#personalcenter{
	width: 1000px;
	min-height: 800px;
	position: relative;
	margin: 0 auto;
	margin-top: 30px;
	border-top: 1px solid lightgrey;
	padding-top: 20px;
}
#guide{
	width: 170px;
	min-height: 300px;
	display: inline-block;
	float: left;
}
.hover-background-lightgray:hover{
	background: lightgray;
}
</style>