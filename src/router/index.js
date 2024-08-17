import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/home.vue'
import prueba from '@/views/prueba.vue'
import producto from '@/views/producto.vue'
import carrito from '@/views/carrito.vue'
import pedidoConfirmado from '@/views/pedidoConfirmado.vue'
import registro from '@/views/registro.vue'
import Login from '@/views/login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },

    {
      path: '/prueba',
      name: 'prueba',
      component: prueba
    },

    
  ]
})

export default router
