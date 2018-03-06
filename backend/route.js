var app = require("jwt-http");
var querystring = require("querystring");
var con = require("./model/conn");
var test = require("./model/test");


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



// route in case of 500 error

app.getMethod("/backend/getname" + app.queryExpression(), false, function(req, res, previous){
try {
    var curQueryString = app.getParsedQuery();
    var name = curQueryString.name;
    var channel = test.getname(name);
    app.httpMsgs.sendJSON(req, res, {
        channel : channel
    });
} catch (error) {
    app.httpMsgs.send500(req, res, error);
    
}

});

// login
var loginMiddleware = (req, res, previous)=>{
    var data = querystring.parse(req.body);
    var user = data.user;
    var password = data.password;
    // connct to data base process the user and password
    if (user == password){
        return true;
    }else{
        app.httpMsgs.setCookie(req, res,"JWTtoken=''", "Yor are loged out", false);
        return false;
    }

}

app.setLoginRoute(loginMiddleware, "topsecret", 1);
app.logout();

// secured route
app.getMethod("/secured" , true, app.validate_login, function(req, res, previous){
    app.httpMsgs.sendJSON(req, res, {
        jwt : JSON.parse(req.jwt)
    })

});







