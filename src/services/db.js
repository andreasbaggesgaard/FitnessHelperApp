import * as firebase from 'firebase';


let config = {
    apiKey: "AIzaSyDI0f2nMHWLqn_B8oDgEXeN0a_9WCDTJAs",
    authDomain: "fitnessapp-6d9f5.firebaseapp.com",
    databaseURL: "https://fitnessapp-6d9f5.firebaseio.com",
    projectId: "fitnessapp-6d9f5",
    storageBucket: "fitnessapp-6d9f5.appspot.com",
    messagingSenderId: "714564069375"
};
export let app = firebase.initializeApp(config);
export let db = app.database(); 

export const database = {
     users: db.ref('users/'),
     user: db.ref('users/1')
}

// export let storageRef = firebase.storage().ref();
// export let test = storageRef.child('items/');