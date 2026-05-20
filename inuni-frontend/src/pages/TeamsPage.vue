<template>
  <AppShell>
    <div class="page-bg">
      <div class="blob blob-1" />
      <div class="blob blob-2" />
      <div class="grid-overlay" />
    </div>

    <!-- Создать слот -->
    <transition name="modal-fade">
      <div v-if="showCreateModal" class="modal-overlay" @click="showCreateModal = false">
        <div class="modal" @click.stop>
          <div class="modal-header">
            <h2 class="modal-title">Создать командный слот</h2>
            <button type="button" class="modal-close" @click="showCreateModal = false">✕</button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label>Тип</label>
              <div class="tag-select">
                <span
                  v-for="t in slotCategoryOptions"
                  :key="t.key"
                  class="tag-option"
                  :class="{ selected: newSlot.category === t.key }"
                  @click="newSlot.category = t.key"
                >{{ t.label }}</span>
              </div>
              <!-- Подсказка для студентов -->
              <p v-if="!isAdminOrOrg" class="hint-text">
                💡 Создание хакатонов доступно только для организаций и администраторов
              </p>
            </div>
            <div class="form-group">
              <label>Название</label>
              <input v-model="newSlot.name" type="text" placeholder="Например: AI-ассистент для студентов" />
            </div>
            <div class="form-group">
              <label>Описание</label>
              <textarea v-model="newSlot.desc" placeholder="Идея, стек, цели..." />
            </div>
            <div class="form-group">
              <label>Тематика</label>
              <div class="tag-select">
                <span
                  v-for="t in themeTags"
                  :key="t"
                  class="tag-option"
                  :class="{ selected: newSlot.tags.includes(t) }"
                  @click="toggleNewTag(t)"
                >{{ t }}</span>
              </div>
            </div>
            <div class="form-group">
              <label>Нужны в команду</label>
              <div class="tag-select">
                <span
                  v-for="r in roleOptions"
                  :key="r"
                  class="tag-option role-option"
                  :class="{ selected: newSlot.roles.includes(r) }"
                  @click="toggleNewRole(r)"
                >{{ r }}</span>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn-outline" @click="showCreateModal = false">Отмена</button>
            <button type="button" class="btn-primary" @click="createSlot">Опубликовать →</button>
          </div>
        </div>
      </div>
    </transition>

    <!-- Отклик на слот -->
    <transition name="modal-fade">
      <div v-if="showApplyModal" class="modal-overlay" @click="showApplyModal = false">
        <div class="modal modal--sm" @click.stop>
          <div class="modal-header">
            <h2 class="modal-title">Отклик на слот</h2>
            <button type="button" class="modal-close" @click="showApplyModal = false">✕</button>
          </div>
          <div class="modal-body">
            <div class="apply-target-name">{{ applyingTo?.name }}</div>
            <div class="form-group">
              <label>Роль</label>
              <div class="tag-select">
                <span
                  v-for="r in applyingTo?.roles || []"
                  :key="r"
                  class="tag-option role-option"
                  :class="{ selected: applyRole === r }"
                  @click="applyRole = r"
                >{{ r }}</span>
              </div>
            </div>
            <div class="form-group">
              <label>Сообщение (необязательно)</label>
              <textarea v-model="applyMessage" placeholder="Почему хочешь в команду..." />
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn-outline" @click="showApplyModal = false">Отмена</button>
            <button type="button" class="btn-primary" @click="submitSlotApply">Отправить →</button>
          </div>
        </div>
      </div>
    </transition>

    <!-- Заявка на официальный хакатон -->
    <transition name="modal-fade">
      <div v-if="showEventModal" class="modal-overlay" @click="closeEventModal">
        <div class="modal modal--wide" @click.stop>
          <div class="modal-header">
            <div>
              <div class="modal-label">Заявка на событие</div>
              <h2 class="modal-title">{{ selectedEvent?.name }}</h2>
            </div>
            <button type="button" class="modal-close" @click="closeEventModal">✕</button>
          </div>
          <div class="modal-body">
            <div class="modal-summary">
              <span class="summary-item"><AppIcon name="map-pin" :size="14" />{{ selectedEvent?.location }}</span>
              <span class="summary-item"><AppIcon name="calendar" :size="14" />{{ selectedEvent?.date }}</span>
              <span class="summary-item"><AppIcon name="users" :size="14" />{{ selectedEvent?.teamSize }}</span>
              <span class="summary-item"><AppIcon name="wallet" :size="14" />{{ selectedEvent?.prize }}</span>
            </div>
            <div class="form-grid">
              <div class="form-group">
                <label>Имя и фамилия</label>
                <input v-model="eventForm.fullName" type="text" />
              </div>
              <div class="form-group">
                <label>Email</label>
                <input v-model="eventForm.email" type="email" />
              </div>
              <div class="form-group">
                <label>Университет</label>
                <input v-model="eventForm.organization" type="text" />
              </div>
              <div class="form-group">
                <label>Роль в команде</label>
                <select v-model="eventForm.role">
                  <option disabled value="">Выберите роль</option>
                  <option>Frontend Developer</option>
                  <option>Backend Developer</option>
                  <option>ML Engineer</option>
                  <option>Designer</option>
                  <option>Product / PM</option>
                </select>
              </div>
              <div class="form-group">
                <label>Название команды</label>
                <input v-model="eventForm.teamName" type="text" placeholder="Или «Ищу команду»" />
              </div>
              <div class="form-group">
                <label>Размер команды</label>
                <input v-model="eventForm.teamSize" type="number" min="1" max="5" />
              </div>
            </div>
            <div class="form-group">
              <label>О себе</label>
              <textarea v-model="eventForm.bio" rows="3" />
            </div>
            <div class="form-group">
              <label>Идея / мотивация</label>
              <textarea v-model="eventForm.idea" rows="3" />
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn-outline" @click="closeEventModal">Отмена</button>
            <button type="button" class="btn-primary" @click="submitEventApplication">Отправить заявку →</button>
          </div>
        </div>
      </div>
    </transition>

    <!-- ====== МОДАЛ: Просмотр навыков заявителя ====== -->
    <transition name="modal-fade">
      <div v-if="showSkillsModal && selectedIncomingApp" class="modal-overlay" @click="showSkillsModal = false">
        <div class="modal modal--sm" @click.stop>
          <div class="modal-header">
            <div>
              <div class="modal-label">Заявка на вступление</div>
              <h2 class="modal-title">{{ selectedIncomingApp.applicantName }}</h2>
            </div>
            <button type="button" class="modal-close" @click="showSkillsModal = false">✕</button>
          </div>
          <div class="modal-body">
            <!-- Applicant info -->
            <div class="applicant-profile">
              <div class="applicant-av" :style="{ background: selectedIncomingApp.applicantColor }">
                {{ selectedIncomingApp.applicantInitials }}
              </div>
              <div class="applicant-info">
                <div class="applicant-name">{{ selectedIncomingApp.applicantName }}</div>
                <div class="applicant-meta">
                  <span><AppIcon name="graduation-cap" :size="13" />{{ selectedIncomingApp.university }}</span>
                  <span><AppIcon name="briefcase" :size="13" />{{ selectedIncomingApp.role }}</span>
                </div>
              </div>
            </div>

            <!-- Slot info -->
            <div class="incoming-slot-info">
              <span class="incoming-slot-label">Хочет в проект</span>
              <span class="incoming-slot-name">{{ selectedIncomingApp.slotName }}</span>
              <span class="cat-badge" :class="selectedIncomingApp.slotCategory">
                {{ categoryLabel(selectedIncomingApp.slotCategory) }}
              </span>
            </div>

            <!-- Message -->
            <div v-if="selectedIncomingApp.message" class="form-group">
              <label>Сообщение</label>
              <div class="applicant-message">{{ selectedIncomingApp.message }}</div>
            </div>

            <!-- Skills -->
            <div class="form-group">
              <label>Навыки</label>
              <div class="skills-grid">
                <span v-for="skill in selectedIncomingApp.skills" :key="skill" class="skill-chip">{{ skill }}</span>
              </div>
            </div>

            <!-- Links -->
            <div v-if="selectedIncomingApp.github || selectedIncomingApp.portfolio" class="form-group">
              <label>Ссылки</label>
              <div class="links-row">
                <a v-if="selectedIncomingApp.github" :href="selectedIncomingApp.github" target="_blank" class="link-chip">
                  <AppIcon name="github" :size="13" /> GitHub
                </a>
                <a v-if="selectedIncomingApp.portfolio" :href="selectedIncomingApp.portfolio" target="_blank" class="link-chip">
                  <AppIcon name="external-link" :size="13" /> Portfolio
                </a>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn-outline" @click="showSkillsModal = false">Закрыть</button>
            <button
              v-if="selectedIncomingApp.status === 'pending'"
              type="button"
              class="btn-danger"
              @click="rejectApplication(selectedIncomingApp); showSkillsModal = false"
            >Отклонить</button>
            <button
              v-if="selectedIncomingApp.status === 'pending'"
              type="button"
              class="btn-success"
              @click="acceptApplication(selectedIncomingApp); showSkillsModal = false"
            >Принять в команду ✓</button>
          </div>
        </div>
      </div>
    </transition>

    <transition name="toast-fade">
      <div v-if="toastMessage" class="toast">{{ toastMessage }}</div>
    </transition>

    <div class="page-inner">
      <header class="page-header">
        <div>
          <div class="page-label">Команды и возможности</div>
          <h1 class="page-title">Найди команду</h1>
          <p class="page-sub">
            Хакатоны, стартапы и pet-проекты в одном месте — официальные события и слоты от студентов.
          </p>
        </div>
        <button type="button" class="btn-primary btn-lg" @click="showCreateModal = true">+ Создать слот</button>
      </header>

      <div class="tabs-row">
        <button
          v-for="tab in computedTabs"
          :key="tab.key"
          type="button"
          class="tab"
          :class="{ active: activeTab === tab.key }"
          @click="activeTab = tab.key"
        >
          {{ tab.label }}
          <!-- Badge для входящих заявок -->
          <span v-if="tab.key === 'incoming' && pendingIncomingCount > 0" class="tab-badge">
            {{ pendingIncomingCount }}
          </span>
        </button>
        <div class="tab-spacer" />
        <div class="search-bar">
          <AppIcon name="search" :size="15" />
          <input v-model="searchQuery" type="text" placeholder="Поиск..." />
        </div>
      </div>

      <!-- ===== МОИ ЗАЯВКИ ===== -->
      <section v-if="activeTab === 'my'" class="my-apps">
        <div v-if="!applications.length" class="empty-state">
          <div class="empty-icon"><AppIcon name="folder" :size="26" /></div>
          <div class="empty-title">Заявок пока нет</div>
          <p class="empty-sub">Участвуй в хакатонах или откликайся на слоты — всё появится здесь</p>
        </div>
        <article v-for="item in applications" :key="item.id" class="app-item">
          <span class="app-icon">{{ item.icon }}</span>
          <div class="app-info">
            <div class="app-name-row">
              <span class="app-name">{{ item.title }}</span>
              <span class="kind-badge" :class="item.kind">{{ item.kind === 'event' ? 'Событие' : 'Слот' }}</span>
              <span v-if="item.category" class="cat-badge" :class="item.category">{{ categoryLabel(item.category) }}</span>
            </div>
            <p class="app-role">Роль: {{ item.role }}</p>
            <p v-if="item.teamName" class="app-meta">Команда: {{ item.teamName }}</p>
          </div>
          <span class="app-status" :class="item.status">{{ item.statusLabel }}</span>
        </article>
      </section>

      <!-- ===== МОИ СЛОТЫ ===== -->
      <section v-else-if="activeTab === 'myslots'" class="feed-section">
        <div v-if="!createdSlots.length" class="empty-state">
          <div class="empty-icon"><AppIcon name="layers" :size="26" /></div>
          <div class="empty-title">Слотов пока нет</div>
          <p class="empty-sub">Создай командный слот — он появится здесь</p>
          <button type="button" class="btn-primary" style="margin-top:16px" @click="showCreateModal = true">+ Создать слот</button>
        </div>
        <div v-else class="cards-grid">
          <article v-for="slot in createdSlots" :key="slot.id" class="slot-card slot-card--mine">
            <div class="card-top">
              <span class="card-icon">{{ slot.icon }}</span>
              <div class="card-badges">
                <span class="my-slot-badge">✦ Мой слот</span>
                <span class="cat-badge" :class="slot.category">{{ slot.categoryLabel }}</span>
              </div>
            </div>
            <h3 class="card-name">{{ slot.name }}</h3>
            <p class="card-desc">{{ slot.desc }}</p>
            <p class="roles-label">Ищут в команду:</p>
            <div class="roles-row">
              <span v-for="r in slot.roles" :key="r" class="role-chip">+ {{ r }}</span>
            </div>
            <div class="card-tags">
              <span v-for="t in slot.tags" :key="t" class="card-tag">{{ t }}</span>
            </div>
            <div class="card-actions">
              <button type="button" class="btn-delete" @click="deleteSlot(slot)">Удалить слот</button>
            </div>
          </article>
        </div>
      </section>

      <!-- ===== ВХОДЯЩИЕ ЗАЯВКИ (заявки на мои проекты) ===== -->
      <section v-else-if="activeTab === 'incoming'" class="incoming-section">
        <div class="incoming-header">
          <div>
            <h2 class="section-heading" style="margin:0 0 4px">
              <AppIcon name="inbox" :size="18" />
              Входящие заявки
              <span class="section-count">{{ incomingApplications.length }}</span>
            </h2>
            <p class="incoming-sub">Люди, которые хотят вступить в твои проекты</p>
          </div>
          <div class="incoming-filters">
            <button
              v-for="f in incomingFilters"
              :key="f.key"
              type="button"
              class="filter-btn"
              :class="{ active: incomingFilter === f.key }"
              @click="incomingFilter = f.key"
            >{{ f.label }}</button>
          </div>
        </div>

        <div v-if="!filteredIncoming.length" class="empty-state">
          <div class="empty-icon"><AppIcon name="inbox" :size="26" /></div>
          <div class="empty-title">Пока заявок нет</div>
          <p class="empty-sub">Когда кто-то откликнется на твой проект — заявка появится здесь</p>
        </div>

        <div v-else class="incoming-list">
          <article v-for="app in filteredIncoming" :key="app.id" class="incoming-item">
            <!-- Аватар -->
            <div class="incoming-av" :style="{ background: app.applicantColor }">
              {{ app.applicantInitials }}
            </div>

            <!-- Основная информация -->
            <div class="incoming-info">
              <div class="incoming-name-row">
                <span class="incoming-name">{{ app.applicantName }}</span>
                <span class="incoming-uni">{{ app.university }}</span>
                <span class="incoming-date">{{ app.createdAt }}</span>
              </div>
              <div class="incoming-meta">
                <span class="incoming-slot-pill">
                  <AppIcon name="layers" :size="11" />{{ app.slotName }}
                </span>
                <span class="incoming-role-pill">
                  <AppIcon name="user" :size="11" />{{ app.role }}
                </span>
              </div>
              <p v-if="app.message" class="incoming-message">{{ app.message }}</p>
              <!-- Навыки (превью) -->
              <div class="incoming-skills-preview">
                <span v-for="skill in app.skills.slice(0, 4)" :key="skill" class="skill-chip skill-chip--sm">{{ skill }}</span>
                <span v-if="app.skills.length > 4" class="skill-chip skill-chip--sm skill-chip--more">+{{ app.skills.length - 4 }}</span>
              </div>
            </div>

            <!-- Действия -->
            <div class="incoming-actions">
              <span class="app-status" :class="app.status">{{ statusLabel(app.status) }}</span>
              <div v-if="app.status === 'pending'" class="action-btns">
                <button type="button" class="btn-skills" @click="openSkillsModal(app)">
                  <AppIcon name="star" :size="13" /> Навыки
                </button>
                <button type="button" class="btn-accept" @click="acceptApplication(app)">
                  <AppIcon name="check" :size="13" /> Принять
                </button>
                <button type="button" class="btn-reject" @click="rejectApplication(app)">
                  <AppIcon name="x" :size="13" />
                </button>
              </div>
              <div v-else class="action-btns">
                <button type="button" class="btn-skills" @click="openSkillsModal(app)">
                  <AppIcon name="eye" :size="13" /> Профиль
                </button>
              </div>
            </div>
          </article>
        </div>
      </section>

      <template v-else>
        <!-- Featured event -->
        <section
          v-if="showFeatured && featuredEvent"
          class="featured-banner"
        >
          <div class="featured-bg-blob" />
          <div class="featured-content">
            <div class="featured-badge">
              <span class="badge-dot" />
              Официальный хакатон · идёт регистрация
            </div>
            <h2 class="featured-title">{{ featuredEvent.name }}</h2>
            <p class="featured-desc">
              Главный технологический хакатон Центральной Азии. 48 часов, 120+ команд, 5 000 000 ₸ призовой фонд.
            </p>
            <div class="featured-meta">
              <span class="meta-item"><AppIcon name="calendar" :size="14" />{{ featuredEvent.date }}</span>
              <span class="meta-item"><AppIcon name="map-pin" :size="14" />{{ featuredEvent.location }}</span>
              <span class="meta-item"><AppIcon name="wallet" :size="14" />{{ featuredEvent.prize }}</span>
            </div>
            <div class="featured-actions">
              <button type="button" class="btn-primary btn-lg" @click="openEventModal(featuredEvent)">Участвовать →</button>
              <button type="button" class="btn-outline" @click="toggleFavorite(featuredEvent.id)">
                <AppIcon :name="favorites.has(featuredEvent.id) ? 'check' : 'bookmark'" :size="14" />
                {{ favorites.has(featuredEvent.id) ? 'В избранном' : 'В избранное' }}
              </button>
            </div>
          </div>
          <div class="featured-visual">
            <div class="countdown-block">
              <div class="countdown-label">До начала</div>
              <div class="countdown-nums">
                <div class="cd-unit"><span class="cd-num">{{ countdown.days }}</span><span class="cd-sub">дней</span></div>
                <span class="cd-sep">:</span>
                <div class="cd-unit"><span class="cd-num">{{ countdown.hours }}</span><span class="cd-sub">часов</span></div>
                <span class="cd-sep">:</span>
                <div class="cd-unit"><span class="cd-num">{{ countdown.mins }}</span><span class="cd-sub">мин</span></div>
              </div>
            </div>
          </div>
        </section>

        <!-- Официальные события -->
        <section v-if="filteredEvents.length" class="feed-section">
          <h2 class="section-heading">
            <AppIcon name="trophy" :size="18" />
            Официальные хакатоны
            <span class="section-count">{{ filteredEvents.length }}</span>
          </h2>
          <div class="cards-grid">
            <article
              v-for="event in filteredEvents"
              :key="event.id"
              class="event-card"
              :class="{ 'event-card--hot': event.hot }"
            >
              <div class="card-top">
                <span class="card-icon">{{ event.icon }}</span>
                <div class="card-badges">
                  <span v-if="event.hot" class="badge-hot">Приоритет</span>
                  <span class="badge-format" :class="event.format">{{ event.formatLabel }}</span>
                  <span class="kind-badge event">Событие</span>
                </div>
              </div>
              <h3 class="card-name">{{ event.name }}</h3>
              <p class="card-desc">{{ event.desc }}</p>
              <div class="card-meta">
                <span><AppIcon name="calendar" :size="13" />{{ event.date }}</span>
                <span><AppIcon name="wallet" :size="13" />{{ event.prize }}</span>
                <span><AppIcon name="map-pin" :size="13" />{{ event.location }}</span>
              </div>
              <div class="card-tags">
                <span v-for="t in event.tags" :key="t" class="card-tag">{{ t }}</span>
              </div>
              <div class="progress-wrap">
                <div class="progress-label">
                  <span>Команд</span>
                  <span>{{ event.teamsReg }} / {{ event.teamsMax }}</span>
                </div>
                <div class="progress-bar">
                  <div class="progress-fill" :style="{ width: `${(event.teamsReg / event.teamsMax) * 100}%` }" />
                </div>
              </div>
              <div class="card-actions">
                <button type="button" class="btn-primary action-main" @click="openEventModal(event)">Участвовать</button>
                <button
                  type="button"
                  class="btn-icon"
                  :class="{ faved: favorites.has(event.id) }"
                  @click="toggleFavorite(event.id)"
                >
                  <AppIcon :name="favorites.has(event.id) ? 'check' : 'bookmark'" :size="16" />
                </button>
              </div>
            </article>
          </div>
        </section>

        <!-- Слоты студентов -->
        <section v-if="filteredSlots.length" class="feed-section">
          <h2 class="section-heading">
            <AppIcon name="users" :size="18" />
            Слоты от студентов
            <span class="section-count">{{ filteredSlots.length }}</span>
          </h2>
          <div class="cards-grid">
            <article
              v-for="slot in filteredSlots"
              :key="slot.id"
              class="slot-card"
              :class="{ 'slot-card--hot': slot.hot }"
            >
              <div class="card-top">
                <span class="card-icon">{{ slot.icon }}</span>
                <div class="card-badges">
                  <span class="cat-badge" :class="slot.category">{{ slot.categoryLabel }}</span>
                  <span class="kind-badge slot">Слот</span>
                  <span v-if="slot.hot" class="badge-hot">Top</span>
                </div>
              </div>
              <h3 class="card-name">{{ slot.name }}</h3>
              <p class="card-desc">{{ slot.desc }}</p>
              <p class="roles-label">Ищут в команду:</p>
              <div class="roles-row">
                <span
                  v-for="r in slot.roles"
                  :key="r"
                  class="role-chip"
                  :class="{ filled: slot.filledRoles?.includes(r) }"
                >{{ slot.filledRoles?.includes(r) ? '✓' : '+' }} {{ r }}</span>
              </div>
              <div class="slot-team">
                <div class="team-avatars">
                  <div
                    v-for="m in slot.team"
                    :key="m.initials"
                    class="team-av"
                    :style="{ background: m.color }"
                  >{{ m.initials }}</div>
                </div>
                <span class="team-leader">{{ slot.leader.name }}</span>
              </div>
              <div class="card-meta">
                <span><AppIcon name="calendar" :size="13" />{{ slot.deadline }}</span>
                <span><AppIcon name="briefcase" :size="13" />{{ slot.stage }}</span>
              </div>
              <div class="card-tags">
                <span v-for="t in slot.tags" :key="t" class="card-tag">{{ t }}</span>
              </div>
              <div class="card-actions">
                <template v-if="isMyCreatedSlot(slot)">
                  <span class="my-slot-badge">✦ Мой слот</span>
                  <button type="button" class="btn-outline btn-delete" @click="deleteSlot(slot)">Удалить</button>
                </template>
                <button v-else type="button" class="btn-primary action-main" @click="openSlotApply(slot)">Откликнуться</button>
              </div>
            </article>
          </div>
        </section>

        <div v-if="!filteredEvents.length && !filteredSlots.length" class="empty-state">
          <div class="empty-icon"><AppIcon name="search" :size="26" /></div>
          <div class="empty-title">Ничего не найдено</div>
          <p class="empty-sub">Попробуй другой фильтр или поисковый запрос</p>
        </div>
      </template>
    </div>
  </AppShell>
