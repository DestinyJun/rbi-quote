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
            dropData2: {
                title: '审核状态',
                centent: [
                    {name: '已完成', value: 4,  bgc: '#FFFFFF', color: '#5D6063'},
                    {name: '未收费', value: 3 ,  bgc: '#EFEFEF',  color: '#C2C2C2'},
                    {name: '未二级审核', value: 0,  bgc: '#EFEFEF',  color: '#C2C2C2'},
                    {name: '未三级审核', value: 2,  bgc: '#EFEFEF',  color: '#C2C2C2'},
                    {name: '审核未通过', value: 1,  bgc: '#EFEFEF',  color: '#C2C2C2'},
                ]
            },
            searchData: '',
            selecteds: [],
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
            auditName: 4,
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
                                            this.showDetailDialog(params.index)
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

            // 报告类型选择
            selRport: new mianModel.SelectReportType(),
            // 填写报告
            addReport: new mianModel.AddReport(),

            // 二维码内容
            codeUrl: 'http://www.gyrbi.com/quote',
            // 工具类
            reportTool: new Tool(),
            reportSrv: new serve(),
            // 报告选择的规则
            ruleValidate:{
                reportType: [
                    { required: true, message: '请选择报告类型', trigger: 'change' }
                ],
            },
            // 填写报告的规则
            ruleAddValidate: {

            }
        }
    },
    created(){
        this.reportSrv.getReportTypeList({}).then(value => {
            if (value.code === '1000') {
                value.data.forEach((v, index) => {
                    if (index === 1) {
                        this.reportTypeList.centent.push({name: v.tempName, value: '1', bgc: '#FFFFFF',  color: '#5D6063'});
                        this.selectReportName = v.tempName;
                    }else{
                        this.reportTypeList.centent.push({name: v.tempName, value: '0', bgc: '#EFEFEF',  color: '#C2C2C2'})
                    }
                });
                this.initReportData();
            }
        });
    },
    methods: {
        //初始化
        initReportData(){
          this.reportSrv.getReportTableData({auditStatus: this.auditName, tableName: this.selectReportName, pageNo: this.now_page , pageSize: this.now_num}).then(value => {
                this.pageOption.page_list = [];
                if (value.code  === '1000') {
                    this.tableOption.content = value.data.contents;
                    this.tableOption.content.forEach(v=> {
                        this.dropData2.centent.forEach(val => {
                            if (val.value === v.auditStatus) {
                                v.auditStatus = val.name
                            }
                        })
                    })
                }
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
            this.dropData2.centent.forEach(val => {
                    val.bgc = '#EFEFEF';
                    val.color = '#C2C2C2';
                }
            );
            this.dropData2.centent[index].bgc = '#FFFFFF';
            this.dropData2.centent[index].color = '#5D6063';
            this.auditName = this.dropData2.centent[index].value;
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
        showDetailDialog(){
            this.detailModal = true;
        },
        // 打印二维码
        printQRCode(){
           this.QRCodeModal = true;
        },
        // 显示填报选择弹窗
        showAddRepotrt(){
            // this.addTypeReportModel = true;
            this.addReportModel = true;
        },

        // 确认选择报告类型
        selectReport(name) {


            this.$refs[name].validate(valid => {
                if (valid) {
                    // this.reportSrv.getReportAppraiserInfo({uuid: ''}).then( v => {
                    //     console.log(v);
                    //     if (v.code === '1000') {
                    //         this.addTypeReportModel = false;
                    //         this.addReportModel = true;
                    //     }else {
                    //         this.reportTool.toast('error', v.msg)
                    //     }
                    // });

                }
            })
        }
       // 获取填报的估价师信息

    },
    components: {
        paging,
        tables,
        QRCodes
    }

}
