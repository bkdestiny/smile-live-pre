<template>
	<div id="Live">
		<div id="live-box">
			<div id="live-left">
				<div id="live-left-info">
					<el-avatar :size="70" 
						style="position: relative;
						top:7px;
						left:2%;
						float:left;
						"
						:src="liveroomAvatar"
						></el-avatar>
					<div id="live-left-info-auchor">
						<div style="width: 100%;height:50%;">
						<p id="live-left-info-title">{{liveInfo.title}}</p>
						<p id="live-left-info-classtify">{{liveInfo.classtify}}</p>
						</div>
						<div style="width: 100%;">
						<p id="live-left-info-username">{{liveInfo.nickname}}</p>
						</div>
					</div>
				</div>
				<video id="live-left-video" 
					autoplay
					controls
					ref="liveVideo" 
					width="1270" height="710"
					></video>
					<div>礼物</div>
			</div>
			<div id="live-right">
				<div id="live-right-ranking">礼物</div>
				<div id="live-right-chat">
					<div v-for="c in chatMessage" class="chatmessage">
						<span style="color:#AFB3B8">{{c.nickname}}:</span>
						<span style="color:#72767D">{{c.content}}</span>
					</div>
				</div>
					<el-input v-model="chatForm.content" 
						id="chatmessage-input" 
						type="textarea" 
						rows="4"
						maxlength="100"
						placeholder="输入聊天内容"/><br />
					<button id="chatmessge-btn" @click="sendChatMessage">发送</button>
			</div>
		</div>
	</div>
</template>

<script>
	import flvjs from 'flv.js'
	import {mapState} from 'vuex'
	export default{
		name:'Live',
		data(){
			return{
				chatForm:{},
				chatMessage:[{
					nickname:'系统消息',
					content:'欢迎进入直播间'
				}
				],
				liveInfo:{
				}
			}
		},
		computed:{
			...mapState(['currentUser']),
			liveUrl(){
				return '/live?app=myapp&stream='+this.liveInfo.id;
			},
			liveId(){
				return this.$route.query.liveId;
			},
			liveroomAvatar(){
				return 'api/user/avatar?filename='+this.liveInfo.avatar
			}
		},
		mounted(){
			this.initLiveRoom()
			this.initSocketIO()
			this.initFlvPlayer()
		},
		beforeDestroy(){
			this.$socket.emit('leaveLiveRoom',this.liveInfo.id);
		},
		sockets: {
        connect: function () {
            console.log('socket connected')
        },
        customEmit: function (data) {
            console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
        },

    },
		methods:{
			initLiveRoom(){
				this.$axios({
					method:'POST',
					url:'/api/liveroom/queryById',
					params:{
						id:this.liveId
					}
				}).then(
					response=>{
						if(response.data.success){
							this.liveInfo=response.data.data
						}else{
							this.$message.info(response.data.message)
						}
					}
				)
			},
			/*初始化播放器*/
			initFlvPlayer(){
			if(this.liveInfo.live){
				console.log('flv.js -->',flvjs)
			if(flvjs.isSupported()) {
       			 var videoElement = this.$refs.liveVideo;
        		 var flvPlayer = flvjs.createPlayer({
          	 	 type:'flv',
          	 	 isLive:true,
          		 url:'/live?app=myapp&stream='+this.liveId
      	 	 	});
      	 	 	flvPlayer.attachMediaElement(videoElement);
      	 	 	flvPlayer.load();
      	 		flvPlayer.play();
      	 	}
   	 	}
		},
		/*初始化vue-socketio*/
		initSocketIO(){
			/*加入直播间事件*/
			this.$socket.emit('joinLiveRoom',this.liveId);
			this.sockets.subscribe('liveroomChat',(res)=>{
				this.chatMessage.push(res)
			});
			
		},
		sendChatMessage(){
			if(this.currentUser==null){
				this.$message.info('请先登录');
				return;
			}
			if(this.chatForm.content.length<1){
				this.$message.info('内容不能为空')
				return;
			}
			this.chatForm.sender=this.currentUser.id
			this.chatForm.roomId=this.liveInfo.id
			this.chatForm.username=this.currentUser.username
			this.chatForm.nickname=this.currentUser.nickname
			this.chatForm.type="User"
			this.$socket.emit('sendChatMessage',this.chatForm)
			this.chatForm.content=''
		},
		avatarUrl(filename){
			console.log("filename->",filename)
			return 'api/user/avatar?filename='+filename
		}
	}
	}
</script>

<style scoped>
	#Live{
		height: 1100px;
	}
	#live-box{
		width: 1640px;
		height: 920px;
		position: relative;
		top: 50px;
		left: 150px;
	}
	#live-left{
		display: inline-block;
		float: left;
		width: 1270px;
		height: 100%;
		border: 1px solid grey;
		border-radius: 15px;
	}
	#live-left-info{
		height: 80px;
		width: 100%;
	}
		#live-left-info-auchor{
		width: 400px;
		height: 100%;
		float:left;
		position: relative;
		left: 4%;
	}
	
	#live-left-info-title{
		float: left;
		position: relative;
		left: 10%;
		top:10px;
		font-size: 20px;
	}
	#live-left-info-classtify{
		float: left;
		position: relative;
		left:20%;
		top:15px;
	}
	#live-left-info-username{
		float: left;
		position: relative;
		left:10%;
		top:10px;
		font-size: 14px;
	}
	
	#live-right{
		display: inline-block;
		border:1px solid grey;
		border-radius: 15px;
		position: relative;
		float: right;
		height: 100%;
		width: 340px;
	}
	#live-right-ranking{
		width: 100%;
		height: 200px;
		overflow: auto;
	}
	#live-right-chat{
		width: 100%;
		height: 550px;
		overflow-y: auto;
		overflow-x: hidden;
		background:#F6F7F8;
		border:1px solid grey;
		
	}
	.chatmessage{
		width: 80%;
		display: block;
		position: relative;
		left: 10%;
		margin: 5px 0;
		
	}
	#chatmessage-input{
		width: 280px;
		position: relative;
		left: 3%;
	}
	#chatmessge-btn{
		width: 80px;
		height: 30px;
		position: relative;
		float: right;
		top:2%;
		right: 10%;
	
	}

</style>