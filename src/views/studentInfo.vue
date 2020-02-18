<template>
  <div class="studentInfo">
    <h2>个人信息页面</h2>
  </div>
</template>
<script>
export default {
  data: () => ({}),
  methods: {
    test() {
      this.axios
        .get("http://frp.oailab.cn:6101/api/students/")
        .then(response => (this.infos = response.data))
        .catch(function(error) {
          // 请求失败处理
          console.log(error);
        });
    }
  },
  computed: {}
};
</script>
