<template>
    <section class="box-wrapper">
        <van-nav-bar
            title="活动详情"
            left-arrow
            fixed
            :z-index=999
            @click-left="back($router)"
        />
        <section class="main-content">
            <h3 class="title">{{detail.title}}</h3>
            <van-cell-group>
                <van-field
                    v-model="detail.startTime"
                    readonly
                    label="开始时间:"
                />
                <van-field
                    v-model="detail.endTime"
                    readonly
                    label="结束时间:"
                />
                <van-field
                    v-model="detail.location"
                    readonly
                    label="活动地点:"
                />
                <van-field
                    v-model="detail.nums"
                    readonly
                    label="参加人数:"
                />
                <van-field
                    v-model="detail.cost"
                    readonly
                    label="活动费用:"
                />
                <van-field
                    v-model="detail.contact"
                    readonly
                    label="联系人:"
                />
                <van-field
                    v-model="detail.tel"
                    readonly
                    label="联系电话:"
                />
                 <van-field
                    v-model="detail.expiry"
                    readonly
                    label="报名截止:"
                />
                <van-field
                    v-model="detail.content"
                    label="活动详情:"
                    readonly
                    type="textarea"
                    rows="2"
                    autosize
                />
            </van-cell-group>
            <div class="subBtn">
                <van-button type="info" size="large" @click="subInfo(detail.userId)">
                    {{detail.userId ? '取消报名' : '报名参加'}}
                </van-button>
            </div>
        </section>
    </section>
</template>
<script>
import axios from '@/utils/fetch'
import { mapGetters } from 'vuex'
export default {
    name: "activeDetail",
    data() {
        return {
            detail:{}
        }
    },
    created() {
        this.detail = {}
        axios.post('active/queryActive.action',{
            id: this.$route.params.id,
            userId: this.userInfo.userInfo.userId
        }).then(res => {
            if(res.data.id){
                this.detail = res.data
            }
        }).catch(err => {
            console.log(err)
        })
    },
    methods: {
        subInfo(userid){
            if(userid){
                this.$dialog.confirm({
                    message: '您确定取消该活动的报名？'
                }).then(() => {
                    axios.post('active/subActiveInfo.action',{
                        activeId: this.$route.params.id,
                        userId: this.userInfo.userInfo.userId
                    }).then(res => {
                        if(res.resultCode === '0'){
                            this.$dialog.alert({
                                message: res.msg
                            }).then(() => {
                                this.$store.dispatch('queryActiveList',{
                                    userId: this.userInfo.userInfo.userId,
                                    currentPage: 0,
                                    pageSize: 4
                                })
                                this.$router.go(-1)
                            })
                        }else{
                            this.$toast(res.msg)
                        }
                        console.log(res)
                    }).catch(err=>{
                        console.log(err)
                    })
                }).catch(() => {
                })
            }else{
                this.$router.push('/active/sub/' + this.$route.params.id)
            }
        }
        
    },
    beforeRouteLeave(to, from, next) {
        this.$router.animate = 2
        next();
    },
    computed: {
        ...mapGetters([
            'userInfo'
        ]),
    }
}
</script>
<style lang="stylus" scoped>
.box-wrapper{
    background:#f0f0f0;
    .main-content{
        padding 46px 10px 10px
        .title{
            text-align center;font-size .18rem;padding 10px 0
        }
        .subBtn{
            margin-top 10px;
            .van-button--info{
                background-color #1A6DBD;
                border-color #1a6dbd
            }
        }
    }
}
</style>


