<template>
    <div>
        <Navbarr />
        <div>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 rounded-3xl px-10">
                <div class="flex justify-center items-center">
                    <img :src="imageUrl" alt="Product Image" />
                </div>
                <div class="font-DMsans flex flex-col justify-center">
                    <div>
                        <p class="text-7xl font-elmessiri text-[#CB8844] text-center">{{ nombreDelArticulo }}</p>
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

export default defineComponent({
    name: 'producto',
    components: {
        Navbarr,
        foterpage
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

                // Verifica si Images está definido y tiene al menos un elemento
                if (product.Images && product.Images.length > 0) {
                    imageUrl.value = product.Images[0].image_url || '';
                } else {
                    imageUrl.value = ''; // O una imagen predeterminada si es necesario
                }

            } catch (error) {
                console.error('Error fetching product details:', error);
                imageUrl.value = ''; // Puedes establecer una imagen predeterminada aquí
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
