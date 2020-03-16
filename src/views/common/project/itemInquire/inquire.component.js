import paging from "../../../../components/paging";
import tables from "../../../../components/table";
export default {
    name: 'inquire',
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
                                        background: (params.row.flag  !== 1)? '#3DA2F8': "#C9D0D6",
                                        color: '#fff',
                                        border: 0
                                    },
                                    attrs: {
                                        disabled: (params.row.flag === 1)
                                    },
                                    on: {
                                        click: () => {
                                            this.inquireClick(params.index)
                                        }
                                    }
                                }, (params.row.flag  !== 1)? '未完成': '已完成'),
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
                                            this.inquireClick(params.index)
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

                ],
            },
            // 分页数据
            pageOption: {
                now_num: 10,// 当前行数
                now_page: 1, // 当前页
                pageNum: 15, // 总页数
                totalRow: 150, //总条数
            },
            searchInquireData: '',
            // 模态框数据
            inquireModal: false,
            itemData: [
                {label: '报告总数', value: 456, fcolor: '#55ABF8', bgc:'#3DA2F8', borhidden: true, bwidth: 456/500*100},
                {label: '已完成数', value: 132, fcolor: '#55ABF8', bgc:'#3DA2F8', borhidden: true, bwidth: 132/500*100},
                {label: '未二级审核', value: 66, fcolor: '#55ABF8', bgc:'#3DA2F8', borhidden: true, bwidth: 66/500*100},
                {label: '未三级审核', value: 100, fcolor: '#55ABF8', bgc:'#3DA2F8', borhidden: true, bwidth: 100/500*100},
            ],
            itemData1: [
                {label: '已收费数', value: 132, fcolor: '#E17055', bgc:'#E17055', borhidden: false, bwidth: 132/500*100},
                {label: '未收费数', value: 66, fcolor: '#E17055', bgc:'#E17055', borhidden: true, bwidth: 66/500*100},
            ]
        }
    },
    methods: {
        getPageDate(){
            // console.log(this.searchInquireData);
        },
        // 选择报表类型
        selectInquireType(index){
            this.dropData.centent.forEach(val => {
                    val.bgc = '#EFEFEF';
                    val.color = '#C2C2C2';
                }
            );
            this.dropData.centent[index].bgc = '#FFFFFF';
            this.dropData.centent[index].color = '#5D6063';
        },
        // 选择审核状态
        selectInquireReview(index){
            this.dropData2.centent.forEach(val => {
                    val.bgc = '#EFEFEF';
                    val.color = '#C2C2C2';
                }
            );
            this.dropData2.centent[index].bgc = '#FFFFFF';
            this.dropData2.centent[index].color = '#5D6063';
        },
        searchData(){
            console.log(this.searchInquireData);
        }
    },
    components: {
        paging,
        tables
    }
}
