<template>
	<div>
			<!--轮播图-->
	<div class="scrollImage">
		<div class="item">
			<!--图片-->
		<img :src="scrollImageData[currentScrollImageIndex]"/>
		</div>
		<!--轮播图切换按钮-->
		<div class="scrollImage-button">
			<img src="~@/assets/img/scroll/prev.png" @click="transferScrollImage(prevIndex)" style="float: left;"/>
			<img src="~@/assets/img/scroll/next.png" @click="transferScrollImage(nextIndex)" style="float: right;"/>
		</div>
		<div class="showlive-box">
			<div class="showlive-item" v-for="l in liveData">
				<div class="showlive-isLive" v-if="l.live" style="background-color: rgba(73,122,238,0.7);">直播中</div>
				<div class="showlive-isLive" v-else style="background-color: rgba(254,65,42,0.7)">未开播</div>
				<!--直播间封面-->
				<img :src="coverUrl(l.cover)"
					style="width: 100%;height: 155px;cursor: pointer;"
					@click="intoLiveroom(l.id)"
					:fit="cover"
					></img>
					<div class="showlive-item-title"
						style="margin: 3px 10px;font-size: 14px;
						"
						>
						{{l.title}}
					</div>
					<div class="showlive-item-info">
						<!--主播头像-->
						<el-avatar 
							:size="30"
							:src="avatarUrl(l.avatar)"
							style="position: relative;left: 5px;margin: 5px;float: left;"
							></el-avatar>
							<div style="display: inline-block;
								float: left;
								position: relative;
								top:10px;
								left: 10px;
								">{{l.nickname}}</div>
								<div style="display: inline-block;
									position: relative;
									float: left;
									top:15px;
									left: 35px;
									color:grey;
									">
									<img style="width: 18px;height: 17px;display: inline-block;float: left;" src="../../assets/img/see.png" />
									5w
								</div>
								<div
									style="display: inline-block;
									float: left;
									position: relative;
									top:15px;
									left: 43px;
									font-size: 12px;
									color:orange;
									"
									>{{l.classtify}}</div>
					</div>
			</div>
		</div>
	</div>
	</div>
</template>

<script>
	import {mapState} from 'vuex'
	export default{
		name:'HomeBody',
		data(){
			return{
				scrollImageData:[],
				currentScrollImageIndex:'',
				liveData:[]
			}
		},
		mounted(){
			this.initData()
		},
		computed:{
			...mapState('mapState')
		},
		methods:{
			initData(){
			this.$axios({
				method:'POST',
				url:'/api/liveroom/getAll',
			}).then(
				response=>{
					if(response.data.success){
						console.log('data-->',response.data)
						this.liveData=response.data.data
					}else{
						this.$message.info(response.data.message)
					}
				}
			)
			},
			avatarUrl(filename){
				return 'api/user/avatar?filename='+filename;
			},
			coverUrl(filename){
				return 'api/liveroom/cover?filename='+filename
			},
			intoLiveroom(id){
				console.log("id-->", id)
				this.$router.push({
					name:'live',
					query:{
						liveId:id
					}
				})
			}
		}
	}
</script>

<style>
	.scrollImage{
		width: 100%;
		height: 500px;
        margin: 0 auto;
        position: relative;
        top:0;
	}
	.scrollImage img{
		width: 100%;
		height: 500px;
		display: block;
	}
	.scrollImage .page{
	 background: rgba(0,0,0,.5);
        position: absolute;
        right: 0;
        bottom: 0;
        width: 100%;
	}
	.scrollImage-button{
		width: 100%;
		height: 80px;
		position: absolute;
		top:35%;
	}
	.scrollImage-button img{
		height: 100%;
		width: 80px;
		background: gray;
		opacity: 0.4;
		cursor: pointer;
	}
	.showlive-box{
		height: 800px;
		width: 86%;
		position: relative;
		left: 7%;
		top:30px;
	}
	.showlive-item{
		display: inline-block;
		height: 224px;
		width: 283px;
		float: left;
		border:1px solid grey;
		margin: 0 20px 30px 20px;
		position: relative;
	}
	.showlive-isLive{
		width: 50px;
		height: 23px;
		font-size: 10px;
		line-height: 25px;
		border-radius: 8px;
		text-align: center;
		position:absolute;
		display: inline-block;
		top:0px;
		left: 225px;
		color:white;
	}
	
</style>