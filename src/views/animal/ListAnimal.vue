<template>
  <div>
      <h4>Список животных</h4>
      <!-- Определение ссылок -->
      <router-link class="item" to="/addAnimal">Добавить животное</router-link>
      <router-link class="item" to="/searchAnimals">Поиск животного</router-link>
      <ul>
          <!-- Вывод списка животных -->
          <li v-for="(animal, index) in animals" :key="index">
              <!-- Ссылка на animal определена в файле router.js -->
              <!-- По маршруту animal подгружается компонент Animal.vue -->
              <router-link :to="{
                      name: 'animal-details',
                      params: { id: animal.id }
                  }">
                  {{ animal.name }}
              </router-link>
          </li>
      </ul>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import http from "../../http-common"; // подключение объекта, который позволяет отправлять запросы серверу

export default defineComponent({
name: "ListAnimals", // имя шаблона
setup() {
  const animals = ref([]);

  const getAnimals = () => {
    http
      .get("/animals") // обращаемся к серверу для получения списка животных
      .then(response => { // запрос выполнен успешно
        console.log(response.data);
        animals.value = response.data;
      })
      .catch(e => { // запрос выполнен с ошибкой
        console.log(e);
      });
  };

  onMounted(() => { // вызывается после монтирования компонента
    getAnimals();
  });

  return {
    animals,
    getAnimals
  };
}
});
</script>

<style>
.item {
  margin-left: 5px;
}
</style>