</template>

<script>
import AppIcon from '../components/AppIcon.vue'
import AppShell from '../components/AppShell.vue'
import { createInitials, loadAppState, patchAppState } from '../lib/appState'
import { buildFullName } from '../lib/universityProfile'
import {
  CATEGORY_TABS,
  COMMUNITY_SLOTS,
  FEATURED_EVENT,
  OFFICIAL_EVENTS,
  ROLE_OPTIONS,
  THEME_TAGS,
} from '../lib/teamsCatalog'

const emptyEventForm = () => ({
  fullName: '',
  email: '',
  organization: '',
  role: '',
  teamName: '',
  teamSize: '',
  bio: '',
  idea: '',
})

const CATEGORY_LABELS = {
  hackathon: 'Хакатон',
  startup: 'Стартап',
  pet: 'Pet',
}

// Демо-заявки — показывают как выглядит раздел "Входящие"
// В реальном приложении эти данные приходят с сервера
const DEMO_INCOMING = [
  {
    id: 'inc-demo-1',
    slotId: null,
    slotName: 'AI-ассистент для студентов',
    slotCategory: 'startup',
    applicantName: 'Айгерим Жаксыбекова',
    applicantInitials: 'АЖ',
    applicantColor: 'linear-gradient(135deg,#7c3aed,#db2777)',
    role: 'Frontend Developer',
    message: 'Хочу применить свои навыки React и Vue в реальном проекте. Есть опыт работы с AI API.',
    skills: ['React', 'Vue.js', 'TypeScript', 'Figma', 'CSS', 'REST API'],
    university: 'КБТУ',
    github: 'https://github.com',
    portfolio: null,
    status: 'pending',
    createdAt: '18 май',
  },
  {
    id: 'inc-demo-2',
    slotId: null,
    slotName: 'AI-ассистент для студентов',
    slotCategory: 'startup',
    applicantName: 'Данияр Сейткали',
    applicantInitials: 'ДС',
    applicantColor: 'linear-gradient(135deg,#0891b2,#0d9488)',
    role: 'Backend Developer',
    message: 'Строю API на FastAPI и Node.js. Интересна тема EdTech.',
    skills: ['Python', 'FastAPI', 'PostgreSQL', 'Docker', 'Redis'],
    university: 'Назарбаев Университет',
    github: 'https://github.com',
    portfolio: null,
    status: 'pending',
    createdAt: '17 май',
  },
  {
    id: 'inc-demo-3',
    slotId: null,
    slotName: 'Маркетплейс студенческих услуг',
    slotCategory: 'pet',
    applicantName: 'Зарина Ахметова',
    applicantInitials: 'ЗА',
    applicantColor: 'linear-gradient(135deg,#d97706,#dc2626)',
    role: 'Designer',
    message: 'UX/UI дизайнер, работала с несколькими стартапами. Дизайню в Figma.',
    skills: ['Figma', 'UX Research', 'Motion Design', 'Prototyping'],
    university: 'ВШЭ',
    github: null,
    portfolio: 'https://behance.net',
    status: 'accepted',
    createdAt: '14 май',
  },
]

