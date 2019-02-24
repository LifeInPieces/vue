<template>
    <div class="news_inner">
       <h3 class="title">{{newsinfo.title}}</h3>
       <p class="subtitle">
           <span>发表时间:{{newsinfo.add_time | Format}}</span>
           <span>点击:{{newsinfo.click}}次</span>
       </p>
       <hr>
       <div class="content" v-html="newsinfo.content"></div>
       <comment></comment>
    </div>
</template>

<script>
import comment from '../subcomponents/comment.vue'
export default {
data(){
    return{
        newsinfo:{},
        id:this.$route.params.id
    }
},
created () {
    this.getnewsinfo()
},
methods: {
   getnewsinfo(){
        this.$http.get("api/getnew/"+this.id).then(result=>{
            // console.log(result)
            if(result.body.status===0){
                this.newsinfo=result.body.message[0]
                // console.log(this.newsinfo.content)
            }else{
                 Toast('数据获取失败')
            }
        })
   }
},
components: {
    comment
}
}
</script>

<style lang="scss" scoped>
.news_inner{
    padding: 0 4px;
    .title{
        font-size: 16px;
        text-align: center;
        color: red
    }
    .subtitle{
        font-size:13px;
        display: flex;
        justify-content: space-between;
        color: #226aff;
    }
}

</style>
