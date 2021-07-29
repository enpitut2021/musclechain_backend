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


app.get('/api/v1/list', (req, res) => {
    axios.request(CONFIG).then((res1)=>{
        res.json(res1.data);
      }).catch((error)=>{
        console.log(error);
      });
})
app.listen(3001, () => console.log('Listening on port 3001'));