<template>
  <div id="tables" class="tables">
    <Table
        :row-class-name="rowClassName"
        ref="selection"
        @on-select="selectRowData"
        @on-selection-change="selectDataHandle"
        :columns="title"
        :data="content">
      <template slot-scope="{ row }" slot="result">
        <span style="color: #ffa489">{{ row.result }}</span>
      </template>
    </Table>
  </div>
</template>

<script>
    export default {
        name: 'tables',
        data(){
            return{
                title: [],
                content: [],
            }
        },
        props: {
            tableOption: {
                title: {
                    type: Array,
                    default: []
                },
                content: {
                      type: Array,
                      default: []
                }
            }
        },
        created() {
            this.title = this.tableOption.title;
            this.content = this.tableOption.content;
        },
        methods: {
            rowClassName (row, index) {

                if (index%2 === 0) {
                    return 'demo-table-info-row';
                } else{
                    return 'demo-table-error-row';
                }

            },
            selectRowData () {
                // this.data1.forEach((val, index) => {
                //     if (val.name === row.name){
                //         console.log(index);
                //         // this.bgs.push(index)
                //     }
                // });
            },
            selectDataHandle(selection){
                this.selecteds = selection;
                console.log(this.selecteds)
            },
        }
    }
</script>

<style scoped lang="scss">
  .tables {
    /deep/ .ivu-table th{
      background-color: #E9F3FF
    }
    /deep/ .ivu-table td, .ivu-table th, .ivu-table td, .ivu-table th {
      border: 0;
    }
    /deep/ .ivu-table:before {
      height: 0;
    }
    /deep/ .ivu-table .demo-table-error-row td{
      background-color: #E9F3FF;
      //background-color: #df5000;
      color: #555555;
    }
    /deep/  .ivu-table .demo-table-info-row td{
      background-color: #FFFFFF;
      color: #555555;
    }

    /deep/   .ivu-table-row-hover td {
      background-color: #C9E3FE!important;
    }
  }
</style>
