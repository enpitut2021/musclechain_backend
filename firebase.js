const firebase = require("firebase");
const admin = require("firebase-admin");

var firebaseConfig = {
  apiKey: "AIzaSyCigg4A1qraKIRlL-8NZ2ueZLz3bRJxxHc",
  authDomain: "enpit-5b754.firebaseapp.com",
  projectId: "enpit-5b754",
  storageBucket: "enpit-5b754.appspot.com",
  messagingSenderId: "74928683689",
  appId: "1:74928683689:web:c7b45d86867e73f78607b8",
};

firebase.initializeApp(firebaseConfig);
// const serviceAccount = require("./firebase_keys/enpit-5b754-firebase-adminsdk-qlsr0-6f2e587d82.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });
var email = "hoge@example.com";
var password = "password";
firebase
  .auth()
  .createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    var user = userCredential.user;
    console.log(user);
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMsg = error.message;
    console.log(errorCode, errorMsg);
  });
