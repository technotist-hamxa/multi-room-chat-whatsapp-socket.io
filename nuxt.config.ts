// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@clerk/nuxt'],
  nitro: {
    experimental: {
      websocket: true, // 👈 enable Nitro websocket support
    },
  },
})