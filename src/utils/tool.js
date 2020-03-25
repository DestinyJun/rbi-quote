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
}
export default ToolUtil
