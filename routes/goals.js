const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const cors = require('cors');

app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

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


app.post('/goals', function(req, res){
    let new_goal = req.body.goals;
    let result = DB;
    result.goal = new_goal;
    fs.writeFileSync(
        path.resolve(__dirname, "../data.json"),
        JSON.stringify(result)
    )

    res.send('POST request to the homepage');
})

app.listen(3001, () => console.log('Listening on port 3001'));

module.exports = app;