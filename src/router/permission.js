import { router } from './index'

router.beforeEach((to, from, next) => {
    console.log(234)
    next()
})

router.afterEach((to, from) => {
    document.title = to.name
})


export default router