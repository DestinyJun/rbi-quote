import {Message} from "view-design";

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
        return JSON.parse(sessionStorage[name] || '{}')
    }
    setObject(name, value){
        sessionStorage[name] = JSON.stringify(value)
    }
    delitem(name){
        localStorage.removeItem(name)
    }
}
export default ToolUtil
