<template>
    <transition @after-enter="afterEnter" @before-leave="beforeLeave">
      <div v-if="isVisible" class="fixed inset-0 flex items-center justify-center">
        <div class="popup-content bg-white p-6 rounded-lg shadow-lg">
          <p class="text-xl mb-4 text-[#662f25] font-DMsans" >¿Estás seguro de que deseas eliminar "{{ itemName }}" de tu carrito?</p>
          <div class="flex justify-center gap-8 font-elmessiri">
            <button @click="confirm" class="text-xl rounded-full h-10 w-16 bg-[#b66141] border-solid border-[3px] hover:border-[#eddaab] border-[#b66141] hover:bg-white text-[#eddaab] "
            >Sí</button>
            <button @click="cancel" class="text-xl rounded-full h-10 w-16 bg-[#b66141] border-solid border-[3px] hover:border-[#eddaab] border-[#b66141] hover:bg-white text-[#eddaab]">No</button>
          </div>
        </div>
      </div>
    </transition>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  
  export default defineComponent({
    props: {
      itemName: {
        type: String,
        required: true
      },
      onConfirm: {
        type: Function as () => void,
        required: true
      },
      onCancel: {
        type: Function as () => void,
        required: true
      }
    },
    setup(props) {
      const isVisible = ref(true);
  
      function confirm() {
        props.onConfirm();
        isVisible.value = false;
      }
  
      function cancel() {
        props.onCancel();
        isVisible.value = false;
      }
  
      function afterEnter() {
      }
  
      function beforeLeave() {
        isVisible.value = false;
      }
  
      return {
        isVisible,
        confirm,
        cancel,
        afterEnter,
        beforeLeave
      };
    }
  });
  </script>
  
  <style scoped>
  .popup-content {
    animation: fadeIn 0.3s ease-in-out;
  }
  
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s ease;
  }
  
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  </style>
  