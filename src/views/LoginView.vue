<script setup>
import router from '@/router'
import { ref } from 'vue'

import { useAuthStore } from '@/stores/auth/user_auth'
import { useStorageStore } from '@/stores/auth/user_storage'

const name = ref(null)
const password = ref(null)
const isValid = ref(true)
const errMsg = ref('')

const auth = useAuthStore()
const storage = useStorageStore()

const is_loading = ref(false)

const err_msg_arr = {
  err: '帳號或密碼錯誤',
  server: '系統異常,請聯絡管理員處理',
}

async function login() {
  let user = {
    name: name.value,
    password: password.value,
  }
  is_loading.value = true
  let result = await auth.login(user)

  
  
  if (result.error) {
    is_loading.value = false
    errMsg.value = err_msg_arr.err
    return (isValid.value = false)
  }
  if (!result.user || !result.token) {
    is_loading.value = false
    errMsg.value = err_msg_arr.server
    return (isValid.value = false)
  }

  storage.saveUser(result.user)
  storage.saveToken(result.token)
  isValid.value = true

  router.push({ name: 'reminder' })
}
</script>

<template>
  <div class="bg-container d-flex center">
    <div class="container p-4 bg-white w-50">
      <h2 class="text-center mb-2">Login</h2>
      <form class="">
        <template v-if="!isValid">
          <div class="text-danger">*帳號或密碼錯誤</div>
        </template>
        <div class="form-group">
          <label for="exampleInputEmail1">Email or username</label>
          <input v-model="name"
          type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
            placeholder="Enter Email or username">
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input v-model="password"
          type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
        </div>

        <div class="d-flex justify-content-end mb-4vh">
          <template v-if="is_loading">
            <button class="btn btn-secondary  mr-0 mx-auto" disabled>
              <div class="spinner-border spinner-border-sm" role="status">
                <span class="sr-only">Loading...</span>
              </div>
              please wait...
            </button>
          </template>
          <template v-else>
            <button @click.prevent="login"
            type="submit" class="btn btn-primary mr-0 mx-auto">Login</button>
          </template>
        </div>

        <div class="mt-4">
          <div class="d-flex justify-content-center links">
            Don't have an account? <RouterLink to="/register" class="ml-2">register</RouterLink>
          </div>
          <!-- <div class="d-flex justify-content-center links">
            <a href="#">Forgot your password?</a>
          </div> -->
        </div>
      </form>

    </div>
  </div>
</template>

<style scoped>
* {
  /* border:1px solid black; */
}

.bg-container {
  background-image: url('https://images.pexels.com/photos/37347/office-sitting-room-executive-sitting.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');
  background-repeat: no-repeat;
  background-size: cover;
  width: 100vw;
  height: 100vh;
}

.center {
  justify-content: center;
  align-items: center;
}
</style>

