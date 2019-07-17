import {
    NavBar,
    Tab,
    Tabs,
    PullRefresh,
    Toast
} from 'vant'

const components = [
    NavBar, Tab, Tabs, PullRefresh,Toast
];

const install = Vue => {
    components.forEach(Component => {
        Vue.use(Component)
    })
}

export default install
