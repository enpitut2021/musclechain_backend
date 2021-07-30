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


app.get('/api/calories', (req, res) => {
    const ret = {
        "user_id":"user",
        "activity": [
        {
            "date": "2021-07-01",
            "calories": 100
        },
        {
            "date": "2021-07-02",
            "calories": 3000
        },
        {
            "date": "2021-07-03",
            "calories": 200
        },
        {
            "date": "2021-07-04",
            "calories": 402
        },
        {
            "date": "2021-07-05",
            "calories": 300
        },
        {
            "date": "2021-07-06",
            "calories": 2000
        },
        {
            "date": "2021-07-07",
            "calories": 100
        },
        {
            "date": "2021-07-08",
            "calories": 305
        }
        ]
    };
    
    res.json(ret);
})
app.listen(3000, () => console.log('Listening on port 3000'));