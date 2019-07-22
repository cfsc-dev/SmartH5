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
            console.log(this.$route.params.visitor)
            if(this.$route.params.visitor){
                this.visitor=this.$route.params.visitor
            }else{
                this.$router.replace('/visitor')
            }
        },
        methods:{
            visitorShare(){

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
