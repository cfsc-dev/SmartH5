import {
    Switch,
    Icon,
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
    List,
    Tabbar,
    TabbarItem,
    Dialog,
    DropdownMenu,
    DropdownItem,
    Uploader,
    Step,
    Steps,
    Sticky
} from 'vant'

const components = [
    Switch, Icon, Picker, Popup, DatetimePicker, CellGroup, Cell, Field, Button, Row, Col, NavBar, Tab, Tabs, PullRefresh, List, Tabbar, TabbarItem, Dialog, DropdownMenu, DropdownItem, Uploader, Step, Steps, Sticky
];

const install = Vue => {
    components.forEach(Component => {
        Vue.use(Component)
    })
}

export default install