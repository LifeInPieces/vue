// 入口文件
import Vue from 'vue'
// 导入路由的包
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import vueResource from 'vue-resource'
Vue.use(vueResource)
// 根地址
Vue.http.options.root="http://www.liulongbin.top:3005/"
// 按需导入 Mint-UI 中的组件  
import { Header,Swipe, SwipeItem,button } from 'mint-ui'; 
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(button.name, button);
// 导入MUI样式
import '../lib/mui/css/mui.min.css'
// 导入扩展图标样式
import '../lib/mui/css/icons-extra.css'
import app from './app.vue'
import router from './router.js'
// 导入时间模块
import moment from 'moment'
Vue.filter('Format',(dataStr,pattern="YYYY-MM-DD HH:mm:ss")=>{
    return moment(dataStr).format(pattern)
})
var vm=new Vue({
    el:'#app',
    render:c=>c(app),
    router
})