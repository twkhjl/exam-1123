import { ref } from 'vue'
import { defineStore, setActivePinia } from 'pinia'
import { useFetchData } from '@/helpers/fetchData'
import { useStorageStore } from './user_storage'

export const useAuthStore = defineStore('user_auth', () => {
  const API_ROOT_URL =
    import.meta.env.VITE_API_ROOT_URL + import.meta.env.VITE_API_USER_URL
  const API_REFRESH_URL =
    API_ROOT_URL + import.meta.env.VITE_API_ADMIN_REFRESH_URL
  const API_ME_URL = API_ROOT_URL + import.meta.env.VITE_API_USER_ME_URL

  const storage = useStorageStore()
  const fetchData = useFetchData()

  const isTokenAutoRefresh = ref(false)

  async function isAuthenticated() {
    const token = storage.getToken()
    const admin = storage.getUser()
    if (!token || !admin) {
      return false
    }

    fetchData.setTokenToHeader(token)
    const result = await fetchData.postData(API_ME_URL)

    // -------------------------------------------

    if (result.error) {
      if (result.error !== 'expire') {
        console.log('token expired')

        return false
      }
      if (!isTokenAutoRefresh.value) {
        return false
      }

      try {
        const expiredToken = token
        const result = refreshToken(expiredToken)
        if (result.error) {
          return false
        }

        return true
      } catch (error) {
        return false
      }
    }

    if (
      result.name &&
      admin.name === result.name
    ) {
      return true
    }

    return false
  }
  async function refreshToken(token) {
    fetchData.setTokenToHeader(token)
    return await fetchData.postData(API_REFRESH_URL)
  }
  async function login(user) {
    const url = 'login'
    const data = await fetchData.postData(API_ROOT_URL + url, user)

    return data
  }
  async function logout() {
    const token = storage.getToken()
    if (!token) {
      return false
    }
    fetchData.setTokenToHeader(token)
    const url = 'logout'
    const data = await fetchData.postData(API_ROOT_URL + url)
    return data
  }
  async function register(user) {
    const url = 'register'
    const data = await fetchData.postData(API_ROOT_URL + url, user)

    return data
  }
  async function changePassword(user) {
    const url = 'change_password'
    const data = await fetchData.postData(API_ROOT_URL + url, user)

    return data
  }

  return {
    isAuthenticated,
    refreshToken,
    login,
    logout,
    register,
    changePassword,
  }
})
