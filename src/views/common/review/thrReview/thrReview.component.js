import paging from "../../../../components/paging";
import tables from "../../../../components/table";
import Tool from "../../../../utils/tool";
import serve from "../../../../service/service";
import mianModel from "../../../../model/model";
export default {
    name: 'thrReview',
    data(){
        return {
            reportTypeList: {
                title: '报告类型',
                centent: []
            },
            dropData2: {
                title: '审核状态',
                centent: [
                    {name: '已完成', value: '1',  bgc: '#FFFFFF', color: '#5D6063'},
                    {name: '未收费', value: '1' ,  bgc: '#EFEFEF',  color: '#C2C2C2'},
                    {name: '未二级审核', value: '1',  bgc: '#EFEFEF',  color: '#C2C2C2'},
                    {name: '未三级审核', value: '1',  bgc: '#EFEFEF',  color: '#C2C2C2'},
                    {name: '审核未通过', value: '1',  bgc: '#EFEFEF',  color: '#C2C2C2'},
                ]
            },
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
                                        size: 'small',
                                    },
                                    style: {
                                        fontSize: '12px',
                                        width: '4vw',
                                        background: (params.row.auditStatus === '未二级审核')? '#3DA2F8': "#C9D0D6",
                                        color: '#fff'
                                    },
                                    attrs: {
                                        disabled: (params.row.auditStatus !== '未二级审核')
                                    },
                                    on: {
                                        click: () => {
                                            this.reviewThrClick(params.index)
                                        }
                                    }
                                }, '审核')
                            ]);
                        }
                    }
                ],
                content: [],
            },
            // 分页数据
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
            searchreviewData: '',
            // 搜索数据
            searchThrData: '',
            // 模态框数据
            reviewDetailModal: false,
            // 工具类
            reviewThreeTool: new Tool(),
            reviewThreeSrv: new serve(),
            // 详情信息
            detailThreeReport:  new mianModel.AddLocalReport(),
            // 审核id
            reportId: '',
            // 审核不通过的模态框
            reviewThreeNoModal: false,
            // 审核不通过的原因列表
            reasonTypeList: [
                {label: '估价对象估价过高', value: '估价对象估价过高'},
                {label: '估价对象存在不确定性的潜在风险', value: '估价对象存在不确定性的潜在风险'},
                {label: '忽视估价目的的可行性', value: '忽视估价目的的可行性'},
                {label: '其他', value: '其他'},
            ],
            // 审核不通过需要填的原因参数
            reviewNoData: {
                type: '',
                text: ''
            },
            // 显示其他原因填写
            showOther: false,
            // 效验表单
            effectFrom: {
                effectType: false,
                effectText: false,
            }
        }

    },
    created(){
        this.reviewThreeSrv.getReportTypeList({}).then(value => {
            if (value.code === '1000') {
                value.data.forEach((v, index) => {
                    if (index === 1) {
                        this.reportTypeList.centent.push({name: v.tempName, value: '1', bgc: '#FFFFFF',  color: '#5D6063'});
                        this.selectReportName = v.tempName;
                    }else{
                        this.reportTypeList.centent.push({name: v.tempName, value: '0', bgc: '#EFEFEF',  color: '#C2C2C2'})
                    }
                });
                this.initReviewThreeData();
            }else {
                this.reviewThreeTool.toast('error', value.msg)
            }
        });

    },
    methods: {
        initReviewThreeData(){
            this.reviewThreeSrv.getReportTwoAuditTypeList({auditStatus: this.auditName, tableName: this.selectReportName, pageNo: this.now_page , pageSize: this.now_num}).then(value => {
                console.log(value);
                this.pageOption.page_list = [];
                if (value.code  === '1000') {
                    this.tableOption.content = value.data.contents;
                    this.tableOption.content.forEach(v=> {
                        this.dropData2.centent.forEach(val => {
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
                    this.reviewThreeTool.toast('error', value.msg)
                }

            })
        },
        // 选择报表类型
        selectreviewType(index){
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
                this.initReviewThreeData();
            }

        },
        selectreviewReview(index){
            this.dropData2.centent.forEach(val => {
                    val.bgc = '#EFEFEF';
                    val.color = '#C2C2C2';
                }
            );
            this.dropData2.centent[index].bgc = '#FFFFFF';
            this.dropData2.centent[index].color = '#5D6063';
            this.auditName = this.dropData2.centent[index].value;
            this.initReviewThreeData();
        },
        // 审核
        reviewClick(data){
            this.reportId = data.reportId;
            for (let key in this.detailThreeReport){
                this.detailThreeReport[key] = data[key]
            }
            this.reviewDetailModal = true;
        },
        getPageDate(data){
            console.log(data);
        },
        searchData(){
            console.log(this.searchData);
        },

        // 审核通过
        reviewPasse(){
            this.reviewThreeSrv.reviewReportPass({reportId: this.reportId}).then(val => {
                if (val.code === '1000'){
                    this.reviewThreeTool.toast('success', val.msg);
                    this.closeModelAndClearData();
                    this.initReviewData()
                }else {
                    this.reviewThreeTool.toast('error', val.msg);
                }
            })
        },
        // 显示审核不通过弹窗
        reviewNoPasse(){
            console.log(234);
            this.reviewDetailModal = false;
            this.reviewNoThreeModal = true;
        },
        // 选择不通过的理由
        changeReasonType(value){
            console.log(value);
            this.effectFrom.effectType = false;
            if (value === '其他'){
                this.showOther = true;
            }else {
                this.showOther = false;
            }

        },
        // 效验其他原因的填空
        effecfText(){
            if (this.effectFrom.effectText !== ''){
                this.effectFrom.effectText = false;
            }
        },
        sureReviewNoPassClick(){
            if (this.reviewNoData.type !== '' ){
                if ( this.reviewNoData.type !== '其他'){
                    this.reviewNoPassRequest(this.reportId, this.reviewNoData.type);
                }else {
                    if (this.reviewNoData.text !== ''){
                        this.reviewNoPassRequest(this.reportId, this.reviewNoData.text);
                    }else {
                        this.effectFrom.effectText = true;

                    }
                }
            }else {
                this.effectFrom.effectType = true;
            }


        },
        // 关闭弹窗并且清除数据
        closeModelAndClearData(){
            this.detailThreeReport = new mianModel.AddLocalReport();
            this.reviewDetailModal = false;
            this.reviewThreeNoModal = false;
            this.effectFrom = false;
            this.showOther = false;

        },
        // 审核不通过的请求
        reviewNoPassRequest(id, reason){
            this.reviewThreeSrv.reviewReportNoPass({reportId: id, auditReason: reason}).then(val => {
                console.log(val);
                if (val.code === '1000'){
                    this.reviewThreeTool.toast('success', val.msg);
                    this.closeModelAndClearData();
                    this.initReviewData()
                }else {
                    this.reviewThreeTool.toast('error', val.msg);
                }
            })
        }
    },
    components: {
        paging,
        tables
    }
}
