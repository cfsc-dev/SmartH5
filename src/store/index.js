import Vue from 'vue'
import Vuex from 'vuex'
import index from './modules/index'
import xfdynamics from './modules/xfDynamics'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        index,
        xfdynamics
    },
    getters
})
export default store