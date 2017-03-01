<template>
<div>
<el-row class="header_bg" >
 <img v-bind:src="logoWihte" >
<el-row>
</div>
</template>

<script>
import logo from '../../assets/img/logo_white.png'

  export default {

    data(){
      return{
        logoWihte:logo
      }
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style>
.header_bg {
  background: #4078c0;
  padding: 0 30px;
  margin-left: 0px; 
  margin-right: 0px; 
}
.header_menu{
  background: transparent;
  padding-right:0;
}
.is-active {
    color: #20a0ff;
}
.fa-icon {
 
    vertical-align: center;
    margin-right: 10px;
}

</style>