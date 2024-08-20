<template>
  <div class="flex justify-between border-4 m-8 border-[#eddaab] rounded-lg shadow-lg"
    style="width: 500px; height: 280px">
    <div class="rounded-lg border-solid border-[#eddaab] m-3" id="wishlistImage"
      style="border-width: 3px; width: 200px; height: 250px">
      <img :src="imageUrl" alt="Product Image" class="w-full h-full object-cover" />
    </div>
    <div class="flex flex-col justify-between h-full w-1/2 p-3">
      <div>
        <p class="font-elmessiri text-3xl text-[#b66141]">{{ nombreDelArticulo }}</p>
        <p class="font-elmessiri text-5xl">{{ precioDelArticulo }}</p>
      </div>
      <div class="flex justify-between">
        <button @click="addToCart"
          class="flex rounded-full justify-center bg-[#b66141] m-1 border-2 border-[#b66141] text-[#eddaab] h-[30px] w-[170px] hover:border-[#eddaab] hover:bg-white">
          <span class="material-symbols-rounded">shopping_bag</span>
          Añadir a Bolsa
        </button>
        <button @click="deleteFavorite" class="flex items-center">
          <span class="material-symbols-rounded trash">delete</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed, onMounted } from 'vue';
import { useAuthStore } from '@/stores/valoresGLobales';

export default defineComponent({
  name: 'WishlistCard',
  props: {
    product: {
      type: Object,
      required: true
    },
    idFavorite: {  
      type: Number,
      required: true
    }
  },
  setup(props) {
    const imageUrl = ref('');
    const nombreDelArticulo = ref('');
    const precioDelArticulo = ref('');

    const authStore = useAuthStore();
    const userId = computed(() => authStore.userId);

    async function fetchImage() {
      try {
        const response = await fetch('http://18.222.147.65:3333/api/images');
        if (!response.ok) throw new Error('Failed to fetch images');
        
        const data = await response.json();
        const image = data.find(image => image.product_id === props.product.id);
        imageUrl.value = image ? image.image_url : 'URL_DEFAULT_DE_IMAGEN';
      } catch (error) {
        console.error('Error al obtener las imágenes:', error);
        imageUrl.value = 'URL_DEFAULT_DE_IMAGEN';
      }
    }

    async function fetchProductDetails() {
      try {
        const response = await fetch(`http://18.222.147.65:3333/api/products/${props.product.id}`);
        if (!response.ok) throw new Error('Failed to fetch product details');
        
        const data = await response.json();
        nombreDelArticulo.value = data.product_name || 'Nombre no disponible';
        precioDelArticulo.value = data.price ? `$${data.price}` : 'Precio no disponible';
      } catch (error) {
        console.error('Error al obtener los detalles del producto:', error);
      }
    }

    async function addToCart() {
      if (!checkUserLoggedIn()) {
        alert('Por favor, inicie sesión para añadir productos al carrito.');
        return;
      }

      try {
        const addResponse = await fetch('http://18.222.147.65:3333/api/detail-cart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            product_id: props.product.id,
            quantity: 1,
            price: props.product.price
          })
        });

        if (!addResponse.ok) throw new Error('Failed to add product to detail cart');
        
        const addedDetail = await addResponse.json();

        const cartResponse = await fetch('http://18.222.147.65:3333/api/carts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            user_id: userId.value,
            details_cart_id: addedDetail.id
          })
        });

        if (!cartResponse.ok) throw new Error('Failed to add product to cart');

        console.log('Product added to cart successfully');
      } catch (error) {
        console.error('Error adding product to cart:', error);
      }
    }

    async function deleteFavorite() {
      if (!checkUserLoggedIn()) {
        alert('Por favor, inicie sesión para eliminar productos de favoritos.');
        return;
      }

      try {
        const response = await fetch(`http://18.222.147.65:3333/api/favorites/${props.idFavorite}`, { 
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) throw new Error('Failed to delete product from favorites');
        

        console.log('Product deleted from favorites successfully');
        window.location.reload();
      } catch (error) {
        console.error('Error deleting product from favorites:', error);
      }
    }

    function checkUserLoggedIn() {
      return !!userId.value;
    }

    onMounted(() => {
      fetchImage();
      fetchProductDetails();
    });

    return {
      imageUrl,
      nombreDelArticulo,
      precioDelArticulo,
      addToCart,
      deleteFavorite
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
