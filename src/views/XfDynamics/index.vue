<template>
    <section class="box-wrapper">
        <van-nav-bar swipeable
            title="西府动态"
            left-arrow
            fixed
            :z-index=zindex
            @click-left="back($router)"
        />
        <section class="main-content">
            <van-tabs v-model="active" animated swipeable>
                <van-tab v-for="(tab,index) in xfTabTitleInfo" :title="tab.title" :key="index">
                    <div v-if="index === 0" :title="tab.refreshing">
                        <van-pull-refresh v-model="tab.refreshing" @refresh="onRefresh(index)">
                        <section class="swiper-box">
                            {{newsList.scope}}
                        </section>
                            </van-pull-refresh>
                    </div>
                    <div v-else>
                        {{tab.title}}
                    </div>
                </van-tab>
            </van-tabs>
        </section>

    </section>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      zindex: 999,
      active: 0,
      count: 0,
      isLoading: true
    }
  },
  created () {
    this.$store.dispatch('getHomeList')
  },
  methods: {
    onRefresh (index) {
      setTimeout(() => {
        this.xfTabTitleInfo[index].refreshing = false
      }, 500)
    }
  },
  computed: {
    ...mapGetters([
      'xfTabTitleInfo',
      'newsList'
    ])
  }
}
</script>
<style lang="stylus" scoped>
.wes-3 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
}
.df-sb {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.item {
    padding: 0.2rem 0.1rem;
    h4 {
        color: black;
        font-size: 0.16rem;
    }
    p {
        font-size: 0.16rem;
        line-height: 0.2rem;
        margin: 0.1rem 0;
    }
    .small-box {
        >* {
            display: inline-block;
            vertical-align: middle;
            font-size: 0.1rem;
            margin-right: 0.04rem;
            color: #999;
        }
    }
}
.item-l {
    width: 70%;
    padding-right: 10px;
}
.item-r {
    width: 30%;
    img {
        width: 100%;
    }
}
</style>
