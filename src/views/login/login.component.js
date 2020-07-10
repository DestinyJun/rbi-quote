// eslint-disable-next-line no-unused-vars
import ToolUtil from "../../utils/tool";
import service from '../../service/service'
import store from '@/store';
let loginSrv = new service();
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
            // let data['username'] = this.formCustom.username;
            let data = `username=${this.formCustom.username}&password=${this.formCustom.passwd}`;
            // console.log(123);
            this.$refs[name].validate((valid) => {
                if (valid) {
                    // console.log(123);
                    if(this.formCustom.checkbox.length !== 0) {
                        // console.log(this.formCustom);
                        this.tool.setObject('Userform', this.formCustom)
                    }

                    loginSrv.login(data).then(
                        res => {
                            console.log(res);
                            if (Object.is(res.code ,'1000')){
                                this.tool.toast('success', '登录成功!');
                                this.tool.setItem('accessToken', res.data);
                                // eslint-disable-next-line no-mixed-spaces-and-tabs
                                    store.dispatch('setToken', res.data);
                                    this.getMenu();
                            }else {
                                this.tool.toast('error', `${res.msg}`);
                            }
                        }
                    ).catch(() => {
                        this.tool.toast('error', '服务器处理异常，请检查网络是否连接!')
                    })

                } else {
                    // this.$Message.error('登录失败!');
                    this.tool.toast('error', '请输入用户名和密码!')
                }
            })
        },
        delItem(){
            if (this.formCustom.checkbox.length === 0){
                this.tool.delitem('Userform');

            }

        },
        getMenu(){
          loginSrv.getMenuData({}).then(value => {
            this.tool.setObject('MenuData', value);
            this.$router.push('./home/report');
          })
        }

    }

}
