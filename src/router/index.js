import Vue from "vue";
import VueRouter from "vue-router";
import studentInfo from "../views/studentInfo.vue";
import studentList from "../views/studentList.vue";
import studentLogin from "../views/studentLogin.vue";
import loginPage from "../views/loginPage.vue";
// import Home from "../views/Home.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "login",
      component: loginPage,
      meta: { keepAlive: false }
    },
    {
      path: "/student/add",
      name: "studentadd",
      component: studentLogin,
      meta: { keepAlive: true }
    },
    {
      path: "/student/:id",
      name: "studentinfo",
      component: studentInfo,
      meta: { keepAlive: true }
    },
    {
      path: "/students",
      name: "studentlist",
      component: studentList,
      meta: { keepAlive: true }
    }
  ]
});

export default router;
