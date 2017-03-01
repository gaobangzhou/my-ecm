<template>
<div>
<el-card class="box-card">
  <div slot="header" class="clearfix">
    <span style="line-height: 26px;">我的代办</span>
    <el-button style="float: right;" type="text">more<i class="fa fa-angle-double-right" style="padding-left: 5px;"></i></el-button>
  </div>
  <div v-for="o in 4" class="text item">
    {{'列表内容 ' + o }}
  </div>
</el-card>
</div>
</template>

<script>
export default {

  data () {
    return {
      msg: 'this is Tasks Page'
    }
  }
}
</script>
<style >
.el-card__header {
    padding: 10px 20px;
    border-bottom: 1px solid #D3DCE6;
    box-sizing: border-box;
}

</style>