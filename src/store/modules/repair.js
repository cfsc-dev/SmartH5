import axios from '@/utils/fetch'
const repair = {
    state: {
        repairList: {
            refreshing: false,
            loading: false,
            error: false,
            finished: false,
            page: 1,
            pageSize: 10,
            list: []
        },
        repairType: [],
        complainEmerg: [
            { text: '非常紧急', id: 1 },
            { text: '紧急', id: 2 },
            { text: '一般', id: 3 },
            { text: '低', id: 4 },
            { text: '可以忽略', id: 5 },
        ],
        repairDetailSteps: []
    },
    actions: {
        getRepairType({ commit, state }, params) {
            return new Promise((resolve, reject) => {
                axios.get('owner/getRepairsType.action', params)
                    .then(res => {
                        console.log(res)
                            //commit('GETREPAIRTYPE', res.data.addressEntityList)
                            //resolve(res.data.addressEntityList)
                    }).catch(err => {
                        reject(err)
                    })
            })
        },
        getRepairList({ commit, state }, params) {
            const list = state.repairList
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
                        //console.log(res)
                        if (res.data.complainEntityList.length < 10) {
                            list.finished = true
                        }
                        list.loading = false
                        commit('GETREPAIRLIST', res.data.complainEntityList)
                        resolve(res.data.complainEntityList)
                    }).catch(err => {
                        reject(err)
                    })
            })
        },
        getRepairSteps({ commit, state }, params) {
            return new Promise((resolve, reject) => {
                axios.get('job/queryJobDetailProcessInfo.action', params)
                    .then(res => {
                        commit('GETREPAIRSTEPS', res.data)
                        resolve(res.data)
                    }).catch(err => {
                        reject(err)
                    })
            })
        }
    },
    mutations: {
        GETREPAIRTYPE(state, list) {
            state.repairType = list.map(function(item) {
                return {
                    text: item.name,
                    value: item.id
                }
            })
        },
        GETREPAIRLIST(state, list) {
            state.repairList.list = state.repairList.list.concat(list)
        },
        GETREPAIRSTEPS(state, list) {
            state.repairDetailSteps = list
        }
    }
}
export default repair