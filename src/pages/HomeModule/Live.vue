<template>
	<div id="Live">
		<img src="../../assets/img/LiveRoomBack01.jpg" style="width: 100%;height: 100%;" alt/>
		<div id="live-box">
			<div id="live-left">
				<div id="live-left-info">
					<el-avatar :size="70" 
						style="position: relative;
						top:20px;
						left:2%;
						float:left;
						"
						:src="imageUrl(liveInfo.avatar)"
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
					<div style="width: 120px;height: 25px;
						line-height:25px;position: absolute;right: 20px;top:15px;
						background: lightgray;border-radius: 15px;
						">
						<div style="font-size: 12px;color:gray;
							width:60px;color:white;display: inline-block;
							text-align: center;">{{liveInfo.followCount}}</div>
						<button v-if="!liveInfo.follow" @click="aFollowLive(liveInfo)" 
							class="followBtn"
							 style="background: #409EFF;color:white;">关注</button>
						<button v-else @click="aCancelFollowLive(liveInfo)" class="followBtn" 
							style="background:darkgrey;color:white;">已关注</button>
					</div>
					<!--观看人数-->
					<div style="position: absolute;right: 20px;bottom: 15px;">
						<img  src="../../assets/img/see.png" style="width: 25px;height: 25px;"/>
						<span>{{liveInfo.viewer}}</span>
					</div>
				</div>
				<video id="live-left-video" 
					autoplay
					controls
					ref="liveVideo" 
					width="1272" height="707"
					></video>
					<div class="live-left-bottom">
						<!--礼物-->
						<div class="gift-box">
							<div v-for="gift in giftData.slice(0,5)" 
								class="gift"
								@click="sendGiftVisible=true;sendGift=gift;giftRecord.count=1">
							<img class="gift-image"
								:src="imageUrl(gift.image)" />
							</div>
						</div>
						<!--更多礼物-->
						<el-popover placement="top-end">
							<div style="position: relative;width: 220px;min-height: 120px;">
							<div v-for="g in giftData" 
								class="giftAll"
								@click="sendGiftVisible=true;sendGift=g;giftRecord.count=1">
								<!--礼物图片-->
							<img class="giftAll-image"
								:src="imageUrl(g.image)" />
							</div>
							</div>
						<img src="../../assets/img/more.png" slot="reference"
							style="height: 30px;width: 30px;
							display: inline-block;
							float: left;
							position: relative;
							left: 60%;
							top:25px;
							cursor: pointer;
							"/>
							</el-popover>
					</div>
			</div>
			<div id="live-right">
				<div id="live-right-ranking">
					<div style="width: 100%;height:40px;
						line-height:40px;text-align: center;
						border-bottom:1px solid lightgray;
						">礼物榜</div>
						<div>
							<div v-for="(r,index) in giftRankingData" :key="index" 
								style="width: 100%;height:30px;line-height:30px;float: left;">
								<div 
									style="border-radius: 50px;background: lightblue;
									text-align: center;
									line-height: 20px;
									display: inline-block;
									margin: 0px 20px;
									width: 20px;height: 20px;">{{index+1}}</div>
									<span>{{r.nickname}}</span>
									<span style="float: right;margin: 0 50px;">{{r.giftValue}}</span>
									
							</div>
						</div>
				</div>
				<!--直播间 聊天内容-->
				<div id="live-right-chat">
					<div v-for="c in chatMessage" class="chatmessage">
						<div v-if="c.type==='SYSTEM'">
							<span style="color:#AFB3B8">{{c.senderName}}:</span>
							<span style="color:#72767D">{{c.content}}</span>
						</div>
						<div v-if="c.type==='USER'">
							<span style="color:#409EFF">{{c.senderName}}:</span>
							<span style="color:#72767D">{{c.content}}</span>
						</div>
						<div v-if="c.type==='GIFT'">
							<span style="color:#409EFF">{{c.senderName}}</span>
							<span style="color:#72767D">{{c.content}}
							<img :src="imageUrl(c.data)" style="width: 50px;height: 50px;"/></span>
						</div>

					</div>
				</div>
					<el-input v-model="chatForm.content" 
						:disabled="!currentUser"
						resize="none"
						id="chatmessage-input" 
						type="textarea" 
						rows="4"
						maxlength="100"
						placeholder="输入聊天内容"/><br />
					<button id="chatmessge-btn" @click="sendChatMessage">发送</button>
			</div>
		</div>
		
		<!--赠送礼物对话框-->
		<el-dialog :visible.sync="sendGiftVisible" 
			width="350px" 
			center 
			:show-close="true"
			:close-on-click-modal="false"
			top="15%"
			:destroy-on-close="true"
			>
			<div style="height: 180px;width:100%;position: relative"  v-if="currentUser!=null">
				<div>
					<!--显示左 礼物图片-->
					<img :src="imageUrl(sendGift.image)" 
						style="width: 100px;height: 100px;
						position: relative;
						left: 5px;
						float: left;
						"/>
						<!--显示右 礼物价格和数量-->
					<div style="display: inline-block;
						width: 150px;
						height: 30px;
						float: left;
						position: absolute;
						left: 120px;
						top: 30px;
						font-size: 20px;
						color:black
						">
						<!--礼物价格-->
						<div style="height: 50%;width: 100%;text-align: center;">
							{{sendGift.value}}
							<span style="color:orange;margin-left: 4px;">卢恩</span></div>
						<!--礼物数量-->
						<div style="position: relative;top:40px;left: 30px;">
							<!--减少-->
							<img src="../../assets/img/decrease.png" 
								style="width: 25px;height: 25px;cursor: pointer;"
								@click="decreaseSendGiftCount()"
								/>
								<!--数量-->
							<el-input
								v-model.number="giftRecord.count"
								type="text"
								step
								max="99"
								min="1"
								style="width: 50px;height: 30px;margin: 0 10px"
								/>
							<!--添加-->
							<img src="../../assets/img/increase.png" 
								style="width: 25px;height: 25px;cursor: pointer;"
								@click="increaseSendGiftCount()"
								/>
						</div>
					</div>
				</div>
					<!--底部-->
					<div style="width: 100%;height: 50px;
						position: absolute;bottom:0px;left:0;">
						<div style="display: inline-block;
							position: absolute;
							bottom: 5px;
							left: 10px;
							font-size: 12px;
							color:gray
							">余额: {{currentUser.wallet}}
							<span style="color:orange;margin-left: 2px;">卢恩</span>
							<!--跳转充值页面-->
							<span style="border-bottom: 1px solid grey;margin-left: 10px;cursor: pointer;">
								去充值</span>
						</div>
					<button 
						@click="handlerSendGift()"
						style="display: inline-block;
						float: left;height: 30px;width: 60px;
						position: absolute;
						right:20px;bottom: 0px;background: #409EFF;color:white;border: none;cursor: pointer;">
						确认</button>
					</div>
			</div>
			<div v-else>
				<el-button style="position: relative;left: 40%;">去登录</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import flvjs from 'flv.js'
	import {mapState,mapActions} from 'vuex'
	export default{
		name:'Live',
		data(){
			return{
				chatForm:{},
				chatMessage:[{
					senderName:'系统消息',
					content:'欢迎进入直播间',
					type:'SYSTEM'
				}
				],
				liveInfo:{
				},
				sendGiftVisible:false,
				sendGift:{
				},
				giftRecord:{
					count:1,
				},
				giftRankingData:[],
			}
		},
		computed:{
			...mapState(['currentUser','giftData']),
			liveUrl(){
				return '/live?app=myapp&stream='+this.liveInfo.id;
			},
			userId(){
				return this.$route.query.userId;
			},
		},
		mounted(){
			this.initLiveRoom()
			this.initGiftData()
			this.initSocketIO()
		},
		beforeDestroy(){
			if (!this.$socket){
				return
			}
 		  	 this.sockets.unsubscribe('liveroomChat')
 		  	 this.$socket.emit("leaveliveroom",this.userId)
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
			...mapActions(['aFollowLive','aCancelFollowLive']),
			initGiftData(){
				this.$store.dispatch('aGiftByValueAsc')
			},
			initGiftRankingData(){
				this.$axios({
					method:'GET',
					url:'api/gift/queryGiftRankingByDesc',
					params:{
						id:this.liveInfo.userId
					}
				}).then(
					response=>{
						if(response.data.success){
							this.giftRankingData=response.data.data
							console.log("ranking-->",response.data.data)
						}else{
							console.log(response.data.message)
						}
					}
				)
			},
			initLiveRoomIsFollow(){
				if(this.currentUser==null){
					return;
				}
				this.$axios({
					method:'POST',
					url:'api/liveRoomFollow/isFollow',
					params:{
						userId:this.currentUser.id,
						liveUserId:this.userId
					},
					headers:{
						authorization:localStorage.getItem("token")
					}
				}).then(
					response=>{
						if(response.data.success){
							console.log('follow-->',response.data.data)
							this.liveInfo.follow=response.data.data
						}
					}
				)
			},
			initLiveRoom(){
				this.$axios({
					method:'POST',
					url:'api/liveroom/queryByUserId',
					params:{
						userId:this.userId
					},
					headers:{
						authorization:localStorage.getItem("token")
					}
				}).then(
					response=>{
						if(response.data.success){
							console.log("liveInfo-->",response.data.data)
							this.liveInfo=response.data.data
							this.initFlvPlayer()
							this.initGiftRankingData()
							//this.initLiveRoomIsFollow()
						}else{
							this.$message.info(response.data.message)
						}
					}
				)
			},
			/*初始化播放器*/
			initFlvPlayer(){
			if(this.liveInfo.live){
				if(flvjs.isSupported()) {
       			 var videoElement = this.$refs.liveVideo;
        		 var flvPlayer = flvjs.createPlayer({
          	 	 type:'flv',
          	 	 isLive:true,
          		 url:'/live?app=myapp&stream='+this.liveInfo.userId
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
			this.$socket.emit('joinLiveRoom',this.userId);
			this.sockets.subscribe('liveroomChat',(res)=>{
				this.chatMessage.push(res)
			});
			
		},
		/*用户发送聊天消息*/
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
			this.chatForm.senderName=this.currentUser.nickname
			this.chatForm.type="User"
			this.$socket.emit('sendChatMessage',this.chatForm)
			this.chatForm.content=''
		},
		imageUrl(path){
			return 'api/file/image?path='+path
		},
		/*礼物数量 添加*/
		increaseSendGiftCount(){
			if(this.giftRecord.count>=99){
				this.$message.info("数量最多为99")
				return;
			}
			this.giftRecord.count+=1;
		},
		/*礼物数量 减少*/
		decreaseSendGiftCount(){
			if(this.giftRecord.count<=1){
				this.$message.info("数量至少为1")
				return;
			}
			this.giftRecord.count-=1;
		},
		//赠送礼物
		handlerSendGift(){
			if(this.giftRecord.count<1||this.giftRecord.count>99){
				this.$message.info('请输入正确的礼物数量')
				return;
			}
			this.sendGiftVisible=false
			this.giftRecord.receiver=this.liveInfo.userId
			this.giftRecord.giver=this.currentUser.id
			this.giftRecord.giftId=this.sendGift.id
			this.$axios({
				method:'POST',
				url:'api/gift/sendGift',
				data:this.giftRecord,
				headers:{
					authorization:localStorage.getItem("token")
				}
			}).then(
				response=>{
					if(response.data.success){
						this.$message.success('赠送成功')
						/*赠送成功，发送礼物消息到聊天*/
						this.$socket.emit('sendGiftMessage',response.data.data)
						/*更新当前用户信息*/
						this.$store.dispatch('aCurrentUser')
						this.initGiftRankingData()
					}else{
						this.$message.info(response.data.message)
					}
				}
			)
		},
		/*关注直播间*/
		handlerFollowLiveRoom(){
				this.$axios({
					method:'POST',
					url:'api/liveRoomFollow/follow',
					headers:{
						authorization:localStorage.getItem("token")
					}
				}).then(
					response=>{
						if(response.data.success){
							this.$message.success("关注成功")
						}else{
							this.$message.info(response.data.message)
						}
					}
				)
			},
	}
	}
</script>

<style scoped>
	#Live{
		height: 1100px;
	}
	#live-box{
		width: 1640px;
		height: 870px;
		position: absolute;
		top: 150px;
		left: 200px;
	}
	#live-left{
		display: inline-block;
		float: left;
		width: 1270px;
		height: 100%;
	}
	#live-left-info{
		height: 100px;
		width: 100%;
		float: left;
		position: relative;
		background: white;
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
		top:20px;
		font-size: 20px;
	}
	#live-left-info-classtify{
		float: left;
		position: relative;
		left:20%;
		top:25px;
	}
	#live-left-info-username{
		float: left;
		position: relative;
		left:10%;
		top:10px;
		font-size: 14px;
	}
	.followBtn{
		height: 100%;
		width:60px;
		float: right;
		border: none;
		border-radius: 15px;
		cursor: pointer;
	}
	#live-right{
		display: inline-block;
		position: relative;
		left: 20px;
		float: left;
		height: 100%;
		width: 280px;
		background: white;
	}
	#live-right-ranking{
		width: 100%;
		height: 200px;
		overflow: auto;
	}
	#live-right-chat{
		width: 100%;
		height: 500px;
		overflow-y: auto;
		overflow-x: hidden;
		background:#F6F7F8;
		border-top:1px solid grey;
		border-bottom:1px solid grey;
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
	#live-left-video{
		float: left;
		background: #000000;
	}
	.live-left-bottom{
		background: #2D2E36;
		height: 80px;
		width: 100%;
		float: left;
		border-bottom-left-radius: 10px;
		border-bottom-right-radius: 10px;
	}
	.gift-box{
		display: inline-block;
		float: left;
		width: 400px;
		height: 80px;
		position: relative;
		left: 60%;
		top:5px
	}
	.gift{
		display: inline-block;	
		width: 80px;
		height: 80px;
		float: left;
		cursor: pointer;
	}
	.gift-image{
		padding:3px;
		width: 60px;
		height: 60px;
	}
	.gift-image:hover{
		padding: 0px;
		width: 70px;
		height: 70px;
	}
	.giftAll{
		display: inline-block;	
		width: 52px;
		height: 52px;
		float: left;
		cursor: pointer;
	}
	.giftAll-image{
		padding:3px;
		width: 40px;
		height:40px;
	}
	.giftAll-image:hover{
		padding: 0px;
		width: 50px;
		height: 50px;
	}
</style>