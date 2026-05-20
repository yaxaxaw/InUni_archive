import {
  buildEducation,
  buildFullName,
  parseFullName,
  UNIVERSITY_NAME,
} from './universityProfile'

const STORAGE_KEY = 'inuni-app-state'

const defaultState = () => ({
  profile: {
    firstName: 'Айдар',
    lastName: 'Бахытов',
    fullName: 'Айдар Бахытов',
    role: 'Frontend Dev',
    direction: 'Информатика и вычислительная техника',
    course: '3 курс',
    education: buildEducation('Информатика и вычислительная техника', '3 курс'),
    email: 'aidar@example.com',
    about: 'Увлекаюсь разработкой на Vue и React, собираю продуктовые интерфейсы и ищу сильную команду для хакатонов и стартапов.',
    interests: ['Vue', 'TypeScript', 'Стартапы', 'Хакатоны'],
    profilePhoto: '',
    github: 'https://github.com/aidar-dev',
    linkedin: 'https://linkedin.com/in/aidar-dev',
  },
  teamApplications: [
    {
      id: 'seed-1',
      kind: 'slot',
      category: 'hackathon',
      title: 'AI Cup Central Asia',
      icon: '🤖',
      role: 'Frontend Dev',
      status: 'pending',
      statusLabel: 'На рассмотрении',
    },
    {
      id: 'seed-2',
      kind: 'slot',
      category: 'startup',
      title: 'HealthTrack App',
      icon: '🏥',
      role: 'Frontend Dev',
      status: 'accepted',
      statusLabel: 'Принят',
    },
  ],
  createdSlots: [],
})

function migrateProfile(raw = {}) {
  const base = defaultState().profile
  const parsed = parseFullName(raw.fullName || '')
  const firstName = raw.firstName || parsed.firstName || base.firstName
  const lastName = raw.lastName || parsed.lastName || base.lastName
  const direction = raw.direction || base.direction
  const course = raw.course || base.course
  const profilePhoto = raw.profilePhoto || (Array.isArray(raw.photos) ? raw.photos[0] : '') || ''

  return {
    ...base,
    ...raw,
    firstName,
    lastName,
    fullName: buildFullName(firstName, lastName) || base.fullName,
    direction,
    course,
    education: buildEducation(direction, course),
    interests: Array.isArray(raw.interests) ? raw.interests : base.interests,
    profilePhoto,
  }
}

function migrateLegacyApplications(parsed) {
  if (parsed.teamApplications?.length) return parsed.teamApplications

  const fromHackathons = (parsed.hackathonApplications || []).map((item) => ({
    id: item.id || `event-${Date.now()}-${Math.random()}`,
    kind: 'event',
    category: 'hackathon',
    title: item.hackathonName || item.title || 'Хакатон',
    icon: '🏆',
    role: item.role || 'Участник',
    teamName: item.teamName,
    fileName: item.fileName,
    status: item.status || 'pending',
    statusLabel: item.statusLabel || 'На рассмотрении',
    createdAt: item.createdAt,
  }))

  const fromProjects = (parsed.projectApplications || []).map((item) => ({
    id: item.id || `slot-${Date.now()}-${Math.random()}`,
    kind: 'slot',
    category: item.category || 'startup',
    title: item.project || item.title || 'Проект',
    icon: item.icon || '🚀',
    role: item.role || 'Участник',
    status: item.status || 'pending',
    statusLabel: item.statusLabel || 'На рассмотрении',
  }))

  return [...fromHackathons, ...fromProjects]
}

export function loadAppState() {
  if (typeof window === 'undefined') return defaultState()

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      const initial = defaultState()
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(initial))
      return initial
    }

    const parsed = JSON.parse(raw)
    const teamApplications = migrateLegacyApplications(parsed)
    const createdSlots = parsed.createdSlots || parsed.createdProjects || []

    return {
      ...defaultState(),
      ...parsed,
      profile: migrateProfile(parsed.profile),
      teamApplications,
      createdSlots,
    }
  } catch {
    return defaultState()
  }
}

export function saveAppState(nextState) {
  if (typeof window === 'undefined') return nextState
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState))
  window.dispatchEvent(new CustomEvent('inuni-state-changed', { detail: nextState }))
  return nextState
}

export function patchAppState(patch) {
  const current = loadAppState()
  const next = {
    ...current,
    ...patch,
    profile: migrateProfile({
      ...current.profile,
      ...(patch.profile || {}),
    }),
  }
  return saveAppState(next)
}

export function createInitials(firstName, lastName) {
  if (lastName === undefined && typeof firstName === 'string' && firstName.includes(' ')) {
    const parsed = parseFullName(firstName)
    return createInitials(parsed.firstName, parsed.lastName)
  }
  return [firstName, lastName]
    .filter(Boolean)
    .map((part) => part.trim()[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export function getHandle(url) {
  try {
    const pathname = new URL(url).pathname.replace(/^\/+|\/+$/g, '')
    return pathname || url
  } catch {
    return url
  }
}

export { UNIVERSITY_NAME }
