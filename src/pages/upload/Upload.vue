<template>
<div  >

<el-breadcrumb separator=">">
  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>文档上传</el-breadcrumb-item>
</el-breadcrumb>

<el-card class="box-card">
  <div slot="header" class="clearfix">
    <span style="line-height: 26px;">文档属性</span>
  </div>
  <el-form :inline="true" :model="formInline" label-width="100px" class="demo-form-inline">
  <el-form-item label="一级类型" required>
    <el-select v-model="formInline.first" placeholder="一级类型">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="二级类型" required>
    <el-select v-model="formInline.second" placeholder="二级类型">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
    <el-form-item label="三级类型" required>
    <el-select v-model="formInline.third" placeholder="三级类型">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="四级类型" required>
    <el-select v-model="formInline.fourth" placeholder="四级类型">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
    </el-form-item>
</el-form>
<el-row :gutter="20">
    <el-col :span="9">
     <el-form  :model="formInline" label-width="100px" class="demo-form-inline">
      <el-form-item label="文档号" required>
       <el-input v-model="formInline.docNum" placeholder="请输入文档号"></el-input>
      </el-form-item>
    </el-form>
   </el-col>
    <el-col :span="2">
      <el-button type="primary" @click="dialogUploadVisible = true">上传文件</el-button>
    </el-col>
     <el-col :span="1" >
      </el-col>
      <el-col :span="1" >
      <el-button type="primary" @click="resetType" >清空</el-button>
    </el-col>
 </el-row> 
</el-card>
<el-card class="box-card">
  <div slot="header" class="clearfix">
    <span style="line-height: 26px;">已上传文件</span>
  </div>
    <el-table :data="success"  stripe style="width: 100%" >
        <el-table-column  prop="UUID"   label="UUID" width="280">
        </el-table-column>
        <el-table-column prop="originalFilename"   label="文件名"  width="280">
        </el-table-column>
        <el-table-column  prop="fileSize"  label="文件大小">
        </el-table-column>
     </el-table>
  </el-card>
<el-card class="box-card">
  <div slot="header" class="clearfix">
    <span style="line-height: 26px;">复用图</span>
  </div>
    <el-table :data="reuse"  stripe style="width: 100%" >
        <el-table-column  prop="UUID"   label="UUID" width="280">
        </el-table-column>
        <el-table-column prop="originalFilename"   label="文件名"  width="280">
        </el-table-column>
        <el-table-column  prop="fileSize"  label="文件大小">
        </el-table-column>
     </el-table>
  </el-card>
        <el-dialog title="文档上传" v-model="dialogUploadVisible" style="min-width:775px" :show-close="false">
         <vue-file-upload url='/WCC-ECM/fileUpload' :multiple='true' ref="vueFileUploader" :filters = "filters"
           :events = 'cbEvents' :request-options = "reqopts" @onAddFiles="onAddItem" >
           </vue-file-upload>
            
          <el-table :data="files" height="320"  stripe style="min-width:725px" >
            <el-table-column  prop="name"   label="文件名" width="210">
            </el-table-column>
            <el-table-column prop="size"   label="大小"  width="100">
            </el-table-column>
            <el-table-column  prop="progress"  label="进度" width="160">
             <template scope="scope">
                 <el-progress :text-inside="true" :stroke-width="18" :percentage="scope.row.progress"></el-progress>
                </template>
            </el-table-column>
             <el-table-column   label="状态" width="100">
                <template scope="scope">
                  {{onStatus(scope.row)}}
                </template>
            </el-table-column>
             <el-table-column   label="操作" style="text-align: center">
             <template scope="scope">
                <el-button
                  :disabled="isDisabled(scope.row)"
                  size="small"
                  type="danger"
                  @click="deleteItem(scope.row)">删除</el-button>
                </template>
            </el-table-column>
         </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button v-show="canUpload" type="primary" @click="uploadAll">上传所有</el-button>
                <el-button v-show="canFinish" type="success" @click="uploadFinish">完成上传</el-button>
            </div>
        </el-dialog>

	</div>
</template>

<script>

import VueFileUpload from '../../components/fileupload/vue-file-upload';
export default{
  data(){
    return{
      files:[],
      success:[],
      reuse:[],
       formInline: {
          first: '',
          third: '',
          second:'',
          fourth:'',
          docNum:''
       },
       canUpload:true,
       canFinish:false,
      dialogUploadVisible: false,
      //文件过滤器，只能上传图片
      filters:[
        {
          name:"imageFilter",
          fn(file){
              var type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
              return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
          }
        }
      ],
      //回调函数绑定
      cbEvents:{
        onCompleteUpload:(file,response,status,header)=>{
        	console.log("---完成上传---")
          this.canFinish=true
          this.canUpload=false
        },
        onSuccessUpload:(file,response,status,header)=>{
         this.success.push(response);
        },
      },
      //xhr请求附带参数
      reqopts:{
        formData:{
          tokens:'tttttttttttttt'
        },
        responseType:'json',
        withCredentials:false
      }
    }
  },
  methods:{
    onStatus(file){
      if(file.isSuccess){
        return "上传成功";
      }else if(file.isError){
        return "上传失败";
      }else if(file.isUploading){
        return "正在上传";
      }else{
        return "待上传";
      }
    },
     isDisabled(file){
      if(!file.progress==0){
        return true
      }else{
        return false
      }
     },
    uploadFinish:function(){
       this.dialogUploadVisible=false
       this.$refs.vueFileUploader.clearAll();
       this.files=[]
       this.canUpload=true
       this.canFinish=false

    },
    onAddItem:function(newfiles){
        this.files = newfiles;
    },
    uploadItem(file){
      //单个文件上传
      file.upload();
    },
    deleteItem(file){
      file.remove();
    },
    uploadAll(){
      //上传所有文件
      this.$refs.vueFileUploader.uploadAll();
    },
    onSubmit() {
        console.log('submit!');
    },
    resetType:function(){
      this.formInline ={
          first: '',
          third: '',
          second:'',
          fourth:'',
          docNum:''
       }
    }
  },
  components:{
    VueFileUpload
  }
}
</script>

<style >
 .el-breadcrumb {
    background-color: transparent;
    display: inline-block;
    line-height: 20px;
    margin: 6px 22px 0 12px;
    padding: 5px;
    font-size: 13px;
    color: #333;
    border-radius: 0;
}
.el-card{
	    margin: 5px;
}
.el-card__header {
	padding: 10px 20px;
}
.el-table {
   border: 1px solid #D3DCE6;
   border-radius: 4px;

}
.el-card, .el-menu--horizontal .el-submenu>.el-menu, .el-tabs--border-card {
    box-shadow: linen;
}
.el-dialog--small {
    min-width: 775px;
}
 .el-table th>.cell {
    text-align: center;
  }

</style>