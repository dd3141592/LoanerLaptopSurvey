var express       = require("express");

var app = express();
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';


var config = require('./server/config/config')[env];

console.dir("env: " + env);
console.dir(config);

require('./server/config/express')(config, app);



require('./server/config/routes')(config, app);


app.listen(config.port);
console.log('Listening on port ' + config.port + '...');
