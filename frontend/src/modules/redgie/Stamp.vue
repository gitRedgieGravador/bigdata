<template>
  <div>
    <br>
    <br>
    <br>
    <v-card color="info" dark outlined>
      <hr>
      <center>
        <h1>Approval Time Stamp</h1>
      </center>
      <hr>
    </v-card>
    <v-card v-for="(stamp, j) in stamplist" :key="j">
      <v-expansion-panels focusable>
        <v-expansion-panel>
          <v-expansion-panel-header>
            <h4>{{stamp[1][0].duration}} days of Approval</h4>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <br>
            <v-expansion-panels inset focusable>
              <RequestCard
                v-for="(request, index) in stamp[1]"
                :request="request"
                :key="index"
                @remove="removeItem(request)"
              />
            </v-expansion-panels>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>
  </div>
</template>
<script>
/* eslint-disable */
import axios from "axios";
import _ from "underscore";
import RequestCard from "../tibs/RequestContainer.vue";
export default {
  name: "Stamp",
  components:{
    RequestCard
  },
  data() {
    return {
      stamplist: [],
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
  beforeMount() {
    axios
      .get("http://localhost:3232/stamp")
      .then(resp => {
        var templist = _.groupBy(resp.data.stamp, "duration");
        const entries = Object.entries(templist);
        this.stamplist = entries;
        console.log("list: ", this.stamplist);
      })
      .catch(err => {
        console.log("stamp err:", err);
      });
  }
};
</script>
