<template>
  <div>
    <!-- <center> -->
    <v-card outlined>
      <div class="mypri">
        <h1>A gateway for life</h1>
      </div>
      <hr />

      <div class="v-align">
        <v-row justify="space-around">
          <v-col cols="6">
            <v-card class="mt-10 mx-auto" max-width="400">
              <v-layout align-left justify-left>
                <v-flex xs12 sm8 md7 lg5>
                  <v-sheet
                    class="v-sheet--offset"
                    color="orange"
                    elevation="12"
                    justify-left
                    max-width="calc(50% - 1px)"
                  >
                    <v-icon class="pa-5" dark x-large>mdi-alert</v-icon>
                  </v-sheet>
                </v-flex>
              </v-layout>
              <v-card-text class="pt-0">
                <div class="display-1 font-weight-light mb-2">{{unread}}</div>
                <div class="subheading font-weight-light grey--text">Number of Unread Request</div>
                <v-divider class="my-2"></v-divider>
                <v-icon class="mr-2" small>mdi-clock</v-icon>
                <span class="caption grey--text font-weight-light">last updated 26 minutes ago</span>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="6">
            <v-card class="mt-10 mx-auto" max-width="400">
              <v-layout align-left justify-left>
                <v-flex xs12 sm8 md7 lg5>
                  <v-sheet
                    class="v-sheet--offset"
                    color="blue"
                    elevation="12"
                    justify-left
                    max-width="calc(50% - 1px)"
                  >
                    <v-icon class="pa-5" dark x-large>mdi-dots-horizontal</v-icon>
                  </v-sheet>
                </v-flex>
              </v-layout>
              <v-card-text class="pt-0">
                <div class="display-1 font-weight-light mb-2">{{pending}}</div>
                <div class="subheading font-weight-light grey--text">Number of Pending Request</div>
                <v-divider class="my-2"></v-divider>
                <v-icon class="mr-2" small>mdi-clock</v-icon>
                <span class="caption grey--text font-weight-light">last updated 26 minutes ago</span>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row justify="space-around">
          <v-col cols="6">
            <v-card class="mt-10 mx-auto" max-width="400">
              <v-layout align-left justify-left>
                <v-flex xs12 sm8 md7 lg5>
                  <v-sheet
                    class="v-sheet--offset"
                    color="green"
                    elevation="12"
                    justify-left
                    max-width="calc(50% - 1px)"
                  >
                    <v-icon class="pa-5" dark x-large>mdi-check</v-icon>
                  </v-sheet>
                </v-flex>
              </v-layout>
              <v-card-text class="pt-0">
                <div class="display-1 font-weight-light mb-2">{{approved}}</div>
                <div class="subheading font-weight-light grey--text">Number of Approved Request</div>
                <v-divider class="my-2"></v-divider>
                <v-icon class="mr-2" small>mdi-clock</v-icon>
                <span class="caption grey--text font-weight-light">last updated 26 minutes ago</span>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="6">
            <v-card class="mt-10 mx-auto" max-width="400">
              <v-layout align-left justify-left>
                <v-flex xs12 sm8 md7 lg5>
                  <v-sheet
                    class="v-sheet--offset"
                    color="red"
                    elevation="12"
                    justify-left
                    max-width="calc(50% - 1px)"
                  >
                    <v-icon class="pa-5" dark x-large>mdi-close</v-icon>
                  </v-sheet>
                </v-flex>
              </v-layout>
              <v-card-text class="pt-0">
                <div class="display-1 font-weight-light mb-2">{{rejected}}</div>
                <div class="subheading font-weight-light grey--text">Number of Rejected Request</div>
                <v-divider class="my-2"></v-divider>
                <v-icon class="mr-2" small>mdi-clock</v-icon>
                <span class="caption grey--text font-weight-light">last updated 26 minutes ago</span>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <br />
        <br />
      </div>
    </v-card>
    <!-- </center> -->
  </div>
</template>
<script>
/* eslint-disable */
//import Sidebar from "../components/Sidebar";
import {
  numUnread,
  numPending,
  numRejected,
  numApproved
} from "../actions/requestAxios";
import axios from "axios";
import io from "socket.io-client";
var socket = io.connect("http://localhost:3232");
export default {
  name: "educator",
  data() {
    return {
      name: "",
      ihieght: 0,
      col12: "6",
      resized: false,
      unread: 0,
      pending: 0,
      rejected: 0,
      approved: 0,
      base: "http://localhost:3232"
    };
  },
  // mounted() {
  //   this.ihieght = window.innerHeight - window.innerHeight / 10;
  // },
  mounted() {
    this.onNewRequest();
    this.ihieght = window.innerHeight - window.innerHeight / 10;
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
    numUnread()
      .then(data => {(this.unread = data.data)})
      .catch(err => console.log(err));
    numPending()
      .then(data => (this.pending = data.data))
      .catch(err => console.log(err));
    numRejected()
      .then(data => (this.rejected = data.data))
      .catch(err => console.log(err));
    numApproved()
      .then(data => (this.approved = data.data))
      .catch(err => console.log(err));
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    isCutOff() {
      var date = new Date();
      var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
      var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      if (firstDay == date) {
        console.log("todaY");
      } else {
        console.log("not today");
      }
    },
    logout: function() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/");
      });
    },
    redirect(fullpath) {
      this.$router.push({ path: fullpath });
    },
    handleResize() {
      if (window.innerWidth < 1200) {
        this.col12 = "12";
        this.resized = true;
      } else {
        this.resized = false;
        this.col12 = "6";
      }
    },
    getMost() {
      axios
        .post(`${this.base}/mostRequest`)
        .then(resp => {
          console.log("resp", resp);
        })
        .catch(err => {
          console.log("err", err);
        });
    },
    passdata(data) {
      if(data.status == "unread"){
        this.unread = data.count
      }
      if(data.status == "pending"){
        this.unread = data.count
      }
      if(data.status == "approved"){
        this.unread = data.count
      }
      if(data.status == "rejected"){
        this.unread = data.count
      }
    },
    onNewRequest() {
      socket.on("countEvent", data => {
        this.passdata(data);
      });
    }
  }
};
</script>
<style scoped>
.wt95 {
  width: 95%;
  margin-right: 5%;
}
/* .v-align {
  position: relative;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  padding-left: 5%;
  padding-right: 5%;
} */
.mypri {
  background-color: rgb(0, 153, 255);
  color: white;
}
.ml {
  margin-top: 65%;
}
#cover {
  position: relative;
  top: 45%;
  background-image: url("../assets/kani.png");
  background-size: cover;
  height: 90%;
  background-repeat: no-repeat;
}
.v-sheet--offset {
  top: -24px;
  position: relative;
}
</style>