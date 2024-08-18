<template>
  <div class="rounded-lg border-solid border-[3px] p-3 m-2 flex flex-col justify-between h-[300px] w-[200px] border-[#eddaab] font-['DM Sans']">
    <div class="flex justify-between">
      <a href="/producto" class="flex flex-col mb-2">
        <p class="font-bold font-DMsans">{{ product_name }}</p>
        <p class="text-[#b66141] font-DMsans">${{ price }}</p>
      </a>
      <span
        class="material-symbols-rounded filler text-[#b66141]"
        @click="wishClick"
        :style="{ fontVariationSettings: `'FILL' ${currentFill}` }"
      >
        favorite
      </span>
    </div>
    <a href="/vistaProducto">
      <img
        :src="img_url"
        alt="Product Image"
        class="w-full h-[150px] object-cover mb-2"
      />
    </a>
    <button @click="addToCart" class="flex rounded-full justify-center h-[30px] bg-[#b66141] border-solid border-[3px] hover:border-[#eddaab] border-[#b66141] hover:bg-white text-[#eddaab]">
      <span class="material-symbols-rounded">shopping_bag</span>
      Añadir a Bolsa
    </button>
  </div>
</template>

<script>
import { defineComponent, ref} from 'vue';
import { useAuthStore } from '@/stores/valoresGLobales';

export default defineComponent({
  name: 'ProductCard',
  props:{
    product_name: String,
    price: Number,
    product_id: Number,
    img_url: String
  },
  setup(props) {
    const quantity = ref(1);
    const errors = ref({});
    const currentFill = ref(0);
    const authStore = useAuthStore()

    // authStore.setUserId(id)

    const wishClick = () => {
      currentFill.value = currentFill.value === 0 ? 1 : 0;
    };

    const addToCart = async () => {
      const raw = JSON.stringify({
        product_id: props.product_id,
        quantity: quantity.value,
        price: props.price
      });
      const requestOptions = {
        method: "POST",
        body: raw,
        headers: {
          "Content-Type": "application/json"
        }
      };

        try {
          const response = await fetch("http://18.222.147.65:3333/api/detail_cart", requestOptions);
          const result = await response.text();
          console.log(result);
        } catch (error) {
          console.error("Error adding to cart:", error);
          errors.value.general = "🔴 There was a problem adding the product details to the cart. Please try again.";
        }

        try {
        const response = await fetch("http://18.222.147.65:3333/api/carts", { 
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: props.product_id,
            detail_carts_id: quantity.value,
          }),
        });
        const result = await response.text();
        console.log(result);
        } catch (error) {
        console.error("Error creating cart:", error);
        errors.value.general = "🔴 There was a problem adding a cart. Please try again.";
        }



      };
      
    return {
      currentFill,
      product_id,
      quantity,
      price,
      wishClick,
      addToCart
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
  color: #e91e63; /* Color para el corazón lleno */
}

.filler:not(.filled):hover {
  color: #ff4081; /* Color para el corazón vacío al pasar el ratón */
}
</style>
