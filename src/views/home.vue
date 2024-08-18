<template>
    <div>
        <Navbarr />
    </div>
    <div>
        <Home />
    </div>
    <div>
        <carruselprincipalPage class="my-4" :images="images" />
        
    </div>
    <div class="my-4 mx-5">
        <h1 class="text-4xl sm:text-5xl md:text-6xl text-center text-[#B66141] mb-6 font-elmessiri" >Aretes</h1>
        <CarruselesDeProductosPorCategoria :categoryId="3" />
    </div>
    <hr>
    <div class="my-4 mx-5">
        <h1 class="text-4xl sm:text-5xl md:text-6xl text-center text-[#B66141] mb-6 font-elmessiri" >Collares</h1>
        <CarruselesDeProductosPorCategoria :categoryId="2" />
    </div>
    <div>
        <FooterPage />
    </div>
</template>

<script>
import { defineComponent, isProxy } from 'vue'
import Navbarr from '@/components/Navbarr2.vue';
import Home from '@/components/Home.vue';
import FooterPage from '@/components/footer.vue';
import img1Src from '@/assets/imgs/Fedi_Nuziali.jpg'
import img2Src from '@/assets/imgs/anillos_1.jpg'
import carruselprincipalPage from '@/components/carruseles/carruselprincipalPage.vue';
import CarruselesDeProductosPorCategoria from '@/components/carruseles/CarruselesDeProductosPorCategoria.vue';

export default defineComponent({
    name: 'home',
    components: {
        Navbarr,
        Home,
        FooterPage,
        carruselprincipalPage,
        CarruselesDeProductosPorCategoria
    
    },

    setup() {

    },

    data() {
        return {
            images: [img1Src, img2Src],
        }
    },
})


</script>