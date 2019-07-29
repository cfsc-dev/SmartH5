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
            <div class="complainList" v-if="complainList">
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
                <van-row gutter="10">
                    <van-col span="6">
                        <div>投诉类型：</div>
                    </van-col>
                    <van-col span="18">
                        <div>不接</div>
                    </van-col>
                    <van-col span="6">
                        <div>紧急程度：</div>
                    </van-col>
                    <van-col span="18">
                        <div>速度快回复时快捷的回复水电费客户多少</div>
                    </van-col>
                    <van-col span="6">
                        <div>投诉内容：</div>
                    </van-col>
                    <van-col span="18">
                        <div>速度快回复时快捷的回复水电费客户多少</div>
                        <div class="userComlainImg" @click="imgView">
                            <van-row gutter="10">
                                <van-col span="8"><img :src="userInfo.userInfo.headImageUrl" alt=""></van-col>
                                <van-col span="8"><img :src="userInfo.userInfo.headImageUrl" alt=""></van-col>
                                <van-col span="8"><img :src="userInfo.userInfo.headImageUrl" alt=""></van-col>
                            </van-row>
                        </div>
                    </van-col>
                </van-row>
            </div>
            <!-- 进度 -->
            <van-popup
                v-model="stepShow"
                position="right"
                :duration=0.4
                :style="{ width: '70%', minHeight:'100vh' }">
                <van-steps direction="vertical" :active="complainDetailSteps.length - 1" active-color="#1A6DBD">
                    <van-step v-for="(item, index) in complainDetailSteps" :key="index">
                        <h4>{{item.planName}}</h4>
                        <p>{{item.planDateTime}}</p>
                    </van-step>
                </van-steps>
            </van-popup>
            <!-- 是否接受 -->
            <div class="accept mt10" v-if="isAccept">
                <van-row type="flex" justify="center">
                    <van-col span="6" @click="subAccept(0)">
                        <van-button type="default" size="small">不接受</van-button>
                    </van-col>
                    <van-col span="4" @click="subAccept(1)">
                        <van-button type="info" size="small">接受</van-button>
                    </van-col>
                </van-row>
            </div>
            <!-- 是否满意 -->
            <div class="satisfied mt10" v-if="isSatisfied">
                <van-row type="flex" justify="center">
                    <van-col span="6" @click="subSatisfied(0)">
                        <van-button type="default" size="small">不满意</van-button>
                    </van-col>
                    <van-col span="4" @click="subSatisfied(0)">
                        <van-button type="info" size="small">满意</van-button>
                    </van-col>
                </van-row>
            </div>
            <!-- 业主是否接受整改 -->
            <div class="rectification mt10" v-if="isRectification">
                <van-row type="flex" justify="center">
                    <van-col span="6" @click="subRectification(0)">
                        <van-button type="default" size="small">不接受</van-button>
                    </van-col>
                    <van-col span="4" @click="subRectification(0)">
                        <van-button type="info" size="small">接受</van-button>
                    </van-col>
                </van-row>
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
                <div class="subBtn" @click="subComment">
                    <van-button type="info" size="large">评价</van-button>
                </div>
            </div>
        </section>
    </section>
</template>
<script>
import {ImagePreview} from 'vant';
import { mapGetters } from 'vuex'
export default {
    name: 'complaintDetail',
    components:{
        [ImagePreview.name]: ImagePreview
    },
    data() {
        return {
            stepShow: false,
            isAccept: false,
            isSatisfied: false,
            isEvaluate: false,
            isRectification: false,
            complainList: false,
            grade: 5,
            commentContent: '',
            errorComment: '',
            isHandle:''
        }
    },
    created() {
        this.$store.dispatch('getComplainSteps',{complainId: this.$route.query.complainId})
        this.$store.dispatch('getComplainInfo',{complainId: this.$route.query.complainId})
        this.isHandle = this.$route.query.jbpmOutcomes
        if(this.isHandle && this.isHandle.indexOf('评价') > -1){
            this.isEvaluate = true
        }else if(this.isHandle && this.isHandle.indexOf('是否接受') > -1){
            this.isAccept = true
        }else if(this.isHandle && this.isHandle.indexOf('是否满意') > -1){
            this.isSatisfied = true
        }else if(this.isHandle && this.isHandle.indexOf('业主是否接受整改') > -1){
            this.isRectification = true
        }else{
            this.complainList = true
        }
    },
    methods: {
        subComment(){
            if(this.commentContent){
                this.errorComment = ''
                let data = {
                    complainid : this.$route.query.complainId,
                    ownerId: this.userInfo.userInfo.userId,
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
                            this.$router.push('/complaint')
                        })
                    }
                ).catch(err => {
                    console.log(err)
                })
            } else {
                this.errorComment = '评价内容不能为空'
            }
        },
        subClick(type,state){
            let data = {
                complainid : this.$route.query.complainId,
                ownerId: this.userInfo.userInfo.userId,
                outcome: '评价',
                taskId: this.$route.query.taskid
            }
            let action = type === 'accept' 
                ? 'owner/complains/customAcceptMeasureComplain.action' 
                : type === 'satisfied' 
                ? 'owner/complains/customIsSatisfactionSolutionComplain.action' 
                : type === 'rectification' ? 'owner/complains/customIsAcceptSolutionComplain.action' : ''
            if(type === 'accept'){
                data.accept = state
            }else if(type === 'satisfied'){
                data.satisfaction = state
            }
            console.log(data)
            if(action) {
                axios.post(action, data)
                    .then(res => {
                        this.$dialog.alert({
                            message: res.msg
                        }).then(() => {
                            this.$router.push('/complaint')
                        })
                    }
                ).catch(err => {
                    console.log(err)
                })
            }
        },
        imgView(){
            ImagePreview([
                'http://222.240.37.83:9082/smartxd/upload/ownerFace/201907241709597576_4541.png',
                'http://222.240.37.83:9082/smartxd/upload/ownerFace/201907241709597576_4541.png'
            ]);
        }
    },
    computed: {
        ...mapGetters([
            'userInfo',
            'complainDetailSteps',
            'complainInfo'
        ])
    }
}
</script>
<style lang="stylus" scoped>
.box-wrapper{
    background-color #f0f0f0
    .main-content{
        padding 46px 10px 10px
        .mt10{
            margin-top 10px
        }
        .van-cell-group{
            margin-top 10px;
        }
        .subBtn{
            margin-top 10px;
            .van-button--info{
                background-color #1A6DBD;
                border-color #1a6dbd
            }
        }
        .complainList{
            margin-top 10px;line-height .24rem;font-size .16rem
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
                    width 100%;max-height 1rem
                }
            }
        }
        .van-step__title{
            h4{
                font-size 14px;
            }
            p{
                font-size 12px
            }
        }
    }
}

</style>

