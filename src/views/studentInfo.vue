<template>
  <div class="studentInfo">
    <h2>当前状态: {{student_id}}</h2>
  </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
    data: () => ({
  }),
   methods: {
    test() {
    this.axios.get('http://frp.oailab.cn:6101/api/students/')
      .then(response => (this.infos=response.data))
      .catch(function (error) { // 请求失败处理
        console.log(error);
      });
   }
  },
  computed: {
		...mapState(["student_id"])
	},
};
</script>
