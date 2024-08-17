<template>
  <Navbar />
  <div @click="closeDropdowns">
    <div class="relative zoom-out">
      <img
        src="../assets/img/category.png"
        :alt="currentCategoryName"
        class="w-full object-cover h-48 sm:h-64 md:h-80 lg:h-96"
      />
      <h1
        class="absolute inset-x-0 top-1/2 transform -translate-y-1/2 text-[#fbf8ee] text-3xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl text-center font-bold font-elmessiri"
      >
        {{ currentCategoryName.charAt(0).toUpperCase() + currentCategoryName.slice(1).toLowerCase() }}
      </h1>
    </div>
    <div class="p-4 sm:p-6 md:p-8">
      <div class="flex sm:flex-row justify-between p-4">
        <div @click.stop>
          <button
            @click="toggleFilter"
            class="text-[#b66141] bg-transparent border-0 shadow-none hover:bg-transparent btn flex items-center hover:scale-105"
          >
            <span
              class="material-symbols-rounded mr-2 lg:text-3xl md:text-2xl sm:text-xl font-bold text-[#662f25]"
              >filter_list</span
            >
            <p class="lg:text-2xl md:text-xl sm:text-lg font-DMsans text-[#662f25]">Filtro</p>
          </button>
          <div v-if="filterOpen" class="absolute rounded-lg shadow-lg">
            <Filtro />
          </div>
        </div>

        <div class="relative" @click.stop>
          <button
            @click="toggleSort"
            class="text-[#b66141] bg-transparent border-0 shadow-none hover:bg-transparent btn flex items-center hover:scale-105"
          >
            <span
              class="material-symbols-rounded mr-2 lg:text-3xl md:text-2xl sm:text-xl font-bold text-[#662f25]"
              >swap_vert</span
            >
            <p class="lg:text-2xl md:text-xl sm:text-lg text-[#662f25] font-DMsans">Ordenar por</p>
          </button>

          <ul
            v-if="sortOpen"
            class="absolute right-0 mt-2 w-full sm:w-48 bg-[#662F25] rounded-lg shadow-lg text-[#EDDAAB] font-bold font-DMsans"
          >
            <li
              class="px-4 py-3 hover:bg-[#b66141] rounded-lg cursor-pointer"
              @click="sortBy('price')"
            >
              Precio mayor
            </li>
            <li
              class="px-4 py-3 hover:bg-[#b66141] rounded-lg cursor-pointer"
              @click="sortBy('name')"
            >
              Precio menor
            </li>
            <li
              class="px-4 py-3 hover:bg-[#b66141] rounded-lg cursor-pointer"
              @click="sortBy('popularity')"
            >
              Nombre
            </li>
          </ul>
        </div>
      </div>
      <div class="product-grid grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 p-4">
  <ProductCard  />
</div>

    </div>
  </div>
  <div>
    <footerPage />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import ProductCard from "../components/ProductCard.vue";
import Filtro from "../components/filtro.vue";
import Navbar from "@/components/Navbarr2.vue";
import footerPage from "@/components/footer.vue";

export default defineComponent({
  name: "CategoryPage",
  components: {
    ProductCard,
    Filtro,
    Navbar,
    footerPage
  },
  setup() {
    const currentCategoryName = ref("Phone Charms");
    const products = ref([]);
    const filterOpen = ref(false);
    const sortOpen = ref(false);

    const fetchCategoryData = async (categoryId: number) => {
  try {
    const response = await fetch(`http://3.134.108.48:3333/api/categories`);
    const data = await response.json();
    const category = data.find((cat: any) => cat.id === categoryId);
    if (category) {
      currentCategoryName.value = category.category_name || "Phone Charms";
      products.value = category.products || []; // Ensure products are filtered by the category
    } else {
      console.error("Category not found");
      products.value = []; // Empty products if category is not found
    }
  } catch (error) {
    console.error("Error fetching category data:", error);
    products.value = []; // Empty products on error
  }
};


    onMounted(() => {
      const categoryId = 3; // example for 'phoneCharms'
      fetchCategoryData(categoryId);
    });

    const toggleFilter = () => {
      filterOpen.value = !filterOpen.value;
      sortOpen.value = false;
    };

    const toggleSort = () => {
      sortOpen.value = !sortOpen.value;
      filterOpen.value = false;
    };

    const closeDropdowns = () => {
      filterOpen.value = false;
      sortOpen.value = false;
    };

    const sortBy = (criteria: string) => {
      console.log(`Sorting by ${criteria}`);
      closeDropdowns();
    };

    return {
      currentCategoryName,
      products,
      filterOpen,
      sortOpen,
      toggleFilter,
      toggleSort,
      closeDropdowns,
      sortBy,
      
    };

  },
});
</script>

<style scoped>
.product-grid {
  justify-items: center;
}

.zoom-out {
  animation: zoomOut 1s ease-out;
}

@keyframes zoomOut {
  0% {
    transform: scale(1.2);
    opacity: 1;
  }

  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
