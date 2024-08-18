<template>
    <div class="carousel-container">
        <ProductCard class="mx-5" v-for="product in filteredProducts" :key="product.id" :product="product" />
    </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import ProductCard from '@/components/ProductCard.vue';

export default defineComponent({
    name: 'CarruselesDeProductosPorCategoria',
    components: {
        ProductCard
    },
    props: {
        categoryId: {
            type: Number,
            required: true
        }
    },
    setup(props) {
        const filteredProducts = ref([]);

        async function fetchProducts() {
            try {
                const response = await fetch('http://18.222.147.65:3333/api/products');
                const data = await response.json();
                filteredProducts.value = data.filter(product => product.category_id === props.categoryId);
                console.log(filteredProducts.value);
            } catch (error) {
                console.log('Error al obtener los productos:', error);
            }
        }

        onMounted(() => {
            fetchProducts();
        });

        return {
            filteredProducts,
        };
    }
});
</script>


<style scoped>
.carousel-container {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
}

.carousel-container>* {
    scroll-snap-align: start;
    flex: 0 0 auto;
}
</style>