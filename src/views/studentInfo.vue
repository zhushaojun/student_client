<template>
  <div class="studentInfo">
    <h1>This is an studentInfo page</h1>
    <v-btn class="btn btn-success" @click=test()>获取数据</v-btn>
    <p>{{this.infos}}</p>
  </div>
</template>
<script>

export default {
    data: () => ({
    infos:[]
  }),
   methods: {
    test() {
    this.axios.get('http://frp.oailab.cn:6101/api/students/')
      .then(response => (this.infos=response.data))
      .catch(function (error) { // 请求失败处理
        console.log(error);
      });
   }
}
};
</script>
