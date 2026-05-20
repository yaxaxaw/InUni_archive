<template>
  <div class="spinner-wrapper">
    <div class="spinner"></div>
  </div>
</template>

<style scoped>

.spinner-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.spinner {

  width: 40px;
  height: 40px;

  border: 4px solid #e5e7eb;
  border-top: 4px solid #2563eb;

  border-radius: 50%;

  animation: spin 1s linear infinite;
}

@keyframes spin {

  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

</style>
