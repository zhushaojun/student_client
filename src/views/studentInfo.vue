<template>
  <div class="studentInfo">
    <h2>当前状态: {{ student }}</h2>
  </div>
</template>
<script>
export default {
  data: () => ({
    student: ""
  }),
  methods: {},
  mounted() {
    this.axios
      .get("students/" + this.$route.params.id + "/")
      .then(response => {
        this.student = response.data;
      })
      .catch(function(error) {
        // 请求失败处理
        console.log(error);
      });
  },
  computed: {}
};
</script>
