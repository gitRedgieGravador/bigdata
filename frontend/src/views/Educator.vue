<template>
  <div>
    <center>
      <v-card :height="ihieght" outlined>
        <div class="mypri">
          <h1>Dashboard</h1>
        </div>
        <hr />
        <div v-if="resized" class="ml"></div>
        <div class="v-align">
          <v-row>
            <v-col>
              <v-card outlined>
                <div class="mypri">
                  <h3>Request</h3>
                </div>
                <hr />fbasdjfbasdkfbasdkfbksdafbkasdf
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
              </v-card>
            </v-col>
            <v-col>
              <v-card outlined>
                <div class="mypri">
                  <h3>Pending</h3>
                </div>
                <hr />fbasdjfbasdkfbasdkfbksdafbkasdf
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-card outlined>
                <div class="mypri">
                  <h3>Approved Request</h3>
                </div>
                <hr />fbasdjfbasdkfbasdkfbksdafbkasdf
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
              </v-card>
            </v-col>
            <v-col>
              <v-card outlined>
                <div class="mypri">
                  <h3>Request</h3>
                </div>
                <hr />fbasdjfbasdkfbasdkfbksdafbkasdf
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
              </v-card>
            </v-col>
          </v-row>
        </div>
      </v-card>
    </center>
  </div>
</template>
<script>
/* eslint-disable */
//import Sidebar from "../components/Sidebar";
import axios from 'axios';
import { log } from 'util';
export default {
  name: "educator",
  data() {
    return {
      name: "",
      ihieght: 0,
      col12: "6",
      resized: false
    };
  },
  // mounted() {
  //   this.ihieght = window.innerHeight - window.innerHeight / 10;
  // },
  mounted() {
    this.getMost()
    this.ihieght = window.innerHeight - window.innerHeight / 10;
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
    //most frequent
    this.isCutOff();
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },

  methods: {
    isCutOff() {
      var date = new Date()
      var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
      var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      if(lastDay == date){
        console.log("todaY")
      }else{
        console.log("not today")
      }
    },
    logout: function() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/");
      });
    },
    redirect(fullpath) {
      this.$router.push({ path: fullpath });
    },
    handleResize() {
      if (window.innerWidth < 1200) {
        this.col12 = "12";
        this.resized = true;
      } else {
        this.resized = false;
        this.col12 = "6";
      }
    },
    getMost(){
      axios.post('http://localhost:3232/mostRequest').then(resp=>{
        console.log("resp",resp)
      }).catch(err=>{
        console.log("err",err);
        
      })
    }
  }
};
</script>
<style scoped>
.wt95 {
  width: 95%;
  margin-right: 5%;
}
.v-align {
  position: relative;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  padding-left: 5%;
  padding-right: 5%;
}
.mypri {
  background-color: rgb(0, 153, 255);
  color: white;
}
.ml {
  margin-top: 65%;
}
</style>