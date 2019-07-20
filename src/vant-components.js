import {
    Button,
    Row,
    Col,
    NavBar,
    Tab,
    Tabs,
    PullRefresh,
    List,
    Tabbar,
    TabbarItem,
    Dialog
} from 'vant'

const components = [
    NavBar, Tab, Tabs, PullRefresh, List, Row, Col, Button, Tabbar, TabbarItem, Dialog
];

const install = Vue => {
    components.forEach(Component => {
        Vue.use(Component)
    })
}

export default install