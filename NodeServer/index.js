require('dotenv').config();

//get App
var app = require('./server/server.js');
//Listen
app.listen(process.env.PORT, function () {
    console.log("Up and running in port: " + process.env.PORT);
});
