import { apiGetToken } from '@/api/users'
import { defineStore } from 'pinia'

interface AuthState {
  token: string | null
  appIsReady: boolean
}

export const authStore = defineStore({
  id: 'auth-store',
  state: (): AuthState => ({
    token: null,
    appIsReady: false,
  }),
  getters: {
    getToken(): string | null {
      return this.token
    },
  },
  actions: {
    setSession(token: string) {
      this.token = token
      this.appIsReady = true
    },
    removeSession() {
      this.token = null
      this.appIsReady = false
    },
    async loadToken() {
      apiGetToken().then(data => {
        this.setSession(data.data.token)
      })
    },
    async init() {
      this.loadToken()
    }
  },
})

