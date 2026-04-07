<!-- Вкладка «Услуги»: карточки услуг из стора -->
<template>
  <section class="space-y-4" aria-labelledby="services-heading">
    <h2 id="services-heading" class="sr-only">Услуги</h2>
    <article
      v-for="item in services"
      :key="item.id"
      class="glass-panel p-5 md:p-6"
    >
      <h3 class="font-comfortaa text-lg font-bold text-teal-950 md:text-xl">
        {{ item.title }}
      </h3>
      <p class="mt-2 text-sm leading-relaxed text-teal-900 md:text-base">
        {{ item.description }}
      </p>
      <p
        v-if="item.priceHint"
        class="mt-3 text-sm font-semibold text-teal-700"
      >
        {{ item.priceHint }}
      </p>
    </article>
  </section>
</template>

<script setup lang="ts">
const store = usePortfolioStore()
const services = computed(() => store.services)
</script>
