<template>
  <div class="flex justify-between" style="width: 500px; height: 280px">
    <div
      class="rounded-lg border-solid border-[#eddaab] m-3"
      id="wishlistImage"
      style="border-width: 3px; width: 200px; height: 250px"
    ></div>
    <div class="flex flex-col justify-between h-full w-1/2 p-3">
      <div class="flex justify-between">
        <div>
          <p>productName</p>
          <p>$productPrice</p>
        </div>
        <span
          class="material-symbols-rounded hover:cursor-pointer text-[#b66141]"
          @click="removeFromWished"
          :style="{ fontVariationSettings: `'FILL' ${currentFill}` }"
        >
          favorite
        </span>
      </div>
      <div>
        <div class="rounded-full bg-[#eddaab] m-1 flex justify-between w-24" style="height: 30px">
          <button
            type="button"
            @click="quantityDecrement"
            class="hover:bg-[#cb8844] rounded-s-full flex items-center px-1"
          >
            <span class="material-symbols-rounded text-[#b66141]"> remove </span>
          </button>
          <input
            type="text"
            v-model="productQuantity"
            class="caret-[#662f25] bg-[#eddaab] placeholder:text-[#662f25] text-center w-[30px] outline-none"
          />
          <button
            type="button"
            @click="quantityIncrement"
            class="hover:bg-[#cb8844] rounded-e-full flex items-center px-1"
          >
            <span class="material-symbols-rounded" style="color: #b66141"> add </span>
          </button>
        </div>
        <div class="flex justify-between">
          <button
            class="flex rounded-full justify-center bg-[#b66141] m-1 border-2 border-[#b66141] text-[#eddaab] h-[30px] w-[170px] hover:border-[#eddaab] hover:bg-white"
            id=""
          >
            <span class="material-symbols-rounded"> shopping_bag </span>
            Añadir a Bolsa
          </button>
          <button>
            <span class="material-symbols-rounded align-middle trash"> delete </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { fetchProduct } from '@/Utils/api';
export default {
  name: 'WishlistCard',
  data() {
    return {
      productQuantity: 1,
      currentFill: 1,
      product: null, 
      loading: false 
    }
  },
  props:{
    product_id: Number,
  },
  methods: {
    quantityIncrement() {
      this.productQuantity++
    },

    quantityDecrement() {
      if (this.productQuantity > 1) {
        this.productQuantity--
      }
    },

    removeFromWished() {
      this.currentFill = 0
    },
    async loadProduct(product_id) {
      this.loading = true;
      try {
        const response = await fetchProduct(id);
        this.product = response.data; // Assuming the API response has a `data` property with product details
      } catch (err) {
        console.error('Failed to load product.');
      } finally {
        this.loading = false;
      }
    },


  }
}
</script>
<style scoped>
p {
  color: #662f25;
}
.trash {
  color: #b66141;
}
.trash:hover {
  color: #a8350a;
}
</style>
