<template>
  <div id="app">
    <div v-if="!userSignedIn">
     <v-app>
        <main>
          <v-container fluid>
            <transition name="slide-fade">
                <router-view></router-view>
            </transition>
          </v-container>
        </main>
        </v-app>
    </div>
    <div v-else>
        <v-app toolbar>
          <v-navigation-drawer absolute persistent light :mini-variant.sync="mini" v-model="drawer" overflow>
            <v-toolbar flat class="transparent">
              <v-list class="pa-0"> 
                <v-list-tile avatar tag="div">
                  <v-list-tile-avatar v-if="getUserInformation">
                    <img v-if="getUserInformation.picture" v-bind:src="getUserInformation.picture" v-bind:alt="getUserInformation.name" />
                    <img v-else src="https://upload.wikimedia.org/wikipedia/en/b/b1/Portrait_placeholder.png" alt="Profile picture" />
                  </v-list-tile-avatar>
                  <v-list-tile-content v-if="getUserInformation">
                    <v-list-tile-title>{{getUserInformation.name}}</v-list-tile-title>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    <v-btn icon @click.native.stop="mini = !mini">
                      <v-icon>chevron_left</v-icon>
                    </v-btn>
                  </v-list-tile-action>
                </v-list-tile>
              </v-list>
            </v-toolbar>
            <v-list>
            <v-list-tile
              v-for="item in items"
              :key="item.title"
              :to="item.link">
              <v-list-tile-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>{{ item.title }}</v-list-tile-content>
            </v-list-tile>
            <v-list-tile
              @click="logOut">
              <v-list-tile-action>
                <v-icon>exit_to_app</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>Logout</v-list-tile-content>
            </v-list-tile>
          </v-list>
            <v-list>
              <v-divider></v-divider>
              <v-list-tile
              v-for="item in menuItems"
              :key="item.title"
              :to="item.link">
              <v-list-tile-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>{{ item.title }}</v-list-tile-content>
            </v-list-tile>
          </v-list> 
           <v-list>
            <v-divider></v-divider>
           <v-list-tile
              <v-card class="elevation-0">
                  <v-card-text v-if="getUserInformation">
                    <v-text-field label="Carbohydrates" v-model="getUserInformation.macros.Carbs" v-on:change="updatePreference(getUserInformation)"></v-text-field>
                    <v-text-field label="Protein" v-model="getUserInformation.macros.Protein" v-on:change="updatePreference(getUserInformation)"></v-text-field>
                    <v-text-field label="Fat" v-model="getUserInformation.macros.Fat" v-on:change="updatePreference(getUserInformation)"></v-text-field> 
                    <v-checkbox label="Running" v-model="getUserInformation.interests.Running" v-on:change="updatePreference(getUserInformation)"></v-checkbox>
                    <v-checkbox label="Biking" v-model="getUserInformation.interests.Biking" v-on:change="updatePreference(getUserInformation)"></v-checkbox>
                    <v-checkbox label="Bodybuilding" v-model="getUserInformation.interests.Bodybuilding" v-on:change="updatePreference(getUserInformation)"></v-checkbox>
                    <v-checkbox label="High protein" v-model="getUserInformation.proteinHigh" v-if="!getUserInformation.proteinLow" v-on:change="updatePreference(getUserInformation)"></v-checkbox>
                    <v-checkbox label="High protein" v-else disabled></v-checkbox>
                    <v-checkbox label="Low protein" v-model="getUserInformation.proteinLow"  v-if="!getUserInformation.proteinHigh" v-on:change="updatePreference(getUserInformation)"></v-checkbox>
                    <v-checkbox label="Low protein" v-else disabled></v-checkbox>
                    <v-checkbox label="High carbs" v-model="getUserInformation.carbsHigh"  v-if="!getUserInformation.carbsLow" v-on:change="updatePreference(getUserInformation)"></v-checkbox>
                    <v-checkbox label="High carbs" v-else disabled></v-checkbox>
                    <v-checkbox label="Low carbs" v-model="getUserInformation.carbsLow"  v-if="!getUserInformation.carbsHigh" v-on:change="updatePreference(getUserInformation)"></v-checkbox>
                    <v-checkbox label="Low carbs" v-else disabled></v-checkbox>
                    <v-checkbox label="High fat" v-model="getUserInformation.fatHigh"  v-if="!getUserInformation.fatLow" v-on:change="updatePreference(getUserInformation)"></v-checkbox>
                    <v-checkbox label="High fat" v-else disabled></v-checkbox>
                    <v-checkbox label="Low fat" v-model="getUserInformation.fatLow"  v-if="!getUserInformation.fatHigh" v-on:change="updatePreference(getUserInformation)"></v-checkbox>
                    <v-checkbox label="Low fat" v-else disabled></v-checkbox>
                    <v-checkbox label="High Fatty acids, total saturated" v-model="getUserInformation.fatsatHigh" v-if="!getUserInformation.fatsatLow" v-on:change="updatePreference(getUserInformation)"></v-checkbox>
                    <v-checkbox label="High Fatty acids, total saturated" v-else disabled></v-checkbox>
                    <v-checkbox label="Low Fatty acids, total saturated" v-model="getUserInformation.fatsatLow" v-if="!getUserInformation.fatsatHigh" v-on:change="updatePreference(getUserInformation)"></v-checkbox>
                    <v-checkbox label="Low Fatty acids, total saturated" v-else disabled></v-checkbox>
                    <v-checkbox label="High Fatty acids, total trans" v-model="getUserInformation.fattransHigh" v-if="!getUserInformation.fattransLow" v-on:change="updatePreference(getUserInformation)"></v-checkbox>
                    <v-checkbox label="High Fatty acids, total trans" v-else disabled></v-checkbox>
                    <v-checkbox label="Low Fatty acids, total trans" v-model="getUserInformation.fattransLow" v-if="!getUserInformation.fattransHigh" v-on:change="updatePreference(getUserInformation)"></v-checkbox>
                    <v-checkbox label="Low Fatty acids, total trans" v-else disabled></v-checkbox>
                    <v-checkbox label="High fiber" v-model="getUserInformation.fiberHigh" v-if="!getUserInformation.fiberLow" v-on:change="updatePreference(getUserInformation)"></v-checkbox>
                    <v-checkbox label="High fiber" v-else disabled></v-checkbox>
                    <v-checkbox label="Low fiber" v-model="getUserInformation.fiberLow" v-if="!getUserInformation.fiberHigh" v-on:change="updatePreference(getUserInformation)"></v-checkbox>
                    <v-checkbox label="Low fiber" v-else disabled></v-checkbox>
                    <v-checkbox label="Cook time - max 2 hours" v-model="getUserInformation.cookTime2h" v-if="!getUserInformation.cookTime1h && !getUserInformation.cookTime05h" v-on:change="updatePreference(getUserInformation)"></v-checkbox>
                    <v-checkbox label="Cook time - max 2 hours" v-else disabled></v-checkbox>
                    <v-checkbox label="Cook time - max 1 hour" v-model="getUserInformation.cookTime1h" v-if="!getUserInformation.cookTime2h && !getUserInformation.cookTime05h" v-on:change="updatePreference(getUserInformation)"></v-checkbox>
                    <v-checkbox label="Cook time - max 1 hour" v-else disabled></v-checkbox>
                    <v-checkbox label="Cook time - max 0.5 hour" v-model="getUserInformation.cookTime05h" v-if="!getUserInformation.cookTime2h && !getUserInformation.cookTime1h" v-on:change="updatePreference(getUserInformation)"></v-checkbox>
                    <v-checkbox label="Cook time - max 0.5 hour" v-else disabled></v-checkbox>
                  </v-card-text>
                </v-card>
               </v-list-tile>
                <v-list-tile-action>
                 <v-list-tile-content><v-btn v-on:click="trigger()">click</v-btn></v-list-tile-content>
                    
                  </v-list-tile-action>
            </v-list>            
          </v-navigation-drawer>
            <v-toolbar fixed class="blue darken-1" dark>
              <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
              <v-toolbar-title>Fitness Helper</v-toolbar-title>
            </v-toolbar>
            <main>
            <v-container fluid>
              <transition name="slide-fade">
                  <router-view></router-view>
              </transition>
            </v-container>
          </main>
          <v-footer></v-footer>
        </v-app>
    </div>

  </div>
