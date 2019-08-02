<template>
    <section class="box-wrapper">
        <van-nav-bar
            title="报修详情"
            left-arrow
            fixed
            :z-index=999
            @click-left="back($router)">
            <span class="r-text" slot="right" @click="stepShow = true">进度</span>
        </van-nav-bar>
        <section class="main-content">
            <div class="complainList" v-if="list">
                <div class="handleList">
                    <van-row gutter="10">
                        <van-col span="4">
                            <div class="headFace"><img :src="`${repairInfo.UserInfo.userHearImageUrl ? 'smartxd/smartxd/' + repairInfo.UserInfo.userHearImageUrl : require('@/assets/img/avatar.png')}`" alt=""></div>
                        </van-col>
                        <van-col span="16">
                            <div class="userName">{{repairInfo.UserInfo.userName}}</div>
                            <p class="userLocation"><van-icon name="location" color="#1A6DBD"/>{{repairInfo.UserInfo.atProperty}}</p>
                        </van-col>
                        <van-col span="4">
                            <a :href="'tel:' + repairInfo.UserInfo.userMobileNo">
                                <van-icon name="phone" color="#1A6DBD" size="0.4rem"/>
                            </a>
                        </van-col>
                    </van-row>
                    <van-row gutter="10">
                        <van-col span="6">
                            <div>维修类型：</div>
                        </van-col>
                        <van-col span="18">
                            <div>{{repairInfo.jobDetailMap.repairsType}}</div>
                        </van-col>
                        <van-col span="6">
                            <div>维修地址：</div>
                        </van-col>
                        <van-col span="18">
                            <div>{{repairInfo.jobDetailMap.address}}</div>
                        </van-col>
                        <van-col span="6">
                            <div>上门时间：</div>
                        </van-col>
                        <van-col span="18">
                            <div>{{repairInfo.jobDetailMap.plandate}}</div>
                        </van-col>
                        <van-col span="6">
                            <div>最新进度：</div>
                        </van-col>
                        <van-col span="18">
                            <div>{{repairInfo.jobDetailMap.repairsStatus}}</div>
                        </van-col>
                        <van-col span="6">
                            <div>问题描述：</div>
                        </van-col>
                        <van-col span="18">
                            <div>{{repairInfo.jobDetailMap.problemdesc}}</div>
                            <div class="userComlainImg" @click="imgView(repairInfo.jobDetailMap.piclist)">
                                <van-row gutter="10">
                                    <van-col span="8" v-for="(item, index) in repairInfo.jobDetailMap.piclist" :key="index"><img :src="'/smartxd/smartxd/' + item.url" alt=""></van-col>
                                </van-row>
                            </div>
                            <p class="times">{{repairInfo.jobDetailMap.createTime}}</p>
                        </van-col>
                    </van-row>
                </div>
                <div class="handleList" v-for="(item, index) in repairInfo.Alllist" :key="index">
                    <van-row gutter="10" v-if="item.handleUser.name">
                        <van-col span="4">
                            <div class="headFace"><img :src="`${item.face ? 'smartxd/smartxd/' + item.face : require('@/assets/img/avatar.png')}`" alt=""></div>
                        </van-col>
                        <van-col span="16">
                            <div class="userName">{{item.handleUser.name}}</div>
                            <p class="userLocation">{{item.handleUser.department.name}}</p>
                        </van-col>
                        <van-col span="4" v-if="item.handleUser.mobile">
                            <a :href="'tel:' + item.handleUser.mobile">
                                <van-icon name="phone" color="#1A6DBD" size="0.4rem"/>
                            </a>
                        </van-col>
                    </van-row>
                    <van-row gutter="10">
                        <van-col span="24">
                            <div>{{item.Content}}</div>
                            <div class="userComlainImg" @click="imgView(item.pic)">
                                <van-row gutter="10">
                                    <van-col span="8" v-for="(img, index) in item.pic" :key="index"><img :src="'/smartxd/smartxd/' + img.url" alt=""></van-col>
                                </van-row>
                            </div>
                            <p class="times">{{item.time}}</p>
                        </van-col>
                    </van-row>
                </div>
                
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

            <!-- 接受价格 -->
            <div class="accpet" v-if="isAccept">
                <van-cell-group>
                    <van-field
                        v-model="repairInfo.jobDetailMap.mancost"
                        clearable
                        readonly
                        type="number"
                        label="人工费用"
                    />
                    <van-field
                        v-model="repairInfo.jobDetailMap.materialscost"
                        type="number"
                        clearable
                        readonly
                        label="材料费用"
                    />
                    <van-field
                        v-model="repairInfo.jobDetailMap.totalCost"
                        type="number"
                        readonly
                        label="共计费用"
                    />
                </van-cell-group>
                <div class="rectification mt10">
                    <van-row type="flex" justify="center">
                        <van-col span="6">
                            <van-button type="default" size="small" @click="subAccept('accept', 0)">拒绝费用</van-button>
                        </van-col>
                        <van-col span="6">
                            <van-button type="info" size="small" @click="subAccept('accept', 1)">接受费用</van-button>
                        </van-col>
                    </van-row>
                </div>
            </div>

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
                <div class="subBtn">
                    <van-row type="flex" justify="space-around">
                        <van-col span="8">
                            <van-button type="default" size="large" @click="subCommentCancle">取消</van-button>
                        </van-col>
                        <van-col span="8">
                            <van-button type="info" size="large" @click="subComment">提交</van-button>
                        </van-col>
                    </van-row>
                </div>
            </div>
            <div class="subBtn" @click="subPay" v-if="isShowPayBtn">
                <van-button type="info" size="large">评价</van-button>
            </div>
        </section>
    </section>
