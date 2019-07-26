import axios from '@/utils/fetch'
const complaint = {
    state: {
        complainList: {
            refreshing: false,
            loading: false,
            error: false,
            finished: false,
            page: 1,
            pageSize: 10,
            list: []
        },
        complainType: [],
        complainEmerg: [
            { text: '非常紧急', id: 1 },
            { text: '紧急', id: 2 },
            { text: '一般', id: 3 },
            { text: '低', id: 4 },
            { text: '可以忽略', id: 5 },
        ],
        complainDetailSteps: []
    },
    actions: {
        getComplainType({ commit, state }, params) {
            return new Promise((resolve, reject) => {
                axios.get('owner/getComplainType.action', params)
                    .then(res => {
                        commit('GETCOMPLAINTYPE', res.data.addressEntityList)
                        resolve(res.data.addressEntityList)
                    }).catch(err => {
                        reject(err)
                    })
            })
        },
        getComplainList({ commit, state }, params) {
            const list = state.complainList
            return new Promise((resolve, reject) => {
                axios.get('owner/complains/queryMyComplainList.action', params)
                    .then(res => {
                        list.loading = true
                        list.finished = false
                        if (res.resultCode !== '0' && !list.error) {
                            list.error = true
                        } else {
                            list.error = false
                        }
                        if (res.data.complainEntityList.length < 10) {
                            list.finished = true
                        }
                        list.loading = false
                        console.log(res.data.complainEntityList)
                        commit('GETCOMPLAINLIST', res.data.complainEntityList)
                        resolve(res.data.complainEntityList)
                    }).catch(err => {
                        reject(err)
                    })
            })
        },
        getComplainSteps({ commit, state }, params) {
            return new Promise((resolve, reject) => {
                axios.get('owner/complains/queryMyComplainPlan.action', params)
                    .then(res => {
                        commit('GETCOMPLAINSTEPS', res.data)
                        resolve(res.data)
                    }).catch(err => {
                        reject(err)
                    })
            })
        }
    },
    mutations: {
        GETCOMPLAINTYPE(state, list) {
            state.complainType = list.map(function(item) {
                return {
                    text: item.name,
                    value: item.id
                }
            })
        },
        GETCOMPLAINLIST(state, list) {
            state.complainList.list = state.complainList.list.concat(list)
        },
        GETCOMPLAINSTEPS(state, list) {
            state.complainDetailSteps = list
        }
    }
}
export default complaint