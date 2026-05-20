<template>
  <div class="register-page">

    <!-- Background -->
    <div class="page-bg">
      <div class="grid-overlay"></div>
      <div class="blob blob-1"></div>
      <div class="blob blob-2"></div>
      <div class="blob blob-3"></div>
    </div>

    <!-- Navbar -->
    <nav class="navbar">
      <div class="nav-inner">
        <router-link to="/" class="nav-logo">
          <InUniLogo />
        </router-link>

        <div class="nav-right">
          <span class="nav-hint">Уже есть аккаунт?</span>
          <router-link to="/login" class="btn-ghost">

            Войти

          </router-link>
        </div>
      </div>
    </nav>

    <!-- Main -->
    <main class="main">
      <div class="auth-shell">

        <!-- Branding -->
        <div class="brand-panel">
          <div class="lp-content">
            <div class="hero-badge">
              <span class="badge-dot"></span>
              Присоединяйся к InUni
            </div>

            <h1 class="lp-title">
              Начни строить<br>
              <span class="gradient-text">своё комьюнити.</span>
            </h1>

            <p class="lp-sub">
              Создай профиль, расскажи о себе и уже сегодня найди людей,
              с которыми тебе по пути — внутри своего университета.
            </p>

            <!-- Steps -->
            <div class="lp-steps">
              <div class="step active">
                <div class="step-num">1</div>
                <div class="step-body">
                  <div class="step-title">Регистрация</div>
                  <div class="step-desc">Имя, почта и пароль</div>
                </div>
              </div>
              <div class="step">
                <div class="step-num">2</div>
                <div class="step-body">
                  <div class="step-title">Профиль</div>
                  <div class="step-desc">Заполни в настройках профиля</div>
                </div>
              </div>
              <div class="step">
                <div class="step-num">3</div>
                <div class="step-body">
                  <div class="step-title">Интересы и роль</div>
                  <div class="step-desc">Для AI-матчинга — в профиле</div>
                </div>
              </div>
            </div>

            <!-- Floating profile preview -->
            <div class="lp-preview">
              <div class="preview-card">
                <div class="pv-top">
                  <div class="pv-avatar">
                    <span>{{ previewInitials }}</span>
                  </div>
                  <div class="pv-badge">Новый участник 🎉</div>
                </div>
                <div class="pv-name">{{ previewName || 'Твоё имя' }}</div>
                <div class="pv-role">{{ previewRole || 'Твоя роль' }}</div>
                <div class="pv-tags">
                  <span>InUni</span>
                  <span v-if="previewUniversity">{{ previewUniversity.split(' ')[0] }}</span>
                </div>
                <div class="pv-match-badge">MATCH! 🎉</div>
              </div>
              <div class="notif-bubble">
                <span class="notif-dot"></span>
                3 студента хотят познакомиться
              </div>
            </div>
          </div>
        </div>

        <!-- Form -->
        <div class="form-panel">
          <div class="form-card">

            <!-- Single Step: Account -->
            <div class="form-step">
              <div class="mobile-brand">
                <p>Присоединяйся к студенческой сети</p>
              </div>

              <div class="form-header">
                <h2 class="form-title">Создай аккаунт</h2>
                <p class="form-sub">Заполни профиль позже — прямо внутри InUni</p>
              </div>

              <div class="fields-row">
                <div class="field-group">
                  <label class="field-label">Имя</label>
                  <div class="field-wrap" :class="{ focused: focusedField === 'firstName', error: errors.firstName }">
                    <input v-model="form.firstName" type="text" placeholder="Алексей" class="field-input"
                           @focus="focusedField = 'firstName'" @blur="focusedField = null" />
                  </div>
                  <span v-if="errors.firstName" class="field-error">{{ errors.firstName }}</span>
                </div>
                <div class="field-group">
                  <label class="field-label">Фамилия</label>
                  <div class="field-wrap" :class="{ focused: focusedField === 'lastName', error: errors.lastName }">
                    <input v-model="form.lastName" type="text" placeholder="Ким" class="field-input"
                           @focus="focusedField = 'lastName'" @blur="focusedField = null" />
                  </div>
                  <span v-if="errors.lastName" class="field-error">{{ errors.lastName }}</span>
                </div>
              </div>

              <div class="field-group">
                <label class="field-label">Почта</label>
                <div class="field-wrap" :class="{ focused: focusedField === 'email', error: errors.email }">
                  <svg class="field-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  <input v-model="form.email" type="email" placeholder="you@university.edu" class="field-input"
                         @focus="focusedField = 'email'" @blur="focusedField = null" />
                </div>
                <span v-if="errors.email" class="field-error">{{ errors.email }}</span>
              </div>

              <div class="field-group">
                <label class="field-label">Пароль</label>
                <div class="field-wrap" :class="{ focused: focusedField === 'password', error: errors.password }">
                  <svg class="field-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  <input v-model="form.password" :type="showPassword ? 'text' : 'password'" placeholder="Минимум 8 символов" class="field-input"
                         @focus="focusedField = 'password'" @blur="focusedField = null" />
                  <button class="eye-btn" @click="showPassword = !showPassword" type="button">
                    <svg v-if="!showPassword" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                  </button>
                </div>
                <div class="pwd-strength" v-if="form.password">
                  <div class="pwd-bars">
                    <div v-for="i in 4" :key="i" class="pwd-bar" :class="{ active: passwordStrength >= i, ['s' + passwordStrength]: true }"></div>
                  </div>
                  <span class="pwd-label">{{ passwordStrengthLabel }}</span>
                </div>
                <span v-if="errors.password" class="field-error">{{ errors.password }}</span>
              </div>
            </div>

            <!-- Submit button -->
            <div class="form-nav">
              <div></div>
              <button
                class="submit-btn"
                :class="{ loading: isLoading, success: registerSuccess }"
                @click="handleRegister"
                :disabled="isLoading"
                type="button"
              >
                <span v-if="!isLoading && !registerSuccess" class="submit-text">
                  Вступить в InUni
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </span>
                <span v-if="isLoading" class="submit-spinner">
                  <span class="spinner"></span>
                  Создаём профиль…
                </span>
                <span v-if="registerSuccess" class="submit-ok">
                  ✓ Добро пожаловать в InUni!
                </span>
              </button>
            </div>

            <p class="login-link">
              Уже есть аккаунт?
              <router-link to="/login">
                Войти
              </router-link>
            </p>

          </div>
        </div>

      </div>
    </main>

  </div>
