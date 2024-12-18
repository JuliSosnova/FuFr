import { createWebHistory, createRouter } from "vue-router";
import store from "../store/index.js";
import FirstPage from '../views/first/FirstPage.vue';
// определяем маршруты
const routes = [
    {
        path: "/registerAdmin",
        name: "register-user-admin",
        component: import('../views/authorization/Register_admin.vue'),
        meta: {
            title: "Регистрация",
            // маршрут защищаем (делаем доступным только авторизованным пользователям)
            requiredAuth: true
        }
    },
    {
        path: "/login",
        name: "login-user",
        component: import('../views/authorization/Login.vue'),
        meta: {
            title: "Вход в систему"
        }
    },
    {
        path: "/register",
        name: "register-user",
        component: import('../views/authorization/Register.vue'),
        meta: {
            title: "Регистрация"
        }
    },
    {
        path: "/profile",
        name: "profile-user",
        component: import('../views/authorization/Profile.vue'),
        meta: {
            title: "Профиль пользователя",
            // маршрут защищаем (делаем доступным только авторизованным пользователям)
            requiredAuth: true
        }
    },


    {
        path: '/',
        name: 'FirstPage',
        component: FirstPage, // Укажите компонент FirstPage как первую страницу
        meta: {
          title: 'Первая страница', // Заголовок страницы
          requiredAuth: false // Укажите, требуется ли авторизация для доступа
        }
      },
      {
        path: '/FirstPage',
        name: 'FirstPage',
        component: FirstPage, // Укажите компонент FirstPage как первую страницу
        component: () => import('../views/first/FirstPage.vue'), // компонент, на основании которого будет отрисовываться страница
        meta: {
            title: "Главная страница"
        }
      },
    {
        path: "/listCategories", // указание маршрута, по которому будем переходить к списку категорий
        name: "categories", // имя маршрута
        alias: "/categories", // указание дополнительного маршрута
        component: () => import('../views/category/ListCategories.vue'), // компонент, на основании которого будет отрисовываться страница
        meta: {
            title: "Список категорий"
        }
    },
    ,
    {
        path: "/description",
        name: "description",
        component: () => import('../views/description/Description.vue'),
        meta: {
            title: "О Приюте",
        }
    },
    {
        path: "/category/:id",
        name: "category-details",
        component: () => import('../views/category/Category.vue'),
        props: true, // указываем, что компонент Category.vue может принимать параметры в адресной строке, например, в path указан id
        meta: {
            title: "Данные категорий"
        }
    },
    {
        path: "/addCategory",
        name: "add-user",
        component: () => import('../views/category/AddCategory.vue'),
        meta: {
            title: "Добавление категории"
        }
    },
    {
        path: "/searchCategories",
        name: "search-categories",
        component: () => import('../views/category/SearchCategories.vue'),
        meta: {
            title: "Поиск категорий"
        }
    },
    {
        path: "/deleteCategories",
        name: "categories-delete",
        component: () => import('../views/category/DeleteCategories.vue'),
        meta: {
            title: "Удаление категории",
            // маршрут защищаем (делаем доступным только авторизованным пользователям)
            requiredAuth: true
        }
    },
    
    
    {
        path: "/listAnimal",
        name: "list-animal",
        component: () => import('../views/animal/ListAnimal.vue'),
        meta: {
            title: "Список животных"
        }
    },
    {
        path: "/addAnimal",
        name: "add-animal",
        component: () => import('../views/animal/AddAnimal.vue'),
        meta: {
            title: "Добавление животного"
        }
    },
    {
        path: "/animal/:id",
        name: "animal-details",
        component: () => import('../views/animal/Animal.vue'),
        props: true,
        meta: {
            title: "Данные животного"
        }
    },
    {
        path: "/deleteAnimal",
        name: "animal-delete",
        component: () => import('../views/animal/DeleteAnimal.vue'),
        meta: {
            title: "Удаление животного",
            // маршрут защищаем (делаем доступным только авторизованным пользователям)
            requiredAuth: true
        }
    },
    {
        path: "/findAnimal",
        name: "find-animal",
        component: () => import('../views/animal/FindAnimal.vue'),
        meta: {
            title: "Поиск Животного"
        }
    },
    {
        path: "/booking/:id",
        name: "booking",
        component: () => import('../views/booking/Booking.vue'),
        meta: {
            title: "Бронирования",
            // маршрут защищаем (делаем доступным только авторизованным пользователям)
            requiredAuth: true
        }
    },
    {
        path: "/listBooking",
        name: "list-booking",
        component: () => import('../views/booking/ListBooking.vue'),
        meta: {
            title: "Список броней"
        }
    },
    {
        path: "/addBooking",
        name: "add-booking",
        component: () => import('../views/booking/AddBooking.vue'),
        meta: {
            title: "Добавление бронирования"
        }
    },
    {
        path: "/deleteBooking",
        name: "booking-delete",
        component: () => import('../views/booking/DeleteBooking.vue'),
        meta: {
            title: "Удаление брони",
            // маршрут защищаем (делаем доступным только авторизованным пользователям)
            requiredAuth: true
        }
    },
    {
        path: "/breed/:id",
        name: "breed",
        component: () => import('../views/breed/Breed.vue'),
        meta: {
            title: "Породы",
            // маршрут защищаем (делаем доступным только авторизованным пользователям)
            requiredAuth: true
        }
    },
    {
        path: "/listBreed",
        name: "list-breed",
        component: () => import('../views/breed/ListBreed.vue'),
        meta: {
            title: "Список пород"
        }
    },
    {
        path: "/addBreed",
        name: "add-breed",
        component: () => import('../views/breed/AddBreed.vue'),
        meta: {
            title: "Добавление пород"
        }
    },
    {
        path: "/deleteBreed",
        name: "booking-breed",
        component: () => import('../views/breed/DeleteBreed.vue'),
        meta: {
            title: "Удаление пород",
            // маршрут защищаем (делаем доступным только авторизованным пользователям)
            requiredAuth: true
        }
    },
    {
        path: "/searchBreed",
        name: "search-breed",
        component: () => import('../views/breed/SearchBreed.vue'),
        meta: {
            title: "Поиск категорий"
        }
    },
    {
        path: "/cart",
        name: "cart",
        component: () => import('../views/cart/Cart.vue'),
        meta: {
            title: "Корзина",
            // маршрут защищаем (делаем доступным только авторизованным пользователям)
            requiredAuth: true
        }
    },
    {
        path: "/productForSaler",
        name: "productForSaler",
        component: () => import('../views/cart/ProductsForSale.vue'),
        meta: {
            title: "Скидки",
            // маршрут защищаем (делаем доступным только авторизованным пользователям)
            requiredAuth: true
        }
    },
    {
        path: "/selectProduct",
        name: "select-product",
        component: () => import('../views/cart/SelectProducts.vue'),
        meta: {
            title: "hfhfgh",
            // маршрут защищаем (делаем доступным только авторизованным пользователям)
            requiredAuth: true
        }
    },
    
    
];

