import { defineStore } from 'pinia'
import { authService } from '@/services'
import type { ICredentials, IUser } from '@/types'

interface IAuthState {
  loggedInUser: IUser | null
  isSubmitting: boolean
}

const initialState: IAuthState = {
  loggedInUser: null,
  isSubmitting: false,
}

export const useAuthStore = defineStore('[Auth API]', {
  state: () => ({ ...initialState }),

  actions: {
    setLoggedInUser(user: IUser | null) {
      this.loggedInUser = user
    },

    async signupUser(userData: IUser) {
      this.isSubmitting = true
      try {
        const { user, token } = await authService.signup(userData)
        authService.saveAuthToken(token)
        this.loggedInUser = user
        return user
      } finally {
        this.isSubmitting = false
      }
    },

    async loginUser(credentials: ICredentials) {
      this.isSubmitting = true
      try {
        const { user, token } = await authService.login(credentials)
        authService.saveAuthToken(token)
        this.loggedInUser = user
        return user
      } finally {
        this.isSubmitting = false
      }
    },

    async logoutUser() {
      this.isSubmitting = true
      try {
        await authService.logout()
        authService.clearAuthToken()
        this.loggedInUser = null
      } finally {
        this.isSubmitting = false
      }
    },

    async loadUser() {
      this.isSubmitting = true
      try {
        const token = authService.loadAuthToken()
        if (!token) return

        const { user } = await authService.verifyToken(token)
        this.loggedInUser = user
        return user
      } catch (error) {
        // Incase of invalid token remove from local storage
        authService.clearAuthToken()
        throw error
      } finally {
        this.isSubmitting = false
      }
    },
  },
})
