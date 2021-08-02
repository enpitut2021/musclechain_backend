const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

const calories = require("./routes/calories");
const goals = require("./routes/goals");
const firebase = require("./routes/firebase");

app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.use("/calories", calories);
app.use("/goals", goals);
app.use("/firebase", firebase);

app.listen(3003, () => console.log("Listening on port 3003"));
