<script setup>
import CarouselVue from '../components/Carousel.vue'
import ScrollDownFadeInVue from '../components/ScrollDownFadeIn.vue';
</script>

<template>
  <h2>首頁</h2>
  <h3>
    <RouterLink to="/reminder" class="mr-2">提醒事項測試</RouterLink>
  </h3>
  <hr>
  <CarouselVue></CarouselVue>
  <ScrollDownFadeInVue></ScrollDownFadeInVue>
  
</template>
