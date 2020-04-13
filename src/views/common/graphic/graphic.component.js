import pie from '../../../components/echarts/pie'
import bar from '../../../components/echarts/bar'
import Server from '../../../service/service'
import Tool from '../../../utils/tool'

export default {
	name: 'graphic',
	data() {
		return {
			// 选择项目负责人
			selectAutor: '',
			autorList: [],
			// 选择报告类型
			reportType: '',
			reportTypeList: [],
			searchGraphicData: '',
			dataPiefir: {
				listData: [
					{value: 535, legendname: '房地产评估报告', name: "房地产评估报告", itemStyle: {color: "#3DA2F8"}},
					{value: 310, legendname: '房屋评估报告', name: "房屋评估报告", itemStyle: {color: "#60CAD8"}},
					{value: 234, legendname: '资产评估报告', name: "资产评估报告", itemStyle: {color: "#AEE5FF"}},
					{value: 154, legendname: '土地评估报告', name: "土地评估报告", itemStyle: {color: "#FAB1A0"}},
					{value: 254, legendname: '土地评估报告1', name: "土地评估报告1", itemStyle: {color: "#FDCB6E"}},
				],
				height: '37vh',
				total: '1233'
			},
			dataPiesec: {
				listData: [
					{value: 535, legendname: '房地产评估报告', name: "房地产评估报告", itemStyle: {color: "#3DA2F8"}},
					{value: 310, legendname: '房屋评估报告', name: "房屋评估报告", itemStyle: {color: "#60CAD8"}},
					{value: 234, legendname: '资产评估报告', name: "资产评估报告", itemStyle: {color: "#AEE5FF"}},
					{value: 154, legendname: '土地评估报告', name: "土地评估报告", itemStyle: {color: "#FDCB6E"}},
				],
				height: '38vh',
				total: '1233'
			},
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
		// this.graphicSrv.judgeAuthorityOfUser({}).then(
		//
		// 	value => {
		// 		if (value.code === '1000') {
		// 			this.isAuthority = true;
		// 		} else {
		// 			this.isAuthority = false;
		// 		}
		// 	});
		this.getProjectMangerList();

	},
	methods: {
		// 获取项目负责人
		getProjectMangerList() {
			this.graphicSrv.getProjectManager({}).then(res => {
				console.log(res);
				if (res.code === '1000') {
					this.reportTypeList = [{label: '全部', value: ''}];
					this.autorList = [{label: '全部', value: ''}];
					res.data.principal.forEach(val => {
						this.autorList.push({label: val.projectPrincipal, value: val.projectPrincipalUuid})
					});
					res.data.template.forEach(val => {
						this.reportTypeList.push({label: val.tempName, value: val.uuid})
					});
					console.log(this.reportTypeList);
				} else {
					this.graphicTool.toast('error', res.msg)
				}
			})
		},
		changeAutor() {
			console.log(this.selectAutor);
		},
		changeReportType() {
			console.log(123);
		},
		searchData() {
		}
	},
	components: {
		pie,
		bar
	}
}
