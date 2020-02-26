"use strict";

import Vue from "vue";
import axios from "axios";
// import store from "../store";
import store from "../store/index";
// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

axios.defaults.baseURL = "http://frp.oailab.cn:6101/api";
// axios.defaults.headers.common["Authorization"] = localStorage.getItem("access_token");
axios.defaults.headers.common["Content-Type"] = "application/json";

const token = localStorage.getItem("access_token");
if (token) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
}

let config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  timeout: 60 * 1000, // Timeout
  withCredentials: true // Check cross-site Access-Control
  // headers: {"Content-Type": "application/json"}
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    const originalRequest = error.config;
    // Do something with response error
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refresh_token = localStorage.getItem("refresh_token");
      return store
        .dispatch("refresh", refresh_token)
        .then(resp => {
          originalRequest.headers.Authorization = "Bearer " + resp.data.access;
          return axios(originalRequest);
        })
        .catch(err => console.log(err));
    }
    return Promise.reject(error);
  }
);

Plugin.install = function(Vue) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    }
  });
};

Vue.use(Plugin);

export default Plugin;
