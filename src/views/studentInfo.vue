<template>
  <div class="studentInfo">
    <!-- <h2>个人信息页面</h2>
    <h2>当前状态: {{ student }}</h2>-->

    <v-card class="mx-auto mt-12 ml-6 mr-6" outlined style="border:0px">
      <v-list-item three-line>
        <v-list-item-content>
          <div class="overline mb-4">
            <span class="title font-weight-light">学生个人信息</span>
          </div>
          <v-list-item-title class="mb-1 mb-4">姓名：{{ student.name }}</v-list-item-title>
          <v-list-item-title class="mb-1 mb-4">性别：{{ student.gender }}</v-list-item-title>
          <v-list-item-title class="mb-1 mb-4">学号：{{ student.number }}</v-list-item-title>
        </v-list-item-content>
        <v-list-item-avatar tile size="80" color="grey">
          <!-- <v-img
            class="elevation-6"
            :src="student.photo"
          ></v-img>-->
        </v-list-item-avatar>
      </v-list-item>
      <Grades></Grades>
    </v-card>
  </div>
</template>
<script>
import Grades from "../components/Grades";
export default {
  components: {
    Grades
  },
  data: () => ({
    student: ""
  }),
  methods: {},
  mounted() {
    // console.log(`students/${this.$route.params.id}/`); //反引号里面是模板字符串
    this.axios
      .get(`students/${this.$route.params.id}/`)
      .then(response => {
        this.student = response.data;
      })
      .catch(function(error) {
        // 请求失败处理
        console.log(error);
      });
  },
  computed: {}
};
</script>
