<template>
  <div class="body">
    <footer class="footer">
      <div class="logo">
        <img src="@/assets/imgs/logo.png" alt="Charmery Logo" />
      </div>
      <div class="contact-info">
        <p><strong>Contáctanos en...</strong></p>
        <p><a href="mailto:charmeryy.store@gmail.com">charmeryy.store@gmail.com</a></p>
        <p><a href="/sobrenosotros">Sobre Nosotros</a></p>
      </div>
      <div class="social-media">
        <p><strong>No Olvides Seguirnos en...</strong></p>
        <div class="social-media-icons">
          <a href="https://www.instagram.com/charmeryy.store?igsh=b2dwaHBlM25rYzg0">
            <img src="@/assets/imgs/instagram-icon.png" alt="Instagram" />
          </a>
          <a href="https://www.tiktok.com/@charmeryystore?is_from_webapp=1&sender_device=pc">
            <img src="@/assets/imgs/tiktok-icon.png" alt="TikTok" />
          </a>
          <a href="https://l.instagram.com/?u=https%3A%2F%2Fwww.facebook.com%2Fprofile.php%3Fid%3D61561006452486%26mibextid%3DZbWKwL&e=AT2b-D8Q7qz5K6yMvZnZvufM4uzc7DCVnbOinuySNWWGQNuuuZYnaLWzP3EgtMtI3rfDdahz7DoCueHr6Mz6oEpvmdYMNqMZJZFHCSeqfHh49Ctr2kx7pkg">
            <img src="@/assets/imgs/facebook-icon.png" alt="Facebook" />
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.footer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 20px;
  background-color: #fbf8ee;
  border-top: 1px solid #ddd;
  width: 100%;
  box-sizing: border-box;
}

.footer .logo {
  flex: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 200px;
}

.footer img {
  height: 100px;
}

.footer .contact-info {
  
  flex: 7;
  justify-content: center;
  text-align: center;
  margin: 0 auto;
}

.footer .social-media {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 10px;
}

.footer .social-media-icons {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 5px;
}

.footer .social-media a {
  margin: 0 5px;
  display: inline-block;
}

.footer .social-media img {
  height: 24px;
  width: 24px;
}

a {
  color: rgb(102, 47, 37);
  text-decoration: none;
}

@media (min-width: 600px) {
  .footer {
    flex-wrap: nowrap;
    justify-content: space-between;
  }

  .footer .contact-info,
  .footer .social-media {
    width: auto;
  }
}

@media (max-width: 600px) {
  .footer {
    flex-direction: column;
    text-align: center;
  }

  .footer .logo {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
  }

  .footer .contact-info,
  .footer .social-media {
    width: 100%;
  }
}
</style>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PageFooter'
})
</script>
