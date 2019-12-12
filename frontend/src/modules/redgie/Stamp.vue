<template>
  <div>
    <br />
    <br />
    <br />
    <v-card color="info" dark outlined width="70%">
      <hr />
      <center>
        <h1>Approval Time Stamp</h1>
      </center>
      <hr />
    </v-card>
    <v-card width="70%">
      <div v-if="showChart">
        <Chart type="horizontalBar" :data="basicData" :options="chartOptions" />
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
  components: {
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
            backgroundColor: "#0099ff",
            data: []
          }
        ]
      },
      chartOptions: {
        responsive: true,
        scales: {
          xAxes: [
            {
              ticks: {
                beginAtZero: true,
                steps: 10,
                stepValue: 6,
                max: 5
              }
            }
          ]
        }
      }
    };
  },
  beforeMount() {
    axios
      .get("http://localhost:3232/stamp")
      .then(resp => {
        var templist = _.groupBy(resp.data.stamp, "category");
        const entries = Object.entries(templist);
        this.stamplist = entries;
        entries.forEach(each => {
          this.basicData.labels.push(each[0]);
          var tempCount = 0;
          var numCount = 0;
          each[1].forEach(count => {
            tempCount += count.duration;
            numCount++;
          });
          this.basicData.datasets[0].data.push(tempCount / numCount);
        });
        var max = this.basicData.datasets[0].data[0]
        this.basicData.datasets[0].data.forEach(each=>{
          if(each > max){
            max = each
          }
        })
        this.chartOptions.scales.xAxes[0].ticks.max = max + 1
        this.showChart = true;
      })
      .catch(err => {
        console.log("stamp err:", err);
      });
  }
};
</script>
