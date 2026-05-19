<template>
  <div class="login-page">

    <nav class="navbar">
      <div class="nav-inner">
        <a href="/" class="nav-logo">
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADmCAYAAACQ/srYAACD6ElEQVR42u1dd3xU1fKfOefc3U1C79hRsYAVsJdN7L3hrorP7oNn99n7Zu29N/L0oYJtI+qPZ29J7ChgA6wo0qVD2u7ec878/rhl792SBEgiJdfPGiDb7r1nzsx85zvfAeg42uQgIowAcCLiT154zTdjrr/lNACAWCwmOq5Ox7HBH44hjLv+zrsf3nc4PXbc2Yumfj55awAAisVYxxVaN46O3awNjkQiwaPRqPy/iucO+H1C1ZWpFXXSWFnfa+ITz75MRHtVYlQRESIidVyttfvgHZeg1T0Hu/DCC2kFUc+qe556Nz1zQWcmGCqplVGf3Hj273/0OPGTh9+EahA1f9bojivWYSAb0oGlAPyzefP05gvp1RU//D4ENGgA4lwwJhtSMrV85Z6XX3nFzLMfv/SbqlhMPFvTYSRr89ERC7eu9+Dxmho5/q4nb5k3Zfph9ckGaaLmWmvQUoIWyFfMmqV+/+CTZ/76duq+ZfG4TCQSHZtUh4FsGHlHPB6X09574oipH35xw4rFiyUK4EqlQZICDQBEGllREOd/+z1Vjx73IhH1ikajOtaRtHcYyPqed0yLRomIer837pWnF/zyB4VCIYYakZCAQIEEDZIIEIAFgkG94NOvNnnn5gfHcMOg0mpg2HEZOwxkvT2qgcURdMUVdzy8YOqMfiEjqACQETLLcwAAEQAiAkcGASPIZbJBLqj57Kiax54+tawmLj/qqI90GMh6G1rVxOX4B8ec+tf3v42ANMmAIQRDBEQCBAQgAEQABABNGhhpKCkqZmrBAjXr/erHZ0+ZMrAsHpcd9ZEOA1nvQqtoNKp//OKbLX78eMqj9YtWaG4IBsTACpk0IJHlQoBAAwEgA2YZDUMjADBjTpeJT459hoiC5dXVjIg6oq216OhAUFb/QADgs+bM1v0bO/3fit/mbwtaaQbEGQEwBGBIQKQBGQFDBM4ADGDACYAMA84EI1PJQF3D5n/8/nunUWP/+/ZG8+cbb0ye3AH9dniQddx7hGO8pqZG3n3+jTct+33+/imZUpojJ7BCK44AnAgEEXAr0LI8BxAAAmggkFKD5kI0Ll4h67/67tKPK54+ZVRFhVnVkY90GMg6nXdErLzjxYfHHb7ox7nx+pX1UggrtCJyLiwCJ8sgGABwQMtzEAMgAHKeqAnA4FzPWaAXfvDp6PnTp+9QFo9L6qiPdBjIOpt3VEb1X3/81W9a9dfPL/9rKfGA4ECADAA4EiBaARgyBoIJEABK2BcbAa1wy34QIihgqIUBDT/82vm7J194j4g2xmhUEVHH/ekwkHXnIACcHp+OgWCAHr/p/uf++n1Bdya4ZoCIwABJW5kJIGgCkARAiqCYGVwQaAYI3DYSBAQnfyfQYJJmCkgt/KCm/xd3P5ogokB1eXlH0t6RpK9T7kM8XvO4euzqB+75edKPp8l0SgrGBIIGBACBDDgAaNDAAUBoTUW9umLf3QZ93PjX4i2E0oTIkGtwvQcggSYJQAoQkanG5aY5f/4WvKRTl90uOu+to+fPNyo6kvYOD7LW5x02leSlx14q++bzb66oXVErhWEIK54CIPs/DcpKLTTJQKcS7DJowGNnjrk/LLbZ7EPDCCARKkK0IF/Q9n8AhASMCIzikmPlzD/kTy+8ePHS76afMayiwuzIRzoMZO3PO6JRtXLuyl6fvl3z3OIFiylQFGDayrYtKBfJ9ggIhKA5gGD9u009" alt="InUni" style="height:44px;width:auto;display:block;" />
        </a>
        <div class="nav-right">
          <span class="nav-hint">Нет аккаунта?</span>
          <a href="/register" class="btn-primary">Вступить</a>
        </div>
      </div>
    </nav>

    <main class="main">
      <div class="form-card">
        <div class="form-header">
          <h2 class="form-title">Вход в InUni</h2>
          <p class="form-sub">Введи университетскую почту и пароль</p>
        </div>

        <div class="field-group">
          <label class="field-label">Университетская почта</label>
          <input
            v-model="email"
            type="email"
            placeholder="you@university.edu"
            class="field-input"
            @blur="validateEmail"
            @keyup.enter="focusPassword"
          />
          <span v-if="emailError" class="field-error">{{ emailError }}</span>
        </div>

        <div class="field-group">
          <label class="field-label">Пароль</label>
          <input
            v-model="password"
            type="password"
            placeholder="••••••••"
            class="field-input"
            ref="passwordInput"
            @keyup.enter="handleLogin"
          />
          <span v-if="passwordError" class="field-error">{{ passwordError }}</span>
        </div>

        <div v-if="loginError" class="error-alert">{{ loginError }}</div>

        <button class="submit-btn" @click="handleLogin" :disabled="isLoading">
          {{ isLoading ? 'Входим…' : 'Войти в InUni' }}
        </button>

        <p class="register-link">
          Ещё нет аккаунта? <a href="/register">Вступить в InUni →</a>
        </p>
      </div>
    </main>

  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: '',
      emailError: '',
      passwordError: '',
      loginError: '',
      isLoading: false,
    };
  },
  methods: {
    focusPassword() {
      this.$refs.passwordInput?.focus();
    },
    validateEmail() {
      if (!this.email) {
        this.emailError = 'Введи почту';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
        this.emailError = 'Неверный формат почты';
      } else {
        this.emailError = '';
      }
    },
    async handleLogin() {
      this.loginError = '';
      this.validateEmail();
      if (!this.password) this.passwordError = 'Введи пароль';
      else this.passwordError = '';
      if (this.emailError || this.passwordError) return;

      this.isLoading = true;
      // TODO: заменить на реальный API
      await new Promise(r => setTimeout(r, 1000));
      this.isLoading = false;
      localStorage.setItem('token', 'mock-token');
      this.$router.push('/teams');
    },
  },
};
</script>

