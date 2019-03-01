<template>
    <div class="cmt-container"> 
        <h3>发表评论</h3>
        <hr>
        <textarea placeholder="清数据要评论的内容(最多吐槽120字)" maxlength="120" v-model="msg"></textarea>
        <mt-button type="primary" size="large" @click="getData">发表评论</mt-button>
        <div class="cmt-list">
            <div class="cmt-item" v-for="(item,i) in commentlist" :key="item.id">
                <div class="cmt-title">第{{i+1}}楼&nbsp;&nbsp;用户:{{item.user_name}}&nbsp;&nbsp;发表时间:{{item.add_time | Format}}</div>
                <div class="cmt-body">{{item.content==="undefined"?'此用户很懒,什么也没写':item.content}}</div>
            </div>
        </div>
         <mt-button type="danger" size="large" plain @click="add">加载更多</mt-button>
    </div>
</template>

<script>
import {Toast} from "mint-ui"
export default {
data(){
    return{
        pageIndex:1,
        commentlist:[],
        msg:''
    }
},
created () {
  this.getcomment()  
},
methods: {
    //获取数据
    getcomment(){
        this.$http.get("api/getcomments/"+this.id+"?pageindex="+this.pageIndex).then(result=>{
            // console.log(result)
            if(result.body.status===0){
                this.commentlist=this.commentlist.concat(result.body.message)
                //   console.log(this.commentlist)
            }else{
                Toast('评论获取失败')
            }
        })
    },
    //加载更多
    add(){
        this.pageIndex++;
        this.getcomment()  
    },
    getData(){
       if(this.msg.trim().length===0){
           Toast("发表内容失败")
       }
       //this.$route.params.id地址栏上面的id
       this.$http.post("api/postcomment/"+this.$route.params.id,{
           content:this.msg.trim()
       }).then(result=>{
           if(result.body.status===0){
               var cmt={
                  user_name:"匿名用户",
                  add_time: Date.now(),
                  content: this.msg.trim()
               };
               this.commentlist.unshift(cmt)
               this.msg=""
           }
       })
    }
},
props: ["id"]
}
</script>

<style lang="scss" scoped>
.cmt-container{
    h3{
        font-size: 16px;
    }
    textarea{
        font-size: 14px;
        height: 85px;
        margin: 0
    }
   .cmt-list{
       margin: 5px 0;
     .cmt-item{
         font-size: 13px;
       .cmt-title{
           line-height: 30px;
           background-color: #ccc;
       }
       .cmt-body{
           line-height: 35px;
           text-indent: 2em;
       }
     }
   }
}

</style>
