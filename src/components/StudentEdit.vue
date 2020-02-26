<template>
  <div class="studentInfo">
    <v-card class="mx-auto mt-12 ml-6 mr-6" outlined style="border:0px">
      <v-list-item three-line>
        <v-list-item-content>
          <div class="overline mb-4">
            <span class="title font-weight-light">学生信息</span>
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
        <!-- <v-list-item-avatar tile size="80" color="grey">
          <v-img class="elevation-6" :src="student.photo"></v-img>
        </v-list-item-avatar>-->
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
                      <tr v-for="(item,index) in student.courses.inputs" :key="index">
                        <td>{{index+1}}</td>
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
                <!-- <v-btn color="primary" position: absolute right dark class="mb-12 mt-10" @click="submit">确定</v-btn> -->
              </v-card-text>
            </v-card>
          </v-tab-item>
          <!--computes-->
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <textarea v-model="formula" cols="30" rows="10"></textarea>
                <Mathjax :formula="formula"></Mathjax>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </v-card>
    </v-card>
  </div>
</template>
<script>
// import { Mathjax } from "../views/Mathjax";
import Mathjax from "@/views/Mathjax.vue";
export default {
  components: {
    Mathjax: Mathjax
  },
  data: () => ({
    student: "",
    disabled: false,
    cards: ["access", "inputs", "computes"],
    formula: "$$x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}.$$"
  }),
  methods: {
    submit() {
      this.axios
        .patch(`students/${this.$route.params.id}/`, {
          name: this.student.name,
          number: this.student.number,
          courses: this.student.courses.inputs
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
        console.log(this.student.courses.inputs);
      })
      .catch(function(error) {
        // 请求失败处理
        console.log(error);
      });
  },
  computed: {}
};
</script>