<style scoped>
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

.login-page {
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

.btn-primary {
  background: #e63946;
  color: #fff;
  font-weight: 600; font-size: 14px;
  padding: 10px 22px;
  border-radius: 8px;
  border: none; cursor: pointer;
  text-decoration: none;
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
.form-title { font-size: 24px; font-weight: 700; color: #fff; margin-bottom: 6px; }
.form-sub { font-size: 14px; color: #7a80a0; }

.field-group { margin-bottom: 16px; }
.field-label {
  display: block;
  font-size: 12px; font-weight: 600;
  color: #7a80a0;
  margin-bottom: 8px;
}
.field-input {
  width: 100%;
  background: rgba(255,255,255,0.03);
  border: 1.5px solid rgba(255,255,255,0.07);
  border-radius: 10px;
  padding: 13px 14px;
  color: #e8eaf2;
  font-size: 14px;
  outline: none;
}
.field-input:focus { border-color: #e63946; }
.field-error { display: block; font-size: 11px; color: #f87171; margin-top: 5px; }

.error-alert {
  background: rgba(248,113,113,0.1);
  border: 1px solid rgba(248,113,113,0.2);
  border-radius: 8px;
  padding: 12px 14px;
  font-size: 13px; color: #f87171;
  margin-bottom: 12px;
}

.submit-btn {
  width: 100%;
  background: #e63946;
  color: #fff;
  font-weight: 700; font-size: 15px;
  padding: 14px 24px;
  border-radius: 10px;
  border: none; cursor: pointer;
  margin-bottom: 12px;
}
.submit-btn:disabled { opacity: 0.7; cursor: default; }

.register-link { text-align: center; font-size: 13px; color: #7a80a0; }
.register-link a { color: #e63946; text-decoration: none; font-weight: 600; }
</style>
