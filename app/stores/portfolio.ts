import { defineStore } from 'pinia'

/** Аватар владельца (внешняя ссылка) */
const PROFILE_AVATAR_SRC =
  'https://i.oneme.ru/i?r=BTE2sh_eZW7g8kugOdIm2Not5edgD8SbvmtiNt8r-WrK_nm42-_deBKZxG96X7mz_B4'

/** Элемент сетки портфолио (публикация) */
export interface PortfolioPost {
  id: string
  src: string
  caption: string
  /** Число просмотров (демо; без лайков) */
  views: number
  /** Id тем из `highlights` (один пост может относиться к нескольким темам) */
  themeIds: string[]
}

/** Тема-подборка: фильтр для постов ниже */
export interface PortfolioHighlight {
  id: string
  label: string
  thumbSrc: string
}

/** Публичный профиль мастера */
export interface PortfolioProfile {
  username: string
  displayName: string
  bioLines: string[]
  avatarSrc: string
  postsCount: number
  followersLabel: string
  followingCount: number
  whatsappHref: string
  telegramHref: string
  email: string
}

/** Расширенный блок «Обо мне» (вкладка на главной) */
export interface PortfolioAbout {
  /** Абзацы под заголовком */
  paragraphs: string[]
  /** Навыки / стек — чипы */
  skills: string[]
  /** Короткие пункты опыта или принципов работы */
  bullets: string[]
}

/** Услуга (вкладка «Услуги») */
export interface PortfolioService {
  id: string
  title: string
  description: string
  /** Подпись к цене: «от …», «по запросу» */
  priceHint?: string
}

/** Товар / предложение (вкладка «Товары») */
export interface PortfolioProduct {
  id: string
  title: string
  description: string
  /** Цена или диапазон (демо) */
  price?: string
}

