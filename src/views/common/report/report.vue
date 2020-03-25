<template>
  <div id="report" class="report">
    <div class="report-title">
       <div class="title">
          <h2>报告管理</h2>
       </div>
      <div class="btn">
        <button @click="showAddRepotrt">填报</button>
        <button>修改</button>
        <button>删除</button>
      </div>
    </div>
    <div class="report-select">
<!--      报告类型-->
       <div>
         <span>{{reportTypeList.title}}：</span>
         <span v-for="(item_text, index1) in reportTypeList.centent" :key="index1" :style="{'background': item_text.bgc, 'color':item_text.color}" @click="selectReportType(index1)">{{item_text.name}}</span>
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
         <tables :table-option="tableOption"></tables>
       </div>
       <div class="report-paging">
         <paging :page-option="pageOption" @getPageDate="getPageDate"></paging>
       </div>
    </div>
    <div class="report-modal">
    <!-- 详情-->
      <Modal
          title="详情"
          v-model="detailModal"
          class-name="vertical-center-modal" draggable  scrollable closable >
        <p style="text-align: center">待开发中...</p>

      </Modal>
    <!-- 打印二维码-->
      <Modal
          title="打印二维码"
          v-model="QRCodeModal"
          class-name="vertical-center-modal"  draggable  scrollable closable >
        <p style="text-align: center">待开发中...</p>
        <div style="text-align: center;background: #EAEAEA;padding: 2vh">
          <QRCodes :code-url="codeUrl"></QRCodes>
        </div>

      </Modal>
    <!-- 填报类型选择-->
      <Modal v-model="addTypeReportModel" draggable scrollable :transfer="false"  :styles="{top: '250px'}">
        <p slot="header" style="color:#1C1C1C;text-align:left">
          <span>填报类型选择</span>
        </p>
        <div style="text-align:center">
            <Form ref="selRport" style="text-align:center" :model="selRport" :rules="ruleValidate">
              <FormItem label="请选择报告类型：" prop="reportType" style="margin-left: 6vw">
                <Col span="20">
                  <RadioGroup v-model="selRport.reportType">
                    <Col span="26"  v-for="(item, index) in reportTypeList.centent" :key="index" style="text-align: left">
                      <Radio :label="item.value" style="margin: 0 0 10px 0">{{item.name}}</Radio>
                    </Col>
                  </RadioGroup>
                </Col>
              </FormItem>
            </Form>
        </div>
        <div slot="footer" style="text-align: center">
          <Button style="background-color:#3DA2F8;color: #fff;width: 6vw" @click="selectReport('selRport')">确认</Button>
          <Button style="background: #FFFFFF;color: #2E3235;width: 6vw"  @click="addTypeReportModel = false">取消</Button>
        </div>
      </Modal>
    <!-- 填写报告信息 -->
      <Modal v-model="addReportModel" draggable scrollable :transfer="false"  width="800" :styles="{top: '250px'}">
        <p slot="header" style="color:#1C1C1C;text-align:left; width: 60vw">
          <span>填报信息填写</span>
        </p>
        <div style="text-align:center;">
          <Form ref="addReport" :model="addReport" :rules="ruleAddValidate" :label-width="100" :label-colon="true">
            <Row>
              <Col span="12">
                <FormItem label="估价对象" prop="valuationObject" >
                  <Col span="20">
                    <Input v-model="addReport.valuationObject" placeholder="Enter your name"></Input>
                  </Col>
                </FormItem>
              </Col>
              <Col span="12" >
                <FormItem label="估价对象地址" prop="valuationObjectAddress" >
                  <Col span="20" >
                    <Input v-model="addReport.valuationObjectAddress" placeholder="Enter your name"></Input>
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
              <Col span="9">
                <FormItem label="估价目的" prop="valuationObject" >
                  <Col span="22">
                    <Input v-model="addReport.valuationObject" placeholder="Enter your name" style="display: inline-block"></Input>
                  </Col>
                </FormItem>
              </Col>
              <Col span="9">
                <FormItem label="估价结果" prop="valuationObjectAddress" >
                  <Col span="22">
                    <Input v-model="addReport.valuationObjectAddress" placeholder="Enter your name" style="display: inline-block"></Input>
                  </Col>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="9">
                <FormItem label="估价师1" prop="valuer1" >
                  <Col span="22" style="text-align: left">
                    <Select v-model="valuer1">
                      <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                  </Col>
                </FormItem>
              </Col>
              <Col span="9">
                <FormItem label="估价师2" prop="valuer2" >
                  <Col span="22" style="text-align: left">
                    <Select v-model="valuer2" >
                      <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                  </Col>
                </FormItem>
              </Col>
            </Row>
            <!--            -->
            <Row>
              <Col span="9">
                <FormItem label="价值时点" prop="valuer1" >
                  <Col span="22" style="text-align: left">
                    <Select v-model="valuer1" >
                      <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                  </Col>
                </FormItem>
              </Col>
              <Col span="9">
                <FormItem label="估价有效期" prop="valuer2" >
                  <Col span="22" style="text-align: left">
                    <Select v-model="valuer2" >
                      <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                  </Col>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="9">
                <FormItem label="价值时点" prop="valuer1" >
                  <Col span="22" style="text-align: left">
                    <Select v-model="valuer1" >
                      <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                  </Col>
                </FormItem>
              </Col>
              <Col span="9">
                <FormItem label="估价有效期" prop="valuer2" >
                  <Col span="22" style="text-align: left">
                    <Select v-model="valuer2" >
                      <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                  </Col>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="9">
                <FormItem label="价值时点" prop="valuer1" >
                  <Col span="22" style="text-align: left">
                    <Select v-model="valuer1" >
                      <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                  </Col>
                </FormItem>
              </Col>
              <Col span="9">
                <FormItem label="估计费用" prop="valuer2" >
                  <Col span="22" style="text-align: left">
                    <Select v-model="valuer2" >
                      <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                  </Col>
                  元
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="24">
                <span style="width: 98%; height: 1px; background: #DCDCDC;display: inline-block;margin: 0 0 3vh 0"></span>
              </Col>
            </Row>
<!--            <FormItem label="请选择报告类型：" prop="reportType" style="margin-left: 6vw">-->
<!--              <Col span="20">-->
<!--                <RadioGroup v-model="selRport.reportType">-->
<!--                  <Col span="26"  v-for="(item, index) in reportTypeList.centent" :key="index" style="text-align: left">-->
<!--                    <Radio :label="item.value" style="margin: 0 0 10px 0">{{item.name}}</Radio>-->
<!--                  </Col>-->
<!--                </RadioGroup>-->
<!--              </Col>-->
<!--            </FormItem>-->
          </Form>
        </div>
        <div slot="footer" style="text-align: center">
          <Button style="background-color:#3DA2F8;color: #fff;width: 6vw" @click="selectReport('selRport')">确认</Button>
          <Button style="background: #FFFFFF;color: #2E3235;width: 6vw"  @click="addReportModel = false">取消</Button>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script src="./report.component.js">

</script>

<style scoped lang="scss">
@import "report.component";
</style>
