<template>
  <div class="register">
  <v-layout row wrap>
    <v-flex xs12 sm6 style="margin: 0 auto">
      <v-stepper v-model="step" vertical>
        <br />
        <h6 style="margin: 0 auto; padding: 2% 10% 2% 10%; font-weight:lighter">Fill out as much as you like. You can skip each step except the first one, <b style="font-weight:bold">but the more you fill out, the more relevant content</b> will be provided by the fitness helper.</h6>
        <small>Tip: You can always change your preferences later on.</small>
        <v-stepper-step step="1" v-bind:complete="step > 1">Personal information*</v-stepper-step>
        <v-stepper-content step="1">
          <v-card class="card--color mb-4" height="100%">
              <v-form v-model="valid">
                <v-text-field 
                  label="Name"
                  v-model="newUser.name"
                  :rules="nameRules"
                  required
                ></v-text-field>
                <v-text-field
                  label="E-mail"
                  v-model="newUser.email"
                  :rules="emailRules"
                  required
                ></v-text-field>
                 <v-text-field
                  label="Password"
                  v-model="newUser.password"
                  :rules="passwordRules"
                  :counter="10"
                  required
                ></v-text-field>
                <v-text-field
                  label="Age"
                  v-model="newUser.age"
                  
                ></v-text-field>
                <v-text-field
                  label="Height"
                  v-model="newUser.height"
                  
                ></v-text-field>
                <v-text-field
                  label="Weight"
                  v-model="newUser.weight"
                  
                ></v-text-field>
                <v-flex xs6 md10>              
                  <v-radio-group v-model="select" row>&nbsp;&nbsp;&nbsp;
                      <v-radio label="Male" value="male" ></v-radio>
                      <v-radio label="Female" value="female"></v-radio>
                      <v-btn flat @click="clearGender()">clear gender</v-btn>
                  </v-radio-group>      
                </v-flex>

                <v-flex xs6 md2>     
                  <label style="float:left" class="subheading">Picture</label><br /><br />
                  <input type="file" v-on:change="onFileChange" id="input">
                </v-flex>

            </v-form>
          </v-card>
           <v-btn primary @click.native="step = 2" v-on:click="validInfo()">Continue</v-btn>
          <!--<v-btn primary @click.native="valid ? step = 2 : step = 1" v-on:click="validInfo()">Continue</v-btn>-->
        </v-stepper-content>
        <v-stepper-step step="2" v-bind:complete="step > 2">Choose your interests</v-stepper-step>
        <v-stepper-content step="2">
          <v-card class="card--color mb-4" height="100%">
              <v-flex xs12 md6>
                <v-card class="elevation-0">
                  <v-card-text>
                    <v-checkbox label="Running" v-model="running" light></v-checkbox>
                    <v-checkbox label="Biking" v-model="biking" light></v-checkbox>
                    <v-checkbox label="Bodybuilding" v-model="bodybuilding" light></v-checkbox>
                  </v-card-text>
                </v-card>
              </v-flex>
          </v-card>
          <v-btn primary @click.native="step = 3">Continue</v-btn>
          <v-btn flat v-on:click="stepBack()">Go back</v-btn>
        </v-stepper-content>
        <v-stepper-step step="3" v-bind:complete="step > 3">Fill in your Macronutrients</v-stepper-step>
        <v-stepper-content step="3">
          <v-card class="card--color mb-4 macros" height="100%"> 
            <v-layout row wrap>
                 <v-flex xs12 md3>    
                  <v-text-field 
                      label="Carbohydrates"
                      v-model="carbs"
                      
                    ></v-text-field>
                </v-flex>
                  <v-flex xs12 md3>    
                    <v-text-field
                      label="Protein"
                      v-model="protein"
                      
                    ></v-text-field>
                 </v-flex>
                   <v-flex xs12 md3>    
                    <v-text-field
                      label="Fat"
                      v-model="fat"
                      
                    ></v-text-field>
                 </v-flex>
            </v-layout>
          </v-card>
          <v-btn primary @click.native="step = 4">Continue</v-btn>
          <v-btn flat v-on:click="stepBack()">Go back</v-btn>
        </v-stepper-content>
        <v-stepper-step step="4">Extra info for the recipe finder</v-stepper-step>
        <v-stepper-content step="4">

          <v-card class="card--color mb-4" height="100%">
          
               <v-flex xs6 md7>    
                 <label style="float:left" class="subheading">High in protein ?</label>
                  <v-radio-group v-model="newUser.proteinHigh" row>&nbsp;&nbsp;&nbsp;
                      <v-radio label="Disabled" value="true" v-if="newUser.proteinLow" disabled></v-radio>
                      <v-radio label="Yes" value="true" v-else></v-radio>
                      <v-btn flat @click="clearHP()" v-if="newUser.proteinLow" disabled>clear</v-btn>
                      <v-btn flat @click="clearHP()" v-else>clear</v-btn>
                  </v-radio-group>      
                </v-flex>

                <v-flex xs6 md7>    
                 <label style="float:left" class="subheading">Low in protein ?</label>
                  <v-radio-group v-model="newUser.proteinLow" row>&nbsp;&nbsp;&nbsp;
                      <v-radio label="Disabled" value="true" v-if="newUser.proteinHigh" disabled></v-radio>
                      <v-radio label="Yes" value="true" v-else></v-radio>
                      <v-btn flat @click="clearLP()" v-if="newUser.proteinHigh" disabled>clear</v-btn>
                      <v-btn flat @click="clearLP()" v-else>clear</v-btn>  
                  </v-radio-group>      
                </v-flex>
                <hr />

                <br />
                 <v-flex xs6 md7>    
                 <label style="float:left" class="subheading">High in Carbohydrates ?</label>
                  <v-radio-group v-model="newUser.carbsHigh" row>&nbsp;&nbsp;&nbsp;
                      <v-radio label="Disabled" value="true" v-if="newUser.carbsLow" disabled></v-radio>
                      <v-radio label="Yes" value="true" v-else></v-radio>
                      <v-btn flat @click="clearHC()" v-if="newUser.carbsLow" disabled>clear</v-btn>
                      <v-btn flat @click="clearHC()" v-else>clear</v-btn>
                  </v-radio-group>      
                </v-flex>

                <v-flex xs6 md7>    
                 <label style="float:left" class="subheading">Low in Carbohydrates ?</label>
                  <v-radio-group v-model="newUser.carbsLow" row>&nbsp;&nbsp;&nbsp;
                      <v-radio label="Disabled" value="true" v-if="newUser.carbsHigh" disabled></v-radio>
                      <v-radio label="Yes" value="true" v-else></v-radio>
                      <v-btn flat @click="clearLC()" v-if="newUser.carbsHigh" disabled>clear</v-btn> 
                      <v-btn flat @click="clearLC()" v-else>clear</v-btn> 
                  </v-radio-group>      
                </v-flex>
                <hr />

                <br />
                 <v-flex xs6 md7>    
                 <label style="float:left" class="subheading">High in fat ?</label>
                  <v-radio-group v-model="newUser.fatHigh" row>&nbsp;&nbsp;&nbsp;
                      <v-radio label="Disabled" value="true" v-if="newUser.fatLow" disabled></v-radio>
                      <v-radio label="Yes" value="true" v-else></v-radio>
                      <v-btn flat @click="clearHF()" v-if="newUser.fatLow" disabled>clear</v-btn>
                       <v-btn flat @click="clearHF()" v-else>clear</v-btn>
                  </v-radio-group>      
                </v-flex>

                <v-flex xs6 md7>    
                 <label style="float:left" class="subheading">Low in fat ?</label>
                  <v-radio-group v-model="newUser.fatLow" row>&nbsp;&nbsp;&nbsp;
                      <v-radio label="Disabled" value="true" v-if="newUser.fatHigh" disabled></v-radio>
                      <v-radio label="Yes" value="true" v-else></v-radio>
                      <v-btn flat @click="clearLF()" v-if="newUser.fatHigh" disabled>clear</v-btn>
                      <v-btn flat @click="clearLF()" v-else>clear</v-btn>  
                  </v-radio-group>      
                </v-flex>
                <hr />

                <br />
                 <v-flex xs6 md7>    
                 <label style="float:left" class="subheading">High in Fatty acids, total saturated ?</label>
                  <v-radio-group v-model="newUser.fatsatHigh" row>&nbsp;&nbsp;&nbsp;
                      <v-radio label="Disabled" value="true" v-if="newUser.fatsatLow" disabled></v-radio>
                      <v-radio label="Yes" value="true" v-else></v-radio>
                      <v-btn flat @click="clearHFSAT()" v-if="newUser.fatsatLow" disabled>clear</v-btn>
                      <v-btn flat @click="clearHFSAT()" v-else>clear</v-btn>
                  </v-radio-group>      
                </v-flex>

                <v-flex xs6 md7>    
                 <label style="float:left" class="subheading">Low in Fatty acids, total saturated ?</label>
                  <v-radio-group v-model="newUser.fatsatLow" row>&nbsp;&nbsp;&nbsp;
                      <v-radio label="Disabled" value="true" v-if="newUser.fatsatHigh" disabled></v-radio>
                      <v-radio label="Yes" value="true" v-else></v-radio>
                      <v-btn flat @click="clearLFSAT()" v-if="newUser.fatsatHigh" disabled>clear</v-btn> 
                      <v-btn flat @click="clearLFSAT()" v-else>clear</v-btn> 
                  </v-radio-group>      
                </v-flex>
                <hr />

                <br />
                 <v-flex xs6 md7>    
                 <label style="float:left" class="subheading">High in Fatty acids, total trans ?</label>
                  <v-radio-group v-model="newUser.fattransHigh" row>&nbsp;&nbsp;&nbsp;
                      <v-radio label="Disabled" value="true" v-if="newUser.fattransLow" disabled></v-radio>
                      <v-radio label="Yes" value="true" v-else></v-radio>
                      <v-btn flat @click="clearHFTRAN()" v-if="newUser.fattransLow" disabled>clear</v-btn>
                      <v-btn flat @click="clearHFTRAN()" v-else>clear</v-btn>
                  </v-radio-group>      
                </v-flex>

                <v-flex xs6 md7>    
                 <label style="float:left" class="subheading">Low in Fatty acids, total trans ?</label>
                  <v-radio-group v-model="newUser.fattransLow" row>&nbsp;&nbsp;&nbsp;
                      <v-radio label="Disabled" value="true" v-if="newUser.fattransHigh" disabled></v-radio>
                      <v-radio label="Yes" value="true" v-else></v-radio>
                      <v-btn flat @click="clearLFTRAN()" v-if="newUser.fattransHigh" disabled>clear</v-btn>
                      <v-btn flat @click="clearLFTRAN()" v-else>clear</v-btn>  
                  </v-radio-group>      
                </v-flex>
                <hr />

                <br />
                 <v-flex xs6 md7>    
                 <label style="float:left" class="subheading">High in Fiber ?</label>
                  <v-radio-group v-model="newUser.fiberHigh" row>&nbsp;&nbsp;&nbsp;
                      <v-radio label="Disabled" value="true" v-if="newUser.fiberLow" disabled></v-radio>
                      <v-radio label="Yes" value="true" v-else></v-radio>
                      <v-btn flat @click="clearHFI()" v-if="newUser.fiberLow" disabled>clear</v-btn>
                      <v-btn flat @click="clearHFI()" v-else>clear</v-btn>
                  </v-radio-group>      
                </v-flex>

                <v-flex xs6 md7>    
                 <label style="float:left" class="subheading">Low in Fiber ?</label>
                  <v-radio-group v-model="newUser.fiberLow" row>&nbsp;&nbsp;&nbsp;
                      <v-radio label="Disabled" value="true" v-if="newUser.fiberHigh" disabled></v-radio>
                      <v-radio label="Yes" value="true" v-else></v-radio>
                      <v-btn flat @click="clearLFI()" v-if="newUser.fiberHigh" disabled>clear</v-btn> 
                      <v-btn flat @click="clearLFI()" v-else>clear</v-btn> 
                  </v-radio-group>      
                </v-flex>
                <hr />

                <br />
               <v-flex xs6 md7>    
                 <label style="float:left" class="subheading">Cook time - max 2 hours</label>
                  <v-radio-group v-model="newUser.cookTime2h" row>&nbsp;&nbsp;&nbsp;
                      <v-radio label="Disabled" value="true" v-if="newUser.cookTime1h || newUser.cookTime05h" disabled></v-radio>
                      <v-radio label="Yes" value="true" v-else></v-radio>
                      <v-btn flat @click="clearC2()" v-if="newUser.cookTime1h || newUser.cookTime05h" disabled>clear</v-btn>
                      <v-btn flat @click="clearC2()" v-else>clear</v-btn>
                  </v-radio-group>      
                </v-flex>

                 <v-flex xs6 md7>    
                 <label style="float:left" class="subheading">Cook time - max 1 hour ?</label>
                  <v-radio-group v-model="newUser.cookTime1h" row>&nbsp;&nbsp;&nbsp;
                      <v-radio label="Disabled" value="true" v-if="newUser.cookTime2h || newUser.cookTime05h" disabled></v-radio>
                      <v-radio label="Yes" value="true" v-else></v-radio>
                      <v-btn flat @click="clearC1()" v-if="newUser.cookTime2h || newUser.cookTime05h" disabled>clear</v-btn>
                      <v-btn flat @click="clearC1()" v-else>clear</v-btn>
                  </v-radio-group>      
                </v-flex>

                <v-flex xs6 md7>    
                 <label style="float:left" class="subheading">Cook time - max 0.5 hour ?</label>
                  <v-radio-group v-model="newUser.cookTime05h" row>&nbsp;&nbsp;&nbsp;
                      <v-radio label="Disabled" value="true" v-if="newUser.cookTime2h || newUser.cookTime1h" disabled></v-radio>
                      <v-radio label="Yes" value="true" v-else></v-radio>
                      <v-btn flat @click="clearC05()" v-if="newUser.cookTime2h || newUser.cookTime1h" disabled>clear</v-btn>
                      <v-btn flat @click="clearC05()" v-else>clear</v-btn>
                  </v-radio-group>      
                </v-flex>

          </v-card>        

          <v-btn success v-on:click="createUser()">Finish</v-btn>
          <v-btn flat v-on:click="stepBack()">Go back</v-btn>
        </v-stepper-content>
      </v-stepper>
    </v-flex>
  </v-layout><br /><br /><br /><br />
  </div>
