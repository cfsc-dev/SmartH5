<template>
    <section class="box-wrapper">
        <van-nav-bar
            title="最新动态"
            left-arrow
            fixed
            :z-index=zindex
            @click-left="back($router)"
        />
        <section class="main-content">
            <van-tabs v-model="active" swipeable>
                <van-tab v-for="(tab, index) in xfTabTitleInfo" :title="tab.title" :key="index">
                    <van-pull-refresh v-model="tab.refreshing" @refresh="onRefresh(index)">
                        <van-list
                            v-model="tab.loading"
                            :error.sync="tab.error"
                            :error-text="errorText"
                            :finished="tab.finished"
                            :finished-text="finishedText"
                            :offset="offset"
                            @load="onLoad(index)"
                        >
                            <ul>
                                <li v-for="(item, index) in tab.newsList" @click="detail(item.noticeId)" class="item" :key="index">
                                    <van-row gutter="10">
                                        <van-col span="16">
                                            <h4>{{item.title}}</h4>
                                            <p>{{item.remark}}</p>
                                        </van-col>
                                        <van-col span="8">
                                            <img :src="`${item.noticeImgUrl ? 'smartxd/smartxd/' + item.noticeImgUrl : require('@/assets/img/no-img.png')}`" alt="">
                                        </van-col>
                                    </van-row>
                                </li>
                            </ul>
                        </van-list>
                    </van-pull-refresh>
                </van-tab>
            </van-tabs>
        </section>

    </section>
</template>
<script>
    import { mapGetters } from 'vuex'
    export default {
        data() {
            return {
                zindex: 999,
                active: 0,
                offset: 150,
                finishedText: '没有更多了',
                errorText: '请求失败，点击重新加载'
            };
        },
        methods: {
            onLoad (index, isRefresh) {
                setTimeout(() => {
                    this.xfTabTitleInfo[index].currentPage ++
                    if (isRefresh) {
                        this.xfTabTitleInfo[index].newsList = []
                        this.xfTabTitleInfo[index].currentPage = 0
                    } 
                    return new Promise ( async (resolve, reject) => {
                        await this.$store.dispatch('getHomeList', {
                            id: index,
                            receive: 1,
                            currentPage: isRefresh ? 1 : this.xfTabTitleInfo[index].currentPage,
                            projectid: 0,
                            pageSize: this.xfTabTitleInfo[index].pageSize
                        })
                        resolve()
                    })
                }, 500);
            },
            onRefresh (index) {
                setTimeout(() => {
                    this.xfTabTitleInfo[index].error = false
                    this.xfTabTitleInfo[index].finished = true
                    this.xfTabTitleInfo[index].refreshing = false
                    this.onLoad(index, true);
                }, 500);
            },
            detail (id) {
                this.$router.push('/news/Detail/' + id)
            }
        },
        computed: {
            ...mapGetters([
                'xfTabTitleInfo'
            ])
        }
    }
</script>
<style lang="stylus" scoped>
.box-wrapper{
    .van-list{
        min-height 100vh
    }
}

.item {
    padding: 0.2rem 0.1rem;
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
</style>
