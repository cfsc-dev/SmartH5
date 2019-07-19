import {
    Row,
    Col,
    NavBar,
    Tab,
    Tabs,
    PullRefresh,
    List
} from 'vant'

const components = [
    NavBar, Tab, Tabs, PullRefresh, List, Row, Col
];

const install = Vue => {
    components.forEach(Component => {
        Vue.use(Component)
    })
}

export default install