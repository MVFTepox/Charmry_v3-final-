<template>
  <div>
    <!-- Diseño para pantallas grandes -->
    <nav class="large-screen-menu">
      <div class="container">
        <a class="navbar-brand" href="/">
          <img src="../assets/imgs/logo.png" alt="Logo" />
        </a>
        <div class="categorias">
          <p><b>Categorías</b></p>
          <a href="#" @click="toggleCategorias">
            <img src="../assets/imgs/down.png" alt="Cuenta">
          </a>
          <div :class="{'categorias-menu': true, 'show': isCategorias}" @click.stop>
            <a href="#">Anillos</a>
            <a href="#">Aretes</a>
            <a href="#">Collares</a>
            <a href="#">Pulseras</a>
            <a href="/categorias">Phone Charms</a>
          </div>
        </div>
        <form class="search" role="search">
          <input type="search" placeholder="Buscar..." class="placeholder:text-[#662f25]" />
          <button type="submit">
            <img src="../assets/imgs/search.png" alt="Search">
          </button>
        </form>
        <div class="icons">
          <a href="/NotFound"><img src="../assets/imgs/fav.png" alt="Favorite"></a>
          <a href="#" @click="toggleAccountMenu">
            <img src="../assets/imgs/perf.png" alt="Cuenta">
          </a>
          <div :class="{'account-menu': true, 'show': isAccountMenuVisible}" @click.stop>
            <a href="/login">Iniciar sesión</a>
            <a href="/registro">Registrarse</a>
          </div>
          <a href="/carrito"><img src="../assets/imgs/bag.png" alt="Bolsa"></a>
        </div>
      </div>
    </nav>

    <!-- Offcanvas para pantallas pequeñas -->
    <nav class="small-screen-menu">
      <div class="offcanvas-toggle" @click="toggleOffcanvas">
        <img src="../assets/img/menu.png" alt="Menu">
      </div>
      <a class="navbar-brand" href="/">
        <img src="../assets/img/logo.png" alt="Logo" />
      </a>
      <!-- <div class="search-icon" @click="toggleOffcanvas">
        <img src="../assets/img/search.png" alt="Search">
      </div> -->
      <div :class="{'offcanvas-menu': true, 'show': isOffcanvasVisible}">
        <div class="offcanvas-header">
          <button class="offcanvas-close" @click="toggleOffcanvas">
            <img src="../assets/imgs/close.png" alt="Close">
          </button>
        </div>
        <div class="offcanvas-content">
          <a href="#" @click="toggleOffcanvasCategorias">Categorías</a>
          <div :class="{'categorias-menu': true, 'show': isOffcanvasCategorias}">
            <a href="#">Anillos</a>
            <a href="#">Aretes</a>
            <a href="#">Collares</a>
            <a href="#">Pulseras</a>
            <a href="/categoria">Phone Charms</a>
          </div>
          <a href="#">Favoritos</a>
          <a href="#" @click="toggleOffcanvasAccountMenu">Cuenta</a>
          <div :class="{'account-menu': true, 'show': isOffcanvasAccountMenu}">
            <a href="/login">Iniciar sesión</a>
            <a href="/registro">Registrarse</a>
          </div>
          <a href="/carrito">Bolsa</a>
          <form class="search-icon2" role="search">
          <input type="search" placeholder="Buscar..." class="placeholder:text-[#662f25]" />
          <button type="submit">
            <img src="../assets/imgs/search.png" alt="Search">
          </button>
        </form>
        </div>
      </div>
    </nav>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const isCategorias = ref(false);
    const isAccountMenuVisible = ref(false);
    const isOffcanvasVisible = ref(false);
    const isOffcanvasCategorias = ref(false);
    const isOffcanvasAccountMenu = ref(false);

    const toggleCategorias = () => {
      isCategorias.value = !isCategorias.value;
    };

    const toggleAccountMenu = () => {
      isAccountMenuVisible.value = !isAccountMenuVisible.value;
    };

    const toggleOffcanvas = () => {
      isOffcanvasVisible.value = !isOffcanvasVisible.value;
    };

    const toggleOffcanvasCategorias = () => {
      isOffcanvasCategorias.value = !isOffcanvasCategorias.value;
    };

    const toggleOffcanvasAccountMenu = () => {
      isOffcanvasAccountMenu.value = !isOffcanvasAccountMenu.value;
    };

    return {
      isCategorias,
      isAccountMenuVisible,
      isOffcanvasVisible,
      isOffcanvasCategorias,
      isOffcanvasAccountMenu,
      toggleCategorias,
      toggleAccountMenu,
      toggleOffcanvas,
      toggleOffcanvasCategorias,
      toggleOffcanvasAccountMenu,
    };
  }
});
</script>

