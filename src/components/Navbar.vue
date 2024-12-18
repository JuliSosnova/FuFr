<template>
  <div id="app">
    <div class="sidebar">
      <router-link class="item" to="/FirstPage">Главная</router-link>
      <router-link class="item" to="/findAnimal">Найти друга</router-link>
      <router-link class="item" to="/listCategories">Категории</router-link>
      <router-link class="item" to="/listBreed">Породы</router-link>
      <router-link class="item" to="/selectBooking">Забронировать встречи</router-link>
      <router-link class="item" to="/description">О приюте</router-link>
      <div v-if="currentUser">
    <router-link to="/profile">
        {{ currentUser.username }}
    </router-link>
    <a href @click.prevent="logOut">
        Выйти
    </a>
</div>
<div v-else>
    <router-link to="/login">
        Войти
    </router-link>
</div>
    </div>
   
  </div>
</template>

  
<script>

import { computed } from 'vue'; 
import { useStore } from 'vuex';

export default {
  name: "NavBar",
  setup() {
    const store = useStore();

    const currentUser = computed(() => store.state.auth.user);

    const logOut = () => {
      store.dispatch('auth/logout')
        .then(() => {
          window.location.href = '/login'; 
        })
        .catch(err => {
          console.error("Ошибка выхода:", err); 
        });
    };

    return {
      currentUser,
      logOut
    };
  }
};
</script>

  
  <style>
    #app {
  display: flex; /* Use flexbox to layout sidebar and content */
}

.sidebar {
  height: 100vh; /* Full height of the viewport */
  width: 200px; /* Width of the sidebar */
  background-color: #333; /* Background color for the sidebar */
  padding: 20px; /* Padding inside the sidebar */
  position: fixed; /* Fix the sidebar to the left */
  top: 0; /* Align to the top */
  left: 0; /* Align to the left */
  overflow-y: auto; /* Enable vertical scrolling if needed */
}

.item {
  display: block; /* Make links block elements */
  color: white; /* Text color */
  text-decoration: none; /* Remove underline */
  padding: 10px; /* Padding for links */
  margin-bottom: 10px; /* Space between links */
  border-radius: 4px; /* Rounded corners */
}

.item:hover {
  background-color: #575757; /* Background color on hover */
}

.content {
  margin-left: 220px; /* Space for the sidebar */
  padding: 20px; /* Padding for content */
  flex-grow: 1; /* Allow content to grow */
}
</style>