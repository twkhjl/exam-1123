<script setup>
import { onMounted, ref } from 'vue';


onMounted(() => {
  $(document).ready(function () {

    /* Every time the window is scrolled ... */
    $(window).scroll(function () {

      /* Check the location of each desired element */
      $('.alert').each(function (i) {

        var bottom_of_object = $(this).position().top + $(this).outerHeight();
        var bottom_of_window = $(window).scrollTop() + $(window).height();

        /* If the object is completely visible in the window, fade it */
        if (bottom_of_window > bottom_of_object) {

          $(this).addClass('is-visible');
        }

      });

    });

  });

})

</script>

<template>
  <h3 class="mt-4">淡入捲動效果測試(往下捲動)</h3>
  <div class="alert alert-primary fade-in-section" role="alert">
    This is a primary alert—check it out!
  </div>
  <div class="alert alert-secondary fade-in-section" role="alert">
    This is a secondary alert—check it out!
  </div>
  <div class="alert alert-success fade-in-section" role="alert">
    This is a success alert—check it out!
  </div>
  <div class="alert alert-danger fade-in-section" role="alert">
    This is a danger alert—check it out!
  </div>
  <div class="alert alert-warning fade-in-section" role="alert">
    This is a warning alert—check it out!
  </div>
  <div class="alert alert-info fade-in-section" role="alert">
    This is a info alert—check it out!
  </div>
  <div class="alert alert-light fade-in-section" role="alert">
    This is a light alert—check it out!
  </div>
  <div class="alert alert-dark fade-in-section" role="alert">
    This is a dark alert—check it out!
  </div>
</template>


<style scoped>
.alert {
  height: 20vh;
}

.fade-in-section {
  opacity: 0;
  transform: translateY(20vh);
  visibility: hidden;
  transition: opacity 1200ms ease-out, transform 600ms ease-out,
    visibility 1200ms ease-out;
}

.fade-in-section.is-visible {
  opacity: 1;
  transform: none;
  visibility: visible;
}
</style>
