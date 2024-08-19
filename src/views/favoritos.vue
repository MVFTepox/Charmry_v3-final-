<template>
    <div>
        <Navbarr2></Navbarr2>
    </div>
    <div class="container mx-auto px-10 py-4">
        <div class="flex justify-between">
            <h1 class="text-[#cb8844] text-4xl font-elmessiri">Lista de Deseos</h1>
            <div>
                <!-- <button
                    class="btn h-[40px] font-DmSans rounded-lg bg-[#cb8844] w-[180px] text-white hover:bg-white hover:border-[#cb8844] hover:border-[2px] hover:text-[#cb8844]"
                    @click="deleteAllFavorites">
                    Eliminar Todo
                </button> -->
            </div>
        </div>
        <hr style="border-color: #eddaab" class="m-4" />
        <div class="flex flex-wrap">
            <WishlistCard v-for="product in filteredFavorites" :key="product.id" :product="product"> </WishlistCard>
        </div>
    </div>
</template>
<script>
import Navbarr2 from '@/components/Navbarr2.vue';
import WishlistCard from '@/components/WishlistCard.vue';
import { useAuthStore } from '@/stores/valoresGLobales';
import { defineComponent, ref, onMounted } from 'vue';
export default defineComponent({
    name: 'Favoritos',
    components: {
        Navbarr2,
        WishlistCard
    },
    
    setup(props) {
        const authStore = useAuthStore();
        const userId = authStore.userId;
        const filteredFavorites = ref([]);
        

        async function fetchFavorites() {
            try {
                const response = await fetch('http://18.222.147.65:3333/api/favorites');
                const data = await response.json();
                filteredFavorites.value = data.filter(data => data.user_id === userId);
                console.log(filteredFavorites.value);
            } catch (error) {
                console.log('Error al obtener los productos:', error);
            }
        }

        async function deleteAllFavorites() {
            try {
                const response = await fetch('http://18.222.147.65:3333/api/favorites', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        user_id: userId
                    })
                });
                if (!response.ok) {
                    throw new Error('Failed to delete all favorites');
                }
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
            userId,
            authStore

        };
    }
})
</script>
<style scoped></style>