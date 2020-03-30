<template>
   <div id="inquire" class="inquire">
     <div class="inquire-title">
       <div class="title">
         <h2>项目查询-我的项目</h2>
       </div>
       <!--       <div class="btn">-->
       <!--         <button>填报</button>-->
       <!--         <button>修改</button>-->
       <!--         <button>删除</button>-->
       <!--       </div>-->
     </div>
     <div class="inquire-data">
       <div class="inquire-item" v-for="item in itemData" :key="item.id">
         <div class="inquire-item-title">
           <span >{{item.label}}</span>
           <span :style="{'color': item.fcolor}">{{item.value}}</span>
         </div>
          <div class="inquire-item-border">
            <span class="inquire-item-inner" :style="{'width': `${item.bwidth}%`, 'background': item.bgc}" />
         </div>
       </div>
       <span style="display: inline-block; width: 2px;height: 80%;background: #ECECEC;margin-bottom: -2vh;margin-right: 23px" />
       <div class="inquire-item" v-for="(item2,index12) in itemData1" :key="index12">
         <div class="inquire-item-title">
           <span >{{item2.label}}</span>
           <span :style="{'color': item2.fcolor}">{{item2.value}}</span>
         </div>
          <div class="inquire-item-border">
            <span class="inquire-item-inner" :style="{'width': `${item2.bwidth}%`, 'background': item2.bgc}" />
         </div>
       </div>
       <div  class="inquire-item" style="position: absolute;width: 15vw">
         <div class="inquire-item-title" style="height: 3vh;margin-top: -1.4vh">
           <span style="font-size: 12px">未收费用(元):</span>
           <span style="font-size: 22px;color: #AFAFAF">￥846,000</span>
         </div>
         <div class="inquire-item-title" style="height: 3vh;">
           <span style="font-size: 12px">未收费用(元):</span>
           <span style="font-size: 22px;color: #E17055">￥1,229,500</span>
         </div>
       </div>
     </div>
     <div class="inquire-select">
       <!--      报告类型-->
       <div>
         <span>{{reportTypeList.title}}：</span>
         <span v-for="(item_text, index1) in reportTypeList.centent" :key="index1" :style="{'background': item_text.bgc, 'color':item_text.color}" @click="selectInquireType(index1)">{{item_text.name}}</span>
       </div>
       <!-- 审核状态-->
       <div style="display: flex; justify-content: space-between">
         <div >
           <span>{{dropData2.title}}：</span>
           <span v-for="(item_text, index2) in dropData2.centent" :key="index2" :style="{'background': item_text.bgc,  'color':item_text.color}" @click="selectInquireReview(index2)">{{item_text.name}}</span>
           <label style="margin-left: 2vw">
             时间范围：
             <DatePicker type="daterange" placement="bottom-end" placeholder="选择日期" style="width: 200px"></DatePicker>
           </label>
         </div>
         <div>
           <button style="background: #3DA2F8;border: 0;width: 4vw;padding: 3px;text-align:center;font-size:12px;color: #FFFFFF;border-radius: 2px;letter-spacing: 2px">
             查询
           </button>

         </div>
       </div>

     </div>
     <div class="inquire-centent">
       <div class="inquire-search">
         <Input suffix="ios-search" placeholder="请输入报表编号..." style="width: auto" v-model="searchInquireData" @on-search="searchData" search />
       </div>
       <div class="inquire-table">
         <tables :table-option="tableOption"></tables>
       </div>
       <div class="inquire-paging">
         <paging :page-option="pageOption" @getPageDate="getPageDate"></paging>
       </div>
     </div>
     <div class="inquire-modal">
       <Modal
           title="审核"
           v-model="inquireModal"
           class-name="vertical-center-modal" draggable  scrollable closable >
         <p style="text-align: center">待开发中...</p>

       </Modal>
     </div>
   </div>
</template>

<script src="./inquire.component.js">
</script>

<style scoped lang="scss">
 @import "inquire.component.scss";
</style>
