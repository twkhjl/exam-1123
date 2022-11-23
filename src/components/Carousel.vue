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
  <!-- Button trigger modal -->
  <button
    type="button"
    class="btn btn-primary"
    data-toggle="modal"
    data-target="#exampleModal"
  >
    Launch demo modal
  </button>

  <!-- Modal -->
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">...</div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Close
          </button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>

  <div id="ttt">123</div>
  <button id="btn">click me</button>
  <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
    <div class="carousel-inner" style="">
      <div class="carousel-item active">
        <img
          src="https://fakeimg.pl/1000x300/?text=img-1"
          class="d-block mx-auto"
          alt="img-1"
        />
      </div>
      <div class="carousel-item">
        <img
          src="https://fakeimg.pl/1000x300/?text=img-2"
          class="d-block mx-auto"
          alt="img-2"
        />
      </div>
      <div class="carousel-item">
        <img
          src="https://fakeimg.pl/1000x300/?text=img-3"
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
  border: 1px solid black;
}

img {
  width: 100vw;
  height: 40vh;
}
</style>
