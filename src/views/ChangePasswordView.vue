<script setup>
import router from '@/router'
import { ref } from 'vue'

import { useAuthStore } from '@/stores/auth/user_auth'
import { useStorageStore } from '@/stores/auth/user_storage'

const password = ref(null)
const password_confirmation = ref(null)

const auth = useAuthStore()
const storage = useStorageStore()
const isLoading = ref(false)

const errors = ref(null);


async function changePassword() {
  const id=storage.getUser().id;

  let new_data = {
    id,
    password: password.value,
    password_confirmation: password_confirmation.value,

  }
  isLoading.value = true
  let result = await auth.changePassword(new_data)

  console.log(result);

  isLoading.value = false

  if (result.errors) {
    errors.value = result.errors
    return;
  }

  router.push({ name: 'reminder' })
}
</script>

<template>
  <div class="bg-container d-flex center">
    <div class="container p-4 bg-white">
      <h2 class="text-center mb-2">Change Password</h2>
      <form>
        <div class="form-group">
          <label for="inputPassword">New Password</label>
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
          <button @click.prevent="changePassword" type="submit" class="btn btn-primary mr-0 mx-auto">Change</button>
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
  width: 100vw;
  height: 100vh;
  background-color: blueviolet;
}

.center {
  justify-content: center;
  align-items: center;
}
</style>

