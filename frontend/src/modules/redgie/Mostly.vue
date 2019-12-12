<template>
  <div>
    <br>
    <br>
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
      </div>-->
    </v-card>

    <div v-if="showChart">
      <div v-for="(item,i) in mainArr" :key="i">
        <br>
        <v-card width="60%" elevation="12">
          <Chart type="horizontalBar" :data="item.arr" :options="item.opt"/>
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

      // basicData: {
      //   labels: [],
      //   datasets: [
      //     {
      //       label: "kani",
      //       backgroundColor: "#42A5F5",
      //       data: []
      //     }
      //   ]
      // }
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
              myOpt.title.text = "For " + element.cutOff;
            });
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
