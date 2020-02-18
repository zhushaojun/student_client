import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  // 类似data
  state: {
    student_id: "未传入参数"
  },
  //类似methods
  mutations: {
    updateInfo(state, payLoad) {
      state.student_id = payLoad;
    }
  }
});
