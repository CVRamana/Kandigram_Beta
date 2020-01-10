
import firebase from 'react-native-firebase';

// should go in a secret file
const config = {
    apiKey: "AIzaSyCH3gLMVi1LXXJpM8QFJ7BC7hJ2HrXctqs",
    authDomain: "chatting101-bc87c.firebaseapp.com",
    databaseURL: "https://chatting101-bc87c.firebaseio.com",
    projectId: "chatting101-bc87c",
    storageBucket: "chatting101-bc87c.appspot.com",
    messagingSenderId: "279065874868",
    appId: "1:279065874868:web:1e0c0b735941aeabed62e1",
    measurementId: "G-RGJTSJWD9P"
};
firebase.initializeApp(config);

export default firebase;
