<template>
  <div>
    <h4>Поиск пород по названию</h4>
    <form @submit="searchBreedsByName">
      <input type="text" name="name" id="name" placeholder="Наименование породы" required v-model="name">
      <input type="submit" value="Поиск">
    </form>

    <ul class="search-result">
      <li v-for="(breed, index) in breeds" :key="index">
        {{ breed.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import http from "../../http-common";

export default defineComponent({
  name: "SearchBreeds",
  setup() {
    const name = ref("");
    const breeds = ref([]);

    const searchBreedsByName = (e) => {
      e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
      http
        .get("/breed/name/" + name.value)
        .then(response => {
          breeds.value = response.data;
        })
        .catch(e => {
          console.log(e);
        });
    };

    return {
      name,
      breeds,
      searchBreedsByName
    };
  }
});
</script>

<style>
  .search-result {
    list-style-type: none;
    padding: 0;
  }
  .search-result li {
    margin-bottom: 5px;
  }
</style>