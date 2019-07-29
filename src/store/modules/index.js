import { Cookie } from '@/utils/storage'
const index = {
    state: {
        isAuth: false,
        centerIcon: [
            { title: '最新动态', path: '/news', icon: 'news.png' },
            { title: '门禁开锁', path: '/unlock', icon: 'unlocking.png' },
            { title: '访客邀约', path: '/visitor', icon: 'visitor.png' },
            { title: '智能锁车', path: '/car/lock', icon: 'lock.png' },
            { title: '投诉建议', path: '/complaint', icon: 'complaint.png' },
            { title: '报事报修', path: '/repair', icon: 'repair.png' },
            { title: '生活缴费', path: '', icon: 'life.png' },
            { title: '全部功能', path: '', icon: 'all.png' }
        ],
        footerBarList: [
            { title: '首页', icon: 'iconfanhuishouye', name: 'home', path: '/' },
            { title: '邻里圈', icon: 'iconfaxian', name: 'discover', path: '' },
            { title: '我的', icon: 'iconmine-gray', name: 'self', path: '' }
        ],
        userInfo: {
            "roominfo": [{
                "cellId": 19,
                "address": "小区A 1栋 1单元 1203",
                "name": "1203",
                "roomId": 21,
                "code": "01203",
                "propertyArea": "140.00"
            }],
            "deviceInfo": [{
                "location": "1栋1单元门口",
                "deviceId": "af8da77caafa4276ac3f45e947f2c66c",
                "deviceSerial": "231857475"
            }, {
                "location": "小区A东大门闸机",
                "deviceId": "5c9a123f9c7b4095b323241898ba12cb",
                "deviceSerial": "D16444599"
            }],
            "thirdInfo": [],
            "userInfo": {
                "receiptAddress": null,
                "headImageUrl": "http://222.240.37.83:9082/smartxd/upload/ownerFace/201907241709597576_4541.png",
                "faceDisTime": "2019-05-09 08:50:28",
                "projectId": 1,
                "cardNo": "10000028",
                "nickName": "业主3",
                "userId": 4536,
                "vehicleCode": "湘A9P00J,陕A55554",
                "gender": 0,
                "userName": "业主3",
                "mobileNumber": "13000000003",
                "faceDisUrl": "http://dev.chanfine.com:9082/smartxd/api/getFaceImageProcess.action?id=201905090850246289",
                "commonAddress": null
            }
        },
        wxInfo: []
    },
    actions: {

    },
    mutations: {
        SET_ISAUTH(state, isAuth) {
            state.isAuth = isAuth
        },
        SET_WXINFO(state, info) {
            state.wxInfo = info
            Cookie.set({
                wxInfo: info
            })
        },
        SET_USERINFO(state, userInfo) {
            state.userInfo = userInfo
            Cookie.set({
                userInfo: userInfo
            })
        }
    }
}
export default index