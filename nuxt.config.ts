// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  build: {
    transpile: ['vuetify'],
  },
  css: ['vuetify/styles'],
  vite: {
    define: {
      'process.env.DEBUG': false,
    },
  },

  ssr: true,
  nitro:{
    preset: 'node-server',
  },

  modules: ["nuxt-vuefire"],
  
  vuefire: {
    config: {
      apiKey: process.env.NUXT_PUBLIC_API_KEY,
      authDomain: process.env.NUXT_PUBLIC_AUTH_DOMAIN,
      projectId: process.env.NUXT_PUBLIC_PROJECT_ID,
      storageBucket: process.env.NUXT_PUBLIC_STORAGE_BUCKET,
      messagingSenderId: process.env.NUXT_PUBLIC_MESSAGING_SENDER_ID,
      appId: process.env.NUXT_PUBLIC_APP_ID,
      measurementId: process.env.NUXT_PUBLIC_MEASUREMENT_ID,
    }, 
    auth: {
      enabled: true,
      sessionCookie: false, // Corrected property name
    },
    // rtdb: true,
    // firestore: true,
    // storage: true,e
  },
  runtimeConfig: {
      // GOOGLE_APPLICATION_CREDENTIALS: process.env.GOOGLE_APPLICATION_CREDENTIALS,
      FIREBASE_ADMIN_CREDENTIALS:process.env.FIREBASE_ADMIN_CREDENTIALS
  }
})
