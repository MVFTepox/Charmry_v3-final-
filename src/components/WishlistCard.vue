<template>
  <div class="flex justify-between border-4 border-[#eddaab]  rounded-lg shadow-lg" style="width: 500px; height: 280px">
    <div
      class="rounded-lg border-solid border-[#eddaab] m-3"
      id="wishlistImage"
      style="border-width: 3px; width: 200px; height: 250px"
    >
      <img :src="imageUrl" alt="Product Image" class="w-full h-full object-cover" />
    </div>
    <div class="flex flex-col justify-between h-full w-1/2 p-3">
      <div class="flex justify-between">
        <div>
          <p>{{nombreDelArticulo }}</p>
          <p>{{precioDelArticulo}}</p>
        </div>
        <span
          class="material-symbols-rounded hover:cursor-pointer text-[#b66141]"
          @click="removeFromWished"
          :style="{ fontVariationSettings: `'FILL' ${currentFill}` }"
        >
          favorite
        </span>
      </div>
      <div>
        <div class="flex justify-between">
          <button
            class="flex rounded-full justify-center bg-[#b66141] m-1 border-2 border-[#b66141] text-[#eddaab] h-[30px] w-[170px] hover:border-[#eddaab] hover:bg-white"
            id=""
          >
            <span class="material-symbols-rounded"> shopping_bag </span>
            Añadir a Bolsa
          </button>
          <button>
            <span class="material-symbols-rounded align-middle trash"> delete </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';

export default defineComponent({
  name: 'WishlistCard',
  props: {
    product: {
      type: Object,
      required: true
    }
  },

  setup(props) {
    const currentFill = ref(1);
    const imageUrl = ref('');
    const nombreDelArticulo = ref('');
    const precioDelArticulo = ref('');

    async function fetchImage() {
      try {
        const response = await fetch(`http://18.222.147.65:3333/api/images`);
        const data = await response.json();
        // Encuentra la imagen correspondiente al producto
        const image = data.find(image => image.product_id === props.product.id);
        imageUrl.value = image ? image.image_url : 'URL_DEFAULT_DE_IMAGEN'; // Proporciona una URL por defecto si no se encuentra la imagen
      } catch (error) {
        console.log('Error al obtener las imágenes:', error);
        imageUrl.value = 'URL_DEFAULT_DE_IMAGEN'; // Proporciona una URL por defecto en caso de error
      }
    }

    async function fetchProducts() {
      try {
        const response = await fetch(`http://18.222.147.65:3333/api/products/${props.product.id}`);
        const data = await response.json();
        nombreDelArticulo.value = data.product_name || 'Nombre no disponible';
        precioDelArticulo.value = data.price ? `$${data.price}` : 'Precio no disponible';
      } catch (error) {
        console.log('Error al obtener los productos:', error);
      } 
    }

    function removeFromWished() {
      currentFill.value = 0;
    }

    onMounted(() => {
      fetchImage();
      fetchProducts();
    });

    return {
      imageUrl,
      currentFill,
      removeFromWished,
      precioDelArticulo,
      nombreDelArticulo
    };
  }
});
</script>


<style scoped>
p {
  color: #662f25;
}
.trash {
  color: #b66141;
}
.trash:hover {
  color: #a8350a;
}
</style>

