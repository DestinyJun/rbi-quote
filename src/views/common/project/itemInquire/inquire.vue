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
		<div class="inquire-data" v-if="itemData[0].value !== 0">
			<div class="inquire-item" v-for="item in itemData" :key="item.id">
				<div class="inquire-item-title">
					<span>{{item.label}}</span>
					<span :style="{'color': item.fcolor}">{{item.value}}</span>
				</div>
				<div class="inquire-item-border">
					<span class="inquire-item-inner" :style="{'width': `${item.bwidth}%`, 'background': item.bgc}"/>
				</div>
			</div>
			<span
				style="display: inline-block; width: 2px;height: 80%;background: #ECECEC;margin-bottom: -2vh;margin-right: 23px"/>
			<div class="inquire-item" v-for="(item2,index12) in itemData1" :key="index12">
				<div class="inquire-item-title">
					<span>{{item2.label}}</span>
					<span :style="{'color': item2.fcolor}">{{item2.value}}</span>
				</div>
				<div class="inquire-item-border">
					<span class="inquire-item-inner" :style="{'width': `${item2.bwidth}%`, 'background': item2.bgc}"/>
				</div>
			</div>
			<div class="inquire-item" style="position: absolute;width: 15vw">
				<div class="inquire-item-title" style="height: 3vh;margin-top: -1.4vh">
					<span style="font-size: 12px">未收费用(元):</span>
					<span style="font-size: 22px;color: #AFAFAF">￥{{notChargedData}}</span>
				</div>
				<div class="inquire-item-title" style="height: 3vh;">
					<span style="font-size: 12px">已收费用(元):</span>
					<span style="font-size: 22px;color: #E17055">￥{{ChargedData}}</span>
				</div>
			</div>
		</div>
		<div class="inquire-select">
			<!--      报告类型-->
			<div>
				<span>{{reportTypeList.title}}：</span>
				<span v-for="(item_text, index1) in reportTypeList.centent" :key="index1"
							:style="{'background': item_text.bgc, 'color':item_text.color}" @click="selectInquireType(index1)">{{item_text.name}}</span>
			</div>
			<!-- 审核状态-->
			<div class="inquire-select-status">
				<div class="select-status">
					<span>{{reportStatusList.title}}：</span>
					<span v-for="(item_text, index2) in reportStatusList.centent" :key="index2"
								:style="{'background': item_text.bgc,  'color':item_text.color}" @click="selectInquireReview(index2)">{{item_text.name}}</span>
					<label style="margin-left: 2vw">
						时间范围：
						<DatePicker type="daterange" placement="bottom-end" placeholder="选择日期" style="width: 200px"
												v-model="searchTime" @on-change="changeTime"></DatePicker>
					</label>
				</div>
				<div>
					<button class="searchBtn" @click="searchInquireDataByTime">
						查询
					</button>
					<button class="searchBtn" style="margin-left: 1vw" @click="importExcelFileClick">
						导出
					</button>
				</div>
			</div>

		</div>
		<div class="inquire-centent">
			<div class="inquire-search">
				<Input suffix="ios-search" placeholder="请输入文档编号..." style="width: auto" v-model="searchInquireData"
							 @on-search="searchData" search/>
			</div>
			<div class="inquire-table">
				<tables :table-option="tableOption"></tables>
			</div>
			<div class="inquire-paging">
				<paging :page-option="pageOption" @getPageDate="getPageDate"></paging>
			</div>
		</div>
		<detail-modal :dialog-option="detailOption" @closeModel="closeDetailModel"/>
		<div class="inquire-modal">
			<Modal
				title="审核"
				v-model="inquireModal"
				class-name="vertical-center-modal"  scrollable>
				<p style="text-align: center">待开发中...</p>
			</Modal>
			<!-- 打印二维码-->
			<Modal
				title="二维码"
				v-model="QRCodeModal"
				class-name="vertical-center-modal"  scrollable>
				<p style="text-align: center">二维码扫描</p>
				<div style="text-align: center;background: #EAEAEA;padding: 2vh">
					<QRCodes :code-url="codeUrl"></QRCodes>
				</div>
			</Modal>
		</div>

	</div>
</template>

<script src="./inquire.component.js">
</script>

<style scoped lang="scss">
	@import "inquire.component.scss";
</style>
