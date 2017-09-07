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
            interests: {running: false, bodybuilding: false, biking: false}, 
            vegan: false, 
            macros: {carbs:349, protein: 140, fats: 80},
            carbsHigh: false,
            carbsLow: false,
            proteinHigh: false,
            proteinLow: false,
            fatHigh: true,
            fatLow: false,
            fattransHigh: false,
            fattransLow: false,
            fatsatHigh: false,
            fatsatLow: false,
            fiberHigh: false,
            fiberLow: false,
            cookTime2h: false,
            cookTime1h: false,
            cookTime05h: false
            },
            {id: 2, name: 'Kasper', interests: ['bodybuilding'], vegan: false, macros: [400, 150, 80], },
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

            // Protein high
            i.bodybuilding && !u.proteinLow || u.proteinHigh || u.macros.protein >= 140 && !u.proteinLow ? userPreferences += "&nutrition.PROCNT.min=20&nutrition.PROCNT.max=50" : userPreferences += "";
            // Protein low
            u.proteinLow || u.macros.protein <= 80 ? userPreferences += "&nutrition.PROCNT.min=0&nutrition.PROCNT.max=5" : userPreferences += "";
            // Carbs high
            i.running && !u.carbsLow || i.biking && !u.carbsLow || u.carbsHigh || u.macros.carbs >= 350 && !u.carbsLow ? userPreferences += "&nutrition.CHOCDF.min=20&nutrition.CHOCDF.max=50" : userPreferences += "";
            // Carbs low
            u.carbsLow || u.macros.carbs <= 250 ? userPreferences += "&nutrition.CHOCDF.min=0&nutrition.CHOCDF.max=5" : userPreferences += "";
            // Fat high
            u.fatHigh || u.macros.fats >= 90 && !u.fatLow ? userPreferences += "&nutrition.FAT.min=20&nutrition.FAT.max=50" : userPreferences += "";
            // Fat low
            u.fatLow || u.macros.fats <= 60 ? userPreferences += "&nutrition.FAT.min=0&nutrition.FAT.max=5" : userPreferences += "";
            // Fatty acids, total trans - high
            u.fattransHigh ? userPreferences += "&nutrition.FATRN.min=20&nutrition.FATRN.max=50" : userPreferences += "";
            // Fatty acids, total trans - low
            u.fattransLow ? userPreferences += "&nutrition.FATRN.min=0&nutrition.FATRN.max=5" : userPreferences += "";
            // Fatty acids, total saturated	- high
            u.fatsatHigh ? userPreferences += "&nutrition.FASAT.min=20&nutrition.FASAT.max=50" : userPreferences += "";
            // Fatty acids, total saturated	- low
            u.fatsatLow ? userPreferences += "&nutrition.FASAT.min=0&nutrition.FASAT.max=5" : userPreferences += "";
            // Fiber high 
            u.fiberHigh ? userPreferences += "&nutrition.FIBTG.min=20&nutrition.FIBTG.max=50" : userPreferences += "";
            // Fiber low
            u.fiberLow ? userPreferences += "&nutrition.FIBTG.min=0&nutrition.FIBTG.max=5" : userPreferences += "";
            // Cook time 2 hours max
            u.cookTime2h ? userPreferences += "&maxTotalTimeInSeconds=7200" : userPreferences += "";
            // Cook time 1 hour max
            u.cookTime1h ? userPreferences += "&maxTotalTimeInSeconds=3600" : userPreferences += "";
            // Cook time 0.5 hour max
            u.cookTime05h ? userPreferences += "&maxTotalTimeInSeconds=1800" : userPreferences += "";
            
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