<style scoped>
body {
  margin: 0;
  font-family: Arial, sans-serif;
}

nav {
  background-color: #fbf8ee;
  padding: 16px;
}

/* Estilos para pantallas grandes */
.large-screen-menu .container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.large-screen-menu .navbar-brand img {
  width: 60px;
  max-width: 100%;
  height: auto;
}

.large-screen-menu .categorias {
  display: flex;
  align-items: center;
  position: relative;
  margin-left: 150px;
}

.large-screen-menu .categorias p {
  margin: 0;
  font-size: 1.1rem;
  color: #b66141;
}

.large-screen-menu .search img,
.large-screen-menu .icons img,
.large-screen-menu .categorias img {
  width: 40px;
}

.large-screen-menu .account-menu,
.large-screen-menu .categorias-menu {
  display: none;
  position: absolute;
  top: 50px;
  left: 0;
  background-color: #fff;
  border: 1px solid #b66141;
  padding: 10px;
  z-index: 1000;
  width: 200px;
  border-radius: 15px;
}

.large-screen-menu .account-menu p {
  color: #662f25;
  margin: 0;
  padding-bottom: 5px;
}

.large-screen-menu .account-menu a,
.large-screen-menu .categorias-menu a {
  text-decoration: none;
  color: #662f25;
  display: block;
  padding: 5px 0;
  position: relative;
  overflow: hidden;
  transition: color 0.3s ease;
}

.large-screen-menu .account-menu a::after,
.large-screen-menu .categorias-menu a::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 0;
  height: 5px;
  border-radius: 5px;
  background-color: #b66141;
  transition: width 0.3s ease;
}

.large-screen-menu .account-menu a:hover::after,
.large-screen-menu .categorias-menu a:hover::after {
  width: 100%;
}

.large-screen-menu .account-menu.show,
.large-screen-menu .categorias-menu.show {
  display: block;
}

.large-screen-menu .search {
  display: flex;
  align-items: center;
  margin: 8px 0;
  flex: 1;
  justify-content: center;
}

.large-screen-menu .search input {
  background: transparent;
  border-radius: 20px;
  border: 1px solid #b66141;
  padding: 8px 16px;
  outline: none;
  width: 100%;
  max-width: 300px;
}

.large-screen-menu .search button {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
}

.large-screen-menu .icons {
  display: flex;
  align-items: center;
  gap: 20px;
  position: relative;
}

/* Estilos para pantallas pequeñas */
.small-screen-menu {
  display: none;
  align-items: center;
  justify-content: space-between;
}

.small-screen-menu .offcanvas-toggle img,
.small-screen-menu .search-icon img,
.small-screen-menu .navbar-brand img {
  width: 40px;
  cursor: pointer;
}

.search-icon, .search-icon2 {
  display: flex;
}

.search-icon2 input {
  background: transparent;
  border-radius: 20px;
  border: 1px solid #b66141;
  outline: none;
}

.small-screen-menu .navbar-brand {
  margin: 0 auto;
}

.offcanvas-menu {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 250px;
  height: 100%;
  background-color: #fbf8ee;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);
  padding: 16px;
  z-index: 2000;
  overflow-y: auto;
}

.offcanvas-menu.show {
  display: block;
}

.offcanvas-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.offcanvas-content .account-menu,
.offcanvas-content .categorias-menu {
  display: none;
  background-color: #fff;
  border: 1px solid #b66141;
  padding: 10px;
  border-radius: 15px;
}

.offcanvas-content .account-menu.show,
.offcanvas-content .categorias-menu.show {
  display: flex;
  flex-direction: column;
}

.offcanvas-content a {
  text-decoration: none;
  color: #662f25;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  position: relative;
  transition: color 0.3s ease;
}

.offcanvas-content a::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 0;
  height: 5px;
  border-radius: 5px;
  background-color: #b66141;
  transition: width 0.3s ease;
}

.offcanvas-content a:hover::after {
  width: 100%;
}

/* Estilos para el botón de cierre del offcanvas */
.offcanvas-header {
  display: flex;
  justify-content: flex-end;
}

.offcanvas-close {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
}

.offcanvas-close img {
  width: 24px;
}

/* Mostrar y ocultar elementos según el tamaño de pantalla */
@media (max-width: 768px) {
  .large-screen-menu {
    display: none;
  }

  .small-screen-menu {
    display: flex;
    padding: 16px;
  }
}
</style>
