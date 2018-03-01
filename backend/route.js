var app = require("jwt-http");
var querystring = require("querystring");
var con = require("./model/conn");

var specific = (req, res, previous) => {
    previous.specific = "Specific Middle were"

    return previous
}

var second = (req, res, previous) => {
    
    return false;
}

app.getMethod("/backend/emp", true, specific, second,function(req, res, previous){
    app.httpMsgs.sendJSON(req, res, {
        name : "Kavitha Jasaval",
        age  : "34",
        sex  : "Female",
        generic : previous.generic,
        specific : previous.specific
    });
});

app.postMethod("/backend/newuser", false, function(req, res, previous){
    var data = querystring.parse(req.body);
    con.insertuser(data);
    console.log(data);
});





