<template>
  <div id="bar">
    <div id="myCharts" style="width:90%;height: 60vh" ref="chart"></div>
  </div>
</template>

<script>
    export default {
        name: 'bar',
        data(){
            return{
                xData: [],
                yData: [],
                option: ''

         }
        },
        props: {
            data:{
                barData: {
                    type:Array,
                    default: []
                },
                colorList: {
                    type:Array,
                    default: []
                },
                min: {
                    type: Number,
                    default: 10
                },
            }
        },
        created() {
        },
        updated() {
        },
        methods: {
            drawBar (){
                let div = this.$refs.chart;
                this.myChart = this.$echarts.init(div);
                this.myChart.setOption(this.option)
            }
        },
        mounted() {
            // 最小值的定义
            this.data.barData.map(function(a) {
                this.xData.push(a.name);
                if (a.value === 0) {
                    this.yData.push(a.value + this.data.min);
                } else {
                    this.yData.push(a.value);
                }
                // this.yData.push((Math.random(0,1) * 100).toFixed(0));
            }.bind(this));
            this.option = {
                backgroundColor:"#fff",
                color: ['#3398DB'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'line',
                        lineStyle: {
                            opacity: 0
                        }
                    },
                    formatter: function(prams) {
                        if (prams[0].data === this.data.min) {
                            return "项目数：40"
                        } else {
                            return "项目数：" + prams[0].data + "个"
                        }
                    }.bind(this)
                },
                legend: {
                    show: false
                },
                grid: {
                    left: '10%',
                    right: '0%',
                    bottom: '15%',
                    top: '10%',
                    height: '85%',
                    containLabel: true,
                    z: 22
                },
                xAxis: {
                    name: '月份',
                    type: 'category',
                    gridIndex: 0,
                    data: this.xData,
                    axisTick: {
                        show:false,
                        alignWithLabel: false
                    },
                    axisLine: {
                        show:false,
                        lineStyle: {
                            color: '#0c3b71'
                        }
                    },
                    axisLabel: {
                        show: true,
                        color: '#000',
                        fontSize:16
                    }
                },
                yAxis: [{
                    name:'项目数',
                    type: 'value',
                    gridIndex: 0,
                    splitLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    min: this.data.min,
                    max: 100,
                    axisLine: {
                        show:false,
                        lineStyle: {
                            color: '#000'
                        }
                    },
                    axisLabel: {
                        color: '#000',
                        formatter: '{value}'
                    }
                },
                    {
                        type: 'value',
                        gridIndex: 0,
                        min: this.data.min,
                        max: 100,
                        splitNumber: 12,
                        splitLine: {
                            show: false
                        },
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            show: false
                        },
                        splitArea: {
                            show: true,
                            areaStyle: {
                                color: ['rgba(250,250,250,0.0)', 'rgba(250,250,250,0.05)']
                            }
                        }
                    }
                ],
                series: [{
                    name: '合格率',
                    type: 'bar',
                    barWidth: '30%',
                    xAxisIndex: 0,
                    yAxisIndex: 0,
                    itemStyle: {
                        normal: {
                            color: function(pamars){
                                    return this.data.colorList[pamars.dataIndex]
                                }.bind(this)
                        }
                    },
                    data: this.yData,
                    zlevel: 11,
                    label: {
                        show: true,
                        fontSize: 16,
                        position: 'top',
                        color: '#B3B3B3',
                        // formatter: (params)=>{//单独对第一个label使用样式
                        //     if (params.dataIndex === 0) {
                        //         return '{a|'+params.value+'}'
                        //     }
                        // },
                        // rich: {//使用富文本编辑字体样式
                        //     a: {
                        //         color: 'red'
                        //     }
                        // }
                    }

                    },
                    {
                        name: '背景',
                        type: 'bar',
                        barWidth: '30%',
                        xAxisIndex: 0,
                        yAxisIndex: 1,
                        barGap: '-100%',
                        data: [100, 100, 100, 100, 100, 100, 100,100, 100, 100, 100, 100, 100],
                        itemStyle: {
                            normal: {
                                color: '#F2F2F2'
                            }
                        },
                        zlevel: 9
                    },

                ]
            };
            this.drawBar();
            /* 窗口变化时自适应 步骤一:监听窗口变化 */
            window.addEventListener("resize", () => {
                this.myChart.resize();
            });
        },
    }
</script>

<style scoped>

</style>
