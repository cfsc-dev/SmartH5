<template>
    <section class="box-wrapper">
        <section class="content">
            <img :src="`${require('@/assets/img/banner.png')}`" class="banner" alt="">
            <centerContent></centerContent>
            <news></news>
        </section>
        <footerBar></footerBar>
    </section>
</template>
<script>
import { centerContent, footerBar, news } from './index'
export default {
    name: 'index',
    components: {
        centerContent,
        footerBar,
        news
    }
}
</script>
<style lang="stylus" scoped>
.box-wrapper{
    width 100%;
    .content{
        padding-bottom 50px
        .banner{
            width 100%;
            height 2.65rem
        }
    }
}



</style>


