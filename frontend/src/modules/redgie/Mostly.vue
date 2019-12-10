<template>
  <div><br><br>
    <v-card color="info" dark outlined width="60%">
      <hr>
      <center>
        <h1>Mostly Requested</h1>
      </center>
      <hr>
    </v-card>
    <v-card width="60%">
      <!-- <div>
        <h1>Mostly Requested</h1>
      </div> -->
      <div v-if="showChart">
        <hr />
        <Chart type="horizontalBar" :data="basicData" />
        <hr />
      </div>
    </v-card>
  </div>
</template>
<script>
/* eslint-disable */
import axios from "axios";
import Chart from "primevue/chart";
export default {
  name: "mostly",
  components: {
    Chart
  },
  data() {
    return {
      showChart: false,
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
            label: "kani",
            backgroundColor: "#42A5F5",
            data: []
          },
          {
            label: "kani",
            backgroundColor: "#e600e6",
            data: []
          }
        ]
      }
    };
  },
  mounted() {
    this.getMost();
  },
  methods: {
    getMost() {
      axios
        .get("http://localhost:3232/mostly2")
        .then(resp => {
          //console.log("getMost: ", resp.data);
          resp.data.forEach(element => {
            this.basicData.labels.push(this.monthNames[new Date(element.cutOff).getMonth()] + " " + new Date(element.cutOff).getFullYear() )
            this.basicData.datasets[0].data.push(element.data[0].count)
            this.basicData.datasets[0].label = (element.data[0].category)
            this.basicData.datasets[1].data.push(element.data[1].count)
            this.basicData.datasets[1].label = (element.data[1].category)
            console.log("getMost: ", element);
          });
          this.showChart = true;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
