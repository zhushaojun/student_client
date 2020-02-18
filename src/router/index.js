import Vue from "vue";
import VueRouter from "vue-router";
// import Vuelidate from "vuelidate";
import studentInfo from "../views/studentInfo.vue";
import studentList from "../views/studentList.vue";
import studentLogin from "../views/studentLogin.vue";
// import Home from "../views/Home.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/students",
      name: "studentlist",
      component: studentList
    },
    {
      path: "/students/add",
      name: "studentlogin",
      component: studentLogin
    },
    {
      path: "/students/:id",
      name: "studentinfo",
      component: studentInfo
    }
  ]
});

export default router;
