const express = require('express');
const app = express();

const axios = require('axios');

const TOKEN = `eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMkM4SkoiLCJzdWIiOiI5ODM5R0IiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJyc29jIHJhY3QgcnNldCBybG9jIHJ3ZWkgcmhyIHJwcm8gcm51dCByc2xlIiwiZXhwIjoxNjI4MTQyOTkxLCJpYXQiOjE2Mjc1MzgyMzl9.jLRirQcyAP8jzSMJaQDM3bFen9THCZ7npzAIShApZNc`;
const CONFIG = {
    baseURL: 'https://api.fitbit.com/1',
    url: `/user/-/activities/tracker/calories/date/today/1m.json`,
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

app.get('/calories', (req, res) => {
    res.set({'Access-Control-Allow-Origin': '*'});
    axios.request(CONFIG).then((res1)=>{
        for(let v in res1.data['activities-tracker-calories']){
            let dateTime = res1.data['activities-tracker-calories'][v]['dataTime'];
            let daily_calories = res1.data['activities-tracker-calories'][v]['value'];
            let day_data = {
                calories : Number(daily_calories),
                date : dateTime
            }
            data.activity[v] = day_data;
            
        }
        console.log(JSON.stringify(data));
        res.json(JSON.stringify(data));    
      }).catch((error)=>{
        console.log(error);
      });
})
app.listen(3001, () => console.log('Listening on port 3001'));

module.exports = app;