<template>
    <section class="box-wrapper">
        <van-nav-bar swipeable
                     title="最新动态"
                     left-arrow
                     fixed
                     :z-index=zindex
                     @click-left="back($router)"
        />
        <section class="main-content">
            <div class="detail-title">{{detail.title}} </div>
            <div class="detail-publish">
                <span v-text="detail.publisherName"></span>
                <span v-text="detail.publishTime"></span>
            </div>
            <div v-html="detail.content" class="detail-content"></div>
            <div class="detail-action">
                <span v-show="detail.resources" @click="showAppendix">查看附件</span>
                <span v-if="showShareButton"><Icon @click.native="share" name="iconshare" ></Icon></span>
                <span><Icon @click.native="thumbsUpEdit" name="iconzan" :class="{thumbsUp: detail.praises===1}"></Icon>{{detail.upNO}}</span>
                <span><Icon name="iconview"></Icon>{{detail.reads}}</span>
            </div>
        </section>
    </section>
</template>

<script>
    import axios from '@/utils/fetch'
    import weixin from '@/utils/weixinHelper'
    import {mapGetters} from 'vuex'
    export default {
        name: "newsDetail",
        data(){
            return{
                zindex:999,
                showShareButton:false,
                detail:{},
            }
        },
        created(){
            if(this.$route.params.id){
                this.getData()
            }else{
                this.$router.replace('/news')
            }
            //判断是否App打开，App打开则放开分享按钮
            let ua=navigator.userAgent
            if(/smart_android/i.test(ua)||/smart_ios/i.test(ua)){
                this.showShareButton=true
            }else{
                this.showShareButton=false
            }
        },
        computed:{
          ...mapGetters(['isAuth','userInfo'])
        },
        methods:{
            //获取最新动态详情
            getData(){
                let params={noticeId:this.$route.params.id}
                let action
                if(this.isAuth === 'tel'){
                    params.ownerId=this.userInfo.userInfo.userId
                    action='selectNotices.action'
                }else{
                    action='selectNoticesVisitor.action'
                }
                axios.get(action,params).then(
                    res=>{
                        console.log(res)
                        this.detail=res.data
                        weixin.share({title:this.detail.title,
                            desc:this.detail.remark,
                            link:`http://fe5p3s.natappfree.cc/share.html?url=news/detail/${this.$route.params.id}`,
                            imgUrl:`http://fe5p3s.natappfree.cc/${this.detail.noticeImgUrl}`})
                    }
                ).catch(err=>{
                    console.log(err)
                })
            },
            //跳转到附件
            showAppendix(){
                this.$router.push({name:'附件', params:{ fileList:this.detail.resourceList }})
            },
            //关注/取消关注
            thumbsUpEdit(){
                if(this.isAuth === 'tel'){
                    let params={
                        noticeId:this.$route.params.id,
                        ownerId:this.userInfo.userInfo.userId
                    }
                    let action=this.detail.praises===0?'NoticesUp.action':'deleteNoticesUp.action'
                    axios.post(action,params).then(
                        res=>{
                            console.log(res)
                            this.$set(this.detail,'upNO',this.detail.praises===0?this.detail.upNO+1:this.detail.upNO-1)
                            this.$set(this.detail,'praises',this.detail.praises===0?1:0)
                        }
                    ).catch(
                        err=>{
                            console.log(err)
                        }
                    )

                }else{
                    this.$dialog.confirm({
                        message: '请先绑定用户信息'
                    }).then(() => {
                        this.$router.push('/auth/getLoginInfo')
                    }).catch(()=>{

                    })
                }
            },
            //分享
            share(){
                this.$toast('待开发');this.$toast('待开发');
            }

        },
        beforeRouteLeave(to, from, next) {
            this.$router.animate = 2
            next();
        }
    }
</script>

<style lang="stylus" scoped>
    .detail-title{
        font-size: 0.2rem;
        padding: 0.1rem;
    }
    .detail-publish{
        padding: 0.1rem;
        span:first-child{
            float: left;
            color:#1a6dbd;
        }
        span:last-child{
            float right;
        }
    }
    .detail-content{
        margin: 0.2rem 0.1rem;
    }
    .detail-action{
        margin:0 0 20px 0;
        span{
            float:right;
            margin:0.1rem;
            .thumbsUp{
                color: #1a6dbd;
            }
        }
        span:first-child{
            color:#1a6dbd;
            float: left;
        }
        .icon{
            position:relative;
            font-size:20px;
            /*top:-2px;*/
            margin:0 5px;
        }
    }
</style>
