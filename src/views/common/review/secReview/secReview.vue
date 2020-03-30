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
         <span>{{reportTypeList.title}}：</span>
         <span v-for="(item_text, index1) in reportTypeList.centent" :key="index1" :style="{'background': item_text.bgc, 'color':item_text.color}" @click="selectReviewType(index1)">{{item_text.name}}</span>
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
       <!-- 详情-->
       <Modal v-model="reviewModal" draggable scrollable :transfer="false"  width="960" :styles="{top: '150px'}" :closable="false">
         <p slot="header" style="color:#1C1C1C;text-align:left">
           <span>填报详情</span>
         </p>
         <div style="text-align:center;padding: 0 2vw">
           <Row>
             <Col span="12">
               <Col span="6" style="line-height: 3vh;text-align: right">
                 <span>估价对象：</span>
               </Col>
               <Col span="3" style="line-height: 3vh">
                 <span style="display: inline-block;width: 18vw;height: 3vh;text-align: left">{{detailReport.valuationObject}}</span>
               </Col>
             </Col>
             <Col span="12">
               <Col span="6" style="line-height: 3vh;text-align: right">
                 <span>估价对象地址：</span>
               </Col>
               <Col span="3" style="line-height: 3vh">
                 <span style="display: inline-block;width: 18vw;height: 3vh;text-align: left">{{detailReport.valuationObjectAddress}}</span>
               </Col>
             </Col>
           </Row>
           <Row>
             <Col span="24">
               <span style="width: 98%; height: 1px; background: #DCDCDC;display: inline-block;margin: 2vh 0 2vh 0"></span>
             </Col>
           </Row>
           <Row style="margin: 0.5vh">
             <Col span="10" >
               <Col span="6" style="line-height: 3vh;text-align: right">
                 <span>估价目的：</span>
               </Col>
               <Col span="12"  style="line-height: 3vh">
                 <span style="display: inline-block;padding:0 0 0 3px; width: 100%;height: 3vh;text-align: left;border-radius: 3px; border: 1px solid #EEEEEE">{{detailReport.valuationPurpose}}</span>
               </Col>

             </Col>
             <Col span="10">
               <Col span="6" style="line-height: 3vh;text-align: right">
                 <span>估价结果：</span>
               </Col>
               <Col span="12"  style="line-height: 3vh;">
                 <span style="display: inline-block;padding:0 0 0 3px; width: 100%;height: 3vh;text-align: left;border-radius: 3px; border: 1px solid #EEEEEE">￥{{detailReport.valuationResult}}</span>
               </Col>
             </Col>
           </Row>
           <Row style="margin: 0.5vh">
             <Col span="10">
               <Col span="6" style="line-height: 3vh;text-align: right">
                 <span>估价师1：</span>
               </Col>
               <Col span="12" style="line-height: 3vh">
                 <span style="display: inline-block;padding:0 0 0 3px; width: 100%;height: 3vh;text-align: left;border-radius: 3px; border: 1px solid #EEEEEE">{{detailReport.valuer1}}</span>
               </Col>
             </Col>
             <Col span="10">
               <Col span="6" style="line-height: 3vh;text-align: right">
                 <span>估价师2：</span>
               </Col>
               <Col span="12" style="line-height: 3vh">
                 <span style="display: inline-block;padding:0 0 0 3px; width: 100%;height: 3vh;text-align: left;border-radius: 3px; border: 1px solid #EEEEEE">{{detailReport.valuer2}}</span>
               </Col>
             </Col>

           </Row>
           <Row style="margin: 0.5vh">
             <Col span="10">
               <Col span="6" style="line-height: 3vh;text-align: right">
                 <span>价值时点：</span>
               </Col>
               <Col span="12" style="line-height: 3vh">
                 <span style="display: inline-block;padding:0 0 0 3px; width: 100%;height: 3vh;text-align: left;border-radius: 3px; border: 1px solid #EEEEEE">{{detailReport.valuationDate}}</span>
               </Col>
             </Col>
             <Col span="10">
               <Col span="6" style="line-height: 3vh;text-align: right">
                 <span>估计有效期：</span>
               </Col>
               <Col span="12" style="line-height: 3vh">
                 <span style="display: inline-block;padding:0 0 0 3px; width: 100%;height: 3vh;text-align: left;border-radius: 3px; border: 1px solid #EEEEEE">{{detailReport.valuationValidityBegin}}</span>
               </Col>
             </Col>
           </Row>
           <Row style="margin: 0.5vh">
             <Col span="10">
               <Col span="6" style="line-height: 3vh;text-align: right">
                 <span>二级审核人：</span>
               </Col>
               <Col span="12" style="line-height: 3vh">
                 <span style="display: inline-block;padding:0 0 0 3px; width: 100%;height: 3vh;text-align: left;border-radius: 3px; border: 1px solid #EEEEEE">{{detailReport.auditor2Uuid}}</span>
               </Col>
             </Col>
             <Col span="10">
               <Col span="6" style="line-height: 3vh;text-align: right">
                 <span>三级审核人：</span>
               </Col>
               <Col span="12" style="line-height: 3vh">
                 <span style="display: inline-block;padding:0 0 0 3px; width: 100%;height: 3vh;text-align: left;border-radius: 3px; border: 1px solid #EEEEEE">{{detailReport.auditor3Number}}</span>
               </Col>
             </Col>
           </Row>
           <Row style="margin: 0.5vh">
             <Col span="10">
               <Col span="6" style="line-height: 3vh;text-align: right">
                 <span>项目负责人：</span>
               </Col>
               <Col span="12">
                 <span style="display: inline-block;padding:0 0 0 3px; width: 100%;height: 3vh;text-align: left;border-radius: 3px; border: 1px solid #EEEEEE">{{detailReport.projectPrincipalNumber}}</span>
               </Col>
             </Col>
             <Col span="10">
               <Col span="6" style="line-height: 3vh;text-align: right">
                 <span>估价费用：</span>
               </Col>
               <Col span="12">
                 <span style="display: inline-block;padding:0 0 0 3px; width: 100%;height: 3vh;text-align: left;border-radius: 3px; border: 1px solid #EEEEEE">{{detailReport.cost}}</span>
               </Col>
             </Col>
           </Row>
           <Row>
             <Col span="24">
               <span style="width: 98%; height: 1px; background: #DCDCDC;display: inline-block;margin: 2vh 0 2vh 0"></span>
             </Col>
           </Row>
           <Row>
             <Col span="12">
               <Col span="10" style="line-height: 3vh">
                 <span>估价委托人姓名(取姓氏)：</span>
               </Col>
               <Col span="3" style="line-height: 3vh">
                 <span style="display: inline-block;width: 18vw;height: 3vh;border-radius: 3px;text-align: left">{{detailReport.mandatorName}}</span>
               </Col>
             </Col>
             <Col span="12">
               <Col span="14" style="line-height: 3vh">
                 <span>估价委托人身份证/信用代码：</span>
               </Col>
               <Col span="3" style="line-height: 3vh">
                 <span style="display: inline-block;width: 320%;height: 3vh;border-radius: 3px;text-align: left">{{detailReport.mandatorIdentityCard}}</span>
               </Col>
             </Col>
           </Row>
           <Row style="margin-top: 2vh">
             <Col span="12">
               <Col span="6" style="line-height: 3vh;text-align: right">
                 <span>报告摘录：</span>
               </Col>
               <Col span="10">
                 <span style="display: inline-block;width: 300%;height: 3vh;border-radius: 3px;text-align: left">{{detailReport.excerpt}}</span>
               </Col>
             </Col>
           </Row>
         </div>
         <div slot="footer" style="text-align: center">
           <Button style="background-color:#3DA2F8;color: #fff;width: 5vw" @click="reviewPasse">审核通过</Button>
           <Button style="background: #FFFFFF;color: #2E3235;width: 5vw"  @click="reviewNoPasse">审核不通过</Button>
         </div>
       </Modal>
       <Modal v-model="reviewNoModal" draggable scrollable :transfer="false"  width="560" :styles="{top: '250px'}" :closable="false">
         <p slot="header" style="color:#1C1C1C;text-align:left">
           <span>审核问题上报</span>
         </p>
         <div style="text-align:center;padding: 0 2vw">
           <div >
             <div style="display: inline-block;width: 4vw">
               <span style="color: #ED4014">*</span>
               <span>审核理由:</span>
             </div>
             <div style="display: inline-block;width: 12vw;text-align: left;margin-left: 5px">
               <Select v-model="reviewNoData.type" @on-change="changeReasonType" :class="{effect: effectFrom.effectType}">
                    <Option v-for="item in reasonTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
               </Select>
             </div>
             <div style="margin-left: -45px"  :hidden="!effectFrom.effectType">
               <span style="color: #ED4014">请选择审核理由</span>
             </div>
           </div>
           <div style="margin-top: 3vh" :hidden="!showOther">
             <div style="display: inline-block;width: 4vw">
               <span style="color: #ED4014">*</span>
               <span>其他:</span>
             </div>
             <div style="display: inline-block;width: 12vw;text-align: left" >
               <Input v-model="reviewNoData.text"  maxlength="300" show-word-limit type="textarea" placeholder="其他原因..."  @on-blur="effecfText" :class="{effect: effectFrom.effectText}"/>
             </div>
             <div style="margin-left: -45px" :hidden="!effectFrom.effectText">
               <span style="color: #ED4014">请填写其他原因</span>
             </div>
           </div>
         </div>
         <div slot="footer" style="text-align: center">
           <Button style="background-color:#3DA2F8;color: #fff;width: 5vw" @click="sureReviewNoPassClick">确认</Button>
           <Button style="background: #FFFFFF;color: #2E3235;width: 5vw"  @click="closeModelAndClearData">取消</Button>
         </div>
       </Modal>
     </div>
   </div>
</template>

<script src="./secReview.component.js">

</script>

<style scoped lang="scss">
  @import "secReview.component.scss";
</style>
