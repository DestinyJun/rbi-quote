import paging from "../../../../components/paging";
import tables from "../../../../components/table";
import Server from '../../../../service/service'
import Tool from '../../../../utils/tool'
import mainModel from "../../../../model/model";
export default {
    name: 'user',
    data() {
        return {
            selectType: '',
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
                        title: '用户名',
                        key: 'username',
                        align: 'left',
                    },
                    {
                        title: '用户权限',
                        key: 'roleCodeString',
                        align: 'center',
                    },
                    {
                        title: '用户真实姓名',
                        key: 'realname',
                        align: 'center',
                    },
                    {
                        title: '联系电话',
                        key: 'phone',
                        align: 'center',
                    },
										{
											title: '用户状态',
											key: 'status',
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
                                        color: '#fff',
                                        border: 0
                                    },
                                    on: {
                                        click: () => {
                                            this.reviewPaawordClick(params.row.uuid)
                                        }
                                    }
                                }, '密码重置'),
																h('Button', {
																	props: {
																		size: 'small',
																	},
																	style: {
																		fontSize: '12px',
																		width: '3vw',
																		marginLeft: '10px',
																		background: (params.row.status === '锁定')? '#3DA2F8': "#C9D0D6",
																		color: '#fff',
																		border: 0
																	},
																	attrs: {
																		disabled: (params.row.status !== '锁定')
																	},
																	on: {
																		click: () => {
																			this.openClockClick(params.row.uuid)
																		}
																	}
																}, '解锁')
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
            selectItem: [], // 选择数据
            now_num: 10,
            now_page: 1,
            searchUserData: '',
            // 模态框数据
            reviewModal: false,
            addModal: false,
            updateModal: false,

            userSrv: new Server(),
            userTool: new Tool(),
            roleList: [],
            addUser: new mainModel.AddUser(),
            updateUser: new mainModel.AddUser(),
            ruleValidate: {
                username: [
                    { required: true, message: '用户名不能为空', trigger: 'blur' },
                ],
                realname: [
                    { required: true, message: '真实姓名不能为空 ', trigger: 'blur' },
                ],
                phone: [
                    { required: true, validator: (rule, value, callback) => {
                            if (!value) {
                                return callback(new Error('手机号不能为空'));
                            } else if (!/^1[34578]\d{9}$/.test(value)) {
                                callback('手机号格式不正确');
                            } else {
                                callback();
                            }
                        }, trigger: 'blur' },
                ],
                roleList: [
                    { required: true, type: 'array', min: 1, message: '请选择用户权限', trigger: 'change' },
                ],
            }
        }
    },
    created(){
        this.userSrv.getAllRoleListData().then(value => {
            console.log(value);
            value.data.forEach(v => {
                this.roleList.push({label: v.roleName, value: v.roleCode})
            })
        });
        this.initUserData()
    },
    methods: {
        initUserData(){
            this.userSrv.getUserListData({pageSize: this.now_num, page:this.now_page, role: this.selectType}).then(
                (value) => {
                	console.log(value);
                    this.pageOption.page_list = [];
                    if (value.code === '1000') {
                        this.tableOption.content = value.data.contents;
                        this.tableOption.content.forEach(v => {
                        	v.status = v.status === 0? '正常': '锁定'
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
                    }
                }
            )
        },
        changeType(){
            console.log(123);
          this.now_page= 1;
          this.initUserData();
        },
        addBtnClick(){
            this.addModal = true;
        },
        addSure(name){
            this.$refs[name].validate((valid) => {
                if (valid) {
                    const roleLists = `[${this.addUser.roleList}]`;
                    this.userSrv.addUserInfo({username: this.addUser.username, realname: this.addUser.realname, phone: this.addUser.phone, roleList: roleLists}).then(value => {
                        if (value.code === '1000') {
                            this.addModal = false;
                            this.addUser = new mainModel.AddUser();
                            this.userTool.toast('success', '请求成功');
                            this.initUserData();
                        }else {
                            this.userTool.toast('error', value.msg);
                        }
                    });

                }
            })
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
        searchData(){

        },
        // 选择数据
        selectTableItem(data){
            this.selectItem = data;
        },
        // 现实修改弹窗
        showUpdateReportModel(){
            if (this.selectItem.length === 0){
                this.userTool.toast('error', '请选择需要修改得项');
            }else if (this.selectItem.length === 1){
                for (let keys in this.updateUser){
                    this.updateUser[keys] = this.selectItem[0][keys];
                }
                this.selectItem[0].roleCodeString =  this.selectItem[0].roleCodeString.slice(1,  this.selectItem[0].roleCodeString.length -1)
                this.updateUser.roleList = [];
                // 解析用户权限，显示到多选框上去
                this.selectItem[0].roleCodeString.split(",").forEach(val => {
                    this.roleList.forEach(v => {
                        if (val.trim() === v.label.trim()){
                            this.updateUser.roleList.push(v.value);
                        }
                    });
                });
                this.updateModal = true;
            }else {
                this.userTool.toast('error', '只能选择一项进行修改');
            }
        },
        updateUserSubmit(name){
            this.$refs[name].validate((valid) => {
                if (valid) {
                    const roleLists = `[${this.updateUser.roleList}]`;
                    this.userSrv.updateUserInfo({uuid: this.selectItem[0].uuid, realname: this.updateUser.realname, phone: this.updateUser.phone, roleList: roleLists}).then(value => {
                        if (value.code === '1000') {
                            this.closeUpdateModel();
                            this.userTool.toast('success', '请求成功');
                            this.initUserData();
                        }else {
                            this.userTool.toast('error', value.msg);
                        }
                    });

                }
            })
        },
        // 取消选择，关闭弹窗
        closeUpdateModel(){
            // 调用子组件得方法
            this.$refs.tables.clearSelect();
            this.selectItem = [];
            this.updateModal = false;
            this.updateUser = new mainModel.AddUser();
        },
        // 重置密码
        reviewPaawordClick(data){
            console.log(data);
            this.userTool.setModal('confirm', '重置提醒', '确认要重置密码吗', () => {
                this.userSrv.resetUserPassword({uuid: data}).then(val => {
                    console.log(val);
                    if (val.code === '1000'){
                        this.userTool.toast('success', val.msg);
                        this.initUserData();
                    }else {
                        this.userTool.toast('error', val.msg);
                    }
                })
            })
        },
        delUserInfo(){
            if (this.selectItem.length === 0){
                this.userTool.toast('error', '请选择需要锁定得项');
            }else if (this.selectItem.length === 1) {
                this.userTool.setRemind('锁定', '锁定', ()=>{
                    this.userSrv.delUserInfo({uuid: this.selectItem[0].uuid}).then(val => {
                        if (val.code === '1000'){
                            this.$refs.tables.clearSelect();
                            this.selectItem = [];
                            this.userTool.toast('success', val.msg);
                            this.initUserData();
                        }else {
                            this.userTool.toast('error', val.msg);
                        }
                    })
                });
            }else {
                this.userTool.toast('error', '只能选择一项进行删除');
            }
        },
			openClockClick(data){
				this.userTool.setModal('confirm', '解锁提醒', '确认要解锁用户吗', () => {
					this.userSrv.openUserInfo({uuid: data}).then(val => {
						console.log(val);
						if (val.code === '1000'){
							this.userTool.toast('success', val.msg);
							this.initUserData();
						}else {
							this.userTool.toast('error', val.msg);
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
