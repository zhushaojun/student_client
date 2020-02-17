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
    :items="desserts"
    :search="search"
    :sort-desc="[false, true]"
    multi-sort
    class="elevation-1"
  ></v-data-table>
       </v-card>
  </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        search: '',
        headers: [
          {
            text: 'name',
            align: 'left',
            sortable: false,
            value: 'name',
          },
          { text: 'Gender', value: 'gender' },
          { text: 'student_id', value: 'student_id' },
        ],
        desserts: []
    }
  },
  created () {
    this.getData()},
    methods: {
    getData () {
      //axios从后台获取数据
       this.axios.get('http://frp.oailab.cn:6101/api/students/')
      .then(response => (this.desserts=response.data))
      .catch(function (error) { // 请求失败处理
        console.log(error);
      });
      }
    }
  };
</script>