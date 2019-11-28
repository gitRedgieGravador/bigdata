import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        status: "",
        permission: 0,
        token: localStorage.getItem("token") || null,
        user: {},
        isStudent: null
    },
    mutations: {
        auth_request(state) {
            state.status = "loading";
        },
        auth_success(state, token, user, getUser, isStudent) {
            state.status = "success";
            state.token = token;
            state.user = user;
            state.permission = getUser;
            state.isStudent = isStudent
        },
        auth_error(state) {
            state.status = "error";
        },
        logout(state) {
            state.status = null;
            state.token = null;
        }
    },
    actions: {
        login({
            commit
        }, user) {
            return new Promise((resolve, reject) => {
                commit("auth_request");
                axios({
                        url: "http://localhost:3232/login",
                        data: user,
                        method: "POST"
                    })
                    .then(resp => {
                        const token = resp.data.token;
                        const user = resp.data.user;
                        localStorage.setItem("token", token);
                        // Add the following line:
                        let getUser = 0;
                        let isStudent = true;
                        if (user.isEducator) {
                            getUser = 1
                            isStudent = false
                        }
                        axios.defaults.headers.common["Authorization"] = token;
                        commit("auth_success", token, user, getUser, isStudent);
                        resolve(resp);
                    })
                    .catch(err => {
                        commit("auth_error");
                        localStorage.removeItem("token");
                        reject(err);
                    });
            });
        },
        register({
            commit
        }, user) {
            return new Promise((resolve, reject) => {
                commit("auth_request");
                axios({
                        url: "http://localhost:3232/register",
                        data: user,
                        method: "POST"
                    })
                    .then(resp => {
                        const token = resp.data.token;
                        const user = resp.data.user;
                        localStorage.setItem("token", token);
                        // Add the following line:
                        let getUser = 0;
                        if (user.type == 'educator') {
                            getUser = 1
                        }
                        axios.defaults.headers.common["Authorization"] = token;
                        commit("auth_success", token, user, getUser);
                        resolve(resp);
                    })
                    .catch(err => {
                        commit("auth_error", err);
                        localStorage.removeItem("token");
                        reject(err);
                    });
            });
        },
        logout({
            commit
        }) {
            return new Promise((resolve) => {
                commit("logout");
                localStorage.removeItem("token");
                delete axios.defaults.headers.common["Authorization"];
                resolve();
            });
        }
    },
    getters: {
        isLoggedIn: state => !!state.token,
        authStatus: state => state.status,
        isStudent: state => state.isStudent,
        permissionCode: state => state.permission,
    },
    modules: {}
});