<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { RouterLink } from 'vue-router';

const isMenuOpen = ref(false);
const isMobile = ref(false);

// Détection de la taille d'écran et gestion du responsive
const checkScreenSize = () => {
  isMobile.value = window.innerWidth < 500;
  if (!isMobile.value) {
    isMenuOpen.value = false;
  }
};

// fonction pour fermer le menu en cliquant à l'extérieur
const closeMenuOnClickOutside = (event) => {
  // const nav = event.target.closest('nav');
  if (event.target.closest('nav')===false && isMenuOpen.value) {
    isMenuOpen.value = false;
  }
};

// fonction pour fermer le menu avec la touche Échap
const closeMenuOnEscape = (event) => {
  if (event.key === 'Escape' && isMenuOpen.value) {
    isMenuOpen.value = false;
  }
};

onMounted(() => {
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
  window.addEventListener('click', closeMenuOnClickOutside);
  window.addEventListener('keydown', closeMenuOnEscape);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize);
  window.removeEventListener('click', closeMenuOnClickOutside);
  window.removeEventListener('keydown', closeMenuOnEscape);
});

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<template>
  <nav class="navigation" :class="{ 'menu-open': isMenuOpen }">
    <!-- Logo ou titre du site -->
    <!-- <div class="nav-brand">
      <RouterLink to="/myApp/" class="brand-link">MonApp</RouterLink>
    </div> -->

    <!-- Menu Hamburger (mobile seulement) -->
    <button 
      class="hamburger" 
      :class="{ 'active': isMenuOpen }" 
      @click="toggleMenu"
      aria-label="Toggle menu"
      aria-expanded="isMenuOpen"
    >
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
    </button>

    <!-- Navigation principale -->
    <ul class="nav-menu" :class="{ 'active': isMenuOpen }">
      <li>
        <RouterLink 
          to="/myApp/" 
          class="nav-link"
          @click="isMobile && (isMenuOpen = false)"
        >
          Accueil
        </RouterLink>
      </li>
      <li>
        <RouterLink 
          to="/myApp/Produits" 
          class="nav-link"
          @click="isMobile && (isMenuOpen = false)"
        >
          Produits
        </RouterLink>
      </li>
    </ul>

    <!-- Overlay pour mobile -->
    <div 
      v-if="isMenuOpen && isMobile" 
      class="menu-overlay" 
      @click="isMenuOpen = false"
    ></div>
  </nav>
</template>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
/* nav{
  width: 100vw;
  display: flex;
  justify-content: space-between;
} */

.navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* padding: 1rem 2rem; */
  /* background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%); */
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 1000;
}

.nav-brand {
  z-index: 1001;
}

.brand-link {
  font-size: 1.8rem;
  font-weight: 700;
  color: #f39c12;
  text-decoration: none;
  transition: color 0.3s ease;
}

.brand-link:hover {
  color: #f39c12;
}

.nav-menu {
  color:#f39c12;
  display: flex;
  /* justify-content: flex-end; */
  list-style-type: none;
  gap: 2rem;
  margin: 0;
  padding: 0;
  transition: all 0.3s ease;
}

.nav-link {
  font-size: 1.2rem;
  text-decoration: none;
  color: rgb(231, 235, 233);
  padding: 0.8rem 1.2rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  font-weight: 500;
  position: relative;
  display: block;
  /* z-index: 20; */
}

.nav-link:hover {
  color: #f39c12;
  background-color: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.nav-link.router-link-active {
  color: #2c3e50;
  background-color: #f39c12;
  padding: 0.8rem 1.5rem;
  box-shadow: 0 4px 12px rgba(243, 156, 18, 0.3);
  transform: translateY(-2px);
}

.nav-link.router-link-active:hover {
  background-color: #e67e22;
  transform: translateY(-3px);
}

/* Menu Hamburger (mobile seulement) */
.hamburger {
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 30px;
  height: 25px;
  /* background: black; */
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 1001;
}

.hamburger-line {
  width: 100%;
  height: 3px;
  color: black;
  background: white;
  border-radius: 2px;
  transition: all 0.3s ease;
  transform-origin: center;
}

.hamburger.active .hamburger-line:nth-child(1) {
  transform: rotate(45deg) translate(6px, 6px);
}

.hamburger.active .hamburger-line:nth-child(2) {
  opacity: 0;
}

.hamburger.active .hamburger-line:nth-child(3) {
  transform: rotate(-45deg) translate(6px, -6px);
}

/* Overlay pour mobile */
.menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: -1;
}

/* ===== MEDIA QUERIES ===== */

/* Tablettes et mobiles en mode paysage */
@media (max-width: 899px) {
  .nav-menu {
    gap: 1.5rem;
  }
  
  .nav-link {
    font-size: 1.1rem;
    padding: 0.6rem 1rem;
  }
}

/* Mobiles */
@media (max-width: 599px) {
  .hamburger {
    display: flex;
  }
  
  .nav-menu {
    position: fixed;
    top: 0;
    right: -100%;
    width: 280px;
    height: 100vh;
    background: white;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 5rem 2rem 2rem;
    gap: 0;
    box-shadow: -5px 0 25px rgba(0, 0, 0, 0.1);
    transition: right 0.3s ease;
  }
  
  .nav-menu.active {
    right: 0;
  }
  
  .nav-menu li {
    width: 100%;
    margin-bottom: 0.5rem;
  }
  
  .nav-link {
    color: #2c3e50;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    width: 100%;
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
  }
  
  .nav-link:hover {
    background-color: #f8f9fa;
    color: #f39c12;
  }
  
  .nav-link.router-link-active {
    background-color: #f39c12;
    color: white;
    box-shadow: 0 4px 12px rgba(243, 156, 18, 0.3);
  }
  
  .brand-link {
    font-size: 1.5rem;
  }
}


/* Support pour les appareils à tactile */
@media (pointer: coarse) {
  .nav-link {
    min-height: 44px;
    display: flex;
    align-items: center;
  }
  
  .hamburger {
    width: 44px;
    height: 44px;
    padding: 10px;
  }
}

/* Animations */
.nav-link {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.hamburger-line {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Accessibilité */
.hamburger:focus {
  outline: 2px solid #f39c12;
  outline-offset: 2px;
}

.nav-link:focus {
  outline: 2px solid #f39c12;
  outline-offset: 2px;
}
</style>