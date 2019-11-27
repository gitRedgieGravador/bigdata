<template>
  <div class="overlay">
    <div>
      <center>
        <br>
        <v-card width="90%">
          <div class="mypri">
            <h1>Student's Request Form</h1>
          </div>
          <v-card outlined class="pa-12 transparent">
            <v-form>
              <v-row>
                <v-col>
                  <v-text-field label="Firstname" outlined v-model="fname"/>
                </v-col>
                <v-col cols="6">
                  <v-text-field label="Lastname" outlined v-model="lname"/>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-overflow-btn class="my-2" :items="dropdown_batch" label="Batch" v-model="batch"/>
                </v-col>
                <v-col cols="6">
                  <v-overflow-btn class="my-2" :items="dropdown_category" label="Request Category" v-model="category"/>                </v-col>
              </v-row>
            </v-form>
          </v-card>
        </v-card>
      </center>
    </div>
  </div>
</template>
<script>
export default {
  name: "student",
  data() {
    return {
        fname: '',
        lname: '',
        batch: '',
        category: '',
      dropdown_batch: ["Batch 2020", "Batch 2021", "Batch 2022"],
      dropdown_category: ["School Supply", "Personal Request", "Maintenance"]
    };
  }
};
</script>
<style scoped>
.mypri {
  background-color: rgb(179, 0, 179);
  color: white;
}

.overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  text-align: center;
  height: 100%;
  /* background:#186fa1; */
  background-image: linear-gradient(to bottom, #000066 0%, #cc66ff 100%);
}
.transparent{
    background-color: transparent !important;
}
</style>
