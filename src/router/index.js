import Vue from "vue";
import VueRouter from "vue-router";
import StudentEdit from "@/components/StudentEdit.vue";
import StudentList from "@/components/StudentList.vue";
import StudentAdd from "@/components/StudentAdd.vue";
import Login from "@/components/auth/Login.vue";
import Register from "@/components/auth/Register.vue";
import Mathjax from "@/views/Mathjax.vue";
import Useredit from "@/components/Useredit.vue";
// import Home from "../views/Home.vue";
import store from "@/store/index";
import * as Meta from "../plugins/configAllPage.js";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/math",
      name: "math",
      component: Mathjax
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/register",
      name: "register",
      component: Register
    },
    {
      path: "/student/add",
      name: "studentadd",
      component: StudentAdd,
      meta: Meta.pageRequired
    },
    {
      path: "/student/:id",
      name: "studentinfo",
      component: StudentEdit,
      meta: Meta.pageRequired
    },
    {
      path: "/",
      name: "studentlist",
      component: StudentList,
      meta: Meta.pageRequired
    },
    {
      path: "/user/edit",
      name: "useredit",
      component: Useredit,
      meta: Meta.pageRequired
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next();
      return;
    }
    next("/login");
  } else {
    next();
  }
});

export default router;
