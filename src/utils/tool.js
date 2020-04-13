import {Message} from "view-design";
import {Modal} from "view-design";
class ToolUtil {
    constructor() {
    }
    toast(type, message){
        Message[type]({
            background: true,
            content: message,
            closable: true
        })
    }
    setItem(name , value){
        localStorage.setItem(name, value)
    }
    getItem(name){
        return localStorage.getItem(name)
    }
    getObject(name){
        return JSON.parse(localStorage[name] || '{}')
    }
    setObject(name, value){
        localStorage[name] = JSON.stringify(value)
    }
    delitem(name){
        localStorage.removeItem(name)
    }
    setModal (type, title, content, callback) {
        switch (type) {
            case 'info':
                Modal.info({
                    title: title,
                    content: '<p>' + content + '</p>'
                });
                break;
            case 'success':
                Modal.success({
                    title: title,
                    content: '<p>' + content + '</p>'
                });
                break;
            case 'warning':
                Modal.warning({
                    title: title,
                    content: '<p>' + content + '</p>'
                });
                break;
            case 'error':
                Modal.error({
                    title: title,
                    content: '<p>' + content + '</p>'
                });
                break;
            case 'confirm':
                Modal.confirm({
                        title: title,
                        content: '<p>' + content + '</p>',
                        onOk: () => {
                            // Modal.info('确认');
                            callback()
                        },
                        onCancel: () => {
                            // Modal.info('取消');
                        }
                    });
        }
    }
    // 设置警告提示
    setRemind(title, message, callback){
        Modal.confirm({
            render: (h) => {
                return h('div', [
                    h('div', [
                        h('span', {
                            style: {
                                color: '#000',
                                fontSize: '18px',
                                display: 'block',
                                textAlign: 'center',
                                marginBottom: '3vh'
                            }
                        },`${title}提醒`)
                    ]),
                    h('div', [
                        h('Icon', {
                            attrs: {
                                type: 'ios-alert'
                            },
                            style: {
                                color: '#FF9900',
                                fontSize: '16px',
                                marginRight: '4px'
                            }
                        }),
                        h('span', {
                            style: {
                                color: '#000',
                                fontSize: '16px'
                            }
                        },`您确定要${message}吗?`),
                    ]),
                ])
            },
            onOk: () => {
                callback()
            },
        })
    }
    // 时间状态转换
    setTimeFomart(data){
        let d = new Date(data);
        return  d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
    }
}
export default ToolUtil
