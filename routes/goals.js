const express = require("express");

const router = express.Router();

var fs = require("fs");
var path = require("path");

var DB = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../data.json")));

router.get("/", (req, res) => {
  const ret_goal = Number(DB.goal);
  const ret_id = DB.user_id;

  let ret = {
    user_id: ret_id,
    goal: ret_goal,
  };
  console.log(ret);
  res.json(ret);
});

router.post("/", function (req, res) {
  let new_goal = req.body.goal;
  let result = DB;
  result.goal = new_goal;
  fs.writeFileSync(
    path.resolve(__dirname, "../data.json"),
    JSON.stringify(result)
  );

  res.send("POST request to the homepage");
});

module.exports = router;

