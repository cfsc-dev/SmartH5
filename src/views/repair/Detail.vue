<template>
    <section class="box-wrapper">
        <van-nav-bar
            title="投诉详情"
            left-arrow
            fixed
            :z-index=999
            @click-left="back($router)">
            <span class="r-text" slot="right" @click="stepShow = true">进度</span>
        </van-nav-bar>
        <section class="main-content">
            <div class="complainList">
                <van-row gutter="10">
                    <van-col span="4">
                        <div class="headFace"><img :src="userInfo.userInfo.headImageUrl" alt=""></div>
                    </van-col>
                    <van-col span="16">
                        <div class="userName">业主5</div>
                        <p class="userLocation"><van-icon name="location" color="#1A6DBD"/>一栋一单元</p>
                    </van-col>
                    <van-col span="4">
                        <a :href="'tel:' + userInfo.userInfo.mobileNumber">
                            <van-icon name="phone" color="#1A6DBD" size="0.4rem"/>
                        </a>
                    </van-col>
                </van-row>
            </div>
            <!-- 进度 -->
            <van-popup
                v-model="stepShow"
                position="right"
                :duration=0.4
                :style="{ width: '70%', minHeight:'100vh' }">
                <van-steps direction="vertical" :active="repairDetailSteps.length - 1" active-color="#1A6DBD">
                    <van-step v-for="(item, index) in repairDetailSteps" :key="index">
                        <h4>{{item.planName}}</h4>
                        <p>{{item.remark}}</p>
                        <p class="ptime">{{item.planDateTime}}</p>
                    </van-step>
                </van-steps>
            </van-popup>

            <!-- 评价 -->
            <div class="comment" v-if="isEvaluate">
                <van-cell-group>
                    <van-cell title="评分" icon="star">
                        <template slot="default">
                            <van-rate v-model="grade" gutter="8px"/>
                        </template>
                    </van-cell>
                </van-cell-group>
                <van-cell-group>
                    <van-field
                        v-model="commentContent"
                        label="评价"
                        required
                        type="textarea"
                        left-icon="comment"
                        placeholder="请说下您的想法吧!"
                        :error-message="errorComment"
                        clearable
                        rows="2"
                        autosize
                    />
                </van-cell-group>
                <div class="subBtn" @click="subComment">
                    <van-button type="info" size="large">评价</van-button>
                </div>
            </div>
        </section>
    </section>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name: 'complaintDetail',
    data() {
        return {
            stepShow: false,
            isAccept: false,
            isSure: false,
            isEvaluate: false,
            isPay: false,
            grade: 5,
            commentContent: '',
            errorComment: '',
            isHandle: ''
        }
    },
    created() {
        this.$store.dispatch('getRepairSteps',{repairsId: this.$route.query.repairsId})
        this.isHandle = this.$route.query.jbpmOutcomes
        if(this.isHandle && this.isHandle.indexOf('评价') > -1){
            this.list = false
            this.isEvaluate = true
        }else if(this.isHandle && this.isHandle.indexOf('是否接受价格') > -1){
            this.list = true
            this.isAccept = true
        }else if(this.isHandle && this.isHandle.indexOf('客户确认') > -1){
            this.list = true
            this.isSure = true
        }else if(this.isHandle && this.isHandle.indexOf('客户付费') > -1){
            this.list = true
            this.isPay = true
        }else{
            this.list = true
        }
    },
    methods: {
        subComment(){
            if(this.commentContent){
                this.errorComment = ''
                let data = {
                    complainid : this.$route.query.complainId,
                    userId: this.userInfo.userInfo.userId,
                    outcome: '评价',
                    taskId: this.$route.query.taskid,
                    commentContent: this.commentContent,
                    commentLevel: this.grade
                }
                console.log(data)
                axios.post('owner/complains/customCommentComplain.action', data)
                    .then(res => {
                        this.$dialog.alert({
                            message: res.msg
                        }).then(() => {
                            this.complainList.reLoading = true
                            this.$router.replace('/complaint')
                        })
                    }
                ).catch(err => {
                    console.log(err)
                })
            } else {
                this.errorComment = '评价内容不能为空'
            }
        }
    },
    computed: {
        ...mapGetters([
            'userInfo',
            'repairDetailSteps'
        ])
    }
}
</script>
<style lang="stylus" scoped>
.main-content{
    padding 46px 10px 10px
    .complainList{
        margin-top 10px;line-height .24rem
        .headFace{
            img{
                width .5rem;
                height .5rem;
                border-radius 50%
            }
        }
        .userName{
            font-size .16rem
        }
        .userLocation{
            font-size .14rem;color #1A6DBD
        }
    }
    .van-step__title{
        h4{
            font-size 14px;
        }
        p{
            font-size 12px
            &.ptime{
                color #969799
            }
        }
    }
}
</style>

