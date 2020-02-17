import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import studentInfo from "../views/studentInfo.vue";
import studentList from "../views/studentList.vue";
import studentLogin from "../views/studentLogin.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes:[
  {
    path: "/studentinfo",
    name: "studentinfo",
    component: studentInfo
  },
  {
    path: "/studentlist",
    name: "studentlist",
    component: studentList
  },
  {
    path: "/studentlogin",
    name: "studentlogin",
    component: studentLogin
  }
]
});

export default router;
