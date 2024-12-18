<template>
  <div id="app">
    <img src="./Main.png" class="full-image h-100">
  </div>
</template>

<script>
export default {
  name: "Description"
};
</script>

<style scoped>
.full-image {
  position: absolute; /* Position the cat relative to the container */
    top: -1%; /* Adjust this value to control the vertical position */
    
    left: 200px;/* Сохраняем пропорции изображения */
}
</style>