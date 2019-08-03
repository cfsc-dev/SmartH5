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
            <img class="_content-img" :src="imgSrc"/>
            <div class="_content-tip">请将二维码对准摄像头</div>
            <div v-if="timeOut===0" class="_content-time-out" @click="getQrCode()">
                <Icon name="iconshuaxin"></Icon><span>重新获取二维码</span>
            </div>
            <div v-else class="_content-time-out">
                <span>{{timeOut}}秒后二维码失效</span>
            </div>
        </section>
    </section>
</template>

<script>
    import axios from '@/utils/fetch'
    import dateTool from '@/utils/dateformat'
    import { mapGetters } from 'vuex'
    export default {
        name: "Unlock",
        data(){
            return{
                title:'门禁开锁',
                zindex:999,
                imgSrc:'',
                timeOut:0,
            }
        },
        computed: {
            ...mapGetters([
                'isAuth','userInfo'
            ])
        },
        // watch:{
        //     isAuth(val){
        //         if(val){
        //             this.getQrCode()
        //         }
        //     }
        // },
        created() {
            // if(this.isAuth){
            //     this.getQrCode()
            // }
            this.getQrCode()
        },
        methods:{
            //获取门禁二维码
            getQrCode(){
                let param={
                    userId:this.userInfo.userInfo.userId,
                    cardNo:this.userInfo.userInfo.cardNo,
                    // userId:'4541',
                    // cardNo:'10000031',
                    effectTime:dateTool.format(new Date(),'yyMMddHHmmss'),
                    expireTime:dateTool.format(new Date(new Date().getTime()+60*1000),'yyMMddHHmmss'),
                    openTimes:1
                }
                axios.post('getHIKVisionVisitorQRcode.action',param).then(
                    res=>{
                        console.log(res)
                        if(res.code==='200'){
                            this.imgSrc=res.data.qrCodeUrl
                            this.refreshTimeOut()
                        }
                    }
                ).catch(err=>{
                    console.log(err)
                })
            },
            //二维码失效时间控制
            refreshTimeOut(){
                if(this.timeOut===0){
                    this.timeOut=60
                }
                setTimeout(()=>{
                    this.timeOut-=1
                    if(this.timeOut>0){
                        this.refreshTimeOut()
                    }
                },1000)
            }
        }

    }
</script>

<style lang="stylus" scoped>
    .main-content{
        background:#fff;
        ._content-img{
            /*margin:50px;*/
            width:100%;
            height:auto;
        }
        ._content-tip{
            text-align: center;
            font-size:14px;
            color: #2c2c2c;
        }
        ._content-time-out{
            margin-top: 20px;
            text-align: center;
            font-size:18px;
            color: #141414;
            span{
                margin-left:5px;
            }
        }
    }
</style>
