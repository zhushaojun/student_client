import Vue from "vue";
import VueRouter from "vue-router";
import StudentEdit from "@/components/StudentEdit.vue";
import StudentList from "@/components/StudentList.vue";
import StudentAdd from "@/components/StudentAdd.vue";
import Signin from "@/components/auth/Signin.vue";
import Signup from "@/components/auth/Signup.vue";
import ChangePassword from "@/components/auth/ChangePassword.vue";
import Profile from "@/components/auth/Profile.vue";
import Mathjax from "@/views/Mathjax.vue";
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
      path: "/signin",
      name: "signin",
      component: Signin
    },
    {
      path: "/signup",
      name: "signup",
      component: Signup
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
      path: "/changepassword",
      name: "changepassword",
      component: ChangePassword,
      meta: Meta.pageRequired
    },
    {
      path: "/profile",
      name: "profile",
      component: Profile,
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
    next("/signin");
  } else {
    next();
  }
});

export default router;
