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
