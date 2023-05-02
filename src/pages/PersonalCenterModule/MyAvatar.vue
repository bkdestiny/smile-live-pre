<template>
	<div style="height: 500px;">
		<div style="display: inline-block;
			position: relative;left: 150px;
			top:100px;float: left;
			border:2px solid green">
			<img :src="avatarUrl(currentUser.avatar)" style="width: 140px;height: 140px;"/></div>
		<div style="display: inline-block;position: relative;left: 350px;top:100px;float: left;">
			<!--上传头像-->
		<el-upload 
			action="api/user/saveAvatar"
			:data="currentUser"
			:headers="headers"
			accept=".jpg,.png,.jpeg"
			list-type="picture-card" 
			:limit="fileLimit" 
			:on-change="handlerChange"
			:before-upload="beforeUpload"
			:auto-upload="false"
			:on-success="successUpload"
			:file-list="filelist"
			ref="upload"
			>
			
			<i slot="default" class="el-icon-plus"></i>
   			 <div slot="file" slot-scope="{file}">
     	 <img class="el-upload-list__item-thumbnail"
        :src="file.url" alt=""
      	>
      <span class="el-upload-list__item-actions">
      	<!--放大-->
        <span
          class="el-upload-list__item-preview"
          @click="handlePictureCardPreview(file)">
          <i class="el-icon-zoom-in"></i>
        </span>
        <!--下载-->
        <span
          v-if="!disabled"
          class="el-upload-list__item-delete"
          @click="handleDownload(file)"
        >
          <i class="el-icon-download"></i>
        </span>
        <!--删除-->
        <span
          v-if="!disabled"
          class="el-upload-list__item-delete"
          @click="handleRemove(file)"
        >
          <i class="el-icon-delete"></i>
        </span>
      </span>
    </div>
		</el-upload>
		<el-dialog :visible.sync="dialogVisible">
  			<img width="100%" :src="dialogImageUrl" alt="">
		</el-dialog>
		</div>
		<el-button 
			style="position: relative;top:400px;left: 50px;
			width: 150px;height: 60px;
			background: #409EFF;color:white"
			@click="submitUpload"
			>更换头像</el-button>
	</div>
</template>

<script>
	import {mapState} from 'vuex'
	export default{
		name:'MyAvatar',
		data(){
			return{
				dialogImageUrl: '',
        		dialogVisible: false,
        		disabled: false,
        		filelist:[],
        		fileType: ["png","jpg", "jpeg"],
				// 运行上传文件大小，单位 M
				fileSize: 2,
				// 附件数量限制
				fileLimit: 1,
        		hideUpload:false,
        		headers:{
					authorization:localStorage.getItem("token"),
				},
			}
		},
		computed:{
			...mapState(['currentUser']),
			currentUserId(){
				return 1
			}
		},
		methods:{
			avatarUrl(filename){
				return "/api/user/avatar?filename="+filename;
			},
			successUpload(response,file,filelist){
				console.log("res--》",response)
				if(response.success){
					this.$message.success("上传成功")
					location.reload()
					/*this.$router.replace({
						name:'loading'
					})
					this.$router.replace({
						name:'myavatar'
					})*/
				}else{
					this.$message.error(response.message)
				}
			},
			submitUpload() {
				console.log("upload-->",this.$refs.upload)
        		this.$refs.upload.submit();
     		 },
			 handleRemove(file) {
        		console.log(file);
        		this.filelist=[]
        		this.handlerChange(file,this.filelist)
    	  },
     		 handlePictureCardPreview(file) {
      		  this.dialogImageUrl = file.url;
        		this.dialogVisible = true;
      		},
      		handleDownload(file) {
      		  console.log(file);
     	 },
     	 	handlerChange(file,filelist){
     	 		console.log("currentUser-->",this.currentUser.id)
     	 		/*上传文件后 隐藏上传框*/
     	 		var uploadElement=document.querySelector('.el-upload--picture-card')
     	 		if(filelist.length===1){
     	 			uploadElement.style.display="none"
     	 		}else if(filelist.length===0){
     	 			uploadElement.style.display="block"
     	 			uploadElement.style.float="left"
     	 		}
     	 	},
     	 	beforeUpload(file){
			if (file.type == "" || file.type == null || file.type == undefined){
			this.$message.error("文件类型错误！")	
			return false;
			}
	    	//截取文件的后缀，判断文件类型
			const FileExt = file.name.replace(/.+\./, "").toLowerCase();
			//计算文件的大小
			const isLimit= file.size / 1024 / 1024 < this.fileSize; //这里做文件大小限制
			//如果大于2M
			if (!isLimit) {
				this.$message.error('上传文件大小不能超过 2MB!');
				return false;
			}
			//如果文件类型不在允许上传的范围内
			if(!this.fileType.includes(FileExt)){
				this.$message.error("不支持上传改文件类型!");
				return false;
			}

			},
		}
	}
</script>

<style scoped>
</style>