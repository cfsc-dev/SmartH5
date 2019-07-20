<template>
    <section class="main-content-center">
        <van-row gutter="10">
            <van-col span="6" v-for="(item, index) in centerIcon" :key="index">
                <div @click="skip(item.path)">
                    <img :src="`${require('@/assets/img/'+item.icon+'')}`" alt="">
                    <p>{{item.title}}</p>
                </div>
            </van-col>
        </van-row>
    </section>
</template>
<script>
    import { mapGetters } from 'vuex'
    export default {
        methods: {
            skip (path) {
                console.log(path)
                if (path) {
                    this.$router.push(path)
                } else {
                    this.$dialog.alert({
                        message: '该功能暂未开放，敬请期待'
                    })
                }
            }
        },
        computed: {
            ...mapGetters([
                'centerIcon'
            ])
        }
    }
</script>
<style lang="stylus" scoped>
.main-content-center{
    padding: 0.1rem;
    .van-col{
        margin-bottom 10px;
    }
    p{
        text-align center;font-size .14rem
    }
    img {
        width 100%
    }
}
</style>