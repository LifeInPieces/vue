<template>
    <div class="goodsdesc">
       <h3>{{desc.title}}</h3>
       <hr>
       <div class="content" v-html="desc.content"></div>
    </div>
</template>

<script>
import {Toast} from "mint-ui"
export default {
data(){
    return{
        id:this.$route.params.id,
        desc:{}
    }
},
created () {
    this.getgoodsDesc()
},
methods: {
    getgoodsDesc(){
        this.$http.get("api/goods/getdesc/"+this.id).then(result=>{
            // console.log(result)
            if(result.body.status===0){
                this.desc=result.body.message[0]
            }
        })
    }
}
}
</script>

<style lang="scss">
.goodsdesc{
    padding: 4px;
    h3{
        font-size: 14px;
         color: #226aff;
         text-align: center;
         margin: 15px 0;
    }
    .content{
        img{
            width: 100%;
        }
    }
}
</style>
