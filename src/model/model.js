// TODO 报告管理模块
 class SelectReportType {
    constructor() {
    }
    reportType = ''
}
class AddReport {
    constructor() {
    }
    reportType=''; // 报告类型
    valuationPurpose = ''; // 估价目的
    valuationResult = ''; //估价结果
    valuer1 = ''; // 估价师1
    valuer2 = ''; // 估价师2
    valuationDate = ''; // 价值时点
    valuationValidityBegin = ''; // 股价有效期--开始
    valuationValidityEnd = ''; // 股价有效期--结束
    auditor2 = ''; // 二级审核人
    auditor2Uuid = ''; //二级审核人 id
    auditor3 = ''; // 三级审核人
    auditor3Number = ''; // 三级审核人id
    projectPrincipal = ''; // 项目负责人
    projectPrincipalNumber = ''; //项目负责人
    cost = ''; //费用
    valuationObject = ''; // 估价对象
    valuationObjectAddress = ''; //	估价对象地址
    mandatorName = ''; //委托人
    mandatorIdentityCard = ''; //	委托人信用代码
    excerpt = ''; //摘录
}
class AddLocalReport {
    constructor() {
    }
    reportType=''; // 报告类型
    valuationPurpose = ''; // 估价目的
    valuationResult = ''; //估价结果
    valuer1 = ''; // 估价师1
    valuer2 = ''; // 估价师2
    valuationDate = ''; // 价值时点
    valuationValidityBegin = ''; // 股价有效期--开始
    // valuationValidityEnd = ''; // 股价有效期--结束
    // auditor2 = ''; // 二级审核人
    auditor2Uuid = ''; //二级审核人 id
    // auditor3 = ''; // 三级审核人
    auditor3Number = ''; // 三级审核人id
    // projectPrincipal = ''; // 项目负责人
    projectPrincipalNumber = ''; //项目负责人
    cost = null; //费用
    valuationObject = ''; // 估价对象
    valuationObjectAddress = ''; //	估价对象地址
    mandatorName = ''; //委托人
    mandatorIdentityCard = ''; //	委托人信用代码
    excerpt = ''; //摘录
    // sex = ''; // 性别
}
// export default SelectReportType

// TODO 用户模块
// 新增用户实体
 class AddUser {
    constructor(){}
    username = '';
    realname = '';
    phone = '';
    roleList = []
}
// TODO 签字人员模块
class AddSigner {
    constructor(){}
    signedName = '';
    signedNumber = '';
    signedType = '';
    signedLoginUser = '';
    signedTypeName = ''
}
// export default AddUser
const mainModel = {
    SelectReportType,
    AddUser,
    AddReport,
    AddLocalReport,
    AddSigner
};

export default mainModel;
