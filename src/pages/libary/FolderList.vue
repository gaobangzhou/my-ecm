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
      <el-tree :data="treeData" :props="treeProps" @node-click="handleNodeClick"></el-tree>
    </div>
  </div>
  <div style="height: 100%;overflow:hidden"> 
      <breadcrumb separator=">" :data="paths">
     </breadcrumb>
   <el-row :gutter="20">
     <el-button type="info">检入文件</el-button>
   </el-row>

   <el-table :data="tableData" border height="600" style="width: 100% "  @selection-change="handleSelectionChange"
    default-sort-prop="date"  default-sort-order="descending" > 
     <el-table-column type="selection"  width="50"> </el-table-column>  

    <el-table-column prop="name" sortable  label="文档标题" show-overflow-tooltip>
      <template scope="scope">
          <el-button v-if="scope.row.type !=='file'" type="text">{{scope.row.address}}</el-button>
          <span v-if="scope.row.type ==='file'">{{scope.row.address}}</span>
      </template>
    </el-table-column>
    <el-table-column prop="docnum" sortable  label="文档号"  width="150">
    </el-table-column>
      <el-table-column prop="status"  label="状态"  width="90"
         :filters="[{ text: '已发布', value: '已发布' }, { text: '编辑', value: '编辑'}, { text: '审批', value: '审批' }]"
      :filter-method="filterTag">
      <template scope="scope">
        <el-tag v-if="scope.row.type ==='file'"
          :type="scope.row.status === '已发布' ? 'success':'primary'"
          close-transition>{{scope.row.status}}</el-tag>
      </template>
    </el-table-column>
      <el-table-column prop="revid" sortable  label="版本"  width="120">
    </el-table-column>
      <el-table-column prop="author" sortable  label="作者"  width="120">
    </el-table-column>
     <el-table-column prop="date" label="日期" sortable width="120">
      <template scope="scope">{{ scope.row.date }}</template>
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
  export default {
    components:{
      Autocomplete,Breadcrumb
    },
      data() {
      return {
        treeData: [],
        treeProps: {
          children: 'CHILDREN',
          label: 'NAME'
        },
         restaurants:[],
         state1: '',
         paths:[{LABEL:'文档库',URL:'/labary'},{LABEL:'test',URL:'/labary/test'}],
         tableData: [],
         multipleSelection: [],
         currentPage: 5,
         guid:'',
      }
    },
      created(){
        this.loadTreeData();
      },
      mounted() {
        //this.restaurants = this.load();
        this.tableData=[];
        this.guid =this.$route.params.guid;
      },
      watch: {  
        guid:function(){
          console.log(this.guid);
        }
      },
      methods: {
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
      loadTreeData(){
        this.$http.get('/WCC-ECM/tree/default')
          .then((response) => {
            console.log(response.data)
           this.treeData =response.data
        })
        .catch(function(response) {
          console.log(response)
        })
      },
      loadAll() {
         
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



</style>