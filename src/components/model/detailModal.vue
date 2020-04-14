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
							<Col span="10" style="line-height: 3vh;text-align: right">
								<span>{{item.label}}：</span>
							</Col>
							<Col span="12" style="line-height: 3vh">
								<span style="display: inline-block;width: 18vw;height: 3vh;text-align: left;margin-left: 1vw;">{{item.label}}</span>
							</Col>
						</Col>
					</div>
					<div>
						<Col span="24">
							<span
								style="width: 98%; height: 1px; background: #DCDCDC;display: inline-block;margin: 2vh 0 2vh 0;"></span>
						</Col>
					</div>
					<div v-for="(item, index) in dialogOption.dataList" :key="index + 1000">
						<Col span="12" v-if="item.styleType === 2">
							<Col span="10" style="line-height: 3vh;text-align: right">
								<span>{{item.label}}：</span>
							</Col>
							<Col span="12" style="line-height: 3vh">
								<span
									style="display: inline-block;padding:0 0 0 3px; width: 100%;height: 3vh;margin-left: 1vw;text-align: left;">{{item.value}}</span>
							</Col>
						</Col>
					</div>
					<Col span="24">
						<span style="width: 98%; height: 1px; background: #DCDCDC;display: inline-block;margin: 2vh 0 2vh 0"></span>
					</Col>
					<Row></Row>
				</Scroll>
				<!--        <Row></Row>-->
			</div>
			<div slot="footer" style="text-align: center">
				<button style="background-color:#3DA2F8;color: #fff;width: 5vw;height: 3vh;border: 0;box-shadow: 1px 1px 3px #999999" v-if="dialogOption.surebtn !== ''"
								@click="sureClick">{{dialogOption.surebtn}}
				</button>
				<button style="background: #FFFFFF;color: #2E3235;width: 5vw;height: 3vh;border: 0;box-shadow: 1px 1px 3px #999999"
								@click="closeModel">{{dialogOption.canclebtn}}
				</button>
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
				dataList: {
					type: Array,
					default: []
				},
				surebtn: {
					type: String,
					default: ''
				},
				canclebtn: {
					type: String,
					default: ''
				}
			}
		},
		watch: {
			dialogOption: (data) => {
				console.log(data.canclebtn);
			}
		},
		methods: {
			closeModel() {
				this.$emit('closeModel')
			},
			sureClick() {
				this.$emit('sureClick')
			}
		}
	}
</script>

<style scoped>

</style>
