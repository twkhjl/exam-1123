import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useStorageStore = defineStore('user_storage', () => {
    const TOKEN_STORAGE_NAME = import.meta.env.VITE_TOKEN_STORAGE_NAME
    const USER_STORAGE_NAME = import.meta.env.VITE_USER_STORAGE_NAME

    const _rememberMe = ref(false)

    function setAsRememberMe() {
        _rememberMe.value = true
    }
    function setAsDontRememberMe() {
        _rememberMe.value = false
    }
    function isRememberMe() {
        return _rememberMe.value
    }

    //user data saved in local
    function getUser() {
        const user =
            localStorage.getItem(USER_STORAGE_NAME) !== null
                ? localStorage.getItem(USER_STORAGE_NAME)
                : sessionStorage.getItem(USER_STORAGE_NAME)

        return JSON.parse(user || 'null')
    }
    function saveUser(data, rememberMe=null) {
        const userData = JSON.stringify(data || '')
        if (rememberMe) {
            return localStorage.setItem(USER_STORAGE_NAME, userData)
        }
        return sessionStorage.setItem(USER_STORAGE_NAME, userData)
    }
    function removeUser() {
        localStorage.removeItem(USER_STORAGE_NAME)
        sessionStorage.removeItem(USER_STORAGE_NAME)
        return
    }

    //jwt token saved in local
    function getToken() {
        const token =
            localStorage.getItem(TOKEN_STORAGE_NAME) !== null
                ? localStorage.getItem(TOKEN_STORAGE_NAME)
                : sessionStorage.getItem(TOKEN_STORAGE_NAME)

        return token
    }
    function saveToken(token, rememberMe=null) {
        if (rememberMe) {
            return localStorage.setItem(TOKEN_STORAGE_NAME, token)
        }
        return sessionStorage.setItem(TOKEN_STORAGE_NAME, token)
    }
    function removeToken() {
        localStorage.removeItem(TOKEN_STORAGE_NAME)
        sessionStorage.removeItem(TOKEN_STORAGE_NAME)
    }

    return {
        setAsRememberMe,
        setAsDontRememberMe,
        isRememberMe,
        getUser,
        saveUser,
        removeUser,
        getToken,
        saveToken,
        removeToken,
    }
})
