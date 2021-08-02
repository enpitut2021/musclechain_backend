const express = require('express');
var router = express.Router();

const axios = require('axios');
require('date-utils');

const TOKEN = `eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMkM4SkoiLCJzdWIiOiI5ODM5R0IiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJyc29jIHJhY3QgcnNldCBybG9jIHJ3ZWkgcmhyIHJwcm8gcm51dCByc2xlIiwiZXhwIjoxNjI4MTQyOTkxLCJpYXQiOjE2Mjc1MzgyMzl9.jLRirQcyAP8jzSMJaQDM3bFen9THCZ7npzAIShApZNc`;
const CONFIG = {
    baseURL: 'https://api.fitbit.com/1',
    url: ``,
    method: 'get',
    headers: { 'Authorization': `Bearer ${TOKEN}` }
}

const admin = require('firebase-admin');
const serviceAccount = require('../firebase_key/firebase_key.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

CONFIG.url = `/user/-/activities/tracker/calories/date/today/1d.json`;

axios.request(CONFIG).then((res1) => {

    let val = res1.data['activities-tracker-calories'][0]['value'];
    let dateTime = new Date();
    var dT = dateTime.toFormat("YYYY-MM-DD");

    var data = {};
    data[`calories.${dT}`] = Number(val);
    console.log(data);
    var tmp = 'calories.' + dT;
    const res = db.collection('users').doc('AumGFGYh9wPRUMR4C8TzlHojNuo1').update(data);
}).catch((error) => {

});