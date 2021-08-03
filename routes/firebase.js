const firebase = require("firebase");
var admin = require("firebase-admin");

const express = require("express");
var router = express.Router();

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
      // console.log(errorCode, errorMsg);
    });
  return ok;
}

async function user_login(email, password) {
  var msg;
  await firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      // console.log(user.uid);
      // console.log(user.email);
      msg = true;
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMsg = error.message;
      // console.log(errorCode, errorMsg);
      msg = {
        code: errorCode,
        msg: errorMsg,
      };
    });
  return msg;
}
async function get_data_document(collection, doc) {
  // console.log(collection, doc);
  var db = admin.firestore();
  var ref = db.collection(collection).doc(doc);
  const firebase_doc = await ref.get();
  // console.log(firebase_doc);
  if (!firebase_doc.exists) {
    return -1;
  } else {
    return firebase_doc;
  }
}

async function get_data_collection(collection) {
  var db = admin.firestore();
  const ref = db.collection(collection);
  const snapshot = await ref.get();
  // console.log(firebase_doc);
  if (snapshot.empty) {
    return -1;
  } else {
    return snapshot;
  }
}

router.post("/login", async (req, res, next) => {
  let email = req.body.email;
  let password = req.body.password;
  if (!init) {
    firebase_init();
  }
  var result = await user_login(email, password);
  if (result == 1) res.status(200).send("ok");
  else {
    res.status(500).send(result["msg"]);
  }
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
  res.send("ok!");
});

router.post("/calories", async (req, res, next) => {
  var uid = req.body.uid;
  console.log(uid);
  if (!init) {
    firebase_init();
  }
  var calories = await get_data_document("users", uid);
  if (calories == -1) {
    res.status(500).send("uid is not valid");
  } else {
    var calories_list = calories.data().calories;
    res.status(200).send(calories_list);
  }
});

router.get("/rooms", async (req, res, next) => {
  if (!init) {
    firebase_init();
  }
  var documents = await get_data_collection("rooms");
  var data = [],
    document_data,
    tmp;
  documents.forEach((doc) => {
    console.log(doc.data());
    document_data = doc.data();
    tmp = {
      room_id: document_data["room_id"],
      room_document_id: doc.id,
      participants: document_data["participants"],
    };
    data.push(tmp);
  });
  res.status(200).send(data);
});

router.get("/uid", async (req, res, next) => {
  if (!init) {
    firebase_init();
  }
  const user = firebase.auth().currentUser;
  if (user != null) {
    res.status(200).send({ uid: user.uid });
  } else {
    res.status(500).send("user is not exit");
  }
});

router.get("/userinfo", async (req, res, next) => {
  var uid = req.body.uid;
  // console.log(uid);
  if (!init) {
    firebase_init();
  }
  var doc = await get_data_document("users", uid);
  var data = doc.data();
  console.log(data);
  if (data == -1) {
    res.status(500).send("uid is not valid");
  } else {
    var calories = data.calories;
    var user_name = data.user_name;
    var room_id = data.room;
    var send = {
      calories: calories,
      user_name: user_name,
      room_id: room_id,
    };
    res.status(200).send(send);
  }
});

async function set_room_data(collection, room_id, room_data) {
  var db = admin.firestore();
  const docRef = db.collection(collection).doc(room_id);
  console.log(room_data);
  const res = await docRef.set({
    start_date: room_data["start_date"],
    end_date: room_data["end_date"],
    participants: room_data["participants"],
    room_id: room_data["room_id"],
  });
  return res;
}

//router.post("/roomjoin", async (req, res, next) => {
//  var room_id = req.body.room_id;
//  var uid = req.body.uid;
//  if (!init) {
//    firebase_init();
//  }
//  var room_data = await get_data_document("rooms", room_id);
//  room_data = room_data.data();
//  // console.log(room_data);
//  if (!room_data["participants"].includes(uid)) {
//    room_data["participants"].push(uid);
//  }
//  // console.log(room_data);
//  var result = await set_room_data("rooms", room_id, room_data);
//  //ユーザーの前居た部屋の情報を入れる
//  var user_data = await get_data_document("users", uid);
//  var user_room_ref = user_data.data()["room"];
//  var prev_user_room = await user_room_ref.get();
//  const newArray = prev_user_room
//    .data()
//    ["participants"].filter((n) => n !== uid);
//  var prev_user_room_id = prev_user_room.id;
//  var prev_room_data = {
//    start_date: prev_user_room.data()["start_date"],
//    end_date: prev_user_room.data()["end_date"],
//    room_id: prev_user_room.data()["room_id"],
//    participants: newArray,
//  };
//  var result = await set_room_data("rooms", prev_user_room_id, prev_room_data);

//  var db = admin.firestore();
//  const room_ref = db.collection("rooms").doc(room_id);
//  user_data.data()["room"] = room_ref;
//  const user_ref = db.collection("users").doc(uid);
//  const user_res = await user_ref.set({
//    calories: user_data.data()["calories"],
//    room: user_data.data()["room"],
//    user_name: user_data.data()["user_name"],
//  });

//  res.send("ok");
//});

module.exports = router;
