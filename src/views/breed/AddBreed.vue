<template>
  <div>
    <h4>Добавление породы</h4>
    <div v-if="!submitted">
      <form @submit="addBreed">
        <input type="text" name="name" id="name" placeholder="Наименование породы" required v-model="breed.name">
        <input type="submit" value="Добавить">
      </form>
    </div>
    <div v-else>
      <h4>Вы успешно добавили запись</h4>
      <div>
        <button v-on:click="newBreed">Добавить новую породу</button>
      </div>
      <div>
        <router-link to="/listBreeds">Вернуться к списку пород</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import http from "../../http-common";

export default defineComponent({
  name: "AddBreed",
  setup() {
    const breed = ref({
      name: ""
    });
    const submitted = ref(false);

    const addBreed = (e) => {
      e.preventDefault(); // Prevent form submission
      const data = {
        name: breed.value.name
      };
      http
        .post("/addBreed", data)
        .then(response => {
          breed.value.id = response.data.id;
        })
        .catch(e => {
          console.log(e);
        });

      submitted.value = true;
    };

    const newBreed = () => {
      submitted.value = false;
      breed.value = {
        name: ""
      };
    };

    return {
      breed,
      submitted,
      addBreed,
      newBreed
    };
  }
});
</script>