<template>
   <div class="graphic" id="graphic">
     <div class="graphic-title">
       <div class="title">
         <h2>图形统计</h2>
       </div>
     </div>
     <div class="graphic-select">
       <!--      负责人选择-->
       <div class="select">
         <span>项目负责人：</span>
         <Select v-model="selectAutor" style="width:200px" @on-change="changeAutor">
           <Option v-for="item in autorList" :value="item.value" :key="item.value">{{ item.label }}</Option>
         </Select>
       </div>
       <div class="graphic-search">
         <Input suffix="ios-search" placeholder="请输入姓名/证件号/手机号..." style="width: auto" v-model="searchGraphicData" @on-search="searchData" search />
       </div>

     </div>
     <div class="graphic-content">
        <div class="content-left">
          <div class="first-pie">
            <div style="text-align: left;padding: 2vh 1vw;font-size: 18px;font-weight: 600;">
              项目进度占比统计
            </div>
            <div style="position:absolute;right: 2vw;top: 2vh">
              <div style="width: 5vw;height: 10vh;box-shadow: 0 -5px 6px #E5E6E6;padding: 2vh 0.5vw;border: 1px solid #EEEEEE">
                <span>报告总数</span>
                <span style="color: #47A6F8;font-size: 28px;margin-top: 1vh">496</span>
              </div>
            </div>
            <pie :data="dataPiefir"></pie>
          </div>
          <div class="second-pie">
            <div style="text-align: left;padding: 2vh 1vw;font-size: 18px;font-weight: 600;position: absolute">
              项目进度占比统计
            </div>
            <div style="text-align: left;padding: 2vh 1vw;position: absolute;right: 3vh;z-index: 9999">
              <span>报告类型：</span>
              <Select v-model="reportType" style="width:200px" @on-change="changeReportType">
                <Option v-for="item in reportTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </div>
            <pie :data="dataPiesec"></pie>
          </div>
        </div>
        <div class="content-right">
          <div style="text-align: left;padding: 4vh 1vw;font-size: 22px;font-weight: 600;">
            近一年各月项目总数统计
          </div>

          <div style="z-index: 9999;text-align: right;margin-right: 2vw">
            <span style="color: #000">
              选择年份：
            </span>
            <DatePicker type="year" placeholder="选择年份" style="width: 200px"></DatePicker>
          </div>
          <bar :data="data"></bar>
        </div>
     </div>
   </div>
</template>

<script src="./graphic.component.js">

</script>

<style scoped lang="scss">
 @import "graphic.component";
</style>
