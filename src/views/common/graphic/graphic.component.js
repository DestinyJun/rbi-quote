import pie from '../../../components/echarts/pie'
import bar from '../../../components/echarts/bar'
import Server from '../../../service/service'
import Tool from '../../../utils/tool'

export default {
	name: 'graphic',
	data() {
		return {
			// 选择项目负责人
			selectAutor: '0',
			reportTypeList: [],
			// 选择报告类型
			reportType: '0',
			autorList: [],

      colorList: [
				{color: "#3DA2F8"},
				{color: "#60CAD8"},
				{color: "#AEE5FF"},
				{color: "#FAB1A0"},
				{color: "#FDCB6E"},
			],
			searchGraphicData: '',
			dataPiefir: {
				listData: [],
				height: '37vh',
				total: 0
			},
			dataPiesec: {
				listData: [],
				height: '38vh',
				total: 0
			},
			showFirPie: false,
			showSecPie: false,

			data: {
				barData: [{"name": "1月", "value": 56.65},
					{"name": "2月", "value": 87.8,},
					{"name": "3月", "value": 81.3},
					{"name": "4月", "value": 75},
					{"name": "5月", "value": 80},
					{"name": "6月", "value": 94},
					{"name": "7月", "value": 89},
					{"name": "8月", "value": 53},
					{"name": "9月", "value": 73},
					{"name": "10月", "value": 80,},
					{"name": "11月", "value": 65},
					{"name": "12月", "value": 94,}
				],
				colorList: ['#51AAF6', "#51AAF6", "#51AAF6", "#70CDDA", "#51AAF6", "#51AAF6", "#51AAF6", "#51AAF6", "#51AAF6", "#51AAF6", "#51AAF6", "#51AAF6"],
				min: 40
			},
			graphicSrv: new Server(),
			graphicTool: new Tool(),
		}
	},
	created() {
		this.getProjectMangerList();
		this.getPieDataForType();
		this.getPieDataForSchedule();

	},
	methods: {
		// 获取项目负责人
		getProjectMangerList() {
			this.graphicSrv.getProjectManager({}).then(res => {
				console.log(res);
				if (res.code === '1000') {
					this.reportTypeList = [{label: '全部', value: '0'}];
					this.autorList = [{label: '全部', value: '0'}];
					res.data.principal.forEach(val => {
						this.autorList.push({label: val.sysPrincipalName, value: val.sysPrincipalId})
					});
					res.data.template.forEach(val => {
						this.reportTypeList.push({label: val.tempName, value: val.tempTable})
					});
				} else {
					this.graphicTool.toast('error', res.msg)
				}
			})
		},
		getPieDataForType(){
			console.log(this.reportType);
			this.graphicSrv.getPieData({uuid: this.selectAutor, reportType: this.reportType}).then(val => {
					if (val.code === '1000') {
						this.dataPiesec.listData = [];
						this.dataPiesec.total = 0;
						val.data.forEach((v, index) => {
							this.dataPiesec.total = this.dataPiesec.total + v.count;
							this.dataPiesec.listData.push({value: v.count, legendname: v.status, name: v.status, itemStyle: this.colorList[index]},)
						});
						this.showSecPie = true;
						this.$refs.dataPie2.drawPie();
					}else {
						this.graphicTool.toast('error', val.msg)
					}
				});

		},
		getPieDataForSchedule(){
			this.graphicSrv.getPieData({uuid: this.selectAutor}).then(val => {
				if (val.code === '1000') {
					this.dataPiefir.listData = [];
					this.dataPiefir.total= 0;
					val.data.forEach((v, index) => {
						this.dataPiefir.total = this.dataPiefir.total + v.count;
						this.dataPiefir.listData.push({value: v.count, legendname: v.status, name: v.status, itemStyle: this.colorList[index]},)
					});
					this.showFirPie = true;
					this.$refs.dataPie1.drawPie();
				}else {
					this.graphicTool.toast('error', val.msg)
				}
			});
		},
		changeAutor() {
			this.getPieDataForSchedule();
		},
		changeReportType() {
			this.getPieDataForType();
		},
		searchData() {
		}
	},
	components: {
		pie,
		bar
	}
}
