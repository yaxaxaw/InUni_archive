<template>
  <div class="register-page">

    <nav class="navbar">
      <div class="nav-inner">
        <a href="/" class="nav-logo">
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAK8AAACwCAYAAAB5Ej47AABieklEQVR4nO1dd5xdRfX/npm5r2xN2/QCJKEkVENvu6EjoAi8lR+ggAqxUBQRrLx9InYUBAQColRhF0EQERTZXZr0HnooCQnpZet7796Z8/tjZu57C6kkRBb3+FmT7Hvce2fumTPf8z1lgAHZKMLMlEFGMrO68bs/nP2z40+5WSUCZOvr1X/72QZkQNYo2WxWAcBzN7Rc8t0tp/E52+zJ9/726pMAoLm5Wf5XH25ABmR14pUzfO3Ngy45+CjO1o6PfjVyqr704ON4xfPvHFD+nQEZkI+NMDNlAcHMg645+Yx53xu8ub5i7Pb62s121r8YOZWvPenMhcw8GIDIZrPiv/28nyQZmMwNlJkzZqgckWk+58c/n/PAo6NrE2kDJhFpFhVSRHPubxt+27nn/1EmAoO2toH53ogyMJkbIM3NzXLGzJnhXRdfccDsBx+dkSyEOplIqgKM6TERsxAqXQyjJQ8+8dnWi2Yem2tvj1odNh6QDZcB5f2Qks1mRWNjo5n34ovjH73179f3vvMeJ5QUhojzEKIr1GQ0UKEqpZmzSL9y2z+ueO2hhyZOz+Wi5kxmAP9uBBlQ3g8hDBDa2kQimeAbL7j4+mWz544sEJm8ZhSNoKF77vJmzdYTi6aoDbEgACi+/Hbtv3911Z+ZOWhpaQEz0397HP1dBpT3Q0hTfVbm2tujq8887wcLn31tX611VCRB3ZoRjh25ONN81a7bHnnombWbTxCSTaSkkAVdjDpnvbrL5Sd87TctgJ6584wB+LCBMqC86ynNmWaZa89Fj9x4d/3rDz99fnHFSi2UlIWoaHpqK6lql6lfriVaOv2c064o3m2Ha2VNlWKOtBZaRZ3Lo/Cl104p3m2Ha2VNlWKOtBZaRZ3Lo/Cl104" alt="InUni" style="height:44px;width:auto;display:block;" />
        </a>
        <div class="nav-right">
          <span class="nav-hint">Уже есть аккаунт?</span>
          <a href="/login" class="btn-ghost">Войти</a>
        </div>
      </div>
    </nav>

    <main class="main">
      <div class="form-card">
        <div class="form-header">
          <h2 class="form-title">Создай аккаунт</h2>
          <p class="form-sub">Заполни профиль позже — прямо внутри InUni</p>
        </div>

        <div class="fields-row">
          <div class="field-group">
            <label class="field-label">Имя</label>
            <input v-model="form.firstName" type="text" placeholder="Алексей" class="field-input" />
            <span v-if="errors.firstName" class="field-error">{{ errors.firstName }}</span>
          </div>
          <div class="field-group">
            <label class="field-label">Фамилия</label>
            <input v-model="form.lastName" type="text" placeholder="Ким" class="field-input" />
            <span v-if="errors.lastName" class="field-error">{{ errors.lastName }}</span>
          </div>
        </div>

        <div class="field-group">
          <label class="field-label">Почта</label>
          <input v-model="form.email" type="email" placeholder="you@university.edu" class="field-input" />
          <span v-if="errors.email" class="field-error">{{ errors.email }}</span>
        </div>

        <div class="field-group">
          <label class="field-label">Пароль</label>
          <input v-model="form.password" type="password" placeholder="Минимум 8 символов" class="field-input" />
          <span v-if="errors.password" class="field-error">{{ errors.password }}</span>
        </div>

        <div v-if="apiError" class="error-alert">{{ apiError }}</div>

        <button class="submit-btn" @click="handleRegister" :disabled="isLoading" type="button">
          {{ isLoading ? 'Создаём профиль…' : 'Вступить в InUni' }}
        </button>

        <p class="login-link">
          Уже есть аккаунт? <a href="/login">Войти в InUni →</a>
        </p>
      </div>
    </main>

  </div>
