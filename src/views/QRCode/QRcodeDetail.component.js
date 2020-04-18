/**
 * @Auter: moonshine
 * @Date: 2020/04/16  10:41
 * @desc:
 * @variable:
 */
import NavBar from '@/components/navbar/NavBar.vue'
import Server from '@/service/service'
import Tool from '@/utils/tool'
export default {
	name: "codeDetail",
	data(){
		return{
       codeSrv: new Server(),
       codeTool: new Tool(),
			 listData: [],
		}
	},
	created(){
    this.initData();
	},
	methods:{
     initData(){
     	 this.codeSrv.queryDetailInfo2({reportId: this.$route.query.code, templateId: this.$route.query.id}).then(
     	 	value => {
     	 		console.log(value);
     	 		if (value.code === '1000'){
     	 			 this.listData = value.data;
					}else {
     	 			this.codeTool.toast('error', value.msg)
					}
				}
			 )
		 }
	},
	components:{
		NavBar
	}
}
