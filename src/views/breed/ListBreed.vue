<template>
  <div>
      <h4>Список пород</h4>
      <!-- Определение ссылок -->
      <router-link class="item" to="/addBreed">Добавить породу</router-link>
      <router-link class="item" to="/searchBreeds">Поиск породы</router-link>
      <ul>
          <!-- Вывод списка пород -->
          <li v-for="(breed, index) in breeds" :key="index">
              <!-- name - Именованный маршрут: будет осуществляться переход на страницу с просмотром данных о породе -->
              <router-link :to="{
                      name: 'breed-details',
                      params: { id: breed.id }
                  }">
                  {{ breed.name }}
              </router-link>
          </li>
      </ul>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import http from "../../http-common"; // подключение объекта, который позволяет отправлять запросы серверу

export default defineComponent({
name: "ListBreeds", // имя шаблона
setup() {
  const breeds = ref([]);

  const getBreeds = () => {
    http
      .get("/breeds") // обращаемся к серверу для получения списка пород
      .then(response => { // запрос выполнен успешно
        console.log(response.data);
        breeds.value = response.data;
      })
      .catch(e => { // запрос выполнен с ошибкой
        console.log(e);
      });
  };

  onMounted(() => { // вызывается после монтирования компонента
    getBreeds();
  });

  return {
    breeds,
    getBreeds
  };
}
});
</script>

<style>
.item {
  margin-left: 5px;
}
</style>