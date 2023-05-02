import VueRouter from 'vue-router'
import axios from 'axios'

import Home from '../views/Home'
import HomeBody from '../components/HomeModule/HomeBody'
import Live from '../pages/HomeModule/Live'
import Loading from '../components/Loading'

import PersonalCenter from '../pages/HomeModule/PersonalCenter'

/*个人中心*/
import MyProfile from '../pages/PersonalCenterModule/MyProfile'
import MyAvatar from '../pages/PersonalCenterModule/MyAvatar'
const router=new VueRouter({
	routes:[
	{
		name:'home',
		path:'/',
		component:Home,
		children:[
			{
				name:'homebody',
				path:'/',
				component:HomeBody
			},
			{
				name:'live',
				path:'/live',
				component:Live
			},
			{
				name:'personalcenter',
				path:'/personalcenter',
				component:PersonalCenter,
				children:[
					{
						path:'/personalcenter',
						redirect:'/personalcenter/myprofile'
					},
					{
						name:'myprofile',
						path:'/personalcenter/myprofile',
						component:MyProfile,
					},
					{
						name:'myavatar',
						path:'/personalcenter/myavatar',
						component:MyAvatar
					}
				]
			}
		]
	},
	{
		name:'loading',
		path:'loading',
		component:Loading
	}
	
	]
})

router.beforeEach((to,from,next)=>{
	console.log("to-->",to)
	if(to.path=="/personalcenter"||to.path=="/personalcenter/myprofile"||to.path=='/personalcenter/myavatar'){
		if(localStorage.getItem("token")){
			axios({
				method:'GET',
				url:'/api/user/currentUser',
				headers:{
					authorization:localStorage.getItem("token")
				}
			}).then(
				response=>{
					if(response.data.success){
						next()
					}else{
						alert('登录后才能访问')
						next('/')
					}
				}
			)
		}else{
			alert('登录后才能访问')
			next('/')
		}
	}else{
		next()
	}
	
	

	
})


export default router
