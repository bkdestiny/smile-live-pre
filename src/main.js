import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'
import Vuex from 'vuex'
import store from './store'
import VueSocketIO from 'vue-socket.io'
import "./plugins/element"
import './assets/css/reset.css'
import axios from 'axios'
Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(new VueSocketIO({
	debug:true,
	options:{
		autoConnect:true
	},
	connection:'http://localhost:9092',
	vuex:{
		store,
		actionPrefix:'SOCKET_',
		mutationPrefix:'SOCKET_',
	}
}))
Vue.prototype.$axios=axios

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
