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
        return clientHttp.post('/systemplate/findByPage', data)
    }
    getReportTableData(data){
        return clientHttp.post('/report/findByPageByAuditStatus', data)
    }

}
