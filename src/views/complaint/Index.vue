<template>
    <section class="box-wrapper">
        <van-nav-bar
            title="我的投诉"
            left-arrow
            fixed
            :z-index=zindex
            @click-left="back($router)"
        />
        <section class="main-content">
            <van-dropdown-menu>
                <van-dropdown-item title="投诉类别" v-model="valueType" :options="complainType" />
                <van-dropdown-item title="状态" ref="item" v-model="valueStatus" :options="disposeStatus">
                </van-dropdown-item>
            </van-dropdown-menu>
            <section class="list-item">
                <van-pull-refresh v-model="complainList.refreshing" @refresh="onRefresh()">
                    <van-list
                        v-model="complainList.loading"
                        :error.sync="complainList.error"
                        :error-text="errorText"
                        :finished="complainList.finished"
                        :finished-text="finishedText"
                        :offset="offset"
                        @load="onLoad()"
                    >
                        <div class="item" v-for="(item, index) in complainList.list" :key="index">
                            <van-row gutter="10">
                                <van-col span="18">
                                    <h4>{{item.complainTitle}}</h4>
                                    <p>{{item.complainDateTime}}</p>
                                </van-col>
                                <van-col span="6">
                                    <div class="state">{{item.complainStatus}}</div>
                                </van-col>
                            </van-row>
                        </div>
                    </van-list>
                </van-pull-refresh>
            </section>
        </section>
    </section>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            zindex: 999,
            valueType: 0,
            valueStatus: 1,
            offset: 200,
            finishedText: '没有更多了',
            errorText: '请求失败，点击重新加载',
            disposeStatus: [
                { text: '进行中', value: 0 },
                { text: '已完成', value: 2 }
            ]
        };
    },
    created(){
        this.$store.dispatch('getComplainType')
    },
    methods: {
        onLoad(isRefresh) {
            setTimeout(() => {
                return new Promise ( async (resolve, reject) => {
                    if (isRefresh) {
                        this.complainList.list = []
                        this.complainList.page = 0
                    } 
                    await this.$store.dispatch('getComplainList', {
                        userId: this.userInfo.userId,
                        page: isRefresh ? 1 : this.complainList.page ++,
                        pageSize: this.complainList.pageSize
                    })
                    resolve()
                })
            }, 500);
        },
        onRefresh () {
            setTimeout(() => {
                this.complainList.error = false
                this.complainList.finished = true
                this.complainList.refreshing = false
                this.onLoad(true);
            }, 500);
        }
    },
    computed: {
        ...mapGetters([
            'userInfo',
            'complainType',
            'complainList'
        ])
    }
}
</script>
<style lang="stylus" scoped>
.list-item{
    .item{
        padding 10px;position relative
        border-bottom 1px solid #f2f3f5
        h4{
            line-height 26px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        }
        p{
            line-height 26px;
            font-size 14px;
            color #7d7e80;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        }
        .state{
            padding 10px
        }
    }
}

</style>

