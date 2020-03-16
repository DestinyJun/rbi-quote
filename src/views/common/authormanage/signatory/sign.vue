<template>
   <div id="sign" class="sign">
     <div class="sign-title">
       <div class="title">
         <h2>签字人权限</h2>
       </div>
       <div class="btn">
         <button>填报</button>
         <button>修改</button>
         <button>删除</button>
       </div>
     </div>
     <div class="sign-select">
       <!--      报告类型-->
       <span>用户权限：</span>
       <Select v-model="selectType" style="width:200px">
         <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
       </Select>
       <!-- 审核状态-->
       <!--      <div>-->
       <!--        <span>{{dropData2.title}}：</span>-->
       <!--        <span v-for="(item_text, index1) in dropData2.centent" :key="index1" :style="{'background': item_text.bgc,  'color':item_text.color}" @click="selectsignsign(index1)">{{item_text.name}}</span>-->
       <!--      </div>-->
     </div>
     <div class="sign-centent">
       <div class="sign-search">
         <Input suffix="ios-search" placeholder="请输入用户名..." style="width: auto" v-model="searchThrData" @on-search="searchData" search />
       </div>
       <div class="sign-table">
         <tables :table-option="tableOption"></tables>
       </div>
       <div class="sign-paging">
         <paging :page-option="pageOption" @getPageDate="getPageDate"></paging>
       </div>
     </div>
   </div>
</template>

<script src="./sign.component.js">

</script>

<style scoped lang="scss">
@import "sign.component.scss";
</style>
