import paging from "../../../../components/paging";
import tables from "../../../../components/table";
import Tool from "../../../../utils/tool";
import serve from "../../../../service/service";
import detailModal from '../../../../components/model/detailModal'

export default {
	name: 'inquire',
	data() {
		return {
			reportTypeList: {
				title: '报告类型',
				centent: []
			},
			// 报告状态列表
			reportStatusList: {
				title: '审核状态',
				centent: []
			},
			// 表格数据
			tableOption: {
				title: [],
				content: [],
			},
			tableBtn: {
				title: '操作',
				key: 'action',
				width: 240,
				align: 'center',
				render: (h, params) => {
					return h('div', [
						h('Button', {
							props: {
								size: 'small',
							},
							style: {
								fontSize: '12px',
								width: '3vw',
								background: (params.row.sysStatus === '未缴费') ? '#3DA2F8' : "#C9D0D6",
								color: '#fff',
								border: 0
							},
							attrs: {
								disabled: (params.row.sysStatus !== '未缴费')
							},
							on: {
								click: () => {
									this.inquireSetCompleteClick(params.row.sysDocumentId)
								}
							}
						}, (params.row.auditStatus !== '已缴费') ? '未完成' : '已完成'),
						h('Button', {
							props: {
								size: 'small',
							},
							style: {
								fontSize: '12px',
								width: '2.4vw',
								background: '#3DA2F8',
								color: '#fff',
								margin: '0 4px',
								border: 0
							},
							on: {
								click: () => {
									this.inquireGetDetailReportClick(params.row.sysDocumentId)
								}
							}
						}, '详情'),
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
									this.inquireClick(params.index)
								}
							}
						}, '打印二维码')
					]);
				}
			},
			// 分页数据
			pageOption: {
				now_num: 10,// 当前行数
				now_page: 1, // 当前页
				pageNum: 0, // 总页数
				totalRow: 0, //总条数
				page_list: []
			},
			detailOption: '',
			// 分页数据
			now_page: 1,
			now_num: 10,
			auditName: 4,
			selectReportName: '',
			selReportTable: '',
			searchInquireData: '',
			startTime: '',
			endTime: '',
			// 模态框数据
			inquireModal: false,
			// 已收费数据
			notChargedData: 0,
			// 未收费数据
			ChargedData: 0,
			searchTime: [],
			// 工具类
			iquireTool: new Tool(),
			iquireSrv: new serve(),
			itemData: [
				{id: 3, label: '报告总数', value: 0, fcolor: '#55ABF8', bgc: '#3DA2F8', borhidden: true, bwidth: 0},
				{id: 4, label: '已完成数', value: 0, fcolor: '#55ABF8', bgc: '#3DA2F8', borhidden: true, bwidth: 0},
				{id: 5, label: '未二级审核', value: 0, fcolor: '#55ABF8', bgc: '#3DA2F8', borhidden: true, bwidth: 0},
				{id: 6, label: '未三级审核', value: 0, fcolor: '#55ABF8', bgc: '#3DA2F8', borhidden: true, bwidth: 0},
			],
			itemData1: [
				{id: 1, label: '已收费数', value: 0, fcolor: '#E17055', bgc: '#E17055', borhidden: false, bwidth: 0},
				{id: 2, label: '未收费数', value: 0, fcolor: '#E17055', bgc: '#E17055', borhidden: true, bwidth: 0},
			]
		}
	},
	created() {
		Promise.resolve(this.getReportType()).then(() => {
			return Promise.resolve(this.getReportStatus())

		}).then(() => {
			Promise.resolve(this.getTableTitle())
		});
		this.getReportNum();
		this.getReportCost();
	},
	methods: {
		// 获取类型
		getReportType() {
			return new Promise((resolve) => {
				this.iquireSrv.getReportTypeList({}).then(value => {
					if (value.code === '1000') {
						value.data.forEach(v => {
							if (v.tempName === '房屋评价报告') {
								this.reportTypeList.centent.push({
									name: v.tempName,
									value: '1',
									bgc: '#FFFFFF',
									color: '#5D6063',
									uuid: v.uuid,
									table: v.tempTable,
								});
								this.selectReportName = v.uuid;
								this.selReportTable = v.tempTable;
							} else {
								this.reportTypeList.centent.push({name: v.tempName, value: '0', bgc: '#EFEFEF',		table: v.tempTable, color: '#C2C2C2', uuid: v.uuid})
							}
						});
						resolve();
					}
				});
			})
		},
		// 获取状态
		getReportStatus() {
			return new Promise((resolve) => {
				this.iquireSrv.getReportStatusList({}).then(value => {
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
					}
				});
			})
		},
		// 获取给所有报告的数量
		getReportNum() {
			this.iquireSrv.getMyReportEveryStausNum({}).then(
				value => {
					// console.log(value);
					if (value.code === '1000') {
						this.setItemDataNum(this.itemData[0], value.data.count, value.data.count);
						this.setItemDataNum(this.itemData[1], value.data.count4, value.data.count);
						this.setItemDataNum(this.itemData[2], value.data.count0, value.data.count);
						this.setItemDataNum(this.itemData[3], value.data.count0, value.data.count);
						this.setItemDataNum(this.itemData[3], value.data.count2, value.data.count);
						this.setItemDataNum(this.itemData1[0], value.data.count4, value.data.count);
						this.setItemDataNum(this.itemData1[1], value.data.count3, value.data.count);
					} else {
						this.iquireTool.toast('error', value.msg)
					}

				}
			)
		},  // 获取给所有报告的数量
		// 获取花费
		getReportCost() {
			this.iquireSrv.getMyReportCostData({}).then(
				value => {
					if (value.code === '1000') {
						this.notChargedData = value.data.cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
						this.ChargedData = value.data.costed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
					} else {
						this.iquireTool.toast('error', value.msg)
					}

				}
			)
		},
		// 获取表头
		getTableTitle() {
			this.iquireSrv.getTableTitleData({tempTable: this.selReportTable}).then(val => {
				if (val.code === '1000') {
					this.tableOption.title = [];
					val.data.forEach(v => {
						this.tableOption.title.push(v)
					});
					this.tableOption.title.unshift({
						type: 'selection',
						width: 60,
						align: 'center',
						className: 'select-table'
					});
					this.tableOption.title.push(this.tableBtn);
					this.initMyReportData();
				} else {
					this.reviewTool.toast('error', val.msg)
				}
			})
		},
		// 初始化列表
		initMyReportData() {
			this.iquireSrv.queryMyReportPageData({
				auditStatus: this.auditName,
				templateId: this.selectReportName,
				timeBegin: this.startTime,
				timeEnd: this.endTime,
				pageNo: this.now_page,
				pageSize: this.now_num
			}).then(value => {
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
					this.iquireTool.toast('error', value.msg)
				}

			})
		},
		// 获取当前页数据
		getPageDate(data) {
			this.now_num = data.num_Size;
			if (data.label === 'row') {
				this.now_page = 1;
			} else {
				this.now_page = data.nowPage;
			}
			this.initMyReportData();
		},
		// 选择报表类型
		selectInquireType(index) {
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
		selectInquireReview(index) {
			this.reportStatusList.centent.forEach(val => {
					val.bgc = '#EFEFEF';
					val.color = '#C2C2C2';
				}
			);
			this.reportStatusList.centent[index].bgc = '#FFFFFF';
			this.reportStatusList.centent[index].color = '#5D6063';
			this.auditName = this.reportStatusList.centent[index].value;
			this.initMyReportData();
		},
		// 未完成按钮事件  设置完成
		inquireSetCompleteClick(data){
			this.iquireSrv.reviewReportPass({sysTemplateId: this.selectReportName, sysDocumentId: data}).then(
				value => {
					console.log(value);
					if (value.code === '1000') {
						this.initMyReportData();
					} else {
						this.iquireTool.toast('error', value.message)
					}
				}
			);
		},
		// 详情按钮 ，查看详情
		inquireGetDetailReportClick(data){
			this.iquireSrv.queryDetailInfo({reportId: data, templateId: this.selectReportName}).then(
				value => {
					console.log(value);
					if (value.code === '1000'){
						this.setDetailReportInfo(value.data)
					}else {
						this.reviewTool.toast('error', value.message)
					}
				}
			);
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
				surebtn: '',
				canclebtn: '取消',
			}
		},
		closeDetailModel(){
			this.detailOption.hidden = false;
		},
		// 搜索
		searchData() {
			// console.log(this.searchInquireData);
		},
		searchInquireDataByTime() {
			this.now_page = 1;
			this.initMyReportData();
		},
		setItemDataNum(data, num, maxNum) {
			data.value = num;
			data.bwidth = num / maxNum * 100;
		},
		changeTime() {
			this.startTime = this.searchTime[0] === '' ? '' : this.iquireTool.setTimeFomart(this.searchTime[0]);
			this.endTime = this.searchTime[1] === '' ? '' : this.iquireTool.setTimeFomart(this.searchTime[1]);
		}
	},
	components: {
		paging,
		tables,
		detailModal
	}
}
