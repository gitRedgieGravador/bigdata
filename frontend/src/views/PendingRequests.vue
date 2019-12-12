<template>
  <div>
    <br />
    <br />
    <!-- <v-card color="info" dark outlined>
      <hr />
      <center>
        <h1>Pending Requests</h1>
      </center>
      <hr />
    </v-card>
    <v-expansion-panels inset focusable> -->
      <RequestTable
        
        :request="requests"
    
        @remove="removeItem(request)"
      />
    <!-- </v-expansion-panels> -->
  </div>
</template>
<script>
import RequestTable from "../modules/tibs/RequestTable.vue";
import { getPending } from "../actions/requestAxios.js";

export default {
  components: {
    RequestTable
  },
  data() {
    return {
      sample: "sample",
      username: "redgie",
      requests: []
    };
  },
  methods: {
    removeItem(request) {
      this.requests.splice(this.requests.indexOf(request), 1);
    }
    
  },
  mounted() {
    getPending()
      .then(data => (this.requests = data.data))
      .catch(err => alert(err));
  }
};
</script>
