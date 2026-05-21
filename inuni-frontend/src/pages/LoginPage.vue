<template>
  <div class="login-page">

    <!-- Background -->
    <div class="page-bg">
      <div class="grid-overlay"></div>
      <div class="blob blob-1"></div>
      <div class="blob blob-2"></div>
      <div class="blob blob-3"></div>

      <!-- InUni Logo Watermark (top-left) -->
      <svg class="bg-logo-watermark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 240" aria-hidden="true">
        <!-- Mountain peaks -->
        <path d="M28 118 L72 38 L90 68 L105 30 L148 105 L148 118Z" fill="#1a3370" opacity="0.9"/>
        <path d="M90 112 L115 38 L155 95 L155 112Z" fill="#c8102e" opacity="0.9"/>
        <!-- White outline / sticker effect -->
        <rect x="26" y="96" width="36" height="110" rx="7" fill="white"/>
        <rect x="26" y="96" width="36" height="110" rx="7" fill="#1a3370"/>
        <!-- U left arm -->
        <rect x="86" y="96" width="24" height="95" rx="0" fill="white"/>
        <rect x="86" y="96" width="24" height="95" rx="0" fill="#c8102e"/>
        <!-- U bottom curve -->
        <rect x="86" y="171" width="68" height="24" rx="12" fill="white"/>
        <rect x="86" y="171" width="68" height="24" rx="12" fill="#c8102e"/>
        <!-- U right arm + arrow shaft -->
        <rect x="130" y="42" width="24" height="153" rx="0" fill="white"/>
        <rect x="130" y="42" width="24" height="153" rx="0" fill="#c8102e"/>
        <!-- Arrowhead -->
        <path d="M114 60 L142 32 L170 60" fill="white" stroke="white" stroke-width="4" stroke-linejoin="round"/>
        <path d="M114 60 L142 32 L170 60" fill="#c8102e" stroke="#c8102e" stroke-width="2" stroke-linejoin="round"/>
        <!-- White diagonal slash between I and U -->
        <line x1="54" y1="93" x2="92" y2="133" stroke="white" stroke-width="7" stroke-linecap="round"/>
      </svg>
    </div>

    <!-- Navbar -->
    <nav class="navbar">
      <div class="nav-inner">
        <router-link to="/" class="nav-logo">
          <InUniLogo />
        </router-link>
        <div class="nav-right">
          <span class="nav-hint">Нет аккаунта?</span>
          <router-link to="/register" class="register-inline-link">
            Вступить в InUni →
          </router-link>
        </div>
      </div>
    </nav>

    <!-- Main content -->
    <main class="main">
      <div class="auth-shell">

        <!-- Branding -->
        <div class="brand-panel">
          <div class="lp-content">
            <div class="hero-badge">
              <span class="badge-dot"></span>
              Добро пожаловать обратно
            </div>

            <h1 class="lp-title">
              Твои люди<br>
              <span class="gradient-text">ждут тебя.</span>
            </h1>

            <p class="lp-sub">
              Войди и возвращайся в свою студенческую сеть — чаты, проекты, хакатоны и новые знакомства.
            </p>

            <!-- Mini stat cards -->
            <div class="lp-stats">
              <div class="lp-stat">
                <span class="lp-stat-num">2 400+</span>
                <span class="lp-stat-label">студентов онлайн</span>
              </div>
              <div class="lp-stat-divider"></div>
              <div class="lp-stat">
                <span class="lp-stat-num">120+</span>
                <span class="lp-stat-label">активных команд</span>
              </div>
            </div>

            <!-- Floating card preview -->
            <div class="lp-preview-cards">
              <div class="mini-card mc-back">
                <div class="mc-avatar" style="background:#3a2d6e"></div>
                <div class="mc-lines"><span></span><span style="width:60%"></span></div>
              </div>
              <div class="mini-card mc-main">
                <div class="mc-top">
                  <div class="mc-avatar-main">
                    <span>АК</span>
                  </div>
                  <div class="mc-match-badge">MATCH! 🎉</div>
                </div>
                <div class="mc-name">Алексей Ким</div>
                <div class="mc-sub">Frontend Dev · Vue · React</div>
                <div class="mc-tags">
                  <span>Fintech</span>
                  <span>AI</span>
                </div>
              </div>
              <!-- notification bubble -->
              <div class="notif-bubble">
                <span class="notif-dot"></span>
                Максим зовёт в команду 🔥
              </div>
            </div>
          </div>
        </div>

        <div class="form-panel">
          <div class="form-card">
            <div class="mobile-brand">
              <svg height="40" viewBox="0 0 220 240" xmlns="http://www.w3.org/2000/svg" aria-label="InUni" style="display:block;">
                <path d="M28 118 L72 38 L90 68 L105 30 L148 105 L148 118Z" fill="#1a3370"/>
                <path d="M90 112 L115 38 L155 95 L155 112Z" fill="#c8102e"/>
                <rect x="24" y="94" width="40" height="114" rx="9" fill="white"/>
                <rect x="28" y="98" width="32" height="106" rx="7" fill="#1a3370"/>
                <rect x="84" y="94" width="28" height="99" rx="0" fill="white"/>
                <rect x="87" y="97" width="22" height="96" rx="0" fill="#c8102e"/>
                <rect x="84" y="169" width="74" height="28" rx="14" fill="white"/>
                <rect x="87" y="172" width="68" height="22" rx="11" fill="#c8102e"/>
                <rect x="128" y="40" width="30" height="157" rx="0" fill="white"/>
                <rect x="131" y="43" width="24" height="151" rx="0" fill="#c8102e"/>
                <path d="M112 62 L143 30 L174 62" fill="white" stroke="white" stroke-width="6" stroke-linejoin="round"/>
                <path d="M114 62 L143 32 L172 62" fill="#c8102e" stroke="#c8102e" stroke-width="2" stroke-linejoin="round"/>
                <line x1="52" y1="90" x2="94" y2="136" stroke="white" stroke-width="8" stroke-linecap="round"/>
              </svg>
              <p>Твоя студенческая сеть</p>
            </div>

            <div class="form-header">
              <h2 class="form-title">Вход в InUni</h2>
              <p class="form-sub">Введи университетскую почту и пароль</p>
            </div>

            <!-- Form fields -->
            <div class="field-group">
              <label class="field-label">Университетская почта</label>
              <div class="field-wrap" :class="{ focused: focusedField === 'email', error: emailError }">
                <svg class="field-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                <input
                  v-model="email"
                  type="email"
                  placeholder="you@university.edu"
                  class="field-input"
                  @focus="focusedField = 'email'"
                  @blur="focusedField = null; validateEmail()"
                  @keyup.enter="focusPassword"
                />
              </div>
              <span v-if="emailError" class="field-error">{{ emailError }}</span>
            </div>

            <div class="field-group">
              <div class="field-label-row">
                <label class="field-label">Пароль</label>
                <button
                  type="button"
                  class="forgot-link forgot-btn"
                  @click="forgotPassword"
                >
                  Забыл пароль?
                </button>
              </div>
              <div class="field-wrap" :class="{ focused: focusedField === 'password', error: passwordError }">
                <svg class="field-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                <input
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="••••••••"
                  class="field-input"
                  ref="passwordInput"
                  @focus="focusedField = 'password'"
                  @blur="focusedField = null"
                  @keyup.enter="handleLogin"
                />
                <button class="eye-btn" @click="showPassword = !showPassword" type="button">
                  <svg v-if="!showPassword" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                </button>
              </div>
              <span v-if="passwordError" class="field-error">{{ passwordError }}</span>
            </div>

            <!-- Submit -->
            <button
              class="submit-btn"
              :class="{ loading: isLoading, success: loginSuccess }"
              @click="handleLogin"
              :disabled="isLoading"
            >
              <span v-if="!isLoading && !loginSuccess" class="submit-text">
                Войти в InUni
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </span>
              <span v-if="isLoading" class="submit-spinner">
                <span class="spinner"></span>
                Входим…
              </span>
              <span v-if="loginSuccess" class="submit-ok">
                ✓ Добро пожаловать!
              </span>
            </button>

            <!-- Error alert -->
            <div v-if="loginError" class="error-alert">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              {{ loginError }}
            </div>

            <p class="register-link">
              Ещё нет аккаунта?

              <router-link to="/register" class="register-inline-link">
                Вступить в InUni →
              </router-link>
            </p>
          </div>
        </div>

      </div>
    </main>
    <transition name="popup">
      <div v-if="showForgotPopup" class="fun-popup">
        <span class="popup-emoji">🤡</span>
        <span>Не надо было забывать, сам виноват</span>
      </div>
    </transition>
  </div>
