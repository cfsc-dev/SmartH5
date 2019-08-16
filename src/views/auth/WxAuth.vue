<template>
    <section class="box-wrapper">
        <van-loading type="spinner" vertical color="#1989fa" class="_auth-loading">授权中...</van-loading>
    </section>
</template>

<script>
    import axios from '@/utils/fetch'
    export default {
        name: "WxAuth",
        async created(){
            // 如果连接中有微信返回的 code，则用此 code 调用后端接口，向微信服务器请求用户信息
            // 如果不是从微信重定向过来的，没有带着微信的 code，则直接进入首页
            if (this.$route.query.code) {
                console.log(this.$route.query.code)
                return
                //请求接口获取用户信息
                let params = { code: this.$route.query.code }
                axios.get('WeChatToken/getSnsToken.action', params)
                    .then(res => {
                        console.log(res)
                        if(res.resultCode === "0"){
                            this.$store.commit('SET_ISAUTH','tel')
                            this.$store.commit('SET_USERINFO',res.data)
                        }else{
                            this.$store.commit('SET_ISAUTH','wx')
                            this.$store.commit('SET_WXINFO',res.data.User)
                        }
                        this.$router.push('/')
                    }).catch(err => {
                        this.$toast('微信授权失败:'+err)
                    })
            } else {
                this.$toast('微信授权失败')
                // this.$router.push('/')
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .box-wrapper{
        background:#f0f0f0;
        text-align center;
        ._auth-loading{
            margin-top 40vh;
        }
    }
</style>
