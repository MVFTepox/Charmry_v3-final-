<template>
    <productoindividual/>
</template>

<script>
import { defineComponent } from 'vue'
import productoindividual from '@/components/producto/productoindividual.vue';

export default defineComponent({
    name: 'producto',
    components: {
        productoindividual
    }
    
    
})
</script>