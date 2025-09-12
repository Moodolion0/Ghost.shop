<script setup>
import { ref, onMounted, watch, computed } from "vue";

// --- STATE & DATA FETCHING ---
const tab = ref([]);
const input = ref('All products');

onMounted(() => {
  fetch('https://dummyjson.com/products')
    .then(res => res.json())
    .then((data) => {
      tab.value = data.products;
    });
});



// --- COMPUTED PROPERTY POUR LES CATÉGORIES ---
// Cette 'computed' se mettra à jour toute seule quand 'tab' changera.
const categoriesUniques = computed(() => {
  // 1. On récupère toutes les catégories (même les doublons)
  const allCategories = tab.value.map(product => product.category);
  allCategories.unshift('All products');
  // 2. On utilise un Set pour avoir des valeurs uniques, puis on reconvertit en tableau
  return Array.from(new Set(allCategories));
});

// --- EVENTS ---
const emit = defineEmits(['filtre']);
// On émet la valeur initiale
emit('filtre', input.value);
// On surveille les changements pour les émettre aussi
watch(input, (nouvelleValeur) => {
  emit('filtre', nouvelleValeur);
});
</script>

<template>
  <div>
    <ul>
      <li v-for="category in categoriesUniques" :key="category">
        <input v-model="input" type="radio" name="radio" :id="category" :value="category">
        <label :for="category">{{ category }}</label>
      </li>
    </ul>
  </div>
</template>


<style scoped>
div{
  /* padding-left: 150px; */
  width: 100%;
}
ul{
  display: flex;
  gap:20px;
  list-style-type: none;
  overflow-x: auto;
  justify-content: center;
}
li{
  display: flex;
  align-items: center;
  width:20%;
}
input[type="radio"]{
  width: 25px;
  height: 25px;
  background-color: #fff;
  accent-color: rgb(233, 200, 14);
}
label{
  color: #fff;
  font-size:2.5rem
}
@media screen  and ( min-width:500px){
li{
  flex-direction: column;
  justify-content: center;
}
}
@media screen  and ( min-width:1024px){
  .poductsShow{
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
}

</style>