const index = {
    state: {
        isAuth: false,
        centerIcon: [
            { title: '最新动态', path: '/news', icon: 'news.png' },
            { title: '门禁开锁', path: '', icon: 'unlocking.png' },
            { title: '访客邀约', path: '/visitor', icon: 'visitor.png' },
            { title: '智能锁车', path: '/car/lock', icon: 'lock.png' },
            { title: '投诉建议', path: '/complaint', icon: 'complaint.png' },
            { title: '报事报修', path: '', icon: 'repair.png' },
            { title: '生活缴费', path: '', icon: 'life.png' },
            { title: '全部功能', path: '', icon: 'all.png' }
        ],
        footerBarList: [
            { title: '首页', icon: 'iconfanhuishouye', name: 'home', path: '/' },
            { title: '邻里圈', icon: 'iconfaxian', name: 'discover', path: '' },
            { title: '我的', icon: 'iconmine-gray', name: 'self', path: '' }
        ],
        userInfo: {
            "receiptAddress": null,
            "headImageUrl": "upload/ownerFace/201907201013522545_4538.png",
            "faceDisTime": "2019-05-09 08:50:28",
            "projectId": 1,
            "cardNo": "10000028",
            "nickName": "业主1",
            "userId": 4536,
            "vehicleCode": "湘A9P00J,陕A55554",
            "gender": 0,
            "userName": "业主1",
            "mobileNumber": "13000000001",
            "faceDisUrl": "http://dev.chanfine.com:9082/smartxd/api/getFaceImageProcess.action?id=201905090850246289",
            "commonAddress": null
        }
    },
    actions: {},
    mutations: {}
}
export default index
