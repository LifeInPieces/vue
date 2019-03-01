<template>
    <div>
        <div class="mui-numbox" data-numbox-min="1">
            <!-- "-"按钮，点击可减小当前数值 -->
            <button class="mui-btn mui-numbox-btn-minus" type="button">-</button>
            <input class="mui-numbox-input" type="number" value="1" @change="countChanged" ref="numbox"/>
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
    mui('mui-numbox').numbox()
},
methods: {
    countChanged(){
    this.$emit('getDatanum',parseInt(this.$refs.numbox.value))
    }
},
props: ["max"],
// 监听数据改变
watch: {
    max:function(newVal,oldVal){
        mui(".mui-numbox").numbox().setOption('max',newVal)
    }
}
}
</script>

<style lang="scss" scoped>
.mui-numbox{
    margin-left: 5px;
}
</style>
