<template>
  <div class="container-md mt-3">
    <div class="row">
      <!-- Filter Section -->
      <div class="col-md-12">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Фильтры</h5>
            <!-- Category Dropdown -->
            <div class="form-group">
              <label for="category">Категория</label>
              <select
                id="category"
                class="form-control"
                v-model="selectedCategoryId"
                @change="fetchBreeds">
                <option value="" disabled>Выберите категорию</option>
                <option v-for="category in categories" :key="category.id" :value="category.id">
                  {{ category.name }}
                </option>
              </select>
            </div>
            <div class="form-group mt-3" v-if="breeds.length > 0">
              <label for="breed">Порода</label>
              <select
                id="breed"
                class="form-control"
                v-model="selectedBreedId">
                <option value="" disabled>Выберите породу</option>
                <option v-for="breed in breeds" :key="breed.id" :value="breed.id">
                  {{ breed.name }}
                </option>
              </select>
            </div>
            <button class="btn btn-primary mt-3" @click="filterAnimals">Найти</button>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-4">
      <div v-if="filteredAnimals.length > 0">
        <div class="col-md-6 mb-3" v-for="animal in filteredAnimals" :key="animal.id">
          <div class="card text-center" @click="goToAnimalPage(animal.id)">
            <div v-if="animal.url_image">
              <img
                :src="animal.url_image"
                alt="Animal"
                class="card-img-top"
                style="height: 250px; object-fit: cover;"
              />
            </div>
            <div class="card-body">
              <h5 class="card-title">{{ animal.name }}</h5>
              <p class="card-text">Категория: {{ animal.category_name }}</p>
              <p class="card-text">Порода: {{ animal.breed_name }}</p>
              <p class="card-text">Возраст: {{ animal.age }} лет</p>
              <p class="card-text">Описание: {{ animal.description }}</p>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="col">
          <div class="alert alert-info">Животные не найдены</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import http from "../../http-common";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "AnimalFilter",
  setup() {
    const router = useRouter();
    const categories = ref([]);
    const breeds = ref([]);
    const animals = ref([]);
    const filteredAnimals = ref([]);
    const selectedCategoryId = ref("");
    const selectedBreedId = ref("");

    const fetchCategories = async () => {
      try {
        const response = await http.get("/categories");
        categories.value = response.data;
      } catch (error) {
        console.error("Ошибка при загрузке категорий:", error);
      }
    };

    const fetchBreeds = async () => {
      if (!selectedCategoryId.value) {
        breeds.value = [];
        return;
      }
      try {
        const response = await http.get(`/breeds?category_id=${selectedCategoryId.value}`);
        breeds.value = response.data;
      } catch (error) {
        console.error("Ошибка при загрузке пород:", error);
      }
    };

    const fetchAnimals = async () => {
      try {
        const response = await http.get("/animals");
        animals.value = response.data;
      } catch (error) {
        console.error("Ошибка при загрузке животных:", error);
      }
    };

    const filterAnimals = () => {
      let results = animals.value;
      if (selectedCategoryId.value) {
        results = results.filter(animal => animal.category_id === parseInt(selectedCategoryId.value));
      }
      if (selectedBreedId.value) {
        results = results.filter(animal => animal.breed_id === parseInt(selectedBreedId.value));
      }
      filteredAnimals.value = results;
    };

    const goToAnimalPage = (animalId) => {
      router.push({ name: 'AnimalPage', params: { id: animalId } });
    };

    onMounted(() => {
      fetchCategories();
      fetchAnimals();
    });

    return {
      categories,
      breeds,
      animals,
      filteredAnimals,
      selectedCategoryId,
      selectedBreedId,
      fetchBreeds,
      filterAnimals,
      goToAnimalPage,
    };
  },
});
</script>