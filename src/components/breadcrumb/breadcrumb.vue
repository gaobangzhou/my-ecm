<template>
  <div class="el-breadcrumb"> <span class="el-breadcrumb__item"><i class="fa fa-map-marker "></i></span>
      <span class="el-breadcrumb__item" v-for="d in data">
      <span class="el-breadcrumb__item__inner" ref="link" @click="goTo(d.URL)">
      </span>{{d.LABEL}}<span class="el-breadcrumb__separator">{{separator}}</span>
  </span>
  </div>

</template>
<script>
  export default {
    name: 'breadcrumb',

    props: {
      separator: {
        type: String,
        default: '/'
      },data:{
        type:Array,
        default:[]
      }
    },data(){
      return{
      }
    },
    methods:{
      goTo:function(to){
        this.$router.replace(to)
      }
    }
  };
</script>
