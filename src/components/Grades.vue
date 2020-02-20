<template>
  <div>
    <v-card class="ml-3 mr-3 mb-12">
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">科目</th>
              <th class="text-left">成绩</th>
              <th class="text-left"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in userInfo" :key="index">
              <td>{{item}}</td>
              <td>{{index}}</td>
              <td>
                <v-btn color="primary" fab x-small dark>
                  <v-icon @click="editItem(item)">mdi-pencil</v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </template>
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>课程成绩</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <v-card>
                <v-card-title>
                  <span class="headline">修改课程</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.courseName" label="课程"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.courseGrade" label="成绩"></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">取消</v-btn>
                  <v-btn color="blue darken-1" text @click="save">保存</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.action="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">edit</v-icon>
        </template>
      </v-simple-table>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Grades",
  props: ["userInfo"],
  data: () => ({
    dialog: false,
    desserts: [],
    editedIndex: -1,
    editedItem: {
      courseName: "",
      courseGrade: 0
    },
    defaultItem: {
      courseName: "",
      courseGrade: 0
    }
  }),

  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.desserts = [
        {
          courseName: "Frozen Yogurt",
          courseGrade: 159
        }
      ];
      console.log(typeof this.desserts);
    },
    editItem(item) {
      this.desserts= Object.assign({}, this.userInfo);
      console.log(typeof this.userInfo);
      this.editedIndex = this.desserts.indexOf(item); //返回item在desserts中首次出现的位置
      this.editedItem = Object.assign({}, item); //item的值复制到editedItem中
      this.dialog = true;
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>
