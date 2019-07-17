<template>
    
</template>

<script>
    import axios from '@/utils/fetch'
    export default {
        name: "WxAuth",
        async created(){
            // 如果连接中有微信返回的 code，则用此 code 调用后端接口，向微信服务器请求用户信息
            // 如果不是从微信重定向过来的，没有带着微信的 code，则直接进入首页
            if (this.$route.query.code) {
                this.$toast(this.$route.query.code)
                return
                //请求接口获取用户信息
                let params={code: this.$route.query.code}
                axios.get('getWxUserInfo.action', params)
                    .then(res => {
                        console.log(res)
                        localStorage.setItem('userInfo', JSON.stringify(res))
                        let redirectUrl = sessionStorage.getItem('wxRedirectUrl')
                        this.$router.replace(redirectUrl)
                    }).catch(err => {
                        console.log(err)
                    })
            } else {
                this.$router.replace('/')
            }
        }
    }
</script>

<style scoped>

</style>
