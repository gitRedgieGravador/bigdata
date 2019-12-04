<template>
  <v-app>
    <!-- 0, 153, 255 -->
    <v-app-bar app color="primary" dark>
      <div v-show="resized">
        <v-app-bar-nav-icon v-if="isLoggedIn && !isStudent" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      </div>
      <h1 v-show="!resized">PN Request Management System</h1>
      <h1 v-show="resized">PNRMS</h1>
      <v-spacer></v-spacer>
      <span v-if="isLoggedIn">
        <v-btn text @click="logout">
          <span class="mr-2">log out</span>
          <b>
            <v-icon>mdi-logout</v-icon>
          </b>
        </v-btn>
      </span>
      <span v-else>
        <v-btn text @click="redirect('/')">
          <b>
            <v-icon>mdi-login</v-icon>
          </b>
          <span class="mr-2">Sign In</span>
        </v-btn>
      </span>
    </v-app-bar>
    <v-content>
      <div v-if="isLoggedIn && !isStudent">
        <div v-if="resized && !isStudent">
          <v-navigation-drawer v-model="drawer" absolute left temporary>
            <Resizedbar />
          </v-navigation-drawer>
          <center>
            <div class="wt95">
              <router-view />
            </div>
          </center>
        </div>
        <div v-else>
          <v-row>
            <v-col cols="3">
              <Sidebar />
            </v-col>
            <v-col class="text-center">
              <div class="wt95">
                <center>
                  <router-view />
                </center>
              </div>
            </v-col>
          </v-row>
        </div>
      </div>

      <div v-if="!isLoggedIn">
        <center>
          <router-view />
        </center>
      </div>
      <div v-if="isStudent && isLoggedIn">
        <router-view />
      </div>

      <!-- <router-view/> -->
    </v-content>
  </v-app>
</template>

<script>
/* eslint-disable */
import Sidebar from "./components/Sidebar";
import Resizedbar from "./components/Resizedbar";
export default {
  name: "App",
  components: { Sidebar, Resizedbar },
  data() {
    return {
      drawer: false,
      resized: false
      //isStudent: false
    };
  },
  created() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
    this.routeWatcher = this.$watch(
    function () {  return this.$route },
    function(route) {
      if (route.name == 'login') {
        this.isLoggedIn = false;
        this.isStudent = false;
        this.logout();
      }
      if (route.name != "student") {
        this.isStudent = false;
      }
    })
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    },
    isStudent: function() {
      return this.$store.getters.isStudent;
    },
    permission: function() {
      return this.$store.getters.permission;
    }
  },
  watch: {
    path() {
      if (this.$route.name == "login") {
        alert("dsflkds")
        this.isLoggedIn = false;
        this.isStudent = false;
        this.logout();
      }
      if (this.$route.name != "student") {
        this.isStudent = false;
      }
    }
  },
  methods: {
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
        this.resized = true;
      } else {
        this.resized = false;
      }
    }
  }
};
</script>
<style scoped>
.wt95 {
  width: 95%;
}
</style>
