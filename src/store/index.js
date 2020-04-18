import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    LOADING: true, // 动画状态
		accessToken: ''  // appkey
  },
  mutations: {  // 提供存储设置state数据方法
      hideLoading(state) {
          state.LOADING = true;
      },
      showLoading(state) {
          state.LOADING = false;
      },
		  setAccessToken(state, token){
      	state.accessToken = token
			}
  },
  actions: {  // 提供跟后台接口打交道的方法，并调用mutations提供的方法
      setLoadingStatus(state, name){
          this.commit(name)
      },
		  setToken(state, token){
      	 this.commit('setAccessToken', token)
			}
  },
  getters: { //getters (提供用来获取state数据的方法)
       getLoadingStatus(state) {
            return state.LOADING;
       },
		   getToken(state){
       	  return state.accessToken;
			 }
  },
  modules: {
  }
})
