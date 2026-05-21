<script setup>
import logo from '@/assets/logo.png'
</script>

<template>
  <div class="logo">
    <img
      :src="logo"
      alt="InUni Logo"
      class="logo-img"
    />
  </div>
</template>

<style scoped>
.logo {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-img {
  width: 52px;
  height: 52px;
  object-fit: contain;
}
</style>
