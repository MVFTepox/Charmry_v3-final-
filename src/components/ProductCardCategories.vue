<template>
  <div
    class="rounded-lg border-solid border-[3px] p-3 m-2 flex flex-col justify-between h-[300px] w-[200px] border-[#eddaab] font-['DM Sans']"
  >
    <div class="flex justify-between">
      <a href="/vistaProducto" class="flex flex-col mb-2">
        <p class="font-bold font-DMsans">{{ product.product_name }}</p>
        <p class="text-[#b66141] font-DMsans">${{ product.price }}</p>
      </a>
      <span
        class="material-symbols-rounded filler text-[#b66141]"
        @click="toggleWish"
        :class="{ 'filled': isWished }"
      >
        favorite
      </span>
    </div>
    <a href="/vistaProducto">
      <img
        :src="product.Images[0]?.image_url"
        alt="Product Image"
        class="w-full h-[150px] object-cover mb-2"
      />
    </a>
    <button
      type="button"
      class="flex rounded-full justify-center h-[30px] bg-[#b66141] border-solid border-[3px] hover:border-[#eddaab] border-[#b66141] hover:bg-white text-[#eddaab]"
    >
      <span class="material-symbols-rounded">shopping_bag</span>
      Añadir a Bolsa
    </button>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  setup() {
    const isWished = ref(false); // Estado para el corazón

    const toggleWish = () => {
      isWished.value = !isWished.value; // Cambia el estado al hacer clic
    };

    return {
      isWished,
      toggleWish,
    };
  },
});
</script>

<style scoped>
p {
  color: #662f25;
}

.filler {
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
