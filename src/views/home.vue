<template>
    <div>
        <Navbarr />
    </div>
    <div>
        <Home />
    </div>
    <div>
        <FooterPage />
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import Navbarr from '@/components/Navbarr2.vue';
import Home from '@/components/Home.vue';
import FooterPage from '@/components/footer.vue';

export default defineComponent({
    name: 'home',
    components: {
        Navbarr,
        Home,
        FooterPage
    
    }
})


</script>