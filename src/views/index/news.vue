<template>
    <section class="main-content-center">
        <h4 class="active">社区活动</h4>
        <ul>
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
        </ul>
    </section>
</template>
<script>
    import { mapGetters } from 'vuex'
    export default {
        methods: {
            detail (id) {
                this.$router.push('/news/Detail/' + id)
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
