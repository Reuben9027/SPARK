// composables/useCurrentUser.js
import { ref } from 'vue'

export const useCurrentUser = () => {
  const { $auth } = useNuxtApp()
  const user = ref($auth.currentUser)

  if (process.client) {
    $auth.onAuthStateChanged((u) => {
      user.value = u
    })
  }

  return { user }
}
