import { router } from './index'

router.beforeEach((to, from, next) => {


    next()
})

router.afterEach((to, from) => {
    document.title = to.name
})


export default router