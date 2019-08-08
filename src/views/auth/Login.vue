<template>
    <section class="box-wrapper">
        <van-nav-bar
            title="绑定信息"
            left-arrow
            fixed
            :z-index=999
            @click-left="back($router)"
        />
        <section class="main-content">
            <van-cell-group>
                <van-field
                    v-model="mobile"
                    type="tel"
                    clearable
                    label="电话号码"
                    left-icon="phone"
                    placeholder="请输入电话号码"
                    :error-message="errorMobileMsg"
                    required
                />
            </van-cell-group>
            <van-cell-group>
                <van-field
                    v-model="code"
                    type="number"
                    clearable
                    label="验证码"
                    left-icon="phone"
                    placeholder="请输入验证码"
                    required
                >
                    <van-button slot="button" size="small" type="primary" @click="sendCode" :disabled="disabled">
                        <template v-if="sending">发送验证码</template>
                        <template v-else>
                            {{second}}秒后重发
                        </template>
                    </van-button>
                </van-field>
            </van-cell-group>
             <div class="subBtn" @click="subInfo">
                <van-button type="info" size="large">提交</van-button>
            </div>
        </section>
    </section>

</template>
<script>
import axios from '@/utils/fetch'
import { mapGetters } from 'vuex'
export default {
    name: 'loginAuth',
    data(){
        return {
            mobile: '',
            code: '',
            disabled: false,
            errorMobileMsg: '',
            sending: true,
            second: 60
        }
    },
    methods: {
        async subInfo(){
            if(this.mobile && this.code){
                axios.post('checkOwner.action',{mobileNumber: this.mobile})
                .then(res => {
                    if(res.data.userInfo.userId){
                        let params = {
                            phoneNo: this.mobile,
                            vcerificationCode: this.code,
                            nickname: this.wxInfo.nickname,
                            accountId: this.wxInfo.unionid,
                            sex: this.wxInfo.sex,
                            faceImg: this.wxInfo.headimgurl,
                            type: '0'
                        }
                        //console.log(params)
                        axios.post('linkPhoneNo.action',params)
                            .then(resdata => {
                                if(resdata.resultCode === "0"){
                                    this.$toast(resdata.msg)
                                    this.$store.commit('SET_ISAUTH','tel')
                                    this.$store.commit('SET_USERINFO',res.data.userInfo.userId)
                                    // this.$router.push('/')
                                    this.$router.history.go(-1)
                                }
                                console.log(resdata)
                            }
                        ).catch(err=>{
                            console.log(err)
                        })
                        
                    }else{
                        this.$toast(res.msg)
                    }
                }).catch(err=>{
                    console.log(err)
                })
                
            }
        },
        sendCode(){
            if(this.mobile){
                axios.post('getLoginCode.action',{mobile: this.mobile, chid: ""})
                    .then(res => {
                        if(res.resultCode === "0"){
                            this.sending  = false;
                            this.disabled = true;
                            this.timeDown();
                            this.$toast(res.msg)
                        }
                        console.log(res)
                    }
                ).catch(err=>{
                    console.log(err)
                })
            }else{
                this.errorMobileMsg = '请输入手机号码'
            }
        },
        timeDown(){
            let result = setInterval( ()=>{
                --this.second;
                if(this.second < 0) {
                    clearInterval(result);
                    this.sending  = true;
                    this.disabled = false;
                    this.second = 60;
                }
            }, 1000);
        }
    },
    computed: {
        ...mapGetters([
            'wxInfo'
        ])
    }
}
</script>
<style lang="stylus">
.box-wrapper{
    background:#f0f0f0;
    .main-content{
        padding 46px 10px 10px
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
    }
}
</style>


