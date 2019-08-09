<template>
    <section class="main-content-center">
        <h4 class="active">社区活动</h4>
        <div class="scroll">
            <div class="panel" v-for="(item, index) in activeList" :key="index" @click="detail(item.id)">
                <img :src="`${item.pic ? item.pic : require('@/assets/img/1.jpg')}`" alt="">
                <div class="panel-info">
                    <h4>{{item.title}}</h4>
                    <p>地址：{{item.location}}</p>
                    <p>报名截止：{{item.expiry}}</p>
                    <p class="join" :class="[item.userId  ? 'isActive' : '']"><span disabled>{{item.userId ? '已报名' : '去参加'}}</span></p>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
    import { mapGetters } from 'vuex'
    export default {
        name: 'indexActiveList',
        methods: {
            detail (id) {
                this.$router.push('/active/Detail/' + id)
            }
        },
        created () {
            this.$store.dispatch('queryActiveList',{
                userId: this.userInfo.userInfo.userId,
                currentPage: 0,
                pageSize: 4
            })
        },
        computed: {
            ...mapGetters([
                'userInfo',
                'activeList'
            ])
        }
    }
</script>
<style lang="stylus" scoped>
.main-content-center{
    padding: 0.1rem;
    .active{
        border-left 4px solid #1A6DBD;
        text-indent 4px;
        height 20px;
        line-height @height;
    }
    .scroll::-webkit-scrollbar{
        display:none
    }
    .scroll{
        overflow: hidden;
        overflow-x: scroll;
        display: -webkit-box;display: -ms-flexbox;display: flex;
        -webkit-flex-wrap: nowrap;-ms-flex-wrap:nowrap;flex-wrap:nowrap
        -webkit-overflow-scrolling:touch;
        .panel{
            background-color #fff;
            border-radius 5px;
            margin-top 10px;
            font-size .14rem;
            -ms-flex-negative:0;flex-shrink:0;
            width 50%;
            padding 0 5px;
            -webkit-box-sizing:border-box;box-sizing:border-box
            .panel-info{
                padding 5px;
                h4{
                    text-overflow: ellipsis;line-height .26rem;
                    overflow: hidden;white-space: nowrap;
                }
                p{
                    color #BBBBBB;margin-top 5px;
                    &.join{
                        text-align center
                        span{
                            border 1px solid #5B6DFD;
                            color: #5B6DFD;
                            border-radius 8px;
                            padding 1px 10px;
                        }                        
                    }
                    &.isActive span{
                        color #BBBBBB
                        border 1px solid #BBBBBB;
                    }
                }
            }
            img{
                width 100%;
                height 1rem;
                display block
            }
        }
    }
}
</style>
