<!-- Шапка профиля: аватар, статистика, био и кнопки связи (без входа для посетителей) -->
<template>
  <header class="mb-8 flex flex-col items-center md:mb-12 md:flex-row md:items-start">
    <div class="mb-6 flex-shrink-0 md:mb-0 md:mr-12">
      <div
        class="rounded-full p-[3px] [background:linear-gradient(45deg,#FCC5A2_0%,#F67A52_22%,#13B4BD_55%,#0D9AA3_78%,#085E65_100%)]"
      >
        <div class="rounded-full bg-white/90 p-[3px]">
          <img
            :src="profile.avatarSrc"
            alt="Фото профиля"
            width="144"
            height="144"
            class="h-28 w-28 rounded-full object-cover md:h-36 md:w-36"
          />
        </div>
      </div>
    </div>

    <div class="w-full flex-grow text-center md:text-left">
      <div class="mb-4 flex flex-col items-center gap-3 md:flex-row md:items-start">
        <h2 class="text-xl font-light text-teal-950 md:text-2xl">
          {{ profile.username }}
        </h2>
        <div class="flex flex-wrap justify-center gap-2 md:justify-start">
          <a
            :href="profile.whatsappHref"
            class="glass-panel-strong inline-flex items-center gap-2 rounded-lg px-5 py-2 text-sm font-semibold text-teal-900 transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
          >
            <Icon name="ri:whatsapp-line" class="text-lg" aria-hidden="true" />
            WhatsApp
          </a>
          <a
            :href="profile.telegramHref"
            class="glass-panel-strong inline-flex items-center gap-2 rounded-lg px-5 py-2 text-sm font-semibold text-teal-900 transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
          >
            <Icon name="ri:telegram-line" class="text-lg" aria-hidden="true" />
            Telegram
          </a>
          <a
            :href="`mailto:${profile.email}`"
            class="glass-panel-strong inline-flex items-center gap-2 rounded-lg px-5 py-2 text-sm font-semibold text-teal-900 transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
          >
            <Icon name="ri:mail-line" class="text-lg" aria-hidden="true" />
            Email
          </a>
        </div>
      </div>

      <ul class="mb-4 hidden gap-10 text-base text-teal-900 md:flex">
        <li>
          <span class="font-semibold">{{ profile.postsCount }}</span>
          публикаций
        </li>
        <li>
          <span class="font-semibold">{{ profile.followersLabel }}</span>
          подписчиков
        </li>
        <li>
          <span class="font-semibold">{{ profile.followingCount }}</span>
          подписок
        </li>
      </ul>

      <div class="space-y-2 text-sm md:text-base">
        <h1 class="font-comfortaa text-lg font-bold text-teal-950">
          {{ profile.displayName }}
        </h1>
        <p class="whitespace-pre-line text-teal-900/90">
          {{ bioText }}
        </p>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const store = usePortfolioStore()
const profile = computed(() => store.profile)

const bioText = computed(() => profile.value.bioLines.join('\n'))
</script>
