import paging from "../../../../components/paging";
import tables from "../../../../components/table";
import Server from '../../../../service/service'
import Tool from '../../../../utils/tool'
import mainModel from "../../../../model/model";
export default {
    name: 'sign',
    data(){
        return {
            cityList: [
                {
                    value: '全部',
                    label: '全部'
                },
                {
                    value: 'London',
                    label: 'London'
                },
                {
                    value: 'Sydney',
                    label: 'Sydney'
                },
                {
                    value: 'Ottawa',
                    label: 'Ottawa'
                },
                {
                    value: 'Paris',
                    label: 'Paris'
                },
                {
                    value: 'Canberra',
                    label: 'Canberra'
                }
            ],
            selectType: '全部',
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
                        title: '签字人员姓名',
                        key: 'signedName',
                        align: 'left',
                    },
                    {
                        title: '签字人员证号',
                        key: 'signedNumber',
                        align: 'center',
                    },
                    {
                        title: '所属登录用户',
                        key: 'sysCreateUser',
                        align: 'center',
                    },
                    {
                        title: '类型',
                        key: 'signedTypeName',
                        align: 'center',
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
                                        background: '#3DA2F8',
                                        color: '#DDEDFD',
                                        border: 0
                                    },
                                    on: {
                                        click: () => {
                                            this.reviewPasswordClick(params.row.uuid)
                                        }
                                    }
                                }, '密码重置')
                            ]);
                        }
                    }
                ],
                content: [],
            },
            // 分页数据
            pageOption: {
                now_num: 10,// 当前行数
                now_page: 1, // 当前页
                pageNum: 15, // 总页数
                totalRow: 150, //总条数,
                page_list: []
            },
            now_num: 10,
            now_page: 1,
            selectItem: [], // 选择数据
            searchreviewData: '',
            //搜索数据
            searchSignData: '',
            // 模态框数据
            addModal: false,
            signerSrv: new Server(),
            signerTool: new Tool(),
            singerConfig: {
                signerTypeList: [],
                signerUserList: [],
            },
            addSigner: new mainModel.AddSigner(),
            updateSigner: new mainModel.AddSigner(),
            ruleValidate: {
                signedName: [
                    { required: true, message: '用户名不能为空', trigger: 'blur' },
                ],
                signedNumber: [
                    { required: true, message: '证件号不能为空 ', trigger: 'blur' },
                ],
                signedType: [
                    { required: true, message: '请选择证件类型', trigger: 'blur' },
                ],
                signedLoginUser: [
                    { required: true,  message: '请选择所属账户', trigger: 'change' },
                ],
                signedTypeName: [
                    { required: false, message: '请选择证件类型', trigger: 'focus' },
                ]
            }
        }
    },
    created(){
        this.signerSrv.getSignerConfigData({}).then(value => {
            console.log(value);
            if (value.code === '1000'){
                value.data.type.forEach(v => {
                    this.singerConfig.signerTypeList.push({label: v.signedTypeName, value: v.signedType})
                });
                value.data.user.forEach(v => {
                    this.singerConfig.signerUserList.push({label: v.realname, value: v.signedLoginUser})
                });
                this.initSignerData()
            }

        });
    },
    methods: {
        initSignerData(){
            this.signerSrv.querySignPageData({pageSize: this.now_num, page:this.now_page}).then(
                (value) => {
                    console.log(value);
                    this.pageOption.page_list = [];
                    if (value.code === '1000') {
                        console.log(this.singerConfig.signerUserList);
                        value.data.contents.forEach(v => {
                            // 值获取名字
                           this.setValueToLable(v.sysCreateUser, this.singerConfig.signerUserList, (name) => {
                               v.sysCreateUser = name;
                           })
                        });
                        console.log(this.tableOption.content);
                        this.tableOption.content = value.data.contents;
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
                    }
                }
            )
        },
        searchData(){

        },
        getPageDate(data){
            this.now_num = data.num_Size;
            if (data.label === 'row'){
                this.now_page = 1;
            }else {
                this.now_page = data.nowPage;
            }
            this.initUserData();
        },
        setValueToLable(data, list, callback){
            list.forEach(v => {
                if (v.value === data){
                    callback(v.label)
                }
            })
        },
        // 显示添加弹窗
        showAddSignerModal(){
            this.addModal = true;
        },
        // 添加签字人员
        addSignerInfo(name){
            this.$refs[name].validate(valid => {
                if (valid){
                  this.setValueToLable(this.addSigner.signedType, this.singerConfig.signerTypeList,
                      (data) => {
                          this.addSigner.signedTypeName = data;
                  });
                  this.signerSrv.addSigner(this.addSigner).then(value => {
                      if (value.code === '1000'){
                          this.addModal = false;
                          this. addSigner = new mainModel.AddSigner();
                          this.initSignerData();
                          this.signerTool.toast('success', value.code);
                      }else {
                          this.signerTool.toast('error', value.code);
                      }
                      console.log();
                  })
                }
            })
        },
        reviewPasswordClick(data){
            this.signerTool.setModal('confirm', '重置提醒', '确认要重置密码吗', () => {
                this.signerSrv.resetUserPassword({uuid: data}).then(val => {
                    console.log(val);
                    if (val.code === '1000'){
                        this.signerTool.toast('success', val.msg);
                        this.initUserData();
                    }else {
                        this.signerTool.toast('error', val.msg);
                    }
                })
            })
        }
    },
    components: {
        paging,
        tables
    }

}
