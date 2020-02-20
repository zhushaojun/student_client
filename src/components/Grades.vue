<template>
  <div>
    <v-card class="ml-3 mr-3 mb-12">
      <v-card-title>
        课程成绩
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-switch v-model="disabled" class="ma-2" label="修改"></v-switch>
      </v-card-title>
      <v-simple-table class="ml-10 mr-10">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">课程</th>
              <th class="text-left">成绩</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in userInfo" :key="index">
              <td>
                <v-text-field :disabled="!disabled" :value="index" style="width:30%" dense></v-text-field>
              </td>
              <td>
                <v-text-field :disabled="!disabled" :value="item" style="width:30%"></v-text-field>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <v-btn color="primary" position: absolute right dark class="mb-2 mt-4" @click="submit">确定</v-btn>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Grades",
  props: ["userInfo"],
  data: () => ({
    disabled: false
  }),
  methods: {
    // submit() {
    //   this.axios
    //     .patch(`students/${this.$route.params.id}/`, {
    //       index: this.userInfo.index,
    //       item:this.userInfo.item
    //     })
    //     .then();
    // }
  }
};
</script>
