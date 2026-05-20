<template>
  <AppShell>
    <div class="page-bg">
      <div class="blob blob-1"></div>
      <div class="blob blob-2"></div>
      <div class="grid-overlay"></div>
    </div>

    <div class="page-inner">
      <div class="page-header">
        <div>
          <div class="page-label">Личный кабинет</div>
          <h1 class="page-title">Мой профиль</h1>
          <p class="page-sub">Профиль внутри сети {{ universityName }} — направление, навыки и фото для знакомств.</p>
        </div>
        <div class="header-actions">
          <button v-if="!isEditing" class="btn-primary" @click="startEditing">Редактировать профиль</button>
          <div v-else class="header-actions editing-actions">
            <button class="btn-outline" @click="cancelEditing">Отмена</button>
            <button class="btn-primary" @click="saveProfile">Сохранить</button>
          </div>
        </div>
      </div>

      <div class="profile-layout">
        <section class="profile-card hero-card">
          <div class="profile-header">
            <div class="avatar-block">
              <div class="profile-avatar" :class="{ 'profile-avatar--photo': !!displayPhoto }">
                <img v-if="displayPhoto" :src="displayPhoto" alt="Фото профиля" class="avatar-image" />
                <span v-else class="avatar-initials">{{ initials }}</span>
              </div>
              <label v-if="isEditing" class="avatar-upload-btn">
                <input
                  :key="photoInputKey"
                  type="file"
                  accept="image/*"
                  class="sr-only"
                  @change="onProfilePhotoSelected"
                />
                {{ displayPhoto ? 'Сменить фото' : 'Загрузить фото' }}
              </label>
              <button
                v-if="isEditing && displayPhoto"
                type="button"
                class="avatar-upload-btn avatar-upload-btn--ghost"
                @click="openPhotoCropEditor"
              >
                Обрезать и повернуть
              </button>
              <button
                v-else-if="!profile.profilePhoto"
                type="button"
                class="avatar-upload-btn avatar-upload-btn--ghost"
                @click="startEditing"
              >
                Добавить фото
              </button>
              <button
                v-else
                type="button"
                class="avatar-upload-btn avatar-upload-btn--ghost"
                @click="startEditing"
              >
                Изменить фото
              </button>
              <button
                v-if="isEditing && draftProfilePhoto"
                type="button"
                class="avatar-remove-btn"
                @click="removeProfilePhoto"
              >
                Удалить
              </button>
            </div>
            <div class="profile-head-copy">
              <span class="university-pill">{{ universityName }}</span>
              <template v-if="isEditing">
                <div class="form-grid">
                  <div class="form-group">
                    <label>Имя</label>
                    <input v-model="draftProfile.firstName" type="text" placeholder="Айдар" />
                  </div>
                  <div class="form-group">
                    <label>Фамилия</label>
                    <input v-model="draftProfile.lastName" type="text" placeholder="Бахытов" />
                  </div>
                </div>
                <div class="form-group">
                  <label>Роль / специализация</label>
                  <input v-model="draftProfile.role" type="text" placeholder="Frontend Dev" />
                </div>
              </template>
              <template v-else>
                <h2>{{ profile.firstName }} {{ profile.lastName }}</h2>
                <p>{{ profile.role }}</p>
                <p class="education-line">{{ profile.education }}</p>
              </template>
            </div>
          </div>

          <div class="profile-stats">
            <div class="stat-card">
              <span class="stat-label">Заявок и откликов</span>
              <span class="stat-value">{{ stats.applications }}</span>
            </div>
            <div class="stat-card">
              <span class="stat-label">События / слоты</span>
              <span class="stat-value">{{ stats.events }} / {{ stats.slots }}</span>
            </div>
            <div class="stat-card">
              <span class="stat-label">Профиль заполнен</span>
              <span class="stat-value">{{ completion }}%</span>
            </div>
          </div>
        </section>

        <section class="profile-card">
          <div class="section-header">
            <div>
              <div class="section-kicker">Основное</div>
              <h3>О себе</h3>
            </div>
          </div>
          <div v-if="isEditing" class="section-stack">
            <p class="internal-note">{{ universityTagline }}</p>
            <div class="form-grid">
              <div class="form-group">
                <label>Направление</label>
                <select v-model="draftProfile.direction">
                  <option disabled value="">Выберите направление</option>
                  <option v-for="dir in directionOptions" :key="dir" :value="dir">{{ dir }}</option>
                </select>
              </div>
              <div class="form-group">
                <label>Курс</label>
                <select v-model="draftProfile.course">
                  <option disabled value="">Выберите курс</option>
                  <option v-for="course in courseOptions" :key="course" :value="course">{{ course }}</option>
                </select>
              </div>
            </div>
            <div class="form-grid">
              <div class="form-group">
                <label>Email</label>
                <input v-model="draftProfile.email" type="email" />
              </div>
            </div>
            <div class="form-group">
              <label>О себе</label>
              <textarea v-model="draftProfile.about" rows="4"></textarea>
            </div>
          </div>
          <div v-else class="section-stack">
            <p class="section-text">{{ profile.about }}</p>
            <div class="meta-row">
              <span class="meta-chip"><AppIcon name="graduation" :size="14" />{{ profile.education }}</span>
              <span class="meta-chip"><AppIcon name="chat" :size="14" />{{ profile.email }}</span>
            </div>
          </div>
        </section>

        <section class="profile-card">
          <div class="section-header">
            <div>
              <div class="section-kicker">Навыки</div>
              <h3>Навыки и интересы</h3>
            </div>
          </div>
          <div v-if="isEditing" class="section-stack">
            <p class="skills-hint">Выбери навыки — они отобразятся в знакомствах и поиске команды.</p>
            <div class="skills-grid">
              <button
                v-for="skill in skillOptions"
                :key="skill"
                type="button"
                class="skill-chip"
                :class="{ selected: draftSkills.includes(skill) }"
                @click="toggleSkill(skill)"
              >{{ skill }}</button>
            </div>
            <p class="skills-count" :class="{ ok: draftSkills.length >= 3 }">
              Выбрано: {{ draftSkills.length }} (минимум 3)
            </p>
          </div>
          <div v-else class="tags-list">
            <span v-for="interest in profile.interests" :key="interest" class="interest-tag">{{ interest }}</span>
          </div>
        </section>

        <section class="profile-card">
          <div class="section-header">
            <div>
              <div class="section-kicker">Контакты</div>
              <h3>GitHub и LinkedIn</h3>
            </div>
          </div>
          <div class="section-stack">
            <div v-if="isEditing" class="form-grid">
              <div class="form-group">
                <label>GitHub</label>
                <input v-model="draftProfile.github" type="url" placeholder="https://github.com/username" />
              </div>
              <div class="form-group">
                <label>LinkedIn</label>
                <input v-model="draftProfile.linkedin" type="url" placeholder="https://linkedin.com/in/username" />
              </div>
            </div>
            <div v-else class="links-grid">
              <a class="link-card" :href="profile.github" target="_blank" rel="noreferrer">
                <span class="link-icon">GH</span>
                <div>
                  <span class="link-label">GitHub</span>
                  <span class="link-value">{{ profile.githubHandle }}</span>
                </div>
              </a>
              <a class="link-card" :href="profile.linkedin" target="_blank" rel="noreferrer">
                <span class="link-icon">in</span>
                <div>
                  <span class="link-label">LinkedIn</span>
                  <span class="link-value">{{ profile.linkedinHandle }}</span>
                </div>
              </a>
            </div>
          </div>
        </section>




        <!-- ── AI ADVISOR ── -->
        <section class="profile-card ai-card">
          <div class="section-header ai-section-header">
            <div>
              <div class="section-kicker ai-kicker">✨ AI-советник</div>
              <h3>Рекомендации по профилю</h3>
            </div>
            <button
              class="btn-ai"
              :class="{ loading: aiLoading }"
              :disabled="aiLoading"
              @click="analyzeProfile"
            >
              <span v-if="aiLoading" class="ai-spinner"></span>
              <span v-else>🤖</span>
              {{ aiLoading ? 'Анализирую...' : 'Проанализировать' }}
            </button>
          </div>

          <div v-if="aiError" class="ai-error">{{ aiError }}</div>

          <div v-if="!aiRecommendations.length && !aiLoading && !aiError" class="ai-empty">
            <p>AI проанализирует твой профиль и даст конкретные советы — как улучшить «О себе», какие навыки добавить, как лучше описать роль для хакатонов.</p>
          </div>

          <div v-if="aiRecommendations.length" class="ai-recs">
            <div
              v-for="(rec, i) in aiRecommendations"
              :key="i"
              class="ai-rec-item"
              :class="`ai-rec--${rec.type}`"
            >
              <span class="ai-rec-icon">{{ rec.icon }}</span>
              <div class="ai-rec-body">
                <strong>{{ rec.title }}</strong>
                <p>{{ rec.text }}</p>
              </div>
            </div>
          </div>

          <div v-if="isEditing" class="ai-generate-bio">
            <button
              class="btn-ai-ghost"
              :disabled="aiGeneratingBio"
              @click="generateBio"
            >
              <span v-if="aiGeneratingBio" class="ai-spinner ai-spinner--dark"></span>
              {{ aiGeneratingBio ? 'Генерирую...' : '✨ Написать «О себе» с помощью AI' }}
            </button>
            <p class="ai-bio-hint">AI напишет текст на основе твоей роли, навыков и направления</p>
          </div>
        </section>

        <section class="profile-card">
          <div class="section-header">
            <div>
              <div class="section-kicker">Активность</div>
              <h3>Последние действия</h3>
            </div>
          </div>
          <div v-if="recentActivity.length" class="activity-list">
            <div v-for="item in recentActivity" :key="item.id" class="activity-item">
              <span class="activity-icon"><AppIcon :name="item.icon" :size="16" /></span>
              <div class="activity-copy">
                <strong>{{ item.title }}</strong>
                <span>{{ item.subtitle }}</span>
              </div>
              <span class="activity-status">{{ item.status }}</span>
            </div>
          </div>
          <div v-else class="section-text">
            Пока нет активности. Заполни профиль и начни подавать заявки на хакатоны и проекты.
          </div>
        </section>
      </div>
    </div>
  </AppShell>

  <PhotoCropModal
    :visible="showPhotoCrop"
    :image-src="cropSourceImage"
    @cancel="closePhotoCrop"
    @apply="onPhotoCropApply"
  />

  <transition name="toast-fade">
    <div v-if="toastMessage" class="toast">{{ toastMessage }}</div>
  </transition>
