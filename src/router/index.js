import MyAppView from '@/myAppView.vue'
import AccueilView from '@/views/accueilView.vue'
import ConnexionView from '@/views/connexionView.vue'
import ProductsView from '@/views/productsView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      name:"connection",
      component:ConnexionView
    },
    {
      path:'/myApp/:id',
      name:"myApp",
      component:MyAppView,
      id:'',
      meta:{requireAuth:true},
      children:[
          {
            path:'/myApp/',
            name:"Accueil",
            component:AccueilView
          },
          {
            path:'/myApp/Produits',
            name:"Produits",
            component:ProductsView
          }
      ]
    },
  ],
})
router.beforeEach((to, from, next)=>{
    const get=localStorage.getItem('token')==='true'
    if (to.meta.requireAuth && !get) {
        next('/')
    } else {
        next()
    }
})

export default router
