import axios from '@/utils/fetch'
const xfdynamics = {
  state: {
    xfTabTitleInfo: [{
      title: '热点关注',
      id: 0,
      refreshing: false
    }, {
      title: '通知公告',
      id: 1,
      refreshing: false
    }, {
      title: '工程进度',
      id: 2,
      refreshing: false
    }, {
      title: '入伙',
      id: 3,
      refreshing: false
    }],
    newsList: {}
  },
  actions: {
    getHomeList ({ commit, state }, params) {
      return new Promise((resolve, reject) => {
        axios.get('getHIKVisionAccessToken.action', params)
          .then(res => {
            console.log(res)
            commit('GETHOMELIST', res)
            resolve(res)
          }).catch(err => {
            reject(err)
          })
      })
    }
  },
  mutations: {
    GETHOMELIST (state, list) {
      state.newsList = list
    }
  }
}

export default xfdynamics