</template>

<script>
import InUniLogo from '../components/InUniLogo.vue'
import api from '@/services/api'

export default {
  name: 'RegisterPage',
  components: { InUniLogo },
  data() {
    return {
      showPassword: false,
      focusedField: null,
      isLoading: false,
      registerSuccess: false,
      form: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      },
      errors: {},
    };
  },
  computed: {
    previewInitials() {
      const f = this.form.firstName?.[0] || '';
      const l = this.form.lastName?.[0] || '';
      return (f + l).toUpperCase() || 'IU';
    },
    previewName() {
      return [this.form.firstName, this.form.lastName].filter(Boolean).join(' ');
    },
    previewRole() {
      return 'Новый участник';
    },
    previewUniversity() {
      return '';
    },
    passwordStrength() {
      const p = this.form.password;
      if (!p) return 0;
      let score = 0;
      if (p.length >= 8) score++;
      if (/[A-Z]/.test(p)) score++;
      if (/[0-9]/.test(p)) score++;
      if (/[^A-Za-z0-9]/.test(p)) score++;
      return score;
    },
    passwordStrengthLabel() {
      return ['', 'Слабый', 'Средний', 'Хороший', 'Отличный'][this.passwordStrength] || '';
    },
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

      try {

        await api.post('/auth/register', {
          firstName: this.form.firstName.trim(),
          lastName: this.form.lastName.trim(),
          email: this.form.email.trim(),
          password: this.form.password,
        });

        this.registerSuccess = true;

        setTimeout(() => {
          this.$router.push('/login');
        }, 700);

      } catch (error) {

        this.errors.password =
          error.response?.data?.message || 'Ошибка регистрации';

      } finally {

        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@400;600;700;900&family=Onest:wght@300;400;500;600&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

.register-page {
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

/* BG */
.page-bg { position: fixed; inset: 0; pointer-events: none; z-index: 0; }
.grid-overlay {
  position: absolute; inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
  background-size: 60px 60px;
  mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%);
}
.blob { position: absolute; border-radius: 50%; filter: blur(90px); opacity: 0.2; }
.blob-1 { width: 500px; height: 500px; background: #e63946; top: -150px; left: -150px; animation: blobFloat 9s ease-in-out infinite; }
.blob-2 { width: 350px; height: 350px; background: #1d4ed8; bottom: -100px; right: -100px; animation: blobFloat 12s ease-in-out infinite reverse; }
.blob-3 { width: 250px; height: 250px; background: #7c3aed; top: 50%; right: 30%; animation: blobFloat 10s ease-in-out infinite 2s; }
@keyframes blobFloat {
  0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(20px,-20px) scale(1.06)}
}

/* NAVBAR */
.navbar {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
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

/* BUTTONS */
.btn-ghost {
  display: inline-flex; align-items: center;
  color: var(--c-text); font-family: 'Onest', sans-serif;
  font-weight: 500; font-size: 14px; padding: 10px 18px;
  border-radius: 8px; text-decoration: none;
  border: 1px solid var(--c-border);
  transition: all 0.2s;
}
.btn-ghost:hover { background: rgba(255,255,255,0.06); border-color: rgba(255,255,255,0.15); }

/* MAIN LAYOUT */
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

/* BRAND PANEL */
.brand-panel {
  min-width: 0;
}
.lp-content { max-width: 460px; }

.hero-badge {
  display: inline-flex; align-items: center; gap: 8px;
  background: rgba(230,57,70,0.12); border: 1px solid rgba(230,57,70,0.3);
  color: #f87171; font-size: 12px; font-weight: 500;
  padding: 6px 14px; border-radius: 100px; margin-bottom: 24px;
}
.badge-dot {
  width: 6px; height: 6px; background: var(--c-red); border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
}
@keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.4)} }

.lp-title {
  font-family: 'Unbounded', sans-serif;
  font-size: clamp(28px, 3.5vw, 46px);
  font-weight: 800; line-height: 1.1;
  color: var(--c-white); margin-bottom: 16px; letter-spacing: -1px;
}
.gradient-text {
  background: linear-gradient(135deg, #e63946 0%, #f87171 50%, #fb923c 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}
.lp-sub { font-size: 14px; line-height: 1.65; color: var(--c-muted); margin-bottom: 32px; }

/* Steps */
.lp-steps { display: flex; flex-direction: column; gap: 16px; margin-bottom: 36px; }
.step {
  display: flex; gap: 14px; align-items: flex-start;
  opacity: 0.4; transition: opacity 0.3s;
}
.step.active { opacity: 1; }
.step-num {
  width: 28px; height: 28px; border-radius: 8px;
  background: rgba(255,255,255,0.06); border: 1px solid var(--c-border);
  display: grid; place-items: center;
  font-family: 'Unbounded', sans-serif; font-size: 11px; font-weight: 700; color: var(--c-muted);
  flex-shrink: 0; transition: all 0.3s;
}
.step.active .step-num {
  background: var(--c-red); border-color: var(--c-red); color: #fff;
}
.step-body { display: flex; flex-direction: column; gap: 2px; }
.step-title { font-family: 'Unbounded', sans-serif; font-size: 12px; font-weight: 700; color: var(--c-white); }
.step-desc { font-size: 11px; color: var(--c-muted); }

/* Preview card */
.lp-preview { position: relative; width: 280px; height: 180px; }
.preview-card {
  position: relative;
  background: var(--c-surface);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 16px; padding: 18px;
  box-shadow: 0 16px 48px rgba(0,0,0,0.5);
  animation: cardFloat 4s ease-in-out infinite;
}
@keyframes cardFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
.pv-top { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 10px; }
.pv-avatar {
  width: 44px; height: 44px; border-radius: 12px;
  background: linear-gradient(135deg, #e63946, #1d4ed8);
  display: grid; place-items: center;
}
.pv-avatar span { font-family: 'Unbounded', sans-serif; font-size: 12px; font-weight: 700; color: #fff; }
.pv-badge {
  background: rgba(52,211,153,0.12); border: 1px solid rgba(52,211,153,0.2);
  color: #34d399; font-size: 10px; font-weight: 600;
  padding: 3px 8px; border-radius: 100px;
}
.pv-name { font-family: 'Unbounded', sans-serif; font-size: 13px; font-weight: 700; color: #fff; margin-bottom: 2px; }
.pv-role { font-size: 11px; color: var(--c-muted); margin-bottom: 8px; }
.pv-tags { display: flex; gap: 5px; }
.pv-tags span {
  font-size: 10px; padding: 2px 8px; border-radius: 100px;
  background: rgba(59,130,246,0.1); color: #93c5fd; border: 1px solid rgba(59,130,246,0.2);
}
.pv-match-badge {
  position: absolute; top: -10px; right: 10px;
  background: linear-gradient(135deg, #e63946, #f97316);
  color: #fff; font-size: 9px; font-weight: 700;
  padding: 3px 8px; border-radius: 100px;
  font-family: 'Unbounded', sans-serif;
  animation: matchPop 1.5s ease-in-out infinite;
}
@keyframes matchPop { 0%,100%{transform:scale(1)} 50%{transform:scale(1.06)} }

.notif-bubble {
  position: absolute; bottom: -14px; right: -10px;
  background: var(--c-surface); border: 1px solid rgba(52,211,153,0.3);
  border-radius: 100px; padding: 6px 12px;
  font-size: 11px; font-weight: 500; color: #34d399;
  display: flex; align-items: center; gap: 6px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.4);
  animation: notifBounce 3s ease-in-out infinite; white-space: nowrap;
}
.notif-dot { width: 6px; height: 6px; border-radius: 50%; background: #34d399; animation: pulse 2s infinite; }
@keyframes notifBounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }

/* FORM PANEL */
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
.form-perks {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
}
.perk-chip {
  font-size: 11px;
  font-weight: 600;
  padding: 6px 12px;
  border-radius: 100px;
  background: rgba(230, 57, 70, 0.1);
  border: 1px solid rgba(230, 57, 70, 0.22);
  color: #f4a3a9;
}

/* Form header */
.form-step { animation: fadeSlide 0.3s ease; }
@keyframes fadeSlide { from { opacity: 0; transform: translateX(12px); } to { opacity: 1; transform: translateX(0); } }
.form-header { margin-bottom: 24px; }
.form-title { font-family: 'Unbounded', sans-serif; font-size: 22px; font-weight: 700; color: var(--c-white); margin-bottom: 6px; }
.form-sub { font-size: 13px; color: var(--c-muted); }

/* Fields */
.fields-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; min-width: 0; }
.field-group { margin-bottom: 14px; min-width: 0; }
.field-label {
  display: block; font-size: 11px; font-weight: 600;
  color: var(--c-muted); letter-spacing: 0.04em;
  text-transform: uppercase; margin-bottom: 7px;
  font-family: 'Unbounded', sans-serif;
}
.field-wrap {
  display: flex; align-items: center; gap: 10px;
  background: rgba(255,255,255,0.03);
  border: 1.5px solid var(--c-border); border-radius: 10px;
  padding: 0 14px; transition: all 0.2s;
}
.field-wrap.focused { border-color: var(--c-red); background: rgba(230,57,70,0.04); box-shadow: 0 0 0 3px rgba(230,57,70,0.1); }
.field-wrap.error { border-color: #f87171; box-shadow: 0 0 0 3px rgba(248,113,113,0.1); }
.field-wrap.textarea-wrap { padding: 12px 14px; align-items: flex-start; }
.field-icon { color: var(--c-muted); flex-shrink: 0; }
.field-input {
  flex: 1; background: none; border: none; outline: none;
  color: var(--c-white); font-family: 'Onest', sans-serif;
  font-size: 14px; padding: 12px 0;
}
.field-input::placeholder { color: rgba(122,128,160,0.6); }
.field-select {
  cursor: pointer;
  -webkit-appearance: none;
}
.field-select option { background: var(--c-card); color: var(--c-text); }
.field-textarea { resize: none; padding: 0; line-height: 1.6; }
.field-error { display: block; font-size: 11px; color: #f87171; margin-top: 4px; }

.eye-btn { background: none; border: none; cursor: pointer; color: var(--c-muted); display: flex; align-items: center; padding: 4px; transition: color 0.2s; }
.eye-btn:hover { color: var(--c-text); }

/* Password strength */
.pwd-strength { display: flex; align-items: center; gap: 8px; margin-top: 7px; }
.pwd-bars { display: flex; gap: 4px; }
.pwd-bar { width: 36px; height: 3px; border-radius: 3px; background: rgba(255,255,255,0.07); transition: background 0.3s; }
.pwd-bar.active.s1 { background: #f87171; }
.pwd-bar.active.s2 { background: #fb923c; }
.pwd-bar.active.s3 { background: #facc15; }
.pwd-bar.active.s4 { background: #34d399; }
.pwd-label { font-size: 11px; color: var(--c-muted); }

/* Roles grid */
.roles-grid { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 4px; }
.role-btn {
  font-size: 12px; padding: 6px 14px; border-radius: 100px;
  background: rgba(255,255,255,0.04); color: var(--c-muted);
  border: 1px solid var(--c-border); cursor: pointer;
  font-family: 'Onest', sans-serif; font-weight: 500;
  transition: all 0.18s;
}
.role-btn:hover { border-color: rgba(230,57,70,0.3); color: var(--c-text); }
.role-btn.selected { background: rgba(230,57,70,0.12); color: #f87171; border-color: rgba(230,57,70,0.4); }

/* Interests */
.interests-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 8px; margin-bottom: 12px; }
.interest-btn {
  display: flex; align-items: center; gap: 7px;
  font-size: 12px; padding: 9px 12px; border-radius: 10px;
  background: rgba(255,255,255,0.03); color: var(--c-muted);
  border: 1px solid var(--c-border); cursor: pointer;
  font-family: 'Onest', sans-serif; font-weight: 500;
  transition: all 0.18s; text-align: left;
}
.interest-btn:hover { border-color: rgba(230,57,70,0.3); color: var(--c-text); }
.interest-btn.selected { background: rgba(230,57,70,0.1); color: #f87171; border-color: rgba(230,57,70,0.35); }
.interest-icon { font-size: 14px; }
.interests-count { font-size: 12px; color: var(--c-muted); margin-bottom: 4px; transition: color 0.2s; }
.interests-count.ok { color: #34d399; }

/* Form nav */
.form-nav { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-top: 20px; margin-bottom: 14px; }
.btn-back {
  display: flex; align-items: center; gap: 6px;
  background: none; border: 1px solid var(--c-border);
  color: var(--c-muted); font-family: 'Onest', sans-serif;
  font-size: 14px; font-weight: 500; padding: 11px 20px;
  border-radius: 8px; cursor: pointer; transition: all 0.2s;
}
.btn-back:hover { border-color: rgba(255,255,255,0.2); color: var(--c-text); }

.submit-btn {
  display: flex; align-items: center; justify-content: center; gap: 8px;
  background: var(--c-red); color: #fff;
  font-family: 'Onest', sans-serif; font-weight: 700; font-size: 14px;
  padding: 13px 24px; border-radius: 10px;
  border: none; cursor: pointer; transition: all 0.2s;
  min-height: 48px; flex: 1;
}
.submit-btn:hover:not(:disabled) { background: #c62d39; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(230,57,70,0.3); }
.submit-btn:disabled { opacity: 0.8; cursor: default; transform: none; }
.submit-btn.success { background: #16a34a; }
.submit-text { display: flex; align-items: center; gap: 8px; }
.submit-spinner { display: flex; align-items: center; gap: 8px; }
.spinner {
  width: 16px; height: 16px;
  border: 2px solid rgba(255,255,255,0.3); border-top-color: #fff;
  border-radius: 50%; animation: spin 0.7s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

.login-link { text-align: center; font-size: 13px; color: var(--c-muted); }
.login-link a { color: var(--c-red); text-decoration: none; font-weight: 600; }
.login-link a:hover { text-decoration: underline; }

/* RESPONSIVE */
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
  .lp-preview { display: none; }
}
@media (max-width: 480px) {
  .fields-row { grid-template-columns: 1fr; }
}
@media (max-width: 600px) {
  .form-title { font-size: 20px; }
  .form-card { padding: 22px 18px; border-radius: 16px; }
}
</style>
