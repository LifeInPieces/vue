// 入口文件
import Vue from 'vue'
// 导入路由的包
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import vueResource from 'vue-resource'
Vue.use(vueResource)

// 按需导入 Mint-UI 中的组件  
import { Header,Swipe, SwipeItem } from 'mint-ui'; 
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
// 导入MUI样式
import '../lib/mui/css/mui.min.css'
// 导入扩展图标样式
import '../lib/mui/css/icons-extra.css'
import app from './app.vue'
import router from './router.js'
var vm=new Vue({
    el:'#app',
    render:c=>c(app),
    router
})