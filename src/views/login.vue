<template >
    <Navabarr2/>
    <div>
        <Login />
    </div>
    <div>
        <FooterPage/>
    </div>
</template>

<script>
import { defineComponent,ref } from 'vue';
import Navabarr2 from '@/components/Navbarr2.vue';
import Login from '@/components/Login.vue';
import FooterPage from '@/components/footer.vue';

export default defineComponent({
    name: 'login',
    components: {
        Navabarr2,
        Login,
        FooterPage

    }
    
})
</script>