<template>
  <div class="changepassword">
    <div class="container">
      <v-card>
        <v-form refs="form">
          <v-row row style="height:80px">
            <v-col md="4" class="d-flex mt-4 ml-4">
              <div style="width:100px">
                <p class="mt-2"><span class="red--text">*</span>原密码</p>
              </div>
              <v-text-field
                v-model="current_password"
                solo
                type="password"
                :error-messages="currentpasswordErrors"
                required
                @input="$v.current_password.$touch()"
                @blur="$v.current_password.$touch()"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row row style="height:80px">
            <v-col md="4" class="d-flex mt-4 ml-4">
              <div style="width:100px">
                <p class="mt-2"><span class="red--text">*</span>新密码</p>
              </div>
              <v-text-field
                v-model="new_password"
                :error-messages="newpasswordErrors"
                required
                solo
                type="password"
                @input="$v.new_password.$touch()"
                @blur="$v.new_password.$touch()"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row row style="height:80px">
            <v-col md="4" class="d-flex mt-4 ml-4">
              <div style="width:100px">
                <p class="mt-2"><span class="red--text">*</span>重复新密码</p>
              </div>
              <v-text-field
                v-model="password_confirmation"
                :error-messages="passwordConfirmErrors"
                required
                solo
                type="password"
                @input="$v.password_confirmation.$touch()"
                @blur="$v.password_confirmation.$touch()"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row justify="end">
            <div class="col-md-2">
              <v-btn class="btn" color="success" @click="submit"
                >确认修改</v-btn
              >
            </div>
          </v-row>
          <v-snackbar
            v-model="snackbar"
            :multi-line="multiLine"
            :timeout="timeout"
            :color="changeFlag"
          >
            {{ text }}
            <v-btn text @click="initTips">
              Close
            </v-btn>
          </v-snackbar>
        </v-form>
      </v-card>
    </div>
  </div>
</template>
<script>
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";
export default {
  mixins: [validationMixin],
  validations: {
    current_password: { required, minLength: minLength(8) },
    new_password: { required, minLength: minLength(8) },
    password_confirmation: { required, minLength: minLength(8) }
  },
  data() {
    return {
      current_password: "",
      new_password: "",
      password_confirmation: "",
      multiLine: true,
      snackbar: false,
      text: "input error",
      timeout: 3000,
      changeArray: [],
      changeFlag: "error lighten-2"
    };
  },
  methods: {
    submit() {
      var _that = this;
      let data = {
        current_password: this.current_password,
        new_password: this.new_password
      };
      if (this.new_password === this.password_confirmation) {
        this.axios
          .post("http://frp.oailab.cn:6101/auth/users/set_password/", data)
          .then(res => {
            if (res.status === 204) {
              this.text = "修改成功！";
              this.changeFlag = "success lighten-2";
              this.snackbar = true;
              this.reset();
            }
            // console.log(res.status);
          })
          .catch(function(error) {
            // 请求失败处理
            // console.log(JSON.stringify(error.response.data));
            console.log(error.response.data);
            if (error.response.status == 400) {
              // eslint-disable-next-line no-prototype-builtins
              if (error.response.data.hasOwnProperty("current_password")) {
                _that.text = "原密码错误";
                _that.snackbar = true;
                // eslint-disable-next-line no-prototype-builtins
              } else if (error.response.data.hasOwnProperty("new_password")) {
                if (error.response.data.new_password.length == 1) {
                  _that.text = error.response.data.new_password[0];
                } else {
                  _that.text =
                    error.response.data.new_password[0] +
                    error.response.data.new_password[1];
                }
                _that.snackbar = true;
              }
            }
          });
      } else {
        this.text = "新密码不一致";
        this.snackbar = true;
      }
    },
    initTips() {
      this.snackbar = false;
      this.text = "error";
      this.changeFlag = "error lighten-2";
    },
    reset() {
      this.$v.$reset();
      this.current_password = "";
      this.new_password = "";
      this.password_confirmation = "";
    }
  },
  computed: {
    currentpasswordErrors() {
      const errors = [];
      if (!this.$v.current_password.$dirty) return errors;
      !this.$v.current_password.minLength && errors.push("密码至少8位字符|");
      !this.$v.current_password.required && errors.push("密码不能为空");
      return errors;
    },
    newpasswordErrors() {
      const errors = [];
      if (!this.$v.new_password.$dirty) return errors;
      !this.$v.new_password.minLength && errors.push("密码至少8位字符|");
      !this.$v.new_password.required && errors.push("密码不能为空");
      return errors;
    },
    passwordConfirmErrors() {
      const errors = [];
      if (!this.$v.password_confirmation.$dirty) return errors;
      !this.$v.password_confirmation.minLength &&
        errors.push("密码至少8位字符|");
      !this.$v.password_confirmation.required && errors.push("密码不能为空");
      return errors;
    }
  }
};
</script>
