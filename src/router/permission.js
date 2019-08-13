import {router} from './index'
import store from '../store'
import Vue from 'vue'

router.beforeEach((to, from, next) => {
    const ua = navigator.userAgent
    if (/smart_android/i.test(ua) || /smart_ios/i.test(ua)) {
        next()
    } else if (/MicroMessenger/i.test(ua)) {
        if (!store.getters.isAuth) {
            //请求微信授权,并跳转到 /WxAuth 路由
            let appId = 'wx89b7e6f058aca118'
            let redirectUrl = encodeURIComponent(`http://eip12.chanfine.com/auth.html`)
            //判断是否为正式环境
            window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirectUrl}&response_type=code&scope=snsapi_userinfo&state=STATE&connect_redirect=1#wechat_redirect`
        } else {
            if (store.getters.isAuth === 'tel') {
                next()
            } else {
                if (to.meta.login) {
                    Vue.prototype.$dialog.confirm({
                        message: '请先绑定用户信息'
                    }).then(() => {
                        router.push('/auth/getLoginInfo')
                    }).catch(() => {

                    })
                } else {
                    next()
                }
            }
        }
    } else {
        // next()
        Vue.prototype.$dialog.alert({
            message: '请通过微信公众号或App访问'
        })
    }
    //next()
})

router.afterEach((to, from) => {
    document.title = to.name
})

export default router
