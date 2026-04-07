<!-- Вкладка «Обо мне»: текст, стек, принципы, контакты -->
<template>
  <section
    class="glass-panel space-y-6 p-5 text-teal-900 md:p-8"
    aria-labelledby="about-heading"
  >
    <h2 id="about-heading" class="font-comfortaa text-xl font-bold text-teal-950 md:text-2xl">
      Обо мне
    </h2>

    <div class="space-y-4 text-sm leading-relaxed md:text-base">
      <p v-for="(p, i) in about.paragraphs" :key="i">
        {{ p }}
      </p>
    </div>

    <div>
      <h3 class="mb-3 text-xs font-semibold uppercase tracking-wider text-teal-800">
        Стек и инструменты
      </h3>
      <ul class="flex flex-wrap gap-2" role="list">
        <li v-for="skill in about.skills" :key="skill">
          <span
            class="inline-flex rounded-full border border-teal-200/80 bg-white/50 px-3 py-1 text-xs font-medium text-teal-900 backdrop-blur-sm md:text-sm"
          >
            {{ skill }}
          </span>
        </li>
      </ul>
    </div>

    <div>
      <h3 class="mb-3 text-xs font-semibold uppercase tracking-wider text-teal-800">
        Как работаю
      </h3>
      <ul class="list-inside list-disc space-y-2 text-sm md:text-base">
        <li v-for="(b, i) in about.bullets" :key="i">
          {{ b }}
        </li>
      </ul>
    </div>

    <div class="border-t border-teal-200/70 pt-5">
      <h3 class="mb-3 text-xs font-semibold uppercase tracking-wider text-teal-800">
        Связаться
      </h3>
      <div class="flex flex-wrap gap-2">
        <a
          :href="profile.whatsappHref"
          class="glass-panel-strong inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-teal-900 transition hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
        >
          <Icon name="ri:whatsapp-line" class="text-lg" aria-hidden="true" />
          WhatsApp
        </a>
        <a
          :href="profile.telegramHref"
          class="glass-panel-strong inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-teal-900 transition hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
        >
          <Icon name="ri:telegram-line" class="text-lg" aria-hidden="true" />
          Telegram
        </a>
        <a
          :href="`mailto:${profile.email}`"
          class="glass-panel-strong inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-teal-900 transition hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
        >
          <Icon name="ri:mail-line" class="text-lg" aria-hidden="true" />
          {{ profile.email }}
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const store = usePortfolioStore()
const about = computed(() => store.about)
const profile = computed(() => store.profile)
</script>
