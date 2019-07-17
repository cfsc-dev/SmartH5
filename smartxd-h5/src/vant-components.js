import {
    NavBar,
    Tab,
    Tabs,
    PullRefresh
} from 'vant'

const components = [
    NavBar, Tab, Tabs, PullRefresh
];

const install = Vue => {
    components.forEach(Component => {
        Vue.use(Component)
    })
}

export default install