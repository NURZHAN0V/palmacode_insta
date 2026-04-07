<!-- Верхняя панель: бренд слева, навигация справа (без поиска) -->
<template>
  <nav
    class="glass-panel fixed left-0 right-0 top-0 z-40 mx-3 mt-3 max-w-5xl md:mx-auto"
    aria-label="Основная навигация портфолио"
  >
    <div class="flex h-14 items-center justify-between px-4 md:h-16 md:px-6">
      <NuxtLink
        to="/"
        class="font-comfortaa text-lg font-bold tracking-tight text-teal-900 transition hover:text-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 md:text-xl"
        aria-label="PortfolioInsta — на главную"
      >
        PortfolioInsta
      </NuxtLink>

      <div class="flex items-center gap-4 text-teal-900 md:gap-6">
        <NuxtLink
          to="/"
          class="rounded-lg p-1 opacity-90 transition hover:bg-white/20 hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
          aria-label="На главную"
        >
          <Icon name="ri:home-5-line" class="text-xl" aria-hidden="true" />
        </NuxtLink>
        <button
          type="button"
          class="rounded-lg p-1 transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
          aria-label="Поделиться страницей"
          @click="sharePage"
        >
          <Icon name="ri:share-line" class="text-xl" aria-hidden="true" />
        </button>
        <img
          :src="profile.avatarSrc"
          alt=""
          width="28"
          height="28"
          class="h-7 w-7 rounded-full border border-glass-border object-cover"
        />
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
const store = usePortfolioStore()
const profile = computed(() => store.profile)

/** Системный диалог «Поделиться» или копирование ссылки в буфер */
async function sharePage() {
  if (!import.meta.client) {
    return
  }
  const url = window.location.href
  const title = document.title || 'Портфолио'
  try {
    if (typeof navigator !== 'undefined' && navigator.share) {
      await navigator.share({ title, url })
      return
    }
  } catch (e) {
    const err = e as { name?: string }
    if (err.name === 'AbortError') {
      return
    }
  }
  try {
    await navigator.clipboard.writeText(url)
  } catch {
    /* нет прав на буфер — тихо пропускаем */
  }
}
</script>
