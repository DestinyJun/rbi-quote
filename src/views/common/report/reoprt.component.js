import paging from "../../../components/paging";
import tables from "../../../components/table";
import QRCodes from "../../../components/QRCode";
export default {
    name: 'report',
    data(){
        return {
            dropData: {
                    title: '报告类型',
                    centent: [
                        {name: '全部', value: '1', bgc: '#FFFFFF', color: '#5D6063'},
                        {name: '房地产估价报告', value: '1', bgc: '#EFEFEF',  color: '#C2C2C2'},
                        {name: '房屋估价报告', value: '1',   bgc: '#EFEFEF',  color: '#C2C2C2'},
                        {name: '资产估价报告', value: '1',  bgc: '#EFEFEF',  color: '#C2C2C2'},
                        {name: '土地估价报告', value: '1',   bgc: '#EFEFEF',  color: '#C2C2C2'},
                    ]
                },
            dropData2: {
                title: '审核状态',
                centent: [
                    {name: '全部', value: '1',  bgc: '#EFEFEF',  color: '#C2C2C2'},
                    {name: '已完成', value: '1',  bgc: '#FFFFFF', color: '#5D6063'},
                    {name: '未收费', value: '1' ,  bgc: '#EFEFEF',  color: '#C2C2C2'},
                    {name: '未二级审核', value: '1',  bgc: '#EFEFEF',  color: '#C2C2C2'},
                    {name: '未三级审核', value: '1',  bgc: '#EFEFEF',  color: '#C2C2C2'},
                    {name: '审核未通过', value: '1',  bgc: '#EFEFEF',  color: '#C2C2C2'},
                ]
            },
            searchData: '',
            selecteds: [],
            // 分页数据
            pageOption: {
                now_num: 10,// 当前行数
                now_page: 1, // 当前页
                pageNum: 15, // 总页数
                totalRow: 150, //总条数
            },
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
                        title: '报告编号',
                        key: 'name',
                        align: 'left',
                        width: 180,
                    },
                    {
                        title: '报告类型',
                        key: 'type',
                        align: 'center',
                        width: 180,
                    },
                    {
                        title: '审核状态',
                        key: 'status',
                        align: 'center',
                        width: 180,
                    },
                    {
                        title: '估价委托人',
                        key: 'autor',
                        align: 'center',
                        width: 180,
                    },
                    {
                        title: '估价对象',
                        key: 'address',
                        align: 'center',
                    },
                    {
                        title: '项目负责人',
                        key: 'persion',
                        align: 'center',
                        width: 140,
                    },
                    {
                        title: '估价结果',
                        key: 'result',
                        align: 'right',
                        width: 140,
                        render: (h, params) => {
                            return h('div', [
                                h('span', {
                                    style: {
                                        color: '#EF9F20'
                                    },
                                },params.row.result)
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
                                            this.showDetailDialog(params.index)
                                        }
                                    }
                                }, '详情'),
                                h('Button', {
                                    props: {
                                        size: 'small',
                                    },
                                    style: {
                                        fontSize: '12px',
                                        background: (params.row.flag  !== 1)? '#3DA2F8': "#C9D0D6",
                                        color: '#fff'
                                    },
                                    attrs: {
                                        disabled: (params.row.flag === 1)
                                    },
                                    on: {
                                        click: () => {
                                            this.printQRCode(params.index)
                                        }
                                    }
                                }, '打印二维码')
                            ]);
                        }
                    }
                ],
                content: [
                    {
                        name: '202015612312',
                        type: '房地产估价',
                        status: '未收费',
                        autor: '张三',
                        persion: '李四',
                        address: '贵州省遵义市红花岗区和上海路亚园庭院1栋22-3号',
                        result: '￥2016',
                        flag: 1
                    },
                    {
                        name: 'Jim Green',
                        type: '房地产估价',
                        status: '审核未通过',
                        autor: '张三',
                        persion: '李四',
                        address: '贵州省遵义市红花岗区和上海路亚园庭院1栋22-3号',
                        result: '￥2016',
                        flag: 1
                    },
                    {
                        name: 'Joe Black',
                        type: '房地产估价',
                        status: '已完成',
                        autor: '张三',
                        address: '贵州省遵义市红花岗区和上海路亚园庭院1栋22-3号',
                        persion: '李四',
                        result: '￥2016',
                        flag: 0
                    },
                    {
                        name: 'Jon Snow',
                        type: '房地产估价',
                        status: '未二级审核',
                        autor: '张三',
                        address: '贵州省遵义市红花岗区和上海路亚园庭院1栋22-3号',
                        persion: '李四',
                        result: '￥2016',
                        flag: 0
                    },
                    {
                        name: 'Jon Snow',
                        type: '房地产估价',
                        status: '已完成',
                        autor: '张三',
                        address: '贵州省遵义市红花岗区和上海路亚园庭院1栋22-3号',
                        persion: '李四',
                        result: '￥2016',
                        flag: 0
                    },
                    {
                        name: 'Jon Snow',
                        type: '房地产估价',
                        status: '已完成',
                        autor: '张三',
                        address: '贵州省遵义市红花岗区和上海路亚园庭院1栋22-3号',
                        persion: '李四',
                        result: '￥2016',
                        flag: 1
                    },
                    {
                        name: 'Jon Snow',
                        type: '房地产估价',
                        status: '已完成',
                        autor: '张三',
                        address: '贵州省遵义市红花岗区和上海路亚园庭院1栋22-3号',
                        persion: '李四',
                        result: '￥2016',
                        flag: 1
                    },
                    {
                        name: 'Jon Snow',
                        type: '房地产估价',
                        status: '已完成',
                        autor: '张三',
                        address: '贵州省遵义市红花岗区和上海路亚园庭院1栋22-3号',
                        persion: '李四',
                        result: '￥2016',
                        flag: 1
                    },
                    {
                        name: 'Jon Snow',
                        type: '房地产估价',
                        status: '已完成',
                        autor: '张三',
                        address: '贵州省遵义市红花岗区和上海路亚园庭院1栋22-3号',
                        persion: '李四',
                        result: '￥2016',
                        flag: 1
                    },

                ],
            },
            // 详情相关
            detailModal: false,
            QRCodeModal: false,
            // 二维码内容
            codeUrl: 'http://www.gyrbi.com/quote'
        }
    },
    created(){
    },
    methods: {
        // 选择报表类型
        selectReportType(index){
            this.dropData.centent.forEach(val => {
                    val.bgc = '#EFEFEF';
                    val.color = '#C2C2C2';
                }
            );
            this.dropData.centent[index].bgc = '#FFFFFF';
            this.dropData.centent[index].color = '#5D6063';
        },
        // 选择审核状态
        selectReportReview(index){
            this.dropData2.centent.forEach(val => {
                    val.bgc = '#EFEFEF';
                    val.color = '#C2C2C2';
                }
            );
            this.dropData2.centent[index].bgc = '#FFFFFF';
            this.dropData2.centent[index].color = '#5D6063';
        },
        // 搜索事件
        searchReportData(){
            console.log(this.searchData);
        },

        getPageDate(data){
            console.log(data);
        },

        // 展示详情弹窗
        showDetailDialog(){
            this.detailModal = true;
        },
        // 打印二维码
        printQRCode(){
           this.QRCodeModal = true;
        }
    },
    components: {
        paging,
        tables,
        QRCodes
    }

}