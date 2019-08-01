<template>
    <section class="box-wrapper">
        <van-nav-bar
            title="我的报修"
            left-arrow
            fixed
            :z-index="999"
            @click-left="back($router)">
            <van-icon name="plus" slot="right" @click="$router.push('/repair/add')"/>
        </van-nav-bar>
        <section class="main-content">
            <van-sticky :offset-top="46">
                <van-dropdown-menu>
                    <van-dropdown-item title="报修类别" v-model="valueType" :options="repairType" @change="changeType"/>
                    <van-dropdown-item title="状态" ref="item" v-model="valueStatus" :options="disposeStatus" @change="changeState">
                    </van-dropdown-item>
                </van-dropdown-menu>
            </van-sticky>
            <section class="list-item">
                <van-pull-refresh v-model="repairList.refreshing" @refresh="onRefresh()">
                    <van-list
                        v-model="repairList.loading"
                        :error.sync="repairList.error"
                        :error-text="errorText"
                        :finished="repairList.finished"
                        :finished-text="finishedText"
                        :offset="offset"
                        @load="onLoad()"
                    >
                        <div class="item" v-for="(item, index) in repairList.list" :key="index" @click="detail(item)">
                            <van-row gutter="10">
                                <van-col span="18">
                                    <h4>{{item.repairsTitle}}</h4>
                                    <p>{{item.repairsTime}}</p>
                                </van-col>
                                <van-col span="6">
                                    <div class="state">{{item.repairsStatus}}</div>
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
    name: 'repairIndex',
    data() {
        return {
            valueType: 0,
            valueStatus: 0,
            offset: 200,
            finishedText: '没有更多了',
            errorText: '请求失败，点击重新加载',
            disposeStatus: [
                { text: '进行中', value: 0 },
                { text: '已完成', value: 1 }
            ]
        };
    },
    created(){
        this.$store.dispatch('getRepairType',{appMobile: this.userInfo.userInfo.mobileNumber})
    },
    activated(){
        if(this.repairList.reLoading) this.onRefresh()
    },
    methods: {
        onLoad(isRefresh, type, value) {
            setTimeout(() => {
                return new Promise ( async (resolve, reject) => {
                    this.repairList.page ++
                    if (isRefresh) {
                        this.repairList.list = []
                        this.repairList.page = 0
                    }
                    let params = {
                        appMobile: this.userInfo.userInfo.mobileNumber,
                        userId: this.userInfo.userInfo.userId,
                        page: isRefresh ? 1 : this.repairList.page,
                        pageSize: this.repairList.pageSize,
                        handerstatu : (type === 'state') ? value : 0
                    }
                    
                    if(type === 'type') params.workOrderType = value
                    await this.$store.dispatch('getRepairList', params)
                    resolve()
                })
            }, 500);
        },
        onRefresh () {
            setTimeout(() => {
                this.repairList.error = false
                this.repairList.finished = true
                this.repairList.refreshing = false
                this.repairList.reLoading = false
                this.onLoad(true);
            }, 500);
        },
        changeType(value) {
            this.onLoad(true, 'type', value)
        },
        changeState(value) {
            this.onLoad(true, 'state', value)
        },
        detail(item) {
            this.$router.push({
                path: '/repair/detail', 
                query: {
                    repairsId: item.repairsId,
                    piid: item.piid,
                    taskid: item.taskid,
                    jobid: item.jobid,
                    jbpmOutcomes: item.jbpmOutcomes
                }
            })
        }
    },
    computed: {
        ...mapGetters([
            'userInfo',
            'repairType',
            'repairList'
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

