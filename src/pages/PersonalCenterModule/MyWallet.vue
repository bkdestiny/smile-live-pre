<template>
<div style="min-height: 230px;position: relative;">
<div style="width: 100%;height: 100px;top:30px;position: relative;">
	<img src="../../assets/img/Rune.png" style="width: 100px;height: 100px;margin-left: 90px;"/>
	<div style="display: inline-block;font-size: 24px;color:orange">{{currentUser.wallet}}</div>
	<el-button style="width: 100px;height:50px;
		position: relative;float: right;right: 90px;top:30%" @click="payVisible=true">充值卢恩</el-button>
</div>
<!--充值选项页面-->
<div  v-if="payVisible" style="min-height: 580px;width: 100%;position: relative;top:80px">	
	<div class="payOptions-box">
		<div v-for="p in payOptions" 
			@click="currentPayOption=p" 
			class="payOptions-item"
			:style="payOptionStyle(p)"
			>
			<div class="payOptions-item-value">{{p.value}}
				<img src="../../assets/img/Rune.png" 
					style="width: 60px;height: 60px;"/>
			</div>
			<div class="payOptions-item-money" >￥{{p.money}}</div>
		</div>
	</div>
	<!--协议 支付按钮-->
	<div style="float: left;width: 100%;height: 100px;position: relative;">
		<div style="position: relative;left: 15%;top:60px">
			<el-checkbox v-model="acceptPayAgreement"></el-checkbox>
			我已阅读并同意
			<el-link style="color:blue">《充值卢恩用户协议》</el-link>
		</div>
		
		<el-button @click="handlerCreateOrder"
			style="position: absolute;top:30px;
			left: 70%;width: 140px;
			height: 60px;font-size: 18px;
			background: #409EFF;
			color:white">前往充值</el-button>
	</div>
</div>
<div style="position: absolute;bottom: 10px;left: 48%;cursor: pointer;border-radius: 50px;border: 1px solid gray;">
	<img  style="width: 25px;height: 25px;" src="../../assets/img/down.png" v-if="!payVisible" @click="payVisible=true"/>
	<img  style="width: 25px;height: 25px;" src="../../assets/img/up.png" v-else  @click="payVisible=false"/>
</div>
</div>
</template>

<script>
	import {mapState} from 'vuex'
	export default{
		name:'MyWallet',
		data(){
			return{
				payVisible:false,
				currentPayOption:null,
				acceptPayAgreement:false,
				payOptions:[
				{value:60,money:6},
				{value:180,money:18},
				{value:300,money:30},
				{value:680,money:68},
				{value:1980,money:198},
				{value:6480,money:648}
				]
			}
		},
		computed:{
			...mapState(['currentUser'])
		},
		methods:{
			payOptionStyle(p){
				if(p==this.currentPayOption){
					return 'border:1px solid #409EFF;color:#409EFF';
				}
			},
			handlerCreateOrder(){
				if(this.currentPayOption==null){
					this.$message.info("请选择充值金额")
					return;
				}
				if(!this.acceptPayAgreement){
					this.$message.info("请先阅读并同意支付等相关协议")
					return;
				}
				this.$axios({
					method:'POST',
					url:'api/rune/pay',
					params:{
						userId:this.currentUser.id,
						money:this.currentPayOption.money
					}
				}).then(
					response=>{
						//处理返回的支付宝form表单
						document.querySelector('body').innerHTML = response.data;
 						document.forms[0].submit();
					}
				)
			}
		}
	}
</script>

<style scoped>
	.payOptions-box{
		width: 100%;
		min-height: 300px;
	}
	.payOptions-item{
		width: 210px;
		height: 120px;
		float:left;
		cursor: pointer;
		border:1px solid lightgray;
		margin:15px 0 0 40px;
		display: inline-block;
		position: relative;
	}
	.payOptions-item-value{
		float: left;
		position: relative;
		left: 32%;
		top: 15%;
		font-size: 25px;
	}
	.payOptions-item-money{
		display: inline-block;
		float:left;
		position: absolute;
		top: 65%;
		left: 40%;
		font-size: 16px;
		color:gray;
	}
</style>