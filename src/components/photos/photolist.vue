<template>
    <div>
      <div class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
        <div class="mui-scroll">
            <a :class="['mui-control-item',item.id==0 ?'mui-active':'']" v-for="item in photolist" :key="item.id" @click="getphotoDate(item.id)">
                {{item.title}}
            </a>
        </div>
      </div>
      <!-- 图片列表 -->
        <ul class="photo_list">
            <router-link :to="'/home/photoInfo/'+item.id" v-for="item in list" :key="item.id" tag="li">
            <img v-lazy="item.img_url">
            <div class="info">
            <h1 class="info-title">{{ item.title }}</h1>
            <div class="info-body">{{ item.zhaiyao }}</div>
            </div>
            </router-link>
        </ul>
    </div>
</template>

<script>
import mui from "../../../lib/mui/js/mui.min.js";
import {Toast} from "mint-ui"
export default {
data(){
    return{
        photolist:[],
        list:[]
    }
},
 mounted(){
        mui(".mui-scroll-wrapper").scroll({
        deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
    },
    created () {
        this.getPhoto(),
        this.getphotoDate(0)
    },
methods: {
    // 获取数据
   getPhoto(){
       this.$http.get("api/getimgcategory").then(result=>{
           if(result.body.status===0){
              result.body.message.unshift({title:'全部',id:0})
               this.photolist=result.body.message
            //    console.log(this.photolist)
           }else{
               Toast("获取图文列表失败")
           }
       })
   },
//    动态获取图片
 getphotoDate(cateId){
     this.$http.get("api/getimages/"+cateId).then(result=>{
        if(result.body.status===0){
            //  console.log(result.body.message)
            this.list=result.body.message
        }else{
            Toast("懒加载失败")
        }
     })
 }
}
}
</script>

<style lang="scss" scoped>
* {
  touch-action: pan-y;
}
.mui-segmented-control.mui-segmented-control-inverted .mui-control-item.mui-active{
	border: none;
}
.photo_list{
    list-style: none;
    margin: 0;
    padding: 10px;
    li{
        background-color: #ccc;
        box-shadow: 0 0 9px #999;
        margin-bottom: 10px;
        position: relative;
        img{
          width: 100%;
          vertical-align: middle;
        }
        img[lazy=loading] {
        width: 40px;
        height: 300px;
        margin: auto;
        }
        .info{
            position: absolute;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.4);
            color: #fff;
            max-height: 84px;
            .info-title{
                font-size: 14px;
            }
            .info-body{
                font-size: 13px;
            }
        }
    }
}
</style>

