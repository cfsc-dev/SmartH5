import { router } from './index'
import store from '../store'
import Vue from 'vue'
router.beforeEach((to, from, next) => {
    const ua = navigator.userAgent;
    next()
        /* if (!!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) || /android/i.test(ua) || /Linux/i.test(ua)) {
            if (to.meta.login) {
                if (store.state.index.userInfo.userId) {
                    next()
                } else {
                    Vue.prototype.$dialog.alert({
                        message: '请通过微信公众号或App访问'
                    })
                }
            } else {
                next()
            }

            next()
        }

        //判断是否微信浏览器
        if (/micromessenger/i.test(ua) && to.meta.wxAuth) {
            if (to.name === '授权') {
                next()
            } else {
                //判断是否存在用户信息
                if (store.getters.isAuth) {
                    if (store.getters.userInfo.userId) {
                        console.log(store.getters.userInfo, 'userInfo')
                        next()
                    } else {
                        Vue.prototype.$dialog.alert({
                            message: '请先绑定用户信息'
                        }).then(() => {
                            router.push('/auth/getLoginInfo')
                        })
                    }
                } else {
                    //保存当前路由地址，授权后还会跳到此地址
                    //请求微信授权,并跳转到 /WxAuth 路由
                    let appId = 'wx89b7e6f058aca118'
                    let redirectUrl = encodeURIComponent(`http://9tddwr.natappfree.cc/auth`)
                        //判断是否为正式环境
                    window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirectUrl}&response_type=code&scope=snsapi_userinfo&state=STATE&connect_redirect=1#wechat_redirect`
                }
            }
        } */

    next()

})

router.afterEach((to, from) => {
    document.title = to.name
})

export default router
