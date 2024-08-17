<template>
    <div>
        
    </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
    name: 'prueba',

    setup() {
        console.log('holo')
        async function fetch() {
            const response = await fetch('18.222.147.65:3333/api')
            try {
                const data = await response.json()
                console.log(data)
            } catch (error) {
                console.log(error)
            }

        }

        return {

        }
    }
})

</script>