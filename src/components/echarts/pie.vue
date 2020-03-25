<template>
  <div id="pie">
    <div id="myCharts" :style="{'width':'100%','height': data.height}" ref="chart"></div>
  </div>
</template>

<script>
    export default {
        name: 'pie',
        data(){
            return{
                option: {
                    title: [
                        {
                            text: '合计',
                            subtext: this.data.total+'个',
                            textStyle:{
                                fontSize:20,
                                color:"black"
                            },
                            subtextStyle: {
                                fontSize: 20,
                                color: 'black'
                            },
                            textAlign:"center",
                            x: '34.5%',
                            y: '40%',
                        }],
                    tooltip: {
                        trigger: 'item',
                        formatter:function (parms){
                            var str= parms.marker+""+parms.data.legendname+"</br>"+
                                "数量："+ parms.data.value+"</br>"+
                                "占比："+ parms.percent+"%";
                            return  str ;
                        }
                    },
                    legend: {
                        type:"scroll",
                        orient: 'vertical',
                        left:'70%',
                        align:'left',
                        top:'middle',
                        textStyle: {
                            color:'#8C8C8C',
                            margin: '10px'
                        },
                        height:250
                    },
                    series: [
                        {
                            name:'标题',
                            type:'pie',
                            center: ['35%', '50%'],
                            radius: ['40%', '65%'],
                            clockwise: false, //饼图的扇区是否是顺时针排布
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: false,
                                    position: 'outter',
                                    formatter:function (parms){
                                        return parms.data.value;
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    length:5,
                                    length2:3,
                                    smooth:true,
                                }
                            },
                            data:this.data.listData
                        }
                    ]
                }
            }
        },
        props:{
            data:{
                listData: {
                    type: Array,
                    // eslint-disable-next-line vue/require-valid-default-prop
                    default: []
                },
                height: {
                    type: String,
                    // eslint-disable-next-line vue/require-valid-default-prop
                    default: ''
                },
                total: {
                    type: String,
                    // eslint-disable-next-line vue/require-valid-default-prop
                    default: ''
                }

            }
        },
        methods:{
            drawPie (){
                let div = this.$refs.chart;
                this.myChart = this.$echarts.init(div);
                this.myChart.setOption(this.option)
            }
        },
        mounted() {
            // console.log(123);
            this.drawPie();
            /* 窗口变化时自适应 步骤一:监听窗口变化 */
            window.addEventListener("resize", () => {
                this.myChart.resize();
            });
        },
    }
</script>

<style scoped>

</style>
