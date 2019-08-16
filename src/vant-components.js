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
    Sticky,
    Rate,
    Grid,
    GridItem,
    Loading
} from 'vant'

const components = [
    Switch, Icon, Picker, Popup, DatetimePicker, CellGroup, Cell, Field, Button, Row, Col, NavBar, Tab, Tabs, PullRefresh, List, Tabbar, TabbarItem, Dialog, DropdownMenu, DropdownItem, Uploader, Step, Steps, Sticky, Rate,Grid, GridItem,Loading
];

const install = Vue => {
    components.forEach(Component => {
        Vue.use(Component)
    })
}

export default install
