import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
Router.prototype.animate = 0

const _import_ = file => () =>
    import ('@/views/' + file + '.vue')

export const constantRouterMap = [{
    path: '/',
    name: '智慧社区',
    meta: {
        wxAuth: true
    },
    component: _import_('index/Index')
}, {
    path: '/auth',
    name: '授权',
    meta: {
        wxAuth: true
    },
    component: _import_('auth/WxAuth')
}, {
    path: '/news',
    name: '最新动态',
    meta: {
        slide: 1,
        login: false
    },
    component: _import_('news/Index')
}, {
    path: '/news/detail/:id',
    name: '最新动态详情',
    meta: {
        slide: 1,
        login: false
    },
    component: _import_('news/Detail')
}, {
    path: '/news/appendix',
    name: '附件',
    meta: {
        slide: 1,
        login: false
    },
    component: _import_('news/Appendix')
}, {
    path: '/unlock',
    name: '门禁开锁',
    meta: {
        slide: 1,
        wxAuth: true,
        login: true
    },
    component: _import_('door/Unlock')
}, {
    path: '/visitor',
    name: '访客邀约',
    meta: {
        slide: 1,
        wxAuth: true,
        login: true
    },
    component: _import_('visitor/Index'),
}, {
    path: '/visitor/add',
    name: '新增访客',
    meta: {
        slide: 1,
        wxAuth: true,
        login: true
    },
    component: _import_('visitor/Add')
}, {
    path: '/visitor/detail/:id',
    name: '访客详情',
    meta: {
        slide: 1,
        wxAuth: true,
        login: true
    },
    component: _import_('visitor/Detail')
}, {
    path: '/car/lock',
    name: '智能锁车',
    meta: {
        slide: 1,
        wxAuth: true,
        login: true
    },
    component: _import_('car/Lock')
}, {
    path: '/complaint',
    name: '投诉建议',
    meta: {
        slide: 1,
        wxAuth: true,
        login: true
    },
    component: _import_('complaint/Index')
}, {
    path: '/complaint/add',
    name: '投诉',
    meta: {
        slide: 1,
        wxAuth: true,
        login: true
    },
    component: _import_('complaint/Add')
}, {
    path: '/complaint/detail',
    name: '投诉详情',
    meta: {
        slide: 1,
        wxAuth: true,
        login: true
    },
    component: _import_('complaint/Detail')
}, {
    path: '/repair',
    name: '报事报修',
    meta: {
        slide: 1,
        wxAuth: true,
        login: true
    },
    component: _import_('repair/Index')
}, {
    path: '/repair/add',
    name: '报修',
    meta: {
        slide: 1,
        wxAuth: true,
        login: true
    },
    component: _import_('repair/Add')
}, {
    path: '/repair/detail',
    name: '报修详情',
    meta: {
        slide: 1,
        wxAuth: true,
        login: true
    },
    component: _import_('repair/Detail')
}, {
    path: '/auth/getLoginInfo',
    name: '绑定信息',
    meta: {
        slide: 1
    },
    component: _import_('auth/Login')
}, {
    path: '/pay',
    name: '生活缴费',
    meta: {
        slide: 1
    },
    component: _import_('pay/Index')
}, {
    path: '/pay/parkingPayment',
    name: '停车缴费',
    meta: {
        slide: 1
    },
    component: _import_('pay/ParkingPayment')
}, {
    path: '/active/detail/:id',
    name: '活动详情',
    meta: {
        slide: 1,
        wxAuth: true,
        login: true
    },
    component: _import_('active/Detail')
}, {
    path: '/active/sub/:id',
    name: '填写报名信息',
    meta: {
        slide: 1,
        wxAuth: true,
        login: true
    },
    component: _import_('active/Sub')
}]

export const router = new Router({
    mode: 'history',
    routes: constantRouterMap
})