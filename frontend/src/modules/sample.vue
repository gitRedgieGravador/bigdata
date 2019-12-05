<template>
  <div style="border:solid 2px black">
    <center>
      <h1>New Request</h1>
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS0PJyNGCV-JAKUUGRUGKCHXQUSi3aaviu-YmV75uMk_9h1coO&s">
      <h4>Sent by: redgie</h4>
      <h4>Needed at: fndsf</h4>
      <h4>Specific: </h4>
    </center>
  </div>
</template>
<script>
/* eslint-disable */
import io from "socket.io-client";
var socket = io.connect("http://localhost:3232");
export default {
  name: "protected",
  data() {
    return {
      sample: "yes"
    };
  },
  created() {
    this.onSample();
  },
  methods: {
    passdata(data) {
      this.sample = data;
    },
    onSample() {
      socket.on("sample", data => {
        this.passdata(data);
      });
    }
  }
};
</script>
