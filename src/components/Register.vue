<template>
  <div class="register">
      <div class="row" v-for="user in users">
            <h4>{{ user.name }}</h4>
            <button>Register</button>
       </div>
  </div>
</template>

<script>
export default {
  name: 'register',
  computed: {
    users () {
      return this.$store.getters.totalUsers
    },
  }
}
</script>

<style scoped>

</style>
