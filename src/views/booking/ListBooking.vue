<template>
  <div>
      <h4>Список бронирований</h4>
      <!-- Определение ссылок -->
      <router-link class="item" to="/addBooking">Добавить бронирование</router-link>
      <router-link class="item" to="/searchBookings">Поиск бронирования</router-link>
      <ul>
          <!-- Вывод списка бронирований -->
          <li v-for="(booking, index) in bookings" :key="index">
              <!-- name - Именованный маршрут: будет осуществляться переход на страницу с просмотром данных о бронировании -->
              <router-link :to="{
                      name: 'booking-details',
                      params: { id: booking.id }
                  }">
                  {{ booking.name }}
              </router-link>
          </li>
      </ul>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import http from "../../http-common"; // подключение объекта, который позволяет отправлять запросы серверу

export default defineComponent({
name: "ListBookings", // имя шаблона
setup() {
  const bookings = ref([]);

  const getBookings = () => {
    http
      .get("/bookings") // обращаемся к серверу для получения списка бронирований
      .then(response => { // запрос выполнен успешно
        console.log(response.data);
        bookings.value = response.data;
      })
      .catch(e => { // запрос выполнен с ошибкой
        console.log(e);
      });
  };

  onMounted(() => { // вызывается после монтирования компонента
    getBookings();
  });

  return {
    bookings,
    getBookings
  };
}
});
</script>

<style>
.item {
  margin-left: 5px;
}
</style>