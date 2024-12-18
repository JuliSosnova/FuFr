<template>
  <div>
    <h4>Добавление бронирования</h4>
    <div v-if="!submitted">
      <form @submit="addBooking">
        <input type="text" name="name" id="name" placeholder="Наименование бронирования" required v-model="booking.name">
        <input type="date" name="date" id="date" required v-model="booking.date">
        <input type="number" name="guests" id="guests" placeholder="Количество гостей" required v-model="booking.guests">
        <input type="submit" value="Добавить">
      </form>
    </div>
    <div v-else>
      <h4>Вы успешно добавили запись</h4>
      <div>
        <button v-on:click="newBooking">Добавить новое бронирование</button>
      </div>
      <div>
        <router-link to="/listBookings">Вернуться к списку бронирований</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import http from "../../http-common";

export default defineComponent({
  name: "AddBooking",
  setup() {
    const booking = ref({
      name: "",
      date: "",
      guests: 1
    });
    const submitted = ref(false);

    const addBooking = (e) => {
      e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
      const data = {
        name: booking.value.name,
        date: booking.value.date,
        guests: booking.value.guests
      };
      
      http
        .post("/addBooking", data)
        .then(response => { // запрос выполнился успешно
          booking.value.id = response.data.id;
        })
        .catch(e => { // при выполнении запроса возникли ошибки
          console.log(e);
        });

      submitted.value = true;
    };

    const newBooking = () => {
      submitted.value = false;
      booking.value = {
        name: "",
        date: "",
        guests: 1
      };
    };

    return {
      booking,
      submitted,
      addBooking,
      newBooking
    };
  }
});
</script>