<template>
    <section class="box-wrapper">
        <van-nav-bar
            :title="title"
            left-arrow
            fixed
            :z-index=zindex
            @click-left="back($router)"
        />
        <section class="main-content">
            <van-grid :column-num="3" :border="false">
                <van-grid-item v-for="item in payCategory" @click="itemClick(item)">
                    <div class="_content-item-icon"><Icon :name="item.icon"></Icon></div>
                    <div class="_content-item-text">{{item.title}}</div>
                </van-grid-item>
            </van-grid>
        </section>
    </section>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
        name: "PayIndex",
        data(){
            return{
                title:'生活缴费',
                zindex:999,
            }
        },
        computed:{
            ...mapGetters(['payCategory'])
        },
        methods:{
            itemClick(item){
                if(item.path!==''){
                    this.$router.push(item.path)
                }else{
                    this.$dialog.alert({
                        message: '该功能暂未开放，敬请期待'
                    })
                }
            },
        }
    }
</script>

<style lang="stylus" scoped>
    ._content-item-icon{
        width:60px;
        height:60px;
        border-radius:30px;
        background: #07c160;
        text-align:center;
        color:#ffffff;
        .icon {
            font-size: 30px;
            margin-top: 15px;
        }
    }
    ._content-item-text{
        margin-top:10px;
    }
</style>
