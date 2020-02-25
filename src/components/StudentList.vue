<template>
  <div class="studentList">
    <div class="container">
      <v-card>
        <v-card-title>
          学生信息列表
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="students"
          :search="search"
          :sort-desc="[false, true]"
          multi-sort
          class="elevation-1"
          :loading="this.loadFlag"
          loading-text="数据加载中... 请稍候"
        >
          <template v-slot:item.number="{ item }">
            <router-link :to="{ name: 'studentinfo', params: { id: item.id } }">
              {{ item.number }}
            </router-link>
          </template>
        </v-data-table>
      </v-card>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      search: "",
      headers: [
        { text: "序号", value: "id" },
        {
          text: "姓名",
          align: "left",
          sortable: false,
          value: "name"
        },
        { text: "性别", value: "gender" },
        { text: "学号", value: "number" }
      ],
      students: []
    };
  },
  computed: {
    loadFlag: function() {
      if (this.students.length > 0) return false;
      else return true;
    }
  },
  mounted() {
    this.getData();
  },
  watch: {},
  methods: {
    getData() {
      //axios从后台获取数据
      // let offset = this.itemsPerPage * (this.page - 1);
      this.axios
        // .get(`students/?limit=${this.itemsPerPage}&offset=${offset}`)
        .get(`students/?limit=10000&offset=0`)
        .then(response => {
          this.students = response.data.results;
        })
        .catch(function(error) {
          // 请求失败处理
          console.log(error);
        });
    }
  }
};
</script>
