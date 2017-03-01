<template>
<div>
<el-card class="box-card">
  <div slot="header" class="clearfix">
    <span style="line-height: 26px;">条件搜索</span>
  </div>
 <el-form ref="searchForm" :model="searchForm" label-width="80px">
  <el-form-item label="档案类型" >
    <el-select v-model="form.artype" @change="changeArtype" placeholder="请选择档案类型">
     <el-option v-for="item in artypes" :label="item.LABEL" :value="item.LABEL">
      </el-option>
    </el-select>
  </el-form-item>
    <el-form-item label="文档类型">
    <el-select v-model="form.doctype" placeholder="请选择文档类型">
          <el-option v-for="item in doctypes" :label="item.LABEL" :value="item.VALUE">
      </el-option>
    </el-select>
  </el-form-item>
   <el-form-item label="标题">
    <el-input v-model="form.title" placeholder="请输入标题"></el-input>
  </el-form-item>
  <el-form-item label="作者">
     <el-input v-model="author" placeholder="请输入标题"></el-input>
  </el-form-item>
  <el-form-item label="文档号">
    <el-input v-model="form.docnum" placeholder="请输入文档号"></el-input>
  </el-form-item>
     <el-form-item label="项目">
    <el-input v-model="form.project" placeholder="请输入项目"></el-input>
  </el-form-item>
     <el-form-item label="设计专业">
    <el-select v-model="form.specialty" filterable  placeholder="请选择设计专业">
       <el-option v-for="item in specialties" :label="item.LABEL" :value="item.VALUE">
      </el-option>
    </el-select>
    </el-form-item>
  <el-form-item label="创建时间">
    <el-col :span="11">
      <el-date-picker type="date" placeholder="选择日期" v-model="form.createdate1" style="width: 100%;"></el-date-picker>
    </el-col>
    <el-col class="line" :span="1">——</el-col>
    <el-col :span="11">
  <el-date-picker type="date" placeholder="选择日期" v-model="form.createdate2" style="width: 100%;"></el-date-picker>
    </el-col>
  </el-form-item>
  <el-form-item label="发布时间">
    <el-col :span="11">
      <el-date-picker type="date" placeholder="选择日期" v-model="form.releasedate1" style="width: 100%;"></el-date-picker>
    </el-col>
    <el-col class="line" :span="1">——</el-col>
    <el-col :span="11">
      <el-date-picker type="date" placeholder="选择日期" v-model="form.releasedate2" style="width: 100%;"></el-date-picker>
    </el-col>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="searchSubmit">搜索</el-button>
    <el-button @click="resetForm" >重置</el-button>
  </el-form-item>
</el-form>
</el-card>

</div>
</template>

<script>

export default {
  data () {
    return {
       form: {
          artype: '',
          doctype: '',
          title: '',
          docnum: '',
          project: '',
          specialty:'',
          createdate1: '',
          createdate2: '',
          releasedate1:'',
          releasedate2:''
        },
        artypes:[],
        doctypes:[],
        specialties:[]

      }
  },created: function() {
    this.getSearchDefData()
  },methods: {
      changeArtype(value){
         this.$http.get('/WCC-ECM/getSearchOption/home')
          .then((response) => {
            console.log(response.data)
           this.doctypes =response.data.artypes
        })
        .catch(function(response) {
          console.log(response)
        })
      },
      searchSubmit:function(){
        console.log(this.form);
        console.log('submit!');
      },
      resetForm:function(){
        this.form={ artype: '', doctype: '', title: '',docnum: '',
          project: '',specialty:'', createdate1: '',  createdate2: '',
          releasedate1:'', releasedate2:''
        }
      },
      getSearchDefData:function(){
          this.$http.get('/WCC-ECM/getSearchOption/home')
          .then((response) => {
            console.log(response.data)
           this.artypes =response.data.artypes
           this.specialties =response.data.specialties
        })
        .catch(function(response) {
          console.log(response)
        })
      }
    }
}
</script>

<style scoped>
  .el-form-item {
    margin-bottom: 10px;
}

</style>