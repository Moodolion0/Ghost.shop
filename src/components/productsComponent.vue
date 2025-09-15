<script setup>
import { ref, defineProps, computed, onMounted, inject } from "vue";
import { useRouter } from 'vue-router';
const messageP=inject('key')
const route=useRouter();
const url = 'https://dummyjson.com/products';
const tab = ref([]);
const loading = ref(true);
const error = ref(null);

const panier=ref();

const props = defineProps({
  filtredItem: String
});

//fonction d'ajout au panier
function ajoutAupanier(id) {
  console.log('ajout...');
  
  if (messageP.connexionProvide===false) {
    route.push('/')
  } else{
    panier.value.push(id)
    alert("ajout réussi boss")
  }
}

// Récupération des données de l'API
onMounted(async () => {
  try {
    loading.value = true;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Erreur de réseau');
    }
    const data = await response.json();
    tab.value = data.products;
    console.log('Données chargées:', tab.value);
  } catch (err) {
    error.value = err.message;
    console.error('Erreur:', err);
  } finally {
    loading.value = false;
  }
});

// Filtrage des produits
const tabfinal = computed(() => {
  if (!tab.value.length) return [];
  
  if (props.filtredItem === 'All products' || !props.filtredItem) {
    return tab.value;
  } else {
    return tab.value.filter((e) => e.category === props.filtredItem);
  }
});
</script>

<template>
  <div v-if="loading" class="loading">Chargement en cours...</div>
  
  <div v-else-if="error" class="error">Erreur: {{ error }}</div>
  
  <div v-else class="products-container">
    <div v-if="tabfinal.length === 0" class="no-products">
      Aucun produit trouvé pour cette catégorie.
    </div>
    
    <div v-else class="products-grid">
      <div v-for="value in tabfinal" :key="value.id" class="product-card">
        <div class="card-inner">
          <!-- prix -->
          <div class="price">
            <span class="current-price">{{ value.price }}$</span>
            <span class="discount">-{{ value.discountPercentage }}%</span>
          </div>
          <!-- pour l'image -->
          <div class="product-image" :style="{
            backgroundImage: `url(${value.images[0]})`,
          }">
            <span class="material-icons favorite">favorite</span>
          </div>
          <div class="card-footer">
            <p class="title">{{ value.title }}</p>
            <div class="category-row">
              <p class="category">{{ value.category }}</p>
              <span @click="ajoutAupanier(value.id)" class="material-icons cart">shopping_cart</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.products-container {
  width: 100%;
  /* padding: 1rem; */
}

.loading, .error, .no-products {
  text-align: center;
  padding: 3rem;
  font-size: 1.5rem;
  color: #666;
}

.error {
  color: #e53935;
}

.products-grid {
  display: grid;
  gap: 1.5rem;
  justify-content: center;
}

.product-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  min-width:390px;
  max-width: 100%;
  margin: 0 auto;
}

.product-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.card-inner {
  display: flex;
  flex-direction: column;
  width:100%;
  height: 100%;
}

.price {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  /* background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); */
}

.current-price {
  color: #1976d2;
  font-size: 1.5rem;
  font-weight: 800;
}

.discount {
  color: #e53935;
  font-size: 1.1rem;
  font-weight: 700;
  background: rgba(229, 57, 53, 0.1);
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
}

.product-image {
  height: 250px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  margin: 0.5rem;
  border-radius: 12px;
}

.favorite {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  color: rgba(255, 255, 255, 0.8);
  background: rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  padding: 0.5rem;
  backdrop-filter: blur(4px);
  transition: all 0.3s ease;
  cursor: pointer;
}

.favorite:hover {
  color: #e53935;
  background: rgba(255, 255, 255, 0.9);
}

.card-footer {
  padding: 1.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.title {
  font-size: 1.3rem;
  font-weight: 600;
  line-height: 1.4;
  margin-bottom: 1rem;
  color: #2c3e50;
  flex-grow: 1;
}

.category-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.category {
  color: #7f8c8d;
  font-size: 1rem;
  font-weight: 500;
}

.cart {
  color: #27ae60;
  font-size: 2rem;
  cursor: pointer;
  transition: color 0.3s ease;
  padding: 0.5rem;
  border-radius: 50%;
  background: rgba(39, 174, 96, 0.1);
}

.cart:hover {
  color: #219653;
  background: rgba(39, 174, 96, 0.2);
}

/* Media Queries optimisées */
@media (max-width: 480px) {
  .products-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .product-card {
    max-width: 100%;
  }
  
  .price {
    padding: 0.8rem 1rem;
  }
  
  .current-price {
    font-size: 1.3rem;
  }
  
  .product-image {
    height: 200px;
  }
  
  .card-footer {
    padding: 1rem;
  }
  
  .title {
    font-size: 1.1rem;
  }
  
  .material-icons {
    font-size: 2.5rem;
  }
}

@media (min-width: 481px) and (max-width: 767px) {
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.2rem;
  }
  
  .product-card {
    max-width: 100%;
  }
  
  .title {
    font-size: 1.2rem;
  }
}

@media (min-width: 768px) and (max-width: 1023px) {
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
  
  .products-container {
    padding: 1.5rem;
  }
  
  .product-image {
    height: 280px;
  }
}

@media (min-width: 1024px){
  .products-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.8rem;
  }
  
  .products-container {
    padding: 2rem;
    max-width: 100%;
    margin: 0 auto;
  }
}

@media (min-width: 1280px) {
  .products-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }
  
  .products-container {
    padding: 2.5rem;
    max-width: 100%;
    margin: 0 auto;
  }
  
  .product-image {
    height: 300px;
  }
}

/* Mode paysage sur mobile */
@media (max-height: 500px) and (orientation: landscape) {
  .product-card {
    max-height: 80vh;
    overflow-y: auto;
  }
}

/* Prévention du text overflow */
.title, .category {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.title {
  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

/* Animation de chargement */
.loading {
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
}

/* Support pour les appareils à tactile */
@media (pointer: coarse) {
  .product-card:hover {
    transform: none;
  }
  
  .cart, .favorite {
    min-height: 44px;
    min-width: 44px;
  }
}
</style>