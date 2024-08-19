<template>
  <transition @after-enter="afterEnter" @before-leave="beforeLeave">
    <div v-if="isVisible" class="fixed inset-0 flex items-center justify-center">
      <div class="popup-content bg-white p-6 rounded-lg shadow-lg">
        <p class="text-xl mb-4 text-[#662f25] font-DMsans">
          ¿Estás seguro de que deseas eliminar "{{ itemName }}" de tu carrito?
        </p>
        <div class="flex justify-center gap-8 font-elmessiri">
          <button @click="confirm" class="text-xl rounded-full h-10 w-16 bg-[#b66141] border-solid border-[3px] hover:border-[#eddaab] border-[#b66141] hover:bg-white text-[#eddaab]">Sí</button>
          <button @click="cancel" class="text-xl rounded-full h-10 w-16 bg-[#b66141] border-solid border-[3px] hover:border-[#eddaab] border-[#b66141] hover:bg-white text-[#eddaab]">No</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>

export default {
  props: {
    itemName: {
      type: String,
      required: true
    },
    itemId: {
      type: Number,
      required: true
    },
    onConfirm: {
      type: Function,
      required: true
    },
    onCancel: {
      type: Function,
      required: true
    },
  },
  data() {
    return {
      isVisible: true
    };
  },
  methods: {
    async deleteCartItem() {
      try {
        // Delete detail-cart associated with the item
        await fetch(`http://18.222.147.65:3333/api/detail-cart/${this.itemId}`, {
          method: 'DELETE'
        });
        
        // Delete cart item
        await fetch(`http://18.222.147.65:3333/api/carts/${this.itemId}`, {
          method: 'DELETE'
        });
        
        console.log('Successfully deleted cart item:', this.itemId);
      } catch (error) {
        console.error('Error deleting cart item:', error);
      }
    },
    confirm() {
      this.deleteCartItem().then(() => {
        this.onConfirm(this.itemId); // Pass itemId to confirm callback
        this.isVisible = false;
      });
    },
    cancel() {
      this.onCancel();
      this.isVisible = false;
    },
    afterEnter() {},
    beforeLeave() {
      this.isVisible = false;
    }
  }
  };
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
