<template>
   <div class="shopcar">
       <div class="mui-card" v-for="(item,i) in shoppinglist" :key="item.id">
        <div class="mui-card-content">
             <mt-switch v-model="$store.getters.getGoodsSelected[item.id]" 
             @change="selectedChanged(item.id,$store.getters.getGoodsSelected[item.id])"></mt-switch>
             <img :src="item.thumb_path">
             <div class="info">
                 <h1>{{item.title}}</h1>
                 <p>
                     <span class="price">￥{{item.sell_price}}</span>
                     <shop-box class="box" :initcount="$store.getters.getgoodsCount[item.id]" :goodsid="item.id"></shop-box>
                     <!-- item.id删除的是car里面的数据，i删除的是shoppinglist里面的数据 -->
                     <a href="#" @click.prevent="remove(item.id,i)">删除</a>
                 </p>
             </div>
        </div>
    </div>


    <!-- 结算区域 -->
    <div class="mui-card">
        <div class="mui-card-content small">
           <div class="left">
               <p>总计(不含运费)</p>
               <p>已勾选商品<span class="red">{{$store.getters.getGoodsCountAndAmount.count}}
                   </span>件,总价<span class="red">￥{{$store.getters.getGoodsCountAndAmount.amount}}</span></p>
           </div>
           <mt-button type="danger" class="go">去结算</mt-button>
        </div>
    </div>
   </div>
</template>

<script>
import shopBox from '../subcomponents/shopcar_comment.vue'
export default {
data(){
    return{
        shoppinglist:[]
    }
},
created () {
    this.getshopcar()
},
methods: {
    // 获取购物车数据
    getshopcar(){
        var idArr=[];
        this.$store.state.car.forEach(item => idArr.push(item.id))
        // 如果购物车没有商品，则直接返回，不需要请求数据接口，否者会报错
        if(idArr.length<=0){
            return
        }
        this.$http.get("api/goods/getshopcarlist/"+idArr.join(",")).then(result=>{
           if(result.body.status===0){
                this.shoppinglist=result.body.message
                //  console.log(this.shoppinglist)
           }
        })
    },
    // 删除商品
    remove(id,index){
        // 根据Id，从store 中的购物车中删除对应的那条商品数据,同时，把当前组件中的shoppinglist中对应要删除的商品，使用index来删除
       this.shoppinglist.splice(index,1)
       this.$store.commit('delectData',id)
    },
    // 开关同步问题
    selectedChanged(id,val){
        // console.log(id+'--------'+val)
        this.$store.commit("uplateSelected",{id,selected:val})
    }
},
components: {
    shopBox
}
}
</script>

<style lang="scss">
.shopcar{
    background-color: #eee;
    overflow: hidden;
    .box{
        display: inline-block;
    }
    .mui-card{
        .mui-card-content{
        margin-left: 10px;
        padding: 15px 0;
        display: flex;
        align-items: center;
    img{
        width: 60px;
        height: 60px;;
        }
    .info{
        h1{
            font-size: 13px;
        }
        p{
             margin-top: 10px;
            .price{
            color: red;
            font-weight: bold;
            }
        }
    }
    }
   
    }
    .small{
        display: flex;
        justify-content: space-between;
        .go{
            margin-right: 15px;
        }
        .red{
            color: red;
            font-weight: bold;
            font-size: 16px;
        }
    }
}
</style>

