import * as firebase from 'firebase';
require('@firebase/firestore')


var firebaseConfig = {
    apiKey: "AIzaSyAzya8xB_2p-rdr5rVuKFU8RfKDnmfgu6U",
    authDomain: "c-37-655f1.firebaseapp.com",
    databaseURL: "https://c-37-655f1-default-rtdb.firebaseio.com",
    projectId: "c-37-655f1",
    storageBucket: "c-37-655f1.appspot.com",
    messagingSenderId: "485884316668",
    appId: "1:485884316668:web:f2852b03ce67ec463ec079"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore()