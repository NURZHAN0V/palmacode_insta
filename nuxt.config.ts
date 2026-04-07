// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  ssr: false,
  css: ['~/assets/css/main.css'],
  modules: [
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt'
  ],
  tailwindcss: {
    exposeConfig: true,
    viewer: true,
  },
  // Конфигурация для статической генерации (GitHub Pages)
  app: {
    baseURL: process.env.NODE_ENV === 'production' ? '/palmacode_insta/' : '/',
    buildAssetsDir: '/_nuxt/',
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/']
    }
  }
})