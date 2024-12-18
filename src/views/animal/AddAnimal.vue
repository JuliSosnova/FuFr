<template>
  <div class="container-md mt-3">
    <div class="row">
      <div class="col-sm-12">
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
                <option value="" disabled selected>Выберите категорию</option>
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
                required
              />
            </div>
            <button type="submit" class="btn btn-success mt-2">Добавить</button>
          </form>
        </div>
        <div v-else>
          <router-link to="/listAnimals">Животное успешно добавлено! Перейти к списку животных.</router-link>
        </div>
      </div>
      <div class="col-sm-4">
        <div>
          <img v-if="icon" :src="icon" alt="Animal Icon" style="width: 150px; height: auto;" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import http from "../../http-common";

export default defineComponent({
  name: "AddAnimal",
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

    const getCategories = async () => {
      try {
        const response = await http.get("/categories");
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
      formDataWithImage.append('image', selectedFile.value);

      try {
        await http.post("/addAnimal", formDataWithImage, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        });
        submitted.value = true;
      } catch (error) {
        console.log(error);
      }
    };

    onMounted(() => {
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