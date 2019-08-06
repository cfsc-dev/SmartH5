<template>
    <section class="main-content-center">
        <h4 class="active">社区活动</h4>
        <div class="scroll">
            <div class="panel" @click="detail()">
                <img :src="`${require('@/assets/img/1.jpg')}`" alt="">
                <div class="panel-info">
                    <h4>暑期大礼包，消暑冰点折扣</h4>
                    <p>地址：长房云西府物业活动大厅</p>
                    <p>报名截止：2019年08月20日</p>
                    <p class="join"><span>去参加</span></p>
                </div>
            </div>
            <div class="panel">
                <img :src="`${require('@/assets/img/1.jpg')}`" alt="">
                <div class="panel-info">
                    <h4>暑期大礼包，消暑冰点折扣</h4>
                    <p>地址：长房云西府物业活动大厅</p>
                    <p>报名截止：2019年08月20日</p>
                    <p class="join"><span>去参加</span></p>
                </div>
            </div>
            <div class="panel">
                <img :src="`${require('@/assets/img/1.jpg')}`" alt="">
                <div class="panel-info">
                    <h4>暑期大礼包，消暑冰点折扣</h4>
                    <p>地址：长房云西府物业活动大厅</p>
                    <p>报名截止：2019年08月20日</p>
                    <p class="join"><span>去参加</span></p>
                </div>
            </div>
            <div class="panel">
                <img :src="`${require('@/assets/img/1.jpg')}`" alt="">
                <div class="panel-info">
                    <h4>暑期大礼包，消暑冰点折扣</h4>
                    <p>地址：长房云西府物业活动大厅</p>
                    <p>报名截止：2019年08月20日</p>
                    <p class="join"><span>去参加</span></p>
                </div>
            </div>
        </div>
        <!-- <ul>
            <li v-for="(item, index) in filteredItems" @click="detail(item.noticeId)" class="item" :key="index">
                <van-row gutter="10">
                    <van-col span="7">
                        <img :src="`${item.noticeImgUrl ? item.noticeImgUrl : require('@/assets/img/no-img.png')}`" alt="">
                    </van-col>
                    <van-col span="17">
                        <h4>{{item.title}}</h4>
                        <p>{{item.remark}}</p>
                    </van-col>
                </van-row>
            </li>
        </ul> -->
    </section>
</template>
<script>
    import { mapGetters } from 'vuex'
    export default {
        methods: {
            detail () {
                this.$router.push('/active/Detail')
            }
        },
        created () {
            this.$store.dispatch('getHomeList', {
                id: 0,
                receive: 1,
                currentPage: 1,
                projectid: 0,
                pageSize: this.xfTabTitleInfo[0].pageSize
            })
        },
        computed: {
            ...mapGetters([
                'xfTabTitleInfo'
            ]),
            filteredItems: function () {
                return this.xfTabTitleInfo[0].newsList.slice(0, 3)
            }
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
        overflow: hidden;height 2.35rem;
        overflow-x: scroll;
        display: -webkit-box;display: -ms-flexbox;display: flex;
        -webkit-flex-wrap: nowrap;-ms-flex-wrap:nowrap;flex-wrap:nowrap
        -webkit-overflow-scrolling:touch;
        .panel{
            background-color #fff;
            border-radius 5px;
            margin-top 10px;
            font-size .14rem;
            width 50%;padding 0 5px;
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
                }
            }
            img{
                width 100%;
                max-height 1.3rem;
                display block
            }
        }
    }
    .item {
        padding: 0.1rem 0;
        h4 {
            color: black;
            font-size: 0.16rem;
            word-break: break-all;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
        }
        p {
            font-size: 0.16rem;
            line-height: 0.2rem;
            margin: 0.05rem 0;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        }
        img {
            width: 100%;height .58rem
        }
    }
}
</style>