</template>

<script>
import InUniLogo from '../components/InUniLogo.vue'
import api from '../lib/api.js'
import { setToken } from '../utils/token'

export default {
  name: 'LoginPage',

  components: {
    InUniLogo
  },

  data() {
    return {
      email: '',
      password: '',
      showPassword: false,
      focusedField: null,
      emailError: '',
      passwordError: '',
      loginError: '',
      isLoading: false,
      loginSuccess: false,
      showForgotPopup: false,
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
      this.loginError = ''
      this.validateEmail()

      if (!this.password)
        this.passwordError = 'Введи пароль'
      else
        this.passwordError = ''

      if (this.emailError || this.passwordError) return

      this.isLoading = true

      try {

        const response = await api.post('/auth/login', {
          email: this.email,
          password: this.password
        })

        const token = response.data.token

        setToken(token)

        this.loginSuccess = true

        setTimeout(() => {
          this.$router.push('/teams')
        }, 600)

      } catch {

        this.loginError = 'Неверная почта или пароль'

      } finally {

        this.isLoading = false

      }
    },
    forgotPassword() {
      this.showForgotPopup = true

      setTimeout(() => {
        this.showForgotPopup = false
      }, 2500)
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@400;600;700;900&family=Onest:wght@300;400;500;600&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

.login-page {
  --c-bg:      #080c1a;
  --c-surface: #0f1629;
  --c-card:    #131a30;
  --c-border:  rgba(255,255,255,0.07);
  --c-red:     #e63946;
  --c-red-dim: rgba(230,57,70,0.15);
  --c-blue:    #1d4ed8;
  --c-accent:  #3b82f6;
  --c-text:    #e8eaf2;
  --c-muted:   #7a80a0;
  --c-white:   #ffffff;
  --r:         14px;

  font-family: 'Onest', sans-serif;
  background: var(--c-bg);
  color: var(--c-text);
  min-height: 100vh;
  overflow-x: hidden;
}

/* ── BG ── */
.page-bg {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}
.grid-overlay {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
  background-size: 60px 60px;
  mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%);
}
.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);
  opacity: 0.2;
}
.blob-1 { width: 500px; height: 500px; background: #e63946; top: -150px; right: -150px; animation: blobFloat 9s ease-in-out infinite; }
.blob-2 { width: 350px; height: 350px; background: #1d4ed8; bottom: -100px; left: -100px; animation: blobFloat 12s ease-in-out infinite reverse; }
.blob-3 { width: 250px; height: 250px; background: #7c3aed; top: 50%; left: 30%; animation: blobFloat 10s ease-in-out infinite 2s; }
@keyframes blobFloat {
  0%,100% { transform: translate(0,0) scale(1); }
  50% { transform: translate(20px,-20px) scale(1.06); }
}

/* ── BG LOGO WATERMARK ── */
.bg-logo-watermark {
  position: absolute;
  top: -40px;
  left: -40px;
  width: 420px;
  height: 420px;
  opacity: 0.055;
  pointer-events: none;
  transform: rotate(-8deg);
  filter: blur(1px);
}

/* ── NAVBAR ── */
.navbar {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  background: rgba(8,12,26,0.8);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--c-border);
}
.nav-inner {
  width: 100%;
  max-width: none;
  margin: 0;
  padding: 0 clamp(20px, 4vw, 48px);
  height: 68px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}
.nav-logo {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  text-decoration: none;
}
.nav-right {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-left: auto;
  flex-shrink: 0;
}
.nav-hint { font-size: 13px; color: var(--c-muted); }

/* ── BUTTONS ── */
.btn-primary {
  display: inline-flex; align-items: center; gap: 8px;
  background: var(--c-red);
  color: #fff;
  font-family: 'Onest', sans-serif;
  font-weight: 600; font-size: 14px;
  padding: 10px 22px;
  border-radius: 8px;
  border: none; cursor: pointer;
  text-decoration: none;
  transition: all 0.2s;
}
.btn-primary:hover { background: #c62d39; transform: translateY(-1px); }

/* ── MAIN LAYOUT ── */
.main {
  position: relative;
  z-index: 1;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 88px clamp(16px, 3vw, 32px) 48px;
}
.auth-shell {
  width: 100%;
  max-width: 1080px;
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(300px, 0.95fr);
  gap: clamp(28px, 4vw, 56px);
  align-items: center;
}

/* ── BRAND PANEL ── */
.brand-panel {
  min-width: 0;
}
.lp-content { max-width: 480px; }

.hero-badge {
  display: inline-flex;
  align-items: center; gap: 8px;
  background: rgba(230,57,70,0.12);
  border: 1px solid rgba(230,57,70,0.3);
  color: #f87171;
  font-size: 12px; font-weight: 500;
  padding: 6px 14px; border-radius: 100px;
  margin-bottom: 24px;
}
.badge-dot {
  width: 6px; height: 6px;
  background: var(--c-red); border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
}
@keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.4)} }

