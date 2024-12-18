<template>
    <div class="login-container">
        <h4 class="text-center">Вход в систему</h4>
        <form @submit.prevent="handleLogin">
            <div class="form-group mb-3">
                <input type="text" class="form-control" placeholder="Логин" v-model="user.username" required />
            </div>
            <div class="form-group mb-3">
                <input type="password" class="form-control" placeholder="Пароль" v-model="user.password" required />
            </div>
            <div class="form-group text-center">
                <button class="btn btn-success  btn-block" :disabled="loading">
                    <span v-if="loading" class="spinner-border spinner-border-sm"></span>
                    <span>Войти</span>
                </button>
            </div>
            <router-link to="/register">Зарегистрироваться</router-link>
            <div class="form-group">
                <div v-if="message" class="alert alert-danger" role="alert">{{ message }}</div>
            </div>
        </form>
    </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import backgroundImage from './background.jpg';
export default {
    mounted() {
    document.body.style.backgroundImage = `url(${backgroundImage})`;
    document.body.style.backgroundPosition = "center center";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundAttachment = "fixed";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundColor = "#464646";
  },
    name: 'LoginUser',
    setup() {
        const store = useStore();
        const user = ref({ username: '', password: '' });
        const loading = ref(false);
        const message = ref('');

        const loggedIn = computed(() => store.state.auth.status.loggedIn);

        onMounted(() => {
            if (loggedIn.value) { // проверяем, авторизован ли пользователь
                window.location.href = '/'; // перенаправляем на главную страницу
            }
        });

        const handleLogin = async () => {
            loading.value = true;
            message.value = ''; 

            try {
                await store.dispatch('auth/login', user.value); // вызываем метод login(...) из auth.service.js 
                window.location.href = '/'; // перенаправляем на главную страницу после успешного входа
            } catch (error) {
                loading.value = false; // устанавливаем состояние загрузки в false при ошибке
                message.value = error.response.data.message; // устанавливаем сообщение об ошибке из ответа сервера
            }
        };

        return {
            user, 
            loading,
            message,
            handleLogin
        };
    }
};
</script>
<style >
.login-container {
  background-color: white; /* White background */
  border-radius: 15px; /* Rounded corners */
  padding: 20px; /* Padding inside the container */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Optional: adds a subtle shadow */
  max-width: 400px; /* Optional: limits the width of the container */
  margin: auto; /* Centers the container */
}

</style>