<template>
<div>
  <el-table
      :data="gridData" border stripe
      style="width: 100%">
      <el-table-column
        prop="address"
        label="地址"
        width="180">
      </el-table-column>
      <el-table-column
        prop="username"
        label="工号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="fullname"
        label="姓名">
      </el-table-column>
    </el-table>
</div>
</template>

<script>
export default {
  data () {
    return {
      gridData: [],
      apiUrl: '/WCC-ECM/getAllUsers'
    }
  },created: function() {
    this.getUserFolderFiles()
  },methods:{
    getUserFolderFiles:function(){
      this.$http.get(this.apiUrl)
      .then((response) => {
      console.log(response.data)
      this.gridData =response.data
    })
    .catch(function(response) {
      console.log(response)
    })
    }
  }
}
</script>
<style>
  </style>