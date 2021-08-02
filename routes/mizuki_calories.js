const express = require('express');
var router = express.Router();

const axios = require('axios');
require('date-utils');

const admin = require('firebase-admin');
const serviceAccount = require('../firebase_key/firebase_key.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();


const TOKEN = `eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyM0I3M0oiLCJzdWIiOiI5SktUUDYiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJyc29jIHJhY3QgcnNldCBybG9jIHJ3ZWkgcmhyIHJwcm8gcm51dCByc2xlIiwiZXhwIjoxNjI3OTMwMTI1LCJpYXQiOjE2Mjc5MDEzMjV9.2zxEbQj-MkUUdexGsCYsmZUmtgZYkUj5C_tOEfFVoBM`;
const CONFIG = {
    baseURL: 'https://api.fitbit.com/1',
    url: ``,
    method: 'get',
    headers: { 'Authorization': `Bearer ${TOKEN}` }
}

CONFIG.url = `/user/-/activities/calories/date/2021-07-27/2021-08-02.json`;

axios.request(CONFIG).then((res1) => {
    for (let v in res1.data['activities-calories']) {
        let daily_calories = res1.data['activities-calories'][v]['value'];
        let dateTime = res1.data['activities-calories'][v]['dateTime'];
        var data = {};
        
        data[dateTime] = Number(daily_calories);
        console.log(data);
        const res = db.collection('fitbit_test').doc('mizuki').update(data);
    }
    
}).catch((error) => {

});