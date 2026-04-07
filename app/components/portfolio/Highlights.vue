<!-- Темы-подборки: «Все публикации» + темы; активная — градиентное кольцо -->
<template>
  <div
    class="mb-8 flex gap-4 overflow-x-auto pb-2 md:gap-8 [&::-webkit-scrollbar]:hidden"
    style="scrollbar-width: none; -ms-overflow-style: none"
    role="toolbar"
    aria-label="Фильтр публикаций по теме"
  >
    <!-- Все публикации (без фильтра по теме) -->
    <button
      type="button"
      class="group flex w-[4.5rem] flex-shrink-0 flex-col items-center gap-1 rounded-2xl text-center transition duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-teal-500/30 md:w-20"
      :aria-pressed="isAllSelected"
      :aria-label="
        isAllSelected
          ? 'Показаны все публикации'
          : 'Показать все публикации без фильтра по теме'
      "
      @click="store.showAllPublications()"
    >
      <div
        v-if="isAllSelected"
        class="h-16 w-16 flex-shrink-0 md:h-20 md:w-20"
      >
        <div
          class="h-full w-full rounded-full p-[3px] [background:linear-gradient(45deg,#FCC5A2_0%,#F67A52_22%,#13B4BD_55%,#0D9AA3_78%,#085E65_100%)]"
        >
          <div class="flex h-full w-full items-center justify-center rounded-full bg-white/90 p-[3px]">
            <Icon
              name="ri:layout-grid-line"
              class="text-2xl text-teal-800 md:text-3xl"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
      <span
        v-else
        class="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full p-1 transition duration-200 md:h-20 md:w-20"
        :class="inactiveCircleClass"
      >
        <Icon
          name="ri:layout-grid-line"
          class="text-2xl text-teal-800 md:text-3xl"
          aria-hidden="true"
        />
      </span>
      <span
        class="text-[11px] font-medium leading-tight text-teal-900 transition group-hover:text-teal-950 md:text-xs"
        :class="isAllSelected ? 'font-semibold text-teal-950' : ''"
      >
        Все публикации
      </span>
    </button>

    <button
      v-for="h in highlights"
      :key="h.id"
      type="button"
      class="group flex w-[4.5rem] flex-shrink-0 flex-col items-center gap-1 rounded-2xl text-center transition duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-teal-500/30 md:w-20"
      :aria-pressed="selectedId === h.id"
      :aria-label="`Тема: ${h.label}. ${selectedId === h.id ? 'Активна' : 'Показать посты по теме'}`"
      @click="store.toggleTheme(h.id)"
    >
      <div
        v-if="selectedId === h.id"
        class="h-16 w-16 flex-shrink-0 md:h-20 md:w-20"
      >
        <div
          class="h-full w-full rounded-full p-[3px] [background:linear-gradient(45deg,#FCC5A2_0%,#F67A52_22%,#13B4BD_55%,#0D9AA3_78%,#085E65_100%)]"
        >
          <div class="h-full w-full rounded-full bg-white/90 p-[3px]">
            <img
              :src="h.thumbSrc"
              alt=""
              width="80"
              height="80"
              class="h-full w-full rounded-full object-cover"
            />
          </div>
        </div>
      </div>
      <span
        v-else
        class="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full p-1 transition duration-200 md:h-20 md:w-20"
        :class="inactiveCircleClass"
      >
        <img
          :src="h.thumbSrc"
          alt=""
          width="80"
          height="80"
          class="h-full w-full rounded-full object-cover"
        />
      </span>
      <span
        class="text-xs font-medium text-teal-900 transition group-hover:text-teal-950"
        :class="selectedId === h.id ? 'font-semibold text-teal-950' : ''"
      >{{ h.label }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import type { PortfolioHighlight } from '~/stores/portfolio'

defineProps<{
  highlights: PortfolioHighlight[]
}>()

const store = usePortfolioStore()
const selectedId = computed(() => store.selectedThemeId)

/** Режим «все публикации» — фильтр по теме не выбран */
const isAllSelected = computed(() => selectedId.value === null)

/** Неактивная тема: стекло и усиление при hover */
const inactiveCircleClass =
  'border border-white/25 bg-white/10 shadow-sm backdrop-blur-md group-hover:border-glass-border group-hover:bg-glass-surface group-hover:shadow-glass group-hover:shadow-glass-inset group-hover:backdrop-blur-glass'
</script>