const router = createRouter({
    history: createWebHistory(), // указываем, что будет создаваться история посещений веб-страниц
    routes, // подключаем маршрутизацию
});

// указание заголовка компонентам (тега title), заголовки определены в meta
router.beforeEach(async (to, from, next) => {
    // устанавливаем заголовок страницы в зависимости от метаданных маршрута
    document.title = to.meta.title || "Главная страница";

    // проверяем наличие токена и срок его действия
    const isTokenActive = await store.getters["auth/isTokenActive"];

    // если токен действителен, продолжаем навигацию
    if (isTokenActive) {
        return next();
    }

    // получаем пользователя из локального хранилища
    const user = JSON.parse(localStorage.getItem("user")); 
    console.log(user)

    if (user) {
        try {
            // пытаемся обновить токен
            await store.dispatch("auth/refreshToken", user);
            return next(); // Если обновление прошло успешно, продолжаем навигацию
        } catch (err) {
            console.error("Ошибка обновления токена:", err); // логируем ошибку
            localStorage.removeItem("user"); // удаляем пользователя из локального хранилища
            return next({ path: "/login" }); // переходим на страницу входа
        }
    } else {
        // если токена нет или он истек, проверяем, требуется ли авторизация для доступа к маршруту
        localStorage.removeItem("user"); // удаляем пользователя из локального хранилища

        if (to.meta.requiredAuth) {
            return next({ path: "/login" }); // если доступа нет, перенаправляем на страницу входа
        }
    }

    // если маршрут не требует авторизации, продолжаем навигацию
    return next();
});

export default router;