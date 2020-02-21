<template>
  <div class="studentInfo">
    <v-card class="mx-auto mt-12 ml-6 mr-6" outlined style="border:0px">
      <!-- <v-btn @click="submit">提交修改</v-btn> -->
      <v-list-item three-line>
        <v-list-item-content>
          <div class="overline mb-4">
            <span class="title font-weight-light">学生个人信息</span>
          </div>
          <v-list-item-title class="mb-1 mb-4">姓名：{{ student.name }}</v-list-item-title>
          <!-- <v-text-field v-model="student.name" label="name"></v-text-field> -->
          <v-list-item-title class="mb-1 mb-4">性别：{{ student.gender }}</v-list-item-title>
          <v-list-item-title class="mb-1 mb-4">学号：{{ student.number }}</v-list-item-title>
        </v-list-item-content>
        <v-list-item-avatar tile size="80" color="grey">
          <v-img
            class="elevation-6"
            :src="student.photo"
          ></v-img>
        </v-list-item-avatar>
      </v-list-item>

      <!-- <Grades v-bind:userInfo="this.student.courses"></Grades> -->
      <v-card class="ml-3 mr-3 mb-12">
        <v-card-title>
          课程成绩
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-switch v-model="disabled" class="ma-2" label="修改"></v-switch>
        </v-card-title>
        <v-simple-table class="ml-10 mr-10">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">序号</th>
                <th class="text-left">课程</th>
                <th class="text-left">成绩</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in student.courses" :key="index">
                <td>
                  {{index+1}}
                </td>
                <td>
                  <v-text-field :disabled="!disabled" v-model="item.课程" style="width:30%" dense></v-text-field>
                </td>
                <td>
                  <v-text-field :disabled="!disabled" v-model="item.分数" style="width:30%" dense></v-text-field>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <v-btn color="primary" position: absolute right dark class="mb-2 mt-4" @click="submit">确定</v-btn>
      </v-card>
    </v-card>
  </div>
</template>
<script>
// import Grades from "../components/Grades";
export default {
  components: {
    // Grades
  },
  data: () => ({
    student: "",
    disabled: false
  }),
  methods: {
    submit() {
      this.axios
        .patch(`students/${this.$route.params.id}/`, {
          name: this.student.name,
          number: this.student.number,
          courses: this.student.courses
        })
        .then();
    }
  },
  mounted() {
    // console.log(`students/${this.$route.params.id}/`); //反引号里面是模板字符串
    this.axios
      .get(`students/${this.$route.params.id}/`)
      .then(response => {
        this.student = response.data;
        // console.log(this.student.courses);
      })
      .catch(function(error) {
        // 请求失败处理
        console.log(error);
      });
   
  },
  computed: {}
};
</script>
