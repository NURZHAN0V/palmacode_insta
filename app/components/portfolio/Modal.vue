<!-- Полноэкранный просмотр работы: только просмотр и контакты, без комментариев и входа -->
<template>
  <Teleport to="body">
    <div
      v-if="open && post"
      class="modal fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      :aria-labelledby="titleId"
    >
      <div
        class="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        @click="emitClose"
      />
      <div
        class="relative z-10 flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/10 md:flex-row"
      >
        <button
          type="button"
          class="absolute right-2 top-2 z-20 inline-flex rounded-lg bg-white/95 p-2 text-teal-900 shadow-md ring-1 ring-black/10 transition hover:bg-teal-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
          aria-label="Закрыть"
          @click="emitClose"
        >
          <Icon name="ri:close-line" class="text-2xl" aria-hidden="true" />
        </button>

        <!-- Кадр 4:5 как у вертикальных постов в ленте; object-cover без «чёрных полос» -->
        <div
          class="relative flex w-full shrink-0 justify-center bg-zinc-950 md:w-3/5 md:max-h-[92vh] md:items-center"
        >
          <div
            class="relative w-full max-h-[min(78vh,100vw)] overflow-hidden [aspect-ratio:4/5] md:max-h-[85vh]"
          >
            <img
              :src="post.src"
              :alt="post.caption"
              class="h-full w-full object-cover"
            />
          </div>
        </div>

        <div
          class="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto bg-gradient-to-br from-white via-teal-50 to-warm-100 p-5 md:w-2/5 md:p-6"
        >
          <h2 :id="titleId" class="sr-only">Просмотр работы</h2>
          <div class="flex items-center gap-3 border-b border-teal-200/70 pb-4">
            <img
              :src="profile.avatarSrc"
              alt=""
              width="36"
              height="36"
              class="h-9 w-9 rounded-full border border-teal-200 object-cover shadow-sm"
            />
            <span class="font-comfortaa font-semibold text-teal-950">{{ profile.username }}</span>
          </div>
          <p class="text-sm leading-relaxed text-teal-900">
            {{ post.caption }}
          </p>
          <div class="text-xs text-teal-700">
            Просмотры:
            <span class="font-semibold text-teal-900">{{ formatViews(post.views) }}</span>
          </div>
          <div v-if="postThemeLabels.length" class="text-xs text-teal-700">
            {{ postThemeLabels.length === 1 ? 'Тема:' : 'Темы:' }}
            <span class="font-medium text-teal-900">{{ postThemeLabels.join(' · ') }}</span>
          </div>
          <div class="mt-auto flex flex-wrap gap-2 border-t border-teal-200/70 pt-4">
            <a
              :href="profile.whatsappHref"
              class="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-teal-600 px-3 py-2 text-sm font-medium text-teal-50 transition hover:bg-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 min-[400px]:flex-none"
            >
              <Icon name="ri:whatsapp-line" aria-hidden="true" />
              WhatsApp
            </a>
            <a
              :href="profile.telegramHref"
              class="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-teal-500 px-3 py-2 text-sm font-medium text-teal-50 transition hover:bg-teal-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 min-[400px]:flex-none"
            >
              <Icon name="ri:telegram-line" aria-hidden="true" />
              Telegram
            </a>
            <a
              :href="`mailto:${profile.email}`"
              class="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-teal-300/80 bg-white/90 px-3 py-2 text-sm font-medium text-teal-900 shadow-sm transition hover:bg-teal-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 sm:w-auto"
            >
              <Icon name="ri:mail-line" aria-hidden="true" />
              Email
            </a>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import type { PortfolioPost } from '~/stores/portfolio'

const props = defineProps<{
  open: boolean
  post: PortfolioPost | null
}>()

const emit = defineEmits<{
  close: []
}>()

const store = usePortfolioStore()
const profile = computed(() => store.profile)
const highlights = computed(() => store.highlights)

/** Подписи тем по id из подборок */
const postThemeLabels = computed(() => {
  const p = props.post
  if (!p?.themeIds?.length) {
    return [] as string[]
  }
  const byId = new Map(highlights.value.map((h) => [h.id, h.label]))
  return p.themeIds.map((id) => byId.get(id)).filter((x): x is string => Boolean(x))
})

const titleId = 'portfolio-modal-title'

function emitClose() {
  emit('close')
}

/** Форматирование числа просмотров для интерфейса */
function formatViews(n: number) {
  return n.toLocaleString('ru-RU')
}

/** Блокировка прокрутки body при открытой модалке */
watch(
  () => props.open && props.post,
  (isOpen) => {
    if (import.meta.client) {
      document.body.classList.toggle('overflow-hidden', Boolean(isOpen))
    }
  },
  { immediate: true },
)

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && props.open) {
    emitClose()
  }
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  document.body.classList.remove('overflow-hidden')
})
</script>

<style scoped>
.modal {
  animation: modal-in 0.22s ease-out;
}
@keyframes modal-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
