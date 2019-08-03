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
            <van-button type="primary" size="large" @click="visitorShare">分享</van-button>
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
                visitor:{}
            }
        },
        created(){
            if(this.$route.params.id){
                this.getVisitor()
            }else{
                this.$router.replace('/visitor')
            }
            weixin.wxConfig(['onMenuShareAppMessage'])
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
                this.$toast('待开发');
                // weixin.shareToWeixin({title:'邀请码',desc:'邀请码',link:'',imgUrl:this.visitor.qrCodeUrl})
            }
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
