<template>
    <div>
        <h4>Список категорий</h4>
        <!-- Определение ссылок -->
        <router-link class="item" to="/addCategory">Добавить категорию</router-link>
        <router-link class="item" to="/searchCategories">Поиск категории</router-link>
        <ul>
            <!-- Вывод списка категорий -->
            <li v-for="(category, index) in categories" :key="index">
                <!-- name - Именованный маршрут: будет осуществляться переход на страницу с просмотром данных о пользователе -->
                <!-- Ссылка на category определена в файле router.js -->
                <!-- По маршруту category подгружается компонент Category.vue -->
                <!-- в params указываются параметры, которые передаются компоненту-->
                <!--Двоеточие перед to указывает, что значение атрибута изменяющееся (динамическое) -->
                <router-link :to="{
                        name: 'category-details',
                        params: { id: category.id }
                    }">
                    {{category.name}}
                </router-link>
            </li>
        </ul>
    </div>
</template>
<script>
import { defineComponent, ref, onMounted } from 'vue';
import http from "../../http-common"; // подключение объекта, который позволяет отправлять запросы серверу

export default defineComponent({
  name: "ListCategories", // имя шаблона
  setup() {
    const categories = ref([]);

    const getCategories = () => {
      http
        .get("/categories") // обращаемся к серверу для получения списка категорий
        .then(response => { // запрос выполнен успешно
          console.log(response.data)
          categories.value = response.data;
        })
        .catch(e => { // запрос выполнен с ошибкой
          console.log(e);
        });
    };

    onMounted(() => { // вызывается после монтирования компонента
      getCategories();
    });

    return {
      categories,
      getCategories
    };
  }
});
</script>

<style>
  .item {
    margin-left: 5px;
  }
</style>