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
  >
    <template v-slot:item.student_id="{item}">
		  	<v-btn label text @click="updateInfo(item)">{{item.student_id}}</v-btn >
	  </template>
  </v-data-table>
       </v-card>
  </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        search: '',
        testdata:"",
        headers: [
          {
            text: 'Name',
            align: 'left',
            sortable: false,
            value: 'name',
          },
          { text: 'Gender', value: 'gender' },
          { text: 'Student_Id', value: 'student_id' },
        ],
        desserts: [],
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
      },
      updateInfo(item) {
			const index = this.desserts.indexOf(item)
			this.testdata=this.desserts[index];
			this.$store.commit("updateInfo",this.testdata)
			this.$router.replace({path:'/studentinfo'})
		},
    },
   
  };
</script>