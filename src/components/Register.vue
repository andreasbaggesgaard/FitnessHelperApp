<template>
  <div class="register">

   <v-layout row wrap >
    <v-flex xs12 sm6>
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
              </v-form>
                <v-text-field
                  label="Age"
                  v-model="newUser.age"
                  :rules="commonRules"
                ></v-text-field>
                  <v-text-field
                  label="Height"
                  v-model="newUser.height"
                  :rules="commonRules"
                ></v-text-field>
                <v-text-field
                  label="Weight"
                  v-model="newUser.weight"
                  :rules="commonRules"
                ></v-text-field>

            <v-flex xs6 md10>           
              <v-radio-group v-model="newUser.gender" row>&nbsp;&nbsp;&nbsp;
                  <v-radio label="Male" value="Male" ></v-radio>
                  <v-radio label="Female" value="Female"></v-radio>
                  <v-btn flat @click="clearGender()">clear</v-btn>
              </v-radio-group>      
            </v-flex>

            <v-flex xs6 md2>     
              <label style="float:left" class="subheading image-title">Picture</label><br /><br />
              <input type="file" v-on:change="onUploadImage" id="input">
              
              <div class="image-holder">
              <v-layout row wrap >
                <v-flex xs12 sm6>
                <img v-bind:src="newUser.picture" id="image" width="100%" height="auto" />
                <div class="spinner" v-if="loadingImage"><div class="double-bounce1"></div><div class="double-bounce2"></div></div>
                </v-flex>
                <v-flex xs12 sm6>
                <v-btn flat v-on:click="removeImage()" id="remove-image">Clear image</v-btn>
                </v-flex>
                 </v-layout>
              </div>
            </v-flex>
            {{valid}}
          </v-card>
        <v-btn primary @click.native="step = 2" v-on:click="validInfo()">Continue</v-btn>
          <!--<v-btn @click.native="valid ? step = 2 : step = 1" v-on:click="validInfo()">Continue</v-btn>-->
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

    <v-flex xs12 sm6 class="summary">
      <v-card>
        <v-card-title primary-title>
          <div style="width: 90%">
            <h3 class="subheading mb-0">Your profile so far</h3>
            <v-layout row wrap>
            <v-flex xs12 sm6>
            <img v-bind:src="newUser.picture" v-if="newUser.picture" width="60%" height="auto" />
            <img src="https://upload.wikimedia.org/wikipedia/en/b/b1/Portrait_placeholder.png" width="60%" height="auto" v-else />
            </v-flex>         
              <v-flex xs12 sm6> 
                <p v-if="newUser.name">{{newUser.name}}</p>
                <p v-if="newUser.email">{{newUser.email}}</p>
                <p v-if="newUser.password">{{newUser.password}}</p>
                <p v-if="newUser.age">Age: {{newUser.age}}</p>
                <p v-if="newUser.height">{{newUser.height}} cm</p>
                <p v-if="newUser.weight">{{newUser.weight}} kg</p>
             </v-flex>
              </v-layout> 
              <v-layout row wrap>
              <v-flex xs12 sm6>
                <p v-if="newUser.gender">{{newUser.gender}}</p>
                <p v-if="running">Running</p>
                <p v-if="biking">Biking</p>
                <p v-if="bodybuilding">Bodybuilding</p>
                <p v-if="carbs">Carbs: {{carbs}}</p>
                <p v-if="protein">Protein: {{protein}}</p>
                <p v-if="fat">Fat: {{fat}}</p>
                </v-flex> 
                <v-flex xs12 sm6>
                <p v-if="newUser.proteinHigh">Protein <b class="green--text lighten-3">high</b></p>
                <p v-if="newUser.proteinLow">Protein <b class="red--text lighten-1">low</b></p>
                <p v-if="newUser.carbsHigh">Carbs <b class="green--text lighten-3">high</b></p>
                <p v-if="newUser.carbsLow">Carbs <b class="red--text lighten-1">low</b></p>
                <p v-if="newUser.fatHigh">Fat <b class="green--text lighten-3">high</b></p>
                <p v-if="newUser.fatLow">Fat <b class="red--text lighten-1">low</b></p>
                <p v-if="newUser.fatsatHigh">Fatty acids, total saturated - <b class="green--text lighten-3">high</b></p>
                <p v-if="newUser.fatsatLow">Fatty acids, total saturated - <b class="red--text lighten-1">low</b></p>
                <p v-if="newUser.fattransHigh">Fatty acids, total trans - <b class="green--text lighten-3">high</b></p>
                <p v-if="newUser.fattransLow">Fatty acids, total trans - <b class="red--text lighten-1">low</b></p>
                <p v-if="newUser.fiberHigh">Fiber <b class="green--text lighten-3">high</b></p>
                <p v-if="newUser.fiberLow">Fiber <b class="red--text lighten-1">low</b></p>
                <p v-if="newUser.cookTime2h">Cook time <b>max 2 hours</b></p>
                <p v-if="newUser.cookTime1h">Cook time <b>max 1 hour</b></p>
                <p v-if="newUser.cookTime05h">Cook time <b>max 0.5 hour</b></p> 
                </v-flex>  
             </v-layout>      
          </div>
        </v-card-title>
      </v-card>
    </v-flex>

  </v-layout>
  </div>
