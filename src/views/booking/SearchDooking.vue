<template>
  <div>
    <h4>Поиск бронирований по названию</h4>
    <form @submit="searchBookingsByName">
      <input type="text" name="name" id="name" placeholder="Наименование бронирования" required v-model="name">
      <input type="submit" value="Поиск">
    </form>

    <ul class="search-result">
      <li v-for="(booking, index) in bookings" :key="index">
        {{ booking.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import http from "../../http-common";

export default defineComponent({
  name: "SearchBookings",
  setup() {
    const name = ref("");
    const bookings = ref([]);

    const searchBookingsByName = (e) => {
      e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
      http
        .get("/booking/name/" + name.value)
        .then(response => {
          bookings.value = response.data;
        })
        .catch(e => {
          console.log(e);
        });
    };

    return {
      name,
      bookings,
      searchBookingsByName
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