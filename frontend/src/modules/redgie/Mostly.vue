<template>
  <div>
    <v-card>
      <div>
        <h1>Mostly Requested</h1>
      </div>
      <div v-if="showChart">
        <div v-for="(set, i) in mainArr" :key="i">
          <br>
          <hr>
            <Chart type="bar" :data="set"/>
            <hr>
          <br>
        </div>
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
      mainArr: [],
      basicData: {
        labels: [],
        datasets: [
          {
            label: "kani",
            backgroundColor: "#42A5F5",
            data: []
          }
        ]
      },
      defaultData: {
        labels: [],
        datasets: [
          {
            label: "kani",
            backgroundColor: "#42A5F5",
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
          console.log("getMost: ", resp.data);
          resp.data.forEach(element => {
            //this.basicData.labels.push(element.cutOff);
            element.data.forEach(cat => {
              this.basicData.labels.push(cat.category);
              this.basicData.datasets[0].label = new Date(
                element.cutOff
              ).toDateString();
              console.log("label: ", this.basicData.datasets[0].label)
              this.basicData.datasets[0].data.push(cat.count);
            });
            this.mainArr.push(this.basicData);
            this.basicData = this.defaultData;
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
