<template>
  <div class="register">
    <v-row>
      <v-col md="6" sm="6" offset-md="2">
        <v-card-text class="test">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row>
              <v-col md="10" offset-md="1">
                <v-text-field
                  v-model="email"
                  :error-messages="emailErrors"
                  label="xxx@example.com"
                  required
                  type="email"
                  @input="$v.email.$touch()"
                  @blur="$v.email.$touch()"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col md="10" offset-md="1">
                <v-text-field
                  v-model="password"
                  :error-messages="passwordErrors"
                  label="password"
                  required
                  type="password"
                  @input="$v.password.$touch()"
                  @blur="$v.password.$touch()"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col md="10" offset-md="1">
                <v-text-field
                  v-model="password_confirmation"
                  :error-messages="passwordConfirmErrors"
                  label="password_confirm"
                  required
                  type="password"
                  @input="$v.password_confirmation.$touch()"
                  @blur="$v.password_confirmation.$touch()"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row justify="space-around">
              <v-btn color="primary" @click="reset">Reset</v-btn>
              <v-btn color="success" @click="register">Register</v-btn>
            </v-row>
          </v-form>
        </v-card-text>
        <div class="text-center">
          <v-snackbar v-model="snackbar" :timeout="timeout">
            {{ tips }}
            <v-btn color="blue" text @click="done">Close</v-btn>
          </v-snackbar>
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<style>
.test {
  border: 1px solid #eee;
  border-radius: 3px;
  box-shadow: 2px;
}
</style>
<script>
import { validationMixin } from "vuelidate";
import { required, minLength, email } from "vuelidate/lib/validators";
export default {
  name: "Register",
  mixins: [validationMixin],
  validations: {
    email: { required, email },
    password: { required, minLength: minLength(8) },
    password_confirmation: { required, minLength: minLength(8) }
  },

  data() {
    return {
      valid: true,
      snackbar: false,
      timeout: 3000,
      tips: "",
      email: "",
      password: "",
      password_confirmation: ""
    };
  },
  created() {
    let that = this;
    document.onkeypress = function(e) {
      var keycode = document.all ? event.keyCode : e.which;
      if (keycode == 13) {
        that.register();
        return false;
      }
    };
  },
  methods: {
    register() {
      let data = {
        email: this.email,
        password: this.password
      };
      if (!this.$v.$invalid) {
        console.log(data);
        if (this.password === this.password_confirmation) {
          this.$store
            .dispatch("signup", data)
            .then(res => {
              this.$router.push("/signin");
              console.log(res);
            })
            .catch(err => console.log(err));
        } else {
          this.tipsbar("两次密码不一致，请检查");
        }
      } else {
        this.tipsbar("信息不完善,请检查");
      }
    },
    reset() {
      this.$v.$reset();
      this.email = "";
      this.password_confirmation = "";
      this.password = "";
    },
    tipsbar(text) {
      this.snackbar = true;
      this.tips = text;
    },
    done() {
      this.snackbar = true;
    }
  },
  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("请输入合法邮箱");
      !this.$v.email.required && errors.push("邮箱不能为空");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.minLength && errors.push("密码至少8位字符|");
      !this.$v.password.required && errors.push("密码不能为空");
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
