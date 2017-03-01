<template>
  <div id="app" class="main-container">
   <navigation :active="activeModule"></navigation> 
   <div class="main-content"> 
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
    </div>
  </div>
</template>

<script>
import myHeader from './components/common/Header'
import navigation from './components/common/Navigation'

export default {
  components:{
    navigation,myHeader
  },
  data () {
    return {
      activeModule:this.activeModule,
    }
  },
  created () {
    this.navChange()
  },
 watch: {
    '$route': 'navChange',
  },
  methods:{
    navChange:function(){
       if(this.$route.name !=null){
          
          let name =this.$route.path.substring(1)


          let index ='home';
          if(name.indexOf('/')>=0){
            index = name.substring(0,name.indexOf('/'));
          }else{
            index =this.$route.name;
          }
          if (index=='index') {
            this.activeModule ='home';
         }else{
            this.activeModule =index;
            this.transitionName = 'slide-right';
         }       
       }

    },
    startHacking () {
      this.$notify({
        title: 'It Works',
        message: 'We have laid the groundwork for you. Now it\'s your time to build something epic!',
        duration: 6000
      })
    }

  }
}
</script>

<style>
html,body {
  font-family: Microsoft YaHei, sans-serif;
  min-width: 1366px;
  height: 100%;
  margin:0px;
}
input, textarea, keygen, select, button {
    font: 13.3333px;
   font-family: Microsoft YaHei, sans-serif;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s ease;
}
.fade-enter, .fade-leave-active {
  opacity: 0
}

  #app{
    height: 100%;
  }
.main-content {
    height: 100%;
    overflow: hidden;
    padding: 0;
    margin: 0;
}

*, :after, :before {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}
*/
.main-container {
    width: 100%;
    overflow: hidden;
    height: 100%;
    margin: 0;
    padding: 0;
 }
 * {
    box-sizing: border-box;
}

[class*=" fa-"], [class^=fa-] {
    vertical-align: baseline;
    margin-right: 10px;
}

[class*=" fa-"], [class^=fa-] {
 
    speak: none;
    font-style: normal;
    font-weight: 400;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    vertical-align: baseline;
    display: inline-block;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

</style>
