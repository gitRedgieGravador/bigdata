<template>
  <div>
    <br />
    <br />
    <v-card color="info" dark outlined width="60%">
      <hr />
      <center>
        <h1>Mostly Requested Individual level</h1>
      </center>
      <hr />
    </v-card>
    <div v-if="showChart">
      <div v-for="(item,i) in mainArr" :key="i">
        <br />
        <v-card width="60%" elevation="12">
          <Chart type="horizontalBar" :data="item.arr" :options="item.opt" />
        </v-card>
      </div>
    </div>
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
      mainArr: []
    };
  },
  mounted() {
    this.getMost();
  },
  methods: {
    getRandomColor() {
      var letters = "0123456789ABCDEF";
      var color = "#";
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    },
    getMost() {
      console.log("test on individual")
      axios
        .get("http://localhost:3232/mostly-individual")
        .then(resp => {
          resp.data.forEach(element => {
            var basicData = {
              labels: [],
              datasets: [
                {
                  label: "Number Of Request",
                  backgroundColor: "#42A5F5",
                  data: []
                }
              ]
            };
            var myOpt = {
              responsive: true,
              title: {
                display: true,
                text: "fnldsfads"
              },
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
            };
            element.data.forEach(each => {
              basicData.labels.push(each.category);
              basicData.datasets[0].data.push(each.count);
              basicData.datasets[0].backgroundColor = this.getRandomColor()
              myOpt.title.text =
                "Mostly Requested for " +
                this.monthNames[new Date(element.cutOff).getMonth()] +
                " " +
                new Date(element.cutOff).getFullYear();
            });
            var max = basicData.datasets[0].data[0];
            basicData.datasets[0].data.forEach(each => {
              if (each > max) {
                max = each;
              }
            });
            myOpt.scales.xAxes[0].ticks.max = max + 1;
            let Obj = { arr: basicData, opt: myOpt };
            this.mainArr.push(Obj);
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
