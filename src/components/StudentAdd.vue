<template>
  <div class="studentLogin">
    <v-container>
      <v-form ref="formData" class="white">
        <v-card>
          <v-card-text class="title black--text">基本信息</v-card-text>
          <v-card-text class="body-1 pb-0 pl-3 pr-3">
            <v-row row>
              <v-col md="3" class="d-flex mt-4 ml-4">
                <div style="width:70px">
                  <p class="mt-2"><span class="red--text">*</span>姓名</p>
                </div>
                <v-text-field
                  v-model="name"
                  :error-messages="nameErrors"
                  label="请输入您的姓名"
                  required
                  solo
                  @input="$v.name.$touch()"
                  @blur="$v.name.$touch()"
                ></v-text-field>
              </v-col>
              <v-col md="3" offset-md="1" class="d-flex mt-4">
                <div style="width:50px">
                  <p class="mt-2"><span class="red--text">*</span>学号</p>
                </div>
                <v-text-field
                  v-model="number"
                  :error-messages="idErrors"
                  label="请输入您的学号"
                  required
                  solo
                  @input="$v.number.$touch()"
                  @blur="$v.number.$touch()"
                ></v-text-field>
              </v-col>
              <v-col md="3" offset-md="1" class="d-flex mt-3">
                <div style="width:70px">
                  <p class="mt-3"><span class="red--text">*</span>性别</p>
                </div>
                <v-select
                  v-model="gender"
                  :items="genders"
                  :error-messages="genderErrors"
                  label="请选择您的性别"
                  required
                  solo
                  @change="$v.gender.$touch()"
                  @blur="$v.gender.$touch()"
                ></v-select>
              </v-col>
            </v-row>
            <v-row row>
              <div class="col-md-3 offset-md-1">
                <v-avatar tile height="200px" width="200px">
                  <v-img
                    :src="imgsrc"
                    class=" "
                    height="100%"
                    width="100%"
                  ></v-img>
                </v-avatar>
              </div>
              <div class="col-md-4">
                <v-file-input
                  v-model="left_eye"
                  accept="image/*"
                  show-size
                  label="File input"
                  prepend-icon="mdi-camera"
                  required
                  :error-messages="imageErrors"
                  @change="$v.left_eye.$touch()"
                  @blur="$v.left_eye.$touch()"
                ></v-file-input>
              </div>
            </v-row>
            <v-row row>
              <v-col md="1" offset-md="9">
                <v-btn color="success lighten-1" @click="reset">重置</v-btn>
              </v-col>
              <v-col md="1">
                <v-btn color="red lighten-1" @click="submit">注册</v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-form>
      <div class="text-center">
        <v-snackbar v-model="snackbar" :timeout="timeout">
          {{ text }}
          <v-btn color="blue" text @click="done">Close</v-btn>
        </v-snackbar>
      </div>
    </v-container>
  </div>
</template>
<style></style>
<script>
import { validationMixin } from "vuelidate";
import { required, maxLength, minLength } from "vuelidate/lib/validators";
export default {
  name: "Register",
  mixins: [validationMixin],
  validations: {
    name: { required, maxLength: maxLength(10) },
    gender: { required },
    number: { required, maxLength: maxLength(10), minLength: minLength(10) },
    left_eye: { required }
  },
  data: () => ({
    snackbar: false,
    text: "恭喜你，已经注册成功！",
    timeout: 3000,
    valid: true,
    name: "",
    gender: null,
    number: "",
    genders: ["男", "女"],
    left_eye: {}
  }),
  computed: {
    imgsrc() {
      try {
        return URL.createObjectURL(this.left_eye);
      } catch (error) {
        return require("../assets/person.svg");
      }
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.maxLength && errors.push("字符不能超过10个");
      !this.$v.name.required && errors.push("名字不能为空");
      return errors;
    },
    genderErrors() {
      const errors = [];
      if (!this.$v.gender.$dirty) return errors;
      !this.$v.gender.required && errors.push("性别不能为空");
      return errors;
    },
    idErrors() {
      const errors = [];
      if (!this.$v.number.$dirty) return errors;
      !this.$v.number.required && errors.push("学号不能为空");
      !this.$v.number.maxLength && errors.push("学号不能超过10位");
      !this.$v.number.minLength && errors.push("学号少于超过10位");
      return errors;
    },
    imageErrors() {
      const errors = [];
      if (!this.$v.number.$dirty) return errors;
      !this.$v.number.required && errors.push("图片不能为空");
      return errors;
    }
  },
  methods: {
    reset() {
      this.$refs.formData.reset();
    },
    done() {
      this.snackbar = true;
      this.reset();
    },
    submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        console.log(this.left_eye);
        const form = new FormData();
        form.append("name", this.name);
        form.append("gender", this.gender);
        form.append("number", this.number);
        form.append("photo", this.left_eye);
        this.axios.post("students/", form).then(this.done());
      }
    }
  }
};
</script>
