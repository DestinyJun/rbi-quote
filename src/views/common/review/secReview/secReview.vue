<template>
   <div id="secreview" class="secreview">
     <div class="review-title">
       <div class="title">
         <h2>二级审核</h2>
       </div>
<!--       <div class="btn">-->
<!--         <button>填报</button>-->
<!--         <button>修改</button>-->
<!--         <button>删除</button>-->
<!--       </div>-->
     </div>
     <div class="review-select">
       <!--      报告类型-->
       <div>
         <span>{{dropData.title}}：</span>
         <span v-for="(item_text, index1) in dropData.centent" :key="index1" :style="{'background': item_text.bgc, 'color':item_text.color}" @click="selectReviewType(index1)">{{item_text.name}}</span>
       </div>
       <!-- 审核状态-->
       <div>
         <span>{{dropData2.title}}：</span>
         <span v-for="(item_text, index1) in dropData2.centent" :key="index1" :style="{'background': item_text.bgc,  'color':item_text.color}" @click="selectReview(index1)">{{item_text.name}}</span>
       </div>
     </div>
     <div class="review-centent">
       <div class="review-search">
         <Input suffix="ios-search" placeholder="请输入报表编号..." style="width: auto" v-model="searchreviewData" @on-search="searchData" search />
       </div>
       <div class="review-table">
         <tables :table-option="tableOption"></tables>
       </div>
       <div class="review-paging">
         <paging :page-option="pageOption" @getPageDate="getPageDate"></paging>
       </div>
     </div>
     <div class="review-modal">
       <Modal
           title="审核"
           v-model="reviewModal"
           class-name="vertical-center-modal" draggable  scrollable closable >
         <p style="text-align: center">待开发中...</p>

       </Modal>
     </div>
   </div>
</template>

<script src="./secReview.component.js">

</script>

<style scoped lang="scss">
  @import "secReview.component.scss";
</style>
