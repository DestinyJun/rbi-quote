<template>
	<div id="detailModal">
		<Modal v-model="dialogOption.hidden" draggable scrollable :transfer="false" :width="dialogOption.width"
					 :styles="dialogOption.style" :closable="false">
			<p slot="header" style="color:#1C1C1C;text-align:left; width: 60vw">
				<span>{{dialogOption.title}}</span>
			</p>
			<div style="text-align:center;">
				<Scroll :height="dialogOption.height">
					<div v-for="(item, index) in dialogOption.dataList" :key="index">
						<Col span="12" v-if="item.styleType === 1">
							<Col span="20" v-if="item.type === 'input'">
								<Col span="6" style="line-height: 3vh;text-align: right">
									<span>{{item.label}}：</span>
								</Col>
								<Col span="3" style="line-height: 3vh">
									<span style="display: inline-block;width: 18vw;height: 3vh;text-align: left">{{item.label}}</span>
								</Col>
							</Col>
						</Col>
					</div>
					<div>
						<Col span="24">
								<span
									style="width: 98%; height: 1px; background: #DCDCDC;display: inline-block;margin: 0 0 3vh 0"></span>
						</Col>
					</div>
					<div v-for="(item, index) in dialogOption.dataList" :key="index + 1000">
						<Col span="10" v-if="item.styleType === 2">
							<Col span="6" style="line-height: 3vh;text-align: right">
								<span>{{item.label}}：</span>
							</Col>
							<Col span="12" style="line-height: 3vh">
								<span
									style="display: inline-block;padding:0 0 0 3px; width: 100%;height: 3vh;text-align: left;border-radius: 3px; border: 1px solid #EEEEEE">{{item.value}}</span>
							</Col>
						</Col>
					</div>
					<Row></Row>
				</Scroll>
				<!--        <Row></Row>-->
			</div>
			<div slot="footer" style="text-align: center">
				<Button style="background-color:#3DA2F8;color: #fff;width: 5vw" @click="addUploadReport">上报</Button>
				<Button style="background: #FFFFFF;color: #2E3235;width: 5vw" @click="clearData">取消</Button>
			</div>
		</Modal>
	</div>
</template>

<script>
	export default {
		name: 'detailModal',
		props: {
			dialogOption: {
				width: {
					type: Number,
					default: 960
				},
				height: {
					// eslint-disable-next-line no-mixed-spaces-and-tabs
					type: Number,
					default: 300
				},
				title: {
					type: String,
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
				modelData: {
					type: Object,
					default: {}
				},
				dataList: {
					type: Array,
					default: []
				},
				modalType: {
					type: String,
					default: ''
				},
			}
		},
	}
</script>

<style scoped>

</style>
