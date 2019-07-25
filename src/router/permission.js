import { router } from './index'

router.beforeEach((to, from, next) => {
    //不要对 WxAuth 路由进行拦截，不进入 WxAuth 路由就拿不到微信返回的授权 code
    if (to.name === '授权') {
        next()
        return
    }
    //判断是否微信浏览器
    if (!/micromessenger/i.test(navigator.userAgent)) {
        next()
        return
    }
    //判断是否存在用户信息
    let userInfo = localStorage.getItem('userInfo')
    if (!userInfo) {
        //保存当前路由地址，授权后还会跳到此地址
        // sessionStorage.setItem('wxRedirectUrl', to.fullPath)
        //请求微信授权,并跳转到 /WxAuth 路由
        let appId = 'wx89b7e6f058aca118'
        let redirectUrl = encodeURIComponent(`http://3ibz2a.natappfree.cc/auth`)
            //判断是否为正式环境
        window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirectUrl}&response_type=code&scope=snsapi_userinfo&state=STATE&connect_redirect=1#wechat_redirect`
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