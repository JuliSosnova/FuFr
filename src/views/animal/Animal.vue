<template>
  <div class="container-md mt-3">
    <div class="row">
      <div class="col-sm-8">
        <div v-if="!submitted">
          <form @submit.prevent="handleSubmit">
            <div class="form-group">
              <input
                type="text"
                v-model="formData.name"
                placeholder="Имя животного"
                class="form-control"
                required
              />
            </div>
            <div class="form-group mt-2">
              <select
                class="form-control"
                v-model="formData.category_id"
                required
              >
                <option value="" disabled>Выберите категорию</option>
                <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
              </select>
            </div>
            <div class="form-group mt-2">
              <input
                type="text"
                v-model="formData.breed"
                placeholder="Порода животного"
                class="form-control"
                required
              />
            </div>
            <div class="form-group mt-2">
              <input
                type="number"
                v-model="formData.age"
                placeholder="Возраст животного (в годах)"
                class="form-control"
                required
              />
            </div>
            <div class="form-group mt-2">
              <textarea
                v-model="formData.description"
                placeholder="Описание животного"
                class="form-control"
              />
            </div>
            <div class="form-group mt-2">
              <input
                type="file"
                @change="handleFileChange"
                class="form-control"
              />
            </div>
            <button type="submit" class="btn btn-success mt-2">Обновить</button>
          </form>
        </div>
        <div v-else>
          <router-link to="/listAnimals">Животное успешно обновлено. Перейти к списку животных.</router-link>
        </div>
      </div>
      <div class="col-sm-4">
        <div>
          <img v-if="icon" :src="icon" alt="Животное" style="width: 150px; height: auto;" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import http from "../../http-common";
import { useRoute } from 'vue-router';

export default defineComponent({
  name: "AnimalDetails",
  setup() {
    const formData = ref({
      name: '',
      category_id: '',
      breed: '',
      age: '',
      description: ''
    });
    const selectedFile = ref(null);
    const categories = ref([]);
    const submitted = ref(false);
    const icon = ref("");
    const route = useRoute();

    const getAnimal = async () => {
      const id = route.params.id; 
      try {
        const response = await http.get(`/animal/${id}`);
        const { name, category_id, breed, age, description, url_image } = response.data;
        formData.value = { name, category_id, breed, age, description };
        if (url_image) {
          icon.value = url_image;
        }
      } catch (error) {
        console.error('Ошибка при загрузке данных животного:', error);
      }
    };

    const getCategories = async () => {
      try {
        const response = await http.get('/categories');
        categories.value = response.data;
      } catch (error) {
        console.error('Ошибка при загрузке категорий:', error);
      }
    };

    const handleFileChange = (event) => {
      selectedFile.value = event.target.files[0];
      const reader = new FileReader();
      reader.onload = function (event) {
        icon.value = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    };

    const handleSubmit = async () => {
      const formDataWithImage = new FormData();
      formDataWithImage.append('name', formData.value.name);
      formDataWithImage.append('category_id', formData.value.category_id);
      formDataWithImage.append('breed', formData.value.breed);
      formDataWithImage.append('age', formData.value.age);
      formDataWithImage.append('description', formData.value.description);
      if (selectedFile.value) {
        formDataWithImage.append('image', selectedFile.value); // Добавляем изображение только если оно выбрано
      }
      try {
        const id = route.params.id; // получаем ID животного из параметров маршрута
        await http.post(`/updateAnimal/${id}`, formDataWithImage, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        });
        submitted.value = true;
      } catch (error) {
        console.error('Ошибка при обновлении данных животного:', error);
      }
    };

    onMounted(() => {
      getAnimal();
      getCategories();
    });

    return {
      formData,
      selectedFile,
      categories,
      submitted,
      icon,
      handleFileChange,
      handleSubmit
    };
  }
});
</script>