<template>
    <div class="relative w-full">
        <div class="overflow-hidden relative">
            <div class="flex transition-transform duration-500"
                :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
                <div v-for="(image, index) in images" :key="index" class="w-full h-76 rounded-3xl flex-shrink-0">
                    <img :src="image" class="w-full h-64 object-cover" />
                </div>
            </div>
        </div>
        <button @click="prevSlide"
            class="absolute top-1/2 left-0 transform -translate-y-1/2 p-2 rounded-full">
            <img src="../assets/icon/arrow_left_38dp_E8EAED_FILL0_wght400_GRAD0_opsz40.png" alt="">
        </button>
        <button @click="nextSlide"
            class="absolute top-1/2 right-0 transform -translate-y-1/2 p-2 rounded-full">
            <img src="../assets/icon/arrow_right_38dp_E8EAED_FILL0_wght400_GRAD0_opsz40.png" alt="">
        </button>
    </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';

export default {
    name: 'Carousel',
    props: {
        images: {
            type: Array,
            required: true
        }
    },
    setup(props) {
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

        onMounted(() => {
            const interval = setInterval(nextSlide, 7000);
            onUnmounted(() => {
                clearInterval(interval);
            });
        });

        return { currentIndex, prevSlide, nextSlide };
    }
};
</script>

<style scoped>
.carousel img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>
