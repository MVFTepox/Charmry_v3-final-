<template>
  <div>
    <Navbarr2 />
  </div>
  <div>
    <div class="confirmation-page">
      <h1 class="font-elmessiri">Tu pedido está confirmado!</h1>
      <div class="confirmation-icon">
        <img src="@/assets/imgs/listo.png" alt="Confirmación">
      </div>
      <p >Gracias  por tu orden!</p>
      <a href="/">
      <input type="button" class="font-DMsans" value="Terminar" />

      </a>

    </div>
  </div>
  <div>
    <footerPAge />
  </div>
</template>

<script >
import { defineComponent, ref } from 'vue'
import footerPAge from '@/components/footer.vue';
import Navbarr2 from '@/components/Navbarr2.vue';

export default defineComponent({

  name: 'ConfirmationPage',
  components: {
    Navbarr2,
    footerPAge,
    
  }
})






</script>

<style scoped>
.confirmation-page {
  font-family: 'El Messiri', sans-serif;
  background-color: #F5F5F5;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  text-align: center;
  color: #cb8844;
}

h1 {
  font-size: 4em;
  margin: 20px;
}

.confirmation-icon {
  margin: 20px 0;
}

.confirmation-icon img {
  width: 150px;
  height: 150px;
}

p {
  font-family: 'elMessiri',sans-serif;
  font-size: 1.6em;
  margin: 30px;
  color: #662F25;
}

input[type="button"] {
  background-color: #cb8844;
  color: #FFFFFF;
  border: none;
  padding: 10px 30px;
  font-size: 1.2em;
  cursor: pointer;
  border-radius: 15px;
  margin-top: 20px;
  width: 200px;
  text-align: center;
}

/* Responsivo para dispositivos móviles */
@media (max-width: 600px) {
  h1 {
    font-size: 1.5em;
  }

  p {
    font-size: 1em;
  }

  .confirmation-icon img {
    width: 80px;
    height: 80px;
  }

  input [type="button"] {
    padding: 8px 16px;
    font-size: 0.9em;
  }
}

/* Responsivo para tabletas */
@media (min-width: 601px) and (max-width: 1024px) {
  h1 {
    font-size: 1.75em;
  }

  p {
    font-size: 1.1em;
  }

  .confirmation-icon img {
    width: 45px;
    height: 45px;
  }

  input [type="button"] {
    padding: 9px 18px;
    font-size: 0.95em;
  }
}
</style>
