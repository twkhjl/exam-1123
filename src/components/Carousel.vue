<script setup>
import { onMounted } from "vue";

onMounted(() => {
  $("#btn").click(() => {
    console.log("clicked");
  });
  const ttt = document.querySelector("#ttt");
  console.log(ttt);
});
</script>

<template>
  

  <h3>輪播效果測試</h3>

  <div id="carouselExampleControls" class="carousel slide mb-4" data-ride="carousel">
    <div class="carousel-inner" style="">
      <div class="carousel-item active">
        <img
          src="https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          class="d-block mx-auto"
          alt="img-1"
        />
      </div>
      <div class="carousel-item">
        <img
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80"
          class="d-block mx-auto"
          alt="img-2"
        />
      </div>
      <div class="carousel-item">
        <img
          src="https://images.unsplash.com/photo-1464802686167-b939a6910659?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1150&q=80"
          class="d-block mx-auto"
          alt="img-3"
        />
      </div>
    </div>
    <a
      class="carousel-control-prev"
      href="#carouselExampleControls"
      role="button"
      data-slide="prev"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a
      class="carousel-control-next"
      href="#carouselExampleControls"
      role="button"
      data-slide="next"
    >
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
  </div>
</template>

<style scoped>
* {
  /* border: 1px solid black; */
}

img {
  width: 100vw;
  height: 70vh;
}
</style>