</template>

<script>
import AppIcon from '../components/AppIcon.vue'
import AppShell from '../components/AppShell.vue'
import PhotoCropModal from '../components/PhotoCropModal.vue'
import { createInitials, getHandle, loadAppState, patchAppState } from '../lib/appState'
import {
  buildEducation,
  buildFullName,
  COURSE_OPTIONS,
  DIRECTION_OPTIONS,
  SKILL_OPTIONS,
  UNIVERSITY_NAME,
  UNIVERSITY_TAGLINE,
} from '../lib/universityProfile'

export default {
  name: 'ProfilePage',
  components: {
    AppIcon,
    AppShell,
    PhotoCropModal,
  },
  data() {
    const state = loadAppState()
    const profile = {
      ...state.profile,
      direction: state.profile.direction || '',
      course: state.profile.course || '3 курс',
      profilePhoto: state.profile.profilePhoto || '',
      githubHandle: getHandle(state.profile.github),
      linkedinHandle: getHandle(state.profile.linkedin),
    }
    return {
      profile,
      draftProfile: { ...profile, interests: [...profile.interests] },
      draftProfilePhoto: profile.profilePhoto || '',
      draftSkills: [...profile.interests],
      teamApplications: state.teamApplications || [],
      universityName: UNIVERSITY_NAME,
      universityTagline: UNIVERSITY_TAGLINE,
      directionOptions: DIRECTION_OPTIONS,
      courseOptions: COURSE_OPTIONS,
      skillOptions: SKILL_OPTIONS,
      isEditing: false,
      showPhotoCrop: false,
      cropSourceImage: '',
      photoInputKey: 0,
      toastMessage: '',
      toastTimer: null,
      // AI advisor
      aiLoading: false,
      aiGeneratingBio: false,
      aiError: '',
      aiRecommendations: [],
      ANTHROPIC_KEY: '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',
    }
  },
  computed: {
    displayPhoto() {
      return this.isEditing ? this.draftProfilePhoto : this.profile.profilePhoto
    },
    initials() {
      return createInitials(this.profile.firstName, this.profile.lastName)
    },
    completion() {
      const fields = [
        this.profile.firstName,
        this.profile.lastName,
        this.profile.role,
        this.profile.direction,
        this.profile.course,
        this.profile.email,
        this.profile.about,
        this.profile.profilePhoto,
      ]
      const filled = fields.filter(Boolean).length + (this.profile.interests.length >= 3 ? 1 : 0)
      return Math.round((filled / 9) * 100)
    },
    stats() {
      const apps = this.teamApplications
      return {
        applications: apps.length,
        events: apps.filter((a) => a.kind === 'event').length,
        slots: apps.filter((a) => a.kind === 'slot').length,
      }
    },
    recentActivity() {
      return this.teamApplications.map((item) => ({
        id: item.id,
        icon: item.kind === 'event' ? 'trophy' : 'folder',
        title: item.title,
        subtitle: item.role || 'Участник',
        status: item.statusLabel,
      })).slice(0, 5)
    },
  },
  methods: {
    startEditing() {
      this.isEditing = true
      this.draftProfile = { ...this.profile, interests: [...this.profile.interests] }
      this.draftProfilePhoto = this.profile.profilePhoto || ''
      this.draftSkills = [...this.profile.interests]
    },
    cancelEditing() {
      this.isEditing = false
      this.draftProfile = { ...this.profile, interests: [...this.profile.interests] }
      this.draftProfilePhoto = this.profile.profilePhoto || ''
      this.draftSkills = [...this.profile.interests]
    },
    toggleSkill(skill) {
      const i = this.draftSkills.indexOf(skill)
      if (i >= 0) this.draftSkills.splice(i, 1)
      else this.draftSkills.push(skill)
    },
    onProfilePhotoSelected(event) {
      const file = event.target.files?.[0]
      if (!file) return

      if (!file.type.startsWith('image/')) {
        this.showToast('Выбери файл изображения')
        event.target.value = ''
        return
      }

      const reader = new FileReader()
      reader.onload = () => {
        this.cropSourceImage = reader.result
        this.showPhotoCrop = true
      }
      reader.readAsDataURL(file)
      event.target.value = ''
      this.photoInputKey += 1
    },
    openPhotoCropEditor() {
      if (!this.draftProfilePhoto) return
      this.cropSourceImage = this.draftProfilePhoto
      this.showPhotoCrop = true
    },
    closePhotoCrop() {
      this.showPhotoCrop = false
      this.cropSourceImage = ''
    },
    onPhotoCropApply(dataUrl) {
      this.draftProfilePhoto = dataUrl
      this.closePhotoCrop()
      this.showToast('Фото настроено')
    },
    removeProfilePhoto() {
      this.draftProfilePhoto = ''
      this.closePhotoCrop()
    },
    saveProfile() {
      const fullName = buildFullName(this.draftProfile.firstName, this.draftProfile.lastName)
      const education = buildEducation(this.draftProfile.direction, this.draftProfile.course)

      this.profile = {
        ...this.draftProfile,
        fullName,
        interests: [...this.draftSkills],
        profilePhoto: this.draftProfilePhoto,
        education,
        githubHandle: getHandle(this.draftProfile.github),
        linkedinHandle: getHandle(this.draftProfile.linkedin),
      }
      patchAppState({
        profile: {
          firstName: this.profile.firstName,
          lastName: this.profile.lastName,
          fullName: this.profile.fullName,
          role: this.profile.role,
          direction: this.profile.direction,
          course: this.profile.course,
          education: this.profile.education,
          email: this.profile.email,
          about: this.profile.about,
          interests: this.profile.interests,
          profilePhoto: this.profile.profilePhoto,
          github: this.profile.github,
          linkedin: this.profile.linkedin,
        },
      })
      this.isEditing = false
      this.showToast('Профиль обновлён')
    },
    showToast(message) {
      this.toastMessage = message
      if (this.toastTimer) clearTimeout(this.toastTimer)
      this.toastTimer = setTimeout(() => {
        this.toastMessage = ''
      }, 2400)
    },

    // ── AI METHODS ──
    async callAI(systemPrompt, userMessage) {
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.ANTHROPIC_KEY,
        },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant',
          max_tokens: 1000,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userMessage },
          ],
        }),
      })
      if (!res.ok) {
        const e = await res.json().catch(() => ({}))
        throw new Error(e.error?.message || `HTTP ${res.status}`)
      }
      const data = await res.json()
      return data.choices?.[0]?.message?.content || ''
    },

    async analyzeProfile() {
      this.aiLoading = true
      this.aiError = ''
      this.aiRecommendations = []
      const p = this.profile
      try {
        const profileSummary = `
Имя: ${p.firstName} ${p.lastName}
Роль: ${p.role || 'не указана'}
Направление: ${p.direction || 'не указано'}
Курс: ${p.course || 'не указан'}
О себе: ${p.about || 'не заполнено'}
Навыки: ${(p.interests || []).join(', ') || 'не выбраны'}
GitHub: ${p.github || 'не указан'}
LinkedIn: ${p.linkedin || 'не указан'}
Заполненность профиля: ${this.completion}%
        `.trim()

        const systemPrompt = `Ты — AI-советник платформы InUni для студентов IT-специальностей.
Анализируй профиль студента и давай конкретные, практичные рекомендации на русском языке.
Отвечай ТОЛЬКО валидным JSON-массивом без markdown, без пояснений вне JSON.
Формат каждого элемента: {"type": "tip|warning|success", "icon": "emoji", "title": "короткий заголовок", "text": "конкретный совет 1-2 предложения"}
Типы: "success" — что уже хорошо, "warning" — что срочно надо заполнить, "tip" — как улучшить.
Давай 4-5 рекомендаций. Будь конкретным, не общим.`

        const raw = await this.callAI(systemPrompt, `Проанализируй профиль студента:
${profileSummary}`)
        const cleaned = raw.replace(/```json|```/g, '').trim()
        this.aiRecommendations = JSON.parse(cleaned)
      } catch (e) {
        this.aiError = 'Ошибка AI: ' + e.message
      } finally {
        this.aiLoading = false
      }
    },

    async generateBio() {
      this.aiGeneratingBio = true
      const p = this.draftProfile
      try {
        const systemPrompt = `Ты — помощник для студентов IT. Пиши «О себе» для профиля на платформе студенческого нетворкинга.
Стиль: живой, профессиональный, не шаблонный. 3-4 предложения на русском языке.
Не начинай с "Я студент". Упомяни роль, навыки и чем интересен человек для команды.
Отвечай ТОЛЬКО текстом без кавычек, пояснений и markdown.`

        const userMsg = `Напиши «О себе» для:
Имя: ${p.firstName} ${p.lastName}
Роль: ${p.role || 'разработчик'}
Направление: ${p.direction || 'IT'}
Курс: ${p.course || ''}
Навыки: ${this.draftSkills.join(', ') || 'не указаны'}`

        const bio = await this.callAI(systemPrompt, userMsg)
        this.draftProfile.about = bio.trim()
        this.showToast('✨ «О себе» сгенерировано')
      } catch (e) {
        this.showToast('Ошибка генерации: ' + e.message)
      } finally {
        this.aiGeneratingBio = false
      }
    },
  },
  beforeUnmount() {
    if (this.toastTimer) clearTimeout(this.toastTimer)
  },
}

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@400;600;700;800;900&family=Onest:wght@400;500;600;700&display=swap');

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
    linear-gradient(rgba(255, 255, 255, 0.018) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.018) 1px, transparent 1px);
  background-size: 60px 60px;
  mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%);
}

