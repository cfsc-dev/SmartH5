import Vue from 'vue'
import Vuex from 'vuex'
import index from './modules/index'
import xfdynamics from './modules/xfDynamics'
import complaint from './modules/complaint'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        index,
        xfdynamics,
        complaint
    },
    getters
})
export default store