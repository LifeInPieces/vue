<template>
    <div class="photoInfo">
        <h3>{{infoList.title}}</h3>
        <p class="subtitle">
            <span>发表时间:{{infoList.add_time | Format}}</span>
            <span>点击:{{infoList.click}}次</span>
        </p>
        <hr>
        <!-- 图片缩略图 -->
        <div class="thumbs">
            <vue-preview :slides="list"></vue-preview>
        </div>
        <div class="content" v-html="infoList.content"></div>
        <comment :id="id"></comment>
    </div>
</template>

<script>
import {Toast} from "mint-ui"
import comment from '../subcomponents/comment.vue'
export default {
    data(){
        return{
            id:this.$route.params.id,
            infoList:{},
            list:[]
        }
    },
    created () {
        this.getphotoInfo(),
        this.getThumbs()
    },
    methods: {
        getphotoInfo(){
            this.$http.get("api/getimageInfo/"+this.id).then(result=>{
                // console.log(result)
                if(result.body.status===0){
                    this.infoList=result.body.message[0]
                    // console.log(this.infoList)
                }else{
                    Toast("获取详情页失败")
                }
            })
        },
    //     handleClose () {
    //     console.log('close event')
    //   }
    getThumbs(){
        this.$http.get("api/getthumimages/"+this.id).then(result=>{
            // console.log(result)
            if(result.body.status===0){
                result.body.message.forEach(item => {
                    item.h=400;
                    item.w=600;
                    item.msrc=item.src
                });
                  this.list=result.body.message
                // console.log(this.list)
            }else{
                Toast("图片缩略图获取失败")
            }
        })
    }
    },
    components: {
           comment
       }
}
</script>

<style lang="scss">
.photoInfo{
    padding:3px;
    h3{
        color: #26a2ff;
        font-size: 15px;
        text-align: center;
        margin: 15px 0;
    }
    .subtitle{
        display: flex;
        justify-content: space-between;
        font-size: 13px;
    }
    .content{
        font-size: 13px;
        line-height: 30px;
    }

    .thumbs{
    .my-gallery{
     display: flex;
     flex-wrap: wrap;
       figure {
        margin: 10px;
        box-shadow: 0 0 10px #999;
        img{
            width: 100px;
            vertical-align: middle;
        }
    }
    }
  }
}
</style>
