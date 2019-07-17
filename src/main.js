import Vue from 'vue'
import App from './App.vue'
import router from './router/permission'
import store from './store'


// style
import '@/assets/css/index.css'

// vant components
import vantComponents from '@/vant-components.js'
import 'vant/lib/index.css';
Vue.use(vantComponents)

// connect with android and ios 
import bridge from '@/utils/bridge'
Vue.prototype.$bridge = bridge

// cookie
import { Cookie } from '@/utils/storage'
Vue.prototype.Cookie = Cookie

// tools
import '@/utils/rem.js'

// back
Vue.prototype.back = (route) => {
    route.animate = 2
    history.go(-1)
}

Vue.config.devtools = true
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
