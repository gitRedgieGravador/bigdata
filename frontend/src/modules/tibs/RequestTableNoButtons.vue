<template>
  <div>
    <v-data-table :headers="headers" :items="request" class="elevation-1">
      <!-- <template v-slot:top> -->

      <!-- </template> -->
      <template v-slot:item.info="{ item }">
        <v-icon small @click="dialog= true, details(item)">mdi-information</v-icon>
        <v-dialog v-model="dialog" max-width="700px">
          <v-card class="pa-6">
            <v-card-title class="black--text">
              <v-list-item-avatar tile right size="62">
                <img src="@/assets/pnlogo.png" />
              </v-list-item-avatar>
              <span class="headline">Details</span>
            </v-card-title>
            <v-divider color="light-blue lighten-2"></v-divider>
            <!-- <v-btn dark color="light-blue accent-3" @click="dialog= false">close</v-btn> -->
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title>{{firstname + " " + lastname}}</v-list-item-title>
                <v-list-item-subtitle>Name</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title>{{email}}</v-list-item-title>
                <v-list-item-subtitle>Email Address</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider color="light-blue lighten-2"></v-divider>
            <h3 class="mt-2">About the Request</h3>
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title>{{what}}</v-list-item-title>
                <v-list-item-subtitle>What</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title>{{why}}</v-list-item-title>
                <v-list-item-subtitle>Why</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <!-- <v-divider></v-divider> -->

            <!-- <p class="font-italic body-2">Received:</p> -->
            <!-- <v-spacer></v-spacer> -->
            <!-- <v-btn dark color="light-blue accent-3" @click="dialog=false">close</v-btn> -->
          </v-card>
        </v-dialog>
      </template>
    </v-data-table>
  </div>
</template>

<script>
// import RequestCard from "../modules/tibs/RequestContainer.vue";
// import { updateRequest, updateWhy } from "@/actions/requestAxios.js";

export default {
  // name: "RequestTable",
  props: ["request"],
  data: () => ({
    openDetails: false,
    search: "",
    dialog: false,
    dialog2: false,
    firstname: "",
    lastname: "",
    email: "",
    what: "",
    why: "",
    id: "",
    reason: "",
    display: false,
    pending: false,
    rejected: false,
    // requests: [],
    headers: [
      {
        text: "Date Of Submission",
        align: "left",
        value: "dateOfSubmit"
      },
      {
        text: "Firstname",
        sortable: false,
        value: "firstname"
      },
      { text: "Lastname", value: "lastname" },
      { text: "Category", value: "category" },
      { text: "Nedeed on", value: "when" },
      { text: "Batch", value: "batch" },
      { text: "", value: "info", sortable: false }
    ]
  }),
  mounted() {
    let myroute = this.$route.name;
    if (
      myroute != "approved" &&
      myroute != "rejected" &&
      myroute != "mostly" &&
      myroute != "stamp"
    ) {
      this.display = true;
    }
    if (myroute == "pending") {
      this.pending = true;
    }
    if (myroute == "rejected") {
      this.rejected = true;
    }
  },
  methods: {
    details(item) {
      this.firstname = item.firstname;
      this.lastname = item.lastname;
      this.email = item.email;
      this.what = item.what;
      this.why = item.why;
      this.id = item._id;
    },
    
  }
};
</script>