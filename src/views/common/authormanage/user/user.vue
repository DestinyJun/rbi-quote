<template>
    <div id="user" class="user">
        <div class="review-title">
           <div class="title">
              <h2>用户权限</h2>
           </div>
           <div class="btn">
             <button>填报</button>
             <button>修改</button>
             <button>删除</button>
           </div>
      </div>
      <div class="review-select">
        <!--      报告类型-->
        <span>用户权限：</span>
        <Select v-model="selectType" style="width:200px">
          <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <!-- 审核状态-->
  <!--      <div>-->
  <!--        <span>{{dropData2.title}}：</span>-->
  <!--        <span v-for="(item_text, index1) in dropData2.centent" :key="index1" :style="{'background': item_text.bgc,  'color':item_text.color}" @click="selectreviewReview(index1)">{{item_text.name}}</span>-->
  <!--      </div>-->
      </div>
      <div class="review-centent">
        <div class="review-search">
          <Input suffix="ios-search" placeholder="请输入用户名..." style="width: auto" v-model="searchThrData" @on-search="searchData" search />
        </div>
        <div class="review-table">
          <tables :table-option="tableOption"></tables>
        </div>
        <div class="review-paging">
          <paging :page-option="pageOption" @getPageDate="getPageDate"></paging>
        </div>
      </div>
    </div>
</template>
<script src="./user.component.js">
</script>
<style lang="scss" scoped>
@import "user.component.scss";
</style>
