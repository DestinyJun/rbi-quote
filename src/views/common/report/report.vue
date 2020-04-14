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
<!--			<Modal v-model="detailModal" draggable scrollable :transfer="false" width="960" :styles="{top: '150px'}">-->
<!--				<p slot="header" style="color:#1C1C1C;text-align:left">-->
<!--					<span>填报详情</span>-->
<!--				</p>-->
<!--				<div style="text-align:center;padding: 0 2vw">-->
<!--					<Row>-->
<!--						<Col span="12">-->
<!--							<Col span="6" style="line-height: 3vh;text-align: right">-->
<!--								<span>估价对象：</span>-->
<!--							</Col>-->
<!--							<Col span="3" style="line-height: 3vh">-->
<!--								<span style="display: inline-block;width: 18vw;height: 3vh;text-align: left">{{detailReport.valuationObject}}</span>-->
<!--							</Col>-->
<!--						</Col>-->
<!--						<Col span="12">-->
<!--							<Col span="6" style="line-height: 3vh;text-align: right">-->
<!--								<span>估价对象地址：</span>-->
<!--							</Col>-->
<!--							<Col span="3" style="line-height: 3vh">-->
<!--								<span style="display: inline-block;width: 18vw;height: 3vh;text-align: left">{{detailReport.valuationObjectAddress}}</span>-->
<!--							</Col>-->
<!--						</Col>-->
<!--					</Row>-->
<!--					<Row>-->
<!--						<Col span="24">-->
<!--							<span-->
<!--								style="width: 98%; height: 1px; background: #DCDCDC;display: inline-block;margin: 2vh 0 2vh 0"></span>-->
<!--						</Col>-->
<!--					</Row>-->
<!--					<Row style="margin: 0.5vh">-->
<!--						<Col span="10">-->
<!--							<Col span="6" style="line-height: 3vh;text-align: right">-->
<!--								<span>估价目的：</span>-->
<!--							</Col>-->
<!--							<Col span="12" style="line-height: 3vh">-->
<!--								<span-->
<!--									style="display: inline-block;padding:0 0 0 3px; width: 100%;height: 3vh;text-align: left;border-radius: 3px; border: 1px solid #EEEEEE">{{detailReport.valuationPurpose}}</span>-->
<!--							</Col>-->

<!--						</Col>-->
<!--						<Col span="10">-->
<!--							<Col span="6" style="line-height: 3vh;text-align: right">-->
<!--								<span>估价结果：</span>-->
<!--							</Col>-->
<!--							<Col span="12" style="line-height: 3vh;">-->
<!--								<span-->
<!--									style="display: inline-block;padding:0 0 0 3px; width: 100%;height: 3vh;text-align: left;border-radius: 3px; border: 1px solid #EEEEEE">￥{{detailReport.valuationResult}}</span>-->
<!--							</Col>-->
<!--						</Col>-->
<!--					</Row>-->
<!--					<Row style="margin: 0.5vh">-->
<!--						<Col span="10">-->
<!--							<Col span="6" style="line-height: 3vh;text-align: right">-->
<!--								<span>估价师1：</span>-->
<!--							</Col>-->
<!--							<Col span="12" style="line-height: 3vh">-->
<!--								<span-->
<!--									style="display: inline-block;padding:0 0 0 3px; width: 100%;height: 3vh;text-align: left;border-radius: 3px; border: 1px solid #EEEEEE">{{detailReport.valuer1}}</span>-->
<!--							</Col>-->
<!--						</Col>-->
<!--						<Col span="10">-->
<!--							<Col span="6" style="line-height: 3vh;text-align: right">-->
<!--								<span>估价师2：</span>-->
<!--							</Col>-->
<!--							<Col span="12" style="line-height: 3vh">-->
<!--								<span-->
<!--									style="display: inline-block;padding:0 0 0 3px; width: 100%;height: 3vh;text-align: left;border-radius: 3px; border: 1px solid #EEEEEE">{{detailReport.valuer2}}</span>-->
<!--							</Col>-->
<!--						</Col>-->

