<template>
    <div class="rounded-3xl">
        <div class="relative w-full h-full max-w-lg shadow-lg shadow-gray-500">
            <div class="overflow-hidden relative rounded-lg">
                <div class="flex transition-transform duration-500 rounded-lg"
                    :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
                    <div v-for="(image, index) in images" :key="index" class="w-full flex-shrink-0">
                        <img :src="image" class="w-full h-full object-cover" />
                    </div>
                </div>
            </div>
            <button @click="prevSlide"
                class="btn absolute top-1/2 left-0 transform p-2 -translate-y-1/2 bg-[#B66141] text-white  rounded-full">
                < </button>
                    <button @click="nextSlide"
                        class="btn absolute top-1/2 right-0 transform -translate-y-1/2 bg-[#B66141] text-white p-2 rounded-full">
                        >
                    </button>
        </div>
    </div>

</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { PropType } from 'vue';


export default defineComponent({
    name: 'CarruselProductosdeArticulos',
    props: {
        images: {
            type: Array as PropType<string[]>,
            required: true
        }
    },

    setup(props) {
        console.log('Images:', props.images); // Agrega esta línea para depurar
        const currentIndex = ref(0);

        const prevSlide = () => {
            if (currentIndex.value > 0) {
                currentIndex.value -= 1;
            } else {
                currentIndex.value = props.images.length - 1;
            }
        };

        const nextSlide = () => {
            if (currentIndex.value < props.images.length - 1) {
                currentIndex.value += 1;
            } else {
                currentIndex.value = 0;
            }
        };

        return { currentIndex, prevSlide, nextSlide };
    }

});
</script>

<style scoped>
.carousel img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>