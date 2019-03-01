import VueRouter from 'vue-router'
import home from './components/tabbar/HomeContainer.vue'
import member from './components/tabbar/MemberContainer.vue'
import search from './components/tabbar/SearchContainer.vue'
import shopcar from './components/tabbar/ShopcarContainer.vue'
import newslist from './components/news/newslist.vue'
import newsinfo from './components/news/newsinfo.vue'
import photolist from './components/photos/photolist.vue'
import photoInfo from './components/photos/photoInfo.vue'
import goodslist from './components/Goods/GoodsList.vue'
import goodsinfo from './components/Goods/goodsinfo.vue'
import goodsDesc from './components/Goods/GoodsDesc.vue'
import goodsComment from './components/Goods/GoodsComment.vue'
// 3. 创建路由对象
var router = new VueRouter({
  routes: [
    {path:'/',redirect:'/home'},
    {path:'/home',component:home},
    {path:'/member',component:member},
    {path:'/search',component:search},
    {path:'/shopcar',component:shopcar},
    {path:'/home/newslist',component:newslist},
    {path:'/home/newsinfo/:id',component:newsinfo},
    {path:'/home/photolist',component:photolist},
    {path:'/home/photoInfo/:id',component:photoInfo},
    {path:'/home/goodslist/',component:goodslist},
    {path:'/home/goodsinfo/:id',component:goodsinfo},
    {path:'/home/GoodsDesc/:id',component:goodsDesc},
    {path:'/home/GoodsComment/:id',component:goodsComment,name:'goodsComment'}
  ],
  linkActiveClass:'mui-active'
})

// 把路由对象暴露出去
export default router