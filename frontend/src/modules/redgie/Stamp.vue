<template>
  <div>
    <br>
    <br>
    <br>
    <v-card color="info" dark outlined width="70%">
      <hr>
      <center>
        <h1>Approval Time Stamp</h1>
      </center>
      <hr>
    </v-card>
    <v-card width="70%">
      <div v-if="showChart">
      <Chart type="horizontalBar" :data="basicData" :options="chartOptions"/>
      </div>
    </v-card>
  </div>
</template>
<script>
/* eslint-disable */
import axios from "axios";
import _ from "underscore";
import Chart from "primevue/chart";
export default {
  name: "Stamp",
  components:{
    Chart
  },
  data() {
    return {
      showChart: false,
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
      ],
      basicData: {
        labels: [],
        datasets: [
          {
            label: "Average Time Stamp Approval",
            backgroundColor: "#42A5F5",
            data: []
          }
        ]
      },
      chartOptions: {
        responsive: true
			}
    };
  },
  beforeMount() {
    axios
      .get("http://localhost:3232/stamp")
      .then(resp => {
        //console.log("resp: ",resp)
        var templist = _.groupBy(resp.data.stamp, "category");
        const entries = Object.entries(templist);
        this.stamplist = entries;
        //console.log("list: ", this.stamplist);
        entries.forEach(each=>{
          this.basicData.labels.push(each[0])
          var tempCount = 0
          each[1].forEach(count=>{
            tempCount += count.duration
          })
          this.basicData.datasets[0].data.push(tempCount)
        })
        this.showChart = true
      })
      .catch(err => {
        console.log("stamp err:", err);
      });
  }
};
</script>
