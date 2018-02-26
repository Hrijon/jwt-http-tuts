var app = require("jwt-http");

app.setPort(9000);

// Middlewere
require("./middlewere/middlewere");

//routes
require("./backend/route");
require("./frontend/route");
