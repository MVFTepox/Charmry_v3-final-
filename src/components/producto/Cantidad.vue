<template>
    <div class="rounded-full bg-[#eddaab] m-1 flex justify-between w-24" style="height: 30px">
        <button type="button" @click="decrement" class="hover:bg-[#cb8844] rounded-s-full flex items-center px-1">
            <span class="material-symbols-rounded text-[#b66141]"> remove </span>
        </button>
        <input type="text" v-model="quantity"
            class="caret-[#662f25] bg-[#eddaab] placeholder:text-[#662f25] text-center w-[30px] outline-none" />
        <button type="button" @click="increment" class="hover:bg-[#cb8844] rounded-e-full flex items-center px-1">
            <span class="material-symbols-rounded" style="color: #b66141"> add </span>
        </button>
    </div>
</template>

<script lang="ts">
export default {
    name: 'QuantitySelector',
    props: {
        initialQuantity: {
            type: Number,
            default: 1
        }
    },
    data() {
        return {
            quantity: this.initialQuantity
        }
    },
    methods: {
        increment() {
            this.quantity++;
            this.$emit('update:quantity', this.quantity);
        },
        decrement() {
            if (this.quantity > 1) {
                this.quantity--;
                this.$emit('update:quantity', this.quantity);
            }
        }
    }
}
</script>