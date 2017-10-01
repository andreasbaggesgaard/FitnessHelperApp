<template>
<div>
<section v-bind:class="[{ triggered: dialogValue }]">
    <v-toolbar class="blue darken-1 frontnavbar" dark>
      <router-link to="/"><v-toolbar-title>Fitness Helper</v-toolbar-title></router-link>
        <navbar></navbar>
     </v-toolbar>
        <v-parallax src="https://andreasbaggesgaard.dk/hero.jpeg" height="600">
          <v-layout
            column
            align-center
            justify-center
            class="white--text"
          >
            <h1 class="white--text mb-2 display-3">Fitness Helper</h1>
            <div class="headline mb-3 text-xs-center">Everything you need to know</div>
            <v-btn
              class="blue lighten-2 mt-5"
              dark
              large
              href="/pre-made-themes"
            >
              Get Started
            </v-btn>
          </v-layout>
        </v-parallax>
      </section>

      <section v-bind:class="[{ triggered: dialogValue }]">
        <v-layout
          column
          wrap
          class="my-5"
          align-center
        >
          <v-flex xs12 sm4 class="my-3">
            <div class="text-xs-center">
              <h2 class="headline">The best way to start developing</h2>
              <span class="subheading">
                Cras facilisis mi vitae nunc 
              </span>
            </div>
          </v-flex>
          <v-flex xs12>
            <v-container grid-list-xl>
              <v-layout row wrap align-center>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2">color_lens</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">Material Design</div>
                    </v-card-title>
                    <v-card-text>
                      Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare. 
                      Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 
                      Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti. 
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2">flash_on</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline">Fast development</div>
                    </v-card-title>
                    <v-card-text>
                      Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare. 
                      Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 
                      Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti. 
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2">build</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">Completely Open Sourced</div>
                    </v-card-title>
                    <v-card-text>
                      Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare. 
                      Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 
                      Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti. 
                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
      </section>

      <section v-bind:class="[{ triggered: dialogValue }]">
        <v-parallax src="https://andreasbaggesgaard.dk/section.jpeg" height="380">
          <v-layout column align-center justify-center>
            <div class="headline white--text mb-3">Web development has never been easier</div>
            <em>Kick-start your application today</em>
            <v-btn
              class="blue lighten-2 mt-5"
              dark
              large
              href="/pre-made-themes"
            >
              Get Started
            </v-btn>
          </v-layout>
        </v-parallax>
      </section>

      <section v-bind:class="[{ triggered: dialogValue }]">
        <v-container grid-list-xl>
          <v-layout row wrap justify-center class="my-5">
            <v-flex xs12 sm4>
              <v-card class="elevation-0 transparent">
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline">Company info</div>
                </v-card-title>
                <v-card-text>
                  Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare. 
                  Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 
                  Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti. 
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs12 sm4 offset-sm1>
              <v-card class="elevation-0 transparent">
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline">Contact us</div>
                </v-card-title>
                <v-card-text>
                  Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
                </v-card-text>
                <v-list class="transparent">
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon class="blue--text text--lighten-2">phone</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>777-867-5309</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon class="blue--text text--lighten-2">place</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>Chicago, US</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon class="blue--text text--lighten-2">email</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>john@vuetifyjs.com</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </section>

    <transition name="fade">
      <v-layout row justify-center style="position: fixed; top: 100px; left:0; right:0;" v-if="dialogValue">
          <v-card style="box-shadow: 0px 0px 1px 0px #888888; width:40%;">
            <v-card-title>
              <div class="headline">Login</div>
            </v-card-title>
            <v-card-text>
            <v-form v-model="valid">
                <v-text-field 
                  label="E-mail"
                  v-model="email"
                  :rules="emailRules"
                  required
                ></v-text-field>
                <v-text-field
                  label="Password"
                  v-model="password"
                  required
                ></v-text-field>
              </v-form>
             <v-btn class="">reset password</v-btn>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="" flat="flat" v-on:click.native="hideDialog ()">Cancel</v-btn>
              <v-btn primary v-on:click.prevent="logIn ()">Login</v-btn>
            </v-card-actions>
          </v-card>
      </v-layout>
    </transition>

      </div>
</template>

<script>
import navbar from "@/components/navbar"
import toastr from "toastr"
import firebase from "firebase"

export default {
  name: 'frontpage',
  data() {
    return {
      valid: false,
      email: '',
      emailRules: [
          (v) => !!v || 'E-mail is required',
          (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
        ],
      password: '',   
      passwordRules: [
        (v) => !!v || 'Password is required'
      ],
    } 
  },
  methods: {
    hideDialog () {
        this.$store.commit('showDialog', false);
    },
    logInUser () {
      if(this.valid) {
        this.$store.dispatch('logIn', this.email, this.password);    
      } else {
        toastr.error("Fill out email and password");
      }     
    },
    logIn () {
        let self = this;
        let email = this.email
        let password = this.password
        firebase.auth().signInWithEmailAndPassword(email, password).then(function (response) {
          self.$store.commit('showDialog', false);
          window.location = "http://localhost:8080/#/recipes"
        }).catch(function(error) {
          let errorCode = error.code; 
          let errorMessage = error.message;
          if(errorMessage){
              toastr.error(errorMessage);
          } 
        });
    },
  },
  computed: {
      dialogValue () {
        return this.$store.getters.getDialogValue;
      }
  },
  components: {
    navbar
  }
}
</script>
<style>
.frontnavbar {
  margin-top: -60px !important;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0
}
.triggered {
  opacity: 0;
}
</style>