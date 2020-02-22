import Vue from "vue";
import VueRouter from "vue-router";
import StudentEdit from "@/components/StudentEdit.vue";
import StudentList from "@/components/StudentList.vue";
import StudentAdd from "@/components/StudentAdd.vue";
import Login from "@/components/auth/Login.vue";
// import Home from "../views/Home.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  // mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "login",
      component: Login,
      meta: { keepAlive: false }
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
      path: "/students",
      name: "studentlist",
      component: StudentList,
      meta: { keepAlive: true }
    }
  ]
});

export default router;
