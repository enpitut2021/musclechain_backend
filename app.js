const express = require('express');
const cors = require('cors');
const app = express();

const calories = require('./routes/calories');
//const goals = require('./routes/goal');

app.use(cors());

app.use('/calories', calories);
//app.use('/goal', goals);

app.get('/',(res,req)=>{
    res.send('Received GET request');
})

app.listen(3003, () => console.log('Listening on port 3003'));