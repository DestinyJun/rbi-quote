<template>
  <div id="basicdialog" class="dialog">
    <Modal v-model="dialogOption.hidden" :mask-closable="false"  scrollable :transfer="false"  :width="dialogOption.width" :styles="dialogOption.style" :closable="false">
      <p slot="header" style="color:#1C1C1C;text-align:left; width: 60vw">
        <span>{{dialogOption.title}}</span>
      </p>
      <div style="text-align:center;">
        <Scroll :height="dialogOption.height">
          <Form  ref="modelData" :model="dialogOption.modelData" :rules="dialogOption.ruleValidate"  :label-colon="true">
            <div v-for="(item, index) in dialogOption.dataList" :key="index" >
              <Col span="12" v-if="item.styleType === 1">
                <FormItem :label="item.label" :prop="item.key" :label-width="100">
                  <Col span="22" v-if="item.type === 'input'">
										<Input v-model="dialogOption.modelData[item.key]" number :placeholder="item.placeholder" :disabled="!item.disabled" v-if="item.dataType === 'Number'"></Input>
										<Input v-model="dialogOption.modelData[item.key]"  :placeholder="item.placeholder" :disabled="!item.disabled" v-if="item.dataType !== 'Number'"></Input>
                  </Col>
                  <Col span="22" v-if="item.type === 'select'">
                    <Select v-model="dialogOption.modelData[item.key]" style="text-align: left" filterable allow-create clearable>
                      <Option v-for="(select_item, selIndex) in item.list" :value="select_item.value" :key="selIndex" :disabled="!item.disabled">{{ select_item.label }}</Option>
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

              <Col span="12" v-if="item.styleType === 2">
                <FormItem :label="item.label" :prop="item.key" :label-width="100">
                  <!--输入框-->
                  <Col span="22" v-if="item.type === 'input'">
                    <Input v-model="dialogOption.modelData[item.key]" number :placeholder="item.placeholder" :disabled="!item.disabled" v-if="item.dataType === 'Number'"></Input>
                    <Input v-model="dialogOption.modelData[item.key]"  :placeholder="item.placeholder" :disabled="!item.disabled" v-if="item.dataType !== 'Number'"></Input>
                  </Col>
                  <!--下拉框-->
                  <Col span="22" v-if="item.type === 'select'">
                    <Select v-model="dialogOption.modelData[item.key]" style="text-align: left" filterable allow-create clearable>
                      <Option v-for="(select_item, selIndex) in item.list" :value="select_item.value" :key="selIndex" :disabled="!item.disabled">{{ select_item.label }}</Option>
                    </Select>
                  </Col>
                  <!--日期-->
                  <Col span="30" style="text-align: left" v-if="item.type === 'date'">
<!--										<DatePicker type="datetime" placeholder="Select date and time" style="width: 200px"></DatePicker>-->
                    <DatePicker type="datetime" :placeholder="item.placeholder"  style="width: 92%" v-model="dialogOption.modelData[item.key]"   :ref="item.key" format="yyyy-MM-dd HH:mm:ss"  :disabled="!item.disabled"></DatePicker>
                  </Col>
                  <Col span="22"  v-if="item.type === 'check'">
                    <CheckboxGroup v-model="dialogOption.modelData[item.key]" disabled>
                      <Col span="12"  v-for="(i, checkindex) in item.list" :key="checkindex" style="text-align: left">
                        <Checkbox :label="i.value" :disabled="!item.disabled">{{i.label}}</Checkbox>
                      </Col>
                    </CheckboxGroup>
                  </Col>
                  <Col span="22" v-if="item.type === 'radio'">
                    <RadioGroup v-model="dialogOption.modelData[item.value]">
                      <Col span="12"  v-for="(i, radioindex) in item.list" :key="radioindex" style="text-align: left">
                        <Radio :label="i.value" style="margin-left: 28px" :disabled="!item.disabled">{{i.label}}</Radio>
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
										<Input v-model="dialogOption.modelData[item.key]" number :placeholder="item.placeholder" :disabled="!item.disabled" v-if="item.dataType === 'Number'"></Input>
										<Input v-model="dialogOption.modelData[item.key]"  :placeholder="item.placeholder" :disabled="!item.disabled" v-if="item.dataType !== 'Number'"></Input>
                  </Col>
                  <Col span="20" v-if="item.type === 'select'">
                    <Select v-model="dialogOption.modelData[item.key]" style="text-align: left" filterable allow-create clearable>
                      <Option v-for="(select_item, selIndex) in item.selList" :value="select_item.value" :disabled="!item.disabled" :key="selIndex">{{ select_item.label }}</Option>
                    </Select>
                  </Col>
                  <Col span="18" v-if="item.type === 'textarea'">
                    <Input v-model="dialogOption.modelData[item.key]" maxlength="300" show-word-limit :disabled="!item.disabled" type="textarea" :placeholder="item.placeholder"/>
                  </Col>
                </FormItem>
              </Col>
              <Col span="20" v-if="item.styleType === 4">
                <FormItem :label="item.label" :prop="item.key" :label-width="100">
                  <Col span="18" v-if="item.type === 'textarea'">
                    <Input v-model="dialogOption.modelData[item.key]" maxlength="300" :disabled="!item.disabled" show-word-limit type="textarea" :placeholder="item.placeholder"/>
                  </Col>
                </FormItem>
              </Col>
            </div>
            <Row></Row>
          </Form>
        </Scroll>
<!--        <Row></Row>-->
      </div>
      <div slot="footer" style="text-align: center">
        <Button style="background-color:#3DA2F8;color: #fff;width: 5vw" @click="addReport">上报</Button>
        <Button style="background: #FFFFFF;color: #2E3235;width: 5vw"  @click="clearData">取消</Button>
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
          height: {
            // eslint-disable-next-line no-mixed-spaces-and-tabs
          	type: Number,
            default: 300
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
          },
          modalType: {
              type: String,
              default: ''
          },
       }
    },
		// 监听父组件传值
		// watch:{
		// 	dialogOption: (item) => {//箭头函数  不然会发生this改变
		// 		console.log(item.dataList)
		// 	}
		// },
		methods:{
			addReport(){
				this.$refs['modelData'].validate(valid => {
					console.log(valid);
					console.log(this.dialogOption.modelData);
					if (valid){
						this.$emit('addUploadReport', this.dialogOption.modelData, this.dialogOption.modalType)
					}
				})
      },
			clearData(){
				this.$emit('closeModel')
      },
    },
		filters: {
    	setDateForString: function (data) {
				let date = new Date(data);
				let y = date.getFullYear() < 10? '0'+ date.getFullYear(): date.getFullYear();
				let M = (date.getMonth() + 1) < 10? '0'+ (date.getMonth() + 1): (date.getMonth() + 1);
				let d = date.getDate() < 10? '0'+ date.getDate(): date.getDate();
				let H = date.getHours()  < 10? '0'+ date.getHours() : date.getHours();
				let m = date.getMinutes() < 10? '0'+ date.getMinutes(): date.getMinutes();
				let s = date.getSeconds() < 10? '0'+ date.getSeconds(): date.getSeconds();
				return  y + '-' + M + '-' + d  + ' ' + H + ':' + m + ':' + s;
			}
		}
  }
</script>

<style scoped lang="scss">
	.dialog{
		/deep/ .ivu-row{
					z-index: -1;
			}
			/deep/ .ivu-modal-wrap{
				overflow: hidden;
			}
		/deep/ .ivu-form-item {
			height: 50px;
		}
  }

</style>
