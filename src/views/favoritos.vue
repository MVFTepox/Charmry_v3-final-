<template>
    <div>
        <Navbarr2></Navbarr2>
    </div>
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
            <WishlistCard
                v-for="product in filteredFavorites"
                :key="product.id"
                :product="product"
                :idFavorite="product.favorite_id" 
            />
        </div>
    </div>
</template>

<script>
import Navbarr2 from '@/components/Navbarr2.vue';
import WishlistCard from '@/components/WishlistCard.vue';
import { useAuthStore } from '@/stores/valoresGLobales';
import { defineComponent, ref, onMounted } from 'vue';

export default defineComponent({
    name: 'favoritos',
    components: {
        Navbarr2,
        WishlistCard
    },
    setup() {
        const store = useAuthStore();
        const userID = store.userId;
        const filteredFavorites = ref([]);
        const favoritosIds = ref([]);

        const fetchFavorites = async () => {
            try {
                const response = await fetch('http://18.222.147.65:3333/api/favorites');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                
                favoritosIds.value = data.map(favorite => favorite.id);
                console.log('IDs de Favoritos:', favoritosIds.value);

                const userFavorites = data.filter(favorite => favorite.user_id === userID);
                
                const productDetailsPromises = userFavorites.map(favorite => fetchProductDetails(favorite.product_id, favorite.id));
                const productDetails = await Promise.all(productDetailsPromises);
                
                filteredFavorites.value = productDetails;
            } catch (error) {
                console.log('Error al obtener los favoritos:', error);
            }
        };

        const fetchProductDetails = async (productId, favoriteId) => {
            try {
                const response = await fetch(`http://18.222.147.65:3333/api/products/${productId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                return { ...data, favorite_id: favoriteId };  
            } catch (error) {
                console.error('Error al obtener los detalles del producto:', error);
                return null;
            }
        };

        async function deleteAllFavorites() {
            if (!userID) {
                console.warn('No userID available. Cannot delete favorites.');
                return;
            }

            try {
                const response = await fetch('http://18.222.147.65:3333/api/favorites');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                const userFavorites = data.filter(favorite => favorite.user_id === userID);

                for (const favorite of userFavorites) {
                    await fetch(`http://18.222.147.65:3333/api/favorites/${favorite.id}`, {
                        method: 'DELETE'
                    });
                }

                console.log('All favorites deleted successfully');
                await fetchFavorites();
            } catch (error) {
                console.error('Error al eliminar todos los favoritos:', error);
            }
        }

        onMounted(() => {
            fetchFavorites();
        });

        return {
            filteredFavorites,
            deleteAllFavorites,
            favoritosIds
        };
    }
});
</script>
