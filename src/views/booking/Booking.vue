<template>
  <div v-if="booking">
    <h4>Бронирование</h4>
    <div v-if="!submitted">
      <form @submit="updateBooking">
          <input type="text" name="name" id="name" placeholder="Наименование бронирования" required v-model="booking.name">
          <input type="date" name="date" id="date" required v-model="booking.date">
          <input type="number" name="guests" id="guests" placeholder="Количество гостей" required v-model="booking.guests">
          <input type="submit" value="Обновить">
      </form>
      <button @click="deleteBooking">Удалить</button>
    </div>
    <div v-else>
      <h4>Вы успешно обновили запись</h4>
      <router-link to="/listBookings">Вернуться к списку бронирований</router-link>
    </div>
  </div>
  <div v-else>
    <br>
    <p>Выберите бронирование</p>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import http from "../../http-common";

export default defineComponent({
  name: "BookingDetails",
  props: ['id'],
  setup(props) {
    const booking = ref(null);
    const submitted = ref(false);
    const router = useRouter();

    const getBooking = () => {
      http
        .get("/booking/" + props.id) // обращаемся к серверу для получения бронирования, id взят из входных параметров (props)
        .then(response => { // запрос выполнен успешно
          booking.value = response.data;
        })
        .catch(e => { // запрос выполнен с ошибкой
          console.log(e);
        });
    };

    const updateBooking = (e) => {
      e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
      const data = {
        name: booking.value.name,
        date: booking.value.date,
        guests: booking.value.guests
      };

      http
        .post("/updateBooking/" + booking.value.id, data)
        .then(() => {
          router.push('/listBookings'); // переходим к списку бронирований
        })
        .catch(e => {
          console.log(e);
        });

      submitted.value = true;
    };

    const deleteBooking = () => {
      http
        .post("/deleteBooking/" + booking.value.id)
        .then(() => {
          router.push('/listBookings'); // переходим к списку бронирований
        })
        .catch(e => {
          console.log(e);
        });
    };

    onMounted(() => {
      getBooking();
    });

    return {
      booking,
      submitted,
      updateBooking,
      deleteBooking
    };
  }
});
</script>