<script setup>
import { ref } from "vue";
import CategoriesComponent from '@/components/categoriesComponent.vue';
import ProductsComponent from '@/components/productsComponent.vue';
const filtreitem=ref()




</script>


<template>
  <div class="vvv">
    <div class="aboutproducts">
      <aside> 
        <CategoriesComponent @filtre="filtreitem=$event, console.log(filtreitem)"/>
      </aside>
      <div>
        <ProductsComponent :filtredItem="filtreitem"/>
      </div>
    </div>
  </div>

</template>


<style scoped>
*{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.vvv{
  width:100vw;
  padding: 20px;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pub>p{
  font-size: 3.5rem;
}
.aboutproducts{
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

@media (min-width: 768px) {
  .aboutproducts {
    flex-direction: column;
  }
  
  aside {
    width: 100%;
  }
}
</style>
