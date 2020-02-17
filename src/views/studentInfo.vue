<template>
  <div class="studentInfo">
    <!-- <h1>This is an studentInfo page</h1> -->
    <!-- <v-btn class="btn btn-success" @click=test()>获取数据</v-btn>-->
    <!-- <p>{{infos}}</p> -->
    <v-card class="mx-auto mt-12 ml-6 mr-6">
      <v-list-item three-line>
        <v-list-item-content>
          <div class="overline mb-4">
            <span class="title font-weight-light">学生个人信息</span>
          </div>
          <!-- {{this.params.id}} -->
          <v-list-item-title class="mb-1 mb-4">姓名：{{infos.name}}</v-list-item-title>
          <v-list-item-title class="mb-1 mb-4">性别：{{infos.gender}}</v-list-item-title>
          <v-list-item-title class="mb-1 mb-4">学号：{{infos.student_id}}</v-list-item-title>
        </v-list-item-content>
        <v-list-item-avatar tile size="80" color="grey"></v-list-item-avatar>
      </v-list-item>
    </v-card>
  </div>
</template>
<script>
export default {
  data: () => ({
    infos: []
  }),
  methods: {
    // test() {
    //   this.axios
    //     .get("http://frp.oailab.cn:6101/api/students/")
    //     .then(response => (this.infos = response.data))
    //     .catch(function(error) {
    //       // 请求失败处理
    //       console.log(error);
    //     });
    // },
   

  },
  mounted() {
    this.axios
      .get("http://frp.oailab.cn:6101/api/students/")
      .then(response => (this.infos = response.data))
      .catch(function(error) {
        // 请求失败处理
        console.log(error);
      });
  }
};
</script>
