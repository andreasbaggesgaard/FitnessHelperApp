<template>
  <div class="recipe">
    <div>{{recipe}}</div>
  </div> 
</template>

<script>
export default {
  name: 'recipe',
  computed: {
    recipe () {
      return this.$store.getters.getSelectedRecipe
    }
  }
}
</script>

<style scoped>

</style>
