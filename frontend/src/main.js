/* eslint-disable */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import Axios from 'axios'
import "primevue/resources/themes/nova-light/theme.css"      //theme
import "primevue/resources/primevue.min.css"                 //shared css
import "primeicons/primeicons.css"
  
Vue.prototype.$http = Axios;
Vue.config.productionTip = false;
const token = localStorage.getItem("token");
if (token) {
    Vue.prototype.$http.defaults.headers.common["Authorization"] = token;
}
new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount("#app");