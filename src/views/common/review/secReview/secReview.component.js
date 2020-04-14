import paging from "../../../../components/paging";
import tables from "../../../../components/table";
import Tool from "../../../../utils/tool";
import serve from "../../../../service/service";
import detailModal from '../../../../components/model/detailModal'
import mianModel from "../../../../model/model";

export default {
	name: 'secReview',
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
						key: 'sysStatus',
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
								}, params.row.result)
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
										background: (params.row.sysStatus === '未二级审核') ? '#3DA2F8' : "#C9D0D6",
										color: '#fff'
									},
									attrs: {
										disabled: (params.row.sysStatus !== '未二级审核')
									},
									on: {
										click: () => {
											this.reviewClick(params.row)
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
			searchreviewData: '',
			// 模态框数据
			reviewModal: false,
			// 工具类
			reviewTool: new Tool(),
			reviewSrv: new serve(),
			// 详情信息
			detailReport: new mianModel.AddLocalReport(),
			// 审核id
			reportId: '',
			// 审核不通过的模态框
			detailOption: '',
			// 审核不通过的原因列表
			reasonTypeList: [
				{label: '估价对象估价过高', value: '估价对象估价过高'},
				{label: '估价对象存在不确定性的潜在风险', value: '估价对象存在不确定性的潜在风险'},
				{label: '忽视估价目的的可行性', value: '忽视估价目的的可行性'},
				{label: '其他', value: '其他'},
			],
			appraisalList: [],
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
	created() {
		Promise.resolve(this.getReportType()).then(() => {
			return Promise.resolve(this.getReportStatus())

		}).then(() => {
			Promise.resolve(this.initReviewData())
		});
		// this.getAppraiserLlist('', this.appraisalList);

	},
	methods: {
		// 获取类型
		getReportType() {
			return new Promise((resolve) => {
				this.reviewSrv.getReportTypeList({}).then(value => {
					if (value.code === '1000') {
						value.data.forEach((v, index) => {
							if (index === 1) {
								this.reportTypeList.centent.push({
									name: v.tempName,
									value: '1',
									bgc: '#FFFFFF',
									color: '#5D6063',
									uuid: v.uuid
								});
								this.selectReportName = v.uuid;
							} else {
								this.reportTypeList.centent.push({
									name: v.tempName,
									value: '0',
									bgc: '#EFEFEF',
									color: '#C2C2C2',
									uuid: v.uuid
								})
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
				this.reviewSrv.getReportStatusList({}).then(value => {
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
		// 初始化列表
		initReviewData() {
			this.reviewSrv.getReportTwoAuditTypeList({
				auditStatus: this.auditName,
				templateId: this.selectReportName,
				pageNo: this.now_page,
				pageSize: this.now_num
			}).then(value => {
				this.pageOption.page_list = [];
				if (value.code === '1000') {
					console.log(value);
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
					this.reviewTool.toast('error', value.msg)
				}

			})
		},
		// 选择报表类型
		selectReviewType(index) {
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
				console.log(this.selectReportName);
				this.initReviewData();
			}

		},
		// 选择审核状态
		selectReview(index) {
			this.reportStatusList.centent.forEach(val => {
					val.bgc = '#EFEFEF';
					val.color = '#C2C2C2';
				}
			);
			this.reportStatusList.centent[index].bgc = '#FFFFFF';
			this.reportStatusList.centent[index].color = '#5D6063';
			this.auditName = this.reportStatusList.centent[index].value;
			this.initReviewData();
		},
		// 审核
		reviewClick(data) {
			this.reportId = data.reportId;
			for (let key in this.detailReport) {
				this.detailReport[key] = data[key]
			}
			this.detailReport.auditor2Uuid = data.auditor2;
			this.detailReport.auditor3Number = data.auditor3;
			this.detailReport.projectPrincipalNumber = data.projectPrincipal;
			this.appraisalList.forEach(val => {
				if (this.detailReport.valuer1 === val.value) {
					this.detailReport.valuer1 = val.label;
				}
				if (this.detailReport.valuer2 === val.value) {
					this.detailReport.valuer2 = val.label;
				}
			});
			this.reviewModal = true;

		},
		// 获取分页组件的数据
		getPageDate(data) {
			console.log(data);
		},

		searchData() {
			console.log(this.searchData);
		},
		// 审核通过
		reviewPasse() {
			this.reviewTool.setRemind('审核通过', '审核通过', () => {
				this.reviewSrv.reviewReportPass({reportId: this.reportId}).then(val => {
					if (val.code === '1000') {
						this.reviewTool.toast('success', val.msg);
						this.closeModelAndClearData();
						this.initReviewData()
					} else {
						this.reviewTool.toast('error', val.msg);
					}
				})
			})
		},
		// 显示审核不通过弹窗
		reviewNoPasse() {
			console.log(234);
			this.reviewModal = false;
			this.reviewNoModal = true;
		},
		// 选择不通过的理由
		changeReasonType(value) {
			console.log(value);
			this.effectFrom.effectType = false;
			if (value === '其他') {
				this.showOther = true;
			} else {
				this.showOther = false;
			}

		},
		// 效验其他原因的填空
		effecfText() {
			if (this.effectFrom.effectText !== '') {
				this.effectFrom.effectText = false;
			}
		},
		// 确定审核不通过
		sureReviewNoPassClick() {
			if (this.reviewNoData.type !== '') {
				if (this.reviewNoData.type !== '其他') {
					this.reviewNoPassRequest(this.reportId, this.reviewNoData.type);
				} else {
					if (this.reviewNoData.text !== '') {
						this.reviewNoPassRequest(this.reportId, this.reviewNoData.text);
					} else {
						this.effectFrom.effectText = true;

					}
				}
			} else {
				this.effectFrom.effectType = true;
			}


		},
		closeDetailModel(){

		},
		// 关闭弹窗并且清除数据
		closeModelAndClearData() {
			this.detailReport = new mianModel.AddLocalReport();
			this.reviewModal = false;
			this.reviewNoModal = false;
			this.effectFrom = false;
			this.showOther = false;

		},
		// 审核不通过的请求
		reviewNoPassRequest(id, reason) {
			this.reviewSrv.reviewReportNoPass({reportId: id, auditReason: reason}).then(val => {
				console.log(val);
				if (val.code === '1000') {
					this.reviewTool.toast('success', val.msg);
					this.closeModelAndClearData();
					this.initReviewData()
				} else {
					this.reviewTool.toast('error', val.msg);
				}
			})
		}
	},
	components: {
		paging,
		tables,
		detailModal
	}
}