.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.18;
}

.blob-1 {
  width: 500px;
  height: 500px;
  background: #e63946;
  top: -100px;
  right: 0;
}

.blob-2 {
  width: 400px;
  height: 400px;
  background: #1d4ed8;
  bottom: 100px;
  left: 100px;
}

.page-inner {
  position: relative;
  z-index: 1;
  padding: 40px;
  max-width: 1180px;
}

.page-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 28px;
}

.page-label,
.section-kicker {
  font-family: 'Unbounded', sans-serif;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--c-red);
}

.page-label {
  margin-bottom: 8px;
}

.page-title {
  font-family: 'Unbounded', sans-serif;
  font-size: 32px;
  font-weight: 800;
  color: var(--c-white);
  margin: 0 0 6px;
}

.page-sub {
  font-size: 14px;
  color: var(--c-muted);
  margin: 0;
}

.profile-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
  gap: 20px;
}

.hero-card {
  grid-column: 1 / -1;
}

.profile-card {
  background: var(--c-card);
  border: 1px solid var(--c-border);
  border-radius: 16px;
  padding: 24px;
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 24px;
}

/* avatar sizing — see .avatar-block .profile-avatar below */

.profile-head-copy {
  flex: 1;
}

.profile-head-copy h2,
.section-header h3 {
  font-family: 'Unbounded', sans-serif;
  color: var(--c-white);
  margin: 0;
}

