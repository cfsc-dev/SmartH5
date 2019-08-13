<template>
    <section class="box-wrapper">
        <van-nav-bar
            :title="title"
            left-arrow
            fixed
            :z-index=zindex
            @click-left="back($router)"
        />
        <section class="main-content">
            <div class="visitor-detail-content">
                <img :src="visitor.qrCodeUrl">
                <div class="_content-li">
                    <label>有效期至：</label>
                    <span v-text="visitor.expireTime"></span>
                </div>
                <div class="_content-li">
                    <label>有效次数：</label>
                    <span v-text="visitor.openTimes"></span>
                </div>
                <div class="_content-li">
                    <label>访客姓名：</label>
                    <span v-text="visitor.visitorName"></span>
                </div>
                <div class="_content-li-final">请在门岗出示二维码，即可进入</div>
            </div>
            <van-button v-if="showShareButton" type="primary" size="large" @click="visitorShare">分享</van-button>
        </section>
    </section>
</template>

<script>
    import axios from '@/utils/fetch'
    import weixin from '@/utils/weixinHelper'
    export default {
        name: "VisitorDetail",
        data(){
            return{
                title:'邀请码',
                zindex:999,
                showShareButton:false,
                visitor:{}
            }
        },
        created(){
            if(this.$route.params.id){
                this.getVisitor()
            }else{
                this.$router.replace('/visitor')
            }
            //判断是否App打开，App打开则放开分享按钮
            let ua=navigator.userAgent
            if(/smart_android/i.test(ua)||/smart_ios/i.test(ua)){
                this.showShareButton=true
            }else{
                this.showShareButton=false
            }
        },
        methods:{
            //获取访客
            getVisitor(){
                let params={
                    id:this.$route.params.id
                }
                axios.get('getVisitorRecordById.action',params).then(
                    res=>{
                        console.log(res)
                        if(res.resultCode==='0'){
                            this.visitor=res.data
                            weixin.share({title:'邀请码',
                                desc:'邀请码',
                                link:`http://fe5p3s.natappfree.cc/share.html?url=visitor/detail/${this.$route.params.id}`,
                                imgUrl:this.visitor.qrCodeUrl})
                        }else{
                            this.$toast(res.msg)
                        }
                    }
                ).catch(
                    err=>{
                        console.log(err)
                    }
                )
            },
            //分享
            visitorShare(){
                this.$bridge.callhandler('showToast', '待开发');
            }
        },
        beforeRouteLeave(to, from, next) {
            this.$router.animate = 2
            next();
        }
    }
</script>

<style lang="stylus" scoped>
    .box-wrapper{
        background:#f0f0f0;
        .main-content{
            padding:0 10px;
        }
    }
    .visitor-detail-content{
        background:#ffffff;
        margin:30px 10px;
        padding:10px;
        border-radius:5px;
        img{
            width:100%;
            height:auto;
        }
        ._content-li{
            clear:both;
            margin:15px 0;
            span{
                float: right;
            }
        }
        ._content-li-final{
            margin:15px 0;
            text-align: center;
        }
    }
</style>
