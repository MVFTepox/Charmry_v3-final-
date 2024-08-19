import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/home.vue'
import prueba from '@/views/prueba.vue'
import producto from '@/views/producto.vue'
import carrito from '@/views/carrito.vue'
import pedidoConfirmado from '@/views/pedidoConfirmado.vue'
import registro from '@/views/registro.vue'
import Login from '@/views/login.vue'
import categorias from '@/views/categorias.vue'
import categoriasAnillos from '@/views/categoriasAnillos.vue'
import categoriasAretes from '@/views/categoriasAretes.vue'
import categoriasCollares from '@/views/categoriasCollares.vue'
import categoriasPulseras from '@/views/categoriasPulseras.vue'

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
    {
      path: '/pedidoconfirmado',
      name: 'pedidoconfirmado',
      component: pedidoConfirmado
    },

    {
      path: '/producto/:id',
      name: 'producto',
      component: producto,
      props: route => ({ id: Number(route.params.id) })
    },
    

    {
      path: '/carrito',
      name: 'carrito',
      component: carrito
    },

    {
      path: '/pedidoConfirmado',
      name: 'pedidoConfirmado',
      component: pedidoConfirmado
    },

    {
      path: '/registro',
      name: 'registro',
      component: registro
    },

    {
      path: '/login',
      name: 'login',
      component: Login
    },

    {
      path: '/categorias',
      name: 'categorias',
      component: categorias
    },

    {
      path: '/categoriasAnillos',
      name: 'categoriasAnillos',
      component: categoriasAnillos
    },

    {
      path: '/categoriasAretes',
      name: 'categoriasAretes',
      component: categoriasAretes
    },

    {
      path: '/categoriasCollares',
      name: 'categoriasCollares',
      component: categoriasCollares
    },

    {
      path: '/categoriasPulseras',
      name: 'categoriasPulseras',
      component: categoriasPulseras
    }
    

    
  ]
})

export default router
