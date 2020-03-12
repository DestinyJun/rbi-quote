// eslint-disable-next-line no-unused-vars
import ToolUtil from "../../utils/tool";
export default {
    name: 'login',
    data() {
        const validateUser = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入您的用户名'));
            } else {
                callback();
            }
        };
        const validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入您的密码'));
            } else {
                callback();
            }
        };
        return{
            tool: new ToolUtil(),
            formCustom: {
                username: '',
                passwd: '',
                checkbox: []
            },
            ruleCustom: {
                username: [
                    { validator: validateUser, trigger: 'blur' }
                ],
                passwd: [
                    { validator: validatePass, trigger: 'blur' }
                ],
            }
        };
    },
    created(){
      console.log(this.tool.getObject('Userform').checkbox === undefined );
      if (this.tool.getObject('Userform').checkbox !== undefined && this.tool.getObject('Userform').checkbox.length !== 0) {
          const form = this.tool.getObject('Userform');
          this.formCustom.username = form.username;
          this.formCustom.passwd = form.passwd;
          this.formCustom.checkbox = form.checkbox;
          // setTimeout(this.handleSubmit('formCustom'), 100);
      }
    },
    methods: {
        handleSubmit: function(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    if(this.formCustom.checkbox.length !== 0) {
                        // console.log(this.formCustom);
                        this.tool.setObject('Userform', this.formCustom)
                    }
                    // this.$Message.success('登录成功!');
                    this.tool.toast('success', '登录成功!');
                    this.$router.push('./home/report')
                } else {
                    // this.$Message.error('登录失败!');
                    this.tool.toast('error', '登录失败!')
                }
            })
        },
        delItem(){
            if (this.formCustom.checkbox.length === 0){
                this.tool.delitem('Userform')
            }

        }
    }

}
