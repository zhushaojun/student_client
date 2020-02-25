import Vue from "vue";
import VueRouter from "vue-router";
import StudentEdit from "@/components/StudentEdit.vue";
import StudentList from "@/components/StudentList.vue";
import StudentAdd from "@/components/StudentAdd.vue";
import Login from "@/components/auth/Login.vue";
import Register from "@/components/auth/Register.vue";
import Mathjax from "@/views/Mathjax.vue";
// import Home from "../views/Home.vue";
import Secure from "@/components/Secure.vue";
import store from "@/store/index";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/secure",
      name: "secure",
      component: Secure,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/math",
      name: "math",
      component: Mathjax
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: { keepAlive: false }
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
      meta: { keepAlive: true }
    },
    {
      path: "/student/:id",
      name: "studentinfo",
      component: StudentEdit,
      meta: { keepAlive: true }
    },
    {
      path: "/",
      name: "studentlist",
      component: StudentList,
      meta: { keepAlive: true }
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
