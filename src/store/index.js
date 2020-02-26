import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: "",
    token: localStorage.getItem("token") || "",
    username: ""
  },
  mutations: {
    auth_request(state) {
      state.status = "loading";
    },
    auth_success(state, token, username) {
      state.status = "success";
      state.token = token;
      state.username = username;
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
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios({
          url: "http://frp.oailab.cn:6101/auth/jwt/create/",
          data: user,
          method: "POST"
        })
          .then(resp => {
            const token = resp.data.access;
            const refresh_token = resp.data.refresh;
            const username = user.username;
            localStorage.setItem("username", username);
            localStorage.setItem("token", token);
            localStorage.setItem("refresh_token", refresh_token);
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
            commit("auth_success", token, username);
            resolve(resp);
          })
          .catch(err => {
            commit("auth_error");
            localStorage.removeItem("token");
            reject(err);
          });
      });
    },
    register({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios({
          url: "http://frp.oailab.cn:6101/auth/users/",
          data: user,
          method: "POST"
        })
          .then(resp => {
            //TODO
            // const email = resp.data.email;
            // const id = resp.data.id;
            const username = resp.data.username;

            localStorage.setItem("username", username);
            this.$router.push("/login");
            // axios.defaults.headers.common["Authorization"] = token;
            // commit("auth_success", token, user);
            resolve(resp);
          })
          .catch(err => {
            commit("auth_error", err);
            localStorage.removeItem("token");
            reject(err);
          });
      });
    },
    refresh({ commit }, refresh_token) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios({
          url: "http://frp.oailab.cn:6101/auth/jwt/refresh/",
          data: refresh_token,
          method: "POST"
        })
          .then(resp => {
            // console.log(resp.data.access);
            localStorage.setItem("token", resp.data.access);
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
        localStorage.removeItem("token");
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