.profile-head-copy h2 {
  font-size: 24px;
  margin-bottom: 6px;
}

.profile-head-copy p {
  font-size: 14px;
  color: var(--c-muted);
  margin: 0;
}

.profile-stats,
.links-grid,
.form-grid,
.meta-row {
  display: grid;
  gap: 12px;
}

.profile-stats {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.stat-card,
.link-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--c-border);
  border-radius: 12px;
}

.stat-card {
  padding: 16px;
}

.stat-label {
  display: block;
  font-size: 12px;
  color: var(--c-muted);
  margin-bottom: 8px;
}

.stat-value {
  font-family: 'Unbounded', sans-serif;
  font-size: 22px;
  color: var(--c-white);
}

.section-header {
  margin-bottom: 16px;
}

.section-stack {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.section-text {
  margin: 0;
  font-size: 14px;
  color: var(--c-text);
  line-height: 1.7;
}

.section-note {
  margin: 0;
  font-size: 12px;
  color: var(--c-muted);
  line-height: 1.6;
}

.meta-row {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.meta-chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--c-border);
  font-size: 13px;
  color: var(--c-text);
}

.tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.interest-tag {
  font-size: 12px;
  padding: 7px 14px;
  border-radius: 999px;
  background: rgba(230, 57, 70, 0.1);
  color: #f87171;
  border: 1px solid rgba(230, 57, 70, 0.25);
}

