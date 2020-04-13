<template>
	<div id="report" class="report">
		<div class="report-title">
			<div class="title">
				<h2>报告管理</h2>
			</div>
			<div class="btn">
				<button @click="showAddRepotrt">填报</button>
				<button @click="showUpdateReportModel">修改</button>
				<button @click="deleteReport">删除</button>
			</div>
		</div>
		<div class="report-select">
			<!--      报告类型-->
			<div>
				<span>{{reportTypeList.title}}：</span>
				<span v-for="(item_text, index1) in reportTypeList.centent" :key="index1"
							:style="{'background': item_text.bgc, 'color':item_text.color}" @click="selectReportType(index1)">{{item_text.name}}</span>
			</div>
			<!-- 审核状态-->
			<div>
				<span>{{reportStatusList.title}}：</span>
				<span v-for="(item_text, index1) in reportStatusList.centent" :key="index1"
							:style="{'background': item_text.bgc,  'color':item_text.color}" @click="selectReportReview(index1)">{{item_text.name}}</span>
			</div>
		</div>
		<div class="report-centent">
			<div class="report-search">
				<Input suffix="ios-search" placeholder="请输入报表编号..." style="width: auto" v-model="searchData"
							 @on-search="searchReportData" search/>
			</div>
			<div class="report-table">
				<tables :table-option="tableOption" @selectTableItem="selectTableItem" ref="tables"></tables>
			</div>
			<div class="report-paging">
				<paging :page-option="pageOption" @getPageDate="getPageDate"></paging>
			</div>
		</div>
		<div class="report-modal">
			<!-- 详情-->
			<Modal v-model="detailModal" draggable scrollable :transfer="false" width="960" :styles="{top: '150px'}">
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
							<span
								style="width: 98%; height: 1px; background: #DCDCDC;display: inline-block;margin: 2vh 0 2vh 0"></span>
						</Col>
					</Row>
					<Row style="margin: 0.5vh">
						<Col span="10">
							<Col span="6" style="line-height: 3vh;text-align: right">
								<span>估价目的：</span>
							</Col>
							<Col span="12" style="line-height: 3vh">
								<span
									style="display: inline-block;padding:0 0 0 3px; width: 100%;height: 3vh;text-align: left;border-radius: 3px; border: 1px solid #EEEEEE">{{detailReport.valuationPurpose}}</span>
							</Col>

						</Col>
						<Col span="10">
							<Col span="6" style="line-height: 3vh;text-align: right">
								<span>估价结果：</span>
							</Col>
							<Col span="12" style="line-height: 3vh;">
								<span
									style="display: inline-block;padding:0 0 0 3px; width: 100%;height: 3vh;text-align: left;border-radius: 3px; border: 1px solid #EEEEEE">￥{{detailReport.valuationResult}}</span>
							</Col>
						</Col>
					</Row>
					<Row style="margin: 0.5vh">
						<Col span="10">
							<Col span="6" style="line-height: 3vh;text-align: right">
								<span>估价师1：</span>
							</Col>
							<Col span="12" style="line-height: 3vh">
								<span
									style="display: inline-block;padding:0 0 0 3px; width: 100%;height: 3vh;text-align: left;border-radius: 3px; border: 1px solid #EEEEEE">{{detailReport.valuer1}}</span>
							</Col>
						</Col>
						<Col span="10">
							<Col span="6" style="line-height: 3vh;text-align: right">
								<span>估价师2：</span>
							</Col>
							<Col span="12" style="line-height: 3vh">
								<span
									style="display: inline-block;padding:0 0 0 3px; width: 100%;height: 3vh;text-align: left;border-radius: 3px; border: 1px solid #EEEEEE">{{detailReport.valuer2}}</span>
							</Col>
						</Col>

					</Row>
					<Row style="margin: 0.5vh">
						<Col span="10">
							<Col span="6" style="line-height: 3vh;text-align: right">
								<span>价值时点：</span>
							</Col>
							<Col span="12" style="line-height: 3vh">
								<span
									style="display: inline-block;padding:0 0 0 3px; width: 100%;height: 3vh;text-align: left;border-radius: 3px; border: 1px solid #EEEEEE">{{detailReport.valuationDate}}</span>
							</Col>
						</Col>
						<Col span="10">
							<Col span="6" style="line-height: 3vh;text-align: right">
								<span>估计有效期：</span>
							</Col>
							<Col span="12" style="line-height: 3vh">
								<span
									style="display: inline-block;padding:0 0 0 3px; width: 100%;height: 3vh;text-align: left;border-radius: 3px; border: 1px solid #EEEEEE">{{detailReport.valuationValidityBegin}}</span>
							</Col>
						</Col>
					</Row>
					<Row style="margin: 0.5vh">
						<Col span="10">
							<Col span="6" style="line-height: 3vh;text-align: right">
								<span>二级审核人：</span>
							</Col>
							<Col span="12" style="line-height: 3vh">
								<span
									style="display: inline-block;padding:0 0 0 3px; width: 100%;height: 3vh;text-align: left;border-radius: 3px; border: 1px solid #EEEEEE">{{detailReport.auditor2Uuid}}</span>
							</Col>
						</Col>
						<Col span="10">
							<Col span="6" style="line-height: 3vh;text-align: right">
								<span>三级审核人：</span>
							</Col>
							<Col span="12" style="line-height: 3vh">
								<span
									style="display: inline-block;padding:0 0 0 3px; width: 100%;height: 3vh;text-align: left;border-radius: 3px; border: 1px solid #EEEEEE">{{detailReport.auditor3Number}}</span>
							</Col>
						</Col>
					</Row>
					<Row style="margin: 0.5vh">
						<Col span="10">
							<Col span="6" style="line-height: 3vh;text-align: right">
								<span>项目负责人：</span>
							</Col>
							<Col span="12">
								<span
									style="display: inline-block;padding:0 0 0 3px; width: 100%;height: 3vh;text-align: left;border-radius: 3px; border: 1px solid #EEEEEE">{{detailReport.projectPrincipalNumber}}</span>
							</Col>
						</Col>
						<Col span="10">
							<Col span="6" style="line-height: 3vh;text-align: right">
								<span>估价费用：</span>
							</Col>
							<Col span="12">
								<span
									style="display: inline-block;padding:0 0 0 3px; width: 100%;height: 3vh;text-align: left;border-radius: 3px; border: 1px solid #EEEEEE">{{detailReport.cost}}</span>
							</Col>
						</Col>
					</Row>
					<Row>
						<Col span="24">
							<span
								style="width: 98%; height: 1px; background: #DCDCDC;display: inline-block;margin: 2vh 0 2vh 0"></span>
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
								<span style="display: inline-block;width: 320%;height: 3vh;border-radius: 3px;text-align: left">...{{detailReport.mandatorIdentityCard.slice(detailReport.mandatorIdentityCard.length -5, detailReport.mandatorIdentityCard.length)}}</span>
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
					<Button style="background-color:#3DA2F8;color: #fff;width: 6vw" @click="detailModal = false">关闭</Button>
					<!--          <Button style="background: #FFFFFF;color: #2E3235;width: 5vw"  @click="detailModal = false">取消</Button>-->
				</div>
			</Modal>
			<!-- 打印二维码-->
			<Modal
				title="打印二维码"
				v-model="QRCodeModal"
				class-name="vertical-center-modal" draggable scrollable closable>
				<p style="text-align: center">待开发中...</p>
				<div style="text-align: center;background: #EAEAEA;padding: 2vh">
					<QRCodes :code-url="codeUrl"></QRCodes>
				</div>

			</Modal>
			<!-- 填报类型选择-->
			<Modal v-model="addTypeReportModel" draggable scrollable :transfer="false" :styles="{top: '250px'}"
						 :closable="false">
				<p slot="header" style="color:#1C1C1C;text-align:left">
					<span>填报类型选择</span>
				</p>
				<div style="text-align:center">
					<Form ref="selRport" style="text-align:center" :model="selRport" :rules="ruleValidate">
						<FormItem label="请选择报告类型：" prop="reportType" style="margin-left: 6vw">
							<Col span="16">
								<RadioGroup v-model="selRport.reportType">
									<Col span="26" v-for="(item, index) in reportTypeList.centent" :key="index" style="text-align: left">
										<Radio :label="item.table" style="margin: 0 0 10px 0">{{item.name}}</Radio>
									</Col>
								</RadioGroup>
							</Col>
						</FormItem>
					</Form>
				</div>
				<div slot="footer" style="text-align: center">
					<Button style="background-color:#3DA2F8;color: #fff;width: 6vw" @click="selectReport('selRport')">确认</Button>
					<Button style="background: #FFFFFF;color: #2E3235;width: 6vw" @click="addTypeReportModel = false">取消</Button>
				</div>
			</Modal>
			<!-- 填写报告信息 -->
			<modal :dialog-option="addOption" @addUploadReport="addUploadReport" ref="modelData"/>
			<!--      <Modal v-model="addReportModel" draggable scrollable :transfer="false"  width="960" :styles="{top: '100px'}" :closable="false">-->
			<!--        <p slot="header" style="color:#1C1C1C;text-align:left; width: 60vw">-->
			<!--          <span>填报信息填写</span>-->
			<!--        </p>-->
			<!--        <div style="text-align:center;">-->
			<!--          <Form ref="addReport" :model="addReport" :rules="ruleAddValidate"  :label-colon="true">-->
			<!--&lt;!&ndash;            <Row>&ndash;&gt;-->
			<!--              <Col span="12">-->
			<!--                <FormItem label="估价对象" prop="valuationObject" :label-width="100">-->
			<!--                  <Col span="20">-->
			<!--                    <Input v-model="addReport.valuationObject" placeholder="请输入估价对象"></Input>-->
			<!--                  </Col>-->
			<!--                </FormItem>-->
			<!--              </Col>-->
			<!--              <Col span="12" >-->
			<!--                <FormItem label="估价对象地址" prop="valuationObjectAddress" :label-width="150">-->
			<!--                  <Col span="24" >-->
			<!--                    <Input v-model="addReport.valuationObjectAddress" placeholder="请输入估价对象地址"></Input>-->
			<!--                  </Col>-->
			<!--                </FormItem>-->
			<!--              </Col>-->
			<!--              <Col span="12" >-->
			<!--                <FormItem label="估价对象地址" prop="valuationObjectAddress" :label-width="100">-->
			<!--                  <Col span="20" >-->
			<!--                    <Input v-model="addReport.valuationObjectAddress" placeholder="请输入估价对象地址"></Input>-->
			<!--                  </Col>-->
			<!--                </FormItem>-->
			<!--              </Col>-->
			<!--&lt;!&ndash;            </Row>&ndash;&gt;-->
			<!--            <Row>-->
			<!--              <Col span="24">-->
			<!--                <span style="width: 98%; height: 1px; background: #DCDCDC;display: inline-block;margin: 0 0 3vh 0"></span>-->
			<!--              </Col>-->
			<!--            </Row>-->
			<!--            <Row>-->
			<!--              <Col span="10">-->
			<!--                <FormItem label="估价目的" prop="valuationPurpose" :label-width="100">-->
			<!--                  <Col span="22">-->
			<!--&lt;!&ndash;                    <Input v-model="addReport.valuationPurpose" placeholder="请输入估价目的" style="display: inline-block"></Input>&ndash;&gt;-->
			<!--                    <Select v-model="addReport.valuationPurpose" style="text-align: left">-->
			<!--                      <Option v-for="item in addConfig.purposeList" :value="item.value" :key="item.value">{{ item.label }}</Option>-->
			<!--                    </Select>-->
			<!--                  </Col>-->
			<!--                </FormItem>-->
			<!--              </Col>-->
			<!--              <Col span="10">-->
			<!--                <FormItem label="估价结果" prop="valuationResult" :label-width="100">-->
			<!--                  <Col span="22">-->
			<!--                    <Input v-model="addReport.valuationResult" type="number" placeholder="请输入估价结果" style="display: inline-block"></Input>-->
			<!--                  </Col>-->
			<!--                </FormItem>-->
			<!--              </Col>-->
			<!--            </Row>-->
			<!--            <Row>-->
			<!--              <Col span="10">-->
			<!--                <FormItem label="估价师1" prop="valuer1" :label-width="100">-->
			<!--                  <Col span="22" style="text-align: left" >-->
			<!--                    <Select v-model="addReport.valuer1"  @on-open-change="addRoportSelectAutor('valuer1', 'add')" @on-change="addReportChangeAutor('valuer1', 'add')">-->
			<!--                      <Option v-for="(item, index) in addConfig.appraiserOneList" :value="item.value" :key="index" >{{ item.label }}</Option>-->
			<!--                    </Select>-->
			<!--                  </Col>-->
			<!--                </FormItem>-->
			<!--              </Col>-->
			<!--              <Col span="10">-->
			<!--                <FormItem label="估价师2" prop="valuer2" :label-width="100">-->
			<!--                  <Col span="22" style="text-align: left">-->
			<!--                    <Select v-model="addReport.valuer2" @on-open-change="addRoportSelectAutor('valuer2', 'add')" @on-change="addReportChangeAutor('valuer2', 'add')">-->
			<!--                      <Option v-for="item in addConfig.appraiserTwoList" :value="item.value" :key="item.value" >{{ item.label }}</Option>-->
			<!--                    </Select>-->
			<!--                  </Col>-->
			<!--                </FormItem>-->
			<!--              </Col>-->
			<!--            </Row>-->
			<!--            &lt;!&ndash;            &ndash;&gt;-->
			<!--            <Row>-->
			<!--              <Col span="10">-->
			<!--                <FormItem label="价值时间" prop="valuationDate" :label-width="100">-->
			<!--                  <Col span="30" style="text-align: left">-->
			<!--                    <DatePicker type="date" placeholder="选择日期" format="yy-MM-dd" style="width: 92%" v-model="addReport.valuationDate"></DatePicker>-->
			<!--                  </Col>-->
			<!--                </FormItem>-->
			<!--              </Col>-->
			<!--              <Col span="10">-->
			<!--                <FormItem label="估价有效期" prop="valuationValidityBegin" :label-width="100">-->
			<!--                  <Col span="30" style="text-align: left">-->
			<!--                    <DatePicker type="daterange" format="yy-MM-dd" placeholder="选择时间段" style="width: 92%" v-model="addReport.valuationValidityBegin"></DatePicker>-->
			<!--                  </Col>-->
			<!--                </FormItem>-->
			<!--              </Col>-->
			<!--            </Row>-->
			<!--            <Row>-->
			<!--              <Col span="10">-->
			<!--                <FormItem label="二级审核人" prop="auditor2Uuid" :label-width="100">-->
			<!--                  <Col span="22" style="text-align: left">-->
			<!--                    <Select v-model="addReport.auditor2Uuid" @on-change="changeReviewerData('add')">-->
			<!--                      <Option v-for="item in addConfig.reviewerOneList" :value="item.value" :key="item.value">{{ item.label }}</Option>-->
			<!--                    </Select>-->
			<!--                  </Col>-->
			<!--                </FormItem>-->
			<!--              </Col>-->
			<!--              <Col span="10">-->
			<!--                <FormItem label="三级审核人" prop="auditor3Number" :label-width="100">-->
			<!--                  <Col span="22" style="text-align: left">-->
			<!--                    <Select v-model="addReport.auditor3Number" >-->
			<!--                      <Option v-for="item in addConfig.reviewerTwoList" :value="item.value" :key="item.value">{{ item.label }}</Option>-->
			<!--                    </Select>-->
			<!--                  </Col>-->
			<!--                </FormItem>-->
			<!--              </Col>-->
			<!--            </Row>-->
			<!--            <Row>-->
			<!--              <Col span="10">-->
			<!--                <FormItem label="项目负责人" prop="projectPrincipalNumber" :label-width="100">-->
			<!--                  <Col span="22" style="text-align: left">-->
			<!--                    <Select v-model="addReport.projectPrincipalNumber" >-->
			<!--                      <Option v-for="item in addConfig.projectManager" :value="item.value" :key="item.value">{{ item.label }}</Option>-->
			<!--                    </Select>-->
			<!--                  </Col>-->
			<!--                </FormItem>-->
			<!--              </Col>-->
			<!--              <Col span="10">-->
			<!--                <FormItem label="估计费用" prop="cost" :label-width="100">-->
			<!--                  <Col span="22" style="text-align: left">-->
			<!--                    <Input v-model="addReport.cost" placeholder="请输入估计费用"></Input>-->
			<!--                  </Col>-->
			<!--                  <Col span="2">-->
			<!--                    <span>元</span>-->
			<!--                  </Col>-->
			<!--                </FormItem>-->
			<!--              </Col>-->
			<!--            </Row>-->
			<!--            <Row>-->
			<!--              <Col span="24">-->
			<!--                <span style="width: 98%; height: 1px; background: #DCDCDC;display: inline-block;margin: 0 0 3vh 0"></span>-->
			<!--              </Col>-->
			<!--            </Row>-->
			<!--            <Row>-->
			<!--              <Col span="12">-->
			<!--                <FormItem label="估价委托人姓名(取姓氏)" prop="mandatorName" :label-width="184">-->
			<!--                  <Col span="20">-->
			<!--                    <Input v-model="addReport.mandatorName" placeholder="请输入估价委托人姓名.."></Input>-->
			<!--                  </Col>-->
			<!--                </FormItem>-->
			<!--              </Col>-->
			<!--              <Col span="12" >-->
			<!--                <FormItem label="估价委托人身份证号/信用代码" prop="mandatorIdentityCard" :label-width="150">-->
			<!--                  <Col span="20">-->
			<!--                    <Input v-model="addReport.mandatorIdentityCard" placeholder="请输入委托人身份证号/信用代码"></Input>-->
			<!--                  </Col>-->
			<!--                </FormItem>-->
			<!--              </Col>-->
			<!--            </Row>-->
			<!--            <Row>-->
			<!--              <Col span="20" >-->
			<!--                <FormItem label="报告摘录" prop="excerpt" :label-width="100">-->
			<!--                  <Col span="18">-->
			<!--                    <Input v-model="addReport.excerpt" maxlength="300" show-word-limit type="textarea" placeholder="报告摘录以及特征描述..."/>-->
			<!--                  </Col>-->
			<!--                </FormItem>-->
			<!--              </Col>-->
			<!--            </Row>-->
			<!--          </Form>-->
			<!--        </div>-->
			<!--        <div slot="footer" style="text-align: center">-->
			<!--          <Button style="background-color:#3DA2F8;color: #fff;width: 5vw" @click="addUploadReport('addReport')">上报</Button>-->
			<!--          <Button style="background: #FFFFFF;color: #2E3235;width: 5vw"  @click="closeUpdateModel">取消</Button>-->
			<!--        </div>-->
			<!--      </Modal>-->
			<!-- 修改报告信息 -->
			<Modal v-model="UpdateReportModel" draggable scrollable :transfer="false" width="960" :styles="{top: '100px'}"
						 :closable="false">
				<p slot="header" style="color:#1C1C1C;text-align:left; width: 60vw">
					<span>填报信息填写</span>
				</p>
				<div style="text-align:center;">
					<Form ref="updateReport" :model="updateReport" :rules="ruleAddValidate" :label-colon="true">
						<Row>
							<Col span="12">
								<FormItem label="估价对象" prop="valuationObject" :label-width="100">
									<Col span="20">
										<Input v-model="updateReport.valuationObject" placeholder="请输入估价对象"></Input>
									</Col>
								</FormItem>
							</Col>
							<Col span="12">
								<FormItem label="估价对象地址" prop="valuationObjectAddress" :label-width="100">
									<Col span="20">
										<Input v-model="updateReport.valuationObjectAddress" placeholder="请输入估价对象地址"></Input>
									</Col>
								</FormItem>
							</Col>
						</Row>
						<Row>
							<Col span="24">
								<span
									style="width: 98%; height: 1px; background: #DCDCDC;display: inline-block;margin: 0 0 3vh 0"></span>
							</Col>
						</Row>
						<Row>
							<Col span="10">
								<FormItem label="估价目的" prop="valuationPurpose" :label-width="100">
									<Col span="22">
										<Select v-model="updateReport.valuationPurpose" style="text-align: left">
											<Option v-for="item in addConfig.purposeList" :value="item.value" :key="item.value">{{ item.label
												}}
											</Option>
										</Select>
										<!--                    <Input v-model="updateReport.valuationPurpose" placeholder="请输入估价目的" style="display: inline-block"></Input>-->
									</Col>
								</FormItem>
							</Col>
							<Col span="10">
								<FormItem label="估价结果" prop="valuationResult" :label-width="100">
									<Col span="22">
										<Input v-model="updateReport.valuationResult" placeholder="请输入估价结果"
													 style="display: inline-block"></Input>
									</Col>
								</FormItem>
							</Col>
						</Row>
						<Row>
							<Col span="10">
								<FormItem label="估价师1" prop="valuer1" :label-width="100">
									<Col span="22" style="text-align: left">
										<Select v-model="updateReport.valuer1" @on-open-change="addRoportSelectAutor('valuer1', 'update')"
														@on-change="addReportChangeAutor('valuer1', 'update')">
											<Option v-for="(item, index) in addConfig.appraiserOneList" :value="item.value" :key="index">{{
												item.label }}
											</Option>
										</Select>
									</Col>
								</FormItem>
							</Col>
							<Col span="10">
								<FormItem label="估价师2" prop="valuer2" :label-width="100">
									<Col span="22" style="text-align: left">
										<Select v-model="updateReport.valuer2" @on-open-change="addRoportSelectAutor('valuer2', 'update')"
														@on-change="addReportChangeAutor('valuer2', 'update')">
											<Option v-for="item in addConfig.appraiserTwoList" :value="item.value" :key="item.value">{{
												item.label }}
											</Option>
										</Select>
									</Col>
								</FormItem>
							</Col>
						</Row>
						<!--            -->
						<Row>
							<Col span="10">
								<FormItem label="价值时间" prop="valuationDate" :label-width="100">
									<Col span="30" style="text-align: left">
										<DatePicker type="date" placeholder="选择日期" format="yy-MM-dd" style="width: 92%"
																v-model="updateReport.valuationDate"></DatePicker>
									</Col>
								</FormItem>
							</Col>
							<Col span="10">
								<FormItem label="估价有效期" prop="valuationValidityBegin" :label-width="100">
									<Col span="30" style="text-align: left">
										<DatePicker type="daterange" format="yy-MM-dd" placeholder="选择时间段" style="width: 92%"
																v-model="updateReport.valuationValidityBegin"></DatePicker>
									</Col>
								</FormItem>
							</Col>
						</Row>
						<Row>
							<Col span="10">
								<FormItem label="二级审核人" prop="auditor2Uuid" :label-width="100">
									<Col span="22" style="text-align: left" @on-change="changeReviewerData('update')">
										<Select v-model="updateReport.auditor2Uuid">
											<Option v-for="item in addConfig.reviewerOneList" :value="item.value" :key="item.value">{{
												item.label }}
											</Option>
										</Select>
									</Col>
								</FormItem>
							</Col>
							<Col span="10">
								<FormItem label="三级审核人" prop="auditor3Number" :label-width="100">
									<Col span="22" style="text-align: left">
										<Select v-model="updateReport.auditor3Number">
											<Option v-for="item in addConfig.reviewerTwoList" :value="item.value" :key="item.value">{{
												item.label }}
											</Option>
										</Select>
									</Col>
								</FormItem>
							</Col>
						</Row>
						<Row>
							<Col span="10">
								<FormItem label="项目负责人" prop="projectPrincipalNumber" :label-width="100">
									<Col span="22" style="text-align: left">
										<Select v-model="updateReport.projectPrincipalNumber">
											<Option v-for="item in addConfig.projectManager" :value="item.value" :key="item.value">{{
												item.label }}
											</Option>
										</Select>
									</Col>
								</FormItem>
							</Col>
							<Col span="10">
								<FormItem label="估计费用" prop="cost" :label-width="100">
									<Col span="22" style="text-align: left">
										<Input v-model="updateReport.cost" placeholder="请输入估计费用"></Input>
									</Col>
									<Col span="2">
										<span>元</span>
									</Col>
								</FormItem>
							</Col>
						</Row>
						<Row>
							<Col span="24">
								<span
									style="width: 98%; height: 1px; background: #DCDCDC;display: inline-block;margin: 0 0 3vh 0"></span>
							</Col>
						</Row>
						<Row>
							<Col span="12">
								<FormItem label="估价委托人姓名(取姓氏)" prop="mandatorName" :label-width="184">
									<Col span="20">
										<Input v-model="updateReport.mandatorName" placeholder="请输入估价委托人姓名.."></Input>
									</Col>
									<!--                  <Col span="10">-->
									<!--                    <RadioGroup v-model="updateReport.sex">-->
									<!--                      <Radio label="先生">先生</Radio>-->
									<!--                      <Radio label="女士">女士</Radio>-->
									<!--                    </RadioGroup>-->
									<!--                  </Col>-->
								</FormItem>
							</Col>
							<Col span="12">
								<FormItem label="估价委托人身份证号/信用代码" prop="mandatorIdentityCard" :label-width="203">
									<Col span="20">
										<Input v-model="updateReport.mandatorIdentityCard" placeholder="请输入委托人身份证号/信用代码"></Input>
									</Col>
								</FormItem>
							</Col>
						</Row>
						<Row>
							<Col span="20">
								<FormItem label="报告摘录" prop="excerpt" :label-width="100">
									<Col span="18">
										<Input v-model="updateReport.excerpt" maxlength="300" show-word-limit type="textarea"
													 placeholder="报告摘录以及特征描述..."/>
									</Col>
								</FormItem>
							</Col>
						</Row>
					</Form>
				</div>
				<div slot="footer" style="text-align: center">
					<Button style="background-color:#3DA2F8;color: #fff;width: 5vw" @click="updateReportInfo('updateReport')">确认
					</Button>
					<Button style="background: #FFFFFF;color: #2E3235;width: 5vw" @click="closeUpdateModel">取消</Button>
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
