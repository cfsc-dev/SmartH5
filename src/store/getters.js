const getters = {
    // 首页
    footerBarList: state => state.index.footerBarList,
    centerIcon: state => state.index.centerIcon,
    userInfo: state => state.index.userInfo,
    isAuth: state => state.index.isAuth,
    wxInfo: state => state.index.wxInfo,
    activeList: state => state.index.activeList,
    // 最新动态
    xfTabTitleInfo: state => state.xfdynamics.xfTabTitleInfo,
    //投诉建议
    complainType: state => state.complaint.complainType,
    complainList: state => state.complaint.complainList,
    complainEmerg: state => state.complaint.complainEmerg,
    complainDetailSteps: state => state.complaint.complainDetailSteps,
    complainInfo: state => state.complaint.complainInfo,
    //报事报修
    repairType: state => state.repair.repairType,
    repairList: state => state.repair.repairList,
    repairDetailSteps: state => state.repair.repairDetailSteps,
    repairInfo: state => state.repair.repairInfo,
    //生活缴费
    payCategory: state => state.pay.payCategory
}

export default getters