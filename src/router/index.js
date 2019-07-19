import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
Router.prototype.animate = 0

const _import_ = file => () =>
    import ('@/views/' + file + '.vue')

export const constantRouterMap = [{
    path: '/',
    name: '首页',
    component: _import_('index/Home')
},{
    path: '/WxAuth',
    name: '授权',
    component: _import_('auth/WxAuth')
},  {
    path: '/xfdt',
    name: '西府动态',
    meta: {
        slide: 1,
        login: true
    },
    component: _import_('XfDynamics/index')
},{
    path: '/detail/:id',
    name: '最新动态详情',
    component: _import_('XfDynamics/detail')
}]

export const router = new Router({
    mode: 'history',
    routes: constantRouterMap
})
