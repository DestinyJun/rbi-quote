<template>
  <div id="thrReview" class="thrReview">
    <div class="review-title">
      <div class="title">
        <h2>三级审核</h2>
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
        <span v-for="(item_text, index1) in reportTypeList.centent" :key="index1" :style="{'background': item_text.bgc, 'color':item_text.color}" @click="selectreviewType(index1)">{{item_text.name}}</span>
      </div>
      <!-- 审核状态-->
<!--      <div>-->
<!--        <span>{{reportStatusList.title}}：</span>-->
<!--        <span v-for="(item_text, index1) in reportStatusList.centent" :key="index1" :style="{'background': item_text.bgc,  'color':item_text.color}" @click="selectreviewReview(index1)">{{item_text.name}}</span>-->
<!--      </div>-->
    </div>
    <div class="review-centent">
      <div class="review-search">
        <Input suffix="ios-search" placeholder="请输入报表编号..." style="width: auto" v-model="searchThrData" @on-search="searchData" search />
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
			<detail-modal :dialog-option="detailOption" @closeModel="closeDetailModel" @sureClick="reviewPasse"/>
      <Modal v-model="reviewThreeNoModal" draggable scrollable :transfer="false"  width="560" :styles="{top: '250px'}" :closable="false">
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

<script src="./thrReview.component.js">
</script>

<style scoped lang="scss">
 @import "thrReview.component.scss";
</style>