.lp-title {
  font-family: 'Unbounded', sans-serif;
  font-size: clamp(32px, 4vw, 52px);
  font-weight: 800;
  line-height: 1.1;
  color: var(--c-white);
  margin-bottom: 18px;
  letter-spacing: -1px;
}
.gradient-text {
  background: linear-gradient(135deg, #e63946 0%, #f87171 50%, #fb923c 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.lp-sub {
  font-size: 15px; line-height: 1.65;
  color: var(--c-muted);
  margin-bottom: 32px;
  max-width: 400px;
}

.lp-stats {
  display: flex; align-items: center; gap: 20px;
  margin-bottom: 40px;
}
.lp-stat { display: flex; flex-direction: column; gap: 2px; }
.lp-stat-num {
  font-family: 'Unbounded', sans-serif;
  font-size: 20px; font-weight: 700; color: var(--c-white);
}
.lp-stat-label { font-size: 11px; color: var(--c-muted); }
.lp-stat-divider { width: 1px; height: 32px; background: var(--c-border); }

/* Preview Cards */
.lp-preview-cards {
  position: relative;
  width: 280px;
  height: 200px;
}
.mini-card {
  position: absolute;
  width: 250px;
  background: var(--c-card);
  border: 1px solid var(--c-border);
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 16px 48px rgba(0,0,0,0.5);
}
.mc-back {
  top: 20px; left: 20px;
  transform: rotate(4deg);
  opacity: 0.4;
}
.mc-avatar {
  width: 40px; height: 40px; border-radius: 10px;
  margin-bottom: 12px;
}
.mc-lines { display: flex; flex-direction: column; gap: 7px; }
.mc-lines span {
  display: block; height: 8px;
  background: rgba(255,255,255,0.07); border-radius: 4px;
}
.mc-main {
  top: 0; left: 0;
  background: var(--c-surface);
  border-color: rgba(255,255,255,0.12);
  animation: cardFloat 4s ease-in-out infinite;
}
@keyframes cardFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
.mc-top {
  display: flex; align-items: flex-start;
  justify-content: space-between; margin-bottom: 10px;
}
.mc-avatar-main {
  width: 44px; height: 44px;
  background: linear-gradient(135deg, #e63946, #1d4ed8);
  border-radius: 12px;
  display: grid; place-items: center;
}
.mc-avatar-main span {
  font-family: 'Unbounded', sans-serif;
  font-size: 11px; font-weight: 700; color: #fff;
}
.mc-match-badge {
  background: linear-gradient(135deg, #e63946, #f97316);
  color: #fff; font-size: 9px; font-weight: 700;
  padding: 3px 8px; border-radius: 100px;
  font-family: 'Unbounded', sans-serif;
  animation: matchPop 1.5s ease-in-out infinite;
}
@keyframes matchPop { 0%,100%{transform:scale(1)} 50%{transform:scale(1.06)} }
.mc-name {
  font-family: 'Unbounded', sans-serif;
  font-size: 13px; font-weight: 700; color: #fff;
  margin-bottom: 3px;
}
.mc-sub { font-size: 11px; color: var(--c-muted); margin-bottom: 10px; }
.mc-tags { display: flex; gap: 5px; }
.mc-tags span {
  font-size: 10px; padding: 2px 8px; border-radius: 100px;
  background: rgba(59,130,246,0.1); color: #93c5fd;
  border: 1px solid rgba(59,130,246,0.2);
}

/* Notification bubble */
.notif-bubble {
  position: absolute;
  bottom: -10px; right: -20px;
  background: var(--c-surface);
  border: 1px solid rgba(52,211,153,0.3);
  border-radius: 100px;
  padding: 7px 14px;
  font-size: 12px; font-weight: 500; color: #34d399;
  display: flex; align-items: center; gap: 7px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.4);
  animation: notifBounce 3s ease-in-out infinite;
  white-space: nowrap;
}
.notif-dot {
  width: 7px; height: 7px; border-radius: 50%;
  background: #34d399;
  animation: pulse 2s infinite;
}
@keyframes notifBounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }

/* ── FORM PANEL ── */
.form-panel {
  width: 100%;
  min-width: 0;
}
.form-card {
  width: 100%;
  max-width: 420px;
  margin: 0 auto;
  background: rgba(15, 22, 41, 0.9);
  border: 1px solid var(--c-border);
  border-radius: 20px;
  padding: clamp(24px, 3vw, 32px);
  backdrop-filter: blur(14px);
  box-shadow:
    0 24px 64px rgba(0, 0, 0, 0.38),
    inset 0 1px 0 rgba(255, 255, 255, 0.04);
}
.mobile-brand {
  display: none;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin-bottom: 18px;
  text-align: center;
}
.mobile-brand p {
  margin: 0;
  font-size: 13px;
  color: var(--c-muted);
}
.form-header { margin-bottom: 22px; }
.form-title {
  font-family: 'Unbounded', sans-serif;
  font-size: 24px; font-weight: 700;
  color: var(--c-white); margin-bottom: 6px;
}
.form-sub { font-size: 14px; color: var(--c-muted); }

/* Fields */
.field-group { margin-bottom: 16px; }
.field-label {
  display: block;
  font-size: 12px; font-weight: 600;
  color: var(--c-muted);
  letter-spacing: 0.04em;
  text-transform: uppercase;
  margin-bottom: 8px;
  font-family: 'Unbounded', sans-serif;
}
.field-label-row {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 8px;
}
.field-label-row .field-label { margin-bottom: 0; }
.forgot-link {
  font-size: 12px; color: var(--c-red);
  text-decoration: none; font-weight: 500;
  transition: opacity 0.2s;
}
.forgot-link:hover { opacity: 0.8; }

.field-wrap {
  display: flex; align-items: center; gap: 10px;
  background: rgba(255,255,255,0.03);
  border: 1.5px solid var(--c-border);
  border-radius: 10px;
  padding: 0 14px;
  transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
}
.field-wrap.focused {
  border-color: var(--c-red);
  background: rgba(230,57,70,0.04);
  box-shadow: 0 0 0 3px rgba(230,57,70,0.1);
}
.field-wrap.error {
  border-color: #f87171;
  box-shadow: 0 0 0 3px rgba(248,113,113,0.1);
}
.field-icon { color: var(--c-muted); flex-shrink: 0; }
.field-input {
  flex: 1;
  background: none;
  border: none;
  outline: none;
  color: var(--c-white);
  font-family: 'Onest', sans-serif;
  font-size: 14px;
  padding: 13px 0;
}
.field-input::placeholder { color: rgba(122,128,160,0.6); }
.eye-btn {
  background: none; border: none; cursor: pointer;
  color: var(--c-muted); display: flex; align-items: center;
  padding: 4px; transition: color 0.2s;
}
.eye-btn:hover { color: var(--c-text); }
.field-error { display: block; font-size: 11px; color: #f87171; margin-top: 5px; }

/* Remember me */
.remember-row { margin-bottom: 20px; }
.checkbox-wrap {
  display: flex; align-items: center; gap: 8px;
  cursor: pointer; user-select: none;
}
.checkbox-input { display: none; }
.checkbox-custom {
  width: 16px; height: 16px;
  border: 1.5px solid var(--c-border);
  border-radius: 4px; background: transparent;
  transition: all 0.2s;
  flex-shrink: 0;
  position: relative;
}
.checkbox-input:checked + .checkbox-custom {
  background: var(--c-red);
  border-color: var(--c-red);
}
.checkbox-input:checked + .checkbox-custom::after {
  content: '';
  position: absolute;
  left: 3px; top: 1px;
  width: 5px; height: 8px;
  border: 2px solid #fff;
  border-top: none; border-left: none;
  transform: rotate(45deg);
}
.checkbox-label { font-size: 13px; color: var(--c-muted); }

/* Submit */
.submit-btn {
  width: 100%;
  display: flex; align-items: center; justify-content: center; gap: 8px;
  background: var(--c-red);
  color: #fff;
  font-family: 'Onest', sans-serif;
  font-weight: 700; font-size: 15px;
  padding: 14px 24px;
  border-radius: 10px;
  border: none; cursor: pointer;
  transition: all 0.2s;
  margin-bottom: 12px;
  min-height: 50px;
}
.submit-btn:hover:not(:disabled) { background: #c62d39; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(230,57,70,0.3); }
.submit-btn:disabled { opacity: 0.8; cursor: default; transform: none; }
.submit-btn.success { background: #16a34a; }

.submit-text { display: flex; align-items: center; gap: 8px; }
.submit-spinner { display: flex; align-items: center; gap: 10px; }
.spinner {
  width: 16px; height: 16px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* Error alert */
.error-alert {
  display: flex; align-items: flex-start; gap: 8px;
  background: rgba(248,113,113,0.1);
  border: 1px solid rgba(248,113,113,0.2);
  border-radius: 8px;
  padding: 12px 14px;
  font-size: 13px; color: #f87171;
  margin-bottom: 12px;
}

/* Register link */
.register-link {
  text-align: center;
  font-size: 13px; color: var(--c-muted);
}
.register-link a {
  color: var(--c-red); text-decoration: none; font-weight: 600;
}
.register-link a:hover { text-decoration: underline; }

/* ── RESPONSIVE ── */
@media (max-width: 900px) {
  .main {
    align-items: flex-start;
    padding-top: 84px;
  }
  .auth-shell {
    grid-template-columns: 1fr;
    max-width: 440px;
  }
  .brand-panel { display: none; }
  .mobile-brand { display: flex; }
  .form-card { max-width: 100%; }
}
@media (max-width: 600px) {
  .form-title { font-size: 20px; }
  .form-card { padding: 22px 18px; border-radius: 16px; }
  .lp-preview-cards { display: none; }
}
.register-inline-link {
  color: #e63946;
  text-decoration: none;
  font-weight: 600;
  margin-left: 6px;
  transition: opacity 0.2s;
}
.register-inline-link:hover {
  opacity: 0.8;
}
.forgot-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}
.fun-popup {
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;

  display: flex;
  align-items: center;
  gap: 12px;

  background: rgba(15, 22, 41, 0.95);
  border: 1px solid rgba(230, 57, 70, 0.3);

  color: white;

  padding: 14px 22px;
  border-radius: 14px;

  backdrop-filter: blur(14px);

  box-shadow:
    0 10px 30px rgba(0,0,0,0.4),
    0 0 20px rgba(230,57,70,0.15);

  font-size: 14px;
  font-weight: 500;
}

.popup-emoji {
  font-size: 20px;
}

.popup-enter-active,
.popup-leave-active {
  transition: all 0.3s ease;
}

.popup-enter-from,
.popup-leave-to {
  opacity: 0;
  transform: translate(-50%, 20px);
}
</style>
