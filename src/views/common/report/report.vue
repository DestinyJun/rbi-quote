<template>
  <div id="report" class="report">
    <div class="report-title">
       <div class="title">
          <h2>报告管理</h2>
       </div>
      <div class="btn">
        <button>填报</button>
        <button>修改</button>
        <button>删除</button>
      </div>
    </div>
    <div class="report-select">
<!--      报告类型-->
       <div>
         <span>{{dropData.title}}：</span>
         <span v-for="(item_text, index1) in dropData.centent" :key="index1" :style="{'background': item_text.bgc, 'color':item_text.color}" @click="selectReportType(index1)">{{item_text.name}}</span>
       </div>
      <!-- 审核状态-->
      <div>
        <span>{{dropData2.title}}：</span>
        <span v-for="(item_text, index1) in dropData2.centent" :key="index1" :style="{'background': item_text.bgc,  'color':item_text.color}" @click="selectReportReview(index1)">{{item_text.name}}</span>
      </div>
    </div>
    <div class="report-centent">
       <div class="report-search">
         <Input suffix="ios-search" placeholder="请输入报表编号..." style="width: auto" v-model="searchData" @on-search="searchReportData" search />
       </div>
       <div class="report-table">
         <Table
             :row-class-name="rowClassName"
             ref="selection"
             @on-select="selectRowData"
             @on-selection-change="selectDataHandle"
             :columns="columns4"
             :data="data1">
           <template slot-scope="{ row }" slot="result">
             <span style="color: #ffa489">{{ row.result }}</span>
           </template>
         </Table>
       </div>
       <div class="report-paging">
         <paging></paging>
       </div>
    </div>
  </div>
</template>

<script src="./reoprt.component.js">

</script>

<style scoped lang="scss">
 @import "report.component";
</style>
