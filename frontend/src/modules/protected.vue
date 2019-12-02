<template>
  <div>
    <center>
      <h1>Protected</h1>
      <input type="text" v-model="username">
      <v-btn @click="send">sample</v-btn>
      <div>
        <center>
          <h3>New Request</h3>
        </center>
      </div>
    </center>
  </div>
</template>
<script>
import io from "socket.io-client";
var socket = io.connect("http://localhost:3232");
export default {
  name: "protected",
  data() {
    return {
      sample: "sample",
      username:"redgie"
    };
  },
  created(){
      this.onSample()
  },
  methods: {
    send() {
      socket.emit("sample", this.username)
    },
    onSample(){
        socket.on('sample', function(data){
            alert(data)
        })
    }
  }
};
</script>
