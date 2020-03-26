import ClientHttp from "../utils/interceptors";
let clientHttp = new ClientHttp();
export default class Server {

    constructor() {
    }
    // 登录
    login(data){
      return clientHttp.post('/login',data);
    }

    //TODO  报表模块
   //获取报告类型
    getReportTypeList(data){
        return clientHttp.post('/systemplate/findAll', data)
    }
    // 获取分页数据信息
    getReportTableData(data){
        return clientHttp.post('/report/findByPageByAuditStatus', data)
    }
    // 填报的估价师信息
    getReportAppraiserInfo(data){
        return clientHttp.post('/singedUser/findByUuid', data)
    }
    // 二级审核人查询
    getReviewerTowUser(data){
        return clientHttp.post('/singedUser/findByUuidA2', data)
    }
    // 三级审核人 和 项目负责人 查询
    getReviewerTreeUser(data){
        return clientHttp.post('/singedUser/findByUuidAP', data)
    }
    // 三级审核人 和 项目负责人 查询
    addReport(data){
        return clientHttp.post('/report/insert', data)
    }

    //TODO 用户权限模块
   //获取所有的角色权限
   getAllRoleListData(data){
        return clientHttp.post('/role/all', data)
   }
    //获取用户列表
    getUserListData(data){
        return clientHttp.post('/user/all', data)
    }
    //新增用户
    addUserInfo(data){
        return clientHttp.post('/user/add', data)
    }

}
