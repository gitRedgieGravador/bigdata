<template>
  <div id="inspire">
    <div>
      <v-spacer>
        <br />
        <br />
      </v-spacer>
      <v-dialog v-model="dialog" max-width="700px">
        <v-card>
          <v-card-title class="black--text">
            <v-avatar class="mr-3">
              <img src="@/assets/pnlogo.png" id="logo" />
            </v-avatar>
            <span class="text-center">New Request</span>
          </v-card-title>
          <v-divider color="light-blue lighten-2"></v-divider>
          <v-card-text>
            <v-container>
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Fill in the following information</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-form ref="form" v-model="valid" lazy validation>
                  <br />
                  <v-select
                    v-model="selectperGroup"
                    :items="perGroup"
                    :rules="[v => !!v || 'Category is required']"
                    label="Request Category"
                    required
                  ></v-select>
                  <br />
                  <v-select
                    v-model="selectCategory"
                    :items="category"
                    :rules="[v => !!v || 'Category is required']"
                    label="Request Category"
                    required
                  ></v-select>
                  <br />
                  <v-text-field
                    v-model="title"
                    :rules="[v => !!v || 'Title is required']"
                    prepend-icon="mdi-tag"
                    label="Request Title"
                    required
                  ></v-text-field>
                  <v-dialog
                    ref="dialog"
                    v-model="modal"
                    :return-value.sync="date"
                    persistent
                    width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="date"
                        label="Date Needed"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="date" scrollable :min="currentDate">
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
                      <v-btn text color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
                    </v-date-picker>
                  </v-dialog>
                  <br />
                  <v-textarea
                    outlined
                    v-model="description"
                    name="input-7-4"
                    label="Request Description"
                    value
                    :rules="[v => !!v || 'Description is required']"
                  ></v-textarea>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="blue darken-1" @click="reset">Cancel</v-btn>
                <v-btn color="orange" :disabled="!valid" @click="sendRequest">Submit</v-btn>
              </v-card-actions>
            </v-container>
          </v-card-text>
        </v-card>
      </v-dialog>
      <v-card class="mx-auto pro-card" max-width="800" height="180">
        <v-row>
          <v-col>
            
            <img
              class="img"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPT_NbemFlMkIwM0kw_UJEQolB-5smUbH8sln098ofAfwYOSdQ&s"
              alt
            />
            <p>{{user.username}}</p>
             <v-btn text color="success" @click="edit">Update</v-btn>
            <!-- <v-row>username</v-row> -->
          </v-col>
          <v-col class="text-left" cols="8">
            <h2>{{user.firstname}} {{user.lastname}}</h2><br>
            <p class="mail">Batch: {{user.batch}}</p>
            <i>
              <p class="mail">Email: {{user.email}}</p>
            </i>
          </v-col>
        </v-row>
      </v-card>
      <v-card class="mx-auto" max-width="800" color="info" dark>
        <hr />
        <v-row>
          <v-col class="text-center">
            <h1>Requests</h1>
          </v-col>
          <v-col>
            <v-btn text center right absolute dark class="mb-2" @click="dialog = true">
              <v-icon>mdi-plus</v-icon>New Request
            </v-btn>
          </v-col>
        </v-row>
        <hr />
      </v-card>

      <v-card class="mx-auto" max-width="800">
        <v-simple-table fixed-header height="450px">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-center">Specific</th>
                <th class="text-center">Date needed</th>
                <th class="text-center">Status</th>
                <th class="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,i) in list" :key="i">
                <td class="text-center">{{ item.what }}</td>
                <td class="text-center">{{ item.when }}</td>
                <td class="text-center">{{ item.status }}</td>
                <td class="text-center">
                  <v-icon @click="openDetails(item.why, item.category, item.dateOfSubmit, item.statusDate)">mdi-information</v-icon>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card>
    </div>
    <v-dialog v-model="dialog1" max-width="500px">
      <v-card class="pa-4">
        <v-card-title class="black--text">
          <v-list-item-avatar tile right size="62">
            <img src="@/assets/pnlogo.png" />
          </v-list-item-avatar>
          <span class="headline">Requests Details</span>
        </v-card-title>
        <v-divider color="light-blue lighten-2"></v-divider>
        <br />
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>{{dialogInfo.category}}</v-list-item-title>
            <v-divider color="gray"></v-divider>
            <v-list-item-subtitle>Category</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>{{dialogInfo.why}}</v-list-item-title>
            <v-divider color="gray"></v-divider>
            <v-list-item-subtitle>Reason</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>{{dialogInfo.dateOfSubmit}}</v-list-item-title>
            <v-divider color="gray"></v-divider>
            <v-list-item-subtitle>Date Submitted</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>{{dialogInfo.statusDate}}</v-list-item-title>
            <v-divider color="gray"></v-divider>
            <v-list-item-subtitle>Status Date</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn dark color="light-blue accent-3" @click="dialog1=false">close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
