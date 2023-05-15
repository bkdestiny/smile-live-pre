<template>
<div id="app">
  <router-view></router-view>
  </div>
</template>

<script>
import{mapActions} from 'vuex'
export default {
  name: 'App',
  components: {
  },
  computed:{
  	
  },
  mounted(){
  	this.initSocketIO()
  	this.initApp()
  },
  methods:{
  	initSocketIO(){
  		this.$socket.on('connect', ()=>{
       		 	 console.log("连接成功")
        });
        
      this.$socket.on('disconnect', ()=>{
       		 	 console.log("断开连接")
        });
  	},
  	initApp(){
  		this.$store.dispatch('aCurrentUser')
  	}
  }
}
</script>

<style scoped>
#app{
	background: #FFFFFF;
}
</style>
