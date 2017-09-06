import Vue from 'vue';
import Vuex from 'vuex';
import { HTTP } from '@/services/axios';
import axios from 'axios';
import router from '@/router/index';

Vue.use(Vuex);

// Yummly recipe API
const YummlyApplicationID = "80ccaca4";
const YummlyApplicationKey = "37f4844b2feabb08158c902a3f739c4c";
const YummlyGetRecipes = "http://api.yummly.com/v1/api/recipes?_app_id=" + YummlyApplicationID + "&_app_key=" + YummlyApplicationKey;
const YummlyGetRecipe = "http://api.yummly.com/v1/api/recipe/"

export const store = new Vuex.Store({
    state: {
        users: [
            {id: 1, name: 'Andreas', 
            interests: {running: false, bodybuilding: true, biking: false}, 
            vegan: false, 
            macros: {carbs:400, protein: 0, fats: 80},
            carbsHigh: false,
            carbsLow: false,
            proteinHigh: false,
            proteinLow: false,
            fatHigh: false,
            fatLow: false,
            fiberHigh: false,
            fiberLow: false,
            },
            {id: 2, name: 'Peter', interests: ['bodybuilding'], vegan: false, macros: [400, 150, 80], },
            {id: 3, name: 'Jens', interests: ['biking'], vegan: false, macros: [400, 150, 80]}
        ],
        recipes: [],
        selectedRecipe: [],
        currentScrollNumber: 12,
        loading: false
    },
    getters: {
        totalUsers(state){
            return state.users;
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
        // unregisteredUsers(state) {
        //     return state.users.filter(user => {
        //         return !user.registered;
        //     });
        // },
        // registrations(state) {
        //     return state.registrations;
        // },
        // totalRegistrations(state) {
        //     return state.registrations.length;
        // }
    },
    mutations: {
        pushRecipes(state, data) {
            state.recipes = data;
            state.currentScrollNumber = state.currentScrollNumber + 15;
        },
        pushSelectedRecipe(state, payload) {
            state.selectedRecipe = payload;
            router.push({ name: 'recipe', params: { recipeID: payload.id }}) 
        }
        // register(state, userId) {
        //     const date = new Date;
        //     const user = state.users.find(user => {
        //         return user.id == userId;
        //     });
        //     user.registered = true;
        //     const registration = {
        //         userId: userId,
        //         name: user.name,
        //         date: date.getMonth() + '/' + date.getDay()
        //     };
        //     state.registrations.push(registration);
        // },
        // unregister(state, payload) {
        //     const user = state.users.find(user => {
        //         return user.id == payload.userId;
        //     });
        //     user.registered = false;
        //     const registration = state.registrations.find(registration => {
        //         return registration.userId == payload.userId;
        //     });
        //     state.registrations.splice(state.registrations.indexOf(registration), 1);
        // }
    }, 
    actions: {
        fetchRecipes(context) {
            context.state.loading = true;
            let userPreferences = "";
            let u = context.state.users[0];
            let i = context.state.users[0].interests;

            // bodybuilding only 
            if(i.bodybuilding && !u.carbsHigh && !u.carbsLow && !u.proteinLow && !u.fatHigh && !u.fatLow && !u.fiberHigh && !u.fiberLow && u.macros.protein == 0) {
                userPreferences = "bodyOnly"
            // protein only
            } else if(u.bodybuilding == false && !s.carbsHigh && !s.carbsLow && !s.proteinLow && !s.fatHigh && !s.fatLow && !s.fiberHigh && !s.fiberLow && u.macros.protein >= 140) {
                userPreferences = "highProteinOnly"
            // high protein
            } else if(u.protein >= 140 && !s.carbsHigh && !s.carbsLow && !s.proteinLow && !s.fatHigh && !s.fatLow && !s.fiberHigh && !s.fiberLow
            || u.bodybuilding == true && !s.carbsHigh && !s.carbsLow && !s.proteinLow && !s.fatHigh && !s.fatLow && !s.fiberHigh && s.fiberLow) {
                userPreferences = "test";
            // high protein - high carbs
            } else if(u.protein >= 140) {
                userPreferences = "test2";
            // low protein
            } else if(u.protein >= 140) {
                //userPreferences = "&nutrition.PROCNT.min=0&nutrition.PROCNT.max=0";
            // high carbs
            } else if(u.protein >= 140){
                //userPreferences = "&nutrition.CHOCDF.min=20&nutrition.CHOCDF.max=50";
            // low carbs
            } else if(u.protein >= 140){
                //userPreferences = "&nutrition.CHOCDF.min=0&nutrition.CHOCDF.max=0";
            } else {
                userPreferences = "end";
            }
            
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
        fetchSelectedRecipe(context, recipeID) {
            axios.get(YummlyGetRecipe + recipeID + '?_app_id=' + YummlyApplicationID + '&_app_key=' + YummlyApplicationKey)
            .then(response => {
              context.commit('pushSelectedRecipe', response.data);
              console.log(response.data)
            }).catch(e => {
                 console.log(e);
            })
        }      
    }
});