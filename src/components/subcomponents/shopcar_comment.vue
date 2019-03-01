<template>
    <div>
        <div class="mui-numbox" data-numbox-min="1" style="height:25px">
            <!-- "-"按钮，点击可减小当前数值 -->
            <button class="mui-btn mui-numbox-btn-minus" type="button">-</button>
            <input class="mui-numbox-input" type="number" :value="initcount" @change="countChanged" ref="numbox" readonly/>
            <!-- "+"按钮，点击可增大当前数值 -->
            <button class="mui-btn mui-numbox-btn-plus" type="button">+</button>
        </div>
    </div>
</template>

<script>
import mui from '../../../lib/mui/js/mui.min.js'
export default {
mounted () {
    // 初始化数字框
    mui('.mui-numbox').numbox()
},
methods: {
    countChanged(){
//    数据改变了
// console.log(this.$refs.numbox.value)
    this.$store.commit('uplateData',{
        id:this.goodsid,
        count:this.$refs.numbox.value
    })
}
},
props: ['initcount','goodsid']

}
</script>

<style lang="scss" scoped>
.mui-numbox{
    margin-left: 5px;
}
</style>
