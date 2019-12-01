<template>
  <div>
    <br>
    <br>
    <br>
    <v-card color="info" dark outlined>
      <hr>
      <center>
        <h1>Mostly Requested Per Month</h1>
      </center>
      <hr>
    </v-card>
    <v-expansion-panels focusable active>
      <v-expansion-panel v-for="(item,i) in mostly" :key="i">
        <v-expansion-panel-header>{{item.category}}</v-expansion-panel-header>
        <v-expansion-panel-content>{{item}}</v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>
<script>
/* eslint-disable */
//import Sidebar from "../components/Sidebar";
import axios from "axios";
export default {
  name: "mostlyrequested",
  data() {
    return {
      mostly: [],
      monthNames: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ]
    };
  },

  mounted() {
    this.getMost();
    //this.isCutOff();
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
    redirect(fullpath) {
      this.$router.push({ path: fullpath });
    },
    addMost() {
      axios
        .post("http://localhost:3232/mostRequest")
        .then(resp => {
          console.log(resp.data.dbres);
          //this.mostly = resp.data.dbres;
        })
        .catch(err => {
          console.log("err", err);
        });
    },
    getMost() {
      axios
        .get("http://localhost:3232/mostRequest")
        .then(resp => {
          console.log(resp.data.dbres);
          this.mostly = resp.data.dbres;
        })
        .catch(err => {
          console.log("err", err);
        });
    }
  }
};
</script>
