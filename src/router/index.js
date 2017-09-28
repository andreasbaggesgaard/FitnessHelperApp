import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/components/Register'
import Recipes from '@/components/Recipes'
import Recipe from '@/components/Recipe'
import Frontpage from '@/components/Frontpage'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', name: 'frontpage', component: Frontpage},
    {path: '/register', name: 'register', component: Register},
    {path: '/recipes', name: 'recipes', component: Recipes},
    {name: 'recipe', path: '/:recipeID', component: Recipe },
  ]
})
