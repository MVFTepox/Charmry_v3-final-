<template>
  <div
    class="rounded-lg border-solid border-[3px] p-3 m-2 flex flex-col justify-between h-[300px] w-[200px] border-[#eddaab] font-['DM Sans']">
    <div class="flex justify-between">
      <a href="/producto" class="flex flex-col mb-2">
        <p class="font-bold font-DMsans">{{ product.product_name }}</p>
        <p class="text-[#b66141] font-DMsans">${{ product.price }}</p>
      </a>
      <span class="material-symbols-rounded filler text-[#b66141]" @click="wishClick"
        :style="{ fontVariationSettings: `'FILL' ${currentFill}` }">
        favorite
      </span>
    </div>
    <a href="/vistaProducto">
      <img :src="product.Images[0]?.image_url" alt="Product Image" class="w-full h-[150px] object-cover mb-2" />
    </a>
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
    const authStore = useAuthStore()

    authStore.setUserId(1)

    const userID = authStore.userId


    const wishClick = () => {
      currentFill.value = currentFill.value === 0 ? 1 : 0;
    };


    async function addToCart() {
      try {
        // Add product to detail cart
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

        const addedDetail = await addResponse.json(); // Assuming the response is JSON and contains the detail cart ID


        // Fetch the updated detail cart
        const detailCartResponse = await fetch('http://18.222.147.65:3333/api/detail-cart');
        if (!detailCartResponse.ok) {
          
          throw new Error('Failed to fetch detail cart');
        }

        const carritodatos = await detailCartResponse.json();
        console.log(carritodatos);

        // POST to carts
        const cartResponse = await fetch('http://18.222.147.65:3333/api/carts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            user_id: userID,
            details_cart_id: carritodatos.id // Use the ID from the fetched detail cart
          })
        });

        if (!cartResponse.ok) {
          throw new Error('Failed to add detail cart to the main cart');
        }

        const result = await cartResponse.text();
        console.log(result);

      } catch (error) {
        console.error('Error:', error);
        errors.value.general = '🔴 There was a problem processing your request. Please try again.';
      }
    }
    return {
      currentFill,
      quantity,
      wishClick,
      addToCart,


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
