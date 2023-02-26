import { createStore } from "vuex";

export default createStore({
  state() {
    return {
      userInfo: {}
    }
  },
  mutations: {
    getUserInfo(state, payload) {
      state.userInfo = payload
    }
  }
})