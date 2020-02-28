<template>
    <div class="changepassword">
        <div class="container">
            <v-card>
        <v-row row>
              <v-col md="4" class="d-flex mt-4 ml-4">
                <div style="width:100px">
                  <p class="mt-2"><span class="red--text">*</span>原密码</p>
                </div>
                <v-text-field v-model="current_password" solo type="password"></v-text-field>
              </v-col>
        </v-row>
        <v-row row>
              <v-col md="4" class="d-flex mt-4 ml-4">
                <div style="width:100px">
                  <p class="mt-2"><span class="red--text">*</span>新密码</p>
                </div>
                <v-text-field v-model="new_password" solo type="password"></v-text-field>
              </v-col>
        </v-row>
        <v-row row>
              <v-col md="4"  class="d-flex mt-4 ml-4" >
                <div style="width:100px">
                  <p class="mt-2"><span class="red--text">*</span>重复新密码</p>
                </div>
                <v-text-field v-model="password_confirmation" solo type="password"></v-text-field>
              </v-col>
        </v-row>
        <v-row justify="end">
          <div class="col-md-2">
            <v-btn class="btn" color="success" @click="submit">确认修改</v-btn>
          </div>
        </v-row>
        </v-card>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
    current_password: "",
    new_password:"",
    password_confirmation: ""
    };
  },
  methods: {
    submit() {
        let data={
            current_password:this.current_password,
            new_password:this.new_password
        }
      if(this.new_password === this.password_confirmation){
          this.axios
        .post("http://frp.oailab.cn:6101/auth/users/set_password/", data).then(res => console.log(res))
        .catch(function(error) {
          // 请求失败处理
          console.log(error);
        });
      }
    }
  }
};
</script>

