<template>
  <div id="inspire">
    <div>
      <v-spacer>
        <br />
        <br />
      </v-spacer>
      <v-dialog v-model="dialog" max-width="700px">
        <template v-slot:activator="{ on }">
          <!-- <v-btn color="blue darken-1" center right absolute dark class="mb-2" v-on="on">
            <v-icon>mdi-plus</v-icon>New Request
          </v-btn>-->
        </template>
        <v-card>
          <v-card-title class="black--text">
             <v-avatar class="mr-3">
                <img src="@/assets/pnlogo.png" id="logo">
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
                  <!-- <v-select
                    v-model="selectBatch"
                    :items="batch"
                    :rules="[v => !!v || 'Batch is required']"
                    label="Batch"
                    required
                  ></v-select>-->
                  <v-text-field
                    v-model="name"
                    prepend-icon="mdi-account"
                    :counter="15"
                    :rules="nameRules"
                    label="Firstname"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="lastname"
                    prepend-icon="mdi-account"
                    :counter="15"
                    :rules="lastnameRules"
                    label="Lastname"
                    required
                  ></v-text-field>

                  <v-text-field
                    v-model="email"
                    prepend-icon="mdi-email"
                    :rules="emailRules"
                    label="E-mail"
                    required
                  ></v-text-field>
                  <br />
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
          <!-- <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" text :disabled="!valid" @click="formAction()">Save</v-btn>
          </v-card-actions>-->
        </v-card>
      </v-dialog>

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
        <v-expansion-panels focusable>
          <v-expansion-panel v-for="(item,i) in list" :key="i">
            <v-expansion-panel-header>
              <v-row>
                <v-col>
                  <h4>Title: {{item.what}}</h4>
                </v-col>
                <v-col>
                  <h4>Needed: {{item.when}}</h4>
                </v-col>
              </v-row>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              Reason: {{item.why}}
              <br />
              <br />Status:
              <!-- <div class="red lighten-1 text-center">
                <span class="white--text">{{item.status}}</span>
              </div>-->
              <div v-if="item.status == 'unread'">
                <v-card outlined color="green" class="text-center">
                  <span class="white--text">{{item.status}}</span>
                </v-card>
              </div>
              <div v-if="item.status == 'pending'">
                <v-card outlined color="orange" class="text-center">
                  <span class="white--text">{{item.status}}</span>
                </v-card>
              </div>
              <div v-if="item.status == 'rejected'">
                <v-card outlined color="error" class="text-center">
                  <span class="white--text">{{item.status}}</span>
                </v-card>
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import axios from "axios";
export default {
  name: "studentform",
  data() {
    return {
    valid: true,
      list: [],
      modal: false,
      close: false,
      // disable: false,
      dialog: false,
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
      currentDate: new Date().toISOString().substr(0, 10),
      category: [
        "Personal",
        "Whole Batch",
        "Center Supplies",
        "School Supplies"
      ],
      title: ""
    };
  },
  mounted() {
    this.getData();
    console.log("student form");
    // this.batch = this.$route.params.batchnum;
    // console.log("params:", this.batch);
    // axios
    //   .get("http://localhost:3232/getAllRequest")
    //   .then(res => {
    //     //this.list = res.data.data;
    //     res.data.data.forEach(element => {
    //       if (element.batch == this.batch) {
    //         console.log(element)
    //         this.list.push(element);
    //       }
    //     });
    //   })
    //   .catch(err => console.log(err));
  },
  methods: {
    reset () {
      this.dialog = false;
        this.$refs.form.reset();
      },
    getData() {
      this.batch = this.$route.params.batchnum;
      console.log("params:", this.batch);
      axios
        .get("http://localhost:3232/getAllRequest")
        .then(res => {
          //this.list = res.data.data;
          console.log(res.data);
          res.data.data.forEach(element => {
            if (element.batch == this.batch) {
              //console.log(element);
              this.list.push(element);
            }
          });
        })
        .catch(err => console.log(err));
    },
    sendRequest() {
      let body = {
        batch: this.batch,
        category: this.selectCategory,
        firstname: this.name,
        lastname: this.lastname,
        email: this.email,
        what: this.title,
        when: this.date,
        why: this.description,
        status: "unread",
        statusDate: new Date(),
        dateOfSubmit: new Date()
      };
      let url = "http://localhost:3232/addRequest";
      axios
        .post(url, body)
        .then(resp => {
          this.list = [];
          this.getData();
          this.dialog = false;
        })
        .catch(err => {
          console.log(err);
        });
        this.$refs.form.reset();
      //console.log(body);
    }
  }
};
</script>