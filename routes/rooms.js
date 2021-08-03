const express = require('express');

const router = express.Router();


var fs = require('fs');
var path = require('path');

var DB = JSON.parse( 
    fs.readFileSync( 
      path.resolve( __dirname , "../rooms.json" ) 
    ) 
  );

console.log(DB);

router.get('/', (req, res) => {
    console.log(DB);
    res.json(DB);
})


router.post('/', function(req, res){
    let new_goal = req.body.goal;
    let result = DB;
    result.goal = new_goal;
    fs.writeFileSync(
        path.resolve(__dirname, "../data.json"),
        JSON.stringify(result)
    )

    res.send('POST request to the homepage');
})

module.exports = router;