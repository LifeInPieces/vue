// 入口文件
import Vue from 'vue'
// 导入路由的包
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import vueResource from 'vue-resource'
Vue.use(vueResource)
// 根地址
Vue.http.options.root="http://www.liulongbin.top:3005/"

Vue.http.options.emulateJSON = true;
// 按需导入 Mint-UI 中的组件  
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

// 安装 图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview, {
    mainClass: 'pswp--minimal--dark',
    barsSize: {top: 0, bottom: 0},
    captionEl: false,
    fullscreenEl: false,
    shareEl: false,
    bgOpacity: 0.85,
    tapToClose: true,
    tapToToggleControls: false
  })
// import { Header,Swipe, SwipeItem,button,Lazyload} from 'mint-ui'; 
// Vue.component(Header.name, Header);
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(button.name, button);
// Vue.use(Lazyload);
// 导入MUI样式
import '../lib/mui/css/mui.min.css'
// 导入扩展图标样式
import '../lib/mui/css/icons-extra.css'
import app from './app.vue'
import router from './router.js'
// 导入Vuex
import Vuex from 'vuex'
Vue.use(Vuex)

var car=JSON.parse(localStorage.getItem("car") || '[]')
var store=new Vuex.Store({
    state: {
      car:car//将购物车中的商品数据，用一个数组存储起来
      },
      mutations: {
        addCar(state,goodsData){
          //如果购物车里面已经有这个商品，那么直接push上去即可
          // 初始化一个值，默认购物车里面没有该商品
          var flag=false
          state.car.some(item=>{
            if(item.id===goodsData.id){
              item.count+=parseInt(goodsData.count);
              flag=true;
              return true;
            }
          })
          // 如果没有该商品
          if(!flag){
            state.car.push(goodsData)
          }

          localStorage.setItem('car',JSON.stringify(state.car))

        },
        // 购物车页面更新数据
        uplateData(state,goodsData){
          state.car.some(item=>{
            if(item.id==goodsData.id){
              item.count=parseInt(goodsData.count)
              return true
            }
          })
          localStorage.setItem('car', JSON.stringify(state.car))
        },
        delectData(state,id){
          state.car.some((item,i)=>{
            if(item.id==id){
              // console.log(typeof(item.id))
              // console.log(typeof(id))
                state.car.splice(i,1)
                return true
            }
          })
          // 把最新数据更新到内存中
          localStorage.setItem('car',JSON.stringify(state.car))
        },
        // 开关同步
        uplateSelected(state,info){
          state.car.some(item=>{
            if(item.id==info.id){
              item.selected=info.selected
            }
          })
          localStorage.setItem('car',JSON.stringify(state.car))
        }
      },
      getters:{
        getAllCount(state){
          var c=0;
          state.car.forEach(item=>{
            c+=item.count
          })
          return c;
        },
        // 获取到内存中数据的每一项id作为key,每一项的数量作为值
        getgoodsCount(state){
          var obj={};
          state.car.forEach(item=>{
           obj[item.id]=item.count
          })
          return obj;
        },
        // 渲染商品中选中按钮
        getGoodsSelected(state){
          var o={}
          state.car.forEach(item => {
              o[item.id]=item.selected
          });
          return o;
        },
         // 商品和价格的计算
         getGoodsCountAndAmount(state) {
          var o={
            count:0,//勾选的数量
            amount:0//总价
          }
          state.car.forEach(item=>{
           if(item.selected){
            o.count+=item.count,
            o.amount+=item.price*item.count
           }
          })
          return o
        }
      }
})
// 导入时间模块
import moment from 'moment'
Vue.filter('Format',(dataStr,pattern="YYYY-MM-DD HH:mm:ss")=>{
    return moment(dataStr).format(pattern)
})
var vm=new Vue({
    el:'#app',
    render:c=>c(app),
    router,
    store//只要挂载到vm实例上，任何组件都能使用store来存取
})