<template>
  <div>
    <div class="logindiv"></div>
    <center>
      <div id="login-card">
        <v-card class="transparent" elevation="10" width="500" height="600">
          <div class="pad-top">
            <img src="@/assets/pnlogo.png" id="logo" />
            <p>Passerelles Numeriques</p>
          </div>

          <div class="custom">
            <!-- <v-col cols="12">
              <v-text-field
                :append-icon="'mdi-account'"
                label="Username"
                v-model="editUsername"
                color="black"
                required
              />
            </v-col>-->
            <v-col cols="12">
              <v-text-field
                @click:append="showOldpass = !showOldpass"
                :type="showOldpass ? 'text' : 'password'"
                :append-icon="showOldpass ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="passRules"
                label="Old Password"
                v-model="oldpassword"
                color="black"
                required
              />
            </v-col>

            <v-col cols="12">
              <v-text-field
                @click:append="showNewpass = !showNewpass"
                :type="showNewpass ? 'text' : 'password'"
                :append-icon="showNewpass ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="passRules"
                label="New Password"
                v-model="newpassword"
                color="black"
                required
              />
            </v-col>

            <v-col cols="12">
              <v-text-field
                @click:append="showConpass = !showConpass"
                :type="showConpass ? 'text' : 'password'"
                :append-icon="showConpass ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="passRules"
                label="Confirm new Password"
                v-model="confirmpassword"
                color="black"
                required
              />
            </v-col>
            <div class="transparent pl-6 pr-6">
              <v-btn
                type="submit"
                class="border"
                text
                height="50"
                @click="save()"
                :disabled="!isComplete"
              >
                <h1 class="font">Save</h1>
              </v-btn>

              <v-btn
                type="submit"
                class="border"
                text
                style="margin-left:5%"
                height="50"
                @click="cancel()"
              >
                <h1 class="font">Cancel</h1>
              </v-btn>
            </div>
          </div>
        </v-card>
      </div>
    </center>
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="290">
        <v-card class="text-center">
          <hr />
          <v-card-title>Change Password</v-card-title>
          <hr />
          <br />
          <v-card-text>
            <h2 class="myred">{{sms}}</h2>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn block outlined color="green darken-1" text @click="gotIT()">Got It</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>
<script>
/* eslint-disable */
import axios from "axios";
export default {
  name: "login",
  data() {
    return {
      showOldpass: false,
      showNewpass: false,
      showConpass: false,
      username: "",
      passRules: [
        v => !!v || "password  is required",
        v => (v && v.length >= 8) || "Name must be greater than  8 character"
      ],
      oldpassword: "",
      newpassword: "",
      confirmpassword: "",
      dialog: false,
      sms: "",
      alert: false
    };
  },
  methods: {
    gotIT() {
      this.dialog = false;
      this.$router.push({
        path: `/student/${localStorage.getItem("username")}`
      });
    },
    cancel() {
        this.$router.push({
        path: `/student/${localStorage.getItem("username")}`
      });
    },
    save() {
      let userId = this.$route.params.passid;
      // if (this.newpassword.length >= 8 && this.confirmpassword >= 8) {
      let new_data = {
        oldpassword: this.oldpassword,
        newpassword: this.newpassword,
        confirmpassword: this.confirmpassword
      };
      let url = "http://localhost:3232/changepass/" + this.$route.params.passid;
      axios.put(url, new_data).then(resp => {
        console.log("dbres status: ", resp.data.status);
        if (resp.data.status == false) {
          //   alert("invalid password");
          this.oldpassword = "";
          this.newpassword = "";
          this.confirmpassword = "";
          this.changed = true;
          this.sms = resp.data.sms;
          this.dialog = true;
          
        } else {
          this.oldpassword = "";
          this.newpassword = "";
          this.confirmpassword = "";
          this.sms = resp.data.sms;
          this.dialog = true;
        }
      });
    }
  },
  computed: {
    isComplete() {
      return this.oldpassword && this.newpassword && this.confirmpassword;
    }
  }
};
</script>

<style scoped>
.custom {
  margin-top: 10px;
  margin-left: 5%;
  margin-right: 5%;
}
.logindiv {
  position: fixed;
  width: 100%;
  height: 100%;
  text-align: center;
  height: 100%;
  background-size: cover;
  opacity: 0.8;
}
#login-card {
  position: relative;
  margin-top: -22%;
  left: -50%;
  transform: translate(50%, 50%);
}
.transparent {
  background-color: transparent !important;
  border-color: transparent !important;
}
.font {
  text-align: center;
  font-family: fantasy;
  font-size: 20px;
  color: skyblue;
  -webkit-text-stroke-width: 2px;
  -webkit-text-stroke-color: white;
  letter-spacing: 10px;
}
.border {
  border: solid 1px black;
}
#logo {
  height: 70px;
  width: 70px;
  border-radius: 50%;
  border: solid 1px black;
}
.pad-top {
  position: relative;
  padding-top: 5%;
}
.myred {
  color: red;
}
</style>