<template>
  <div class="container mx-auto sm:px-4 lg:px-16 pt-16 px-4">
    <h1 class="text-4xl sm:text-5xl md:text-6xl text-orange mb-6 font-elmessiri">Bolsa de compras</h1>
    <div class="flex flex-col lg:flex-row gap-6">
      <div class="w-full lg:w-2/3">
        <div class="border-2 rounded-3xl p-4" style="border-color: #eddaab;">
          <div class="flex items-center justify-between pb-2 mb-2">
            <div class="flex items-center">
              <input type="checkbox" v-model="selectAll" @change="toggleSelectAll" id="all"
                style="accent-color: #b66141; width: 20px; height: 20px;"
                class="transition-transform hover:scale-105 me-3 border-2 rounded-3xl checkbox border-[#b66141] [--chkbg:#b66141] [--chkfg:#eddaab] checked:border-[#b66141]" />
            </div>
            <div class="flex w-full justify-between text-sm md:text-base">
              <span class="w-1/3 text-left text-orange font-DMsans">Seleccionar todo</span>
              <span class="w-1/3 text-center text-orange font-DMsans">Cantidad</span>
              <span class="w-1/3 text-center text-orange font-DMsans">Total</span>
            </div>
          </div>
          <CartItem v-for="item in items" :key="item.id" :item="item" :update-totals="updateTotals"
            :remove-item-from-cart="removeItem" />
        </div>
      </div>

      <div class="w-full lg:w-1/3 mt-6 lg:mt-0 font-elmessiri">
        <div class="border-2 rounded-3xl p-4" style="border-color: #cb8844;">
          <div class="mb-4 flex justify-between items-end text-sm md:text-base">
            <p class="text-orange sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl text-2xl">Subtotal</p>
            <p class="text-brown sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl text-2xl">${{ subtotal }}</p>
          </div>
          <div class="mb-4 flex justify-between items-end text-sm md:text-base">
            <p class="text-orange sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl text-2xl">IVA</p>
            <p class="text-brown sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl text-2xl">${{ iva }}</p>
          </div>

          <div class="mb-4 flex flex-col justify-between h-full">
            <p class="text-orange sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl text-2xl">Envío</p>
            <div>
              <div class="flex mt-4 justify-center align-middle">
                <button :class="{ 'active-button': shipping === 'standard' }"
                  class="w-7/12 lg:w-10/12 rounded-lg flex justify-around px-3 py-2 hover:border-2 hover:bg-[#eddaab] bg-transparent text-sm md:text-base"
                  name="shipping" value="standard" @click="updateShipping('standard')" style="border-color: #cb8844;">
                  <p class="text-orange sm:text-2xl md:text-2xl lg:text-xl text-2xl">Envío estandar</p>
                  <p class="text-brown lg:text-2xl text-3xl">$30</p>
                </button>
              </div>
              <div class="flex mt-4 justify-center align-middle">
                <button :class="{ 'active-button': shipping === 'personal' }"
                  class="w-7/12 lg:w-10/12 flex py-2 px-3 rounded-lg justify-around hover:border-2 hover:bg-[#eddaab] bg-transparent text-sm md:text-base"
                  name="shipping" value="personal" @click="updateShipping('personal')" style="border-color: #cb8844;">
                  <p class="text-orange sm:text-2xl md:text-2xl lg:text-xl text-2xl">Entrega en persona</p>
                  <p class="text-brown lg:text-2xl text-3xl">$0</p>
                </button>
              </div>
            </div>
          </div>

          <div class="w-full flex justify-center">
            <div class="pt-2 flex justify-between items-end w-full md:w-4/6">
              <p class="text-brown sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl text-2xl">Total</p>
              <p class="text-brown sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl text-2xl">${{ total }}</p>
            </div>
          </div>

          <div class="flex justify-center">
            <a href="/pedidoconfirmado">
              <button
                class="mt-4 px-6  py-2 w-- rounded-3xl w-full text-lg md:text-xl font-medium  tracking-wide hover:scale-105 font-DMsans"
                style="background-color: #b66141; color: #eddaab;">Pagar</button>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import CartItem from "@/components/carrito/cartCard.vue";
