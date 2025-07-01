// plugins/firebase.client.js
import { initializeApp, getApps, getApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

export default defineNuxtPlugin(nuxtApp => {
  const firebaseConfig = {
    apiKey: import.meta.env.NUXT_PUBLIC_API_KEY,
    authDomain: import.meta.env.NUXT_PUBLIC_AUTH_DOMAIN,
    projectId: import.meta.env.NUXT_PUBLIC_PROJECT_ID,
    appId: import.meta.env.NUXT_PUBLIC_APP_ID
  }

  // ? Check if Firebase is already initialized
  const app = getApps().length ? getApp() : initializeApp(firebaseConfig)

  const auth = getAuth(app)
  const provider = new GoogleAuthProvider()

  nuxtApp.provide('auth', auth)
  nuxtApp.provide('provider', provider)
})
