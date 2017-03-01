<template>
  <div id="sideBar" class="sidebar">
      <el-menu :default-active="active"  :unique-opened="true" @select="menuSelect">
      <el-menu-item index="home" ><i class="fa fa-home "></i>首页</el-menu-item>
      <el-menu-item index="libary" ><i class="fa fa-file-text-o"></i>文档库</el-menu-item>
        <el-menu-item index="upload" ><i class="fa fa-folder-o"></i>文档归档</el-menu-item>
       <el-submenu index="task">       
          <template slot="title"><i class="fa fa-tasks"></i>我的流程</template>
          <el-menu-item index="todo">我的代办</el-menu-item>
          <el-menu-item index="request">我的请求</el-menu-item>          
          <el-menu-item index="finished">我的已完成</el-menu-item>       
        <el-menu-item index="tasks">我的流程</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-submenu index="content">       
          <template slot="title"><i class="fa fa-files-o"></i>我的内容</template>
          <el-menu-item index="project">我的项目</el-menu-item>
          <el-menu-item index="borrow">我的利用</el-menu-item>          
          <el-menu-item index="checkout">我的已检出</el-menu-item>       
        <el-menu-item index="agent">我的代理</el-menu-item>
        </el-submenu>
      </el-submenu>
       <el-submenu index="archive">       
          <template slot="title"><i class="fa fa-archive"></i>档案管理</template>
          <el-menu-item index="organization">档案整编</el-menu-item>
          <el-menu-item index="utilization">档案利用</el-menu-item>          
          <el-menu-item index="storage">档案入库</el-menu-item>       
        </el-submenu>
      </el-submenu>
       <el-submenu index="report">       
          <template slot="title"><i class="fa fa-file-excel-o"></i>报表管理</template>
          <el-menu-item index="paper-report">发图报表</el-menu-item>
          <el-menu-item index="print-report">文印报表</el-menu-item>          
          <el-menu-item index="archive-report">档案报表</el-menu-item>       
        </el-submenu>
      </el-submenu>
        <el-submenu index="print">       
          <template slot="title"><i class="fa fa-print"></i>文印委托</template>
          <el-menu-item index="print-delegation">文印委托</el-menu-item>
          <el-menu-item index="my-delegation">我的委托</el-menu-item>          
          <el-menu-item index="print-property">项目文印配置</el-menu-item>       
        </el-submenu>
      </el-submenu>
             <el-submenu index="setting">       
          <template slot="title"><i class="fa fa-cog"></i>系统管理</template>
          <el-menu-item index="menu">菜单管理</el-menu-item>
          <el-menu-item index="authority">权限管理</el-menu-item>          
          <el-menu-item index="workflow">流程管理</el-menu-item>       
        </el-submenu>
      </el-submenu>
       <el-menu-item index="retrieval"><i class="fa fa-search"></i>全文检索</el-menu-item>
 </el-menu>
 </div>
  
</template>
<script>

export default {
  props:['active'],
  data () {
    return {  
    }
  },
  methods:{
    menuSelect:function(index,indexpath){
      console.log(this.$route.path);
      if(this.$route.path.indexOf(index) < 0){
           this.$router.push('/'+index);
    }
   }
  }
}
</script>

<style>
.fa-icon{
      vertical-align: sub;
}
.sidebar {
    background-color: #f5f5f5;
    border-style: solid;
    border-color: rgb(204, 204, 204);
    border-width: 0px 1px 0px 0px;
}
.sidebar {
    width: 190px;
    float: left;
    padding-left: 0px;
    padding-right: 0px;
    height: 100%;
}

.el-menu-item, .el-submenu__title {
    height: 46px;
    line-height: 46px;
    font-size: 14px;
    color: #475669;
        border-color: #dfe1e2;
    padding: 0 20px;
    border-style: solid;
    border-width: 1px 0 0;
    cursor: pointer;
    position: relative;
    transition: border-color .3s,background-color .3s,color .3s;
    box-sizing: border-box;
    white-space: nowrap;
}

.nav-list>li>.submenu:before {
  
}
.el-submenu>ul:before {
     content: "";
    display: block;
    position: absolute;
    z-index: 1;
    left: 18px;
    top: 0;
    bottom: 0;
     border-color: #9dbdd6;
    border: 1px dotted;
    border-width: 0 0 0 1px;
}
.el-submenu>ul>li:before {
    content: "";
    display: block;
    width: 7px;
    position: absolute;
    z-index: 1;
    left: 20px;
    top: 23px;
    border-color: #9dbdd6;
    border: 1px dotted;
    border-width: 1px 0 0;
}
</style>
