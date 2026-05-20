<template>
  <nav class="navbar">

    <div class="navbar-left">
      <router-link to="/" class="logo">
        InUni
      </router-link>
    </div>.LA

    <div class="navbar-center">

      <router-link to="/" class="nav-link">
        Home
      </router-link>

      <router-link to="/teams" class="nav-link">
        Teams
      </router-link>

      <router-link
        v-if="isAuthenticated"
        to="/profile"
        class="nav-link"
      >
        Profile
      </router-link>

    </div>

    <div class="navbar-right">

      <router-link
        v-if="!isAuthenticated"
        to="/login"
        class="login-btn"
      >
        Login
      </router-link>

      <router-link
        v-if="!isAuthenticated"
        to="/register"
        class="register-btn"
      >
        Register
      </router-link>

      <button
        v-if="isAuthenticated"
        @click="logout"
        class="logout-btn"
      >
        Logout
      </button>

    </div>

  </nav>
</template>

<script setup>

import { computed } from "vue";
import { useRouter } from "vue-router";

import { useAuthStore } from "../stores/auth";

const authStore = useAuthStore();

const router = useRouter();

const isAuthenticated = computed(
  () => authStore.isAuthenticated
);

function logout() {

  authStore.logout();

  router.push("/login");
}

</script>

<style scoped>

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 20px 40px;

  background: #111827;
}

.logo {
  color: white;
  font-size: 24px;
  font-weight: bold;

  text-decoration: none;
}

.navbar-center {
  display: flex;
  gap: 20px;
}

.nav-link {
  color: white;
  text-decoration: none;
}

.navbar-right {
  display: flex;
  gap: 15px;
}

.login-btn,
.register-btn,
.logout-btn {

  padding: 10px 18px;

  border: none;
  border-radius: 10px;

  cursor: pointer;

  text-decoration: none;

  color: white;

  background: #2563eb;
}

.logout-btn {
  background: #dc2626;
}

</style>
