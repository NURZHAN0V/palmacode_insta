<!-- Главная: портфолио, вкладки Публикации / Услуги / Товары / Обо мне -->
<template>
  <div>
    <PortfolioNav />

    <main class="mx-auto mb-16 w-full max-w-4xl flex-1 px-4 pb-10 pt-28 md:px-6 md:pt-32">
      <PortfolioProfile />

      <ul
        class="mb-8 flex justify-around border-t border-glass-border py-4 text-sm text-teal-900 md:hidden"
      >
        <li class="text-center">
          <div class="font-semibold">{{ profile.postsCount }}</div>
          <div class="text-teal-700/80">Публикации</div>
        </li>
        <li class="text-center">
          <div class="font-semibold">{{ profile.followersLabel }}</div>
          <div class="text-teal-700/80">Подписчики</div>
        </li>
        <li class="text-center">
          <div class="font-semibold">{{ profile.followingCount }}</div>
          <div class="text-teal-700/80">Подписки</div>
        </li>
      </ul>

      <div
        class="glass-panel mb-6 flex flex-wrap justify-center gap-x-3 gap-y-2 border-t-0 px-1 py-3 text-[10px] font-semibold uppercase tracking-wide text-teal-800 sm:gap-x-5 sm:px-2 sm:text-xs sm:tracking-widest md:gap-x-8"
        role="tablist"
        aria-label="Разделы профиля"
      >
        <button
          v-for="tab in MAIN_TABS"
          :id="`tab-${tab.id}`"
          :key="tab.id"
          type="button"
          role="tab"
          class="inline-flex items-center gap-1.5 border-b-2 pb-2 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 sm:gap-2"
          :class="
            mainTab === tab.id
              ? 'border-teal-600 text-teal-950'
              : 'border-transparent text-teal-500/80 hover:text-teal-800'
          "
          :aria-selected="mainTab === tab.id"
          :aria-controls="`panel-${tab.id}`"
          @click="mainTab = tab.id"
        >
          <Icon :name="tab.icon" class="text-base sm:text-lg" aria-hidden="true" />
          {{ tab.label }}
        </button>
      </div>

      <div
        v-show="mainTab === 'posts'"
        id="panel-posts"
        role="tabpanel"
        aria-labelledby="tab-posts"
        :aria-hidden="mainTab !== 'posts'"
      >
        <PortfolioHighlights :highlights="highlights" />
        <PortfolioGrid :posts="filteredPosts" @open="openPost" />
      </div>

      <div
        v-show="mainTab === 'services'"
        id="panel-services"
        role="tabpanel"
        aria-labelledby="tab-services"
        :aria-hidden="mainTab !== 'services'"
      >
        <PortfolioServices />
      </div>

      <div
        v-show="mainTab === 'goods'"
        id="panel-goods"
        role="tabpanel"
        aria-labelledby="tab-goods"
        :aria-hidden="mainTab !== 'goods'"
      >
        <PortfolioGoods />
      </div>

      <div
        v-show="mainTab === 'about'"
        id="panel-about"
        role="tabpanel"
        aria-labelledby="tab-about"
        :aria-hidden="mainTab !== 'about'"
      >
        <PortfolioAbout />
      </div>
    </main>

    <footer class="glass-panel mx-auto mb-6 mt-auto max-w-4xl px-4 py-6 text-center text-xs text-teal-800/90">
      <p class="font-comfortaa">© {{ year }} Портфолио мастера · Palmacode</p>
    </footer>

    <AsyncPortfolioModal :open="modalOpen" :post="selectedPost" @close="closeModal" />
  </div>
</template>

<script setup lang="ts">
import type { PortfolioPost } from '~/stores/portfolio'

/** Вкладки основного контента (порядок как в интерфейсе) */
const MAIN_TABS = [
  { id: 'posts', label: 'Публикации', icon: 'ri:grid-line' },
  { id: 'services', label: 'Услуги', icon: 'ri:briefcase-line' },
  { id: 'goods', label: 'Товары', icon: 'ri:shopping-bag-3-line' },
  { id: 'about', label: 'Обо мне', icon: 'ri:user-line' },
] as const

type MainTab = (typeof MAIN_TABS)[number]['id']

/** Модалка подгружается отдельным чанком — не блокирует первый экран */
const AsyncPortfolioModal = defineAsyncComponent(() =>
  import('~/components/portfolio/Modal.vue'),
)

const store = usePortfolioStore()
const profile = computed(() => store.profile)
const highlights = computed(() => store.highlights)
const filteredPosts = computed(() => store.filteredPosts)

const mainTab = ref<MainTab>('posts')

const modalOpen = ref(false)
const selectedPost = ref<PortfolioPost | null>(null)
const year = new Date().getFullYear()

function openPost(post: PortfolioPost) {
  selectedPost.value = post
  modalOpen.value = true
}

function closeModal() {
  modalOpen.value = false
  selectedPost.value = null
}

useSeoMeta({
  title: 'Портфолио мастера',
  description: 'Работы и контакты специалиста',
  robots: 'noindex, nofollow',
})
</script>
