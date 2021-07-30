var fs = require('fs');
var path = require('path');

var data = JSON.parse( 
  fs.readFileSync( 
    path.resolve( __dirname , '../data_copy.json')
  ) 
);

console.log(data.goal);
var result = data;
result.goal = 4000;
fs.writeFileSync(
  path.resolve(__dirname, "../data_copy.json"),
  JSON.stringify(result)
);