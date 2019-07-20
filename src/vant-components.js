import {
    Picker,
    Popup,
    DatetimePicker,
    CellGroup,
    Cell,
    Field,
    Button,
    Row,
    Col,
    NavBar,
    Tab,
    Tabs,
    PullRefresh,
    List
} from 'vant'

const components = [
    NavBar, Tab, Tabs, PullRefresh, List, Row, Col,Button,Field,Cell,CellGroup,DatetimePicker,Popup,Picker
];

const install = Vue => {
    components.forEach(Component => {
        Vue.use(Component)
    })
}

export default install
