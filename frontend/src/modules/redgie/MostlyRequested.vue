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
        <v-expansion-panel-header>
          <v-row class="text-left">
            <v-col>
              <h4>Cut-Off: {{monthNames[new Date(item.cutOff).getMonth()]}} {{item.cutOff.split(" ")[1]}}</h4>
            </v-col>
            <v-col>
              <h4>Category:{{item.category}}</h4>
            </v-col>
            <v-col>
              <h4>Number of requests: {{item.itemIds.length}}</h4>
            </v-col>
          </v-row>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <br>
          <v-expansion-panels inset focusable>
            <RequestCard
              v-for="(request, index) in item.itemIds"
              :request="request"
              :key="index"
              @remove="removeItem(request)"
            />
          </v-expansion-panels>
          <!-- <v-expansion-panels focusable active>
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
              <v-expansion-panel-content class="text-left pl-12 pt-2">
                <p>Batch: {{request.batch}}</p>
                <p>Requested by: {{request.firstname}} {{request.lastname}}</p>
                <p>Reason: {{request.why}}</p>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>-->
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>
<script>
/* eslint-disable */
//import Sidebar from "../components/Sidebar";
import axios from "axios";
import RequestCard from "../tibs/RequestContainer.vue";
export default {
  name: "Mostly",
  components: {
    RequestCard
  },
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
    console.log("repeated 1");
    // axios.get("http://localhost:3232/stamp").then(resp=>{
    //   console.log("stamp:", resp)
    // }).catch(err=>{
    //   console.log("stamp err:", err);
    // })
  },

  methods: {
    isCutOff() {
      var date = new Date();
      var firstDayi = new Date(date.getFullYear(), date.getMonth(), 1);
      var lastDayi = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      if (lastDayi.toDateString() == date.toDateString()) {
        let dates = {
          firstDay: firstDayi.toLocaleString().split(",")[0],
          lastDay: lastDayi.toLocaleString().split(",")[0]
        };
        axios.post("http://localhost:3232/cutoff", dates).then(resp => {
          console.log("cutoff: ", resp);
        });
      }
    },
    redirect(fullpath) {
      this.$router.push({ path: fullpath });
    },
    getMost() {
      axios
        .get("http://localhost:3232/mostRequest")
        .then(resp => {
          this.mostly = resp.data.dbres.reverse();
        })
        .catch(err => {
          console.log("err", err);
        });
    }
  }
};
</script>
