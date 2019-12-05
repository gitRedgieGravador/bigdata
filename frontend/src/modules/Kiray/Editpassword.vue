<template>
  <div>
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Edit Password for batch {{currentBatch}}</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    @click:append="showOldpass = !showOldpass"
                    :type="showOldpass ? 'text' : 'password'"
                    :append-icon="showOldpass ? 'mdi-eye' : 'mdi-eye-off'"
                    outlined
                    :rules="[rules.required, rules.min]"
                    label="Old Password"
                    v-model="oldpassword"
                    color="black"
                  />
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    @click:append="showNewpass = !showNewpass"
                    :type="showNewpass ? 'text' : 'password'"
                    :append-icon="showNewpass ? 'mdi-eye' : 'mdi-eye-off'"
                    outlined
                    :rules="[rules.required, rules.min]"
                    label="New Password"
                    v-model="newpassword"
                    color="black"
                  />
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    @click:append="showConpass = !showConpass"
                    :type="showConpass ? 'text' : 'password'"
                    :append-icon="showConpass ? 'mdi-eye' : 'mdi-eye-off'"
                    outlined
                    :rules="[rules.required, rules.min]"
                    label="Confirm new Password"
                    v-model="confirmpassword"
                    color="black"
                  />
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
            <v-btn color="blue darken-1" text @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <br>
    <br>
    <v-card color="info" dark outlined width="70%">
      <hr>
      <center>
        <h1>Password Management</h1>
      </center>
      <hr>
    </v-card>
    <v-card fluid width="70%" >
      <v-row>
        <v-col>
          <v-btn color="primary" x-large dark @click="goto('2020')">Batch 2020</v-btn>
        </v-col>
        <v-col>
          <v-btn color="primary" x-large dark @click="goto('2021')">Batch 2021</v-btn>
        </v-col>
        <v-col>
          <v-btn color="primary" x-large dark @click="goto('2022')">Batch 2022</v-btn>
        </v-col>
      </v-row>
      <v-card width="90%">
        <v-btn block color="primary" x-large dark @click="goto('educator')">PN Educator</v-btn>
      </v-card>
      <br>
    </v-card>

    <v-layout row justify-center>
      <v-dialog v-model="alert" max-width="300">
        <v-card>
          <v-card-title class="headline">Change Password Alert</v-card-title>
          <v-card-text>{{sms}}</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn v-if="changed" color="green darken-1" flat="flat" @click="gotIT">Got it</v-btn>
            <v-btn v-else color="green darken-1" flat="flat" @click="alert = false">Got it</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>
<script>
import axios from "axios";
/* eslint-disable */
export default {
  data: () => ({
    dialog: false,
    changed: false,
    showOldpass: false,
    showNewpass: false,
    showConpass: false,
    oldpassword: "",
    newpassword: "",
    confirmpassword: "",
    dbpassword: null,
    sms: "",
    currentBatch: null,
    alert: false,
    rules: {
      required: value => !!value || "Required.",
      min: v => v.length >= 8 || "Min 8 characters"
    }
  }),
  updated() {
    if (this.dialog == false) {
      this.oldpassword = "";
      this.newpassword = "";
      this.confirmpassword = "";
    }
  },
  methods: {
    gotIT() {
      this.alert = false;
      this.dialog = false;
    },
    goto(batch) {
      this.currentBatch = batch;
      this.batchId = batch;
      this.dialog = true;
    },
    save() {
      if (this.newpassword.length >= 8 && this.confirmpassword >= 8) {
        let new_data = {
          oldpassword: this.oldpassword,
          newpassword: this.newpassword,
          confirmpassword: this.confirmpassword
        };
        let url = "http://localhost:3232/changepass/" + this.batchId;
        axios.put(url, new_data).then(resp => {
          console.log("dbres status: ", resp.data.status);
          if (resp.data.status) {
            this.oldpassword = "";
            this.newpassword = "";
            this.confirmpassword = "";
            this.changed = true;
            this.sms = resp.data.sms;
            this.alert = true;
          } else {
            this.oldpassword = "";
            this.newpassword = "";
            this.confirmpassword = "";
            this.sms = resp.data.sms;
            this.alert = true;
          }
        });
      } else {
        this.sms = "New and Comfirm password must be at least 8 characters";
        this.alert = true;
      }
    }
  }
};
</script>