.links-grid,
.form-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.link-card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px;
  text-decoration: none;
  color: inherit;
}

.link-icon {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: rgba(230, 57, 70, 0.12);
  border: 1px solid rgba(230, 57, 70, 0.18);
  color: #fff;
  font-weight: 700;
  display: grid;
  place-items: center;
  flex-shrink: 0;
}

.link-label,
.form-group label {
  display: block;
  font-size: 12px;
  color: var(--c-muted);
}

.link-value {
  display: block;
  margin-top: 4px;
  font-size: 14px;
  color: var(--c-white);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.photo-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
}

.photo-slot {
  position: relative;
  aspect-ratio: 3 / 4;
  border-radius: 14px;
  border: 1px dashed rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.03);
  overflow: hidden;
}

.photo-slot.filled {
  border-style: solid;
}

.photo-preview {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.photo-upload,
.photo-placeholder {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  text-align: center;
  padding: 12px;
  font-size: 12px;
  color: var(--c-muted);
}

.photo-upload {
  cursor: pointer;
}

.photo-upload input {
  display: none;
}

.photo-remove {
  position: absolute;
  right: 8px;
  bottom: 8px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  background: rgba(8, 12, 26, 0.75);
  color: var(--c-white);
  border-radius: 8px;
  padding: 6px 8px;
  font-size: 11px;
  cursor: pointer;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.activity-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px solid var(--c-border);
  background: rgba(255, 255, 255, 0.03);
}

.activity-icon {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: grid;
  place-items: center;
  background: rgba(230, 57, 70, 0.1);
}

.activity-copy {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.activity-copy strong {
  font-size: 14px;
  color: var(--c-white);
}

.activity-copy span,
.activity-status {
  font-size: 12px;
  color: var(--c-muted);
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.03);
  border-radius: 10px;
  padding: 12px 14px;
  color: var(--c-text);
  font-family: 'Onest', sans-serif;
  font-size: 14px;
  outline: none;
  resize: vertical;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  border-color: rgba(230, 57, 70, 0.4);
}

.btn-primary,
.btn-outline {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border-radius: 8px;
  font-family: 'Onest', sans-serif;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary {
  border: none;
  background: var(--c-red);
  color: #fff;
  padding: 10px 18px;
}

.btn-primary:hover {
  background: #c62d39;
}

.btn-outline {
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: transparent;
  color: var(--c-text);
  padding: 10px 18px;
}

.editing-actions {
  gap: 10px;
}

.toast {
  position: fixed;
  right: 24px;
  bottom: 24px;
  background: #131a30;
  border: 1px solid rgba(230, 57, 70, 0.24);
  color: var(--c-white);
  padding: 14px 18px;
  border-radius: 12px;
  z-index: 220;
}

.toast-fade-enter-active,
.toast-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.toast-fade-enter-from,
.toast-fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

@media (max-width: 980px) {
  .profile-layout,
  .links-grid,
  .form-grid,
  .meta-row {
    grid-template-columns: 1fr;
  }

  .photo-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 760px) {
  .page-inner {
    padding: 24px 18px 40px;
  }

  .page-header,
  .profile-header,
  .profile-stats {
    display: flex;
    flex-direction: column;
  }

  .photo-grid {
    grid-template-columns: 1fr;
  }
}


.avatar-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}

.profile-avatar {
  width: 112px;
  height: 112px;
  border-radius: 50%;
  background: linear-gradient(135deg, #e63946, #1d4ed8);
  display: grid;
  place-items: center;
  overflow: hidden;
  border: 3px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.35);
}

.profile-avatar--photo {
  border-color: rgba(230, 57, 70, 0.35);
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-initials {
  font-family: 'Unbounded', sans-serif;
  font-size: 28px;
  font-weight: 700;
  color: #fff;
}

.avatar-upload-btn,
.avatar-remove-btn {
  font-family: 'Onest', sans-serif;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  border-radius: 100px;
  padding: 8px 14px;
  border: none;
  transition: all 0.2s;
}

.avatar-upload-btn {
  background: var(--c-red);
  color: #fff;
}

.avatar-upload-btn:hover {
  background: #c62d39;
}

.avatar-upload-btn--ghost {
  background: rgba(255, 255, 255, 0.06);
  color: var(--c-text);
  border: 1px solid var(--c-border);
}

.avatar-remove-btn {
  background: transparent;
  color: #f87171;
  border: 1px solid rgba(248, 113, 113, 0.3);
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

.university-pill {
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #f87171;
  background: rgba(230, 57, 70, 0.12);
  border: 1px solid rgba(230, 57, 70, 0.28);
  border-radius: 100px;
  padding: 5px 12px;
  margin-bottom: 10px;
}

.education-line {
  font-size: 13px;
  color: var(--c-muted);
  margin-top: 4px;
}

.internal-note {
  font-size: 12px;
  color: var(--c-muted);
  margin: 0 0 4px;
  line-height: 1.5;
}

.name-grid {
  margin-top: 8px;
}

.skills-hint {
  font-size: 13px;
  color: var(--c-muted);
  margin: 0;
}

.skills-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.skill-chip {
  font-family: 'Onest', sans-serif;
  font-size: 12px;
  font-weight: 600;
  padding: 7px 14px;
  border-radius: 100px;
  border: 1px solid var(--c-border);
  background: rgba(255, 255, 255, 0.03);
  color: var(--c-muted);
  cursor: pointer;
  transition: all 0.15s;
}

.skill-chip:hover {
  color: var(--c-text);
  border-color: rgba(255, 255, 255, 0.15);
}

.skill-chip.selected {
  background: var(--c-red-dim);
  color: var(--c-red);
  border-color: rgba(230, 57, 70, 0.35);
}

.skills-count {
  font-size: 12px;
  color: var(--c-muted);
  margin: 0;
}

.skills-count.ok {
  color: #4ade80;
}

.profile-header {
  align-items: flex-start;
}

/* ── AI ADVISOR STYLES ── */
.ai-card {
  grid-column: 1 / -1;
  border-color: rgba(168, 85, 247, 0.25);
  background: linear-gradient(135deg, rgba(168, 85, 247, 0.04) 0%, var(--c-card) 60%);
}

.ai-section-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 16px;
}

.ai-kicker {
  color: #a855f7 !important;
}

.btn-ai {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 18px;
  border-radius: 8px;
  border: 1px solid rgba(168, 85, 247, 0.4);
  background: rgba(168, 85, 247, 0.12);
  color: #c084fc;
  font-family: 'Onest', sans-serif;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  flex-shrink: 0;
}

.btn-ai:hover:not(:disabled) {
  background: rgba(168, 85, 247, 0.22);
  border-color: rgba(168, 85, 247, 0.6);
}

.btn-ai:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-ai-ghost {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 8px;
  border: 1px dashed rgba(168, 85, 247, 0.35);
  background: transparent;
  color: #a78bfa;
  font-family: 'Onest', sans-serif;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  width: 100%;
  justify-content: center;
}

.btn-ai-ghost:hover:not(:disabled) {
  background: rgba(168, 85, 247, 0.08);
}

.btn-ai-ghost:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.ai-spinner {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 2px solid rgba(168, 85, 247, 0.3);
  border-top-color: #a855f7;
  animation: spin 0.7s linear infinite;
  flex-shrink: 0;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.ai-empty p {
  font-size: 13px;
  color: var(--c-muted);
  margin: 0;
  line-height: 1.7;
}

.ai-error {
  font-size: 13px;
  color: #f87171;
  padding: 10px 14px;
  border-radius: 10px;
  border: 1px solid rgba(248, 113, 113, 0.2);
  background: rgba(248, 113, 113, 0.06);
}

.ai-recs {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.ai-rec-item {
  display: flex;
  gap: 14px;
  align-items: flex-start;
  padding: 14px 16px;
  border-radius: 12px;
  border: 1px solid var(--c-border);
  background: rgba(255,255,255,0.02);
  transition: background 0.15s;
}

.ai-rec--success {
  border-color: rgba(74, 222, 128, 0.2);
  background: rgba(74, 222, 128, 0.04);
}

.ai-rec--warning {
  border-color: rgba(251, 191, 36, 0.2);
  background: rgba(251, 191, 36, 0.04);
}

.ai-rec--tip {
  border-color: rgba(168, 85, 247, 0.2);
  background: rgba(168, 85, 247, 0.04);
}

.ai-rec-icon {
  font-size: 20px;
  flex-shrink: 0;
  margin-top: 1px;
}

.ai-rec-body {
  flex: 1;
}

.ai-rec-body strong {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: var(--c-white);
  margin-bottom: 4px;
}

.ai-rec-body p {
  margin: 0;
  font-size: 13px;
  color: var(--c-text);
  line-height: 1.6;
}

.ai-generate-bio {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid var(--c-border);
}

.ai-bio-hint {
  margin: 8px 0 0;
  font-size: 11px;
  color: var(--c-muted);
  text-align: center;
}

</style>
