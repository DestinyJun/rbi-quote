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
    methods: {
        handleSubmit: function(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    // this.$Message.success('登录成功!');
                    this.tool.toast('success', '登录成功!');
                    this.$router.push('./home/report')
                } else {
                    // this.$Message.error('登录失败!');
                    this.tool.toast('error', '登录失败!')
                }
            })
        },
    }

}
