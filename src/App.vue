<template>
  <div id="app">
    <div v-if="!userSignedIn">
     <v-app>
        <main>
          <v-container fluid>
            <transition name="slide-fade">
                  {{userSignedIn}} 
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
                  <v-list-tile-avatar>
                    <img src="https://randomuser.me/api/portraits/men/85.jpg" />
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title>Andreas Baggesgaard</v-list-tile-title>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    <v-btn icon @click.native.stop="mini = !mini">
                      <v-icon>chevron_left</v-icon>
                    </v-btn>
                  </v-list-tile-action>
                </v-list-tile>
              </v-list>
            </v-toolbar>
            <v-list class="pt-0" dense>
              <v-divider></v-divider>
              <v-list-tile v-for="item in items" :key="item.title">
                <v-list-tile-action>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
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
import Register from '@/components/Register'
//import { firebase } from '@/services/db'
//import * as firebase from '@/services/db'
import firebase from "firebase"

export default {
  name: 'app',
   data () {
    return {
      userSignedIn: false,
      drawer: true,
      items: [
        { title: 'Home', icon: 'dashboard' },
        { title: 'About', icon: 'question_answer' }
      ],
      mini: false,
      right: null,
      scrolled: false
    } 
   },
  components: {
    Register
  },
  created () {
      firebase.auth().onAuthStateChanged(function(user) {
        let self = this;
        if (user) {
          self.userSignedIn = true;
        } else {
          self.userSignedIn = false;
        }
    });
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
