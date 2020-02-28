<template>
  <div class="studentInfo">
    <v-card class="mx-auto mt-12 ml-6 mr-6" outlined style="border:0px">
      <v-list-item three-line>
        <v-list-item-content>
          <div class="overline mb-4">
            <span class="title font-weight-light">学生个人信息</span>
          </div>
          <v-list-item-title class="mb-1 mb-4"
            >姓名：{{ student.name }}</v-list-item-title
          >
          <v-list-item-title class="mb-1 mb-4"
            >性别：{{ student.gender }}</v-list-item-title
          >
          <v-list-item-title class="mb-1 mb-4"
            >学号：{{ student.number }}</v-list-item-title
          >
        </v-list-item-content>
        <v-list-item-avatar tile size="80" color="grey">
          <v-img class="elevation-6" :src="student.photo"></v-img>
        </v-list-item-avatar>
      </v-list-item>
      <v-card class="mt-2 mb-2" min-height="380">
        <v-tabs background-color="indigo" dark>
          <v-tab v-for="(card, index) in cards" :key="index">{{ card }}</v-tab>
          <!--access-->
          <v-tab-item>
            <v-card flat>
              <v-card-text dense></v-card-text>
            </v-card>
          </v-tab-item>
          <!--inputs-->
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <v-card-title>
                  课程成绩
                  <v-divider class="mx-4" inset vertical></v-divider>
                  <v-spacer></v-spacer>
                  <v-switch
                    v-model="disabled"
                    class="ma-2"
                    label="修改"
                  ></v-switch>
                </v-card-title>
                <v-simple-table class="ml-5 mr-5">
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-left">序号</th>
                        <th class="text-left">课程</th>
                        <th class="text-left">成绩</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(item, index) in student.courses.inputs"
                        :key="index"
                      >
                        <td>{{ index + 1 }}</td>
                        <td>
                          <v-text-field
                            :disabled="!disabled"
                            v-model="item.课程"
                            style="width:30%"
                            dense
                          ></v-text-field>
                        </td>
                        <td>
                          <v-text-field
                            :disabled="!disabled"
                            v-model="item.分数"
                            style="width:30%"
                            dense
                          ></v-text-field>
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-card-text>
              <v-btn
                color="primary"
                right
                dark
                class="mb-12 mt-10"
                @click="submit"
                >确定</v-btn
              >
            </v-card>
          </v-tab-item>
          <!--computes-->
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <v-card-title>
                  学分绩点
                  <v-divider class="mx-4" inset vertical></v-divider>
                  <v-spacer></v-spacer>
                </v-card-title>
                <v-simple-table class="ml-5 mr-5">
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-left">序号</th>
                        <th class="text-left">课程</th>
                        <th class="text-left">分数</th>
                        <th class="text-left">学分</th>
                        <th class="text-left">绩点</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(item, index) in student.courses.inputs"
                        :key="index"
                      >
                        <td>{{ index + 1 }}</td>
                        <td>
                          <v-text-field
                            disabled
                            v-model="item.课程"
                            style="width:30%"
                            dense
                          ></v-text-field>
                        </td>
                        <td>
                          <v-text-field
                            disabled
                            v-model="item.分数"
                            style="width:30%"
                            dense
                          ></v-text-field>
                        </td>
                        <td>
                          <v-text-field
                            disabled
                            value="1"
                            style="width:30%"
                            dense
                          ></v-text-field>
                        </td>
                        <td>
                          {{ courseGPA(item.分数) }}
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
                平均学分绩点为：
                <v-text-field
                  disabled
                  v-model="averageGPA"
                  style="width:30%"
                  dense
                ></v-text-field>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </v-card>
    </v-card>
  </div>
</template>
<script>
export default {
  components: {},
  data: () => ({
    student: "",
    disabled: false,
    cards: ["access", "inputs", "computes"]
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
    },
    courseGPA(e) {
      //每门课的绩点
      var GPA = 0;
      if (e < 60) GPA = 0;
      else if (e <= 63 && e >= 60) GPA = 1.3;
      else if (e <= 67 && e >= 64) GPA = 1.5;
      else if (e <= 71 && e >= 68) GPA = 2.0;
      else if (e <= 74 && e >= 72) GPA = 2.3;
      else if (e <= 77 && e >= 75) GPA = 2.7;
      else if (e <= 81 && e >= 78) GPA = 3.0;
      else if (e <= 84 && e >= 82) GPA = 3.3;
      else if (e <= 89 && e >= 85) GPA = 3.7;
      else GPA = 4.0;
      return GPA;
    }
  },
  mounted() {
    // console.log(`students/${this.$route.params.id}/`); //反引号里面是模板字符串
    this.axios
      .get(`students/${this.$route.params.id}/`)
      .then(response => {
        this.student = response.data;
        console.log(response.data);
        // console.log(this.student.courses.inputs.length);
      })
      .catch(function(error) {
        // 请求失败处理
        console.log(error);
      });
  },
  computed: {
    test(e) {
      return e + 3;
    },
    averageGPA() {
      //平均学分绩点
      //假设每门课学分为1
      var aGPA = 0;
      var sumGPA = 0;
      for (var i = 0; i < this.student.courses.inputs.length; i++) {
        sumGPA = aGPA + this.student.courses.inputs[i].分数;
      }
      aGPA = sumGPA / this.student.courses.inputs.length;
      return aGPA;
    }
  }
};
</script>
