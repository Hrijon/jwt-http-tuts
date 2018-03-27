var app = require("jwt-http");
var fs = require("fs");
var path = require("path");

app.setPort(9000);


/*
open git bash and type below commond to generate self signed ssl key and certifiacte
openssl genrsa 1024 > key.pem
openssl req -x509 -new -key key.pem > cert.pem
*/

var key = fs.readFileSync(path.join(__dirname, "/key.pem"));
var cert = fs.readFileSync(path.join(__dirname, "/cert.pem"))

var options= {
    key : key,
    cert : cert
}

app.setHttpsServer(options,8000);




// Middlewere
require("./middlewere/middlewere");
//routes
require("./backend/route");
require("./frontend/route");







