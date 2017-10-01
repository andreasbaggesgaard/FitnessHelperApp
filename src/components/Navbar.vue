<template>
  <div class="navbar">
      <v-layout> 
          <router-link to="/recipes" v-if="user"><v-toolbar-title><v-icon>home</v-icon> Home</v-toolbar-title></router-link>
          <router-link to="/register" v-if="!user"><v-toolbar-title><v-icon>person_add</v-icon> Register</v-toolbar-title></router-link>
          <v-toolbar-title v-on:click="dialog()" v-if="!user"><v-icon>home</v-icon> Login</v-toolbar-title>
          <router-link to="/profile" v-if="user"><v-toolbar-title><v-icon>person</v-icon> Profile</v-toolbar-title></router-link>
          <v-toolbar-title v-if="user" v-on:click="logOut()"><v-icon>exit_to_app</v-icon> Logout</v-toolbar-title> 
      </v-layout>
  </div> 
  
</template>

<script>
export default {
  name: 'navbar',
  data () { 
    return {
    }
  },
  methods: {
      dialog () {
        this.$store.commit('showDialog', true);
      },
      logOut () {
        this.$store.dispatch('logOut');
      },
  },
  computed: {
    user () {
      return this.$store.getters.getLoggedIn;
    }   
  },
  created () {
    this.$store.dispatch('userIsLoggedIn');
  }
} 
</script>

<style >
    .navbar {
      position: absolute; 
      right: 20px;
    }
    .toolbar__title {
      font-size: 1.1em;
      font-weight: 400;
    }
</style>
