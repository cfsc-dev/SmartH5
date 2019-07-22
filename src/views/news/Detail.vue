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
                <span><Icon name="iconview"></Icon>{{detail.reads}}</span>
                <span><Icon @click.native="thumbsUpEdit" name="iconzan" :class="{thumbsUp: detail.thumbsUp===1}"></Icon>{{detail.praises}}</span>
                <span><Icon @click.native="share" name="iconshare" ></Icon></span>
            </div>
        </section>
    </section>
</template>

<script>
    import axios from '@/utils/fetch'
    export default {
        name: "newsDetail",
        data(){
            return{
                zindex:999,
                height:0,
                detail:{},
            }
        },
        created(){
            console.log(this.$route.params.id)
            if(this.$route.params.id){
                this.getData()
            }else{
                this.$router.replace('/news')
            }
        },
        methods:{
            //获取最新动态详情
            getData(){
                let params={noticeId:this.$route.params.id}
                axios.get('/selectNotices.action',params).then(
                    res=>{
                        console.log(res)
                        this.detail=res.data
                    }
                ).catch(err=>{
                    console.log(err)
                })
            },
            //关注/取消关注
            thumbsUpEdit(){
                // let params={
                //     noticeId:this.$route.params.id
                // }
                // axios.post('/pointNumber.action',params).then(
                //     res=>{
                //         console.log(res)
                //     }
                // ).catch(
                //     err=>{
                //         console.log(err)
                //     }
                // )
                this.$set(this.detail,'thumbsUp',this.detail.thumbsUp===0?1:0)
                if(this.detail.thumbsUp===0){
                    this.$toast('取消点赞')
                }else{
                    this.$toast('点赞')
                }
            },
            //分享
            share(){
                this.$toast('分享');
            }

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
        float:right;
        margin:0 0 20px 0;
        span{
            margin:0.1rem;
            .thumbsUp{
                color: #1a6dbd;
            }
        }
        .icon{
            position:relative;
            font-size:20px;
            top:-2px;
            margin:0 5px;
        }
    }
</style>
