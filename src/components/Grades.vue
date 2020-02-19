<template>
  <div>
    <v-card class="ml-3 mr-3 mb-12">
      <v-card-title>各科成绩</v-card-title>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">科目</th>
              <th class="text-left">成绩</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in desserts.courses" :key="index">
              <td>{{index}}</td>
              <td>{{item}}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Grades",
  data: () => ({
    desserts: []
  }),
  created() {
    this.getData();
  },
  methods: {
    getData() {
      //axios从后台获取数据
      this.axios
        .get("students/" + this.$route.params.id + "/")
        .then(response => {
          this.desserts = response.data;
        })
        .catch(function(error) {
          // 请求失败处理
          console.log(error);
        });
    }
  }
};
</script>
