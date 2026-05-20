<template>
  <div class="teams-page">

    <nav class="navbar">
      <div class="navbar-content">

        <div class="logo">
          InUni Teams
        </div>

        <button class="logout-btn" @click="logout">
          Выйти
        </button>

      </div>
    </nav>

    <main class="main-content">

      <div class="welcome-card">
        <h1>Добро пожаловать 🔥</h1>

        <p>
          Ты успешно вошёл в систему InUni.
        </p>
      </div>

    </main>

  </div>
</template>

<script>
export default {
  name: 'TeamsPage',

  methods: {
    logout() {

      localStorage.removeItem('token')

      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.teams-page {
  min-height: 100vh;
  background: #080c1a;
  color: white;
  font-family: sans-serif;
}

.navbar {
  height: 72px;
  border-bottom: 1px solid rgba(255,255,255,0.08);

  display: flex;
  align-items: center;

  padding: 0 32px;

  background: rgba(10,15,30,0.8);
  backdrop-filter: blur(14px);
}

.navbar-content {
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  font-size: 20px;
  font-weight: 700;
}

.logout-btn {
  background: rgba(230,57,70,0.12);
  border: 1px solid rgba(230,57,70,0.25);

  color: #f87171;

  padding: 10px 18px;
  border-radius: 10px;

  font-size: 14px;
  font-weight: 600;

  cursor: pointer;

  transition: all 0.2s;
}

.logout-btn:hover {
  background: rgba(230,57,70,0.2);
  transform: translateY(-1px);
}

.main-content {
  display: flex;
  justify-content: center;
  align-items: center;

  padding-top: 120px;
}

.welcome-card {
  background: rgba(255,255,255,0.04);

  border: 1px solid rgba(255,255,255,0.08);

  padding: 40px;

  border-radius: 20px;

  text-align: center;

  width: 500px;
}

.welcome-card h1 {
  margin-bottom: 12px;
}

.welcome-card p {
  color: rgba(255,255,255,0.7);
}
</style>
