const firebase = require("firebase");
var admin = require("firebase-admin");

//ここから
function firebase_init() {
  var firebaseConfig = {
    apiKey: "AIzaSyCigg4A1qraKIRlL-8NZ2ueZLz3bRJxxHc",
    authDomain: "enpit-5b754.firebaseapp.com",
    projectId: "enpit-5b754",
    storageBucket: "enpit-5b754.appspot.com",
    messagingSenderId: "74928683689",
    appId: "1:74928683689:web:c7b45d86867e73f78607b8",
  };

  firebase.initializeApp(firebaseConfig);
  var serviceAccount = require("./firebase_setting/enpit-5b754-firebase-adminsdk-qlsr0-87d2f3df4b.json");

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}
//ここまででfirebaseの認証をするので，使う時は呼び出さないと行けない
//ユーザー認証の関数
function add_user(email, password) {
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
}

function user_login(email, password) {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      console.log(user.uid);
      console.log(user.email);
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
    });
}

async function get_data(collection) {
  var db = admin.firestore();
  const snapshot = await db.collection(collection).get();
  snapshot.forEach((doc) => {
    console.log(doc.data());
  });
}
// テスト用のユーザー
var email = "hoge@example.com";
var password = "password";
firebase_init();
// get_data("rooms");
// get_data("users");
