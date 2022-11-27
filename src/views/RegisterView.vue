<script setup>
import router from '@/router'
import { ref } from 'vue'

import { useAuthStore } from '@/stores/auth/user_auth'
import { useStorageStore } from '@/stores/auth/user_storage'

const name = ref(null)
const email = ref(null)
const password = ref(null)
const password_confirmation = ref(null)

const auth = useAuthStore()
const storage = useStorageStore()

const isLoading = ref(false)

const errors = ref(null);


async function register() {
  let user = {
    name: name.value,
    email: email.value,
    password: password.value,
    password_confirmation: password_confirmation.value,

  }
  isLoading.value = true
  let result = await auth.register(user)

  console.log(result);

  isLoading.value = false

  if (result.errors) {
    errors.value = result.errors
    return;
  }


  storage.saveUser(result.user)
  storage.saveToken(result.token)

  router.push({ name: 'reminder' })
}
</script>

<template>
  <div class="bg-container d-flex center">
    <div class="container p-4 bg-white w-50">
      <h2 class="text-center mb-2">Register</h2>
      <form>
        <div class="form-group">
          <label for="inputName">Name</label>
          <input v-model="name" type="text" class="form-control" id="inputName" aria-describedby="emailHelp"
            placeholder="Enter username">
          <template v-if="errors && errors.name">
            <div class="text-danger">{{ errors.name[0] }}</div>
          </template>
        </div>
        <div class="form-group">
          <label for="inputEmail">Email</label>
          <input v-model="email" type="email" class="form-control" id="inputEmail" aria-describedby="emailHelp"
            placeholder="Enter Email">
            <template v-if="errors && errors.email">
            <div class="text-danger">{{ errors.email[0] }}</div>
          </template>
        </div>
        <div class="form-group">
          <label for="inputPassword">Password</label>
          <input v-model="password" type="password" class="form-control" id="inputPassword" placeholder="Password">
          <template v-if="errors && errors.password">
            <div class="text-danger">{{ errors.password[0] }}</div>
          </template>
        </div>

        <div class="form-group">
          <label for="inputPasswordConfirmation">Confirm Password</label>
          <input v-model="password_confirmation" type="password" class="form-control" id="inputPasswordConfirmation"
            placeholder="Password">
        </div>

        <div class="d-flex justify-content-end mb-4vh">
          <button @click.prevent="register" type="submit" class="btn btn-primary mr-0 mx-auto">Register</button>
        </div>

        <div class="mt-4">
          <div class="d-flex justify-content-center links">
            already have an account? <RouterLink to="/login" class="ml-2">log in</RouterLink>
          </div>
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
  background-color: blueviolet;
}

.center {
  justify-content: center;
  align-items: center;
}
</style>

