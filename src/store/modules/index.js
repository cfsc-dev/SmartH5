import { Cookie } from '@/utils/storage'
const index = {
    state: {
        isAuth: false,
        centerIcon: [
            { title: '最新动态', path: '/news', icon: 'news.png' },
            { title: '门禁开锁', path: '/unlock', icon: 'unlocking.png' },
            { title: '访客邀约', path: '/visitor', icon: 'visitor.png' },
            { title: '智能锁车', path: '/car/lock', icon: 'lock.png' },
            { title: '投诉建议', path: '/complaint', icon: 'complaint.png' },
            { title: '报事报修', path: '/repair', icon: 'repair.png' },
            { title: '生活缴费', path: '', icon: 'life.png' },
            { title: '全部功能', path: '', icon: 'all.png' }
        ],
        footerBarList: [
            { title: '首页', icon: 'iconfanhuishouye', name: 'home', path: '/' },
            { title: '邻里圈', icon: 'iconfaxian', name: 'discover', path: '' },
            { title: '我的', icon: 'iconmine-gray', name: 'self', path: '' }
        ],
        userInfo: {},
        wxInfo: []
    },
    actions: {

    },
    mutations: {
        SET_ISAUTH(state, isAuth) {
            state.isAuth = isAuth
        },
        SET_WXINFO(state, info) {
            state.wxInfo = info
            Cookie.set({
                wxInfo: info
            })
        },
        SET_USERINFO(state, userInfo) {
            state.userInfo = userInfo
            Cookie.set({
                userInfo: userInfo
            })
        }
    }
}
export default index
