<template>
    <section class="box-wrapper">
        <van-nav-bar
            title="我的投诉"
            left-arrow
            fixed
            :z-index=zindex
            @click-left="back($router)">
            <van-icon name="plus" slot="right" @click="$router.push('/complaint/add')"/>
        </van-nav-bar>
        <section class="main-content">
            <van-sticky :offset-top="46">
                <van-dropdown-menu>
                    <van-dropdown-item title="投诉类别" v-model="valueType" :options="complainType" @change="changeType"/>
                    <van-dropdown-item title="状态" ref="item" v-model="valueStatus" :options="disposeStatus" @change="changeState">
                    </van-dropdown-item>
                </van-dropdown-menu>
            </van-sticky>
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
                        <div class="item" v-for="(item, index) in complainList.list" :key="index" @click="detail(item.complainId)">
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
    name: 'complaintIndex',
    data() {
        return {
            zindex: 999,
            valueType: 0,
            valueStatus: 0,
            offset: 200,
            finishedText: '没有更多了',
            errorText: '请求失败，点击重新加载',
            disposeStatus: [
                { text: '进行中', value: 1 },
                { text: '已完成', value: 2 }
            ]
        };
    },
    created(){
        this.$store.dispatch('getComplainType')
    },
    methods: {
        onLoad(isRefresh, type, value) {
            setTimeout(() => {
                return new Promise ( async (resolve, reject) => {
                    let params = {
                        userId: this.userInfo.userInfo.userId,
                        page: isRefresh ? 1 : this.complainList.page ++,
                        pageSize: this.complainList.pageSize,
                        disposeStatus : (type === 'state') ? value : 0
                    }
                    if (isRefresh) {
                        this.complainList.list = []
                        this.complainList.page = 0
                    }
                    if(type === 'type') params.complainTypeId = value
                    await this.$store.dispatch('getComplainList', params)
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
        },
        changeType(value) {
            this.onLoad(true, 'type', value)
        },
        changeState(value) {
            this.onLoad(true, 'state', value)
        },
        detail(id) {
            this.$router.push('/complaint/detail/' + id)
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
            line-height .26rem;
            font-size .16rem;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        }
        p{
            line-height .26rem;
            font-size .14rem;
            color #7d7e80;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        }
        .state{
            padding 10px;font-size .14rem
        }
    }
}

</style>

