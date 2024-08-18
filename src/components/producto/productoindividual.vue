<template>
    <div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 rounded-3xl px-10">
            <div class="flex justify-center items-center">
                <img src="" alt="">
            </div>

            <div class="font-DMsans flex flex-col justify-center">
                <div>
                    <p class="text-7xl font-elmessiri text-[#CB8844] text-center">{{ nombreDelArticulo }}</p>
                </div>
                <div class="justify-center flex">
                    <div class="grid grid-cols-2 my-4 gap-32 md:gap-44 lg:gap-56">
                        <p class="text-3xl text-center text-[#B66141]">{{ Categoría }}</p>

                    </div>
                </div>
                <div>
                    <p class="text-4xl text-[#662F25]">
                        {{ description }}
                    </p>
                    <p class="text-7xl font-elmessiri my-4 text-[#CB8844]">{{ precioDelArticulo }}</p>
                </div>
                <div class="my-4">
                    
                </div>
                <div class="my-4">
                    <button class="btn rounded-3xl bg-[#B66141] text-white w-full text-2xl hover:text-[#cb8844]">
                        Agregar al carrito
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { PropType } from 'vue';



export default defineComponent({
    name: 'productoindividual',

    components: {
        
       
    },

    props: {
        images: {
            type: Array as PropType<string[]>,
            required: true
        },
        nombreDelArticulo: {
            type: String,
            required: true
        },
        precioDelArticulo: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        Categoría: {
            type: String,
            required: true
        },
        Estilo: {
            type: String,
            required: true
        }
    },

    data() {
        return {
            productQuantity: 1,
            currentFill: 1
        };
    },

    methods: {
        updateQuantity(newQuantity: number) {
            this.productQuantity = newQuantity;
        },
        removeFromWished() {
            this.currentFill = 0;
        },
    },

    mounted() {
        console.log('Images:', this.images);  // Verificar que las imágenes se reciben correctamente
    }
});
</script>
