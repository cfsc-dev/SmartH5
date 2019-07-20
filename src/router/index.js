import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
Router.prototype.animate = 0

const _import_ = file => () =>
    import ('@/views/' + file + '.vue')

export const constantRouterMap = [{
    path: '/',
    name: '首页',
    component: _import_('index/Index')
}, {
    path: '/auth',
    name: '授权',
    component: _import_('auth/WxAuth')
}, {
    path: '/news',
    name: '最新动态',
    meta: {
        slide: 1,
        login: true
    },
    component: _import_('news/Index')
}, {
    path: '/news/detail/:id',
    name: '最新动态详情',
    component: _import_('news/Detail')
}, {
    path: '/visitor',
    name: '访客邀约',
    component: _import_('visitor/Index'),
}, {
    path: '/visitor/add',
    name: '新增访客',
    component: _import_('visitor/Add')
}, {
    path: '/visitor/detail',
    name: '访客详情',
    component: _import_('visitor/Detail')
}]

export const router = new Router({
    // mode: 'history',
    routes: constantRouterMap
})
