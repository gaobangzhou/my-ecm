<template>
<div class="content">
<el-row :gutter="10">
  <el-col :span="12">
  <my-todo></my-todo>
  </el-col>
  <el-col :span="12">
    <my-search></my-search>
  </el-col>
</el-row>

</div>
</template>

<script>
import MyTodo from './MyTodo'
import MySearch from './MySearch'
export default {
  components:{
    MyTodo,MySearch
  },
  data () {
    return {
      msg: 'this is Tasks Page'
    }
  }
}
</script>
<style >
  .content{
    padding: 10px;
  }

</style>