</template>

<script>
import toastr from "toastr"
import firebase from "firebase"

export default {
  name: 'register',
  data () { 
      return {
        isMobile: false,
        step: 1,
        running: false,
        biking: false,
        bodybuilding: false,
        carbs: '',
        fat: '',
        protein: '',
        loadingImage: false,
        image: '',
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
        name: '',
        nameRules: [
          (v) => !!v || 'Name is required',
        ],
        email: '',
        emailRules: [
          (v) => !!v || 'E-mail is required',
          (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
        ],
        passwordRules: [
          (v) => !!v || 'Password is required',
          (v) => v.length >= 10 || 'Password must be more than 10 characters'
        ],
        commonRules: [
           //(v) => !!v || 'is required',
           (v) => /^\d+$/.test(v) || 'Must be a number'
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
        let email = this.newUser.email;
        let password = this.newUser.password;
        let self = this;
        this.newUser.picture === "" ? "http://via.placeholder.com/200x200" : this.newUser.picture;
        firebase.auth().createUserWithEmailAndPassword(email, password).then(function (response) {
          //console.log(response)
          self.writeUserData(response.uid, self.newUser.name, email, password, 
            self.newUser.age, self.newUser.height, self.newUser.weight, self.newUser.gender, self.newUser.picture,
            self.newUser.interests = {Running: self.running, Biking: self.biking, Bodybuilding: self.bodybuilding},
            self.newUser.macros = {Carbs: self.carbs, Protein: self.protein, Fat: self.fat}, self.newUser.proteinHigh, 
            self.newUser.proteinLow, self.newUser.carbsHigh, self.newUser.carbsLow,self.newUser.fatHigh, self.newUser.fatLow, 
            self.newUser.fatsatHigh, self.newUser.fatsatLow, self.newUser.fattransHigh, self.newUser.fattransLow, 
            self.newUser.fiberHigh, self.newUser.fiberLow, self.newUser.cookTime2h, self.newUser.cookTime1h,self.newUser.cookTime05h
          );
          toastr.success("Welcome " + self.newUser.name);
          window.location = "http://localhost:8080/#/recipes"
        }).catch(function(error) {
          let errorCode = error.code; 
          let errorMessage = error.message;
          console.log(errorMessage)
          if(errorMessage){
              toastr.error(errorMessage);      
          }   
        });             
      },
      onSignin () {
        //this.$store.dispatch('signUserIn', {email: this.email, password: this.password})
      },
      onUploadImage (e) {
          this.loadingImage = true;
          let self = this;
          let img = jQuery("#image");
          let title = jQuery(".image-title");
          let input = jQuery("#input");
          let remove = jQuery("#remove-image");
          input.css("display", "none");
          title.css("display", "none");
          let file = e.target.files[0];  
          let metadata = {'contentType': file.type}
          let uploadTask = firebase.storage().ref().child('images/' + file.name)
          .put(file, metadata).then(function(snapshot) {
              console.log(snapshot);
              self.loadingImage = false;
              self.image = snapshot.metadata.name;
              self.newUser.picture = snapshot.downloadURL;
              img.css( "display", "inline-block");
              remove.css("display", "inline-block");
            }).catch(function(error) {
                console.error('Upload failed:', error);
         }); 
      },
      removeImage () {
          let self = this;
          let img = jQuery("#image");
          let input = jQuery("#input");
          let remove = jQuery("#remove-image");
          let title = jQuery(".image-title");
          firebase.storage().ref().child('images/' + this.image).delete().then(function() {
              self.newUser.picture = "";
              img.attr("src", "");
              img.css("display", "none");
              input.css("display", "inline-block");
              input.val("");
              title.css("display", "inline-block");
              remove.css("display", "none");
          }).catch(function(error) {
              console.log(error);
          });
      },
      writeUserData (id, name, email, password, age, height, weight, gender, 
        picture, interests, macros, proteinHigh, proteinLow, 
        carbsHigh, carbsLow, fatHigh, fatLow, fatsatHigh, 
        fatsatLow, fattransHigh, fattransLow, fiberHigh, 
        fiberLow, cookTime2h, cookTime1h, cookTime05h) {
          firebase.database().ref('users/').push({
            uid: id,
            Name: name,
            Email: email,
            Password: password,
            Age: age,
            Height: height,
            Weight: weight,
            Gender: gender,
            Picture: picture,
            Interests: interests,
            Macros: macros,
            ProteinHigh: proteinHigh,
            ProteinLow: proteinLow,
            CarbsHigh: carbsHigh,
            CarbsLow: carbsLow,
            FatHigh: fatHigh,
            FatLow: fatLow,
            FatsatHigh: fatsatHigh,
            FatsatLow: fatsatLow,
            FattransHigh: fattransHigh,
            FattransLow: fattransLow,
            FiberHigh: fiberHigh,
            FiberLow: fiberLow,
            CookTime2h: cookTime2h,
            CookTime1h: cookTime1h,
            CookTime05h: cookTime05h
          });
      },
      clearGender () {
          this.newUser.gender = "";
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
      init () {
        let self = this;
        this.onResize()
        window.addEventListener('resize', self.onResize, { passive: true })
      },
      onResize () {
        this.isMobile = window.innerWidth < 600
        console.log(this.isMobile);
      }
    },
    mounted () {
     console.log(this.$vuetify.breakpoint)
     this.$vuetify.load(this.init)
   },
    beforeDestroy () {
     if (typeof window !== 'undefined') {
        window.removeEventListener('resize', this.onResize, { passive: true })
     }
   }
}
</script> 

<style scoped>
.register {
  margin-top: -50px !important;
}
.continue {
  background: #000;
}
.image-holder {
  width: 100%;
  height: 100%;
  min-width: 300px;
  margin-bottom: 50%;
}
#remove-image {
  display: none;
  margin-left: 15%;
  margin-top: 50%;
}
#image {
  display: none;
  height: 100%;
  width: 100%;
}
.summary {
  /*position: fixed;
  right: 22px;
  width: 22%;
  margin-right: 2%;*/
  padding-left: 2%;
}
.summary .card {
  position: fixed;
  min-width: 47%;
}
.summary h3 {
  text-align: left;
  margin-left: 10%;
  margin-bottom: 2% !important;
  border-bottom: 1px solid #e6e6e6 !important;
}
.button {
  background: #f2f2f2 !important;
    padding: 7% !important;
}
.card__media {
  /*height: 120px !important;
  max-width: 120px;*/
  height: 180px !important;
  max-width: 140px;
  margin: 0 auto;
  margin-top: 0%;
  margin-bottom: 3%;
}
 .stepper, .card, .btn, .card__media {
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
i {
  color: #000 !important;
}

 .spinner {
  width: 40px;
  height: 40px;

  position: relative;

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