</template>

<script>
export default {
  name: 'RegisterPage',
  data() {
    return {
      isLoading: false,
      apiError: '',
      form: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      },
      errors: {},
    };
  },
  methods: {
    validate() {
      const e = {};
      if (!this.form.firstName.trim()) e.firstName = 'Введи имя';
      if (!this.form.lastName.trim()) e.lastName = 'Введи фамилию';
      if (!this.form.email) e.email = 'Введи почту';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.form.email)) e.email = 'Неверный формат';
      if (!this.form.password) e.password = 'Введи пароль';
      else if (this.form.password.length < 8) e.password = 'Минимум 8 символов';
      this.errors = e;
      return Object.keys(e).length === 0;
    },
    async handleRegister() {
      if (!this.validate()) return;
      this.isLoading = true;
      // TODO: заменить на реальный API
      await new Promise(r => setTimeout(r, 1000));
      this.isLoading = false;
      localStorage.setItem('token', 'mock-token');
      this.$router.push('/profile');
    },
  },
};
</script>

<style scoped>
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

.register-page {
  font-family: sans-serif;
  background: #080c1a;
  color: #e8eaf2;
  min-height: 100vh;
}

.navbar {
  position: fixed;
  top: 0; left: 0; right: 0;
  background: #0f1629;
  border-bottom: 1px solid rgba(255,255,255,0.07);
  z-index: 100;
}
.nav-inner {
  padding: 0 24px;
  height: 68px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.nav-logo { display: flex; align-items: center; text-decoration: none; }
.nav-right { display: flex; align-items: center; gap: 12px; }
.nav-hint { font-size: 13px; color: #7a80a0; }

.btn-ghost {
  color: #e8eaf2;
  font-weight: 500; font-size: 14px;
  padding: 10px 18px; border-radius: 8px;
  text-decoration: none;
  border: 1px solid rgba(255,255,255,0.07);
}

.main {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 88px 16px 48px;
}

.form-card {
  width: 100%;
  max-width: 420px;
  background: #131a30;
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 20px;
  padding: 32px;
}

.form-header { margin-bottom: 22px; }
.form-title { font-size: 22px; font-weight: 700; color: #fff; margin-bottom: 6px; }
.form-sub { font-size: 13px; color: #7a80a0; }

.fields-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

.field-group { margin-bottom: 14px; }
.field-label {
  display: block;
  font-size: 11px; font-weight: 600;
  color: #7a80a0; text-transform: uppercase;
  margin-bottom: 7px; letter-spacing: 0.04em;
}
.field-input {
  width: 100%;
  background: rgba(255,255,255,0.03);
  border: 1.5px solid rgba(255,255,255,0.07);
  border-radius: 10px;
  padding: 12px 14px;
  color: #e8eaf2;
  font-size: 14px;
  outline: none;
}
.field-input:focus { border-color: #e63946; }
.field-error { display: block; font-size: 11px; color: #f87171; margin-top: 4px; }

.error-alert {
  background: rgba(248,113,113,0.1);
  border: 1px solid rgba(248,113,113,0.2);
  border-radius: 8px;
  padding: 12px 14px;
  font-size: 13px; color: #f87171;
  margin-bottom: 14px;
}

.submit-btn {
  width: 100%;
  background: #e63946;
  color: #fff;
  font-weight: 700; font-size: 14px;
  padding: 13px 24px; border-radius: 10px;
  border: none; cursor: pointer;
  margin-bottom: 14px;
}
.submit-btn:disabled { opacity: 0.7; cursor: default; }

.login-link { text-align: center; font-size: 13px; color: #7a80a0; }
.login-link a { color: #e63946; text-decoration: none; font-weight: 600; }

@media (max-width: 480px) {
  .fields-row { grid-template-columns: 1fr; }
}
</style>
