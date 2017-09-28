<template>
  <div class="recipes">

      <v-card-text>
        <v-switch label="Deactivate API" v-model="enabled" light></v-switch>
      </v-card-text>

<span v-if="recipes.totalMatchCount">Recipes found</span><h6><b>{{recipes.totalMatchCount}}</b></h6>
  <v-layout row wrap>
    <v-flex xs12 sm4 v-for="(recipe, index) in recipes.matches" :key="index">
      <v-card>
        <v-card-media v-if="recipe.smallImageUrls"
          v-bind:src="changeImageSize(recipe.smallImageUrls[0])"
          width="287" height="287"
          v-on:click.prevent="getRecipe(recipe)">
        </v-card-media>
        <v-card-title primary-title>
          <div>
            <div class="headline" v-on:click.prevent="getRecipe(recipe)">{{recipe.recipeName}}</div>
            <span class="grey--text">{{recipe.occasion}}</span>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn flat>{{recipe.totalTimeInSeconds}}</v-btn>
          <v-btn flat class="purple--text" v-if="recipe.attributes.course">{{recipe.attributes.course[0]}}</v-btn>
          <v-spacer></v-spacer>
          <v-btn icon @click.native="show = !show">
            <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
          </v-btn>
        </v-card-actions>
        <v-slide-y-transition>
          <v-card-text v-show="show" :key="index">
              <h6>Ingredients:</h6>
              <p v-for="i in recipe.ingredients">{{i}}</p>
          </v-card-text>
        </v-slide-y-transition>
      </v-card><br />
    </v-flex>
  </v-layout>

  <!--<div class="spinner" v-if="loadingRecipes"><div class="double-bounce1"></div><div class="double-bounce2"></div></div>-->

  </div>
</template>

<script>
import firebase from "firebase"
import { database } from "@/services/db"
import { mapGetters } from 'vuex'


export default {
  name: 'recipes',
  data: () => ({
      show: false,
      enabled: true,
      authUser: []
    }),
    methods: {
        getRecipe(recipe) {
            this.$store.dispatch('fetchSelectedRecipe', recipe.id);
        },
        handleScroll () {
          if(!this.enabled) {
              let self = this;
              let scrollHeight = $(document).height();
              let scrollPosition = $(window).height() + $(window).scrollTop();
              if ((scrollHeight - scrollPosition) / scrollHeight === 0) {
                  console.log("bottom")
                  this.$store.commit('setLoading', true);
                  setTimeout(function(){ self.$store.dispatch('fetchRecipes') }, 1000);
                  this.$store.dispatch('listenForChanges');
                  console.log(this.currentScrollNumber);
              }
          }
        },
        changeImageSize (string) {
          return string = string.substring(0, string.length-3) + "s320";
        },
        handleAuthentication () {
          this.$store.dispatch('authenticateUser');
        },
        fetchRecipesFromAPI () {
          this.$store.dispatch('fetchRecipes')
        }
    },
    computed: {
      ...mapGetters({
        recipes: 'getRecipes',
        currentScrollNumber: 'getCurrentScrollNumber',
        loadingRecipes: 'getLoadingValue'
      }),
    },
    created () {
       this.handleAuthentication();
       window.addEventListener('scroll', this.handleScroll);
    },
    destroyed () {
       window.removeEventListener('scroll', this.handleScroll);
    },
    mounted () {
      if(!this.enabled) {
          let self = this;
          this.$store.commit('setLoading', true);
          this.handleAuthentication();
          //this.$store.commit('resetCurrentScrollNumber');
          setTimeout(function(){ self.fetchRecipesFromAPI()}, 1400);
          this.$store.dispatch('listenForChanges')
      }
    }
}
</script>

<style scoped>
.card {
  box-shadow: 0px 0px 1px 0px #888888;
}
.sm4 {
  padding: 1.5%;
}
.sm4:hover {
  cursor: pointer;
}
.headline {
  font-size: 1.4em !important;
}
.card__text {
    margin-top: -70px;
}

.spinner {
  width: 40px;
  height: 40px;

  position: relative;
  margin: 0 auto;
}

.double-bounce1, .double-bounce2 {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #bfbfbf;
  opacity: 0.6;
  position: absolute;
  top: 0;
  left: 0;

  -webkit-animation: sk-bounce 2.0s infinite ease-in-out;
  animation: sk-bounce 2.0s infinite ease-in-out;
}

.double-bounce2 {
  -webkit-animation-delay: -1.0s;
  animation-delay: -1.0s;
}

@-webkit-keyframes sk-bounce {
  0%, 100% { -webkit-transform: scale(0.0) }
  50% { -webkit-transform: scale(1.0) }
}

@keyframes sk-bounce {
  0%, 100% {
    transform: scale(0.0);
    -webkit-transform: scale(0.0);
  } 50% {
    transform: scale(1.0);
    -webkit-transform: scale(1.0);
  }
}
</style>

