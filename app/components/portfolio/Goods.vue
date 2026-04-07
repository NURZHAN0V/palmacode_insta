<!-- Вкладка «Товары»: карточки товаров и цифровых предложений -->
<template>
  <section class="space-y-4" aria-labelledby="goods-heading">
    <h2 id="goods-heading" class="sr-only">Товары</h2>
    <article
      v-for="item in products"
      :key="item.id"
      class="glass-panel flex flex-col gap-2 p-5 md:flex-row md:items-start md:justify-between md:gap-6 md:p-6"
    >
      <div class="min-w-0 flex-1">
        <h3 class="font-comfortaa text-lg font-bold text-teal-950 md:text-xl">
          {{ item.title }}
        </h3>
        <p class="mt-2 text-sm leading-relaxed text-teal-900 md:text-base">
          {{ item.description }}
        </p>
      </div>
      <p
        v-if="item.price"
        class="shrink-0 text-lg font-semibold text-teal-800 md:text-right"
      >
        {{ item.price }}
      </p>
    </article>
  </section>
</template>

<script setup lang="ts">
const store = usePortfolioStore()
const products = computed(() => store.products)
</script>
