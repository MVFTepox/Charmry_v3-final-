<template>
  <div
    v-for="product in products" :key="product.id"
    class="rounded-lg border-solid border-[3px] p-3 m-2 flex flex-col justify-between h-[300px] w-[200px] border-[#eddaab] font-['DM Sans']"
  >
    <div class="flex justify-between ">
      <a href="/vistaProducto" class="flex flex-col mb-2">
        <p class="font-bold font-DMsans">{{ product.product_name }}</p>
        <p class="text-[#b66141] font-DMsans">${{ product.price }}</p>
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
        :src="product.Images[0]?.image_url"
        alt="Product Image"
        class="w-full h-[150px] object-cover mb-2"
      />
    </a>
    <button class="flex rounded-full justify-center h-[30px] bg-[#b66141] border-solid border-[3px] hover:border-[#eddaab] border-[#b66141] hover:bg-white text-[#eddaab]">
      <span class="material-symbols-rounded">shopping_bag</span>
      Añadir a Bolsa
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

export default defineComponent({
  name: 'ProductCard',
  methods: {
  wishClick() {
    if (this.currentFill === 0) {
      this.currentFill++
    } else if (this.currentFill === 1) {
      this.currentFill--
    }
  }
},
  setup() {
    const products = ref<any[]>([]);
      const product_id = ref<number>();
      let quantity = ref<number>()
      let price = ref<number>()
        const errors = ref<Record<string, string>>({});

    const fetchProducts = await fetch("http://3.134.108.48:3333/api/products")
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
    
    try {
    const response = await fetch("http://18.222.147.65:3333/api/detail_cart");
    const result = await response.text();
    console.log(result);
  } catch (error) {
    console.error("Error adding to cart:", error);
    errors.value.general = "🔴 There was a problem adding the product to the cart. Please try again.";
  }

          const addToCart = async () => {
      const raw = JSON.stringify({
        product_id: product_id.value,
        quantity: quantity.value,
        price: price.value
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
        errors.value.general = "🔴 There was a problem adding the product to the cart. Please try again.";
      }

    return {
      products,
      currentFill: 0,
      product_id,
      quantity,
      price
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


