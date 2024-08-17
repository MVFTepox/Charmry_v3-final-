<template>
  <div class="body">
    <div class="container border-2 rounded-3xl font-DMsans">
      <h2 class="title font-elmessiri">Bienvenido! Crea una cuenta</h2>
      <form @submit.prevent="register">
        <div class="form-group">
          <label for="name">Nombre y apellido</label>
          <input type="text" id="name" v-model="name" class="rounded-full">
          <span v-if="errors.name" class="error-message">{{ errors.name }}</span>
        </div>
        <div class="form-group">
          <label for="email">Correo electrónico</label>
          <input type="email" id="email" v-model="email" class="rounded-full">
          <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
        </div>
        <div class="form-group">
          <label for="password">Contraseña</label>
          <input type="password" id="password" v-model="password" class="rounded-full">
          <span v-if="errors.password" class="error-message">{{ errors.password }}</span>
        </div>
        <div class="form-group">
          <label for="confirm-password">Confirmar contraseña</label>
          <input type="password" id="confirm-password" v-model="confirmPassword" class="rounded-full">
          <span v-if="errors.confirmPassword" class="error-message">{{ errors.confirmPassword }}</span>
        </div>
        <div class="checkbox-group">
          <input type="checkbox" id="terms" v-model="termsAccepted">
          <label for="terms">Acepto los términos y condiciones</label>
          <span v-if="errors.termsAccepted" class="error-message">{{ errors.termsAccepted }}</span>
        </div>
        <div class="checkbox-group">
          <input type="checkbox" id="promotions" v-model="promotionsAccepted">
          <label for="promotions">Quiero recibir promociones en mi correo</label>
        </div>
        <div class="linea"></div>
        <a href="/login" class="register-link">¿Ya tienes una cuenta? Inicia sesión <span>aquí</span></a>
        <button type="submit" class="submit-button btn">Regístrate</button>
      </form>
      <div v-if="Object.keys(errors).length" class="alert">
        <ul>
          <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'Registro',
  setup() {
    const name = ref<string>('');
    const email = ref<string>('');
    const password = ref<string>('');
    const confirmPassword = ref<string>('');
    const termsAccepted = ref<boolean>(false);
    const promotionsAccepted = ref<boolean>(false);
    const errors = ref<Record<string, string>>({});

    const register = () => {
      errors.value = {};

      if (!name.value) {
        errors.value.name = "🔴 El nombre es obligatorio.";
      }

      if (!email.value) {
        errors.value.email = "🔴 El correo electrónico es obligatorio.";
      } else if (!validateEmail(email.value)) {
        errors.value.email = "🔴 El correo electrónico no es válido.";
      }

      if (!password.value) {
        errors.value.password = "🔴 La contraseña es obligatoria.";
      }

      if (!confirmPassword.value) {
        errors.value.confirmPassword = "🔴 Debe confirmar su contraseña.";
      } else if (password.value !== confirmPassword.value) {
        errors.value.confirmPassword = "🔴 Las contraseñas no coinciden.";
      }

      if (!termsAccepted.value) {
        errors.value.termsAccepted = "🔴 Debe aceptar los términos y condiciones.";
      }

      if (Object.keys(errors.value).length > 0) {
        console.log("Errores:", errors.value);
      } else {
        console.log("Formulario validado correctamente.");
      }
    };

    const validateEmail = (email: string) => {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    };

    return {
      name,
      email,
      password,
      confirmPassword,
      termsAccepted,
      promotionsAccepted,
      errors,
      register,
    };
  },
});
</script>

<style scoped>
/* Styles remain unchanged */
.body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 75vh;
  background-color: #fdfaf4;
  margin: 0;
  font-family: Arial, sans-serif;
  padding: 16px;
}

.container {
  font-family: 'DMSans', sans-serif;
  background-color: #fff8ec;
  padding: 24px;

  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
}


.title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #c1785c;
}

.title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #c1785c;
}

.form-group {
  margin-bottom: 16px;
  text-align: left;
}

.form-group {
  margin-bottom: 16px;
  text-align: left;
}

.form-group label {
  display: block;
  color: #c1785c;
  margin-bottom: 8px;
}

.form-group label {
  display: block;
  color: #c1785c;
  margin-bottom: 8px;
}

.form-group input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #c1785c;
  outline: none;
  transition: border-color 0.2s;
  background-color: #fff8ec;
}

.form-group input:focus {
  border-color: #c1785c;
}

.form-group input:focus {
  border-color: #c1785c;
}

.checkbox-group {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.checkbox-group {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.checkbox-group input {
  margin-right: 8px;
}

.checkbox-group input {
  margin-right: 8px;
}

.checkbox-group label {
  color: #c1785c;
}

.checkbox-group label {
  color: #c1785c;
}

.linea {
  margin: 10px 13px;
  width: calc(100% - 20px);
  border-top: 1px solid #999;
  float: left;
  padding: .5px;
  background-color: rgb(182, 97, 65);
}

.register-link {
  display: block;
  margin-bottom: 16px;
  font-size: 14px;
  color: #c1785c;
  text-decoration: none;
}

.register-link {
  display: block;
  margin-bottom: 16px;
  font-size: 14px;
  color: #c1785c;
  text-decoration: none;
}

.register-link span {
  text-decoration: underline;
}

.register-link span {
  text-decoration: underline;
}

.register-link:hover span {
  color: #a65c46;
}

.register-link:hover span {
  color: #a65c46;
}

.submit-button {
  width: 50%;
  background-color: #a65c46;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.submit-button {
  width: 50%;
  background-color: #a65c46;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.submit-button:hover {
  background-color: #8b4a39;
}

.error-message {
  color: #d8000c;
  background-color: #ffd2d2;
  border: 1px solid #d8000c;
  border-radius: 4px;
  padding: 8px;
  display: block;
  margin-top: 4px;
  font-size: 14px;
  font-weight: bold;
}

.alert {
  background-color: #ffdddd;
  color: #d8000c;
  padding: 20px;
  margin-top: 20px;
  border: 1px solid #d8000c;
  border-radius: 20px;
}

.alert ul {
  margin: 0;
  padding: 0;
  list-style-type: none;
}

.alert li {
  margin-bottom: 10px;
}

@media (max-width: 600px) {
  .container {
    padding: 16px;
  }

  .title {
    font-size: 20px;