import { useAuthStore } from "@/stores/valoresGLobales";

export default {
  components: {
    CartItem
  },
  setup() {
    const authStore = useAuthStore();
    const userId = ref(authStore.userId); // Usar ref para reactividad
    const selectAll = ref(true);
    const items = ref([]);
    const shipping = ref('standard');
    const subtotal = computed(() => items.value.reduce((acc, item) => item.checked ? acc + item.total : acc, 0).toFixed(2));
    const iva = computed(() => (parseFloat(subtotal.value) * 0.16).toFixed(2));
    const total = computed(() => (parseFloat(subtotal.value) + parseFloat(iva.value) + (shipping.value === 'standard' ? 30 : 0)).toFixed(2));

    async function fetchUserCart() {
      if (!userId.value) { // Verificar si userId es null o 0
        console.warn('No userId available. Cannot fetch user cart.');
        return;
      }

      try {
        const cartsResponse = await fetch(`http://18.222.147.65:3333/api/carts`);
        if (cartsResponse.ok) {
          const cartsData = await cartsResponse.json();
          const userCarts = cartsData.filter(cart => cart.user_id === userId.value);

          for (const cart of userCarts) {
            if (cart.details_cart_id) {
              await fetchCartDetails(cart.details_cart_id);
            }
          }
        } else {
          console.error('Failed to fetch carts');
        }
      } catch (error) {
        console.error('Error fetching carts:', error);
      }
    }

    async function fetchCartDetails(detailsCartId) {
      try {
        const detailsCartResponse = await fetch(`http://18.222.147.65:3333/api/detail-cart`);
        if (detailsCartResponse.ok) {
          const detailsCartData = await detailsCartResponse.json();
          const cartItems = detailsCartData.filter(item => item.id === detailsCartId);

          if (cartItems.length > 0) {
            await Promise.all(cartItems.map(fetchProductDetails));
          } else {
            console.error('No details found for this cart');
          }
        } else {
          console.error('Failed to fetch cart details');
        }
      } catch (error) {
        console.error('Error fetching cart details:', error);
      }
    }

    async function fetchProductDetails(cartItem) {
      try {
        const productResponse = await fetch(`http://18.222.147.65:3333/api/products`);
        if (productResponse.ok) {
          const products = await productResponse.json();
          const productData = products.find(product => product.id === cartItem.product_id);

          if (productData) {
            items.value.push({
              id: productData.id,
              name: productData.product_name,
              price: cartItem.price,
              quantity: cartItem.quantity,
              total: cartItem.quantity * cartItem.price,
              photo: productData.Images[0]?.image_url || '', // Use the first image URL
              checked: true
            });
          }
        } else {
          console.error('Failed to fetch product details');
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    }

    function updateTotals() {
      subtotal.value;
      iva.value;
      total.value;
      checkSelectAll();
    }

    function toggleSelectAll() {
      const newValue = selectAll.value;
      items.value.forEach(item => {
        item.checked = newValue;
      });
      updateTotals();
    }

    function checkSelectAll() {
      selectAll.value = items.value.every(item => item.checked);
    }

    function updateShipping(option) {
      shipping.value = option;
      updateTotals();
    }

    function removeItem(itemId) {
      items.value = items.value.filter(item => item.id !== itemId);
      updateTotals();
    }

    onMounted(() => {
      fetchUserCart();
    });

    return {
      items,
      shipping,
      subtotal,
      iva,
      total,
      selectAll,
      updateTotals,
      toggleSelectAll,
      checkSelectAll,
      updateShipping,
      removeItem,
    };
  }
};
</script>



<style>
.text-orange {
  color: #cb8844;
}

.text-brown {
  color: #662f25;
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}

.active-button {
  background-color: #eddaab;
}
</style>
