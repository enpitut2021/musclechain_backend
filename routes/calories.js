const express = require("express");
var router = express.Router();

const firebase = require("firebase");
var admin = require("firebase-admin");

const axios = require("axios");
require("date-utils");

var dt = new Date();
var today = dt.toFormat("YYYY-MM-DD");
var dt_week = new Date();
dt_week.setDate(dt_week.getDate() - 6);
var weekago = dt_week.toFormat("YYYY-MM-DD");

const TOKEN = `eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMkM4SkoiLCJzdWIiOiI5ODM5R0IiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJyc29jIHJhY3QgcnNldCBybG9jIHJ3ZWkgcmhyIHJwcm8gcm51dCByc2xlIiwiZXhwIjoxNjI4MTQyOTkxLCJpYXQiOjE2Mjc1MzgyMzl9.jLRirQcyAP8jzSMJaQDM3bFen9THCZ7npzAIShApZNc`;
const CONFIG = {
    baseURL: 'https://api.fitbit.com/1',
    url: ``,
    method: 'get',
    headers: { 'Authorization': `Bearer ${TOKEN}` }
}

let data = {
    user_id: "user",
    activity: [
        {
            calories: 2000,
            date: "2021-07-30"
        }
    ]
};

const end_date = today;
const base_date =  weekago;

CONFIG.url = `/user/-/activities/tracker/calories/date/${base_date}/${end_date}.json`;

router.get('/', (req, res, next) => {
    axios.request(CONFIG).then((res1) => {
        for (let v in res1.data['activities-tracker-calories']) {
            let daily_calories = res1.data['activities-tracker-calories'][v]['value'];
            let dateTime = res1.data['activities-tracker-calories'][v]['dateTime'];
            let day_data = {
                calories: Number(daily_calories),
                date: dateTime
            }
            data.activity[v] = day_data;
    
        }
        console.log(JSON.stringify(data));
    }).catch((error) => {
    
    });
})

module.exports = router;