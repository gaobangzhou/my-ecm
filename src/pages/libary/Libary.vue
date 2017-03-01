<template>
  <div style="height: 100%;overflow:hidden">
  <div class="tree-sider">
    <div class="tree-search">
        <autocomplete class="inline-input" v-model="state1" icon="search"
         :fetch-suggestions="querySearch"
          placeholder="请输入内容"
          @select="handleSelect" ></autocomplete>

    </div>
    </el-input>
    <div class="tree-data">
      <vue-ztree :data='ztreeDataSource' @node-click='nodeClick' url="/WCC-ECM/tree/getSubNodeData"  ></vue-ztree>
    </div>
  </div>

  <div style="height: 100%;overflow:hidden"> 
      <breadcrumb separator=">" :data="paths">
     </breadcrumb>
   <el-row :gutter="20">
     <el-button type="info">检入文件</el-button>
   </el-row>
    <el-table  v-loading.body="loading" :data="tableData" border height="600" style="width: 100% "  @selection-change="handleSelectionChange"
    default-sort-prop="date"  default-sort-order="descending" > 
     <el-table-column type="selection"  width="50"> </el-table-column>  

    <el-table-column prop="TITLE" sortable  label="文档标题" show-overflow-tooltip>
      <template scope="scope">
          <el-button v-if="scope.row.TYPE !=='file'" type="text">{{scope.row.TITLE}}</el-button>
          <span v-if="scope.row.TYPE ==='file'">{{scope.row.TITLE}}</span>
      </template>
    </el-table-column>
    <el-table-column prop="DOCNUM" sortable  label="文档号"  width="150">
    </el-table-column>
      <el-table-column prop="STATUS"  label="状态"  width="90"
         :filters="[{ text: '已发布', value: '已发布' }, { text: '编辑', value: '编辑'}, { text: '审批', value: '审批' }]"
      :filter-method="filterTag">
      <template scope="scope">
        <el-tag v-if="scope.row.type ==='file'"
          :type="scope.row.status === '已发布' ? 'success':'primary'"
          close-transition>{{scope.row.status}}</el-tag>
      </template>
    </el-table-column>
      <el-table-column prop="REVID" sortable  label="版本"  width="120">
    </el-table-column>
      <el-table-column prop="AUTHOR_CODE" sortable  label="作者"  width="120">
    </el-table-column>
     <el-table-column  label="日期" sortable width="135" show-overflow-tooltip>
      <template scope="scope">{{ scope.row.CREATEDATE }}</template>
    </el-table-column>
    <el-table-column label="操作"   width="140">
      <template scope="scope">
        <el-button
          size="small"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
   </el-table-column>
  </el-table>
      <div class="block">
         <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400">
    </el-pagination>
   
     </div>
  </div>
</div>
</template>



<script>
import Autocomplete from '../../components/autocomplete/autocomplete'
import Breadcrumb from '../../components/breadcrumb/breadcrumb'
import VueZtree from '../../components/ztree/vue-ztree'
  export default {
    components:{
      Autocomplete,Breadcrumb,VueZtree
    },
      data() {
        return {
          restaurants:[],
          state1: '',
          paths:[{LABEL:'文档库',URL:'/labary'},{LABEL:'test',URL:'/labary/test'}],
          tableData: [],
          multipleSelection: [],
          currentPage: 5, 
          ztreeDataSource:[],
          loading:false
        }
    },
      mounted() {
        this.restaurants = this.loadAll();
        this.loadTreeData();

      },
    methods: {
    nodeClick:function(m){
       console.log("点击回调");
       console.log(m.TYPE+"---"+m.ID);       
      
      this.loading =true
       
      this.$http.get('/WCC-ECM/treeTable/'+m.TYPE+"/"+m.ID,{methods:"GET"})
        .then((response) => {
        this.tableData = response.data
        this.loading =false
      })
      .catch(function(response) {
        console.log(response)
      })
    },
    addData:function(data){
       this.ztreeDataSource=data;
    },
      handleNodeClick(data) {
        console.log(data);
      },
      querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(results);
        }, 3000 * Math.random());
      },
        createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.indexOf(queryString) >= 0);
        };
      },
      handleSelect(item) {
          console.log(item);
      },
       loadAll() {
        return [
          { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
          { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
          { "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
          { "value": "泷千家(天山西路店)", "address": "天山西路438号" },
          { "value": "胖仙女纸杯蛋糕（上海凌空店）", "address": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101" },
          { "value": "贡茶", "address": "上海市长宁区金钟路633号" },
        ];
      },
       loadTreeData(){
          this.$http.get('/WCC-ECM/tree/default')
          .then((response) => {
            console.log(response.data)
           this.ztreeDataSource = response.data
        })
        .catch(function(response) {
          console.log(response)
        })
       },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        console.log(`当前页: ${val}`);
      },
       filterTag(value, row) {
        return row.status === value;
      }
    }
  }
</script>

<style >
.labary{
  height: 100%;
}
.tree-sider{
  height: 100%;
  float: left;
  width: 16%;
  min-width: 220px;
     background-color: #f5f5f5;
}
.el-tree{
  min-height:100%;
}
.tree-search{
  padding: 5px 10px 5px 10px;
}
.tree-data{
overflow: auto; outline: none;
 height: calc(100% - 46px);
}
.el-breadcrumb {
  font-size: 14px;
  line-height: 14px;
  height: 46px;
  width: 100%;
  background-color: #f5f5f5;
  padding: 12px 12px 6px 12px;
  border: 1px solid #d3dce6;
}

::-webkit-scrollbar  
{  
    width: 5px;  
    height: 5px;  
    background-color: #F5F5F5;  
}  
  
/*定义滚动条轨道 内阴影+圆角*/  
::-webkit-scrollbar-track  
{  
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);  
    border-radius: 10px;  
    background-color: #F5F5F5;  
}  
  
/*定义滑块 内阴影+圆角*/  
::-webkit-scrollbar-thumb  
{  
    border-radius: 10px;  
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);  
    background-color: #555;  
}  
  .el-row {
    padding-left: 20px;
    padding:5px 0px 5px 20px
  }
  .el-table th>.cell {
    text-align: center;
  }

</style>