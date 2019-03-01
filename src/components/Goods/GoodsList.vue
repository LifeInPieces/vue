<template>
    <div class="good_list">
        <div class="good_item" v-for="item in goodList" :key="item.id" @click="goDetail(item.id)">
            <img :src="item.img_url">
            <h1 class="title">{{item.title}}</h1>
            <div class="info">
           <div class="info">
                <p class="price">
                <span class="now">￥{{item.sell_price}}</span>
                <span class="old">￥{{item.market_price}}</span>
            </p>
            <p class="sell">
                <span>热卖中</span>
                <span>剩{{item.stock_quantity}}件</span>
            </p>
           </div>
            </div>
        </div>
         <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
export default {
data(){
    return{
        number:1,
        goodList:[]
    }
},
created () {
  this.getGoodslist()  
},
methods: {
    // 获取数据
    getGoodslist(){
        this.$http.get("api/getgoods?pageindex="+this.number).then(result=>{
            if(result.body.status===0){
                this.goodList=this.goodList.concat(result.body.message)
                //  console.log(this.goodList)
            }
        })
    },
    // 加载更多
    getMore(){
        this.number++;
        this. getGoodslist()
    },
    // 使用JS的形式进行路由导航
     goDetail(id) {
         this.$router.push("/home/goodsinfo/"+id)
     }
}
}
</script>

<style lang="scss" scoped>
.good_list{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 7px;
    .good_item{
        width: 49%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        border:1px solid #ccc;
        box-shadow: 0 0 8px #ccc;
        padding: 2px;
        margin: 4px 0;
        img{
            width: 100%;
        }
        .title{
            font-size: 14px;
        }
        .info{
            background-color: #eee;
            p{
                padding: 5px;
                margin:0;
            }
           .price{
           .now{
               color: red;
               font-size: 16px;
               font-weight: bold;
           } 
           .old{
               text-decoration: line-through;
               font-size: 12px;
               margin-left: 10px;
           }
        }
         .sell{
               display: flex;
               justify-content: space-between;
               font-size: 13px;
           }
    }

        }
}
</style>
