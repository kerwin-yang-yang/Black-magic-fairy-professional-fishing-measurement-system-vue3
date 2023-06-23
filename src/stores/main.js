import { defineStore } from "pinia";
import axios from "axios";
import http from "@/request/http.js";

export const useMainStore = defineStore("main", {
  state: () => ({
    /* User */
    userName: null,
    userEmail: null,
    userAvatar: null,

    /* Field focus with ctrl+k (to register only once) */
    isFieldFocusRegistered: false,
    islogined: false,
    tryLoginMess: '',
    /* Sample data (commonly used) */
    clients: [],
    history: [],
  }),
  actions: {
    setUser(payload) {
      if (payload.name) {
        this.userName = payload.name;
      }
      if (payload.email) {
        this.userEmail = payload.email;
      }
      if (payload.avatar) {
        this.userAvatar = payload.avatar;
      }
    },
    async login(form) {
      await http.post('/auth/login', form)
        .then((response) => {
          this.islogined = true
          console.log(response.data)
          this.tryLoginMess = response.data.message
        })
        .catch((error) => {
          // console.log(error.response.data.message)
          this.islogined = false
          this.tryLoginMess = error.response.data.message

        })
    },
    fetch(sampleDataKey) {
      axios
        .get(`data-sources/${sampleDataKey}.json`)
        .then((r) => {
          if (r.data && r.data.data) {
            this[sampleDataKey] = r.data.data;
          }
        })
        .catch((error) => {
          alert(error.message);
        });
    },
  },
});
