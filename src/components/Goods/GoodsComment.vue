<template>
    <div>
        <comment-box :id="$route.params.id"></comment-box>
    </div>
</template>

<script>
import commentBox from '../subcomponents/comment.vue'
export default {
components: {
    commentBox
}
}
</script>

<style>

</style>