</template>
<script>
import axios from '@/utils/fetch'
import { mapGetters } from 'vuex'
import { ImagePreview } from 'vant'
export default {
    name: 'complaintDetail',
    components:{
        [ImagePreview.name]: ImagePreview
    },
    data() {
        return {
            stepShow: false,
            isAccept: false,
            isSure: false,
            isEvaluate: false,
            isPay: false,
            isShowPayBtn: false,
            grade: 5,
            commentContent: '',
            errorComment: '',
            isHandle: ''
        }
    },
    created() {
        this.$store.dispatch('getRepairSteps',{repairsId: this.$route.query.repairsId})
        this.$store.dispatch('getRepairInfo',{
            repairsId: this.$route.query.repairsId,
            userId: this.userInfo.userInfo.userId
        })
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
            this.isShowPayBtn = true
            //this.isEvaluate = true
        }else{
            this.list = true
        }
    },
    methods: {
        subComment(){
            if(this.commentContent){
                this.errorComment = ''
                let data = {
                    workOrderId : this.$route.query.repairsId,
                    appMobile: this.userInfo.userInfo.mobileNumber,
                    userId: this.userInfo.userInfo.userId,
                    outcome: '评价',
                    taskId: this.$route.query.taskid,
                    commentContent: this.commentContent,
                    commentLevel: this.grade
                }
                console.log(data)
                axios.post('owner/commentWorkOrder.action', data)
                    .then(res => {
                        this.$dialog.alert({
                            message: res.msg
                        }).then(() => {
                            this.repairList.reLoading = true
                            this.$router.push('/repair')
                        })
                    }
                ).catch(err => {
                    console.log(err)
                })
            } else {
                this.errorComment = '评价内容不能为空'
            }
        },
        subAccept(type,state){
            let data = {
                appMobile: this.userInfo.userInfo.mobileNumber,
                userId: this.userInfo.userInfo.userId,
                taskId: this.$route.query.taskid,
                workOrderId: this.$route.query.repairsId,
                accept: state,
                outcome: '是否接受价格'
            }
            axios.post('owner/acceptPrice.action', data)
                .then(res => {
                    console.log(res)
                    this.$dialog.alert({
                        message: res.msg
                    }).then(() => {
                        this.repairList.reLoading = true
                        this.$router.replace('/repair')
                    })
                }
            ).catch(err => {
                console.log(err)
            })
        },
        imgView(data){
            let datas = [] 
            data.forEach(item => {
                datas.push('/smartxd/smartxd/' + item.url)
            })
            ImagePreview(datas);
        },
        subCommentCancle(){
            this.isShowPayBtn = true
            this.isEvaluate = false
            this.list = true
        },
        subPay(){
            this.isShowPayBtn = false
            this.isEvaluate = true
            this.list = false
        }
    },
    computed: {
        ...mapGetters([
            'userInfo',
            'repairDetailSteps',
            'repairList',
            'repairInfo'
        ])
    }
}
</script>
<style lang="stylus" scoped>
.main-content{
    padding 46px 10px 10px
    .mt10{
        margin-top 10px
    }
    .complainList{
        margin-top 10px;line-height .25rem;font-size .14rem
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
        .userComlainImg{
            img{
                width 100%;max-height 1rem;margin-top 10px;
            }
        }
        .times{
            text-align right;font-size: .12rem;color #ccc
        }
        .handleList{
            padding 10px 0;
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
    .subBtn{
        margin-top 10px;
        .van-button--info{
            background-color #1A6DBD;
            border-color #1a6dbd
        }
    }
}
</style>

