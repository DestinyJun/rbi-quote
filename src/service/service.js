import Vue from 'vue';
export default class Server {
    constructor() {
    }
    loginRequest(data){
        return Vue.axios.get('/user/login',data);
    }
}
