<script setup>
// import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="mb-4">
    <RouterLink to="/" class="mr-2">首頁</RouterLink>|
    <RouterLink to="/reminder" class="mr-2">提醒事項</RouterLink>|
    <RouterLink to="/test" class="mr-2">test</RouterLink>
  </div>
  <hr>
  <RouterView />
</template>

<style>

</style>

