const getters = {
    // 首页
    footerBarList: state => state.index.footerBarList,
    centerIcon: state => state.index.centerIcon,
    userInfo: state => state.index.userInfo,
    // 最新动态
    xfTabTitleInfo: state => state.xfdynamics.xfTabTitleInfo,
    //投诉建议
    complainType: state => state.complaint.complainType,
    complainList: state => state.complaint.complainList,
    complainEmerg: state => state.complaint.complainEmerg
}

export default getters