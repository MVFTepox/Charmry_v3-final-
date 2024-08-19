<template>
  <div class="body">
    <div class="container">
      <div class="text-section">
        <h1 class="font-elmessiri text-x">Charmery</h1>
        <p class="font-elmessiri">
          El encanto<br>
          de la joyería<br>
        </p>
      </div>
      <div class="carousel">
        <div class="card">
          <img src="@/assets/imgs/corazones estilo bridgerton.jpg" alt="Bracelet">
        </div>
        <div class="card">
          <img src="@/assets/imgs/colguijo AJAJAJA.jpg" alt="Rings">
        </div>
        <div class="card">
          <img src="@/assets/imgs/estrellas.jpg" alt="Necklaces">
        </div>
        <div class="card">
          <img src="@/assets/imgs/corazones pendientes.jpg" alt="Item 4">
        </div>
        <div class="card">
          <img src="@/assets/imgs/PERLAS Y CORAZONN.jpg" alt="Item 5">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CharmeryPage'
}
</script>
<style scoped>
.body {
  height: 100vh;
  width: auto;
  position: relative;
  overflow: hidden;
}

.container {
  height: 100%;
  align-items: stretch;
  justify-content: center;
  position: relative;
}

.text-section h1, .text-section p {
  position: absolute;
  z-index: 2;
  pointer-events: none;
  text-align: center;
  color: #662F25;
}

.text-section h1 {
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 8rem;
  font-weight: 600;
  text-shadow: 
    4px 4px 20px rgba(255, 255, 255, 0.8), 
    -4px -4px 20px rgba(255, 255, 255, 0.8),
    4px -4px 20px rgba(255, 255, 255, 0.8),
    -4px 4px 20px rgba(255, 255, 255, 0.8),
    0px 0px 20px rgba(255, 255, 255, 0.8);
}

.text-section p {
  top: 70%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2rem;
  line-height: 1.2;
  color: #b66141;
}

.carousel {
  width: 100vw;
  height: 100%;
  display: flex;
  overflow: hidden;
  flex-wrap: nowrap;
}

.card {
  flex: 1;
  height: 100%;
  transition: all 1s ease;
  cursor: pointer;
}

.card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-right: 0px solid #f9f9f9;
  transition: transform 0.5s ease;
}

.card:last-child img {
  border-right: none;
}

.card:hover {
  flex: 3;
}

.carousel:hover .card:not(:hover)::after {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #f8f2dc 0%, #f7ecc9 100%);
  mix-blend-mode: multiply;
}

@media (max-width: 768px) {
  .text-section h1 {
    font-size: 4rem;
    top: 35%;
    left: 50%;
  }

  .text-section p {
    font-size: 1.2rem;
    top: 55%;
    left: 50%;
  }
}

@media (max-width: 300px) {
  .carousel {
    flex-direction: column;
  }

  .card {
    flex: 1;
    height: auto;
    margin: 5px;
  }

  .card img {
    width: 100%;
    height: auto;
  }
}
</style>
