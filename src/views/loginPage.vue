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
              <v-form>
                <v-text-field
                  label="Login"
                  name="login"
                  prepend-icon="mdi-anchor"
                  type="text"
                  v-model="username"
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
              <v-btn @click="register" color="primary">Register</v-btn>
              <v-spacer></v-spacer>
              <v-btn @click="show" color="primary">Login</v-btn>
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
      username: "",
      password: ""
    };
  },
  methods: {
    show() {
      this.axios
        .post("http://frp.oailab.cn:6101/auth/token/", {
          username: this.username,
          password: this.password
        })
        .then(response => {
          if (response.status === 200) {
            this.$router.push({ path: "/students" });
          }
        });
    },
    register() {
      console.log("11");
    }
  }
};
</script>
