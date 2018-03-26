var app = require("jwt-http");
var fs = require("fs");
var path = require("path");
var multer = require("multer");
var formidable = require("formidable");


app.setPort(9000);


/*
open git bash and type below commond to generate self signed ssl key and certifiacte
openssl genrsa 1024 > key.pem
openssl req -x509 -new -key key.pem > cert.pem
*/
var options = {
    key : fs.readFileSync(path.join(__dirname, "/key.pem")),
    cert : fs.readFileSync(path.join(__dirname, "/cert.pem"))
}

app.setHttpsServer(options, 8000);



// Middlewere
require("./middlewere/middlewere");

//routes
require("./backend/route");
require("./frontend/route");


app.user.createNewPrivileges(["/secured", "GET"],"secured route", false);
app.user.createNewPrivileges(["/secured", "POST"],"secured route", false);
app.user.createNewPrivileges(["/secured", "PUT"],"secured route", false);
app.user.createNewPrivileges(["/secured", "DELETE"],"secured route", false);
app.user.createNewRole("admin");


// app.user.addPrivilegeToRole("admin",["/secured", "GET"], true);





app.postMethod("/upload", true, app.validate_login,  function(req, res, previous){
	var form = new formidable.IncomingForm();
    form.parse(req);

    form.on('fileBegin', function (name, file){
        file.path = __dirname + '/uploads/' + file.name;
    });

    form.on('file', function (name, file){
        console.log('Uploaded ' + file.name);
	});
	form.on("error", function(error){
		app.httpMsgs.send500(req, res, error);
	})
	form.on("end", function(){
		app.httpMsgs.sendHTML(req, res, "uploded");
	});
});

