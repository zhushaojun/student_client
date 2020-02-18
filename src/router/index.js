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
      path: "/student/add",
      name: "studentadd",
      component: studentLogin
    },
    {
      path: "/student/:id",
      name: "studentinfo",
      component: studentInfo
    },
    {
      path: "/students",
      name: "studentlist",
      component: studentList
    }
  ]
});

export default router;
