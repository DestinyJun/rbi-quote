import paging from "../../../../components/paging";
import tables from "../../../../components/table";
import Server from '../../../../service/service'
import Tool from '../../../../utils/tool'
import AddUser from "../../../../model/model";
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
                        key: 'name',
                        align: 'left',
                    },
                    {
                        title: '用户权限',
                        key: 'type',
                        align: 'center',
                    },
                    {
                        title: '用户真实姓名',
                        key: 'autor',
                        align: 'center',
                    },
                    {
                        title: '联系电话',
                        key: 'phone',
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
                                            this.reviewClick(params.index)
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
                totalRow: 150, //总条数
            },
            now_num: 10,
            now_page: 1,
            searchUserData: '',
            // 模态框数据
            reviewModal: false,
            addModal: false,
            userSrv: new Server(),
            userToll: new Tool(),
            roleList: [],
            addUser: new AddUser(),
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
                value => {
                    console.log(value);
                }
            )
        },
        changeType(){
          console.log(this.selectType);
        },
        btnClick(data){
            switch(data) {
                case 'add': this.addModal = true;
            }
        },
        addSure(name){
            this.$refs[name].validate((valid) => {
                if (valid) {
                    const roleLists = `[${this.addUser.roleList}]`;
                    this.userSrv.addUserInfo({username: this.addUser.username, realname: this.addUser.realname, phone: this.addUser.phone, roleList: roleLists}).then(value => {
                        if (value.code === '200') {
                            this.addModal = false;
                            this.addUser = new AddUser();
                            this.userToll.toast('success', '请求成功');
                        }else {
                            this.userToll.toast('error', value.msg);
                        }
                    });

                } else {
                    this.userToll.toast('error', '请求失败');
                }
            })
        },
        getPageDate(){

        },
        searchData(){

        }

    },
    components: {
        paging,
        tables
    }
}