export default {
  name: 'TeamsPage',
  components: { AppIcon, AppShell },
  data() {
    const state = loadAppState()

    // Инициализируем входящие заявки: если нет сохранённых — показываем демо
    const savedIncoming = state.incomingApplications
    const incomingApplications = savedIncoming !== undefined
      ? savedIncoming
      : DEMO_INCOMING

    return {
      activeTab: 'all',
      searchQuery: '',
      categoryTabs: CATEGORY_TABS,
      themeTags: THEME_TAGS,
      roleOptions: ROLE_OPTIONS,
      officialEvents: OFFICIAL_EVENTS,
      featuredEvent: FEATURED_EVENT,
      communitySlots: [...COMMUNITY_SLOTS],
      createdSlots: state.createdSlots || [],
      applications: state.teamApplications || [],
      incomingApplications,
      profile: state.profile,
      favorites: new Set(),
      countdown: { days: 12, hours: 7, mins: 43 },

      // Фильтр в разделе входящих
      incomingFilter: 'all',
      incomingFilters: [
        { key: 'all', label: 'Все' },
        { key: 'pending', label: 'Ожидают' },
        { key: 'accepted', label: 'Принятые' },
        { key: 'rejected', label: 'Отклонённые' },
      ],

      // Модалы
      showCreateModal: false,
      showApplyModal: false,
      showEventModal: false,
      showSkillsModal: false,

      applyingTo: null,
      applyRole: '',
      applyMessage: '',
      selectedEvent: null,
      selectedIncomingApp: null,
      eventForm: emptyEventForm(),
      newSlot: { name: '', desc: '', tags: [], roles: [], category: 'startup' },
      toastMessage: '',
      toastTimer: null,
      countdownTimer: null,
    }
  },
  computed: {
    // Определяем тип аккаунта: admin или organization могут создавать хакатоны
    isAdminOrOrg() {
      const accountType = this.profile?.accountType || 'student'
      return accountType === 'admin' || accountType === 'organization'
    },

    // Типы слотов в форме создания — студент не видит "Под хакатон"
    slotCategoryOptions() {
      const all = [
        { key: 'hackathon', label: 'Под хакатон' },
        { key: 'startup', label: 'Стартап' },
        { key: 'pet', label: 'Pet-проект' },
      ]
      return this.isAdminOrOrg ? all : all.filter(o => o.key !== 'hackathon')
    },

    // Вкладки
    computedTabs() {
      const base = [...this.categoryTabs]
      // "Мои слоты" — только если есть созданные слоты
      if (this.createdSlots.length > 0) {
        base.push({ key: 'myslots', label: 'Мои слоты' })
      }
      // "Входящие" — только если есть входящие заявки или созданные слоты
      const hasActivity = this.createdSlots.length > 0 || this.incomingApplications.length > 0
      if (hasActivity) {
        base.push({ key: 'incoming', label: 'Входящие заявки' })
      }
      return base
    },

    // Количество ожидающих входящих заявок (для бейджа на вкладке)
    pendingIncomingCount() {
      return this.incomingApplications.filter(a => a.status === 'pending').length
    },

    // Фильтрованный список входящих
    filteredIncoming() {
      if (this.incomingFilter === 'all') return this.incomingApplications
      return this.incomingApplications.filter(a => a.status === this.incomingFilter)
    },

    allSlots() {
      return [...this.communitySlots, ...this.createdSlots]
    },
    showFeatured() {
      return this.activeTab === 'all' || this.activeTab === 'hackathon'
    },
    filteredEvents() {
      if (this.activeTab === 'startup' || this.activeTab === 'pet') return []
      const q = this.searchQuery.trim().toLowerCase()
      return this.officialEvents.filter((e) => {
        if (q && !`${e.name} ${e.desc}`.toLowerCase().includes(q)) return false
        if (this.activeTab === 'hackathon') return true
        return true
      })
    },
    filteredSlots() {
      const q = this.searchQuery.trim().toLowerCase()
      return this.allSlots.filter((s) => {
        if (q && !`${s.name} ${s.desc}`.toLowerCase().includes(q)) return false
        if (this.activeTab === 'all') return true
        if (this.activeTab === 'hackathon') return s.category === 'hackathon'
        if (this.activeTab === 'startup' || this.activeTab === 'pet') return s.category === this.activeTab
        return true
      })
    },
  },
  mounted() {
    const tab = this.$route.query.tab
    if (tab && [...CATEGORY_TABS, { key: 'incoming' }].some((t) => t.key === tab)) {
      this.activeTab = tab
    }
    this.countdownTimer = setInterval(() => {
      if (this.countdown.mins > 0) {
        this.countdown.mins -= 1
        return
      }
      this.countdown.mins = 59
      if (this.countdown.hours > 0) {
        this.countdown.hours -= 1
        return
      }
      this.countdown.hours = 23
      if (this.countdown.days > 0) this.countdown.days -= 1
    }, 60000)
  },
  beforeUnmount() {
    if (this.countdownTimer) clearInterval(this.countdownTimer)
    if (this.toastTimer) clearTimeout(this.toastTimer)
  },
  methods: {
    isMyCreatedSlot(slot) {
      return this.createdSlots.some(s => s.id === slot.id)
    },

    deleteSlot(slot) {
      this.createdSlots = this.createdSlots.filter(s => s.id !== slot.id)
      patchAppState({ createdSlots: this.createdSlots })
      this.showToast("Слот удалён")
    },
    categoryLabel(cat) {
      return CATEGORY_LABELS[cat] || cat
    },

    statusLabel(status) {
      const map = { pending: 'Ожидает', accepted: 'Принят', rejected: 'Отклонён' }
      return map[status] || status
    },

    toggleFavorite(id) {
      const next = new Set(this.favorites)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      this.favorites = next
    },
    toggleNewTag(t) {
      const i = this.newSlot.tags.indexOf(t)
      if (i >= 0) this.newSlot.tags.splice(i, 1)
      else this.newSlot.tags.push(t)
    },
    toggleNewRole(r) {
      const i = this.newSlot.roles.indexOf(r)
      if (i >= 0) this.newSlot.roles.splice(i, 1)
      else this.newSlot.roles.push(r)
    },

    createSlot() {
      // Студент не может создать хакатон-слот
      if (this.newSlot.category === 'hackathon' && !this.isAdminOrOrg) {
        this.showToast('Создание хакатонов доступно только для организаций')
        return
      }
      const cat = this.slotCategoryOptions.find((o) => o.key === this.newSlot.category)
      const created = {
        id: `slot-custom-${Date.now()}`,
        icon: '🚀',
        hot: true,
        category: this.newSlot.category,
        categoryLabel: cat?.label || 'Слот',
        name: this.newSlot.name || 'Новый слот',
        desc: this.newSlot.desc || 'Описание пока не добавлено.',
        roles: this.newSlot.roles.length ? [...this.newSlot.roles] : ['Frontend Dev'],
        filledRoles: [],
        team: [
          {
            initials: createInitials(this.profile.firstName, this.profile.lastName),
            color: 'linear-gradient(135deg,#e63946,#1d4ed8)',
          },
        ],
        tags: this.newSlot.tags.length ? [...this.newSlot.tags] : ['SaaS'],
        deadline: 'открыт',
        stage: 'Idea',
        leader: {
          initials: createInitials(this.profile.firstName, this.profile.lastName),
          name: buildFullName(this.profile.firstName, this.profile.lastName),
          color: 'linear-gradient(135deg,#e63946,#1d4ed8)',
        },
      }
      this.createdSlots.unshift(created)
      patchAppState({ createdSlots: this.createdSlots })
      this.showCreateModal = false
      this.newSlot = { name: '', desc: '', tags: [], roles: [], category: 'startup' }
      this.showToast('Слот опубликован')
      this.activeTab = 'myslots'
    },

    openSlotApply(slot) {
      this.applyingTo = slot
      this.applyRole = ''
      this.applyMessage = ''
      this.showApplyModal = true
    },

    submitSlotApply() {
      if (!this.applyRole || !this.applyingTo) return
      const exists = this.applications.some(
        (a) => a.kind === 'slot' && a.title === this.applyingTo.name && a.role === this.applyRole,
      )
      if (!exists) {
        // Добавляем в "Мои заявки" текущего пользователя
        const entry = {
          id: `app-slot-${Date.now()}`,
          kind: 'slot',
          category: this.applyingTo.category,
          title: this.applyingTo.name,
          icon: this.applyingTo.icon,
          role: this.applyRole,
          status: 'pending',
          statusLabel: 'На рассмотрении',
        }
        this.applications = [entry, ...this.applications]
        patchAppState({ teamApplications: this.applications })

        // Если откликнулись на один из своих созданных слотов (демо: для примера добавляем входящую заявку)
        // В реальном приложении входящая заявка создаётся на стороне владельца слота
        const isMySlot = this.createdSlots.some(s => s.id === this.applyingTo.id)
        if (isMySlot) {
          const incoming = {
            id: `inc-${Date.now()}`,
            slotId: this.applyingTo.id,
            slotName: this.applyingTo.name,
            slotCategory: this.applyingTo.category,
            applicantName: buildFullName(this.profile.firstName, this.profile.lastName),
            applicantInitials: createInitials(this.profile.firstName, this.profile.lastName),
            applicantColor: 'linear-gradient(135deg,#e63946,#1d4ed8)',
            role: this.applyRole,
            message: this.applyMessage,
            skills: this.profile.skills || [],
            university: this.profile.education || '',
            github: this.profile.github || null,
            portfolio: this.profile.portfolio || null,
            status: 'pending',
            createdAt: new Date().toLocaleDateString('ru-RU', { day: '2-digit', month: 'short' }),
          }
          this.incomingApplications = [incoming, ...this.incomingApplications]
          patchAppState({ incomingApplications: this.incomingApplications })
        }

        this.showToast(`Отклик на «${this.applyingTo.name}» отправлен`)
      }
      this.showApplyModal = false
    },

    // ======= Входящие заявки =======
    openSkillsModal(app) {
      this.selectedIncomingApp = app
      this.showSkillsModal = true
    },

    acceptApplication(app) {
      const idx = this.incomingApplications.findIndex(a => a.id === app.id)
      if (idx === -1) return
      this.incomingApplications[idx] = { ...this.incomingApplications[idx], status: 'accepted' }
      this.incomingApplications = [...this.incomingApplications]
      patchAppState({ incomingApplications: this.incomingApplications })
      this.showToast(`${app.applicantName} принят в команду ✓`)
    },

    rejectApplication(app) {
      const idx = this.incomingApplications.findIndex(a => a.id === app.id)
      if (idx === -1) return
      this.incomingApplications[idx] = { ...this.incomingApplications[idx], status: 'rejected' }
      this.incomingApplications = [...this.incomingApplications]
      patchAppState({ incomingApplications: this.incomingApplications })
      this.showToast(`Заявка ${app.applicantName} отклонена`)
    },

    // ======= Хакатон =======
    openEventModal(event) {
      this.selectedEvent = event
      this.eventForm = {
        ...emptyEventForm(),
        fullName: this.profile.fullName,
        email: this.profile.email,
        organization: this.profile.education,
        bio: this.profile.about,
      }
      this.showEventModal = true
    },
    closeEventModal() {
      this.showEventModal = false
      this.selectedEvent = null
      this.eventForm = emptyEventForm()
    },
    submitEventApplication() {
      const entry = {
        id: `app-event-${Date.now()}`,
        kind: 'event',
        category: 'hackathon',
        title: this.selectedEvent?.name,
        icon: '🏆',
        role: this.eventForm.role || 'Участник',
        teamName: this.eventForm.teamName,
        status: 'pending',
        statusLabel: 'На рассмотрении',
        createdAt: new Date().toLocaleDateString('ru-RU', { day: '2-digit', month: 'short' }),
      }
      this.applications = [entry, ...this.applications]
      patchAppState({ teamApplications: this.applications })
      this.showToast(`Заявка на «${this.selectedEvent?.name}» отправлена`)
      this.closeEventModal()
    },

    showToast(message) {
      this.toastMessage = message
      if (this.toastTimer) clearTimeout(this.toastTimer)
      this.toastTimer = setTimeout(() => {
        this.toastMessage = ''
      }, 2600)
    },
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@400;600;700;800;900&family=Onest:wght@400;500;600;700&display=swap');

.page-bg { position: fixed; inset: 0; pointer-events: none; z-index: 0; }
.grid-overlay {
  position: absolute; inset: 0;
  background-image: linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
  linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px);
  background-size: 60px 60px;
  mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%);
}
.blob { position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.18; animation: blobFloat 8s ease-in-out infinite; }
.blob-1 { width: 500px; height: 500px; background: #e63946; top: -150px; right: -100px; }
.blob-2 { width: 400px; height: 400px; background: #1d4ed8; bottom: 100px; left: 100px; animation-delay: 3s; animation-direction: reverse; }
@keyframes blobFloat { 0%,100%{transform:translate(0,0)} 50%{transform:translate(20px,-20px) scale(1.06)} }

.page-inner { position: relative; z-index: 1; padding: 40px 40px 60px; max-width: 1160px; }

.page-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 24px; margin-bottom: 28px; flex-wrap: wrap; }
.page-label { font-family: 'Unbounded', sans-serif; font-size: 10px; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase; color: var(--c-red); margin-bottom: 8px; }
.page-title { font-family: 'Unbounded', sans-serif; font-size: 32px; font-weight: 800; color: var(--c-white); margin: 0 0 6px; }
.page-sub { font-size: 14px; color: var(--c-muted); margin: 0; line-height: 1.6; max-width: 520px; }

/* Hint text in modal */
.hint-text { font-size: 12px; color: var(--c-muted); margin: 6px 0 0; padding: 8px 12px; background: rgba(255,255,255,0.03); border: 1px solid var(--c-border); border-radius: 8px; }

/* Tabs */
.tabs-row { display: flex; align-items: center; gap: 4px; margin-bottom: 28px; border-bottom: 1px solid var(--c-border); flex-wrap: wrap; }
.tab { position: relative; padding: 10px 18px; background: none; border: none; border-bottom: 2px solid transparent; margin-bottom: -1px; cursor: pointer; font-family: 'Onest', sans-serif; font-size: 14px; font-weight: 500; color: var(--c-muted); transition: color 0.2s, border-color 0.2s; }
.tab:hover { color: var(--c-text); }
.tab.active { color: var(--c-red); border-bottom-color: var(--c-red); }
.tab-spacer { flex: 1; min-width: 12px; }
.tab-badge { display: inline-flex; align-items: center; justify-content: center; width: 18px; height: 18px; background: var(--c-red); color: #fff; font-size: 10px; font-weight: 700; border-radius: 50%; margin-left: 6px; vertical-align: middle; }

.search-bar { display: flex; align-items: center; gap: 8px; background: var(--c-card); border: 1px solid var(--c-border); border-radius: 8px; padding: 8px 14px; margin-bottom: 8px; }
.search-bar input { background: none; border: none; outline: none; font-family: 'Onest', sans-serif; font-size: 13px; color: var(--c-text); width: 180px; }
.search-bar input::placeholder { color: var(--c-muted); }

.feed-section { margin-bottom: 36px; }
.section-heading { display: flex; align-items: center; gap: 10px; font-family: 'Unbounded', sans-serif; font-size: 16px; font-weight: 700; color: var(--c-white); margin: 0 0 20px; }
.section-count { font-size: 12px; font-weight: 700; padding: 2px 10px; border-radius: 100px; background: var(--c-red-dim); color: var(--c-red); }

.cards-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px; }

.event-card, .slot-card {
  background: var(--c-card); border: 1px solid var(--c-border); border-radius: var(--r);
  padding: 24px; display: flex; flex-direction: column; gap: 12px;
  transition: border-color 0.2s, transform 0.2s;
}
.event-card:hover, .slot-card:hover { border-color: rgba(230,57,70,0.3); transform: translateY(-3px); }
.event-card--hot, .slot-card--hot { border-color: rgba(230,57,70,0.22); }

.card-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 8px; }
.card-icon { font-size: 28px; }
.card-badges { display: flex; flex-wrap: wrap; gap: 6px; justify-content: flex-end; }
.card-name { font-family: 'Unbounded', sans-serif; font-size: 14px; font-weight: 700; color: var(--c-white); margin: 0; line-height: 1.35; }
.card-desc { font-size: 13px; line-height: 1.6; color: var(--c-muted); margin: 0; }
.card-meta { display: flex; flex-wrap: wrap; gap: 12px; font-size: 12px; color: var(--c-text); }
.card-meta span { display: inline-flex; align-items: center; gap: 6px; }
.card-tags { display: flex; flex-wrap: wrap; gap: 6px; }
.card-tag { font-size: 11px; padding: 3px 10px; border-radius: 100px; background: rgba(59,130,246,0.08); color: #93c5fd; border: 1px solid rgba(59,130,246,0.15); }

.kind-badge { font-size: 10px; font-weight: 700; padding: 3px 8px; border-radius: 100px; text-transform: uppercase; letter-spacing: 0.04em; }
.kind-badge.event { background: rgba(251,191,36,0.12); color: #fbbf24; border: 1px solid rgba(251,191,36,0.25); }
.kind-badge.slot { background: rgba(59,130,246,0.1); color: #93c5fd; border: 1px solid rgba(59,130,246,0.2); }

.cat-badge { font-size: 11px; font-weight: 600; padding: 4px 10px; border-radius: 100px; border: 1px solid; }
.cat-badge.hackathon { background: rgba(251,191,36,0.08); color: #fbbf24; border-color: rgba(251,191,36,0.2); }
.cat-badge.startup { background: rgba(230,57,70,0.1); color: #f87171; border-color: rgba(230,57,70,0.25); }
.cat-badge.pet { background: rgba(59,130,246,0.1); color: #93c5fd; border-color: rgba(59,130,246,0.2); }

.badge-hot { font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 100px; background: rgba(230,57,70,0.15); color: var(--c-red); border: 1px solid rgba(230,57,70,0.25); }
.badge-format { font-size: 11px; padding: 4px 10px; border-radius: 100px; border: 1px solid var(--c-border); color: var(--c-muted); }
.badge-format.online { background: rgba(34,197,94,0.08); color: #4ade80; border-color: rgba(34,197,94,0.2); }
.badge-format.offline { background: rgba(251,146,60,0.08); color: #fb923c; border-color: rgba(251,146,60,0.2); }

.progress-wrap { margin-top: auto; }
.progress-label { display: flex; justify-content: space-between; font-size: 11px; color: var(--c-muted); margin-bottom: 6px; }
.progress-bar { height: 4px; background: rgba(255,255,255,0.06); border-radius: 2px; overflow: hidden; }
.progress-fill { height: 100%; background: linear-gradient(90deg, var(--c-red), #f97316); }

.roles-label { font-size: 11px; font-weight: 600; color: var(--c-muted); text-transform: uppercase; letter-spacing: 0.08em; margin: 0; }
.roles-row { display: flex; flex-wrap: wrap; gap: 6px; }
.role-chip { font-size: 12px; font-weight: 600; padding: 4px 12px; border-radius: 100px; background: rgba(230,57,70,0.1); color: #f87171; border: 1px solid rgba(230,57,70,0.25); }
.role-chip.filled { background: rgba(34,197,94,0.08); color: #4ade80; border-color: rgba(34,197,94,0.2); }

.slot-team { display: flex; align-items: center; gap: 10px; }
.team-avatars { display: flex; }
.team-av { width: 30px; height: 30px; border-radius: 8px; display: grid; place-items: center; font-family: 'Unbounded', sans-serif; font-size: 9px; font-weight: 700; color: #fff; margin-right: -8px; border: 2px solid var(--c-card); }
.team-leader { font-size: 12px; color: var(--c-muted); margin-left: 12px; }

.card-actions { display: flex; gap: 10px; margin-top: 4px; }
.action-main { flex: 1; }

/* Featured */
.featured-banner {
  position: relative; overflow: hidden; display: flex; gap: 32px; align-items: center;
  background: var(--c-card); border: 1px solid rgba(230,57,70,0.25); border-radius: 20px;
  padding: 32px 36px; margin-bottom: 32px;
}
.featured-bg-blob { position: absolute; width: 400px; height: 400px; border-radius: 50%; background: radial-gradient(circle, rgba(230,57,70,0.15) 0%, transparent 70%); top: -100px; right: -80px; pointer-events: none; }
.featured-content, .featured-visual { position: relative; z-index: 1; }
.featured-content { flex: 1; }
.featured-badge { display: inline-flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 600; color: #f87171; padding: 5px 14px; border-radius: 100px; background: rgba(230,57,70,0.12); border: 1px solid rgba(230,57,70,0.3); margin-bottom: 14px; }
.badge-dot { width: 6px; height: 6px; background: var(--c-red); border-radius: 50%; animation: pulse 2s ease-in-out infinite; }
@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
.featured-title { font-family: 'Unbounded', sans-serif; font-size: 22px; font-weight: 800; color: var(--c-white); margin: 0 0 10px; }
.featured-desc { font-size: 14px; color: var(--c-muted); line-height: 1.6; margin: 0 0 16px; }
.featured-meta { display: flex; flex-wrap: wrap; gap: 14px; margin-bottom: 20px; }
.meta-item { font-size: 13px; color: var(--c-text); display: inline-flex; align-items: center; gap: 6px; }
.featured-actions { display: flex; flex-wrap: wrap; gap: 10px; }
.countdown-block { padding: 18px 22px; background: rgba(255,255,255,0.03); border: 1px solid var(--c-border); border-radius: 14px; text-align: center; }
.countdown-label { font-size: 11px; color: var(--c-muted); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 10px; }
.countdown-nums { display: flex; align-items: center; gap: 4px; justify-content: center; }
.cd-unit { display: flex; flex-direction: column; align-items: center; }
.cd-num { font-family: 'Unbounded', sans-serif; font-size: 26px; font-weight: 800; color: var(--c-white); }
.cd-sub { font-size: 10px; color: var(--c-muted); }
.cd-sep { font-size: 22px; color: var(--c-red); margin-bottom: 14px; }

/* Мои заявки */
.my-apps { display: flex; flex-direction: column; gap: 12px; }
.app-item { display: flex; align-items: center; gap: 16px; padding: 16px 20px; background: var(--c-card); border: 1px solid var(--c-border); border-radius: var(--r); }
.app-icon { font-size: 24px; }
.app-info { flex: 1; min-width: 0; }
.app-name-row { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-bottom: 4px; }
.app-name { font-size: 15px; font-weight: 600; color: var(--c-white); }
.app-role, .app-meta { font-size: 13px; color: var(--c-muted); margin: 0; }
.app-status { font-size: 12px; font-weight: 600; padding: 5px 12px; border-radius: 100px; white-space: nowrap; }
.app-status.pending { background: rgba(251,191,36,0.1); color: #fbbf24; }
.app-status.accepted { background: rgba(34,197,94,0.1); color: #4ade80; }
.app-status.rejected { background: rgba(255,255,255,0.05); color: var(--c-muted); }

/* ====== ВХОДЯЩИЕ ЗАЯВКИ ====== */
.incoming-section { display: flex; flex-direction: column; gap: 20px; }
.incoming-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
.incoming-sub { font-size: 13px; color: var(--c-muted); margin: 0; }
.incoming-filters { display: flex; gap: 6px; flex-wrap: wrap; }
.filter-btn { font-family: 'Onest', sans-serif; font-size: 12px; font-weight: 500; padding: 6px 14px; border-radius: 100px; border: 1px solid var(--c-border); background: transparent; color: var(--c-muted); cursor: pointer; transition: all 0.2s; }
.filter-btn:hover { color: var(--c-text); border-color: rgba(255,255,255,0.25); }
.filter-btn.active { background: var(--c-red-dim); color: var(--c-red); border-color: rgba(230,57,70,0.3); }

.incoming-list { display: flex; flex-direction: column; gap: 10px; }
.incoming-item {
  display: flex; align-items: flex-start; gap: 16px;
  padding: 18px 20px; background: var(--c-card); border: 1px solid var(--c-border);
  border-radius: var(--r); transition: border-color 0.2s;
}
.incoming-item:hover { border-color: rgba(230,57,70,0.2); }

.incoming-av {
  width: 44px; height: 44px; border-radius: 12px; display: grid; place-items: center;
  font-family: 'Unbounded', sans-serif; font-size: 12px; font-weight: 700; color: #fff;
  flex-shrink: 0;
}
.incoming-info { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 8px; }
.incoming-name-row { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.incoming-name { font-size: 15px; font-weight: 600; color: var(--c-white); }
.incoming-uni { font-size: 12px; color: var(--c-muted); }
.incoming-date { font-size: 12px; color: var(--c-muted); margin-left: auto; }
.incoming-meta { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.incoming-slot-pill {
  display: inline-flex; align-items: center; gap: 5px; font-size: 12px; font-weight: 500;
  padding: 3px 10px; border-radius: 100px; background: rgba(59,130,246,0.08); color: #93c5fd;
  border: 1px solid rgba(59,130,246,0.15);
}
.incoming-role-pill {
  display: inline-flex; align-items: center; gap: 5px; font-size: 12px; font-weight: 500;
  padding: 3px 10px; border-radius: 100px; background: rgba(230,57,70,0.08); color: #f87171;
  border: 1px solid rgba(230,57,70,0.2);
}
.incoming-message { font-size: 13px; color: var(--c-text); line-height: 1.5; margin: 0; }
.incoming-skills-preview { display: flex; flex-wrap: wrap; gap: 5px; }

.incoming-actions { display: flex; flex-direction: column; align-items: flex-end; gap: 10px; flex-shrink: 0; }
.action-btns { display: flex; align-items: center; gap: 6px; }

/* Кнопки действий в входящих */
.btn-skills {
  display: inline-flex; align-items: center; gap: 5px; font-family: 'Onest', sans-serif;
  font-size: 12px; font-weight: 600; padding: 7px 14px; border-radius: 8px; cursor: pointer;
  border: 1px solid var(--c-border); background: transparent; color: var(--c-muted);
  transition: all 0.2s;
}
.btn-skills:hover { color: var(--c-text); border-color: rgba(255,255,255,0.25); }

.btn-accept {
  display: inline-flex; align-items: center; gap: 5px; font-family: 'Onest', sans-serif;
  font-size: 12px; font-weight: 600; padding: 7px 14px; border-radius: 8px; cursor: pointer;
  border: 1px solid rgba(34,197,94,0.3); background: rgba(34,197,94,0.1); color: #4ade80;
  transition: all 0.2s;
}
.btn-accept:hover { background: rgba(34,197,94,0.18); }

.btn-reject {
  display: inline-flex; align-items: center; justify-content: center; font-family: 'Onest', sans-serif;
  font-size: 12px; font-weight: 600; width: 34px; height: 34px; border-radius: 8px; cursor: pointer;
  border: 1px solid rgba(255,255,255,0.1); background: transparent; color: var(--c-muted);
  transition: all 0.2s;
}
.btn-reject:hover { border-color: rgba(230,57,70,0.3); color: #f87171; background: rgba(230,57,70,0.08); }

/* Chips */
.skill-chip { font-size: 11px; font-weight: 500; padding: 4px 10px; border-radius: 100px; background: rgba(255,255,255,0.05); color: var(--c-text); border: 1px solid var(--c-border); }
.skill-chip--sm { font-size: 10px; padding: 3px 8px; }
.skill-chip--more { color: var(--c-muted); }
.skills-grid { display: flex; flex-wrap: wrap; gap: 6px; }

/* Modal: Applicant profile */
.applicant-profile { display: flex; align-items: center; gap: 14px; padding: 14px; background: rgba(255,255,255,0.03); border: 1px solid var(--c-border); border-radius: 12px; }
.applicant-av { width: 52px; height: 52px; border-radius: 14px; display: grid; place-items: center; font-family: 'Unbounded', sans-serif; font-size: 14px; font-weight: 700; color: #fff; flex-shrink: 0; }
.applicant-name { font-size: 16px; font-weight: 700; color: var(--c-white); margin-bottom: 6px; }
.applicant-meta { display: flex; flex-wrap: wrap; gap: 12px; font-size: 12px; color: var(--c-muted); }
.applicant-meta span { display: inline-flex; align-items: center; gap: 5px; }
.applicant-message { font-size: 13px; color: var(--c-text); line-height: 1.6; padding: 12px 14px; background: rgba(255,255,255,0.03); border: 1px solid var(--c-border); border-radius: 10px; }
.incoming-slot-info { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.incoming-slot-label { font-size: 12px; color: var(--c-muted); }
.incoming-slot-name { font-size: 13px; font-weight: 600; color: var(--c-white); }

/* Links */
.links-row { display: flex; gap: 8px; }
.link-chip { display: inline-flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 500; padding: 6px 14px; border-radius: 8px; border: 1px solid var(--c-border); color: var(--c-muted); text-decoration: none; transition: all 0.2s; }
.link-chip:hover { color: var(--c-text); border-color: rgba(255,255,255,0.25); }

/* Modal buttons */
.btn-success {
  display: inline-flex; align-items: center; gap: 6px; font-family: 'Onest', sans-serif; font-weight: 600;
  cursor: pointer; font-size: 13px; padding: 10px 18px; border-radius: 8px; transition: all 0.2s;
  background: rgba(34,197,94,0.12); color: #4ade80; border: 1px solid rgba(34,197,94,0.3);
}
.btn-success:hover { background: rgba(34,197,94,0.2); }
.btn-danger {
  display: inline-flex; align-items: center; gap: 6px; font-family: 'Onest', sans-serif; font-weight: 600;
  cursor: pointer; font-size: 13px; padding: 10px 18px; border-radius: 8px; transition: all 0.2s;
  background: transparent; color: #f87171; border: 1px solid rgba(230,57,70,0.3);
}
.btn-danger:hover { background: rgba(230,57,70,0.1); }

/* Empty state */
.empty-state { text-align: center; padding: 48px 20px; }
.empty-icon { width: 52px; height: 52px; margin: 0 auto 12px; border-radius: 14px; display: grid; place-items: center; background: rgba(255,255,255,0.04); color: var(--c-muted); }
.empty-title { font-family: 'Unbounded', sans-serif; font-size: 18px; font-weight: 700; color: var(--c-white); margin-bottom: 8px; }
.empty-sub { font-size: 14px; color: var(--c-muted); margin: 0; }

/* Buttons */
.btn-primary, .btn-outline, .btn-icon {
  font-family: 'Onest', sans-serif; font-weight: 600; cursor: pointer; transition: all 0.2s; border-radius: 8px;
}
.btn-primary { display: inline-flex; align-items: center; justify-content: center; gap: 6px; background: var(--c-red); color: #fff; font-size: 13px; padding: 10px 18px; border: none; }
.btn-primary:hover { background: #c62d39; }
.btn-primary.btn-lg { font-size: 15px; padding: 13px 26px; }
.btn-outline { display: inline-flex; align-items: center; gap: 8px; color: var(--c-text); font-size: 14px; padding: 10px 18px; border: 1px solid rgba(255,255,255,0.15); background: transparent; }
.btn-outline:hover { border-color: rgba(255,255,255,0.35); }
.btn-icon { width: 40px; height: 40px; border: 1px solid var(--c-border); background: transparent; color: var(--c-muted); display: grid; place-items: center; }
.btn-icon.faved { color: #4ade80; border-color: rgba(74,222,128,0.25); }
.my-slot-badge { display: inline-flex; align-items: center; gap: 5px; font-size: 12px; font-weight: 700; color: #fbbf24; background: rgba(251,191,36,0.1); border: 1px solid rgba(251,191,36,0.25); padding: 6px 12px; border-radius: 8px; flex: 1; }
.btn-delete { font-size: 12px; padding: 7px 14px; color: #f87171; border-color: rgba(230,57,70,0.3); }
.btn-delete:hover { background: rgba(230,57,70,0.1); border-color: rgba(230,57,70,0.5); }

.my-slot-badge { display: inline-flex; align-items: center; gap: 5px; font-size: 12px; font-weight: 700; color: #fbbf24; background: rgba(251,191,36,0.1); border: 1px solid rgba(251,191,36,0.25); padding: 3px 10px; border-radius: 100px; }
.slot-card--mine { border-color: rgba(251,191,36,0.2); }
.btn-delete { display: inline-flex; align-items: center; gap: 6px; font-family: 'Onest', sans-serif; font-weight: 600; cursor: pointer; font-size: 13px; padding: 9px 16px; border-radius: 8px; transition: all 0.2s; background: transparent; color: #f87171; border: 1px solid rgba(230,57,70,0.3); }
.btn-delete:hover { background: rgba(230,57,70,0.1); border-color: rgba(230,57,70,0.5); }

/* Modal */
.modal-overlay { position: fixed; inset: 0; z-index: 200; background: rgba(0,0,0,0.75); backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center; padding: 24px; }
.modal { background: var(--c-card); border: 1px solid var(--c-border); border-radius: 20px; width: 100%; max-width: 520px; max-height: 90vh; overflow: auto; }
.modal--sm { max-width: 480px; }
.modal--wide { max-width: 720px; }
.modal-header { display: flex; align-items: flex-start; justify-content: space-between; padding: 22px 26px; border-bottom: 1px solid var(--c-border); gap: 16px; }
.modal-label { font-size: 11px; color: var(--c-muted); text-transform: uppercase; letter-spacing: 0.1em; }
.modal-title { font-family: 'Unbounded', sans-serif; font-size: 18px; font-weight: 700; color: var(--c-white); margin: 6px 0 0; }
.modal-close { background: none; border: none; color: var(--c-muted); font-size: 18px; cursor: pointer; }
.modal-body { padding: 22px 26px; display: flex; flex-direction: column; gap: 16px; }
.modal-footer { display: flex; justify-content: flex-end; gap: 10px; padding: 18px 26px; border-top: 1px solid var(--c-border); }
.modal-summary { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; padding: 14px; background: rgba(255,255,255,0.03); border: 1px solid var(--c-border); border-radius: 12px; }
.summary-item { font-size: 13px; display: inline-flex; align-items: center; gap: 6px; color: var(--c-text); }
.form-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; }
.form-group { display: flex; flex-direction: column; gap: 8px; }
.form-group label { font-size: 12px; font-weight: 600; color: var(--c-muted); text-transform: uppercase; letter-spacing: 0.06em; }
.form-group input, .form-group textarea, .form-group select {
  background: var(--c-surface); border: 1px solid var(--c-border); border-radius: 10px; padding: 10px 14px;
  font-family: 'Onest', sans-serif; font-size: 14px; color: var(--c-text); outline: none;
}
.form-group textarea { resize: vertical; min-height: 72px; }
.tag-select { display: flex; flex-wrap: wrap; gap: 6px; }
.tag-option { font-size: 12px; padding: 5px 12px; border-radius: 100px; border: 1px solid var(--c-border); color: var(--c-muted); cursor: pointer; }
.tag-option.selected { background: var(--c-red-dim); color: var(--c-red); border-color: rgba(230,57,70,0.3); }
.role-option.selected { background: rgba(59,130,246,0.1); color: #93c5fd; border-color: rgba(59,130,246,0.3); }
.apply-target-name { font-family: 'Unbounded', sans-serif; font-size: 14px; font-weight: 700; color: var(--c-white); }

/* Toast */
.toast {
  position: fixed; right: 24px; bottom: 24px; z-index: 220;
  background: #131a30; border: 1px solid rgba(230,57,70,0.24); color: var(--c-white);
  padding: 14px 18px; border-radius: 12px; box-shadow: 0 16px 40px rgba(0,0,0,0.35);
}
.modal-fade-enter-active, .modal-fade-leave-active, .toast-fade-enter-active, .toast-fade-leave-active { transition: opacity 0.2s; }
.modal-fade-enter-from, .modal-fade-leave-to, .toast-fade-enter-from, .toast-fade-leave-to { opacity: 0; }

@media (max-width: 900px) {
  .featured-banner { flex-direction: column; }
  .form-grid, .modal-summary { grid-template-columns: 1fr; }
  .page-header { flex-direction: column; }
  .incoming-header { flex-direction: column; }
}
@media (max-width: 760px) {
  .page-inner { padding: 24px 16px 40px; }
  .cards-grid { grid-template-columns: 1fr; }
  .app-item { flex-direction: column; align-items: flex-start; }
  .incoming-item { flex-direction: column; }
  .incoming-actions { flex-direction: row; align-items: center; width: 100%; justify-content: space-between; }
  .incoming-date { margin-left: 0; }
}
</style>
