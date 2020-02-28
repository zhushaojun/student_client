<template>
  <div class="login">
    <v-container>
      <v-row class="mt-12">
        <v-col cols="12" sm="8" md="5" offset-md="2">
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Login form</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <v-form @keydown.enter="test">
                <v-text-field
                  label="email"
                  name="email"
                  prepend-icon="mdi-email"
                  type="text"
                  v-model="email"
                >
                </v-text-field>
                <v-text-field
                  id="password"
                  label="Password"
                  name="password"
                  prepend-icon="mdi-lock"
                  type="password"
                  v-model="password"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-row justify="space-around">
                <v-btn @click="register" color="primary">Register</v-btn>
                <v-btn @click="login" color="primary">
                  Login
                </v-btn>
              </v-row>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  created() {
    let that = this;
    document.onkeypress = function(e) {
      var keycode = document.all ? event.keyCode : e.which;
      if (keycode == 13) {
        that.login(); // 登录方法名
        return false;
      }
    };
  },
  methods: {
    login() {
      let email = this.email;
      let password = this.password;
      this.$store
        .dispatch("signin", { email, password })
        .then(() => this.$router.push("/"))
        .catch(err => console.log(err));
    },
    register() {
      this.$router.push("/signup");
    }
  }
};
</script>
