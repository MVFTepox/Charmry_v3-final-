<template >
    <div>
        <Navabarr2/>
    </div>
    <div>
        <Registro />
    </div>
    <div>
        <FooterPage/>
    </div>
</template>

<script>
import { defineComponent,ref } from 'vue';
import Navabarr2 from '@/components/Navbarr2.vue';
import Registro from '@/components/Registro.vue';
import FooterPage from '@/components/footer.vue';

export default defineComponent({
    name: 'login',
    components: {
        Navabarr2,
        Registro,
        FooterPage

    }
    
})
</script>