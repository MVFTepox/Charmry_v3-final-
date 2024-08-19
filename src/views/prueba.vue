<template>
    <div>
        <CarruselesDeProductosPorCategoria />
        <WishlistCard />	
    </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import ProductCard from '@/components/ProductCard.vue';
import CarruselesDeProductosPorCategoria from '@/components/carruseles/CarruselesDeProductosPorCategoria.vue';
import WishlistCard from '@/components/WishlistCard.vue';
export default defineComponent({
    name: 'prueba',
    components: {
        ProductCard,
        CarruselesDeProductosPorCategoria,
        WishlistCard
    },
    setup() {



        async function fetchCategories() {
            try {
                const response = await fetch('http://18.222.147.65:3333/api/categories');

                // Verifica si la respuesta es exitosa
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log(data); // Aquí verás la información recibida en la consola
            } catch (error) {
                console.error('Error al obtener datos:', error);
            }
        }

        // Llama a la función para obtener los datos
        fetchCategories();



        return {

        }
    }
})

</script>