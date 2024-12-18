<template>
  <div class="container-md mt-3">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Параметры поиска</h5>
            <select class="form-control" v-model="filterCategoryId">
              <option value="">Выберите категорию</option>
              <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
            </select>
            <div class="input-group mt-3">
              <input
                type="number"
                placeholder="Минимальный возраст"
                v-model.number="minAge"
                class="form-control"
              />
              <span class="input-group-text">лет</span>
            </div>
            <div class="input-group mt-3">
              <input
                type="number"
                placeholder="Максимальный возраст"
                v-model.number="maxAge"
                class="form-control"
              />
              <span class="input-group-text">лет</span>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-12">
        <div class="row">
          <div v-if="filteredAnimals.length">
            <div class="col-md-6 mb-3" v-for="animal in filteredAnimals" :key="animal.id">
              <div class="card text-center" style="height: 40%;">
                <div v-if="animal.url_image">
                  <router-link :to="`/animal/${animal.id}`" style="display: inline-block; height: 250px; overflow: hidden;">
                    <img
                      :src="animal.url_image"
                      alt="Animal"
                      class="card-img-top"
                      style="width: auto; height: 100%; margin:auto;"
                    />
                  </router-link>
                </div>
                <div class="card-body">
                  <h5 class="card-title">
                    <router-link :to="`/animal/${animal.id}`" style="text-decoration: none;">{{ animal.name }}</router-link>
                  </h5>
                  <div class="card-text">Категория: {{ animal.category ? animal.category.name : 'Не указана' }}</div>
                  <div class="card-text mt-1">Порода: {{ animal.breed }}</div>
                  <div class="card-text mt-1">Возраст: {{ animal.age }} лет</div>
                  <div class="card-text mt-1">Описание: {{ animal.description }}</div>
                </div>
                <button v-on:click="removeAnimal(animal.id)" type="submit" class="btn btn-danger mt-2">Удалить</button>
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
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, watch } from 'vue';
import http from "../../http-common";

export default defineComponent({
  name: "DeleteAnimal",
  setup() {
    const animals = ref([]);
    const filteredAnimals = ref([]);
    const filterCategoryId = ref('');
    const minAge = ref('');
    const maxAge = ref('');
    const categories = ref([]);

    const getAnimals = async () => {
      try {
        const response = await http.get("/listAnimals");
        animals.value = response.data;
        filteredAnimals.value = response.data;
      } catch (e) {
        console.log(e);
      }
    };

    const getCategories = async () => {
      try {
        const response = await http.get("/categories");
        categories.value = response.data;
      } catch (error) {
        console.log(error);
      }
    };

    const removeAnimal = async (animal_id) => {
      try {
        // Удаляем животное с сервера
        await http.post(`/deleteAnimal/${animal_id}`);

        // Обновляем локальные массивы
        filteredAnimals.value = filteredAnimals.value.filter(a => a.id !== animal_id);
        animals.value = animals.value.filter(a => a.id !== animal_id);
      } catch (error) {
        console.log(error);
      }
    };

    const applyFilters = () => {
      let results = animals.value;

      if (filterCategoryId.value) {
        results = results.filter(animal => animal.category_id === parseInt(filterCategoryId.value));
      }

      if (minAge.value) {
        results = results.filter(animal => animal.age >= parseInt(minAge.value));
      }

      if (maxAge.value) {
        results = results.filter(animal => animal.age <= parseInt(maxAge.value));
      }

      filteredAnimals.value = results;
    };

    onMounted(() => {
      getAnimals();
      getCategories();
    });

    watch([filterCategoryId, minAge, maxAge], applyFilters);

    return {
      animals,
      filteredAnimals,
      filterCategoryId,
      minAge,
      maxAge,
      categories,
      removeAnimal
    };
  }
});
</script>

<style scoped>
.container-md {
max-width: 960px;
}

.card {
margin-bottom: 20px;
}

.input-group {
display: flex;
}

.input-group .form-control {
flex-grow: 1;
}

.input-group .input-group-text {
display: flex;
align-items: center;
}
</style>