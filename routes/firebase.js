const firebase = require("firebase");
var admin = require("firebase-admin");

const express = require("express");
var router = express.Router();

const axios = require("axios");
var init = false;

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
  var serviceAccount = require("../firebase_setting/enpit-5b754-firebase-adminsdk-qlsr0-87d2f3df4b.json");

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  init = true;
}
//ここまででfirebaseの認証をするので，使う時は呼び出さないと行けない
//ユーザー認証の関数
async function add_user(email, password) {
  var ok = false;
  await firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      var user = userCredential.user;
      // console.log(user);
      ok = true;
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMsg = error.message;
      console.log(errorCode, errorMsg);
    });
  return ok;
}

async function user_login(email, password) {
  var ok = false;
  await firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      console.log(user.uid);
      console.log(user.email);
      ok = true;
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMsg);
    });
  return ok;
}

async function get_data(collection) {
  var db = admin.firestore();
  const snapshot = await db.collection(collection).get();
  snapshot.forEach((doc) => {
    console.log(doc.data());
  });
  return snapshot;
}

async function set_data(collection) {
  var db = admin.firestore();
  const docRef = db.collection(collection).doc();
  var endDate = new Date();
  // var end = currentDate.setDate(currentDate.getDate() + 1);

  endDate.setDate(endDate.getDate() + 1);
  await docRef.set({
    start_date: new Date(),
    room_id: 1000,
    participants: [],
    end_date: endDate,
  });
}

router.post("/login", async (req, res, next) => {
  let email = req.body.email;
  let password = req.body.password;
  if (!init) {
    firebase_init();
  }
  var result = await user_login(email, password);
  console.log(result);
  var s = {
    result: result ? 1 : 0,
  };
  res.status(200).send(s);
});

router.get("/", function (req, res) {
  console.log("firebase access ok!");
  res.send("ok!");
});

router.post("/register", async (req, res, next) => {
  let email = req.body.email;
  let password = req.body.password;
  if (!init) {
    firebase_init();
  }
  var result = await add_user(email, password);
  var s = {
    result: result ? 1 : 0,
  };
  res.status(200).send(s);
});

router.get("/", function (req, res) {
  console.log("firebase access ok!");
  res.send("ok!");
});
module.exports = router;
