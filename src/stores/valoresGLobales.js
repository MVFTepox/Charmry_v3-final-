import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        isLoggedIn: JSON.parse(localStorage.getItem('isLoggedIn')) || false,
        userId: JSON.parse(localStorage.getItem('userId')) || null
    }),
    actions: {
        setLoginStatus(status) {
            this.isLoggedIn = status;
            localStorage.setItem('isLoggedIn', JSON.stringify(status));
        },
        setUserId(id) {
            this.userId = id;
            localStorage.setItem('userId', JSON.stringify(id));
        },
        logout() {
            this.isLoggedIn = false;
            this.userId = null;
            localStorage.setItem('isLoggedIn', JSON.stringify(false));
            localStorage.setItem('userId', JSON.stringify(null));
        }
    }
});


//explicacion rapida cuando la uses tienes que importar este archivo al componente que lo requiere.
//import { useAuthStore } from '@/stores/auth'
//const authStore = useAuthStore()
//y luego hacer authStore.setLoginStatus(true)
//o authStore.setLoginStatus(false)
//dependiendo de lo que quieras hacer.
//y tambien hacer authStore.setUserId(id)
//donde id es lo que vas  sacar de la api o de la base de datos. 