import { router } from './index'
import store from '../store'
router.beforeEach((to, from, next) => {
    const ua = navigator.userAgent;
    //不要对 WxAuth 路由进行拦截，不进入 WxAuth 路由就拿不到微信返回的授权 code
    /* if (to.meta.wxAuth === 'wxAuth') {
        next()
    } */

    if (!!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) || /android/i.test(ua) || /Linux/i.test(ua)) {}

    //判断是否微信浏览器
    if (/micromessenger/i.test(ua) && to.meta.wxAuth) {
        //判断是否存在用户信息
        if (store.state.index.isAuth) {
            if (store.state.index.userInfo.userId) {
                console.log(store.state.index.userInfo, 'userInfo')
                next()
            } else {
                this.$dialog.alert({
                    message: '请先绑定用户信息'
                }).then(() => {
                    router.push('/auth/getLoginInfo')
                })
            }
        } else {
            //保存当前路由地址，授权后还会跳到此地址
            //请求微信授权,并跳转到 /WxAuth 路由
            let appId = 'wx89b7e6f058aca118'
            let redirectUrl = encodeURIComponent(`http://3bc2ye.natappfree.cc/auth`)
                //判断是否为正式环境
            window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirectUrl}&response_type=code&scope=snsapi_userinfo&state=STATE&connect_redirect=1#wechat_redirect`
        }

    } else {
        next()
    }

    if (to.meta.login) {

    }

})

router.afterEach((to, from) => {
    document.title = to.name
})

export default router