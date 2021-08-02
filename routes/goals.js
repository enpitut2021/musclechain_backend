const express = require('express');

const router = express.Router();


var fs = require('fs');
var path = require('path');

require('date-utils');

var dt = new Date();
var today = dt.toFormat("YYYY-MM-DD");
var dt_week = new Date();
dt_week.setDate(dt_week.getDate() - 6);
var weekago= dt_week.toFormat("YYYY-MM-DD");

var DB = JSON.parse( 
    fs.readFileSync( 
      path.resolve( __dirname , "../data_copy.json" ) 
    ) 
  );
  
let data = {
    "user_id" : "user",
    "activity" : {
        "2021-08-02" : {
            "calories" : 2000,
            "goal" : 0
        }
    }
};

var iter = new Date();
goal =  DB.activity[iter.toFormat("YYYY-MM-DD")];
console.log(goal);

router.get('/', (req, res) => {
    
    //const ret_goal = Number(DB.activity[req.body.goal]);
    const end_date = (typeof req.body["end-date"] !== 'undefined') ? req.body["end-date"] : today;
    const base_date = (typeof req.body["base-date"] !== 'undefined') ? req.body["base-date"]: weekago;
    const ret_id = DB.user_id;


    var base_dt =  new Date(base_date.slice(0,4), base_date.slice(5,7)-1, base_date.slice(8));
    base_dt.toFormat("YYYY-MM-DD");
    var end_dt =  new Date(end_date.slice(0,4), end_date.slice(5,7)-1, end_date.slice(8));
    end_dt.toFormat("YYYY-MM-DD");

    var iter = base_dt;
    let ret = {
        activity: []
    };

    var i = 0;
    while(iter.getTime() != end_dt.getTime()){
        var goal_date = iter.toFormat("YYYY-MM-DD");
        ret.activity[i].goal = DB.activity[goal_date].goal;
        ret.activity[i].date = goal_date;
        iter.setDate(iter.getDate() +1);
        i++;
    }
    ret[user_id] = ret_id;
    
    console.log(ret);
    res.json(ret);
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