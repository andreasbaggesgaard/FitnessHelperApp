import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/components/Register'
import Recipes from '@/components/Recipes'
import Recipe from '@/components/Recipe'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Recipes',
      component: Recipes
    },
    {name: 'recipe', path: '/:recipeID', component: Recipe },
  ]
})
