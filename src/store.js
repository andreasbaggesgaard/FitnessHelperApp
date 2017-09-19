import Vue from "vue"
import Vuex from "vuex"
import { HTTP } from "@/services/axios"
import { database } from "@/services/db"
import axios from "axios"
import router from "@/router/index"
import firebase from "firebase"
//import * as firebase from 'firebase'

Vue.use(Vuex)

// Yummly recipe API
const YummlyApplicationID = "80ccaca4";
const YummlyApplicationKey = "37f4844b2feabb08158c902a3f739c4c";
const YummlyGetRecipes = "http://api.yummly.com/v1/api/recipes?_app_id=" + YummlyApplicationID + "&_app_key=" + YummlyApplicationKey;
const YummlyGetRecipe = "http://api.yummly.com/v1/api/recipe/";

export const store = new Vuex.Store({
    state: {
        currentUser: [],
        recipes: [],
        selectedRecipe: [],
        currentScrollNumber: 12,
        loading: false,
    },
    getters: {
        getUser (state) {
            return state.currentUser[0];
        },
        getRecipes(state) {
            return state.recipes;
        },
        getSelectedRecipe(state) {
            return state.selectedRecipe;
        },
        getCurrentScrollNumber(state) {
            return state.currentScrollNumber;
        },
         getLoadingValue(state) {
            return state.loading;
        },
        // getUsers(state) {
        //     return state.users;
        // }
        // unregisteredUsers(state) {
        //     return state.users.filter(user => {
        //         return !user.registered;
        //     });
        // },
    },
    mutations: {  
        pushRecipes (state, payload) {
            state.recipes = payload;
            state.currentScrollNumber = state.currentScrollNumber + 15;
        },
        pushSelectedRecipe (state, payload) {
            state.selectedRecipe = payload;
            router.push({ name: 'recipe', params: { recipeID: payload.id }}) 
        },
        resetCurrentScrollNumber (state) {
            state.currentScrollNumber = 12;
        },
        setUser (state, payload) {
           // state.currentUser = payload
        },
        setCurrentUser (state, payload) {
            state.currentUser = [];
            let userInSession = payload; 
            console.log("currentUser " + payload.email)
            database.user.once('value').then((data) => {
                const obj = data.val();    
                var key = Object.keys(data.val())[0];
                console.log(key)
                let authUser = [];      
                    for (let key in obj) {
                        if(obj[key].uid == userInSession.uid) {
                            authUser.push({
                                key: key,
                                uid: obj[key].uid,
                                name: obj[key].Name,
                                interests: obj[key].Interests, 
                                macros: obj[key].Macros,
                                carbsHigh: obj[key].CarbsHigh,
                                carbsLow: obj[key].CarbsLow,
                                proteinHigh: obj[key].ProteinHigh,
                                proteinLow: obj[key].ProteinLow,
                                fatHigh: obj[key].FatHigh,
                                fatLow: obj[key].FatLow,
                                fattransHigh: obj[key].FattransHigh,
                                fattransLow: obj[key].FattransLow,
                                fatsatHigh: obj[key].FatsatHigh,
                                fatsatLow: obj[key].FatsatLow,
                                fiberHigh: obj[key].FiberHigh,
                                fiberLow: obj[key].FiberLow,
                                cookTime2h: obj[key].CookTime2h,
                                cookTime1h: obj[key].CookTime1h,
                                cookTime05h: obj[key].CookTime05h,
                                picture: obj[key].Picture
                            });
                        }
                    }
                for (let key in authUser) {
                    state.currentUser.push(authUser[key])
                }
            }).catch((error) => {
                 console.log(error)
            }) 
        },
        updateUserPreference (state, payload) {
            database.users.child(payload.key).update
            ({
                "Macros/Carbs": payload.macros.Carbs,
                "Macros/Protein": payload.macros.Protein,
                "Macros/Fat": payload.macros.Fat,
                "Interests/Running": payload.interests.Running, 
                "Interests/Biking": payload.interests.Biking,
                "Interests/Bodybuilding": payload.interests.Bodybuilding, 
                "ProteinHigh": payload.proteinHigh,  
                "ProteinLow": payload.proteinLow, 
                "CarbsHigh": payload.carbsHigh, 
                "CarbsLow": payload.carbsLow,
                "FatHigh": payload.fatHigh,
                "FatLow": payload.fatLow, 
                "FattransHigh": payload.fattransHigh,
                "FattransLow": payload.fattransLow,
                "FatsatHigh": payload.fatsatHigh,
                "FatsatLow": payload.fatsatLow, 
                "FiberHigh": payload.fiberHigh,
                "FiberLow": payload.fiberLow,
                "CookTime2h": payload.cookTime2h,
                "CookTime1h": payload.cookTime1h,
                "CookTime05h": payload.cookTime05h      
            });
        },
    }, 
    actions: {
        logOut ({commit}) {
            firebase.auth().signOut();
        },
        authenticateUser ({commit}) { 
            let self = this;
             firebase.auth().onAuthStateChanged(function(user) {
                 if (user) {
                     var displayName = user.displayName;
                     var email = user.email;
                     var emailVerified = user.emailVerified;
                     var photoURL = user.photoURL;
                     var isAnonymous = user.isAnonymous;
                     var uid = user.uid;
                     var providerData = user.providerData; 
                     commit('setCurrentUser', user);  
                 } else {
                     //this.$router.push('/'); 
                     window.location = "http://localhost:8080/#/";
                 }
             }); 
        },
        fetchRecipes (context) {
            context.state.loading = true;
            console.log("from recipes " + context.state.currentUser[0]);

            let userPreferences = "";
            let u = context.state.currentUser[0];   
            let i = context.state.currentUser[0].interests; 

            // Protein high
            i.Bodybuilding == true && u.proteinLow != true || u.proteinHigh == true || u.macros.Protein >= 140 && !u.proteinLow ? userPreferences += "&nutrition.PROCNT.min=20&nutrition.PROCNT.max=50" : userPreferences += "";
            // Protein low
            u.proteinLow == true || u.macros.Protein <= 80 && u.proteinHigh != true ? userPreferences += "&nutrition.PROCNT.min=0&nutrition.PROCNT.max=5" : userPreferences += "";
            // Carbs high
            i.running == true && u.carbsLow != true || i.biking == true && u.carbsLow != true || u.carbsHigh == true || u.macros.Carbs >= 350 && u.carbsLow != true ? userPreferences += "&nutrition.CHOCDF.min=20&nutrition.CHOCDF.max=50" : userPreferences += "";
            // Carbs low
            u.carbsLow == true || u.macros.Carbs <= 250 && !u.carbsHigh ? userPreferences += "&nutrition.CHOCDF.min=0&nutrition.CHOCDF.max=5" : userPreferences += "";
            // Fat high
            u.fatHigh == true || u.macros.Fat >= 90 && u.fatLow != true ? userPreferences += "&nutrition.FAT.min=20&nutrition.FAT.max=50" : userPreferences += "";
            // Fat low
            u.fatLow == true || u.macros.Fat <= 60 ? userPreferences += "&nutrition.FAT.min=0&nutrition.FAT.max=5" : userPreferences += "";
            // Fatty acids, total trans - high
            u.fattransHigh == true ? userPreferences += "&nutrition.FATRN.min=20&nutrition.FATRN.max=50" : userPreferences += "";
            // Fatty acids, total trans - low
            u.fattransLow == true ? userPreferences += "&nutrition.FATRN.min=0&nutrition.FATRN.max=5" : userPreferences += "";
            // Fatty acids, total saturated	- high
            u.fatsatHigh == true ? userPreferences += "&nutrition.FASAT.min=20&nutrition.FASAT.max=50" : userPreferences += "";
            // Fatty acids, total saturated	- low
            u.fatsatLow == true ? userPreferences += "&nutrition.FASAT.min=0&nutrition.FASAT.max=5" : userPreferences += "";
            // Fiber high 
            u.fiberHigh == true ? userPreferences += "&nutrition.FIBTG.min=20&nutrition.FIBTG.max=50" : userPreferences += "";
            // Fiber low
            u.fiberLow == true ? userPreferences += "&nutrition.FIBTG.min=0&nutrition.FIBTG.max=5" : userPreferences += "";
            // Cook time 2 hours max
            u.cookTime2h == true ? userPreferences += "&maxTotalTimeInSeconds=7200" : userPreferences += "";
            // Cook time 1 hour max
            u.cookTime1h == true ? userPreferences += "&maxTotalTimeInSeconds=3600" : userPreferences += "";
            // Cook time 0.5 hour max
            u.cookTime05h == true ? userPreferences += "&maxTotalTimeInSeconds=1800" : userPreferences += ""; 
            
            axios.get(YummlyGetRecipes + "&maxResult=" + context.state.currentScrollNumber + "&start=10" + userPreferences)
            .then(response => {
                console.log(YummlyGetRecipes + "&maxResult=" + context.state.currentScrollNumber + "&start=10" + userPreferences)
                context.commit('pushRecipes', response.data); 
                console.log(response.data) 
                context.state.loading = false;        
            }).catch(e => {
                 console.log(e);
            })

        },
        fetchSelectedRecipe (context, recipeID) {
            axios.get(YummlyGetRecipe + recipeID + '?_app_id=' + YummlyApplicationID + '&_app_key=' + YummlyApplicationKey)
            .then(response => {
              context.commit('pushSelectedRecipe', response.data);
              console.log(response.data)
            }).catch(e => {
                 console.log(e);
            })
        },
        listenForChanges (context) {
             database.users.on('value', snap => {
                 const obj = snap.val();
                 console.log("change: " + obj);
             });
        }     
    } 
});