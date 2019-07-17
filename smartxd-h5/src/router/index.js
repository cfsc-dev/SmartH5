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
}, {
    path: '/xfdt',
    name: '西府动态',
    meta: {
        slide: 1,
        login: true
    },
    component: _import_('XfDynamics/index')
}]

export const router = new Router({
    mode: 'history',
    routes: constantRouterMap
})