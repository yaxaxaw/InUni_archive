/** InUni — только для одного университета (внутреннее использование) */
export const UNIVERSITY_NAME = 'КБТУ'
export const UNIVERSITY_TAGLINE = 'Закрытая сеть для студентов КБТУ'

export const COURSE_OPTIONS = [
  '1 курс',
  '2 курс',
  '3 курс',
  '4 курс',
  '5 курс',
  '6 курс',
  'Магистратура 1 курс',
  'Магистратура 2 курс',
  'Аспирантура',
]

export const DIRECTION_OPTIONS = [
  'Информатика и вычислительная техника',
  'Компьютерная инженерия',
  'Прикладная математика',
  'Электроника и наноэлектроника',
  'Промышленное проектирование',
  'Искусственный интеллект',
  'Общая медицина',
  'Педиатрия',
  'Экономика',
  'Менеджмент',
  'Международные отношения',
  'Международное право',
  'Бизнес-право',
  'Журналистика',
  'Медиа и визуальное искусство',
  'Психология',
  'Педагогика',
  'Лингвистика',
  'Английский язык и литература',
  'Синхронный перевод',
  'Китайский язык и литература',
  'Тюркология',
]

export const SKILL_OPTIONS = [
  'Vue',
  'React',
  'TypeScript',
  'JavaScript',
  'Python',
  'Java',
  'C++',
  'Go',
  'Node.js',
  'FastAPI',
  'Django',
  'PostgreSQL',
  'MongoDB',
  'Docker',
  'Kubernetes',
  'AWS',
  'Figma',
  'UI/UX',
  'Product Management',
  'ML / AI',
  'Data Science',
  'Mobile (iOS)',
  'Mobile (Android)',
  'Flutter',
  'DevOps',
  'Cybersecurity',
  'Blockchain',
  'Стартапы',
  'Хакатоны',
  'Open Source',
  'EdTech',
  'Fintech',
  'HealthTech',
  'GameDev',
]

export function parseFullName(fullName = '') {
  const parts = fullName.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return { firstName: '', lastName: '' }
  if (parts.length === 1) return { firstName: parts[0], lastName: '' }
  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(' '),
  }
}

export function buildFullName(firstName, lastName) {
  return [firstName, lastName].map((p) => p?.trim()).filter(Boolean).join(' ')
}

export function buildEducation(direction, course) {
  const parts = [UNIVERSITY_NAME, direction, course].filter(Boolean)
  return parts.join(' • ')
}
