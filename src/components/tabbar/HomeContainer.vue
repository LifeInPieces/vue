<template>
<div>
<!-- 轮播图 -->
<mt-swipe :auto="4000">
<!-- <mt-swipe-item>1</mt-swipe-item>
<mt-swipe-item>2</mt-swipe-item>
<mt-swipe-item>3</mt-swipe-item> -->
<mt-swipe-item v-for="item in lunbotuList" :key="item.id"><img :src="item.img"></mt-swipe-item>
</mt-swipe>

<!-- 六宫格 -->
<ul class="mui-table-view mui-grid-view mui-grid-9">
    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/newslist">
            <img src="../../images/menu1.png">
            <div class="mui-media-body">新闻资讯</div></router-link></li>
    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="#">
           <img src="../../images/menu2.png">
            <div class="mui-media-body">图片分享</div></router-link></li>
    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="#">
           <img src="../../images/menu3.png">
            <div class="mui-media-body">商品购买</div></router-link></li>
    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="#">
          <img src="../../images/menu4.png">
            <div class="mui-media-body">留言反馈</div></router-link></li>
    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="#">
          <img src="../../images/menu5.png">
            <div class="mui-media-body">视频专区</div></router-link></li>
    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="#">
            <img src="../../images/menu6.png">
            <div class="mui-media-body">联系我们</div></router-link></li>
</ul>
</div>
</template>

<script>
export default {
data(){
 return{
    lunbotuList: [] // 保存轮播图的数组
 }
},
created () {
 this.getLunbotu()  
},
methods: {
    getLunbotu(){
        this.$http.get("api/getlunbo",{emulateJSON:true}).then(result=>{
            // console.log(result.body)
            if(result.body.status==0){
                this.lunbotuList=result.body.message
                // console.log(this.lunbotuList)
            }else{
                Toast('加载图片失败')
            }
        })
    }
}
}
</script>

<style lang="scss" scoped>
.mint-swipe{
    height: 200px;
    .mint-swipe-item{
    background-color: red;
   }
   img{
       width: 100%;
       height: 100%;
   }
}
.mui-grid-view.mui-grid-9{
    background-color: #fff;
     border:none;
    .mui-table-view-cell{
    border:none
    }
   
    img{
        width: 60px;
    }
    .mui-media-body{
        font-size: 13px;
    }
}
</style>
