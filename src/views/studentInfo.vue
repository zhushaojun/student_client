<template>
  <div class="studentInfo">
    <h1>This is an studentInfo page</h1>
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
