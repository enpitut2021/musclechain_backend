const express = require('express');
var router = express.Router();

const axios = require('axios');
require('date-utils');

var dt = new Date();
var today = dt.toFormat("YYYY-MM-DD");


const TOKEN = `eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMkM4SkoiLCJzdWIiOiI5ODM5R0IiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJyc29jIHJhY3QgcnNldCBybG9jIHJ3ZWkgcmhyIHJwcm8gcm51dCByc2xlIiwiZXhwIjoxNjI4MTQyOTkxLCJpYXQiOjE2Mjc1MzgyMzl9.jLRirQcyAP8jzSMJaQDM3bFen9THCZ7npzAIShApZNc`;
const CONFIG = {
    baseURL: 'https://api.fitbit.com/1',
    url: ``,
    method: 'get',
    headers: {'Authorization': `Bearer ${TOKEN}`}
}

let data = {
    user_id : "user",
    activity : [
        {
            calories : 2000,
            date : "2021-07-30"
        }
    ]
};


router.get('/', (req, res, next) => {

    const end_date = (typeof req.body["end-date"] !== 'undefined') ? req.body["end-date"] : today;
    const base_date = (typeof req.body["base-date"] !== 'undefined') ? req.body["base-date"]: "2021-07-24";

    CONFIG.url=`/user/-/activities/tracker/calories/date/${base_date}/${end_date}.json`;

    axios.request(CONFIG).then((res1)=>{
        for(let v in res1.data['activities-tracker-calories']){
            let daily_calories = res1.data['activities-tracker-calories'][v]['value'];
            let dateTime = res1.data['activities-tracker-calories'][v]['dateTime'];
            let day_data = {
                calories : Number(daily_calories),
                date : dateTime
            }
            data.activity[v] = day_data;
            
        }
        console.log(JSON.stringify(data));
        res.json(data); 
      }).catch((error)=>{
        
      });
})


module.exports = router;