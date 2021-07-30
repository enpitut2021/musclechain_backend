const express = require('express');
const app = express();

var fs = require('fs');
var path = require('path');

var DB = JSON.parse( 
    fs.readFileSync( 
      path.resolve( __dirname , "../data.json" ) 
    ) 
  );

app.get('/goals', (req, res) => {
    const ret_goal = Number(DB.goal);
    const ret_id = DB.user_id;
    
    let ret = {
        user_id: ret_id,
        ret_goal: ret_goal
    };
    console.log(ret);
    res.json(ret);
})

app.listen(3001, () => console.log('Listening on port 3001'));

module.exports = app;