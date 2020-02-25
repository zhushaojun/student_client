<template>
  <nav>
    <v-navigation-drawer app color="teal lighten-1">
      <!-- logo信息部分 -->
      <v-layout column align-center class="mb-10">
        <!-- <v-flex class="mt-7">
          <h1>学生系统</h1>
        </v-flex> -->
      </v-layout>
      <!-- logo信息部分end -->
      <v-divider></v-divider>
      <!-- 路由导航部分 -->
      <v-list nav>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          router
          :to="item.route"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app color="teal lighten-1" dark>
      <v-spacer></v-spacer>
      <!-- userinfo区域 -->
      <router-link :to="{ name: 'useredit' }">
        <v-avatar>
          <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
        </v-avatar>
      </router-link>

      <div class="ml-2 mr-10 black--text">
        <p class="mt-3 mb-0">{{ userName }}</p>
        <p>{{ userStatus }}</p>
      </div>
      <div class="div">
        <v-btn class="btn btn-info" @click="logout">退出</v-btn>
      </div>
      <!-- userinfo区域end -->
    </v-app-bar>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  data: () => ({
    userName: "yzt",
    userStatus: "未认证",
    items: [
      // { title: "学生信息", icon: "mdi-account", route: "/students/:id" },
      {
        title: "学生列表",
        icon: "mdi-dialpad",
        route: { name: "studentlist" }
      },
      { title: "学生注册", icon: "mdi-pencil", route: { name: "studentadd" } }
    ]
  }),
  methods: {
    logout() {
      this.$store
        .dispatch("logout")
        .then(() => this.$router.push("/login"))
        .catch(err => console.log(err));
    }
  }
};
</script>
