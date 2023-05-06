//引入Vuex
import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'
import router from '../router'
Vue.use(Vuex)
//用于响应组件中的动作
const actions={
	aCurrentUser(context){
		if(localStorage.getItem("token")!=null){
  			axios({
  				method:'GET',
  				url:'/api/user/currentUser',
  				headers:{
  					authorization:localStorage.getItem("token")
  				}
  			}).then(
  				response=>{
  					if(response.data.success){
  						context.commit('mCurrentUser',response.data.data)
  					}
  				}
  			)
  		}
	},
	aGiftByValueAsc(context){
		axios({
			method:'GET',
			url:'/api/gift/queryByValueAsc'
		}).then(
			response=>{
				if(response.data.success){
					context.commit('mGiftByValueAsc',response.data.data)
				}else{
					console.log('获取礼物列表失败')
				}
			}
		)
	}
}
//用于操作数据
const mutations={
	mCurrentUser(state,data){
		state.currentUser=data
	},
	mGiftByValueAsc(state,data){
		state.giftData=data
	},

	
/*	SOCKET_chatevent(state,data){
		console.log('vuex -->',data)
		state.message.push(data)
	},*/
	SOCKET_currentUser(state,data){
		if(data.success){
			state.currentUser=data.data;
		}
	}
}
//用于将state中的数据进行加工
const getters={
	
}
const state={
	currentUser:null,
	giftData:null
}

export default new Vuex.Store({
	actions,mutations,state,getters
})

