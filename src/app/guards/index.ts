import { useAuthStore } from '@/stores'

export function requireAuth() {
  const store = useAuthStore()
  return store.loggedInUser !== null
}
