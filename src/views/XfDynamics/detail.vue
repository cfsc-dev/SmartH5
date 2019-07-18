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
                <span>浏览：28</span>
                <span>点赞：22</span>
                <span>分享</span>
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
                    "noticeType":1
                }
            }
        },
        created(){
            this.getData()
        },
        methods:{
            //获取最新动态详情
            getData(){
                console.log(this.$route.query.id)
                this.getHtml()
            },
            //获取文章内容
            getHtml(){

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
    }
</style>
