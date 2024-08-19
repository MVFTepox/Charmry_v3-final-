<template>
  <div class=" ">
    <div class="body">
      <div class="container border-2 rounded-3xl">
        <h2 class="title font-elmessiri">Bienvenido</h2>
        <form @submit.prevent="login">
          <div class="form-group">
            <label for="email">Correo electrónico</label>
            <input type="email" id="email" v-model="email">
            <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
          </div>
          <div class="form-group">
            <label for="password">Contraseña</label>
            <input type="password" id="password" v-model="password">
            <span v-if="errors.password" class="error-message">{{ errors.password }}</span>
          </div>
          <div class="linea"></div>
          <a href="/registro" class="register-link">¿Aún no tienes cuenta? Regístrate <span>aquí</span></a>
          <button type="submit" class="btn submit-button">Iniciar sesión</button>
        </form>
        <div v-if="Object.keys(errors).length" class="alert">
          <ul>
            <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 74vh;
  background-color: #fdfaf4;
  margin: 0;
  font-family: 'DmSans', sans-serif;
  padding: 16px;
}

.container {
  background-color: #fff8ec;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.159);
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

.form-group {
  margin-bottom: 16px;
  text-align: left;
}

.form-group label {
  display: block;
  color: #c1785c;
  margin-bottom: 8px;
}

.form-group input {
  width: 93%;
  padding: 8px 12px;
  border: 1px solid #c1785c;
  border-radius: 20px;
  outline: none;
  transition: border-color 0.2s;
  background-color: #fff8ec;
}

.form-group input:focus {
  border-color: #c1785c;
}

.linea {
  margin: 10px 13px;
  width: calc(100% - 20px);
  border-top: 1px solid #999;
  float: left;
  padding: 0.5px;
  background-color: rgb(182, 97, 65);
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

.submit-button:hover {
  background-color: #8b4a39;
}

@media (max-width: 600px) {
  .body {
    min-height: 50vh;
  }
  .container {
    padding: 16px;
  }

  .title {
    font-size: 20px;
  }

  .form-group label {
    font-size: 14px;
  }

  .form-group input {
    padding: 6px 10px;
  }

  .register-link {
    font-size: 12px;
  }

  .submit-button {
    font-size: 14px;
    padding: 10px;
  }
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
</style>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/valoresGLobales'
export default defineComponent({
  name: 'Login',
  setup() {
    const email = ref<string>('');
    const password = ref<string>('');
    const errors = ref<{ email?: string; password?: string }>({});
    const router = useRouter(); // Create a router instance

    const authStore = useAuthStore();
    

    const login = async () => {
      errors.value = {};

      if (!email.value) {
        errors.value.email = "🔴 El correo electrónico es obligatorio";
      }

      if (!password.value) {
        errors.value.password = "🔴 La contraseña es obligatoria";
      }

      if (Object.keys(errors.value).length === 0) {
        try {
          const response = await fetch('http://18.222.147.65:3333/api/user');
          const data = await response.json();

          // Check if there is a matching user
          const user = data.find((user: any) => user.email === email.value && user.passsword === password.value);

          if (user) {
            authStore.setLoginStatus(true);
            authStore.setUserId(user.id);
            console.log(user.id);
            // Redirect to another page on successful login
            router.push('/'); // Change '/dashboard' to your desired route
            console.log('Autenticación exitosa');
          } else {
            errors.value.email = "🔴 Correo electrónico o contraseña incorrectos";
          }
        } catch (error) {
          console.log('Error al obtener los usuarios:', error);
          errors.value.email = "🔴 Error en la autenticación, por favor inténtalo de nuevo";
        }
      }
    };

    return {
      email,
      password,
      errors,
      login
    };
  }
});
</script>
