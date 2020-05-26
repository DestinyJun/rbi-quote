// 自定义组件
import paging from "@/components/paging";
import tables from "@/components/table";
import QRCodes from "@/components/QRCode";
import modal from '@/components/model/dialog'
import detailModal from '@/components/model/detailModal'
// 服务
import serve from "@/service/service";
// 工具类
import Tool from '@/utils/tool'
// 实体类
import mianModel from "@/model/model";

export default {
	name: 'report',
	data() {
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
			// 当前选中的表名
			selTable: '',
			addReporFiledtList: [],
			// 当前选中报告的名字
			selectReportName: '',
			// 选择的表名
			selReportTable: '',
			// 表格数据
			tableOption: {
				title: [],
				content: [],
			},
			// 模态框数据
			detailOption: '', // 详情弹窗
			QRCodeModal: false, // 打印二维码弹窗
			addTypeReportModel: false, // 填报类型选择弹窗

			// 报告类型选择
			selRport: new mianModel.SelectReportType(),
			// 填写报告
			addReport: new mianModel.AddLocalReport(),
			addSubmitReport: new mianModel.AddReport(),
			updateReport: new mianModel.AddLocalReport(),
			detailReport: new mianModel.AddLocalReport(),
			//修改时需要的id
			reportId: '',
			// 估价师总列表
			appraiserTotalList: [],
			// 二维码内容
			codeUrl: '',
			// 工具类
			reportTool: new Tool(),
			reportSrv: new serve(),
			addList: [],
			// 报告选择的规则
			ruleValidate: {
				reportType: [
					{required: true, message: '请选择报告类型', trigger: 'change'}
				],
			},
			addOption: ''
		}
	},
	created() {
		Promise.resolve(this.getReportType()).then(() => {
			return Promise.resolve(this.getReportStatus())
		}).then(() => {
			Promise.resolve(this.getTableTitle())
		});
		// this.getAddAppraiserLlist('', this.appraiserTotalList);
	},
	methods: {
		// 获取类型
		getReportType() {
			return new Promise((resolve) => {
				this.reportSrv.getReportTypeList({}).then(value => {
					if (value.code === '1000') {

						value.data.forEach((v, index) => {
							if (index === 1) {
								this.reportTypeList.centent.push({
									name: v.tempName,
									value: '1',
									bgc: '#FFFFFF',
									color: '#5D6063',
									table: v.tempTable,
									uuid: v.uuid
								});
								this.selectReportName = v.uuid;
								this.selReportTable = v.tempTable;
								this.selTable = v.statusCode;
							} else {
								this.reportTypeList.centent.push({
									name: v.tempName,
									value: '0',
									bgc: '#EFEFEF',
									color: '#C2C2C2',
									table: v.tempTable,
									uuid: v.uuid
								})
							}
						});
						resolve();
					}else {
						this.reportTool.toast('error', value.msg)
					}
				});
			})
		},
		// 获取表头
		getTableTitle(){
       this.reportSrv.getTableTitleData({tempTable: this.selReportTable}).then(val => {
       	if (val.code === '1000'){
       		// console.log(val);
					this.tableOption.title = [];
					val.data.forEach(v=> {
						this.tableOption.title.push(v)
					});
					this.tableOption.title.unshift({
						type: 'selection',
						width: 60,
						align: 'center',
						className: 'select-table'
					});
					this.tableOption.title.push(	{
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
										size: 'small'
									},
									style: {
										fontSize: '12px',
										background: (params.row.flag !== 1) ? '#3DA2F8' : "#C9D0D6",
										color: '#fff',
										// display: (params.row.sysStatus !== '未缴费' && params.row.sysStatus !== '已完成') ? 'none': 'inline-block'
									},
									attrs: {
										disabled: (params.row.flag === 1),
										// hidden: false
									},
									on: {
										click: () => {
											this.printQRCode(params.row.sysDocumentId)
										}
									}
								}, '打印二维码')
							]);
						}
					});
					this.initReportData();
					console.log(this.tableOption.title);
				}else {
					this.reportTool.toast('error', val.msg)
				}
			 })
		},
		// 获取状态
		getReportStatus() {
			return new Promise((resolve) => {
				this.reportSrv.getReportStatusList({}).then(value => {
					console.log(value);
					if (value.code === '1000') {
						value.data.forEach((v, index) => {
							if (index === 0) {
								this.reportStatusList.centent.push({
									name: v.statusName,
									value: v.statusCode,
									bgc: '#FFFFFF',
									color: '#5D6063'
								});
								this.auditName = v.statusCode;
							} else {
								this.reportStatusList.centent.push({
									name: v.statusName,
									value: v.statusCode,
									bgc: '#EFEFEF',
									color: '#C2C2C2'
								})
							}
						});
						resolve()
					}else {
						this.reportTool.toast('error', value.msg)
					}
				});
			})
		},
		// 初始化列表
		initReportData() {
			this.reportSrv.getReportTableData({
				auditStatus: this.auditName,
				templateId: this.selectReportName,
				pageNo: this.now_page,
				pageSize: this.now_num
			}).then(value => {
				console.log(value);
				this.pageOption.page_list = [];
				if (value.code === '1000') {
					this.tableOption.content = value.data.contents;
					this.tableOption.content.forEach(v => {
						this.reportStatusList.centent.forEach(val => {
							if (val.value === v.sysStatus.toString()) {
								v.sysStatus = val.name
							}
						})
					});
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
				} else {
					this.reportTool.toast('error', value.msg)
				}

			})
		},
		// 选择报表类型
		selectReportType(index) {
			if (this.selectReportName !== this.reportTypeList.centent[index].uuid) {
				this.reportTypeList.centent.forEach(val => {
						val.bgc = '#EFEFEF';
						val.color = '#C2C2C2';
						val.value = '0';
					}
				);
				this.reportTypeList.centent[index].bgc = '#FFFFFF';
				this.reportTypeList.centent[index].color = '#5D6063';
				this.reportTypeList.centent[index].value = '1';
				this.selectReportName = this.reportTypeList.centent[index].uuid;
				this.selReportTable = this.reportTypeList.centent[index].table;
				this.getTableTitle();
			}

		},
		// 选择审核状态
		selectReportReview(index) {
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
		searchReportData() {

		},
		// 获取分页组件中当前页条数
		getPageDate(data) {
			this.now_num = data.num_Size;
			if (data.label === 'row') {
				this.now_page = 1;
			} else {
				this.now_page = data.nowPage;
			}
			this.initReportData();
		},
		// 展示详情弹窗
		showDetailDialog(data) {
			console.log(this.selectReportName);
			this.reportSrv.queryDetailInfo({templateId: this.selectReportName, reportId: data.sysDocumentId}).then(res => {
				if (res.code === '1000') {
					this.setDetailReportInfo(res.data)
				}else {
					this.reportTool.toast('error', res.msg)
				}
			});
		},
		// 打印二维码
		printQRCode(code) {
			this.codeUrl = `http://www.gyrb.com/quote/#/QRcode?code=${code}&id=${this.selectReportName}&token=${localStorage.getItem('accessToken')}`;
			console.log(this.codeUrl);
			this.QRCodeModal = true;
		},
		// 显示填报选择弹窗
		showAddRepotrt() {
			// 查询估价目的
			this.addTypeReportModel = true;
		},
		// 确认选择报告类型
		selectReport(name) {
			this.$refs[name].validate(valid => {
				if (valid) {
					let uuid = '';
					let tempName = '';
					this.addTypeReportModel = false;
					this.reportTypeList.centent.forEach(val => {
						if (val.table === this.selRport.reportType) {
							uuid = val.uuid;
							tempName = val.name
						}
					});
					this.reportSrv.getAddReportTableInfo({
						tempTable: this.selRport.reportType,
						uuid: uuid,
						tempName: tempName
					}).then(res => {
						console.log(res);
						if (res.code === '1000') {
							// this.addList = ;
							this.setAddReportModalData(res.data)
						} else {
							this.reportTool.toast('error', `${res.msg},${res.data}`)
						}
					})
				}
			})
		},
		// 设置 数据 弹窗
		setAddReportModalData(data) {
			// data.forEach()
			let obj = {};
			let objRules = {};
			this.addList = data;
			data.forEach(v => {
				// eslint-disable-next-line no-prototype-builtins
				if (v.hasOwnProperty('value')){
					obj[v.key] = v.value;
				}else {
					obj[v.key] = '';
				}
				if (v.dataType === 'Number') {
					objRules[v.key] = [
						{required: false, type: 'number', message: v.label + '是必填项', trigger: 'blur'}
					]
				} else {
					if (v.type === 'date') {
						objRules[v.key] = [
							{required: v.required, message: v.label + '是必填项', trigger: 'change', pattern: /.+/}
						]
					} else {
						objRules[v.key] = [
							{required: v.required, message: v.label + '是必填项', trigger: 'change'}
						]
					}
				}
			});
			console.log(data);
			console.log(objRules);
			this.addOption = {
				width: 960,
				hidden: true,
				height: data.length > 13 ? 600 : data.length < 8 ? 300: 500 ,
				title: '添加信息',
				style: {top: '100px', height: '90vh'},
				ruleValidate: objRules,
				modelData: obj,
				dataList: data,
				modalType: 'add',
			};
			// console.log(data);
		},
		// 提交报告
		addUploadReport(model, type) {
			for (let key in model) {
				this.addList.forEach(val => {
					if (key === val.key) {
						if (val.type === 'date') {
							model[key] = this.setTimeFomart(model[key])
						}
					}
				})
			}
			if (type === 'add') {
				// 添加请求
				this.reportSrv.addReport(model).then(value => {
					if (value.code === '1000') {
						this.selRport = new mianModel.SelectReportType();

						this.initReportData();
						this.closeUpdateModel();
						this.reportTool.toast('success', value.msg);
					} else {
						this.reportTool.toast('error', value.msg);
					}
				});
			} else {
				model.sysDocumentId = this.selectItem[0].sysDocumentId;
				// 修改请求
				this.reportSrv.updateReport(model).then(value => {
					if (value.code === '1000') {
						this.closeUpdateModel();
						this.initReportData();
						this.reportTool.toast('success', value.msg);
					} else {
						this.reportTool.toast('error', value.msg);
					}
				})
			}

		},
		// 时间转换
		setTimeFomart(data) {
			let d = new Date(data);
			return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
		},
		// 值获取名字
		setValueToLable(data, list, callback) {
			list.forEach(v => {
				if (v.value === data) {
					callback(v.label)
				}
			})
		},
		// 选择数据
		selectTableItem(data) {
			this.selectItem = data;
		},
		// 现实修改弹窗
		showUpdateReportModel() {
			if (this.selectItem.length === 0) {
				this.reportTool.toast('error', '请选择需要修改得项');
			} else if (this.selectItem.length === 1) {
				this.getModelAllFielde(this.selectItem[0].sysDocumentId);
			} else {
				this.reportTool.toast('error', '只能选择一项进行修改');
			}
		},
		// 获取修改报告的信息
		getModelAllFielde(id) {
			this.reportSrv.queryChageInfoByCode({templateId: this.selectReportName, reportId: id}).then(val => {
				if (val.code === '1000') {
					this.setChangeReportInfo(val.data)
				}
			})
		},
		// 设置修改弹窗信息
		setChangeReportInfo(data) {
			console.log(data);
			let obj = {};
			let objRules = {};
			this.addList = data;
			data.forEach(v => {
				obj[v.key] = v.value;
				if (v.dataType === 'Number') {
					objRules[v.key] = [
						{required: v.required,type: 'number', message: v.label + '是必填项', trigger: 'blur'}
					]
				} else {
					if (v.type === 'date') {
						objRules[v.key] = [
							{required: v.required, message: v.label + '是必填项', trigger: 'change', pattern: /.+/}
						]
					} else {
						objRules[v.key] = [
							{required: v.required, message: v.label + '是必填项', trigger: 'change'}
						]
					}
				}
			});
			console.log(objRules);
			this.addOption = {
				width: 960,
				hidden: true,
				height: data.length > 13 ? 600 : data.length < 8 ? 300: 500 ,
				title: '修改信息',
				style: {top: '100px', height: '90vh'},
				ruleValidate: objRules,
				modelData: obj,
				dataList: data,
				modalType: 'update',
			};
		},
		// 设置详情弹窗
		setDetailReportInfo(data) {
			this.detailOption = {
				width: 960,
				hidden: true,
				height: data.length > 15 ? 500 : 300,
				title: '详情',
				style: {top: '100px', height: '90vh'},
				dataList: data,
				surebtn: '确认',
				canclebtn: '取消',
			}
		},
		// 取消选择，关闭弹窗
		closeUpdateModel() {
			this.selectItem = [];
			this.selRport = new mianModel.SelectReportType();
			this.addOption.hidden = false;
			this.addOption.ruleValidate = {};
			this.addOption.modelData = {};
			this.addOption.dataList = [];
			this.addList = [];
			// 调用子组件得方法
			this.$refs.tables.clearSelect();
		},
		closeDetailModel() {
			this.detailOption.hidden = false;
			// this.detailOption.hidden = [];
			this.detailOption.dataList = [];
		},
		// 删除报告
		deleteReport() {
			if (this.selectItem.length === 0) {
				this.reportTool.toast('error', '请选择需要删除得项');
			} else {
				let data = [];
				this.selectItem.forEach(val => {
					data.push({sysDocumentId: val.sysDocumentId})
				});
				this.reportTool.setModal('confirm', '删除提醒', '您确认要删除该项吗?', () => {
					this.reportSrv.delReport({
						data: data,
						templateId: this.selectReportName
					}).then(val => {
						if (val.code === '1000') {
							this.$refs.tables.clearSelect();
							this.initReportData();
							this.selectItem = [];
							this.reportTool.toast('success', val.msg)
						} else {
							this.reportTool.toast('error', val.msg)
						}
					});
				})

			}
		}

	},
	components: {
		paging,
		tables,
		QRCodes,
		modal,
		detailModal
	}
}
