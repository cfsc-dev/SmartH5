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
            <div class="complainList" v-if="list">
                <div class="handleList">
                    <van-row gutter="10">
                        <van-col span="4">
                            <div class="headFace"><img :src="`${complainInfo.UserInfo.userHearImageUrl ? 'smartxd/smartxd/' + complainInfo.UserInfo.userHearImageUrl : require('@/assets/img/avatar.png')}`" alt=""></div>
                        </van-col>
                        <van-col span="16">
                            <div class="userName">{{complainInfo.UserInfo.userName}}</div>
                            <p class="userLocation"><van-icon name="location" color="#1A6DBD"/>{{complainInfo.UserInfo.atProperty}}</p>
                        </van-col>
                        <van-col span="4">
                            <a :href="'tel:' + complainInfo.UserInfo.userMobileNo">
                                <van-icon name="phone" color="#1A6DBD" size="0.4rem"/>
                            </a>
                        </van-col>
                    </van-row>
                    <van-row gutter="10">
                        <van-col span="6">
                            <div>投诉类型：</div>
                        </van-col>
                        <van-col span="18">
                            <div>{{complainInfo.complainMap.complainType ? complainInfo.complainMap.complainType : '无'}}</div>
                        </van-col>
                        <van-col span="6">
                            <div>紧急程度：</div>
                        </van-col>
                        <van-col span="18">
                            <div>{{filterEmerg ? filterEmerg : '无'}}</div>
                        </van-col>
                        <van-col span="6">
                            <div>最新进度：</div>
                        </van-col>
                        <van-col span="18">
                            <div>{{complainInfo.complainMap.complainStatus}}</div>
                        </van-col>
                        <van-col span="6">
                            <div>投诉内容：</div>
                        </van-col>
                        <van-col span="18">
                            <div>{{complainInfo.complainMap.content}}</div>
                            <div class="userComlainImg" @click="imgView(complainInfo.complainMap.complainImageUrlList)">
                                <van-row gutter="10">
                                    <van-col span="8" v-for="(item, index) in complainInfo.complainMap.complainImageUrlList" :key="index"><img :src="'/smartxd/smartxd/' + item.url" alt=""></van-col>
                                </van-row>
                            </div>
                            <p class="times">{{complainInfo.complainMap.complainDateTime}}</p>
                        </van-col>
                    </van-row>
                </div>
                <div class="handleList" v-for="(item, index) in complainInfo.Alllist" :key="index">
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
                <van-steps direction="vertical" :active="complainDetailSteps.length - 1" active-color="#1A6DBD">
                    <van-step v-for="(item, index) in complainDetailSteps" :key="index">
                        <h4>{{item.planName}}</h4>
                        <p>{{item.planDateTime}}</p>
                    </van-step>
                </van-steps>
            </van-popup>
            <!-- 是否接受填写方案 -->
            <div class="accept mt10" v-if="isAccept">
                <van-row type="flex" justify="center">
                    <van-col span="6">
                        <van-button type="default" size="small" @click="subClick('accept', 0)">拒绝方案</van-button>
                    </van-col>
                    <van-col span="6">
                        <van-button type="info" size="small" @click="subClick('accept', 1)">接受方案</van-button>
                    </van-col>
                </van-row>
            </div>
            <!-- 是否满意 -->
            <div class="satisfied mt10" v-if="isSatisfied">
                <van-row type="flex" justify="center">
                    <van-col span="6">
                        <van-button type="default" size="small" @click="subClick('satisfied', 0)">不满意</van-button>
                    </van-col>
                    <van-col span="4">
                        <van-button type="info" size="small" @click="subClick('satisfied', 1)">满意</van-button>
                    </van-col>
                </van-row>
            </div>
            <!-- 业主是否接受整改 -->
            <div class="rectification mt10" v-if="isRectification">
                <van-row type="flex" justify="center">
                    <van-col span="6">
                        <van-button type="default" size="small" @click="subClick('rectification', 0)">拒绝整改</van-button>
                    </van-col>
                    <van-col span="6">
                        <van-button type="info" size="small" @click="subClick('rectification', 1)">接受整改</van-button>
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
            isSatisfied: false,
            isEvaluate: false,
            isRectification: false,
            list: false,
            grade: 5,
            commentContent: '',
            errorComment: '',
            isHandle: ''
        }
    },
    created() {
        this.$store.dispatch('getComplainSteps',{complainId: this.$route.query.complainId})
        this.$store.dispatch('getComplainInfo',{complainId: this.$route.query.complainId})
        this.isHandle = this.$route.query.jbpmOutcomes
        if(this.isHandle && this.isHandle.indexOf('评价') > -1){
            this.list = false
            this.isEvaluate = true
        }else if(this.isHandle && this.isHandle.indexOf('是否接受') > -1){
            this.list = true
            this.isAccept = true
        }else if(this.isHandle && this.isHandle.indexOf('是否满意') > -1){
            this.list = true
            this.isSatisfied = true
        }else if(this.isHandle && this.isHandle.indexOf('业主是否接受整改') > -1){
            this.list = true
            this.isRectification = true
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
        },
        subClick(type,state){
            let data = {
                appMobile: this.userInfo.userInfo.mobileNumber,
                complainid : this.$route.query.complainId,
                ownerId: this.userInfo.userInfo.userId,
                taskId: this.$route.query.taskid,
                piid: this.$route.query.piid
            }
            let action = type === 'accept' 
                ? 'owner/complains/customIsAcceptSolutionComplain.action' 
                : type === 'satisfied' 
                ? 'owner/complains/customIsSatisfactionSolutionComplain.action' 
                : type === 'rectification' ? 'owner/complains/customAcceptMeasureComplain.action' : ''
            if(type === 'accept'){
                data.outcome = '是否接受'
                data.accept = state
            }else if(type === 'satisfied'){
                data.outcome = '是否满意'
                data.satisfaction = state
            }else if(type === 'rectification'){
                data.outcome = '业主是否接受整改'
                data.accept = state
            }
            console.log(data)
            if(action) {
                axios.post(action, data)
                    .then(res => {
                        console.log(res)
                        if(res.resultCode === '0'){
                            this.$dialog.alert({
                                message: res.msg
                            }).then(() => {
                                if(type === 'satisfied' && data.satisfaction === 1){
                                    this.list = false
                                    this.isEvaluate = true
                                }else{
                                    this.complainList.reLoading = true
                                    this.$router.replace('/complaint')
                                }
                            })
                        }
                    }
                ).catch(err => {
                    console.log(err)
                })
            }
        },
        imgView(data){
            let datas = [] 
            data.forEach(item => {
                datas.push('/smartxd/smartxd/' + item.url)
            })
            ImagePreview(datas);
        }
    },
    computed: {
        ...mapGetters([
            'userInfo',
            'complainDetailSteps',
            'complainInfo',
            'complainEmerg',
            'complainList'
        ]),
        filterEmerg(){
            return this.complainInfo.complainMap.emerg === 1 ?  '非常紧急' :
                        this.complainInfo.complainMap.emerg === 2 ?  '紧急' :
                        this.complainInfo.complainMap.emerg === 3 ?  '一般' :
                        this.complainInfo.complainMap.emerg ===  4 ?  '低' : '可以忽略'
        }
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
            }
        }
    }
}

</style>

