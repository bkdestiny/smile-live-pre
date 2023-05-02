<template>
<div>
	<HomeHeader></HomeHeader>
	<router-view></router-view>
</div>
</template>

<script>
	import HomeHeader from '../components/HomeModule/HomeHeader'
	export default{
		name:'Home',
		components:{
			HomeHeader
		},
		data(){
			return {
				
			}
		},
		methods:{
			
		}
	}
</script>

<style>
</style>