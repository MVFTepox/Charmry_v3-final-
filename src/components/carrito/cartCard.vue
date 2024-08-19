<template>
  <div class="w-full flex items-center justify-between border-t-2 py-2" style="border-color: #eddaab;">
    <div class="flex items-center w-96">
      <input type="checkbox" v-model="item.checked" @change="updateTotals" style="accent-color: #b66141; width: 20px; height: 20px;border-color: #b66141;"
       class="hover:scale-105 me-3 transition-all" />
      <div class="ml-2">
        <div class="w-auto h-auto">
          <img :src="item.photo" alt="producto" class="min-w-20 max-w-20 rounded-xl border-2" style="border-color: #cb8844;">
        </div>
      </div>
      <div class="ml-4 font-DMsans">
        <p class="text-brown sm:text-base lg:text-lg ">{{ item.name }}</p>
        <p class="text-brown sm:text-lg lg:text-xl">${{ item.price }}</p>
      </div>
    </div>
    <div class="flex items-center w-1/3 justify-center h-10">
      <div class="rounded-3xl h-full flex items-center justify-items-center w-auto" style="background-color: #eddaab;">
        <button @click="decrement" class="pe-1 ps-3 border-0 text-2xl pb-1 font-semibold" style="color: #b66141;">-</button>
        <span class="mx-2 text-2xl">
          <input type="number" v-model.number="item.quantity" @input="validateQuantity" class="w-8 text-2xl max-w-xs text-center outline-none bg-transparent no-spinner font-DMsans" />
        </span>
        <button @click="increment" class="ps-1 pe-3 border-0 text-2xl pb-1 font-semibold" style="color: #b66141;">+</button>
      </div>
    </div>
    <div class="w-1/3 text-center">
      <p class="text-brown text-3xl font-elmessiri">${{ item.total }}</p>
    </div>
    <div>
      <button @click="showConfirmPopup = true" class="hover:scale-90 px-2 py-1 transition-all btn-sm rounded-2xl bg-[#662f25] text-[#eddaab] font-DMsans">Eliminar</button>
    </div>

    <ConfirmationPopup
      v-if="showConfirmPopup"
      :itemName="item.name"
      :itemId="item.id"
      :onConfirm="confirmRemove"
      :onCancel="cancelRemove"
    />
  </div>
</template>

<script>
import { ref } from 'vue';
import ConfirmationPopup from "@/components/carrito/ConfirmationPopup.vue";


export default {
  components: {
    ConfirmationPopup
  },
  props: {
    
    item: {
      type: Object,
      required: true
    },
    updateTotals: {
      type: Function,
      required: true
    },
    removeItemFromCart: {
      type: Function,
      required: true
    }
  },
  
  setup(props) {
    const showConfirmPopup = ref(false);
    function increment() {
      props.item.quantity++;
      props.item.total = props.item.quantity * props.item.price;
      props.updateTotals();
    }
    
    function decrement() {
      if (props.item.quantity > 1) {
        props.item.quantity--;
        props.item.total = props.item.quantity * props.item.price;
        props.updateTotals();
      }
    }
    
    function validateQuantity() {
      if (props.item.quantity < 1) {
        props.item.quantity = 1;
      }
      props.item.total = props.item.quantity * props.item.price;
      props.updateTotals();
    }
    
    function confirmRemove(itemId) {
      props.removeItemFromCart(itemId);
      showConfirmPopup.value = false;
    }
    
    function cancelRemove() {
      showConfirmPopup.value = false;
    }
    
    return {
      showConfirmPopup,
      increment,
      decrement,
      validateQuantity,
      confirmRemove,
      cancelRemove
    };
  }
};
</script>
