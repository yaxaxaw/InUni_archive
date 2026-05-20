import { defineStore } from "pinia";
import api from "../services/api";
import { setToken, removeToken, getToken } from "../utils/token";

export const useAuthStore = defineStore("auth", {

  state: () => ({
    user: null,
    token: getToken(),
    isAuthenticated: !!getToken(),
  }),

  actions: {

    async login(data) {

      const response = await api.post(
        "/auth/login",
        data
      );

      const token = response.data.token;

      setToken(token);

      this.token = token;
      this.isAuthenticated = true;

      await this.fetchCurrentUser();
    },

    async register(data) {

      const response = await api.post(
        "/auth/register",
        data
      );

      return response.data;
    },

    async fetchCurrentUser() {

      const response = await api.get("/users/me");

      this.user = response.data;
    },

    logout() {

      removeToken();

      this.user = null;
      this.token = null;
      this.isAuthenticated = false;
    },
  },
});
