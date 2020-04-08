<template>
  <div id="basicdialog" class="dialog">
    <Modal v-model="dialogOption.hidden" draggable scrollable :transfer="false"  :width="dialogOption.width" :styles="dialogOption.style" :closable="false">
      <p slot="header" style="color:#1C1C1C;text-align:left; width: 60vw">
        <span>{{dialogOption.title}}</span>
      </p>
      <div style="text-align:center;">
<!--        <Row></Row>-->
        <Form  :ref="dialogOption.model" :model="dialogOption.model" :rules="dialogOption.ruleValidate"  :label-colon="true">
          <div v-for="(item, index) in dialogOption.dataList" :key="index" >
            <Col span="12" v-if="item.styleType === 1">
              <FormItem :label="item.label" :prop="item.key" :label-width="100">
                <Col span="20" v-if="item.type === 'input'">
                  <Input v-model="dialogOption.modelData[item.key]" :placeholder="item.placeholder" />
                </Col>
                <Col span="20" v-if="item.type === 'select'">
                  <Select v-model="dialogOption.modelData[item.key]" style="text-align: left">
                    <Option v-for="(select_item, selIndex) in item.selList" :value="select_item.value" :key="selIndex">{{ select_item.label }}</Option>
                  </Select>
                </Col>
              </FormItem>
            </Col>
          </div>
          <div >
            <Col span="24">
              <span style="width: 98%; height: 1px; background: #DCDCDC;display: inline-block;margin: 0 0 3vh 0"></span>
            </Col>
          </div>
          <div v-for="(item, index) in dialogOption.dataList" :key="index + 1000" >
            <Col span="10" v-if="item.styleType === 2">
              <FormItem :label="item.label" :prop="item.key" :label-width="100">
                <!--输入框-->
                <Col span="22" v-if="item.type === 'input'">
                  <Input v-model="dialogOption.modelData[item.key]" :placeholder="item.placeholder"></Input>
                </Col>
                <!--下拉框-->
                <Col span="22" v-if="item.type === 'select'">
                  <Select v-model="dialogOption.modelData[item.key]" style="text-align: left">
                    <Option v-for="(select_item, selIndex) in item.list" :value="select_item.value" :key="selIndex">{{ select_item.label }}</Option>
                  </Select>
                </Col>
                <!--日期-->
                <Col span="30" style="text-align: left" v-if="item.type === 'date'">
                  <DatePicker type="date" :placeholder="item.placeholder" format="yy-MM-dd" style="width: 92%" v-model="dialogOption.modelData[item.value]"></DatePicker>
                </Col>
                <Col span="22"  v-if="item.type === 'check'">
                  <CheckboxGroup v-model="dialogOption.modelData[item.key]" disabled>
                    <Col span="12"  v-for="(i, checkindex) in item.list" :key="checkindex" style="text-align: left">
                      <Checkbox :label="i.value" >{{i.label}}</Checkbox>
                    </Col>
                  </CheckboxGroup>
                </Col>
                <Col span="22" v-if="item.type === 'radio'">
                  <RadioGroup v-model="dialogOption.modelData[item.value]">
                    <Col span="12"  v-for="(i, radioindex) in item.list" :key="radioindex" style="text-align: left">
                      <Radio :label="i.value" style="margin-left: 28px">{{i.label}}</Radio>
                    </Col>
                  </RadioGroup>
                </Col>
              </FormItem>
            </Col>
          </div>
          <Col span="24">
            <span style="width: 98%; height: 1px; background: #DCDCDC;display: inline-block;margin: 0 0 3vh 0"></span>
          </Col>
          <div v-for="(item, index) in dialogOption.dataList" :key="index + 5000" >
            <Col span="12" v-if="item.styleType === 3">
              <FormItem :label="item.label" :prop="item.key" :label-width="100">
                <Col span="20" v-if="item.type === 'input'">
                  <Input v-model="dialogOption.modelData[item.key]" :placeholder="item.placeholder"></Input>
                </Col>
                <Col span="20" v-if="item.type === 'select'">
                  <Select v-model="dialogOption.modelData[item.key]" style="text-align: left">
                    <Option v-for="(select_item, selIndex) in item.selList" :value="select_item.value" :key="selIndex">{{ select_item.label }}</Option>
                  </Select>
                </Col>
                <Col span="18" v-if="item.type === 'textarea'">
                    <Input v-model="dialogOption.modelData[item.key]" maxlength="300" show-word-limit type="textarea" :placeholder="item.placeholder"/>
                </Col>
              </FormItem>
            </Col>
            <Col span="20" v-if="item.styleType === 4">
              <FormItem :label="item.label" :prop="item.key" :label-width="100">
                <Col span="18" v-if="item.type === 'textarea'">
                  <Input v-model="dialogOption.modelData[item.key]" maxlength="300" show-word-limit type="textarea" :placeholder="item.placeholder"/>
                </Col>
              </FormItem>
            </Col>
          </div>
       <!--   <Col span="12">
            <FormItem label="估价对象" prop="valuationObject" :label-width="100">
              <Col span="20">
                <Input v-model="addReport.valuationObject" placeholder="请输入估价对象"></Input>
              </Col>
            </FormItem>
          </Col>
          <Col span="12" >
            <FormItem label="估价对象地址" prop="valuationObjectAddress" :label-width="150">
              <Col span="24" >
                <Input v-model="addReport.valuationObjectAddress" placeholder="请输入估价对象地址"></Input>
              </Col>
            </FormItem>
          </Col>
          <Col span="12" >
            <FormItem label="估价对象地址" prop="valuationObjectAddress" :label-width="100">
              <Col span="20" >
                <Input v-model="addReport.valuationObjectAddress" placeholder="请输入估价对象地址"></Input>
              </Col>
            </FormItem>
          </Col>
          <Row>
            <Col span="24">
              <span style="width: 98%; height: 1px; background: #DCDCDC;display: inline-block;margin: 0 0 3vh 0"></span>
            </Col>
          </Row>
          <Row>
            <Col span="10">
              <FormItem label="估价目的" prop="valuationPurpose" :label-width="100">
                <Col span="22">
                  &lt;!&ndash;                    <Input v-model="addReport.valuationPurpose" placeholder="请输入估价目的" style="display: inline-block"></Input>&ndash;&gt;
                  <Select v-model="addReport.valuationPurpose" style="text-align: left">
                    <Option v-for="item in addConfig.purposeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </Col>
              </FormItem>
            </Col>
            <Col span="10">
              <FormItem label="估价结果" prop="valuationResult" :label-width="100">
                <Col span="22">
                  <Input v-model="addReport.valuationResult" type="number" placeholder="请输入估价结果" style="display: inline-block"></Input>
                </Col>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="10">
              <FormItem label="估价师1" prop="valuer1" :label-width="100">
                <Col span="22" style="text-align: left" >
                  <Select v-model="addReport.valuer1"  @on-open-change="addRoportSelectAutor('valuer1', 'add')" @on-change="addReportChangeAutor('valuer1', 'add')">
                    <Option v-for="(item, index) in addConfig.appraiserOneList" :value="item.value" :key="index" >{{ item.label }}</Option>
                  </Select>
                </Col>
              </FormItem>
            </Col>
            <Col span="10">
              <FormItem label="估价师2" prop="valuer2" :label-width="100">
                <Col span="22" style="text-align: left">
                  <Select v-model="addReport.valuer2" @on-open-change="addRoportSelectAutor('valuer2', 'add')" @on-change="addReportChangeAutor('valuer2', 'add')">
                    <Option v-for="item in addConfig.appraiserTwoList" :value="item.value" :key="item.value" >{{ item.label }}</Option>
                  </Select>
                </Col>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="10">
              <FormItem label="价值时间" prop="valuationDate" :label-width="100">
                <Col span="30" style="text-align: left">
                  <DatePicker type="date" placeholder="选择日期" format="yy-MM-dd" style="width: 92%" v-model="addReport.valuationDate"></DatePicker>
                </Col>
              </FormItem>
            </Col>
            <Col span="10">
              <FormItem label="估价有效期" prop="valuationValidityBegin" :label-width="100">
                <Col span="30" style="text-align: left">
                  <DatePicker type="daterange" format="yy-MM-dd" placeholder="选择时间段" style="width: 92%" v-model="addReport.valuationValidityBegin"></DatePicker>
                </Col>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="10">
              <FormItem label="二级审核人" prop="auditor2Uuid" :label-width="100">
                <Col span="22" style="text-align: left">
                  <Select v-model="addReport.auditor2Uuid" @on-change="changeReviewerData('add')">
                    <Option v-for="item in addConfig.reviewerOneList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </Col>
              </FormItem>
            </Col>
            <Col span="10">
              <FormItem label="三级审核人" prop="auditor3Number" :label-width="100">
                <Col span="22" style="text-align: left">
                  <Select v-model="addReport.auditor3Number" >
                    <Option v-for="item in addConfig.reviewerTwoList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </Col>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="10">
              <FormItem label="项目负责人" prop="projectPrincipalNumber" :label-width="100">
                <Col span="22" style="text-align: left">
                  <Select v-model="addReport.projectPrincipalNumber" >
                    <Option v-for="item in addConfig.projectManager" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </Col>
              </FormItem>
            </Col>
            <Col span="10">
              <FormItem label="估计费用" prop="cost" :label-width="100">
                <Col span="22" style="text-align: left">
                  <Input v-model="addReport.cost" placeholder="请输入估计费用"></Input>
                </Col>
                <Col span="2">
                  <span>元</span>
                </Col>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="24">
              <span style="width: 98%; height: 1px; background: #DCDCDC;display: inline-block;margin: 0 0 3vh 0"></span>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem label="估价委托人姓名(取姓氏)" prop="mandatorName" :label-width="184">
                <Col span="20">
                  <Input v-model="addReport.mandatorName" placeholder="请输入估价委托人姓名.."></Input>
                </Col>
              </FormItem>
            </Col>
            <Col span="12" >
              <FormItem label="估价委托人身份证号/信用代码" prop="mandatorIdentityCard" :label-width="150">
                <Col span="20">
                  <Input v-model="addReport.mandatorIdentityCard" placeholder="请输入委托人身份证号/信用代码"></Input>
                </Col>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="20" >
              <FormItem label="报告摘录" prop="excerpt" :label-width="100">
                <Col span="18">
                  <Input v-model="addReport.excerpt" maxlength="300" show-word-limit type="textarea" placeholder="报告摘录以及特征描述..."/>
                </Col>
              </FormItem>
            </Col>
          </Row>-->
          <Row></Row>
        </Form>
      </div>
      <div slot="footer" style="text-align: center">
        <Button style="background-color:#3DA2F8;color: #fff;width: 5vw" @click="addUploadReport('addReport')">上报</Button>
        <Button style="background: #FFFFFF;color: #2E3235;width: 5vw"  @click="dialogOption.hidden = false">取消</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  export default {
    name: 'basicdialog',
    data(){
      return {

      }
    },
    props: {
       dialogOption: {
          width: {
             type: Number,
             default: 960
           },
          title: {
             type:String,
             default: ''
          },
          style: {
             type: Object,
             default: {top: '100px'}
          },
          hidden: {
             type: Boolean,
             default: false
          },
          ruleValidate: {
             type: Object,
             default: {}
          },
          modelData: {
             type: Object,
             default: {}
          },
          dataList: {
              type: Array,
              default: []
          }
       }
    },
    updated() {
       console.log(this.dialogOption)
    }
  }
</script>

<style scoped lang="scss">

  .dialog{
  /deep/ .ivu-row{
        z-index: -1;
    }
  }

</style>
