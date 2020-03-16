import paging from "../../../../components/paging";
import tables from "../../../../components/table";
export default {
    name: 'sign',
    data(){
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
                content: [
                    {
                        name: '202015612312',
                        type: '房地产估价',
                        phone: '18283023242',
                        autor: '张三',
                    },
                    {
                        name: 'Jim Green',
                        type: '房地产估价',
                        phone: '18283023242',
                        autor: '张三',
                    },
                    {
                        name: 'Joe Black',
                        type: '房地产估价',
                        phone: '已完成',
                        autor: '张三',
                    },
                    {
                        name: 'Jon Snow',
                        type: '房地产估价',
                        phone: '18283023242',
                        autor: '张三',
                    },
                    {
                        name: 'Jon Snow',
                        type: '房地产估价',
                        phone: '18283023242',
                        autor: '张三',
                    },
                    {
                        name: 'Jon Snow',
                        type: '房地产估价',
                        phone: '18283023242',
                        autor: '张三',
                    },
                    {
                        name: 'Jon Snow',
                        type: '房地产估价',
                        phone: '18283023242',
                        autor: '张三',
                    },
                    {
                        name: 'Jon Snow',
                        type: '房地产估价',
                        phone: '18283023242',
                        autor: '张三',
                    },
                    {
                        name: 'Jon Snow',
                        type: '房地产估价',
                        phone: '18283023242',
                        autor: '张三',
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
            searchreviewData: '',
            // 模态框数据
            reviewModal: false
        }
    },
    methods: {

    },
    components: {
        paging,
        tables
    }

}
