<template>
  <div v-if="breed">
    <h4>Порода</h4>
    <div v-if="!submitted">
      <form @submit="updateBreed">
          <input type="text" name="name" id="name" placeholder="Наименование породы" required v-model="breed.name">
          <input type="submit" value="Обновить">
      </form>
      <button @click="deleteBreed">Удалить</button>
    </div>
    <div v-else>
      <h4>Вы успешно обновили запись</h4>
      <router-link to="/listBreeds">Вернуться к списку пород</router-link>
  </div>
  </div>
  <div v-else>
    <br>
    <p>Выберите породу</p>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import http from "../../http-common";

export default defineComponent({
  name: "BreedDetails",
  props: ['id'],
  setup(props) {
    const breed = ref(null);
    const submitted = ref(false);
    const router = useRouter();

    const getBreed = () => {
      http
        .get("/breed/" + props.id) // обращаемся к серверу для получения породы, id взят из входных параметров (props)
        .then(response => { // запрос выполнен успешно
          breed.value = response.data;
        })
        .catch(e => { // запрос выполнен с ошибкой
          console.log(e);
        });
    };

    const updateBreed = (e) => {
      e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
      const data = {
        name: breed.value.name
      };

      http
        .post("/updateBreed/" + breed.value.id, data)
        .then(() => {
          router.push('/listBreeds'); // переходим к списку пород
        })
        .catch(e => {
          console.log(e);
        });

      submitted.value = true;
    };

    const deleteBreed = () => {
      http
        .post("/deleteBreed/" + breed.value.id)
        .then(() => {
          router.push('/listBreeds'); // переходим к списку пород
        })
        .catch(e => {
          console.log(e);
        });
    };

    onMounted(() => {
      getBreed();
    });

    return {
      breed,
      submitted,
      updateBreed,
      deleteBreed
    };
  }
});
</script>