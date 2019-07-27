const getters = {
    // 首页
    footerBarList: state => state.index.footerBarList,
    centerIcon: state => state.index.centerIcon,
    userInfo: state => state.index.userInfo,
    wxInfo: state => state.index.wxInfo,
    // 最新动态
    xfTabTitleInfo: state => state.xfdynamics.xfTabTitleInfo,
    //投诉建议
    complainType: state => state.complaint.complainType,
    complainList: state => state.complaint.complainList,
    complainEmerg: state => state.complaint.complainEmerg,
    complainDetailSteps: state => state.complaint.complainDetailSteps,
    //报事报修
    repairType: state => state.repair.repairType,
    repairList: state => state.repair.repairList,
    repairDetailSteps: state => state.repair.repairDetailSteps
}

export default getters