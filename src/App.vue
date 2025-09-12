<script setup>
import { ref, provide  } from "vue";
import NavBarComponent from './components/navBarComponent.vue';
const notConnected=ref(true);
provide('key',{
  connexionProvide:notConnected,
  changeprovide:()=>{
    notConnected.value=!notConnected.value
  }
})

</script>

<template>
  <div class="body">
      <header>
        <div>
          <h1>By Ghost</h1>
        </div>
        <div> 
          <NavBarComponent />
          <RouterLink v-if="notConnected" :to="{name:'connection'}" class="nav-link">Se connecter/S'inscrire </RouterLink>
        </div>
      </header>
      <main>
        <RouterView/>
      </main>
  </div>
</template>

<style scoped>
*{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.body{
  width:100%;
}
header{
  /* padding-left: 10px; */
  width: 100vw;
  height: 60px;
  display: flex;
  justify-content: space-between;
  padding-top: 10px;
}
.nav-link{
  color:white;
  text-decoration: none;
  text-decoration: none;
  color: white;
  padding: 0.8rem 1.5rem;
  box-shadow: 0 4px 12px rgba(243, 156, 18, 0.3);
  transform: translateY(-2px);
  transition: all 0.5s;
  &&:hover{
    transform: scale(1.08);
    background-color: rgba(255, 255, 255, 0.1);
  }
}
.nav-link.router-link-active {
    box-shadow: 0 4px 12px rgba(243, 157, 18, 0.87);
}

header>div:nth-of-type(2){
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
}
header>div:nth-of-type(3){
  display: none;
  justify-content: flex-end;
}
h1{
  align-self: start;
  font-size: 2.5rem;
  font-weight: 800;
  color:rgb(233, 200, 14);
}
@media screen  and ( min-width:500px){
.h1{
  display: block;
}
header>div:nth-of-type(3){
  display: flex;
  justify-content: flex-end;
}
}
@media screen  and ( min-width:1024px){
  
}
</style>
