<template>
  <div>
    <br />
    <br />
    <br />
    <v-card color="info" dark outlined>
      <hr />
      <center>
        <h1>Mostly Requested Per Month</h1>
      </center>
      <hr />
    </v-card>
    <v-expansion-panels focusable active>
      <v-expansion-panel v-for="(item,i) in mostly" :key="i">
        <v-expansion-panel-header>
          <v-row class="text-center">
            <v-col>
              <h4>Cut-Off: {{monthNames[parseInt(item.cutOff.split(" ")[0])]}} {{item.cutOff.split(" ")[1]}}</h4>
            </v-col>
            <v-col>
              <h4>Category: {{item.category}}</h4>
            </v-col>
            <v-col>
              <h4>Number of requests: {{item.itemIds.length}}</h4>
            </v-col>
          </v-row>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <br />
          <v-expansion-panels focusable active>
            <v-expansion-panel v-for="(request,i) in item.itemIds" :key="i">
              <v-expansion-panel-header>
                <v-row class="text-center">
                  <v-col>
                    <h5>Specific: {{request.what}}</h5>
                  </v-col>
                  <v-col>
                    <h5>Date Approved: {{new Date(request.statusDate).toLocaleString()}}</h5>
                  </v-col>
                </v-row>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <p>{{request.batch}}</p>
                <p>{{request.firstname}} {{request.lastname}}</p>
                <p>{{request.why}}</p>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>
<script>
/* eslint-disable */
//import Sidebar from "../components/Sidebar";
import axios from "axios";
export default {
  name: "Mostly",
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
    this.isCutOff();
    console.log("this component 1");
  },

  methods: {
    isCutOff() {
      var date = new Date();
      var firstDayi = new Date(date.getFullYear(), date.getMonth(), 1);
      var lastDayi = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      //if (lastDayi.toDateString() == date.toDateString()) {
        let dates = { firstDay: firstDayi.toLocaleString().split(",")[0], lastDay: lastDayi.toLocaleString().split(",")[0] };
        axios.post("http://localhost:3232/cutoff").then(resp => {
          console.log("cutoff: ", resp);
        });
      //} else {
      //  console.log("not today");
      //}
    },
    redirect(fullpath) {
      this.$router.push({ path: fullpath });
    },
    addMost() {
      axios
        .post("http://localhost:3232/mostRequest")
        .then(resp => {
          console.log(resp);
          this.mostly = resp.data.dbres;
        })
        .catch(err => {
          console.log("err", err);
        });
    },
    getMost() {
      axios
        .get("http://localhost:3232/mostRequest")
        .then(resp => {
          console.log("match:", resp);
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
