import paging from "../../../components/paging";
import tables from "../../../components/table";
import QRCodes from "../../../components/QRCode";
import serve from "../../../service/service";
import Tool from '../../../utils/tool'
import mianModel from "../../../model/model";
export default {
    name: 'report',
    data(){
        return {
            // 报告类型列表
            reportTypeList: {
                    title: '报告类型',
                    centent: []
             },
            // 报告状态列表
            reportStatusList: {
                title: '审核状态',
                centent: []
            },
            searchData: '',
            selectItem: [], // 选择的数据
            // 分页数据
            pageOption: {
                now_num: 10,// 当前行数
                now_page: 1, // 当前页
                pageNum: 0, // 总页数
                totalRow: 0, //总条数
                page_list: []
            },
            // 分页数据
            now_page: 1,
            now_num: 10,
            auditName: '',
            selectReportName: '',
            // 表格数据
            tableOption :{
                title: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center',
                        className: 'select-table'
                    },
                    {
                        title: '报告编号',
                        key: 'reportId',
                        align: 'left',
                        width: 180,
                    },
                    {
                        title: '报告类型',
                        key: 'reportType',
                        align: 'center',
                        width: 180,
                    },
                    {
                        title: '审核状态',
                        key: 'auditStatus',
                        align: 'center',
                        width: 180,
                    },
                    {
                        title: '估价委托人',
                        key: 'mandatorName',
                        align: 'center',
                        width: 180,
                    },
                    {
                        title: '估价对象',
                        key: 'valuationObject',
                        align: 'center',
                    },
                    {
                        title: '项目负责人',
                        key: 'projectPrincipal',
                        align: 'center',
                        width: 140,
                    },
                    {
                        title: '估价结果',
                        key: 'valuationResult',
                        align: 'right',
                        width: 140,
                        render: (h, params) => {
                            return h('div', [
                                h('span', {
                                    style: {
                                        color: '#EF9F20'
                                    },
                                },params.row.result)
                            ]);
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 200,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        // type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px',
                                        fontSize: '12px',
                                        background: '#3DA2F8',
                                        color: '#fff'
                                    },
                                    on: {
                                        click: () => {
                                            this.showDetailDialog(params.row)
                                        }
                                    }
                                }, '详情'),
                                h('Button', {
                                    props: {
                                        size: 'small',
                                    },
                                    style: {
                                        fontSize: '12px',
                                        background: (params.row.flag  !== 1)? '#3DA2F8': "#C9D0D6",
                                        color: '#fff'
                                    },
                                    attrs: {
                                        disabled: (params.row.flag === 1)
                                    },
                                    on: {
                                        click: () => {
                                            this.printQRCode(params.index)
                                        }
                                    }
                                }, '打印二维码')
                            ]);
                        }
                    }
                ],
                content: [],
            },
            // 模态框数据
            detailModal: false, //详情弹窗
            QRCodeModal: false, // 打印二维码弹窗
            addTypeReportModel: false, // 填报类型选择弹窗
            addReportModel: false, // 填写报告信息
            UpdateReportModel: false, // 填写报告信息

            // 报告类型选择
            selRport: new mianModel.SelectReportType(),
            // 填写报告
            addReport: new mianModel.AddLocalReport(),
            addSubmitReport: new mianModel.AddReport(),
            updateReport:  new mianModel.AddLocalReport(),
            detailReport:  new mianModel.AddLocalReport(),
            //修改时需要的id
            reportId: '',
            // 估价师总列表
            appraiserTotalList: [],
            // 二维码内容
            codeUrl: 'http://www.gyrbi.com/quote',
            // 工具类
            reportTool: new Tool(),
            reportSrv: new serve(),
            // 新增报告配置列表
            addConfig: {
                appraiserOneList: [],
                appraiserTwoList: [],
                reviewerOneList:  [],
                reviewerTwoList:  [],
                projectManager:  [],
                purposeList: []
            },
            // 报告选择的规则
            ruleValidate:{
                reportType: [
                    { required: true, message: '请选择报告类型', trigger: 'change' }
                ],
            },

            // 填写报告的规则
            ruleAddValidate: {
                reportType: [
                    { required: false, message: '请选择报告类型', trigger: 'change' },
                ],
                valuationPurpose: [
                    { required: true, message: '请填写估价目的', trigger: 'change' },
                ],
                valuationResult: [
                    { required: true, message: '请填写估价结果', trigger: 'change' },
                ],
                valuer1: [
                    { required: true, message: '请选择估价师1', trigger: 'change' },
                ],
                valuer2: [
                    { required: true, message: '请选择估价师2', trigger: 'change' },
                ],
                valuationDate: [
                    { required: true, type: 'date', message: '请选择时间', trigger: 'change' }
                ],
                valuationValidityBegin: [
                    {
                        type: 'array',
                        required: true,
                        fields: {
                            0: {type: 'date', required: true, message: '请输入起止日期'},
                            1: {type: 'date', required: true, message: '请输入起止日期'}
                        }
                    }
                ],
                auditor2Uuid: [
                    { required: true,  message: '请选择二级审核人', trigger: 'change' },
                ],
                auditor3Number: [
                    { required: true,  message: '请选择三级审核人', trigger: 'change' }
                ],
                projectPrincipalNumber: [
                    { required: true, message: '请选择项目负责人', trigger: 'change' }
                ],
                valuationObject: [
                    { required: true, message: '请填写估价对象', trigger: 'change' },
                ],
                valuationObjectAddress: [
                    { required: true, message: '请填写估价对象地址', trigger: 'change' },
                ],
                mandatorName: [
                    { required: true, message: '请填写委托人', trigger: 'change' },
                ],
                mandatorIdentityCard: [
                    { required: true, message: '请填写委托人信用代码', trigger: 'change' },
                    { max: 18, min: 18, message: '号码不符合规范', trigger: 'change' }
                ],
                cost: [
                    { required: true, message: '请填写费用', trigger: 'change' },
                ],
                excerpt: [
                    { required: false, message: '请填写摘录', trigger: 'change' },
                ]

            }
        }
    },
    created(){
        Promise.resolve(this.getReportType()).then(() => {
            return Promise.resolve(this.getReportStatus())

        }).then(() => {
            Promise.resolve(this.initReportData())
        });
        this.getAddAppraiserLlist('', this.appraiserTotalList);
    },
    methods: {
        // 获取类型
        getReportType(){
           return new Promise((resolve) => {
               this.reportSrv.getReportTypeList({}).then(value => {
                   console.log(value);
                   if (value.code === '1000') {
                       value.data.forEach((v, index) => {
                           if (index === 1) {
                               this.reportTypeList.centent.push({name: v.tempName, value: '1', bgc: '#FFFFFF',  color: '#5D6063'});
                               this.selectReportName = v.tempName;
                           }else{
                               this.reportTypeList.centent.push({name: v.tempName, value: '0', bgc: '#EFEFEF',  color: '#C2C2C2'})
                           }
                       });
                       resolve();
                   }
               });
           })
        },
        // 获取状态
        getReportStatus(){
           return new Promise((resolve) => {
               this.reportSrv.getReportStatusList({}).then(value => {
                   console.log(value);
                   if (value.code === '1000') {
                       value.data.forEach((v, index) => {
                           if (index === 0) {
                               this.reportStatusList.centent.push({name: v.statusName, value: v.statusCode, bgc: '#FFFFFF',  color: '#5D6063'});
                               this.auditName = v.statusCode;
                           }else{
                               this.reportStatusList.centent.push({name: v.statusName, value:  v.statusCode, bgc: '#EFEFEF',  color: '#C2C2C2'})
                           }
                       });
                       resolve()
                   }
               });
           })
        },
        // 初始化列表
        initReportData(){
          this.reportSrv.getReportTableData({auditStatus: this.auditName, tableName: this.selectReportName, pageNo: this.now_page , pageSize: this.now_num}).then(value => {
              console.log(value);
              this.pageOption.page_list = [];
                if (value.code  === '1000') {
                    this.tableOption.content = value.data.contents;
                    this.tableOption.content.forEach(v=> {
                        this.reportStatusList.centent.forEach(val => {
                            if (val.value === v.auditStatus) {
                                v.auditStatus = val.name
                            }
                        })
                    });
                    for (let i = 1; i<= value.data.totalPage; i++) {
                        if (i ===  this.now_page) {
                            this.pageOption.page_list.push( {name: i, bgc: '#A9B0B6', color: '#EDEEEF'})
                        }else {
                            this.pageOption.page_list.push({name: i, bgc: '#FFFFFF', color: '#6D6F71'})
                        }
                    }
                    this.pageOption.pageNum = value.data.totalPage;
                    this.pageOption.now_page = this.now_page;
                    this.pageOption.now_num = this.now_num;
                    this.pageOption.totalRow =value.data.totalRecord;
                }else {
                    this.reportTool.toast('error', value.msg)
                }

            })
        },
        // 选择报表类型
        selectReportType(index){
            if (this.selectReportName !== this.reportTypeList.centent[index].name){
                this.reportTypeList.centent.forEach(val => {
                        val.bgc = '#EFEFEF';
                        val.color = '#C2C2C2';
                        val.value = '0';
                    }
                );
                this.reportTypeList.centent[index].bgc = '#FFFFFF';
                this.reportTypeList.centent[index].color = '#5D6063';
                this.reportTypeList.centent[index].value = '1';
                this.selectReportName = this.reportTypeList.centent[index].name;
                this.initReportData();
            }

        },
        // 选择审核状态
        selectReportReview(index){
            this.reportStatusList.centent.forEach(val => {
                    val.bgc = '#EFEFEF';
                    val.color = '#C2C2C2';
                }
            );
            this.reportStatusList.centent[index].bgc = '#FFFFFF';
            this.reportStatusList.centent[index].color = '#5D6063';
            this.auditName = this.reportStatusList.centent[index].value;
            this.initReportData();
        },
        // 搜索事件
        searchReportData(){
            console.log(this.searchData);
        },
        // 获取分页组件中当前页条数
        getPageDate(data){
            this.now_num = data.num_Size;
            if (data.label === 'row'){
                this.now_page = 1;
            }else {
                this.now_page = data.nowPage;
            }
            this.initReportData();
        },
        // 展示详情弹窗
        showDetailDialog(item){
            for (let keys in this.detailReport){
                this.detailReport[keys] = item[keys]
            }
            this.detailReport.valuationValidityBegin = `${item.valuationValidityBegin} - ${item.valuationValidityEnd}`;
            this.detailReport.auditor3Number = item.auditor3;
            this.detailReport.auditor2Uuid = item.auditor2;
            this.setValueToLable( this.detailReport.valuer1, this.appraiserTotalList, (name) => {
                this.detailReport.valuer1 = name;
            });
            this.setValueToLable( this.detailReport.valuer2, this.appraiserTotalList, (name) => {
                this.detailReport.valuer2 = name;
            });
            this.detailReport.projectPrincipalNumber = item.projectPrincipal;
            this.detailModal = true;
        },
        // 打印二维码
        printQRCode(){
           this.QRCodeModal = true;
        },
        // 显示填报选择弹窗
        showAddRepotrt(){
            // 查询估价目的
            this.getReportPurpose();
            this.addTypeReportModel = true;

            // this.addReportModel = true;
        },
        // 获取估价目的的列表
        getReportPurpose(){
            // 查询估价目的
            this.reportSrv.getReportPurposeOfValuation({}).then(res => {
                // console.log(res);
                if (res.code === '1000') {
                    res.data.forEach(val => {
                        this.addConfig.purposeList.push({label: val.valuationPurpose, value: val.valuationPurpose})
                    })

                }else {
                    this.reportTool.toast('error', res.msg)
                }
            });
        },
        // 确认选择报告类型
        selectReport(name) {
            this.$refs[name].validate(valid => {
                if (valid) {
                    // this.getAddAppraiserLlist('', this.addConfig.appraiserOneList);
                    this.addTypeReportModel = false;
                    this.addReportModel = true;
                }
            })
        },
        // 选择估价师
        addRoportSelectAutor(name, type){
            switch (name) {
                case 'valuer1':
                     // 查询估价师2得人员
                    if (this.addConfig.appraiserOneList.length === 0){
                        if (type === 'add'){
                            this.getAddAppraiserLlist(this.addReport.valuer2, this.addConfig.appraiserOneList);
                        }else {
                            this.getAddAppraiserLlist(this.updateReport.valuer2, this.addConfig.appraiserOneList);
                        }
                    }
                    break;
                case 'valuer2':
                    if (this.addConfig.appraiserTwoList.length === 0){
                        if (type === 'add'){
                            this.getAddAppraiserLlist(this.addReport.valuer1, this.addConfig.appraiserTwoList);
                        }else {
                            this.getAddAppraiserLlist(this.updateReport.valuer1, this.addConfig.appraiserTwoList);
                        }
                    }
                    break;
                default:
                    break;
            }
        },
        // 估价师改变时
        addReportChangeAutor(name, type){
            switch (name) {
                case 'valuer1':
                    if (type === 'add'){
                        // 查询估价师2得人员
                        if (this.addReport.valuer1 === this.addReport.valuer2){
                            this.addConfig.appraiserTwoList = [];
                            this.addConfig.reviewerOneList = [];
                            this.getAddAppraiserLlist(this.addReport.valuer1, this.addConfig.appraiserTwoList);
                        }else {
                            if (this.addReport.valuer2 !== ''){
                                this.getAddReveiwConfigInfo('add')
                            }
                        }
                    }else {
                        // 查询估价师2得人员
                        if (this.updateReport.valuer1 === this.updateReport.valuer2){
                            this.addConfig.appraiserTwoList = [];
                            this.addConfig.reviewerOneList = [];
                            this.getAddAppraiserLlist(this.updateReport.valuer1, this.addConfig.appraiserTwoList);
                        }else {
                            if (this.updateReport.valuer2 !== ''){
                                this.getAddReveiwConfigInfo('update')
                            }
                        }
                    }

                    break;
                case 'valuer2':
                    if (type === 'add') {
                        if (this.addReport.valuer1 === this.addReport.valuer2) {
                            this.addConfig.appraiserOneList = [];
                            this.addConfig.reviewerOneList = [];
                            this.getAddAppraiserLlist(this.addReport.valuer2, this.addConfig.appraiserOneList);
                        } else {
                            if (this.addReport.valuer1 !== '') {
                                this.getAddReveiwConfigInfo('add')
                            }
                        }
                    }else {
                        if (this.updateReport.valuer1 === this.updateReport.valuer2) {
                            this.addConfig.appraiserOneList = [];
                            this.addConfig.reviewerOneList = [];
                            this.getAddAppraiserLlist(this.updateReport.valuer2, this.addConfig.appraiserOneList);
                        } else {
                            if (this.updateReport.valuer1 !== '') {
                                this.getAddReveiwConfigInfo('update')
                            }
                        }
                    }
                    // this.getAddAppraiserLlist(this.addReport.valuer2, this.addConfig.appraiserOneList);
                    break;
                default:
                    break;
            }
        },
        // 二级审核人改变时
        changeReviewerData(type){
            if (type === 'add') {
                this.addConfig.projectManager = [];
                this.addConfig.reviewerTwoList = [];
                console.log(this.addReport.valuer1);
                this.getAddReveiwAndProjectAutorInfo(0, this.addConfig.projectManager, this.addReport.valuer1, this.addReport.valuer2 );
                this.getAddReveiwAndProjectAutorInfo(3, this.addConfig.reviewerTwoList,  this.addReport.valuer1, this.addReport.valuer2 );
            }else {
                this.addConfig.projectManager = [];
                this.addConfig.reviewerTwoList = [];
                this.getAddReveiwAndProjectAutorInfo(0, this.addConfig.projectManager, this.updateReport.valuer1, this.updateReport.valuer2 );
                this.getAddReveiwAndProjectAutorInfo(3, this.addConfig.reviewerTwoList,  this.updateReport.valuer1, this.updateReport.valuer2 );
            }


        },
        // 查询估价师
        getAddAppraiserLlist(id, list){
            this.reportSrv.getReportAppraiserInfo({uuid: id}).then( v => {
                if (v.code === '1000') {
                    v.data.forEach(val => {
                        list.push({label: val.signedName, value: val.uuid})
                    });
                }else {
                    this.reportTool.toast('error', v.msg)
                }
            });
        },
       // 查询二级审核人员
        getAddReveiwConfigInfo(type){
            this.addConfig.reviewerOneList = [];
            if (type === 'add'){
                this.reportSrv.getReviewerTowUser({uuidV1: this.addReport.valuer1, uuidV2: this.addReport.valuer2}).then(res => {
                    if (res.code === '1000'){
                        res.data.forEach(val => {
                            this.addConfig.reviewerOneList.push({label: val.realname, value: val.uuid})
                        });
                    }else {
                        this.reportTool.toast('error', res.msg)
                    }
                })
            }else {
                this.reportSrv.getReviewerTowUser({uuidV1: this.updateReport.valuer1, uuidV2: this.updateReport.valuer2}).then(res => {
                    if (res.code === '1000'){
                        res.data.forEach(val => {
                            this.addConfig.reviewerOneList.push({label: val.realname, value: val.uuid})
                        });
                    }else {
                        this.reportTool.toast('error', res.msg)
                    }
                })
            }

        },
       // 查询三级审核人或者项目负责人
        getAddReveiwAndProjectAutorInfo(id, listData, uuid1, uuid2){
           this.reportSrv.getReviewerTreeUser({uuid: id, uuidV1: uuid1, uuidV2: uuid2}).then(v=> {
               if(v.code === '1000') {
                   v.data.forEach(val => {
                       listData.push({label: val.signedName, value: val.signedNumber})
                   })

               }
           })
        },
        // 提交报告
        addUploadReport(name){
            this.$refs[name].validate(valid => {
               if(valid){
                   for (let key in this.addReport){
                       this.addSubmitReport[key] = this.addReport[key];
                   }
                   // if (this.addSubmitReport.sex) {
                   //     this.addSubmitReport.mandatorName = this.addSubmitReport.mandatorName + this.addSubmitReport.sex;
                   // }
                   this.addSubmitReport.valuationDate =  this.setTimeFomart(this.addSubmitReport.valuationDate);
                   this.addSubmitReport.valuationValidityBegin = this.setTimeFomart(this.addReport.valuationValidityBegin[0]);
                   this.addSubmitReport.valuationValidityEnd = this.setTimeFomart(this.addReport.valuationValidityBegin[1]);
                   this.setValueToLable(this.addSubmitReport.auditor2Uuid, this.addConfig.reviewerOneList, (data) => {
                       this.addSubmitReport.auditor2 = data;
                   });
                   this.setValueToLable(this.addSubmitReport.auditor3Number, this.addConfig.reviewerTwoList, (data) => {
                       this.addSubmitReport.auditor3 = data;
                   });
                   this.setValueToLable(this.addSubmitReport.projectPrincipalNumber, this.addConfig.projectManager, (data) => {
                       this.addSubmitReport.projectPrincipal = data;
                   });
                   this.addSubmitReport.reportType = this.selRport.reportType;
                   delete this.addSubmitReport.sex;
                   this.reportSrv.addReport(this.addSubmitReport).then(value => {
                       if(value.code === '1000') {
                           this.addSubmitReport = new mianModel.AddReport();
                           this.addReport = new mianModel.AddLocalReport();
                           this.selRport =  new mianModel.SelectReportType();
                           for (let key in this.addConfig){
                               this.addConfig[key] = []
                           }
                           this.addReportModel = false;
                           this.initReportData();
                           this.reportTool.toast('success', value.msg);
                       }else {
                           this.reportTool.toast('error', value.msg);
                       }
                   })
               }
            })
        },
        // 时间转换
        setTimeFomart(data){
            let d = new Date(data);
            return  d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
        },
        // 值获取名字
        setValueToLable(data, list, callback){
            list.forEach(v => {
                if (v.value === data){
                    callback(v.label)
                }
            })
        },
        // 选择数据
        selectTableItem(data){
            console.log(data);
            this.selectItem = data;

        },
        // 现实修改弹窗
        showUpdateReportModel(){
            if (this.selectItem.length === 0){
                this.reportTool.toast('error', '请选择需要修改得项');
            }else if (this.selectItem.length === 1){
                this.selRport.reportType = this.selectItem[0].reportType;
                this.reportId = this.selectItem[0].reportId;
                for (let keys in this.updateReport){
                    this.updateReport[keys] = this.selectItem[0][keys];
                }
                // 获取估价目的
                this.getReportPurpose();
                // 获取估价师
                this.getAddAppraiserLlist(this.selectItem[0].valuer2, this.addConfig.appraiserOneList);
                this.getAddAppraiserLlist(this.selectItem[0].valuer1, this.addConfig.appraiserTwoList);
                // 获取二级审核人
                this.getAddReveiwConfigInfo('update');
                // 获取三级审核人以及项目负责人
                this.getAddReveiwAndProjectAutorInfo(0, this.addConfig.projectManager, this.selectItem[0].valuer1, this.selectItem[0].valuer2);
                this.getAddReveiwAndProjectAutorInfo(3, this.addConfig.reviewerTwoList, this.selectItem[0].valuer1, this.selectItem[0].valuer2);
                this.updateReport.cost = this.updateReport.cost + '';
                this.updateReport.valuationResult = this.updateReport.valuationResult + '';
                this.updateReport.valuationValidityBegin= [
                    this.selectItem[0].valuationValidityBegin,
                    this.selectItem[0].valuationValidityEnd
                ];
                this.UpdateReportModel = true;
            }else {
                this.reportTool.toast('error', '只能选择一项进行修改');
            }
        },
       // 取消选择，关闭弹窗
        closeUpdateModel(){
            this.selectItem = [];
            this.addSubmitReport = new mianModel.AddReport();
            this.updateReport = new mianModel.AddLocalReport();
            this.selRport =  new mianModel.SelectReportType();
            for (let key in this.addConfig){
                this.addConfig[key] = []
            }
            // 调用子组件得方法
            this.$refs.tables.clearSelect();
            this.UpdateReportModel = false;
            this.addReportModel = false;
        },
       // 提交修改数据
        updateReportInfo(name){
            this.$refs[name].validate(valid => {
                if (valid) {
                    for (let key in this.updateReport){
                        this.addSubmitReport[key] = this.updateReport[key];
                    }
                    // if (this.addSubmitReport.sex) {
                    //     this.addSubmitReport.mandatorName = this.addSubmitReport.mandatorName + this.addSubmitReport.sex;
                    // }
                    // this.addSubmitReport.mandatorName = this.addSubmitReport.mandatorName + this.addSubmitReport.sex;
                    this.addSubmitReport.valuationDate =  this.setTimeFomart(this.addSubmitReport.valuationDate);
                    this.addSubmitReport.valuationValidityBegin = this.setTimeFomart(this.updateReport.valuationValidityBegin[0]);
                    this.addSubmitReport.valuationValidityEnd = this.setTimeFomart(this.updateReport.valuationValidityBegin[1]);
                    this.setValueToLable(this.addSubmitReport.auditor2Uuid, this.addConfig.reviewerOneList, (data) => {
                        this.addSubmitReport.auditor2 = data;
                    });
                    this.setValueToLable(this.addSubmitReport.auditor3Number, this.addConfig.reviewerTwoList, (data) => {
                        this.addSubmitReport.auditor3 = data;
                    });
                    this.setValueToLable(this.addSubmitReport.projectPrincipalNumber, this.addConfig.projectManager, (data) => {
                        this.addSubmitReport.projectPrincipal = data;
                    });
                    this.addSubmitReport.reportType = this.selRport.reportType;
                    this.addSubmitReport.reportId =  this.reportId;
                    delete this.addSubmitReport.sex;
                    console.log(this.addSubmitReport);
                    this.reportSrv.updateReport(this.addSubmitReport).then(value => {
                        if (value.code === '1000'){
                            this.closeUpdateModel();
                            this.initReportData();
                            this.reportTool.toast('success', value.msg);
                        }else {
                            this.reportTool.toast('error', value.msg);
                        }
                    })
                }
            })
        },

       // 删除报告
        deleteReport(){
            if (this.selectItem.length === 0){
                this.reportTool.toast('error', '请选择需要删除得项');
            } else if (this.selectItem.length === 1) {
                this.reportTool.setModal('confirm', '删除提醒', '您确认要删除该项吗?', () => {
                    this.reportSrv.delReport({reportId: this.selectItem[0].reportId}).then(val => {
                        if (val.code === '1000') {
                            this.$refs.tables.clearSelect();
                            this.selectItem = [];
                            this.reportTool.toast('success', val.msg)
                        } else{
                            this.reportTool.toast('error', val.msg)
                        }
                    });
                })
            }else {
                this.reportTool.toast('error', '只能选择一项进行删除');
            }
        }

    },
    components: {
        paging,
        tables,
        QRCodes
    }
}
