import { router } from './index'

router.beforeEach((to, from, next) => {
<<<<<<< .mine
    console.log(234)
=======
    console.log('123')
>>>>>>> .theirs
    next()
})

router.afterEach((to, from) => {
    document.title = to.name
})

export default router
