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
        complainType: []
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
                        if (res.resultCode === 0 && !list.error) {
                            list.error = true
                        } else {
                            list.error = false
                        }
                        console.log(params)
                        if (res.data.complainEntityList.length < 10) {
                            list.finished = true
                        }
                        list.loading = false
                        commit('GETCOMPLAINLIST', res.data.complainEntityList)
                        resolve(res.data.complainEntityList)
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
        }
    }
}
export default complaint