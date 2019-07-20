<template>
    <section class="box-wrapper">
        <section class="content">
            <img :src="`${require('@/assets/img/banner.png')}`" class="banner" alt="">
            <centerContent></centerContent>
        </section>
        <footerBar></footerBar>
    </section>
</template>
<script>
import { centerContent, footerBar } from './index'
export default {
    name: 'index',
    components: {
        centerContent,
        footerBar
    }
}
</script>
<style lang="stylus" scoped>
.box-wrapper{
    width 100%;
    height 100%;
    .content{
        padding-bottom 50px
        .banner{
            width 100%;
            height 2.65rem
        }
    }
}



</style>