/* eslint-disable */
import axios from "axios";
export default {
  name: "studentform",
  data() {
    return {
      dialogInfo: {
        why: "",
        category: "",
        dateOfSubmit: "",
        statusDate: ""
      },
      valid: true,
      list: [],
      modal: false,
      close: false,
      dialog: false,
      dialog1: false,
      description: "",
      valid: true,
      name: "",
      nameRules: [
        v => !!v || "Firstname is required",
        v => (v && v.length <= 15) || "Name must be less than 15 characters"
      ],
      lastname: "",
      lastnameRules: [
        v => !!v || "Lastname is required",
        v => (v && v.length <= 15) || "Name must be less than 15 characters"
      ],
      email: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      batch: null,
      selectCategory: null,
      date: null,
      selectperGroup: "Personal",
      currentDate: new Date().toISOString().substr(0, 10),
      category: ["Center Supplies", "School Supplies", "Health", "Others"],
      perGroup: ["Personal", "Group"],
      title: "",
      user: {}
    };
  },
  mounted() {
    this.getUser();
  },
  methods: {
    openDetails(why, category, dateOfSubmit, statusDate){
      this.dialogInfo.why = why
      this.dialogInfo.category = category
      this.dialogInfo.dateOfSubmit = new Date(dateOfSubmit).toDateString()
      this.dialogInfo.statusDate = new Date(statusDate).toDateString()
      this.dialog1 = true
    },
    edit(){
      localStorage.setItem("username", this.user.username)
      this.$router.push({path: `/editinfo/${this.user._id}`})
    },
    reset() {
      this.dialog = false;
      this.$refs.form.reset();
    },
    getUser() {
      let usernamei = this.$route.params.username || localStorage.getItem("username")
      axios
        .post(`http://localhost:3232/getuser`, { username: usernamei })
        .then(resp => {
          let user = resp.data.user;
          this.user = user;
          this.getData(user.username);
        })
        .catch(err => {
          console.log(err);
        });
    },
    getData(username) {
      axios
        .get(`http://localhost:3232/request/${username}`)
        .then(res => {
          this.list = res.data.dbresponse;
        })
        .catch(err => console.log(err));
    },
    sendRequest() {
      var isGroupVal = false;
      if (this.selectperGroup === "Group") {
        isGroupVal = true;
      }
      let body = {
        batch: this.user.batch,
        category: this.selectCategory,
        firstname: this.user.firstname,
        lastname: this.user.lastname,
        email: this.user.email,
        what: this.title,
        when: this.date,
        why: this.description,
        status: "unread",
        statusDate: new Date(),
        dateOfSubmit: new Date(),
        username: this.user.username,
        isGroup: isGroupVal
      };
      let url = "http://localhost:3232/addRequest";
      axios
        .post(url, body)
        .then(resp => {
          this.list = [];
          this.getData(this.user.username);
          this.dialog = false;
        })
        .catch(err => {
          console.log(err);
        });
      this.$refs.form.reset();
    }
  }
};
</script>
<style scoped>
.img {
  height: 80px;
  width: 80px;
  border-radius: 50%;
}
.pro-card {
  border: solid 1px black;
}
.mail {
  font-size: 14px;
}
.pointer {
  cursor: pointer;
}
</style>