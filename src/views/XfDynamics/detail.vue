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
            <div class="detail-content">
                我是详情
            </div>
            <div class="detail-action">
                <span><Icon name="iconview"></Icon>{{detail.reads}}</span>
                <span><Icon @click.native="thumbsUpEdit" :name="detail.thumbsUp===1?'iconzanpress':'iconzannormal'"></Icon>{{detail.praises}}</span>
                <span><Icon @click.native="share" name="iconshare" ></Icon></span>
            </div>
        </section>
    </section>
</template>

<script>
    import axios from '@/utils/fetch'
    export default {
        name: "detail",
        data(){
            return{
                zindex:999,
                height:0,
                detail:{
                    "noticeId":23,
                    "title":"中国房地产百强企业-长房集团",
                    "content":null,
                    "publishTime":"2019-07-01 10:06:37",
                    "publisherName":"测试更新",
                    "publisher":1,
                    "upNO":0,
                    "readedNO":0,
                    "detailUrl":"/upload/notice_html/html/20190531/171516.html",
                    "coverImgUrl":null,
                    "remark":"中国房地产百强企业-长房集团",
                    "receive":1,
                    "noticeImgUrl":"upload/notice_html/image/20190531/20190531171450_257.png",
                    "praises":1,
                    "reads":31,
                    "projectid":null,
                    "resources":null,
                    "resourcesToadd":null,
                    "resourceList":null,
                    "noticeType":1,
                    "thumbsUp":1,
                }
            }
        },
        created(){
            this.getData()
        },
        methods:{
            //获取最新动态详情
            getData(){
                console.log(this.$route.params.id)
                this.getHtml()
            },
            //获取文章内容
            getHtml(){

            },
            //关注/取消关注
            thumbsUpEdit(){
                this.detail.thumbsUp=this.detail.thumbsUp===0?1:0
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
        span{
            margin:0.1rem;
        }
        .icon{
            position:relative;
            top:-2px;
            margin:0 5px;
        }
    }
</style>
