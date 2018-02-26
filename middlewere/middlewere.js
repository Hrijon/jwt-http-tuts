var app = require("jwt-http");

app.use(function(req, res, previous){
    previous.generic = "Generic Middle were"

    return previous;
})