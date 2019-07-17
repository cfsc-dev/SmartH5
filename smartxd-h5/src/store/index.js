import Vue from 'vue'
import Vuex from 'vuex'
import xfdynamics from './modules/xfDynamics'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        xfdynamics
    },
    getters
})
export default store