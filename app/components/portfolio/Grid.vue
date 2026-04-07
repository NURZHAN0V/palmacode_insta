<!-- Сетка публикаций в духе ленты Instagram -->
<template>
  <div>
    <p
      v-if="posts.length === 0"
      class="glass-panel px-4 py-8 text-center text-sm text-teal-800"
      role="status"
    >
      Ничего не найдено. Измените запрос поиска.
    </p>
    <div v-else class="grid grid-cols-3 gap-1 sm:gap-2 md:gap-4">
      <button
        v-for="post in posts"
        :key="post.id"
        type="button"
        class="group relative aspect-square cursor-pointer overflow-hidden rounded-lg border border-glass-border bg-glass-surface shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
        @click="$emit('open', post)"
      >
        <img
          :src="post.src"
          :alt="post.caption"
          width="400"
          height="400"
          class="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
        <div
          class="absolute inset-0 flex items-center justify-center bg-black/0 transition duration-300 group-hover:bg-black/35 group-focus-visible:bg-black/35"
        >
          <div
            class="flex text-sm font-semibold text-white opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100"
          >
            <span class="inline-flex items-center gap-1.5">
              <Icon name="ri:eye-line" aria-hidden="true" />
              {{ formatViews(post.views) }}
            </span>
          </div>
        </div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PortfolioPost } from '~/stores/portfolio'

defineProps<{
  posts: PortfolioPost[]
}>()

defineEmits<{
  open: [post: PortfolioPost]
}>()

function formatViews(n: number) {
  return n.toLocaleString('ru-RU')
}
</script>
