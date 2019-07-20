<template>
    <footer class="footer-wrapper">
        <van-tabbar
            v-model="active"
            active-color="#1A6DBD"
            inactive-color="#7d7e80"
        >
            <van-tabbar-item v-for="(item, index) in footerBarList" :key="index"
                :to="item.path"
                @click="skip(item.path)"
            >
                <Icon :name="item.icon" slot="icon" slot-scope="props" :class="props.active ? 'active' : ''"></Icon>
                {{item.title}}
            </van-tabbar-item>
        </van-tabbar>
    </footer>
</template>
<script>
    import { mapGetters } from 'vuex'
    export default {
        data () {
            return{
                active: 0
            }
        },
        methods: {
            skip (path) {
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
                'footerBarList'
            ])
        }
    }
</script>
<style lang="stylus" scoped>
</style>