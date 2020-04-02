<template>
   <div id="sign" class="sign">
     <div class="sign-title">
       <div class="title">
         <h2>签字人权限</h2>
       </div>
       <div class="btn">
         <button @click="showAddSignerModal">添加</button>
         <button @click="showUpdateSignerModal">修改</button>
         <button @click="delSingerInfo">删除</button>
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
         <Input suffix="ios-search" placeholder="请输入用户名..." style="width: auto" v-model="searchSignData" @on-search="searchData" search />
       </div>
       <div class="sign-table">
         <tables :table-option="tableOption" ref="tables" @selectTableItem="selectTableItem"></tables>
       </div>
       <div class="sign-paging">
         <paging :page-option="pageOption" @getPageDate="getPageDate" ></paging>
       </div>
     </div>
     <Modal v-model="addModal" draggable scrollable :transfer="false"  :styles="{top: '250px'}">
       <p slot="header" style="color:#1C1C1C;text-align:left">
         <span>签字人员添加</span>
       </p>
       <div style="text-align:center">
         <Form ref="addSigner" :model="addSigner" :rules="ruleValidate" :label-width="100" :label-colon="true">
           <FormItem label="姓名" prop="signedName" style="margin-left: 2vw">
             <Col span="16">
               <Input  v-model="addSigner.signedName" placeholder="请输入您的姓名"></Input>
             </Col>
           </FormItem>
           <FormItem label="所属账号" prop="signedLoginUser" style="margin-left: 2vw;text-align: left">
             <Col span="16">
               <Select v-model="addSigner.signedLoginUser">
                 <Option v-for="(item, index) in singerConfig.signerUserList" :value="item.value" :key="index" >{{item.label }}</Option>
               </Select>
             </Col>
           </FormItem>
           <FormItem label="证号码" prop="signedNumber" style="margin-left: 2vw">
             <Col span="16">
               <Input v-model="addSigner.signedNumber" placeholder="请输入您的证号"></Input>
             </Col>
           </FormItem>
           <FormItem label="证件类型" prop="signedType" style="margin-left: 2vw">
             <Col span="18">
               <RadioGroup v-model="addSigner.signedType">
                 <Col span="12"  v-for="(item, index) in singerConfig.signerTypeList" :key="index" style="text-align: left">
                   <Radio :label="item.value" style="margin-left: 28px">{{item.label}}</Radio>
                 </Col>
               </RadioGroup>
             </Col>
           </FormItem>
         </Form>
       </div>
       <div slot="footer" style="text-align: center">
         <Button style="background-color:#3DA2F8;color: #fff;width: 6vw" @click="addSignerInfo('addSigner')">确认</Button>
         <Button style="background: #FFFFFF;color: #2E3235;width: 6vw"  @click="addModal = false">取消</Button>
       </div>
     </Modal>
     <Modal v-model="updateModal" draggable scrollable :transfer="false"  :styles="{top: '250px'}">
       <p slot="header" style="color:#1C1C1C;text-align:left">
         <span>签字人员添加</span>
       </p>
       <div style="text-align:center">
         <Form ref="updateSigner" :model="updateSigner" :rules="ruleValidate" :label-width="100" :label-colon="true">
           <FormItem label="姓名" prop="signedName" style="margin-left: 2vw">
             <Col span="16">
               <Input  v-model="updateSigner.signedName" placeholder="请输入您的姓名"></Input>
             </Col>
           </FormItem>
           <FormItem label="所属账号" prop="signedLoginUser" style="margin-left: 2vw;text-align: left">
             <Col span="16">
               <Select v-model="updateSigner.signedLoginUser">
                 <Option v-for="(item, index) in singerConfig.signerUserList" :value="item.value" :key="index" >{{item.label }}</Option>
               </Select>
             </Col>
           </FormItem>
           <FormItem label="证号码" prop="signedNumber" style="margin-left: 2vw">
             <Col span="16">
               <Input v-model="updateSigner.signedNumber" placeholder="请输入您的证号"></Input>
             </Col>
           </FormItem>
           <FormItem label="证件类型" prop="signedType" style="margin-left: 2vw">
             <Col span="18">
               <RadioGroup v-model="updateSigner.signedType">
                 <Col span="12"  v-for="(item, index) in singerConfig.signerTypeList" :key="index" style="text-align: left">
                   <Radio :label="item.value" style="margin-left: 28px">{{item.label}}</Radio>
                 </Col>
               </RadioGroup>
             </Col>
           </FormItem>
         </Form>
       </div>
       <div slot="footer" style="text-align: center">
         <Button style="background-color:#3DA2F8;color: #fff;width: 6vw" @click="updateSignerInfo('updateSigner')">确认</Button>
         <Button style="background: #FFFFFF;color: #2E3235;width: 6vw"  @click="closeUpdateModel">取消</Button>
       </div>
     </Modal>
   </div>
</template>

<script src="./sign.component.js">

</script>

<style scoped lang="scss">
@import "sign.component.scss";
</style>
