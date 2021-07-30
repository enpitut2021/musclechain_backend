var fs = require('fs');
var path = require('path');

var data = JSON.parse( 
  fs.readFileSync( 
    path.resolve( __dirname , '../data.json')
  ) 
);

console.log(data.goal);