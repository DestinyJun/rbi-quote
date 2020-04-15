import ClientHttp from "../utils/interceptors";

let clientHttp = new ClientHttp();
export default class Server {

	constructor() {
	}

	// 登录
	login(data) {
		return clientHttp.post('/login', data);
	}

	getMenuData(data) {
		return clientHttp.post('/sys/menu', data)
	}

	//TODO  报告管理模块
	//获取报告类型
	getReportTypeList(data) {
		return clientHttp.post('/systemplate/findAll', data)
	}

	//获取报告状态
	getReportStatusList(data) {
		return clientHttp.post('/report/allStatus', data)
	}

	// 获取分页数据信息
	getReportTableData(data) {
		return clientHttp.post('/report/findByPageByAuditStatus', data)
	}

	// 获取添加时候的字段信息
	getAddReportTableInfo(data) {
		return clientHttp.post('/getFields', data)
	}

	// 上传报告
	addReport(data) {
		return clientHttp.post('/report/add', data)
	}

	// 修改
	updateReport(data) {
		return clientHttp.post('/report/modify', data)
	}

	// 删除报告
	delReport(data) {
		return clientHttp.post('/report/deleteByReportId', data)
	}

	// 查询修改报告
	queryChageInfoByCode(data) {
		return clientHttp.post('/report/preModify', data)
	}

	// 查询单条报告
	queryDetailInfo(data) {
		return clientHttp.post('/report/findOneByReportId', data)
	}
	// 获取表头
	getTableTitleData(data){
		return clientHttp.post('/report/getHeader', data)
	}


	//TODO 报告审核模块

	// 二级审核模块
	getReportTwoAuditTypeList(data) {
		return clientHttp.post('/report/findByPageByAuditStatus2', data)
	}

	// 审核通过
	reviewReportPass(data) {
		return clientHttp.post('/report/updateByReportIdYes', data)
	}

	// 审核不通过
	reviewReportNoPass(data) {
		return clientHttp.post('/report/updateByReportIdNo', data)
	}

	// 三级级审核模块
	getReportThreeAuditTypeList(data) {
		return clientHttp.post('/report/findByPageByAuditStatus3', data)
	}


	// TODO 项目查询模块
	queryMyReportPageData(data) {
		return clientHttp.post('/report/findReadByPageByAuditStatus', data)
	}

	getMyReportEveryStausNum(data) {
		return clientHttp.post('/report/findCountByAuditStatus', data)
	}

	getMyReportCostData(data) {
		return clientHttp.post('/report/findCost', data)
	}


	// TODO 图像统计
	// 获取项目负人
	getProjectManager(data) {
		return clientHttp.post('/statistics/principal', data)
	}

	// 获取饼状图信息
	getPieData(data) {
		return clientHttp.post('/statistics/getCount', data)
	}

	judgeAuthorityOfUser(data) {
		return clientHttp.post('/statistics', data)
	}

	//TODO 用户权限模块
	//获取所有的角色权限
	getAllRoleListData(data) {
		return clientHttp.post('/role/all', data)
	}

	//获取用户列表
	getUserListData(data) {
		return clientHttp.post('/user/all', data)
	}

	//新增用户
	addUserInfo(data) {
		return clientHttp.post('/user/add', data)
	}

	//新增用户
	updateUserInfo(data) {
		return clientHttp.post('/user/update', data)
	}

	// 锁定用户
	delUserInfo(data) {
		return clientHttp.post('/user/lock', data)
	}

	// 锁定用户
	openUserInfo(data) {
		return clientHttp.post('/user/unlock', data)
	}

	// 重置密码
	resetUserPassword(data) {
		return clientHttp.post('/user/resetPassword', data)
	}


	//TODO 签字人员

	// 分页查询签字人员
	querySignPageData(data) {
		return clientHttp.post('/signed/all', data)
	}

	// 签字人员配置信息查询
	getSignerConfigData(data) {
		return clientHttp.post('/signed/select', data)
	}

	// 添加签字人员
	addSigner(data) {
		return clientHttp.post('/signed/add', data)
	}

	// 修改签字人员
	updateSignerInfo(data) {
		return clientHttp.post('/signed/update', data)
	}

	// 修改签字人员
	delSigner(data) {
		return clientHttp.post('/signed/delete', data)
	}

}
