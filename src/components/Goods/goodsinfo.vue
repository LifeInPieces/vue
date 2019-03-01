<template>
    <div class="getCard">
       <transition  @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
            <div class="ball" v-show="flag" ref="ball"></div>
       </transition>
        <!-- 商品轮播图区域 -->
        <div class="mui-card">
	       <div class="mui-card-content">
               <swiper :lunbotuList="lunbotu" :isfull="false"></swiper>
           </div>
        </div>
         <!-- 商品购买区域 -->
        <div class="mui-card">
            <div class="mui-card-header">{{dateObj.title }}</div>
            <div class="mui-card-content">
                <div class="sell">
                    市场价:<del>￥{{dateObj.market_price}}</del>&nbsp;&nbsp;
                   销售价:<span class="now_price">￥{{dateObj.sell_price}}</span>
                </div>
                <p class="number">购买数量:<count @getDatanum="getSelectedCount" :max="dateObj.stock_quantity"></count></p>
                 <mt-button type="primary" size="small">立即购买</mt-button>
                 <mt-button type="danger" size="small" @click="circle">加入购物车</mt-button>
            </div>
        </div>
        <!-- 商品购买区域 -->
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <p>商品货号:{{dateObj.goods_no}}</p>
                <p>存库情况:{{dateObj.stock_quantity}}件</p>
                <p>上架时间:{{dateObj.add_time | Format}}</p>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
                <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
            </div>
        </div>
    </div>
</template>

<script>
import {Toast} from "mint-ui"
import swiper from '../subcomponents/swiper.vue'
import count from '../subcomponents/goodsinfo_numbox.vue'
export default {
data(){
    return{
        id:this.$route.params.id,
        lunbotu:[],//轮播图
        dateObj:{},
        flag:false,
        selectedCount: 1 // 保存用户选中的商品数量， 默认，认为用户买1个
    }
},
created () {
    this.getLunbotu(),
    this.getDate()
},
methods: {
    // 获取轮播图
    getLunbotu(){
        this.$http.get("api/getthumimages/"+this.id).then(result=>{
            // console.log(result)
            if(result.body.status===0){
                // 因为这个数据里面图片的属性是src，与首页中图片属性不一致，所以先循环轮播图数组的每一项
                result.body.message.forEach(item => {
                     item.img = item.src;
                });
                this.lunbotu=result.body.message
            }else{
                Toast("获取数据失败")
            }
        })
    },
    // 获取商品信息
    getDate(){
        this.$http.get("api/goods/getinfo/"+this.id).then(result=>{
            // console.log(result)
            if(result.body.status===0){
                this.dateObj=result.body.message[0]
            }else{
                Toast("获取商品参数失败")
            }
        })
    },
    // 图文介绍
    goDesc(id){
     this.$router.push('/home/GoodsDesc/'+id)
    },
    // 商品评价
    goComment(id){
      this.$router.push({name:'goodsComment',params:{id}}) 
    },
    // 小球滚动
    circle(){
        this.flag=!this.flag
        var goodsData={
            id:this.id,
            count:this.selectedCount, //购买的数量
            price: this.dateObj.sell_price,
            selected: true//按钮开启关闭
        }
        console.log(goodsData)
        this.$store.commit("addCar",goodsData)
    },
    beforeEnter(el){
      el.style.transform = "translate(0, 0)";
    },
    enter(el,done){
       el.offsetWidth;
       const ballPosition=this.$refs.ball.getBoundingClientRect();
       const badgePosition=document.getElementById('badge').getBoundingClientRect();
       const xDist=badgePosition.left-ballPosition.left;
       const yDist=badgePosition.top-ballPosition.top;
        el.style.transform=`translate(${xDist}px,${yDist}px)`;
        el.style.transition="all 0.5s cubic-bezier(.4,-0.3,1,.68)"
        done();
    },
    afterEnter(el){
        this.flag=!this.flag
    },
    // 把添加到购物车的数量传到下面的小图标上
   getSelectedCount(count){
       this.selectedCount=count;
    //    console.log(this.selectedCount)
    }
},
 components: {
        swiper,
        count
    }
}
</script>

<style lang="scss" scoped>
 .getCard{
     background-color: #eee;
     overflow: hidden;
     .ball{
         position: absolute;
         width: 15px;
         height: 15px;
         background-color: red;
         border-radius: 50%;
         z-index: 99;
         top: 402px;
         left: 142px;
     }
     .mui-card-content{
         padding: 20px 15px;
      .now_price{
         color: red;
         font-size: 16px;
         font-weight: bold;
      }
     }
     .number{
         display: flex;
         line-height: 35px;
         margin-top: 6px;
     }
     .mui-card-footer{
         display: block;
         button{
             margin:15px 0;
         }
     }
 }
</style>
