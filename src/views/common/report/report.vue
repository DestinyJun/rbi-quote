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