</template>

<script>
import firebase from "firebase"
import toastr from "toastr"

export default {
  name: 'app',
   data () {
    return {
      user: [],
      userSignedIn: false,
      drawer: true,
      items: [
        {icon: 'person', title: 'Profile', link: '/profile'},
      ],
      mini: false,
      right: null,
      scrolled: false
    } 
   },
  methods: {
    logOut () {
        this.$store.dispatch('logOut')
        this.userSignedIn = false
        window.location = "http://localhost:8080/#/"
        toastr.success("You are now logged out");
      },
      trigger () {
        let self = this;
          firebase.auth().onAuthStateChanged(function(user) {
              if (user) {
                  self.$store.commit('setCurrentUser', user);  
              } else {
                  window.location = "http://localhost:8080/#/";
              }
          });  
          this.$store.commit('resetCurrentScrollNumber');
          setTimeout(function(){ self.$store.dispatch('fetchRecipes'); }, 1000);   
          setTimeout(function(){ self.$store.getters.fetchRecipes;}, 1000);          
      },
      updatePreference (user) {
         let self = this;
         this.$store.commit('updateUserPreference', user);
         setTimeout(function(){ self.$store.dispatch('fetchRecipes'); }, 1000);   
         //setTimeout(function(){ self.$store.getters.fetchRecipes;}, 1000);  
      }, 
      userIsAuthenticated () {
        //return this.$store.getters.getUser !== null && this.$store.getters.getUser !== undefined
          let self = this;
          firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                self.userSignedIn = true;
            } else {}
          }); 
      },
  },
  computed: {    
      menuItems () {
         let menuItems = [
            {icon: 'accessibility', title: 'Health', link: '/meetups'},
            {icon: 'room', title: 'Nearby you', link: '/meetup/new'},
            {icon: 'alarm', title: 'Track', link: '/meetup/new'},
          ]
        return menuItems
      },
      getUserInformation () {
        return this.$store.getters.getUser;
      }
  },
  created () {
    let self = this;
    this.userIsAuthenticated();
    this.getUserInformation; 
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.navigation-drawer {
  top: -60px;
  min-height: 2000px;
}

/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all .4s ease;
}
.slide-fade-leave-active {
  transition: all .4s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(50px);
  opacity: 0;
}
nav {
  box-shadow: 0px 0px 8px 0px #888888 !important;
}
</style>
