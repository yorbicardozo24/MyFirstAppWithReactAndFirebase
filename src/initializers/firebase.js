import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDF2MrkZ8RYdH-2EP7iKTSAFB2lyFzZ05E",
    authDomain: "my-app-con-react.firebaseapp.com",
    databaseURL: "https://my-app-con-react.firebaseio.com",
    projectId: "my-app-con-react",
    storageBucket: "my-app-con-react.appspot.com",
    messagingSenderId: "1047050514324"
  };

  firebase.initializeApp(config);

  export default firebase;
