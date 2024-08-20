<template>
    <div>
      <Navbarr2></Navbarr2>
      <div class="container mx-auto px-10 py-4">
        <div class="flex justify-between">
          <h1 class="text-[#cb8844] text-4xl font-elmessiri">Lista de Deseos</h1>
          <div>
            <button
              class="btn h-[40px] font-DmSans rounded-lg bg-[#cb8844] w-[180px] text-white hover:bg-white hover:border-[#cb8844] hover:border-[2px] hover:text-[#cb8844]"
              @click="deleteAllFavorites">
              Eliminar Todo
            </button>
          </div>
        </div>
        <hr style="border-color: #eddaab" class="m-4" />
        <div class="flex flex-wrap">
          <WishlistCard v-for="product in filteredFavorites" :key="product.id" :product="product" />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Navbarr2 from '@/components/Navbarr2.vue';
  import WishlistCard from '@/components/WishlistCard.vue';
  import { useAuthStore } from '@/stores/valoresGLobales';
  import { defineComponent, ref, onMounted, watch } from 'vue';
  
  export default defineComponent({
    name: 'Favoritos',
    components: {
      Navbarr2,
      WishlistCard
    },
  
    setup() {
      const authStore = useAuthStore();
      const userId = ref(authStore.userId);
      const filteredFavorites = ref([]);
  
      // Observador para actualizar userId cuando cambie en el authStore
      watch(() => authStore.userId, (newUserId) => {
        userId.value = newUserId;
        fetchFavorites();
      });
  
      async function fetchFavorites() {
        if (!userId.value) {
          console.warn('No userId available. Cannot fetch favorites.');
          return;
        }
  
        try {
          const response = await fetch('http://18.222.147.65:3333/api/favorites');
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          filteredFavorites.value = data.filter(favorite => favorite.user_id === userId.value);
          console.log('Favorites fetched:', filteredFavorites.value);
        } catch (error) {
          console.error('Error al obtener los productos:', error);
        }
      }
  
      async function deleteAllFavorites() {
        if (!userId.value) {
          console.warn('No userId available. Cannot delete favorites.');
          return;
        }
  
        try {
          // Obtener todos los favoritos primero
          const response = await fetch('http://18.222.147.65:3333/api/favorites');
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          const userFavorites = data.filter(favorite => favorite.user_id === userId.value);
  
          // Eliminar cada favorito individualmente
          for (const favorite of userFavorites) {
            await fetch(`http://18.222.147.65:3333/api/favorites/${favorite.id}`, {
              method: 'DELETE'
            });
          }
  
          console.log('All favorites deleted successfully');
          // Llama a fetchFavorites para actualizar la lista después de la eliminación
          await fetchFavorites();
        } catch (error) {
          console.error('Error al eliminar todos los favoritos:', error);
        }
      }
  
      onMounted(() => {
        fetchFavorites();
      });
  
      return {
        fetchFavorites,
        deleteAllFavorites,
        filteredFavorites,
        userId
      };
    }
  });
  </script>
  
  <style scoped></style>
  