<template>
    <div>
        <Navbarr />
        <div>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 rounded-3xl my-5 px-10">
                <div class="flex justify-center items-center ">
                    <img :src="imageUrl" alt="Product Image" class="w-full h-[500px] object-cover rounded-lg" />
                </div>
                <div class="font-DMsans flex flex-col justify-center">
                    <div>
                        <p class="text-7xl font-elmessiri text-[#CB8844] ">{{ nombreDelArticulo }}</p>
                    </div>
                    <div class="justify-center flex">
                        <div class="grid grid-cols-2 my-4 gap-32 md:gap-44 lg:gap-56">
                            <p class="text-3xl text-center text-[#B66141]">{{ Categoría }}</p>
                        </div>
                    </div>
                    <div>
                        <p class="text-4xl text-[#662F25]">
                            {{ description }}
                        </p>
                        <p class="text-7xl font-elmessiri my-4 text-[#CB8844]">{{ precioDelArticulo }}</p>
                    </div>
                    <div class="my-4">
                        <!-- Add more content here if needed -->
                    </div>
                    <div class="my-4">
                        <button @click="addToCart"
                            class="btn rounded-3xl bg-[#B66141] text-white w-full text-2xl hover:text-[#cb8844]">
                            Agregar al carrito
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="mx-10 my-5">
            <CommentSection />
        </div>
        <br>
        <div class="mx-10 my-5">
            <hr class="my-4 border-2  border-[#B66141]">
            <h1 class="text-4xl sm:text-5xl md:text-6xl text-center text-[#B66141] mb-6 font-elmessiri" >Articulos que te pueden interesar</h1>
            
            <hr class="my-4 border-2  border-[#B66141]">
            <div>
                <CarruselesDeProductosPorCategoria  :categoryId="3" />
            </div>
        </div>
        <div>
            <foterpage />
        </div>
    </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import Navbarr from '@/components/Navbarr2.vue';
import foterpage from '@/components/footer.vue';
import { useAuthStore } from '@/stores/valoresGLobales';
import CarruselesDeProductosPorCategoria from '@/components/carruseles/CarruselesDeProductosPorCategoria.vue';
import CommentSection from '@/components/producto/CommentSection.vue';

export default defineComponent({
    name: 'producto',
    components: {
        Navbarr,
        foterpage,
        CarruselesDeProductosPorCategoria,
        CommentSection
    },
    props: {
        id: {
            type: [Number],
            required: true
        }
    },
    setup(props) {
        const nombreDelArticulo = ref('');
        const Categoría = ref('');
        const description = ref('');
        const precioDelArticulo = ref('');
        const imageUrl = ref('');

        const authStore = useAuthStore(); // Crear una instancia del store
        const userID = authStore.userId; // Acceder al userId del store

        onMounted(async () => {
            const productId = props.id; // Obtiene el `id` del producto desde las props

            // Obtener detalles del producto
            try {
                const response = await fetch(`http://18.222.147.65:3333/api/products/${productId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const product = await response.json();

                nombreDelArticulo.value = product.product_name || 'Nombre no disponible';
                Categoría.value = product.category.category_name || 'Categoría no disponible';
                description.value = product.description || 'Descripción no disponible';
                precioDelArticulo.value = product.price ? `$${product.price}` : 'Precio no disponible';
            } catch (error) {
                console.error('Error fetching product details:', error);
            }

            // Obtener imagen del producto
            try {
                const response = await fetch('http://18.222.147.65:3333/api/images');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const images = await response.json();
                
                // Filtrar imágenes según el producto
                const productImage = images.find(img => img.product_id === productId);
                imageUrl.value = productImage?.image_url || 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png?20210219185637';
            } catch (error) {
                console.error('Error fetching images:', error);
                imageUrl.value = 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png?20210219185637'; 
            }
        });

        async function addToCart() {
            try {
                // Agregar producto al detail cart
                const addResponse = await fetch('http://18.222.147.65:3333/api/detail-cart', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        product_id: props.id,
                        quantity: 1,
                        price: parseFloat(precioDelArticulo.value.replace('$', '')) // Extrae el precio numérico
                    })
                });

                if (!addResponse.ok) {
                    throw new Error('Failed to add product to detail cart');
                }

                const addedDetail = await addResponse.json();

                // Posteriormente, enviar el detalle al carrito principal
                const cartResponse = await fetch('http://18.222.147.65:3333/api/carts', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        user_id: userID,
                        details_cart_id: addedDetail.id
                    })
                });

                if (!cartResponse.ok) {
                    throw new Error('Failed to add detail cart to the main cart');
                }

                const result = await cartResponse.text();
                console.log(result);
                alert('🟢 El producto ha sido agregado a tu bolsa');

            } catch (error) {
                console.error('Error:', error);
                alert('🔴 Hubo un problema al procesar tu solicitud. Por favor, inténtalo de nuevo.'); // Muestra un mensaje de error al usuario
            }
        }

        return {
            nombreDelArticulo,
            Categoría,
            description,
            precioDelArticulo,
            imageUrl,
            addToCart
        };
    },
});
</script>
