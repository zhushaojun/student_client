<template>
  <div class="useredit">
    <v-container>
      <v-form ref="formData" class="white">
        <v-card>
          <v-card-text class="title black--text">个人信息</v-card-text>
          <v-card-text class="body-1 pb-0 pl-3 pr-3 mb-4">
            <v-row row>
              <v-col md="3" class="d-flex mt-4 ml-4">
                <div style="width:70px">
                  <p class="mt-2"><span class="red--text">*</span>邮箱</p>
                </div>
                <v-text-field
                  :readonly="changeFlag"
                  v-model="email"
                  solo
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
        <v-btn class="btn" color="info" @click="test">修改</v-btn>
        <v-btn class="btn" color="success" @click="submit">提交</v-btn>
      </v-form>
    </v-container>
  </div>
</template>
<script>
export default {
  data: () => ({
    email: "xxxx@email.com",
    changeFlag: true
  }),
  mounted() {
    this.getUserData();
  },
  methods: {
    test() {
      this.changeFlag = false;
    },
    submit() {
      this.axios
        .put("http://frp.oailab.cn:6101/auth/users/me/", {
          email: this.eamil
        })
        .then(res => {
          console.log(res);
        })
        .catch(function(error) {
          // 请求失败处理
          console.log(error);
        });
    },
    getUserData() {
      this.axios.get("http://frp.oailab.cn:6101/auth/users/me/").then(res => {
        this.email = res.data.email;
        // console.log(res);
      });
    }
  }
};
</script>
