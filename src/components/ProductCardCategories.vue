<template>
  <div
    class="rounded-lg border-solid border-[3px] p-3 m-2 flex flex-col justify-between h-[300px] w-[200px] border-[#eddaab] font-['DM Sans']">
    <div class="flex justify-between">
      <router-link :to="{ name: 'producto', params: { id: idproduct } }">
        <p class="font-bold font-DMsans">{{ product.product_name }}</p>
        <p class="text-[#b66141] font-DMsans">${{ product.price }}</p>
      </router-link>
      <span class="material-symbols-rounded filler text-[#b66141]" @click="toggleFavorite"
        :style="{ fontVariationSettings: `'FILL' ${currentFill}` }">
        favorite
      </span>
    </div>
    <router-link :to="{ name: 'producto', params: { id: idproduct } }">
      <img :src="product.Images[0]?.image_url" alt="Product Image" class="w-full h-[150px] object-cover mb-2" />
    </router-link>  
    <button @click="addToCart"
      class="flex rounded-full justify-center h-[30px] bg-[#b66141] border-solid border-[3px] hover:border-[#eddaab] border-[#b66141] hover:bg-white text-[#eddaab]">
      <span class="material-symbols-rounded">shopping_bag</span>
      Añadir a Bolsa
    </button>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useAuthStore } from '@/stores/valoresGLobales';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const quantity = ref(1);
    const errors = ref({});
    const currentFill = ref(0);
    const authStore = useAuthStore();
    const idproduct = props.product.id

    const logeado = authStore.isLoggedIn; // Valor que indica si el usuario está logueado
    const userID = authStore.userId;

    const router = useRouter();


    const checkUserLoggedIn = () => {
      if (!logeado) {
        alert("No estás logueado");
        return false;
      }
      return true;
    };

    const toggleFavorite = async () => {
      if (!checkUserLoggedIn()) return;

      try {
        if (currentFill.value === 0) {
          // Agregar a favoritos
          const response = await fetch('http://18.222.147.65:3333/api/favorites', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              user_id: userID,
              product_id: props.product.id
            })
          });

          if (!response.ok) {
            throw new Error('Failed to add product to favorites');
          }
          console.log('Product added to favorites');
          currentFill.value = 1; // Actualiza el estado para mostrar el corazón lleno
        } else {
          // Eliminar de favoritos
          const response = await fetch('http://18.222.147.65:3333/api/favorites', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              user_id: userID,
              product_id: props.product.id
            })
          });

          if (!response.ok) {
            throw new Error('Failed to remove product from favorites');
          }

          currentFill.value = 0; // Actualiza el estado para mostrar el corazón vacío
        }
      } catch (error) {
        console.error('Error managing favorites:', error);
      }
    };

    async function addToCart() {
      if (!checkUserLoggedIn()) return;

      try {
        // Agregar producto al detail cart
        const addResponse = await fetch('http://18.222.147.65:3333/api/detail-cart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            product_id: props.product.id,
            quantity: quantity.value,
            price: props.product.price
          })
        });

        if (!addResponse.ok) {
          throw new Error('Failed to add product to detail cart');
        }

        const addedDetail = await addResponse.json(); // Obtener el ID del detail cart agregado

        // Posteriormente, enviar el detalle al carrito principal
        const cartResponse = await fetch('http://18.222.147.65:3333/api/carts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            user_id: userID, // Asigna el ID del usuario
            details_cart_id: addedDetail.id // Usa el ID del detail cart agregado
          })
        });

        if (!cartResponse.ok) {
          throw new Error('Failed to add detail cart to the main cart');
        }

        const result = await cartResponse.text();
        console.log(result);
        alert('🟢 El producto ha sido agregado a tu bolsa de deseos');

      } catch (error) {
        console.error('Error:', error);
        errors.value.general = '🔴 Hubo un problema al procesar tu solicitud. Por favor, inténtalo de nuevo.';
      }
    }

    return {
      currentFill,
      quantity,
      toggleFavorite,
      addToCart,
      
      idproduct
    };
  }
});
</script>

<style scoped>
p {
  color: #662f25;
}

.filler:hover {
  font-variation-settings: "FILL" 1;
  cursor: pointer;
  transition: color 0.3s ease;
}

.filler.filled {
  color: #e91e63;
  /* Color para el corazón lleno */
}

.filler:not(.filled):hover {
  color: #ff4081;
  /* Color para el corazón vacío al pasar el ratón */
}
</style>
