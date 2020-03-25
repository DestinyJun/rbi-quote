import pie from '../../../components/echarts/pie'
import bar from '../../../components/echarts/bar'
export default {
    name: 'graphic',
    data(){
        return {
            selectAutor: '',
            autorList: [],
            searchGraphicData: '',
            dataPiefir:{
                listData:[
                    {value:535, legendname:'房地产评估报告',name:"房地产评估报告",itemStyle:{color:"#3DA2F8"}},
                    {value:310, legendname:'房屋评估报告',name:"房屋评估报告",itemStyle:{color:"#60CAD8"}},
                    {value:234, legendname:'资产评估报告',name:"资产评估报告",itemStyle:{color:"#AEE5FF"}},
                    {value:154, legendname:'土地评估报告',name:"土地评估报告",itemStyle:{color:"#FAB1A0"}},
                    {value:254, legendname:'土地评估报告1',name:"土地评估报告1",itemStyle:{color:"#FDCB6E"}},
                ],
                height: '37vh',
                total: '1233'
            },
            dataPiesec:{
                listData:[
                    {value:535, legendname:'房地产评估报告',name:"房地产评估报告",itemStyle:{color:"#3DA2F8"}},
                    {value:310, legendname:'房屋评估报告',name:"房屋评估报告",itemStyle:{color:"#60CAD8"}},
                    {value:234, legendname:'资产评估报告',name:"资产评估报告",itemStyle:{color:"#AEE5FF"}},
                    {value:154, legendname:'土地评估报告',name:"土地评估报告",itemStyle:{color:"#FDCB6E"}},
                ],
                height: '38vh',
                total: '1233'
            },
            data: {
                barData:[{"name": "1月", "value": 56.65},
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
                colorList: ['#51AAF6',"#51AAF6","#51AAF6","#70CDDA","#51AAF6","#51AAF6","#51AAF6","#51AAF6","#51AAF6","#51AAF6","#51AAF6","#51AAF6"],
                min: 40
            }
        }
    },
    methods: {
        changeAutor(){
            console.log(this.selectAutor);
        },
        searchData(){}
    },
    components:{
        pie,
        bar
    }
}