export const usePortfolioStore = defineStore('portfolio', () => {
  const profile = ref<PortfolioProfile>({
    username: 'palmacode_dev',
    displayName: 'Full‑stack разработчик · Palmacode',
    bioLines: [
      '💻 Vue, Nuxt, TypeScript — от лендингов до личных кабинетов и интеграций с API',
      '🛠️ Проектирую архитектуру фронта, делаю понятный UI и аккуратную верстку',
      '📍 Удалённо · ответ в течение рабочего дня',
      '👇 Напишите в мессенджер или на почту — обсудим задачу и сроки',
    ],
    avatarSrc: PROFILE_AVATAR_SRC,
    postsCount: 24,
    followersLabel: '3.2k',
    followingCount: 128,
    whatsappHref: 'https://wa.me/',
    telegramHref: 'https://t.me/',
    email: 'hello@palmacode.example',
  })

  const about = ref<PortfolioAbout>({
    paragraphs: [
      'Делаю клиентские приложения на Vue и Nuxt: личные кабинеты, каталоги, админки, лендинги. Слежу за доступностью интерфейса и предсказуемым поведением форм.',
      'На бэкенд смотрю как потребитель API: договариваемся о контрактах, ошибках и версионировании; на фронте — типизация, обработка состояний загрузки и ошибок.',
    ],
    skills: [
      'Vue 3',
      'Nuxt 4',
      'TypeScript',
      'Pinia',
      'Tailwind CSS',
      'Vitest',
      'REST / OpenAPI',
    ],
    bullets: [
      'Спека и согласование сроков до старта разработки',
      'Код-ревью и единый стиль в рамках команды',
      'Передача проекта с краткой документацией по запуску',
    ],
  })

  const services = ref<PortfolioService[]>([
    {
      id: 's1',
      title: 'Разработка фронта под ключ',
      description:
        'Личный кабинет, каталог, админка на Nuxt/Vue: от макета или ТЗ до деплоя, с адаптивом и базовой a11y.',
      priceHint: 'от 120 000 ₽',
    },
    {
      id: 's2',
      title: 'Аудит и рефакторинг проекта',
      description:
        'Разбор архитектуры, бандла, типизации и UX-узких мест; отчёт с приоритетами и оценкой трудозатрат.',
      priceHint: 'от 25 000 ₽',
    },
    {
      id: 's3',
      title: 'Интеграции и слой данных',
      description:
        'Подключение REST/OpenAPI, обработка ошибок, состояния загрузки, согласование контрактов с бэкендом.',
      priceHint: 'по запросу',
    },
  ])

  const products = ref<PortfolioProduct[]>([
    {
      id: 'g1',
      title: 'Шаблон портфолио (Nuxt 4)',
      description:
        'Готовая витрина работ в стиле ленты: сетка, модалка, темы, вкладки. Кастомизация контента через конфиг.',
      price: '4 900 ₽',
    },
    {
      id: 'g2',
      title: 'Консультация 60 минут',
      description: 'Разбор задачи, стека, оценка сроков и рисков; созвон или переписка в удобном формате.',
      price: '3 000 ₽',
    },
    {
      id: 'g3',
      title: 'Чек-лист приёмки фронта',
      description: 'PDF: доступность, метрики, SEO-база, ошибки сети — что проверить перед сдачей.',
      price: '990 ₽',
    },
  ])

  const highlights = ref<PortfolioHighlight[]>([
    { id: '1', label: 'Nuxt & Vue', thumbSrc: PROFILE_AVATAR_SRC },
    { id: '2', label: 'TypeScript', thumbSrc: PROFILE_AVATAR_SRC },
    { id: '3', label: 'API / SSR', thumbSrc: PROFILE_AVATAR_SRC },
    { id: '4', label: 'UI / a11y', thumbSrc: PROFILE_AVATAR_SRC },
    { id: '5', label: 'Пет‑проекты', thumbSrc: PROFILE_AVATAR_SRC },
  ])

  const posts = ref<PortfolioPost[]>([
    {
      id: 'p1',
      src: 'https://image.qwenlm.ai/public_source/0d8b5696-aa3f-4fb7-ab12-0f167997060c/1ee2f42ae-6769-45a3-ba0a-0eb0c52a8cea.png',
      caption: 'Личный кабинет клиента: Nuxt 4 + Pinia, тёмная тема',
      views: 1240,
      themeIds: ['1', '2'],
    },
    {
      id: 'p2',
      src: 'https://image.qwenlm.ai/public_source/0d8b5696-aa3f-4fb7-ab12-0f167997060c/19d421642-f7f5-4089-85f5-3e27e4da0c94.png',
      caption: 'Схема модулей и потоков данных для B2B‑портала',
      views: 980,
      themeIds: ['2', '3'],
    },
    {
      id: 'p3',
      src: 'https://image.qwenlm.ai/public_source/0d8b5696-aa3f-4fb7-ab12-0f167997060c/1adaef0f4-a4d9-4e42-82fc-8dac62ff95dc.png',
      caption: 'Дизайн‑система: токены, сетка, компоненты в Figma → код',
      views: 1580,
      themeIds: ['4', '5'],
    },
    {
      id: 'p4',
      src: 'https://image.qwenlm.ai/public_source/0d8b5696-aa3f-4fb7-ab12-0f167997060c/130020fe9-a83c-48b5-ae86-4080b3e60ed7.png',
      caption: 'Адаптивная вёрстка и жесты для PWA на мобильных',
      views: 720,
      themeIds: ['1', '4'],
    },
    {
      id: 'p5',
      src: 'https://image.qwenlm.ai/public_source/0d8b5696-aa3f-4fb7-ab12-0f167997060c/1dc4919b0-83cb-473b-b076-615a3c687d5c.png',
      caption: 'Интеграция REST и очередей: схема обмена с бекендом',
      views: 1890,
      themeIds: ['3'],
    },
    {
      id: 'p6',
      src: 'https://image.qwenlm.ai/public_source/0d8b5696-aa3f-4fb7-ab12-0f167997060c/13fc54613-9464-4019-88f6-61a20d8840c3.png',
      caption: 'Оптимизация бандла: lazy‑routes и сплит чанков',
      views: 1120,
      themeIds: ['1', '2'],
    },
    {
      id: 'p7',
      src: 'https://image.qwenlm.ai/public_source/0d8b5696-aa3f-4fb7-ab12-0f167997060c/121b80afb-5eff-497d-9115-840d25ea9002.png',
      caption: 'Формы и валидация: доступность и понятные ошибки',
      views: 1420,
      themeIds: ['4'],
    },
    {
      id: 'p8',
      src: 'https://image.qwenlm.ai/public_source/0d8b5696-aa3f-4fb7-ab12-0f167997060c/1f727b125-a9e7-4f0b-acf1-a37be6943eb0.png',
      caption: 'Стеклянный UI и градиенты: референс для промо‑страницы',
      views: 2400,
      themeIds: ['4', '5'],
    },
  ])

  /** Выбранная тема: `null` — показать все посты */
  const selectedThemeId = ref<string | null>(null)

  const filteredPosts = computed(() => {
    const id = selectedThemeId.value
    if (!id) {
      return posts.value
    }
    return posts.value.filter((p) => p.themeIds.includes(id))
  })

  /** Переключение темы: повторный клик по активной снимает фильтр */
  function toggleTheme(themeId: string) {
    selectedThemeId.value = selectedThemeId.value === themeId ? null : themeId
  }

  /** Показать все публикации (сброс фильтра по теме) */
  function showAllPublications() {
    selectedThemeId.value = null
  }

  return {
    profile,
    about,
    services,
    products,
    highlights,
    posts,
    selectedThemeId,
    filteredPosts,
    toggleTheme,
    showAllPublications,
  }
})