</template>

<script>
import toastr from "toastr"
import firebase from "firebase"

export default {
  name: 'register',
  data () { 
      return {
        step: 1,
        select: null,
        running: false,
        biking: false,
        bodybuilding: false,
        carbs: null,
        fat: null,
        protein: null,
        newUser: {
          id: '',
          name: '',
          gender: '',
          age: '',
          height: '',
          weight: '',
          email: '',
          password: '',
          picture: '',
          interests: [],
          macros: [],
          proteinHigh: false,
          proteinLow: false,
          carbsHigh: false,
          carbsLow: false,
          fatHigh: false,
          fatLow: false,
          fatsatHigh: false,
          fatsatLow: false,
          fattransHigh: false,
          fattransLow: false,
          fiberHigh: false,
          fiberLow: false,
          cookTime2h: false,
          cookTime1h: false,
          cookTime05h: false
        },
        valid: false,
        nameRules: [
          (v) => !!v || 'Name is required',
        ],
        emailRules: [
          (v) => !!v || 'E-mail is required',
          (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
        ],
        passwordRules: [
          (v) => !!v || 'Password is required',
          (v) => v.length >= 10 || 'Password must be more than 10 characters'
        ],
        commonRules: [
          (v) => !!v || 'is required',
          (v) => v.length >= 10 || 'Must be a number'
        ]
      }
    },
    methods: {
      validInfo () {
        this.valid ? this.step += 1 : toastr.error('Fill out Personal Information');
      },
      stepBack () { 
        this.step -= 1;
      },
      createUser () {
        this.newUser.interests.push({Running: this.running, Biking: this.biking, Bodybuilding: this.bodybuilding});
        let email = "sossss@lf.dk"
        let password = "1234566"
        let self = this;
        firebase.auth().createUserWithEmailAndPassword(email, password).then(function (response) {
          console.log(response)
          self.writeUserData(response.uid, self.newUser.name, email, password, self.newUser.interests);
          toastr.success("Welcome " + self.newUser.name);
        }).catch(function(error) {
          let errorCode = error.code; 
          let errorMessage = error.message;
          console.log(errorMessage)
          if(errorMessage){
              toastr.error(errorMessage);      
          }   
        });             
      },
      writeUserData (id, name, email, password, interests) {
        firebase.database().ref('users/').push({
          uid: id,
          Name: name,
          Email: email,
          Password: password,
          Interests: interests,

        });
      },
      onFileChange(e) {

      },
      clearGender () {
          this.select = "";
      },
      clearHP () {
          this.newUser.proteinHigh = false;
      },
      clearLP() {
          this.newUser.proteinLow = false;
      },
      clearHC () {
          this.newUser.carbsHigh = false;
      },
      clearLC () {
          this.newUser.carbsLow = false;
      },
      clearHF () {
          this.newUser.fatHigh = false;
      },
      clearLF () {
          this.newUser.fatLow = false;
      },
      clearHFSAT () {
          this.newUser.fatsatHigh = false;
      },
      clearLFSAT () {
          this.newUser.fatsatLow = false;
      },
      clearHFTRAN () {
          this.newUser.fattransHigh = false;
      },
      clearLFTRAN () {
          this.newUser.fattransLow = false;
      },
      clearHFI () {
          this.newUser.fiberHigh = false;
      },
      clearLFI () {
          this.newUser.fiberLow = false;
      },
      clearC2 () {
          this.newUser.cookTime2h = false;
      },
      clearC1 () {
          this.newUser.cookTime1h = false;
      },
      clearC05 () {
          this.newUser.cookTime05h = false;
      },
    },
    created () {
      
    }
}
</script> 

<style scoped>
 .stepper, .card, .btn {
   box-shadow: 0px 0px 1px 0px #888888;
 }
 .card--color {
   background: #fff;
 }
 .btn {
   
 }
 .macros .md3 {
   margin-right: 3%;
 }
</style>
