import request from './axios'

const api = {
    // 身份认证
    authentication: () => {},
    // tab信息
    getTabInfo: (wid) => request.get(`/tab?id=${wid}`),
    // 任务受理地图信息
    // data = {id, scope, type, coordinate}
    getTaskMapInfo: (data) => request.post(`/task`, data),
    // 用户画像-基本信息
    // 主动营销-点人信息(同数据)
    getDtailCus: (cid) => request.get(`/detailcus?id=${cid}`),
    // 用户画像-路径详细（和表格一个效果，暂无）
    // 填写表格-获取表单（暂时别写，数据内容不清楚）
    getForm: () => {},
    // 主动营销地图信息
    // data = {id, scope, type, coordinate}
    getMarketingInfo: (data) => request.post(`/marketing`, data),
};

export default api