<!--					</Row>-->
<!--					<Row style="margin: 0.5vh">-->
<!--						<Col span="10">-->
<!--							<Col span="6" style="line-height: 3vh;text-align: right">-->
<!--								<span>价值时点：</span>-->
<!--							</Col>-->
<!--							<Col span="12" style="line-height: 3vh">-->
<!--								<span-->
<!--									style="display: inline-block;padding:0 0 0 3px; width: 100%;height: 3vh;text-align: left;border-radius: 3px; border: 1px solid #EEEEEE">{{detailReport.valuationDate}}</span>-->
<!--							</Col>-->
<!--						</Col>-->
<!--						<Col span="10">-->
<!--							<Col span="6" style="line-height: 3vh;text-align: right">-->
<!--								<span>估计有效期：</span>-->
<!--							</Col>-->
<!--							<Col span="12" style="line-height: 3vh">-->
<!--								<span-->
<!--									style="display: inline-block;padding:0 0 0 3px; width: 100%;height: 3vh;text-align: left;border-radius: 3px; border: 1px solid #EEEEEE">{{detailReport.valuationValidityBegin}}</span>-->
<!--							</Col>-->
<!--						</Col>-->
<!--					</Row>-->
<!--					<Row style="margin: 0.5vh">-->
<!--						<Col span="10">-->
<!--							<Col span="6" style="line-height: 3vh;text-align: right">-->
<!--								<span>二级审核人：</span>-->
<!--							</Col>-->
<!--							<Col span="12" style="line-height: 3vh">-->
<!--								<span-->
<!--									style="display: inline-block;padding:0 0 0 3px; width: 100%;height: 3vh;text-align: left;border-radius: 3px; border: 1px solid #EEEEEE">{{detailReport.auditor2Uuid}}</span>-->
<!--							</Col>-->
<!--						</Col>-->
<!--						<Col span="10">-->
<!--							<Col span="6" style="line-height: 3vh;text-align: right">-->
<!--								<span>三级审核人：</span>-->
<!--							</Col>-->
<!--							<Col span="12" style="line-height: 3vh">-->
<!--								<span-->
<!--									style="display: inline-block;padding:0 0 0 3px; width: 100%;height: 3vh;text-align: left;border-radius: 3px; border: 1px solid #EEEEEE">{{detailReport.auditor3Number}}</span>-->
<!--							</Col>-->
<!--						</Col>-->
<!--					</Row>-->
<!--					<Row style="margin: 0.5vh">-->
<!--						<Col span="10">-->
<!--							<Col span="6" style="line-height: 3vh;text-align: right">-->
<!--								<span>项目负责人：</span>-->
<!--							</Col>-->
<!--							<Col span="12">-->
<!--								<span-->
<!--									style="display: inline-block;padding:0 0 0 3px; width: 100%;height: 3vh;text-align: left;border-radius: 3px; border: 1px solid #EEEEEE">{{detailReport.projectPrincipalNumber}}</span>-->
<!--							</Col>-->
<!--						</Col>-->
<!--						<Col span="10">-->
<!--							<Col span="6" style="line-height: 3vh;text-align: right">-->
<!--								<span>估价费用：</span>-->
<!--							</Col>-->
<!--							<Col span="12">-->
<!--								<span-->
<!--									style="display: inline-block;padding:0 0 0 3px; width: 100%;height: 3vh;text-align: left;border-radius: 3px; border: 1px solid #EEEEEE">{{detailReport.cost}}</span>-->
<!--							</Col>-->
<!--						</Col>-->
<!--					</Row>-->
<!--					<Row>-->
<!--						<Col span="24">-->
<!--							<span-->
<!--								style="width: 98%; height: 1px; background: #DCDCDC;display: inline-block;margin: 2vh 0 2vh 0"></span>-->
<!--						</Col>-->
<!--					</Row>-->
<!--					<Row>-->
<!--						<Col span="12">-->
<!--							<Col span="10" style="line-height: 3vh">-->
<!--								<span>估价委托人姓名(取姓氏)：</span>-->
<!--							</Col>-->
<!--							<Col span="3" style="line-height: 3vh">-->
<!--								<span style="display: inline-block;width: 18vw;height: 3vh;border-radius: 3px;text-align: left">{{detailReport.mandatorName}}</span>-->
<!--							</Col>-->
<!--						</Col>-->
<!--						<Col span="12">-->
<!--							<Col span="14" style="line-height: 3vh">-->
<!--								<span>估价委托人身份证/信用代码：</span>-->
<!--							</Col>-->
<!--							<Col span="3" style="line-height: 3vh">-->
<!--								<span style="display: inline-block;width: 320%;height: 3vh;border-radius: 3px;text-align: left">...{{detailReport.mandatorIdentityCard.slice(detailReport.mandatorIdentityCard.length -5, detailReport.mandatorIdentityCard.length)}}</span>-->
<!--							</Col>-->
<!--						</Col>-->
<!--					</Row>-->
<!--					<Row style="margin-top: 2vh">-->
<!--						<Col span="12">-->
<!--							<Col span="6" style="line-height: 3vh;text-align: right">-->
<!--								<span>报告摘录：</span>-->
<!--							</Col>-->
<!--							<Col span="10">-->
<!--								<span style="display: inline-block;width: 300%;height: 3vh;border-radius: 3px;text-align: left">{{detailReport.excerpt}}</span>-->
<!--							</Col>-->
<!--						</Col>-->
<!--					</Row>-->
<!--				</div>-->
<!--				<div slot="footer" style="text-align: center">-->
<!--					<Button style="background-color:#3DA2F8;color: #fff;width: 6vw" @click="detailModal = false">关闭</Button>-->
<!--					&lt;!&ndash;          <Button style="background: #FFFFFF;color: #2E3235;width: 5vw"  @click="detailModal = false">取消</Button>&ndash;&gt;-->
<!--				</div>-->
<!--			</Modal>-->
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
			<modal :dialog-option="addOption" @addUploadReport="addUploadReport" ref="modelData" @closeModel="closeUpdateModel"/>
			<detail-modal :dialog-option="detailOption" @closeModel="closeDetailModel"/>
		</div>
	</div>
</template>

<script src="./report.component.js">

</script>

<style scoped lang="scss">
	@import "report.component";
</style>
