import paging from "../../../../components/paging";
import tables from "../../../../components/table";
import Server from '../../../../service/service'
import Tool from '../../../../utils/tool'
import mainModel from "../../../../model/model";

export default {
	name: 'sign',
	data() {
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
			tableOption: {
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
			updateModal: false,
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
					{required: true, message: '用户名不能为空', trigger: 'blur'},
				],
				signedNumber: [
					{required: true, message: '证件号不能为空 ', trigger: 'blur'},
				],
				signedType: [
					{required: true, message: '请选择证件类型', trigger: 'blur'},
				],
				signedLoginUser: [
					{required: true, message: '请选择所属账户', trigger: 'change'},
				],
				signedTypeName: [
					{required: false, message: '请选择证件类型', trigger: 'focus'},
				]
			}
		}
	},
	created() {
		this.signerSrv.getSignerConfigData({}).then(value => {
			console.log(value);
			if (value.code === '1000') {
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
		initSignerData() {
			this.signerSrv.querySignPageData({pageSize: this.now_num, page: this.now_page}).then(
				(value) => {
					console.log(value);
					this.pageOption.page_list = [];
					if (value.code === '1000') {
						console.log(this.singerConfig.signerUserList);
						value.data.contents.forEach(v => {
							// 值获取名字
							this.setValueToLable(v.signedLoginUser, this.singerConfig.signerUserList, (name) => {
								v.sysCreateUser = name;
							})
						});
						console.log(this.tableOption.content);
						this.tableOption.content = value.data.contents;
						for (let i = 1; i <= value.data.totalPage; i++) {
							if (i === this.now_page) {
								this.pageOption.page_list.push({name: i, bgc: '#A9B0B6', color: '#EDEEEF'})
							} else {
								this.pageOption.page_list.push({name: i, bgc: '#FFFFFF', color: '#6D6F71'})
							}
						}
						this.pageOption.pageNum = value.data.totalPage;
						this.pageOption.now_page = this.now_page;
						this.pageOption.now_num = this.now_num;
						this.pageOption.totalRow = value.data.totalRecord;
					}
				}
			)
		},
		searchData() {

		},
		// 取消选择，关闭弹窗
		closeUpdateModel() {
			// 调用子组件得方法
			this.$refs.tables.clearSelect();
			this.selectItem = [];
			this.updateModal = false;
			this.addModal = false;
			this.updateUser = new mainModel.AddUser();
			this.addSigner = new mainModel.AddUser();
		},
		// 选择数据
		selectTableItem(data) {
			this.selectItem = data;
		},
		getPageDate(data) {
			this.now_num = data.num_Size;
			if (data.label === 'row') {
				this.now_page = 1;
			} else {
				this.now_page = data.nowPage;
			}
			this.initUserData();
		},
		setValueToLable(data, list, callback) {
			list.forEach(v => {
				if (v.value === data) {
					callback(v.label)
				}
			})
		},
		// 显示添加弹窗
		showAddSignerModal() {
			this.addModal = true;
		},
		// 添加签字人员
		addSignerInfo(name) {
			this.$refs[name].validate(valid => {
				if (valid) {
					this.setValueToLable(this.addSigner.signedType, this.singerConfig.signerTypeList,
						(data) => {
							this.addSigner.signedTypeName = data;
						});
					this.signerSrv.addSigner(this.addSigner).then(value => {
						if (value.code === '1000') {
							this.initSignerData();
							this.closeUpdateModel();
							this.signerTool.toast('success', value.code);
						} else {
							this.signerTool.toast('error', value.code);
						}
					})
				}
			})
		},
		// 修改签字人员
		showUpdateSignerModal() {
			if (this.selectItem.length === 0) {
				this.signerTool.toast('error', '操作错误，请选择一项进行修改');
			} else if (this.selectItem.length === 1) {
				for (let keys in this.updateSigner) {
					this.updateSigner[keys] = this.selectItem[0][keys]
				}
				this.singerConfig.signerTypeList.forEach(value => {
					if (value.label === this.updateSigner.signedTypeName) {
						this.updateSigner.signedType = value.value;
					}
				});
				this.updateSigner.uuid = this.selectItem[0].uuid;
				this.updateModal = true;
			} else {
				this.signerTool.toast('error', '操作错误，只能选择一项进行修改');
			}
		},
		updateSignerInfo(name) {
			this.$refs[name].validate(valid => {
				if (valid) {
					this.setValueToLable(this.updateSigner.signedType, this.singerConfig.signerTypeList,
						(data) => {
							this.updateSigner.signedTypeName = data;
						});
					this.signerSrv.updateSignerInfo(this.updateSigner).then(value => {
						if (value.code === '1000') {
							this.initSignerData();
							this.closeUpdateModel();
							this.signerTool.toast('success', value.code);
						} else {
							this.signerTool.toast('error', value.code);
						}
					})
				}
			})
		},
		// 删除签字人员
		delSingerInfo() {
			if (this.selectItem.length === 0) {
				this.signerTool.toast('error', '操作错误，请选择一项进行删除');
			} else if (this.selectItem.length === 1) {
				this.signerTool.setRemind('删除', '删除', () => {
					this.signerSrv.delSigner({uuid: this.selectItem[0].uuid}).then(res => {
						if (res.code === '1000') {
							this.initSignerData();
							this.signerTool.toast('success', res.msg);
						} else {
							this.signerTool.toast('error', res.msg);
						}
					})
				})
			} else {
				this.signerTool.toast('error', '操作错误，只能选择一项进行删除');
			}
		}
	},
	components: {
		paging,
		tables
	}

}
