<template>
  <div
    v-for="product in products" :key="product.id"
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
        :style="{ fontVariationSettings: `'FILL' ${currentFill}` }"
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

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

export default defineComponent({
  name: 'ProductCard',
  setup() {
    const products = ref<any[]>([]);
    const currentFill = ref<number>(0);
    const errors = ref<Record<string, string>>({});

    const toggleWish = () => {
      currentFill.value = currentFill.value === 0 ? 1 : 0;
    };

    


    return {
      products,
      currentFill,
      toggleWish,
      
      errors
    };
  },
});
</script>

<style scoped>
p {
  color: #662f25;
}
.filler:hover {
  font-variation-settings: 'FILL' 1;
  cursor: pointer;
}
</style>
