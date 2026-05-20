<template>

  <div class="auth-layout">

    <div class="background"></div>

    <div class="content">
      <slot />
    </div>

  </div>

</template>

<style scoped>

.auth-layout {

  min-height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  background: linear-gradient(
    135deg,
    #111827,
    #1e3a8a
  );
}

.content {
  width: 100%;
  max-width: 500px;

  padding: 20px;
}

</style>
