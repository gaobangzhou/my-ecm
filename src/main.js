import Vue from 'vue'
import ElementUI from 'element-ui'
import jQuery from 'jquery' 

import 'element-ui/lib/theme-default/index.css'
import './assets/css/font-awesome.min.css'


import App from './App.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import Routers from './router/routers'


Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(VueResource)

const router = new VueRouter({routes:Routers,mode:'history'})

new Vue({
  router,
  el: '#app',
  render: h => h(App)
})
