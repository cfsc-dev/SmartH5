import axios from '@/utils/fetch'
const xfdynamics = {
    state: {
        xfTabTitleInfo: [{
            title: '热点关注',
            id: 0,
            refreshing: false,
            loading: false,
            error: false,
            finished: false,
            currentPage: 0,
            pageSize: 10,
            newsList: [],
            noticeType: 2,
            action: 'getTurnsAndHottopics.action'
        }, {
            title: '通知公告',
            id: 1,
            refreshing: false,
            loading: false,
            error: false,
            finished: false,
            currentPage: 0,
            pageSize: 10,
            newsList: [],
            noticeType: 1,
            action: 'findnotices.action'
        }, {
            title: '工程进度',
            id: 2,
            refreshing: false,
            loading: false,
            error: false,
            finished: false,
            currentPage: 0,
            pageSize: 10,
            newsList: [],
            noticeType: 5,
            action: 'getTurnsAndHottopics.action'
        }, {
            title: '入伙',
            id: 3,
            refreshing: false,
            loading: false,
            error: false,
            finished: false,
            currentPage: 0,
            pageSize: 10,
            newsList: [],
            noticeType: 4,
            action: 'getTurnsAndHottopics.action'
        }],
        newsIndex: 0,
        newsList: []
    },
    actions: {
        getHomeList({ commit, state }, params) {
            const list = state.xfTabTitleInfo[params.id]
            return new Promise((resolve, reject) => {
                axios.get(list.action, params)
                    .then(res => {
                        list.loading = true
                        list.finished = false
                        if (res.resultCode !== '0' && !list.error) {
                            list.error = true
                        } else {
                            list.error = false
                        }
                        res.data.noticeList = res.data.noticeList.filter(item => {
                                return item.noticeType === list.noticeType
                            })
                            //console.log(res)
                        if (res.data.noticeList.length < 10) {
                            list.finished = true
                        }
                        list.loading = false
                        commit('GETHOMELIST', {
                            id: params.id,
                            list: res.data.noticeList
                        })
                        resolve(res.data.noticeList)
                    }).catch(err => {
                        reject(err)
                    })
            })
        }
    },
    mutations: {
        GETHOMELIST(state, list) {
            state.xfTabTitleInfo[list.id].newsList = state.xfTabTitleInfo[list.id].newsList.concat(list.list)
        }
    }
}

export default xfdynamics