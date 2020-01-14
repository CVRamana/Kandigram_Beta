
import Firebase from 'react-native-firebase';

let config = {
  apiKey: "AIzaSyAX9TlfipAdj3JnC1Dbxz_QegJTinrWIzA",
  authDomain: "kandigram-beta.firebaseapp.com",
  databaseURL: "https://kandigram-beta.firebaseio.com",
  projectId: "kandigram-beta",
  storageBucket: "kandigram-beta.appspot.com",
  messagingSenderId: "633802656029",
  appId: "1:633802656029:web:fcf9c8f94e428bb63939f4",
  measurementId: "G-6ZJ79XBMG9"
};
let app = Firebase.initializeApp(config);
export const db = app.database();