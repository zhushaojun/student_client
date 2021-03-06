import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: "",
    token: localStorage.getItem("access_token") || "",
    email: ""
  },
  mutations: {
    auth_request(state) {
      state.status = "loading";
    },
    auth_success(state, token, email) {
      state.status = "success";
      state.token = token;
      state.email = email;
    },
    auth_error(state) {
      state.status = "error";
    },
    logout(state) {
      state.status = "";
      state.token = "";
    }
  },
  actions: {
    signin({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios({
          url: "http://frp.oailab.cn:6101/auth/jwt/create/",
          data: user,
          method: "POST",
          headers: { "Content-Type": "application/json" }
        })
          .then(resp => {
            const token = resp.data.access;
            const refresh_token = resp.data.refresh;
            const email = user.email;
            localStorage.setItem("email", email);
            localStorage.setItem("access_token", token);
            localStorage.setItem("refresh_token", refresh_token);
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
            commit("auth_success", token, email);
            resolve(resp);
          })
          .catch(err => {
            commit("auth_error");
            localStorage.removeItem("access_token");
            reject(err);
          });
      });
    },
    signup({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios({
          url: "http://frp.oailab.cn:6101/auth/users/",
          data: user,
          method: "POST",
          headers: { "Content-Type": "application/json" }
        })
          .then(resp => {
            const email = resp.data.email;
            localStorage.setItem("email", email);
            resolve(resp);
          })
          .catch(err => {
            commit("auth_error", err);
            localStorage.removeItem("access_token");
            reject(err);
          });
      });
    },
    refresh({ commit }, refresh_token) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios({
          url: "http://frp.oailab.cn:6101/auth/jwt/refresh/",
          data: { refresh: refresh_token },
          method: "POST"
        })
          .then(resp => {
            localStorage.setItem("access_token", resp.data.access);
            axios.defaults.headers.common["Authorization"] =
              "Bearer " + resp.data.access;
            resolve(resp);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    logout({ commit }) {
      return new Promise(resolve => {
        commit("logout");
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        delete axios.defaults.headers.common["Authorization"];
        resolve();
      });
    }
  },
  modules: {},
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status
  }
});
